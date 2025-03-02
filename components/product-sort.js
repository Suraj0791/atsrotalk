export default function ProductSort({ value, onChange }) {
  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-sm font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  )
}

