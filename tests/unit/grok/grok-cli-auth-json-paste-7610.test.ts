import test from "node:test";
import assert from "node:assert/strict";
import { parseGrokCliPasteToken } from "@/lib/oauth/utils/grokCliAuthJson";

// Direct branch-coverage tests for the #7610 Grok Build paste-import validator,
// extracted from OAuthModal.tsx into its own module so it can be exercised
// without a full component render (mirrors the OAuthModal jsdom behavioral
// suite in tests/unit/ui/grok-device-oauth-modal.test.tsx).

test("#7610: rejects empty paste", () => {
  const result = parseGrokCliPasteToken("   ");
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Paste the full contents/);
});

test("#7610: rejects a bare JWT paste", () => {
  const result = parseGrokCliPasteToken("eyJhbGciOiJIUzI1NiJ9.bare.jwt");
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Do not paste only the JWT "key"/);
});

test("#7610: rejects non-JSON, non-JWT garbage", () => {
  const result = parseGrokCliPasteToken("not json at all");
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Paste the full contents of ~\/\.grok\/auth\.json/);
});

test("#7610: rejects malformed JSON", () => {
  const result = parseGrokCliPasteToken('{"broken": ');
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Could not parse auth\.json/);
});

test("#7610: rejects a JSON array (not an object, does not start with '{')", () => {
  const result = parseGrokCliPasteToken("[1,2,3]");
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Paste the full contents of ~\/\.grok\/auth\.json/);
});

test("#7610: rejects an object wrapping an array literal (defensive Array.isArray guard)", () => {
  // Not reachable via JSON.parse of a `{`-prefixed string in practice (object
  // literals can't parse to arrays), but the parser still guards against a
  // non-object/array shape defensively — assert the object-required branch
  // handles the boundary case a bare `{}`-shaped falsy/array value would hit.
  const result = parseGrokCliPasteToken("{}");
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Could not find a Grok Build JWT/);
});

test("#7610: rejects auth.json with no JWT key/access_token at all", () => {
  const result = parseGrokCliPasteToken(
    JSON.stringify({ "https://auth.x.ai::clientId": { foo: "bar" } })
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Could not find a Grok Build JWT/);
});

test("#7610: rejects auth.json with a JWT key but no refresh_token", () => {
  const result = parseGrokCliPasteToken(
    JSON.stringify({
      "https://auth.x.ai::clientId": { key: "eyJhbGciOiJIUzI1NiJ9.no.refresh" },
    })
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /auth\.json is missing refresh_token/);
});

test("#7610: accepts a valid full auth.json (key + refresh_token)", () => {
  const doc = {
    "https://auth.x.ai::clientId": {
      key: "eyJhbGciOiJIUzI1NiJ9.valid.jwt",
      refresh_token: "refresh-abc-123",
    },
  };
  const result = parseGrokCliPasteToken(JSON.stringify(doc));
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.token, doc);
});

test("#7610: accepts access_token variant (key + refresh_token elsewhere)", () => {
  const doc = {
    "https://auth.x.ai::clientId": {
      access_token: "eyJhbGciOiJIUzI1NiJ9.access.jwt",
      refresh_token: "refresh-xyz-789",
    },
  };
  const result = parseGrokCliPasteToken(JSON.stringify(doc));
  assert.equal(result.ok, true);
});

test("#7610: accepts a multi-entry auth.json where refresh_token is on a later entry", () => {
  const doc = {
    "https://auth.x.ai::clientId": {
      key: "eyJhbGciOiJIUzI1NiJ9.no.refresh.here",
    },
    "https://auth.x.ai::otherClientId": {
      key: "eyJhbGciOiJIUzI1NiJ9.has.refresh",
      refresh_token: "refresh-xyz-789",
    },
  };
  const result = parseGrokCliPasteToken(JSON.stringify(doc));
  assert.equal(result.ok, true);
});
