// #7859: adding a token to "Gemini Web (Free)" always failed the connection test with
// "Redirect blocked for GET https://gemini.google.com/app (302)". Root cause:
// validateGeminiWebProvider() probes https://gemini.google.com/app via validationRead(),
// which uses the `validationRead` safeOutboundFetch preset (allowRedirect: false). Gemini
// Web responds with a 302 to a public host (e.g. accounts.google.com) for EVERY session —
// valid or not — so safeOutboundFetch always throws SafeOutboundFetchError with code
// REDIRECT_BLOCKED *before* the "200/302 = valid" status check the function's own comment
// describes ever runs. The throw fell through to the generic catch → toValidationErrorResult(),
// which always returned `valid: false`, making the provider permanently unusable.
//
// Fix: catch REDIRECT_BLOCKED explicitly and treat a redirect to a PUBLIC host as success
// (the session probe reached Gemini and got redirected onward — that is what a valid
// session looks like). A redirect to a PRIVATE/internal host must still be rejected — that
// would be a genuine SSRF signal, not a valid Gemini session.
import test from "node:test";
import assert from "node:assert/strict";

const { validateGeminiWebProvider } = await import(
  "../../src/lib/providers/validation/webProvidersB.ts"
);

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("gemini-web validator: 302 redirect to a PUBLIC host → valid (regression #7859)", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.includes("gemini.google.com/app")) {
      return new Response(null, {
        status: 302,
        headers: { location: "https://accounts.google.com/ServiceLogin" },
      });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const result = await validateGeminiWebProvider({
    apiKey: "__Secure-1PSID=eyJvalidsession",
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test("gemini-web validator: 302 redirect to a PRIVATE host stays invalid (no SSRF)", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.includes("gemini.google.com/app")) {
      return new Response(null, {
        status: 302,
        headers: { location: "http://169.254.169.254/latest/meta-data/" },
      });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const result = await validateGeminiWebProvider({
    apiKey: "__Secure-1PSID=eyJvalidsession",
  });

  assert.equal(result.valid, false);
  assert.equal((result as { securityBlocked?: boolean }).securityBlocked, true);
});
