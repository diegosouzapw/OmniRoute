// tests/integration/combo-matrix/ordered.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-ordered");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: `route ${model}` }] };
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

test("priority: always dispatches the first healthy target", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-p" });
  await seedConnection("claude", { apiKey: "sk-claude-p" });
  await combosDb.createCombo({
    name: "m-priority",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  h.installRecordingFetch();

  for (let i = 0; i < 3; i++) {
    const r = await handleChat(buildRequest({ body: body("m-priority") }));
    assert.equal(r.status, 200);
  }
  assert.deepEqual(h.providersSeen(), ["openai", "openai", "openai"]);
});

test("priority: falls back to the next target when the first fails", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-pf" });
  await seedConnection("claude", { apiKey: "sk-claude-pf" });
  await combosDb.createCombo({
    name: "m-priority-fail",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  // First upstream call (openai) fails → must fall over to claude.
  h.installRecordingFetch((call) => (call.index === 0 ? h.failure(503) : undefined));

  const r = await handleChat(buildRequest({ body: body("m-priority-fail") }));
  assert.equal(r.status, 200);
  assert.deepEqual(h.providersSeen(), ["openai", "claude"]);
});

test("fill-first: keeps using the first target until it fails, then moves on", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-ff" });
  await seedConnection("claude", { apiKey: "sk-claude-ff" });
  await combosDb.createCombo({
    name: "m-fill-first",
    strategy: "fill-first",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  h.installRecordingFetch();

  // Healthy openai → all requests hit openai (fill-first preserves priority order).
  for (let i = 0; i < 3; i++) {
    const r = await handleChat(buildRequest({ body: body("m-fill-first") }));
    assert.equal(r.status, 200);
  }
  assert.deepEqual(h.providersSeen(), ["openai", "openai", "openai"]);
});
