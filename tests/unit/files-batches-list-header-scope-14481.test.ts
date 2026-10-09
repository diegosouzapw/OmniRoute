import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SignJWT } from "jose";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-14481-headers-"));
process.env.DATA_DIR = dataDir;
process.env.JWT_SECRET = "14481-fixture-session-secret";
process.env.API_KEY_SECRET = "14481-fixture-key-secret";
process.env.REQUIRE_API_KEY = "false";
assert.ok(
  realpathSync(process.env.DATA_DIR).startsWith(join(tmpdir(), "omniroute-14481-headers-"))
);
const { createApiKey, updateApiKeyPermissions, revokeApiKey } =
  await import("../../src/lib/db/apiKeys.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const { createBatch } = await import("../../src/lib/db/batches.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const files = await import("../../src/app/api/v1/files/route.ts");
const batches = await import("../../src/app/api/v1/batches/route.ts");
after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});
const cookie = `auth_token=${await new SignJWT({ authenticated: true, sub: "admin" }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").sign(new TextEncoder().encode(process.env.JWT_SECRET))}`;
const owner = await createApiKey("header-owner", "test-device", []);
const foreign = await createApiKey("header-foreign", "test-device", []);
const restricted = await createApiKey("header-restricted", "test-device", []);
await updateApiKeyPermissions(restricted.id, { allowedEndpoints: ["chat"] });
const revoked = await createApiKey("header-revoked", "test-device", []);
await revokeApiKey(revoked.id);
const managed = await createApiKey("header-managed", "test-device", ["manage"]);
function seed(apiKeyId: string, label: string) {
  const file = createFile({
    filename: `${label}.jsonl`,
    purpose: "batch",
    bytes: 2,
    content: Buffer.from("{}"),
    apiKeyId,
  });
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    apiKeyId,
  });
  return { files: file.id, batches: batch.id };
}
const owned = seed(owner.id, "owned");
const other = seed(foreign.id, "foreign");
for (const [resource, route] of [
  ["files", files],
  ["batches", batches],
] as const) {
  const list = (headers: Record<string, string>, afterId?: string) =>
    route.GET(
      new Request(
        `http://localhost/api/v1/${resource}?limit=100${afterId ? `&after=${afterId}` : ""}`,
        { headers }
      )
    );
  for (const header of ["x-api-key", "x-goog-api-key"]) {
    for (const withCookie of [false, true]) {
      test(`${resource}: ${header}, session=${withCookie}, remains tenant scoped and ignores foreign cursor`, async () => {
        const headers = { [header]: owner.key, ...(withCookie ? { cookie } : {}) };
        const response = await list(headers);
        assert.equal(response.status, 200);
        const body = await response.json();
        assert.deepEqual(
          body.data.map((row: { id: string }) => row.id),
          [owned[resource]]
        );
        const cursorResponse = await list(headers, other[resource]);
        assert.equal(cursorResponse.status, 200);
        assert.deepEqual(
          (await cursorResponse.json()).data.map((row: { id: string }) => row.id),
          [owned[resource]]
        );
      });
    }
    test(`${resource}: ${header} manage key has explicit instance scope`, async () => {
      const response = await list({ [header]: managed.key });
      assert.equal(response.status, 200);
      assert.deepEqual(
        new Set((await response.json()).data.map((row: { id: string }) => row.id)),
        new Set([owned[resource], other[resource]])
      );
    });
    test(`${resource}: ${header} unknown/revoked key plus cookie cannot widen visibility`, async () => {
      for (const key of ["unknown-fixture-key", revoked.key]) {
        const response = await list({ [header]: key, cookie });
        // The policy gate returns 403 for a revoked bare x-api-key; the
        // legacy extractor folds an x-goog-api-key rejection to 401 earlier.
        assert.equal(response.status, key === revoked.key && header === "x-api-key" ? 403 : 401);
        const body = await response.json();
        assert.ok(!body.error.message.includes("at /"));
      }
    });
    test(`${resource}: ${header} endpoint restrictions remain enforced`, async () => {
      assert.equal((await list({ [header]: restricted.key, cookie })).status, 403);
    });
  }
  test(`${resource}: session-only sees instance; anonymous list remains denied`, async () => {
    assert.equal((await list({ cookie })).status, 200);
    assert.equal((await list({})).status, 401);
  });
}
