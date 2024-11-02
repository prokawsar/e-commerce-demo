import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/graphql": path.resolve(__dirname, "src/graphql"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/store": path.resolve(__dirname, "src/store"),
        "@/utils": path.resolve(__dirname, "src/utils/"),
      },
    },
  };
});
