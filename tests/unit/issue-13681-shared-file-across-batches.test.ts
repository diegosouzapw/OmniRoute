/**
 * Repro for #13681 — the completed-batch sweep (deleteCompletedBatches /
 * deleteBatch / cleanupExpiredBatches) nulls a file's content whenever ANY
 * completed batch it deletes references that file id, without checking
 * whether another batch — in progress, queued, or completed but outside the
 * current sweep unit — still references the same file. A tenant that reuses
 * one input file across two batches loses that file for the surviving batch.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir before any `@/lib/db/*`
 * module loads.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "issue-13681-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createFile, getFile, getFileContent } = await import("../../src/lib/db/files.ts");
const { createBatch, getBatch, deleteCompletedBatches, deleteBatch } =
  await import("../../src/lib/db/batches.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

describe("#13681 — shared file reference survives a sibling batch's deletion", () => {
  after(() => {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("deleteCompletedBatches must NOT null a file still referenced by a surviving in_progress batch", () => {
    const apiKeyId = "key_shared_13681";
    const sharedFile = createFile({
      bytes: 8,
      filename: "shared-input.jsonl",
      purpose: "batch",
      content: Buffer.from("shared-content"),
      apiKeyId,
    });

    // Batch A: completed, will be swept and deleted.
    const batchA = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: sharedFile.id,
      status: "completed",
      apiKeyId,
    });

    // Batch B: still in progress, reuses the SAME input file id, and is never
    // touched by this sweep call.
    const batchB = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: sharedFile.id,
      status: "in_progress",
      apiKeyId,
    });

    const result = deleteCompletedBatches({ apiKeyId });

    assert.strictEqual(getBatch(batchA.id), null, "the completed batch is swept as expected");
    assert.ok(getBatch(batchB.id), "the in-progress batch must survive the sweep");
    assert.strictEqual(result.deletedBatches, 1, "only the completed batch counted as deleted");

    // Expected/correct behavior: batch B is alive and still points at
    // sharedFile.id, so the sweep must NOT have soft-deleted that file just
    // because batch A (also swept) referenced the same file id.
    assert.ok(getFile(sharedFile.id), "the shared file must survive — batch B still references it");
    assert.notStrictEqual(
      getFileContent(sharedFile.id),
      null,
      "the shared file's content must survive — batch B still references it"
    );
  });

  it("deleteBatch (single) must NOT null a file still referenced by a sibling batch", () => {
    const apiKeyId = "key_shared_single_13681";
    const sharedFile = createFile({
      bytes: 8,
      filename: "shared-input-2.jsonl",
      purpose: "batch",
      content: Buffer.from("shared-content-2"),
      apiKeyId,
    });

    const batchA = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: sharedFile.id,
      status: "completed",
      apiKeyId,
    });
    const batchB = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: sharedFile.id,
      status: "in_progress",
      apiKeyId,
    });

    const deleted = deleteBatch(batchA.id);

    assert.strictEqual(deleted, true, "deleteBatch reports success for batch A");
    assert.ok(getBatch(batchB.id), "batch B is untouched by deleteBatch(batchA.id)");
    assert.notStrictEqual(
      getFileContent(sharedFile.id),
      null,
      "the shared file's content must survive — batch B still references it"
    );
  });

  it("deleteCompletedBatches DOES delete the file once the LAST referencing batch is gone (no regression toward never-delete)", () => {
    const apiKeyId = "key_last_ref_13681";
    const file = createFile({
      bytes: 8,
      filename: "last-ref.jsonl",
      purpose: "batch",
      content: Buffer.from("last-ref-content"),
      apiKeyId,
    });

    const onlyBatch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      status: "completed",
      apiKeyId,
    });

    const result = deleteCompletedBatches({ apiKeyId });

    assert.strictEqual(getBatch(onlyBatch.id), null);
    assert.strictEqual(result.deletedBatches, 1);
    assert.strictEqual(
      result.deletedFiles,
      1,
      "the file had no other referencing batch, so it must be deleted"
    );
    assert.strictEqual(getFile(file.id), null, "the file is gone once nothing else references it");
  });
});
