/**
 * Regression guard: a GitHub Copilot 400 "The requested model is not
 * supported" / "not available for integrator ..." — permanent for THIS
 * account/integration — must get locked out via lockModelIfPerModelQuota so
 * future, separate requests skip the same dead model instead of retrying it
 * on every single auto-combo request forever (observed: every request in
 * production logs wasted several upstream 400 calls on the same GitHub
 * models — gpt-5.4, gpt-5.5, gpt-5.6-luna, etc. — all day).
 *
 * Combo's existing #5249/#2101 guard already lets the current request keep
 * rotating to the next target — that behavior is unchanged and untested
 * here. This guards the NEW cross-request lockout side effect only.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { isModelScoped400 } = await import("../../open-sse/services/combo/comboPredicates.ts");
const { lockModelIfPerModelQuota, isModelLocked, hasPerModelQuota } =
  await import("../../open-sse/services/accountFallback.ts");

const GITHUB_NOT_SUPPORTED_400 = "[400]: The requested model is not supported.";
const GITHUB_INTEGRATOR_400 =
  '[400]: The requested model is not available for integrator "vscode-chat". ' +
  "Available models: [gpt-4.1 claude-fable-5]. Verify the correct Copilot-Integration-Id header is being sent.";

test("isModelScoped400 matches GitHub's two 'model not supported' phrasings", () => {
  assert.equal(isModelScoped400(GITHUB_NOT_SUPPORTED_400), true);
  assert.equal(isModelScoped400(GITHUB_INTEGRATOR_400), true);
});

test("github has per-model quota (locks the model, not the whole connection)", () => {
  assert.equal(hasPerModelQuota("github"), true);
});

test("lockModelIfPerModelQuota locks a model-not-supported GitHub model for future requests", () => {
  const connectionId = `github-${Date.now()}`;

  const locked = lockModelIfPerModelQuota(
    "github",
    connectionId,
    "gpt-5.4",
    "model_capacity",
    60 * 60 * 1000
  );

  assert.equal(locked, true);
  assert.equal(isModelLocked("github", connectionId, "gpt-5.4"), true);
  // A sibling model on the same connection must stay eligible.
  assert.equal(isModelLocked("github", connectionId, "gpt-5.5"), false);
});
