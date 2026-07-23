/**
 * #4073 — models.dev synced metadata must resolve for Mistral `-latest` aliases.
 *
 * Root cause (confirmed against the live models.dev API): models.dev catalogs
 * Mistral Pixtral 12B under the SHORT id `pixtral-12b` (with `attachment: true`,
 * `modalities.input: ["text","image"]`), while requests use the Mistral API
 * alias `pixtral-12b-latest`. The synced lookup in `getSyncedCapabilityForResolved`
 * tried the exact id, the raw id and the static-spec canonical id — all of which
 * miss for `pixtral-12b-latest` — so vision fell through to the #4071 model-id
 * heuristic and `attachment` stayed `null` (the symptom reported in #4073).
 *
 * The discriminator between "resolved via synced metadata" and "guessed via the
 * #4071 heuristic" is `attachment`: the synced path sets `attachment` from
 * `synced.attachment`; the heuristic only flips `supportsVision` and leaves
 * `attachment` null. So these tests assert on `attachment` to prove the synced
 * path — not the heuristic — produced the verdict.
 *
 * Other Mistral vision models already worked because models.dev keeps their
 * `-latest` id verbatim (e.g. `pixtral-large-latest`, `mistral-medium-latest`);
 * `pixtral-12b` is the one short-formed alias, hence the keying fix.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mistral-vision-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");

function buildCapability(overrides = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: null,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Mirrors the real models.dev `mistral` provider keying observed on the live API:
// short-form `pixtral-12b` (vision), verbatim `pixtral-large-latest` (vision),
// short-form `ministral-8b` (text-only).
function seedMistralCapabilities() {
  modelsDevSync.saveModelsDevCapabilities({
    mistral: {
      "pixtral-12b": buildCapability({
        attachment: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        family: "pixtral",
        status: "stable",
      }),
      "pixtral-large-latest": buildCapability({
        attachment: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        family: "pixtral",
        status: "stable",
      }),
      "ministral-8b": buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text"]),
        modalities_output: JSON.stringify(["text"]),
        family: "ministral",
        status: "stable",
      }),
    },
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4073 mistral/pixtral-12b-latest resolves vision via the synced `-latest` alias (not the heuristic)", () => {
  seedMistralCapabilities();

  const latest = modelCapabilities.getResolvedModelCapabilities("mistral/pixtral-12b-latest");
  // attachment === true can ONLY come from the synced row keyed `pixtral-12b`.
  assert.equal(latest.attachment, true, "synced attachment must resolve via the stripped `-latest` alias");
  assert.equal(latest.supportsVision, true);
});

test("#4073 exact-keyed `-latest` models still resolve directly (no regression)", () => {
  seedMistralCapabilities();

  // pixtral-large-latest is stored verbatim — the direct lookup must keep working.
  const large = modelCapabilities.getResolvedModelCapabilities("mistral/pixtral-large-latest");
  assert.equal(large.attachment, true);
  assert.equal(large.supportsVision, true);

  // And the bare short id resolves directly too.
  const bare = modelCapabilities.getResolvedModelCapabilities("mistral/pixtral-12b");
  assert.equal(bare.attachment, true);
  assert.equal(bare.supportsVision, true);
});

test("#4073 the `-latest` strip carries the synced verdict for text-only models too", () => {
  seedMistralCapabilities();

  // ministral-8b is text-only; the heuristic does not recognise it, so the only
  // way attachment is a concrete `false` (not null) is the synced row resolving
  // through the stripped alias. This proves the strip returns the row's real
  // verdict rather than fabricating a positive.
  const ministral = modelCapabilities.getResolvedModelCapabilities("mistral/ministral-8b-latest");
  assert.equal(ministral.attachment, false, "synced false must win, resolved via stripped alias");
  assert.equal(ministral.supportsVision, false);
});

test("#4073 the `-latest` strip never fabricates a match for an unknown id", () => {
  seedMistralCapabilities();

  // No synced row for `unknown-text-model` (stripped) nor its `-latest` form, and
  // the heuristic doesn't recognise it → attachment null, vision null. The strip
  // must not invent a capability out of nothing.
  const unknown = modelCapabilities.getResolvedModelCapabilities("mistral/unknown-text-model-latest");
  assert.equal(unknown.attachment, null);
  assert.equal(unknown.supportsVision, null);
});
