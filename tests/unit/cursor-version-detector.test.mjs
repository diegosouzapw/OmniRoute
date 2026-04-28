import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const FALLBACK_VERSION = "3.2.14";
const Database = (await import("better-sqlite3")).default;

const { getCursorVersion, resetCursorVersionCache } =
  await import("../../open-sse/utils/cursorVersionDetector.ts");

function createStateDb(dir, version) {
  const dbPath = path.join(dir, "state.vscdb");
  const db = new Database(dbPath);
  db.exec("CREATE TABLE itemTable (key TEXT PRIMARY KEY, value TEXT)");
  if (version) {
    db.prepare("INSERT INTO itemTable (key, value) VALUES (?, ?)").run(
      "cursorupdate.lastUpdatedAndShown.version",
      version
    );
  }
  db.close();
  return dbPath;
}

test("getCursorVersion reads version from state.vscdb", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-ver-"));
  const dbPath = createStateDb(tmpDir, "99.0.1");
  const origEnv = process.env.CURSOR_STATE_DB_PATH;
  process.env.CURSOR_STATE_DB_PATH = dbPath;

  try {
    resetCursorVersionCache();
    assert.equal(getCursorVersion(), "99.0.1");
  } finally {
    if (origEnv === undefined) delete process.env.CURSOR_STATE_DB_PATH;
    else process.env.CURSOR_STATE_DB_PATH = origEnv;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("getCursorVersion returns fallback when DB does not exist", () => {
  const origEnv = process.env.CURSOR_STATE_DB_PATH;
  process.env.CURSOR_STATE_DB_PATH = "/nonexistent/path/state.vscdb";

  try {
    resetCursorVersionCache();
    assert.equal(getCursorVersion(), FALLBACK_VERSION);
  } finally {
    if (origEnv === undefined) delete process.env.CURSOR_STATE_DB_PATH;
    else process.env.CURSOR_STATE_DB_PATH = origEnv;
  }
});

test("getCursorVersion returns fallback when DB has no version key", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-ver-nokey-"));
  const dbPath = createStateDb(tmpDir, null);
  const origEnv = process.env.CURSOR_STATE_DB_PATH;
  process.env.CURSOR_STATE_DB_PATH = dbPath;

  try {
    resetCursorVersionCache();
    assert.equal(getCursorVersion(), FALLBACK_VERSION);
  } finally {
    if (origEnv === undefined) delete process.env.CURSOR_STATE_DB_PATH;
    else process.env.CURSOR_STATE_DB_PATH = origEnv;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("getCursorVersion caches the result across calls", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-ver-cache-"));
  const dbPath = createStateDb(tmpDir, "10.0.0");
  const origEnv = process.env.CURSOR_STATE_DB_PATH;
  process.env.CURSOR_STATE_DB_PATH = dbPath;

  try {
    resetCursorVersionCache();
    assert.equal(getCursorVersion(), "10.0.0");

    // Update the DB — cache should still return old value
    const db = new Database(dbPath);
    db.prepare("UPDATE itemTable SET value = ? WHERE key = ?").run(
      "20.0.0",
      "cursorupdate.lastUpdatedAndShown.version"
    );
    db.close();

    assert.equal(getCursorVersion(), "10.0.0", "cached value should be returned");
  } finally {
    if (origEnv === undefined) delete process.env.CURSOR_STATE_DB_PATH;
    else process.env.CURSOR_STATE_DB_PATH = origEnv;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("resetCursorVersionCache forces re-read from DB", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-ver-reset-"));
  const dbPath = createStateDb(tmpDir, "5.0.0");
  const origEnv = process.env.CURSOR_STATE_DB_PATH;
  process.env.CURSOR_STATE_DB_PATH = dbPath;

  try {
    resetCursorVersionCache();
    assert.equal(getCursorVersion(), "5.0.0");

    const db = new Database(dbPath);
    db.prepare("UPDATE itemTable SET value = ? WHERE key = ?").run(
      "6.0.0",
      "cursorupdate.lastUpdatedAndShown.version"
    );
    db.close();

    resetCursorVersionCache();
    assert.equal(getCursorVersion(), "6.0.0", "should re-read after cache reset");
  } finally {
    if (origEnv === undefined) delete process.env.CURSOR_STATE_DB_PATH;
    else process.env.CURSOR_STATE_DB_PATH = origEnv;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
