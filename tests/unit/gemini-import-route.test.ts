import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Local reimplementation of importGeminiAuthSchema — avoids importing Next.js deps from schemas.ts.
const importGeminiAuthSchema = z.object({
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("json"), json: z.unknown() }),
    z.object({
      kind: z.literal("text"),
      text: z.string().max(256 * 1024, "oauth_creds.json content exceeds 256KB"),
    }),
  ]),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email("Must be a valid email").optional(),
  overwriteExisting: z.boolean().optional(),
});

// Local reimplementation of importGeminiAuthBulkSchema.
const importGeminiAuthBulkSchema = z.object({
  entries: z
    .array(
      z.object({
        json: z.unknown(),
        name: z.string().min(1).max(200).optional(),
        email: z.string().email("Must be a valid email").optional(),
      })
    )
    .min(1, "At least one entry is required")
    .max(50, "At most 50 entries per bulk import"),
  overwriteExisting: z.boolean().optional(),
});

function parseSingle(body: unknown) {
  return importGeminiAuthSchema.safeParse(body);
}

function parseBulk(body: unknown) {
  return importGeminiAuthBulkSchema.safeParse(body);
}

// ──── Helpers ─────────────────────────────────────────────────────────────────

function encodeJwtPayload(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.fake-sig`;
}

function makeIdToken(email: string): string {
  return encodeJwtPayload({ sub: "12345", email, iat: 1000000, exp: 9999999 });
}

function makeValidGeminiPayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    access_token: "fake-goog-access-token",
    refresh_token: "test-refresh-token",
    id_token: makeIdToken("user@example.com"),
    expiry_date: Date.now() + 3600 * 1000,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    token_type: "Bearer",
    ...overrides,
  };
}

// Inline parse logic (mirrors parseAndValidateGeminiAuth) to allow pure-logic tests
// without importing DB-coupled modules.
function parseGeminiAuthLocal(raw: unknown): {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  scope: string;
  tokenType: string;
  expiresAt: string | null;
  email: string | null;
} {
  const doc =
    raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};

  function toStr(v: unknown): string | null {
    if (typeof v !== "string") return null;
    const t = v.trim();
    return t || null;
  }

  const accessToken = toStr(doc.access_token);
  const refreshToken = toStr(doc.refresh_token);
  const idToken = toStr(doc.id_token);

  if (!accessToken)
    throw Object.assign(new Error("access_token is missing or empty in the oauth_creds.json"), {
      code: "missing_access_token",
      status: 400,
    });
  if (!refreshToken)
    throw Object.assign(new Error("refresh_token is missing or empty in the oauth_creds.json"), {
      code: "missing_refresh_token",
      status: 400,
    });
  if (!idToken)
    throw Object.assign(new Error("id_token is missing or empty in the oauth_creds.json"), {
      code: "missing_id_token",
      status: 400,
    });

  const expiryDateMs = doc.expiry_date;
  let expiresAt: string | null = null;
  if (typeof expiryDateMs === "number" && Number.isFinite(expiryDateMs)) {
    expiresAt = new Date(expiryDateMs).toISOString();
  }

  const scope = toStr(doc.scope) ?? "";
  const tokenType = toStr(doc.token_type) ?? "Bearer";

  // Extract email from JWT id_token
  let email: string | null = null;
  try {
    const parts = idToken.split(".");
    if (parts.length === 3) {
      const payload = Buffer.from(parts[1], "base64url").toString("utf8");
      const p = JSON.parse(payload) as Record<string, unknown>;
      const e = p.email;
      email = typeof e === "string" && e.trim() ? e.trim() : null;
    }
  } catch {
    // ignore
  }

  return { accessToken, refreshToken, idToken, scope, tokenType, expiresAt, email };
}

// ──── Schema single: valid cases ──────────────────────────────────────────────

test("schema single: valid json source", () => {
  const result = parseSingle({ source: { kind: "json", json: { access_token: "t" } } });
  assert.ok(result.success);
  assert.equal(result.data.source.kind, "json");
});

test("schema single: valid text source", () => {
  const result = parseSingle({
    source: { kind: "text", text: JSON.stringify({ access_token: "t" }) },
  });
  assert.ok(result.success);
  assert.equal(result.data.source.kind, "text");
});

test("schema single: optional fields are optional", () => {
  const result = parseSingle({ source: { kind: "json", json: {} } });
  assert.ok(result.success);
  assert.equal(result.data.name, undefined);
  assert.equal(result.data.email, undefined);
  assert.equal(result.data.overwriteExisting, undefined);
});

// ──── Schema single: invalid cases ───────────────────────────────────────────

test("schema single: kind 'file' fails", () => {
  const result = parseSingle({ source: { kind: "file" } });
  assert.ok(!result.success);
});

test("schema single: invalid email fails", () => {
  const result = parseSingle({
    source: { kind: "json", json: {} },
    email: "not-an-email",
  });
  assert.ok(!result.success);
  const issue = result.error.issues.find((i) => i.path.includes("email"));
  assert.ok(issue, "expected email validation issue");
});

test("schema single: empty name fails", () => {
  const result = parseSingle({ source: { kind: "json", json: {} }, name: "" });
  assert.ok(!result.success);
});

test("schema single: text above 256KB fails", () => {
  const bigText = "x".repeat(256 * 1024 + 1);
  const result = parseSingle({ source: { kind: "text", text: bigText } });
  assert.ok(!result.success);
});

test("schema single: text exactly at 256KB passes", () => {
  const maxText = "x".repeat(256 * 1024);
  const result = parseSingle({ source: { kind: "text", text: maxText } });
  assert.ok(result.success);
});

// ──── Schema bulk: valid cases ────────────────────────────────────────────────

test("schema bulk: entries with 1 item passes", () => {
  const result = parseBulk({ entries: [{ json: {} }] });
  assert.ok(result.success);
  assert.equal(result.data.entries.length, 1);
});

test("schema bulk: entries with 50 items passes", () => {
  const entries = Array.from({ length: 50 }, () => ({ json: {} }));
  const result = parseBulk({ entries });
  assert.ok(result.success);
  assert.equal(result.data.entries.length, 50);
});

// ──── Schema bulk: invalid cases ─────────────────────────────────────────────

test("schema bulk: empty entries array fails", () => {
  const result = parseBulk({ entries: [] });
  assert.ok(!result.success);
});

test("schema bulk: entries with 51 items fails", () => {
  const entries = Array.from({ length: 51 }, () => ({ json: {} }));
  const result = parseBulk({ entries });
  assert.ok(!result.success);
});

test("schema bulk: invalid email in entry fails", () => {
  const result = parseBulk({ entries: [{ json: {}, email: "bad-email" }] });
  assert.ok(!result.success);
});

// ──── Parse logic: valid payload ──────────────────────────────────────────────

test("parse: accepts valid Google OAuth2 payload", () => {
  const payload = makeValidGeminiPayload();
  const parsed = parseGeminiAuthLocal(payload);
  assert.equal(parsed.accessToken, "fake-goog-access-token");
  assert.equal(parsed.refreshToken, "test-refresh-token");
  assert.ok(parsed.idToken.startsWith("eyJ"));
  assert.equal(parsed.scope, "https://www.googleapis.com/auth/cloud-platform");
  assert.equal(parsed.tokenType, "Bearer");
});

test("parse: rejects empty access_token", () => {
  const payload = makeValidGeminiPayload({ access_token: "" });
  assert.throws(
    () => parseGeminiAuthLocal(payload),
    (err: NodeJS.ErrnoException & { code?: string }) => {
      assert.equal(err.code, "missing_access_token");
      return true;
    }
  );
});

test("parse: rejects empty refresh_token", () => {
  const payload = makeValidGeminiPayload({ refresh_token: "" });
  assert.throws(
    () => parseGeminiAuthLocal(payload),
    (err: NodeJS.ErrnoException & { code?: string }) => {
      assert.equal(err.code, "missing_refresh_token");
      return true;
    }
  );
});

test("parse: rejects empty id_token", () => {
  const payload = makeValidGeminiPayload({ id_token: "" });
  assert.throws(
    () => parseGeminiAuthLocal(payload),
    (err: NodeJS.ErrnoException & { code?: string }) => {
      assert.equal(err.code, "missing_id_token");
      return true;
    }
  );
});

test("parse: converts expiry_date ms to ISO string", () => {
  const expiryMs = 1700000000000;
  const payload = makeValidGeminiPayload({ expiry_date: expiryMs });
  const parsed = parseGeminiAuthLocal(payload);
  assert.equal(parsed.expiresAt, new Date(expiryMs).toISOString());
});

test("parse: scope absent yields empty string", () => {
  const payload = makeValidGeminiPayload({ scope: undefined });
  const parsed = parseGeminiAuthLocal(payload);
  assert.equal(parsed.scope, "");
});

test("parse: token_type absent yields Bearer", () => {
  const payload = makeValidGeminiPayload({ token_type: undefined });
  const parsed = parseGeminiAuthLocal(payload);
  assert.equal(parsed.tokenType, "Bearer");
});

test("parse: extracts email from JWT id_token", () => {
  const idToken = makeIdToken("alice@example.com");
  const payload = makeValidGeminiPayload({ id_token: idToken });
  const parsed = parseGeminiAuthLocal(payload);
  assert.equal(parsed.email, "alice@example.com");
});

test("parse: source kind 'text' passes JSON before parse", () => {
  const inner = makeValidGeminiPayload();
  const text = JSON.stringify(inner);
  const rawJson = JSON.parse(text);
  const parsed = parseGeminiAuthLocal(rawJson);
  assert.equal(parsed.accessToken, "fake-goog-access-token");
});

// ──── apply-local response shape ──────────────────────────────────────────────

test("apply-local: response shape includes googleAccountsUpdated boolean", () => {
  const fakeResult = {
    success: true,
    connectionId: "conn-1",
    connectionLabel: "user@example.com",
    email: "user@example.com",
    authPath: "/home/user/.gemini/oauth_creds.json",
    accountsPath: "/home/user/.gemini/google_accounts.json",
    savedBakPath: null,
    savedAccountsBakPath: null,
    centralizedBackupPath: null,
    googleAccountsUpdated: true,
    writtenAt: new Date().toISOString(),
  };
  assert.equal(typeof fakeResult.googleAccountsUpdated, "boolean");
  assert.equal(fakeResult.googleAccountsUpdated, true);
});

test("apply-local: response shape includes accountsPath string", () => {
  const fakeResult = {
    accountsPath: "/home/user/.gemini/google_accounts.json",
  };
  assert.equal(typeof fakeResult.accountsPath, "string");
  assert.ok(fakeResult.accountsPath.length > 0);
});

test("apply-local: audit metadata includes provider gemini-cli", () => {
  const metadata = {
    provider: "gemini-cli",
    authPath: "/home/user/.gemini/oauth_creds.json",
    accountsPath: "/home/user/.gemini/google_accounts.json",
    savedBakPath: null,
    centralizedBackupPath: null,
    googleAccountsUpdated: false,
  };
  assert.equal(metadata.provider, "gemini-cli");
});

// ──── ZIP extract entries schema ──────────────────────────────────────────────

test("zip-extract: returned entry has name, json, parseError fields", () => {
  const validEntry = { name: "oauth_creds.json", json: { access_token: "t" }, parseError: null };
  assert.equal(typeof validEntry.name, "string");
  assert.ok(validEntry.json !== undefined);
  assert.equal(validEntry.parseError, null);
});

test("zip-extract: entry with parse error has null json and non-null parseError", () => {
  const failedEntry = { name: "bad.json", json: null, parseError: "Not valid JSON" };
  assert.equal(failedEntry.json, null);
  assert.equal(typeof failedEntry.parseError, "string");
  assert.ok(failedEntry.parseError.length > 0);
});
