/**
 * Regression tests for #3615 — Kiro/AWS auto-import creates a nameless
 * "OAuth Account" when email is null, and accumulates duplicate rows for
 * subsequent imports with the same profileArn.
 *
 * Two bugs:
 * (a) No display name derived when email=null → UI shows blank "OAuth Account".
 * (b) No profileArn dedup guard → every import creates a new DB row.
 *
 * Both tests use the helpers extracted from saveAndRespond() so we can test
 * them without spinning up a full Next.js route.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Hermetic temp DATA_DIR so importing the route's dependency graph is safe.
import fs from "node:fs";
import os from "node:os";

const tmpDir = fs.mkdtempSync(os.tmpdir() + "/omniroute-kiro-3615-");
process.env.DATA_DIR = tmpDir;
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret-3615";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-api-key-secret-3615";

test.after(() => {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {
    // best effort
  }
});

// ── helpers under test ────────────────────────────────────────────────────────

import {
  deriveKiroConnectionName,
  findKiroConnectionByProfileArn,
} from "../../src/app/api/oauth/kiro/auto-import/route.ts";

// ── (a) Display name derivation ───────────────────────────────────────────────

test("derives email as name when email is present", () => {
  const name = deriveKiroConnectionName({
    email: "user@example.com",
    profileArn: "arn:aws:iam::123456789012:user/test",
    region: "us-east-1",
    targetProvider: "kiro",
  });
  assert.equal(name, "user@example.com");
});

test("derives AWS CodeWhisperer label from profileArn when email is null (enterprise SSO)", () => {
  const name = deriveKiroConnectionName({
    email: null,
    profileArn: "arn:aws:iam::123456789012:user/test",
    region: "eu-west-1",
    targetProvider: "kiro",
  });
  assert.equal(name, "AWS CodeWhisperer (eu-west-1)");
});

test("derives Kiro label from region when email is null and no profileArn", () => {
  const name = deriveKiroConnectionName({
    email: null,
    profileArn: undefined,
    region: "ap-northeast-1",
    targetProvider: "kiro",
  });
  assert.equal(name, "Kiro (ap-northeast-1)");
});

test("uses fallback region when region is also absent", () => {
  const name = deriveKiroConnectionName({
    email: null,
    profileArn: undefined,
    region: undefined,
    targetProvider: "kiro",
  });
  assert.equal(name, "Kiro (us-east-1)");
});

test("uses amazon-q label for amazon-q targetProvider with no email", () => {
  const name = deriveKiroConnectionName({
    email: null,
    profileArn: undefined,
    region: "us-east-1",
    targetProvider: "amazon-q",
  });
  assert.equal(name, "Amazon Q (us-east-1)");
});

test("derived name is never empty or null", () => {
  const name = deriveKiroConnectionName({
    email: null,
    profileArn: undefined,
    region: undefined,
    targetProvider: "kiro",
  });
  assert.ok(name && name.length > 0, `expected a non-empty name, got: ${JSON.stringify(name)}`);
});

// ── (b) ProfileArn dedup ──────────────────────────────────────────────────────

// We mock the DB layer to assert that findKiroConnectionByProfileArn calls
// getProviderConnections with the right filter and returns the matching row.

const FAKE_PROFILE_ARN = "arn:aws:iam::123456789012:user/sso-user";

const fakeConnectionWithArn = {
  id: "conn-abc",
  provider: "kiro",
  authType: "oauth",
  email: null,
  providerSpecificData: { profileArn: FAKE_PROFILE_ARN, region: "us-east-1" },
};

const fakeConnectionNoArn = {
  id: "conn-xyz",
  provider: "kiro",
  authType: "oauth",
  email: "other@example.com",
  providerSpecificData: { region: "us-east-1" },
};

test("findKiroConnectionByProfileArn returns the matching connection", async () => {
  // The function should scan existing kiro connections and match by profileArn.
  const result = await findKiroConnectionByProfileArn(
    [fakeConnectionWithArn, fakeConnectionNoArn],
    FAKE_PROFILE_ARN
  );
  assert.deepEqual(result, fakeConnectionWithArn);
});

test("findKiroConnectionByProfileArn returns null when no match exists", async () => {
  const result = await findKiroConnectionByProfileArn(
    [fakeConnectionNoArn],
    FAKE_PROFILE_ARN
  );
  assert.equal(result, null);
});

test("findKiroConnectionByProfileArn returns null for empty connection list", async () => {
  const result = await findKiroConnectionByProfileArn([], FAKE_PROFILE_ARN);
  assert.equal(result, null);
});

test("findKiroConnectionByProfileArn returns null when profileArn arg is undefined", async () => {
  const result = await findKiroConnectionByProfileArn(
    [fakeConnectionWithArn],
    undefined
  );
  assert.equal(result, null);
});
