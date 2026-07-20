import test from "node:test";
import assert from "node:assert/strict";

import { getExecutorTimeoutMs } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { FETCH_TIMEOUT_MS } from "../../open-sse/config/constants.ts";
import { getModelTimeoutMs } from "../../open-sse/config/providerModels.ts";

test("model-level timeoutMs wins over provider-level and global", () => {
  const executor = { getTimeoutMs: () => 30000 };
  const result = getExecutorTimeoutMs(executor, "codex", "gpt-5.5-high");
  assert.equal(result, 1200000);
  assert.notEqual(result, 30000);
  assert.notEqual(result, FETCH_TIMEOUT_MS);
});

test("provider-level timeoutMs still wins over global when no model override exists (regression guard)", () => {
  const executor = { getTimeoutMs: () => 45000 };
  // No model registered for this provider/model combo -> no model override,
  // must still fall back to the provider-level executor.getTimeoutMs().
  const result = getExecutorTimeoutMs(executor, "codex", "gpt-5.5-medium");
  assert.equal(result, 45000);
});

test("global FETCH_TIMEOUT_MS remains the fallback with neither override", () => {
  const executor = {};
  const result = getExecutorTimeoutMs(executor, "codex", "gpt-5.5-medium");
  assert.equal(result, FETCH_TIMEOUT_MS);
});

test("getExecutorTimeoutMs is backward compatible when called with only an executor", () => {
  const executor = { getTimeoutMs: () => 5000 };
  assert.equal(getExecutorTimeoutMs(executor), 5000);
});

test("gpt-5.5-high resolves to its override; gpt-5.5-medium resolves to the provider/global default (reported-scenario guard)", () => {
  const executor = {};
  const highResult = getExecutorTimeoutMs(executor, "codex", "gpt-5.5-high");
  const mediumResult = getExecutorTimeoutMs(executor, "codex", "gpt-5.5-medium");
  assert.equal(highResult, 1200000);
  assert.equal(mediumResult, FETCH_TIMEOUT_MS);
  assert.notEqual(highResult, mediumResult);
});

test("getModelTimeoutMs returns the registered override for reasoning-heavy codex tiers", () => {
  assert.equal(getModelTimeoutMs("codex", "gpt-5.5-high"), 1200000);
  assert.equal(getModelTimeoutMs("codex", "gpt-5.5-xhigh"), 1200000);
  assert.equal(getModelTimeoutMs("codex", "gpt-5.5-medium"), undefined);
  assert.equal(getModelTimeoutMs("codex", "nonexistent-model"), undefined);
});
