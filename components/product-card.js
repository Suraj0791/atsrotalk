"use client";

import { useState, useEffect, useRef } from "react"; // Import useState, useEffect, useRef
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/cart-context";
import { Phone, MessageSquare } from "lucide-react"; // Import icons

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null); // To store interval ID

  // Ensure image_urls is an array and has at least one image
  const imageSources = Array.isArray(product.image_urls) && product.image_urls.length > 0
    ? product.image_urls
    : [product.image_url || `/placeholder.svg?width=400&height=225`]; // Fallback to single image_url or placeholder

  const startImageRotation = () => {
    if (imageSources.length <= 1) return; // Don't rotate if only one image

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageSources.length
      );
    }, 1000); // Change image every 1 second (adjust as needed)
  };

  const stopImageRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0); // Reset to the first image when not hovering
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const whatsappNumber = "917488612472"; // Remove '+' for the link
  const whatsappMessage = encodeURIComponent("Hi i have a query");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const phoneLink = `tel:+917488612472`;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Image container with hover effects */}
      <div
        className="relative aspect-video overflow-hidden"
        onMouseEnter={startImageRotation}
        onMouseLeave={stopImageRotation}
      >
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          {/* Display the current image */}
          <Image
            // Use the current image source based on state
            src={imageSources[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            width={1600}
            height={899}
            layout="responsive"
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105" // Keep existing hover scale
            priority={currentImageIndex === 0} // Prioritize loading the first image
          />
        </Link>
        {/* Optional: Add dots or indicators for multiple images */}
        {imageSources.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {imageSources.map((_, index) => (
              <span
                key={index}
                className={`block h-1.5 w-1.5 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-gray-400 opacity-70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Flex-grow pushes footer content down */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2 flex-grow">{product.description}</p>

        {/* Display Usage if available */}
        {product.usage && (
           <div className="mt-2 mb-3">
             <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Usage</h4>
             <p className="text-gray-600 text-sm line-clamp-2">{product.usage}</p>
           </div>
        )}

        {/* Price and Add to Cart Button */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-indigo-700">₹{product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
          >
            Add to Cart
          </button>
        </div>

        {/* Contact Info Section */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
           <p className="text-xs text-gray-500 mb-2">Have any query?</p>
           <div className="flex justify-center items-center space-x-4">
             <a href={phoneLink} title="Call us" className="text-gray-600 hover:text-indigo-600 transition-colors">
               <Phone size={18} />
             </a>
             <a href={whatsappLink} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" className="text-gray-600 hover:text-green-600 transition-colors">
               {/* Using MessageSquare as WhatsApp placeholder */}
               <MessageSquare size={18} />
             </a>
           </div>
        </div>
      </div>
    </div>
  );
}
