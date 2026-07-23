/**
 * Issue #2929 — Fire Pass (fpk_*) keys marked invalid when /models returns 403.
 *
 * Fireworks Fire Pass keys return `403 "...not authorized for this route."` on
 * the /models endpoint while still serving chat. validateOpenAILikeProvider (the
 * default validator for registered OpenAI-format providers like `fireworks`)
 * used to declare any 403 on /models as "Invalid API key" without trying the
 * chat probe. For a route-restriction 403 it must now fall through to the chat
 * probe; a generic 403 must still short-circuit as invalid.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test("#2929 route-restriction 403 on /models falls through to the chat probe (valid)", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;
  globalThis.fetch = (async () => {
    callCount += 1;
    if (callCount === 1) {
      // models endpoint: route-restriction 403
      return new Response("Fire Pass API keys are not authorized for this route.", {
        status: 403,
      });
    }
    // chat probe succeeds
    return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
    });
  }) as typeof fetch;

  try {
    const result = await validateProviderApiKey({
      provider: "fireworks",
      apiKey: "fpk_test",
      providerSpecificData: {},
    });
    assert.equal(result.valid, true, "Fire Pass key valid for chat must validate via the chat probe");
    assert.equal(callCount, 2, "the chat probe must run after the route-restriction 403 on /models");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#2929 a generic 403 on /models is still 'Invalid API key' (no chat probe)", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;
  globalThis.fetch = (async () => {
    callCount += 1;
    return new Response(JSON.stringify({ error: "invalid api key" }), { status: 403 });
  }) as typeof fetch;

  try {
    const result = await validateProviderApiKey({
      provider: "fireworks",
      apiKey: "bad-key",
      providerSpecificData: {},
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.equal(callCount, 1, "a non-route-restriction 403 must short-circuit without a chat probe");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
