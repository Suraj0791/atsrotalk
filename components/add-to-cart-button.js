"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setQuantity(value > 0 ? value : 1)
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <label htmlFor="quantity" className="mr-4 font-medium">
          Quantity:
        </label>
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border-r hover:bg-gray-100"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center py-1 focus:outline-none"
          />
          <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 border-l hover:bg-gray-100">
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}

