/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    coverage: {
      provider: "istanbul",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      },
    },
  },
});
