/**
 * Unit tests for the lite compression redundant-remove tool message fix (#13429).
 *
 * Ensures consecutive identical tool messages are never collapsed,
 * even when their content is byte-identical, because each carries
 * a distinct tool_call_id that the upstream validator expects.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { removeRedundantContent } from "../../open-sse/services/compression/lite.ts";

describe("removeRedundantContent — tool message exemption (#13429)", () => {
  it("preserves consecutive tool messages with identical empty content", () => {
    const body = {
      messages: [
        {
          role: "assistant",
          content: "t",
          tool_calls: [
            { id: "c1", type: "function", function: { name: "f", arguments: "{}" } },
            { id: "c2", type: "function", function: { name: "g", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "c1", content: "" },
        { role: "tool", tool_call_id: "c2", content: "" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, false);
    assert.equal(result.body.messages.length, 3);
    assert.equal(result.body.messages[1].tool_call_id, "c1");
    assert.equal(result.body.messages[2].tool_call_id, "c2");
  });

  it("preserves consecutive tool messages with identical non-empty content", () => {
    const body = {
      messages: [
        {
          role: "assistant",
          content: "t",
          tool_calls: [
            { id: "c1", type: "function", function: { name: "f", arguments: "{}" } },
            { id: "c2", type: "function", function: { name: "g", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "c1", content: "result" },
        { role: "tool", tool_call_id: "c2", content: "result" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, false);
    assert.equal(result.body.messages.length, 3);
  });

  it("still collapses consecutive non-tool messages with identical content", () => {
    const body = {
      messages: [
        { role: "user", content: "hello" },
        { role: "user", content: "hello" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, true);
    assert.equal(result.body.messages.length, 1);
  });

  it("still collapses consecutive assistant messages with identical content", () => {
    const body = {
      messages: [
        { role: "assistant", content: "same" },
        { role: "assistant", content: "same" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, true);
    assert.equal(result.body.messages.length, 1);
  });

  it("collapses tool message followed by non-tool with same content (cross-role)", () => {
    // A tool message and a user message with the same content should NOT be
    // collapsed because the dedup is role-based. This is existing behavior.
    const body = {
      messages: [
        { role: "tool", tool_call_id: "c1", content: "same" },
        { role: "user", content: "same" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, false);
    assert.equal(result.body.messages.length, 2);
  });

  it("handles three consecutive tool messages with identical content", () => {
    const body = {
      messages: [
        {
          role: "assistant",
          content: "t",
          tool_calls: [
            { id: "c1", type: "function", function: { name: "f", arguments: "{}" } },
            { id: "c2", type: "function", function: { name: "g", arguments: "{}" } },
            { id: "c3", type: "function", function: { name: "h", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "c1", content: "" },
        { role: "tool", tool_call_id: "c2", content: "" },
        { role: "tool", tool_call_id: "c3", content: "" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, false);
    assert.equal(result.body.messages.length, 4);
  });

  it("collapses adjacent non-tool messages sandwiched between tools", () => {
    // Two consecutive user messages with identical content between tools
    // should still be collapsed (non-tool exemption doesn't apply).
    const body = {
      messages: [
        { role: "tool", tool_call_id: "c1", content: "r1" },
        { role: "user", content: "same" },
        { role: "user", content: "same" },
        { role: "tool", tool_call_id: "c2", content: "r2" },
      ],
    };

    const result = removeRedundantContent(body);
    assert.equal(result.applied, true);
    assert.equal(result.body.messages.length, 3);
  });
});
