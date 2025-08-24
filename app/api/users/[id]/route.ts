import { type NextRequest, NextResponse } from "next/server"
import { getUser, getUserSolarInstallations, getUserWallet } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    const [user, installations, wallet] = await Promise.all([
      getUser(userId),
      getUserSolarInstallations(userId),
      getUserWallet(userId),
    ])

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        ...user,
        installations,
        wallet,
      },
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
