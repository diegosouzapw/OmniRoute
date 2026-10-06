import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard: sql.js has no incremental write path, so every save rewrites
// the whole database image. When that write went through
// `fs.writeFileSync(filePath, …)`, the destination was opened with `O_TRUNC` —
// for the whole duration of the write the on-disk database was 0 bytes and then
// partial. Unlike better-sqlite3 / node:sqlite, that window is NOT covered by
// SQLite's locking protocol, so it was visible to every other process reading the
// same file (backup job, metrics exporter, an operator running `sqlite3`). Those
// readers got SQLITE_CORRUPT — "database disk image is malformed" — while
// `PRAGMA integrity_check` passed moments later, which made the failure look
// random and blamed the reader. The window scales with database size and recurs
// on every save.
//
// The fix writes to a temp file in the same directory and `rename()`s it over the
// destination. The property that distinguishes the two implementations, and the
// one asserted below, is inode identity: `rename` publishes a NEW inode, so a
// reader that already opened the file keeps reading a complete, coherent image,
// whereas `writeFileSync` mutates the inode the reader is holding.
//
// This is deliberately not a timing race — a sleep-based test would be flaky and
// would not prove anything about small databases that get written in one go.

async function openAdapter(sqliteFile: string) {
  const { createSqlJsAdapter } = await import("../../src/lib/db/adapters/sqljsAdapter");
  return createSqlJsAdapter(sqliteFile);
}

test(
  "sql.js persist() publishes the database atomically — a reader holding the file " +
    "open never observes a truncated image (rename, not in-place O_TRUNC)",
  async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sqljs-atomic-"));
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    let adapter: Awaited<ReturnType<typeof openAdapter>> | null = null;
    let readerFd: number | null = null;
    try {
      adapter = await openAdapter(sqliteFile);
      adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, v TEXT)");
      adapter.exec("INSERT INTO t (v) VALUES ('first')");
      adapter.checkpoint();

      assert.ok(fs.existsSync(sqliteFile), "first checkpoint should have written the database");
      const firstBytes = fs.readFileSync(sqliteFile);
      const firstInode = fs.statSync(sqliteFile).ino;

      // A concurrent reader that opened the file before the next save. It keeps
      // reading through THIS descriptor, exactly like another process mid-read.
      readerFd = fs.openSync(sqliteFile, "r");

      // Grow the image so the second save is unmistakably a different payload.
      for (let i = 0; i < 200; i++) {
        adapter.exec(`INSERT INTO t (v) VALUES ('row-${i}')`);
      }
      adapter.checkpoint();

      // 1. The reader's descriptor still resolves to a COMPLETE image. Under
      //    writeFileSync it resolves to the same inode that was truncated and
      //    rewritten, so this read returns the new (or a torn) payload.
      const viaReader = Buffer.alloc(firstBytes.length);
      const read = fs.readSync(readerFd, viaReader, 0, firstBytes.length, 0);
      assert.equal(read, firstBytes.length, "the pre-opened descriptor lost bytes mid-write");
      assert.deepEqual(
        viaReader,
        firstBytes,
        "a reader holding the file open observed the image change underneath it — " +
          "persist() replaced the file in place instead of renaming a new one over it"
      );
      assert.equal(
        viaReader.subarray(0, 15).toString("latin1"),
        "SQLite format 3",
        "the pre-opened descriptor no longer sees a valid SQLite header"
      );

      // 2. The published file is the NEW image, on a NEW inode — that is what
      //    makes the swap atomic for everyone who opens it afterwards.
      const secondInode = fs.statSync(sqliteFile).ino;
      assert.notEqual(
        secondInode,
        firstInode,
        "persist() reused the same inode — the write was not published by rename()"
      );
      assert.equal(
        fs.readFileSync(sqliteFile).subarray(0, 15).toString("latin1"),
        "SQLite format 3",
        "the published file is not a valid SQLite image"
      );

      // 3. No temp file survives a successful save.
      const leftovers = fs.readdirSync(dataDir).filter((n) => n.startsWith("storage.sqlite.tmp-"));
      assert.deepEqual(leftovers, [], "persist() left a temporary file behind");
    } finally {
      if (readerFd !== null) fs.closeSync(readerFd);
      if (adapter?.open) adapter.close();
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);

test("sql.js persist() is a no-op for :memory: databases (no temp file, no throw)", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sqljs-atomic-mem-"));
  let adapter: Awaited<ReturnType<typeof openAdapter>> | null = null;
  try {
    adapter = await openAdapter(":memory:");
    adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY)");
    adapter.checkpoint();
    assert.deepEqual(fs.readdirSync(dataDir), [], "an in-memory database wrote to disk");
  } finally {
    if (adapter?.open) adapter.close();
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
