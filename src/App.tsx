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
              <div className="flex flex-row w-full gap-4">
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
                <button className="bg-orange-300 rounded-full px-4 hover:bg-orange-400 text-sm">
                  Apply
                </button>
              </div>
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
