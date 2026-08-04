import { test } from "node:test";
import assert from "node:assert/strict";
import { globToRegex } from "@/shared/utils/globPattern";

test("globToRegex — * matches any sequence of characters", () => {
  const re = globToRegex("claude-sonnet*");
  assert.equal(re.test("claude-sonnet-4"), true);
  assert.equal(re.test("claude-sonnet"), true);
  assert.equal(re.test("claude-opus-4"), false);
});

test("globToRegex — ? matches exactly one character", () => {
  const re = globToRegex("gpt-?");
  assert.equal(re.test("gpt-4"), true);
  assert.equal(re.test("gpt-40"), false);
  assert.equal(re.test("gpt-"), false);
});

test("globToRegex — case-insensitive", () => {
  const re = globToRegex("Claude-Sonnet*");
  assert.equal(re.test("claude-sonnet-4"), true);
  assert.equal(re.test("CLAUDE-SONNET-4"), true);
});

test("globToRegex — anchored (no partial match)", () => {
  const re = globToRegex("sonnet");
  assert.equal(re.test("claude-sonnet-4"), false);
  assert.equal(re.test("sonnet"), true);
});

test("globToRegex — escapes regex special characters", () => {
  const re = globToRegex("gpt-4.1");
  assert.equal(re.test("gpt-4.1"), true);
  assert.equal(re.test("gpt-4X1"), false); // literal dot, not "any char"
});
