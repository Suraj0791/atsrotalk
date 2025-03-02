import Link from "next/link"
import { notFound } from "next/navigation"
import { getOrderById } from "@/lib/orders"
import OrderDetails from "@/components/order-details"

export default async function OrderConfirmationPage({ params }) {
  const order = await getOrderById(params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="border-t border-b py-4 mb-6">
          <p className="text-center">
            Order ID: <span className="font-semibold">{order.id}</span>
          </p>
        </div>

        <OrderDetails order={order} />

        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-600">A confirmation email has been sent to your email address.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

