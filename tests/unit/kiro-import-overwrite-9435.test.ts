/**
 * TDD for #9435 — Kiro import token endpoint overwrites existing connection
 * instead of creating new one for Builder ID / social imports.
 *
 * Root cause: `findKiroConnectionByIdentity` matches by cached OIDC `clientId`
 * before `email`. When importing a second Builder ID token, the shared machine-wide
 * cached `clientId` matches the FIRST connection instead of creating a new one.
 *
 * The fix: do NOT pass `clientId` in the identity object for Non-IDC (Builder ID /
 * social) imports at the route level, so the fallback to email-based matching works.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { findKiroConnectionByIdentity } from "../../src/lib/oauth/kiroConnectionIdentity.js";

// ── Unit-level repro: the function matches by shared clientId before email ──────
// These two connections simulate two distinct Kiro Builder ID accounts on the same
// machine. They share a cached OIDC clientId but have different emails.
const aliceAndBob = [
  {
    id: "conn-alice",
    authType: "oauth",
    email: "alice@example.com",
    providerSpecificData: { clientId: "shared-cached-cid" },
  },
  {
    id: "conn-bob",
    authType: "oauth",
    email: "bob@example.com",
    providerSpecificData: { clientId: "shared-cached-cid" },
  },
];

test("#9435 findKiroConnectionByIdentity with shared clientId + distinct emails: when BOTH clientId and email are passed, clientId match wins (the bug)", () => {
  // Searching with the shared cached clientId + Bob's email.
  // The function checks clientId FIRST so it returns conn-alice (first match by
  // shared clientId), even though conn-bob is the correct one (email match).
  const match = findKiroConnectionByIdentity(aliceAndBob, {
    clientId: "shared-cached-cid",
    email: "bob@example.com",
  });
  assert.equal(
    match?.id,
    "conn-alice",
    `BUG: expected conn-alice (first match by shared clientId), got: ${match?.id}`
  );
});

test("#9435 findKiroConnectionByIdentity with ONLY email (no clientId): correctly finds Bob by email", () => {
  // When clientId is NOT in the identity (as the fix does for non-IDC imports),
  // the function falls through to email matching and finds the right connection.
  const match = findKiroConnectionByIdentity(aliceAndBob, {
    email: "bob@example.com",
  });
  assert.equal(match?.id, "conn-bob", `expected conn-bob (email match), got: ${match?.id}`);
});

test("#9435 findKiroConnectionByIdentity with ONLY email for Alice: correctly finds Alice by email", () => {
  const match = findKiroConnectionByIdentity(aliceAndBob, {
    email: "alice@example.com",
  });
  assert.equal(match?.id, "conn-alice", `expected conn-alice (email match), got: ${match?.id}`);
});

test("#9435 findKiroConnectionByIdentity with shared clientId + new email (no match): returns null", () => {
  // A third user with no existing connection should get null (create new connection)
  const match = findKiroConnectionByIdentity(aliceAndBob, {
    clientId: "shared-cached-cid",
    email: "charlie@example.com",
  });
  // With clientId in the identity, it matches conn-alice (by shared clientId)
  // instead of returning null — this IS the bug.
  assert.equal(
    match?.id,
    "conn-alice",
    `BUG: expected conn-alice (first match by shared clientId), got: ${match?.id} — charlie is new, should not match any`
  );
});

test("#9435 findKiroConnectionByIdentity with ONLY email (no clientId) for new user: correctly returns null (create new)", () => {
  // Without clientId, the function checks email and finds no match → null = create new
  const match = findKiroConnectionByIdentity(aliceAndBob, {
    email: "charlie@example.com",
  });
  assert.equal(match, null, `expected null for new user when no clientId, got: ${match?.id}`);
});
