import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false,
  treeshake: false,
  target: "node18",
  outDir: "dist",
  minify: false,
  cjsInterop: false,
});
