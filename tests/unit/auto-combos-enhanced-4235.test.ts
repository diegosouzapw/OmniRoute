/**
 * #4235 — Enhanced `auto/*` combos.
 *
 * Phase A: the README advertises `auto/cheap`, `auto/offline`, `auto/smart`
 * (and they already resolve via parseAutoPrefix → createVirtualAutoCombo), but
 * they were missing from AUTO_TEMPLATE_VARIANTS, so `/v1/models` and the
 * dashboard never listed them — the catalog/UI drifted from the README.
 *
 * Later phases (suffix parser `auto/<category>:<tier>`, new categories, `:pro`)
 * extend the assertions below.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-4235-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auto-4235-test-secret";

const core = await import("../../src/lib/db/core.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4235 Phase A: README-advertised cheap/offline/smart are in the built-in catalog", () => {
  const ids = Object.keys(builtinCatalog.AUTO_TEMPLATE_VARIANTS);
  for (const id of ["auto/cheap", "auto/offline", "auto/smart"]) {
    assert.ok(ids.includes(id), `expected ${id} in AUTO_TEMPLATE_VARIANTS (advertised in /v1/models)`);
  }
});

test("#4235 Phase A: cheap/offline/smart map to their scoring variant", () => {
  assert.equal(builtinCatalog.AUTO_TEMPLATE_VARIANTS["auto/cheap"], "cheap");
  assert.equal(builtinCatalog.AUTO_TEMPLATE_VARIANTS["auto/offline"], "offline");
  assert.equal(builtinCatalog.AUTO_TEMPLATE_VARIANTS["auto/smart"], "smart");
});

test("#4235 Phase A: each new entry materializes into a virtual auto-combo", async () => {
  for (const id of ["auto/cheap", "auto/offline", "auto/smart"]) {
    const suffix = id.slice("auto/".length);
    const combo = await builtinCatalog.createBuiltinAutoCombo(id, suffix);
    assert.equal(combo.id, id, `${id} combo id`);
    assert.equal(combo.strategy, "auto", `${id} uses the auto strategy`);
  }
});
