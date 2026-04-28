import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import net from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-resilience-http-e2e-"));
const DASHBOARD_PORT = await getFreePort();
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "resilience-http-e2e-secret-123456";
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

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

function buildCompletion(content: string) {
  return {
    status: 200,
    body: {
      id: `chatcmpl_${Math.random().toString(16).slice(2, 8)}`,
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
    },
  };
}

function buildError(status: number, message: string, headers: Record<string, string> = {}) {
  return {
    status,
    headers,
    body: { error: { message } },
  };
}

type PlannedResponse = {
  status: number;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
  delayMs?: number;
};

type TokenBehavior = {
  defaultResponse: PlannedResponse;
  queue: PlannedResponse[];
  hits: number;
  startedAt: number[];
  bodies: Array<Record<string, unknown>>;
};

function createFakeOpenAiRelay() {
  const behaviors = new Map<string, TokenBehavior>();
  let server: http.Server | null = null;
  let baseUrl = "";

  const handleRequest = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", async () => {
      const authHeader = String(req.headers.authorization || "");
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      const rawBody = Buffer.concat(chunks).toString("utf8");
      const parsedBody = rawBody ? JSON.parse(rawBody) : {};

      if (req.method === "GET" && req.url?.startsWith("/v1/models")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: [{ id: "test-model", object: "model" }] }));
        return;
      }

      if (req.method !== "POST" || !req.url?.startsWith("/v1/chat/completions")) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: `Unhandled path: ${req.method} ${req.url}` } }));
        return;
      }

      const behavior = behaviors.get(token);
      if (!behavior) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: `Unknown token: ${token || "missing"}` } }));
        return;
      }

      behavior.hits += 1;
      behavior.startedAt.push(Date.now());
      behavior.bodies.push(parsedBody as Record<string, unknown>);

      const planned = behavior.queue.shift() || behavior.defaultResponse;
      if (planned.delayMs && planned.delayMs > 0) {
        await sleep(planned.delayMs);
      }

      const headers = { "Content-Type": "application/json", ...(planned.headers || {}) };
      res.writeHead(planned.status, headers);
      res.end(JSON.stringify(planned.body));
    });
  };

  return {
    async start() {
      const port = await getFreePort();
      await new Promise<void>((resolve, reject) => {
        server = http.createServer((req, res) => {
          void handleRequest(req, res);
        });
        server.once("error", reject);
        server.listen(port, "127.0.0.1", () => resolve());
      });
      baseUrl = `http://127.0.0.1:${port}/v1`;
      return baseUrl;
    },
    getBaseUrl() {
      if (!baseUrl) throw new Error("Fake relay has not started yet");
      return baseUrl;
    },
    configureToken(
      token: string,
      config: { defaultResponse: PlannedResponse; queue?: PlannedResponse[] }
    ) {
      behaviors.set(token, {
        defaultResponse: config.defaultResponse,
        queue: [...(config.queue || [])],
        hits: 0,
        startedAt: [],
        bodies: [],
      });
    },
    getState(token: string) {
      const state = behaviors.get(token);
      if (!state) throw new Error(`Unknown token state for ${token}`);
      return state;
    },
    resetState(token: string, queue?: PlannedResponse[]) {
      const state = behaviors.get(token);
      if (!state) throw new Error(`Unknown token state for ${token}`);
      state.hits = 0;
      state.startedAt = [];
      state.bodies = [];
      state.queue = [...(queue || [])];
    },
    async stop() {
      if (!server) return;
      await new Promise<void>((resolve) => server?.close(() => resolve()));
      server = null;
    },
  };
}

function createServerProcess(dataDir: string, port: number) {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  const child = spawn(process.execPath, ["scripts/run-next.mjs", "dev"], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      DATA_DIR: dataDir,
      PORT: String(port),
      DASHBOARD_PORT: String(port),
      API_PORT: String(port),
      HOST: "127.0.0.1",
      REQUIRE_API_KEY: "false",
      API_KEY_SECRET: process.env.API_KEY_SECRET || "resilience-http-e2e-secret-123456",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      INITIAL_PASSWORD: "",
      NEXT_TELEMETRY_DISABLED: "1",
      OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "true",
      OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "true",
      OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: "true",
      OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "true",
    },
    stdio: ["ignore", "pipe", "pipe"],
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
  };
}

async function waitForServer(
  baseUrl: string,
  logs: { stdoutLines: string[]; stderrLines: string[] }
) {
  const startedAt = Date.now();
  let lastError = "";
  while (Date.now() - startedAt < 120_000) {
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

async function seedCompatibleProvider(prefix: string, apiKey: string, baseUrl: string) {
  const providerId = `openai-compatible-chat-e2e-${prefix}`;
  await providersDb.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    name: `E2E ${prefix}`,
    prefix,
    apiType: "chat",
    baseUrl,
  });
  await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: `conn-${prefix}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl,
      apiType: "chat",
    },
  });
  return { providerId, model: `${prefix}/test-model`, apiKey };
}

function buildResilienceConfig(overrides: Record<string, unknown> = {}) {
  const base = {
    requestQueue: {
      autoEnableApiKeyProviders: true,
      requestsPerMinute: 120,
      minTimeBetweenRequestsMs: 0,
      concurrentRequests: 4,
      maxWaitMs: 2_000,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 500,
        useUpstreamRetryHints: true,
        maxBackoffSteps: 3,
      },
      apikey: {
        baseCooldownMs: 300,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 0,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 3,
        resetTimeoutMs: 2_000,
      },
      apikey: {
        failureThreshold: 2,
        resetTimeoutMs: 1_500,
      },
    },
    waitForCooldown: {
      enabled: false,
      maxRetries: 0,
      maxRetryWaitSec: 0,
    },
  };

  return {
    ...base,
    ...overrides,
    requestQueue: {
      ...base.requestQueue,
      ...((overrides.requestQueue as Record<string, unknown>) || {}),
    },
    connectionCooldown: {
      oauth: {
        ...base.connectionCooldown.oauth,
        ...(((overrides.connectionCooldown as Record<string, unknown>)?.oauth as Record<
          string,
          unknown
        >) || {}),
      },
      apikey: {
        ...base.connectionCooldown.apikey,
        ...(((overrides.connectionCooldown as Record<string, unknown>)?.apikey as Record<
          string,
          unknown
        >) || {}),
      },
    },
    providerBreaker: {
      oauth: {
        ...base.providerBreaker.oauth,
        ...(((overrides.providerBreaker as Record<string, unknown>)?.oauth as Record<
          string,
          unknown
        >) || {}),
      },
      apikey: {
        ...base.providerBreaker.apikey,
        ...(((overrides.providerBreaker as Record<string, unknown>)?.apikey as Record<
          string,
          unknown
        >) || {}),
      },
    },
    waitForCooldown: {
      ...base.waitForCooldown,
      ...((overrides.waitForCooldown as Record<string, unknown>) || {}),
    },
  };
}

async function patchResilience(baseUrl: string, config: Record<string, unknown>) {
  const response = await fetch(`${baseUrl}/api/resilience`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
    signal: AbortSignal.timeout(10_000),
  });
  const payload = (await response.json()) as any;
  assert.equal(response.status, 200, JSON.stringify(payload));
  return payload;
}

async function getJson(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  const json = (await response.json()) as any;
  return { response, json };
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
    signal: AbortSignal.timeout(20_000),
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  return { response, json };
}

const relay = createFakeOpenAiRelay();
let app:
  | {
      child: ReturnType<typeof spawn>;
      stdoutLines: string[];
      stderrLines: string[];
      baseUrl: string;
    }
  | undefined;

const TOKENS = {
  p1: "sk-e2e-p1",
  p2: "sk-e2e-p2",
  p3: "sk-e2e-p3",
  p4: "sk-e2e-p4",
  p5: "sk-e2e-p5",
  p6: "sk-e2e-p6",
  p7: "sk-e2e-p7",
  p8: "sk-e2e-p8",
};

test.before(async () => {
  const fakeBaseUrl = await relay.start();

  relay.configureToken(TOKENS.p1, {
    defaultResponse: buildCompletion("primary healthy again"),
    queue: [buildError(503, "primary transient failure")],
  });
  relay.configureToken(TOKENS.p2, {
    defaultResponse: buildCompletion("secondary stable"),
  });
  relay.configureToken(TOKENS.p3, {
    defaultResponse: buildCompletion("wait-for-cooldown via upstream hint"),
    queue: [buildError(429, "rate limited, retry after 1 second", { "Retry-After": "1" })],
  });
  relay.configureToken(TOKENS.p4, {
    defaultResponse: buildCompletion("ignored upstream retry hint"),
    queue: [buildError(429, "rate limited, retry after 5 seconds", { "Retry-After": "5" })],
  });
  relay.configureToken(TOKENS.p5, {
    defaultResponse: buildCompletion("breaker target recovered"),
    queue: [buildError(503, "breaker failure #1"), buildError(503, "breaker failure #2")],
  });
  relay.configureToken(TOKENS.p6, {
    defaultResponse: buildCompletion("round robin A"),
  });
  relay.configureToken(TOKENS.p7, {
    defaultResponse: buildCompletion("round robin B"),
  });
  relay.configureToken(TOKENS.p8, {
    defaultResponse: {
      ...buildCompletion("queued connection request"),
      delayMs: 250,
    },
  });

  await seedCompatibleProvider("p1", TOKENS.p1, fakeBaseUrl);
  await seedCompatibleProvider("p2", TOKENS.p2, fakeBaseUrl);
  await seedCompatibleProvider("p3", TOKENS.p3, fakeBaseUrl);
  await seedCompatibleProvider("p4", TOKENS.p4, fakeBaseUrl);
  await seedCompatibleProvider("p5", TOKENS.p5, fakeBaseUrl);
  await seedCompatibleProvider("p6", TOKENS.p6, fakeBaseUrl);
  await seedCompatibleProvider("p7", TOKENS.p7, fakeBaseUrl);
  await seedCompatibleProvider("p8", TOKENS.p8, fakeBaseUrl);

  await combosDb.createCombo({
    name: "res-priority-fallback",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["p1/test-model", "p2/test-model"],
  });
  await combosDb.createCombo({
    name: "res-breaker-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["p5/test-model", "p2/test-model"],
  });
  await combosDb.createCombo({
    name: "res-rr",
    strategy: "round-robin",
    config: { maxRetries: 0, retryDelayMs: 0, concurrencyPerModel: 1, queueTimeoutMs: 800 },
    models: ["p6/test-model", "p7/test-model"],
  });

  await settingsDb.updateSettings({
    resilienceSettings: buildResilienceConfig(),
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    requireLogin: false,
    setupComplete: true,
  });

  core.closeDbInstance();

  app = createServerProcess(TEST_DATA_DIR, DASHBOARD_PORT);
  await waitForServer(app.baseUrl, app);

  await patchResilience(app.baseUrl, buildResilienceConfig());

  const warmup = await postChat(app.baseUrl, "p2/test-model", "warm up chat route");
  assert.equal(warmup.response.status, 200, JSON.stringify(warmup.json));
  relay.resetState(TOKENS.p2);
});

test.after(async () => {
  if (app) {
    await stopProcess(app.child);
  }
  await relay.stop();
  core.closeDbInstance();
  await fsp.rm(TEST_DATA_DIR, { recursive: true, force: true });
});

test("resilience API only exposes configuration, not runtime breaker state", async () => {
  assert.ok(app);
  const { response, json } = await getJson(`${app.baseUrl}/api/resilience`);

  assert.equal(response.status, 200);
  assert.deepEqual(Object.keys(json).sort(), [
    "connectionCooldown",
    "legacy",
    "providerBreaker",
    "requestQueue",
    "waitForCooldown",
  ]);
  assert.equal("providerBreakers" in json, false);
  assert.equal("runtime" in json, false);
});

test("request queue serializes concurrent requests on the same connection", async () => {
  assert.ok(app);
  await patchResilience(
    app.baseUrl,
    buildResilienceConfig({
      requestQueue: {
        concurrentRequests: 1,
        maxWaitMs: 1_500,
      },
    })
  );
  relay.resetState(TOKENS.p8);

  const startedAt = Date.now();
  const [first, second] = await Promise.all([
    postChat(app.baseUrl, "p8/test-model", "queue-one"),
    postChat(app.baseUrl, "p8/test-model", "queue-two"),
  ]);
  const elapsed = Date.now() - startedAt;
  const state = relay.getState(TOKENS.p8);

  assert.equal(first.response.status, 200, JSON.stringify(first.json));
  assert.equal(second.response.status, 200, JSON.stringify(second.json));
  assert.equal(state.hits, 2);
  assert.ok(elapsed >= 450, `expected queued elapsed >= 450ms, got ${elapsed}ms`);
  assert.ok(
    state.startedAt[1] - state.startedAt[0] >= 180,
    `expected second request to be delayed by queue, got ${state.startedAt[1] - state.startedAt[0]}ms`
  );
});

test("priority combo falls back on 503 and skips the cooled-down primary on the next request", async () => {
  assert.ok(app);
  await patchResilience(app.baseUrl, buildResilienceConfig());
  relay.resetState(TOKENS.p1, [buildError(503, "primary transient failure")]);
  relay.resetState(TOKENS.p2);

  const first = await postChat(app.baseUrl, "res-priority-fallback", "priority fallback request");
  assert.equal(first.response.status, 200, JSON.stringify(first.json));
  assert.equal(first.json.choices[0].message.content, "secondary stable");
  assert.equal(relay.getState(TOKENS.p1).hits, 1);
  assert.equal(relay.getState(TOKENS.p2).hits, 1);

  const second = await postChat(app.baseUrl, "res-priority-fallback", "priority fallback again");
  assert.equal(second.response.status, 200, JSON.stringify(second.json));
  assert.equal(second.json.choices[0].message.content, "secondary stable");
  assert.equal(relay.getState(TOKENS.p1).hits, 1);
  assert.equal(relay.getState(TOKENS.p2).hits, 2);
});

test("wait-for-cooldown honors upstream Retry-After when enabled", async () => {
  assert.ok(app);
  await patchResilience(
    app.baseUrl,
    buildResilienceConfig({
      connectionCooldown: {
        apikey: {
          useUpstreamRetryHints: true,
          baseCooldownMs: 200,
        },
      },
      waitForCooldown: {
        enabled: true,
        maxRetries: 1,
        maxRetryWaitSec: 2,
      },
    })
  );
  relay.resetState(TOKENS.p3);
  const warmup = await postChat(app.baseUrl, "p3/test-model", "warm provider-specific route");
  assert.equal(warmup.response.status, 200, JSON.stringify(warmup.json));
  relay.resetState(TOKENS.p3, [
    buildError(429, "rate limited, retry after 1 second", { "Retry-After": "1" }),
  ]);

  const startedAt = Date.now();
  const result = await postChat(app.baseUrl, "p3/test-model", "wait for cooldown via upstream");
  const elapsed = Date.now() - startedAt;

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "wait-for-cooldown via upstream hint");
  const hits = relay.getState(TOKENS.p3).hits;
  assert.ok(hits >= 2, `expected at least one retry after cooldown, got ${hits} hits`);
  assert.ok(elapsed >= 800, `expected upstream wait >= 800ms, got ${elapsed}ms`);
});

test("connection cooldown can ignore upstream Retry-After and use the configured local cooldown", async () => {
  assert.ok(app);
  await patchResilience(
    app.baseUrl,
    buildResilienceConfig({
      connectionCooldown: {
        apikey: {
          useUpstreamRetryHints: false,
          baseCooldownMs: 200,
        },
      },
      waitForCooldown: {
        enabled: true,
        maxRetries: 1,
        maxRetryWaitSec: 2,
      },
    })
  );
  relay.resetState(TOKENS.p4);
  const warmup = await postChat(app.baseUrl, "p4/test-model", "warm provider-specific route");
  assert.equal(warmup.response.status, 200, JSON.stringify(warmup.json));
  relay.resetState(TOKENS.p4, [
    buildError(429, "rate limited, retry after 30 seconds", { "Retry-After": "30" }),
  ]);

  const startedAt = Date.now();
  const result = await postChat(app.baseUrl, "p4/test-model", "ignore upstream retry-after");
  const elapsed = Date.now() - startedAt;

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "ignored upstream retry hint");
  const hits = relay.getState(TOKENS.p4).hits;
  assert.ok(hits >= 2, `expected at least one retry after cooldown, got ${hits} hits`);
  assert.ok(
    elapsed < 5_000,
    `expected ignored upstream hint to avoid a 30s wait, got ${elapsed}ms`
  );
});

test("provider circuit breaker opens after repeated final failures and Health reports it", async () => {
  assert.ok(app);
  await patchResilience(
    app.baseUrl,
    buildResilienceConfig({
      waitForCooldown: {
        enabled: false,
        maxRetries: 0,
        maxRetryWaitSec: 0,
      },
      providerBreaker: {
        apikey: {
          failureThreshold: 2,
          resetTimeoutMs: 1_500,
        },
      },
    })
  );
  relay.resetState(TOKENS.p5, [
    buildError(503, "breaker failure #1"),
    buildError(503, "breaker failure #2"),
  ]);

  const first = await postChat(app.baseUrl, "p5/test-model", "breaker first failure");
  const second = await postChat(app.baseUrl, "p5/test-model", "breaker second failure");
  const third = await postChat(app.baseUrl, "p5/test-model", "breaker should now be open");

  assert.equal(first.response.status, 503);
  assert.equal(second.response.status, 503);
  assert.equal(third.response.status, 503);
  assert.match(String(second.json.error?.message || ""), /reset after/i);
  assert.match(String(third.json.error?.message || ""), /circuit breaker is open/i);
  assert.equal(relay.getState(TOKENS.p5).hits, 1);

  const health = await getJson(`${app.baseUrl}/api/monitoring/health`);
  assert.equal(health.response.status, 200);
  const breakerEntry = (health.json.providerBreakers || []).find(
    (entry: Record<string, unknown>) => entry.provider === "openai-compatible-chat-e2e-p5"
  );
  assert.ok(breakerEntry, "expected provider breaker entry for p5");
  assert.equal(breakerEntry.state, "OPEN");
  assert.ok(Number(breakerEntry.failureCount) >= 2);
  assert.ok(Number(breakerEntry.retryAfterMs) > 0);
  assert.ok(
    (health.json.providerBreakers || []).every(
      (entry: Record<string, unknown>) => !String(entry.provider || "").includes(":")
    )
  );
});

test("combo respects the global provider breaker and falls through without a combo-local breaker", async () => {
  assert.ok(app);
  relay.resetState(TOKENS.p2);

  const result = await postChat(
    app.baseUrl,
    "res-breaker-combo",
    "combo should skip broken provider"
  );

  assert.equal(result.response.status, 200, JSON.stringify(result.json));
  assert.equal(result.json.choices[0].message.content, "secondary stable");
  assert.equal(relay.getState(TOKENS.p5).hits, 1);
  assert.equal(relay.getState(TOKENS.p2).hits, 1);
});

test("round-robin combo still alternates healthy providers after combo breaker removal", async () => {
  assert.ok(app);
  await patchResilience(app.baseUrl, buildResilienceConfig());
  relay.resetState(TOKENS.p6);
  relay.resetState(TOKENS.p7);

  const first = await postChat(app.baseUrl, "res-rr", "round robin one");
  const second = await postChat(app.baseUrl, "res-rr", "round robin two");

  assert.equal(first.response.status, 200, JSON.stringify(first.json));
  assert.equal(second.response.status, 200, JSON.stringify(second.json));
  assert.equal(first.json.choices[0].message.content, "round robin A");
  assert.equal(second.json.choices[0].message.content, "round robin B");
  assert.equal(relay.getState(TOKENS.p6).hits, 1);
  assert.equal(relay.getState(TOKENS.p7).hits, 1);
});
