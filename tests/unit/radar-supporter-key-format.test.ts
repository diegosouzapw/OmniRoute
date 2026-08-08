/**
 * tests/unit/radar-supporter-key-format.test.ts
 *
 * TDD guard for src/lib/radar/supporterKey.ts — the pure, client-safe
 * "omr_" + 40 lowercase hex chars format check shared by:
 *   - the paste-key input on the activation screen (client-side UX check
 *     before the fetch — the server always revalidates, this is not a
 *     security boundary);
 *   - POST /api/radar/settings' Zod schema (server-side, authoritative).
 *
 * Pure module, no DB/network — both directions covered: valid accepted,
 * every invalid shape rejected.
 */

import test from "node:test";
import assert from "node:assert/strict";

const VALID_KEY = "omr_abcdef01234567890abcdef01234567890abcdef";

test("isValidSupporterKeyFormat: accepts 'omr_' + 40 lowercase hex chars", async () => {
  const { isValidSupporterKeyFormat } = await import("../../src/lib/radar/supporterKey.ts");
  assert.equal(isValidSupporterKeyFormat(VALID_KEY), true);
  // All-digit and all-letter (a-f) 40-char bodies are both valid hex.
  assert.equal(isValidSupporterKeyFormat("omr_" + "0".repeat(40)), true);
  assert.equal(isValidSupporterKeyFormat("omr_" + "f".repeat(40)), true);
});

test("isValidSupporterKeyFormat: rejects missing/wrong prefix", async () => {
  const { isValidSupporterKeyFormat } = await import("../../src/lib/radar/supporterKey.ts");
  assert.equal(isValidSupporterKeyFormat("abcdef01234567890abcdef01234567890abcdef"), false);
  assert.equal(isValidSupporterKeyFormat("omr-abcdef01234567890abcdef01234567890abcdef"), false);
  assert.equal(isValidSupporterKeyFormat("OMR_abcdef01234567890abcdef01234567890abcdef"), false);
});

test("isValidSupporterKeyFormat: rejects short/long hex bodies", async () => {
  const { isValidSupporterKeyFormat } = await import("../../src/lib/radar/supporterKey.ts");
  assert.equal(isValidSupporterKeyFormat("omr_abcdef"), false, "too short (6 hex chars)");
  assert.equal(isValidSupporterKeyFormat("omr_" + "a".repeat(39)), false, "39 hex chars — one short");
  assert.equal(isValidSupporterKeyFormat("omr_" + "a".repeat(41)), false, "41 hex chars — one over");
});

test("isValidSupporterKeyFormat: rejects uppercase hex", async () => {
  const { isValidSupporterKeyFormat } = await import("../../src/lib/radar/supporterKey.ts");
  assert.equal(isValidSupporterKeyFormat("omr_ABCDEF01234567890abcdef01234567890abcdef"), false);
});

test("isValidSupporterKeyFormat: rejects empty string and whitespace", async () => {
  const { isValidSupporterKeyFormat } = await import("../../src/lib/radar/supporterKey.ts");
  assert.equal(isValidSupporterKeyFormat(""), false);
  assert.equal(isValidSupporterKeyFormat("   "), false);
  assert.equal(isValidSupporterKeyFormat(`  ${VALID_KEY}  `), false, "surrounding whitespace not trimmed by the helper itself");
});

test("isValidSupporterKeyFormat: rejects non-hex characters in the body", async () => {
  const { isValidSupporterKeyFormat } = await import("../../src/lib/radar/supporterKey.ts");
  assert.equal(isValidSupporterKeyFormat("omr_" + "g".repeat(40)), false);
  assert.equal(isValidSupporterKeyFormat("omr_" + "z".repeat(40)), false);
});

test("SUPPORTER_KEY_REGEX: exported and matches the same behavior as the helper", async () => {
  const { SUPPORTER_KEY_REGEX, isValidSupporterKeyFormat } = await import(
    "../../src/lib/radar/supporterKey.ts"
  );
  assert.ok(SUPPORTER_KEY_REGEX instanceof RegExp);
  assert.equal(SUPPORTER_KEY_REGEX.test(VALID_KEY), isValidSupporterKeyFormat(VALID_KEY));
});
