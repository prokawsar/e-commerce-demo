import { useQuery } from "@apollo/client";
import reactLogo from "./assets/react.svg";
import { GET_PRODUCTS_BY_CATEGORY } from "./graphql/queries";

function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { id: 1 },
  });
  console.log(data);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {loading ? (
          "Loading..."
        ) : (
          <p>Total {data?.products?.length} Products</p>
        )}
      </div>
    </>
  );
}

export default App;
