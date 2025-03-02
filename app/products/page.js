"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"
import ProductSort from "@/components/product-sort"
import Pagination from "@/components/pagination"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortOption, setSortOption] = useState("newest")

  const productsPerPage = 12

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const { data, count } = await fetchProducts({
          page: currentPage,
          limit: productsPerPage,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sortBy: sortOption,
        })

        setProducts(data)
        setTotalPages(Math.ceil(count / productsPerPage))
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [currentPage, priceRange, sortOption])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange)
    setCurrentPage(1)
  }

  const handleSortChange = (option) => {
    setSortOption(option)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Celestial Collection</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4">
          <ProductFilter priceRange={priceRange} onPriceChange={handlePriceChange} />
        </div>

        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{loading ? "Loading products..." : `Showing ${products.length} products`}</p>
            <ProductSort value={sortOption} onChange={handleSortChange} />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No products found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

