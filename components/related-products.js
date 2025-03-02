"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"

const RelatedProducts = ({ currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = React.useState([])
  const { addToCart } = useCart()

  React.useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products?limit=4&currentProductId=${currentProductId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch related products")
        }
        const { data } = await response.json()
        setRelatedProducts(data)
      } catch (error) {
        console.error("Error fetching related products:", error)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId])

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <div className="relative h-48">
                <Image
                  src={product.image_url || "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              </Link>
              <p className="text-gray-600 mb-4">{product.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts

