/**
 * #11481 — `modelVisibilityAllowlist`/`modelVisibilityDenylist` filter the
 * unified `/v1/models` catalog. Mirrors models-catalog-hide-paid.test.ts.
 * Rule #18 regression guard for the toggle.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-exposure-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function fetchCatalog(): Promise<Array<{ id: string; type?: string }>> {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: Array<{ id: string; type?: string }> };
  return body.data;
}

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best-effort */
  }
});

test("default (both lists empty) — catalog is unchanged", async () => {
  const defaults = await settingsDb.getSettings();
  assert.deepEqual(defaults.modelVisibilityAllowlist, []);
  assert.deepEqual(defaults.modelVisibilityDenylist, []);

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main-exposure",
    apiKey: "sk-test",
    isActive: true,
  });

  const ids = (await fetchCatalog()).map((m) => m.id);
  assert.ok(
    ids.some((id) => /^(openai|oa)\/gpt-4o(-mini)?$/.test(id)),
    "expected openai chat models present with no exposure list configured"
  );
});

test("modelVisibilityDenylist hides an exact-id match from /v1/models", async () => {
  await settingsDb.updateSettings({
    modelVisibilityAllowlist: [],
    modelVisibilityDenylist: ["openai/gpt-4o-mini"],
  });

  const ids = (await fetchCatalog()).map((m) => m.id);
  assert.ok(!ids.includes("openai/gpt-4o-mini"), "denied model must not appear in the catalog");
  assert.ok(
    ids.some((id) => id === "openai/gpt-4o"),
    "a non-denied sibling model must remain"
  );

  await settingsDb.updateSettings({ modelVisibilityDenylist: [] });
});

test("modelVisibilityAllowlist restricts the chat catalog to exactly the listed models", async () => {
  await settingsDb.updateSettings({
    modelVisibilityDenylist: [],
    modelVisibilityAllowlist: ["openai/gpt-4o-mini"],
  });

  const chatIds = (await fetchCatalog())
    .filter((m) => m.type === undefined || m.type === "chat")
    .map((m) => m.id)
    .filter((id) => id.startsWith("openai/") || id.startsWith("oa/"));

  assert.deepEqual(
    chatIds.filter((id) => id !== "openai/gpt-4o-mini"),
    [],
    `only the allow-listed model may remain, found: ${chatIds.join(", ")}`
  );
  assert.ok(chatIds.includes("openai/gpt-4o-mini"), "the allow-listed model itself must remain");

  await settingsDb.updateSettings({ modelVisibilityAllowlist: [] });
});
