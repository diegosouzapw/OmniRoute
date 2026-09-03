import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const files = pkg.files || [];

// #9633: `build-next-isolated.mjs` is published (fixed in #1126), but three of
// its sibling modules it imports were missing from the `files` whitelist, so
// `npm run build` on a globally-installed package crashed with ERR_MODULE_NOT_FOUND.
// The dynamic import of `build-tproxy-native.mjs` (~line 308) and the static
// imports of `assembleStandalone.mjs` / `backendOnlyPages.mjs` must ship too.
const NEEDED = [
  "scripts/build/assembleStandalone.mjs",
  "scripts/build/backendOnlyPages.mjs",
  "scripts/build/build-tproxy-native.mjs",
  "scripts/build/colocateOptionals.mjs",
];

test("#9633: build-next-isolated.mjs sibling imports present in package.json files[]", () => {
  for (const needed of NEEDED) {
    assert.ok(
      files.some((f) => typeof f === "string" && f === needed),
      `${needed} is not in package.json files[]`
    );
  }
});
