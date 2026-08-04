/**
 * Unit tests for the Codex bulk-import normalizer.
 *
 * Pure helpers — no I/O, no network. Synthetic id_tokens are crafted by
 * base64url-encoding a header/payload/signature triple (only the payload is
 * decoded; we never verify the signature).
 *
 * Ported from decolua/9router#1257 (beaaan).
 */

import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeCodexImportRecord,
  flattenCodexImportPayload,
} from "../../src/lib/oauth/services/codexImport.ts";

// ── Helpers ───────────────────────────────────────────────────────────────────

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function makeIdToken(payload: Record<string, unknown>): string {
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const body = b64url(payload);
  return `${header}.${body}.signature`;
}

const FULL_RECORD = {
  id_token: makeIdToken({
    email: "test-jwt@example.com",
    "https://api.openai.com/auth": {
      chatgpt_account_id: "acct-from-jwt",
      chatgpt_plan_type: "plus",
    },
  }),
  access_token: "access-xyz",
  refresh_token: "refresh-xyz",
  account_id: "acct-from-record",
  email: "test-record@example.com",
  type: "codex",
  expired: "2026-05-22T10:34:04+07:00",
};

// ── normalizeCodexImportRecord ────────────────────────────────────────────────

describe("normalizeCodexImportRecord", () => {
  test("normalizes a full Codex export record", () => {
    const result = normalizeCodexImportRecord(FULL_RECORD);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    const { payload } = result;
    assert.equal(payload.provider, "codex");
    assert.equal(payload.authType, "oauth");
    assert.equal(payload.accessToken, "access-xyz");
    assert.equal(payload.refreshToken, "refresh-xyz");
    assert.equal(payload.idToken, FULL_RECORD.id_token);
    assert.equal(payload.testStatus, "active");
    // JWT email wins over the record-level email.
    assert.equal(payload.email, "test-jwt@example.com");
    assert.deepEqual(payload.providerSpecificData, {
      chatgptAccountId: "acct-from-jwt",
      chatgptPlanType: "plus",
    });
    // ISO-formatted, parses back to the right instant.
    const expiresMs = Date.parse(payload.expiresAt);
    assert.ok(Number.isFinite(expiresMs));
    assert.equal(expiresMs, Date.parse(FULL_RECORD.expired));
  });

  test("falls back to record email when id_token has none", () => {
    const idToken = makeIdToken({
      "https://api.openai.com/auth": { chatgpt_account_id: "x" },
    });
    const result = normalizeCodexImportRecord({
      access_token: "a",
      refresh_token: "r",
      email: "fallback@example.com",
      id_token: idToken,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.email, "fallback@example.com");
    assert.equal(result.payload.providerSpecificData?.chatgptAccountId, "x");
  });

  test("falls back to account_id when id_token is missing", () => {
    const result = normalizeCodexImportRecord({
      access_token: "a",
      refresh_token: "r",
      email: "no-jwt@example.com",
      account_id: "acct-top-level",
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.providerSpecificData?.chatgptAccountId, "acct-top-level");
    assert.equal(result.payload.idToken, undefined);
  });

  test("synthesizes expiresAt when `expired` is missing", () => {
    const before = Date.now();
    const result = normalizeCodexImportRecord({
      access_token: "a",
      refresh_token: "r",
      email: "x@example.com",
    });
    const after = Date.now();
    assert.equal(result.ok, true);
    if (!result.ok) return;
    const expiresMs = Date.parse(result.payload.expiresAt);
    assert.ok(expiresMs > before, "expiresAt should be in the future");
    // Default lifetime is 10 days; allow a generous upper bound.
    assert.ok(
      expiresMs <= after + 11 * 24 * 60 * 60 * 1000,
      "expiresAt should be within ~11 days",
    );
  });

  test("rejects invalid `expired` strings by falling back to default", () => {
    const result = normalizeCodexImportRecord({
      access_token: "a",
      refresh_token: "r",
      email: "x@example.com",
      expired: "not-a-date",
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.ok(Number.isFinite(Date.parse(result.payload.expiresAt)));
  });

  test("rejects records missing required fields", () => {
    assert.equal(normalizeCodexImportRecord({}).ok, false);
    assert.equal(
      normalizeCodexImportRecord({ access_token: "a", email: "x@y.z" }).ok,
      false,
    );
    assert.equal(
      normalizeCodexImportRecord({ access_token: "a", refresh_token: "r" }).ok,
      false, // no email anywhere
    );
  });

  test("rejects records with non-codex `type`", () => {
    const result = normalizeCodexImportRecord({
      access_token: "a",
      refresh_token: "r",
      email: "x@example.com",
      type: "claude",
    });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.error, /Unsupported type/);
  });

  test("rejects non-objects", () => {
    assert.equal(normalizeCodexImportRecord(null).ok, false);
    assert.equal(normalizeCodexImportRecord("foo").ok, false);
    assert.equal(normalizeCodexImportRecord([]).ok, false);
  });

  test("omits providerSpecificData when no account info is present", () => {
    const result = normalizeCodexImportRecord({
      access_token: "a",
      refresh_token: "r",
      email: "x@example.com",
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.providerSpecificData, undefined);
  });

  test("unwraps the Codex CLI auth.json shape", () => {
    const idToken = makeIdToken({
      email: "cli@example.com",
      "https://api.openai.com/auth": {
        chatgpt_account_id: "acct-cli",
        chatgpt_plan_type: "free",
      },
    });
    // Access token's `exp` is the only expiry signal in auth.json.
    const expEpoch = Math.floor(Date.now() / 1000) + 3600;
    const accessToken = makeIdToken({ exp: expEpoch });
    const authJson = {
      auth_mode: "chatgpt",
      OPENAI_API_KEY: null,
      tokens: {
        id_token: idToken,
        access_token: accessToken,
        refresh_token: "rt-cli",
        account_id: "acct-cli",
      },
      last_refresh: "2026-05-16T11:35:58.322795500Z",
    };
    const result = normalizeCodexImportRecord(authJson);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.accessToken, accessToken);
    assert.equal(result.payload.refreshToken, "rt-cli");
    assert.equal(result.payload.idToken, idToken);
    assert.equal(result.payload.email, "cli@example.com");
    assert.deepEqual(result.payload.providerSpecificData, {
      chatgptAccountId: "acct-cli",
      chatgptPlanType: "free",
    });
    // Falls back to the access_token's `exp` claim when no `expired` field exists.
    assert.equal(Date.parse(result.payload.expiresAt), expEpoch * 1000);
  });

  test("rejects auth.json when nested tokens are incomplete", () => {
    const result = normalizeCodexImportRecord({
      auth_mode: "chatgpt",
      tokens: { id_token: "x" }, // missing access_token + refresh_token
    });
    assert.equal(result.ok, false);
  });
});

// ── flattenCodexImportPayload ─────────────────────────────────────────────────

describe("flattenCodexImportPayload", () => {
  test("wraps a single object", () => {
    const result = flattenCodexImportPayload({ a: 1 });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.deepEqual(result.records, [{ a: 1 }]);
  });

  test("passes arrays through", () => {
    const result = flattenCodexImportPayload([{ a: 1 }, { b: 2 }]);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.deepEqual(result.records, [{ a: 1 }, { b: 2 }]);
  });

  test("rejects scalars", () => {
    assert.equal(flattenCodexImportPayload("nope").ok, false);
    assert.equal(flattenCodexImportPayload(42).ok, false);
    assert.equal(flattenCodexImportPayload(null).ok, false);
  });
});

// ── 9router camelCase export (#6665) ────────────────────────────────────────────

describe("9router camelCase Codex export (#6665)", () => {
  // The exact shape a 9router Codex account export produces (camelCase fields +
  // nested providerSpecificData), as pasted in issue #6665.
  const NINEROUTER_RECORD = {
    accessToken: "access-9r",
    refreshToken: "refresh-9r",
    idToken: makeIdToken({
      email: "jwt-9r@example.com",
      "https://api.openai.com/auth": {
        chatgpt_account_id: "acct-jwt-9r",
        chatgpt_plan_type: "plus",
      },
    }),
    email: "top-9r@example.com",
    expiresAt: "2026-07-17T13:18:27.000Z",
    expiresIn: 849516,
    providerSpecificData: {
      chatgptAccountId: "acct-psd-9r",
      chatgptPlanType: "pro",
    },
    testStatus: "active",
    isActive: true,
    lastRefreshAt: "2026-07-07T17:19:51.150Z",
  };

  test("normalizes a 9router camelCase record", () => {
    const result = normalizeCodexImportRecord(NINEROUTER_RECORD);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    const { payload } = result;
    assert.equal(payload.accessToken, "access-9r");
    assert.equal(payload.refreshToken, "refresh-9r");
    assert.equal(payload.idToken, NINEROUTER_RECORD.idToken);
    // JWT-derived account info wins over the pre-supplied providerSpecificData.
    assert.equal(payload.email, "jwt-9r@example.com");
    assert.deepEqual(payload.providerSpecificData, {
      chatgptAccountId: "acct-jwt-9r",
      chatgptPlanType: "plus",
    });
    // camelCase `expiresAt` is honored as the expiry source.
    assert.equal(Date.parse(payload.expiresAt), Date.parse(NINEROUTER_RECORD.expiresAt));
  });

  test("uses pre-supplied providerSpecificData when there is no id_token", () => {
    const result = normalizeCodexImportRecord({
      accessToken: "a",
      refreshToken: "r",
      email: "no-jwt-9r@example.com",
      providerSpecificData: { chatgptAccountId: "acct-psd", chatgptPlanType: "team" },
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.email, "no-jwt-9r@example.com");
    assert.deepEqual(result.payload.providerSpecificData, {
      chatgptAccountId: "acct-psd",
      chatgptPlanType: "team",
    });
  });

  test("an explicit snake_case field is NOT overridden by a camelCase alias", () => {
    const result = normalizeCodexImportRecord({
      access_token: "snake-wins",
      accessToken: "camel-loses",
      refresh_token: "r",
      email: "mixed@example.com",
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.payload.accessToken, "snake-wins");
  });

  test("a full 9router {accounts:[...]} export flattens to its records", () => {
    const flat = flattenCodexImportPayload([NINEROUTER_RECORD]);
    assert.equal(flat.ok, true);
    if (!flat.ok) return;
    assert.equal(flat.records.length, 1);
    const norm = normalizeCodexImportRecord(flat.records[0]);
    assert.equal(norm.ok, true);
  });
});
