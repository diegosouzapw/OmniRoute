import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vscode-cc-metadata-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const vscodeReasoningMetadata =
  await import("../../src/app/api/v1/vscode/[token]/reasoningMetadata.ts");
const vscodeRawReasoningMetadata =
  await import("../../src/app/api/v1/vscode/raw/[token]/reasoningMetadata.ts");
const vscodeModelsRoute = await import("../../src/app/api/v1/vscode/[token]/models/route.ts");

const XHIGH_MAX_REASONING_EFFORTS = ["none", "low", "medium", "high", "xhigh", "max"];
const MAX_ONLY_REASONING_EFFORTS = ["none", "low", "medium", "high", "max"];

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("VS Code reasoning metadata resolves CC-compatible aggregate and custom provider models", () => {
  assert.deepEqual(
    vscodeReasoningMetadata.getReasoningEffortValues({
      id: "free-anthropic/claude-fable-5",
      owned_by: "cc-compatible",
      capabilities: { reasoning: true },
    }),
    XHIGH_MAX_REASONING_EFFORTS
  );
  assert.deepEqual(
    vscodeReasoningMetadata.getReasoningEffortValues({
      id: "free-anthropic/claude-opus-4-7",
      owned_by: "anthropic-compatible-cc-free-anthropic",
      capabilities: { reasoning: true },
    }),
    XHIGH_MAX_REASONING_EFFORTS
  );
  assert.deepEqual(
    vscodeRawReasoningMetadata.getReasoningEffortValues({
      id: "free-anthropic/claude-opus-4-6",
      owned_by: "anthropic-compatible-cc-free-anthropic",
      capabilities: { reasoning: true },
    }),
    MAX_ONLY_REASONING_EFFORTS
  );
});

test("VS Code model enrichment resolves CC-compatible aggregate capabilities with owned_by", () => {
  const model = vscodeModelsRoute.enrichModelForVscode(
    {
      id: "free-anthropic/claude-fable-5",
      root: "free-anthropic/claude-fable-5",
      owned_by: "cc-compatible",
      type: "chat",
      capabilities: { reasoning: true },
    },
    new Request("http://localhost/api/v1/vscode/sk-test/models")
  );

  assert.equal(model.toolCalling, true);
  assert.equal(model.vision, true);
  assert.equal(model.maxOutputTokens, 128000);
  assert.deepEqual(model.supportsReasoningEffort, XHIGH_MAX_REASONING_EFFORTS);
});

test("VS Code raw display names label max reasoning variants", () => {
  const displayName = vscodeModelsRoute.getVscodeRawModelDisplayName({
    id: "free-anthropic/claude-fable-5-max",
    root: "free-anthropic/claude-fable-5-max",
    owned_by: "cc-compatible",
    type: "chat",
    capabilities: { reasoning: true },
  });

  assert.equal(displayName.endsWith("(Max)"), true);
});
