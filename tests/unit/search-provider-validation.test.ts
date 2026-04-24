import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test("serper validation accepts authenticated non-auth upstream errors", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "credits_exhausted" }), {
      status: 402,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "serper-search",
      apiKey: "valid-serper-key",
    });

    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.equal(result.unsupported, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("serper validation still rejects unauthorized keys", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "serper-search",
      apiKey: "bad-serper-key",
    });

    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.equal(result.unsupported, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("kimi-coding-apikey validation uses Kimi Coding messages endpoint", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      method: init.method || "GET",
      headers: init.headers || {},
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "kimi-coding-apikey",
      apiKey: "sk-kimi-test",
    });

    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.equal(calls.length, 1);

    assert.equal(calls[0].url, "https://api.kimi.com/coding/v1/messages");
    assert.equal(calls[0].method, "POST");
    assert.equal(calls[0].headers["x-api-key"], "sk-kimi-test");
    assert.equal(calls[0].headers["anthropic-version"], "2023-06-01");

    for (const call of calls) {
      assert.equal(call.url.includes("?beta=true/messages"), false);
      assert.equal(call.url.includes("?beta=true/models"), false);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("bailian-coding-plan validation accepts 400 as valid auth path", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "valid-bailian-key",
    });

    assert.equal(result.valid, true);
    assert.equal(result.error, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("bailian-coding-plan validation rejects 401 as invalid key", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "bad-bailian-key",
    });

    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("bailian-coding-plan validation rejects 403 as invalid key", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "bad-bailian-key",
    });

    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
