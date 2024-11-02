import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "@/graphql/queries";
import Loader from "./Loader";
import { Category } from "@/graphql/types";
import CategoryButton from "@/components/CategoryButton";

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
  const categoryAll = {
    id: "all",
    name: "All",
    image: "",
  };

  return (
    <div
      className="flex flex-row gap-2 w-full overflow-auto px-3 min-h-6"
      style={{ scrollbarWidth: "none" }}
    >
      {loading || filtering ? (
        <Loader width="20px" />
      ) : (
        <>
          <CategoryButton
            key={"all"}
            isActive={activeCategory?.id == "all"}
            category={categoryAll}
            onClick={onChangeCategory}
          />

          {categories?.categories?.map((category: Category) => {
            return (
              <CategoryButton
                key={category.id}
                isActive={activeCategory?.id == category.id}
                category={category}
                onClick={onChangeCategory}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
