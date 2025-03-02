"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import CheckoutForm from "@/components/checkout-form"
import OrderSummary from "@/components/order-summary"
import { createOrder } from "@/lib/orders"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Redirect to products page if cart is empty
    if (cart.length === 0) {
      router.push("/products")
    }

    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [cart, router])

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = async (shippingDetails) => {
    setLoading(true)
    setError(null)

    try {
      // Create order in database
      const orderData = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: calculateTotal(),
        shipping_details: shippingDetails,
        status: "pending",
      }

      const { order, razorpayOrder } = await createOrder(orderData)

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Astrology Shop",
        description: "Purchase of astrology products",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          // Verify payment and update order
          const result = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          if (result.ok) {
            clearCart()
            router.push(`/order-confirmation/${order.id}`)
          } else {
            setError("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        theme: {
          color: "#4F46E5",
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      console.error("Checkout error:", err)
      setError("Failed to process checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CheckoutForm onSubmit={handleCheckout} loading={loading} />
        <OrderSummary cart={cart} />
      </div>
    </div>
  )
}

