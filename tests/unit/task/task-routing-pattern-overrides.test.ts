/**
 * Regression coverage for `patternOverrides`: an operator replaces the built-in
 * TASK_PATTERNS for one task type through `settings.taskRouting`, within the schema's
 * bounds, without affecting the other task types.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  detectTaskType,
  setTaskRoutingConfig,
  getTaskRoutingConfig,
  getDefaultTaskModelMap,
  getDefaultTaskPatterns,
} from "../../../open-sse/services/taskAwareRouter.ts";
import { updateTaskRoutingSchema } from "../../../src/shared/validation/schemas/routing.ts";

function resetConfig(): void {
  setTaskRoutingConfig({
    enabled: false,
    taskModelMap: getDefaultTaskModelMap(),
    detectionEnabled: true,
    patternOverrides: undefined,
  });
}

test("with no override, detection still uses the built-in English patterns", () => {
  resetConfig();
  assert.equal(
    detectTaskType({ messages: [{ role: "user", content: "write a function" }] }),
    "coding"
  );
});

test("a per-task-type override fully replaces the built-in patterns for that task type", () => {
  resetConfig();
  setTaskRoutingConfig({
    patternOverrides: { coding: { patterns: ["schreibe eine funktion"] } },
  });

  // The translated pattern now matches...
  assert.equal(
    detectTaskType({ messages: [{ role: "user", content: "schreibe eine funktion bitte" }] }),
    "coding"
  );
  // ...and the English default it replaced no longer does, for this task type.
  assert.notEqual(
    detectTaskType({ messages: [{ role: "user", content: "write a function" }] }),
    "coding"
  );
});

test("an override on one task type does not affect other task types", () => {
  resetConfig();
  setTaskRoutingConfig({
    patternOverrides: { coding: { patterns: ["schreibe eine funktion"] } },
  });
  assert.equal(
    detectTaskType({ messages: [{ role: "user", content: "please summarize this article" }] }),
    "summarization"
  );
});

test("userPatterns override is independent of patterns override", () => {
  resetConfig();
  setTaskRoutingConfig({
    patternOverrides: { coding: { userPatterns: ["ecrire du code"] } },
  });
  // patterns still the English defaults
  assert.equal(
    detectTaskType({ messages: [{ role: "user", content: "write a function" }] }),
    "coding"
  );
  // userPatterns replaced
  assert.equal(
    detectTaskType({ messages: [{ role: "user", content: "ecrire du code stp" }] }),
    "coding"
  );
});

test("getDefaultTaskPatterns exposes the built-ins unmodified, for the settings UI", () => {
  resetConfig();
  const defaults = getDefaultTaskPatterns();
  assert.ok(defaults.coding.patterns.includes("write a function"));
  const beforeOverride = getTaskRoutingConfig();
  assert.equal(beforeOverride.patternOverrides, undefined);
});

// ── Validation (anti-DoS bounds, same precedent as combo guardrail substrings) ──────

test("updateTaskRoutingSchema accepts a well-formed patternOverrides payload", () => {
  const result = updateTaskRoutingSchema.safeParse({
    patternOverrides: { coding: { patterns: ["schreibe eine funktion"] } },
  });
  assert.ok(result.success, JSON.stringify(result.success ? null : result.error.issues));
});

test("updateTaskRoutingSchema rejects more than 50 patterns for one task type", () => {
  const result = updateTaskRoutingSchema.safeParse({
    patternOverrides: {
      coding: { patterns: Array.from({ length: 51 }, (_, i) => `pattern-${i}`) },
    },
  });
  assert.equal(result.success, false);
});

test("updateTaskRoutingSchema rejects a single pattern longer than 500 chars", () => {
  const result = updateTaskRoutingSchema.safeParse({
    patternOverrides: { coding: { patterns: ["x".repeat(501)] } },
  });
  assert.equal(result.success, false);
});

test("updateTaskRoutingSchema rejects an unknown task type key", () => {
  const result = updateTaskRoutingSchema.safeParse({
    patternOverrides: { notATaskType: { patterns: ["x"] } },
  });
  assert.equal(result.success, false);
});
