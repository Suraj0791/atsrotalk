import Link from "next/link"
// Note: Image component is removed as we focus on a text-based banner
// import Image from "next/image"

export default function HeroSection() {
  return (
    // Added min-h-[70vh] and flex utilities for vertical centering
    <section className="relative text-white min-h-[70vh] flex items-center overflow-hidden"> {/* Removed gradient from section, added overflow-hidden */}
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/placeholder.svg" // Optional poster image
      >
        {/* Use the correct video file name */}
        <source src="/homepage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 z-10"></div> {/* Ensure overlay is above video */}

      {/* Text overlay removed */}
    </section>
  );
}
