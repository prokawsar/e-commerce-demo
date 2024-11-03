import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    include: ["**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@/pages": resolve(__dirname, "src/pages"),
      "@/components": resolve(__dirname, "src/components"),
      "@/graphql": resolve(__dirname, "src/graphql"),
      "@/hooks": resolve(__dirname, "src/hooks"),
      "@/store": resolve(__dirname, "src/store"),
      "@/utils": resolve(__dirname, "src/utils/"),
    },
  },
});
