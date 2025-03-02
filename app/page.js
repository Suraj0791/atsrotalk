import Link from "next/link"
import Image from "next/image"
import { fetchProducts } from "../lib/supabase"
import FeaturedProducts from "../components/featured-products"
import HeroSection from "../components/hero-section"
import TestimonialSection from "../components/testimonial-section"

export default async function Home() {
  let featuredProducts = []
  try {
    const { data } = await fetchProducts({ limit: 4, featured: true })
    featuredProducts = data || []
  } catch (error) {
    console.error("Error fetching featured products:", error)
    // In case of error, featuredProducts will remain an empty array
  }

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Discover Celestial Treasures</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Explore our handpicked collection of astrology-inspired products designed to help you connect with the cosmos
          and embrace your celestial journey.
        </p>

        <FeaturedProducts products={featuredProducts} />

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
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
                <Image src="/placeholder.svg?height=40&width=40" alt="Quality" width={40} height={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Materials</h3>
              <p>Ethically sourced and crafted with attention to astrological timing.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/placeholder.svg?height=40&width=40" alt="Expertise" width={40} height={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Astrological Expertise</h3>
              <p>Created by experienced astrologers with deep cosmic knowledge.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/placeholder.svg?height=40&width=40" alt="Shipping" width={40} height={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cosmic Delivery</h3>
              <p>Fast shipping to bring celestial energy to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
    </main>
  )
}

