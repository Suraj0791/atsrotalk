import { Inter } from "next/font/google"
import "./globals.css"
import Header from "../components/header"
import Footer from "../components/footer";
import { CartProvider } from "../context/cart-context";
import Script from "next/script";
import FloatingWhatsAppButton from "../components/floating-whatsapp-button"; // Import the button

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Astrology Shop - Celestial Products",
  description: "Discover our collection of astrology-inspired products designed to help you connect with the cosmos.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
        <FloatingWhatsAppButton /> {/* Add the button here */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
