import { type NextRequest, NextResponse } from "next/server"
import { getEnergyTransactions } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const transactions = await getEnergyTransactions(userId, limit)

    return NextResponse.json({ data: transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
