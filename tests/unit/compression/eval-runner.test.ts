import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runEval } from "../../../open-sse/services/compression/eval/runner.ts";
import { CONTROL_PAIR } from "../../../open-sse/services/compression/eval/judge.ts";
import type { EvalCase, ModelClient } from "../../../open-sse/services/compression/eval/types.ts";

const corpus: EvalCase[] = [
  { id: "p1", kind: "prose", context: "the sky is blue", question: "what color is the sky?", gold: "blue" },
  { id: "c1", kind: "code", context: "function f(){return 7}", question: "what does f return?", gold: "7" },
];

/** Stub that answers questions, judges fidelity, grades gold — keyed off prompt content. */
function smartStub(opts: { answerModel: string; judgeModel: string }): ModelClient {
  return {
    async complete(model, messages) {
      const sys = messages.find((m) => m.role === "system")?.content ?? "";
      const user = messages.find((m) => m.role === "user")?.content ?? "";
      // Self-test control pair (judge): rank degraded vs good correctly.
      if (model === opts.judgeModel && user.includes(CONTROL_PAIR.degraded)) {
        return { text: "VERDICT: MATERIALLY_DIFFERS", usdCost: 0.01 };
      }
      if (model === opts.judgeModel && /judge|materially/i.test(sys)) {
        return { text: "VERDICT: SAME", usdCost: 0.01 };
      }
      // Gold grader: always CORRECT for this stub.
      if (/grader|correct\|incorrect/i.test(sys)) return { text: "VERDICT: CORRECT", usdCost: 0.01 };
      // Answer generation.
      return { text: "blue and seven", usdCost: 0.01 };
    },
  };
}

const baseOpts = {
  config: { enabled: true, defaultMode: "lite", enginesExplicit: false } as any,
  comboId: null,
  combos: {},
  answerModel: "answer-model",
  judgeModel: "judge-model",
  provider: "test",
  costCapUsd: 0,
  sample: undefined as number | undefined,
};

describe("eval runner", () => {
  it("aborts when the judge fails self-test (no scores emitted)", async () => {
    const broken: ModelClient = { async complete() { return { text: "VERDICT: SAME" }; } };
    const r = await runEval({ ...baseOpts, corpus, client: broken });
    assert.equal(r.aborted, true);
    assert.match(r.abortReason ?? "", /self-test/i);
    assert.equal(r.report, null);
  });

  it("produces an aggregated report with a passing judge", async () => {
    const r = await runEval({ ...baseOpts, corpus, client: smartStub({ answerModel: "answer-model", judgeModel: "judge-model" }) });
    assert.equal(r.aborted, false);
    assert.ok(r.report);
    assert.equal(r.report!.overall.casesScored, 2);
    assert.equal(r.report!.stamps.answerModel, "answer-model");
    assert.match(r.report!.stamps.corpusHash, /^[0-9a-f]{64}$/);
  });

  it("an errored case (model throws) is excluded but counted", async () => {
    let n = 0;
    const flaky: ModelClient = {
      async complete(model, messages) {
        const user = messages.find((m) => m.role === "user")?.content ?? "";
        if (model === "judge-model" && user.includes(CONTROL_PAIR.degraded)) return { text: "VERDICT: MATERIALLY_DIFFERS" };
        if (model === "judge-model") return { text: "VERDICT: SAME" };
        n += 1;
        if (n === 2) throw new Error("upstream 500"); // fail the 2nd answer call
        return { text: "ok", usdCost: 0.01 };
      },
    };
    const r = await runEval({ ...baseOpts, corpus, client: flaky });
    assert.equal(r.aborted, false);
    assert.equal(r.report!.overall.casesErrored, 1);
  });

  it("the cost cap stops the run and flags partial", async () => {
    const r = await runEval({
      ...baseOpts,
      costCapUsd: 0.025, // self-test (2 calls) + a little; cap trips during the case loop
      corpus,
      client: smartStub({ answerModel: "answer-model", judgeModel: "judge-model" }),
    });
    assert.equal(r.aborted, false);
    assert.equal(r.report!.partial, true);
  });

  it("--sample N limits the cases scored", async () => {
    const r = await runEval({ ...baseOpts, sample: 1, corpus, client: smartStub({ answerModel: "answer-model", judgeModel: "judge-model" }) });
    assert.equal(r.report!.overall.casesScored + r.report!.overall.casesErrored, 1);
  });
});
