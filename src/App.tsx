import { useLazyQuery, useQuery } from "@apollo/client";
import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "@/graphql/queries";
import Banner from "./assets/banner.png";
import { FilterByCategory } from "@/components/FilterByCategory";
import { useEffect, useState } from "react";
import { Category, Product } from "@/graphql/types";
import Loader from "@/components/Loader";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters from "./components/ProductFilters";
import { sortByPrice } from "./utils/tools";
import { toast } from "sonner";

function App() {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState({
    name: "all",
    id: "all",
    image: "",
  });
  const [products, setProducts] = useState<{ products: Product[] }>({
    products: [],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, data: allProducts } = useQuery(GET_ALL_PRODUCTS);
  const [getbycategory, { loading: filtering }] = useLazyQuery(
    GET_PRODUCTS_BY_CATEGORY
  );
  const [filterProducts] = useLazyQuery(FILTER_PRODUCTS);
  const [sortDirection, setSortDirection] = useState<string>("");

  const handleSort = (direction: string) => {
    setSortDirection(direction);
    if (products?.products) {
      const sortedProducts = sortByPrice([...products.products], direction);
      setProducts({ products: sortedProducts });
    }
  };

  const handleApplyFilters = async (filters: {
    price_min?: number;
    price_max?: number;
  }) => {
    try {
      const { data } = await filterProducts({
        variables: filters,
      });

      if (sortDirection) handleSort(sortDirection);
      else setProducts(data);
    } catch (error) {
      toast.error("Error filtering products");
    }
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleCategoryChange = async (category: Category) => {
    setActiveCategory(category);

    if (category.id === "all") {
      searchParams.delete("category");
      setProducts(allProducts);
    } else {
      searchParams.set("category", category.id);
      const { data } = await getbycategory({
        variables: { id: Number(category.id) },
      });
      setProducts(data);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!loading) {
      setProducts(allProducts);
    }
  }, [allProducts, loading]);

  useEffect(() => {
    if (searchParams.size > 0) {
      const id = searchParams.get("category") || "";
      const sortDirection = searchParams.get("sort") || "";

      handleCategoryChange({
        name: "",
        id,
        image: "",
      });
      handleSort(sortDirection);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full relative bg-[#6258AA] justify-center flex max-h-80">
          <img src={Banner} alt="" className="object-cover" />
          <p className="hidden lg:flex absolute text-5xl text-white font-semibold bottom-10 left-[25%]">
            {products?.products?.length} Products on Sale !!!
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-7xl max-auto items-center">
          <ProductFilters
            onSort={handleSort}
            isLoading={loading || filtering}
            onApplyFilters={handleApplyFilters}
          />
          <FilterByCategory
            filtering={filtering}
            activeCategory={activeCategory}
            onChangeCategory={handleCategoryChange}
          />

          {loading || filtering ? (
            <Loader />
          ) : (
            <ProductGrid
              showAll={showAll}
              products={{ products: products.products }}
            />
          )}
          {!showAll && !loading && products.products?.length > 9 && (
            <button
              onClick={handleLoadMore}
              className="my-4 bg-yellow-400 py-2 px-4 rounded-full hover:bg-yellow-500"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
