import test from "node:test";
import assert from "node:assert/strict";

import { macCertOutputHasFingerprint } from "../../src/mitm/cert/install.ts";

// Regression for #6204 (#6134): macOS `security find-certificate -a -Z` prints
// the SHA-1 as a colon-less hex string, while getCertFingerprint() returns a
// colon-separated one. The old `output.toUpperCase().includes(fingerprint)`
// check therefore never matched, so the cert was always reported as
// not-installed and the sudo install re-prompted on every run.

const FINGERPRINT_WITH_COLONS = "AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01";
// What `security find-certificate -a -Z` actually emits (no colons).
const MAC_SECURITY_OUTPUT = [
  "keychain: /Library/Keychains/System.keychain",
  "SHA-1 hash: ABCDEF0123456789ABCDEF0123456789ABCDEF01",
  '"labl"<blob>="OmniRoute MITM Root CA"',
].join("\n");

test("macCertOutputHasFingerprint matches colon-less security output against a colon-separated fingerprint", () => {
  assert.equal(macCertOutputHasFingerprint(MAC_SECURITY_OUTPUT, FINGERPRINT_WITH_COLONS), true);
});

test("macCertOutputHasFingerprint returns false when the fingerprint is absent", () => {
  const other = "SHA-1 hash: 00000000000000000000000000000000000000FF";
  assert.equal(macCertOutputHasFingerprint(other, FINGERPRINT_WITH_COLONS), false);
});

test("macCertOutputHasFingerprint is case-insensitive", () => {
  const lower = MAC_SECURITY_OUTPUT.toLowerCase();
  assert.equal(macCertOutputHasFingerprint(lower, FINGERPRINT_WITH_COLONS), true);
});

test("pre-fix behavior (raw substring incl. colons) would have missed — documents the bug", () => {
  // The pre-#6204 check was `output.toUpperCase().includes(fingerprint)`.
  assert.equal(MAC_SECURITY_OUTPUT.toUpperCase().includes(FINGERPRINT_WITH_COLONS), false);
});
