import { type NextRequest, NextResponse } from "next/server"
import { getCrowdfundingProjects } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const projects = await getCrowdfundingProjects(status || undefined)

    return NextResponse.json({ data: projects })
  } catch (error) {
    console.error("Error fetching crowdfunding projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
