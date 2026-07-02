import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// T05/C5 back-compat regression (#5653) at the DB read path. The new DEFAULT_COMPRESSION_CONFIG
// seeds preserveSystemPromptMode='always'. getCompressionSettings() spreads that default, so a
// legacy install that persisted ONLY the `preserveSystemPrompt` boolean (no mode row) would have
// the default 'always' shadow the boolean — silently flipping `preserveSystemPrompt=false` installs
// from "compress unless cached" (whenNoCache) to "always preserve". The read path must instead
// derive the mode from the boolean when no mode row exists.
//
// core.ts freezes DATA_DIR/SQLITE_FILE into module consts at first import, so the temp DATA_DIR is
// set BEFORE any import and the db file is shared across tests. Each test isolates by wiping the
// `compression` namespace and busting the module-level TTL cache via resetDbInstance() (which hands
// out a NEW db object, so the cache — keyed by db ref — misses).
const TEMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-preserve-mode-"));
process.env.DATA_DIR = TEMP_DIR;

async function freshCompressionDb() {
  const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
  const db = getDbInstance(); // runs migrations on first call
  db.prepare("DELETE FROM key_value WHERE namespace = 'compression'").run();
  return { db, resetDbInstance };
}

async function readSettings() {
  const { getCompressionSettings } = await import("../../../src/lib/db/compression.ts");
  return getCompressionSettings();
}

test.after(async () => {
  try {
    const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {
    /* core never loaded */
  }
  try {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  } catch {
    /* best-effort */
  }
});

test("legacy preserveSystemPrompt=false (no mode row) derives whenNoCache", async () => {
  const { db, resetDbInstance } = await freshCompressionDb();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression','preserveSystemPrompt','false')"
  ).run();
  resetDbInstance(); // new db object => TTL cache miss on the next read

  const cfg = await readSettings();
  assert.equal(
    cfg.preserveSystemPromptMode,
    "whenNoCache",
    "legacy preserveSystemPrompt=false must derive whenNoCache, not inherit the 'always' default"
  );

  // End-to-end: without a cacheable prefix, a legacy-off install must still compress the prompt.
  const { resolveCacheAwareConfig } = await import(
    "../../../open-sse/services/compression/cacheAwareConfig.ts"
  );
  assert.equal(
    resolveCacheAwareConfig(cfg).preserveSystemPrompt,
    false,
    "legacy-off install must compress the system prompt when there is no cache"
  );
});

test("fresh install (no override rows) defaults to always", async () => {
  const { resetDbInstance } = await freshCompressionDb(); // wipes all compression rows
  resetDbInstance();

  const cfg = await readSettings();
  assert.equal(cfg.preserveSystemPromptMode, "always", "fresh default mode is always");
  assert.equal(cfg.preserveSystemPrompt, true, "fresh default boolean is true");
});

test("an explicit mode row wins over the legacy boolean", async () => {
  const { db, resetDbInstance } = await freshCompressionDb();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression','preserveSystemPrompt','false')"
  ).run();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('compression','preserveSystemPromptMode','\"never\"')"
  ).run();
  resetDbInstance();

  const cfg = await readSettings();
  assert.equal(cfg.preserveSystemPromptMode, "never", "an explicit stored mode row wins");
});
