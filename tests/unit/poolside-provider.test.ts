import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("poolside registry uses /v1/chat/completions baseUrl consumed directly by default executor", () => {
  const entry = REGISTRY.poolside;

  assert.ok(entry, "poolside should exist in registry");
  assert.equal(entry.baseUrl, "https://api.poolside.ai/v1/chat/completions");
  assert.equal(entry.format, "openai");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
});

test("poolside default executor returns the chat endpoint directly", () => {
  const executor = new DefaultExecutor("poolside");

  assert.equal(
    executor.buildUrl("poolside-model", true, 0, {}),
    "https://api.poolside.ai/v1/chat/completions"
  );
});

test("poolside specialty validator returns valid=true on non-auth chat probe responses", async () => {
  const calls: Array<{ url: string; status: number }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: any, init: any) => {
    void init;
    const u = String(url);
    calls.push({ url: u, status: 400 });
    // Poolside returns 400 for minimal probe — that means auth passed
    return new Response(JSON.stringify({ error: { message: "invalid model" } }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const result = await validateProviderApiKey({
      provider: "poolside",
      apiKey: "sky_validkey",
      providerSpecificData: {},
    });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    // Should hit /chat/completions only — no /models probe
    assert.ok(
      calls.every((c) => c.url.endsWith("/chat/completions")),
      `expected only /chat/completions probes, got ${JSON.stringify(calls.map((c) => c.url))}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("poolside specialty validator returns Invalid API key on 401", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  try {
    const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
    const result = await validateProviderApiKey({
      provider: "poolside",
      apiKey: "sky_badkey",
      providerSpecificData: {},
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
