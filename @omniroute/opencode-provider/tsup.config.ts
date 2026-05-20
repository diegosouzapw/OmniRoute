import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false,
  treeshake: true,
  target: "node20",
  outDir: "dist",
  minify: false,
});

// CJS consumers should prefer named imports (`require(pkg).createOmniRouteProvider`).
// The `default` export is also exposed for ESM ergonomics, which makes tsup warn
// about mixed exports — that's expected and harmless for this package.
