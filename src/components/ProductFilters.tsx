import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  sortDirection: string;
  onApplyFilters: (filters: { price_min?: number; price_max?: number }) => void;
  isLoading?: boolean;
  onReset?: () => void;
  onSort: (direction: string) => void;
}

export default function ProductFilters({
  sortDirection,
  onApplyFilters,
  onReset,
  isLoading,
  onSort,
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("price_min") || "",
    max: searchParams.get("price_max") || "",
  });

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDirection = e.target.value;

    if (newDirection) {
      searchParams.set("sort", newDirection);
    } else {
      searchParams.delete("sort");
    }

    setSearchParams(searchParams);
    onSort(newDirection);
  };

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const filters: {
      price_min?: number;
      price_max?: number;
      categoryId?: number;
    } = {};

    if (priceRange.min) {
      filters.price_min = parseFloat(priceRange.min);
      searchParams.set("price_min", priceRange.min);
    } else {
      searchParams.delete("price_min");
    }

    if (priceRange.max) {
      filters.price_max = parseFloat(priceRange.max);
      searchParams.set("price_max", priceRange.max);
    } else {
      searchParams.delete("price_max");
    }
    const categoryId = searchParams.get("category");
    if (categoryId) {
      filters.categoryId = parseFloat(categoryId);
    }

    setSearchParams(searchParams);
    onApplyFilters(filters);
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 p-3 md:px-0">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-row items-center w-full px-3 gap-3">
          <label className="whitespace-nowrap mr-7 md:mr-0">Sort by</label>
          <select
            className="px-2 border rounded py-1 w-full md:w-fit"
            value={sortDirection}
            onChange={handleSortChange}
          >
            <option value="">Select</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <div className="flex flex-row items-center px-3 gap-3">
          <label className="whitespace-nowrap">Price range</label>
          <input
            type="number"
            name="min"
            placeholder="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
            className="md:w-14 border p-1 rounded w-full"
            min={0}
          />
          <input
            type="number"
            name="max"
            placeholder="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            className="md:w-14 border p-1 rounded w-full"
            min={0}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <button
          onClick={handleApplyFilters}
          disabled={isLoading}
          className="bg-yellow-400 rounded-full px-4 py-1 hover:bg-yellow-500 text-sm disabled:bg-yellow-200 disabled:cursor-not-allowed"
        >
          {isLoading ? "Applying..." : "Apply"}
        </button>
        <button
          onClick={() => {
            setPriceRange({ min: "", max: "" });
            return onReset ? onReset() : "";
          }}
          disabled={isLoading}
          className="bg-gray-200 rounded-full px-4 py-1 hover:bg-gray-300 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
