import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { validateKimiWebProvider } from "../../src/lib/providers/validation/webProvidersA.ts";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function headerValue(init: RequestInit | undefined, name: string): string | undefined {
  return ((init?.headers ?? {}) as Record<string, string>)[name];
}

test("#11515 kimi-web health probe matches the executor domain and browser headers", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ id: "kimi-user" }), { status: 200 });
  };

  const result = await validateKimiWebProvider({ apiKey: "access_token=kimi-session" });

  assert.deepEqual(result, { valid: true, error: null });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://www.kimi.ai/api/user");
  assert.equal(headerValue(calls[0].init, "Authorization"), "Bearer kimi-session");
  assert.equal(headerValue(calls[0].init, "Origin"), "https://www.kimi.ai");
  assert.equal(headerValue(calls[0].init, "Referer"), "https://www.kimi.ai/");
});

test("#11515 kimi-web auth errors identify the executor domain", async () => {
  globalThis.fetch = async () => new Response("", { status: 401 });

  const result = await validateKimiWebProvider({ apiKey: "kimi-session" });

  assert.equal(result.valid, false);
  assert.match(result.error ?? "", /https:\/\/www\.kimi\.ai/);
  assert.doesNotMatch(result.error ?? "", /https:\/\/www\.kimi\.com/);
});
