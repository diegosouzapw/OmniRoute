import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

test("getDbInstance() caps the probe-failed/restore cycle at 3 attempts (#6835)", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6835-"));
  process.env.DATA_DIR = tmpDir;
  const sqliteFile = path.join(tmpDir, "storage.sqlite");
  const backupFile = `${sqliteFile}.probe-failed-1000000000000`;
  fs.writeFileSync(backupFile, Buffer.from("not a real sqlite file, always fails to open"));
  const core = await import("../../src/lib/db/core.ts");
  const errors: string[] = [];
  for (let i = 0; i < 6; i++) {
    try {
      core.getDbInstance();
      errors.push("(no error)");
      break;
    } catch (err: unknown) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  const abortIndex = errors.findIndex((e) => e.includes("Aborting startup"));
  assert.notEqual(abortIndex, -1, "Expected the cap to trip; got: " + errors.join(" | "));
  assert.ok(abortIndex <= 4, "Expected cap by call #4; took until #" + abortIndex);
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
