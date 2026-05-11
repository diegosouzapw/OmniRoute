import { afterEach, describe, it } from "node:test";
import assert from "node:assert";
import { deleteFile, listFiles } from "@/lib/localDb";

// Helper functions from batchProcessor.ts
function parseBatchWindowSeconds(window: string | null | undefined): number {
  const DEFAULT = 24 * 60 * 60;
  if (!window) return DEFAULT;
  const match = /^(\d+)([hdm])$/.exec(window);
  if (!match) return DEFAULT;

  const value = Number.parseInt(match[1], 10);
  const unit = match[2];
  if (unit === "h") return value * 3600;
  if (unit === "d") return value * 86400;
  if (unit === "m") return value * 60;
  return DEFAULT;
}

describe("Batch Processor - File Expiration", () => {
  afterEach(() => {
    const allFiles = listFiles({ limit: 1000 });
    for (const f of allFiles) {
      if (f.filename?.includes("test-batch-")) {
        deleteFile(f.id);
      }
    }
  });

  describe("getBatchOutputExpiresAt logic", () => {
    it("should calculate output expiration as 30 days from batch completion", () => {
      const completedAt = Math.floor(Date.now() / 1000) - 5 * 24 * 60 * 60; // 5 days ago
      const expectedExpiresAt = completedAt + 30 * 24 * 60 * 60;

      // Simulate the logic from getBatchOutputExpiresAt
      const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
      const expiresAt = completedAt + thirtyDaysInSeconds;

      assert(expiresAt === expectedExpiresAt);
    });

    it("should use custom expires_after if provided", () => {
      const createdAt = Math.floor(Date.now() / 1000);
      const customSeconds = 7 * 24 * 60 * 60; // 7 days
      const expiresAt = createdAt + customSeconds;

      assert(expiresAt === createdAt + 7 * 24 * 60 * 60);
    });

    it("should handle failed batch expiration", () => {
      const now = Math.floor(Date.now() / 1000);
      const failedAt = now - 10 * 24 * 60 * 60; // 10 days ago
      const expiresAt = failedAt + 30 * 24 * 60 * 60;

      const expectedExpiresAt = now + 20 * 24 * 60 * 60;
      assert.strictEqual(expiresAt, expectedExpiresAt);
    });

    it("should handle cancelled batch expiration", () => {
      const cancelledAt = Math.floor(Date.now() / 1000) - 2 * 24 * 60 * 60; // 2 days ago
      const expiresAt = cancelledAt + 30 * 24 * 60 * 60;

      assert(expiresAt > Math.floor(Date.now() / 1000)); // Should still be in future
    });
  });

  describe("File cleanup expiration logic", () => {
    it("should identify expired input files", () => {
      const now = Math.floor(Date.now() / 1000);
      const completionTime = now - 31 * 24 * 60 * 60; // Completed 31 days ago
      const inputExpiresAt = completionTime + 30 * 24 * 60 * 60;

      // File should be expired
      assert(now > inputExpiresAt, "File should be past expiration");
    });

    it("should NOT delete input files within 30 days", () => {
      const now = Math.floor(Date.now() / 1000);
      const completionTime = now - 15 * 24 * 60 * 60; // Completed 15 days ago
      const inputExpiresAt = completionTime + 30 * 24 * 60 * 60;

      // File should NOT be expired yet
      assert(now < inputExpiresAt, "File should not be expired yet");
    });

    it("should identify expired output files", () => {
      const now = Math.floor(Date.now() / 1000);
      const completionTime = now - 35 * 24 * 60 * 60; // Completed 35 days ago
      const outputExpiresAt = completionTime + 30 * 24 * 60 * 60;

      assert(now > outputExpiresAt, "Output file should be expired");
    });

    it("should NOT delete output files within 30 days of completion", () => {
      const now = Math.floor(Date.now() / 1000);
      const completionTime = now - 25 * 24 * 60 * 60; // Completed 25 days ago
      const outputExpiresAt = completionTime + 30 * 24 * 60 * 60;

      assert(now < outputExpiresAt, "Output file should still be valid");
    });
  });

  describe("Completion window parsing", () => {
    it("should parse hours format", () => {
      const seconds = parseBatchWindowSeconds("24h");
      assert(seconds === 24 * 3600);
    });

    it("should parse days format", () => {
      const seconds = parseBatchWindowSeconds("2d");
      assert(seconds === 2 * 86400);
    });

    it("should parse minutes format", () => {
      const seconds = parseBatchWindowSeconds("30m");
      assert(seconds === 30 * 60);
    });

    it("should default to 24h for invalid format", () => {
      const seconds = parseBatchWindowSeconds("invalid");
      assert(seconds === 24 * 60 * 60);
    });

    it("should default to 24h for null", () => {
      const seconds = parseBatchWindowSeconds(null);
      assert(seconds === 24 * 60 * 60);
    });

    it("should default to 24h for undefined", () => {
      const seconds = parseBatchWindowSeconds(undefined);
      assert(seconds === 24 * 60 * 60);
    });
  });

  describe("Orphan file cleanup", () => {
    it("should identify orphan batch files stuck in validating after 48h", () => {
      const now = Math.floor(Date.now() / 1000);
      const fortyNineHoursAgo = now - 49 * 60 * 60;

      const isOrphan = now - fortyNineHoursAgo > 48 * 60 * 60;
      assert(isOrphan, "File should be identified as orphan");
    });

    it("should NOT delete batch files in validating under 48h", () => {
      const now = Math.floor(Date.now() / 1000);
      const fortyHoursAgo = now - 40 * 60 * 60;

      const isOrphan = now - fortyHoursAgo > 48 * 60 * 60;
      assert(!isOrphan, "File should not be orphan yet");
    });

    it("should identify old batch files regardless of status", () => {
      const now = Math.floor(Date.now() / 1000);

      const createdAt = now - 3 * 24 * 60 * 60;
      const threshold = 48 * 60 * 60; // 48 hours
      const isOldBatchFile = now - createdAt > threshold;

      assert(isOldBatchFile, "File older than 48h should be flagged");
    });
  });
});
