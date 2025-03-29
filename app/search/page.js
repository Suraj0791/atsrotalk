"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchProducts } from '@/lib/supabase';
import ProductCard from '@/components/product-card';
import Pagination from '@/components/pagination';

const PRODUCTS_PER_PAGE = 12; // Can adjust per-page limit for search results

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ''; // Get search query from URL

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      if (!query) {
        setProducts([]);
        setTotalPages(1);
        setTotalResults(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, count } = await fetchProducts({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          searchTerm: query, // Pass the search term here
        });
        setProducts(data || []);
        setTotalResults(count || 0);
        setTotalPages(Math.ceil((count || 0) / PRODUCTS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProducts([]);
        setTotalPages(1);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [query, currentPage]); // Re-fetch when query or page changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      {query && (
        <p className="text-gray-600 mb-8">
          Showing results for: <span className="font-semibold">{query}</span> ({totalResults} found)
        </p>
      )}

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
          {totalPages > 1 && (
             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 py-12">No products found matching your search criteria.</p>
      )}
    </div>
  );
}

// Wrap with Suspense because useSearchParams needs it
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>}>
      <SearchResults />
    </Suspense>
  );
}
