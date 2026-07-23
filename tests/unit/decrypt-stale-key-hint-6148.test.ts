import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

// #6148 — A decryption failure caused by a stale/changed STORAGE_ENCRYPTION_KEY
// must surface as a clear, specific error (HTTP 424, type
// "storage_encryption_stale") instead of the misleading "Auth failed: 401" that
// resulted from coercing the null credential to "" and sending an empty Bearer
// token upstream.

const ORIGINAL_STORAGE_KEY = process.env.STORAGE_ENCRYPTION_KEY;

// Cache-busted fresh import so the encryption module re-derives its key from the
// current STORAGE_ENCRYPTION_KEY (module-level key cache would otherwise persist).
async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

test.after(() => {
  if (ORIGINAL_STORAGE_KEY === undefined) {
    delete process.env.STORAGE_ENCRYPTION_KEY;
  } else {
    process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_KEY;
  }
});

test("decryptConnectionFields flags a credential that no longer decrypts (#6148)", async () => {
  // 1. Encrypt an apiKey under key A.
  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-6148-A";
  const encA = await importFresh("src/lib/db/encryption.ts");
  const ciphertext = encA.encrypt("sk-real-secret-key");
  assert.match(ciphertext, /^enc:v1:/, "expected a real enc:v1 ciphertext");

  // 2. Read it back under a DIFFERENT key B (simulating a changed key).
  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-6148-B";
  const encB = await importFresh("src/lib/db/encryption.ts");

  const decrypted = encB.decryptConnectionFields({
    provider: "openai",
    apiKey: ciphertext,
  });

  // The credential fails to decrypt (null) but the guard flag distinguishes this
  // from a genuinely empty credential.
  assert.equal(decrypted.apiKey, null, "stale key must decrypt to null");
  assert.equal(
    decrypted.credentialDecryptFailed,
    true,
    "undecryptable ciphertext must set credentialDecryptFailed"
  );
  assert.equal(encB.looksEncrypted(ciphertext), true);
});

test("a genuinely empty credential is NOT flagged as decrypt failure (#6148)", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-6148-empty";
  const enc = await importFresh("src/lib/db/encryption.ts");

  const decrypted = enc.decryptConnectionFields({ provider: "openai", apiKey: null });
  assert.notEqual(decrypted.credentialDecryptFailed, true, "empty credential must not flag");
});

test("models route guard returns HTTP 424 storage_encryption_stale (#6148)", async () => {
  const guard = await importFresh(
    "src/app/api/providers/[id]/models/staleEncryptionGuard.ts"
  );

  // Connection flagged by decryptConnectionFields (stale key).
  const staleResponse = guard.buildStaleEncryptionKeyResponse({
    provider: "openai",
    apiKey: null,
    credentialDecryptFailed: true,
  });

  assert.ok(staleResponse, "guard must return a response for a stale connection");
  assert.equal(staleResponse.status, 424, "must be HTTP 424, not an upstream 401");

  const body = await staleResponse.json();
  assert.equal(body.error.type, "storage_encryption_stale");
  assert.match(body.error.message, /decrypt/i);
  // Rule #12 — no stack trace leakage in the error body.
  assert.equal(body.error.message.includes("at /"), false);

  // A healthy connection must NOT be short-circuited.
  const okResponse = guard.buildStaleEncryptionKeyResponse({
    provider: "openai",
    apiKey: "sk-real-secret-key",
  });
  assert.equal(okResponse, null, "healthy connection must proceed (null)");
});
