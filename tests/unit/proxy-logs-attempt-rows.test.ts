import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// proxy_logs keeps one row per request actually sent: a request served on the
// 3rd attempt leaves 3 rows sharing one correlation id, the first two marked
// abandoned and the last one served. The served row is written last. A request
// with no journal keeps one row with null attempt columns.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-attempt-rows-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const proxyLogsDb = await import("../../src/lib/db/proxyLogs.ts");
const proxyLatency = await import("../../src/lib/db/proxyLatency.ts");
const proxyEgress = await import("../../src/lib/proxyEgress.ts");
const { proxyConfigToUrl } = await import("../../open-sse/utils/proxyDispatcher.ts");
const { mergeAppliedProxySink, safeLogEvents } =
  await import("../../src/sse/handlers/chatHelpers.ts");
const { withUpstreamStatusCapture } = await import("../../open-sse/utils/upstreamStatusCapture.ts");

const PROXY_A = { type: "http", host: "127.0.0.1", port: 18081 };
const PROXY_B = { type: "http", host: "127.0.0.1", port: 18082 };

type Sink = { proxy: unknown; upstreamStatus?: number; rotationAccount?: string | null };

function respond(status: number) {
  return async () => new Response(null, { status });
}

function logArgs(proxyInfo: unknown, status: number, correlationId: string | null) {
  return {
    result:
      status === 200
        ? { success: true, status, error: null }
        : { success: false, status, error: "refused" },
    proxyInfo,
    proxyLatency: 5,
    provider: "openai",
    model: "gpt-5",
    sourceFormat: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "conn-12345678" },
    comboName: null,
    clientRawRequest: null,
    correlationId,
  };
}

test.beforeEach(() => {
  proxyLogger.clearProxyLogs();
});

test.after(() => {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("three sends leave three rows on one correlation id: abandoned, abandoned, served", async () => {
  const sink: Sink = { proxy: PROXY_A };
  const first = withUpstreamStatusCapture(
    respond(429),
    () => sink,
    () => true
  );
  const second = withUpstreamStatusCapture(
    respond(403),
    () => sink,
    () => true
  );
  const third = withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => true
  );
  await first();
  sink.proxy = PROXY_B;
  await second();
  await third();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 200, "corr-1"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 3);
  for (const row of rows) assert.equal(row.correlationId, "corr-1");
  const byAttempt = [...rows].sort((a, b) => (a.attemptNumber ?? 0) - (b.attemptNumber ?? 0));
  assert.deepEqual(
    byAttempt.map((r) => [r.attemptNumber, r.attemptIssue, r.upstreamStatus]),
    [
      [1, "abandoned", 429],
      [2, "abandoned", 403],
      [3, "served", 200],
    ]
  );
});

test("a fully refused request leaves abandoned rows and an error final row", async () => {
  const sink: Sink = { proxy: PROXY_A };
  const wrapped = withUpstreamStatusCapture(
    respond(503),
    () => sink,
    () => true
  );
  await wrapped();
  await wrapped();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 503, "corr-2"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 2);
  const byAttempt = [...rows].sort((a, b) => (a.attemptNumber ?? 0) - (b.attemptNumber ?? 0));
  // The final send is the one the request settled on, even when it failed: it
  // carries the terminal status, so it reads served while earlier sends read
  // abandoned.
  assert.deepEqual(
    byAttempt.map((r) => [r.attemptNumber, r.attemptIssue]),
    [
      [1, "abandoned"],
      [2, "served"],
    ]
  );
  assert.equal(byAttempt[1].status, "error");
});

test("a network throw keeps the send with a null status instead of dropping it", async () => {
  const sink: Sink = { proxy: PROXY_A };
  const failing = withUpstreamStatusCapture(
    async () => {
      throw new TypeError("fetch failed");
    },
    () => sink,
    () => true
  );
  await assert.rejects(failing(), /fetch failed/);
  const ok = withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => true
  );
  await ok();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 200, "corr-3"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 2);
  const byAttempt = [...rows].sort((a, b) => (a.attemptNumber ?? 0) - (b.attemptNumber ?? 0));
  assert.equal(byAttempt[0].upstreamStatus, null);
  assert.equal(byAttempt[0].attemptIssue, "abandoned");
  assert.equal(byAttempt[1].attemptIssue, "served");
});

test("a request with no journal keeps a single row with null attempt columns", async () => {
  const proxyInfo = mergeAppliedProxySink(
    { proxy: null, level: "direct", levelId: null },
    { proxy: null }
  );
  await safeLogEvents(logArgs(proxyInfo, 200, null));

  const [entry] = proxyLogger.getProxyLogs();
  assert.equal(entry.attemptNumber, null);
  assert.equal(entry.attemptIssue, null);
  assert.equal(entry.upstreamStatus, null);
});

test("a send outside a dispatch leaves no journal", async () => {
  const sink: Sink = { proxy: PROXY_A };
  const wrapped = withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => false
  );
  await wrapped();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 200, "corr-4"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].attemptNumber, null);
});

test("two wrappers on one send leave one row, not two", async () => {
  const sink: Sink = { proxy: PROXY_A };
  const inner = withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => true
  );
  const outer = withUpstreamStatusCapture(
    inner,
    () => sink,
    () => true
  );
  await outer();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 200, "corr-5"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].attemptNumber, 1);
  assert.equal(rows[0].attemptIssue, "served");
});

test("a retry inside one rotation turn leaves one row per send", async () => {
  const sink: Sink = { proxy: PROXY_A };
  const wrapped = withUpstreamStatusCapture(
    respond(429),
    () => sink,
    () => true
  );
  await wrapped();
  await wrapped();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 429, "corr-6"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 2);
  const byAttempt = [...rows].sort((a, b) => (a.attemptNumber ?? 0) - (b.attemptNumber ?? 0));
  assert.deepEqual(
    byAttempt.map((r) => [r.attemptNumber, r.attemptIssue, r.upstreamStatus]),
    [
      [1, "abandoned", 429],
      [2, "served", 429],
    ]
  );
});

test("each send logs its own outlet egress address, not the final one", async () => {
  // RED without the per-attempt resolution: both rows share the final
  // proxy's cached egress address, so the first row reads E2.
  const urlA = proxyConfigToUrl(PROXY_A);
  const urlB = proxyConfigToUrl(PROXY_B);
  proxyEgress._setEgressProbeForTests(async (proxyUrl) =>
    proxyUrl === urlA ? { ip: "203.0.113.11", latencyMs: 1 } : { ip: "203.0.113.22", latencyMs: 1 }
  );
  try {
    await proxyEgress.resolveEgressIp(urlA, { force: true });
    await proxyEgress.resolveEgressIp(urlB, { force: true });

    const sink: Sink = { proxy: PROXY_A };
    await withUpstreamStatusCapture(
      respond(429),
      () => sink,
      () => true
    )();
    sink.proxy = PROXY_B;
    await withUpstreamStatusCapture(
      respond(200),
      () => sink,
      () => true
    )();

    const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
    await safeLogEvents(logArgs(proxyInfo, 200, "corr-egress"));
    proxyLogger.flushProxyLogsSync();

    const rows = proxyLogger.getProxyLogs();
    assert.equal(rows.length, 2);
    const byAttempt = [...rows].sort((a, b) => (a.attemptNumber ?? 0) - (b.attemptNumber ?? 0));
    assert.equal(byAttempt[0].attemptIssue, "abandoned");
    assert.equal(byAttempt[0].egressIp, "203.0.113.11");
    assert.equal(byAttempt[1].attemptIssue, "served");
    assert.equal(byAttempt[1].egressIp, "203.0.113.22");
    proxyLogger.flushProxyLogsSync();
    const recent = proxyLogsDb.getRecentEgressIpForProxy("127.0.0.1", 18081);
    assert.equal(recent?.egressIp, "203.0.113.11");
  } finally {
    proxyEgress._setEgressProbeForTests(null);
    proxyEgress.clearEgressCache();
  }
});

test("an abandoned send does not pull the latency average down", async () => {
  proxyLogger.logProxyEvent({
    status: "error",
    proxy: { type: "http", host: "127.0.0.1", port: 18091 },
    provider: "openai",
    targetUrl: "openai/gpt-5",
    latencyMs: 1,
    attemptNumber: 1,
    attemptIssue: "abandoned",
  });
  proxyLogger.logProxyEvent({
    status: "success",
    proxy: { type: "http", host: "127.0.0.1", port: 18091 },
    provider: "openai",
    targetUrl: "openai/gpt-5",
    latencyMs: 900,
    attemptNumber: 2,
    attemptIssue: "served",
  });
  // A slower-but-served rival: with the fix 18091 averages 900 and loses to
  // it; without the fix 18091 averages (1 + 900) / 2 and wrongly wins.
  proxyLogger.logProxyEvent({
    status: "success",
    proxy: { type: "http", host: "127.0.0.1", port: 18092 },
    provider: "openai",
    targetUrl: "openai/gpt-5",
    latencyMs: 500,
    attemptNumber: 1,
    attemptIssue: "served",
  });
  proxyLogger.flushProxyLogsSync();

  const db = core.getDbInstance();
  const row = db
    .prepare(
      `SELECT AVG(latency_ms) AS avg FROM proxy_logs
       WHERE proxy_host = ? AND proxy_port = ?`
    )
    .get("127.0.0.1", 18091) as { avg: number };
  // Raw average mixes the 1 ms refusal in; the latency map must read 900.
  assert.ok(row.avg < 900);
  const picked = proxyLatency.pickByLatency(db, [
    { host: "127.0.0.1", port: 18091 },
    { host: "127.0.0.1", port: 18092 },
  ]);
  assert.deepEqual(picked, { host: "127.0.0.1", port: 18092 });
});

test("a simulated send carries a non-negative duration", async () => {
  const sink: Sink = { proxy: PROXY_A };
  await withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => true
  )();
  const attempts = (sink as { attempts?: Array<{ durationMs?: number | null }> }).attempts;
  assert.ok(attempts?.length === 1);
  assert.ok(
    typeof attempts[0].durationMs === "number" && attempts[0].durationMs >= 0,
    "durationMs must be a non-negative number"
  );
});

test("the served row is written after the abandoned rows", async () => {
  const sink: Sink = { proxy: PROXY_A };
  await withUpstreamStatusCapture(
    respond(429),
    () => sink,
    () => true
  )();
  await withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => true
  )();

  const proxyInfo = mergeAppliedProxySink({ proxy: null, level: "direct", levelId: null }, sink);
  await safeLogEvents(logArgs(proxyInfo, 200, "corr-order"));

  const rows = proxyLogger.getProxyLogs();
  assert.equal(rows.length, 2);
  // In-memory buffer is newest-first: index 0 is the last write, the served row.
  assert.equal(rows[0].attemptIssue, "served");
  assert.equal(rows[1].attemptIssue, "abandoned");
});
