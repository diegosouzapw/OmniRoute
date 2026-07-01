import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import net from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-batch-e2e-rl-"));
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const RELAY_PORT = await getFreePort();
const SERVER_PORT = await getFreePort();

type FileUploadResponse = {
  id?: string;
};

type BatchResponse = {
  id?: string;
  status?: string;
  request_counts?: {
    completed?: number;
    failed?: number;
  };
};

function getFreePort() {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        server.close();
        reject(new Error("failed to allocate port"));
        return;
      }
      const port = addr.port;
      server.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function summarizeText(text: string, maxLength = 800) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > maxLength ? `${compact.slice(0, maxLength)}...` : compact;
}

function formatServerTail(proc: ReturnType<typeof createServerProcess>) {
  return [
    "--- stdout ---",
    ...proc.stdoutLines.slice(-40),
    "--- stderr ---",
    ...proc.stderrLines.slice(-40),
  ].join("\n");
}

async function readJsonForTest<T>(
  response: Response,
  label: string,
  proc: ReturnType<typeof createServerProcess>
): Promise<T> {
  const text = await response.text();
  let body: T;
  try {
    body = JSON.parse(text) as T;
  } catch {
    throw new Error(
      [
        `${label} returned invalid JSON (${response.status} ${response.statusText}, content-type=${response.headers.get("content-type") || "unknown"})`,
        summarizeText(text),
        formatServerTail(proc),
      ].join("\n")
    );
  }

  assert.equal(
    response.status,
    200,
    `${label} failed (${response.status}): ${JSON.stringify(body)}`
  );
  return body;
}

/* ---------- Fake embedding relay ---------- */
function createFakeEmbeddingRelay() {
  let requestCount = 0;
  let server: http.Server | null = null;

  const handle = (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method !== "POST" || req.url !== "/embeddings") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "not found" }));
      return;
    }
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      requestCount++;
      const rlHeaders: Record<string, string> = {
        "x-ratelimit-remaining-req-minute": "0",
        "x-ratelimit-limit-req-minute": "100",
        "x-ratelimit-remaining-tokens-minute": "0",
        "x-ratelimit-tokens-query-cost": "50",
      };
      if (requestCount % 2 === 1) {
        res.writeHead(429, {
          ...rlHeaders,
          "Content-Type": "application/json",
          "Retry-After": "1",
        });
        res.end(
          JSON.stringify({
            error: { message: "rate limited", type: "rate_limit_error" },
          })
        );
      } else {
        res.writeHead(200, {
          ...rlHeaders,
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            object: "list",
            data: [
              {
                object: "embedding",
                index: 0,
                embedding: [0.1, 0.2, 0.3],
              },
            ],
            model: "test-model",
            usage: { prompt_tokens: 4, total_tokens: 4 },
          })
        );
      }
    });
  };

  return {
    async start() {
      await new Promise<void>((resolve, reject) => {
        server = http.createServer(handle);
        server.once("error", reject);
        server.listen(RELAY_PORT, "127.0.0.1", () => resolve());
      });
    },
    async stop() {
      if (!server) return;
      await new Promise<void>((resolve) => server?.close(() => resolve()));
      server = null;
    },
  };
}

/* ---------- OmniRoute server process ---------- */
function createServerProcess() {
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];
  let exitInfo: { code: number | null; signal: NodeJS.Signals | null } | null = null;

  const child = spawn(process.execPath, ["scripts/dev/run-next-playwright.mjs", "dev"], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      DATA_DIR: TEST_DATA_DIR,
      PORT: String(SERVER_PORT),
      DASHBOARD_PORT: String(SERVER_PORT),
      API_PORT: String(SERVER_PORT),
      HOST: "127.0.0.1",
      REQUIRE_API_KEY: "false",
      API_KEY_SECRET: "batch-e2e-rl-secret",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      INITIAL_PASSWORD: "",
      NEXT_TELEMETRY_DISABLED: "1",
      OMNIROUTE_E2E_BOOTSTRAP_MODE: "open",
      OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "false",
      OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "true",
      OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: "true",
      OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "true",
      PATH: process.env.PATH,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.once("exit", (code, signal) => {
    exitInfo = { code, signal };
  });
  child.stdout.on("data", (chunk) => {
    const lines = String(chunk).split(/\r?\n/).filter(Boolean);
    stdoutLines.push(...lines);
    if (stdoutLines.length > 500) stdoutLines.splice(0, stdoutLines.length - 500);
  });
  child.stderr.on("data", (chunk) => {
    const lines = String(chunk).split(/\r?\n/).filter(Boolean);
    stderrLines.push(...lines);
    if (stderrLines.length > 500) stderrLines.splice(0, stderrLines.length - 500);
  });

  return {
    child,
    stdoutLines,
    stderrLines,
    baseUrl: `http://127.0.0.1:${SERVER_PORT}`,
    get exitInfo() {
      return exitInfo;
    },
  };
}

async function waitForServer(baseUrl: string, proc: ReturnType<typeof createServerProcess>) {
  const startedAt = Date.now();
  const readinessTimeoutMs = 240_000;
  const probeTimeoutMs = 15_000;
  let lastReadiness = "";
  while (Date.now() - startedAt < readinessTimeoutMs) {
    if (proc.exitInfo) {
      throw new Error(
        [
          `Server exited early (code=${proc.exitInfo.code}, signal=${proc.exitInfo.signal})`,
          formatServerTail(proc),
        ].join("\n")
      );
    }
    try {
      for (const readinessPath of ["/api/health/ping", "/api/monitoring/health"]) {
        const resp = await fetch(`${baseUrl}${readinessPath}`, {
          signal: AbortSignal.timeout(probeTimeoutMs),
        });
        if (resp.ok) return;
        const body = await resp.text().catch(() => "");
        lastReadiness = `${readinessPath} -> ${resp.status}: ${summarizeText(body, 200)}`;
      }
    } catch (error) {
      lastReadiness = error instanceof Error ? error.message : String(error);
      // not ready yet
    }
    await sleep(500);
  }
  throw new Error(
    [
      "Timed out waiting for server",
      `Last readiness probe: ${lastReadiness}`,
      formatServerTail(proc),
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

/* ---------- Test ---------- */
const relay = createFakeEmbeddingRelay();
let app: ReturnType<typeof createServerProcess>;
const RELAY_BASE = `http://127.0.0.1:${RELAY_PORT}`;

test.before(async () => {
  await relay.start();

  app = createServerProcess();
  await waitForServer(app.baseUrl, app);

  // Seed a provider_node via the API (don't open DB in this process)
  const nodeResp = await fetch(`${app.baseUrl}/api/provider-nodes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "openai-compatible",
      name: "Batch E2E Test Provider",
      prefix: "testbatch",
      apiType: "embeddings",
      baseUrl: RELAY_BASE,
    }),
  });
  const nodeBody = nodeResp.ok ? await nodeResp.json() : null;
  if (!nodeResp.ok) {
    // If /api/provider-nodes fails, try the direct DB import approach
    throw new Error(
      `Failed to create provider node: ${nodeResp.status} ${JSON.stringify(nodeBody)}`
    );
  }
});

test.after(async () => {
  try {
    await stopProcess(app.child);
  } catch {}
  try {
    await relay.stop();
  } catch {}
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("batch E2E: upload file, create batch, verify rate-limit logs appear", async () => {
  const jsonlContent = [
    JSON.stringify({
      custom_id: "req-0",
      method: "POST",
      url: "/v1/embeddings",
      body: { model: "testbatch/test-model", input: "Hello world" },
    }),
    JSON.stringify({
      custom_id: "req-1",
      method: "POST",
      url: "/v1/embeddings",
      body: { model: "testbatch/test-model", input: "Rate limit test" },
    }),
  ].join("\n");

  // 1. Upload file via HTTP multipart POST
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([jsonlContent], { type: "application/jsonl" }),
    "batch_input.jsonl"
  );
  formData.append("purpose", "batch");

  const uploadResp = await fetch(`${app.baseUrl}/api/v1/files`, {
    method: "POST",
    body: formData,
  });
  const uploadBody = await readJsonForTest<FileUploadResponse>(uploadResp, "File upload", app);
  const fileId = uploadBody.id;
  assert.ok(fileId, "file id missing from upload response");

  // 2. Create batch via HTTP POST
  const batchResp = await fetch(`${app.baseUrl}/api/v1/batches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input_file_id: fileId,
      endpoint: "/v1/embeddings",
      completion_window: "24h",
    }),
  });
  const batchBody = await readJsonForTest<BatchResponse>(batchResp, "Batch creation", app);
  const batchId = batchBody.id;
  assert.ok(batchId, "batch id missing from create response");

  // 3. Poll for batch completion
  let batchStatus = "";
  let attempts = 0;
  let lastPollSummary = "";
  const maxAttempts = 120;
  while (attempts < maxAttempts) {
    await sleep(2_000);
    attempts++;
    const sr = await fetch(`${app.baseUrl}/api/v1/batches/${batchId}`);
    const text = await sr.text();
    let sb: BatchResponse;
    try {
      sb = JSON.parse(text);
    } catch {
      lastPollSummary = `poll ${attempts} returned invalid JSON (${sr.status} ${sr.statusText}, content-type=${sr.headers.get("content-type") || "unknown"}): ${summarizeText(text, 300)}`;
      console.warn(`[poll ${attempts}] ${lastPollSummary}`);
      continue;
    }
    if (!sr.ok) {
      lastPollSummary = `poll ${attempts} failed (${sr.status} ${sr.statusText}): ${JSON.stringify(sb)}`;
      console.warn(`[poll ${attempts}] ${lastPollSummary}`);
      continue;
    }
    batchStatus = sb.status || "";
    lastPollSummary = `poll ${attempts} status=${batchStatus}`;
    console.log(
      `[poll ${attempts}] batch ${batchId} status=${batchStatus} completed=${sb.request_counts?.completed} failed=${sb.request_counts?.failed}`
    );
    if (["completed", "failed", "cancelled"].includes(batchStatus)) break;
  }
  assert.equal(
    batchStatus,
    "completed",
    `Batch did not complete; final status: ${batchStatus}. ` +
      `Last poll: ${lastPollSummary}\n` +
      `Server [BATCH] logs:\n${[...app.stdoutLines, ...app.stderrLines].filter((l) => l.includes("[BATCH]")).join("\n")}`
  );

  // 4. Check server stdout for throttle-related log messages
  const allLogs = [...app.stdoutLines, ...app.stderrLines];
  const throttleLogs = allLogs.filter(
    (l) =>
      l.includes("[BATCH] Throttle check") ||
      l.includes("[BATCH] High pressure") ||
      l.includes("[BATCH] Moderate pressure")
  );

  console.log("\n=== Rate-limit throttle logs from batch processing ===");
  for (const line of throttleLogs) {
    console.log(`  ${line}`);
  }
  console.log("====================================================\n");

  assert.ok(
    throttleLogs.length >= 2,
    `Expected >=2 throttle log entries, got ${throttleLogs.length}.\n` +
      `All [BATCH] logs:\n${allLogs.filter((l) => l.includes("[BATCH]")).join("\n")}`
  );

  // 5. Verify batch results
  const finalResp = await fetch(`${app.baseUrl}/api/v1/batches/${batchId}`);
  const finalBody = await readJsonForTest<BatchResponse>(finalResp, "Final batch fetch", app);
  assert.equal(
    finalBody.request_counts?.completed,
    2,
    `Expected 2 completed, got ${JSON.stringify(finalBody.request_counts)}`
  );
});
