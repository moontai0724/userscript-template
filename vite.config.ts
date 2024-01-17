import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "path";
import { readdirSync } from "fs";

const alias = readdirSync(resolve(__dirname, "src/views")).reduce(
  (acc, value) => {
    acc[value] = resolve(__dirname, `src/views/${value}`);
    return acc;
  },
  {
    "@": resolve(__dirname, "src"),
  }
);

const pages = readdirSync(resolve(__dirname, "src/views/pages")).reduce(
  (acc, name) => {
    acc[name] = resolve(__dirname, `src/views/pages/${name}/index.html`);
    return acc;
  },
  {}
);

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/views",
  plugins: [vue(), viteSingleFile({ removeViteModuleLoader: true })],
  publicDir: false,
  resolve: {
    alias,
  },
  build: {
    rollupOptions: {
      input: pages,
    },
  },
});
