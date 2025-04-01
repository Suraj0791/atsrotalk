"use client" // Make it a client component for state management

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { fetchProducts } from "../lib/supabase"
import ProductCard from "../components/product-card"; // Use ProductCard directly
import HeroSection from "../components/hero-section";
import Pagination from "../components/pagination"; // Import Pagination
// import TestimonialCarousel from "../components/testimonial-carousel"; // Import the static carousel
import MovingTestimonialCarousel from "../components/moving-testimonial-carousel"; // Import the moving carousel

const PRODUCTS_PER_PAGE = 8; // Define how many products per page

export default function Home() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const { data, count } = await fetchProducts({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
        })
        setProducts(data || [])
        setTotalPages(Math.ceil(count / PRODUCTS_PER_PAGE))
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([]) // Reset products on error
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [currentPage]) // Re-fetch when currentPage changes

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0) // Scroll to top on page change
  }

return (
  <main className="min-h-screen">
    <HeroSection /><section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Discover Celestial Treasures</h2>
      <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Explore our handpicked collection of astrology-inspired products designed to help you connect with the cosmos
          and embrace your celestial journey.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </section>

      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Align With The Stars</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Our products are crafted with intention, designed to help you harness the power of the cosmos in your daily
            life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* Using a generic icon placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Materials</h3>
              <p>Ethically sourced and crafted with attention to astrological timing.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 {/* Using a generic icon placeholder */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Astrological Expertise</h3>
              <p>Created by experienced astrologers with deep cosmic knowledge.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 {/* Using a generic icon placeholder */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cosmic Delivery</h3>
              <p>Fast shipping to bring celestial energy to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Replace static carousel with the moving one */}
      <MovingTestimonialCarousel />
    </main>
  );
}
