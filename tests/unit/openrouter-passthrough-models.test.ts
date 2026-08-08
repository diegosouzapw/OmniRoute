/**
 * Regression test — OpenRouter model-lockout cross-contamination.
 *
 * Root cause: the `openrouter` provider registry entry multiplexes hundreds
 * of independent upstream models (openrouter/poolside/*, openrouter/nvidia/*,
 * openrouter/google/*, openrouter/cohere/*, ...) behind ONE base URL and ONE
 * API key connection — architecturally identical to `nvidia`, `modelscope`,
 * `synthetic`, and `kilo-gateway`, all of which set `passthroughModels: true`
 * so a single model's 404/429 stays scoped to that model instead of cooling
 * down the whole connection (see accountFallback.ts's `hasPerModelQuota` doc
 * comment). Without the flag, a single upstream 404 for one dead/renamed
 * model (confirmed live: `poolside/laguna-m.1:free`, genuinely unavailable on
 * OpenRouter) poisoned every OTHER OpenRouter model on the same connection
 * for the cooldown window, each surfacing the ORIGINAL failing model's stale
 * error message on its own unrelated request — this was traced live via
 * direct per-model tool-calling reliability tests against all models in the
 * "default" combo (2026-08-06), the same class of bug as #6773 (nvidia).
 */
import test from "node:test";
import assert from "node:assert/strict";

const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const providerRegistry = await import("../../open-sse/config/providerRegistry.ts");

test("openrouter registry entry sets passthroughModels", () => {
  const entry = providerRegistry.getRegistryEntry("openrouter");
  assert.equal(
    entry?.passthroughModels,
    true,
    "openrouter multiplexes hundreds of independent third-party models behind one " +
      "connection — it should set passthroughModels: true like nvidia/modelscope/" +
      "synthetic/kilo-gateway, so a single stale model's 404 does not cool down the " +
      "whole connection for all other models"
  );
});

test("hasPerModelQuota('openrouter') is true, so a 404 on one openrouter model is model-scoped", () => {
  assert.equal(
    accountFallback.hasPerModelQuota("openrouter", "poolside/laguna-m.1:free"),
    true,
    "expected openrouter to use per-model lockout (like nvidia/gemini/github/codex/" +
      "compatible providers) so a 404 on one model doesn't cool down the other " +
      "openrouter models"
  );
});

test("checkFallbackError + lockModelIfPerModelQuota scope a single-model 404 to just that model for openrouter", () => {
  // A plain upstream 404 ("No endpoints found for <model>" — the exact live
  // symptom for poolside/laguna-m.1:free) falls through checkFallbackError's
  // generic catch-all: shouldFallback=true with a non-zero connection
  // cooldown. With hasPerModelQuota=true, lockModelIfPerModelQuota now scopes
  // that cooldown to just the one failing model instead of the whole
  // connection.
  const result = accountFallback.checkFallbackError(
    404,
    "No endpoints found for poolside/laguna-m.1:free.",
    0,
    "poolside/laguna-m.1:free",
    "openrouter",
    null,
    null,
    null
  );
  assert.equal(result.shouldFallback, true, "404 triggers a connection-level fallback/cooldown");
  assert.ok(
    (result.cooldownMs ?? 0) > 0,
    "the connection-level cooldown is non-zero, so it also blocks the other openrouter" +
      " models unless it gets scoped to just this model below"
  );

  const locked = accountFallback.lockModelIfPerModelQuota(
    "openrouter",
    "conn-openrouter-lockout-test",
    "poolside/laguna-m.1:free",
    "unknown",
    result.cooldownMs ?? 30_000
  );
  assert.equal(
    locked,
    true,
    "expected the 404 to be scoped to just this one model (per-model lockout), " +
      "not the whole connection"
  );
});

test("a locked-out model does not block a DIFFERENT model on the same openrouter connection", () => {
  const connectionId = "conn-openrouter-cross-model-test";
  const cooldownMs = 60_000;

  accountFallback.lockModelIfPerModelQuota(
    "openrouter",
    connectionId,
    "poolside/laguna-m.1:free",
    "unknown",
    cooldownMs
  );

  assert.equal(
    accountFallback.isModelLocked("openrouter", connectionId, "poolside/laguna-m.1:free"),
    true,
    "the failing model itself should be locked"
  );
  assert.equal(
    accountFallback.isModelLocked(
      "openrouter",
      connectionId,
      "nvidia/nemotron-3-nano-30b-a3b:free"
    ),
    false,
    "a DIFFERENT model on the same connection must not be affected by the other " +
      "model's lockout — this is exactly the live cross-contamination symptom"
  );
});
