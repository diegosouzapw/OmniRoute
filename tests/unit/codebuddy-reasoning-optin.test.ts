// #2071 — CodeBuddy forced reasoning_effort:"medium" + reasoning_summary:"auto"
// on requests where the client never asked for reasoning, tripping CodeBuddy's
// content filter ("model return error"). Reasoning params must be opt-in.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";

describe("CodeBuddyCnExecutor reasoning params are opt-in (#2071)", () => {
  const exec = new CodeBuddyCnExecutor();

  it("does NOT force reasoning when the client did not request it", () => {
    const out = exec.transformRequest(
      "glm-5.2",
      { messages: [{ role: "user", content: "hi" }] },
      false,
      {}
    ) as Record<string, unknown>;
    assert.equal(out.reasoning_effort, undefined);
    assert.equal(out.reasoning_summary, undefined);
  });

  it("mirrors reasoning_summary:auto when the client explicitly requested reasoning", () => {
    const out = exec.transformRequest(
      "glm-5.2",
      { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      false,
      {}
    ) as Record<string, unknown>;
    assert.equal(out.reasoning_effort, "high");
    assert.equal(out.reasoning_summary, "auto");
  });

  it("omits reasoning_effort for none/off and adds no reasoning_summary", () => {
    const out = exec.transformRequest(
      "glm-5.2",
      { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" },
      false,
      {}
    ) as Record<string, unknown>;
    assert.equal(out.reasoning_effort, undefined);
    assert.equal(out.reasoning_summary, undefined);
  });
});
