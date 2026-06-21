/**
 * TDD regression (escalated cmqmf7d29): a user reported "compression mode = only RTK
 * is not working — I ran `git status` via my agent and the RTK stats stayed the same".
 *
 * Root cause: RTK's `applyRtkCompression` only compressed OpenAI-shape tool results
 * (`role:"tool"`) and assistant messages. Anthropic-shape tool results — which arrive as
 * `tool_result` content blocks inside a (typically `role:"user"`) message — were skipped
 * entirely, so coding agents speaking the Anthropic Messages format saw zero RTK savings.
 * caveman/aggressive already handle this shape (B-AGG-ANTHROPIC-TR via
 * `compressAnthropicToolResultBlock`); RTK was the only engine that didn't.
 *
 * These tests pin that RTK now compresses the text inside Anthropic `tool_result` blocks
 * (preserving `tool_use_id` + block structure), resolving the shell command from the
 * matching assistant `tool_use` block exactly like the OpenAI `tool_call_id` path.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyRtkCompression } from "../../../open-sse/services/compression/index.ts";

// A verbose `git status` with the noise (blank lines + "(use ...)" hints) the git-status
// filter is designed to drop, so compression is unambiguous.
const GIT_STATUS_OUTPUT = [
  "On branch main",
  "Your branch is up to date with 'origin/main'.",
  "",
  "Changes not staged for commit:",
  '  (use "git add <file>..." to update what will be committed)',
  '  (use "git restore <file>..." to discard changes in working directory)',
  "\tmodified:   src/app.ts",
  "\tmodified:   src/index.ts",
  "",
  "Untracked files:",
  '  (use "git add <file>..." to include in what will be committed)',
  "\tsrc/new.ts",
  "",
  'no changes added to commit (use "git add" and/or "git commit -a")',
].join("\n");

function anthropicBody(toolResultContent: unknown) {
  return {
    messages: [
      { role: "user", content: "run git status" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "Running it now." },
          {
            type: "tool_use",
            id: "toolu_01abc",
            name: "bash",
            input: { command: "git status" },
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01abc",
            content: toolResultContent,
          },
        ],
      },
    ],
  };
}

describe("RTK — Anthropic-shape tool_result blocks", () => {
  it("compresses a string-content tool_result inside a user message", () => {
    const result = applyRtkCompression(anthropicBody(GIT_STATUS_OUTPUT));

    assert.equal(result.compressed, true);
    assert.equal(result.stats?.mode, "rtk");

    const messages = result.body.messages as Array<{ role: string; content: unknown }>;
    const block = (messages[2].content as Array<Record<string, unknown>>)[0];
    // Block structure + linkage preserved exactly.
    assert.equal(block.type, "tool_result");
    assert.equal(block.tool_use_id, "toolu_01abc");
    // Inner text was compressed: the "(use ...)" hint lines are dropped, the branch and
    // changed-file lines survive.
    const text = block.content as string;
    assert.ok(text.length < GIT_STATUS_OUTPUT.length, "tool_result text should shrink");
    assert.doesNotMatch(text, /\(use "git add/, "noise hint lines should be dropped");
    assert.match(text, /On branch main/, "branch line preserved");
    assert.match(text, /modified:\s+src\/app\.ts/, "changed-file lines preserved");
  });

  it("compresses an array-content tool_result (nested text blocks)", () => {
    const result = applyRtkCompression(
      anthropicBody([{ type: "text", text: GIT_STATUS_OUTPUT }])
    );

    assert.equal(result.compressed, true);
    const messages = result.body.messages as Array<{ role: string; content: unknown }>;
    const block = (messages[2].content as Array<Record<string, unknown>>)[0];
    assert.equal(block.type, "tool_result");
    assert.equal(block.tool_use_id, "toolu_01abc");
    const inner = block.content as Array<{ type: string; text: string }>;
    assert.equal(inner[0].type, "text");
    assert.doesNotMatch(inner[0].text, /\(use "git add/);
    assert.match(inner[0].text, /On branch main/);
  });

  it("leaves non-tool_result user content untouched", () => {
    const body = { messages: [{ role: "user", content: "just a plain question" }] };
    const result = applyRtkCompression(body);
    assert.equal(result.compressed, false);
  });
});
