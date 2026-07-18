import { test } from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";

// Repro for GitHub issue #6638: "OmniRoute doesn't respect exhausted quotas"
test("#6638: Ollama Cloud weekly-quota-exhausted 429 must NOT get a short generic rate-limit cooldown", () => {
  const errorText = JSON.stringify({
    error: "You have exceeded your weekly usage quota. Your quota will reset in 3 days.",
  });

  const result = checkFallbackError(
    429,
    errorText,
    0,
    "deepseek-v4-pro",
    "ollama-cloud",
    null,
    null,
    undefined
  );

  console.log("checkFallbackError result:", result);

  assert.equal(
    result.reason,
    "quota_exhausted",
    `expected reason "quota_exhausted" but got "${result.reason}" — quota text is being ignored for apikey-category 429s`
  );
  assert.ok(
    result.cooldownMs > 60 * 60 * 1000,
    `expected a long (>1h) cooldown reflecting the weekly quota reset, got ${result.cooldownMs}ms`
  );
});
