/**
 * Rule #12 regression sweep — HTTP error bodies must route through
 * sanitizeErrorMessage() so raw stack traces / absolute source paths never leak.
 *
 * This covers routes fixed in the fix/rule12-error-sanitization-sweep PR. It drives
 * the real route handlers (fresh temp DATA_DIR, localhost request → auth disabled by
 * default, matching the tests/unit/obsidian-webdav-route.test.ts pattern) and forces
 * the DB layer to throw an Error whose message embeds an absolute source path + a
 * stack tail. The assertion is behavioral: the emitted body must NOT contain the raw
 * path and must NOT match /at \/|[A-Za-z]:\\/ — i.e. it is the sanitized form.
 *
 * mock.module() is unavailable in this tsx/ESM + Node setup (see
 * tests/unit/proxyfetch-undici-retry.test.ts), so we monkeypatch the shared DB
 * singleton returned by getDbInstance() and restore it after each test.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-rule12-sweep-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

// Set DATA_DIR before importing anything that touches the DB.
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const compressionRoute = await import("../../src/app/api/settings/compression/route.ts");
const cacheEntriesRoute = await import("../../src/app/api/cache/entries/route.ts");
const dbHealthRoute = await import("../../src/app/api/db/health/route.ts");
const { sanitizeErrorMessage } = await import("../../open-sse/utils/error.ts");

// An error message carrying BOTH a first-line absolute source path (must be
// replaced with <path>) and a multi-line stack tail (must be truncated away).
const LEAK_PATH_POSIX = "/home/omni/secret/config.ts";
const LEAK_PATH_WIN = "C:\\Users\\secret\\app.ts";
function makeLeakyError(): Error {
  const err = new Error(
    `SqliteError: disk I/O error while opening ${LEAK_PATH_POSIX}:42\n` +
      `    at Database.prepare (${LEAK_PATH_WIN}:10:5)\n` +
      `    at listEntries (/opt/omniroute/src/lib/db/x.ts:88:12)`
  );
  return err;
}

function makeRequest(url: string, options?: RequestInit): NextRequest {
  return new Request(url, options) as unknown as NextRequest;
}

// Sanity: the sanitizer really does strip these leaks (guards the test itself —
// if sanitizeErrorMessage regressed, this fails first).
test("sanitizeErrorMessage strips absolute paths + stack tail (self-check)", () => {
  const out = sanitizeErrorMessage(String(makeLeakyError()));
  assert.ok(!out.includes("/home/omni/secret"), "posix path leaked");
  assert.ok(!out.includes("C:\\Users\\secret"), "windows path leaked");
  assert.ok(!/\bat\s+\//.test(out), "stack frame leaked");
  assert.ok(out.includes("<path>"), "path token should be replaced");
});

// Wrap the shared DB singleton's `prepare` so any statement whose SQL matches
// `sqlMatch` throws our leaky error; everything else (auth's getSettings, etc.)
// keeps working. Returns a restore fn.
function patchPrepareToThrow(sqlMatch: string): () => void {
  const db = core.getDbInstance();
  const orig = db.prepare.bind(db);
  (db as unknown as { prepare: unknown }).prepare = (sql: string, ...rest: unknown[]) => {
    if (typeof sql === "string" && sql.includes(sqlMatch)) {
      throw makeLeakyError();
    }
    return orig(sql, ...(rest as []));
  };
  return () => {
    (db as unknown as { prepare: unknown }).prepare = orig;
  };
}

function patchPragmaToThrow(): () => void {
  const db = core.getDbInstance();
  const orig = db.pragma.bind(db);
  (db as unknown as { pragma: unknown }).pragma = () => {
    throw makeLeakyError();
  };
  return () => {
    (db as unknown as { pragma: unknown }).pragma = orig;
  };
}

// A leak assertion applied to any string field of an error body.
function assertSanitized(raw: string, context: string): void {
  assert.ok(!raw.includes("/home/omni/secret"), `${context}: posix path leaked → ${raw}`);
  assert.ok(!raw.includes("C:\\Users\\secret"), `${context}: windows path leaked → ${raw}`);
  assert.ok(!raw.includes("/opt/omniroute"), `${context}: stack path leaked → ${raw}`);
  // The task's contract: body must not contain a leading absolute-path frame.
  assert.ok(!/at \/|[A-Za-z]:\\/.test(raw), `${context}: matched /at \\/|[A-Za-z]:\\\\/ → ${raw}`);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("GET /api/settings/compression → 500 body is sanitized (shape { error })", async () => {
  const restore = patchPrepareToThrow("FROM key_value WHERE namespace = ?");
  try {
    const res = await compressionRoute.GET(
      makeRequest("http://localhost/api/settings/compression")
    );
    assert.equal(res.status, 500);
    const body = (await res.json()) as { error: string };
    assert.equal(typeof body.error, "string");
    assertSanitized(body.error, "compression GET");
  } finally {
    restore();
  }
});

test("GET /api/cache/entries → 500 body is sanitized (shape { error })", async () => {
  const restore = patchPrepareToThrow("semantic_cache");
  try {
    const res = await cacheEntriesRoute.GET(makeRequest("http://localhost/api/cache/entries"));
    assert.equal(res.status, 500);
    const body = (await res.json()) as { error: string };
    assert.equal(typeof body.error, "string");
    assertSanitized(body.error, "cache/entries GET");
  } finally {
    restore();
  }
});

test("GET /api/db/health → 500 body is sanitized (shape { error: { message } })", async () => {
  const restore = patchPragmaToThrow();
  try {
    const res = await dbHealthRoute.GET(makeRequest("http://localhost/api/db/health"));
    assert.equal(res.status, 500);
    const body = (await res.json()) as { error: { message: string } };
    assert.equal(typeof body.error.message, "string");
    assertSanitized(body.error.message, "db/health GET");
  } finally {
    restore();
  }
});
