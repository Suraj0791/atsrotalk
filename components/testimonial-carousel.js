"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

// Re-using the same testimonial data structure
const testimonials = [
  {
    id: 1,
    name: "Aarav Patel",
    role: "Astrology Enthusiast",
    image: "/placeholder.svg?height=100&width=100", // Use placeholder or actual image paths
    quote: "The products from this shop have truly enhanced my astrological practice. The quality is unmatched!",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Professional Astrologer",
    image: "/placeholder.svg?height=100&width=100",
    quote: "As a professional astrologer, I highly recommend this shop. Their attention to detail is impressive.",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    role: "Meditation Instructor",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The celestial-themed products have added a new dimension to my meditation sessions. Truly cosmic!",
  },
  // Add more testimonials if needed
];

export default function TestimonialCarousel() {
  // Initialize Embla Carousel with Autoplay plugin
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        {/* Embla Carousel container */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla slides container */}
          <div className="flex">
            {testimonials.map((testimonial) => (
              // Each slide needs flex-shrink-0, flex-grow-0 and basis (e.g., basis-full for one slide, basis-1/2 for two, etc.)
              <div key={testimonial.id} className="flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 min-w-0 pl-4">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col"> {/* Ensure consistent height */}
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"} // Fallback placeholder
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4 flex-shrink-0" // Prevent image shrinking
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
