import { lazy, StrictMode, Suspense } from "react";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { graphQlClient } from "@/graphql/main.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Error from "./error.tsx";
import { Layout } from "./layout.tsx";
import Loader from "@/components/Loader.tsx";

const ProductDetails = lazy(() => import("./pages/product/index.tsx"));
const Checkout = lazy(() => import("./pages/checkout/index.tsx"));

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
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetails />,
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <Checkout />,
          </Suspense>
        ),
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
