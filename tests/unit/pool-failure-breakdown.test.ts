import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

// RED-first: per-exit failure breakdown joined from proxy_logs to
// call_logs families. Seeds cover error/timeout/success x known/unknown/NULL
// error_type, plus correlation_id NULL, a retry duplicate sharing one
// correlation_id, and a failure row without egress_ip (excluded everywhere).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-failure-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.PROXY_POOL_EGRESS_OBSERVATION;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyLogsDb = await import("../../src/lib/db/proxyLogs.ts");

const HOUR_MS = 60 * 60 * 1000;
let nextPort = 30000;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Member = { host: string; port: number };

async function poolMember(scope: string, scopeId: string | null): Promise<Member> {
  nextPort++;
  const proxy = await proxiesDb.createProxy({
    name: `proxy ${nextPort}`,
    type: "http",
    host: "10.9.0.1",
    port: nextPort,
  });
  await proxiesDb.addProxyToScopePool(scope, scopeId, proxy.id);
  return { host: "10.9.0.1", port: nextPort };
}

function proxyRow(
  member: Member,
  status: string,
  egressIp: string | null,
  connectionId: string | null,
  correlationId: string | null
) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port, level, connection_id, egress_ip, correlation_id)
       VALUES (?, ?, ?, 'http', ?, ?, 'provider', ?, ?, ?)`
    )
    .run(
      randomUUID(),
      new Date(Date.now() - HOUR_MS).toISOString(),
      status,
      member.host,
      member.port,
      connectionId,
      egressIp,
      correlationId
    );
}

function callLogRow(correlationId: string, errorType: string | null, status = 500) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, correlation_id, error_type)
       VALUES (?, ?, 'POST', '/v1/chat/completions', ?, 'm', 'p', ?, ?)`
    )
    .run(
      randomUUID(),
      new Date(Date.now() - HOUR_MS).toISOString(),
      status,
      correlationId,
      errorType
    );
}

test("breaks failures down by exit and family, retry counted once", async () => {
  const a = await poolMember("provider", "openai");
  callLogRow("corr-known", "server_error");
  proxyRow(a, "error", "203.0.113.1", "c1", "corr-known");
  callLogRow("corr-timeout", "unknown");
  proxyRow(a, "timeout", "203.0.113.1", "c2", "corr-timeout");
  callLogRow("corr-null", null, 500);
  proxyRow(a, "error", "203.0.113.2", "c3", "corr-null");
  proxyRow(a, "error", "203.0.113.2", "c4", null);
  callLogRow("corr-dup", "server_error");
  callLogRow("corr-dup", "server_error");
  proxyRow(a, "error", "203.0.113.1", "c5", "corr-dup");
  proxyRow(a, "success", "203.0.113.1", "c6", "corr-known");
  proxyRow(a, "error", null, "c7", "corr-known");

  const since = new Date(Date.now() - 24 * HOUR_MS).toISOString();
  const failures = proxyLogsDb.getPoolEgressFailureBreakdown("provider", "openai", since);
  assert.deepEqual(failures, {
    byExit: [
      {
        exit: "203.0.113.1",
        failures: 3,
        byFamily: [
          { family: "server_error", count: 2 },
          { family: "unknown", count: 1 },
        ],
      },
      {
        exit: "203.0.113.2",
        failures: 2,
        byFamily: [{ family: "unattributed", count: 2 }],
      },
    ],
    byFamily: [
      { family: "server_error", count: 2 },
      { family: "unattributed", count: 2 },
      { family: "unknown", count: 1 },
    ],
    unattributed: 2,
    attributionNote: "per-family breakdown covers only requests logged with attribution on",
  });
});

test("an empty breakdown stays empty, never null", async () => {
  await poolMember("provider", "nobody");
  const since = new Date(Date.now() - 24 * HOUR_MS).toISOString();
  assert.deepEqual(proxyLogsDb.getPoolEgressFailureBreakdown("provider", "nobody", since), {
    byExit: [],
    byFamily: [],
    unattributed: 0,
    attributionNote: "per-family breakdown covers only requests logged with attribution on",
  });
});
