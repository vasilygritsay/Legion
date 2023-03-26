import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/base/variables.scss"; @import "@/assets/scss/base/mixins.scss";`,
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
  plugins: [vue(), svgLoader()],
});

