/**
 * #14889 — GET /api/combos/auto must build the candidate pool once per request.
 *
 * The route lists every auto variant (bare "auto", the named variants, template,
 * suffix and family variants) and called createVirtualAutoCombo() for each one.
 * createVirtualAutoCombo() runs prepareVirtualAutoComboInputs() every time, so one
 * request rebuilt the whole candidate pool once per variant. On a real install that
 * made the endpoint take tens of seconds and hold the event loop the whole time.
 *
 * Pool preparation yields to the event loop (setImmediate) every few candidates and
 * nothing else on this path does, so counting setImmediate calls measures how much
 * preparation a request did. mock.module() is not usable under this tsx/ESM runner.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14889-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "combos-auto-14889-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const combosAutoRoute = await import("../../src/app/api/combos/auto/route.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

async function countYields(fn: () => Promise<unknown>): Promise<number> {
  const realSetImmediate = globalThis.setImmediate;
  let count = 0;
  globalThis.setImmediate = ((...args: Parameters<typeof setImmediate>) => {
    count++;
    return realSetImmediate(...args);
  }) as typeof setImmediate;
  try {
    await fn();
  } finally {
    globalThis.setImmediate = realSetImmediate;
  }
  return count;
}

test("GET /api/combos/auto prepares the candidate pool once, not once per variant", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  // Enough API-key providers that a single pool preparation yields at least once.
  for (const provider of ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-14889-${provider}`,
      name: `test-14889-${provider}`,
      isActive: true,
    });
  }

  const onePreparation = await countYields(() => virtualFactory.prepareVirtualAutoComboInputs());
  assert.ok(onePreparation > 0, "the seeded pool should be large enough to yield while preparing");

  let combos: Array<{ id: string }> = [];
  const routeYields = await countYields(async () => {
    const res = await combosAutoRoute.GET(new Request("http://localhost/api/combos/auto"));
    combos = (await res.json()).combos;
  });

  assert.ok(combos.length > 1, "the route should list several auto variants");
  assert.equal(
    routeYields,
    onePreparation,
    `listing ${combos.length} variants should prepare the pool once`
  );
});
