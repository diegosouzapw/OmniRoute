/**
 * Unit tests for Per-Model Combo Support (#563)
 * Tests glob pattern matching and priority ordering.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";

// ──────────────────────────────────────────────────────────
// Inline glob-to-regex (same logic as modelComboMappings.ts)
// ──────────────────────────────────────────────────────────

function globToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`, "i");
}

/**
 * Simulate resolveComboForModel logic in-memory.
 */
function resolveFromMappings(modelStr, mappings) {
  const enabled = mappings.filter((m) => m.enabled).sort((a, b) => b.priority - a.priority);

  for (const mapping of enabled) {
    const regex = globToRegex(mapping.pattern);
    if (regex.test(modelStr)) {
      return mapping.comboName;
    }
  }
  return null;
}

// ──────────────────────────────────────────────────────────
// Test Cases
// ──────────────────────────────────────────────────────────

describe("Model-Combo Mapping: globToRegex", () => {
  test("exact match", () => {
    const re = globToRegex("claude-sonnet-4");
    assert.ok(re.test("claude-sonnet-4"));
    assert.ok(!re.test("claude-opus-4"));
  });

  test("wildcard * matches any characters", () => {
    const re = globToRegex("claude-*-opus*");
    assert.ok(re.test("claude-sonnet-opus-4"));
    assert.ok(re.test("claude-3-opus-20240229"));
    assert.ok(!re.test("gpt-4o"));
  });

  test("wildcard ? matches single character", () => {
    const re = globToRegex("gpt-4?");
    assert.ok(re.test("gpt-4o"));
    assert.ok(re.test("gpt-4t"));
    assert.ok(!re.test("gpt-4oo"));
  });

  test("case-insensitive matching", () => {
    const re = globToRegex("Claude-*");
    assert.ok(re.test("claude-sonnet-4"));
    assert.ok(re.test("CLAUDE-OPUS-4"));
  });

  test("escapes regex special characters", () => {
    const re = globToRegex("model.v2");
    assert.ok(re.test("model.v2"));
    assert.ok(!re.test("modelXv2")); // . should be literal, not regex .
  });

  test("pattern with slash (provider/model)", () => {
    const re = globToRegex("cc/claude-*");
    assert.ok(re.test("cc/claude-opus-4"));
    assert.ok(!re.test("gh/claude-opus-4"));
  });
});

describe("Model-Combo Mapping: resolveFromMappings", () => {
  const mappings = [
    { pattern: "claude-*-opus*", comboName: "frontier-combo", priority: 10, enabled: true },
    { pattern: "claude-sonnet*", comboName: "code-combo", priority: 10, enabled: true },
    { pattern: "gpt-4o*", comboName: "openai-combo", priority: 5, enabled: true },
    { pattern: "gemini-*", comboName: "google-combo", priority: 3, enabled: true },
    { pattern: "disabled-*", comboName: "disabled-combo", priority: 100, enabled: false },
    { pattern: "*", comboName: "catch-all", priority: 0, enabled: true },
  ];

  test("matches opus pattern → frontier-combo", () => {
    assert.equal(resolveFromMappings("claude-3-opus-20240229", mappings), "frontier-combo");
  });

  test("matches sonnet pattern → code-combo", () => {
    assert.equal(resolveFromMappings("claude-sonnet-4", mappings), "code-combo");
  });

  test("matches gpt-4o → openai-combo", () => {
    assert.equal(resolveFromMappings("gpt-4o-mini", mappings), "openai-combo");
  });

  test("matches gemini → google-combo", () => {
    assert.equal(resolveFromMappings("gemini-2.5-flash", mappings), "google-combo");
  });

  test("disabled mappings are skipped", () => {
    assert.notEqual(resolveFromMappings("disabled-model", mappings), "disabled-combo");
    // Falls through to catch-all instead
    assert.equal(resolveFromMappings("disabled-model", mappings), "catch-all");
  });

  test("unknown model falls to catch-all (* pattern)", () => {
    assert.equal(resolveFromMappings("deepseek-chat", mappings), "catch-all");
  });

  test("no mappings returns null", () => {
    assert.equal(resolveFromMappings("any-model", []), null);
  });

  test("priority ordering: higher priority wins when multiple match", () => {
    const overlapping = [
      { pattern: "claude-*", comboName: "generic-claude", priority: 1, enabled: true },
      { pattern: "claude-*-opus*", comboName: "specific-opus", priority: 10, enabled: true },
    ];
    assert.equal(resolveFromMappings("claude-3-opus-4", overlapping), "specific-opus");
  });

  test("priority ordering: lower priority loses even if listed first", () => {
    const overlapping = [
      { pattern: "claude-*-opus*", comboName: "specific-opus", priority: 1, enabled: true },
      { pattern: "claude-*", comboName: "generic-claude", priority: 10, enabled: true },
    ];
    // generic-claude has higher priority (10 > 1), so it wins
    assert.equal(resolveFromMappings("claude-3-opus-4", overlapping), "generic-claude");
  });
});
