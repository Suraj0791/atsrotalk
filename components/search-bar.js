"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(term); // Pass the search term up to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search products..."
        value={term}
        onChange={handleInputChange}
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-500 hover:text-indigo-600"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
