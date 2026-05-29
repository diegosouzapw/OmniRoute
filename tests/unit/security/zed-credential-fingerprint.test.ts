/**
 * Regression: fingerprintZedCredential is deterministic, 16 hex chars, and
 * different inputs produce different fingerprints (collision sanity).
 * See docs/security/SOCKET_DEV_FINDINGS.md §2.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fingerprintZedCredential } from "../../../src/lib/zed-oauth/credentialFingerprint.ts";

test("fingerprint is 16 lowercase hex chars", () => {
  const fp = fingerprintZedCredential("zed-openai", "default", "sk-test-token-1234");
  assert.match(fp, /^[0-9a-f]{16}$/);
});

test("fingerprint is deterministic across calls", () => {
  const a = fingerprintZedCredential("zed-openai", "default", "sk-test-token-1234");
  const b = fingerprintZedCredential("zed-openai", "default", "sk-test-token-1234");
  assert.equal(a, b);
});

test("different service produces different fingerprint", () => {
  const a = fingerprintZedCredential("zed-openai", "default", "sk-test-token-1234");
  const b = fingerprintZedCredential("zed-anthropic", "default", "sk-test-token-1234");
  assert.notEqual(a, b);
});

test("different account produces different fingerprint", () => {
  const a = fingerprintZedCredential("zed-openai", "default", "sk-test-token-1234");
  const b = fingerprintZedCredential("zed-openai", "alt-account", "sk-test-token-1234");
  assert.notEqual(a, b);
});

test("different token produces different fingerprint", () => {
  const a = fingerprintZedCredential("zed-openai", "default", "sk-test-token-1234");
  const b = fingerprintZedCredential("zed-openai", "default", "sk-test-token-other");
  assert.notEqual(a, b);
});
