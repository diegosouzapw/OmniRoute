import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ORIGINAL_STORAGE_KEY = process.env.STORAGE_ENCRYPTION_KEY;

async function importFresh(modulePath) {
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

test("encryption stays in passthrough mode when no storage key is configured", async () => {
  delete process.env.STORAGE_ENCRYPTION_KEY;
  const encryption = await importFresh("src/lib/db/encryption.ts");

  assert.equal(encryption.isEncryptionEnabled(), false);
  assert.equal(encryption.encrypt("plain-text"), "plain-text");
  assert.equal(encryption.decrypt("plain-text"), "plain-text");
  assert.equal(encryption.encrypt(""), "");
  assert.equal(encryption.decrypt(null), null);
  assert.equal(encryption.decrypt(undefined), undefined);
});

test("encrypt/decrypt round-trip uses the expected serialized format", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "task-304-secret-a";
  const encryption = await importFresh("src/lib/db/encryption.ts");

  const encrypted = encryption.encrypt("hello world");
  const decrypted = encryption.decrypt(encrypted);

  assert.equal(encryption.isEncryptionEnabled(), true);
  assert.match(encrypted, /^enc:v1:[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/);
  assert.equal(decrypted, "hello world");
  assert.equal(encryption.encrypt(encrypted), encrypted);
});

test("connection field helpers encrypt and decrypt all supported credential fields", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "task-304-secret-b";
  const encryption = await importFresh("src/lib/db/encryption.ts");

  const connection = {
    apiKey: "sk-123",
    accessToken: "access-123",
    refreshToken: "refresh-123",
    idToken: "id-123",
    untouched: "keep-me",
  };

  const encrypted = encryption.encryptConnectionFields({ ...connection });
  const decrypted = encryption.decryptConnectionFields(encrypted);

  assert.notEqual(encrypted.apiKey, connection.apiKey);
  assert.match(encrypted.apiKey, /^enc:v1:/);
  assert.match(encrypted.accessToken, /^enc:v1:/);
  assert.match(encrypted.refreshToken, /^enc:v1:/);
  assert.match(encrypted.idToken, /^enc:v1:/);
  assert.deepEqual(decrypted, connection);
});

test("decrypt returns null when the value is malformed or the key is wrong", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "task-304-secret-c";
  const firstModule = await importFresh("src/lib/db/encryption.ts");
  const encrypted = firstModule.encrypt("top-secret");

  process.env.STORAGE_ENCRYPTION_KEY = "task-304-secret-d";
  const secondModule = await importFresh("src/lib/db/encryption.ts");

  // When decryption fails with wrong key, return null (not encrypted ciphertext)
  // This prevents sending encrypted tokens to APIs
  assert.equal(secondModule.decrypt(encrypted), null);
  assert.equal(secondModule.decrypt("enc:v1:not-valid"), null);
});
