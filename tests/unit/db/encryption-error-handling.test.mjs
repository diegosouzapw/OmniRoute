import { test } from "node:test";
import assert from "node:assert";
import { decrypt } from "../../../src/lib/db/encryption.ts";

test("decrypt() with invalid auth tag should not crash and return ciphertext", () => {
  const invalidCiphertext = "enc:v1:0000:0000:0000";
  const result = decrypt(invalidCiphertext);

  assert.strictEqual(result, invalidCiphertext, "Should return ciphertext unchanged on error");
  assert.strictEqual(typeof result, "string", "Result should be a string");
});

test("decrypt() with malformed ciphertext should not crash", () => {
  const malformed = "enc:v1:invalid";
  const result = decrypt(malformed);

  assert.strictEqual(result, malformed, "Should return malformed ciphertext unchanged");
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
