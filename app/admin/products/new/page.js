"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminProductForm from "@/components/admin-product-form"
import { createProduct } from "@/lib/admin"
import { checkAdminAuth } from "@/lib/admin-auth"

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check admin authentication
    checkAdminAuth()
      .then((isAdmin) => {
        if (!isAdmin) {
          router.push("/admin")
        }
        setLoading(false)
      })
      .catch(() => {
        router.push("/admin")
      })
  }, [router])

  const handleSubmit = async (productData) => {
    try {
      await createProduct(productData)
      router.push("/admin")
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Failed to create product. Please try again.")
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
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <AdminProductForm onSubmit={handleSubmit} />
    </div>
  )
}

