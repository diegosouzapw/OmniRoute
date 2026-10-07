/**
 * TDD regression for #12105 — cross-provider `reasoning_content` becomes an unsigned
 * `thinking` block, then "Invalid signature" on replay to Claude.
 *
 * The response translator (response/openai-to-claude.ts) builds a `thinking` block from
 * `reasoning_content` and never attaches a `signature` field. The client stores that
 * block verbatim and replays it on the next turn. When that turn is served by an
 * Anthropic-native rung, `openaiToClaudeRequest` only treated `signature: ""` as
 * synthesized (#6953); a block with the field ABSENT fell through to the
 * DEFAULT_THINKING_CLAUDE_SIGNATURE fallback. Anthropic validates `thinking`
 * signatures cryptographically and rejects the fabricated one with HTTP 400.
 *
 * `prepareClaudeRequest` cannot repair this afterwards: its latest-assistant guard
 * classifies any non-empty signature string as genuine and preserves the block
 * verbatim (Anthropic 400s on modified latest-turn blocks), so the fabricated
 * signature reaches the upstream unchanged.
 *
 * Fix: treat a missing signature the same as an empty one — drop the block. Older
 * turns and tool_use precursors are already handled by prepareClaudeRequest
 * (redacted_thinking rewrite / precursor injection), which never fabricates a
 * `thinking` signature.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");

test("#12105: thinking block with NO signature field is dropped, not stamped with the default signature", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "cross-provider reasoning" },
            { type: "text", text: "response" },
          ],
        },
        { role: "user", content: "next turn" },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");

  const fabricated = assistant.content.find(
    (b) => b && b.type === "thinking" && b.signature === DEFAULT_THINKING_CLAUDE_SIGNATURE
  );
  assert.equal(
    fabricated,
    undefined,
    "must NOT emit a `thinking` block carrying the fabricated default signature"
  );
  assert.equal(
    assistant.content.filter((b) => b && b.type === "thinking").length,
    0,
    'unsigned thinking block must be dropped, exactly like the signature:"" case'
  );
  assert.deepEqual(
    assistant.content.map((b) => b.type),
    ["text"],
    "text block must survive"
  );
});

test("#12105: unsigned thinking block on the latest assistant turn with tool_use does not leak a fabricated signature through prepareClaudeRequest", () => {
  // Mirrors the reported combo scenario: the previous turn was served by a
  // non-Anthropic rung (unsigned thinking + tool_use), and this turn routes to
  // an Anthropic-native rung with thinking enabled.
  const translated = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [
        { role: "user", content: "write a function" },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "**Reviewing the request**" },
            {
              type: "tool_use",
              id: "toolu_01abc",
              name: "write_file",
              input: { path: "main.rs", content: "fn main() {}" },
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "toolu_01abc", content: "ok" }],
        },
      ],
    },
    false
  );

  const outbound = prepareClaudeRequest(translated, "claude");
  const assistant = outbound.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");

  const fabricated = assistant.content.find(
    (b) => b && b.type === "thinking" && b.signature === DEFAULT_THINKING_CLAUDE_SIGNATURE
  );
  assert.equal(
    fabricated,
    undefined,
    "a `thinking` block with the fabricated signature must never reach the Anthropic upstream"
  );
  assert.equal(
    assistant.content.find((b) => b && b.type === "thinking"),
    undefined,
    "no `thinking`-typed block may survive on the latest assistant turn"
  );

  // Anthropic's schema still needs a thinking-ish precursor before tool_use when
  // thinking is enabled; prepareClaudeRequest supplies the signature-less
  // redacted_thinking placeholder (accepted without signature validation).
  assert.equal(
    assistant.content[0].type,
    "redacted_thinking",
    "precursor must be redacted_thinking"
  );
  assert.equal(
    assistant.content[0].signature,
    undefined,
    "redacted_thinking must carry no signature"
  );
  assert.ok(
    assistant.content.some((b) => b.type === "tool_use"),
    "tool_use block must be preserved"
  );
});

test("#12105: thinking block with a real signature is still preserved verbatim", () => {
  const realSig = "ErUBCkYI...real-anthropic-signature...==";
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "real reasoning", signature: realSig },
            { type: "text", text: "response" },
          ],
        },
        { role: "user", content: "ok" },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant);
  const thinking = assistant.content.filter((b) => b && b.type === "thinking");
  assert.equal(thinking.length, 1, "signed thinking block must be preserved");
  assert.equal(thinking[0].signature, realSig, "real signature must be preserved verbatim");
});
