import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SHARED_BOUNDARIES,
  buildCavemanOutputInstruction,
} from "../../../open-sse/services/compression/outputMode.ts";

test("SHARED_BOUNDARIES is exported and non-empty string", () => {
  assert.equal(typeof SHARED_BOUNDARIES, "string");
  assert.ok(SHARED_BOUNDARIES.length > 0);
});

test("SHARED_BOUNDARIES instructs model to write normal for security warnings", () => {
  assert.match(SHARED_BOUNDARIES, /security/i);
  assert.match(SHARED_BOUNDARIES, /normal/i);
});

test("SHARED_BOUNDARIES instructs model to resume terse style after", () => {
  assert.match(SHARED_BOUNDARIES, /resume/i);
});

test("SHARED_BOUNDARIES covers irreversible actions", () => {
  assert.match(SHARED_BOUNDARIES, /irreversible/i);
});

test("SHARED_BOUNDARIES covers multi-step ordered sequences", () => {
  assert.match(SHARED_BOUNDARIES, /sequence|ordered/i);
});

test("buildCavemanOutputInstruction includes SHARED_BOUNDARIES text", () => {
  const instruction = buildCavemanOutputInstruction({ enabled: true, intensity: "full" });
  assert.ok(instruction.includes(SHARED_BOUNDARIES), "instruction must embed SHARED_BOUNDARIES");
});

test("buildCavemanOutputInstruction includes persistence clause for all intensities", () => {
  for (const intensity of ["lite", "full", "ultra"] as const) {
    const instr = buildCavemanOutputInstruction({ enabled: true, intensity });
    assert.match(
      instr,
      /active every response|until user asks/i,
      `${intensity} must have persistence clause`
    );
  }
});
