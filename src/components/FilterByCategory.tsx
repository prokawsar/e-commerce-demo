import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const FilterByCategory = () => {
  const { data: categories } = useQuery(GET_ALL_CATEGORY);
  const [activeCategory, setActiveCategory] = useState("all");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [location.search]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const queryParams = new URLSearchParams(location.search);
    if (category === "all") {
      queryParams.delete("category");
      setSearchParams(queryParams);
    } else {
      queryParams.set("category", category.split(" ").join("-").toLowerCase());
      setSearchParams(queryParams);
    }
    console.log(searchParams);
  };

  return (
    <div
      className="flex flex-row gap-2 w-full overflow-auto px-3"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        onClick={() => handleCategoryChange("all")}
        className={`px-2 py-1 bg-gray-100 rounded-full ${
          activeCategory == "all" ? "bg-gray-600 text-white" : "text-gray-500"
        }`}
      >
        <p className="whitespace-nowrap ">All</p>
      </button>
      {categories?.categories?.map(
        (category: { name: string }, index: number) => {
          return (
            <button
              onClick={() => handleCategoryChange(category.name)}
              key={index}
              className={`px-2 py-1 bg-gray-100 rounded-full ${
                activeCategory ==
                category.name.split(" ").join("-").toLowerCase()
                  ? "!bg-gray-600 !text-white"
                  : "text-gray-500"
              }`}
            >
              <p className="whitespace-nowrap ">{category.name}</p>
            </button>
          );
        }
      )}
    </div>
  );
};
