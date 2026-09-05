// #2071 — CodeBuddy forced reasoning_effort:"medium" + reasoning_summary:"auto"
// on requests where the client never asked for reasoning, tripping CodeBuddy's
// content filter ("model return error"). Reasoning params must be opt-in.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CodeBuddyCnExecutor } from "../../../open-sse/executors/codebuddy-cn.ts";

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

  it("replaces agent system prompts in top-level system field", () => {
    const out = exec.transformRequest(
      "glm-5.2",
      {
        system: "You are Claude Code, Anthropic's official CLI for software engineering",
        messages: [{ role: "user", content: "check this" }],
      },
      false,
      {}
    ) as Record<string, unknown>;

    assert.equal(
      out.system,
      "You are a helpful AI assistant that helps with software engineering tasks.",
    );
  });

  it("preserves non-agent system prompts in top-level system field", () => {
    const out = exec.transformRequest(
      "glm-5.2",
      {
        system: "You are a helpful coding tutor for beginner developers.",
        messages: [{ role: "user", content: "check this" }],
      },
      false,
      {}
    ) as Record<string, unknown>;

    assert.equal(out.system, "You are a helpful coding tutor for beginner developers.");
  });

  it("replaces agent system prompts in messages array preserving typed content shape", () => {
    const out = exec.transformRequest(
      "glm-5.2",
      {
        messages: [
          {
            role: "system",
            content: [{ type: "text", text: "You are Cursor, an AI coding agent" }],
          },
          { role: "user", content: "Hello" },
        ],
      },
      false,
      {}
    ) as Record<string, unknown>;

    const msgs = out.messages as Array<{ role: string; content?: unknown }>;
    const system = msgs.find((m) => m.role === "system");
    assert.deepEqual(system, {
      role: "system",
      content: [{ type: "text", text: "You are a helpful AI assistant that helps with software engineering tasks." }],
    });
    assert.equal(system && (system as { content?: unknown }).content, msgs[0].content);
  });
});
