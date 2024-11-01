import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "../graphql/queries";

export const FilterByCategory = () => {
  const { data: categories } = useQuery(GET_ALL_CATEGORY);

  return (
    <div
      className="flex flex-row gap-2 w-full overflow-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <button className="px-2 py-1 bg-gray-100 rounded-xl">
        <p className="whitespace-nowrap text-gray-500">All</p>
      </button>
      {categories?.categories?.map((category, index) => {
        return (
          <button key={index} className="px-2 py-1 bg-gray-100 rounded-xl">
            <p className="whitespace-nowrap text-gray-500">{category.name}</p>
          </button>
        );
      })}
    </div>
  );
};
