"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getProductById } from "@/lib/supabase"
import AdminProductForm from "@/components/admin-product-form"
import { updateProduct } from "@/lib/admin"
import { checkAdminAuth } from "@/lib/admin-auth"

export default function EditProductPage({ params }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check admin authentication
    const checkAuth = async () => {
      const isAdmin = await checkAdminAuth()
      if (!isAdmin) {
        router.push("/admin")
        return
      }

      // Fetch product data
      try {
        const productData = await getProductById(params.id)
        if (!productData) {
          router.push("/admin")
          return
        }
        setProduct(productData)
      } catch (error) {
        console.error("Error fetching product:", error)
        router.push("/admin")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [params.id, router])

  const handleSubmit = async (productData) => {
    try {
      await updateProduct(params.id, productData)
      router.push("/admin")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <AdminProductForm product={product} onSubmit={handleSubmit} />
    </div>
  )
}

