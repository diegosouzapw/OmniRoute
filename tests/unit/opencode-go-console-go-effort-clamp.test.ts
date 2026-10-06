/**
 * Console Go (opencode.ai/zen/go/v1) reasoning-effort vocabulary clamp.
 *
 * Live-reproduced 2026-08-23 via the Hermes Telegram bot → /v1/chat/completions:
 * `opencode-go/ox-alpha-free` rejects every reasoning_effort except
 * {low, high, max} whenever the request carries tools —
 *
 *   [400] Error from provider (Console Go): Upstream request failed: [1210]
 *   This model always engages in thinking and cannot be disabled; please use
 *   low, high, or max
 *
 * Hermes sends reasoning_effort:"medium" with 24 tools and died on every turn.
 * Two gaps let the bad value reach the upstream verbatim:
 *   1. `ox-alpha-free` is a discovery-synced model with no static registry
 *      entry declaring its effort vocabulary.
 *   2. sanitizeReasoningEffortForProvider only consults declared
 *      supportedThinkingEfforts in the `max` branch (max fallback); other
 *      out-of-vocabulary values pass through untouched.
 *
 * Fix under test: declare ["low","high","max"] on the registry entry and add a
 * generic explicit-capability clamp that remaps any out-of-vocabulary effort to
 * the nearest declared tier (smallest ranked ≥ requested, else the highest).
 * Models without a declaration keep today's pass-through behavior (#8057).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

function makeLog() {
  const messages: Array<[string, string]> = [];
  return {
    info: (tag: string, msg: string) => messages.push([tag, msg]),
    messages,
  };
}

const HERMES_BODY = {
  model: "ox-alpha-free",
  max_tokens: 65536,
  stream_options: { include_usage: true },
  messages: [{ role: "user", content: "Start telegram bot" }],
  tools: [
    {
      type: "function",
      function: { name: "clarify", description: "ask", parameters: { type: "object" } },
    },
  ],
};

test("registry: opencode-go declares ox-alpha-free with the live-verified Console Go effort set", () => {
  const entry = REGISTRY["opencode-go"];
  assert.ok(entry, "opencode-go registry entry must exist");
  const model = entry.models.find((m) => m.id === "ox-alpha-free");
  assert.ok(model, "ox-alpha-free must be registered on opencode-go");
  assert.deepEqual(model.supportedThinkingEfforts, ["low", "high", "max"]);
});

test("clamp: medium → high for ox-alpha-free (the exact Hermes failure)", () => {
  const log = makeLog();
  const body = { ...HERMES_BODY, reasoning_effort: "medium" };
  const result = sanitizeReasoningEffortForProvider(body, "opencode-go", "ox-alpha-free", log);
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as Record<string, unknown>).reasoning_effort, "high");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /medium → high/.test(m)),
    "logs the mapping"
  );
});

test("clamp: disable-shaped efforts map to low (upstream refuses to stop thinking)", () => {
  for (const effort of ["none", "minimal"]) {
    const body = { ...HERMES_BODY, reasoning_effort: effort };
    const result = sanitizeReasoningEffortForProvider(body, "opencode-go", "ox-alpha-free", null);
    assert.equal(
      (result as Record<string, unknown>).reasoning_effort,
      "low",
      `${effort} → low`
    );
  }
});

test("clamp: xhigh → max for ox-alpha-free", () => {
  const body = { ...HERMES_BODY, reasoning_effort: "xhigh" };
  const result = sanitizeReasoningEffortForProvider(body, "opencode-go", "ox-alpha-free", null);
  assert.equal((result as Record<string, unknown>).reasoning_effort, "max");
});

test("clamp: in-vocabulary efforts pass through untouched", () => {
  for (const effort of ["low", "high", "max"]) {
    const body = { ...HERMES_BODY, reasoning_effort: effort };
    const result = sanitizeReasoningEffortForProvider(body, "opencode-go", "ox-alpha-free", null);
    assert.equal(result, body, `${effort} must not be rewritten`);
    assert.equal((result as Record<string, unknown>).reasoning_effort, effort);
  }
});

test("clamp writes back to every carrier present (top-level + reasoning.effort + output_config.effort)", () => {
  const body = {
    ...HERMES_BODY,
    reasoning_effort: "medium",
    reasoning: { effort: "medium" },
    output_config: { effort: "medium" },
  };
  const result = sanitizeReasoningEffortForProvider(body, "opencode-go", "ox-alpha-free", null) as Record<
    string,
    unknown
  >;
  assert.equal(result.reasoning_effort, "high");
  assert.deepEqual(result.reasoning, { effort: "high" });
  assert.deepEqual(result.output_config, { effort: "high" });
});

test("no declaration → pass-through unchanged (#8057 policy for unlisted models)", () => {
  const body = { ...HERMES_BODY, model: "some-unregistered-model", reasoning_effort: "medium" };
  const result = sanitizeReasoningEffortForProvider(body, "opencode-go", "some-unregistered-model", null);
  assert.equal(result, body, "undeclared models keep today's trust-the-upstream behavior");
  assert.equal((result as Record<string, unknown>).reasoning_effort, "medium");
});
