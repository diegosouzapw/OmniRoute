import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DB-backed access-token store. Uses an isolated DATA_DIR + closes the handle in
// test.after (CLAUDE.md "Database Handles in Tests" — otherwise Node's runner hangs).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-access-tokens-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const at = await import("../../src/lib/db/accessTokens.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

test("createAccessToken returns a secret prefixed oma_live_ and a masked record", () => {
  const { record, secret } = at.createAccessToken({ name: "laptop", scope: "write" });
  assert.match(secret, /^oma_live_/);
  assert.equal(record.name, "laptop");
  assert.equal(record.scope, "write");
  assert.ok(record.id.startsWith("tok_"));
  assert.ok(secret.startsWith(record.tokenPrefix), "prefix must be a prefix of the secret");
  assert.equal(record.revokedAt, null);
});

test("createAccessToken defaults to the safest scope (read) for invalid input", () => {
  const { record } = at.createAccessToken({ name: "x", scope: "bogus" });
  assert.equal(record.scope, "read");
});

test("createAccessToken rejects an empty name", () => {
  assert.throws(() => at.createAccessToken({ name: "   ", scope: "read" }), /name is required/);
});

test("verifyAccessToken returns identity+scope for a valid secret, null for wrong", () => {
  const { secret } = at.createAccessToken({ name: "verify-me", scope: "admin" });
  const v = at.verifyAccessToken(secret);
  assert.ok(v);
  assert.equal(v?.scope, "admin");
  assert.equal(v?.name, "verify-me");
  assert.equal(at.verifyAccessToken("oma_live_wrong"), null);
  assert.equal(at.verifyAccessToken(""), null);
  assert.equal(at.verifyAccessToken(null), null);
});

test("only the hash is stored — the plaintext secret never lands in the DB", () => {
  const { secret, record } = at.createAccessToken({ name: "secrecy", scope: "read" });
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT token_hash, token_prefix FROM cli_access_tokens WHERE id = ?")
    .get(record.id) as { token_hash: string; token_prefix: string };
  assert.notEqual(row.token_hash, secret, "must store hash, not plaintext");
  assert.equal(row.token_hash, at.hashAccessToken(secret));
  assert.equal(row.token_hash.length, 64, "sha-256 hex");
});

test("verifyAccessToken stamps last_used_at", () => {
  const { secret, record } = at.createAccessToken({ name: "touch", scope: "read" });
  assert.equal(at.getAccessToken(record.id)?.lastUsedAt, null);
  at.verifyAccessToken(secret);
  assert.notEqual(at.getAccessToken(record.id)?.lastUsedAt, null);
});

test("revoked tokens fail verification", () => {
  const { secret, record } = at.createAccessToken({ name: "to-revoke", scope: "write" });
  assert.ok(at.verifyAccessToken(secret));
  assert.equal(at.revokeAccessToken(record.id), true);
  assert.equal(at.verifyAccessToken(secret), null);
  // idempotent: revoking again is a no-op
  assert.equal(at.revokeAccessToken(record.id), false);
});

test("revokeAccessToken works by display prefix too", () => {
  const { secret, record } = at.createAccessToken({ name: "by-prefix", scope: "read" });
  assert.equal(at.revokeAccessToken(record.tokenPrefix), true);
  assert.equal(at.verifyAccessToken(secret), null);
});

test("expired tokens fail verification", () => {
  const past = new Date(Date.now() - 60_000).toISOString();
  const { secret } = at.createAccessToken({ name: "expired", scope: "admin", expiresAt: past });
  assert.equal(at.verifyAccessToken(secret), null);
});

test("listAccessTokens returns masked records (no secret/hash field)", () => {
  at.createAccessToken({ name: "listed", scope: "read" });
  const list = at.listAccessTokens();
  assert.ok(list.length >= 1);
  for (const rec of list) {
    assert.ok("tokenPrefix" in rec);
    assert.ok(!("secret" in rec));
    assert.ok(!("tokenHash" in rec));
    assert.ok(!("token_hash" in rec));
  }
});
