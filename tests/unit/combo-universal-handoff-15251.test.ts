/**
 * #15251 — universal handoff must be disableable through the combo API.
 *
 * The runtime reads the handoff config off the combo record's top-level
 * `universal_handoff` (or `universalHandoff`) key
 * (`open-sse/services/combo/comboSetup.ts` → `resolveUniversalHandoffConfig`),
 * but `createComboSchema` / `updateComboSchema` never whitelisted it — zod
 * stripped the field on POST/PUT, the stored combo `data` never carried it,
 * and `DEFAULT_UNIVERSAL_HANDOFF_CONFIG.enabled = true` applied forever.
 * Operators had no supported API path to turn handoff off.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-handoff-15251-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createComboSchema, updateComboSchema } =
  await import("../../src/shared/validation/schemas.ts");
const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { resolveUniversalHandoffConfig } = await import("../../open-sse/services/contextHandoff.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("#15251 create schema accepts and keeps universal_handoff", () => {
  const parsed = createComboSchema.parse({
    name: "handoff-combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    universal_handoff: { enabled: false },
  });
  assert.deepEqual(parsed.universal_handoff, { enabled: false });
});

test("#15251 the camelCase alias is accepted too (the runtime reads both)", () => {
  const parsed = updateComboSchema.parse({ universalHandoff: { enabled: false } });
  assert.deepEqual(parsed.universalHandoff, { enabled: false });
});

test("#15251 a handoff-only update is not rejected as empty", () => {
  const parsed = updateComboSchema.parse({ universal_handoff: { enabled: false } });
  assert.deepEqual(parsed.universal_handoff, { enabled: false });
});

test("#15251 clearing the field via explicit null is accepted on update", () => {
  const parsed = updateComboSchema.parse({ universal_handoff: null });
  assert.equal(parsed.universal_handoff, null);
});

test("#15251 handoff config values are validated", () => {
  assert.throws(() => updateComboSchema.parse({ universal_handoff: { enabled: "yes" } }));
  assert.throws(() => updateComboSchema.parse({ universal_handoff: { trigger: "never" } }));
  assert.throws(() => updateComboSchema.parse({ universal_handoff: { ttlMinutes: 0 } }));
  // unknown keys are refused (strict), matching the other combo config objects
  assert.throws(() => updateComboSchema.parse({ universal_handoff: { madeUp: true } }));
});

test("#15251 disabling handoff persists and reads back", async () => {
  const created = await combosDb.createCombo({
    name: "Handoff Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    universal_handoff: { enabled: true },
  });
  assert.deepEqual(created.universal_handoff, { enabled: true });

  const updated = await combosDb.updateCombo(
    created.id as string,
    updateComboSchema.parse({ universal_handoff: { enabled: false } })
  );
  assert.ok(updated);
  assert.deepEqual(updated!.universal_handoff, { enabled: false });

  const reread = await combosDb.getComboById(created.id as string);
  assert.ok(reread);
  assert.deepEqual(reread!.universal_handoff, { enabled: false });
});

test("#15251 the stored disable reaches the runtime handoff config", () => {
  // This is the exact call shape in open-sse/services/combo/comboSetup.ts.
  const disabled = resolveUniversalHandoffConfig({ enabled: false }, null);
  assert.equal(disabled.enabled, false);

  // An unchanged combo (field stripped, as before the fix) keeps the default.
  const fallback = resolveUniversalHandoffConfig(null, null);
  assert.equal(fallback.enabled, true);
});
