import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed-database"

export async function GET(request) {
  const adminKey = request.headers.get("X-Admin-Key")

  if (adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await seedDatabase()
    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

