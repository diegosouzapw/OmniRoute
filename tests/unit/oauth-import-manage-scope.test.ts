/**
 * GHSA-mg76-rhpx-gvw3 / GHSA-gxv4-955v-v6cm — OAuth import / auto-import routes
 * create or read provider credentials. They were guarded only by isAuthenticated(),
 * which (because /api/oauth/ is PUBLIC-classified) accepts ANY valid client API key.
 * They must now require MANAGEMENT scope.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-oauth-import-manage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oauth-import-manage-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const codexImportToken = await import("../../src/app/api/oauth/codex/import-token/route.ts");
const cursorAutoImport = await import("../../src/app/api/oauth/cursor/auto-import/route.ts");

test.before(async () => {
  process.env.JWT_SECRET = "oauth-import-manage-jwt";
  process.env.INITIAL_PASSWORD = "oauth-import-manage-pass";
  await settingsDb.updateSettings({ requireLogin: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.JWT_SECRET;
  delete process.env.INITIAL_PASSWORD;
});

function post(route: { POST: (r: Request) => Promise<Response> }, key?: string) {
  return route.POST(
    new Request("http://localhost/api/oauth/codex/import-token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(key ? { authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({ accessToken: "x", name: "poc" }),
    })
  );
}

function get(route: { GET: (r: Request) => Promise<Response> }, key?: string) {
  return route.GET(
    new Request("http://localhost/api/oauth/cursor/auto-import", {
      headers: key ? { authorization: `Bearer ${key}` } : {},
    })
  );
}

test("codex/import-token: non-manage key → 403, no key → 401, manage key passes the auth gate (GHSA-mg76)", async () => {
  const nonManage = await apiKeysDb.createApiKey("client", "machine-client", []);
  const manage = await apiKeysDb.createApiKey("admin", "machine-admin", ["manage"]);

  assert.equal(
    (await post(codexImportToken, nonManage.key)).status,
    403,
    "non-manage key rejected"
  );
  assert.equal((await post(codexImportToken)).status, 401, "no credential rejected");

  const withManage = await post(codexImportToken, manage.key);
  assert.notEqual(withManage.status, 401, "manage key must clear the auth gate");
  assert.notEqual(withManage.status, 403, "manage key must clear the auth gate");
});

test("cursor/auto-import: a non-manage key cannot read the host's Cursor token (GHSA-gxv4)", async () => {
  const nonManage = await apiKeysDb.createApiKey("client2", "machine-client2", []);
  assert.equal((await get(cursorAutoImport, nonManage.key)).status, 403, "non-manage key rejected");
  assert.equal((await get(cursorAutoImport)).status, 401, "no credential rejected");
});
