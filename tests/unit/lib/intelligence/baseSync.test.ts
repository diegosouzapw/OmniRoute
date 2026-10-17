/**
 * Unit tests for BaseSync circuit breaker
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-basesync-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const { BaseSync, deleteKv } = await import("../../../../src/lib/intelligence/baseSync.ts");

function resetStorage(): void {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  } catch {
    /* EBUSY */
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

describe("BaseSync - initialization", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("validates backoffMs throws on invalid", () => {
    assert.throws(() => new BaseSync({ source: "test", namespace: "ns", backoffMs: 0 }), /Invalid backoffMs/);
    assert.throws(() => new BaseSync({ source: "test", namespace: "ns", backoffMs: -1 }), /Invalid backoffMs/);
    assert.throws(() => new BaseSync({ source: "test", namespace: "ns", backoffMs: NaN as any }), /Invalid backoffMs/);
  });

  it("starts in closed state", () => {
    const sync = new BaseSync({ source: "test", namespace: "ns", backoffMs: 1000 });
    assert.strictEqual(sync.canAttempt(), true);
  });

  it("backoffMs validation throws for zero/negative", () => {
    assert.throws(() => new BaseSync({ source: "t", namespace: "n", backoffMs: 0 }));
    assert.throws(() => new BaseSync({ source: "t", namespace: "n", backoffMs: -10 }));
  });
});

describe("BaseSync - circuit breaker transitions", () => {
  beforeEach(() => {
    resetStorage();
    deleteKv("ns", "circuit");
  });

  it("closed -> open after failure threshold", () => {
    const sync = new BaseSync({ source: "test", namespace: "ns", backoffMs: 1000, failureThreshold: 3 });
    assert.strictEqual(sync.canAttempt(), true);
    sync.recordFailure(new Error("fail1"));
    assert.strictEqual(sync.canAttempt(), true);
    sync.recordFailure(new Error("fail2"));
    assert.strictEqual(sync.canAttempt(), true);
    sync.recordFailure(new Error("fail3"));
    assert.strictEqual(sync.canAttempt(), false);
  });

  it("open -> half-open after reset timeout", () => {
    const sync = new BaseSync({
      source: "test",
      namespace: "ns",
      backoffMs: 1000,
      failureThreshold: 1,
      resetTimeoutMs: 10, // short timeout
    });
    sync.recordFailure(new Error("fail"));
    assert.strictEqual(sync.canAttempt(), false);
    // wait a bit
    return new Promise((resolve) => {
      setTimeout(() => {
        assert.strictEqual(sync.canAttempt(), true); // becomes half-open and allows attempt
        resolve(undefined);
      }, 20);
    });
  });

  it("half-open -> closed after success threshold", () => {
    const sync = new BaseSync({
      source: "test",
      namespace: "ns",
      backoffMs: 1000,
      failureThreshold: 1,
      successThreshold: 2,
      resetTimeoutMs: 1,
    });
    sync.recordFailure(new Error("fail"));
    assert.strictEqual(sync.canAttempt(), false);
    return new Promise((resolve) => {
      setTimeout(() => {
        assert.strictEqual(sync.canAttempt(), true);
        sync.recordSuccess();
        sync.recordSuccess();
        assert.strictEqual(sync.canAttempt(), true); // closed now
        resolve(undefined);
      }, 5);
    });
  });

  it("half-open -> open on failure", () => {
    const sync = new BaseSync({
      source: "test",
      namespace: "ns",
      backoffMs: 1000,
      failureThreshold: 1,
      // 100ms (not 1ms): open() performs a synchronous KV write after setting
      // openedAt, so a 1ms threshold races the write latency and flakes.
      // 300ms wait keeps both assertions deterministic.
      resetTimeoutMs: 100,
    });
    sync.recordFailure(new Error("fail"));
    return new Promise((resolve) => {
      setTimeout(() => {
        assert.strictEqual(sync.canAttempt(), true); // half-open
        sync.recordFailure(new Error("fail again"));
        assert.strictEqual(sync.canAttempt(), false); // back to open
        resolve(undefined);
      }, 300);
    });
  });

  it("restart hydration via KV pre-seed", () => {
    const sync1 = new BaseSync({ source: "test", namespace: "ns2", backoffMs: 1000, failureThreshold: 1 });
    sync1.recordFailure(new Error("fail"));
    assert.strictEqual(sync1.canAttempt(), false);
    // new instance should hydrate state from KV
    const sync2 = new BaseSync({ source: "test", namespace: "ns2", backoffMs: 1000, failureThreshold: 1 });
    assert.strictEqual(sync2.canAttempt(), false);
  });

  it("deleteKv single call", () => {
    deleteKv("ns3", "circuit"); // should not throw
    deleteKv("ns3", "nonexist"); // should not throw
  });

  it("backoffMs validation throws", () => {
    assert.throws(() => new BaseSync({ source: "t", namespace: "n", backoffMs: 0 }));
    assert.throws(() => new BaseSync({ source: "t", namespace: "n", backoffMs: -5 }));
    assert.throws(() => new BaseSync({ source: "t", namespace: "n", backoffMs: Infinity as any }));
  });
});
