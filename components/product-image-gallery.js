"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Import icons for buttons

const ProductImageGallery = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }); // Enable looping
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Ensure images is always an array, provide a placeholder if empty
  const validImages = Array.isArray(images) && images.length > 0
    ? images
    : ["/placeholder.svg"];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi]);

  // Update selected index and scroll snaps when the carousel initializes or updates
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect(); // Set initial index
    };

    const onResize = () => {
       setScrollSnaps(emblaApi.scrollSnapList());
       onSelect(); // Re-check index on resize
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('init', onInit);
    emblaApi.on('reInit', onInit); // Handle reinitialization
    emblaApi.on('resize', onResize); // Handle resize

    // Call init manually if already initialized (e.g., hot reload)
    if (emblaApi.scrollSnapList().length > 0) {
       onInit();
    }

    // Cleanup listeners on unmount
    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('init', onInit);
        emblaApi.off('reInit', onInit);
        emblaApi.off('resize', onResize);
      }
    };
  }, [emblaApi]);


  return (
    <div className="relative w-full">
      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        {/* Embla Container */}
        <div className="flex">
          {/* Embla Slides */}
          {validImages.map((image, index) => (
            <div className="relative flex-[0_0_100%] aspect-video" key={index}> {/* Changed aspect-square to aspect-video (16:9) */}
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0} // Prioritize loading the first image
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Optional) */}
      {validImages.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity disabled:opacity-30"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity disabled:opacity-30"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dot Indicators (Optional) */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full ${
                index === selectedIndex ? 'bg-white ring-1 ring-gray-500' : 'bg-gray-400 opacity-70'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImageGallery;
