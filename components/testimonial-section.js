import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Aarav Patel",
    role: "Astrology Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The products from this shop have truly enhanced my astrological practice. The quality is unmatched!",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Professional Astrologer",
    image: "/placeholder.svg?height=100&width=100",
    quote: "As a professional astrologer, I highly recommend this shop. Their attention to detail is impressive.",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    role: "Meditation Instructor",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The celestial-themed products have added a new dimension to my meditation sessions. Truly cosmic!",
  },
]

const TestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection

