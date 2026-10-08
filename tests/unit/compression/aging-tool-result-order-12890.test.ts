import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  replaceTextContent,
  type ChatMessageLike,
} from "../../../open-sse/services/compression/messageContent.ts";
import { applyAging } from "../../../open-sse/services/compression/progressiveAging.ts";

// ─── #12890 — aged tool_result turns must keep tool_result first ─────────────
// The Anthropic Messages API requires the `tool_result` blocks answering a
// `tool_use` to lead the following user message. Aging a tool-result-only user
// turn used to prepend the `[COMPRESSED:aging:…]` annotation, producing
// ["text", "tool_result"] and a 400 from upstream.

function toolResultTurn(id: string): ChatMessageLike {
  return {
    role: "user",
    content: [{ type: "tool_result", tool_use_id: id, content: "ls: 3 files" }],
  };
}

function blockTypes(msg: unknown): string[] {
  const content = (msg as ChatMessageLike).content;
  return Array.isArray(content) ? content.map((b) => (b as { type?: string }).type ?? "") : [];
}

describe("aging a tool_result turn (#12890)", () => {
  it("keeps tool_result first through applyAging", () => {
    // distanceFromEnd of index 2 is 5 (> moderate: 3) → the fullSummary tier,
    // which is where setContent/replaceTextContent injects the tag.
    const messages: ChatMessageLike[] = [
      { role: "user", content: "start the task" },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_01", name: "bash", input: {} }],
      },
      toolResultTurn("toolu_01"),
      { role: "assistant", content: "three files" },
      { role: "user", content: "and now the second one" },
      { role: "assistant", content: "done" },
      { role: "user", content: "thanks" },
      { role: "assistant", content: "you are welcome" },
    ];

    const { messages: aged } = applyAging(messages);
    const types = blockTypes(aged[2]);

    assert.deepEqual(types, ["tool_result", "text"], `got ${JSON.stringify(types)}`);
    const annotation = (aged[2] as ChatMessageLike).content as Array<{ text?: string }>;
    assert.match(annotation[1].text ?? "", /^\[COMPRESSED:aging:/);
  });

  it("still puts the annotation first when the turn carries no tool_result", () => {
    const msg: ChatMessageLike = {
      role: "user",
      content: [{ type: "image", source: { foo: 1 } }],
    };

    const out = replaceTextContent(msg, "NEWTEXT");

    assert.deepEqual(blockTypes(out), ["text", "image"]);
  });
});
