import path from "path";
import { defineConfig } from "vite";
import { vitePluginAbell } from "abell";

const isLibBuild = process.env.LIB === "true";

/**
 * @type {import('vite').BuildOptions}
 */
const buildConfig = isLibBuild
  ? {
      lib: {
        entry: path.resolve(__dirname, "web-component/index.js"),
        name: "bsky-widget",
        fileName: "index",
        formats: ["es"],
      },
      copyPublicDir: false,
    }
  : {
      outDir: "static",
    };

export default defineConfig({
  plugins: [
    vitePluginAbell({
      experimentalAllowClientSide: true,
    }),
  ],
  build: buildConfig,
});
