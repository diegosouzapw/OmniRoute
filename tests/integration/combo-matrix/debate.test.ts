// tests/integration/combo-matrix/debate.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-debate-matrix");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: "debate" }] };
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

test("debate: runs R0 + R1 across the panel then a judge synthesis turn", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-db" });
  await seedConnection("claude", { apiKey: "sk-claude-db" });
  await combosDb.createCombo({
    name: "m-debate",
    strategy: "debate",
    config: {
      judgeModel: "openai/gpt-4o-mini",
      // debateRounds=2 → R0 fan-out + R1 rebuttal; consensusThreshold>1 disables
      // early stop so the full round count is deterministic for this assertion.
      debateTuning: { debateRounds: 2, minPanel: 2, consensusThreshold: 2 },
    },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-debate") }));
  assert.equal(r.status, 200);
  // 2 panel (R0) + 2 panel (R1) + 1 judge = 5 upstream dispatches.
  assert.equal(h.calls.length, 5, `expected 2×R0 + 2×R1 + 1 judge, got ${h.calls.length}`);
  const providers = h.providersSeen();
  assert.ok(providers.includes("claude"), "panel must include claude across rounds");
  assert.ok(
    providers.filter((p) => p === "openai").length >= 1,
    "judge (openai) must run at least once"
  );
});

test("debate: returns 503 when the whole panel fails in round 0", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-db0" });
  await seedConnection("claude", { apiKey: "sk-claude-db0" });
  await combosDb.createCombo({
    name: "m-debate-dead",
    strategy: "debate",
    config: {
      judgeModel: "openai/gpt-4o-mini",
      debateTuning: { debateRounds: 2, minPanel: 2, consensusThreshold: 2 },
    },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  // Every panel call fails → no survivors → nothing to debate/synthesize → 503.
  h.installRecordingFetch(() => h.failure(503));

  const r = await handleChat(buildRequest({ body: body("m-debate-dead") }));
  assert.equal(r.status, 503);
});
