/**
 * session-dedup must not replace content in the current turn (the messages after
 * the last assistant message). An agent that re-reads a file it read earlier would
 * otherwise get `[dedup:ref ...]` back instead of the file, conclude the read was
 * lost, and read it again with another tool.
 * Run: node --import tsx/esm --test tests/unit/compression/session-dedup-current-turn.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";

const FILE = Array.from(
  { length: 12 },
  (_, i) => `${i + 1}\tfinal line${i} = cart.items[${i}];`
).join("\n");
const MARKER = /\[dedup:ref sha=[0-9a-f]{24}\]/;

type Msg = { role: string; content: string | null; [key: string]: unknown };

function readCall(id: string): Msg {
  return {
    role: "assistant",
    content: null,
    tool_calls: [
      { id, type: "function", function: { name: "Read", arguments: '{"path":"cart.dart"}' } },
    ],
  };
}

function apply(messages: Msg[]) {
  const result = sessionDedupEngine.apply({ model: "gpt-4", messages });
  return { result, messages: result.body.messages as Msg[] };
}

describe("session-dedup current turn", () => {
  it("keeps a re-read tool result intact while it is the newest message", () => {
    const { messages } = apply([
      { role: "user", content: "animate the cart" },
      readCall("c1"),
      { role: "tool", tool_call_id: "c1", content: FILE },
      readCall("c2"),
      { role: "tool", tool_call_id: "c2", content: FILE },
    ]);
    assert.equal(messages[4].content, FILE);
    assert.equal(messages[2].content, FILE);
  });

  it("keeps a repeated block in the newest user message intact", () => {
    const { result, messages } = apply([
      { role: "user", content: `Here is the code:\n${FILE}` },
      { role: "assistant", content: "I understand the code." },
      { role: "user", content: `Please review again:\n${FILE}` },
    ]);
    assert.equal(result.compressed, false);
    assert.ok(messages[2].content?.includes(FILE));
  });

  it("still dedups the re-read once a later assistant turn follows it", () => {
    const { messages } = apply([
      { role: "user", content: "animate the cart" },
      readCall("c1"),
      { role: "tool", tool_call_id: "c1", content: FILE },
      readCall("c2"),
      { role: "tool", tool_call_id: "c2", content: FILE },
      { role: "assistant", content: "Done." },
      { role: "user", content: "thanks" },
    ]);
    assert.equal(messages[2].content, FILE);
    assert.match(String(messages[4].content), MARKER);
  });
});
