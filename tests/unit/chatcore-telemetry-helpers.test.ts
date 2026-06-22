import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR set BEFORE importing anything that may touch the DB
// (maybeSyncClaudeExtraUsageState -> fetchLiveProviderLimits -> getProviderConnectionById).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-telemetry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  forwardDashboardEventToLiveWs,
  maybeSyncClaudeExtraUsageState,
  resolveLiveWsEventPort,
} = await import("../../open-sse/handlers/chatCore/telemetryHelpers.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;
const originalLiveWsPort = process.env.LIVE_WS_PORT;
const originalLiveWsEnabled = process.env.OMNIROUTE_ENABLE_LIVE_WS;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalLiveWsPort === undefined) {
    delete process.env.LIVE_WS_PORT;
  } else {
    process.env.LIVE_WS_PORT = originalLiveWsPort;
  }
  if (originalLiveWsEnabled === undefined) {
    delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
  } else {
    process.env.OMNIROUTE_ENABLE_LIVE_WS = originalLiveWsEnabled;
  }
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // Windows can hold the SQLite temp directory briefly after handle teardown.
  }
});

// forwardDashboardEventToLiveWs

test("forwardDashboardEventToLiveWs skips when live WebSocket telemetry is not configured", async () => {
  delete process.env.LIVE_WS_PORT;
  delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  await forwardDashboardEventToLiveWs("my-event", { foo: "bar" });

  assert.equal(resolveLiveWsEventPort(), null);
  assert.equal(fetchCalled, false);
});

test("forwardDashboardEventToLiveWs POSTs event+payload+timestamp as JSON to the default port when explicitly enabled", async () => {
  delete process.env.LIVE_WS_PORT;
  process.env.OMNIROUTE_ENABLE_LIVE_WS = "true";
  let capturedUrl: string | undefined;
  let capturedInit: RequestInit | undefined;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    capturedUrl = url;
    capturedInit = init;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  const before = Date.now();
  await forwardDashboardEventToLiveWs("my-event", { foo: "bar" });
  const after = Date.now();

  // The default port is only used when live telemetry is explicitly enabled.
  assert.equal(resolveLiveWsEventPort(), "20129");
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
  delete process.env.OMNIROUTE_ENABLE_LIVE_WS;
  let capturedUrl: string | undefined;
  globalThis.fetch = (async (url: string) => {
    capturedUrl = url;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  await forwardDashboardEventToLiveWs("e", null);

  assert.equal(resolveLiveWsEventPort(), "31337");
  assert.equal(capturedUrl, "http://127.0.0.1:31337/__omniroute_event");
});

test("forwardDashboardEventToLiveWs swallows fetch rejection and still resolves", async () => {
  process.env.LIVE_WS_PORT = "31337";
  globalThis.fetch = (async () => {
    throw new Error("sidecar down");
  }) as typeof fetch;

  // Must not throw - best-effort sidecar bridge; the catch swallows.
  await assert.doesNotReject(forwardDashboardEventToLiveWs("e", { a: 1 }));
});

// maybeSyncClaudeExtraUsageState

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
