/**
 * Tests for the disk-snapshot max-age guard (#13390).
 *
 * Before the fix, `defaultDiskSnapshotReader` accepted snapshots of any age.
 * After the fix, snapshots older than DISK_CACHE_MAX_AGE_MS (default 7 days)
 * are rejected so stale catalogs are not served indefinitely.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  defaultDiskSnapshotReader,
  defaultDiskSnapshotWriter,
  diskSnapshotPath,
  type OmniRouteFetchCacheEntry,
} from "../src/index.js";

function makeEntry(): Omit<OmniRouteFetchCacheEntry, "expiresAt"> {
  return {
    rawModels: [{ id: "test-model", raw: {} }],
    rawCombos: [],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
  };
}

function makeSnapshot(writtenAt: number): string {
  return JSON.stringify({
    v: 2,
    identityFingerprint: "test-fingerprint",
    rawModels: [{ id: "test-model", raw: {} }],
    rawCombos: [],
    rawAutoCombos: [],
    rawEnrichment: [],
    rawCompressionCombos: [],
    rawConnections: [],
    writtenAt,
  });
}

test("defaultDiskSnapshotReader returns undefined for snapshots older than max age", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-disk-age-"));
  const prevDataDir = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = tmp;

  try {
    // Write a snapshot with writtenAt 8 days ago
    const oldTime = Date.now() - 8 * 24 * 60 * 60 * 1000;
    const file = diskSnapshotPath("age-test");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, makeSnapshot(oldTime), "utf8");

    const result = await defaultDiskSnapshotReader("age-test", "test-fingerprint");
    assert.equal(result, undefined, "Old snapshot should be rejected");
  } finally {
    if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = prevDataDir;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("defaultDiskSnapshotReader accepts snapshots within max age", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-disk-age-ok-"));
  const prevDataDir = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = tmp;

  try {
    // Write a snapshot with writtenAt 1 day ago
    const recentTime = Date.now() - 1 * 24 * 60 * 60 * 1000;
    const file = diskSnapshotPath("age-ok-test");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, makeSnapshot(recentTime), "utf8");

    const result = await defaultDiskSnapshotReader("age-ok-test", "test-fingerprint");
    assert.ok(result !== undefined, "Recent snapshot should be accepted");
    assert.equal(result!.rawModels.length, 1, "Should have 1 model");
  } finally {
    if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = prevDataDir;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("defaultDiskSnapshotReader accepts snapshots with missing writtenAt (backward compat)", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-disk-age-nodate-"));
  const prevDataDir = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = tmp;

  try {
    // Write a snapshot without writtenAt (backward compat with v2 before #13390)
    const snapshot = {
      v: 2,
      identityFingerprint: "test-fingerprint",
      rawModels: [{ id: "test-model", raw: {} }],
      rawCombos: [],
      rawAutoCombos: [],
      rawEnrichment: [],
      rawCompressionCombos: [],
      rawConnections: [],
      // no writtenAt
    };
    const file = diskSnapshotPath("age-nodate-test");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(snapshot), "utf8");

    const result = await defaultDiskSnapshotReader("age-nodate-test", "test-fingerprint");
    assert.ok(result !== undefined, "Snapshot without writtenAt should still be accepted");
  } finally {
    if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = prevDataDir;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
