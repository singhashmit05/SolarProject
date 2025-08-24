-- Adding sample data for testing the solar platform
-- Insert sample users
INSERT INTO users (id, email, name, phone, address, house_number, city, state, zip_code, user_type, wallet_balance, reputation_score) VALUES
('user1', 'sarah.johnson@email.com', 'Sarah Johnson', '+1-555-0123', '123 Solar Street', '123', 'Austin', 'TX', '78701', 'producer', 1250.75, 4.8),
('user2', 'mike.chen@email.com', 'Mike Chen', '+1-555-0124', '456 Green Avenue', '456', 'Austin', 'TX', '78702', 'consumer', 850.25, 4.6),
('user3', 'emma.davis@email.com', 'Emma Davis', '+1-555-0125', '789 Renewable Road', '789', 'Austin', 'TX', '78703', 'both', 2100.50, 4.9),
('user4', 'alex.rodriguez@email.com', 'Alex Rodriguez', '+1-555-0126', '321 Energy Lane', '321', 'Austin', 'TX', '78704', 'producer', 1875.00, 4.7)
ON CONFLICT (id) DO NOTHING;

-- Insert sample solar installations
INSERT INTO solar_installations (user_id, installation_name, capacity_kw, installation_date, panel_type, inverter_type, battery_capacity_kwh, installation_cost, address, latitude, longitude) VALUES
('user1', 'Sarah Home Solar', 8.5, '2023-06-15', 'Monocrystalline', 'SolarEdge SE7600H', 13.5, 25000.00, '123 Solar Street, Austin, TX', 30.2672, -97.7431),
('user3', 'Emma Residence System', 12.0, '2023-04-20', 'Polycrystalline', 'Enphase IQ8+', 20.0, 35000.00, '789 Renewable Road, Austin, TX', 30.2500, -97.7500),
('user4', 'Alex Solar Farm', 15.5, '2023-08-10', 'Bifacial', 'SMA Sunny Boy', 27.0, 45000.00, '321 Energy Lane, Austin, TX', 30.2800, -97.7200)
ON CONFLICT DO NOTHING;

-- Insert sample community networks
INSERT INTO community_networks (name, description, location, network_type, max_members, current_members, total_capacity_kw, created_by) VALUES
('Austin Solar Collective', 'A neighborhood solar sharing network in central Austin', 'Austin, TX', 'neighborhood', 50, 12, 156.5, 'user1'),
('Green Energy Alliance', 'City-wide renewable energy sharing platform', 'Austin, TX', 'city', 200, 45, 890.2, 'user3'),
('Texas Solar Network', 'Regional solar energy cooperative', 'Texas', 'regional', 1000, 234, 4567.8, 'user4')
ON CONFLICT DO NOTHING;

-- Insert sample network memberships
INSERT INTO network_memberships (network_id, user_id, role, status) VALUES
(1, 'user1', 'admin', 'active'),
(1, 'user2', 'consumer', 'active'),
(1, 'user3', 'producer', 'active'),
(2, 'user3', 'admin', 'active'),
(2, 'user4', 'producer', 'active'),
(3, 'user4', 'admin', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample energy production data (last 24 hours)
INSERT INTO energy_production (installation_id, timestamp, power_generated_kw, power_consumed_kw, power_exported_kw, battery_level_percent, weather_condition, temperature_celsius, irradiance_wm2) VALUES
(1, NOW() - INTERVAL '1 hour', 6.2, 2.1, 4.1, 85.5, 'Sunny', 28.5, 850.0),
(1, NOW() - INTERVAL '2 hours', 7.8, 1.9, 5.9, 92.0, 'Sunny', 29.2, 920.0),
(1, NOW() - INTERVAL '3 hours', 8.1, 2.3, 5.8, 88.5, 'Partly Cloudy', 27.8, 780.0),
(2, NOW() - INTERVAL '1 hour', 9.5, 3.2, 6.3, 78.0, 'Sunny', 28.5, 850.0),
(2, NOW() - INTERVAL '2 hours', 11.2, 2.8, 8.4, 85.5, 'Sunny', 29.2, 920.0),
(3, NOW() - INTERVAL '1 hour', 12.8, 4.1, 8.7, 92.5, 'Sunny', 28.5, 850.0)
ON CONFLICT DO NOTHING;

-- Insert sample solar credits
INSERT INTO solar_credits (user_id, credits_earned, credits_used, credits_balance) VALUES
('user1', 1250.5, 180.2, 1070.3),
('user2', 45.0, 320.8, -275.8),
('user3', 2100.8, 450.3, 1650.5),
('user4', 1890.2, 125.7, 1764.5)
ON CONFLICT DO NOTHING;

-- Insert sample crowdfunding projects
INSERT INTO crowdfunding_projects (title, description, location, project_type, target_amount, raised_amount, capacity_kw, estimated_annual_generation_kwh, beneficiaries_count, project_status, funding_deadline, created_by) VALUES
('Solar for Riverside Elementary', 'Installing solar panels to power Riverside Elementary School and reduce energy costs', 'Austin, TX', 'school', 75000.00, 45250.00, 50.0, 75000, 450, 'funding', '2024-06-30', 'user1'),
('Community Health Clinic Solar', 'Bringing clean energy to the downtown community health clinic', 'Austin, TX', 'clinic', 120000.00, 89500.00, 80.0, 120000, 2500, 'funding', '2024-07-15', 'user3'),
('Rural Village Electrification', 'Solar microgrid for remote village in East Texas', 'East Texas', 'village', 200000.00, 156000.00, 150.0, 225000, 850, 'in_progress', '2024-05-20', 'user4')
ON CONFLICT DO NOTHING;

-- Insert sample energy transactions
INSERT INTO energy_transactions (from_user_id, to_user_id, network_id, energy_amount_kwh, price_per_kwh, total_amount, transaction_type, status, transaction_date) VALUES
('user1', 'user2', 1, 25.5, 0.12, 3.06, 'direct_share', 'completed', NOW() - INTERVAL '2 hours'),
('user3', 'user2', 2, 18.2, 0.11, 2.00, 'marketplace_sale', 'completed', NOW() - INTERVAL '5 hours'),
('user4', 'user1', 3, 42.8, 0.13, 5.56, 'credit_transfer', 'completed', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;
