/**
 * Regression: combo routing must not send an image request to a model that is
 * not confirmed vision-capable.
 *
 * The combo filter treats anything that is not confirmed `=== true` as
 * vision-incompatible for image requests, while the existing "keep all when none
 * qualify" fallback prevents any regression.
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
const modelsDb = await import("../../src/lib/db/models.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// --- Part A: capability resolution -----------------------------------------

test("Pixtral stays unknown without provider-first or synced capability data", () => {
  assert.equal(getResolvedModelCapabilities("mistral/pixtral-12b-latest").supportsVision, null);
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

test("image request: combo drops non-vision targets, keeps confirmed vision targets", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("mistral", "conn-a", [
    {
      id: "pixtral-explicit-vision",
      name: "Pixtral Explicit Vision",
      source: "imported",
      capabilities: { supportsVision: true },
    },
  ]);

  const out = filterTargetsByRequestCompatibility(
    [target("mistral/pixtral-explicit-vision"), target("mistral/ministral-14b-latest")],
    imageBody,
    noopLog
  );
  const ids = out.map((t) => t.modelStr);
  assert.ok(ids.includes("mistral/pixtral-explicit-vision"), "vision target must be kept");
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

test("tools request only drops targets with explicit tools=false", () => {
  modelsDb.mergeModelCompatOverride("openai-compatible-local", "no-tools", {
    capabilities: { supportsTools: false },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("openai-compatible-local/unknown-tools"), target("openai-compatible-local/no-tools")],
    { messages: [{ role: "user", content: "hello" }], tools: [{ type: "function" }] },
    noopLog
  );
  const ids = out.map((t) => t.modelStr);

  assert.deepEqual(ids, ["openai-compatible-local/unknown-tools"]);
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
