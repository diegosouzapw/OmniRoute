/**
 * TDD tests for CCR skip-on-tool-outputs behavior (Fix 1).
 *
 * Background: when OmniRoute is used as a chat-completion PROVIDER (not as an
 * MCP server), the upstream LLM cannot call `omniroute_ccr_retrieve` to
 * expand CCR markers. Replacing tool outputs with `[CCR retrieve hash=X
 * chars=Y]` markers therefore breaks the agent loop — the LLM sees an
 * opaque placeholder where the actual tool result should be and stalls.
 *
 * Fix: CCR must preserve tool-role messages and Anthropic-style tool_result
 * parts verbatim. The compression engine still applies to plain user /
 * assistant text blocks (where the LLM can reason about the marker).
 *
 * Run: node --import tsx/esm --test tests/unit/compression/ccr-skip-tool-outputs.test.ts
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import {
  ccrEngine,
  resetCcrStore,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/index.ts";

const LARGE_TOOL_OUTPUT = `Total 247 lines in current working directory.
drwxr-xr-x  18 herjarsa herjarsa   4096 Jul 20 13:12 .
drwxr-xr-x  14 root      root        4096 Jul 17 17:59 ..
drwxr-xr-x   4 herjarsa herjarsa   4096 Jul 18 14:41 .codegraph
-rw-r--r--   1 herjarsa herjarsa   8927 Jul 18 02:10 ARCHITECTURE.md
-rw-r--r--   1 herjarsa herjarsa 341669 Jul 20 13:12 meta-governor.log
-rw-r--r--   1 herjarsa herjarsa   81784 Jul 16 13:55 package-lock.json
-rw-r--r--   1 herjarsa herjarsa   4798 Jul 17 17:59 opencode.json
-rw-r--r--   1 herjarsa herjarsa   8045 Jul 12 02:07 STRUCTURE.md
drwxr-xr-x   4 herjarsa herjarsa   4096 Jul 20 13:12 .opencode
-rw-r--r--   1 herjarsa herjarsa     94 Jul 20 13:12 omo-meta-governor-upgrade-check.json
-rw-r--r--   1 herjarsa herjarsa   8437 Jul 14 18:42 oh-my-openagent.jsonc
-rw-------   1 herjarsa herjarsa  19542 Jul 18 02:09 session.json
drwxr-xr-x   2 herjarsa herjarsa   4096 Jun 14 18:42 snippet
drwxr-xr-x  22 herjarsa herjarsa   4096 Jun 13 12:33 skills
drwxr-xr-x 101 herjarsa herjarsa   4096 Jul 16 03:30 skill-libraries
-rw-r--r--   1 herjarsa herjarsa   233 Jun 19 22:39 tui.json
-rw-r--r--   1 herjarsa herjarsa  80415 Jun 14 18:42 structure-summary.json
The CCR engine must NOT replace this content with a marker because the LLM
needs the verbatim output to continue reasoning. Adding more lines to push
the character count well past the default minChars of 600 so the test is
unambiguous about why the skip rule is necessary. Even if minChars were 100
the rule must still hold because tool outputs are never safe to compress.`;

describe("ccr engine — skip tool outputs", () => {
  before(() => {
    resetCcrStore();
    registerBuiltinCompressionEngines();
  });

  it("does NOT compress role:tool messages (OpenAI format)", () => {
    const body = {
      model: "gpt-4",
      messages: [
        {
          role: "tool",
          tool_call_id: "call_abc123",
          content: LARGE_TOOL_OUTPUT,
        },
      ],
    };

    const result = ccrEngine.apply(body as Record<string, unknown>);

    assert.equal(
      result.compressed,
      false,
      "role:tool messages must NEVER trigger CCR compression — tool output is needed verbatim"
    );

    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.equal(
      messages[0].content,
      LARGE_TOOL_OUTPUT,
      "role:tool content must be byte-identical to input (no marker substitution)"
    );
    assert.ok(
      !messages[0].content.includes("[CCR retrieve"),
      "role:tool content must not contain any CCR marker"
    );
  });

  it("does NOT compress Anthropic-style user message containing only tool_result parts", () => {
    const body = {
      model: "claude-sonnet-4-5",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_abc123",
              content: LARGE_TOOL_OUTPUT,
            },
            {
              type: "tool_result",
              tool_use_id: "toolu_def456",
              content: LARGE_TOOL_OUTPUT + "\n--- second tool result ---",
            },
          ],
        },
      ],
    };

    const result = ccrEngine.apply(body as Record<string, unknown>);

    assert.equal(
      result.compressed,
      false,
      "user message containing only tool_result parts must NOT trigger CCR compression"
    );

    const messages = result.body.messages as Array<{
      role: string;
      content: Array<{ type: string; content?: string; text?: string }>;
    }>;
    assert.equal(messages[0].content[0].type, "tool_result");
    assert.equal(
      messages[0].content[0].content,
      LARGE_TOOL_OUTPUT,
      "first tool_result content must be byte-identical to input"
    );
    assert.equal(
      messages[0].content[1].content,
      LARGE_TOOL_OUTPUT + "\n--- second tool result ---",
      "second tool_result content must be byte-identical to input"
    );
  });

  it("still compresses plain user text — the skip rule is scoped to tool outputs", () => {
    // Sanity check: the fix must NOT regress the existing compression path.
    // A plain user-role message with large text content must still be compressed.
    const LARGE_USER_TEXT = LARGE_TOOL_OUTPUT; // same length, same trigger
    const body = {
      model: "gpt-4",
      messages: [{ role: "user", content: LARGE_USER_TEXT }],
    };

    const result = ccrEngine.apply(body as Record<string, unknown>);

    assert.equal(
      result.compressed,
      true,
      "plain role:user text block above minChars MUST still be compressed (regression guard)"
    );
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.ok(
      messages[0].content.match(/\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]/),
      "plain user text must still be replaced with a CCR marker"
    );
  });

  it("does NOT compress when the user message is purely a tool_result (even one part)", () => {
    // Single-element edge case: a user message with a single tool_result part
    // must still be skipped, not compressed.
    const body = {
      model: "claude-sonnet-4-5",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_single",
              content: LARGE_TOOL_OUTPUT,
            },
          ],
        },
      ],
    };

    const result = ccrEngine.apply(body as Record<string, unknown>);

    assert.equal(result.compressed, false, "single tool_result part must also be skipped");
    const messages = result.body.messages as Array<{
      role: string;
      content: Array<{ type: string; content?: string }>;
    }>;
    assert.equal(messages[0].content[0].content, LARGE_TOOL_OUTPUT);
  });
});

it("does NOT crash on malformed user content with null / non-object parts (defensive guard)", () => {
  // Regression guard for gemini-code-assist review on PR #7869:
  // msg.content is parsed from external client input, so a malformed
  // payload could deliver `null` or non-object entries in the parts
  // array. The optional-chaining check must NOT throw a TypeError.
  const body = {
    model: "claude-sonnet-4-5",
    messages: [
      {
        role: "user",
        content: [
          null,
          { type: "tool_result", tool_use_id: "toolu_x", content: LARGE_TOOL_OUTPUT },
        ],
      },
    ],
  };

  // Must not throw.
  const result = ccrEngine.apply(body as Record<string, unknown>);

  // Null is not a tool_result, so the message must NOT be skipped as
  // a tool-only message — it falls through to the normal array path
  // where the existing text/non-text branch handles each part.
  // We just need the engine to not crash on the malformed payload.
  assert.ok(result.body, "engine must return a body even with malformed content");
  assert.equal(typeof result.compressed, "boolean");
});
