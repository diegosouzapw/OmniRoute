import test from "node:test";
import assert from "node:assert/strict";

// Import BEFORE mocking global.fetch — open-sse/utils/proxyFetch.ts overwrites
// globalThis.fetch as a module-load side effect, so a mock installed before the
// import gets clobbered (same pattern as tests/unit/provider-models-qwen-web-redirect-6267.test.ts).
const { validateWebCookieProvider } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

test("should_not_report_Invalid_when_lmarena_models_probe_307_redirects", async () => {
  const fetchCalls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    fetchCalls.push(url);
    return new Response(null, { status: 307, headers: { location: "https://arena.ai/" } });
  }) as typeof fetch;

  const result = await validateWebCookieProvider({
    provider: "lmarena",
    apiKey: "arena_session=abc123",
    providerSpecificData: {},
  });

  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0], "https://arena.ai/nextjs-api/stream/create-evaluation/models");
  assert.equal(result.valid, false);
  assert.equal(
    result.unsupported,
    true,
    "BUG #7542: current code returns unsupported:false — dashboard renders hard Invalid"
  );
});

test("should_still_report_SESSION_EXPIRED_for_lmarena_401", async () => {
  globalThis.fetch = (async () => {
    return new Response(null, { status: 401 });
  }) as typeof fetch;

  const result = await validateWebCookieProvider({
    provider: "lmarena",
    apiKey: "arena_session=abc123",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.unsupported, false);
  assert.equal((result as { error?: string }).error, "SESSION_EXPIRED");
});
