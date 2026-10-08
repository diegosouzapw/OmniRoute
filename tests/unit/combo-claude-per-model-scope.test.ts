// tests/unit/combo-claude-per-model-scope.test.ts
// Regression test for #12334: a priority combo whose steps are different models on one
// Claude OAuth connection stopped at step 1. The model failure was recorded against the
// connection, so the pre-dispatch cooldown gate skipped every sibling step.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  hasPerModelQuota,
  hasPerModelFailureScope,
  shouldMarkAccountExhaustedFrom429,
} from "../../open-sse/services/accountFallback.ts";
import { getPersistedConnectionCooldownSkipReason } from "../../open-sse/services/combo/comboPredicates.ts";

test("claude scopes non-quota failures to the model", () => {
  assert.equal(hasPerModelFailureScope("claude", "claude-fable-5-max"), true);
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max"), true);
});

test("claude quota stays account-wide", () => {
  assert.equal(hasPerModelQuota("claude", "claude-opus-5-max"), false);
  assert.equal(shouldMarkAccountExhaustedFrom429("claude", "claude-sonnet-4-6"), true);
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max", undefined, 429), false);
  assert.equal(hasPerModelFailureScope("gemini", "gemma-4-31b-it", undefined, 429), true);
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max", undefined, 404), true);
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max", undefined, 502), true);
});

test("providers that already scope per model keep both scopes", () => {
  assert.equal(hasPerModelFailureScope("gemini", "gemma-4-31b-it"), true);
  assert.equal(hasPerModelFailureScope("github", "some-model"), true);
});

test("providers with neither scope are unchanged", () => {
  assert.equal(hasPerModelFailureScope("openai", "gpt-4"), false);
});

test("a connection-level override still wins over the provider default", () => {
  assert.equal(hasPerModelFailureScope("claude", "claude-opus-5-max", false), false);
});

test("a sibling step is skipped while its connection carries a real cooldown", () => {
  const skip = getPersistedConnectionCooldownSkipReason(
    { modelStr: "claude/claude-opus-5-max", connectionId: "conn-1" },
    { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(), testStatus: "unavailable" }
  );
  assert.ok(skip, "the gate must still protect siblings when the cooldown is connection-wide");
});

test("a sibling step dispatches once no cooldown is recorded", () => {
  const skip = getPersistedConnectionCooldownSkipReason(
    { modelStr: "claude/claude-opus-5-max", connectionId: "conn-1" },
    { rateLimitedUntil: null, testStatus: "active" }
  );
  assert.equal(
    skip,
    null,
    "step 2 of a drop chain must dispatch after step 1 failed with a model-scoped error"
  );
});
