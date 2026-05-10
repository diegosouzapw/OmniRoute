import { describe, it, before, afterEach } from "node:test";
import assert from "node:assert";
import { createFile, getFile, listFiles, deleteFile } from "@/lib/localDb";
import { getDbInstance } from "@/lib/db/core.ts";

describe("File Expiration Policy", () => {
  let db: any;

  before(() => {
    db = getDbInstance();
  });

  afterEach(() => {
    // Clean up test files
    const allFiles = listFiles({ limit: 1000 });
    for (const f of allFiles) {
      if (f.filename?.includes("test-")) {
        deleteFile(f.id);
      }
    }
  });

  describe("Batch files (purpose=batch)", () => {
    it("should auto-set expires_at to 30 days from creation", () => {
      const now = Math.floor(Date.now() / 1000);
      const file = createFile({
        bytes: 100,
        filename: "test-batch-file.jsonl",
        purpose: "batch",
        content: Buffer.from("test content"),
        mimeType: "application/jsonl",
      });

      assert(file.expiresAt !== null && file.expiresAt !== undefined);
      const thirtyDays = 30 * 24 * 60 * 60;
      const expectedExpiry = now + thirtyDays;
      // Allow 5 second tolerance for test execution time
      assert(Math.abs(file.expiresAt - expectedExpiry) <= 5);
    });

    it("should create batch file with expires_at set", () => {
      const file = createFile({
        bytes: 200,
        filename: "test-batch-input.jsonl",
        purpose: "batch",
        content: Buffer.from("line1\nline2\nline3"),
        mimeType: "application/jsonl",
      });

      const retrieved = getFile(file.id);
      assert(retrieved !== null);
      assert(retrieved.expiresAt !== null);
      assert(retrieved.expiresAt > Math.floor(Date.now() / 1000));
    });

    it("should list files with expires_at field", () => {
      createFile({
        bytes: 100,
        filename: "test-batch-list.jsonl",
        purpose: "batch",
        content: Buffer.from("test"),
        mimeType: "application/jsonl",
      });

      const files = listFiles({ limit: 10 });
      const batchFile = files.find((f) => f.filename === "test-batch-list.jsonl");
      assert(batchFile !== undefined);
      assert(batchFile.expiresAt !== undefined);
      assert(typeof batchFile.expiresAt === "number" || batchFile.expiresAt === null);
    });
  });

  describe("Non-batch files", () => {
    it("should not set expires_at for non-batch files by default", () => {
      const file = createFile({
        bytes: 100,
        filename: "test-fine-tune.jsonl",
        purpose: "fine-tune",
        content: Buffer.from("test content"),
        mimeType: "application/jsonl",
      });

      assert(file.expiresAt === null || file.expiresAt === undefined);
    });

    it("should allow custom expires_at for non-batch files", () => {
      const expiresAtTs = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
      const file = createFile({
        bytes: 100,
        filename: "test-custom-expiry.jsonl",
        purpose: "assistants",
        content: Buffer.from("test"),
        mimeType: "application/jsonl",
        expiresAt: expiresAtTs,
      });

      assert(file.expiresAt === expiresAtTs);
    });

    it("should persist indefinitely when no expires_at is set", () => {
      const file = createFile({
        bytes: 150,
        filename: "test-persisted.txt",
        purpose: "assistants",
        content: Buffer.from("persistent content"),
        mimeType: "text/plain",
      });

      // Should be retrievable
      const retrieved = getFile(file.id);
      assert(retrieved !== null);
      assert(retrieved.id === file.id);
    });
  });

  describe("File listing with mixed purposes", () => {
    it("should return expires_at for all files", () => {
      const batchFile = createFile({
        bytes: 100,
        filename: "test-mixed-batch.jsonl",
        purpose: "batch",
        content: Buffer.from("batch"),
        mimeType: "application/jsonl",
      });

      const ftFile = createFile({
        bytes: 100,
        filename: "test-mixed-ft.jsonl",
        purpose: "fine-tune",
        content: Buffer.from("ft"),
        mimeType: "application/jsonl",
      });

      const files = listFiles({ limit: 10 });
      const foundBatch = files.find((f) => f.id === batchFile.id);
      const foundFt = files.find((f) => f.id === ftFile.id);

      assert(foundBatch !== undefined);
      assert(foundFt !== undefined);
      // Batch file should have expiration
      assert(foundBatch.expiresAt !== null && foundBatch.expiresAt !== undefined);
      // FT file should not have automatic expiration
      assert(foundFt.expiresAt === null || foundFt.expiresAt === undefined);
    });
  });
});
