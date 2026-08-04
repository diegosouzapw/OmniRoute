import assert from "node:assert/strict";
import { test } from "node:test";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";

test("openai-to-claude ignores zero-length reasoning_content empty string deltas", () => {
  const state = {
    messageStartSent: true,
    thinkingBlockStarted: false,
    thinkingBlockIndex: -1,
    textBlockStarted: false,
    textBlockIndex: -1,
    textBlockClosed: false,
    nextBlockIndex: 0,
    _pendingXmlToolCalls: [],
  };

  const chunk = {
    choices: [
      {
        delta: {
          reasoning_content: "",
        },
      },
    ],
  };

  const results = openaiToClaudeResponse(chunk, state) || [];
  assert.equal(results.length, 0);
  assert.equal(state.thinkingBlockStarted, false);
});
