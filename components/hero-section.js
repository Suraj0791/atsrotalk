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

      {/* Content Container - Increased z-index */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Logo Image */}
        <div className="md:w-1/4 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <Image
            src="/samadhanhoga.jpg" // Use the provided logo path
            alt="Samadhan Hoga Logo"
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
            className="object-contain mx-auto md:mx-0" // Center on mobile, left-align on desktop
          />
        </div>

        {/* Text Content */}
        <div className="md:w-3/4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300"> {/* Logo Text */}
            हर परेशानी का <span className="text-white">SAMADHAN hoga</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6"> {/* Subheading */}
            Vision of Samadhan Hoga
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mb-4"> {/* Vision Paragraph 1 */}
            At Samadhan Hoga, we envision a world where astrology is not just a mystical art but a guiding force for personal empowerment and transformation. Our goal is to help individuals align with their true potential by offering deeply personalized astrology-based products that bring clarity, positivity, and balance to their lives.
          </p>
          <p className="text-lg md:text-xl max-w-3xl"> {/* Vision Paragraph 2 */}
            We believe that every individual’s journey is unique, and through the power of astrology, we provide meaningful solutions tailored to their needs.
          </p>
        </div> {/* Closing the text content div */}
      </div> {/* Closing the main content container div */}
    </section>
  );
}
