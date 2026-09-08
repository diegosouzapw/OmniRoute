import test from "node:test";
import assert from "node:assert/strict";

import PROVIDERS_MAP from "../../src/lib/oauth/providers/index.ts";
import { GITHUB_CONFIG, KIMI_CODING_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";

// Regression guard for the OAuth device-flow pollToken double body read.
//
// pollToken used to try `response.json()` first and fall back to
// `response.text()` in the catch. Once `.json()` rejects on a non-JSON body,
// the stream is already consumed, so the `.text()` fallback always throws
// `TypeError: Body is unusable` — rejecting pollToken and surfacing as a
// generic 500 on /api/oauth/<provider>/poll instead of the intended graceful
// `{ error: "invalid_response" }` payload. Non-JSON responses are realistic
// when the OAuth upstream sits behind a CDN/anti-bot HTML error page or a
// proxy interstitial (auth.kimi.com in particular).
//
// The guard drives the real provider modules with a stubbed global fetch.

function stubFetch(body: string, init?: ResponseInit) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(body, init);
  return () => {
    globalThis.fetch = originalFetch;
  };
}

const providers = [
  { id: "kimi-coding", config: KIMI_CODING_CONFIG },
  { id: "github", config: GITHUB_CONFIG },
] as const;

for (const { id, config } of providers) {
  test(`${id} pollToken returns invalid_response (not a rejection) on non-JSON body`, async () => {
    const restore = stubFetch("<html><body>502 Bad Gateway</body></html>", {
      status: 502,
      headers: { "content-type": "text/html" },
    });
    try {
      const result = await PROVIDERS_MAP[id].pollToken(config, "device-code-stub");
      assert.equal(result.ok, false);
      assert.equal(result.data.error, "invalid_response");
      assert.match(result.data.error_description, /502 Bad Gateway/);
    } finally {
      restore();
    }
  });

  test(`${id} pollToken still parses JSON bodies`, async () => {
    const restore = stubFetch(JSON.stringify({ error: "authorization_pending" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
    try {
      const result = await PROVIDERS_MAP[id].pollToken(config, "device-code-stub");
      assert.equal(result.ok, false);
      assert.equal(result.data.error, "authorization_pending");
    } finally {
      restore();
    }
  });
}
