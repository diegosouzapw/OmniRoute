// Regression tests for granular reasoning_effort handling on GitHub Copilot
// Claude models (upstream port: decolua/9router#791 by @baslr).
//
// Pre-port behaviour: the github branch of sanitizeReasoningEffortForProvider
// stripped reasoning_effort for ANY model whose name matched /(claude|haiku|oswe)/i,
// so Claude Opus 4.6 and Claude Sonnet 4.6 via GitHub Copilot never received
// extended-thinking configuration even though both backends support it.
//
// Post-port behaviour: reasoning_effort is preserved on Claude Opus 4.6 and
// Claude Sonnet 4.6 (Copilot routes both to Anthropic's chat/completions
// surface where reasoning_effort is honored), and continues to be stripped on
// Claude Haiku 4.5 and Claude Opus 4.7 (rejected upstream).
//
// Note: OmniRoute's openai→claude translator already maps reasoning_effort →
// thinking.budget_tokens far more richly than upstream's tiny effortToBudget
// table (handles `max`, `xhigh`, adaptive models, and fits to max_tokens), so
// only the github-executor half of upstream PR #791 needs porting.

import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");

test("github/claude-opus-4.6: preserves reasoning_effort (#791)", () => {
  const body = {
    model: "claude-opus-4.6",
    reasoning_effort: "high",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-opus-4.6", null);
  assert.equal((result as any).reasoning_effort, "high", "Opus 4.6 must keep reasoning_effort");
});

test("github/claude-sonnet-4.6: preserves reasoning_effort (#791)", () => {
  const body = {
    model: "claude-sonnet-4.6",
    reasoning_effort: "medium",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-sonnet-4.6", null);
  assert.equal((result as any).reasoning_effort, "medium", "Sonnet 4.6 must keep reasoning_effort");
});

test("github/claude-haiku-4.5: still strips reasoning_effort (#791)", () => {
  const body = {
    model: "claude-haiku-4.5",
    reasoning_effort: "high",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-haiku-4.5", null);
  assert.equal(
    (result as any).reasoning_effort,
    undefined,
    "Haiku 4.5 rejects reasoning_effort upstream — must strip"
  );
});

test("github/claude-opus-4.7: still strips reasoning_effort (#791)", () => {
  const body = {
    model: "claude-opus-4.7",
    reasoning_effort: "high",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-opus-4.7", null);
  assert.equal(
    (result as any).reasoning_effort,
    undefined,
    "Opus 4.7 rejects reasoning_effort upstream — must strip"
  );
});

test("github/claude-opus-4.6: preserves nested reasoning.effort (#791)", () => {
  const body = {
    model: "claude-opus-4.6",
    reasoning: { effort: "high", summary: "auto" },
    input: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-opus-4.6", null);
  assert.equal((result as any).reasoning.effort, "high");
  assert.equal((result as any).reasoning.summary, "auto", "other reasoning fields preserved");
});

test("github/claude-sonnet-4.5: still strips reasoning_effort (older Sonnet)", () => {
  // Upstream PR #791 explicitly opts in only Opus 4.6 and Sonnet 4.6. Older
  // Sonnet variants (4.5) keep the historical strip — Copilot has not made
  // reasoning_effort available for them.
  const body = {
    model: "claude-sonnet-4.5",
    reasoning_effort: "high",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-sonnet-4.5", null);
  assert.equal((result as any).reasoning_effort, undefined);
});

test("github/oswe-vscode-prime: still strips reasoning_effort", () => {
  // Regression guard: the oswe branch of the rejection pattern must remain.
  const body = {
    model: "oswe-vscode-prime",
    reasoning_effort: "high",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "oswe-vscode-prime", null);
  assert.equal((result as any).reasoning_effort, undefined);
});

test("github/gpt-5.4: pass-through (non-Claude unchanged)", () => {
  // Regression guard: non-Claude github models keep reasoning_effort.
  const body = {
    model: "gpt-5.4",
    reasoning_effort: "high",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "gpt-5.4", null);
  assert.equal((result as any).reasoning_effort, "high");
});
