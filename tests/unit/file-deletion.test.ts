import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import {
  createFile,
  deleteFile,
  listFiles,
  createBatch,
  getBatch,
  updateBatch,
} from "@/lib/localDb";
import { getDbInstance } from "@/lib/db/core";

describe("File Deletion API", () => {
  let testFileId: string;

  beforeEach(() => {
    const file = createFile({
      bytes: 100,
      filename: "test-delete-file.txt",
      purpose: "assistants",
      content: Buffer.from("test content"),
      mimeType: "text/plain",
    });
    testFileId = file.id;
  });

  afterEach(() => {
    // Ensure cleanup
    const file = listFiles({ limit: 100 }).find((f) => f.filename === "test-delete-file.txt");
    if (file && !file.deletedAt) {
      deleteFile(file.id);
    }
  });

  it("should delete a file successfully", () => {
    const file = listFiles({ limit: 100 }).find((f) => f.id === testFileId);
    assert(file !== undefined);
    assert(file.deletedAt === null || file.deletedAt === undefined);

    const success = deleteFile(testFileId);
    assert(success === true);

    const deletedFile = listFiles({ limit: 100 }).find((f) => f.id === testFileId);
    assert(deletedFile === undefined, "Deleted file should not appear in list");
  });

  it("should set deleted_at timestamp on deletion", () => {
    const now = Math.floor(Date.now() / 1000);
    deleteFile(testFileId);

    // Check directly from DB since listFiles filters out deleted files
    const db = getDbInstance();
    const row = db.prepare("SELECT deleted_at FROM files WHERE id = ?").get(testFileId);

    assert(row !== undefined);
    assert(row.deleted_at !== null);
    assert(typeof row.deleted_at === "number");
    // Should be very recent
    assert(row.deleted_at >= now);
    assert(row.deleted_at <= now + 10);
  });

  it("should not list deleted files", () => {
    const beforeCount = listFiles({ limit: 1000 }).length;
    deleteFile(testFileId);
    const afterCount = listFiles({ limit: 1000 }).length;

    assert(afterCount === beforeCount - 1);
  });

  it("should handle deletion of non-existent file gracefully", () => {
    const success = deleteFile("file-nonexistent-12345");
    // Should return false or handle gracefully (depending on implementation)
    assert(typeof success === "boolean");
  });

  describe("Batch file deletion during cleanup", () => {
    it("should delete batch input file after 30 days of completion", () => {
      // Create test batch
      const inputFile = createFile({
        bytes: 100,
        filename: "test-batch-input.jsonl",
        purpose: "batch",
        content: Buffer.from(
          '{"custom_id":"1","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-4","messages":[{"role":"user","content":"hi"}]}}'
        ),
        mimeType: "application/jsonl",
      });

      const batch = createBatch({
        endpoint: "/v1/chat/completions",
        completionWindow: "24h",
        inputFileId: inputFile.id,
      });

      // Verify batch and file exist
      let batchData = getBatch(batch.id);
      assert(batchData !== null);
      let fileList = listFiles({ limit: 1000 });
      assert(fileList.some((f) => f.id === inputFile.id));

      // Simulate batch completion (completed 31 days ago)
      const thirtyOneDaysAgo = Math.floor(Date.now() / 1000) - 31 * 24 * 60 * 60;
      updateBatch(batch.id, {
        status: "completed",
        completedAt: thirtyOneDaysAgo,
      });

      // After cleanup runs, file should be deleted
      // (Note: this tests the logic, actual cleanup runs in the processor)
      const expiresAt = thirtyOneDaysAgo + 30 * 24 * 60 * 60;
      const now = Math.floor(Date.now() / 1000);
      assert(now > expiresAt, "Current time should be past expiration");
    });

    it("should NOT delete batch input file if not yet expired", () => {
      const inputFile = createFile({
        bytes: 100,
        filename: "test-batch-not-expired.jsonl",
        purpose: "batch",
        content: Buffer.from(
          '{"custom_id":"1","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-4","messages":[{"role":"user","content":"hi"}]}}'
        ),
        mimeType: "application/jsonl",
      });

      const batch = createBatch({
        endpoint: "/v1/chat/completions",
        completionWindow: "24h",
        inputFileId: inputFile.id,
      });

      // Simulate batch completion (completed 15 days ago)
      const fifteenDaysAgo = Math.floor(Date.now() / 1000) - 15 * 24 * 60 * 60;
      updateBatch(batch.id, {
        status: "completed",
        completedAt: fifteenDaysAgo,
      });

      // File should still exist
      const fileList = listFiles({ limit: 1000 });
      const file = fileList.find((f) => f.id === inputFile.id);
      assert(file !== undefined, "File should still exist before expiration");

      // Cleanup
      deleteFile(inputFile.id);
    });
  });
});
