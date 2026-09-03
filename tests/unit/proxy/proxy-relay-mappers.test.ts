import test from "node:test";
import assert from "node:assert/strict";
import { encrypt } from "@/lib/db/encryption";
import {
  isRelayProxyType,
  extractRelayAuth,
  isRelayAuthMissing,
  relayRepairMode,
} from "@/lib/db/proxies/mappers";

// A relay deploy writes an encrypted `relayAuthEnc` blob only when encryption is
// enabled. Flip it on so the "recovered" path has a decryptable blob to test.
const ORIGINAL_KEY = process.env.STORAGE_ENCRYPTION_KEY;
process.env.STORAGE_ENCRYPTION_KEY = "test-relay-repair-key";

test.after(() => {
  if (ORIGINAL_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_KEY;
});

test("isRelayProxyType recognizes vercel/deno/cloudflare only", () => {
  assert.equal(isRelayProxyType("vercel"), true);
  assert.equal(isRelayProxyType("deno"), true);
  assert.equal(isRelayProxyType("cloudflare"), true);
  assert.equal(isRelayProxyType("http"), false);
  assert.equal(isRelayProxyType(123), false);
});

test("extractRelayAuth prefers decrypted blob over legacy plaintext", () => {
  const enc = encrypt("secret-token");
  assert.ok(enc && enc.startsWith("enc:v1:"));
  const notes = JSON.stringify({ relayAuthEnc: enc });
  assert.equal(extractRelayAuth(notes), "secret-token");
});

test("extractRelayAuth falls back to legacy plaintext relayAuth", () => {
  const notes = JSON.stringify({ relayAuth: "plain-token" });
  assert.equal(extractRelayAuth(notes), "plain-token");
});

test("extractRelayAuth returns undefined for non-relay / garbage notes", () => {
  assert.equal(extractRelayAuth(null), undefined);
  assert.equal(extractRelayAuth("not json"), undefined);
  assert.equal(extractRelayAuth(JSON.stringify({})), undefined);
});

test("isRelayAuthMissing is false for a relay with readable plaintext auth", () => {
  assert.equal(isRelayAuthMissing(JSON.stringify({ relayAuth: "plain" }), "vercel"), false);
});

test("isRelayAuthMissing is false when the encrypted blob still decrypts", () => {
  const enc = encrypt("still-good");
  assert.equal(isRelayAuthMissing(JSON.stringify({ relayAuthEnc: enc }), "deno"), false);
});

test("isRelayAuthMissing is true when no auth is present on a relay", () => {
  assert.equal(isRelayAuthMissing(JSON.stringify({}), "vercel"), true);
  assert.equal(isRelayAuthMissing(null, "cloudflare"), true);
});

test("isRelayAuthMissing is always false for non-relay types", () => {
  assert.equal(isRelayAuthMissing(null, "http"), false);
  assert.equal(isRelayAuthMissing(JSON.stringify({}), "socks5"), false);
});

test('relayRepairMode "noop" when plaintext relayAuth already present', () => {
  assert.equal(relayRepairMode(JSON.stringify({ relayAuth: "plain" }), "vercel"), "noop");
});

test('relayRepairMode "recovered" when encrypted blob decrypts', () => {
  const enc = encrypt("recover-me");
  assert.equal(relayRepairMode(JSON.stringify({ relayAuthEnc: enc }), "deno"), "recovered");
});

test('relayRepairMode "redeploy" when no recoverable auth exists', () => {
  assert.equal(relayRepairMode(JSON.stringify({}), "vercel"), "redeploy");
  assert.equal(relayRepairMode(null, "cloudflare"), "redeploy");
});

test("relayRepairMode returns null for non-relay types", () => {
  assert.equal(relayRepairMode(JSON.stringify({}), "http"), null);
  assert.equal(relayRepairMode(null, "socks5"), null);
});
