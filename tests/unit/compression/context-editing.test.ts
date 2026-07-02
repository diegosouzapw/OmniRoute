import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyContextEditingToBody,
  CLEAR_TOOL_USES_STRATEGY,
  CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS,
  CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES,
} from "../../../open-sse/config/contextEditing.ts";

const CLEAR_THINKING_STRATEGY = "clear_thinking_20251015";

describe("applyContextEditingToBody", () => {
  it("does nothing when disabled", () => {
    const body: Record<string, unknown> = { model: "claude-opus-4-8" };
    applyContextEditingToBody(body, { enabled: false });
    assert.equal(body.context_management, undefined);
  });

  it("is a no-op for null/non-object bodies", () => {
    // Should not throw.
    applyContextEditingToBody(null, { enabled: true });
    applyContextEditingToBody(undefined, { enabled: true });
    assert.ok(true);
  });

  it("adds the clear_tool_uses edit with default trigger/keep on an empty body", () => {
    const body: Record<string, unknown> = { model: "claude-opus-4-8" };
    applyContextEditingToBody(body, { enabled: true });

    const cm = body.context_management as Record<string, unknown>;
    assert.ok(cm, "context_management should be set");
    const edits = cm.edits as Array<Record<string, unknown>>;
    assert.equal(edits.length, 1);
    assert.deepEqual(edits[0], {
      type: CLEAR_TOOL_USES_STRATEGY,
      trigger: { type: "input_tokens", value: CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS },
      keep: { type: "tool_uses", value: CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES },
    });
  });

  it("composes with an existing clear_thinking edit, keeping thinking FIRST", () => {
    const body: Record<string, unknown> = {
      model: "claude-opus-4-8",
      context_management: {
        edits: [{ type: CLEAR_THINKING_STRATEGY, keep: "all" }],
      },
    };
    applyContextEditingToBody(body, { enabled: true });

    const edits = (body.context_management as Record<string, unknown>).edits as Array<
      Record<string, unknown>
    >;
    assert.equal(edits.length, 2);
    assert.equal(edits[0].type, CLEAR_THINKING_STRATEGY, "clear_thinking must be first");
    assert.equal(edits[1].type, CLEAR_TOOL_USES_STRATEGY);
  });

  it("is idempotent — calling twice does not duplicate the tool-use edit", () => {
    const body: Record<string, unknown> = { model: "claude-opus-4-8" };
    applyContextEditingToBody(body, { enabled: true });
    applyContextEditingToBody(body, { enabled: true });

    const edits = (body.context_management as Record<string, unknown>).edits as Array<
      Record<string, unknown>
    >;
    assert.equal(
      edits.filter((e) => e.type === CLEAR_TOOL_USES_STRATEGY).length,
      1,
      "only one clear_tool_uses edit should exist"
    );
  });

  it("does not duplicate when a tool-use edit already exists (preserves caller's edit)", () => {
    const preset = {
      type: CLEAR_TOOL_USES_STRATEGY,
      trigger: { type: "input_tokens", value: 50000 },
      keep: { type: "tool_uses", value: 1 },
    };
    const body: Record<string, unknown> = {
      model: "claude-opus-4-8",
      context_management: { edits: [preset] },
    };
    applyContextEditingToBody(body, { enabled: true });

    const edits = (body.context_management as Record<string, unknown>).edits as Array<
      Record<string, unknown>
    >;
    assert.equal(edits.length, 1);
    assert.deepEqual(edits[0], preset, "existing tool-use edit must be left untouched");
  });

  it("preserves unrelated context_management properties", () => {
    const body: Record<string, unknown> = {
      model: "claude-opus-4-8",
      context_management: { edits: [], some_future_flag: true },
    };
    applyContextEditingToBody(body, { enabled: true });

    const cm = body.context_management as Record<string, unknown>;
    assert.equal(cm.some_future_flag, true);
    assert.equal((cm.edits as unknown[]).length, 1);
  });
});
