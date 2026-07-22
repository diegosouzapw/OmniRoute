import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// providerLimits.ts touches the DB singleton at import time; give it a scratch dir.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rotating-expired-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "rotating-expired-guard-secret";

const { quotaPathShouldMarkExpired, shouldAttemptRotatingRefresh } =
  await import("../../src/lib/usage/providerLimits.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Regression: the quota sync reuses a rotating provider's (possibly expired)
// access_token without refreshing it (#3019, to avoid the Auth0 family-revocation
// cascade). A "token expired" from that fetch is recoverable, NOT a real expiry —
// flagging it expired hid freshly-added Codex accounts from the quota page even
// though a providers-page refresh turned them green.
test("rotating providers are NEVER flagged expired from the quota path", () => {
  for (const provider of ["codex", "openai", "claude", "kiro", "gitlab-duo"]) {
    assert.equal(
      quotaPathShouldMarkExpired(provider, "Token expired, please re-authenticate", "active"),
      false,
      `${provider} (rotating) must not be marked expired by the quota sync`
    );
  }
});

test("non-rotating OAuth providers are still flagged expired on a genuine auth error", () => {
  assert.equal(quotaPathShouldMarkExpired("github", "token expired", "active"), true);
  assert.equal(quotaPathShouldMarkExpired("github", "Unauthorized", "active"), true);
  assert.equal(quotaPathShouldMarkExpired("cursor", "Access denied", "active"), true);
});

test("non-auth usage messages never trigger an expired flag", () => {
  assert.equal(quotaPathShouldMarkExpired("github", "rate limit exceeded", "active"), false);
  assert.equal(quotaPathShouldMarkExpired("github", "", "active"), false);
  assert.equal(quotaPathShouldMarkExpired("github", undefined, "active"), false);
  assert.equal(quotaPathShouldMarkExpired("github", { nested: true }, "active"), false);
});

test("an already-expired connection is left untouched (no redundant write)", () => {
  assert.equal(quotaPathShouldMarkExpired("github", "token expired", "expired"), false);
  assert.equal(quotaPathShouldMarkExpired("codex", "token expired", "expired"), false);
});

// Option 1: the on-demand per-connection path may refresh a rotating provider's
// expired token (cascade-safe via serializeRefresh), so its live quota shows;
// the bulk scheduler (allowRotatingRefresh falsy) must keep #3019 and never do it.
test("bulk path never refreshes rotating providers (preserves #3019)", () => {
  for (const provider of ["codex", "openai", "claude", "kiro", "gitlab-duo"]) {
    assert.equal(shouldAttemptRotatingRefresh(provider, undefined), false, `${provider} bulk`);
    assert.equal(
      shouldAttemptRotatingRefresh(provider, false),
      false,
      `${provider} explicit false`
    );
  }
});

test("on-demand path (allowRotatingRefresh=true) may refresh rotating providers", () => {
  for (const provider of ["codex", "openai", "claude"]) {
    assert.equal(shouldAttemptRotatingRefresh(provider, true), true, `${provider} on-demand`);
  }
});

test("non-rotating providers are always eligible to refresh regardless of the flag", () => {
  for (const flag of [undefined, false, true] as const) {
    assert.equal(shouldAttemptRotatingRefresh("github", flag), true);
    assert.equal(shouldAttemptRotatingRefresh("cursor", flag), true);
  }
});
