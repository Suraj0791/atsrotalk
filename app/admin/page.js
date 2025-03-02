"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin-login"
import AdminProductList from "@/components/admin-product-list"
import { verifyAdminKey } from "@/lib/admin"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if admin key exists in localStorage
    const adminKey = localStorage.getItem("adminKey")
    if (adminKey) {
      verifyAdminKey(adminKey)
        .then((isValid) => {
          setIsAuthenticated(isValid)
          setLoading(false)
        })
        .catch(() => {
          setIsAuthenticated(false)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = async (key) => {
    setLoading(true)
    try {
      const isValid = await verifyAdminKey(key)
      if (isValid) {
        localStorage.setItem("adminKey", key)
        setIsAuthenticated(true)
      } else {
        alert("Invalid admin key")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminKey")
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isAuthenticated ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          <AdminProductList />
        </>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  )
}

