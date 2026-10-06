import test from "node:test";
import assert from "node:assert/strict";

import {
  extractM365CredentialFromHar,
  describeHarImportExpiry,
  M365_CHATHUB_WS_PREFIX,
} from "../../../src/shared/utils/m365HarImport.ts";

function fakeJwt(exp: number): string {
  const b64 = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${b64({ alg: "none" })}.${b64({ exp })}.sig`;
}

function harWithUrl(url: string | null): string {
  return JSON.stringify({
    log: { entries: url ? [{ request: { url } }] : [] },
  });
}

test("extracts access_token + chathubPath from a matching ChatHub WS entry", () => {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const token = fakeJwt(exp);
  const url = `${M365_CHATHUB_WS_PREFIX}oid-123%40tenant-456?chatsessionid=abc&access_token=${token}`;
  const result = extractM365CredentialFromHar(harWithUrl(url));

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.chathubPath, "oid-123@tenant-456");
  assert.equal(result.apiKey, `access_token=${token}; chathubPath=oid-123@tenant-456`);
  assert.ok(result.expiresAt !== null && Math.abs(result.expiresAt - exp * 1000) < 1000);
});

test("picks the LAST matching entry when a HAR has multiple turns", () => {
  const oldToken = fakeJwt(1000);
  const freshToken = fakeJwt(9999999999);
  const har = JSON.stringify({
    log: {
      entries: [
        { request: { url: `${M365_CHATHUB_WS_PREFIX}u%40t?access_token=${oldToken}` } },
        { request: { url: "https://unrelated.example/" } },
        { request: { url: `${M365_CHATHUB_WS_PREFIX}u%40t?access_token=${freshToken}` } },
      ],
    },
  });
  const result = extractM365CredentialFromHar(har);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.ok(result.apiKey.includes(freshToken));
});

test("returns notJson for malformed input", () => {
  const result = extractM365CredentialFromHar("not json{{{");
  assert.deepEqual(result, { ok: false, error: "notJson" });
});

test("returns noEntries when log.entries is missing/not an array", () => {
  const result = extractM365CredentialFromHar(JSON.stringify({ log: {} }));
  assert.deepEqual(result, { ok: false, error: "noEntries" });
});

test("returns noChathubUrl when no request matches the ChatHub prefix", () => {
  const result = extractM365CredentialFromHar(harWithUrl("https://example.com/"));
  assert.deepEqual(result, { ok: false, error: "noChathubUrl" });
});

test("returns missingFields when the URL matches but lacks access_token or chathubPath", () => {
  const result = extractM365CredentialFromHar(harWithUrl(`${M365_CHATHUB_WS_PREFIX}`));
  assert.equal(result.ok, false);
});

test("describeHarImportExpiry classifies ok/warn/bad/unknown", () => {
  const now = Date.now();
  assert.equal(describeHarImportExpiry(now + 30 * 60000, now).tone, "ok");
  assert.equal(describeHarImportExpiry(now + 5 * 60000, now).tone, "warn");
  assert.equal(describeHarImportExpiry(now - 60000, now).tone, "bad");
  assert.equal(describeHarImportExpiry(null, now).tone, "unknown");
});
