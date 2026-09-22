/**
 * #12836 — a combo's visibility must be updatable through the API.
 *
 * `isHidden` is stored on the combo record and honoured by its readers: the
 * builder's option list drops hidden combos (`src/lib/combos/builderOptions.ts`)
 * and so does the dashboard grid. `createCombo` writes the field explicitly.
 * The only endpoint a client can flip it through is `PUT /api/combos/[id]`,
 * which spreads the *validated* body into the update — and `updateComboSchema`
 * never listed `isHidden`, so zod stripped it. A visibility-only update was
 * rejected as "No valid fields to update", and pairing it with a recognized
 * field made the request succeed while silently dropping the visibility change.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-hidden-12836-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { updateComboSchema } = await import("../../src/shared/validation/schemas.ts");
const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#12836 a visibility-only update is a valid update", () => {
  assert.equal(updateComboSchema.parse({ isHidden: true }).isHidden, true);
  assert.equal(updateComboSchema.parse({ isHidden: false }).isHidden, false);
  // The empty-update refinement still fires for a genuinely empty body.
  assert.throws(() => updateComboSchema.parse({}), /No valid fields to update/);
});

test("#12836 visibility survives a mixed update instead of being stripped", () => {
  const parsed = updateComboSchema.parse({ description: "fixture", isHidden: true });
  assert.equal(parsed.description, "fixture");
  assert.equal(parsed.isHidden, true);
});

test("#12836 only a boolean is accepted", () => {
  for (const bad of ["true", 1, null, {}]) {
    assert.throws(() => updateComboSchema.parse({ isHidden: bad }));
  }
});

test("#12836 hiding a combo persists and reads back", async () => {
  const created = await combosDb.createCombo({
    name: "Visibility Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  assert.equal(created.isHidden, false);

  const body = updateComboSchema.parse({ isHidden: true });
  const updated = await combosDb.updateCombo(created.id as string, body);
  assert.ok(updated);
  assert.equal(updated!.isHidden, true);

  // Re-read: this is the state the builder and the dashboard grid filter on.
  const reread = await combosDb.getComboById(created.id as string);
  assert.ok(reread);
  assert.equal(reread!.isHidden, true);
});

test("#12836 unhiding it again works, and an unrelated update leaves it alone", async () => {
  const created = await combosDb.createCombo({
    name: "Round Trip Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });

  await combosDb.updateCombo(created.id as string, updateComboSchema.parse({ isHidden: true }));
  const shown = await combosDb.updateCombo(
    created.id as string,
    updateComboSchema.parse({ isHidden: false })
  );
  assert.ok(shown);
  assert.equal(shown!.isHidden, false);

  await combosDb.updateCombo(created.id as string, updateComboSchema.parse({ isHidden: true }));
  const untouched = await combosDb.updateCombo(
    created.id as string,
    updateComboSchema.parse({ description: "note" })
  );
  assert.ok(untouched);
  assert.equal(untouched!.description, "note");
  assert.equal(untouched!.isHidden, true);
});
