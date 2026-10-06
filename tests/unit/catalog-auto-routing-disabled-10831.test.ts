/**
 * #10831 — when auto routing is switched off, `auto/*` ids must not be
 * advertised in `/v1/models`.
 *
 * Unlike `hideAutoCombos` (#9418), which only unadvertises ids that still route
 * when a client sends them explicitly, `autoRoutingEnabled: false` makes the
 * router reject every `auto/*` id with
 * "Auto routing is disabled. Enable it in Settings > Routing." (see
 * src/sse/handlers/autoRouting.ts). Listing them therefore offers the picker a
 * choice that can only fail.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-routing-10831-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function fetchCatalog(): Promise<Array<{ id: string }>> {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  if (res.status !== 200) {
    const body = await res.text();
    assert.fail(`Expected 200, got ${res.status}: ${body.slice(0, 500)}`);
  }
  const body = (await res.json()) as { data: Array<{ id: string }> };
  return body.data;
}

const isAutoId = (m: { id: string }) => m.id.startsWith("auto/");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best-effort */
  }
});

test("autoRoutingEnabled=false removes auto/* ids from /v1/models", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
  });

  // Baseline: routing on, ids advertised.
  await settingsDb.updateSettings({ autoRoutingEnabled: true, hideAutoCombos: false });
  const on = await fetchCatalog();
  const autoWhenOn = on.filter(isAutoId).map((m) => m.id);
  assert.equal(
    autoWhenOn.length > 0,
    true,
    `expected auto/* ids while auto routing is enabled, got ${autoWhenOn.length}`
  );

  // Routing off: none may remain.
  await settingsDb.updateSettings({ autoRoutingEnabled: false, hideAutoCombos: false });
  const off = await fetchCatalog();
  const leaked = off.filter(isAutoId).map((m) => m.id);
  assert.deepEqual(
    leaked,
    [],
    `auto/* ids leaked while auto routing is disabled: ${leaked.join(", ")}`
  );

  // Everything else must survive — this is a filter, not a catalog wipe.
  const hasProviderModel = off.some((m) => m.id.startsWith("openai/") || m.id.startsWith("oa/"));
  assert.equal(hasProviderModel, true, "provider models must remain when auto routing is disabled");
});

test("re-enabling auto routing brings auto/* ids back (cache key varies on the flag)", async () => {
  await settingsDb.updateSettings({ autoRoutingEnabled: false, hideAutoCombos: false });
  const off = await fetchCatalog();
  assert.deepEqual(
    off.filter(isAutoId).map((m) => m.id),
    []
  );

  await settingsDb.updateSettings({ autoRoutingEnabled: true, hideAutoCombos: false });
  const back = await fetchCatalog();
  assert.equal(
    back.filter(isAutoId).length > 0,
    true,
    "auto/* ids must return once auto routing is re-enabled — a stale cached catalog would fail here"
  );
});
