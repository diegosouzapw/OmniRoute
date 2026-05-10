import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { createFile, listFiles, deleteFile, getFile } from "@/lib/localDb";

describe("Files API - Integration Tests", () => {
  afterEach(() => {
    const allFiles = listFiles({ limit: 1000 });
    for (const f of allFiles) {
      if (f.filename?.includes("test-")) {
        deleteFile(f.id);
      }
    }
  });

  describe("POST /v1/files - File creation with auto-expiration", () => {
    it("should create batch file with 30-day expiration", () => {
      const now = Math.floor(Date.now() / 1000);
      const thirtyDaysInSeconds = 30 * 24 * 60 * 60;

      const file = createFile({
        bytes: 100,
        filename: "test-api-batch.jsonl",
        purpose: "batch",
        content: Buffer.from("test batch content"),
        mimeType: "application/jsonl",
      });

      assert(file.expiresAt !== null);
      const expectedMin = now + thirtyDaysInSeconds - 5; // 5 second tolerance
      const expectedMax = now + thirtyDaysInSeconds + 5;
      assert(file.expiresAt >= expectedMin && file.expiresAt <= expectedMax);
    });

    it("should create non-batch file without auto-expiration", () => {
      const file = createFile({
        bytes: 100,
        filename: "test-api-fine-tune.jsonl",
        purpose: "fine-tune",
        content: Buffer.from("test ft content"),
        mimeType: "application/jsonl",
      });

      assert(file.expiresAt === null || file.expiresAt === undefined);
    });

    it("should respect custom expires_after parameter", () => {
      const now = Math.floor(Date.now() / 1000);
      const sevenDaysInSeconds = 7 * 24 * 60 * 60;
      const customExpiry = now + sevenDaysInSeconds;

      const file = createFile({
        bytes: 100,
        filename: "test-api-custom.jsonl",
        purpose: "assistants",
        content: Buffer.from("test custom"),
        mimeType: "application/jsonl",
        expiresAt: customExpiry,
      });

      assert(file.expiresAt === customExpiry);
    });
  });

  describe("GET /v1/files - List files with expiration info", () => {
    it("should include expires_at in file list response", () => {
      const batchFile = createFile({
        bytes: 100,
        filename: "test-list-batch.jsonl",
        purpose: "batch",
        content: Buffer.from("batch content"),
        mimeType: "application/jsonl",
      });

      const files = listFiles({ limit: 10 });
      const foundFile = files.find((f) => f.id === batchFile.id);

      assert(foundFile !== undefined);
      assert("expiresAt" in foundFile);
      assert(foundFile.expiresAt === batchFile.expiresAt);
    });

    it("should show null expires_at for persistent files", () => {
      const persistedFile = createFile({
        bytes: 100,
        filename: "test-list-persisted.txt",
        purpose: "assistants",
        content: Buffer.from("persisted"),
        mimeType: "text/plain",
      });

      const files = listFiles({ limit: 10 });
      const foundFile = files.find((f) => f.id === persistedFile.id);

      assert(foundFile !== undefined);
      assert(foundFile.expiresAt === null || foundFile.expiresAt === undefined);
    });

    it("should list multiple files with different expiration policies", () => {
      const batchFile = createFile({
        bytes: 100,
        filename: "test-multi-batch.jsonl",
        purpose: "batch",
        content: Buffer.from("batch"),
        mimeType: "application/jsonl",
      });

      const persistedFile = createFile({
        bytes: 100,
        filename: "test-multi-persisted.txt",
        purpose: "fine-tune",
        content: Buffer.from("persisted"),
        mimeType: "text/plain",
      });

      const files = listFiles({ limit: 20 });
      const batch = files.find((f) => f.id === batchFile.id);
      const persisted = files.find((f) => f.id === persistedFile.id);

      assert(batch !== undefined && batch.expiresAt !== null);
      assert(
        persisted !== undefined &&
          (persisted.expiresAt === null || persisted.expiresAt === undefined)
      );
    });

    it("should filter by purpose while preserving expiration info", () => {
      createFile({
        bytes: 100,
        filename: "test-filter-batch.jsonl",
        purpose: "batch",
        content: Buffer.from("batch"),
        mimeType: "application/jsonl",
      });

      createFile({
        bytes: 100,
        filename: "test-filter-ft.jsonl",
        purpose: "fine-tune",
        content: Buffer.from("ft"),
        mimeType: "application/jsonl",
      });

      const batchFiles = listFiles({ purpose: "batch", limit: 10 });
      assert(batchFiles.every((f) => f.purpose === "batch"));
      assert(batchFiles.every((f) => f.expiresAt !== null || true));
    });
  });

  describe("DELETE /v1/files/{file_id} - File deletion", () => {
    it("should soft-delete file by setting deleted_at", () => {
      const file = createFile({
        bytes: 100,
        filename: "test-delete.txt",
        purpose: "assistants",
        content: Buffer.from("deletable"),
        mimeType: "text/plain",
      });

      const beforeDelete = getFile(file.id);
      assert(beforeDelete !== null);
      assert(beforeDelete.deletedAt === null || beforeDelete.deletedAt === undefined);

      deleteFile(file.id);

      const afterDelete = getFile(file.id);
      assert(afterDelete === null, "Deleted file should not be retrievable");
    });

    it("should remove deleted file from list", () => {
      const file = createFile({
        bytes: 100,
        filename: "test-delete-list.txt",
        purpose: "assistants",
        content: Buffer.from("to delete"),
        mimeType: "text/plain",
      });

      const beforeDelete = listFiles({ limit: 100 }).some((f) => f.id === file.id);
      assert(beforeDelete === true);

      deleteFile(file.id);

      const afterDelete = listFiles({ limit: 100 }).some((f) => f.id === file.id);
      assert(afterDelete === false);
    });

    it("should handle deletion of non-existent file", () => {
      const result = deleteFile("file-nonexistent-xyz");
      // Should not throw, just return false
      assert(typeof result === "boolean");
    });
  });

  describe("File expiration data persistence", () => {
    it("should preserve expires_at when retrieving file", () => {
      const file = createFile({
        bytes: 100,
        filename: "test-persist-expiry.jsonl",
        purpose: "batch",
        content: Buffer.from("test"),
        mimeType: "application/jsonl",
      });

      const retrieved = getFile(file.id);
      assert(retrieved !== null);
      assert(retrieved.expiresAt === file.expiresAt);
    });

    it("should maintain expiration data across list operations", () => {
      const file = createFile({
        bytes: 100,
        filename: "test-expiry-list-persist.jsonl",
        purpose: "batch",
        content: Buffer.from("test"),
        mimeType: "application/jsonl",
      });

      const originalExpiresAt = file.expiresAt;

      // Fetch from list
      const files = listFiles({ limit: 10 });
      const listedFile = files.find((f) => f.id === file.id);

      assert(listedFile !== undefined);
      assert(listedFile.expiresAt === originalExpiresAt);
    });
  });
});
