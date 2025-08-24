import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const installationId = searchParams.get("installationId")
    const hours = Number.parseInt(searchParams.get("hours") || "24")

    if (!installationId) {
      return NextResponse.json({ error: "Installation ID is required" }, { status: 400 })
    }

    const result = await sql`
      SELECT 
        timestamp,
        power_generated_kw,
        power_consumed_kw,
        power_exported_kw,
        battery_level_percent,
        weather_condition,
        temperature_celsius
      FROM energy_production 
      WHERE installation_id = ${installationId} 
      AND timestamp >= NOW() - INTERVAL '${hours} hours'
      ORDER BY timestamp ASC
    `

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error fetching energy production data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      installation_id,
      power_generated_kw,
      power_consumed_kw,
      power_exported_kw,
      battery_level_percent,
      weather_condition,
      temperature_celsius,
      irradiance_wm2,
    } = body

    const result = await sql`
      INSERT INTO energy_production (
        installation_id, timestamp, power_generated_kw, power_consumed_kw,
        power_exported_kw, battery_level_percent, weather_condition,
        temperature_celsius, irradiance_wm2
      ) VALUES (
        ${installation_id}, NOW(), ${power_generated_kw}, ${power_consumed_kw},
        ${power_exported_kw}, ${battery_level_percent}, ${weather_condition},
        ${temperature_celsius}, ${irradiance_wm2}
      ) RETURNING *
    `

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error creating energy production record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
