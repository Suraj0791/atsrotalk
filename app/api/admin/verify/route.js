import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.key) {
      return NextResponse.json({ error: "Missing admin key" }, { status: 400 })
    }

    const isValid = body.key === process.env.ADMIN_API_KEY

    return NextResponse.json({ isValid })
  } catch (error) {
    console.error("Error verifying admin key:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

