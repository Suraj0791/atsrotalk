"use client"

import { useState } from "react"
import Image from "next/image"

const ProductImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="relative h-96 w-full">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Selected product image"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
              selectedImage === image ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Product image ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery

