import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { UserConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/graphql": path.resolve(__dirname, "src/graphql"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/store": path.resolve(__dirname, "src/store"),
      "@/utils": path.resolve(__dirname, "src/utils/"),
    },
  },
}) satisfies UserConfig;
