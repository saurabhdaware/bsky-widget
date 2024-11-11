import path from "path";
import { defineConfig, BuildOptions, PluginOption } from "vite";
import { vitePluginAbell } from "abell";

const isLibBuild = process.env.LIB === "true";

const buildConfig: BuildOptions = isLibBuild
  ? {
      lib: {
        entry: path.resolve(__dirname, "web-component/index.ts"),
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
    // abell uses vite 4.4 internally since vite is dependency to abell right now
    vitePluginAbell({ experimentalAllowClientSide: true }) as PluginOption,
  ],
  build: buildConfig,
});
