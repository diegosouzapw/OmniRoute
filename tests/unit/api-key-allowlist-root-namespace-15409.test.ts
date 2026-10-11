/**
 * #15409: a restricted key's /v1/models must not list another provider's models.
 *
 * The catalog filter also checked each row's `root` so a bare allowlist entry
 * (`gpt-4o`) keeps matching `openai/gpt-4o` (#781). But `root` is a raw upstream
 * string with no owning-provider namespace: aggregators such as cline expose
 * `id = cline/deepseek/deepseek-v4-flash` with `root = deepseek/deepseek-v4-flash`,
 * and the permission check reads that root as the deepseek provider's model —
 * so a key allowing only `ds/deepseek-v4-flash` listed the cline row.
 *
 * Rules:
 *   R1 A namespaced root never grants access to a row whose id is not allowed.
 *   R2 The collision is generic — any provider wildcard (openrouter/*) is affected.
 *   R3 A bare root still matches a bare allowlist entry (#781 behaviour kept).
 *   R4 A row whose id is blocked is not brought back through its root.
 *   R5 The catalog filter goes through the helper, not a raw id-or-root check.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-root-ns-15409-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-root-ns-15409";
delete process.env.INITIAL_PASSWORD;
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const { isCatalogModelAllowedForKey } =
  await import("../../src/app/api/v1/models/catalogKeyFilter.ts");

test.after(() => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

async function restrictedKey(name: string, allowedModels: string[], blockedModels: string[] = []) {
  const created = await apiKeys.createApiKey(name, `machine-${name}`);
  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels,
    blockedModels,
  } as Parameters<typeof apiKeys.updateApiKeyPermissions>[1]);
  apiKeys.resetApiKeyState();
  return { key: created.key, blockedModels };
}

async function visible(
  key: { key: string; blockedModels: string[] },
  model: { id: string; root: string }
) {
  return isCatalogModelAllowedForKey(key.key, model, key.blockedModels, apiKeys);
}

test("R1: a namespaced root does not leak a cline row into a deepseek-only key", async () => {
  const key = await restrictedKey("ds-only", ["ds/deepseek-v4-flash"]);

  assert.equal(
    await visible(key, {
      id: "cline/deepseek/deepseek-v4-flash",
      root: "deepseek/deepseek-v4-flash",
    }),
    false,
    "cline's row must not be listed by a key that never allowed cline"
  );
  assert.equal(
    await visible(key, { id: "cl/deepseek/deepseek-v4-flash", root: "deepseek/deepseek-v4-flash" }),
    false,
    "the cline alias row must not be listed either"
  );
  // The deepseek provider's own row is still listed.
  assert.equal(
    await visible(key, { id: "deepseek/deepseek-v4-flash", root: "deepseek-v4-flash" }),
    true
  );
});

test("R2: the leak is generic — a provider wildcard does not admit an aggregator's row", async () => {
  const key = await restrictedKey("openrouter-only", ["openrouter/*"]);

  assert.equal(await visible(key, { id: "cline/openrouter/free", root: "openrouter/free" }), false);
  assert.equal(await visible(key, { id: "cl/openrouter/free", root: "openrouter/free" }), false);
});

test("R3: a bare root still matches a bare allowlist entry (#781)", async () => {
  const key = await restrictedKey("bare", ["gpt-4o"]);

  assert.equal(await visible(key, { id: "openai/gpt-4o", root: "gpt-4o" }), true);
  assert.equal(await visible(key, { id: "openai/gpt-4o-mini", root: "gpt-4o-mini" }), false);
});

test("R4: a blocked id is not brought back through its root", async () => {
  const key = await restrictedKey("bare-blocked", ["deepseek-v4-flash"], ["cline/*"]);

  assert.equal(
    await visible(key, { id: "cline/deepseek-v4-flash", root: "deepseek-v4-flash" }),
    false,
    "blockedModels must win over the bare-root match"
  );
  assert.equal(
    await visible(key, { id: "deepseek/deepseek-v4-flash", root: "deepseek-v4-flash" }),
    true
  );
});

test("R5: the catalog filters provider rows through isCatalogModelAllowedForKey", () => {
  const catalogSource = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/v1/models/catalog.ts"),
    "utf8"
  );
  assert.ok(catalogSource.includes("finalModels = await filterCatalogModelsForKey("));
  const catalog = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/v1/models/catalogKeyFilter.ts"),
    "utf8"
  );
  assert.ok(
    catalog.includes("await isCatalogModelAllowedForKey(apiKey, m, keyMeta.blockedModels, deps)"),
    "catalogKeyFilter.ts must decide provider-row visibility via isCatalogModelAllowedForKey"
  );
  assert.ok(
    !catalog.includes("isModelAllowedForKey(apiKey, m.root)"),
    "the raw root check must not come back"
  );
});
