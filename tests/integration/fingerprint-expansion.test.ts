import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { MockUpstreamServer, buildCompletion } from "../e2e/helpers/mockUpstreamServer.ts";

// #5521 — E2E test for fingerprint-based combo expansion.
// Seeds a mimocode connection with 3 fingerprints, creates a round-robin combo,
// and verifies that requests route through the combo successfully.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fingerprint-e2e-"));
const DASHBOARD_PORT = await getFreePort();
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "fingerprint-e2e-secret";
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

function getFreePort(): Promise<number> {
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
      server.close((err) => {
        if (err) reject(err);
        else resolve(port);
      });
    });
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      API_KEY_SECRET: process.env.API_KEY_SECRET || "fingerprint-e2e-secret",
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
    } catch (error: unknown) {
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

async function postChat(baseUrl: string, model: string, content: string) {
  const response = await fetch(`${baseUrl}/api/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

// ── Setup ──────────────────────────────────────────────────────────────────

const UPSTREAM_PORT = await getFreePort();
const upstream = new MockUpstreamServer();
const TOKEN = "sk-fp-e2e-test";

let app:
  | {
      child: ReturnType<typeof spawn>;
      stdoutLines: string[];
      stderrLines: string[];
      baseUrl: string;
    }
  | undefined;

test.before(async () => {
  // Start mock upstream
  const upstreamBaseUrl = await upstream.start();
  upstream.configureToken(TOKEN, {
    defaultResponse: buildCompletion("fingerprint ok", { model: "fp-mimocode/mimo-auto" }),
  });

  // Seed mimocode provider node
  const providerId = "openai-compatible-fp-mimocode";
  await providersDb.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    name: "MiMoCode FP Test",
    prefix: "fp-mimocode",
    apiType: "chat",
    baseUrl: upstreamBaseUrl,
  });

  // Seed connection with 3 fingerprints
  await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "fp-mimocode-multi-device",
    apiKey: TOKEN,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: upstreamBaseUrl,
      apiType: "chat",
      fingerprints: ["fp-device-aaa", "fp-device-bbb", "fp-device-ccc"],
      accountProxies: [
        { fingerprint: "fp-device-aaa", proxy: null },
        { fingerprint: "fp-device-bbb", proxy: null },
        { fingerprint: "fp-device-ccc", proxy: null },
      ],
    },
  });

  // Create round-robin combo
  await combosDb.createCombo({
    name: "fp-round-robin",
    strategy: "round-robin",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["fp-mimocode/mimo-auto"],
  });

  // Create priority combo (single target, for comparison)
  await combosDb.createCombo({
    name: "fp-priority-single",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["fp-mimocode/mimo-auto"],
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
      waitForCooldown: { enabled: false, maxRetries: 0, maxRetryWaitSec: 0 },
    },
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    requireLogin: false,
    setupComplete: true,
  });

  core.closeDbInstance();

  app = createServerProcess(TEST_DATA_DIR, DASHBOARD_PORT);
  await waitForServer(app.baseUrl, app);
});

test.after(async () => {
  if (app) await stopProcess(app.child);
  await upstream.stop();
  core.closeDbInstance();
  await fsp.rm(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Tests ──────────────────────────────────────────────────────────────────

test("round-robin combo with 3 fingerprints: all requests succeed", async () => {
  assert.ok(app);

  // Send 3 requests — round-robin should distribute across expanded targets
  for (let i = 0; i < 3; i++) {
    const result = await postChat(app.baseUrl, "fp-round-robin", `request ${i + 1}`);
    assert.equal(
      result.response.status,
      200,
      `request ${i + 1} failed: ${JSON.stringify(result.json)}`
    );
    assert.equal(result.json.choices[0].message.content, "fingerprint ok");
    assert.equal(result.json.model, "fp-mimocode/mimo-auto");
  }

  // Mock server should have received all 3 hits
  const state = upstream.getState(TOKEN);
  assert.equal(state.hits, 3, `expected 3 hits on mock, got ${state.hits}`);
});

test("priority combo with fingerprint connection: request succeeds", async () => {
  assert.ok(app);
  upstream.resetState(TOKEN);

  const result = await postChat(app.baseUrl, "fp-priority-single", "priority test");
  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "fingerprint ok");

  const state = upstream.getState(TOKEN);
  assert.equal(state.hits, 1);
});

test("round-robin combo handles 5 sequential requests", async () => {
  assert.ok(app);
  upstream.resetState(TOKEN);

  for (let i = 0; i < 5; i++) {
    const result = await postChat(app.baseUrl, "fp-round-robin", `sequential ${i + 1}`);
    assert.equal(
      result.response.status,
      200,
      `request ${i + 1} failed: ${JSON.stringify(result.json)}`
    );
  }

  const state = upstream.getState(TOKEN);
  assert.equal(state.hits, 5, `expected 5 hits, got ${state.hits}`);
});
