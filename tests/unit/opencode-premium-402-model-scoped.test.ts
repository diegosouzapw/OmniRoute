/**
 * #8681 (2026-10-08 live): the opencode executor refuses premium models on a
 * keyless connection LOCALLY with a synthetic 402 ("This model requires an opencode
 * API key — add one in Settings → Providers.", code premium_model_requires_key).
 *
 * The model needs a key this connection does not have — a per-model capability
 * failure. Classifying it QUOTA_EXHAUSTED (the generic 402 rule) made chatCore's
 * quota branch mark the shared noauth connection credits_exhausted, taking
 * big-pickle / nemotron siblings down and surfacing "No active credentials for
 * provider: opencode". MODEL_NOT_FOUND keeps it model-scoped: chatCore locks only
 * that model, the connection and siblings stay healthy.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");

const PREMIUM_402_BODY =
  "This model requires an opencode API key — add one in Settings → Providers.";

test("opencode premium 402 (requires an opencode API key) is MODEL_NOT_FOUND, not quota", () => {
  const errorType = classifyProviderError(402, PREMIUM_402_BODY, "opencode");
  assert.equal(errorType, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("opencode-go premium 402 is MODEL_NOT_FOUND too (family-wide guard)", () => {
  assert.equal(
    classifyProviderError(402, PREMIUM_402_BODY, "opencode-go"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
});

test("a NON-opencode provider's 402 keeps the generic QUOTA_EXHAUSTED classification", () => {
  assert.equal(
    classifyProviderError(402, PREMIUM_402_BODY, "groq"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
  assert.equal(
    classifyProviderError(402, "usage balance exhausted", "grok-cli"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
});

test("an opencode 402 without the premium-requires-key text keeps QUOTA_EXHAUSTED", () => {
  assert.equal(
    classifyProviderError(402, "Your monthly quota has been exhausted.", "opencode"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
});

test("the same premium text on a 403 is not misclassified as model-not-found", () => {
  // The guard is scoped to status 402 — a 403 free-tier refusal must keep its own
  // PROJECT_ROUTE_ERROR path (see opencode-free-tier-refusal-predicate.test.ts).
  assert.notEqual(
    classifyProviderError(403, PREMIUM_402_BODY, "opencode"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
});
