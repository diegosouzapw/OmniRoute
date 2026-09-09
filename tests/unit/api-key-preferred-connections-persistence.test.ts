import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-apikey-pref-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(reset);
test.after(() => fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }));

const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";

test("create/get metadata preserves ordered preferredConnections", async () => {
  const created = await apiKeysDb.createApiKey("project-a", "machine-pref-a", [], {
    allowedConnections: [A, B],
    preferredConnections: [B, A],
  });
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.deepEqual(metadata?.allowedConnections, [A, B]);
  assert.deepEqual(metadata?.preferredConnections, [B, A]);
});

test("preferredConnections can be changed independently of access allowlist", async () => {
  const created = await apiKeysDb.createApiKey("project-b", "machine-pref-b", [], {
    allowedConnections: [A, B],
    preferredConnections: [A, B],
  });
  assert.equal(
    await apiKeysDb.updateApiKeyPermissions(created.id, { preferredConnections: [B, A] }),
    true
  );
  const byId = await apiKeysDb.getApiKeyById(created.id);
  assert.deepEqual(byId?.allowedConnections, [A, B]);
  assert.deepEqual(byId?.preferredConnections, [B, A]);
});
