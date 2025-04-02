"use client";

import { useState, useEffect } from "react"; // Import useEffect
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useCart } from "../context/cart-context";
import CartDrawer from "./cart-drawer";
import SearchBar from "./search-bar"; // Import SearchBar
import { ShoppingCart, Menu } from "lucide-react"; // Remove Search from here

export default function Header() {
  const { cartItemCount } = useCart();
  const router = useRouter(); // Initialize router
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Add isClient state

  useEffect(() => {
    setIsClient(true); // Set isClient to true after mount
  }, []);

  // Handle search submission
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-transparent shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                ✨ Astrology Shop
              </span>{" "}
              {/* Changed text color */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              href="/packages"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              सिद्ध किये पैकेज {/* Changed text */}
            </Link>
            <Link
              href="/special-products"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              सिद्ध किये उत्पाद {/* Changed text */}
            </Link>
            <Link
              href="/our-story"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Our Story
            </Link>
          </nav>

          {/* Right side icons and search */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              {" "}
              {/* Hide on mobile initially */}
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {isClient &&
                cartItemCount > 0 && ( // Conditionally render based on isClient
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-4">
            {/* Search Bar in Mobile Menu */}
            <div className="px-4">
              <SearchBar
                onSearch={(term) => {
                  handleSearch(term);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2">
              <Link
                href="/packages"
                className="block px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                सिद्ध किये पैकेज {/* Changed text */}
              </Link>
              <Link
                href="/special-products"
                className="block px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                सिद्ध किये उत्पाद {/* Changed text */}
              </Link>
              <Link
                href="/our-story"
                className="block px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Story
              </Link>
            </nav>
          </div>
        )}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
