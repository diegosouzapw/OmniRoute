import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";

// Regression: a tool_result block the client marked with `cache_control` is an explicit
// prompt-cache breakpoint — the upstream caches the prefix up to and INCLUDING that block.
// RTK (since the Anthropic tool_result support added in v3.8.32) rewrote the block's inner
// content, so the cached prefix no longer matched byte-for-byte → guaranteed cache miss at
// that breakpoint (reported as "provider cache again broken" after upgrading). Compression
// must never alter a block carrying `cache_control`. Mirrors #3936's invariant: under
// caching, only ever preserve more of the prefix — never rewrite a declared breakpoint.

const GIT_STATUS = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/app.ts
        modified:   src/lib/util.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/new.ts

no changes added to commit (use "git add" and/or "git commit -a")`;

function anthropicBody(toolResultBlock: Record<string, unknown>) {
  return {
    model: "anthropic/claude-sonnet-4",
    messages: [
      { role: "user", content: "run git status" },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "git status" } },
        ],
      },
      { role: "user", content: [toolResultBlock] },
    ],
  } as Record<string, unknown>;
}

// Pull the single tool_result block out of message[2].content[0] with a typed shape (no `any`).
function toolResultBlock(body: Record<string, unknown>): Record<string, unknown> {
  const messages = body.messages as Array<{ content: Array<Record<string, unknown>> }>;
  return messages[2].content[0];
}

test("RTK preserves a tool_result block carrying cache_control byte-for-byte (string content)", () => {
  const block = {
    type: "tool_result",
    tool_use_id: "toolu_1",
    content: GIT_STATUS,
    cache_control: { type: "ephemeral" },
  };
  const body = anthropicBody(block);
  const before = JSON.stringify(toolResultBlock(body));

  const res = applyRtkCompression(body, { config: { enabled: true, applyToToolResults: true } });
  const after = JSON.stringify(toolResultBlock(res.body as Record<string, unknown>));

  // The marked breakpoint block must be untouched — content identical, marker intact.
  assert.equal(after, before, "cache_control-marked tool_result must not be rewritten");
  assert.deepEqual(toolResultBlock(res.body as Record<string, unknown>).cache_control, { type: "ephemeral" });
});

test("RTK preserves an inner text sub-block carrying cache_control (array content)", () => {
  const block = {
    type: "tool_result",
    tool_use_id: "toolu_1",
    content: [{ type: "text", text: GIT_STATUS, cache_control: { type: "ephemeral" } }],
  };
  const body = anthropicBody(block);
  const before = JSON.stringify(toolResultBlock(body));

  const res = applyRtkCompression(body, { config: { enabled: true, applyToToolResults: true } });
  const after = JSON.stringify(toolResultBlock(res.body as Record<string, unknown>));

  assert.equal(after, before, "cache_control-marked text sub-block must not be rewritten");
});

test("RTK still compresses tool_result blocks WITHOUT cache_control (no over-protection)", () => {
  const block = {
    type: "tool_result",
    tool_use_id: "toolu_1",
    content: GIT_STATUS,
  };
  const body = anthropicBody(block);

  const res = applyRtkCompression(body, { config: { enabled: true, applyToToolResults: true } });
  const after = toolResultBlock(res.body as Record<string, unknown>).content as string;

  assert.equal(res.compressed, true, "unmarked tool_result should still compress");
  assert.ok(!after.includes('(use "git add'), "hint lines should be dropped when uncached");
});
