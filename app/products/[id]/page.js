import { notFound } from "next/navigation"
import { getProductById } from "@/lib/supabase"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductImageGallery from "@/components/product-image-gallery"
import RelatedProducts from "@/components/related-products"

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Pass the image_urls array directly */}
        <ProductImageGallery images={product.image_urls || []} />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-indigo-600 font-semibold mb-6">₹{product.price.toFixed(2)}</p>

          <div className="prose max-w-none mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto pt-6"> {/* Adjusted padding */}
            <AddToCartButton product={product} />

            {/* Removed Shipping and Return Policy sections */}
          </div>
        </div>
      </div>

      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}
