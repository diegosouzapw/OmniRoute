/**
 * #12158 — clearing an "Agent features" field on a combo must persist.
 *
 * `updateCombo` merges the PUT body over the stored record, so an absent field
 * means "leave unchanged" and only an explicit `null` deletes it. `description`
 * and `context_length` were already nullable in `updateComboSchema`; the three
 * agent fields were not, so unchecking `context_cache_protection` (or clearing
 * `system_message` / `tool_filter_regex`) left the old value in place.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-clear-12158-"));
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

test("updateComboSchema accepts null for each agent feature field", () => {
  const parsed = updateComboSchema.parse({
    system_message: null,
    tool_filter_regex: null,
    context_cache_protection: null,
  });
  assert.equal(parsed.system_message, null);
  assert.equal(parsed.tool_filter_regex, null);
  assert.equal(parsed.context_cache_protection, null);
});

test("a null agent field still counts as a field to update", () => {
  assert.doesNotThrow(() => updateComboSchema.parse({ context_cache_protection: null }));
  assert.throws(() => updateComboSchema.parse({}), /No valid fields to update/);
});

test("a set agent feature value is still accepted and still rejects a bad type", () => {
  const parsed = updateComboSchema.parse({
    system_message: "be terse",
    tool_filter_regex: "^read_",
    context_cache_protection: true,
  });
  assert.equal(parsed.system_message, "be terse");
  assert.equal(parsed.tool_filter_regex, "^read_");
  assert.equal(parsed.context_cache_protection, true);
  assert.throws(() => updateComboSchema.parse({ context_cache_protection: "yes" }));
});

test("null clears each agent feature through updateCombo", async () => {
  const created = await combosDb.createCombo({
    name: "Agent Features Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    system_message: "be terse",
    tool_filter_regex: "^read_",
    context_cache_protection: true,
  });
  assert.equal(created.system_message, "be terse");
  assert.equal(created.tool_filter_regex, "^read_");
  assert.equal(created.context_cache_protection, true);

  const cleared = await combosDb.updateCombo(created.id as string, {
    system_message: null,
    tool_filter_regex: null,
    context_cache_protection: null,
  });
  assert.ok(cleared);
  assert.equal(cleared!.system_message, undefined);
  assert.equal(cleared!.tool_filter_regex, undefined);
  assert.notEqual(cleared!.context_cache_protection, true);

  // Re-read: this is what the editor reopens with, and what #12158 reported as
  // still showing the toggle checked.
  const reread = await combosDb.getComboById(created.id as string);
  assert.ok(reread);
  assert.equal(reread!.system_message, undefined);
  assert.equal(reread!.tool_filter_regex, undefined);
  assert.notEqual(reread!.context_cache_protection, true);
});

test("omitting an agent feature still leaves it unchanged", async () => {
  const created = await combosDb.createCombo({
    name: "Untouched Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    system_message: "be terse",
    context_cache_protection: true,
  });

  const updated = await combosDb.updateCombo(created.id as string, { description: "note" });
  assert.ok(updated);
  assert.equal(updated!.system_message, "be terse");
  assert.equal(updated!.context_cache_protection, true);
});

const { buildAgentFeaturePatch } =
  await import("../../src/app/(dashboard)/dashboard/combos/comboAgentFeatures.ts");

test("the editor sends null for every cleared agent feature on edit", () => {
  assert.deepEqual(
    buildAgentFeaturePatch({
      systemMessage: "  ",
      toolFilter: "",
      contextCache: false,
      isEdit: true,
    }),
    { system_message: null, tool_filter_regex: null, context_cache_protection: null }
  );
});

test("the editor omits an empty agent feature on create", () => {
  assert.deepEqual(
    buildAgentFeaturePatch({
      systemMessage: "",
      toolFilter: "",
      contextCache: false,
      isEdit: false,
    }),
    {}
  );
});

test("the editor still sends set agent features, trimmed", () => {
  assert.deepEqual(
    buildAgentFeaturePatch({
      systemMessage: "  be terse  ",
      toolFilter: " ^read_ ",
      contextCache: true,
      isEdit: true,
    }),
    { system_message: "be terse", tool_filter_regex: "^read_", context_cache_protection: true }
  );
});

test("clearing one agent feature does not disturb the others", () => {
  assert.deepEqual(
    buildAgentFeaturePatch({
      systemMessage: "keep me",
      toolFilter: "",
      contextCache: true,
      isEdit: true,
    }),
    { system_message: "keep me", tool_filter_regex: null, context_cache_protection: true }
  );
});
