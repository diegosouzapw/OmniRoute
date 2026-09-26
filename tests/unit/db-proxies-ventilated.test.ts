import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-proxies-vent-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      if (
        (error as { code?: string } | null)?.code === "EBUSY" ||
        ((error as { code?: string } | null)?.code === "EPERM" && attempt < 9)
      ) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type LogRow = {
  id: string;
  status: string;
  targetUrl: string | null;
  upstreamStatus: number | null;
};

let logSeq = 0;

async function seedProxy(name: string, host: string, rows: LogRow[]) {
  const proxy = await proxiesDb.createProxy({ name, type: "http", host, port: 8080 });
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insertLog = db.prepare(`
    INSERT INTO proxy_logs (
      id, timestamp, status, proxy_type, proxy_host, proxy_port,
      target_url, upstream_status, latency_ms
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const row of rows) {
    logSeq += 1;
    insertLog.run(
      `${row.id}-${logSeq}`,
      now,
      row.status,
      "http",
      host,
      8080,
      row.targetUrl,
      row.upstreamStatus,
      100
    );
  }
  const stats = await proxiesDb.getProxyHealthStats({ hours: 2 });
  const entry = stats.find((s: { proxyId: string }) => s.proxyId === proxy.id) as unknown as Record<
    string,
    number | boolean | string | null
  >;
  assert.ok(entry, "health entry must exist for seeded proxy");
  return entry;
}

function row(
  status: string,
  upstreamStatus: number | null,
  targetUrl: string | null = null
): LogRow {
  return { id: `log-${status}-${String(upstreamStatus)}`, status, targetUrl, upstreamStatus };
}

test("measured successes count as transport ok, including legacy rows without upstream status", async () => {
  const entry = await seedProxy("Vent A", "vent-a.local", [
    row("success", 200),
    row("success", 200),
    row("success", null),
  ]);
  assert.equal(entry.realRequests, 3);
  assert.equal(entry.transportOk, 3);
  assert.equal(entry.transportFailures, 0);
  assert.equal(entry.transportRate, 100);
  assert.equal(entry.measured, true);
});

test("connection tests are excluded from the transport rate and counted separately", async () => {
  const entry = await seedProxy("Vent B", "vent-b.local", [
    row("success", null, "openai/connection-test"),
    row("success", null, "openai/connection-test"),
    row("success", 200),
  ]);
  assert.equal(entry.connectionTests, 2);
  assert.equal(entry.connectionTestSuccess, 2);
  assert.equal(entry.realRequests, 1);
  assert.equal(entry.transportOk, 1);
  assert.equal(entry.transportRate, 100);
});

test("upstream refusals do not degrade the transport rate", async () => {
  const entry = await seedProxy("Vent C", "vent-c.local", [
    row("error", 429),
    row("error", 429),
    row("error", 429),
    row("success", 200),
  ]);
  assert.equal(entry.upstream4xx, 3);
  assert.equal(entry.transportFailures, 0);
  assert.equal(entry.transportOk, 4);
  assert.equal(entry.transportRate, 100);
});

test("upstream 5xx wins over the logged status, unanswered timeouts count as transport failures", async () => {
  const entry = await seedProxy("Vent D", "vent-d.local", [
    row("error", 500),
    row("timeout", 504),
    row("timeout", null),
  ]);
  assert.equal(entry.upstream5xx, 2);
  assert.equal(entry.transportFailures, 1);
  assert.equal(entry.transportOk, 2);
  assert.equal(entry.transportRate, 66.67);
});

test("unanswered errors in a measured window count as transport failures", async () => {
  const entry = await seedProxy("Vent E", "vent-e.local", [
    row("error", null),
    row("error", null),
    row("error", 403),
  ]);
  assert.equal(entry.measured, true);
  assert.equal(entry.transportFailures, 2);
  assert.equal(entry.upstream4xx, 1);
});

test("history without upstream status is reported as unmeasured, never as zero failures", async () => {
  const entry = await seedProxy("Vent F", "vent-f.local", [row("error", null), row("error", null)]);
  assert.equal(entry.measured, false);
  assert.equal(entry.measuredRequests, 0);
  assert.equal(entry.realRequests, 2);
});

test("an error carrying a 2xx upstream status counts as transport ok", async () => {
  const entry = await seedProxy("Vent G", "vent-g.local", [row("error", 200)]);
  assert.equal(entry.transportOk, 1);
  assert.equal(entry.transportFailures, 0);
});

test("a proxy without logs reports zero counters and null rates", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "Vent H",
    type: "http",
    host: "vent-h.local",
    port: 8080,
  });
  const stats = await proxiesDb.getProxyHealthStats({ hours: 2 });
  const entry = stats.find((s: { proxyId: string }) => s.proxyId === proxy.id) as unknown as Record<
    string,
    number | boolean | string | null
  >;
  assert.ok(entry);
  assert.equal(entry.totalRequests, 0);
  assert.equal(entry.realRequests, 0);
  assert.equal(entry.connectionTests, 0);
  assert.equal(entry.transportOk, 0);
  assert.equal(entry.transportFailures, 0);
  assert.equal(entry.transportRate, null);
  assert.equal(entry.successRate, null);
  assert.equal(entry.measured, false);
});

test("legacy aggregate fields keep their previous values", async () => {
  const entry = await seedProxy("Vent I", "vent-i.local", [
    row("success", 200),
    row("error", 429),
    row("timeout", null, "openai/connection-test"),
  ]);
  assert.equal(entry.totalRequests, 3);
  assert.equal(entry.successCount, 1);
  assert.equal(entry.errorCount, 1);
  assert.equal(entry.timeoutCount, 1);
  assert.equal(entry.successRate, 33.33);
});
