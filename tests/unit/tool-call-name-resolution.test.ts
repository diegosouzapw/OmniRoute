import test from "node:test";
import assert from "node:assert/strict";

const {
  appendToolCallNameDelta,
  resolveDeclaredToolName,
  matchesCustomToolDeclaration,
} = await import("../../open-sse/utils/toolCallName.ts");

// ── Streamed name accumulation ──────────────────────────────────────────────
// A provider may split `function.name` across deltas, re-send the whole name, or
// re-send a fragment. Keeping a single delta (the previous last-wins / first-wins
// behaviour) turned a declared `functions__exec` into a bare `exec` fragment or a
// `functions__` prefix, which then missed both the custom/freeform classification
// and the {namespace, name} restore.

test("appendToolCallNameDelta: a single delta is stored as-is", () => {
  assert.equal(appendToolCallNameDelta("", "functions__exec"), "functions__exec");
  assert.equal(appendToolCallNameDelta(undefined, "exec"), "exec");
});

test("appendToolCallNameDelta: split name deltas are concatenated", () => {
  assert.equal(appendToolCallNameDelta("functions__", "exec"), "functions__exec");
  assert.equal(appendToolCallNameDelta("functions", "__exec"), "functions__exec");
  let accumulated = "";
  for (const delta of ["func", "tions", "__ex", "ec"]) {
    accumulated = appendToolCallNameDelta(accumulated, delta);
  }
  assert.equal(accumulated, "functions__exec");
});

test("appendToolCallNameDelta: repeated or progressive deltas never duplicate", () => {
  assert.equal(appendToolCallNameDelta("functions__exec", "functions__exec"), "functions__exec");
  assert.equal(appendToolCallNameDelta("functions__", "functions__exec"), "functions__exec");
  assert.equal(appendToolCallNameDelta("functions__exec", "exec"), "functions__exec");
  assert.equal(appendToolCallNameDelta("exec", ""), "exec");
});

// ── Declared-name resolution ────────────────────────────────────────────────

test("resolveDeclaredToolName: exact qualified and flat spellings match", () => {
  assert.equal(resolveDeclaredToolName(["functions__exec"], "functions__exec"), "functions__exec");
  assert.equal(resolveDeclaredToolName(["exec"], "exec"), "exec");
});

test("resolveDeclaredToolName: dotted alias maps onto the flattened wire name", () => {
  assert.equal(resolveDeclaredToolName(["functions__exec"], "functions.exec"), "functions__exec");
});

test("resolveDeclaredToolName: a unique bare leaf resolves", () => {
  assert.equal(resolveDeclaredToolName(["functions__exec"], "exec"), "functions__exec");
});

test("resolveDeclaredToolName: an ambiguous bare leaf stays unresolved", () => {
  assert.equal(resolveDeclaredToolName(["a__exec", "b__exec"], "exec"), null);
});

test("resolveDeclaredToolName: an explicit flat declaration blocks the bare leaf", () => {
  assert.equal(resolveDeclaredToolName(["functions__exec"], "exec", ["exec"]), null);
});

test("resolveDeclaredToolName: fragments and unknown names do not match", () => {
  assert.equal(resolveDeclaredToolName(["functions__exec"], "functions"), null);
  assert.equal(resolveDeclaredToolName(["functions__exec"], "functions__ex"), null);
  assert.equal(resolveDeclaredToolName([], "exec"), null);
  assert.equal(resolveDeclaredToolName(["functions__exec"], ""), null);
});

// ── Custom/freeform classification ──────────────────────────────────────────

test("matchesCustomToolDeclaration: bare leaf of a declared namespace custom tool is custom", () => {
  assert.equal(
    matchesCustomToolDeclaration({
      customToolNames: new Set(["functions__exec"]),
      declaredFunctionSchemas: new Map([["functions__exec", { type: "object" }]]),
      toolName: "exec",
    }),
    true
  );
});

test("matchesCustomToolDeclaration: a flat function tool of the same bare name keeps its identity", () => {
  assert.equal(
    matchesCustomToolDeclaration({
      customToolNames: new Set(["functions__exec"]),
      declaredFunctionSchemas: new Map([
        ["exec", { type: "object" }],
        ["functions__exec", { type: "object" }],
      ]),
      toolName: "exec",
    }),
    false
  );
});

test("matchesCustomToolDeclaration: no custom declarations never classifies as custom", () => {
  assert.equal(
    matchesCustomToolDeclaration({
      customToolNames: new Set(),
      declaredFunctionSchemas: new Map([["exec", { type: "object" }]]),
      toolName: "exec",
    }),
    false
  );
  assert.equal(
    matchesCustomToolDeclaration({
      customToolNames: null,
      declaredFunctionSchemas: null,
      toolName: "exec",
    }),
    false
  );
});
