import test from "node:test";
import assert from "node:assert/strict";

const usageFetcher = await import("../../src/lib/usage/fetcher.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("usage fetcher retries Antigravity quota discovery across shared fallback URLs", async () => {
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url).includes("daily-cloudcode-pa.googleapis.com")) {
      return new Response("unavailable", { status: 503 });
    }

    return new Response(
      JSON.stringify({
        models: {
          "claude-sonnet-4-6": {
            quotaInfo: {
              remainingFraction: 0.4,
              resetTime: new Date(Date.now() + 60_000).toISOString(),
            },
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const usage = await usageFetcher.getUsageForProvider({
    provider: "antigravity",
    accessToken: "ag-token",
    providerSpecificData: { email: "coder@example.com" },
  });

  assert.deepEqual(
    calls.map((call) => call.url),
    [
      "https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels",
      "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:fetchAvailableModels",
    ]
  );
  assert.match(calls[1].init.headers["User-Agent"], /^antigravity\//);
  assert.equal(usage.plan, "Antigravity");
  assert.equal(usage.quotas.models.total, 1);
  assert.equal(usage.modelQuotas["claude-sonnet-4-6"].remaining, 40);
});
