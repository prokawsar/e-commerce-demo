import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { graphQlClient } from "./graphql/main.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Error from "./error.tsx";
import { Layout } from "./layout.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <ApolloProvider client={graphQlClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
