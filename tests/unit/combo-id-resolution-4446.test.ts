import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #4446 — opencode-plugin publishes combos by `combo.id` and the OpenCode
// `--model` dispatch path forwards a lowercased bare slug (e.g. "master-light")
// for a combo provisioned as "MASTER-LIGHT". OmniRoute's combo resolver only
// matched by EXACT, case-sensitive `name`, so the slug resolved to nothing and
// the request fell through to provider inference → "Unable to determine
// provider for model 'master-light'". These tests lock the additive fallbacks:
// resolve a combo by its `id` and by a case-insensitive `name` match.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-id-4446-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const sseModelService = await import("../../src/sse/services/model.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4446 getComboForModel resolves a combo by a case-insensitive name (lowercased slug)", async () => {
  await combosDb.createCombo({
    name: "MASTER-LIGHT",
    models: [
      { provider: "groq", model: "llama-3.1-8b-instant" },
      { provider: "cerebras", model: "llama-3.3-70b" },
    ],
  });

  // The opencode `--model opencode-omniroute/master-light` path arrives as the
  // bare lowercased slug "master-light".
  const resolved = await sseModelService.getComboForModel("master-light");

  assert.ok(resolved, "expected the lowercased slug to resolve to the MASTER-LIGHT combo");
  assert.equal((resolved as { name: string }).name, "MASTER-LIGHT");
  assert.ok(
    Array.isArray((resolved as { models: unknown[] }).models) &&
      (resolved as { models: unknown[] }).models.length === 2
  );
});

test("#4446 getComboForModel resolves a combo by its stored id", async () => {
  const created = (await combosDb.createCombo({
    name: "Explore Combo",
    models: [{ provider: "groq", model: "llama-3.1-8b-instant" }],
  })) as { id: string; name: string };

  // The opencode plugin publishes combos as ModelV2 `id: combo.id`, so the
  // dispatch path can forward the combo's id rather than its display name.
  const resolved = await sseModelService.getComboForModel(created.id);

  assert.ok(resolved, "expected the combo id to resolve to the combo");
  assert.equal((resolved as { name: string }).name, "Explore Combo");
});

test("#4446 exact name match still wins and unknown slugs still return null", async () => {
  await combosDb.createCombo({
    name: "MASTER-LIGHT",
    models: [{ provider: "groq", model: "llama-3.1-8b-instant" }],
  });

  const exact = await sseModelService.getComboForModel("MASTER-LIGHT");
  assert.ok(exact, "exact name must still resolve");
  assert.equal((exact as { name: string }).name, "MASTER-LIGHT");

  const unknown = await sseModelService.getComboForModel("no-such-combo-xyz");
  assert.equal(unknown, null, "an unknown slug must not resolve to any combo");
});
