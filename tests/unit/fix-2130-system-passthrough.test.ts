/**
 * Regression test for #2130: system prompt missing for Claude Code OAuth on Linux.
 *
 * Claude Code sends requests to /v1/chat/completions with `body.system` as a
 * native Anthropic array (not as role="system" messages). The openai→claude
 * translator must preserve body.system when no role="system" messages exist.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

describe("#2130: body.system passthrough in openai→claude translator", () => {
  it("preserves body.system array when no role=system messages exist", () => {
    const body = {
      model: "claude-opus-4-7",
      max_tokens: 2048,
      stream: false,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "hi" }],
        },
      ],
      system: [
        {
          type: "text",
          text: "You are Claude Code, Anthropic's official CLI for Claude.",
        },
      ],
    };

    const result = openaiToClaudeRequest("claude-opus-4-7", body, false);

    assert.ok(result.system, "result.system must be defined");
    assert.ok(Array.isArray(result.system), "result.system must be an array");
    assert.ok(
      result.system.some((b) => b.text && b.text.includes("You are Claude Code")),
      "result.system must contain the Claude Code system prompt"
    );
  });

  it("preserves body.system string when no role=system messages exist", () => {
    const body = {
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: "hello" }],
      system: "You are a helpful assistant.",
    };

    const result = openaiToClaudeRequest("claude-sonnet-4-6", body, true);

    assert.ok(result.system, "result.system must be defined");
    assert.ok(Array.isArray(result.system), "result.system must be an array");
    assert.equal(result.system[0].text, "You are a helpful assistant.");
  });

  it("merges body.system with role=system messages", () => {
    const body = {
      model: "claude-opus-4-7",
      max_tokens: 2048,
      messages: [
        { role: "system", content: "Be concise." },
        { role: "user", content: "hi" },
      ],
      system: [
        {
          type: "text",
          text: "You are Claude Code, Anthropic's official CLI for Claude.",
        },
      ],
    };

    const result = openaiToClaudeRequest("claude-opus-4-7", body, false);

    assert.ok(result.system, "result.system must be defined");
    assert.ok(Array.isArray(result.system), "result.system must be an array");
    // Should have the original body.system + the extracted role=system text
    assert.ok(
      result.system.some((b) => b.text && b.text.includes("You are Claude Code")),
      "must contain the body.system content"
    );
    assert.ok(
      result.system.some((b) => b.text && b.text.includes("Be concise")),
      "must contain the role=system message content"
    );
  });

  it("works correctly when neither body.system nor role=system messages exist", () => {
    const body = {
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: "hello" }],
    };

    const result = openaiToClaudeRequest("claude-sonnet-4-6", body, true);

    assert.equal(
      result.system,
      undefined,
      "result.system should be undefined when no system input exists"
    );
  });
});
