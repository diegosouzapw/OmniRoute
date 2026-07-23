/**
 * #8250 — Kimi K3 synced capability rows can contradict themselves:
 *   attachment=false  AND  modalities_input includes image/video
 *
 * `resolveVisionCapability` used to prefer the boolean `attachment` flag, so K3
 * resolved as non-vision while `/v1/models` and clients still saw image/video
 * input modalities. Vision Bridge, combo compatibility, and the catalog then
 * disagreed.
 *
 * Authoritative truth for Kimi K3 is vision-capable (Moonshot native vision;
 * `MODEL_SPECS["kimi-k3"].supportsVision === true`). Contradictory synced rows
 * must be reconciled so `attachment`, `supportsVision`, and exposed
 * `modalitiesInput` agree — both for already-persisted DB rows and at models.dev
 * transform/sync time.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-k3-vision-8250-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const { transformModelsDevToCapabilities } =
  await import("../../src/lib/modelsDevSync/transform.ts");
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

/** Mirrors the contradictory deployed row reported in #8250. */
function seedContradictoryK3Capabilities() {
  modelsDevSync.saveModelsDevCapabilities({
    "kimi-coding-apikey": {
      k3: buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text", "image", "video"]),
        modalities_output: JSON.stringify(["text"]),
        reasoning: true,
        tool_call: true,
        limit_context: 1048576,
        status: "stable",
      }),
    },
    "kimi-coding": {
      k3: buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text", "image", "video"]),
        modalities_output: JSON.stringify(["text"]),
        reasoning: true,
        tool_call: true,
        limit_context: 1048576,
        status: "stable",
      }),
    },
    kmc: {
      k3: buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text", "image", "video"]),
        modalities_output: JSON.stringify(["text"]),
        reasoning: true,
        tool_call: true,
        limit_context: 1048576,
        status: "stable",
      }),
    },
    kmca: {
      k3: buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text", "image", "video"]),
        modalities_output: JSON.stringify(["text"]),
        reasoning: true,
        tool_call: true,
        limit_context: 1048576,
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

test("#8250 kimi-coding-apikey/k3: attachment=false + image modalities → vision=true and fields agree", () => {
  seedContradictoryK3Capabilities();
  const caps = modelCapabilities.getResolvedModelCapabilities("kimi-coding-apikey/k3");

  assert.equal(caps.supportsVision, true, "K3 must resolve as vision-capable");
  assert.equal(caps.attachment, true, "exposed attachment must agree with supportsVision");
  assert.ok(
    caps.modalitiesInput.some((m) => m.toLowerCase().includes("image")),
    "input modalities must keep image after reconcile"
  );
  assert.ok(
    caps.modalitiesInput.some((m) => m.toLowerCase().includes("video")),
    "input modalities must keep video after reconcile"
  );
});

test("#8250 alias providers (kimi-coding / kmc / kmca) reconcile the same way", () => {
  seedContradictoryK3Capabilities();
  for (const id of ["kimi-coding/k3", "kmc/k3", "kmca/k3"]) {
    const caps = modelCapabilities.getResolvedModelCapabilities(id);
    assert.equal(caps.supportsVision, true, `${id} supportsVision`);
    assert.equal(caps.attachment, true, `${id} attachment`);
    assert.ok(
      caps.modalitiesInput.some((m) => /image/i.test(m)),
      `${id} modalitiesInput keeps image`
    );
  }
});

test("#8250 sync transform promotes attachment=false when modalities declare image/video", () => {
  const caps = transformModelsDevToCapabilities({
    "kimi-for-coding": {
      id: "kimi-for-coding",
      models: {
        k3: {
          id: "k3",
          name: "Kimi K3",
          attachment: false,
          reasoning: true,
          tool_call: true,
          release_date: "2026-01-01",
          last_updated: "2026-01-01",
          open_weights: false,
          limit: { context: 1048576, output: 1048576 },
          modalities: { input: ["text", "image", "video"], output: ["text"] },
        },
      },
    },
  } as never);

  // Mapped onto OmniRoute provider ids for kimi-for-coding
  const row = caps["kimi-coding-apikey"]?.k3 ?? caps["kimi-coding"]?.k3;
  assert.ok(row, "expected transformed k3 capability under a kimi-coding* provider");
  assert.equal(row.attachment, true, "sync must normalize attachment to true");
  assert.deepEqual(JSON.parse(row.modalities_input), ["text", "image", "video"]);
});

test("#8250 sync transform leaves consistent text-only rows alone", () => {
  const caps = transformModelsDevToCapabilities({
    minimal: {
      id: "minimal",
      models: {
        "text-only": {
          id: "text-only",
          name: "Text Only",
          attachment: false,
          reasoning: false,
          tool_call: false,
          release_date: "2026-01-01",
          last_updated: "2026-01-01",
          open_weights: false,
          limit: { context: 4096, output: 2048 },
          modalities: { input: ["text"], output: ["text"] },
        },
      },
    },
  } as never);

  assert.equal(caps.minimal["text-only"].attachment, false);
});

test("#8250 known text-only override still beats wrong image modalities (#4071)", () => {
  // Guard: the #8250 modalities-over-false-attachment reconcile must NOT undo
  // the #4071 hard text-only override for mimo-v2.5-pro.
  modelsDevSync.saveModelsDevCapabilities({
    "xiaomi-mimo": {
      "mimo-v2.5-pro": buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
      }),
    },
  });
  const pro = modelCapabilities.getResolvedModelCapabilities("xiaomi-mimo/mimo-v2.5-pro");
  assert.equal(pro.supportsVision, false, "text-only override must still win");
});
