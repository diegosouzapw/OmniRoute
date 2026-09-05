// #11226 — OpenRouter key validation was vacuous: the probe targeted the PUBLIC
// /api/v1/models endpoint, which answers 200 to any key (or no key at all), so a
// bad key was saved as "valid" and only failed later on real chat traffic with the
// upstream 401 "User not found.". The authenticated key-info endpoint
// (/api/v1/auth/key) is the correct probe: 200 = valid, 401 = invalid.
//
// The fetch stubs below mimic the REAL OpenRouter behavior verified live:
//   GET /api/v1/models   → 200 without any auth (public catalog)
//   GET /api/v1/auth/key → 401 {"error":{"message":"User not found.","code":401}} for a bad key
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { getRegistryEntry } = await import("../../../open-sse/config/providerRegistry.ts");
const { validateProviderApiKey } = await import("../../../src/lib/providers/validation.ts");
const { testProviderApiKey } = await import("../../../bin/cli/provider-test.mjs");

const AUTH_KEY_URL = "https://openrouter.ai/api/v1/auth/key";
const PUBLIC_MODELS_URL = "https://openrouter.ai/api/v1/models";

const BAD_KEY = "sk-or-v1-definitely-invalid-key";
const GOOD_KEY = "sk-or-v1-valid-key";

interface RecordedCall {
  url: string;
  authorization: string | null;
}

/**
 * Stub fetch with the real OpenRouter behavior: /models is public (always 200),
 * /auth/key requires a valid bearer (401 "User not found." otherwise).
 */
function stubRealOpenRouter() {
  const calls: RecordedCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined)
    );
    calls.push({ url, authorization: headers.get("authorization") });

    if (url.startsWith(AUTH_KEY_URL)) {
      const bearer = headers.get("authorization") || "";
      if (bearer === `Bearer ${GOOD_KEY}`) {
        return new Response(JSON.stringify({ data: { label: "ok", is_free_tier: false } }), {
          status: 200,
        });
      }
      return new Response(JSON.stringify({ error: { message: "User not found.", code: 401 } }), {
        status: 401,
      });
    }
    if (url.includes("/models")) {
      // Public catalog — answers 200 regardless of the Authorization header.
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }
    return new Response("{}", { status: 404 });
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

describe("openrouter registry — authenticated key-validation endpoint (#11226)", () => {
  it("declares the authenticated /auth/key probe as its key-test endpoint", () => {
    const entry = getRegistryEntry("openrouter");
    assert.ok(entry, "openrouter must be registered in the execution registry");
    assert.equal(entry.testKeyModelsUrl, AUTH_KEY_URL);
  });

  it("marks a bad key INVALID even though the public /models endpoint answers 200", async () => {
    const stub = stubRealOpenRouter();
    try {
      const result = await validateProviderApiKey({ provider: "openrouter", apiKey: BAD_KEY });
      assert.equal(result.valid, false, "bad key must not validate against the public catalog");
      assert.equal(result.error, "Invalid API key");
      assert.deepEqual(
        stub.calls.map((c) => c.url),
        [AUTH_KEY_URL],
        "must probe the authenticated key endpoint, not the public /models"
      );
      assert.equal(stub.calls[0].authorization, `Bearer ${BAD_KEY}`);
    } finally {
      stub.restore();
    }
  });

  it("marks a good key VALID via /auth/key and never falls back to the chat probe", async () => {
    const stub = stubRealOpenRouter();
    try {
      const result = await validateProviderApiKey({ provider: "openrouter", apiKey: GOOD_KEY });
      assert.equal(result.valid, true);
      assert.equal(result.error, null);
      assert.deepEqual(
        stub.calls.map((c) => c.url),
        [AUTH_KEY_URL]
      );
    } finally {
      stub.restore();
    }
  });
});

describe("omniroute providers test — openrouter probe (#11226)", () => {
  it("marks a bad key INVALID even though the public /models endpoint answers 200", async () => {
    const stub = stubRealOpenRouter();
    try {
      const result = await testProviderApiKey({ provider: "openrouter", apiKey: BAD_KEY });
      assert.equal(result.valid, false, "CLI test must not trust the public /models endpoint");
      assert.equal(result.error, "Invalid API key");
      assert.deepEqual(
        stub.calls.map((c) => c.url),
        [AUTH_KEY_URL]
      );
    } finally {
      stub.restore();
    }
  });

  it("marks a good key VALID via /auth/key", async () => {
    const stub = stubRealOpenRouter();
    try {
      const result = await testProviderApiKey({ provider: "openrouter", apiKey: GOOD_KEY });
      assert.equal(result.valid, true);
      assert.equal(result.error, null);
      assert.deepEqual(
        stub.calls.map((c) => c.url),
        [AUTH_KEY_URL]
      );
    } finally {
      stub.restore();
    }
  });

  it("does not change the probe for other OpenAI-like providers (openai still uses /models)", async () => {
    const stub = stubRealOpenRouter();
    try {
      const result = await testProviderApiKey({ provider: "openai", apiKey: GOOD_KEY });
      assert.equal(result.valid, true);
      assert.deepEqual(
        stub.calls.map((c) => c.url),
        ["https://api.openai.com/v1/models"]
      );
      assert.ok(!stub.calls.some((c) => c.url === PUBLIC_MODELS_URL));
    } finally {
      stub.restore();
    }
  });
});
