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
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("verifyAccessToken writes last_used_at once per window", () => {
  const { secret, record } = at.createAccessToken({ name: "throttle", scope: "read" });
  const db = core.getDbInstance();
  let writes = 0;
  const originalPrepare = db.prepare.bind(db);
  db.prepare = ((sql: string) => {
    const statement = originalPrepare(sql);
    if (/UPDATE\s+cli_access_tokens\s+SET\s+last_used_at/i.test(sql)) {
      const originalRun = statement.run.bind(statement);
      statement.run = ((...args: unknown[]) => {
        writes += 1;
        return originalRun(...args);
      }) as typeof statement.run;
    }
    return statement;
  }) as typeof db.prepare;

  try {
    assert.ok(at.verifyAccessToken(secret));
    assert.ok(at.verifyAccessToken(secret));
    assert.equal(writes, 1, "a repeat verify inside the window must not write again");
    assert.notEqual(at.getAccessToken(record.id)?.lastUsedAt, null);

    const stale = new Date(Date.now() - 61_000).toISOString();
    originalPrepare("UPDATE cli_access_tokens SET last_used_at = ? WHERE id = ?").run(
      stale,
      record.id
    );
    assert.ok(at.verifyAccessToken(secret));
    assert.equal(writes, 2, "a stamp older than the window must be refreshed");
    assert.notEqual(at.getAccessToken(record.id)?.lastUsedAt, stale);
  } finally {
    db.prepare = originalPrepare;
  }
});

test("revoked tokens fail verification", () => {
  const { secret, record } = at.createAccessToken({ name: "to-revoke", scope: "write" });
  assert.ok(at.verifyAccessToken(secret));
  const first = at.revokeAccessToken(record.id);
  assert.equal(first.revoked, true);
  assert.equal(first.alreadyRevoked, false);
  assert.equal(at.verifyAccessToken(secret), null);
  // A retry after a lost response must not look like a miss.
  const second = at.revokeAccessToken(record.id);
  assert.equal(second.revoked, true);
  assert.equal(second.alreadyRevoked, true);
  assert.notEqual(at.getAccessToken(record.id)?.revokedAt, null);
});

test("revokeAccessToken works by display prefix too", () => {
  const { secret, record } = at.createAccessToken({ name: "by-prefix", scope: "read" });
  const result = at.revokeAccessToken(record.tokenPrefix);
  assert.equal(result.revoked, true);
  assert.equal(result.alreadyRevoked, false);
  assert.equal(at.verifyAccessToken(secret), null);
});

test("revoke by a shared prefix refuses instead of revoking every match", () => {
  const first = at.createAccessToken({ name: "shared-a", scope: "read" });
  const second = at.createAccessToken({ name: "shared-b", scope: "write" });
  const db = core.getDbInstance();
  db.prepare("UPDATE cli_access_tokens SET token_prefix = ? WHERE id = ?").run(
    first.record.tokenPrefix,
    second.record.id
  );

  const result = at.revokeAccessToken(first.record.tokenPrefix);
  assert.equal(result.revoked, false);
  assert.equal(result.ambiguous, true);
  assert.equal(at.getAccessToken(first.record.id)?.revokedAt, null);
  assert.equal(at.getAccessToken(second.record.id)?.revokedAt, null);
  // The id is unique, so the same collision does not block an id revoke.
  assert.equal(at.revokeAccessToken(first.record.id).revoked, true);
  assert.equal(at.getAccessToken(second.record.id)?.revokedAt, null);
});

test("revoke by prefix ignores already-revoked siblings", () => {
  const live = at.createAccessToken({ name: "live-sibling", scope: "read" });
  const dead = at.createAccessToken({ name: "dead-sibling", scope: "write" });
  const db = core.getDbInstance();
  db.prepare("UPDATE cli_access_tokens SET token_prefix = ?, revoked_at = ? WHERE id = ?").run(
    live.record.tokenPrefix,
    new Date().toISOString(),
    dead.record.id
  );

  const result = at.revokeAccessToken(live.record.tokenPrefix);
  assert.equal(result.revoked, true);
  assert.equal(result.ambiguous, false);
  assert.notEqual(at.getAccessToken(live.record.id)?.revokedAt, null);
});

test("revoke by prefix of an already-revoked unique prefix reports alreadyRevoked", () => {
  const { record } = at.createAccessToken({ name: "prefix-retry", scope: "read" });
  assert.equal(at.revokeAccessToken(record.tokenPrefix).alreadyRevoked, false);
  const retry = at.revokeAccessToken(record.tokenPrefix);
  assert.equal(retry.revoked, true);
  assert.equal(retry.alreadyRevoked, true);
  assert.equal(retry.ambiguous, false);
});

test("revoke of an unknown id is not a success", () => {
  const result = at.revokeAccessToken("tok_does_not_exist");
  assert.equal(result.revoked, false);
  assert.equal(result.alreadyRevoked, false);
  assert.equal(result.ambiguous, false);
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
