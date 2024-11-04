import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "@/graphql/queries";
import Loader from "@/components/Loader";
import { Category } from "@/graphql/types";
import CategoryButton from "@/components/CategoryButton";
import { categoryAll } from "@/utils/tools";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

type FilterByCategoryType = {
  filtering?: boolean;
  onChangeCategory: (category: Category) => void;
};

export const FilterByCategory = ({
  filtering,
  onChangeCategory,
}: FilterByCategoryType) => {
  const { data: categories, loading } = useQuery(GET_ALL_CATEGORY);
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(categoryAll);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 400;

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const id = searchParams.get("category") || "all";
    setActiveCategory({ id });
  }, [searchParams]);

  return (
    <div className="relative flex flex-row gap-2 w-full px-2 min-h-6">
      {loading || filtering ? (
        <Loader width="20px" />
      ) : (
        <>
          <button
            onClick={scrollLeft}
            className="hidden md:block hover:bg-gray-50"
          >
            <Icon icon="mdi:chevron-left" width="22px" />
          </button>

          <div
            ref={containerRef}
            className="flex flex-row overflow-auto h-full gap-2 px-1 mr-0 md:mr-7"
            style={{ scrollbarWidth: "none" }}
          >
            <CategoryButton
              key={"all"}
              isActive={activeCategory?.id == "all"}
              category={categoryAll}
              onClick={() => {
                setActiveCategory(categoryAll);
                onChangeCategory(categoryAll);
              }}
            />

            {categories?.categories?.map((category: Category) => {
              return (
                <CategoryButton
                  key={category.id}
                  isActive={activeCategory?.id == category.id}
                  category={category}
                  onClick={() => {
                    setActiveCategory(category);
                    onChangeCategory(category);
                  }}
                />
              );
            })}
          </div>

          <button
            className="hidden absolute right-2 h-full md:block hover:bg-gray-50"
            onClick={scrollRight}
          >
            <Icon icon="mdi:chevron-right" width="22px" />
          </button>
        </>
      )}
    </div>
  );
};
