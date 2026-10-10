import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { once } from "node:events";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cost-responsive-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { getProviderWindowCostBreakdown } =
  await import("../../src/lib/usage/providerWindowCosts.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { RecordedCostMatcher } = await import("../../src/lib/usage/recordedCostMatcher.ts");
const now = Date.parse("2026-06-28T12:00:00Z");

async function seed(count: number, extraCost: boolean) {
  const db = core.getDbInstance();
  db.exec("DELETE FROM usage_history; DELETE FROM domain_cost_history;");
  await updatePricing({ codex: { "test-model": { input: 1, output: 1 } } });
  const usage = db.prepare(`INSERT INTO usage_history
    (provider, model, connection_id, api_key_id, api_key_name, tokens_input, timestamp)
    VALUES ('codex', 'test-model', 'synthetic-connection', 'synthetic-key', 'Synthetic', 1000000, ?)`);
  const cost = db.prepare(
    "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES ('synthetic-key', 2, ?)"
  );
  db.transaction(() => {
    for (let i = 0; i < count; i++) {
      const at = now - 86400000 + i * 1000;
      usage.run(new Date(at).toISOString());
      cost.run(at);
    }
    // The same key can have costs from another provider/connection. Force the
    // detailed branch without creating an extra usage row in this selection.
    if (extraCost) cost.run(now - 1000);
  })();
}

const breakdown = () =>
  getProviderWindowCostBreakdown({
    provider: "codex",
    connectionId: "synthetic-connection",
    now,
  });

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("mismatched cost counts yield to an HTTP heartbeat before analytics completes", async () => {
  await seed(4096, true);
  let completed = false;
  let servedBeforeCompletion = false;
  let matches = 0;
  let matchesAtHeartbeat = 0;
  const server = http.createServer((_request, response) => {
    servedBeforeCompletion = !completed;
    matchesAtHeartbeat = matches;
    response.end("healthy");
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  let sendHeartbeat: () => void;
  const heartbeat = new Promise<void>((resolve, reject) => {
    sendHeartbeat = () => {
      const request = http.get(`http://127.0.0.1:${address.port}/health`, (response) => {
        response.resume();
        response.on("end", resolve);
      });
      request.on("error", reject);
      request.setTimeout(5000, () => request.destroy(new Error("heartbeat timed out")));
    };
  });
  const originalTake = RecordedCostMatcher.prototype.takeClosest;
  RecordedCostMatcher.prototype.takeClosest = function (timestamp, tolerance) {
    if (++matches === 1) sendHeartbeat();
    return originalTake.call(this, timestamp, tolerance);
  };
  try {
    const result = await breakdown();
    completed = true;
    assert.ok(matches > 0, "fixture must exercise the detailed matching path");
    await heartbeat;
    assert.equal(result.totalCostUsd, 8192);
    assert.equal(result.rows[0].requests, 4096);
    assert.ok(
      servedBeforeCompletion,
      "HTTP must make progress while cost matching is still running"
    );
    assert.ok(
      matchesAtHeartbeat > 0 && matchesAtHeartbeat < 4096,
      "yield during matching, not just before it"
    );
  } finally {
    RecordedCostMatcher.prototype.takeClosest = originalTake;
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("aggregate-only calculation never loads detailed cost records", async () => {
  await seed(16, false);
  const db = core.getDbInstance();
  const originalPrepare = db.prepare;
  const detailedQueries: string[] = [];
  db.prepare = (sql) => {
    if (/id as rowId/i.test(sql) && /FROM domain_cost_history/i.test(sql))
      detailedQueries.push(sql);
    return originalPrepare.call(db, sql);
  };
  try {
    const result = await breakdown();
    assert.equal(result.totalCostUsd, 32);
    assert.equal(detailedQueries.length, 0);
  } finally {
    db.prepare = originalPrepare;
  }
});

test("partial recorded history falls back to pricing only for the unmatched usage row", async () => {
  await seed(2, false);
  core
    .getDbInstance()
    .prepare("DELETE FROM domain_cost_history WHERE timestamp = ?")
    .run(now - 86400000 + 1000);
  const result = await breakdown();
  assert.equal(result.rows[0].requests, 2);
  assert.equal(result.totalCostUsd, 3); // recorded $2 once, then calculated $1
});

test("matching is request-local and respects the selected provider connection", async () => {
  await seed(4, true);
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history
    (provider, model, connection_id, api_key_id, api_key_name, tokens_input, timestamp)
    VALUES ('codex', 'test-model', 'other-connection', 'synthetic-key', 'Synthetic', 1000000, ?)`
    )
    .run(new Date(now - 1000).toISOString());
  const [first, second] = await Promise.all([breakdown(), breakdown()]);
  for (const result of [first, second]) {
    assert.equal(result.rows[0].requests, 4);
    assert.equal(result.totalCostUsd, 8);
  }
  const other = await getProviderWindowCostBreakdown({
    provider: "codex",
    connectionId: "other-connection",
    now,
  });
  assert.equal(other.rows[0].requests, 1);
  assert.equal(other.totalCostUsd, 2);
});
