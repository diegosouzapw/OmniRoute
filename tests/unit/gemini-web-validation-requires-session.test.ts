import test from "node:test";
import assert from "node:assert/strict";

const { validateGeminiWebProvider } =
  await import("../../src/lib/providers/validation/webProvidersB.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

const SIGNED_OUT_HTML = "<html><body>Gemini landing page (signed out)</body></html>";
const SIGNED_IN_HTML = '<html><script>WIZ_global_data={"SNlM0e":"AKlEn5xyz123"}</script></html>';

test("gemini-web public validator: 200 signed-out page is not a valid session", async () => {
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://gemini.google.com/app");
    return new Response(SIGNED_OUT_HTML, { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "gemini-web",
    apiKey: "__Secure-1PSID=eyJPSID",
  });

  assert.equal(result.valid, false);
  assert.match(result.error || "", /Not signed in/i);
});

test("junk cookie value + 200 signed-out landing page (no SNlM0e) must be invalid (#15387)", async () => {
  globalThis.fetch = async () =>
    new Response(SIGNED_OUT_HTML, { status: 200, headers: { "content-type": "text/html" } });
  const result = await validateGeminiWebProvider({ apiKey: "junk123" });
  assert.equal(result.valid, false);
});

test("non-PSID cookie foo=bar must be rejected before any network call (#15387)", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(SIGNED_OUT_HTML, { status: 200 });
  };
  const result = await validateGeminiWebProvider({ apiKey: "foo=bar" });
  assert.equal(result.valid, false);
  assert.equal(calls, 0);
});

test("pasted 'Cookie:' header prefix is stripped and PSID still found (#15387)", async () => {
  let sentCookie = "";
  globalThis.fetch = async (_url, init) => {
    sentCookie = String((init?.headers as Record<string, string>)?.Cookie ?? "");
    return new Response(SIGNED_IN_HTML, { status: 200 });
  };
  const result = await validateGeminiWebProvider({
    apiKey: "Cookie: __Secure-1PSID=g.a0abcdef; __Secure-1PSIDTS=ts",
  });
  assert.equal(result.valid, true);
  assert.ok(sentCookie.startsWith("__Secure-1PSID=g.a0abcdef"), sentCookie);
});

test("unknown redirect (non-Google host) must not be valid (#15387)", async () => {
  globalThis.fetch = async () =>
    new Response(null, { status: 302, headers: { location: "https://example.com/x" } });
  const result = await validateGeminiWebProvider({ apiKey: "__Secure-1PSID=g.a0abcdef" });
  assert.equal(result.valid, false);
});

test("200 with SNlM0e token stays valid (control)", async () => {
  globalThis.fetch = async () => new Response(SIGNED_IN_HTML, { status: 200 });
  const result = await validateGeminiWebProvider({ apiKey: "__Secure-1PSID=g.a0abcdef" });
  assert.equal(result.valid, true);
});
