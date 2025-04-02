"use client"; // Required for useEffect and state if we were using them, good practice for interactive components

import React from "react";

const testimonials = [
  {
    quote:
      "Product quality is definitely good I ordered Hanuman gadha from samadhan hoga after receiving good feedback from one of my family member. So I am second person trying their product from my family. Glad to let all know in review section - samadhan hoga products are really good! My experience with them is so far good. You will receive quality product.",
    author: "sunita sharma",
  },
  {
    quote: "सबसे अच्छा और भरोसेमंद जरूर खरीदे। धन्यवाद समाधान होगा",
    author: "रुशित कुमार",
  },
  {
    quote:
      "Beautiful Mai bahut khush hun ki yaha par achhi quality ke or achhe price par siddh kiye hue products milte h. I am very thankful dhanyawad 🙏",
    author: "madhur shrivastava",
  },
  {
    quote:
      "i bought icchapurti sankh from samadhan hoga and wo siddh krke bheja hai . mereko quality boht satisfactory lagi . samadhan hoga me har cheez ka sollution hai mere saare relatives bhi yahi se products mangwate hai apni personalized problems ke liye .",
    author: "pankaj arora",
  },
  {
    quote:
      "abhimantrit hanuman dhaga Great quality . Delivery was quick. Feeling the change in my life after wearing it. Really satisfied with the order. Just you guys need work on customer order tracking Id and else. Otherwise everything else is very good and smooth.",
    author: "shilpi thakur",
  },
  {
    quote:
      "Genuine Very best 100% original product. I liked it so much😊. I had ordered suraksha chakra prepaid and really this is original I'm very happy. I received this within 3 days from bluedart and also got a calendar. Thanks to samadhan hoga and team.",
    author: "sneha rastogi",
  },
  {
    quote:
      "product khreedne se pehele jo bhi mere doubts the wo sab samadhan hoga ki team ne callpr clear kr diye the support team is really nice love the service. thanku samadhan hoga and team .",
    author: "aditya bansal",
  },
  {
    quote:
      "vashikaran shankh order kri maine . packaging is too good and product ko use krne ka bhi pura explaination sath me aata hai . jbse maine ye prdocuts use krna shuru kre hai mereko apni life me boht improvements feel ho rhe hai.",
    author: "suman malhotra",
  },
  {
    quote:
      "Samadhan hoga celebrates the wonders of special abhimantrit products by connecting people with their beauty, energy, and purpose. Blending ancient wisdom with modern aspirations, we envision samadhan hoga as the world’s most trusted and inspiring destination for products personalized for your specific problems . Whether you seek spiritual alignment, personal growth, or facing any kind of issues or hurdles in your life, we are here to guide you. samadhan hoga ke products abhimantrit isiliye mujhe ye sabse best solution lagta hai apni saari problems ke liye",
    author: "ritu chawla",
  },
];

// Duplicate testimonials for a smoother infinite scroll illusion
const duplicatedTestimonials = [...testimonials, ...testimonials];

const MovingTestimonialCarousel = () => {
  return (
    <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-orange-700">
          Voices of Our Community
        </h2>
        <div className="relative w-full h-64">
          {" "}
          {/* Adjust height as needed */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center animate-marquee whitespace-nowrap">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="inline-block bg-white p-6 rounded-lg shadow-lg mx-4 w-80 flex-shrink-0"
              >
                {" "}
                {/* Fixed width card */}
                <p className="text-gray-700 italic mb-4 text-sm whitespace-normal">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="text-right font-semibold text-orange-600">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingTestimonialCarousel;
