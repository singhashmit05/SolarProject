import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database utility functions
export async function getUser(userId: string) {
  const result = await sql`
    SELECT * FROM users WHERE id = ${userId}
  `
  return result[0] || null
}

export async function getUserSolarInstallations(userId: string) {
  const result = await sql`
    SELECT * FROM solar_installations 
    WHERE user_id = ${userId} AND status = 'active'
    ORDER BY created_at DESC
  `
  return result
}

export async function getRecentEnergyProduction(installationId: number, hours = 24) {
  const result = await sql`
    SELECT * FROM energy_production 
    WHERE installation_id = ${installationId} 
    AND timestamp >= NOW() - INTERVAL '${hours} hours'
    ORDER BY timestamp DESC
  `
  return result
}

export async function getCommunityNetworks(userId?: string) {
  if (userId) {
    const result = await sql`
      SELECT cn.*, nm.role, nm.status as membership_status
      FROM community_networks cn
      LEFT JOIN network_memberships nm ON cn.id = nm.network_id AND nm.user_id = ${userId}
      ORDER BY cn.created_at DESC
    `
    return result
  } else {
    const result = await sql`
      SELECT * FROM community_networks 
      ORDER BY current_members DESC, created_at DESC
    `
    return result
  }
}

export async function getEnergyTransactions(userId: string, limit = 10) {
  const result = await sql`
    SELECT et.*, 
           fu.name as from_user_name, 
           tu.name as to_user_name,
           cn.name as network_name
    FROM energy_transactions et
    LEFT JOIN users fu ON et.from_user_id = fu.id
    LEFT JOIN users tu ON et.to_user_id = tu.id
    LEFT JOIN community_networks cn ON et.network_id = cn.id
    WHERE et.from_user_id = ${userId} OR et.to_user_id = ${userId}
    ORDER BY et.transaction_date DESC
    LIMIT ${limit}
  `
  return result
}

export async function getCrowdfundingProjects(status?: string) {
  const result = await sql`
    SELECT cp.*, u.name as creator_name,
           COALESCE(SUM(pc.amount), 0) as total_raised,
           COUNT(pc.id) as contributor_count
    FROM crowdfunding_projects cp
    LEFT JOIN users u ON cp.created_by = u.id
    LEFT JOIN project_contributions pc ON cp.id = pc.project_id AND pc.payment_status = 'completed'
    ${status ? sql`WHERE cp.project_status = ${status}` : sql``}
    GROUP BY cp.id, u.name
    ORDER BY cp.created_at DESC
  `
  return result
}

export async function getUserWallet(userId: string) {
  const result = await sql`
    SELECT wallet_balance, 
           (SELECT credits_balance FROM solar_credits WHERE user_id = ${userId}) as solar_credits
    FROM users 
    WHERE id = ${userId}
  `
  return result[0] || { wallet_balance: 0, solar_credits: 0 }
}
