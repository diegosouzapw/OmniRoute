/**
 * Regression test for issue #13881: a revoked, expired, or banned API key
 * must NOT resolve an `apiKeyId` in `getApiKeyRequestScope()` — it must fail
 * closed to the same `{ apiKeyId: null }` shape as an unresolved/anonymous
 * caller, across the /v1/files and /v1/batches routes.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads, so this file never touches ~/.omniroute.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "apikey-scope-13881-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "apikey-scope-13881-secret";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createApiKey, revokeApiKey, validateApiKey, setApiKeyExpiry, updateApiKeyPermissions } =
  await import("../../src/lib/db/apiKeys.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const { getApiKeyRequestScope, resolveListScope, canAccessOwnedRecord } =
  await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
const filesRoute = await import("../../src/app/api/v1/files/route.ts");

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function seedFile(apiKeyId: string | null) {
  return createFile({
    bytes: 4,
    filename: "seed.jsonl",
    purpose: "batch",
    content: Buffer.from("seed"),
    mimeType: "application/jsonl",
    apiKeyId,
  });
}

function requestWith(rawKey: string) {
  return new Request("http://localhost/api/v1/files", {
    headers: { Authorization: `Bearer ${rawKey}` },
  });
}

describe("issue #13881 — revoked/expired/banned API key must fail closed in getApiKeyRequestScope", () => {
  it("getApiKeyRequestScope returns apiKeyId: null for a REVOKED key", async () => {
    const created = await createApiKey("revoke-me", "machine-13881-a", []);
    const rawKey = created.key;
    const keyId = created.id;
    seedFile(keyId);

    const revoked = await revokeApiKey(keyId);
    assert.equal(revoked, true, "revokeApiKey should succeed");

    const stillValid = await validateApiKey(rawKey);
    assert.equal(stillValid, false, "validateApiKey correctly rejects the revoked key");

    const scope = await getApiKeyRequestScope(requestWith(rawKey));
    assert.equal(scope.apiKeyId, null, "revoked key must resolve to apiKeyId: null");
    assert.equal(scope.apiKeyMetadata, null, "revoked key must resolve to apiKeyMetadata: null");
  });

  it("GET /v1/files with a revoked key returns 401 instead of listing that key's files", async () => {
    const created = await createApiKey("revoke-me-2", "machine-13881-b", []);
    const rawKey = created.key;
    const keyId = created.id;
    seedFile(keyId);

    await revokeApiKey(keyId);

    const response = await filesRoute.GET(requestWith(rawKey));
    const body = (await response.json()) as { data?: unknown[]; error?: { message: string } };

    assert.equal(
      response.status,
      401,
      `revoked key got HTTP ${response.status} (body: ${JSON.stringify(body)}) instead of 401`
    );
  });

  it("resolveListScope treats a revoked key like an invalid key (mode: rejected)", async () => {
    const created = await createApiKey("revoke-me-3", "machine-13881-c", []);
    const rawKey = created.key;
    const keyId = created.id;
    await revokeApiKey(keyId);

    const scope = await getApiKeyRequestScope(requestWith(rawKey));
    const listScope = resolveListScope(scope);

    assert.equal(listScope.mode, "rejected", `expected rejected, got mode=${listScope.mode}`);
  });

  it("an EXPIRED key resolves to apiKeyId: null and 401s on GET /v1/files", async () => {
    const created = await createApiKey("expired-me", "machine-13881-d", []);
    const rawKey = created.key;
    const keyId = created.id;
    seedFile(keyId);

    await setApiKeyExpiry(keyId, new Date(Date.now() - 60_000).toISOString());
    assert.equal(await validateApiKey(rawKey), false, "expired key must fail validateApiKey");

    const scope = await getApiKeyRequestScope(requestWith(rawKey));
    assert.equal(scope.apiKeyId, null, "expired key must resolve to apiKeyId: null");

    const response = await filesRoute.GET(requestWith(rawKey));
    assert.equal(response.status, 401, `expired key got HTTP ${response.status} instead of 401`);
  });

  it("a BANNED key resolves to apiKeyId: null and 401s on GET /v1/files", async () => {
    const created = await createApiKey("banned-me", "machine-13881-e", []);
    const rawKey = created.key;
    const keyId = created.id;
    seedFile(keyId);

    await updateApiKeyPermissions(keyId, { isBanned: true });
    assert.equal(await validateApiKey(rawKey), false, "banned key must fail validateApiKey");

    const scope = await getApiKeyRequestScope(requestWith(rawKey));
    assert.equal(scope.apiKeyId, null, "banned key must resolve to apiKeyId: null");

    const response = await filesRoute.GET(requestWith(rawKey));
    assert.equal(response.status, 401, `banned key got HTTP ${response.status} instead of 401`);
  });

  it("an ACTIVE key is still resolved normally (regression guard against over-blocking)", async () => {
    const created = await createApiKey("still-active", "machine-13881-f", []);
    const rawKey = created.key;
    const keyId = created.id;
    seedFile(keyId);

    assert.equal(await validateApiKey(rawKey), true, "freshly created key must be valid");

    const scope = await getApiKeyRequestScope(requestWith(rawKey));
    assert.equal(scope.apiKeyId, keyId, "active key must still resolve its apiKeyId");
    assert.notEqual(scope.apiKeyMetadata, null, "active key must still resolve its metadata");

    assert.equal(
      canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: scope.apiKeyId }, keyId),
      true,
      "active key must still be able to access its own record"
    );

    const response = await filesRoute.GET(requestWith(rawKey));
    const body = (await response.json()) as { data?: unknown[] };
    assert.equal(response.status, 200, `active key got HTTP ${response.status} instead of 200`);
    assert.equal(body.data?.length, 1, "active key must still see its own file");
  });
});
