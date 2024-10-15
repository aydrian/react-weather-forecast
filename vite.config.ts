import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implentation: "sass"
      }
    }
  },
  root: "src",
  build: {
    outDir: "../dist"
  }
});
