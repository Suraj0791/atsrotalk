import Link from "next/link";
import Image from "next/image"; // Import Image component

export default function HeroSection() {
  return (
    // Restored video background, adjusted min-height
    <section className="relative text-white min-h-[70vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/samadhanhoga.jpg" // Added poster attribute
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/homepage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 z-10"></div>

      {/* Content Container - Increased z-index, adjusted for left alignment */}
      <div className="relative z-20 container mx-auto px-4 flex items-start pt-16 md:pt-24"> {/* Added padding-top */}
        {/* Text Content - Takes full width, aligned left */}
        <div className="w-full text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-yellow-300"> {/* Line 1 */}
            हर परेशानी का
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white"> {/* Line 2 */}
            SAMADHAN HOGA
          </h1>
          {/* Vision text removed from here */}
        </div> {/* Closing the text content div */}
      </div> {/* Closing the main content container div */}
    </section>
  );
}
