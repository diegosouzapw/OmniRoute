import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { aggregateRecords } from "../../../open-sse/services/compression/eval/aggregate.ts";
import type { EvalRecord, RunStamps } from "../../../open-sse/services/compression/eval/types.ts";

const stamps: RunStamps = { answerModel: "m", judgeModel: "j", corpusHash: "abc", sampleSize: "all" };

const records: EvalRecord[] = [
  { id: "p1", kind: "prose", fidelity: "same", goldFull: true, goldCompressed: true,
    savings: { tokensBefore: 100, tokensAfter: 50, ratio: 0.5 }, errored: false },
  { id: "p2", kind: "prose", fidelity: "materially-differs", goldFull: true, goldCompressed: false,
    savings: { tokensBefore: 200, tokensAfter: 80, ratio: 0.4 }, errored: false },
  { id: "c1", kind: "code", fidelity: "same", goldFull: null, goldCompressed: null,
    savings: { tokensBefore: 60, tokensAfter: 30, ratio: 0.5 }, errored: false },
  { id: "e1", kind: "logs", fidelity: "unparseable", goldFull: null, goldCompressed: null,
    savings: { tokensBefore: 0, tokensAfter: 0, ratio: 1 }, errored: true },
];

describe("eval aggregate", () => {
  it("excludes errored records from aggregates but counts them", () => {
    const report = aggregateRecords(records, stamps, { partial: false, totalCostUsd: 0 });
    assert.equal(report.overall.casesScored, 3);
    assert.equal(report.overall.casesErrored, 1);
  });

  it("computes fidelity-preserved % overall (same / scored)", () => {
    const report = aggregateRecords(records, stamps, { partial: false, totalCostUsd: 0 });
    // 2 of 3 scored are "same"
    assert.equal(report.overall.fidelityPreservedPct, 66.7);
  });

  it("computes gold-accuracy delta (compressed-correct minus full-correct) over gold cases", () => {
    const report = aggregateRecords(records, stamps, { partial: false, totalCostUsd: 0 });
    // prose gold cases: full 2/2 correct, compressed 1/2 correct => delta -50%
    const prose = report.perKind.find((k) => k.kind === "prose")!;
    assert.equal(prose.goldAccuracyDeltaPct, -50);
  });

  it("carries the stamps and the partial flag through", () => {
    const report = aggregateRecords(records, stamps, { partial: true, totalCostUsd: 1.23 });
    assert.equal(report.stamps.corpusHash, "abc");
    assert.equal(report.partial, true);
    assert.equal(report.totalCostUsd, 1.23);
  });
});
