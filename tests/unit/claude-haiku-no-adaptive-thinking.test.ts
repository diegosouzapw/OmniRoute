import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { normalizeClaudeHaikuConstraints } from "@omniroute/open-sse/services/claudeHaikuConstraints.ts";

// Claude Haiku 4.5 (and other haiku-tier models) reject:
//   1. `thinking.type:"adaptive"` (only Sonnet/Opus support adaptive thinking)
//   2. `output_config.effort` (also Sonnet/Opus only)
// Several OmniRoute paths can still emit these on Haiku targets:
//   - Native Claude passthrough from newer Claude Code / Cowork clients
//   - OpenAI→Claude translator buckets when reasoning_effort is "max"/"xhigh"
//   - Per-model thinking defaults from the request flow
// This normalizer is the final, provider-agnostic guard keyed on the resolved
// upstream model. Mirrors upstream 9router 401d93bd5 (`claude.js`).

describe("normalizeClaudeHaikuConstraints", () => {
  it("converts thinking.type:'adaptive' to a manual 'enabled' shape on haiku", () => {
    const input = {
      model: "claude-haiku-4-5-20251001",
      thinking: { type: "adaptive" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.deepEqual(out.thinking, { type: "enabled", budget_tokens: 10000 });
  });

  it("strips output_config.effort on haiku and keeps other output_config fields", () => {
    const input = {
      model: "claude-haiku-4.5",
      output_config: { effort: "high", other_field: "keep-me" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.deepEqual(out.output_config, { other_field: "keep-me" });
  });

  it("removes output_config entirely when stripping effort leaves it empty", () => {
    const input = {
      model: "claude-haiku-4-5-20251001",
      output_config: { effort: "max" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.equal((out as Record<string, unknown>).output_config, undefined);
  });

  it("applies BOTH transforms when the body carries adaptive thinking + effort", () => {
    const input = {
      model: "claude-haiku-4.5",
      thinking: { type: "adaptive" },
      output_config: { effort: "xhigh" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.deepEqual(out.thinking, { type: "enabled", budget_tokens: 10000 });
    assert.equal((out as Record<string, unknown>).output_config, undefined);
  });

  it("is a no-op for Sonnet (adaptive is valid there)", () => {
    const input = {
      model: "claude-sonnet-4-5",
      thinking: { type: "adaptive" },
      output_config: { effort: "high" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.strictEqual(out, input);
  });

  it("is a no-op for Opus (adaptive is valid there)", () => {
    const input = {
      model: "claude-opus-4-7",
      thinking: { type: "adaptive" },
      output_config: { effort: "max" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.strictEqual(out, input);
  });

  it("leaves haiku bodies that have no adaptive thinking or effort untouched", () => {
    const input = {
      model: "claude-haiku-4-5-20251001",
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [{ role: "user", content: "hi" }],
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.strictEqual(out, input);
  });

  it("returns the body untouched when model is null/undefined", () => {
    const input = { thinking: { type: "adaptive" }, output_config: { effort: "high" } };
    assert.strictEqual(normalizeClaudeHaikuConstraints(input, null), input);
    assert.strictEqual(normalizeClaudeHaikuConstraints(input, undefined), input);
  });

  it("matches case-insensitively (any model id containing 'haiku')", () => {
    const input = {
      model: "claude-3-5-Haiku-latest",
      thinking: { type: "adaptive" },
    };
    const out = normalizeClaudeHaikuConstraints(input, input.model);
    assert.deepEqual(out.thinking, { type: "enabled", budget_tokens: 10000 });
  });
});
