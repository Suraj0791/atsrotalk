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
      {/* Overlay - Changed back to black */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>{" "}
      {/* Black overlay */}
      {/* Content Container - Positioned top-left */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-start pt-8 md:pt-12">
        {" "}
        {/* Align items start, added top padding */}
        {/* Text Content */}
        <div className="w-full text-left mb-4">
          {" "}
          {/* Added margin-bottom */}
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-800">
            {" "}
            {/* Dark Blue */}
            हर परेशानी का
          </h1>
          {/* Removed second H1 */}
        </div>
        {/* Logo Image - Adjusted size and position */}
        <div className="w-auto ml-12 -mt-4">
          {" "}
          {/* Added left margin, negative top margin */}
          <Image
            src="/samadhanhoga.jpg"
            alt="Samadhan Hoga Logo"
            width={400} // Increased size
            height={200} // Increased size
            className="object-contain mix-blend-lighten" // Blend mode
          />
        </div>
      </div>{" "}
      {/* Closing the main content container div */}
    </section>
  );
}
