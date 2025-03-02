"use client"

import { useCart } from "../context/cart-context"
import Link from "next/link"
import Image from "next/image"

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateCartItem, removeFromCart, cartTotal } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <h2 className="text-lg font-medium">Shopping Cart</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="mt-4 text-gray-600">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b">
                      <div className="h-16 w-16 relative flex-shrink-0">
                        <Image
                          src={item.image_url || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700 mr-2"
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span className="text-gray-900 font-medium mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t px-4 py-6">
                <div className="flex justify-between">
                  <p className="text-gray-900 font-medium">Subtotal</p>
                  <p className="text-gray-900 font-medium">${cartTotal.toFixed(2)}</p>
                </div>
                <Link
                  href="/checkout"
                  className="mt-4 w-full bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

