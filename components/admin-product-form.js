"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { uploadImage } from "@/lib/admin"
import { X } from "lucide-react" // Icon for removing images

export default function AdminProductForm({ product, onSubmit }) {
  // --- State Updates ---
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || 0,
    featured: product?.featured || false,
    usage: product?.usage || "", // Added usage
    category: product?.category || "regular", // Added category
    image_urls: product?.image_urls || [], // Use image_urls array
  })

  const [imageFiles, setImageFiles] = useState([]) // Array for selected files
  const [imagePreviews, setImagePreviews] = useState([]) // Array for local previews
  const [existingImageUrls, setExistingImageUrls] = useState(product?.image_urls || []) // Keep track of already uploaded URLs
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  // --- Initialize previews from existing URLs ---
  useEffect(() => {
    setImagePreviews(existingImageUrls);
  }, [existingImageUrls]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // --- Handle Multiple Image Selection ---
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    if (files.length > 0) {
      setImageFiles(files); // Store the file objects
      const previews = files.map(file => URL.createObjectURL(file));
      // Combine existing URLs with new previews for display
      setImagePreviews([...existingImageUrls, ...previews]);
    }
     // Clear the input value so the same files can be selected again if needed
     e.target.value = null;
  }

  // --- Handle Uploading Multiple Images ---
  const handleUploads = async () => {
    if (imageFiles.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];
    try {
      // Upload each selected file
      for (const file of imageFiles) {
        const imageUrl = await uploadImage(file);
        uploadedUrls.push(imageUrl);
      }
      // Combine newly uploaded URLs with existing ones
      const allUrls = [...existingImageUrls, ...uploadedUrls];
      setFormData((prev) => ({
        ...prev,
        image_urls: allUrls,
      }));
      setExistingImageUrls(allUrls); // Update existing URLs
      setImageFiles([]); // Clear selected files after upload
      setImagePreviews(allUrls); // Update previews to show only uploaded URLs
      alert(`Successfully uploaded ${uploadedUrls.length} image(s).`);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload one or more images. Check console for details.");
    } finally {
      setUploading(false);
    }
  }

  // --- Handle Removing an Image (Existing or Preview) ---
  const handleRemoveImage = (indexToRemove) => {
    // Determine if it's an existing URL or a new preview based on index
    if (indexToRemove < existingImageUrls.length) {
      // Removing an already uploaded image URL
      const updatedExistingUrls = existingImageUrls.filter((_, index) => index !== indexToRemove);
      setExistingImageUrls(updatedExistingUrls);
      setFormData((prev) => ({ ...prev, image_urls: updatedExistingUrls }));
      setImagePreviews(updatedExistingUrls); // Update previews
    } else {
       // This case is tricky because previews combine existing + new.
       // For simplicity now, we only allow removing *uploaded* images.
       // To remove *newly selected* files before upload, we'd need more complex state management.
       alert("To remove newly selected images, please re-select the desired files.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if files were selected but not uploaded
    if (imageFiles.length > 0) {
      alert("You have selected new images. Please click 'Upload Selected Images' first.");
      return;
    }

    // Ensure at least one image URL exists
    if (formData.image_urls.length === 0) {
        alert("Please upload at least one product image.");
        return;
    }


    setLoading(true)
    try {
      // Pass the formData which now includes the image_urls array
      await onSubmit({
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Name --- */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* --- Description --- */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

           {/* --- Usage --- */}
           <div className="md:col-span-2">
            <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-1">
              Usage (Optional)
            </label>
            <textarea
              id="usage"
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* --- Price --- */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* --- Stock --- */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

           {/* --- Category --- */}
           <div>
             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
               Category
             </label>
             <select
               id="category"
               name="category"
               value={formData.category}
               onChange={handleChange}
               required
               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
             >
               <option value="regular">Regular</option>
               <option value="package">Package</option>
               <option value="special">Special</option>
               {/* Add more categories as needed */}
             </select>
           </div>


          {/* --- Featured --- */}
          <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Product
              </label>
            </div>


          {/* --- Image Upload Section --- */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>

            {/* Display Image Previews */}
            <div className="mb-4 flex flex-wrap gap-4">
              {imagePreviews.map((previewUrl, index) => (
                <div key={index} className="relative h-24 w-24 border rounded-md overflow-hidden group">
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                   {/* Show remove button only for existing/uploaded images */}
                   {index < existingImageUrls.length && (
                     <button
                       type="button"
                       onClick={() => handleRemoveImage(index)}
                       className="absolute top-0 right-0 m-1 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       aria-label="Remove image"
                     >
                       <X size={14} />
                     </button>
                   )}
                </div>
              ))}
            </div>

            {/* File Input and Upload Button */}
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="image"
                accept="image/*"
                multiple // Allow multiple file selection
                onChange={handleImageChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />

              {imageFiles.length > 0 && ( // Show upload button only if new files are selected
                <button
                  type="button"
                  onClick={handleUploads}
                  disabled={uploading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {uploading ? `Uploading ${imageFiles.length}...` : `Upload Selected (${imageFiles.length})`}
                </button>
              )}
            </div>

             {formData.image_urls.length > 0 && imageFiles.length === 0 && (
                <p className="mt-2 text-sm text-green-600">{formData.image_urls.length} image(s) ready.</p>
             )}
             {imageFiles.length > 0 && (
                <p className="mt-2 text-sm text-orange-600">{imageFiles.length} new image(s) selected. Please upload.</p>
             )}
             {formData.image_urls.length === 0 && imageFiles.length === 0 && (
                 <p className="mt-2 text-sm text-red-600">No images selected or uploaded.</p>
             )}
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading || imageFiles.length > 0} // Disable if loading, uploading, or files pending upload
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  )
}
