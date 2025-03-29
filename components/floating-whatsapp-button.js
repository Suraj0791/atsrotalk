"use client";

import Link from 'next/link';
import { MessageSquare } from 'lucide-react'; // Using MessageSquare as placeholder

export default function FloatingWhatsAppButton() {
  const whatsappNumber = "917488612472"; // Country code included
  const whatsappMessage = encodeURIComponent("Hi i have a query");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      {/* You can replace MessageSquare with a dedicated WhatsApp icon if you install an icon library like react-icons */}
      <MessageSquare size={24} />
    </Link>
  );
}
