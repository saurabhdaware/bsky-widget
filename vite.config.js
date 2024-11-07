import { defineConfig } from "vite";
import { vitePluginAbell } from "abell";

export default defineConfig({
  plugins: [
    vitePluginAbell({
      experimentalAllowClientSide: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].js",
        entryFileNames: "[name].js",
      },
    },
  },
});
