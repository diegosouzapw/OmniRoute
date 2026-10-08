// CCR retrievalRampFactor must round-trip as a fraction. The settings schema accepts
// z.number().min(1).max(100) with no .int(), the engine's effectiveMinChars() ramps on
// fractions (rampFactor <= 1 short-circuits the ramp entirely), and the env override
// accepts fractions — but the read normalizer ran the value through boundedInt, so a
// saved 1.5 came back as 1 and live compression silently lost the ramp.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DATA_DIR so this test never touches a real installed DB. Must be set BEFORE
// importing anything that resolves getDbInstance().
const tmpDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ccr-ramp-"));
process.env.DATA_DIR = tmpDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../src/lib/db/compression.ts");
const { normalizeCcrConfig } = await import("../../src/lib/db/compressionDetailNormalizers.ts");
const { compressionSettingsUpdateSchema } =
  await import("../../src/shared/validation/compressionConfigSchemas.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("fractional retrievalRampFactor 1.5 survives save -> reload", async () => {
  await updateCompressionSettings({ ccr: { retrievalRampFactor: 1.5 } });
  const reloaded = await getCompressionSettings();
  assert.equal(reloaded.ccr.retrievalRampFactor, 1.5);
});

test("fractional retrievalRampFactor 2.5 is not floored to 2", async () => {
  await updateCompressionSettings({ ccr: { retrievalRampFactor: 2.5 } });
  const reloaded = await getCompressionSettings();
  assert.equal(reloaded.ccr.retrievalRampFactor, 2.5);
});

test("retrievalRampFactor stays clamped to [1, 100]", async () => {
  await updateCompressionSettings({ ccr: { retrievalRampFactor: 150 } });
  const over = await getCompressionSettings();
  assert.equal(over.ccr.retrievalRampFactor, 100);

  await updateCompressionSettings({ ccr: { retrievalRampFactor: 0.5 } });
  const under = await getCompressionSettings();
  assert.equal(under.ccr.retrievalRampFactor, 1);
});

test("clamp boundaries 1 and 100 round-trip unchanged", async () => {
  await updateCompressionSettings({ ccr: { retrievalRampFactor: 1 } });
  const min = await getCompressionSettings();
  assert.equal(min.ccr.retrievalRampFactor, 1);

  await updateCompressionSettings({ ccr: { retrievalRampFactor: 100 } });
  const max = await getCompressionSettings();
  assert.equal(max.ccr.retrievalRampFactor, 100);
});

test("non-finite retrievalRampFactor falls back to the default (2)", () => {
  // Direct call: JSON can't carry NaN/Infinity through a DB row (they encode as null),
  // so only an in-memory object reaches the Number.isFinite disjunct.
  assert.equal(normalizeCcrConfig({ retrievalRampFactor: Number.NaN }).retrievalRampFactor, 2);
  assert.equal(
    normalizeCcrConfig({ retrievalRampFactor: Number.POSITIVE_INFINITY }).retrievalRampFactor,
    2
  );
});

test("update schema accepts a fractional retrievalRampFactor (no .int())", () => {
  // The schema's int/fraction asymmetry is the contract this fix restores: adding .int()
  // here would reject fractional saves at the API layer and re-create the bug while the
  // DB-layer tests above stay green.
  const fraction = compressionSettingsUpdateSchema.safeParse({
    ccr: { retrievalRampFactor: 1.5 },
  });
  assert.equal(fraction.success, true);
  const intField = compressionSettingsUpdateSchema.safeParse({ ccr: { minChars: 100.5 } });
  assert.equal(intField.success, false);
});

test("minChars keeps integer flooring (fraction exemption is retrievalRampFactor-only)", () => {
  assert.equal(normalizeCcrConfig({ minChars: 100.7 }).minChars, 100);
});

test("non-numeric retrievalRampFactor falls back to the default (2)", async () => {
  await updateCompressionSettings({ ccr: { retrievalRampFactor: "fast" as unknown as number } });
  const reloaded = await getCompressionSettings();
  assert.equal(reloaded.ccr.retrievalRampFactor, 2);
});
