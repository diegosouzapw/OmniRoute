/**
 * #6316 — `hidePaidModels` settings toggle filters paid-only models from the
 * unified `/v1/models` catalog. Uses `isFreeModel()` from
 * `src/shared/utils/freeModels.ts` (`:free` suffix, zero-price pricing, or
 * FREE_MODEL_BUDGETS membership). Modality registries are exempt (no pricing).
 * Rule #18 regression guard for the toggle.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hide-paid-"));
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
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* best-effort */
  }
});

test("hidePaidModels default is false + toggles the catalog filter", async () => {
  const defaults = await settingsDb.getSettings();
  assert.equal(defaults.hidePaidModels, false);

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
  });

  // Chat-only assertion. Modality registries (embedding/image/audio/moderation)
  // are exempt from the paid filter by design (no pricing metadata).
  const isPaidChat = (m: { id: string; type?: string }) =>
    (m.type === undefined || m.type === "chat") &&
    (/^(openai|oa)\/gpt-/.test(m.id) || /^(openai|oa)\/o[1-9]/.test(m.id));

  await settingsDb.updateSettings({ hidePaidModels: false });
  const off = await fetchCatalog();
  assert.equal(off.some(isPaidChat), true, "expected paid OpenAI chat models when toggle is off");

  await settingsDb.updateSettings({ hidePaidModels: true });
  const on = await fetchCatalog();
  const leaked = on.filter(isPaidChat).map((m) => m.id);
  assert.deepEqual(leaked, [], `paid OpenAI chat aliases leaked: ${leaked.join(", ")}`);
});
