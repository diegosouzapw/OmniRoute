import test from "node:test";
import assert from "node:assert/strict";
import { normalizeImportRecord } from "../../src/lib/oauth/accountExport.ts";

test("normalizes nested snake-case tokens without unrelated export fields", () => {
  const result = normalizeImportRecord(
    {
      email: "account@example.com",
      token: { access_token: "test-access", refresh_token: "test-refresh" },
      privateNote: "not-for-persistence",
    },
    "antigravity"
  );
  assert.equal(result?.email, "account@example.com");
  assert.deepEqual(result?.tokens, { access_token: "test-access", refresh_token: "test-refresh" });
});

test("accepts nested and flat camel-case tokens", () => {
  for (const record of [
    { token: { accessToken: "test-access", refreshToken: "test-refresh" } },
    { accessToken: "test-access", refreshToken: "test-refresh" },
  ]) {
    assert.equal(normalizeImportRecord(record, "agy")?.tokens.access_token, "test-access");
  }
});

test("rejects provider mismatches, invalid token objects and empty access tokens", () => {
  for (const record of [
    { provider: "codex", access_token: "test-access" },
    { token: [] },
    { token: null },
    { access_token: " " },
  ])
    assert.equal(normalizeImportRecord(record, "antigravity"), null);
  assert.equal(normalizeImportRecord({ access_token: "test-access" }, "codex"), null);
});

test("derives TTL from epoch milliseconds without persisting export metadata", () => {
  const result = normalizeImportRecord(
    {
      access_token: "test-access",
      expiry_timestamp: Date.now() + 60_000,
    },
    "antigravity"
  );
  assert.ok(result && result.tokens.expires_in! >= 59 && result.tokens.expires_in! <= 60);
  assert.ok(!("expiry_timestamp" in result.tokens));
});

test("does not derive a negative TTL from expired tokens", () => {
  const result = normalizeImportRecord(
    {
      access_token: "test-access",
      expiry_timestamp: Date.now() - 60_000,
    },
    "antigravity"
  );
  assert.equal(result?.tokens.expires_in, undefined);
});
