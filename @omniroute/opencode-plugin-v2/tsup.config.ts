import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false,
  treeshake: false,
  target: "node22",
  outDir: "dist",
  minify: false,
  cjsInterop: false,
  noExternal: ["zod"],
});
