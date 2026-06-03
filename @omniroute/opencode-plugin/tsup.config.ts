import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false,
  treeshake: false,
  target: "node22",
  outDir: "dist",
  minify: false,
  cjsInterop: true,
  // Bundle runtime deps so the .tgz / npm install is self-contained.
  // `zod` is required at runtime by the options schema and would otherwise
  // need a peer install when the plugin is loaded directly from a file path
  // in opencode.jsonc.
  noExternal: ["zod"],
});
