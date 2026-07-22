/**
 * Regression test for the disk-snapshot file permissions (release/v3.8.2
 * review finding C2). The snapshot embeds provider topology + connection
 * records and lives alongside auth.json (0o600), so it must NOT be readable by
 * group/other. Before the fix it was written with the default (typically
 * world-readable 0o644) mode.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  defaultDiskSnapshotWriter,
  diskSnapshotPath,
  type OmniRouteFetchCacheEntry,
} from "../src/index.js";

function makeEntry(): Omit<OmniRouteFetchCacheEntry, "expiresAt"> {
  return {
    rawModels: [],
    rawCombos: [],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
  };
}

test("defaultDiskSnapshotWriter writes an owner-only (no group/other) snapshot", async (t) => {
  // POSIX-only assertion; Windows does not honor numeric file modes.
  if (process.platform === "win32") {
    t.skip("file mode semantics are POSIX-only");
    return;
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-disk-perms-"));
  const prevDataDir = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = tmp;

  try {
    await defaultDiskSnapshotWriter("perm-test", makeEntry(), "test-snapshot-identity");

    const file = diskSnapshotPath("perm-test");
    assert.ok(fs.existsSync(file), "snapshot file should be written");

    const fileMode = fs.statSync(file).mode & 0o777;
    assert.equal(
      fileMode & 0o077,
      0,
      `snapshot must not be group/other accessible (got ${fileMode.toString(8)})`
    );

    const dirMode = fs.statSync(path.dirname(file)).mode & 0o777;
    assert.equal(
      dirMode & 0o077,
      0,
      `plugins dir must not be group/other accessible (got ${dirMode.toString(8)})`
    );
  } finally {
    if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = prevDataDir;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
