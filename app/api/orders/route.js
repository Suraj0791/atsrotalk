import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Razorpay from "razorpay"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.items || !body.total_amount || !body.shipping_details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(body.total_amount * 100), // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
    })

    // Insert order into database
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          items: body.items,
          total_amount: body.total_amount,
          shipping_details: body.shipping_details,
          status: "pending",
          razorpay_order_id: razorpayOrder.id,
        },
      ])
      .select()

    if (error) {
      console.error("Error creating order:", error)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    return NextResponse.json(
      {
        order: data[0],
        razorpayOrder,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request) {
  // Check admin authentication
  const { searchParams } = new URL(request.url)
  const adminKey = searchParams.get("adminKey")

  if (adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }

  return NextResponse.json(data)
}

