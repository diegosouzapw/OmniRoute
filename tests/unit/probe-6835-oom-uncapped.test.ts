import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

test("getDbInstance() eventually caps a persistently-OOMing sql.js probe (#6835)", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6835-oom-"));
  process.env.DATA_DIR = tmpDir;
  const sqliteFile = path.join(tmpDir, "storage.sqlite");
  fs.mkdirSync(sqliteFile); // forces better-sqlite3/node:sqlite to fail synchronously (EISDIR-style)
  await import("../../src/lib/db/adapters/driverFactory.ts");
  const core = await import("../../src/lib/db/core.ts");
  const fakeAdapter = {
    driver: "sql.js" as const,
    open: true,
    name: sqliteFile,
    prepare() {
      throw new Error("out of memory");
    },
    exec() {
      throw new Error("out of memory");
    },
    pragma() {
      throw new Error("out of memory");
    },
    transaction<T>(fn: (...a: unknown[]) => T) {
      return fn;
    },
    immediate() {},
    async backup() {},
    checkpoint() {},
    close() {},
    raw: null,
  };
  (
    globalThis as unknown as { __omnirouteSqlJsAdapters: Map<string, unknown> }
  ).__omnirouteSqlJsAdapters = new Map([[sqliteFile, fakeAdapter]]);
  const errors: string[] = [];
  for (let i = 0; i < 8; i++) {
    try {
      core.getDbInstance();
      errors.push("(no error)");
      break;
    } catch (err: unknown) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  const anyAborted = errors.some((e) => e.includes("Aborting startup"));
  assert.ok(
    anyAborted,
    "Expected getDbInstance() to eventually give up with a terminal " +
      "'Aborting startup'-style diagnostic after repeated OOM probe failures, the same way it " +
      "already does for generic corruption (#6632). Instead every call re-threw an identical, " +
      "uncapped OOM error:\n" + errors.map((e, i) => `  [${i}] ${e}`).join("\n")
  );
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
