/**
 * Tests for splitClaudeEffortSuffix — stripping the reasoning-effort suffix that
 * the Claude / Claude-Code model picker (VS Code "Effort" slider) appends to a base
 * model id (claude-...-{low,medium,high,xhigh,max}). The suffix must be stripped so
 * the upstream Anthropic relay receives a real model id (else HTTP 404) and surfaced
 * as reasoning_effort downstream. See chatCore.ts effort-variant normalization.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  splitClaudeEffortSuffix,
  CLAUDE_EFFORT_SUFFIXES,
} from "../../open-sse/config/providerModels.ts";

describe("splitClaudeEffortSuffix", () => {
  it("splits every effort level off claude-opus-4-8", () => {
    assert.deepEqual(splitClaudeEffortSuffix("claude-opus-4-8-low"), {
      baseModel: "claude-opus-4-8",
      effort: "low",
    });
    assert.deepEqual(splitClaudeEffortSuffix("claude-opus-4-8-medium"), {
      baseModel: "claude-opus-4-8",
      effort: "medium",
    });
    assert.deepEqual(splitClaudeEffortSuffix("claude-opus-4-8-high"), {
      baseModel: "claude-opus-4-8",
      effort: "high",
    });
    assert.deepEqual(splitClaudeEffortSuffix("claude-opus-4-8-xhigh"), {
      baseModel: "claude-opus-4-8",
      effort: "xhigh",
    });
    assert.deepEqual(splitClaudeEffortSuffix("claude-opus-4-8-max"), {
      baseModel: "claude-opus-4-8",
      effort: "max",
    });
  });

  it("does not confuse 'xhigh' with 'high' (no strip to '...-x')", () => {
    const split = splitClaudeEffortSuffix("claude-opus-4-8-xhigh");
    assert.equal(split.baseModel, "claude-opus-4-8");
    assert.equal(split.effort, "xhigh");
  });

  it("returns null effort for a bare base id", () => {
    assert.deepEqual(splitClaudeEffortSuffix("claude-opus-4-8"), {
      baseModel: "claude-opus-4-8",
      effort: null,
    });
    assert.deepEqual(splitClaudeEffortSuffix("claude-sonnet-4-6"), {
      baseModel: "claude-sonnet-4-6",
      effort: null,
    });
  });

  it("is case-insensitive and works across model families", () => {
    assert.deepEqual(splitClaudeEffortSuffix("claude-sonnet-4-6-HIGH"), {
      baseModel: "claude-sonnet-4-6",
      effort: "high",
    });
    assert.deepEqual(splitClaudeEffortSuffix("claude-haiku-4-5-low"), {
      baseModel: "claude-haiku-4-5",
      effort: "low",
    });
  });

  it("tolerates non-string / empty input", () => {
    assert.deepEqual(splitClaudeEffortSuffix(undefined), { baseModel: "", effort: null });
    assert.deepEqual(splitClaudeEffortSuffix(null), { baseModel: "", effort: null });
    assert.deepEqual(splitClaudeEffortSuffix(123), { baseModel: "", effort: null });
    assert.deepEqual(splitClaudeEffortSuffix(""), { baseModel: "", effort: null });
  });

  it("orders 'xhigh' before 'high' in the suffix list", () => {
    assert.ok(
      CLAUDE_EFFORT_SUFFIXES.indexOf("xhigh") < CLAUDE_EFFORT_SUFFIXES.indexOf("high"),
      "xhigh must be tested before high so it wins the longest-match"
    );
  });
});
