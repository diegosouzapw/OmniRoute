/**
 * tests/unit/ui/live-compression-accumulate.test.ts
 *
 * F5.1 coverage gap (F3.3): the `useLiveCompression` accumulator (`accumulateRun`)
 * — which folds incoming `compression.completed` payloads into the run list — was
 * exported "for unit tests" but never tested. This pins ordering + the cap.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { accumulateRun } from "../../../src/hooks/useLiveCompression.ts";
import type { CompressionRunModel } from "../../../src/app/(dashboard)/dashboard/compression/studio/compressionFlowModel.ts";
import type { CompressionCompletedPayload } from "../../../src/lib/events/types.ts";

function payload(requestId: string): CompressionCompletedPayload {
  return {
    requestId,
    comboId: "my-combo",
    mode: "stacked",
    originalTokens: 1000,
    compressedTokens: 600,
    savingsPercent: 40,
    engineBreakdown: [
      {
        engine: "rtk",
        originalTokens: 1000,
        compressedTokens: 600,
        savingsPercent: 40,
        techniquesUsed: ["tool-output-trim"],
        durationMs: 3,
      },
    ],
    timestamp: 1718000000000,
  };
}

describe("accumulateRun — live compression run accumulator (F3.3)", () => {
  it("adds the first run derived from the payload (requestId carried through)", () => {
    const runs = accumulateRun([], payload("r1"));
    assert.equal(runs.length, 1);
    assert.equal(runs[0].requestId, "r1");
    assert.equal(runs[0].mode, "stacked");
  });

  it("prepends so the list is most-recent-first", () => {
    let runs: CompressionRunModel[] = [];
    runs = accumulateRun(runs, payload("r1"));
    runs = accumulateRun(runs, payload("r2"));
    runs = accumulateRun(runs, payload("r3"));
    assert.deepEqual(
      runs.map((r) => r.requestId),
      ["r3", "r2", "r1"],
    );
  });

  it("caps the list at maxRuns, dropping the oldest", () => {
    let runs: CompressionRunModel[] = [];
    for (const id of ["a", "b", "c", "d"]) {
      runs = accumulateRun(runs, payload(id), /* maxRuns */ 2);
    }
    assert.equal(runs.length, 2, "never grows beyond maxRuns");
    assert.deepEqual(
      runs.map((r) => r.requestId),
      ["d", "c"],
      "keeps the 2 newest, newest-first; oldest (a, b) dropped",
    );
  });

  it("does not mutate the previous array (returns a new list)", () => {
    const prev = accumulateRun([], payload("r1"));
    const next = accumulateRun(prev, payload("r2"));
    assert.equal(prev.length, 1, "input array is left untouched");
    assert.notEqual(prev, next);
  });
});
