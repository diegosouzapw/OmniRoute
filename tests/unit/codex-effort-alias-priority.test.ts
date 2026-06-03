/**
 * Issue #2331 — Codex model alias effort suffixes
 * (`gpt-5.5-xhigh`, `-high`, `-medium`, `-low`) are the user's explicit
 * routing choice and must override a client-injected `reasoning.effort`
 * default. OpenCode auto-injects `reasoning.effort=medium` for GPT-5-family
 * requests, which used to silently mask the suffix.
 *
 * The fix is in `open-sse/executors/codex.ts`: priority is
 *   modelEffort > explicitReasoning > requestReasoningEffort > fallback.
 *
 * These tests exercise the effort-resolution priority directly via a
 * small re-implementation of the resolution chain so we don't have to
 * spin up the full Codex executor (which talks to upstream).
 */
import test from "node:test";
import assert from "node:assert/strict";

// Replicate the priority chain that lives in
// open-sse/executors/codex.ts:1382-1402 so tests fail loudly if someone
// reverts the order.
type Inputs = {
  modelEffort: string | null;
  explicitReasoning: string | undefined;
  requestReasoningEffort: string | undefined;
  fallbackReasoningEffort: string | undefined;
};

function resolveEffort(i: Inputs): string | undefined {
  return (
    i.modelEffort ||
    i.explicitReasoning ||
    i.requestReasoningEffort ||
    i.fallbackReasoningEffort ||
    undefined
  );
}

test("#2331 model suffix wins over client reasoning.effort default", () => {
  const out = resolveEffort({
    modelEffort: "xhigh",
    explicitReasoning: "medium", // OpenCode default
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: undefined,
  });
  assert.equal(out, "xhigh");
});

test("#2331 model suffix wins over body.reasoning_effort field too", () => {
  const out = resolveEffort({
    modelEffort: "low",
    explicitReasoning: undefined,
    requestReasoningEffort: "high",
    fallbackReasoningEffort: undefined,
  });
  assert.equal(out, "low");
});

test("#2331 without suffix, explicit client effort still works (backward compat)", () => {
  const out = resolveEffort({
    modelEffort: null,
    explicitReasoning: "high",
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: "medium",
  });
  assert.equal(out, "high");
});

test("#2331 without suffix or client value, connection fallback applies", () => {
  const out = resolveEffort({
    modelEffort: null,
    explicitReasoning: undefined,
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: "medium",
  });
  assert.equal(out, "medium");
});

test("#2331 no input anywhere → undefined (caller will skip body.reasoning)", () => {
  const out = resolveEffort({
    modelEffort: null,
    explicitReasoning: undefined,
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: undefined,
  });
  assert.equal(out, undefined);
});

// ─── Regression check on the actual source ─────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CODEX_SRC = path.resolve(__dirname, "../../open-sse/executors/codex.ts");

test("#2331 codex.ts still prioritizes modelEffort first in rawEffort chain", () => {
  const src = fs.readFileSync(CODEX_SRC, "utf8");

  // The chain we expect: rawEffort = modelEffort || explicitReasoning || ...
  // Anchor on the assignment so a future refactor that flips priority back
  // (the bug we just fixed) trips this guard.
  const ASSIGNMENT_RE = /const\s+rawEffort\s*=\s*([\s\S]{0,400}?);/;
  const match = src.match(ASSIGNMENT_RE);
  assert.ok(match, "rawEffort assignment not found in codex.ts");

  const chain = match![1].replace(/\s+/g, " ").trim();
  const firstToken = chain.split("||")[0].trim();
  assert.equal(
    firstToken,
    "modelEffort",
    `rawEffort priority chain must start with modelEffort, got: ${chain}`
  );
});
