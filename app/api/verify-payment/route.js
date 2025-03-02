import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.orderId || !body.razorpay_payment_id || !body.razorpay_order_id || !body.razorpay_signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify signature
    const text = `${body.razorpay_order_id}|${body.razorpay_payment_id}`
    const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(text).digest("hex")

    if (generatedSignature !== body.razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Update order status in database
    const { error } = await supabase
      .from("orders")
      .update({
        status: "paid",
        payment_id: body.razorpay_payment_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.orderId)

    if (error) {
      console.error("Error updating order:", error)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

