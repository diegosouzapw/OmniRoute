import { test } from "node:test";
import assert from "node:assert/strict";
import {
  stripPlaceholderFromContent,
  containsReasoningPlaceholder,
} from "../../open-sse/utils/reasoningPlaceholder.ts";
import { NON_ANTHROPIC_THINKING_PLACEHOLDER } from "../../open-sse/translator/helpers/claudeHelper.ts";

test("#8081: containsReasoningPlaceholder detects exact sentinel", () => {
  assert.ok(containsReasoningPlaceholder(NON_ANTHROPIC_THINKING_PLACEHOLDER));
});

test("#8081: containsReasoningPlaceholder detects sentinel with prefix/suffix", () => {
  assert.ok(containsReasoningPlaceholder(`Here is my answer. ${NON_ANTHROPIC_THINKING_PLACEHOLDER}`));
  assert.ok(containsReasoningPlaceholder(`${NON_ANTHROPIC_THINKING_PLACEHOLDER} Done.`));
});

test("#8081: containsReasoningPlaceholder returns false for clean text", () => {
  assert.ok(!containsReasoningPlaceholder("No placeholder here"));
  assert.ok(!containsReasoningPlaceholder(""));
  assert.ok(!containsReasoningPlaceholder(undefined));
  assert.ok(!containsReasoningPlaceholder(null));
});

test("#8081: stripPlaceholderFromContent removes exact placeholder", () => {
  assert.equal(stripPlaceholderFromContent(NON_ANTHROPIC_THINKING_PLACEHOLDER), "");
});

test("#8081: stripPlaceholderFromContent removes placeholder with model prefix", () => {
  const input = `<prefix> ${NON_ANTHROPIC_THINKING_PLACEHOLDER}`;
  assert.equal(stripPlaceholderFromContent(input), "<prefix>");
});

test("#8081: stripPlaceholderFromContent removes placeholder with model suffix", () => {
  const input = `${NON_ANTHROPIC_THINKING_PLACEHOLDER} Done.`;
  assert.equal(stripPlaceholderFromContent(input), "Done.");
});

test("#8081: stripPlaceholderFromContent removes placeholder in middle", () => {
  const input = `Before ${NON_ANTHROPIC_THINKING_PLACEHOLDER} After`;
  assert.equal(stripPlaceholderFromContent(input), "Before After");
});

test("#8081: stripPlaceholderFromContent preserves clean content", () => {
  assert.equal(stripPlaceholderFromContent("No placeholder here"), "No placeholder here");
});

test("#8081: stripPlaceholderFromContent handles empty/null/undefined", () => {
  assert.equal(stripPlaceholderFromContent(""), "");
  assert.equal(stripPlaceholderFromContent(undefined), "");
  assert.equal(stripPlaceholderFromContent(null), "");
});
