import { describe, it } from "node:test";
import assert from "node:assert";
import {
  createFile,
  createBatch,
  getBatch,
  deleteBatch,
  deleteCompletedBatches,
  getFile,
  deleteFile,
} from "@/lib/localDb";

describe("deleteBatch", () => {
  it("should delete a single batch and its associated files", () => {
    const inputFile = createFile({
      bytes: 10,
      filename: "single-delete-input.jsonl",
      purpose: "batch",
      content: Buffer.from("{}"),
    });

    const batch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: inputFile.id,
      status: "completed",
    });

    assert.ok(getBatch(batch.id));
    assert.ok(getFile(inputFile.id));

    const result = deleteBatch(batch.id);
    assert.strictEqual(result, true);

    assert.strictEqual(getBatch(batch.id), null);
    assert.strictEqual(getFile(inputFile.id), null);
  });

  it("should return false for a non-existent batch id", () => {
    const result = deleteBatch("batch_nonexistent");
    assert.strictEqual(result, false);
  });

  it("should delete a batch with all three file references", () => {
    const inputFile = createFile({
      bytes: 10,
      filename: "delete-all-input.jsonl",
      purpose: "batch",
      content: Buffer.from("input"),
    });
    const outputFile = createFile({
      bytes: 20,
      filename: "delete-all-output.jsonl",
      purpose: "batch",
      content: Buffer.from("output"),
    });
    const errorFile = createFile({
      bytes: 30,
      filename: "delete-all-error.jsonl",
      purpose: "batch",
      content: Buffer.from("error"),
    });

    const batch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: inputFile.id,
      outputFileId: outputFile.id,
      errorFileId: errorFile.id,
      status: "completed",
    });

    assert.ok(getFile(inputFile.id));
    assert.ok(getFile(outputFile.id));
    assert.ok(getFile(errorFile.id));

    const result = deleteBatch(batch.id);
    assert.strictEqual(result, true);

    assert.strictEqual(getBatch(batch.id), null);
    assert.strictEqual(getFile(inputFile.id), null);
    assert.strictEqual(getFile(outputFile.id), null);
    assert.strictEqual(getFile(errorFile.id), null);
  });

  it("should delete a batch whose files were already deleted", () => {
    const f = createFile({
      bytes: 10,
      filename: "already-deleted-input.jsonl",
      purpose: "batch",
      content: Buffer.from("x"),
    });
    const batch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: f.id,
      status: "completed",
    });

    // Delete the file first
    deleteFile(f.id);

    assert.strictEqual(getFile(f.id), null);
    assert.ok(getBatch(batch.id));

    const result = deleteBatch(batch.id);
    assert.strictEqual(result, true);
    assert.strictEqual(getBatch(batch.id), null);
  });

  it("should delete a batch regardless of status", () => {
    for (const status of [
      "validating",
      "in_progress",
      "finalizing",
      "cancelling",
      "failed",
      "cancelled",
      "expired",
    ] as const) {
      const f = createFile({
        bytes: 10,
        filename: `delete-status-${status}.jsonl`,
        purpose: "batch",
        content: Buffer.from("x"),
      });
      const b = createBatch({
        endpoint: "/v1/chat/completions",
        completionWindow: "24h",
        inputFileId: f.id,
        status,
      });
      assert.ok(getBatch(b.id), `batch with status '${status}' should exist`);
      assert.strictEqual(
        deleteBatch(b.id),
        true,
        `deleteBatch for status '${status}' should succeed`
      );
      assert.strictEqual(getBatch(b.id), null, `batch with status '${status}' should be gone`);
      assert.strictEqual(getFile(f.id), null, `file for status '${status}' should be gone`);
    }
  });
});

describe("deleteCompletedBatches", () => {
  it("should delete all completed batches and their associated files", () => {
    // Create 3 completed batches with their own files
    const batchIds: string[] = [];
    const fileIds: string[] = [];

    for (let i = 0; i < 3; i++) {
      const inputFile = createFile({
        bytes: 10,
        filename: `bulk-input-${i}.jsonl`,
        purpose: "batch",
        content: Buffer.from("{}"),
      });
      fileIds.push(inputFile.id);

      const batch = createBatch({
        endpoint: "/v1/chat/completions",
        completionWindow: "24h",
        inputFileId: inputFile.id,
        status: "completed",
      });
      batchIds.push(batch.id);
    }

    // Create a non-completed batch that should survive
    const liveInput = createFile({
      bytes: 10,
      filename: "live-input.jsonl",
      purpose: "batch",
      content: Buffer.from("{}"),
    });
    const liveBatch = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: liveInput.id,
      status: "in_progress",
    });

    // Verify everything exists
    for (const id of batchIds) assert.ok(getBatch(id), `batch ${id} should exist`);
    for (const id of fileIds) assert.ok(getFile(id), `file ${id} should exist`);
    assert.ok(getBatch(liveBatch.id));
    assert.ok(getFile(liveInput.id));

    // Delete all completed (may include pre-existing ones from other tests)
    const result = deleteCompletedBatches();
    assert.ok(result.deletedBatches >= 3, `expected >=3, got ${result.deletedBatches}`);
    assert.ok(result.deletedFiles >= 3, `expected >=3, got ${result.deletedFiles}`);

    // Verify completed batches and their files are gone
    for (const id of batchIds) assert.strictEqual(getBatch(id), null);
    for (const id of fileIds) assert.strictEqual(getFile(id), null);

    // Verify non-completed batch and its file survive
    assert.ok(getBatch(liveBatch.id), "non-completed batch should survive");
    assert.ok(getFile(liveInput.id), "non-completed batch's file should survive");
  });

  it("should return zero counts when no completed batches exist", () => {
    const result = deleteCompletedBatches();
    assert.strictEqual(result.deletedBatches, 0);
    assert.strictEqual(result.deletedFiles, 0);
  });

  it("should handle shared file IDs across multiple completed batches", () => {
    const sharedFile = createFile({
      bytes: 10,
      filename: "shared-input.jsonl",
      purpose: "batch",
      content: Buffer.from("shared"),
    });

    const batchA = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: sharedFile.id,
      status: "completed",
    });
    const batchB = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: sharedFile.id,
      status: "completed",
    });

    assert.ok(getBatch(batchA.id));
    assert.ok(getBatch(batchB.id));
    assert.ok(getFile(sharedFile.id));

    const result = deleteCompletedBatches();
    assert.ok(result.deletedBatches >= 2);
    assert.ok(result.deletedFiles >= 1, "shared file should be counted once");

    assert.strictEqual(getBatch(batchA.id), null);
    assert.strictEqual(getBatch(batchB.id), null);
    assert.strictEqual(getFile(sharedFile.id), null);
  });
});
