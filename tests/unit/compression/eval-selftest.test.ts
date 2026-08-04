import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runSelfTest, CONTROL_PAIR } from "../../../open-sse/services/compression/eval/judge.ts";
import type { ModelClient } from "../../../open-sse/services/compression/eval/types.ts";

/** A judge that correctly ranks the control pair (degraded => MATERIALLY_DIFFERS, good => SAME). */
function correctJudge(): ModelClient {
  return {
    async complete(_model, messages) {
      const u = messages.find((m) => m.role === "user")?.content ?? "";
      const degraded = u.includes(CONTROL_PAIR.degraded);
      return { text: degraded ? "VERDICT: MATERIALLY_DIFFERS" : "VERDICT: SAME" };
    },
  };
}

/** A broken judge that always says SAME — must FAIL self-test. */
function brokenJudge(): ModelClient {
  return { async complete() { return { text: "VERDICT: SAME" }; } };
}

describe("judge self-test gate (D-D3)", () => {
  it("a correct judge passes self-test", async () => {
    const r = await runSelfTest(correctJudge(), "judge-model");
    assert.equal(r.passed, true);
  });

  it("a broken judge (always SAME) fails self-test", async () => {
    const r = await runSelfTest(brokenJudge(), "judge-model");
    assert.equal(r.passed, false);
    assert.match(r.detail, /degraded|control/i);
  });
});
