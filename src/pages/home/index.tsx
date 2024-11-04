import { useLazyQuery, useQuery } from "@apollo/client";
import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "@/graphql/queries";
import Banner from "../../assets/banner.png";
import { FilterByCategory } from "@/components/FilterByCategory";
import { useCallback, useEffect, useState } from "react";
import { Category, Product } from "@/graphql/types";
import Loader from "@/components/Loader";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters from "@/components/ProductFilters";
import { toast } from "sonner";
import { useSyncCartWithUser } from "@/hooks/useSyncCartWithUser";
import ErrorMessage from "@/components/ErrorMessage";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    loading,
    data: allProducts,
    error,
  } = useQuery(GET_ALL_PRODUCTS, { errorPolicy: "all" });
  const [getbycategory, { loading: filtering }] = useLazyQuery(
    GET_PRODUCTS_BY_CATEGORY
  );
  const [filterProducts] = useLazyQuery(FILTER_PRODUCTS);

  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState<{ products: Product[] }>({
    products: [],
  });
  const [sortDirection, setSortDirection] = useState(
    searchParams.get("sort") || ""
  );

  useSyncCartWithUser();

  const handleSort = useCallback((direction: string) => {
    setSortDirection(direction);
  }, []);

  const handleApplyFilters = async (filters: {
    price_min?: number;
    price_max?: number;
    categoryId?: number;
  }) => {
    try {
      const { data } = await filterProducts({
        variables: filters,
      });

      setProducts(data);
    } catch {
      toast.error("Error filtering products");
    }
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleCategoryChange = useCallback(
    async (category: Category) => {
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
    },
    [allProducts, searchParams]
  );

  const handleReset = () => {
    searchParams.delete("price_min");
    searchParams.delete("price_max");
    searchParams.delete("sort");
    searchParams.delete("category");
    setSortDirection("");
    setSearchParams(searchParams);
    handleCategoryChange({
      id: "all",
    });
  };

  useEffect(() => {
    const id = searchParams.get("category") || "all";
    if (id != "all") {
      handleCategoryChange({ id });
    } else if (!loading) {
      setProducts(allProducts);
    }
  }, [loading]);

  if (error) return <ErrorMessage message={error.message} />;

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
            sortDirection={sortDirection}
            onReset={handleReset}
            onSort={handleSort}
            isLoading={loading || filtering}
            onApplyFilters={handleApplyFilters}
          />
          <FilterByCategory
            filtering={filtering}
            onChangeCategory={handleCategoryChange}
          />

          {loading || filtering ? (
            <Loader />
          ) : (
            <ProductGrid
              sortDirection={sortDirection}
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

export default Home;
