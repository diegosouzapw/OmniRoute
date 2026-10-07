import { before, after, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cliproxy-accounts-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "cliproxy-accounts-api-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");
const settingsDb = await import("../../../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../../../src/lib/db/apiKeys.ts");
const { GET } = await import("../../../../src/app/api/services/cliproxy/accounts/route.ts");

before(async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "cliproxy-accounts-test-password";
});

after(() => {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

it("requires OmniRoute management authentication", async () => {
  const response = await GET(new Request("http://localhost/api/services/cliproxy/accounts"));
  assert.equal(response.status, 401);
});

it("accepts a scoped OmniRoute management API key", async () => {
  const { key } = await apiKeysDb.createApiKey("cliproxy-accounts", "test", ["manage"]);
  const response = await GET(
    new Request("http://localhost/api/services/cliproxy/accounts", {
      headers: { Authorization: `Bearer ${key}` },
    })
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(body.state, "disabled");
  assert.deepEqual(body.accounts, []);
});
