import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatReport } from "../../../open-sse/services/compression/eval/report.ts";
import type { EvalReport } from "../../../open-sse/services/compression/eval/types.ts";

const report: EvalReport = {
  stamps: { answerModel: "gpt-x", judgeModel: "judge-y", corpusHash: "deadbeef", sampleSize: 5 },
  partial: true,
  totalCostUsd: 0.42,
  overall: { casesScored: 4, casesErrored: 1, fidelityPreservedPct: 75, goldAccuracyDeltaPct: -25, meanRatio: 0.5 },
  perKind: [{ kind: "prose", casesScored: 2, fidelityPreservedPct: 50, goldAccuracyDeltaPct: -50, meanRatio: 0.45 }],
};

describe("eval report writer", () => {
  it("stamps the answer model, judge model and corpus hash in the header", () => {
    const md = formatReport(report);
    assert.match(md, /gpt-x/);
    assert.match(md, /judge-y/);
    assert.match(md, /deadbeef/);
  });

  it("flags a partial run prominently (never silent)", () => {
    assert.match(formatReport(report), /PARTIAL/i);
  });

  it("renders a per-kind table row and the overall fidelity %", () => {
    const md = formatReport(report);
    assert.match(md, /prose/);
    assert.match(md, /75/);
  });

  it("a complete run is not labelled partial", () => {
    const md = formatReport({ ...report, partial: false });
    assert.doesNotMatch(md, /PARTIAL/i);
  });
});
