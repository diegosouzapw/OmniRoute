/**
 * tests/unit/compression/context-editing-telemetry.test.ts
 *
 * TDD for F4.1 — extractContextEditingTelemetry: pulls the server-side context
 * editing receipt (`applied_edits[].cleared_input_tokens` / `cleared_tool_uses`)
 * out of a Claude (Anthropic Messages) response body. Defensive over the exact
 * response shape: the array may live at `context_management.applied_edits`
 * (top-level) or nested under `usage` — we tolerate both rather than hardcode a
 * single guess (the spec's Task-1 caution).
 *
 * Run: node --import tsx/esm --test tests/unit/compression/context-editing-telemetry.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { extractContextEditingTelemetry } from "../../../open-sse/config/contextEditing.ts";

describe("extractContextEditingTelemetry", () => {
  it("returns null for null/undefined/non-object bodies", () => {
    assert.equal(extractContextEditingTelemetry(null), null);
    assert.equal(extractContextEditingTelemetry(undefined), null);
    assert.equal(extractContextEditingTelemetry("nope"), null);
    assert.equal(extractContextEditingTelemetry(42), null);
  });

  it("returns null when there is no context_management / applied_edits", () => {
    assert.equal(extractContextEditingTelemetry({ usage: { input_tokens: 10 } }), null);
    assert.equal(extractContextEditingTelemetry({ context_management: {} }), null);
    assert.equal(
      extractContextEditingTelemetry({ context_management: { applied_edits: [] } }),
      null
    );
  });

  it("reads applied_edits from the top-level context_management object", () => {
    const body = {
      context_management: {
        applied_edits: [
          { type: "clear_tool_uses_20250919", cleared_tool_uses: 8, cleared_input_tokens: 50000 },
        ],
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.editCount, 1);
    assert.equal(out.clearedInputTokens, 50000);
    assert.equal(out.clearedToolUses, 8);
  });

  it("reads applied_edits nested under usage.context_management (alt shape)", () => {
    const body = {
      usage: {
        input_tokens: 120000,
        context_management: {
          applied_edits: [{ type: "clear_tool_uses_20250919", cleared_input_tokens: 30000 }],
        },
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.clearedInputTokens, 30000);
  });

  it("reads applied_edits directly under usage.applied_edits (alt shape)", () => {
    const body = {
      usage: {
        applied_edits: [{ type: "clear_tool_uses_20250919", cleared_input_tokens: 12345 }],
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.clearedInputTokens, 12345);
  });

  it("sums cleared tokens/tool_uses across multiple edits", () => {
    const body = {
      context_management: {
        applied_edits: [
          { type: "clear_thinking_20251015", cleared_input_tokens: 4000, cleared_tool_uses: 0 },
          { type: "clear_tool_uses_20250919", cleared_input_tokens: 6000, cleared_tool_uses: 5 },
        ],
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.editCount, 2);
    assert.equal(out.clearedInputTokens, 10000);
    assert.equal(out.clearedToolUses, 5);
  });

  it("falls back to camelCase field names if present", () => {
    const body = {
      context_management: {
        applied_edits: [
          { type: "clear_tool_uses_20250919", clearedInputTokens: 777, clearedToolUses: 2 },
        ],
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.clearedInputTokens, 777);
    assert.equal(out.clearedToolUses, 2);
  });

  it("returns null when edits exist but cleared nothing (no real telemetry)", () => {
    const body = {
      context_management: {
        applied_edits: [
          { type: "clear_tool_uses_20250919", cleared_input_tokens: 0, cleared_tool_uses: 0 },
        ],
      },
    };
    assert.equal(extractContextEditingTelemetry(body), null);
  });

  it("skips malformed (non-object) edit entries and still sums the valid ones", () => {
    const body = {
      context_management: {
        applied_edits: [
          null,
          "garbage",
          { type: "clear_tool_uses_20250919", cleared_input_tokens: 999 },
        ],
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.clearedInputTokens, 999);
  });

  it("coerces numeric strings and ignores non-numeric junk", () => {
    const body = {
      context_management: {
        applied_edits: [
          {
            type: "clear_tool_uses_20250919",
            cleared_input_tokens: "1500",
            cleared_tool_uses: "x",
          },
        ],
      },
    };
    const out = extractContextEditingTelemetry(body);
    assert.ok(out);
    assert.equal(out.clearedInputTokens, 1500);
    assert.equal(out.clearedToolUses, 0);
  });
});
