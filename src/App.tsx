import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_CATEGORY } from "@/graphql/queries";
import Banner from "./assets/banner.png";
import { FilterByCategory } from "@/components/FilterByCategory";
import { useEffect, useState } from "react";
import { Category, Product } from "@/graphql/types";
import Loader from "@/components/Loader";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";

function App() {
  const { loading, data: allProducts } = useQuery(GET_ALL_PRODUCTS);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState({
    name: "all",
    id: "all",
    image: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [getbycategory, { loading: filtering }] = useLazyQuery(
    GET_PRODUCTS_BY_CATEGORY
  );
  const [products, setProducts] = useState<{ products: Product[] }>({
    products: [],
  });

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleCategoryChange = async (category: Category) => {
    setActiveCategory(category);

    if (category.id === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
      setProducts(allProducts);
    } else {
      searchParams.set("category", category.id);
      setSearchParams(searchParams);
      const { data } = await getbycategory({
        variables: { id: Number(category.id) },
      });
      setProducts(data);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProducts(allProducts);
    }
  }, [allProducts, loading]);

  useEffect(() => {
    if (searchParams.size > 0) {
      const id = searchParams.get("category") || "";

      handleCategoryChange({
        name: "",
        id,
        image: "",
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full bg-[#6258AA] justify-center flex max-h-80">
          <img src={Banner} alt="" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 w-full max-w-7xl max-auto items-center">
          <p>Total {products?.products?.length} Products</p>
          <div className="flex flex-col md:flex-row w-full gap-4 px-3 md:px-0">
            <div className="flex flex-row gap-3">
              <div className="flex flex-row items-center px-3 gap-3">
                <label>Sort by</label>
                <select className="px-2 border rounded py-1">
                  <option>Select</option>
                  <option>By price</option>
                </select>
              </div>
              <div className="flex flex-row items-center px-3 gap-3">
                <label>Price range</label>
                <input
                  type="number"
                  placeholder="min"
                  className="w-14 border p-1 rounded"
                ></input>
                <input
                  type="number"
                  placeholder="max"
                  className="w-14 border p-1 rounded"
                ></input>
              </div>
            </div>

            <button className="bg-yellow-400 rounded-full px-4 py-1 hover:bg-yellow-500 text-sm">
              Apply
            </button>
          </div>
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
          {!showAll && !loading && products.products.length > 9 && (
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
