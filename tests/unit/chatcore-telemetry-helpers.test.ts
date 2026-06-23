import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR set BEFORE importing anything that may touch the DB
// (maybeSyncClaudeExtraUsageState -> fetchLiveProviderLimits -> getProviderConnectionById).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-telemetry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { forwardDashboardEventToLiveWs, maybeSyncClaudeExtraUsageState } =
  await import("../../open-sse/handlers/chatCore/telemetryHelpers.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;
const originalLiveWsPort = process.env.LIVE_WS_PORT;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalLiveWsPort === undefined) {
    delete process.env.LIVE_WS_PORT;
  } else {
    process.env.LIVE_WS_PORT = originalLiveWsPort;
  }
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── forwardDashboardEventToLiveWs ───────────────────────────────────────────

test("forwardDashboardEventToLiveWs POSTs event+payload+timestamp as JSON to the default port", async () => {
  delete process.env.LIVE_WS_PORT;
  let capturedUrl: string | undefined;
  let capturedInit: RequestInit | undefined;
  const stubFetch: typeof globalThis.fetch = (async (url: string, init: RequestInit) => {
    capturedUrl = url;
    capturedInit = init;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  const before = Date.now();
  await forwardDashboardEventToLiveWs("my-event", { foo: "bar" }, { fetch: stubFetch });
  const after = Date.now();

  // Default port is 20129 when LIVE_WS_PORT is unset.
  assert.equal(capturedUrl, "http://127.0.0.1:20129/__omniroute_event");
  assert.equal(capturedInit?.method, "POST");
  assert.equal(
    (capturedInit?.headers as Record<string, string>)["content-type"],
    "application/json"
  );
  assert.ok(capturedInit?.signal, "an AbortSignal is attached for the 1.5s timeout");

  const parsed = JSON.parse(capturedInit?.body as string);
  assert.equal(parsed.event, "my-event");
  assert.deepEqual(parsed.payload, { foo: "bar" });
  assert.equal(typeof parsed.timestamp, "number");
  assert.ok(
    parsed.timestamp >= before && parsed.timestamp <= after,
    "timestamp is Date.now() captured at call time"
  );
});

test("forwardDashboardEventToLiveWs honors LIVE_WS_PORT override", async () => {
  process.env.LIVE_WS_PORT = "31337";
  let capturedUrl: string | undefined;
  const stubFetch: typeof globalThis.fetch = (async (url: string) => {
    capturedUrl = url;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  await forwardDashboardEventToLiveWs("e", null, { fetch: stubFetch });

  assert.equal(capturedUrl, "http://127.0.0.1:31337/__omniroute_event");
});

test("forwardDashboardEventToLiveWs swallows fetch rejection and still resolves", async () => {
  const stubFetch: typeof globalThis.fetch = (async () => {
    throw new Error("sidecar down");
  }) as typeof fetch;

  // Must not throw — best-effort sidecar bridge; the catch swallows.
  await assert.doesNotReject(forwardDashboardEventToLiveWs("e", { a: 1 }, { fetch: stubFetch }));
});

// Regression test for the OOM-on-dead-live-ws bug: the function must use
// `getOriginalFetch()` (the unpatched fetch) by default, NOT the global
// `fetch` which is wrapped by proxyFetch.ts to retry on connection failures.
// If a future refactor swaps back to the global `fetch`, this test fails:
// the slow global fetch would be called instead of the fast injected one.
test("forwardDashboardEventToLiveWs bypasses the global (proxy-patched) fetch — uses getOriginalFetch() by default", async () => {
  let globalFetchCalled = false;
  let injectedFetchCalled = false;
  let injectedLatencyMs = 0;

  // Simulate the production proxy-patched global fetch: it retries on
  // ECONNREFUSED with a delay. In production this is the retry-storm that
  // OOMs the process when the live-ws server is down.
  globalThis.fetch = (async () => {
    globalFetchCalled = true;
    await new Promise((r) => setTimeout(r, 50));
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  const start = Date.now();
  await forwardDashboardEventToLiveWs("e", null, {
    fetch: (async () => {
      injectedFetchCalled = true;
      return new Response("ok", { status: 200 });
    }) as typeof fetch,
  });
  injectedLatencyMs = Date.now() - start;

  assert.equal(
    globalFetchCalled,
    false,
    "the proxy-patched global fetch must NOT be called — only getOriginalFetch() / injected stub"
  );
  assert.equal(injectedFetchCalled, true, "the injected fetch was called");
  assert.ok(
    injectedLatencyMs < 30,
    `call must complete without retry-induced delay (took ${injectedLatencyMs}ms)`
  );
});

test("forwardDashboardEventToLiveWs uses the original (pre-patch) fetch when no deps are passed", async () => {
  // When deps.fetch is not provided, the function must use getOriginalFetch()
  // (the unpatched Node fetch), NOT the proxy-patched globalThis.fetch.
  // We verify by patching globalThis.fetch to throw — if the function used it,
  // it would still swallow the throw, but the side effect of `globalFetchCalled`
  // would be true. Since the function uses getOriginalFetch() instead,
  // globalThis.fetch is never called.
  let globalFetchCalled = false;
  globalThis.fetch = (async () => {
    globalFetchCalled = true;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  // No deps passed — must fall back to getOriginalFetch().
  await forwardDashboardEventToLiveWs("e", null);

  assert.equal(
    globalFetchCalled,
    false,
    "without deps, the function uses getOriginalFetch() and does NOT touch the proxy-patched globalThis.fetch"
  );
});

// ─── maybeSyncClaudeExtraUsageState ──────────────────────────────────────────

test("maybeSyncClaudeExtraUsageState returns early when connectionId is falsy (no fetch)", async () => {
  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    return new Response("", { status: 200 });
  }) as typeof fetch;

  await maybeSyncClaudeExtraUsageState({
    provider: "claude",
    connectionId: null,
    providerSpecificData: {},
    log: null,
  });

  assert.equal(fetchCalled, false, "guard short-circuits before any network/DB work");
});

test("maybeSyncClaudeExtraUsageState returns early for non-claude provider (block disabled)", async () => {
  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    return new Response("", { status: 200 });
  }) as typeof fetch;

  await maybeSyncClaudeExtraUsageState({
    provider: "openai",
    connectionId: "some-conn",
    providerSpecificData: {},
    log: null,
  });

  assert.equal(fetchCalled, false, "isClaudeExtraUsageBlockEnabled is false for non-claude");
});

test("maybeSyncClaudeExtraUsageState returns early for claude with blockExtraUsage:false", async () => {
  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    return new Response("", { status: 200 });
  }) as typeof fetch;

  await maybeSyncClaudeExtraUsageState({
    provider: "claude",
    connectionId: "some-conn",
    providerSpecificData: { blockExtraUsage: false },
    log: null,
  });

  assert.equal(fetchCalled, false, "explicit blockExtraUsage:false disables the block");
});

test("maybeSyncClaudeExtraUsageState enters the try for claude+enabled, swallows the error, and logs via log.debug", async () => {
  // provider=claude, providerSpecificData={} (blockExtraUsage !== false), connectionId set
  // -> passes the guard -> calls the REAL fetchLiveProviderLimits("bogus-conn") which
  // looks the connection up in the (empty) DB, finds nothing, throws "Connection not found",
  // and the function's internal try/catch swallows it while logging to log.debug.
  const calls: unknown[][] = [];
  const log = {
    debug: (...args: unknown[]) => {
      calls.push(args);
    },
  };

  await assert.doesNotReject(
    maybeSyncClaudeExtraUsageState({
      provider: "claude",
      connectionId: "bogus-conn-id",
      providerSpecificData: {},
      log,
    })
  );

  assert.equal(calls.length, 1, "the swallowed error path logs exactly once");
  assert.equal(calls[0][0], "CLAUDE_USAGE");
  assert.match(
    String(calls[0][1]),
    /Failed to sync Claude extra-usage state:/,
    "logs the sync-failure message with the underlying error text"
  );
});
