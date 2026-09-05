import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
const nextConfigPath = path.join(repoRoot, "next.config.mjs");

async function loadNextConfig(label: string) {
  return import(`${pathToFileURL(nextConfigPath).href}?case=${label}-${Date.now()}`);
}

test("Tailwind scans only the UI source roots declared by OmniRoute (#12074 phase 1)", () => {
  const css = readFileSync(path.join(repoRoot, "src/app/globals.css"), "utf8");

  assert.match(
    css,
    /@import\s+"tailwindcss"\s+source\(none\);/,
    "automatic repository-wide Tailwind source detection must stay disabled"
  );
  assert.match(css, /@source\s+"\.\.\/app";/, "App Router components must stay scanned");
  assert.match(css, /@source\s+"\.\.\/shared";/, "shared UI components must stay scanned");
  assert.match(
    css,
    /@source\s+"\.\.\/\.\.\/node_modules\/fumadocs-ui\/dist\/\*\*\/\*\.js";/,
    "Fumadocs runtime classes must stay scanned"
  );
});

test("webpack dev keeps Next defaults instead of production vendor cache groups (#12074 phase 1)", async () => {
  const { default: nextConfig } = await loadNextConfig("dev-split-chunks");
  const originalSplitChunks = {
    chunks: "async",
    cacheGroups: {
      framework: { name: "framework" },
    },
  };
  const config = {
    context: repoRoot,
    ignoreWarnings: [],
    optimization: { splitChunks: originalSplitChunks },
    plugins: [],
  };

  nextConfig.webpack(config, {
    dev: true,
    isServer: false,
    defaultLoaders: { babel: {} },
    webpack: {},
  });

  assert.equal(config.optimization.splitChunks, originalSplitChunks);
  const cacheGroups = config.optimization.splitChunks.cacheGroups as Record<string, unknown>;
  assert.equal(cacheGroups.recharts, undefined);
  assert.equal(cacheGroups.fumadocs, undefined);
});

test("webpack production retains OmniRoute vendor cache groups (#12074 phase 1)", async () => {
  const { default: nextConfig } = await loadNextConfig("production-split-chunks");
  const config = {
    context: repoRoot,
    ignoreWarnings: [],
    optimization: { splitChunks: { cacheGroups: {} as Record<string, unknown> } },
    plugins: [],
  };

  nextConfig.webpack(config, {
    dev: false,
    isServer: false,
    defaultLoaders: { babel: {} },
    webpack: {},
  });

  assert.ok(config.optimization.splitChunks.cacheGroups.recharts);
  assert.ok(config.optimization.splitChunks.cacheGroups.fumadocs);
});
