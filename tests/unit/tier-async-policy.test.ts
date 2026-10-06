import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, beforeEach, test } from "node:test";

const testDataDir = mkdtempSync(join(tmpdir(), "omniroute-tier-async-policy-"));
const previousDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { classifyTier, classifyTierAsync, setTierConfig } =
  await import("../../open-sse/services/tierResolver.ts");
const { estimateRequestCost } = await import("../../open-sse/services/manifestAdapter.ts");

beforeEach(() => setTierConfig({}));
after(() => {
  setTierConfig({});
  resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  rmSync(testDataDir, { recursive: true, force: true });
});

test("async pricing cannot overwrite an explicitly free provider or poison its sync cost", async () => {
  await updatePricing({ kiro: { "claude-sonnet-4.5": { input: 3, output: 15 } } });
  const before = classifyTier("kiro", "claude-sonnet-4.5");
  const after = await classifyTierAsync("kiro", "claude-sonnet-4.5");
  assert.equal(after.tier, "free");
  assert.equal(after.costPer1MInput, 0);
  assert.equal(after.costPer1MOutput, 0);
  assert.deepEqual(after, before);
  assert.deepEqual(classifyTier("kiro", "claude-sonnet-4.5"), before);
  assert.equal(
    estimateRequestCost(
      {
        kind: "model",
        stepId: "policy",
        executionKey: "kiro/claude-sonnet-4.5",
        modelStr: "claude-sonnet-4.5",
        provider: "kiro",
        providerId: null,
        connectionId: null,
        weight: 1,
        label: null,
      },
      1000,
      500
    ),
    0
  );
});

test("async classification honors the configured provider tier over a DB price", async () => {
  setTierConfig({ providerOverrides: [{ provider: "qg-policy", tier: "premium" }] });
  await updatePricing({ "qg-policy": { "provider-model": { input: 0, output: 0 } } });
  const expected = classifyTier("qg-policy", "provider-model");
  assert.equal(expected.tier, "premium");
  assert.deepEqual(await classifyTierAsync("qg-policy", "provider-model"), expected);
});

test("async classification honors a matching model glob before cost classification", async () => {
  setTierConfig({
    modelOverrides: [{ provider: "qg-model-policy", modelPattern: "chat-*", tier: "cheap" }],
  });
  await updatePricing({ "qg-model-policy": { "chat-pro": { input: 20, output: 40 } } });
  const expected = classifyTier("qg-model-policy", "chat-pro");
  assert.equal(expected.tier, "cheap");
  assert.deepEqual(await classifyTierAsync("qg-model-policy", "chat-pro"), expected);
});

test("the provider override keeps precedence over a matching model override", async () => {
  setTierConfig({
    providerOverrides: [{ provider: "qg-precedence", tier: "premium" }],
    modelOverrides: [{ provider: "qg-precedence", modelPattern: "*", tier: "cheap" }],
  });
  await updatePricing({ "qg-precedence": { chat: { input: 0, output: 0 } } });
  assert.equal((await classifyTierAsync("qg-precedence", "chat")).tier, "premium");
});

test("without an explicit tier policy DB price changes still refresh the same model", async () => {
  await updatePricing({ "qg-cost-based": { chat: { input: 0.5, output: 1 } } });
  assert.equal((await classifyTierAsync("qg-cost-based", "chat")).tier, "cheap");
  await updatePricing({ "qg-cost-based": { chat: { input: 5, output: 10 } } });
  const updated = await classifyTierAsync("qg-cost-based", "chat");
  assert.equal(updated.tier, "premium");
  assert.equal(updated.costPer1MInput, 5);
  assert.equal(updated.costPer1MOutput, 10);
});
