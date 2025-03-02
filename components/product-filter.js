"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"

export default function ProductFilter({ priceRange, onPriceChange }) {
  const [localRange, setLocalRange] = useState(priceRange)

  useEffect(() => {
    setLocalRange(priceRange)
  }, [priceRange])

  const handleRangeChange = (value) => {
    setLocalRange(value)
  }

  const handleApplyFilter = () => {
    onPriceChange(localRange)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          defaultValue={localRange}
          min={0}
          max={10000}
          step={100}
          value={localRange}
          onValueChange={handleRangeChange}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>₹{localRange[0]}</span>
          <span>₹{localRange[1]}</span>
        </div>
        <button
          onClick={handleApplyFilter}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}

