import Image from "next/image";
// Removed import for TestimonialSection as it's now on the homepage carousel
// import TestimonialSection from "@/components/testimonial-section";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section for Our Story */}
      <section className="relative bg-gradient-to-r from-blue-800 to-cyan-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-cyan-700/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Cosmic Journey</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Discover the story behind Astrology Shop and our mission to connect you with the universe.
          </p>
        </div>
      </section>

      {/* Story Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">From Stardust to Shop</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Welcome to Astrology Shop, born from a lifelong fascination with the stars and the profound wisdom they hold. Our journey began not just as a business idea, but as a personal quest to understand the intricate dance between the cosmos and our lives here on Earth.
            </p>
            <p>
              We believe that astrology is more than just horoscopes; it's a language of the universe, offering insights into our potential, challenges, and the unique path we're meant to walk. We felt a calling to create a space where others could access tools and resources to deepen their own connection to this ancient wisdom.
            </p>
            <figure className="my-8">
              <Image
                src="/placeholder.svg?height=400&width=600" // Replace with a relevant image if available
                alt="Cosmic illustration"
                width={600}
                height={400}
                className="rounded-lg mx-auto"
              />
              <figcaption className="text-center text-sm text-gray-500 mt-2">The universe inspires everything we do.</figcaption>
            </figure>
            <p>
              Each product in our shop is carefully curated or crafted with intention. We seek out authentic materials, collaborate with knowledgeable astrologers, and infuse every item with positive energy. Our goal is to provide you with meaningful objects that serve as anchors to your celestial journey, whether you're a seasoned practitioner or just beginning to explore the wonders of astrology.
            </p>
            <p>
              Thank you for being part of our story. We're honored to share this cosmic adventure with you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section Removed */}
      {/* <TestimonialSection /> */}
    </div>
  );
}
