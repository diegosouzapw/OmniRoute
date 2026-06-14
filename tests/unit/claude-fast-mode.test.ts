import test from "node:test";
import assert from "node:assert/strict";

const {
  shouldRequestClaudeFastMode,
  CLAUDE_FAST_MODE_DEFAULT_MODELS,
  getClaudeFastModeSupportedModels,
  isClaudeFastModeEnabled,
} = await import("../../src/lib/providers/claudeFastMode.ts");

const enabledSettings = { claudeFastMode: true };
const disabledSettings = { claudeFastMode: false };

test("shouldRequestClaudeFastMode returns false when fast mode is disabled", () => {
  assert.equal(shouldRequestClaudeFastMode(disabledSettings, "claude-opus-4-8"), false);
  assert.equal(shouldRequestClaudeFastMode({}, "claude-opus-4-8"), false);
  assert.equal(shouldRequestClaudeFastMode(null, "claude-opus-4-8"), false);
});

test("shouldRequestClaudeFastMode returns false for non-string or empty modelId", () => {
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, null), false);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, undefined), false);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, ""), false);
});

test("shouldRequestClaudeFastMode returns true for claude-opus-4-8 exact match", () => {
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-opus-4-8"), true);
});

test("shouldRequestClaudeFastMode prefix-matches claude-opus-4-8 with dated suffix", () => {
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-opus-4-8-20260528"), true);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-opus-4-8-20260101"), true);
});

test("shouldRequestClaudeFastMode returns true for claude-opus-4-7 and claude-opus-4-6", () => {
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-opus-4-7"), true);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-opus-4-6"), true);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-opus-4-7-20250101"), true);
});

test("shouldRequestClaudeFastMode returns false for non-Opus models", () => {
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-sonnet-4-6"), false);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "claude-haiku-4-5"), false);
  assert.equal(shouldRequestClaudeFastMode(enabledSettings, "gpt-4o"), false);
});

test("CLAUDE_FAST_MODE_DEFAULT_MODELS includes claude-opus-4-8", () => {
  assert.ok(
    CLAUDE_FAST_MODE_DEFAULT_MODELS.includes("claude-opus-4-8"),
    "claude-opus-4-8 must be in CLAUDE_FAST_MODE_DEFAULT_MODELS"
  );
});

test("getClaudeFastModeSupportedModels returns default list when none configured", () => {
  const models = getClaudeFastModeSupportedModels({});
  assert.ok(models.includes("claude-opus-4-8"));
  assert.ok(models.includes("claude-opus-4-7"));
  assert.ok(models.includes("claude-opus-4-6"));
});

test("getClaudeFastModeSupportedModels respects custom override list", () => {
  const settings = { claudeFastMode: { enabled: true, supportedModels: ["my-custom-model"] } };
  const models = getClaudeFastModeSupportedModels(settings);
  assert.deepEqual(models, ["my-custom-model"]);
});

test("isClaudeFastModeEnabled handles boolean and object shape", () => {
  assert.equal(isClaudeFastModeEnabled({ claudeFastMode: true }), true);
  assert.equal(isClaudeFastModeEnabled({ claudeFastMode: false }), false);
  assert.equal(isClaudeFastModeEnabled({ claudeFastMode: { enabled: true } }), true);
  assert.equal(isClaudeFastModeEnabled({ claudeFastMode: { enabled: false } }), false);
  assert.equal(isClaudeFastModeEnabled({}), false);
});
