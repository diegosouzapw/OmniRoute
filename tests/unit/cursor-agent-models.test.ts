import test from "node:test";
import assert from "node:assert/strict";
import {
  humanizeCursorModelId,
  parseCursorAgentModels,
} from "../../src/lib/providerModels/cursorAgent";

test("parseCursorAgentModels returns every reported id including auto and composer-*", () => {
  const text =
    "Cannot use this model: --help. Available models: auto, composer-2, composer-2-fast, gpt-5.3-codex-low, claude-opus-4-7-thinking-high, kimi-k2.5";
  assert.deepEqual(parseCursorAgentModels(text), [
    "auto",
    "composer-2",
    "composer-2-fast",
    "gpt-5.3-codex-low",
    "claude-opus-4-7-thinking-high",
    "kimi-k2.5",
  ]);
});

test("parseCursorAgentModels deduplicates and trims", () => {
  assert.deepEqual(parseCursorAgentModels("Available models: a, a , b"), ["a", "b"]);
});

test("parseCursorAgentModels returns [] when the marker is missing", () => {
  assert.deepEqual(parseCursorAgentModels("nothing here"), []);
});

test("humanizeCursorModelId pretty-prints common patterns", () => {
  assert.equal(humanizeCursorModelId("auto"), "Auto (Server Picks)");
  assert.equal(humanizeCursorModelId("composer-2-fast"), "Composer 2 Fast");
  assert.equal(humanizeCursorModelId("gpt-5.3-codex-low"), "GPT 5.3 Codex Low");
  assert.equal(humanizeCursorModelId("gpt-5.5-extra-high-fast"), "GPT 5.5 Extra High Fast");
  // Collapses claude-opus-4-7-* version pattern into 4.7
  assert.equal(
    humanizeCursorModelId("claude-opus-4-7-thinking-high"),
    "Claude Opus 4.7 Thinking High"
  );
  assert.equal(humanizeCursorModelId("kimi-k2.5"), "Kimi K2.5");
  assert.equal(humanizeCursorModelId("gemini-3.1-pro"), "Gemini 3.1 Pro");
  assert.equal(humanizeCursorModelId("claude-4-sonnet-thinking"), "Claude 4 Sonnet Thinking");
});
