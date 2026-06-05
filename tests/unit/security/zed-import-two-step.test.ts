/**
 * Regression: confirmedAccounts validation helpers reject malformed bodies and
 * filterCredentialsByConfirmation only returns credentials whose fingerprint
 * matches a confirmed entry. See docs/security/SOCKET_DEV_FINDINGS.md §2.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isConfirmedAccount,
  parseConfirmedAccounts,
  filterCredentialsByConfirmation,
} from "../../../src/lib/zed-oauth/confirmedAccounts.ts";
import { fingerprintZedCredential } from "../../../src/lib/zed-oauth/credentialFingerprint.ts";

test("isConfirmedAccount rejects null / wrong-typed entries", () => {
  assert.equal(isConfirmedAccount(null), false);
  assert.equal(isConfirmedAccount("string"), false);
  assert.equal(isConfirmedAccount({}), false);
  assert.equal(isConfirmedAccount({ service: "zed-openai" }), false);
  assert.equal(
    isConfirmedAccount({ service: "zed-openai", account: "default", fingerprint: "" }),
    false
  );
  assert.equal(
    isConfirmedAccount({ service: 123, account: "default", fingerprint: "abc" }),
    false
  );
});

test("isConfirmedAccount accepts a fully-formed entry", () => {
  assert.equal(
    isConfirmedAccount({ service: "zed-openai", account: "default", fingerprint: "abc123" }),
    true
  );
});

test("parseConfirmedAccounts returns null for missing / malformed bodies", () => {
  assert.equal(parseConfirmedAccounts(null), null);
  assert.equal(parseConfirmedAccounts({}), null);
  assert.equal(parseConfirmedAccounts({ confirmedAccounts: "not-an-array" }), null);
  assert.equal(
    parseConfirmedAccounts({ confirmedAccounts: [{ service: 1 }] }),
    null,
    "an array with a malformed entry should fail validation"
  );
});

test("parseConfirmedAccounts returns the list when every entry is valid", () => {
  const result = parseConfirmedAccounts({
    confirmedAccounts: [
      { service: "zed-openai", account: "default", fingerprint: "abc123" },
      { service: "zed-anthropic", account: "default", fingerprint: "def456" },
    ],
  });
  assert.ok(result);
  assert.equal(result!.length, 2);
});

test("filterCredentialsByConfirmation only returns credentials matching the fingerprint set", () => {
  const credentials = [
    { provider: "openai", service: "zed-openai", account: "default", token: "sk-real-1" },
    { provider: "anthropic", service: "zed-anthropic", account: "default", token: "sk-real-2" },
    { provider: "google", service: "zed-google", account: "default", token: "sk-real-3" },
  ];
  // Operator confirmed only openai and anthropic; the matching fingerprints
  // come from the same algorithm used by /discover.
  const confirmed = [
    {
      service: "zed-openai",
      account: "default",
      fingerprint: fingerprintZedCredential("zed-openai", "default", "sk-real-1"),
    },
    {
      service: "zed-anthropic",
      account: "default",
      fingerprint: fingerprintZedCredential("zed-anthropic", "default", "sk-real-2"),
    },
  ];

  const result = filterCredentialsByConfirmation(credentials, confirmed);
  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((c) => c.provider).sort(),
    ["anthropic", "openai"]
  );
});

test("filterCredentialsByConfirmation rejects entries with mismatched fingerprint (token rotation)", () => {
  const credentials = [
    { provider: "openai", service: "zed-openai", account: "default", token: "sk-NEW-rotated" },
  ];
  // Operator's confirmation references the OLD token's fingerprint.
  const confirmed = [
    {
      service: "zed-openai",
      account: "default",
      fingerprint: fingerprintZedCredential("zed-openai", "default", "sk-old-token"),
    },
  ];

  const result = filterCredentialsByConfirmation(credentials, confirmed);
  assert.equal(
    result.length,
    0,
    "fingerprint mismatch (token rotated since discover) must skip the credential"
  );
});
