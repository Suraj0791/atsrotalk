import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchProducts({
  page = 1,
  limit = 12,
  minPrice = 0,
  maxPrice = 100000,
  sortBy = "newest",
  featured = false,
}) {
  const offset = (page - 1) * limit

  let query = supabase.from("products").select("*", { count: "exact" }).gte("price", minPrice).lte("price", maxPrice)

  if (featured) {
    query = query.eq("featured", true)
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

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching products:", error)
    throw error
  }

  return { data, count }
}

export async function getProductById(id) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

