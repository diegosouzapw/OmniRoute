/**
 * Per-request refused-route skip on 429 — a request never re-sends to a route
 * the upstream just refused with 429 (keyed by host:port of the refused route).
 *
 * Goes through `execute()` with a stubbed fetch: the candidate predicate is
 * a non-exported closure and the geo-block helper is out of scope — no test
 * level without a new interface. Fixture entries injected via
 * `providerSpecificData` (`syncAccountsFromCredentials`), non-premium model
 * (avoids the 402 guard), stubbed fetch (the fire-and-forget reachability
 * probe never gates the first dispatch — `proxyFetch.ts:686-697`).
 * Sequential runs, no parallelism.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");

const log = { debug() {}, info() {}, warn() {}, error() {} };

function proxy(host: string, port: number) {
  return { type: "http", host, port };
}

function entriesFor(entries: Array<{ fingerprint: string; proxy: unknown }>) {
  return {
    providerSpecificData: {
      fingerprints: entries.map((e) => e.fingerprint),
      accountProxies: entries.map((e) => ({ fingerprint: e.fingerprint, proxy: e.proxy })),
    },
  } as never;
}

async function runWith429Stub(credentials: never): Promise<{ calls: number; status: number }> {
  const exec = new OpencodeExecutor("opencode");
  let calls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    calls++;
    return new Response(JSON.stringify({ error: { message: "rate limited" } }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  try {
    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials,
      log,
    });
    return { calls, status: (result as { response: Response }).response.status };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("refused route skipped: refused route tried once per request", async () => {
  const shared = proxy("127.0.0.1", 18091);
  const { calls } = await runWith429Stub(
    entriesFor([
      { fingerprint: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", proxy: shared },
      { fingerprint: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", proxy: shared },
    ])
  );
  assert.strictEqual(calls, 1, `same route dialed twice: ${calls} calls, expected 1`);
});

test("refused routes fully excluded drain lastResult 429 with no new error", async () => {
  const shared = proxy("127.0.0.1", 18092);
  const { calls, status } = await runWith429Stub(
    entriesFor([
      { fingerprint: "cccccccccccccccccccccccccccccccc", proxy: shared },
      { fingerprint: "dddddddddddddddddddddddddddddddd", proxy: shared },
    ])
  );
  assert.strictEqual(status, 429);
  assert.ok(calls <= 2, `calls beyond budget: ${calls}`);
});

test("refused route skip keeps distinct routes: two distinct routes produce two calls", async () => {
  const { calls, status } = await runWith429Stub(
    entriesFor([
      { fingerprint: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", proxy: proxy("127.0.0.1", 18093) },
      { fingerprint: "ffffffffffffffffffffffffffffffff", proxy: proxy("127.0.0.1", 18094) },
    ])
  );
  assert.strictEqual(calls, 2, `over-exclusion: ${calls} calls, expected 2`);
  assert.strictEqual(status, 429);
});
