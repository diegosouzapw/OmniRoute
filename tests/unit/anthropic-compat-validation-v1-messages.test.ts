// Regression test for the anthropic-compatible connection validator.
//
// Upstream fix: GET /models is not part of the Anthropic API spec; many
// compatible proxies either 404, 401, or 403 on /models even with a valid
// API key. The connection test must therefore not reject the credentials
// solely on a 401/403 from /models — it must fall back to POST /v1/messages
// (the canonical Anthropic auth probe) and treat any non-401/403 messages
// response as proof that the key was accepted.
//
// Ported from decolua/9router 584cf66a (Co-author: Rehan Choirul).

import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test(
  "anthropic-compatible validation falls back to /messages when /models returns 403",
  async () => {
    const calls: { url: string; method: string }[] = [];
    globalThis.fetch = async (url: any, init: any = {}) => {
      const u = String(url);
      const method = String(init?.method || "GET").toUpperCase();
      calls.push({ url: u, method });
      if (u.endsWith("/models")) {
        return new Response(JSON.stringify({ error: "forbidden on models" }), { status: 403 });
      }
      // /messages: upstream accepts the key but rejects the toy payload with 400.
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    };

    const result = await validateProviderApiKey({
      provider: "anthropic-compatible-403-on-models",
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://proxy.example.com/v1/messages" },
    });

    // BEFORE the fix this returned { valid: false, error: "Invalid API key" }
    // because validateAnthropicCompatibleProvider short-circuited on the 403
    // from GET /models without ever probing POST /v1/messages.
    assert.equal(result.valid, true, "403 on /models alone must NOT mark the key invalid");
    assert.equal(result.error, null);

    // The validator must actually exercise the messages endpoint.
    const messagesCall = calls.find(
      (call) => call.url.endsWith("/messages") && call.method === "POST"
    );
    assert.ok(messagesCall, "expected a POST /messages probe after /models 403");
  }
);

test(
  "anthropic-compatible validation still rejects when /messages itself returns 401",
  async () => {
    // Symmetry guard: the fix must NOT make every 403/401 pass. Only the
    // messages probe is authoritative — if it also rejects auth, the key is bad.
    globalThis.fetch = async (url: any) => {
      const u = String(url);
      if (u.endsWith("/models")) {
        return new Response(JSON.stringify({ error: "no models endpoint" }), { status: 403 });
      }
      return new Response(JSON.stringify({ error: "invalid_api_key" }), { status: 401 });
    };

    const result = await validateProviderApiKey({
      provider: "anthropic-compatible-truly-bad-key",
      apiKey: "sk-bad",
      providerSpecificData: { baseUrl: "https://proxy.example.com/v1/messages" },
    });

    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  }
);
