import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildGradePrompt, parseGradeVerdict } from "../../../open-sse/services/compression/eval/grader.ts";

describe("gold grader", () => {
  it("buildGradePrompt embeds the answer and the gold", () => {
    const msgs = buildGradePrompt("returns three", "3");
    const joined = msgs.map((m) => m.content).join("\n");
    assert.match(joined, /returns three/);
    assert.match(joined, /3/);
    assert.match(joined.toUpperCase(), /CORRECT|INCORRECT/);
  });

  it("parseGradeVerdict reads CORRECT / INCORRECT", () => {
    assert.equal(parseGradeVerdict("VERDICT: CORRECT").correct, true);
    assert.equal(parseGradeVerdict("verdict: incorrect — wrong number").correct, false);
  });

  it("parseGradeVerdict defaults to incorrect on unparseable output (never credits a wrong answer)", () => {
    assert.equal(parseGradeVerdict("hmm, hard to say").correct, false);
  });
});
