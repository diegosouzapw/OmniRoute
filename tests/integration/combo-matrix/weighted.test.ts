// tests/integration/combo-matrix/weighted.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-weighted");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: "w" }] };
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

test("weighted: 70/30 weights produce roughly proportional distribution", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-w" });
  await seedConnection("claude", { apiKey: "sk-claude-w" });
  await combosDb.createCombo({
    name: "m-weighted",
    strategy: "weighted",
    config: { maxRetries: 0, retryDelayMs: 0, stickyWeightedLimit: 1 },
    models: [
      { id: "w-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini", weight: 70 },
      { id: "w-claude", kind: "model", providerId: "claude", model: "claude-3-5-sonnet-20241022", weight: 30 },
    ],
  });
  h.installRecordingFetch();

  const N = 200;
  for (let i = 0; i < N; i++) {
    const r = await handleChat(buildRequest({ body: body("m-weighted") }));
    assert.equal(r.status, 200);
  }
  const seen = h.providersSeen();
  const openaiShare = seen.filter((p) => p === "openai").length / N;
  // Tolerance ±0.12 absorbs sampling noise at N=200 while still proving the split.
  assert.ok(openaiShare > 0.58 && openaiShare < 0.82, `openai share ${openaiShare} not ~0.70`);
  assert.ok(seen.includes("claude"), "weighted must still reach the 30% target");
});
