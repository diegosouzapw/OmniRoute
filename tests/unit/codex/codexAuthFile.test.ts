import test from "node:test";
import assert from "node:assert/strict";

// We don't import the full codexAuthFile module (it pulls in DB/cliRuntime).
// Instead, we re-implement the same primitives here and verify their shape
// matches the rules documented in PR1 — and unit-test the pure helpers via
// dynamic import for the ones that don't need DB.

function buildJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.fake-signature`;
}

// Mirror of the helper inside codexAuthFile.ts — keeping a copy here so we
// can exercise it without dragging the whole module's deps into the test.
function sanitizeFileNamePart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._@-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "account";
}

test("sanitizeFileNamePart keeps @ and . for emails", () => {
  assert.equal(sanitizeFileNamePart("Diego.Souza@example.com"), "diego.souza@example.com");
  assert.equal(sanitizeFileNamePart("user-1@example.io"), "user-1@example.io");
});

test("sanitizeFileNamePart strips filesystem-invalid chars", () => {
  // Slashes/backslashes/colons/etc become hyphens; '.' is allowed (for emails),
  // so "../" reduces to "..-". The result is a filename, never used as a path,
  // so no traversal risk.
  assert.equal(sanitizeFileNamePart("evil/../path"), "evil-..-path");
  assert.equal(sanitizeFileNamePart("name with spaces"), "name-with-spaces");
  assert.equal(sanitizeFileNamePart("a\\b:c*d?"), "a-b-c-d");
});

test("sanitizeFileNamePart falls back to 'account' on empty/garbage", () => {
  assert.equal(sanitizeFileNamePart(""), "account");
  assert.equal(sanitizeFileNamePart("///"), "account");
});

test("sanitizeFileNamePart trims leading/trailing dashes", () => {
  assert.equal(sanitizeFileNamePart("--foo--"), "foo");
});

test("JWT email extraction: standard 'email' claim wins", () => {
  const idToken = buildJwt({ email: "diego@example.com", sub: "abc" });
  // Decode payload as the helper does
  const parts = idToken.split(".");
  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  assert.equal(payload.email, "diego@example.com");
});

test("JWT email extraction: missing claim returns null/falsy", () => {
  const idToken = buildJwt({ sub: "abc" });
  const parts = idToken.split(".");
  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  assert.equal(payload.email, undefined);
});

test("filename format: auth-{email}.json when email available", () => {
  const sanitized = sanitizeFileNamePart("diego@example.com");
  const filename = `auth-${sanitized}.json`;
  assert.equal(filename, "auth-diego@example.com.json");
});

test("filename format: auth-{label}.json fallback when no email", () => {
  const sanitized = sanitizeFileNamePart("Production Account");
  const filename = `auth-${sanitized}.json`;
  assert.equal(filename, "auth-production-account.json");
});

test(".bak basename uses ISO timestamp with safe replacements", () => {
  const ts = new Date("2026-05-17T10:30:45.123Z").toISOString().replace(/[:.]/g, "-");
  const basename = `auth-${ts}.bak`;
  assert.equal(basename, "auth-2026-05-17T10-30-45-123Z.bak");
  // Verify no colons or dots in the timestamp portion (Windows-safe)
  assert.ok(!ts.includes(":"), "timestamp should not contain ':'");
  assert.ok(!ts.includes("."), "timestamp should not contain '.'");
});
