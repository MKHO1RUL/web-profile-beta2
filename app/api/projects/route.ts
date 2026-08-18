import { NextResponse } from "next/server"
import { turso } from "@/lib/turso"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const result = await turso.execute("SELECT * FROM projects ORDER BY display_order ASC")
    const projects = result.rows.map((row) => ({
      ...row,
      tech: typeof row.tech === "string" ? JSON.parse(row.tech) : row.tech || [],
    }))
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects from Turso:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
