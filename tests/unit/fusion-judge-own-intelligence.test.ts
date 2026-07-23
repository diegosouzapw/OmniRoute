// ABOUTME: buildJudgePrompt must license the judge to use its own knowledge and override
// ABOUTME: the panel — not just synthesize within it — while still embedding panel responses.
import test from "node:test";
import assert from "node:assert/strict";

import { buildJudgePrompt } from "../../open-sse/services/fusion.ts";

test("judge prompt embeds all panel answers, anonymized by source", () => {
  const prompt = buildJudgePrompt([
    { text: "answer-alpha" },
    { text: "answer-beta" },
  ]);
  assert.match(prompt, /\[Source 1\]/);
  assert.match(prompt, /\[Source 2\]/);
  assert.match(prompt, /answer-alpha/);
  assert.match(prompt, /answer-beta/);
  assert.match(prompt, /2 expert models/);
});

test("judge is licensed to use its own intelligence and override the panel", () => {
  const prompt = buildJudgePrompt([{ text: "x" }]);
  // Must NOT cap the judge at panel content ("grounded in that analysis" was the old ceiling).
  assert.doesNotMatch(prompt, /grounded in that analysis/);
  // Must explicitly grant own-reasoning + override authority.
  assert.match(prompt, /OWN reasoning and knowledge/);
  assert.match(prompt, /override/i);
  assert.match(prompt, /not a vote-counter/i);
  // Must keep the honesty guard so it doesn't fabricate.
  assert.match(prompt, /not confident about/i);
});
