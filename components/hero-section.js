import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative text-white min-h-[70vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/samadhanhoga.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/homepage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-start pt-8 md:pt-12">
        {/* Wrap text & image together */}
        <div className="flex flex-col items-start gap-0 leading-none">
          {/* Text Content - Remove any extra spacing */}
          <h1 className="text-5xl md:text-7xl font-bold text-blue-600 m-0 p-0 leading-none"> {/* Increased font size, changed color */}
            हर परेशानी का
          </h1>
          {/* Added new text line */}
          <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 uppercase m-0 p-0 leading-none"> {/* Yellow, Bold, Uppercase */}
            SAMADHAN
          </h1>
          {/* Added HOGA below SAMADHAN, white color, and padding-left - Increased padding further */}
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase m-0 p-0 leading-none pl-80 md:pl-96"> {/* White, Bold, Uppercase, Padded Left - Further Increased Padding */}
            HOGA
          </h1>
        </div> {/* Closing the flex container for text */}
      </div> {/* Closing the relative z-20 container */}
    </section>
  );
}


// import Link from "next/link";
// import Image from "next/image"; // Import Image component

// export default function HeroSection() {
//   return (
//     // Restored video background, adjusted min-height
//     <section className="relative text-white min-h-[70vh] flex items-center overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         poster="/samadhanhoga.jpg" // Added poster attribute
//         className="absolute inset-0 w-full h-full object-cover z-0"
//       >
//         <source src="/homepage.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 z-10"></div>

//       {/* Content Container - Increased z-index, adjusted for left alignment */}
//       <div className="relative z-20 container mx-auto px-4 flex items-start pt-16 md:pt-24"> {/* Added padding-top */}
//         {/* Text Content - Takes full width, aligned left */}
//         <div className="w-full text-left">
//           <h1 className="text-4xl md:text-6xl font-bold mb-2 text-yellow-300"> {/* Line 1 */}
//             हर परेशानी का
//           </h1>
//           <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white"> {/* Line 2 */}
//             SAMADHAN HOGA
//           </h1>
//           {/* Vision text removed from here */}
//         </div> {/* Closing the text content div */}
//       </div> {/* Closing the main content container div */}
//     </section>
//   );
// }
