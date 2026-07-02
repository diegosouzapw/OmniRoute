/**
 * Regression: combo routing must not send an image request to a model that is
 * not confirmed vision-capable.
 *
 * Root cause: `getResolvedModelCapabilities` returned `supportsVision: null` for
 * every Mistral model — including Pixtral, which IS multimodal — because Mistral
 * ships no models.dev `attachment` flag and the provider registry sets no
 * `supportsVision`. The combo compatibility filter only dropped a target when
 * `supportsVision === false`, so a `null` (unknown) text model like
 * `ministral-14b` slipped through and received the image, replying
 * "IMAGEM_INDISPONIVEL" / "image not provided".
 *
 * Two-part fix, both asserted here:
 *  A) resolveVisionCapability falls back to a conservative model-id heuristic so
 *     known-multimodal families (pixtral, llava, qwen-vl, gpt-4o, …) resolve to
 *     `true` when there is no synced/registry/spec data.
 *  B) the combo filter treats anything that is not confirmed `=== true` as
 *     vision-incompatible for image requests, while the existing
 *     "keep all when none qualify" fallback prevents any regression.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Deterministic, isolated storage so capability resolution sees NO synced data
// and exercises the registry/spec/heuristic path only.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-vision-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// --- Part A: capability resolution -----------------------------------------

test("Pixtral resolves supportsVision=true via model-id heuristic (no synced data)", () => {
  assert.equal(getResolvedModelCapabilities("mistral/pixtral-12b-latest").supportsVision, true);
});

test("a text-only Mistral model is NOT a vision false-positive", () => {
  assert.notEqual(
    getResolvedModelCapabilities("mistral/ministral-14b-latest").supportsVision,
    true
  );
});

// --- Part B: combo routing --------------------------------------------------

function target(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider: modelStr.includes("/") ? modelStr.split("/")[0] : modelStr,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

const imageBody = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        {
          type: "image_url",
          image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB" },
        },
      ],
    },
  ],
};

test("image request: combo drops the non-vision target, keeps the vision target", () => {
  const out = filterTargetsByRequestCompatibility(
    [target("mistral/pixtral-12b-latest"), target("mistral/ministral-14b-latest")],
    imageBody,
    noopLog
  );
  const ids = out.map((t) => t.modelStr);
  assert.ok(ids.includes("mistral/pixtral-12b-latest"), "vision target must be kept");
  assert.ok(!ids.includes("mistral/ministral-14b-latest"), "non-vision target must be dropped");
});

test("image request with NO confirmed-vision target: keep all (fallback, no regression)", () => {
  const out = filterTargetsByRequestCompatibility(
    [target("mistral/ministral-14b-latest"), target("groq/llama-3.1-8b-instant")],
    imageBody,
    noopLog
  );
  assert.equal(out.length, 2, "must not strip every target when none is confirmed vision");
});

test("text-only request: targets are untouched by the vision filter", () => {
  const out = filterTargetsByRequestCompatibility(
    [target("mistral/ministral-14b-latest")],
    { messages: [{ role: "user", content: "hello" }] },
    noopLog
  );
  assert.equal(out.length, 1);
});

test("large output request: unknown maxOutputTokens does not filter a target", () => {
  const out = filterTargetsByRequestCompatibility(
    [target("openai-compatible-local/custom-large-output-model"), target("openai/gpt-4o-mini")],
    { messages: [{ role: "user", content: "hello" }], max_tokens: 32000 },
    noopLog
  );
  const ids = out.map((t) => t.modelStr);

  assert.deepEqual(ids, ["openai-compatible-local/custom-large-output-model"]);
});
