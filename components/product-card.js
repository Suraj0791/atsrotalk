"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "../context/cart-context"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image_url || `/api/placeholder?width=400&height=400`}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

