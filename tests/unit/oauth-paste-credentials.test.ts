// Unit tests for the server-side paste-credentials gate.
//
// The remote login helper (`omniroute login antigravity`) prints a credential
// blob; the dashboard POSTs it to /api/oauth/<provider>/paste-credentials. Before
// the server finalizes + persists the tokens it MUST validate that (a) the route
// provider is on the paste-credentials allowlist (only Google native-loopback
// providers, never arbitrary providers) and (b) the blob's embedded provider
// matches the route provider — otherwise a blob minted for one provider could be
// replayed against another. This pins that gate; the finalize/persist IO is the
// same path as the already-tested `device-complete` action.

import test from "node:test";
import assert from "node:assert/strict";
import { encodeCredentialBlob } from "../../src/lib/oauth/credentialBlob.ts";
import {
  PASTE_CREDENTIAL_PROVIDERS,
  parsePastedCredentials,
} from "../../src/lib/oauth/pasteCredentials.ts";

const tokens = { access_token: "ya29.x", refresh_token: "1//r", expires_in: 3599 };

test("allowlist contains antigravity and its agy alias, not codex", () => {
  assert.ok(PASTE_CREDENTIAL_PROVIDERS.has("antigravity"));
  assert.ok(PASTE_CREDENTIAL_PROVIDERS.has("agy"));
  assert.ok(!PASTE_CREDENTIAL_PROVIDERS.has("codex"), "codex uses its own device-complete path");
});

test("accepts a matching antigravity blob and returns the tokens", () => {
  const blob = encodeCredentialBlob({ provider: "antigravity", tokens });
  const result = parsePastedCredentials("antigravity", blob);
  assert.equal(result.provider, "antigravity");
  assert.deepEqual(result.tokens, tokens);
});

test("rejects a provider not on the allowlist", () => {
  const blob = encodeCredentialBlob({ provider: "openai", tokens });
  assert.throws(() => parsePastedCredentials("openai", blob), /not supported|allowlist|supported/i);
});

test("rejects a blob whose embedded provider does not match the route provider", () => {
  // Blob minted for antigravity, replayed against the agy route → must reject.
  const blob = encodeCredentialBlob({ provider: "antigravity", tokens });
  assert.throws(() => parsePastedCredentials("agy", blob), /match|mismatch|provider/i);
});

test("propagates codec validation errors (e.g. missing access_token)", () => {
  const blob = encodeCredentialBlob({ provider: "antigravity", tokens: { refresh_token: "r" } });
  assert.throws(() => parsePastedCredentials("antigravity", blob), /access_token|token/i);
});
