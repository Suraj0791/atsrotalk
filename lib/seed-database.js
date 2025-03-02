const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample product data
const products = [
  {
    name: "Celestial Crystal Ball",
    description:
      "A handcrafted crystal ball that captures the essence of the cosmos. Perfect for meditation and connecting with celestial energies.",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?auto=format&fit=crop&w=800&q=80",
    stock: 15,
    featured: true,
  },
  {
    name: "Zodiac Constellation Necklace",
    description: "Wear your zodiac constellation close to your heart with this delicate sterling silver necklace.",
    price: 499.99,
    image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    stock: 50,
    featured: true,
  },
  {
    name: "Astrology Birth Chart Journal",
    description:
      "A beautifully designed journal with space to record your birth chart and daily astrological reflections.",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    stock: 100,
    featured: false,
  },
  {
    name: "Moon Phase Wall Hanging",
    description:
      "Track the lunar cycle with this elegant wooden moon phase wall hanging, handcrafted from sustainable materials.",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    featured: true,
  },
  {
    name: "Planetary Incense Set",
    description:
      "A set of seven incense blends, each corresponding to the energy of a different planet in our solar system.",
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    stock: 75,
    featured: false,
  },
  {
    name: "Astrologer's Telescope",
    description:
      "A high-quality telescope for observing the stars and planets, with a guidebook on astrological significance.",
    price: 4999.99,
    image_url: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=800&q=80",
    stock: 5,
    featured: true,
  },
  {
    name: "Zodiac Candle Set",
    description: "A set of twelve scented candles, each crafted to embody the essence of a zodiac sign.",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    featured: false,
  },
  {
    name: "Celestial Tea Collection",
    description: "A collection of twelve herbal teas, each blended to align with the energy of a specific zodiac sign.",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=800&q=80",
    stock: 60,
    featured: false,
  },
  {
    name: "Astrological Tapestry",
    description: "A large, intricately designed tapestry featuring the zodiac wheel and celestial bodies.",
    price: 799.99,
    image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    stock: 20,
    featured: false,
  },
  {
    name: "Cosmic Meditation Cushion",
    description:
      "A comfortable meditation cushion with a cosmic design to help you connect with the universe during your practice.",
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    featured: false,
  },
  {
    name: "Astrology Reference Library",
    description:
      "A collection of five essential astrology books covering natal charts, transits, and planetary influences.",
    price: 1499.99,
    image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    stock: 15,
    featured: false,
  },
  {
    name: "Celestial Bath Salts",
    description:
      "Luxurious bath salts infused with essential oils and charged under the full moon for spiritual cleansing.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1570211776045-af3a51026f4a?auto=format&fit=crop&w=800&q=80",
    stock: 100,
    featured: false,
  },
  {
    name: "Zodiac Gemstone Collection",
    description: "A set of twelve gemstones, each corresponding to a zodiac sign, presented in a wooden display box.",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    featured: true,
  },
  {
    name: "Astrological Calendar",
    description: "A beautifully illustrated wall calendar marking important astrological events throughout the year.",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80",
    stock: 200,
    featured: false,
  },
  {
    name: "Planetary Gong Set",
    description: "A set of seven small gongs, each tuned to the frequency associated with a different planet.",
    price: 2999.99,
    image_url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    featured: false,
  },
  {
    name: "Astrology Software License",
    description: "Professional astrology software for creating detailed birth charts and forecasts.",
    price: 1999.99,
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stock: 50,
    featured: false,
  },
  {
    name: "Cosmic Energy Pendulum",
    description: "A handcrafted pendulum made from celestite crystal, known for its connection to cosmic energies.",
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?auto=format&fit=crop&w=800&q=80",
    stock: 35,
    featured: false,
  },
  {
    name: "Zodiac Essential Oil Set",
    description:
      "A collection of twelve essential oil blends, each formulated to enhance the qualities of a zodiac sign.",
    price: 699.99,
    image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    featured: false,
  },
  {
    name: "Astrology Reading Session",
    description: "A gift card for a one-hour personal astrology reading with an experienced astrologer.",
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
    stock: 100,
    featured: true,
  },
  {
    name: "Moon Phase Earrings",
    description: "Elegant sterling silver earrings depicting the eight phases of the moon.",
    price: 449.99,
    image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    stock: 60,
    featured: false,
  },
]

async function seedDatabase() {
  console.log("Starting database seeding...")

  try {
    // Clear existing products
    console.log("Clearing existing products...")
    const { error: deleteError } = await supabase.from("products").delete().not("id", "is", null)

    if (deleteError) {
      console.error("Error clearing products:", deleteError)
      return
    }

    // Insert new products
    console.log("Inserting sample products...")
    const { data, error } = await supabase.from("products").insert(products).select()

    if (error) {
      console.error("Error inserting products:", error)
      return
    }

    console.log(`Successfully seeded database with ${data.length} products`)
  } catch (error) {
    console.error("Error during seeding:", error)
  }
}

// Run the seeding function
seedDatabase()
  .catch(console.error)
  .finally(() => {
    console.log("Seeding process completed")
    process.exit(0)
  })







  