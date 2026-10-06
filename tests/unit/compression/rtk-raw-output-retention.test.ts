import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  maybePersistRtkRawOutput,
  purgeRtkRawOutput,
  readRtkRawOutput,
  resetRtkRawOutputPurgeThrottle,
} from "../../../open-sse/services/compression/engines/rtk/rawOutput.ts";

const originalDataDir = process.env.DATA_DIR;

afterEach(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  resetRtkRawOutputPurgeThrottle();
});

function freshDataDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-store-"));
  process.env.DATA_DIR = dir;
  return dir;
}

function storeRoot(dataDir: string): string {
  return path.join(dataDir, "rtk", "raw-output");
}

/** Write a raw-output file in the bucketized layout and return its pointer id. */
function writeBucketFile(
  dataDir: string,
  ts: number,
  command: string,
  idHex: string,
  content: string
): string {
  const bucket = path.join(storeRoot(dataDir), idHex.slice(0, 2));
  fs.mkdirSync(bucket, { recursive: true });
  const slug = command.replace(/[^A-Za-z0-9_-]+/g, "_").slice(0, 48);
  fs.writeFileSync(path.join(bucket, `${ts}-${slug}-${idHex}.log`), content);
  return idHex;
}

describe("RTK raw-output bounded retention (#10659)", () => {
  it("writes new captures into id-prefix buckets and reads them back", () => {
    const dataDir = freshDataDir();
    const text = "error: boom\nnoise\n".repeat(8);
    const pointer = maybePersistRtkRawOutput(text, { retention: "always" });
    assert.ok(pointer, "pointer should be produced with retention=always");
    // Bucketed layout: pointer.path sits one level below the store root.
    assert.equal(path.dirname(pointer!.path), path.join(storeRoot(dataDir), pointer!.id.slice(0, 2)));
    assert.ok(fs.existsSync(pointer!.path), "bucket file exists on disk");
    assert.equal(readRtkRawOutput(pointer!.id), text, "read resolves via bucket lookup");
  });

  it("still reads legacy flat-store files (backward compatibility)", () => {
    const dataDir = freshDataDir();
    const store = storeRoot(dataDir);
    fs.mkdirSync(store, { recursive: true });
    const id = "ab".padEnd(24, "0");
    fs.writeFileSync(path.join(store, `1710000000000-tool-output-${id}.log`), "legacy content");
    assert.equal(readRtkRawOutput(id), "legacy content");
  });

  it("returns null for unknown pointer ids", () => {
    freshDataDir();
    assert.equal(readRtkRawOutput("ffffffffffffffffffffffff"), null);
  });

  it("purge deletes files older than maxAgeDays and keeps recent ones", async () => {
    const dataDir = freshDataDir();
    const now = Date.now();
    const oldId = writeBucketFile(dataDir, now - 40 * 86_400_000, "old", "aa".padEnd(24, "0"), "old");
    writeBucketFile(dataDir, now - 40 * 86_400_000, "old2", "ab".padEnd(24, "0"), "old2");
    const recentId = writeBucketFile(dataDir, now - 1000, "recent", "ac".padEnd(24, "0"), "recent");

    const result = await purgeRtkRawOutput({ maxAgeDays: 30, maxFiles: 100_000 });
    assert.equal(result.skipped, false);
    assert.equal(result.deleted, 2);
    assert.equal(readRtkRawOutput(oldId), null, "aged-out file purged");
    assert.equal(readRtkRawOutput(recentId), "recent", "recent file kept");
  });

  it("purge caps the store at maxFiles, keeping the newest", async () => {
    const dataDir = freshDataDir();
    const now = Date.now();
    const ids: string[] = [];
    for (let i = 0; i < 8; i++) {
      const id = `b${i}`.padEnd(24, "b").slice(0, 24);
      writeBucketFile(dataDir, now - i * 1000, `cmd${i}`, id, `content${i}`);
      ids.push(id);
    }
    const result = await purgeRtkRawOutput({ maxAgeDays: 30, maxFiles: 5 });
    assert.equal(result.deleted, 3);
    // Newest 5 (i=0..4) survive; oldest 3 (i=5..7) are purged.
    assert.equal(readRtkRawOutput(ids[0]), "content0");
    assert.equal(readRtkRawOutput(ids[4]), "content4");
    assert.equal(readRtkRawOutput(ids[5]), null);
    assert.equal(readRtkRawOutput(ids[7]), null);
  });

  it("retention=never writes nothing to disk", () => {
    const dataDir = freshDataDir();
    const pointer = maybePersistRtkRawOutput("some output", { retention: "never" });
    assert.equal(pointer, null);
    assert.equal(fs.existsSync(storeRoot(dataDir)), false);
  });
});
