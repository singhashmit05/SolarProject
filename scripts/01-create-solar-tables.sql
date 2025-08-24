-- Creating comprehensive database schema for solar platform
-- Users table (extends the existing users_sync table concept)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  house_number TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  user_type TEXT CHECK (user_type IN ('producer', 'consumer', 'both')) DEFAULT 'consumer',
  wallet_balance DECIMAL(10,2) DEFAULT 0.00,
  reputation_score DECIMAL(3,2) DEFAULT 5.00,
  total_ratings INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Solar installations table
CREATE TABLE IF NOT EXISTS solar_installations (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  installation_name TEXT NOT NULL,
  capacity_kw DECIMAL(8,2) NOT NULL,
  installation_date DATE,
  panel_type TEXT,
  inverter_type TEXT,
  battery_capacity_kwh DECIMAL(8,2) DEFAULT 0,
  installation_cost DECIMAL(12,2),
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  status TEXT CHECK (status IN ('active', 'maintenance', 'offline')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Energy production data
CREATE TABLE IF NOT EXISTS energy_production (
  id SERIAL PRIMARY KEY,
  installation_id INTEGER REFERENCES solar_installations(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  power_generated_kw DECIMAL(8,3) NOT NULL,
  power_consumed_kw DECIMAL(8,3) DEFAULT 0,
  power_exported_kw DECIMAL(8,3) DEFAULT 0,
  battery_level_percent DECIMAL(5,2) DEFAULT 0,
  weather_condition TEXT,
  temperature_celsius DECIMAL(5,2),
  irradiance_wm2 DECIMAL(8,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community networks
CREATE TABLE IF NOT EXISTS community_networks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  network_type TEXT CHECK (network_type IN ('neighborhood', 'city', 'regional')) DEFAULT 'neighborhood',
  max_members INTEGER DEFAULT 100,
  current_members INTEGER DEFAULT 0,
  total_capacity_kw DECIMAL(10,2) DEFAULT 0,
  created_by TEXT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Network memberships
CREATE TABLE IF NOT EXISTS network_memberships (
  id SERIAL PRIMARY KEY,
  network_id INTEGER REFERENCES community_networks(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'producer', 'consumer', 'member')) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('active', 'pending', 'suspended')) DEFAULT 'active',
  UNIQUE(network_id, user_id)
);

-- Energy sharing transactions
CREATE TABLE IF NOT EXISTS energy_transactions (
  id SERIAL PRIMARY KEY,
  from_user_id TEXT REFERENCES users(id),
  to_user_id TEXT REFERENCES users(id),
  network_id INTEGER REFERENCES community_networks(id),
  energy_amount_kwh DECIMAL(8,3) NOT NULL,
  price_per_kwh DECIMAL(6,4) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('direct_share', 'marketplace_sale', 'credit_transfer')) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  settlement_date TIMESTAMP WITH TIME ZONE
);

-- Solar credits system
CREATE TABLE IF NOT EXISTS solar_credits (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  credits_earned DECIMAL(10,3) DEFAULT 0,
  credits_used DECIMAL(10,3) DEFAULT 0,
  credits_balance DECIMAL(10,3) DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crowdfunding projects
CREATE TABLE IF NOT EXISTS crowdfunding_projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  project_type TEXT CHECK (project_type IN ('school', 'clinic', 'village', 'community_center', 'other')) NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  capacity_kw DECIMAL(8,2) NOT NULL,
  estimated_annual_generation_kwh DECIMAL(10,2),
  beneficiaries_count INTEGER,
  project_status TEXT CHECK (project_status IN ('planning', 'funding', 'in_progress', 'completed', 'cancelled')) DEFAULT 'funding',
  funding_deadline DATE,
  project_start_date DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,
  created_by TEXT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project contributions
CREATE TABLE IF NOT EXISTS project_contributions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES crowdfunding_projects(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  contribution_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_method TEXT,
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending'
);

-- User ratings and reviews
CREATE TABLE IF NOT EXISTS user_ratings (
  id SERIAL PRIMARY KEY,
  rated_user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  rating_user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  transaction_id INTEGER REFERENCES energy_transactions(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(rated_user_id, rating_user_id, transaction_id)
);

-- Energy forecasts
CREATE TABLE IF NOT EXISTS energy_forecasts (
  id SERIAL PRIMARY KEY,
  installation_id INTEGER REFERENCES solar_installations(id) ON DELETE CASCADE,
  forecast_date DATE NOT NULL,
  forecast_hour INTEGER CHECK (forecast_hour >= 0 AND forecast_hour <= 23),
  predicted_generation_kw DECIMAL(8,3) NOT NULL,
  confidence_level DECIMAL(5,2),
  weather_forecast TEXT,
  temperature_forecast DECIMAL(5,2),
  cloud_cover_percent DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(installation_id, forecast_date, forecast_hour)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_energy_production_installation_timestamp ON energy_production(installation_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_energy_transactions_users ON energy_transactions(from_user_id, to_user_id);
CREATE INDEX IF NOT EXISTS idx_network_memberships_network ON network_memberships(network_id);
CREATE INDEX IF NOT EXISTS idx_project_contributions_project ON project_contributions(project_id);
CREATE INDEX IF NOT EXISTS idx_user_ratings_rated_user ON user_ratings(rated_user_id);
CREATE INDEX IF NOT EXISTS idx_energy_forecasts_installation_date ON energy_forecasts(installation_id, forecast_date);
