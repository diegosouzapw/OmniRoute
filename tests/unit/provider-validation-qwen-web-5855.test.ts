import test from "node:test";
import assert from "node:assert/strict";

// Split out of tests/unit/provider-validation-specialty.test.ts (#5855) to keep that
// god-file under its frozen file-size cap — see config/quality/file-size-baseline.json.

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function toPlainHeaders(headers: any) {
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers || {}).map(([key, value]) => [key, String(value)])
  );
}

// #3288 / #3758: qwen-web validation used to fall through to the generic
// OpenAI-compatible validator, which probed a non-existent `/api/v2/models` URL that
// answered with a 307 redirect — blocked by the outbound guard and mislabeled as an
// SSRF block. A specialty validator now probes the real session endpoint instead.
//
// History of the probe URL:
//   - Originally `GET /api/v2/user` (returned `{ user: { ... } }`).
//   - As of mid-2026, `/api/v2/user` is retired and answers `not found` regardless
//     of credentials. The probe moved to `GET /api/v1/auths/` (trailing slash
//     required), which returns the user object at the top level.
test("qwen-web validator probes /api/v1/auths/ (not /api/v2/models) and returns valid on 200", async () => {
  let probedUrl = "";
  let sentHeaders: Record<string, string> = {};
  globalThis.fetch = async (url, init = {}) => {
    probedUrl = String(url);
    sentHeaders = toPlainHeaders(init.headers);
    // /api/v1/auths/ returns the user object at the top level when the
    // Authorization header is valid. The id must be >= 8 chars for the
    // tightened top-level user-id check (#5855) to accept it.
    return new Response(
      JSON.stringify({ id: "u-1234567", email: "tester@example.com", name: "Tester", role: "user" }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const result = await validateProviderApiKey({
    provider: "qwen-web",
    apiKey: "token=eyJqwen; cna=abc; ssxmod_itna=def",
  });

  assert.equal(probedUrl, "https://chat.qwen.ai/api/v1/auths/");
  assert.ok(!probedUrl.includes("/api/v2/models"), "must not probe the bogus /api/v2/models URL");
  assert.ok(!probedUrl.includes("/api/v2/user"), "must not probe the retired /api/v2/user URL");
  assert.equal(sentHeaders.Authorization, "Bearer eyJqwen");
  assert.equal(sentHeaders.source, "web");
  assert.match(sentHeaders.Cookie, /token=eyJqwen/);
  assert.equal(result.valid, true);
});

test("qwen-web validator reports an invalid session (401) without flagging a security block", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });

  const result = await validateProviderApiKey({
    provider: "qwen-web",
    apiKey: "token=stale; cna=abc; ssxmod_itna=def",
  });

  assert.equal(result.valid, false);
  assert.equal((result as { securityBlocked?: boolean }).securityBlocked ?? false, false);
  assert.match(result.error ?? "", /invalid or expired/i);
});

test("qwen-web validator surfaces the WAF/anti-bot HTML challenge as a re-login hint", async () => {
  globalThis.fetch = async () =>
    new Response("<html>aliyun_waf</html>", {
      status: 200,
      headers: { "content-type": "text/html" },
    });

  const result = await validateProviderApiKey({
    provider: "qwen-web",
    apiKey: "token=eyJqwen; cna=abc; ssxmod_itna=def",
  });

  assert.equal(result.valid, false);
  assert.match(result.error ?? "", /WAF|Cookie header/i);
});
