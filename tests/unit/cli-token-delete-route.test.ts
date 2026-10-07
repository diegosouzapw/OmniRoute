import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DELETE /api/cli/tokens/:id. Auth is forced on so a retry of an already-revoked
// token is the behavior under test, not an open management endpoint.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-token-delete-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.INITIAL_PASSWORD = "test-pass";

const core = await import("../../src/lib/db/core.ts");
const at = await import("../../src/lib/db/accessTokens.ts");
const { DELETE } = await import("../../src/app/api/cli/tokens/[id]/route.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
  delete process.env.INITIAL_PASSWORD;
});

function deleteToken(id: string, bearer: string): Promise<Response> {
  return DELETE(
    new Request(`http://localhost:20128/api/cli/tokens/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${bearer}` },
    }),
    { params: Promise.resolve({ id }) }
  );
}

test("DELETE of an already-revoked token succeeds so a lost response can be retried", async () => {
  const admin = at.createAccessToken({ name: "admin", scope: "admin" });
  const target = at.createAccessToken({ name: "target", scope: "read" });

  const first = await deleteToken(target.record.id, admin.secret);
  assert.equal(first.status, 200);
  const firstBody = await first.json();
  assert.equal(firstBody.success, true);
  assert.equal(firstBody.alreadyRevoked, false);

  const retry = await deleteToken(target.record.id, admin.secret);
  assert.equal(retry.status, 200);
  const retryBody = await retry.json();
  assert.equal(retryBody.success, true);
  assert.equal(retryBody.alreadyRevoked, true);
  assert.equal(retryBody.id, target.record.id);
});

test("DELETE of an unknown token is still 404", async () => {
  const admin = at.createAccessToken({ name: "admin-miss", scope: "admin" });
  const missing = await deleteToken("tok_missing", admin.secret);
  assert.equal(missing.status, 404);
});

test("DELETE by a prefix shared by two live tokens refuses both", async () => {
  const admin = at.createAccessToken({ name: "admin-amb", scope: "admin" });
  const first = at.createAccessToken({ name: "amb-a", scope: "read" });
  const second = at.createAccessToken({ name: "amb-b", scope: "write" });
  core
    .getDbInstance()
    .prepare("UPDATE cli_access_tokens SET token_prefix = ? WHERE id = ?")
    .run(first.record.tokenPrefix, second.record.id);

  const response = await deleteToken(first.record.tokenPrefix, admin.secret);
  assert.equal(response.status, 409);
  assert.equal(at.getAccessToken(first.record.id)?.revokedAt, null);
  assert.equal(at.getAccessToken(second.record.id)?.revokedAt, null);
});
