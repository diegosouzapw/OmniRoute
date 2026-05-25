import test from "node:test";
import assert from "node:assert/strict";

const { encryptMetadata, decryptMetadata } = await import("../../src/lib/webhookDispatcher.ts");

test("encryptMetadata roundtrips without encryption key (passthrough mode)", () => {
  const original = { botToken: "123456:ABC-DEF", extra: "value" };
  const encrypted = encryptMetadata(original);
  assert.ok(typeof encrypted === "string" && encrypted.length > 0);
  const decrypted = decryptMetadata(encrypted);
  assert.deepEqual(decrypted, original);
});

test("decryptMetadata returns null for null input", () => {
  const result = decryptMetadata(null);
  assert.equal(result, null);
});

test("decryptMetadata returns null for malformed JSON", () => {
  // Passthrough mode stores plaintext — inject bad JSON
  const result = decryptMetadata("not-valid-json");
  assert.equal(result, null);
});

test("encryptMetadata produces stable parseable JSON in passthrough mode", () => {
  const meta = { botToken: "tok", chatId: "-100123" };
  const enc = encryptMetadata(meta);
  const dec = decryptMetadata(enc);
  assert.equal(dec?.botToken, "tok");
  assert.equal(dec?.chatId, "-100123");
});
