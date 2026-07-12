/**
 * TDD regression for #6953 — thinking blocks with empty signatures poison the
 * Anthropic leg of combo/blend routes.
 *
 * Non-Anthropic providers (codex/gpt-5.x) synthesize Anthropic-format `thinking`
 * blocks with `signature: ""`. When the client replays these in the next
 * request's history, the Anthropic leg rejects them with HTTP 400 "Invalid
 * signature in thinking block", and the router silently falls back to codex
 * permanently.
 *
 * The old code fabricated a DEFAULT_THINKING_CLAUDE_SIGNATURE to fill the empty
 * signature — but that fabricated signature is equally foreign to Anthropic, so
 * it also 400'd.
 *
 * Fix (#6953): strip thinking blocks with empty/missing signatures entirely.
 * They carry no replayable cryptographic value. For `redacted_thinking`, strip
 * if `data` is empty/missing for the same reason.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

test('#6953: thinking block with signature:"" is stripped, not fabricated', () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "I will help you." },
            { type: "thinking", thinking: "reasoning here", signature: "" },
            {
              type: "text",
              text: "Let me use a tool.",
            },
          ],
        },
        { role: "user", content: "ok go ahead" },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");

  // The thinking block with empty signature must be DROPPED, not preserved
  // with a fabricated signature.
  const thinkingBlocks = assistant.content.filter((b) => b && b.type === "thinking");
  assert.equal(
    thinkingBlocks.length,
    0,
    "thinking block with empty signature must be stripped, not fabricated"
  );

  // Text blocks must survive
  const textBlocks = assistant.content.filter((b) => b && b.type === "text");
  assert.ok(textBlocks.length >= 1, "text blocks must be preserved");
});

test("#6953: thinking block with valid signature is preserved verbatim", () => {
  const realSig = "EuY2xhdWRlLXNpZ25hdHVyZS0xNzA5...";
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

  const thinkingBlocks = assistant.content.filter((b) => b && b.type === "thinking");
  assert.equal(thinkingBlocks.length, 1, "valid thinking block must be preserved");
  assert.equal(thinkingBlocks[0].signature, realSig, "valid signature must be preserved verbatim");
});

test("#6953: thinking block with undefined signature (Claude-format) is preserved with fallback", () => {
  // Claude-format messages may have thinking blocks without a signature field at all.
  // These are legitimate and must NOT be stripped — only signature:"" (empty string)
  // indicates a non-Anthropic synthesized block.
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "I already have this" },
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

  const thinkingBlocks = assistant.content.filter((b) => b && b.type === "thinking");
  assert.equal(
    thinkingBlocks.length,
    1,
    "thinking block with undefined signature must be preserved"
  );
  assert.equal(thinkingBlocks[0].thinking, "I already have this", "thinking content must match");
  assert.ok(thinkingBlocks[0].signature, "fallback signature must be applied");
});

test("#6953: redacted_thinking with empty data is stripped", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          content: [
            { type: "redacted_thinking", data: "" },
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

  const redactedBlocks = assistant.content.filter((b) => b && b.type === "redacted_thinking");
  assert.equal(redactedBlocks.length, 0, "redacted_thinking with empty data must be stripped");
});

test("#6953: combo scenario — codex-sourced thinking block does not block Anthropic leg", () => {
  // Simulates a combo route: turn 1 served by codex produced a thinking block
  // with signature:"". Turn 2 should be able to route to Anthropic without
  // the poisoned block causing a 400.
  const result = openaiToClaudeRequest(
    "claude-opus-4-8",
    {
      messages: [
        { role: "user", content: "write a function" },
        {
          role: "assistant",
          content: [
            {
              type: "thinking",
              thinking: "**Reviewing the request**\n\nI need to write a function...",
              signature: "", // codex-sourced, no real signature
            },
            { type: "text", text: "Here's the function:" },
            {
              type: "tool_use",
              id: "toolu_01abc",
              name: "write_file",
              input: { path: "main.rs", content: "fn main() {}" },
            },
          ],
        },
        { role: "user", content: "looks good, now add tests" },
      ],
    },
    false
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant);

  // No thinking block with empty-string signature should survive
  const badThinking = assistant.content.find(
    (b) => b && b.type === "thinking" && b.signature === ""
  );
  assert.equal(
    badThinking,
    undefined,
    "no thinking block with empty-string signature should survive"
  );

  // Tool use must survive
  const toolUse = assistant.content.find((b) => b && b.type === "tool_use");
  assert.ok(toolUse, "tool_use block must be preserved");
});
