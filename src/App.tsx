import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "./graphql/queries";
import Banner from "./assets/banner.png";
import { ProductCard } from "./components/ProductCard";
import { FilterByCategory } from "./components/FilterByCategory";

function App() {
  const { loading, error, data: products } = useQuery(GET_ALL_PRODUCTS);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full bg-[#6258AA] justify-center flex max-h-80">
          <img src={Banner} alt="" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 max-w-7xl max-auto items-center">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <p>Total {products.products?.length} Products</p>
              <FilterByCategory />

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
                {products.products?.map((product, index) => {
                  return <ProductCard key={index} product={product} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
