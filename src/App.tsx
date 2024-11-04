import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { graphQlClient } from "@/graphql/client";
import { router } from "./router";

function App() {
  return (
    <ApolloProvider client={graphQlClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
