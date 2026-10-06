/**
 * #13614 — stale LKGP pin clears on the combo fallback path stay non-blocking, and a
 * failed clear is logged with the combo and execution key instead of a bare error.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stale-lkgp-13614-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { clearStaleLKGP } = await import("../../../open-sse/services/combo/staleLkgpClear.ts");
const combo = await import("../../../open-sse/services/combo.ts");
const { setLKGP, getLKGP } = await import("../../../src/lib/db/settings.ts");
const dbCore = await import("../../../src/lib/db/core.ts");

test.after(() => {
  try {
    dbCore.resetDbInstance();
  } catch {
    /* ignore */
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function captureWarn() {
  const warnings: Array<{ tag: string; msg: string; data: Record<string, unknown> }> = [];
  return {
    warnings,
    log: {
      warn: (tag: string, msg: string, data?: unknown) =>
        warnings.push({ tag, msg, data: (data ?? {}) as Record<string, unknown> }),
    },
  };
}

test("combo.ts re-exports the non-blocking clear (single implementation)", () => {
  assert.equal(combo.clearStaleLKGP, clearStaleLKGP);
});

test("a failed clear resolves and warns with the combo and execution key", async () => {
  const { warnings, log } = captureWarn();
  const failure = new Error("database is locked");
  const pending = clearStaleLKGP("combo-a", "ek-7", "combo-id-a", log, "COMBO-RR", async () => {
    throw failure;
  });
  await assert.doesNotReject(pending);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].tag, "COMBO-RR");
  assert.match(warnings[0].msg, /Failed to clear Last Known Good Provider/);
  assert.equal(warnings[0].data.combo, "combo-a");
  assert.equal(warnings[0].data.comboId, "combo-id-a");
  assert.equal(warnings[0].data.executionKey, "ek-7");
  assert.equal(warnings[0].data.err, failure);
});

test("a synchronous throw from the writer is caught the same way", async () => {
  const { warnings, log } = captureWarn();
  await clearStaleLKGP("combo-b", null, null, log, "COMBO", (() => {
    throw new Error("sync boom");
  }) as unknown as (c: string, k: string) => Promise<void>);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].data.executionKey, null);
});

test("the call returns before the writes settle (the fallback loop never waits)", async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const cleared: string[] = [];
  let settled = false;
  const pending = clearStaleLKGP("combo-c", "ek-c", "id-c", null, "COMBO", async (_c, key) => {
    await gate;
    cleared.push(key);
  }).then(() => {
    settled = true;
  });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(settled, false, "clear must still be pending while the caller moves on");
  release();
  await pending;
  assert.deepEqual(cleared.sort(), ["ek-c", "id-c"]);
});

test("default writer clears both persisted pins in the real DB, no warning", async () => {
  await setLKGP("combo-db", "combo-db-id", "openai", "conn-1");
  await setLKGP("combo-db", "ek-db", "openai", "conn-1");
  assert.ok(await getLKGP("combo-db", "combo-db-id"));
  const { warnings, log } = captureWarn();
  await clearStaleLKGP("combo-db", "ek-db", "combo-db-id", log, "COMBO");
  assert.equal(await getLKGP("combo-db", "combo-db-id"), null);
  assert.equal(await getLKGP("combo-db", "ek-db"), null);
  assert.deepEqual(warnings, []);
});
