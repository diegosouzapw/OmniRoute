import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Regression guard for #3883: the @omniroute/opencode-plugin must ship an
// ESM-only bundle. OpenCode's Bun-based plugin loader resolves the package
// `main`/`exports` and applies CJS-to-ESM interop on a dual CJS bundle, which
// turns `mod.default` into the whole exports namespace, fails V1 plugin
// detection, and makes the loader throw "Plugin export is not a function".
// Shipping ESM-only (with a `./runtime` subpath) keeps `mod.default` the V1
// plugin object so the loader registers it. Do NOT re-introduce a CJS bundle.

const PKG_URL = new URL("../../../@omniroute/opencode-plugin/package.json", import.meta.url);
const TSUP_URL = new URL("../../../@omniroute/opencode-plugin/tsup.config.ts", import.meta.url);

function readJson(url: URL): Record<string, unknown> {
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8"));
}

test("opencode-plugin package.json ships ESM-only (no CJS bundle)", () => {
  const pkg = readJson(PKG_URL);

  // main must point at the ESM build, never the .cjs bundle.
  assert.equal(pkg.main, "./dist/index.js", "main must be the ESM build");
  assert.equal(
    typeof pkg.main === "string" && pkg.main.endsWith(".cjs"),
    false,
    "main must not be a .cjs bundle"
  );
  // The legacy dual-bundle `module` field should be gone.
  assert.equal("module" in pkg, false, "the dual-bundle `module` field must be removed");

  const exports = pkg.exports as Record<string, unknown> | undefined;
  assert.ok(exports && typeof exports === "object", "exports map must exist");

  const root = exports["."] as Record<string, unknown>;
  assert.ok(root && typeof root === "object", 'exports["."] must exist');
  assert.equal(root.import, "./dist/index.js", 'exports["."].import must be the ESM build');
  // A `require` condition would re-introduce the CJS path the loader chokes on.
  assert.equal("require" in root, false, 'exports["."] must not declare a `require` condition');

  // The `./runtime` subpath used by the OpenCode loader must resolve to ESM.
  const runtime = exports["./runtime"] as Record<string, unknown>;
  assert.ok(runtime && typeof runtime === "object", 'exports["./runtime"] must exist');
  assert.equal(runtime.import, "./dist/index.js", 'exports["./runtime"].import must be ESM');
});

test("opencode-plugin tsup config builds ESM-only with cjsInterop disabled", () => {
  const tsup = readFileSync(fileURLToPath(TSUP_URL), "utf8");

  const formatMatch = tsup.match(/format:\s*\[([^\]]*)\]/);
  assert.ok(formatMatch, "tsup config must declare a format array");
  const formats = formatMatch[1]
    .split(",")
    .map((s) => s.trim().replace(/['"]/g, ""))
    .filter(Boolean);
  assert.deepEqual(formats, ["esm"], "tsup must build esm only (no cjs)");

  assert.equal(
    /cjsInterop:\s*true/.test(tsup),
    false,
    "cjsInterop must not be true for an ESM-only build"
  );
});
