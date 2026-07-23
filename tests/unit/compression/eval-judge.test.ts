import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildJudgePrompt, parseJudgeVerdict } from "../../../open-sse/services/compression/eval/judge.ts";

describe("fidelity judge", () => {
  it("buildJudgePrompt embeds both answers and asks for a SAME/DIFFERENT verdict", () => {
    const msgs = buildJudgePrompt("the cat sat", "a cat was sitting");
    const joined = msgs.map((m) => m.content).join("\n");
    assert.match(joined, /the cat sat/);
    assert.match(joined, /a cat was sitting/);
    assert.match(joined.toUpperCase(), /SAME|MATERIALLY/);
  });

  it("parseJudgeVerdict maps a SAME verdict", () => {
    assert.equal(parseJudgeVerdict("Verdict: SAME"), "same");
  });

  it("parseJudgeVerdict maps a MATERIALLY_DIFFERS verdict (case/format tolerant)", () => {
    assert.equal(parseJudgeVerdict("VERDICT: materially_differs\nreason: omitted the error"), "materially-differs");
    assert.equal(parseJudgeVerdict("differs materially"), "materially-differs");
  });

  it("parseJudgeVerdict returns 'unparseable' for noise", () => {
    assert.equal(parseJudgeVerdict("I am not sure, could you clarify?"), "unparseable");
  });
});
