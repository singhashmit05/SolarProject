import { type NextRequest, NextResponse } from "next/server"
import { getCommunityNetworks } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const networks = await getCommunityNetworks(userId || undefined)

    return NextResponse.json({ data: networks })
  } catch (error) {
    console.error("Error fetching community networks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
