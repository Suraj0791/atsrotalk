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
        <ProductImageGallery images={[product.image_url]} />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-indigo-600 font-semibold mb-6">₹{product.price.toFixed(2)}</p>

          <div className="prose max-w-none mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto">
            <AddToCartButton product={product} />

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
              <p className="text-gray-600 mb-4">
                Free shipping on all orders over ₹1000. Delivery within 5-7 business days.
              </p>

              <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
              <p className="text-gray-600">30-day return policy. Please contact us for return shipping details.</p>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}

