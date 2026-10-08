/**
 * Lite must not truncate the results of the latest tool calls (the tool
 * messages after the last assistant message). The model asked for that content
 * this turn; cutting it to 2000 chars left it re-reading the same file forever,
 * because every re-read was cut (or deduped against the cut copy) again.
 * Run: node --import tsx/esm --test tests/unit/compression/lite-current-turn.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { compressToolResults } from "../../../open-sse/services/compression/lite.ts";
import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";

const FILE = Array.from({ length: 400 }, (_, i) => `${i + 1}: def metric_${i}(x): return x`).join(
  "\n"
);

type Msg = { role: string; content: string | null; [key: string]: unknown };

function readCall(id: string): Msg {
  return {
    role: "assistant",
    content: null,
    tool_calls: [
      { id, type: "function", function: { name: "read", arguments: '{"filePath":"/s.py"}' } },
    ],
  };
}

describe("lite tool-result truncation and the current turn", () => {
  it("keeps the newest tool result whole", () => {
    const { body } = compressToolResults({
      messages: [
        { role: "user", content: "read it" },
        readCall("c1"),
        { role: "tool", tool_call_id: "c1", content: FILE },
      ],
    });
    assert.equal(body.messages![2].content, FILE);
  });

  it("still truncates tool results from earlier turns", () => {
    const { body, applied } = compressToolResults({
      messages: [
        { role: "user", content: "read it" },
        readCall("c1"),
        { role: "tool", tool_call_id: "c1", content: FILE },
        readCall("c2"),
        { role: "tool", tool_call_id: "c2", content: FILE },
      ],
    });
    assert.equal(applied, true);
    assert.match(String(body.messages![2].content), /\.\.\.\[truncated\]$/);
    assert.equal(body.messages![4].content, FILE);
  });

  it("keeps a re-read whole through the default session-dedup + lite pipeline", () => {
    const result = applyCompression(
      {
        messages: [
          { role: "user", content: "read it" },
          readCall("c1"),
          { role: "tool", tool_call_id: "c1", content: FILE },
          readCall("c2"),
          { role: "tool", tool_call_id: "c2", content: FILE },
        ],
      },
      "stacked",
      {
        config: {
          enabled: true,
          defaultMode: "off",
          autoTriggerTokens: 0,
          cacheMinutes: 5,
          preserveSystemPrompt: true,
          comboOverrides: {},
          engines: {},
          activeComboId: null,
          stackedPipeline: [{ engine: "session-dedup" }, { engine: "lite" }],
        },
      }
    );
    const messages = result.body.messages as Msg[];
    assert.equal(messages[4].content, FILE);
  });
});
