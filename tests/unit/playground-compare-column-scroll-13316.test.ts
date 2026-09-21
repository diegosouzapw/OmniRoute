import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// #13316: a long response in one Compare column scrolled the whole grid. Each column
// must be its own bounded flex container (min-h-0 + overflow-hidden) and the grid must
// not clip vertically, so every column's body scrolls independently.

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const componentsDir = join(
  root,
  "src",
  "app",
  "(dashboard)",
  "dashboard",
  "playground",
  "components"
);

test("#13316 Compare column root is a bounded, clipped flex column", () => {
  const src = readFileSync(join(componentsDir, "CompareColumn.tsx"), "utf8");
  const rootClass = src.match(/<div className="(flex flex-col h-full[^"]*)"/)?.[1] ?? "";
  assert.match(rootClass, /\bmin-h-0\b/);
  assert.match(rootClass, /\boverflow-hidden\b/);
});

test("#13316 Compare grid clips horizontally only and can shrink", () => {
  const src = readFileSync(join(componentsDir, "tabs", "CompareTab.tsx"), "utf8");
  const gridClass = src.match(/className="(flex-1 grid[^"]*)"/)?.[1] ?? "";
  assert.match(gridClass, /\bmin-h-0\b/);
  assert.match(gridClass, /\boverflow-x-hidden\b/);
  assert.doesNotMatch(gridClass, /(^|\s)overflow-hidden(\s|$)/);
});
