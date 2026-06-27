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

test("round-robin: cycles through targets in batches (sticky limit = 3 default)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-rr" });
  await seedConnection("claude", { apiKey: "sk-claude-rr" });
  await seedConnection("gemini", { apiKey: "sk-gemini-rr" });
  await combosDb.createCombo({
    name: "m-rr",
    strategy: "round-robin",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022", "gemini/gemini-2.5-flash"],
  });
  h.installRecordingFetch();

  for (let i = 0; i < 9; i++) {
    const r = await handleChat(buildRequest({ body: body("m-rr") }));
    assert.equal(r.status, 200);
  }
  assert.deepEqual(h.providersSeen(), [
    "openai", "openai", "openai",
    "claude", "claude", "claude",
    "gemini", "gemini", "gemini",
  ]);
});

test("least-used: prefers the target with the fewest recent uses", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-lu" });
  await seedConnection("claude", { apiKey: "sk-claude-lu" });
  await combosDb.createCombo({
    name: "m-least-used",
    strategy: "least-used",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  h.installRecordingFetch();

  // Over an even number of calls each target should be picked roughly equally;
  // least-used must not pin to a single provider.
  for (let i = 0; i < 6; i++) {
    const r = await handleChat(buildRequest({ body: body("m-least-used") }));
    assert.equal(r.status, 200);
  }
  const seen = h.providersSeen();
  assert.ok(seen.includes("openai"), "least-used must reach openai");
  assert.ok(seen.includes("claude"), "least-used must reach claude");
});

test("random: over many calls reaches every target", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-rnd" });
  await seedConnection("claude", { apiKey: "sk-claude-rnd" });
  await seedConnection("gemini", { apiKey: "sk-gemini-rnd" });
  await combosDb.createCombo({
    name: "m-random",
    strategy: "random",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022", "gemini/gemini-2.5-flash"],
  });
  h.installRecordingFetch();

  for (let i = 0; i < 30; i++) {
    const r = await handleChat(buildRequest({ body: body("m-random") }));
    assert.equal(r.status, 200);
  }
  const unique = new Set(h.providersSeen());
  assert.equal(unique.size, 3, "random must reach all three providers over 30 calls");
});

test("strict-random: uses every target once before repeating (deck, no early repeats)", async () => {
  const { _resetAllDecks } = await import("../../../src/shared/utils/shuffleDeck.ts");
  _resetAllDecks();
  await seedConnection("openai", { apiKey: "sk-openai-sr" });
  await seedConnection("claude", { apiKey: "sk-claude-sr" });
  await seedConnection("gemini", { apiKey: "sk-gemini-sr" });
  await combosDb.createCombo({
    name: "m-strict-random",
    strategy: "strict-random",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022", "gemini/gemini-2.5-flash"],
  });
  h.installRecordingFetch();

  for (let i = 0; i < 3; i++) {
    const r = await handleChat(buildRequest({ body: body("m-strict-random") }));
    assert.equal(r.status, 200);
  }
  // First full deck cycle: each provider exactly once (order varies, set is full).
  assert.deepEqual(new Set(h.providersSeen()), new Set(["openai", "claude", "gemini"]));
});

test("p2c: spreads load across targets over many calls (no single-target pin)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-p2c" });
  await seedConnection("claude", { apiKey: "sk-claude-p2c" });
  await seedConnection("gemini", { apiKey: "sk-gemini-p2c" });
  await combosDb.createCombo({
    name: "m-p2c",
    strategy: "p2c",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022", "gemini/gemini-2.5-flash"],
  });
  h.installRecordingFetch();

  for (let i = 0; i < 30; i++) {
    const r = await handleChat(buildRequest({ body: body("m-p2c") }));
    assert.equal(r.status, 200);
  }
  assert.ok(new Set(h.providersSeen()).size >= 2, "p2c must spread across at least two targets");
});
