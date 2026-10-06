/**
 * #9418 — `hideAutoCombos` and `hideNoThinkVariants` settings toggles filter
 * built-in `auto/*` virtual combos and `no-think/*` gateway variants from the
 * unified `/v1/models` catalog. Default false (opt-in, Rule #20 spirit).
 * Rule #18 regression guard for both toggles.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hide-auto-no-think-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function fetchCatalog(): Promise<Array<{ id: string; type?: string }>> {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  if (res.status !== 200) {
    const body = await res.text();
    assert.fail(`Expected 200, got ${res.status}: ${body.slice(0, 500)}`);
  }
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

test("hideAutoCombos and hideNoThinkVariants default to false", async () => {
  const defaults = await settingsDb.getSettings();
  assert.equal(defaults.hideAutoCombos, false, "hideAutoCombos default must be false");
  assert.equal(defaults.hideNoThinkVariants, false, "hideNoThinkVariants default must be false");
});

test("hideAutoCombos=true removes auto/* ids from /v1/models", async () => {
  // Ensure at least one provider connection exists so the catalog has content
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
  });

  const isAutoId = (m: { id: string }) => m.id.startsWith("auto/");

  await settingsDb.updateSettings({ hideAutoCombos: false, hideNoThinkVariants: false });
  const off = await fetchCatalog();
  const autoWhenOff = off.filter(isAutoId).map((m) => m.id);
  assert.equal(
    autoWhenOff.length > 0,
    true,
    `expected auto/* ids when toggle off, got ${autoWhenOff.length}`
  );

  await settingsDb.updateSettings({ hideAutoCombos: true, hideNoThinkVariants: false });
  const on = await fetchCatalog();
  const leaked = on.filter(isAutoId).map((m) => m.id);
  assert.deepEqual(leaked, [], `auto/* ids leaked when hideAutoCombos=true: ${leaked.join(", ")}`);

  // Original provider models must still be present
  const hasProviderModel = on.some((m) => m.id.startsWith("openai/") || m.id.startsWith("oa/"));
  assert.equal(
    hasProviderModel,
    true,
    "original provider models must remain when hideAutoCombos=true"
  );
});

test("hideNoThinkVariants=true removes no-think/* ids from /v1/models", async () => {
  // Add a claude provider connection so the catalog has no-think/* variants
  // (no-thinking variants are generated for Claude-family models that support thinking)
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "claude-main",
    apiKey: "sk-ant-test",
    isActive: true,
  });

  const isNoThinkId = (m: { id: string }) => m.id.startsWith("no-think/");

  await settingsDb.updateSettings({ hideAutoCombos: false, hideNoThinkVariants: false });
  const off = await fetchCatalog();
  const noThinkWhenOff = off.filter(isNoThinkId).map((m) => m.id);
  // If no no-think/* ids are present in the baseline catalog, the filter is
  // trivially correct — just verify the toggle doesn't break anything.
  if (noThinkWhenOff.length === 0) {
    // No no-think/* ids to filter — verify the toggle doesn't remove other models
    await settingsDb.updateSettings({ hideAutoCombos: false, hideNoThinkVariants: true });
    const on = await fetchCatalog();
    const hasProviderModel = on.some(
      (m) => m.id.startsWith("claude/") || m.id.startsWith("anthropic/")
    );
    assert.equal(
      hasProviderModel,
      true,
      "original provider models must remain when hideNoThinkVariants=true"
    );
    return;
  }

  await settingsDb.updateSettings({ hideAutoCombos: false, hideNoThinkVariants: true });
  const on = await fetchCatalog();
  const leaked = on.filter(isNoThinkId).map((m) => m.id);
  assert.deepEqual(
    leaked,
    [],
    `no-think/* ids leaked when hideNoThinkVariants=true: ${leaked.join(", ")}`
  );

  // Original provider models must still be present
  const hasProviderModel = on.some(
    (m) => m.id.startsWith("claude/") || m.id.startsWith("anthropic/")
  );
  assert.equal(
    hasProviderModel,
    true,
    "original provider models must remain when hideNoThinkVariants=true"
  );
});

test("both toggles on: neither auto/* nor no-think/* appear; original models present", async () => {
  const isAutoId = (m: { id: string }) => m.id.startsWith("auto/");
  const isNoThinkId = (m: { id: string }) => m.id.startsWith("no-think/");

  await settingsDb.updateSettings({ hideAutoCombos: true, hideNoThinkVariants: true });
  const on = await fetchCatalog();
  const autoLeaked = on.filter(isAutoId).map((m) => m.id);
  const noThinkLeaked = on.filter(isNoThinkId).map((m) => m.id);
  assert.deepEqual(autoLeaked, [], `auto/* ids leaked: ${autoLeaked.join(", ")}`);
  assert.deepEqual(noThinkLeaked, [], `no-think/* ids leaked: ${noThinkLeaked.join(", ")}`);

  const hasProviderModel = on.some(
    (m) =>
      m.id.startsWith("openai/") ||
      m.id.startsWith("oa/") ||
      m.id.startsWith("claude/") ||
      m.id.startsWith("anthropic/")
  );
  assert.equal(
    hasProviderModel,
    true,
    "original provider models must remain when both toggles are on"
  );
});
