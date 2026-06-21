// Regression guard for the #4023 dispatch order: a provider that has BOTH a dedicated
// validator and a WEB_COOKIE_PROVIDERS entry must use its stricter, provider-specific
// validator — not the generic web-cookie session probe (which treats any non-401/403
// status as a valid session). #4023 added ~22 providers to WEB_COOKIE_PROVIDERS and routed
// them all through the generic validator, silently bypassing the specific checks
// (qwen-web #3958 user-object, grok-web #3474 IP-reputation, chatgpt-web accessToken, …).
// The dispatch now runs SPECIALTY_VALIDATORS before the generic web-cookie fallback.
//
// qwen-web is the canonical case: it is in WEB_COOKIE_PROVIDERS AND has validateQwenWebProvider,
// which (unlike the generic validator) rejects a 200 response that has no `user` object —
// Qwen returns HTTP 200 even for invalid tokens. The mock here is the plain `globalThis.fetch`
// the specific validator reads at call time.

import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("qwen-web prefers its specific validator over the generic web-cookie probe (#4023)", async () => {
  // A 200 with no `user` object: the GENERIC validator would treat 200 as valid; the
  // qwen-web-SPECIFIC validator must reject it (the #3958 false-positive guard).
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({}), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc123" });
  assert.strictEqual(result.valid, false, "specific validator must reject a 200 with no user object");
  assert.match(result.error, /invalid or expired/i);
});
