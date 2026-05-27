/**
 * Tests for /api/cli-tools/logs route (fix #2756).
 *
 * Verifies:
 *   - GET returns 200 with valid JSON array body.
 *   - `filter` param filters log lines by text.
 *   - Error responses do NOT leak stack traces (hard rule #12).
 *   - log-streamer.ts points to the correct URL (/api/cli-tools/logs).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-logs-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Write a small pino-format log file before route is imported
const logDir = path.join(process.cwd(), "logs", "application");
fs.mkdirSync(logDir, { recursive: true });
const logPath = path.join(logDir, "app.log");
process.env.APP_LOG_FILE_PATH = logPath;

const now = Date.now();
const lines = [
  JSON.stringify({ level: 30, msg: "provider connected", component: "router", time: now }),
  JSON.stringify({ level: 40, msg: "rate limit hit", component: "rateLimit", time: now }),
  JSON.stringify({ level: 20, msg: "debug trace output", component: "debug", time: now }),
  "not-valid-json-should-be-skipped",
];
fs.writeFileSync(logPath, lines.join("\n") + "\n", "utf-8");

const { GET } = await import(
  "../../src/app/api/cli-tools/logs/route.ts"
);

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  try {
    fs.unlinkSync(logPath);
  } catch {
    // best effort
  }
});

// Helper — make a request skipping auth (auth tested separately in management auth suite)
function makeReq(queryString = "") {
  const url = `http://localhost/api/cli-tools/logs${queryString ? `?${queryString}` : ""}`;
  const req = new Request(url);
  // Inject header that requireManagementAuth honours when requireLogin is off
  Object.defineProperty(req, "headers", {
    value: new Headers({ host: "localhost" }),
    configurable: true,
  });
  return req;
}

test("GET /api/cli-tools/logs returns 200 with JSON array when log file exists", async () => {
  const res = await GET(makeReq());
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.ok(Array.isArray(body), "body should be an array");
  assert.ok(body.length >= 3, `expected at least 3 entries, got ${body.length}`);
});

test("GET /api/cli-tools/logs respects filter param", async () => {
  const res = await GET(makeReq("filter=rateLimit"));
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.ok(Array.isArray(body));
  // Only the "rate limit hit" entry matches component=rateLimit
  assert.ok(
    body.every((e: { component?: string; msg?: string }) => {
      const comp = (e.component || "").toLowerCase();
      const msg = (e.msg || "").toLowerCase();
      return comp.includes("ratelimit") || msg.includes("ratelimit") || comp.includes("rate");
    }),
    "filter should restrict results to matching component/message"
  );
});

test("GET /api/cli-tools/logs returns empty array when log file does not exist", async () => {
  const origPath = process.env.APP_LOG_FILE_PATH;
  process.env.APP_LOG_FILE_PATH = "/tmp/omniroute-nonexistent-cli-logs-test.log";

  const res = await GET(makeReq());
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  assert.equal(body.length, 0);

  process.env.APP_LOG_FILE_PATH = origPath;
});

test("GET /api/cli-tools/logs error response does not leak stack traces (hard rule #12)", async () => {
  // Simulate an internal error path by temporarily breaking the log path to a dir
  const origPath = process.env.APP_LOG_FILE_PATH;
  // Point to a directory so readFileSync throws
  process.env.APP_LOG_FILE_PATH = TEST_DATA_DIR;

  const res = await GET(makeReq());
  // Should respond with 500 or empty (route may handle gracefully), but must NOT leak stack
  const text = await res.text();
  assert.ok(!text.includes(" at "), "Response must not contain stack trace frames");

  process.env.APP_LOG_FILE_PATH = origPath;
});

test("log-streamer.ts calls /api/cli-tools/logs (correct URL, not the missing route)", async () => {
  const { createLogStream } = await import("../../src/lib/cli-helper/log-streamer.ts");
  // Inspect the source to verify the URL used; we mock fetch to capture it
  const captured: string[] = [];
  const origFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string) => {
    captured.push(typeof url === "string" ? url : String(url));
    // Return a mock Response with a body so the stream doesn't error immediately
    return new Response(new ReadableStream({ start(c) { c.close(); } }), { status: 200 });
  }) as typeof fetch;

  try {
    const { stream, stop } = createLogStream({ baseUrl: "http://localhost:20128" });
    const reader = stream.getReader();
    // Consume until done (mock stream closes immediately)
    await reader.read().catch(() => {});
    stop();
  } finally {
    globalThis.fetch = origFetch;
  }

  assert.ok(captured.length > 0, "fetch should have been called");
  assert.ok(
    captured.some((u) => u.includes("/api/cli-tools/logs")),
    `Expected /api/cli-tools/logs in fetched URL, got: ${captured[0]}`
  );
  assert.ok(
    !captured.some((u) => u.includes("/api/logs/console")),
    "log-streamer should not call /api/logs/console"
  );
});
