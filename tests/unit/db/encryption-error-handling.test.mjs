import { test } from "node:test";
import assert from "node:assert";

// Chave determinística p/ exercitar o caminho real de auth-tag (sem ela o decrypt
// curto-circuita no branch "no key"). Definida ANTES do import — a derivação de chave
// é cacheada lazy no primeiro uso.
process.env.STORAGE_ENCRYPTION_KEY = "unit-test-storage-encryption-key-0123456789";

const { decrypt } = await import("../../../src/lib/db/encryption.ts");

// Contrato atual (hardening): falha de decrypt → null + log, NUNCA o ciphertext cru
// (devolver o blob criptografado vazaria o dado cifrado para UI/API). Este arquivo era
// um órfão de glob (nunca rodou em CI) e codificava o contrato antigo pré-hardening —
// alinhado ao comportamento real/shipped em 2026-07 (plano mestre testes+CI, QW-c).
test("decrypt() with invalid auth tag should not crash and return null", () => {
  const invalidCiphertext = "enc:v1:0000:0000:0000";
  const result = decrypt(invalidCiphertext);

  assert.strictEqual(result, null, "Failed auth-tag decrypt must return null (never the raw blob)");
});

test("decrypt() with malformed ciphertext should not crash and return null", () => {
  const malformed = "enc:v1:invalid";
  const result = decrypt(malformed);

  assert.strictEqual(result, null, "Malformed encrypted value must return null");
});

test("decrypt() with null should return null", () => {
  const result = decrypt(null);
  assert.strictEqual(result, null, "Should return null for null input");
});

test("decrypt() with undefined should return undefined", () => {
  const result = decrypt(undefined);
  assert.strictEqual(result, undefined, "Should return undefined for undefined input");
});

test("decrypt() with non-encrypted string should return as-is", () => {
  const plaintext = "this-is-not-encrypted";
  const result = decrypt(plaintext);
  assert.strictEqual(result, plaintext, "Should return plaintext unchanged");
});
