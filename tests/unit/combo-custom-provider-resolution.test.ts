/**
 * Regression tests for issue #2778 — custom openai-compatible-responses-* provider
 * targets fail with 503 when called via combo name.
 *
 * Root cause: when a combo step stores a custom provider node by its internal UUID-
 * prefixed id (e.g. "openai-compatible-responses-d302c75f-..."), getComboModelString()
 * assembles the outbound modelStr as "<uuid-id>/gpt-5.5". getModelInfo() then attempts
 * to match provider nodes using:
 *
 *   openaiNodes.find((node) => node.prefix === prefixToCheck)
 *
 * where prefixToCheck is the UUID id, but node.prefix is the user-defined alias
 * (e.g. "flymux"). No match → credential lookup fails → 503.
 *
 * Fix (Option A): match by BOTH node.prefix AND node.id in getModelInfo() so that
 * UUID-prefixed model strings from combo steps still resolve to the correct node.
 *
 * These tests verify:
 * 1. getComboModelString() produces a UUID-prefixed modelStr when providerId is the
 *    internal node id (reproduces the exact string from the bug screenshot).
 * 2. The fix is present in src/sse/services/model.ts — node.id is checked alongside
 *    node.prefix in both the openai-compatible and anthropic-compatible branches.
 * 3. A UUID-id modelStr that previously fell through to unknown-provider lookup now
 *    resolves to the matched node's id when the matching logic is applied.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as comboSteps from "../../src/lib/combos/steps.ts";
import { getComboModelString } from "../../src/lib/combos/steps.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODEL_SERVICE_SRC = path.resolve(__dirname, "../../src/sse/services/model.ts");

// ── 1. Reproduce the exact model string from the bug screenshot ───────────────

const FAKE_UUID_NODE_ID = "openai-compatible-responses-d302c75f-f133-48d3-afa1-066e594e0d29";

test("combo step public surface excludes removed type-guard helpers", () => {
  assert.equal(Object.hasOwn(comboSteps, "isComboRefStep"), false);
  assert.equal(Object.hasOwn(comboSteps, "isComboModelStep"), false);
  assert.equal(typeof comboSteps.getComboModelString, "function");
  assert.equal(typeof comboSteps.getComboStepWeight, "function");
});

test("#2778 getComboModelString with UUID-prefixed providerId assembles the UUID-prefixed model string", () => {
  // This is what a combo step looks like when the UI stores the internal node id as
  // providerId — the same scenario that causes the bug.
  const step = {
    kind: "model",
    id: "step-001",
    model: "gpt-5.5",
    providerId: FAKE_UUID_NODE_ID,
    weight: 1,
  };

  const modelStr = getComboModelString(step);
  // This is the exact problematic string: UUID-prefix/model
  assert.strictEqual(
    modelStr,
    `${FAKE_UUID_NODE_ID}/gpt-5.5`,
    "getComboModelString must build UUID-prefixed modelStr when step.providerId is the internal node id"
  );
});

test("#2778 getComboModelString with user-defined alias prefix produces clean alias/model string", () => {
  // When the step stores the user-defined alias as providerId, the modelStr is clean.
  const step = {
    kind: "model",
    id: "step-002",
    model: "gpt-5.5",
    providerId: "flymux",
    weight: 1,
  };

  const modelStr = getComboModelString(step);
  assert.strictEqual(modelStr, "flymux/gpt-5.5");
});

// ── 2. Verify the fix is present in getModelInfo ──────────────────────────────

test("#2778 getModelInfo in src/sse/services/model.ts matches openai-compatible nodes by node.id", () => {
  const src = fs.readFileSync(MODEL_SERVICE_SRC, "utf8");

  // The fix must match node.id alongside node.prefix in the openai-compatible branch.
  // The find() call may span multiple lines, so use a multiline-friendly approach:
  // look for the openaiNodes.find block and check that node.id === prefixToCheck appears
  // within a reasonable range after it.
  const openAIFindIndex = src.indexOf("openaiNodes.find(");
  assert.ok(openAIFindIndex !== -1, "openaiNodes.find( must exist in getModelInfo");

  const snippet = src.slice(openAIFindIndex, openAIFindIndex + 200);
  assert.ok(
    snippet.includes("node.id") && snippet.includes("prefixToCheck"),
    "getModelInfo must match openai-compatible provider nodes by node.id (not only node.prefix) " +
      "so that combo steps storing internal UUID provider ids still resolve correctly (#2778). " +
      `Got: ${snippet.slice(0, 150)}`
  );
});

test("#2778 getModelInfo in src/sse/services/model.ts matches anthropic-compatible nodes by node.id", () => {
  const src = fs.readFileSync(MODEL_SERVICE_SRC, "utf8");

  const anthropicFindIndex = src.indexOf("anthropicNodes.find(");
  assert.ok(anthropicFindIndex !== -1, "anthropicNodes.find( must exist in getModelInfo");

  const snippet = src.slice(anthropicFindIndex, anthropicFindIndex + 200);
  assert.ok(
    snippet.includes("node.id") && snippet.includes("prefixToCheck"),
    "getModelInfo must match anthropic-compatible provider nodes by node.id (not only node.prefix) " +
      "so that combo steps storing internal UUID provider ids still resolve correctly (#2778). " +
      `Got: ${snippet.slice(0, 150)}`
  );
});

// ── 3. Verify the matching logic would resolve UUID-id prefixToCheck to the node ─

test("#2778 matching logic: node with prefix=flymux and id=UUID-id matches when prefixToCheck is UUID-id", () => {
  const mockNode = {
    id: FAKE_UUID_NODE_ID,
    prefix: "flymux",
    type: "openai-compatible",
  };

  const prefixToCheck = FAKE_UUID_NODE_ID; // what getModelInfo receives from a combo step
  const nodes = [mockNode];

  // OLD (broken): only match prefix
  const matchByPrefixOnly = nodes.find((node) => node.prefix === prefixToCheck);
  assert.strictEqual(matchByPrefixOnly, undefined, "Prefix-only match should NOT find the node");

  // NEW (fixed): match prefix OR id
  const matchByPrefixOrId = nodes.find(
    (node) => node.prefix === prefixToCheck || node.id === prefixToCheck
  );
  assert.ok(matchByPrefixOrId !== undefined, "Prefix-or-id match SHOULD find the node");
  assert.strictEqual(matchByPrefixOrId?.id, FAKE_UUID_NODE_ID);
});

test("#2778 matching logic: node with prefix=flymux and id=UUID-id still matches when prefixToCheck is the alias", () => {
  // Verify backward compatibility — existing behavior with alias prefix still works
  const mockNode = {
    id: FAKE_UUID_NODE_ID,
    prefix: "flymux",
    type: "openai-compatible",
  };

  const prefixToCheck = "flymux"; // direct call with alias still works
  const nodes = [mockNode];

  const matchByPrefixOrId = nodes.find(
    (node) => node.prefix === prefixToCheck || node.id === prefixToCheck
  );
  assert.ok(matchByPrefixOrId !== undefined, "Alias-based match must still work after the fix");
  assert.strictEqual(matchByPrefixOrId?.id, FAKE_UUID_NODE_ID);
});

test("custom provider auth lookup search pool maps alias prefixes to internal provider ids", async () => {
  const authSrc = fs.readFileSync(
    path.resolve(__dirname, "../../src/sse/services/auth.ts"),
    "utf8"
  );

  assert.match(
    authSrc,
    /async function getProviderSearchPool\(provider: string\): Promise<string\[]>/,
    "getProviderSearchPool should be async so it can expand custom provider aliases via provider_nodes"
  );
  assert.match(
    authSrc,
    /getProviderNodes\(/,
    "auth lookup should read provider_nodes to map custom prefixes like 78code/micu back to internal provider ids"
  );
  assert.match(
    authSrc,
    /nodePrefix === provider\s*\|\|\s*nodePrefix === canonicalProvider\s*\|\|\s*nodePrefix === canonicalAlias/,
    "auth lookup should match provider node prefixes against the requested alias/canonical provider values"
  );
  assert.match(
    authSrc,
    /searchPool\.add\(nodeId\)/,
    "auth lookup should add the matched custom provider node id into the credential search pool"
  );
});
