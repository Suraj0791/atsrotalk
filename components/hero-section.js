import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Discover Your Cosmic Connection</h1>
            <p className="text-lg md:text-xl mb-8 text-purple-100">
              Explore our collection of astrology-inspired products designed to help you connect with the universe and
              embrace your celestial journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-white text-indigo-900 rounded-md font-semibold hover:bg-purple-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="#about"
                className="px-6 py-3 border border-white text-white rounded-md font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse"></div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Astrology Illustration"
                width={400}
                height={400}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

