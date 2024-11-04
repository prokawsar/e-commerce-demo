import { createBrowserRouter } from "react-router-dom";
import Error from "./error.tsx";
import { Layout } from "./layout.tsx";
import Loader from "@/components/Loader.tsx";
import { Suspense, lazy } from "react";
import Home from "@/pages/home/index.tsx";

const ProductDetails = lazy(() => import("@/pages/product/index.tsx"));
const Checkout = lazy(() => import("@/pages/checkout/index.tsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        errorElement: <Error />,
        index: true,
        element: <Home />,
      },
      {
        errorElement: <Error />,
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
