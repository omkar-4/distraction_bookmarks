import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist", // Ensure it's set to the Electron's dist path
  },
  server: {
    port: 5173, // Ensure the dev server matches Electron's URL
  },
});
