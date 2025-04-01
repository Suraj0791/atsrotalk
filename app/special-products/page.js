import React from 'react';

export default function SpecialProductsPage() {
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
          <source src="/special products.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Our Special Products</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Unique items and services crafted with astrological insights for your specific needs.
          </p>
        </div>
      </section>

      {/* Special Products Listing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Special Products</h2>
        {/* Placeholder for Special Products - Fetch and display relevant products here */}
        <div className="text-center text-gray-500 py-16 border border-dashed border-gray-300 rounded-lg">
          <p className="text-xl mb-4">Special Products Coming Soon!</p>
          <p>Discover unique astrological items and services tailored just for you.</p>
          {/* Add product fetching/display logic here later */}
        </div>
      </section>
    </main>
  );
}
