import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";
import {
  recordLearnedReasoningEffort,
  __test_resetLearnedReasoningEffortCaps,
} from "../../open-sse/services/learnedReasoningEffortCaps.ts";

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

test("unregistered/custom provider+model: no learned cap yet sends xhigh unchanged", () => {
  const body = { reasoning_effort: "xhigh" };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openai-compatible-chat-eaff6869",
    "qwen3-coder-30b-a3b-instruct"
  ) as { reasoning_effort: string };
  assert.equal(result.reasoning_effort, "xhigh");
});

test("unregistered/custom provider+model: a learned cap clamps xhigh down to it", () => {
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", "qwen3-coder-30b-a3b-instruct", [
    "none",
    "high",
    "medium",
    "low",
    "minimal",
  ]);
  const body = { reasoning_effort: "xhigh" };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openai-compatible-chat-eaff6869",
    "qwen3-coder-30b-a3b-instruct"
  ) as { reasoning_effort: string };
  assert.equal(result.reasoning_effort, "high");
});

test("learned cap only clamps when the requested effort is above it", () => {
  recordLearnedReasoningEffort("acme", "model-x", ["none", "low", "medium"]);
  const body = { reasoning_effort: "low" };
  const result = sanitizeReasoningEffortForProvider(body, "acme", "model-x") as {
    reasoning_effort: string;
  };
  assert.equal(result.reasoning_effort, "low");
});

test("registry says supportsXHighEffort:false (and no supportsMax path) with a learned cap below 'high': uses the learned cap, not the hardcoded 'high'", () => {
  // claude-haiku-4-5 is registered with supportsXHighEffort:false
  // (open-sse/config/providers/registry/claude/index.ts) and its family is
  // excluded from supportsClaudeMaxEffort (CLAUDE_MAX_EFFORT_UNSUPPORTED_FAMILY_PATTERNS
  // in providerModels.ts), so it reaches the hardcoded-"high" line today —
  // a real registry-covered case. Teach a lower cap and confirm it wins.
  recordLearnedReasoningEffort("claude", "claude-haiku-4-5-20251001", ["none", "low", "medium"]);
  const body = { reasoning_effort: "xhigh" };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "claude",
    "claude-haiku-4-5-20251001"
  ) as {
    reasoning_effort: string;
  };
  assert.equal(result.reasoning_effort, "medium");
});

test("registry says supportsXHighEffort:false with no learned cap: falls back to hardcoded 'high' (unchanged behavior)", () => {
  const body = { reasoning_effort: "xhigh" };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "claude",
    "claude-haiku-4-5-20251001"
  ) as {
    reasoning_effort: string;
  };
  assert.equal(result.reasoning_effort, "high");
});

test("deepseek's non-ordinal max<->xhigh translation is untouched by the learned-cap catch-all", () => {
  recordLearnedReasoningEffort("deepseek", "deepseek-v4", ["none", "low"]);
  const body = { reasoning_effort: "xhigh" };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4") as {
    reasoning_effort: string;
  };
  // deepseek's special case returns early — xhigh -> max, never reaches the catch-all.
  assert.equal(result.reasoning_effort, "max");
});

// #11295: nearest-tier — smallest accepted >= demand — replaces the old
// downgrade-only (greatest accepted <= demand) direction.
test("proactive clamp: medium→high for learned {low,high,max} (nearest-tier, #11295)", () => {
  recordLearnedReasoningEffort("opencode-zen-direct", "x-preview-f-free", ["low", "high", "max"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "medium", model: "x-preview-f-free" },
    "opencode-zen-direct",
    "x-preview-f-free"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "high");
});
test("proactive clamp: xhigh→max for learned {low,high,max} (nearest-tier, #11295)", () => {
  recordLearnedReasoningEffort("opencode-zen-direct", "x-preview-f-free-2", ["low", "high", "max"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "xhigh", model: "x-preview-f-free-2" },
    "opencode-zen-direct",
    "x-preview-f-free-2"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "max");
});
test("proactive clamp: ultra→max for learned {low,high,max}", () => {
  recordLearnedReasoningEffort("opencode-zen-direct", "x-preview-f-free-3", ["low", "high", "max"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "ultra", model: "x-preview-f-free-3" },
    "opencode-zen-direct",
    "x-preview-f-free-3"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "max");
});
test("proactive clamp: ultra→medium for learned {low,medium}", () => {
  recordLearnedReasoningEffort("acme", "m", ["low", "medium"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "ultra", model: "m" },
    "acme",
    "m"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "medium");
});
test("proactive clamp: high→medium for learned {low,medium}", () => {
  recordLearnedReasoningEffort("acme", "m2", ["low", "medium"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "high", model: "m2" },
    "acme",
    "m2"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "medium");
});
// #11295: sub-floor demand (low, below the learned floor {high,max}) now
// clamps up to the floor instead of passing through unchanged.
test("sub-floor clamp: low→high for learned {high,max} (#11295)", () => {
  recordLearnedReasoningEffort("acme", "m3", ["high", "max"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "low", model: "m3" },
    "acme",
    "m3"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "high");
});
test("custom model ultra→medium for learned {low,medium}", () => {
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", "qwen3-coder-30b-a3b-instruct-2", ["low", "medium"]);
  const out = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "ultra", model: "qwen3-coder-30b-a3b-instruct-2" },
    "openai-compatible-chat-eaff6869",
    "qwen3-coder-30b-a3b-instruct-2"
  ) as { reasoning_effort: string };
  assert.equal(out.reasoning_effort, "medium");
});
