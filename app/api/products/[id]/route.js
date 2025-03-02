import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { isAdminRequest } from "@/lib/admin-auth"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export async function GET(request, { params }) {
  const { id } = params

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(request, { params }) {
  // Check admin authentication
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update product in database
    const { data, error } = await supabase
      .from("products")
      .update({
        name: body.name,
        description: body.description,
        price: body.price,
        image_url: body.image_url,
        stock: body.stock || 0,
        featured: body.featured || false,
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error("Error updating product:", error)
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  // Check admin authentication
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

