"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

// Accept testimonials as a prop
export default function TestimonialCarousel({ testimonials = [] }) { // Default to empty array
  // Initialize Embla Carousel with Autoplay plugin
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  // Handle case where no testimonials are provided
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <p>No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Title is now handled by the parent page (OurStoryPage) */}
        {/* <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2> */}
        {/* Embla Carousel container */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla slides container */}
          <div className="flex">
            {/* Use the passed-in testimonials prop */}
            {testimonials.map((testimonial, index) => ( // Use index for key if no unique id
              // Each slide needs flex-shrink-0, flex-grow-0 and basis (e.g., basis-full for one slide, basis-1/2 for two, etc.)
              <div key={testimonial.author || index} className="flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 min-w-0 pl-4">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col"> {/* Ensure consistent height */}
                  {/* Assuming testimonials passed from OurStoryPage don't have image/role */}
                  {/* You might want to adjust this part if the data structure differs */}
                  <div className="mb-4">
                     {/* If you add images/roles to the OurStoryPage data, uncomment and adjust this */}
                     {/* <Image
                       src={testimonial.image || "/placeholder.svg"} // Fallback placeholder
                       alt={testimonial.author}
                       width={50}
                       height={50}
                       className="rounded-full mr-4 float-left" // Example positioning
                     /> */}
                     <h3 className="font-semibold">{testimonial.author}</h3>
                     {/* <p className="text-sm text-gray-600">{testimonial.role}</p> */}
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
