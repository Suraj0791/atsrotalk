"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/cart-context";
import { Phone, MessageSquare } from "lucide-react"; // Import icons

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const whatsappNumber = "917488612472"; // Remove '+' for the link
  const whatsappMessage = encodeURIComponent("Hi i have a query");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const phoneLink = `tel:+917488612472`;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block relative">
        {/* Adjusted aspect ratio for 1600x899 images -> approx 16:9 */}
        <div className="aspect-video overflow-hidden">
          {/* Using layout="responsive" might be better for varying container sizes */}
          <Image
            src={product.image_url || `/placeholder.svg?width=400&height=225`} // Adjusted placeholder size
            alt={product.name}
            width={1600} // Original width
            height={899} // Original height
            layout="responsive" // Makes image scale within the container
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

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
