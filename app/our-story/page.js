import Image from "next/image";
import TestimonialCarousel from "@/components/testimonial-carousel"; // Assuming this component exists and can accept testimonials data

// New Testimonial Data based on user input
const testimonials = [
  { quote: "Product quality is definitely good. I ordered Hanuman gadha from samadhan hoga after receiving good feedback from one of my family member. So I am second person trying their product from my family. Glad to let all know in review section - samadhan hoga products are really good! My experience with them is so far good. You will receive quality product.", author: "Sunita Sharma" },
  { quote: "सबसे अच्छा और भरोसेमंद जरूर खरीदे। धन्यवाद समाधान होगा", author: "रुशित कुमार" }, // Rushit Kumar
  { quote: "Beautiful. Mai bahut khush hun ki yaha par achhi quality ke or achhe price par siddh kiye hue products milte h. I am very thankful dhanyawad 🙏", author: "Madhur Shrivastava" },
  { quote: "I bought icchapurti sankh from samadhan hoga and wo siddh krke bheja hai . mereko quality boht satisfactory lagi . samadhan hoga me har cheez ka sollution hai mere saare relatives bhi yahi se products mangwate hai apni personalized problems ke liye .", author: "Pankaj Arora" },
  { quote: "Great quality . Delivery was quick. Feeling the change in my life after wearing it. Really satisfied with the order. Just you guys need work on customer order tracking Id and else. Otherwise everything else is very good and smooth.", author: "Shilpi Thakur" }, // Abhimantrit Hanuman Dhaga review
  { quote: "Very best 100% original product. I liked it so much😊. I had ordered suraksha chakra prepaid and really this is original I'm very happy. I received this within 3 days from bluedart and also got a calendar. Thanks to samadhan hoga and team.", author: "Sneha Rastogi" },
  { quote: "Genuine product khreedne se pehele jo bhi mere doubts the wo sab samadhan hoga ki team ne callpr clear kr diye the support team is really nice love the service. thanku samadhan hoga and team .", author: "Aditya Bansal" },
  { quote: "Vashikaran shankh order kri maine . packaging is too good and product ko use krne ka bhi pura explaination sath me aata hai . jbse maine ye prdocuts use krna shuru kre hai mereko apni life me boht improvements feel ho rhe hai.", author: "Suman Malhotra" },
  { quote: "Samadhan hoga celebrates the wonders of special abhimantrit products by connecting people with their beauty, energy, and purpose. Blending ancient wisdom with modern aspirations, we envision samadhan hoga as the world’s most trusted and inspiring destination for products personalized for your specific problems . Whether you seek spiritual alignment, personal growth, or facing any kind of issues or hurdles in your life, we are here to guide you. samadhan hoga ke products abhimantrit isiliye mujhe ye sabse best solution lagta hai apni saari problems ke liye", author: "Ritu Chawla" }
];


export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* --- About Us Section (Video Background) --- */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden">
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
          <source src="/about us.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-amber-300">About Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
            {/* Who Are We */}
            <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-amber-400">Who Are We</h2>
              <p className="text-gray-200 leading-relaxed text-sm"> {/* Adjusted text size */}
                At Samadhan Hoga, we are more than just a brand—we are a guiding force that blends ancient astrological wisdom with modern personalization to bring meaningful solutions to people&apos;s lives.
                <br/><br/>
                We are a team of passionate astrologers, spiritual advisors, and product designers dedicated to making astrology an accessible and practical tool for everyone. With deep-rooted knowledge in Vedic astrology, numerology, and cosmic energy sciences, we craft personalized astrology-based products that help individuals navigate life&apos;s challenges and unlock their true potential.
              </p>
            </div>
            {/* Our Mission */}
            <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-amber-400">Our Mission</h2>
              <p className="text-gray-200 leading-relaxed text-sm"> {/* Adjusted text size */}
                At Samadhan Hoga, our mission is to empower individuals with personalized astrological solutions that bring clarity, positivity, and balance to their lives. We strive to bridge the gap between ancient wisdom and modern living, making astrology accessible, practical, and deeply transformative for everyone.
                <br/><br/>
                We are dedicated to providing Personalized Solutions – Offering custom astrology-based products tailored to individual needs.
              </p>
            </div>
            {/* What We Do */}
            <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-amber-400">What We Do</h2>
              <p className="text-gray-200 leading-relaxed text-sm"> {/* Adjusted text size */}
                At Samadhan Hoga, we specialize in offering personalized astrology-based solutions that help individuals navigate life’s challenges, unlock opportunities, and achieve overall well-being. We bring the power of Vedic astrology, numerology, and spiritual sciences into everyday life through carefully curated products and designed for transformation and success.
                <br/><br/>
                Through a combination of ancient wisdom and modern personalization, we ensure that each product and service is tailored to the unique needs of our customers. Our goal is to help individuals harness the power of astrology to bring peace, prosperity, and positivity into their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Story Section (Video Beside Text) --- */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Video Column */}
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-xl order-last md:order-first"> {/* Video on left for medium screens up */}
             <video
               controls // Added controls for user interaction
               playsInline
               className="w-full h-full object-cover"
               poster="/placeholder.svg" // Optional poster image
             >
               {/* Use the correct video file name */}
               <source src="/ourstory.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
          </div>
          {/* Text Column */}
          <div className="prose prose-lg max-w-none text-gray-700 order-first md:order-last"> {/* Text on right */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p>
              Samadhan Hoga was born from a deep belief that astrology is not just about predictions—it&apos;s about solutions. Our journey began when we saw countless people struggling with life&apos;s uncertainties, seeking guidance but often feeling lost in the complexities of traditional astrology.
            </p>
            <p>
              We asked ourselves: What if astrology could be simplified? What if personalized astrological remedies could be easily accessible, reliable, and truly effective?
            </p>
            <p>
              With this vision, we set out to create Samadhan Hoga, a brand that blends ancient astrological wisdom with modern convenience. Our mission was clear: to provide personalized astrological products that empower individuals to take control of their destiny.
            </p>
            <p>
              From a small initiative helping close friends and family, we grew into a trusted name, serving thousands who seek authentic astrological solutions. Today, we continue to craft each product with precision, intention, and spiritual integrity, ensuring that every remedy aligns perfectly with the cosmic energies of the individual.
            </p>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-50 to-orange-50">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Words from Our Community</h2>
            {/* Pass the new testimonials data to the carousel component */}
            <TestimonialCarousel testimonials={testimonials} />
         </div>
      </section>

    </div>
  );
}
