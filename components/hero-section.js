import Link from "next/link"
// Note: Image component is removed as we focus on a text-based banner
// import Image from "next/image"

export default function HeroSection() {
  return (
    // Added min-h-[70vh] and flex utilities for vertical centering
    <section className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white min-h-[70vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        {/* Using a more banner-like placeholder aspect ratio */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-15 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"></div>
      </div>

      {/* Adjusted padding and text alignment */}
      <div className="container mx-auto px-4 py-16 relative z-10 text-center">
        {/* Removed grid layout, centering content */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Discover Your Cosmic Connection</h1>
          <p className="text-lg md:text-xl mb-10 text-purple-100">
            Explore our collection of astrology-inspired products designed to help you connect with the universe and embrace your celestial journey.
          </p>
          {/* Centered buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#products" // Link to product section on the same page (adjust if needed)
              className="px-8 py-3 bg-white text-indigo-900 rounded-md font-semibold hover:bg-purple-100 transition-colors text-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/our-story" // Link to the Our Story page
              className="px-8 py-3 border border-white text-white rounded-md font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              Our Story
            </Link>
          </div>
        </div>
        {/* Removed the illustration div */}
      </div>
    </section>
  );
}
