/**
 * #3503 — dashboard playground key-by-id resolution.
 *
 * The playground sends only the API key *id* (never the secret) via
 * `x-omniroute-playground-key-id`; the gateway resolves the secret server-side
 * in `resolvePlaygroundTestKey`. SECURITY INVARIANT: this is honored ONLY for an
 * authenticated dashboard session — the header alone must never resolve a key,
 * so it can't be abused by an unauthenticated caller to apply (or probe) a key's
 * policy.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-playground-key-3503-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "playground-3503-api-secret";
process.env.JWT_SECRET = "playground-3503-jwt-secret";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { resolvePlaygroundTestKey } = await import("../../src/shared/utils/apiKeyPolicy.ts");

const PLAYGROUND_KEY_ID_HEADER = "x-omniroute-playground-key-id";

const created = await apiKeysDb.createApiKey("playground-3503", "machine-3503", []);
const KEY_ID = created.id;
const KEY_SECRET = created.key;

async function sessionCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

function req(headers: Record<string, string>) {
  return {
    method: "POST",
    headers: new Headers(headers),
    url: "http://localhost/api/v1/chat/completions",
  } as unknown as Request;
}

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#3503 — authenticated session + key-id header resolves the key secret server-side", async () => {
  const out = await resolvePlaygroundTestKey(
    req({ [PLAYGROUND_KEY_ID_HEADER]: KEY_ID, cookie: await sessionCookie() })
  );
  assert.equal(out, KEY_SECRET, "an authenticated session should resolve the selected key's secret by id");
});

test("#3503 — SECURITY: the key-id header is IGNORED without an authenticated session", async () => {
  // Same valid key id, but no session cookie → must NOT resolve the secret.
  const out = await resolvePlaygroundTestKey(req({ [PLAYGROUND_KEY_ID_HEADER]: KEY_ID }));
  assert.equal(out, null, "an unauthenticated request must never resolve a key by id");
});

test("#3503 — SECURITY: an invalid session token is rejected", async () => {
  const out = await resolvePlaygroundTestKey(
    req({ [PLAYGROUND_KEY_ID_HEADER]: KEY_ID, cookie: "auth_token=not-a-valid-jwt" })
  );
  assert.equal(out, null, "a forged/invalid session token must not resolve a key");
});

test("#3503 — no key-id header → null even with a valid session", async () => {
  const out = await resolvePlaygroundTestKey(req({ cookie: await sessionCookie() }));
  assert.equal(out, null);
});
