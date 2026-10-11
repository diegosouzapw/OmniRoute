/**
 * #15563: a combo step for a custom OpenAI-compatible node is stored as
 * `{ providerId: "openai-compatible-chat-<uuid>", model: "<nodePrefix>/<bareId>" }`
 * (#14143 serializes the node's routing alias). The Custom Models vision row is
 * keyed by the bare id the relay reports. stripOwnProviderPrefix (#14642) only
 * strips prefixes that resolve through the static provider-alias registry, so a
 * custom node prefix is kept and the override lookup misses -> supportsVision
 * null -> combo 400 capability_mismatch.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vision-node-alias-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel } = await import("../../src/lib/db/models.ts");
const { createProviderNode } = await import("../../src/lib/db/providers.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { isVisionIncompatibleTarget } =
  await import("../../open-sse/services/combo/comboStructure.ts");
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

const NODE_ID = "openai-compatible-chat-f63b72d7-cc5a-478f-af6d-7afbc86007b0";
const PREFIX = "aegy";
const MODEL_ID = "acme-grok-sight-9";

function target(providerId: string, modelStr: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: "s1",
    modelStr,
    provider: providerId,
    providerId,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

test.before(async () => {
  await createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "aegy relay",
    prefix: PREFIX,
    apiType: "chat",
    baseUrl: "https://relay.example.com/v1",
  });
  await addCustomModel(
    NODE_ID,
    MODEL_ID,
    "Sight 9",
    "manual",
    "chat",
    ["chat"],
    undefined,
    {},
    true
  );
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("control: bare step honors the custom vision row", () => {
  assert.equal(
    getResolvedModelCapabilities({ provider: NODE_ID, model: MODEL_ID }).supportsVision,
    true
  );
});

test("alias-prefixed custom-node step {nodeId, aegy/<id>} honors the custom vision row", () => {
  const caps = getResolvedModelCapabilities({ provider: NODE_ID, model: `${PREFIX}/${MODEL_ID}` });
  assert.equal(caps.supportsVision, true);
});

test("combo vision filter does not exclude the alias-prefixed custom-node step", () => {
  const requirements = {
    requiresTools: false,
    requiresVision: true,
    requiresStructuredOutput: false,
    estimatedInputTokens: 10,
    requestedOutputTokens: 0,
    requiredContextTokens: 10,
  };
  assert.equal(
    isVisionIncompatibleTarget(target(NODE_ID, `${PREFIX}/${MODEL_ID}`), requirements),
    false
  );
});

test("negative: another provider's prefix is not stripped", () => {
  const caps = getResolvedModelCapabilities({ provider: NODE_ID, model: `other/${MODEL_ID}` });
  assert.notEqual(caps.supportsVision, true);
});
