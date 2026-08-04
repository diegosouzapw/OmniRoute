/**
 * #6328 (follow-up to #6495) — the dashboard `/api/models` endpoint must also
 * REMOVE paid models when `hidePaidModels` is on (the public `/v1/models`
 * catalog already did via #6495). `openai` has no curated free roster, so its
 * chat models are paid-tier and must disappear when the toggle is on.
 * Rule #18 regression guard for the added filter in src/app/api/models/route.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-models-hidepaid-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/models/route.ts");

async function fetchModels(): Promise<Array<{ provider: string; model: string }>> {
  const res = await modelsRoute.GET(new Request("http://localhost/api/models?all=true"));
  const body = (await res.json()) as { models: Array<{ provider: string; model: string }> };
  return body.models;
}

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* best-effort */
  }
});

test("#6328 /api/models removes paid models when hidePaidModels is on", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
  });

  const hasPaidOpenAi = (list: Array<{ provider: string; model: string }>) =>
    list.some((m) => m.provider === "openai" && /^gpt-/.test(m.model));

  await settingsDb.updateSettings({ hidePaidModels: false });
  assert.equal(hasPaidOpenAi(await fetchModels()), true, "paid OpenAI models visible when toggle is off");

  await settingsDb.updateSettings({ hidePaidModels: true });
  assert.equal(
    hasPaidOpenAi(await fetchModels()),
    false,
    "paid OpenAI models must be removed when hidePaidModels is on (#6328)"
  );
});
