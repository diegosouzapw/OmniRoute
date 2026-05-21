import test from "node:test";
import assert from "node:assert/strict";

import {
  clearGeminiThoughtSignatureMemoryForTests,
  clearGeminiThoughtSignatures,
  getGeminiThoughtSignature,
  getGeminiThoughtSignatureMode,
  isValidBasicGeminiThoughtSignature,
  isValidFullGeminiThoughtSignature,
  resolveGeminiThoughtSignature,
  setGeminiThoughtSignatureMode,
  storeGeminiThoughtSignature,
} from "../../open-sse/services/geminiThoughtSignatureStore.ts";

function makeSignature(bytes: number[]): string {
  return `R${Buffer.from(bytes).toString("base64")}`;
}

const BASIC_VALID_SIGNATURE = makeSignature([0x12, 0x00]);
const STRICT_VALID_SIGNATURE = makeSignature([0x12, 0x02, 0x0a, 0x00]);
const INVALID_SIGNATURE = makeSignature([0x13, 0x00]);

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

test("signature bypass validators distinguish basic and full protobuf signatures", () => {
  assert.equal(isValidBasicGeminiThoughtSignature(BASIC_VALID_SIGNATURE), true);
  assert.equal(isValidBasicGeminiThoughtSignature(INVALID_SIGNATURE), false);
  assert.equal(isValidBasicGeminiThoughtSignature("not-base64"), false);

  assert.equal(isValidFullGeminiThoughtSignature(STRICT_VALID_SIGNATURE), true);
  assert.equal(isValidFullGeminiThoughtSignature(BASIC_VALID_SIGNATURE), false);
  assert.equal(isValidFullGeminiThoughtSignature(INVALID_SIGNATURE), false);
});

test("enabled mode preserves the current stored-signature behavior", () => {
  storeGeminiThoughtSignature("call-1", "stored-signature");
  setGeminiThoughtSignatureMode("enabled");

  assert.equal(getGeminiThoughtSignatureMode(), "enabled");
  assert.equal(resolveGeminiThoughtSignature("call-1", STRICT_VALID_SIGNATURE), "stored-signature");
  assert.equal(resolveGeminiThoughtSignature("missing-call", STRICT_VALID_SIGNATURE), null);
});

test("bypass mode accepts basic-valid client signatures and falls back on invalid ones", () => {
  storeGeminiThoughtSignature("call-1", "stored-signature");
  setGeminiThoughtSignatureMode("bypass");

  assert.equal(
    resolveGeminiThoughtSignature("call-1", BASIC_VALID_SIGNATURE),
    BASIC_VALID_SIGNATURE
  );
  assert.equal(resolveGeminiThoughtSignature("call-1", INVALID_SIGNATURE), "stored-signature");
  assert.equal(resolveGeminiThoughtSignature("call-1"), "stored-signature");
});

test("bypass-strict mode requires the full protobuf structure before accepting a client signature", () => {
  storeGeminiThoughtSignature("call-1", "stored-signature");
  setGeminiThoughtSignatureMode("bypass-strict");

  assert.equal(
    resolveGeminiThoughtSignature("call-1", STRICT_VALID_SIGNATURE),
    STRICT_VALID_SIGNATURE
  );
  assert.equal(resolveGeminiThoughtSignature("call-1", BASIC_VALID_SIGNATURE), "stored-signature");
  assert.equal(resolveGeminiThoughtSignature("call-1", INVALID_SIGNATURE), "stored-signature");
});

test("signatures persist to sqlite database and survive in-memory cache clearing", () => {
  storeGeminiThoughtSignature("db-call-1", "sig-12345");

  // Bypass in-memory cache to verify DB lookup
  clearGeminiThoughtSignatureMemoryForTests();

  assert.equal(getGeminiThoughtSignature("db-call-1"), "sig-12345");
});

test("enabled mode keeps ignoring client signatures after sqlite recovery", () => {
  storeGeminiThoughtSignature("db-call-2", "stored-db-signature");
  clearGeminiThoughtSignatureMemoryForTests();
  setGeminiThoughtSignatureMode("enabled");

  assert.equal(
    resolveGeminiThoughtSignature("db-call-2", STRICT_VALID_SIGNATURE),
    "stored-db-signature"
  );
});

test("persisted signatures stay isolated when callers namespace tool call ids", () => {
  storeGeminiThoughtSignature("conn-a:call-shared", "signature-a");
  storeGeminiThoughtSignature("conn-b:call-shared", "signature-b");
  clearGeminiThoughtSignatureMemoryForTests();

  assert.equal(resolveGeminiThoughtSignature("conn-a:call-shared"), "signature-a");
  assert.equal(resolveGeminiThoughtSignature("conn-b:call-shared"), "signature-b");
  assert.equal(resolveGeminiThoughtSignature("call-shared"), null);
});
