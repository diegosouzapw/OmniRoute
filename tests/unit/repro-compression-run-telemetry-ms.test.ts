/**
 * compression_run_telemetry cleanup cutoff unit mismatch.
 *
 * cleanupCompressionRunTelemetry() computed its cutoff in epoch seconds
 * (Math.floor(Date.now() / 1000)) while the timestamp column stores epoch
 * milliseconds, stamped by insertCompressionRunTelemetryRow() as Date.now().
 *
 * This is the same defect as domain_cost_history (#9625). That fix corrected
 * cleanupDomainCostHistory() ~90 lines earlier in cleanup.ts and missed this
 * sibling call site, so the retention sweep added by #6848 to bound
 * storage.sqlite growth has been permanently inert: a millisecond timestamp is
 * ~1000x larger than a seconds cutoff, so `WHERE timestamp < cutoff` never
 * matched an old row.
 *
 * The first test uses the REAL writer to establish the stored unit, so it
 * cannot pass if the producer's format ever changes independently.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-crt-ms-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { cleanupCompressionRunTelemetry } = await import("../../src/lib/db/cleanup.ts");
const { insertCompressionRunTelemetryRow } =
  await import("../../src/lib/db/compressionRunTelemetry.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000;

function seedRow(requestId: string): void {
  insertCompressionRunTelemetryRow({
    requestId,
    model: "m",
    provider: "p",
    source: "s",
    tokensBefore: 100,
    tokensAfter: 50,
    ratio: 0.5,
  });
}

test("the writer stamps epoch milliseconds, not seconds", () => {
  seedRow("req-unit-probe");
  const db = getDbInstance()!;
  const row = db
    .prepare("SELECT timestamp FROM compression_run_telemetry WHERE request_id = ?")
    .get("req-unit-probe") as { timestamp: number };

  // A seconds stamp is ~1.7e9; a milliseconds stamp is ~1.7e12.
  assert.ok(
    row.timestamp > 1e12,
    `timestamp ${row.timestamp} is not millisecond-scale; the cleanup cutoff unit must match the writer`
  );
});

test("cleanupCompressionRunTelemetry deletes rows older than the retention window", async () => {
  const db = getDbInstance()!;
  db.exec("DELETE FROM compression_run_telemetry");

  // Insert through the real writer, then backdate to simulate age. Backdating
  // preserves the producer's unit while letting the test control the age.
  const now = Date.now();
  for (const id of ["old-1", "old-2", "old-3"]) {
    seedRow(id);
    db.prepare("UPDATE compression_run_telemetry SET timestamp = ? WHERE request_id = ?").run(
      now - 40 * DAY_MS,
      id
    );
  }
  for (const id of ["new-1", "new-2"]) {
    seedRow(id);
    db.prepare("UPDATE compression_run_telemetry SET timestamp = ? WHERE request_id = ?").run(
      now - 5 * DAY_MS,
      id
    );
  }

  const result = await cleanupCompressionRunTelemetry();

  // With the pre-fix seconds cutoff this asserted 0 deleted: the sweep was a no-op.
  assert.strictEqual(result.deleted, 3, "should delete the 3 rows aged 40 days");
  assert.strictEqual(result.errors, 0);

  const remaining = db.prepare("SELECT COUNT(*) as cnt FROM compression_run_telemetry").get() as {
    cnt: number;
  };
  assert.strictEqual(remaining.cnt, 2, "should keep the 2 rows aged 5 days");
});
