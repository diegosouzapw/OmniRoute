import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #15546 follow-up #2: the virtual `auto/subscription` route must fail CLOSED.
// When the subscription pool is empty, expandAutoComboCandidatePool must NOT
// widen it to every model of every active provider (paid models included).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15546-sub-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combo = await import("../../open-sse/services/combo.ts");
const factory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

async function emptyVirtual(tier: "subscription" | "thrifty" | "fast") {
  const prepared = { regularCandidates: [], familyCandidates: [] };
  return factory.createVirtualAutoComboFromPrepared(prepared as never, undefined, {
    category: "chat",
    tier,
  } as never);
}

test("empty auto/subscription pool is not widened to the full catalog", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });
  const virtual = await emptyVirtual("subscription");
  assert.equal(virtual.models.length, 0);
  const expanded = await combo.expandAutoComboCandidatePool([], virtual as never);
  assert.equal(expanded.length, 0, "subscription route must fail closed (no paid fallback)");
});

test("empty non-subscription virtual pool keeps legacy expansion", async () => {
  const virtual = await emptyVirtual("fast");
  const expanded = await combo.expandAutoComboCandidatePool([], virtual as never);
  assert.ok(expanded.length > 0);
});
