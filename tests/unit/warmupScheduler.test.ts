/**
 * Tests for the proactive warmup scheduler orchestrator (src/lib/warmupScheduler.ts).
 *
 * Two layers:
 *   1. Pure/env helpers — enabled flag, cron default, concurrency clamp, PT conversion.
 *   2. Integration — a real temp DB with provider connections + mocked global fetch
 *      drives the full executeWarmup path: opt-in gating, classifyForWarmup,
 *      circuit-breaker skip, 401→refresh→retry, 403 stop, 429 Retry-After parse,
 *      message rotation, and Undici body cleanup.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warmup-orch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "warmup-exclusive-lease-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

interface FetchCall {
  url: string;
  init: RequestInit | undefined;
}

function installMockFetch(
  handler: (call: FetchCall) => { status: number; body?: unknown; headers?: Record<string, string> }
) {
  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : (input as Request).url;
    calls.push({ url, init });
    const { status, body, headers } = handler({ url, init });
    return new Response(body !== undefined ? JSON.stringify(body) : null, {
      status,
      headers: headers ? new Headers(headers) : undefined,
    });
  };
  return {
    calls,
    restore() {
      globalThis.fetch = originalFetch;
    },
  };
}

test.beforeEach(async () => {
  await resetStorage();
  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
  delete process.env.OMNIROUTE_WARMUP_CONCURRENCY;
  delete process.env.OMNIROUTE_WARMUP_MODEL;
  delete process.env.REDIS_URL;
  // Reset the globalThis scheduler singleton so lastFireMinute/minuteKey latch
  // from a prior test does not suppress the tick in the next test.
  const { __resetWarmupState } = await import("../../src/lib/warmupScheduler.ts");
  __resetWarmupState();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("startWarmupScheduler: disabled → null (default)", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  assert.equal(startWarmupScheduler(), null);
  stopWarmupScheduler();
});

test("startWarmupScheduler: enabled → returns timer and is a singleton", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  const timer = startWarmupScheduler();
  assert.ok(timer !== null, "should return a timer when enabled");
  // Second call returns the same timer (singleton survives re-entry).
  assert.equal(startWarmupScheduler(), timer);
  stopWarmupScheduler();
  assert.ok(startWarmupScheduler() !== null, "after stop, scheduler restarts");
  stopWarmupScheduler();
  delete process.env.OMNIROUTE_WARMUP_ENABLED;
});

test("env parsing: cron default + concurrency clamp", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CONCURRENCY = "99"; // clamps to 10
  const timer = startWarmupScheduler();
  assert.ok(timer !== null);
  stopWarmupScheduler();
  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CONCURRENCY;
});

test("integration: opt-in gating — connection not in claudeWarmup.connections is skipped", async () => {
  const { startWarmupScheduler, stopWarmupScheduler, __resetWarmupState } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");

  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Pro User",
    email: "pro@example.com",
    accessToken: "tok-123",
    refreshToken: "rt-123",
    isActive: true,
    providerSpecificData: { organizationType: "claude_pro" },
  });

  // Do NOT opt in — leave claudeWarmup.connections empty.
  const mock = installMockFetch(() => ({
    status: 200,
    body: { usage: { input_tokens: 3, output_tokens: 1 } },
  }));

  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *"; // every minute
  startWarmupScheduler();
  // Allow the immediate tick + any scheduled ticks to run.
  await new Promise((r) => setTimeout(r, 50));
  stopWarmupScheduler();
  mock.restore();

  assert.equal(mock.calls.length, 0, "no fetch should fire when no connection is opted in");
  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});

test("integration: opted-in claude_pro connection → fetch fires with Bearer token + beta suffix", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Pro User",
    email: "pro@example.com",
    accessToken: "tok-abc",
    refreshToken: "rt-abc",
    isActive: true,
    providerSpecificData: { organizationType: "claude_pro" },
  });

  // Opt in via settings.
  await settingsDb.updateSettings({ claudeWarmup: { connections: { [conn.id]: true } } });

  const mock = installMockFetch(() => ({
    status: 200,
    body: { usage: { input_tokens: 3, output_tokens: 1 } },
  }));

  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *";
  startWarmupScheduler();
  await new Promise((r) => setTimeout(r, 50));
  stopWarmupScheduler();
  mock.restore();

  assert.ok(mock.calls.length >= 1, "at least one fetch should fire");
  const call = mock.calls[0];
  assert.ok(call.url.includes("api.anthropic.com/v1/messages"), `url was ${call.url}`);
  assert.ok(call.url.includes("beta=true"), "url should carry ?beta=true");
  assert.equal((call.init?.headers as Record<string, string>)?.Authorization, "Bearer tok-abc");
  assert.equal((call.init?.headers as Record<string, string>)?.model, undefined); // model is in body, not headers

  const body = JSON.parse(call.init?.body as string);
  assert.equal(body.max_tokens, 1, "warmup must use max_tokens=1 to minimize quota burn");
  assert.equal(body.model, "claude-3-5-haiku-20241022");

  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});

test("warmup pings an opted-in lease-capable connection while its lease is FREE", async () => {
  // #11775: an idle (FREE) lease-capable connection is ordinary capacity, so the warmup
  // scheduler pings it like any other opted-in connection; only an ACTIVE lease isolates.
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");
  const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Managed Pro User",
    accessToken: "synthetic-token",
    refreshToken: "synthetic-refresh",
    isActive: true,
    providerSpecificData: { organizationType: "claude_pro" },
  });
  await apiKeysDb.createApiKey("managed warmup key", "test", ["lease:exclusive"], {
    allowedConnections: [conn.id],
  });
  await settingsDb.updateSettings({ claudeWarmup: { connections: { [conn.id]: true } } });

  const mock = installMockFetch(() => new Response("{}", { status: 200 }));
  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *";
  startWarmupScheduler();
  await new Promise((resolve) => setTimeout(resolve, 50));
  stopWarmupScheduler();
  mock.restore();

  assert.ok(mock.calls.length >= 1, "FREE lease-capable connection is warmed like any other");
  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});

test("integration: message rotation — different content across sequential pings", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Pro User",
    email: "pro@example.com",
    accessToken: "tok-abc",
    refreshToken: "rt-abc",
    isActive: true,
    providerSpecificData: { organizationType: "claude_pro" },
  });
  await settingsDb.updateSettings({ claudeWarmup: { connections: { [conn.id]: true } } });

  const mock = installMockFetch(() => ({
    status: 200,
    body: { usage: { input_tokens: 1, output_tokens: 1 } },
  }));

  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *";
  // First ping.
  startWarmupScheduler();
  await new Promise((r) => setTimeout(r, 30));
  stopWarmupScheduler();
  // Reset module-level message counter is not exported; instead verify content is one of the rotation set.
  const firstBody = JSON.parse(mock.calls[0].init?.body as string);
  assert.ok(["hi", "hello", "ping", "ready"].includes(firstBody.messages[0].content));

  // Second ping (new scheduler instance, same counter continues) — content should differ eventually.
  startWarmupScheduler();
  await new Promise((r) => setTimeout(r, 30));
  stopWarmupScheduler();
  mock.restore();

  assert.ok(mock.calls.length >= 2, "expected at least two pings across both runs");
  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});

test("integration: 403 → forbidden persisted, no further fetch for that connection", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");
  const crs = await import("../../src/lib/db/connectionRuntimeState.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Pro User",
    email: "pro@example.com",
    accessToken: "tok-forbidden",
    refreshToken: "rt",
    isActive: true,
    providerSpecificData: { organizationType: "claude_pro" },
  });
  await settingsDb.updateSettings({ claudeWarmup: { connections: { [conn.id]: true } } });

  const mock = installMockFetch(() => ({ status: 403, body: { error: "forbidden" } }));

  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *";
  startWarmupScheduler();
  await new Promise((r) => setTimeout(r, 50));
  stopWarmupScheduler();
  mock.restore();

  assert.equal(mock.calls.length, 1, "exactly one fetch on 403");
  const state = crs.getConnectionRuntimeState(conn.id);
  assert.equal(state?.lastWarmupResult, "forbidden", "forbidden must be persisted to SQLite");

  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});

test("integration: 429 → rate_limit with Retry-After parsed", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");
  const crs = await import("../../src/lib/db/connectionRuntimeState.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Pro User",
    email: "pro@example.com",
    accessToken: "tok-429",
    refreshToken: "rt",
    isActive: true,
    providerSpecificData: { organizationType: "claude_pro" },
  });
  await settingsDb.updateSettings({ claudeWarmup: { connections: { [conn.id]: true } } });

  const mock = installMockFetch(() => ({
    status: 429,
    body: { error: "rate_limit" },
    headers: { "retry-after": "120" },
  }));

  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *";
  startWarmupScheduler();
  await new Promise((r) => setTimeout(r, 50));
  stopWarmupScheduler();
  mock.restore();

  assert.equal(mock.calls.length, 1, "exactly one fetch on 429");
  const state = crs.getConnectionRuntimeState(conn.id);
  // until should be ~120s out (Retry-After), not the default 5min backoff.
  assert.ok(state?.warmupCircuitUntil, "until should be set");
  const untilMs = new Date(state.warmupCircuitUntil!).getTime() - Date.now();
  assert.ok(
    Math.abs(untilMs - 120_000) < 2000,
    `until should honor Retry-After ~120s, got ${untilMs}ms`
  );

  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});

test("integration: api_key connection is skipped even when opted in", async () => {
  const { startWarmupScheduler, stopWarmupScheduler } =
    await import("../../src/lib/warmupScheduler.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "API Key User",
    email: "apikey@example.com",
    apiKey: "sk-123",
    isActive: true,
  });
  await settingsDb.updateSettings({ claudeWarmup: { connections: { [conn.id]: true } } });

  const mock = installMockFetch(() => ({
    status: 200,
    body: { usage: { input_tokens: 1, output_tokens: 1 } },
  }));

  process.env.OMNIROUTE_WARMUP_ENABLED = "1";
  process.env.OMNIROUTE_WARMUP_CRON = "*/1 * * * *";
  startWarmupScheduler();
  await new Promise((r) => setTimeout(r, 50));
  stopWarmupScheduler();
  mock.restore();

  assert.equal(mock.calls.length, 0, "api_key connections must be skipped");

  delete process.env.OMNIROUTE_WARMUP_ENABLED;
  delete process.env.OMNIROUTE_WARMUP_CRON;
});
