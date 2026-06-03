/**
 * Issues #2361 + #2360 — Registry entries for LLM7.io and Cohere.
 *
 * #2361: `llm7` was visible in the dashboard provider catalog (entry in
 * `src/shared/constants/providers.ts`) but missing from the executor
 * registry, so every connection attempt failed at the test step with a
 * credential error. Verify the executor entry now exists with the public
 * v1 base URL.
 *
 * #2360: Cohere was pointed at the native `/v2/chat` endpoint which
 * returns the Cohere-proprietary shape — the combo validator could not
 * extract any text and surfaced "Provider returned HTTP 200 but no text
 * content." Verify the registry now uses the OpenAI-compatible
 * compatibility layer.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

test("#2361 llm7 is registered with the OpenAI-compatible v1 endpoint", () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).llm7;
  assert.ok(entry, "llm7 should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.baseUrl, "https://api.llm7.io/v1/chat/completions");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.ok(Array.isArray(entry.models), "llm7 must expose a model catalogue");
});

test("#2360 cohere routes via the OpenAI-compatible compatibility layer", () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).cohere;
  assert.ok(entry, "cohere should be present in the executor registry");
  assert.equal(entry.format, "openai");
  // Must be the compatibility endpoint, NOT the native /v2/chat one
  // (which returns the proprietary shape the combo validator cannot read).
  assert.ok(
    typeof entry.baseUrl === "string" &&
      entry.baseUrl.includes("/compatibility/v1/chat/completions"),
    `cohere baseUrl must use the OpenAI-compatible compatibility layer, got: ${entry.baseUrl}`
  );
  assert.ok(
    typeof entry.modelsUrl === "string" && entry.modelsUrl.includes("/compatibility/v1/models"),
    "cohere modelsUrl must use the compatibility endpoint so /v1/models import works"
  );
});
