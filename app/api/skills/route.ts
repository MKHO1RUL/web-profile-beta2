import { NextResponse } from "next/server"
import { turso } from "@/lib/turso"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const [categoriesResult, skillsResult] = await Promise.all([
      turso.execute("SELECT * FROM skill_categories ORDER BY display_order ASC"),
      turso.execute("SELECT * FROM skills ORDER BY display_order ASC"),
    ])

    const categories = categoriesResult.rows.map((cat) => {
      const skills = skillsResult.rows.filter((s) => s.category_id === cat.id)
      return {
        ...cat,
        skills,
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching skills from Turso:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}
