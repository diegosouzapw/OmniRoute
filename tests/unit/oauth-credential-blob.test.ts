// Unit tests for the OAuth credential blob codec used by the remote login helper.
//
// Context (operator report 2026-06-27): Google's `firstparty/nativeapp` consent
// for the embedded Antigravity desktop client only releases the authorization
// code when the loopback redirect (127.0.0.1:<port>) is reachable. On a remote
// VPS install the loopback is unreachable, so the consent hangs and never emits
// a code — the normal "paste the callback URL" fallback has nothing to paste.
//
// The fix is a local helper (`omniroute login antigravity`) that runs the OAuth
// on the user's own machine (loopback reachable → consent completes → tokens),
// then prints a single-line, paste-safe credential blob. The user pastes it into
// the remote dashboard, which decodes it and persists the connection.
//
// This codec is the contract between the helper (encoder) and the server/dashboard
// (decoder). These tests pin: roundtrip fidelity, the human-recognizable prefix,
// version + provider gating, and rejection of malformed/tampered input.

import test from "node:test";
import assert from "node:assert/strict";
import {
  CREDENTIAL_BLOB_PREFIX,
  encodeCredentialBlob,
  decodeCredentialBlob,
} from "../../src/lib/oauth/credentialBlob.ts";

const SAMPLE = {
  provider: "antigravity",
  tokens: {
    access_token: "ya29.access",
    refresh_token: "1//refresh",
    id_token: "eyJ.id.token",
    expires_in: 3599,
    scope: "https://www.googleapis.com/auth/cloud-platform",
  },
};

test("encode → decode roundtrips the provider and tokens", () => {
  const blob = encodeCredentialBlob(SAMPLE);
  const decoded = decodeCredentialBlob(blob);
  assert.equal(decoded.provider, "antigravity");
  assert.deepEqual(decoded.tokens, SAMPLE.tokens);
});

test("blob is a single paste-safe line with the recognizable prefix", () => {
  const blob = encodeCredentialBlob(SAMPLE);
  assert.ok(blob.startsWith(CREDENTIAL_BLOB_PREFIX), "must carry the omniroute prefix");
  assert.ok(!/\s/.test(blob), "must contain no whitespace (single line, copy-paste safe)");
  // base64url only after the prefix — no +/= that break in URLs / shells.
  const payload = blob.slice(CREDENTIAL_BLOB_PREFIX.length);
  assert.match(payload, /^[A-Za-z0-9_-]+$/, "payload must be base64url");
});

test("decode rejects a blob without the prefix", () => {
  const raw = Buffer.from(JSON.stringify({ v: 1, ...SAMPLE })).toString("base64url");
  assert.throws(() => decodeCredentialBlob(raw), /prefix|invalid|format/i);
});

test("decode rejects an unsupported version", () => {
  // Hand-craft a v999 blob with the right prefix.
  const payload = Buffer.from(JSON.stringify({ v: 999, ...SAMPLE })).toString("base64url");
  assert.throws(() => decodeCredentialBlob(`${CREDENTIAL_BLOB_PREFIX}${payload}`), /version/i);
});

test("decode rejects a blob missing an access_token", () => {
  const bad = encodeCredentialBlob({
    provider: "antigravity",
    tokens: { refresh_token: "only-refresh" },
  });
  assert.throws(() => decodeCredentialBlob(bad), /access_token|token/i);
});

test("decode rejects tampered base64 (not valid JSON)", () => {
  assert.throws(
    () => decodeCredentialBlob(`${CREDENTIAL_BLOB_PREFIX}not-valid-base64-json!!!`),
    /invalid|parse|format/i
  );
});

test("encode requires a provider", () => {
  assert.throws(
    () => encodeCredentialBlob({ tokens: { access_token: "x" } } as never),
    /provider/i
  );
});
