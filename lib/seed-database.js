const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample product data with category and usage
const products = [
  {
    name: "Celestial Crystal Ball",
    description: "A handcrafted crystal ball that captures the essence of the cosmos.",
    usage: "Perfect for meditation, scrying, and connecting with celestial energies. Place in a sacred space.",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?auto=format&fit=crop&w=800&q=80",
    category: 'special', // Added category
    stock: 15,
    featured: true,
  },
  {
    name: "Zodiac Constellation Necklace (Package Deal)",
    description: "Wear your zodiac constellation close to your heart. Includes necklace and matching earrings.",
    usage: "Accessorize daily or during astrological events. Makes a great gift.", // Added usage
    price: 699.99, // Adjusted price for package
    image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    category: 'package', // Added category
    stock: 30, // Adjusted stock
    featured: true,
  },
  {
    name: "Astrology Birth Chart Journal",
    description: "A beautifully designed journal to record your birth chart and daily astrological reflections.",
    usage: "Use daily for self-reflection, tracking transits, and understanding your natal chart.", // Added usage
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 100,
    featured: false,
  },
  {
    name: "Moon Phase Wall Hanging",
    description: "Track the lunar cycle with this elegant wooden moon phase wall hanging.",
    usage: "Hang in your living space or bedroom to align with lunar energies.", // Added usage
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 25,
    featured: true,
  },
  {
    name: "Planetary Incense Set",
    description: "A set of seven incense blends, each corresponding to the energy of a different planet.",
    usage: "Burn during rituals, meditation, or to invoke specific planetary energies.", // Added usage
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 75,
    featured: false,
  },
  {
    name: "Astrologer's Telescope",
    description: "A high-quality telescope for observing the stars and planets, with guidebook.",
    usage: "Ideal for amateur astronomers and astrology enthusiasts for celestial observation.", // Added usage
    price: 4999.99,
    image_url: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=800&q=80",
    category: 'special', // Added category
    stock: 5,
    featured: true,
  },
  {
    name: "Zodiac Candle Set",
    description: "A set of twelve scented candles, each crafted to embody the essence of a zodiac sign.",
    usage: "Light the candle corresponding to the current zodiac season or your own sign.", // Added usage
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80",
    category: 'package', // Added category
    stock: 30,
    featured: false,
  },
  {
    name: "Celestial Tea Collection",
    description: "A collection of twelve herbal teas, each blended to align with zodiac energy.",
    usage: "Enjoy a cup daily or select based on astrological alignments.", // Added usage
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 60,
    featured: false,
  },
  {
    name: "Astrological Tapestry",
    description: "A large, intricately designed tapestry featuring the zodiac wheel.",
    usage: "Wall hanging for home decor, meditation space, or altar backdrop.", // Added usage
    price: 799.99,
    image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 20,
    featured: false,
  },
  {
    name: "Cosmic Meditation Cushion",
    description: "A comfortable meditation cushion with a cosmic design.",
    usage: "Enhance your meditation practice and connect with the universe.", // Added usage
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 40,
    featured: false,
  },
  {
    name: "Astrology Reference Library (Package)",
    description: "A collection of five essential astrology books.",
    usage: "Comprehensive resource for learning natal charts, transits, and planetary influences.", // Added usage
    price: 1499.99,
    image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    category: 'package', // Added category
    stock: 15,
    featured: false,
  },
  {
    name: "Celestial Bath Salts",
    description: "Luxurious bath salts infused with essential oils, charged under the full moon.",
    usage: "Use for spiritual cleansing baths and relaxation rituals.", // Added usage
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1570211776045-af3a51026f4a?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 100,
    featured: false,
  },
  {
    name: "Zodiac Gemstone Collection",
    description: "A set of twelve gemstones corresponding to zodiac signs, in a wooden display box.",
    usage: "Use for crystal grids, meditation, or carrying the stone for your sign.", // Added usage
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=800&q=80",
    category: 'special', // Added category
    stock: 25,
    featured: true,
  },
  {
    name: "Astrological Calendar",
    description: "A beautifully illustrated wall calendar marking important astrological events.",
    usage: "Track moon phases, retrogrades, and planetary ingresses throughout the year.", // Added usage
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 200,
    featured: false,
  },
  {
    name: "Planetary Gong Set",
    description: "A set of seven small gongs, each tuned to a planetary frequency.",
    usage: "Use in sound healing sessions or meditation to invoke planetary energies.", // Added usage
    price: 2999.99,
    image_url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80",
    category: 'special', // Added category
    stock: 8,
    featured: false,
  },
  {
    name: "Astrology Software License",
    description: "Professional astrology software for detailed birth charts and forecasts.",
    usage: "For professional astrologers or serious students needing advanced calculations.", // Added usage
    price: 1999.99,
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: 'special', // Added category
    stock: 50,
    featured: false,
  },
  {
    name: "Cosmic Energy Pendulum",
    description: "A handcrafted pendulum made from celestite crystal.",
    usage: "Use for divination, dowsing, and connecting with intuition.", // Added usage
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?auto=format&fit=crop&w=800&q=80", // Reusing image, replace if needed
    category: 'regular', // Added category
    stock: 35,
    featured: false,
  },
  {
    name: "Zodiac Essential Oil Set",
    description: "A collection of twelve essential oil blends formulated for each zodiac sign.",
    usage: "Use in diffusers, baths, or diluted for personal anointing.", // Added usage
    price: 699.99,
    image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    category: 'package', // Added category
    stock: 40,
    featured: false,
  },
  {
    name: "Astrology Reading Gift Card",
    description: "A gift card for a one-hour personal astrology reading.",
    usage: "Redeemable for a session with one of our experienced astrologers.", // Added usage
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
    category: 'special', // Added category
    stock: 100, // Represents available gift card slots/codes
    featured: true,
  },
  {
    name: "Moon Phase Earrings",
    description: "Elegant sterling silver earrings depicting the eight phases of the moon.",
    usage: "Stylish accessory for daily wear or special occasions.", // Added usage
    price: 449.99,
    image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    category: 'regular', // Added category
    stock: 60,
    featured: false,
  },
]

async function seedDatabase() {
  console.log("Starting database seeding...")

  try {
    // Clear existing products
    console.log("Clearing existing products...")
    // Important: Ensure RLS is disabled or the service key bypasses RLS for delete operations.
    const { error: deleteError } = await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000") // Match any valid UUID

    if (deleteError) {
      console.error("Error clearing products:", deleteError.message)
      // Decide if you want to return or continue if clearing fails
      // return;
    } else {
      console.log("Existing products cleared (if any).")
    }

    // Insert new products
    console.log(`Inserting ${products.length} sample products...`)
    // Batch insert for efficiency
    const { data, error } = await supabase.from("products").insert(products).select()

    if (error) {
      console.error("Error inserting products:", error.message)
      console.error("Details:", error.details)
      return
    }

    console.log(`Successfully seeded database with ${data?.length || 0} products`)
  } catch (error) {
    console.error("Error during seeding:", error)
  }
}

// Run the seeding function
seedDatabase()
  .catch(console.error)
  .finally(() => {
    console.log("Seeding process completed.")
    // Supabase client might keep the process alive, explicitly exit
    process.exit(0)
  })
