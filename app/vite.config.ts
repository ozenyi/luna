import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: { "@domain": fileURLToPath(new URL("../server/src/domain", import.meta.url)) },
  },
  build: {
    outDir: "../v2",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
  },
});
