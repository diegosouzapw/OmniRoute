import test from "node:test";
import assert from "node:assert/strict";
import { defaultOmniRouteModelsFetcher } from "../src/index.js";

test("defaultOmniRouteModelsFetcher attaches statusCode on HTTP 401", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "authentication expired" }), {
      status: 401,
      statusText: "Unauthorized",
    })) as typeof fetch;
  try {
    await assert.rejects(
      () => defaultOmniRouteModelsFetcher("https://gateway.example/v1", "test-key"),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        const rec = err as Error & { statusCode?: number; status?: number };
        assert.equal(rec.statusCode, 401);
        assert.equal(rec.status, 401);
        assert.match(rec.message, /401/);
        return true;
      },
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("defaultOmniRouteModelsFetcher default timeout is 30s", async () => {
  const original = globalThis.fetch;
  let signal: AbortSignal | undefined;
  globalThis.fetch = (async (_input, init) => {
    signal = init?.signal ?? undefined;
    return new Response(JSON.stringify({ object: "list", data: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    await defaultOmniRouteModelsFetcher("https://gateway.example/v1", "test-key");
    assert.equal(signal instanceof AbortSignal, true);
  } finally {
    globalThis.fetch = original;
  }
});
