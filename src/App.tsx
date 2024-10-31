import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "./graphql/queries";
import Banner from "./assets/banner.png";
import { ProductCard } from "./components/ProductCard";

function App() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: { id: 1 },
  });
  console.log(data);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full bg-[#6258AA] justify-center flex max-h-80">
          <img src={Banner} alt="" className="object-cover" />
        </div>
        <div className="flex flex-col max-w-7xl max-auto items-center">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <p>Total {data?.products?.length} Products</p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
                {data.products?.map((product, index) => {
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
