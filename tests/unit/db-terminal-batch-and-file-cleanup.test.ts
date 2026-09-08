// batch_item_checkpoints and files had NO automatic cleanup path at all: the only
// existing sweep for batches (deleteCompletedBatches(), the operator-triggered
// DELETE /api/v1/batches/delete-completed route) is scoped to `status = 'completed'`
// with no age filter and must be called manually, and files' own `expires_at` was
// never enforced by anything. Observed live: batch_item_checkpoints had grown to
// 182K rows / 5.25 GB and files to 1,874 rows / 5.19 GB, with nothing ever pruning
// either automatically.
//
// This pins deleteTerminalBatchesOlderThan() (batches.ts) and pruneExpiredFiles()
// (files.ts) directly -- the same way db-backup-retention-shared.test.ts pins the
// shared retention helper core.ts's health-check path now calls -- plus the
// cleanup.ts wrappers that wire them into the automatic sweep.

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-terminal-cleanup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createFile, getFileContent, pruneExpiredFiles } = await import(
  "../../src/lib/db/files.ts"
);
const { createBatch, getBatch, deleteTerminalBatchesOlderThan } = await import(
  "../../src/lib/db/batches.ts"
);
const { cleanupOldBatches, cleanupExpiredFiles } = await import("../../src/lib/db/cleanup.ts");

const DAY = 24 * 60 * 60;

function backdateBatch(batchId: string, column: string, epochSeconds: number, status: string) {
  core.getDbInstance().prepare(`UPDATE batches SET ${column} = ?, status = ? WHERE id = ?`).run(
    epochSeconds,
    status,
    batchId
  );
}

function seedBatchWithCheckpoint(overrides: { column: string; ageDays: number; status: string }) {
  const inputFile = createFile({
    bytes: 4,
    filename: "in.jsonl",
    purpose: "batch",
    content: Buffer.from("{}"),
  });
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: inputFile.id,
    status: "validating",
  });
  const cutoffSeconds = Math.floor(Date.now() / 1000) - overrides.ageDays * DAY;
  backdateBatch(batch.id, overrides.column, cutoffSeconds, overrides.status);
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO batch_item_checkpoints (batch_id, line_number, status, created_at, updated_at)
       VALUES (?, 0, 'completed', ?, ?)`
    )
    .run(batch.id, cutoffSeconds, cutoffSeconds);
  return { batch, inputFile };
}

describe("deleteTerminalBatchesOlderThan", () => {
  beforeEach(() => {
    core.getDbInstance().exec("DELETE FROM batches; DELETE FROM batch_item_checkpoints;");
  });

  it("deletes a completed batch older than the retention window, and its checkpoint", () => {
    const { batch } = seedBatchWithCheckpoint({ column: "completed_at", ageDays: 40, status: "completed" });

    const result = deleteTerminalBatchesOlderThan(30);

    assert.equal(result.deletedBatches, 1);
    assert.equal(getBatch(batch.id), null);
    const remainingCheckpoints = core
      .getDbInstance()
      .prepare("SELECT COUNT(*) AS n FROM batch_item_checkpoints WHERE batch_id = ?")
      .get(batch.id) as { n: number };
    assert.equal(remainingCheckpoints.n, 0);
  });

  it("leaves a completed batch newer than the retention window untouched", () => {
    const { batch } = seedBatchWithCheckpoint({ column: "completed_at", ageDays: 5, status: "completed" });

    const result = deleteTerminalBatchesOlderThan(30);

    assert.equal(result.deletedBatches, 0);
    assert.ok(getBatch(batch.id), "batch newer than the retention window must survive");
  });

  it("also covers failed, cancelled, and expired batches -- not just completed", () => {
    seedBatchWithCheckpoint({ column: "failed_at", ageDays: 40, status: "failed" });
    seedBatchWithCheckpoint({ column: "cancelled_at", ageDays: 40, status: "cancelled" });
    seedBatchWithCheckpoint({ column: "expired_at", ageDays: 40, status: "expired" });

    const result = deleteTerminalBatchesOlderThan(30);

    assert.equal(
      result.deletedBatches,
      3,
      "deleteCompletedBatches() only ever covered 'completed'; the automatic sweep must cover every terminal status"
    );
  });

  it("never touches a batch that is still in progress, regardless of age", () => {
    const { batch } = seedBatchWithCheckpoint({ column: "created_at", ageDays: 90, status: "in_progress" });

    const result = deleteTerminalBatchesOlderThan(30);

    assert.equal(result.deletedBatches, 0);
    assert.ok(getBatch(batch.id), "a non-terminal batch must never be swept, no matter how old");
  });

  it("cleanupOldBatches() wraps the same behavior with the OMNIROUTE_BATCH_RETENTION_DAYS default", async () => {
    seedBatchWithCheckpoint({ column: "completed_at", ageDays: 40, status: "completed" });

    const result = await cleanupOldBatches();

    assert.equal(result.deleted, 1);
    assert.equal(result.errors, 0);
  });
});

describe("pruneExpiredFiles", () => {
  it("clears content for a file past its own expires_at, keeping the row", () => {
    const now = Math.floor(Date.now() / 1000);
    const file = createFile({
      bytes: 4,
      filename: "expired.jsonl",
      purpose: "batch",
      content: Buffer.from("data"),
      expiresAt: now - DAY,
    });

    const deleted = pruneExpiredFiles(now);

    assert.equal(deleted, 1);
    // The row survives (metadata/audit trail) -- only the BLOB is what was
    // actually consuming the 5.19 GB observed live.
    const row = core
      .getDbInstance()
      .prepare("SELECT deleted_at, content FROM files WHERE id = ?")
      .get(file.id) as { deleted_at: number | null; content: Buffer | null };
    assert.ok(row.deleted_at, "deleted_at must be set");
    assert.equal(row.content, null, "content BLOB must be cleared");
  });

  it("leaves a file with no expiry, or one not yet expired, untouched", () => {
    const now = Math.floor(Date.now() / 1000);
    const neverExpires = createFile({
      // "batch" auto-assigns a 30-day expires_at (see createFile()) -- a
      // different purpose is needed here to get a genuinely null expiry.
      bytes: 4,
      filename: "no-expiry.jsonl",
      purpose: "assistants",
      content: Buffer.from("data"),
    });
    const notYetExpired = createFile({
      bytes: 4,
      filename: "future.jsonl",
      purpose: "batch",
      content: Buffer.from("data"),
      expiresAt: now + DAY,
    });

    const deleted = pruneExpiredFiles(now);

    assert.equal(deleted, 0);
    assert.ok(getFileContent(neverExpires.id), "a file with no expiry must keep its content");
    assert.ok(getFileContent(notYetExpired.id), "a not-yet-expired file must keep its content");
  });

  it("never re-processes a file that was already explicitly deleted", () => {
    const now = Math.floor(Date.now() / 1000);
    const file = createFile({
      bytes: 4,
      filename: "already-deleted.jsonl",
      purpose: "batch",
      content: Buffer.from("data"),
      expiresAt: now - DAY,
    });
    core
      .getDbInstance()
      .prepare("UPDATE files SET deleted_at = ?, content = NULL WHERE id = ?")
      .run(now - 100, file.id);

    const deleted = pruneExpiredFiles(now);

    assert.equal(deleted, 0, "an already-deleted row must not be counted again");
  });

  it("cleanupExpiredFiles() wraps the same behavior for the automatic sweep", async () => {
    const now = Math.floor(Date.now() / 1000);
    createFile({
      bytes: 4,
      filename: "expired-2.jsonl",
      purpose: "batch",
      content: Buffer.from("data"),
      expiresAt: now - DAY,
    });

    const result = await cleanupExpiredFiles();

    assert.equal(result.deleted, 1);
    assert.equal(result.errors, 0);
  });
});
