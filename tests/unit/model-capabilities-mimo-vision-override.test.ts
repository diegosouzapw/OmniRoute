/**
 * Xiaomi MiMo vision capability — robust override against a wrong synced `attachment`.
 *
 * Per Xiaomi's official docs (mimo.mi.com .../multimodal-understanding/image-understanding)
 * ONLY `mimo-v2.5` and `mimo-v2-omni` accept image input. The `*-pro` chat models
 * (`mimo-v2.5-pro`, `mimo-v2-pro`) and `mimo-v2-flash` are TEXT-ONLY.
 *
 * models.dev mislabels `mimo-v2.5-pro` as attachment-capable (hermes-agent#18884),
 * and `resolveVisionCapability` lets a synced `attachment:true` win first — which would
 * route an image request to a blind model (the #4071 failure mode). A hard override
 * keyed on the documented text-only ids must beat the synced verdict.
 *
 * The discriminator is `attachment`: a synced row sets `attachment` from the seeded
 * value, while the override forces `supportsVision:false` regardless. So a row seeded
 * with `attachment:true` whose `supportsVision` still resolves `false` proves the
 * override — not the synced path — produced the verdict.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mimo-vision-"));
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

// Mirror the WRONG models.dev `xiaomi-mimo` keying: the text-only `*-pro` chat models
// carry attachment:true (the upstream mislabel), while the genuinely multimodal
// `mimo-v2.5` / `mimo-v2-omni` correctly carry attachment:true too.
function seedMimoCapabilities() {
  modelsDevSync.saveModelsDevCapabilities({
    "xiaomi-mimo": {
      "mimo-v2.5-pro": buildCapability({
        attachment: true, // upstream mislabel — must be overridden to text-only
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        status: "stable",
      }),
      "mimo-v2-pro": buildCapability({
        attachment: true, // upstream mislabel — must be overridden to text-only
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        status: "stable",
      }),
      "mimo-v2.5": buildCapability({
        attachment: true, // genuinely multimodal — must stay vision-capable
        modalities_input: JSON.stringify(["text", "image", "audio", "video"]),
        modalities_output: JSON.stringify(["text"]),
        status: "stable",
      }),
      "mimo-v2-omni": buildCapability({
        attachment: true, // genuinely multimodal — must stay vision-capable
        modalities_input: JSON.stringify(["text", "image", "audio", "video"]),
        modalities_output: JSON.stringify(["text"]),
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

test("mimo-v2.5-pro stays text-only even when models.dev says attachment:true", () => {
  seedMimoCapabilities();
  const pro = modelCapabilities.getResolvedModelCapabilities("xiaomi-mimo/mimo-v2.5-pro");
  // attachment is the seeded synced value, but the override forces vision false.
  assert.equal(pro.attachment, true, "synced attachment row is present (proves override, not absence)");
  assert.equal(pro.supportsVision, false, "text-only override must beat the wrong synced attachment");
});

test("mimo-v2-pro stays text-only even when models.dev says attachment:true", () => {
  seedMimoCapabilities();
  const pro = modelCapabilities.getResolvedModelCapabilities("xiaomi-mimo/mimo-v2-pro");
  assert.equal(pro.supportsVision, false, "text-only override must beat the wrong synced attachment");
});

test("genuinely multimodal mimo models keep vision (override is precise, not broad)", () => {
  seedMimoCapabilities();
  const v25 = modelCapabilities.getResolvedModelCapabilities("xiaomi-mimo/mimo-v2.5");
  const omni = modelCapabilities.getResolvedModelCapabilities("xiaomi-mimo/mimo-v2-omni");
  assert.equal(v25.supportsVision, true, "mimo-v2.5 is multimodal — must NOT be caught by the override");
  assert.equal(omni.supportsVision, true, "mimo-v2-omni is multimodal — must NOT be caught by the override");
});

test("the bare (unqualified) text-only id is also overridden", () => {
  seedMimoCapabilities();
  // No provider prefix — exercises the `^...$` branch of the override regex.
  const bare = modelCapabilities.getResolvedModelCapabilities("mimo-v2.5-pro");
  assert.equal(bare.supportsVision, false, "bare text-only id must also be overridden");
});
