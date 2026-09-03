import test from "node:test";
import assert from "node:assert/strict";

const { parseReasoningEffortsOverride } =
  await import("../../../src/shared/reasoning/reasoningEffortsOverride.ts");

test("parses native reasoning efforts using only ASCII commas", () => {
  assert.deepEqual(parseReasoningEffortsOverride("none, low,medium, high, xhigh,max,ultra"), {
    ok: true,
    efforts: ["none", "low", "medium", "high", "xhigh", "max", "ultra"],
  });
});

test("strips whitespace, CR/LF, NBSP, BOM, and zero-width edge characters", () => {
  assert.deepEqual(
    parseReasoningEffortsOverride("﻿​ low\r\n, max‍ , ultra⁠"),
    { ok: true, efforts: ["low", "max", "ultra"] }
  );
});

test("rejects empty, duplicate, unknown, and non-ASCII-comma input", () => {
  for (const input of [
    "",
    "low,",
    ",low",
    "low,,high",
    "low, low",
    "LOW, low",
    "minimal,low",
    "low,unknown",
    "low，high",
    "low、high",
  ]) {
    const parsed = parseReasoningEffortsOverride(input);
    assert.equal(parsed.ok, false, input);
  }
});

test("does not strip invisible characters from the middle of an effort", () => {
  assert.equal(parseReasoningEffortsOverride("l​ow,high").ok, false);
});
