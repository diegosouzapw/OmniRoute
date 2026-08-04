import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the cursor executor pure-helper extraction.
// Two pure leaves: cursor/prompt.ts (isRecordLike + toolChoiceDirectiveLine +
// buildCursorOutputConstraints) and cursor/composer.ts (composer thinking decoding).
// The host re-exports the 3 composer helpers for external importers (tests).
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "cursor.ts");
const PROMPT = join(EXE, "cursor/prompt.ts");
const COMPOSER = join(EXE, "cursor/composer.ts");

test("leaves are pure and do not import the host", () => {
  const prompt = readFileSync(PROMPT, "utf8");
  const composer = readFileSync(COMPOSER, "utf8");
  assert.match(prompt, /export function toolChoiceDirectiveLine\b/);
  assert.match(prompt, /export function buildCursorOutputConstraints\b/);
  assert.match(composer, /export function isComposerModel\b/);
  assert.doesNotMatch(prompt, /from "\.\.\/cursor\.ts"/);
  assert.doesNotMatch(composer, /from "\.\.\/cursor\.ts"/);
});

test("host re-exports the composer helpers", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/cursor\/composer\.ts"/);
  assert.match(host, /from "\.\/cursor\/prompt\.ts"/);
});

test("composer thinking decoding behaves via the leaf", async () => {
  const { visibleComposerContentFromThinking, composerReasoningRemainder, isComposerModel } =
    await import("../../open-sse/executors/cursor/composer.ts");
  assert.equal(isComposerModel("composer-1"), true);
  assert.equal(isComposerModel("gpt-4"), false);
  assert.equal(visibleComposerContentFromThinking("hidden</think>visible"), "visible");
  assert.equal(composerReasoningRemainder("hidden</think>visible"), "hidden");
});

test("prompt constraint builder behaves via the leaf", async () => {
  const { toolChoiceDirectiveLine, buildCursorOutputConstraints } =
    await import("../../open-sse/executors/cursor/prompt.ts");
  assert.match(toolChoiceDirectiveLine("required"), /MUST call at least one/);
  assert.equal(toolChoiceDirectiveLine("auto"), "");
  assert.match(buildCursorOutputConstraints({ max_tokens: 100 }), /100 output tokens/);
  assert.equal(buildCursorOutputConstraints({}), "");
});
