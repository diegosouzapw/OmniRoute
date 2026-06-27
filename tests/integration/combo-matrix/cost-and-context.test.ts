// tests/integration/combo-matrix/cost-and-context.test.ts
//
// Matrix tests for cost-optimized, context-optimized, and context-relay strategies.
//
// Pricing source: DEFAULT_PRICING (src/shared/constants/pricing/frontier-labs.ts)
//   openai / gpt-4o-mini  → input $0.15 / M tokens  (cheap)
//   gemini / gemini-2.5-pro → input $2.00 / M tokens (expensive)
//
// Context-window source: MODEL_SPECS (src/shared/constants/modelSpecs.ts)
//   gpt-4o-mini        → contextWindow 128 000
//   gemini-2.5-flash   → contextWindow 1 048 576
//
// context-relay: does NOT appear in the sorting if-else chain of combo.ts; targets are
// dispatched in combo-definition order. The only extra behaviour is a codex-provider
// handoff triggered by (strategy=context-relay && provider="codex" && sessionId in
// relayOptions), which cannot be exercised in-process with openai/gemini providers.
// That handoff path is covered by TODO(phase-2) below.
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-cost-context");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

function body(model: string, content = "hi") {
  return { model, stream: false, messages: [{ role: "user", content }] };
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

// ── Test 1: cost-optimized ─────────────────────────────────────────────────────
// sortTargetsByCost reads pricing?.input from getPricingForModel (src/lib/db/settings.ts).
// In a fresh test DB the default-pricing layer is used (no litellm/modelsDev overrides).
//   openai / gpt-4o-mini   → input $0.15 / M  (CHEAPER  → should be dispatched first)
//   gemini / gemini-2.5-pro → input $2.00 / M  (EXPENSIVE → should be dispatched second)
test("cost-optimized: cheapest model (gpt-4o-mini $0.15) dispatched before expensive (gemini-2.5-pro $2.00)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-cost" });
  await seedConnection("gemini", { apiKey: "sk-gemini-cost" });

  await combosDb.createCombo({
    name: "m-cost-optimized",
    strategy: "cost-optimized",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // Order here is intentionally expensive-first to prove the sorter reorders them.
      { id: "cc-gemini", kind: "model", providerId: "gemini", model: "gemini-2.5-pro" },
      { id: "cc-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini" },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-cost-optimized") }));
  assert.equal(r.status, 200);

  const seen = h.providersSeen();
  assert.ok(seen.length > 0, "at least one upstream dispatch expected");
  assert.equal(
    seen[0],
    "openai",
    `expected cheapest provider (openai/gpt-4o-mini $0.15/M) to be dispatched first, got ${seen[0]}`
  );
});

// ── Test 2: context-optimized ──────────────────────────────────────────────────
// sortTargetsByContextSize reads contextWindow from getModelContextLimit →
//   getResolvedModelCapabilities → MODEL_SPECS (src/shared/constants/modelSpecs.ts).
// In a fresh test DB (no synced capabilities), MODEL_SPECS values apply directly:
//   openai / gpt-4o-mini    → contextWindow 128 000
//   gemini / gemini-2.5-flash → contextWindow 1 048 576  (LARGER → dispatched first)
test("context-optimized: largest-context model (gemini-2.5-flash 1048576) dispatched before small-context (gpt-4o-mini 128000)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-ctx" });
  await seedConnection("gemini", { apiKey: "sk-gemini-ctx" });

  await combosDb.createCombo({
    name: "m-context-optimized",
    strategy: "context-optimized",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // Order intentionally small-context-first to prove the sorter reorders them.
      { id: "cx-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini" },
      { id: "cx-gemini", kind: "model", providerId: "gemini", model: "gemini-2.5-flash" },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-context-optimized") }));
  assert.equal(r.status, 200);

  const seen = h.providersSeen();
  assert.ok(seen.length > 0, "at least one upstream dispatch expected");
  assert.equal(
    seen[0],
    "gemini",
    `expected largest-context provider (gemini/gemini-2.5-flash 1048576) to be dispatched first, got ${seen[0]}`
  );
});

// ── Test 3: context-relay ──────────────────────────────────────────────────────
// context-relay does NOT appear in the sorting if-else chain in combo.ts (confirmed at
// lines 1459–1586). Targets are dispatched in combo-definition order (same as priority).
// The only extra behaviour is a codex handoff at line 2144:
//   strategy === "context-relay" && relayOptions?.sessionId && relayConfig &&
//   relayConfig.handoffProviders.includes(provider) && provider === "codex"
// This branch requires provider === "codex" and a live relayOptions.sessionId, which
// cannot be injected in-process via the standard combo test harness.
// TODO(phase-2): trigger the codex handoff path live on VPS or via a dedicated codex-
// provider connection stub that satisfies the handoff condition.
//
// Assertion: context-relay preserves combo-definition order (first model dispatched first).
test("context-relay: preserves combo-definition order (openai dispatched before gemini)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-relay" });
  await seedConnection("gemini", { apiKey: "sk-gemini-relay" });

  await combosDb.createCombo({
    name: "m-context-relay",
    strategy: "context-relay",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai is listed first; context-relay should NOT reorder targets.
      { id: "cr-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini" },
      { id: "cr-gemini", kind: "model", providerId: "gemini", model: "gemini-2.5-flash" },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-context-relay") }));
  assert.equal(r.status, 200);

  const seen = h.providersSeen();
  assert.ok(seen.length > 0, "at least one upstream dispatch expected");
  assert.equal(
    seen[0],
    "openai",
    `expected context-relay to preserve definition order (openai first), got ${seen[0]}`
  );
});
