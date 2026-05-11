import test from "node:test";
import assert from "node:assert/strict";

const { parseExtraApiKeys } = await import("../../src/shared/utils/parseApiKeys.ts");

// ─── Core parsing ──────────────────────────────────────────────────────────

test("parses newline-separated keys into an added array", () => {
  const result = parseExtraApiKeys("sk-key1\nsk-key2\nsk-key3", []);
  assert.deepEqual(result.added, ["sk-key1", "sk-key2", "sk-key3"]);
  assert.equal(result.duplicates, 0);
});

test("handles CRLF line endings", () => {
  const result = parseExtraApiKeys("sk-key1\r\nsk-key2\r\nsk-key3", []);
  assert.deepEqual(result.added, ["sk-key1", "sk-key2", "sk-key3"]);
  assert.equal(result.duplicates, 0);
});

test("trims leading and trailing whitespace from each key", () => {
  const result = parseExtraApiKeys("  sk-key1  \n\t sk-key2 \t\n  sk-key3", []);
  assert.deepEqual(result.added, ["sk-key1", "sk-key2", "sk-key3"]);
  assert.equal(result.duplicates, 0);
});

// ─── Empty / blank line handling ───────────────────────────────────────────

test("ignores blank lines between keys", () => {
  const result = parseExtraApiKeys("sk-key1\n\n\nsk-key2\n\n", []);
  assert.deepEqual(result.added, ["sk-key1", "sk-key2"]);
  assert.equal(result.duplicates, 0);
});

test("ignores whitespace-only lines", () => {
  const result = parseExtraApiKeys("sk-key1\n   \n\t\nsk-key2", []);
  assert.deepEqual(result.added, ["sk-key1", "sk-key2"]);
  assert.equal(result.duplicates, 0);
});

test("returns empty result for an empty string", () => {
  const result = parseExtraApiKeys("", []);
  assert.deepEqual(result.added, []);
  assert.equal(result.duplicates, 0);
});

test("returns empty result for a whitespace-only string", () => {
  const result = parseExtraApiKeys("   \n  \n  ", []);
  assert.deepEqual(result.added, []);
  assert.equal(result.duplicates, 0);
});

// ─── Single key ────────────────────────────────────────────────────────────

test("handles a single key with no newlines", () => {
  const result = parseExtraApiKeys("sk-onlyone", []);
  assert.deepEqual(result.added, ["sk-onlyone"]);
  assert.equal(result.duplicates, 0);
});

// ─── Duplicate detection ───────────────────────────────────────────────────

test("counts duplicates against the existing keys list", () => {
  const result = parseExtraApiKeys("sk-key1\nsk-key2", ["sk-key1"]);
  assert.deepEqual(result.added, ["sk-key2"]);
  assert.equal(result.duplicates, 1);
});

test("deduplicates repeated keys within the pasted input", () => {
  const result = parseExtraApiKeys("sk-key1\nsk-key2\nsk-key1", []);
  assert.deepEqual(result.added, ["sk-key1", "sk-key2"]);
  assert.equal(result.duplicates, 1);
});

test("counts a key appearing three times in input as two duplicates", () => {
  const result = parseExtraApiKeys("sk-abc\nsk-abc\nsk-abc", []);
  assert.deepEqual(result.added, ["sk-abc"]);
  assert.equal(result.duplicates, 2);
});

test("returns empty added array when all pasted keys already exist", () => {
  const result = parseExtraApiKeys("sk-key1\nsk-key2", ["sk-key1", "sk-key2"]);
  assert.deepEqual(result.added, []);
  assert.equal(result.duplicates, 2);
});

test("handles a mix of new keys and duplicates from existing list", () => {
  const result = parseExtraApiKeys("sk-old\nsk-new1\nsk-old\nsk-new2", ["sk-old"]);
  assert.deepEqual(result.added, ["sk-new1", "sk-new2"]);
  assert.equal(result.duplicates, 2); // sk-old appears in existing AND is repeated in paste
});

// ─── Existing list edge cases ──────────────────────────────────────────────

test("works correctly when existing list is empty", () => {
  const result = parseExtraApiKeys("sk-a\nsk-b", []);
  assert.deepEqual(result.added, ["sk-a", "sk-b"]);
  assert.equal(result.duplicates, 0);
});

test("preserves insertion order for added keys", () => {
  const result = parseExtraApiKeys("sk-z\nsk-a\nsk-m", []);
  assert.deepEqual(result.added, ["sk-z", "sk-a", "sk-m"]);
});
