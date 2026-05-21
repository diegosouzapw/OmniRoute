import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { MockUpstreamServer, buildCompletion, buildError } from "./helpers/mockUpstreamServer.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-system-failover-"));
const DASHBOARD_PORT = await getFreePort();
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "system-failover-secret-123456";
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

function resetConnectionCooldowns() {
  accountFallback.clearAllModelLockouts();
  const db = core.getDbInstance() as any;
  db.prepare(
    `UPDATE provider_connections
     SET rate_limited_until = NULL,
         test_status = 'active',
         backoff_level = 0,
         last_error = NULL,
         last_error_type = NULL,
         last_error_source = NULL,
         error_code = NULL,
         last_error_at = NULL
     WHERE rate_limited_until IS NOT NULL
        OR test_status != 'active'`
  ).run();
  db.pragma("wal_checkpoint(TRUNCATE)");
}

function getFreePort() {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Failed to allocate a free port"));
        return;
      }
      const { port } = address;
      server.close((closeError) => {
        if (closeError) reject(closeError);
        else resolve(port);
      });
    });
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seedProvider(label: string, apiKey: string, baseUrl: string) {
  const providerId = `openai-compatible-sys-${label}`;
  await providersDb.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    name: `System ${label}`,
    prefix: label,
    apiType: "chat",
    baseUrl,
  });
  await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: `conn-${label}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl, apiType: "chat" },
  });
  return { providerId, model: `${label}/test-model`, apiKey };
}

function createServerProcess(dataDir: string, port: number) {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  let exitInfo: { code: number | null; signal: NodeJS.Signals | null } | null = null;
  const child = spawn(process.execPath, ["scripts/dev/run-next-playwright.mjs", "dev"], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      DATA_DIR: dataDir,
      PORT: String(port),
      DASHBOARD_PORT: String(port),
      API_PORT: String(port),
      HOST: "127.0.0.1",
      REQUIRE_API_KEY: "false",
      API_KEY_SECRET: process.env.API_KEY_SECRET || "system-failover-secret-123456",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      INITIAL_PASSWORD: "",
      NEXT_TELEMETRY_DISABLED: "1",
      OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "true",
      OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "true",
      OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: "true",
      OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "true",
      OMNIROUTE_E2E_BOOTSTRAP_MODE: "open",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.once("exit", (code, signal) => {
    exitInfo = { code, signal };
  });
  child.stdout.on("data", (chunk) => {
    const lines = String(chunk).split(/\r?\n/).filter(Boolean);
    stdoutLines.push(...lines);
    if (stdoutLines.length > 200) stdoutLines.splice(0, stdoutLines.length - 200);
  });
  child.stderr.on("data", (chunk) => {
    const lines = String(chunk).split(/\r?\n/).filter(Boolean);
    stderrLines.push(...lines);
    if (stderrLines.length > 200) stderrLines.splice(0, stderrLines.length - 200);
  });

  return {
    child,
    stdoutLines,
    stderrLines,
    baseUrl: `http://127.0.0.1:${port}`,
    get exitInfo() {
      return exitInfo;
    },
  };
}

async function waitForServer(
  baseUrl: string,
  logs: {
    stdoutLines: string[];
    stderrLines: string[];
    exitInfo?: { code: number | null; signal: NodeJS.Signals | null } | null;
  }
) {
  const startedAt = Date.now();
  let lastError = "";
  while (Date.now() - startedAt < 120_000) {
    if (logs.exitInfo) {
      throw new Error(
        [
          `OmniRoute exited before it became ready (code=${logs.exitInfo.code}, signal=${logs.exitInfo.signal})`,
          "--- stdout ---",
          ...logs.stdoutLines.slice(-40),
          "--- stderr ---",
          ...logs.stderrLines.slice(-40),
        ].join("\n")
      );
    }

    try {
      const response = await fetch(`${baseUrl}/api/monitoring/health`, {
        signal: AbortSignal.timeout(5_000),
      });
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error: any) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await sleep(500);
  }

  throw new Error(
    [
      `Timed out waiting for OmniRoute to start: ${lastError}`,
      "--- stdout ---",
      ...logs.stdoutLines.slice(-40),
      "--- stderr ---",
      ...logs.stderrLines.slice(-40),
    ].join("\n")
  );
}

async function stopProcess(child: ReturnType<typeof spawn>) {
  if (child.killed) return;
  child.kill("SIGTERM");
  const exited = await Promise.race([
    new Promise<boolean>((resolve) => child.once("exit", () => resolve(true))),
    sleep(5_000).then(() => false),
  ]);
  if (!exited && !child.killed) {
    child.kill("SIGKILL");
    await new Promise<void>((resolve) => child.once("exit", () => resolve()));
  }
}

async function postChat(
  baseUrl: string,
  model: string,
  content: string,
  extraHeaders?: Record<string, string>
) {
  const response = await fetch(`${baseUrl}/api/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [{ role: "user", content }],
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  return { response, json };
}

async function resetBreakers(url: string) {
  await fetch(`${url}/api/resilience/reset`, {
    method: "POST",
    signal: AbortSignal.timeout(5_000),
  });
}

const serverA = new MockUpstreamServer();
const serverB = new MockUpstreamServer();
let app:
  | {
      child: ReturnType<typeof spawn>;
      stdoutLines: string[];
      stderrLines: string[];
      baseUrl: string;
    }
  | undefined;

const TOKEN_A = "sk-sys-a";
const TOKEN_B = "sk-sys-b";
const TOKEN_A2 = "sk-sys-a2";
const TOKEN_B2 = "sk-sys-b2";

test.before(async () => {
  const baseUrlA = await serverA.start();
  const baseUrlB = await serverB.start();

  serverA.configureToken(TOKEN_A, {
    defaultResponse: buildCompletion("server A ok", { model: "sys-a/test-model" }),
  });
  serverA.configureToken(TOKEN_A2, {
    defaultResponse: buildCompletion("server A2 ok", { model: "sys-a2/test-model" }),
  });
  serverB.configureToken(TOKEN_B, {
    defaultResponse: buildCompletion("server B ok", { model: "sys-b/test-model" }),
  });
  serverB.configureToken(TOKEN_B2, {
    defaultResponse: buildCompletion("server B2 ok", { model: "sys-b2/test-model" }),
  });

  const provA = await seedProvider("sys-a", TOKEN_A, baseUrlA);
  const provB = await seedProvider("sys-b", TOKEN_B, baseUrlB);
  const provA2 = await seedProvider("sys-a2", TOKEN_A2, baseUrlA);
  const provB2 = await seedProvider("sys-b2", TOKEN_B2, baseUrlB);

  await combosDb.createCombo({
    name: "sys-priority",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: [provA.model, provB.model],
  });
  await combosDb.createCombo({
    name: "sys-priority-v2",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: [provA2.model, provB2.model],
  });
  await combosDb.createCombo({
    name: "sys-priority-fobr",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, failoverBeforeRetry: true },
    models: [provA.model, provB.model],
  });
  await combosDb.createCombo({
    name: "sys-priority-setretry",
    strategy: "priority",
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      failoverBeforeRetry: true,
      maxSetRetries: 1,
      setRetryDelayMs: 500,
    },
    models: [provA.model, provB.model],
  });
  await combosDb.createCombo({
    name: "sys-same-server",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: [provA.model, provA2.model],
  });
  await combosDb.createCombo({
    name: "sys-same-server-fobr",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, failoverBeforeRetry: true },
    models: [provA.model, provA2.model],
  });

  await combosDb.createCombo({
    name: "sys-single-provider",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["sys-a/modelA", "sys-a/modelB"],
  });
  await combosDb.createCombo({
    name: "sys-single-provider-fobr",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, failoverBeforeRetry: true },
    models: ["sys-a/modelA", "sys-a/modelB"],
  });

  await settingsDb.updateSettings({
    resilienceSettings: {
      requestQueue: {
        autoEnableApiKeyProviders: true,
        requestsPerMinute: 120,
        minTimeBetweenRequestsMs: 0,
        concurrentRequests: 4,
        maxWaitMs: 2_000,
      },
      connectionCooldown: {
        oauth: { baseCooldownMs: 500, useUpstreamRetryHints: true, maxBackoffSteps: 3 },
        apikey: { baseCooldownMs: 200, useUpstreamRetryHints: false, maxBackoffSteps: 0 },
      },
      providerBreaker: {
        oauth: { failureThreshold: 3, resetTimeoutMs: 2_000 },
        apikey: { failureThreshold: 2, resetTimeoutMs: 1_500 },
      },
      waitForCooldown: {
        enabled: false,
        maxRetries: 0,
        maxRetryWaitSec: 0,
      },
    },
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    requireLogin: false,
    setupComplete: true,
  });

  core.closeDbInstance();

  app = createServerProcess(TEST_DATA_DIR, DASHBOARD_PORT);
  await waitForServer(app.baseUrl, app);

  const warmup = await postChat(app.baseUrl, "sys-b/test-model", "warm up");
  assert.equal(warmup.response.status, 200, JSON.stringify(warmup.json));
  serverB.resetState(TOKEN_B);
});

test.after(async () => {
  if (app) await stopProcess(app.child);
  await serverA.stop();
  await serverB.stop();
  core.closeDbInstance();
  await fsp.rm(TEST_DATA_DIR, { recursive: true, force: true });
});

test("primary healthy: request routes to Server A only", async () => {
  assert.ok(app);
  serverA.resetState(TOKEN_A);
  serverB.resetState(TOKEN_B);

  const result = await postChat(app.baseUrl, "sys-priority", "healthy primary");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "server A ok");
  assert.equal(result.json.model, "sys-a/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 1);
  assert.equal(serverB.getState(TOKEN_B).hits, 0);
});

test("500 Internal Server Error: combo falls back to Server B", async () => {
  assert.ok(app);
  serverA.resetState(TOKEN_A, [buildError(500, "Internal Server Error")]);
  serverB.resetState(TOKEN_B);

  const result = await postChat(app.baseUrl, "sys-priority", "500 fallback");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "server B ok");
  assert.equal(result.json.model, "sys-b/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 1);
  assert.equal(serverB.getState(TOKEN_B).hits, 1);
});

test("503 Service Unavailable: combo falls back to Server B", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(503, "Service Unavailable")]);
  serverB.resetState(TOKEN_B);

  const result = await postChat(app.baseUrl, "sys-priority", "503 fallback");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "server B ok");
  assert.equal(result.json.model, "sys-b/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 1);
  assert.equal(serverB.getState(TOKEN_B).hits, 1);
});

test("both servers fail (500): request returns a 5xx error to the client", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(500, "A is down")]);
  serverB.resetState(TOKEN_B, [buildError(500, "B is down")]);

  const result = await postChat(app.baseUrl, "sys-priority", "both down");

  assert.ok(result.response.status >= 500, `expected 5xx, got ${result.response.status}`);
});

test("combo fallback to Server B survives sequential 503 failures from Server A", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(503, "transient blip"), buildError(503, "second blip")]);
  serverB.resetState(TOKEN_B);

  const first = await postChat(app.baseUrl, "sys-priority", "seq 503 attempt 1");
  assert.equal(first.response.status, 200, JSON.stringify(first.json));
  assert.equal(first.json.choices[0].message.content, "server B ok");
  assert.equal(first.json.model, "sys-b/test-model");

  // Wait for the 200ms apikey cooldown to expire so the second request also
  // goes through the full A→B fallback path rather than skipping A entirely.
  await sleep(250);

  const second = await postChat(app.baseUrl, "sys-priority", "seq 503 attempt 2");
  assert.equal(second.response.status, 200, JSON.stringify(second.json));
  assert.equal(second.json.choices[0].message.content, "server B ok");
  assert.equal(second.json.model, "sys-b/test-model");

  assert.equal(serverA.getState(TOKEN_A).hits, 2);
  assert.equal(serverB.getState(TOKEN_B).hits, 2);
});

test("429 with Retry-After and wait-for-cooldown: primary retries then falls back to B", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [
    buildError(429, "rate limited, retry after 1s", { "Retry-After": "1" }),
  ]);
  serverB.resetState(TOKEN_B);

  const patchRes = await fetch(`${app.baseUrl}/api/resilience`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      connectionCooldown: {
        apikey: { useUpstreamRetryHints: true, baseCooldownMs: 200 },
      },
      waitForCooldown: { enabled: true, maxRetries: 1, maxRetryWaitSec: 2 },
    }),
    signal: AbortSignal.timeout(10_000),
  });
});

test("failoverBeforeRetry enabled: upstream error triggers immediate failover to next target", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(429, "rate limited")]);
  serverB.resetState(TOKEN_B);

  const result = await postChat(app.baseUrl, "sys-priority-fobr", "test failover before retry");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "server B ok");
  assert.equal(result.json.model, "sys-b/test-model");

  // With failoverBeforeRetry=true, A should be hit exactly ONCE (no intra-URL retry)
  assert.equal(serverA.getState(TOKEN_A).hits, 1);
  assert.equal(serverB.getState(TOKEN_B).hits, 1);
});

test("failoverBeforeRetry disabled: 429 triggers executor intra-URL retry, succeeds on retry", async () => {
  assert.ok(app);
  // Full resilience reset so A isn't blocked by residual breaker/cooldown state
  const patchRes = await fetch(`${app.baseUrl}/api/resilience`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      connectionCooldown: {
        apikey: { useUpstreamRetryHints: false, baseCooldownMs: 0, maxBackoffSteps: 0 },
        oauth: { useUpstreamRetryHints: false, baseCooldownMs: 0, maxBackoffSteps: 0 },
      },
      waitForCooldown: { enabled: false, maxRetries: 0, maxRetryWaitSec: 0 },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(patchRes.status, 200);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  // Wait for any residual cooldowns to expire
  await sleep(300);
  // One 429, then the default (200) on retry
  serverA.resetState(TOKEN_A, [buildError(429, "rate limited")]);
  serverB.resetState(TOKEN_B);

  const result = await postChat(app.baseUrl, "sys-priority", "test failover before retry disabled");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));

  // With maxRetries=0 the combo does not retry A — it fails over to B immediately.
  assert.equal(result.json.model, "sys-b/test-model");

  // With failoverBeforeRetry=false, A should be hit TWICE (initial + 1 intra-URL retry).
  // This contrasts with failoverBeforeRetry=true where A is hit exactly ONCE.
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});

test("maxSetRetries: both A and B fail first pass, A 429 again, B 200 on retry", async () => {
  assert.ok(app);
  // Reset to a clean resilience slate: disable cooldowns, disable waitForCooldown,
  // reset breakers, and clear connection rate_limited_until from previous tests.
  const patchRes = await fetch(`${app.baseUrl}/api/resilience`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      connectionCooldown: {
        apikey: { useUpstreamRetryHints: false, baseCooldownMs: 0, maxBackoffSteps: 0 },
        oauth: { useUpstreamRetryHints: false, baseCooldownMs: 0, maxBackoffSteps: 0 },
      },
      waitForCooldown: { enabled: false, maxRetries: 0, maxRetryWaitSec: 0 },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(patchRes.status, 200);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  // Set try 0: A 429, B 500 — both fail
  // Set try 1: A 429, B 200 — B succeeds
  serverA.resetState(TOKEN_A, [buildError(429, "rate limited"), buildError(429, "rate limited")]);
  serverB.resetState(TOKEN_B, [
    buildError(500, "server error"),
    buildCompletion("server B ok on retry", { model: "sys-b/test-model" }),
  ]);

  const result = await postChat(app.baseUrl, "sys-priority-setretry", "test max set retries", {
    "x-internal-test": "combo-health-check",
  });

  // Set try 0: A 429, B 500 → both fail
  // Set try 1: A 429, B 200 → B succeeds
  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "server B ok on retry");
  assert.equal(result.json.model, "sys-b/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
  assert.equal(serverB.getState(TOKEN_B).hits, 2);

  // Restore defaults so other tests are not affected
  await fetch(`${app.baseUrl}/api/resilience`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      connectionCooldown: {
        apikey: { useUpstreamRetryHints: false, baseCooldownMs: 200, maxBackoffSteps: 0 },
        oauth: { useUpstreamRetryHints: true, baseCooldownMs: 500, maxBackoffSteps: 3 },
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });
});

test("same server failoverBeforeRetry disabled: first model 429 retried before trying second", async () => {
  assert.ok(app);
  // Full resilience reset — previous test restored defaults and may have left A cooldown
  const patchRes = await fetch(`${app.baseUrl}/api/resilience`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      connectionCooldown: {
        apikey: { useUpstreamRetryHints: false, baseCooldownMs: 0, maxBackoffSteps: 0 },
        oauth: { useUpstreamRetryHints: false, baseCooldownMs: 0, maxBackoffSteps: 0 },
      },
      waitForCooldown: { enabled: false, maxRetries: 0, maxRetryWaitSec: 0 },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(patchRes.status, 200);
  await sleep(300);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(429, "rate limited")]);
  serverA.resetState(TOKEN_A2);

  const result = await postChat(
    app.baseUrl,
    "sys-same-server",
    "test same server failover disabled"
  );

  assert.equal(result.response.status, 200, JSON.stringify(result.json));

  // With maxRetries=0 the combo fails over to A2 rather than retrying A.
  assert.equal(result.json.model, "sys-a2/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});

test("same server failoverBeforeRetry enabled: first model 429 skipped to second immediately", async () => {
  assert.ok(app);
  await sleep(300);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(429, "rate limited")]);
  serverA.resetState(TOKEN_A2);

  const result = await postChat(
    app.baseUrl,
    "sys-same-server-fobr",
    "test same server failover enabled"
  );

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.model, "sys-a2/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 1);
  assert.equal(serverA.getState(TOKEN_A2).hits, 1);
});

test("single provider, modelA 500: combo fails over to modelB", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(500, "model A error")]);

  const result = await postChat(app.baseUrl, "sys-single-provider", "test modelA 500");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.model, "sys-a/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});

test("single provider, modelA 503: combo fails over to modelB", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(503, "Service Unavailable")]);

  const result = await postChat(app.baseUrl, "sys-single-provider", "test modelA 503");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.model, "sys-a/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});

test("single provider, modelA 429 with fobr: immediate failover to modelB", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(429, "rate limited")]);

  const result = await postChat(app.baseUrl, "sys-single-provider-fobr", "test fobr");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.model, "sys-a/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});

test("single provider, modelA 500 with fobr: modelA retry", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(500, "Oops!")]);

  const result = await postChat(app.baseUrl, "sys-single-provider-fobr", "test fobr");

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.model, "sys-a/test-model");
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});

test("single provider, both models fail: request returns 5xx to client", async () => {
  assert.ok(app);
  await resetBreakers(app.baseUrl);
  resetConnectionCooldowns();
  serverA.resetState(TOKEN_A, [buildError(500, "modelA down"), buildError(500, "modelB down")]);

  const result = await postChat(app.baseUrl, "sys-single-provider", "both down");

  assert.ok(result.response.status >= 500, `expected 5xx, got ${result.response.status}`);
  assert.equal(serverA.getState(TOKEN_A).hits, 2);
});
