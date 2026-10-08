import test from "node:test";
import assert from "node:assert/strict";

// #13945: getProviderCredentials() can return a truthy "diagnostic sentinel"
// object instead of null or real credentials whenever every connection for
// a provider is terminally unusable. isCredentialDiagnosticSentinel()
// centralizes the check so non-chat callers (src/lib/search/executeWebSearch.ts,
// src/lib/embeddings/service.ts, src/app/api/v1/messages/count_tokens/route.ts)
// can treat any of the four sentinel shapes exactly like `null` instead of a
// plain truthiness test that lets the sentinel through as usable credentials.
const { isCredentialDiagnosticSentinel } =
  await import("../../src/sse/services/credentialSentinel.ts");

test("isCredentialDiagnosticSentinel recognizes every diagnostic sentinel shape", () => {
  assert.equal(isCredentialDiagnosticSentinel({ allRateLimited: true, retryAfter: "10s" }), true);
  assert.equal(
    isCredentialDiagnosticSentinel({ allExpired: true, expiredCount: 1, expiredStatus: "banned" }),
    true
  );
  assert.equal(isCredentialDiagnosticSentinel({ blockedByKeyPolicy: true, blockedCount: 1 }), true);
  assert.equal(isCredentialDiagnosticSentinel({ leaseConnectionMismatch: true }), true);
});

test("isCredentialDiagnosticSentinel treats real credentials and null/undefined as non-sentinel", () => {
  assert.equal(isCredentialDiagnosticSentinel({ connectionId: "abc", apiKey: "sk-real" }), false);
  assert.equal(isCredentialDiagnosticSentinel(null), false);
  assert.equal(isCredentialDiagnosticSentinel(undefined), false);
  assert.equal(isCredentialDiagnosticSentinel({}), false);
  // A sentinel field explicitly set to false must not be mistaken for the sentinel.
  assert.equal(
    isCredentialDiagnosticSentinel({ connectionId: "abc", apiKey: "sk-real", allExpired: false }),
    false
  );
});
