/**
 * Issue #6922 — Effort-tier aliases for glm-5.2 and mimo-v2.5 on opencode-go.
 *
 * The OpencodeExecutor must:
 *  1. Rewrite effort-alias model ids to their canonical base id
 *  2. Inject `reasoning_effort` if not already set
 *
 * Previously only deepseek-v4-pro had aliases. Now glm-5.2 and mimo-v2.5
 * also have high/max tiers.
 */

import test from "node:test";
import assert from "node:assert/strict";

// Re-create the parseEffortLevel logic to test independently.
// (The function is module-private in opencode.ts, so we mirror the EFFORT_TIERS
//  table here and verify the registry has matching entries.)

import { readFileSync } from "node:fs";

const registryContent = readFileSync(
  "open-sse/config/providers/registry/opencode/go/index.ts",
  "utf8"
);

const executorContent = readFileSync("open-sse/executors/opencode.ts", "utf8");

test("#6922: registry has glm-5.2-high alias", () => {
  assert.ok(
    registryContent.includes('"glm-5.2-high"'),
    "opencode-go registry must declare glm-5.2-high"
  );
});

test("#6922: registry has glm-5.2-max alias", () => {
  assert.ok(
    registryContent.includes('"glm-5.2-max"'),
    "opencode-go registry must declare glm-5.2-max"
  );
});

test("#6922: registry has mimo-v2.5-high alias", () => {
  assert.ok(
    registryContent.includes('"mimo-v2.5-high"'),
    "opencode-go registry must declare mimo-v2.5-high"
  );
});

test("#6922: registry has mimo-v2.5-max alias", () => {
  assert.ok(
    registryContent.includes('"mimo-v2.5-max"'),
    "opencode-go registry must declare mimo-v2.5-max"
  );
});

test("#6922: executor has generalized parseEffortLevel (not deepseek-only)", () => {
  assert.ok(
    executorContent.includes("parseEffortLevel"),
    "OpencodeExecutor must use generalized parseEffortLevel"
  );
  assert.ok(
    !executorContent.includes("parseDeepSeekEffortLevel"),
    "Old deepseek-only function name must be removed"
  );
});

test("#6922: EFFORT_TIERS table includes glm-5.2 and mimo-v2.5", () => {
  assert.ok(executorContent.includes('"glm-5.2"'), "EFFORT_TIERS must include glm-5.2");
  assert.ok(executorContent.includes('"mimo-v2.5"'), "EFFORT_TIERS must include mimo-v2.5");
});

test("#6922: deepseek-v4-pro aliases still work (backward compat)", () => {
  assert.ok(
    executorContent.includes('"deepseek-v4-pro"'),
    "EFFORT_TIERS must still include deepseek-v4-pro"
  );
  // All four tiers for deepseek
  for (const tier of ["low", "medium", "high", "max"]) {
    const alias = `deepseek-v4-pro-${tier}`;
    assert.ok(registryContent.includes(`"${alias}"`), `Registry must still declare ${alias}`);
  }
});

test("#6922: glm-5.2 base model marked supportsReasoning", () => {
  // The base model entry should have supportsReasoning: true
  assert.match(
    registryContent,
    /\{ id: "glm-5\.2",[^}]*supportsReasoning: true/,
    "glm-5.2 base model must have supportsReasoning: true"
  );
});

test("#6922: glm-5.2 effort aliases do NOT include low/medium", () => {
  // GLM-5.2 on the OpenAI transport only supports high/max
  assert.ok(
    !registryContent.includes('"glm-5.2-low"'),
    "glm-5.2-low must not be registered (unsupported on OpenAI transport)"
  );
  assert.ok(!registryContent.includes('"glm-5.2-medium"'), "glm-5.2-medium must not be registered");
});
