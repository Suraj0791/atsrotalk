"use client"

import { useState } from "react"

export default function AdminLogin({ onLogin }) {
  const [key, setKey] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onLogin(key)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Key
            </label>
            <input
              type="password"
              id="adminKey"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your admin key"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

