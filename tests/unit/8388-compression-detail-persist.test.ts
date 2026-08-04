// #8388 — Compression engine DETAIL settings (Headroom / session dedup / CCR) do not
// persist on save. Root cause was a two-layer gap on origin/release/v3.8.49:
//   (1) the .strict() Zod schema (compressionSettingsUpdateSchema) had no `sessionDedup`
//       / `ccr` top-level keys, so a PUT body carrying either was rejected outright;
//   (2) even past validation, src/lib/db/compression.ts had no normalizer/switch-case
//       wired for those two sub-objects (only `headroom` got the #8056 treatment), so a
//       set → save → reload round-trip would silently drop the values.
// This test asserts the FULL round-trip end-to-end (schema parse -> DB write -> DB read),
// not just schema-level parsing, per the plan-file's explicit instruction.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DATA_DIR so this test never touches a real installed DB (see MEMORY: "teste sem
// isolateDataDir → DB REAL"). Must be set BEFORE importing anything that resolves getDbInstance().
const tmpDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8388-"));
process.env.DATA_DIR = tmpDataDir;

const { compressionSettingsUpdateSchema } = await import(
  "../../src/shared/validation/compressionConfigSchemas.ts"
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } = await import(
  "../../src/lib/db/compression.ts"
);

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDataDir, { recursive: true, force: true });
});

test("#8388: PUT body carrying ccr detail (minChars/retrievalRampFactor) is ACCEPTED by the schema", () => {
  const parsed = compressionSettingsUpdateSchema.safeParse({
    ccr: { minChars: 5000, retrievalRampFactor: 10 },
  });
  assert.equal(parsed.success, true);
});

test("#8388: PUT body carrying session-dedup detail (minBlockChars/fuzzy) is ACCEPTED by the schema", () => {
  const parsed = compressionSettingsUpdateSchema.safeParse({
    sessionDedup: { minBlockChars: 200, fuzzy: true },
  });
  assert.equal(parsed.success, true);
});

test("#8388: session-dedup detail round-trips through save -> reload (DB layer)", async () => {
  await updateCompressionSettings({ sessionDedup: { minBlockChars: 321, fuzzy: true } });
  const reloaded = await getCompressionSettings();
  assert.deepEqual(reloaded.sessionDedup, { minBlockChars: 321, fuzzy: true });
});

test("#8388: ccr detail round-trips through save -> reload (DB layer)", async () => {
  await updateCompressionSettings({ ccr: { minChars: 4242, retrievalRampFactor: 7 } });
  const reloaded = await getCompressionSettings();
  assert.deepEqual(reloaded.ccr, { minChars: 4242, retrievalRampFactor: 7 });
});

test("#8388: headroom minRows STILL round-trips (proves #8056 fix stays intact, no regression)", async () => {
  await updateCompressionSettings({ headroom: { minRows: 5 } });
  const reloaded = await getCompressionSettings();
  assert.deepEqual(reloaded.headroom, { minRows: 5 });
});
