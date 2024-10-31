import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { graphQlClient } from "./graphql/main.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={graphQlClient}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
