import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "@/graphql/queries";
import Loader from "./Loader";
import { Category } from "@/graphql/types";

type FilterByCategoryType = {
  filtering?: boolean;
  activeCategory: Category | null;
  onChangeCategory: (category: Category) => void;
};

export const FilterByCategory = ({
  filtering,
  activeCategory,
  onChangeCategory,
}: FilterByCategoryType) => {
  const { data: categories, loading } = useQuery(GET_ALL_CATEGORY);

  return (
    <div
      className="flex flex-row gap-2 w-full overflow-auto px-3 min-h-6"
      style={{ scrollbarWidth: "none" }}
    >
      {loading || filtering ? (
        <Loader width="20px" />
      ) : (
        <>
          <button
            onClick={() =>
              onChangeCategory({ id: "all", name: "all", image: "" })
            }
            className={`px-2 py-1 bg-gray-100 rounded-full ${
              activeCategory?.id == "all"
                ? "bg-gray-600 text-white"
                : "text-gray-500"
            }`}
          >
            <p className="whitespace-nowrap ">All</p>
          </button>
          {categories?.categories?.map((category: Category, index: number) => {
            return (
              <button
                onClick={() => onChangeCategory(category)}
                key={index}
                className={`px-2 py-1 bg-gray-100 rounded-full ${
                  activeCategory?.id == category.id
                    ? "!bg-gray-600 !text-white"
                    : "text-gray-500"
                }`}
              >
                <p className="whitespace-nowrap ">{category.name}</p>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
};
