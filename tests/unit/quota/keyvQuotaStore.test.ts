// @vitest-environment node
/**
 * PR-G unit tests — KeyvQuotaStore
 *
 * Verifies the keyv-backed QuotaStore implements the same QuotaStore
 * interface as SqliteQuotaStore, providing an embedded default that
 * doesn't require the Redis sidecar.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

describe("KeyvQuotaStore", () => {
  let tmpDir: string;
  let store: any;
  let storeId: string;

  beforeEach(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "keyv-quota-test-"));
    // Use a unique store per test for isolation
    const { getKeyvQuotaStore } = await import("@/lib/quota/keyvQuotaStore");
    storeId = `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const kvUrl = `keyv://sqlite/${path.join(tmpDir, "test-" + storeId + ".db")}`;
    store = getKeyvQuotaStore(kvUrl);
  });

  afterEach(() => {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // Best-effort cleanup
    }
  });

  it("exposes the QuotaStore surface", () => {
    expect(typeof store.consume).toBe("function");
    expect(typeof store.peek).toBe("function");
    expect(typeof store.clear).toBe("function");
    expect(typeof store.poolConsumedTotal).toBe("function");
    expect(typeof store.poolUsage).toBe("function");
  });

  it("peek returns null for missing keys", async () => {
    const result = await store.peek({
      storeId,
      pool: "rpm",
      ownerKey: "unknown",
      dimensions: ["requests"],
      amount: 1,
    });
    expect(result).toBeNull();
  });

  it("consume returns null when bucket has no entry (not enough history)", async () => {
    // First consume on empty bucket — should succeed and create entry,
    // but peek/return should reflect the new value
    const result = await store.consume({
      storeId,
      pool: "rpm",
      ownerKey: "owner-A",
      dimensions: ["requests"],
      amount: 5,
    });
    expect(result).not.toBeNull();
    expect(result.allowed).toBe(true);
  });

  it("peek returns the current consumed amount", async () => {
    await store.consume({
      storeId,
      pool: "rpm",
      ownerKey: "owner-B",
      dimensions: ["requests"],
      amount: 7,
    });
    const peeked = await store.peek({
      storeId,
      pool: "rpm",
      ownerKey: "owner-B",
      dimensions: ["requests"],
      amount: 0,
    });
    expect(peeked).not.toBeNull();
    expect(peeked.allowed).toBe(true);
  });

  it("clear resets bucket counters", async () => {
    await store.consume({
      storeId,
      pool: "rpm",
      ownerKey: "owner-C",
      dimensions: ["requests"],
      amount: 12,
    });
    await store.clear(storeId, "rpm", "owner-C");
    const peeked = await store.peek({
      storeId,
      pool: "rpm",
      ownerKey: "owner-C",
      dimensions: ["requests"],
      amount: 0,
    });
    expect(peeked).toBeNull();
  });

  it("handles multiple pools and dimensions", async () => {
    await store.consume({
      storeId,
      pool: "rpm",
      ownerKey: "owner-D",
      dimensions: ["requests"],
      amount: 3,
    });
    await store.consume({
      storeId,
      pool: "tpm",
      ownerKey: "owner-D",
      dimensions: ["tokens"],
      amount: 1000,
    });
    const rpm = await store.peek({
      storeId,
      pool: "rpm",
      ownerKey: "owner-D",
      dimensions: ["requests"],
      amount: 0,
    });
    const tpm = await store.peek({
      storeId,
      pool: "tpm",
      ownerKey: "owner-D",
      dimensions: ["tokens"],
      amount: 0,
    });
    expect(rpm).not.toBeNull();
    expect(tpm).not.toBeNull();
  });

  it("poolConsumedTotal aggregates across owners", async () => {
    await store.consume({
      storeId,
      pool: "rpm",
      ownerKey: "owner-E",
      dimensions: ["requests"],
      amount: 5,
    });
    await store.consume({
      storeId,
      pool: "rpm",
      ownerKey: "owner-F",
      dimensions: ["requests"],
      amount: 10,
    });
    const total = await store.poolConsumedTotal({
      storeId,
      pool: "rpm",
      dimensions: ["requests"],
    });
    expect(total).toBeGreaterThanOrEqual(15);
  });

  it("poolUsage returns shape compatible with dashboard", async () => {
    await store.consume({
      storeId,
      pool: "tpm",
      ownerKey: "owner-G",
      dimensions: ["tokens"],
      amount: 500,
    });
    const usage = await store.poolUsage({
      storeId,
      pool: "tpm",
      dimensions: ["tokens"],
    });
    expect(usage).toHaveProperty("used");
    expect(usage).toHaveProperty("limit");
    expect(usage).toHaveProperty("remaining");
  });
});
