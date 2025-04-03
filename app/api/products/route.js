import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { isAdminRequest } from "@/lib/admin-auth"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export async function GET(request) {
  const isAdmin = await isAdminRequest(request)
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  // Use a larger default limit for admin, but still allow overriding via query param if needed
  const defaultLimit = isAdmin ? 1000 : 12
  const limit = Number.parseInt(searchParams.get("limit") || defaultLimit.toString())
  const minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
  const maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "100000")
  const sortBy = searchParams.get("sortBy") || "newest"
  const currentProductId = searchParams.get("currentProductId")

  const offset = (page - 1) * limit

  let query = supabase.from("products").select("*", { count: "exact" }).gte("price", minPrice).lte("price", maxPrice)

  // If currentProductId is provided, fetch related products
  if (currentProductId) {
    query = query.neq("id", currentProductId)
  }

  // Apply sorting
  if (sortBy === "newest") {
    query = query.order("created_at", { ascending: false })
  } else if (sortBy === "oldest") {
    query = query.order("created_at", { ascending: true })
  } else if (sortBy === "price-low") {
    query = query.order("price", { ascending: true })
  } else if (sortBy === "price-high") {
    query = query.order("price", { ascending: false })
  }

  // Apply pagination only for non-admin requests
  if (!isAdmin) {
    query = query.range(offset, offset + limit - 1)
  }
  // For admin requests, we don't apply .range(), fetching all matching results

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}

export async function POST(request) {
  // Check admin authentication
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate required fields - check for image_urls array
    if (!body.name || !body.price || !body.description || !body.image_urls || !Array.isArray(body.image_urls) || body.image_urls.length === 0) {
      return NextResponse.json({ error: "Missing required fields, including at least one image URL in image_urls array" }, { status: 400 })
    }

    // Insert product into database
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: body.name,
          description: body.description,
          price: body.price,
          image_urls: body.image_urls, // Use image_urls array
          usage: body.usage || null, // Include usage if provided
          category: body.category || 'regular', // Include category if provided
          stock: body.stock || 0,
          featured: body.featured || false,
        },
      ])
      .select()

    if (error) {
      console.error("Error creating product:", error)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json({ product: data[0] }, { status: 201 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
