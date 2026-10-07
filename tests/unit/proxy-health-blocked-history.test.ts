/**
 * Blocked-verdict history (observable, persisted).
 *
 * RED: this suite fails on the tip — nothing persists `blocked` cause plus
 * counts beyond the in-memory sweep tally, so the reload assertions fail.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-blocked-history-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_HEALTH_TEST_STAGGER_MS = "0";
delete process.env.PROXY_AUTO_REMOVE;
delete process.env.PROXY_AUTO_DISABLE;
delete process.env.PROXY_HEALTH_BLOCKED_RESETS_STREAK;

// The probe target: any request is refused, the way a destination refuses an egress IP.
const target = http.createServer((_req, res) => {
  res.writeHead(403);
  res.end();
});
await new Promise<void>((resolve) => target.listen(0, "127.0.0.1", () => resolve()));
const targetPort = (target.address() as net.AddressInfo).port;
process.env.PROXY_HEALTH_TEST_URL = `http://127.0.0.1:${targetPort}/probe`;

const history = await import("../../src/lib/proxyHealth/blockedHistory.ts");
const {
  recordBlockedObservation,
  getBlockedHistory,
  deleteBlockedHistory,
  clearBlockedHistoryForTesting,
  flushBlockedHistory,
} = history;

test.after(async () => {
  await new Promise<void>((resolve) => target.close(() => resolve()));
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persistence: three blocked observations yield count 3 with cause and status", () => {
  clearBlockedHistoryForTesting();
  const at = Date.now();
  recordBlockedObservation("p1", "unproven", 403, at);
  recordBlockedObservation("p1", "unproven", 403, at + 1);
  recordBlockedObservation("p1", "unproven", 403, at + 2);
  const entry = getBlockedHistory("p1");
  assert.equal(entry?.count, 3);
  assert.equal(entry?.lastCause, "unproven");
  assert.equal(entry?.lastStatus, 403);
});

test("reload: history survives a restart (memory dropped, file re-read)", () => {
  clearBlockedHistoryForTesting();
  const at = Date.now();
  recordBlockedObservation("p1", "unproven", 403, at);
  recordBlockedObservation("p1", "unproven", 403, at + 1);
  recordBlockedObservation("p1", "unproven", 403, at + 2);
  // Simulate a restart: drop memory, keep the file, read again.
  clearBlockedHistoryForTesting({ keepFile: true });
  const entry = getBlockedHistory("p1");
  assert.equal(entry?.count, 3);
  assert.equal(entry?.lastCause, "unproven");
  assert.equal(entry?.lastStatus, 403);
});

test("401 without key: recorded as observed with the existing unclassified cause", () => {
  clearBlockedHistoryForTesting();
  recordBlockedObservation("keyless", "unclassified", 401, Date.now());
  const entry = getBlockedHistory("keyless");
  assert.equal(entry?.count, 1);
  assert.equal(entry?.lastCause, "unclassified");
  assert.equal(entry?.lastStatus, 401);
});

test("delete removes one entry; unknown id is a no-op", () => {
  clearBlockedHistoryForTesting();
  recordBlockedObservation("x", "unproven", 403, Date.now());
  deleteBlockedHistory("x");
  assert.equal(getBlockedHistory("x"), undefined);
  deleteBlockedHistory("unknown-id");
  assert.equal(getBlockedHistory("unknown-id"), undefined);
});

test("bound: size stays within the cap and the oldest entry is evicted", () => {
  clearBlockedHistoryForTesting();
  const at = Date.now();
  const cap = history.__blockedHistoryCapForTesting();
  recordBlockedObservation("old", "unproven", 403, at);
  for (let i = 0; i < cap; i++) {
    recordBlockedObservation(`fill-${i}`, "unclassified", 429, at + i + 1);
  }
  assert.ok(history.__blockedHistorySizeForTesting() <= cap);
  assert.equal(getBlockedHistory("old"), undefined);
  assert.notEqual(getBlockedHistory(`fill-${cap - 1}`), undefined);
});

test("one sweep of observations is written once, not once per observation", () => {
  clearBlockedHistoryForTesting();
  const writes: string[] = [];
  const original = fs.renameSync;
  fs.renameSync = ((from: fs.PathLike, to: fs.PathLike) => {
    writes.push(String(to));
    return original(from, to);
  }) as typeof fs.renameSync;
  try {
    const at = Date.now();
    for (let i = 0; i < 20; i++) recordBlockedObservation(`w${i}`, "unproven", 403, at + i);
    assert.equal(writes.length, 0, "no write before the flush");
    flushBlockedHistory();
    assert.equal(writes.length, 1);
  } finally {
    fs.renameSync = original;
  }
});

test("clear isolates suites", () => {
  recordBlockedObservation("z", "unproven", 403, Date.now());
  clearBlockedHistoryForTesting();
  assert.equal(getBlockedHistory("z"), undefined);
});
