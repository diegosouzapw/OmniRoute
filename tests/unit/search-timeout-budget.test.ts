/**
 * The search deadlines are fixed constants today, so a slow upstream is cut
 * off at 10-15s with no way to raise it. These tests pin the override: a
 * caller-supplied budget replaces the constant, and with no override the
 * request still gets a deadline instead of hanging forever.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { handleSearch } = await import("../../open-sse/handlers/search.ts");

function hangingFetch() {
  return (_url: unknown, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;
      if (signal?.aborted) {
        reject(signal.reason ?? new Error("aborted"));
        return;
      }
      signal?.addEventListener("abort", () => {
        reject(signal.reason ?? new Error("aborted"));
      });
    });
}

test("a search budget cuts off a hanging upstream at the budget", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = hangingFetch() as typeof fetch;
  const started = Date.now();
  try {
    const result = await handleSearch({
      query: "react hooks",
      provider: "context7",
      maxResults: 1,
      searchType: "web",
      credentials: {},
      log: null,
      timeoutMs: 50,
    });
    const elapsed = Date.now() - started;
    assert.equal(result.success, false);
    assert.ok(elapsed < 2000, `returned in ${elapsed}ms, budget did not apply`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("without a budget a hanging upstream is still cut off", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = hangingFetch() as typeof fetch;
  try {
    const result = await Promise.race([
      handleSearch({
        query: "react hooks",
        provider: "context7",
        maxResults: 1,
        searchType: "web",
        credentials: {},
        log: null,
      }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000)),
    ]);
    assert.equal(result, null, "the default deadline fired inside 1s");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a per-provider override outlasts the provider's own timeout", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = hangingFetch() as typeof fetch;
  const started = Date.now();
  try {
    const result = await handleSearch({
      query: "react hooks",
      provider: "context7",
      maxResults: 1,
      searchType: "web",
      credentials: {},
      log: null,
      // context7's own timeout is 10s. The budget is long, so only the
      // per-provider override can cut this off inside 2s.
      timeoutMs: 30000,
      providerTimeoutsMs: { context7: 50 },
    });
    const elapsed = Date.now() - started;
    assert.equal(result.success, false);
    assert.ok(
      elapsed < 2000,
      `returned in ${elapsed}ms, the provider's own 10s still won`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
