import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-guards-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-reasoning-guards-secret";

const core = await import("../../src/lib/db/core.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const handler = await import("../../src/sse/handlers/reasoningRouting.ts");

/**
 * `applyReasoningRouting` short-circuits on two separate conditions before
 * applying a decision: no rule matched, and the resolver having failed
 * (`resolveDecision` catches and returns `{ error }`).
 *
 * They used to be written as one compound guard —
 * `if (decision && "error" in decision)` — which only narrows its *true*
 * branch, so the `{ error }` arm survived in the union all the way down. The
 * guards are now separate. These tests pin the observable behaviour of the
 * paths that reorder touched; they pass identically before and after it.
 */

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function req() {
  return new Request("https://example.test/v1/chat/completions", { method: "POST" });
}

test("no matching rule passes the request through untouched", async () => {
  rulesDb.invalidateReasoningRoutingRuleCache();

  const body = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  const result = await handler.applyReasoningRouting({
    request: req(),
    body,
    modelStr: "gpt-4o",
    policy: { apiKey: null, apiKeyInfo: null },
    apiKeyInfo: null,
  });

  assert.equal(result.response, null, "no rule must not short-circuit the request");
  assert.equal(result.reasoningDecision, null, "and must not report a decision");
  assert.equal(result.modelStr, "gpt-4o", "the model is forwarded unchanged");
  assert.equal(result.body, body, "the body is forwarded by reference, unmodified");
});

test("the pass-through still reports the extracted reasoning intent", async () => {
  rulesDb.invalidateReasoningRoutingRuleCache();

  const result = await handler.applyReasoningRouting({
    request: req(),
    body: { model: "gpt-4o", reasoning_effort: "high", messages: [] },
    modelStr: "gpt-4o",
    policy: { apiKey: null, apiKeyInfo: null },
    apiKeyInfo: null,
  });

  // Short-circuiting early must not skip intent extraction — downstream routing
  // reads this even when no reasoning rule applied. The model comes back
  // provider-qualified, which is what the rule matcher would have been given.
  assert.equal(result.reasoningIntent.model, "openai/gpt-4o");
  assert.equal(result.reasoningIntent.sourceEffort, "high");
  assert.ok(Array.isArray(result.requestRoutingTags.tags));
});

test("an unknown model with no rules is also a clean pass-through", async () => {
  rulesDb.invalidateReasoningRoutingRuleCache();

  const result = await handler.applyReasoningRouting({
    request: req(),
    body: { model: "not-a-real-provider/not-a-real-model", messages: [] },
    modelStr: "not-a-real-provider/not-a-real-model",
    policy: { apiKey: null, apiKeyInfo: null },
    apiKeyInfo: null,
  });

  assert.equal(result.response, null);
  assert.equal(result.reasoningDecision, null);
});
