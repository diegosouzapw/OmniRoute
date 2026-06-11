/**
 * tests/unit/db-gamification-federation-3500.test.ts
 *
 * TDD regression for #3500 slice 3: getConnectedServerByKeyHash extracted from
 * gamification federation routes into src/lib/db/gamification.ts.
 *
 * Seeding a temp SQLite DB with community_servers rows, exercising
 * getConnectedServerByKeyHash for hit/miss/status-filter cases.
 *
 * PII-Learnings #3: resetDbInstance() + close handles in test.after to avoid hang.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Set temp DATA_DIR BEFORE importing any db module
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gamif-fed-3500-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const gamifDb = await import("../../src/lib/db/gamification.ts");

// Seed a connected and a disconnected server row for use across assertions.
function seedServers() {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT OR REPLACE INTO community_servers (id, name, url, api_key_hash, status)
     VALUES (?, ?, ?, ?, ?)`
  ).run("srv-connected", "Connected Server", "https://connected.example", "hash-connected", "connected");
  db.prepare(
    `INSERT OR REPLACE INTO community_servers (id, name, url, api_key_hash, status)
     VALUES (?, ?, ?, ?, ?)`
  ).run("srv-disconnected", "Disconnected Server", "https://disconnected.example", "hash-disconnected", "disconnected");
}

test.after(async () => {
  core.resetDbInstance();
  await new Promise<void>((resolve) => {
    // Brief retry loop in case the file is briefly locked
    const tryRm = (attempts: number) => {
      try {
        if (fs.existsSync(TEST_DATA_DIR)) {
          fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
        }
        resolve();
      } catch (err: any) {
        if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempts > 0) {
          setTimeout(() => tryRm(attempts - 1), 50);
        } else {
          resolve(); // best-effort, do not hang
        }
      }
    };
    tryRm(10);
  });
});

test("getConnectedServerByKeyHash returns the id for a connected server", () => {
  seedServers();
  const result = gamifDb.getConnectedServerByKeyHash("hash-connected");
  assert.ok(result, "should find the connected server");
  assert.equal(result.id, "srv-connected");
});

test("getConnectedServerByKeyHash returns undefined for an unknown hash", () => {
  seedServers();
  const result = gamifDb.getConnectedServerByKeyHash("hash-does-not-exist");
  assert.equal(result, undefined, "should return undefined for unknown hash");
});

test("getConnectedServerByKeyHash returns undefined for a disconnected server (status filter)", () => {
  seedServers();
  const result = gamifDb.getConnectedServerByKeyHash("hash-disconnected");
  assert.equal(
    result,
    undefined,
    "should not return a server whose status is not 'connected'"
  );
});
