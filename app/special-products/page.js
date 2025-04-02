"use client"; // Make it a client component for state management

import { useState, useEffect } from "react";
import { fetchProducts } from "../../lib/supabase"; // Adjusted path
import ProductCard from "../../components/product-card"; // Adjusted path
import Pagination from "../../components/pagination"; // Adjusted path

const PRODUCTS_PER_PAGE = 12; // Match homepage or adjust as needed

export default function SpecialProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Fetch all products, no specific category filter
        const { data, count } = await fetchProducts({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          // No category filter here to show all products
        });
        setProducts(data || []);
        setTotalPages(Math.ceil(count / PRODUCTS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Reset products on error
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage]); // Re-fetch when currentPage changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <main className="min-h-screen">
      {/* Video Section (Kept from original) */}
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
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Optional overlay */}
        <div className="relative z-10 text-center text-white px-4">
          {/* Updated heading to match header link */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            सिद्ध किये उत्पाद
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore our complete collection of authentic astrological products.
          </p>
        </div>
      </section>

      {/* All Products Listing Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Updated heading */}
        <h2 className="text-3xl font-bold text-center mb-12">
          सभी सिद्ध किये उत्पाद
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Using the same grid layout as homepage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </section>
    </main>
  );
}
