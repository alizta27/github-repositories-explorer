import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@styles": path.resolve(__dirname, "src/assets/styles"),
    },
  },
  base: "/github-repositories-explorer/",
});
