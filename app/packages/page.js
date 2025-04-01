import React from 'react';

export default function PackagesPage() {
  return (
    <main className="min-h-screen">
      {/* Video Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="/placeholder.svg" // Optional poster image
        >
          <source src="/packages.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Our Curated Packages</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Tailored collections designed to enhance your astrological journey and well-being.
          </p>
        </div>
      </section>

      {/* Packages Product Listing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Packages</h2>
        {/* Placeholder for Package Products - Fetch and display relevant products here */}
        <div className="text-center text-gray-500 py-16 border border-dashed border-gray-300 rounded-lg">
          <p className="text-xl mb-4">Package Products Coming Soon!</p>
          <p>We are currently curating the best astrological packages for you.</p>
          {/* Add product fetching/display logic here later */}
        </div>
      </section>
    </main>
  );
}
