// tests/integration/combo-matrix/fusion.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-fusion-matrix");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: "fuse" }] };
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

test("fusion: fans out to the whole panel then routes a judge synthesis turn", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-fz" });
  await seedConnection("claude", { apiKey: "sk-claude-fz" });
  await seedConnection("gemini", { apiKey: "sk-gemini-fz" });
  await combosDb.createCombo({
    name: "m-fusion",
    strategy: "fusion",
    config: { judgeModel: "openai/gpt-4o-mini", fusionTuning: { minPanel: 2 } },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022", "gemini/gemini-2.5-flash"],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-fusion") }));
  assert.equal(r.status, 200);
  // 3 panel calls + 1 judge call = 4 upstream dispatches.
  assert.equal(h.calls.length, 4, `expected 3 panel + 1 judge, got ${h.calls.length}`);
  const providers = h.providersSeen();
  assert.ok(providers.includes("claude") && providers.includes("gemini"), "panel must include all members");
  assert.equal(providers.filter((p) => p === "openai").length >= 1, true, "judge (openai) must run");
});

test("fusion: returns 503 when the whole panel fails", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-fz0" });
  await seedConnection("claude", { apiKey: "sk-claude-fz0" });
  await combosDb.createCombo({
    name: "m-fusion-dead",
    strategy: "fusion",
    config: { judgeModel: "openai/gpt-4o-mini" },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  // Every panel call fails → fusion has nothing to synthesize → 503.
  h.installRecordingFetch(() => h.failure(503));

  const r = await handleChat(buildRequest({ body: body("m-fusion-dead") }));
  assert.equal(r.status, 503);
});
