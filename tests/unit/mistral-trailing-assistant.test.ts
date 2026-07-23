/**
 * Regression test for #3396: Mistral returns 400 when the last message is
 * `role: "assistant"` with plain text content.
 *
 * `stripTrailingAssistantOrphanToolUse` only removed tool_use blocks — it left
 * trailing text-only assistant messages intact.  Mistral (and providers sharing
 * the same constraint) reject such requests with:
 *   "400: Expected last role User or Tool (or Assistant with prefix True)
 *    for serving but got assistant"
 *
 * The fix adds `stripTrailingAssistantForProvider(messages, provider)` which
 * also drops a trailing text-only assistant message for providers that require
 * user-last format (e.g. "mistral").
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { stripTrailingAssistantOrphanToolUse } from "../../open-sse/services/contextManager.ts";
import { stripTrailingAssistantForProvider } from "../../open-sse/services/contextManager.ts";

const user = (content: string) => ({ role: "user", content });
const assistant = (content: string) => ({ role: "assistant", content });
const assistantWithToolUse = () => ({
  role: "assistant",
  content: [{ type: "tool_use", id: "t1", name: "fn", input: {} }],
});

describe("stripTrailingAssistantForProvider (#3396)", () => {
  it("strips trailing text-only assistant message for mistral", () => {
    const msgs = [user("hi"), assistant("hello from model")];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });

  it("strips trailing assistant with array-string content for mistral", () => {
    const msgs = [
      user("hi"),
      { role: "assistant", content: [{ type: "text", text: "response" }] },
    ];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });

  it("does NOT strip trailing tool_use assistant (stripTrailingOrphan handles that)", () => {
    const msgs = [user("hi"), assistantWithToolUse()];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    // tool_use trailing is already handled by stripTrailingAssistantOrphanToolUse;
    // this function should not double-strip or corrupt tool-use state
    assert.strictEqual(result.length, 2);
  });

  it("does NOT strip trailing text assistant for non-mistral providers", () => {
    const msgs = [user("hi"), assistant("response")];
    const result = stripTrailingAssistantForProvider(msgs, "openai");
    assert.strictEqual(result.length, 2);
  });

  it("does NOT strip trailing text assistant for anthropic/claude", () => {
    const msgs = [user("hi"), assistant("continue from here")];
    const result = stripTrailingAssistantForProvider(msgs, "claude");
    assert.strictEqual(result.length, 2);
  });

  it("returns messages unchanged when last message is user", () => {
    const msgs = [assistant("a"), user("b")];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[1].role, "user");
  });

  it("returns empty array unchanged", () => {
    const result = stripTrailingAssistantForProvider([], "mistral");
    assert.deepStrictEqual(result, []);
  });

  it("existing stripTrailingAssistantOrphanToolUse still works after change", () => {
    const msgs = [user("hi"), assistantWithToolUse()];
    const result = stripTrailingAssistantOrphanToolUse(msgs);
    // tool_use block removed; empty assistant → dropped
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });
});
