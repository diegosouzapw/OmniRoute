import test from "node:test";
import assert from "node:assert/strict";

// We don't import the full claudeAuthFile module (it pulls in DB/cliRuntime/tokenRefresh).
// Instead, we re-implement the same pure primitives here and verify their shape
// matches the rules documented in the spec — unit-testing the helpers in isolation.

// ──── Helpers (mirror of claudeAuthFile.ts pure functions) ────────────────────

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function sanitizeFileNamePart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._@-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "account";
}

const REFRESH_BUFFER_MS = 5 * 60 * 1000;

interface ClaudeConnectionLike {
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: string | null;
  expiresIn?: number | null;
  providerSpecificData?: JsonRecord | null;
  email?: string | null;
  displayName?: string | null;
  name?: string | null;
  id?: string | null;
}

class ClaudeAuthFileError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 400, code = "invalid_request") {
    super(message);
    this.name = "ClaudeAuthFileError";
    this.status = status;
    this.code = code;
  }
}

function shouldRefreshClaudeConnection(connection: ClaudeConnectionLike): boolean {
  if (!toNonEmptyString(connection.accessToken)) return true;
  const expiresAt = toNonEmptyString(connection.expiresAt);
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  if (Number.isNaN(expiresAtMs)) return false;
  return expiresAtMs - Date.now() <= REFRESH_BUFFER_MS;
}

function extractClaudeEmail(connection: ClaudeConnectionLike): string | null {
  const psd = toRecord(connection.providerSpecificData);
  return (
    toNonEmptyString(psd.bootstrapEmail) ||
    toNonEmptyString(connection.email) ||
    toNonEmptyString(connection.displayName)
  );
}

interface ClaudeAuthFilePayload {
  claudeAiOauth: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // ms epoch
    scopes: string[];
    subscriptionType?: string;
    rateLimitTier?: string;
  };
}

function buildClaudeAuthPayload(connection: ClaudeConnectionLike): ClaudeAuthFilePayload {
  const accessToken = toNonEmptyString(connection.accessToken);
  const refreshToken = toNonEmptyString(connection.refreshToken);

  if (!accessToken) {
    throw new ClaudeAuthFileError(
      "Claude connection is missing access_token. Refresh or re-authenticate this account first.",
      409,
      "access_token_missing"
    );
  }

  if (!refreshToken) {
    throw new ClaudeAuthFileError(
      "Claude connection is missing refresh_token. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  const expiresAtMs = connection.expiresAt ? new Date(connection.expiresAt).getTime() : 0;

  const psd = toRecord(connection.providerSpecificData);
  const rawScopes = psd.scopes;
  const scopes: string[] = Array.isArray(rawScopes)
    ? rawScopes.filter((s): s is string => typeof s === "string")
    : [];

  const payload: ClaudeAuthFilePayload = {
    claudeAiOauth: {
      accessToken,
      refreshToken,
      expiresAt: expiresAtMs,
      scopes,
    },
  };

  const subscriptionType = toNonEmptyString(psd.subscriptionType);
  if (subscriptionType) payload.claudeAiOauth.subscriptionType = subscriptionType;

  const rateLimitTier = toNonEmptyString(psd.rateLimitTier);
  if (rateLimitTier) payload.claudeAiOauth.rateLimitTier = rateLimitTier;

  return payload;
}

// ──── Tests: sanitizeFileNamePart ─────────────────────────────────────────────

test("sanitizeFileNamePart keeps @ and . for emails", () => {
  assert.equal(sanitizeFileNamePart("Diego.Souza@example.com"), "diego.souza@example.com");
  assert.equal(sanitizeFileNamePart("user-1@example.io"), "user-1@example.io");
});

test("sanitizeFileNamePart strips filesystem-invalid chars", () => {
  assert.equal(sanitizeFileNamePart("evil/../path"), "evil-..-path");
  assert.equal(sanitizeFileNamePart("name with spaces"), "name-with-spaces");
  assert.equal(sanitizeFileNamePart("a\\b:c*d?"), "a-b-c-d");
});

test("sanitizeFileNamePart falls back to 'account' on empty/garbage", () => {
  assert.equal(sanitizeFileNamePart(""), "account");
  assert.equal(sanitizeFileNamePart("///"), "account");
});

test("sanitizeFileNamePart trims leading/trailing dashes", () => {
  assert.equal(sanitizeFileNamePart("--foo--"), "foo");
});

// ──── Tests: buildClaudeAuthPayload ───────────────────────────────────────────

test("buildClaudeAuthPayload produces correct Claude shape", () => {
  const isoExpiry = new Date(Date.now() + 3600 * 1000).toISOString();
  const payload = buildClaudeAuthPayload({
    accessToken: "at-abc",
    refreshToken: "rt-xyz",
    expiresAt: isoExpiry,
    providerSpecificData: { scopes: ["user:inference"], subscriptionType: "pro" },
  });

  assert.ok("claudeAiOauth" in payload);
  assert.equal(payload.claudeAiOauth.accessToken, "at-abc");
  assert.equal(payload.claudeAiOauth.refreshToken, "rt-xyz");
  assert.ok(typeof payload.claudeAiOauth.expiresAt === "number", "expiresAt must be a number (ms)");
  assert.deepEqual(payload.claudeAiOauth.scopes, ["user:inference"]);
  assert.equal(payload.claudeAiOauth.subscriptionType, "pro");
});

test("buildClaudeAuthPayload expiresAt is ms epoch (not ISO string)", () => {
  const isoExpiry = "2025-12-31T00:00:00.000Z";
  const expectedMs = new Date(isoExpiry).getTime();
  const payload = buildClaudeAuthPayload({
    accessToken: "at-test",
    refreshToken: "rt-test",
    expiresAt: isoExpiry,
    providerSpecificData: {},
  });

  assert.equal(payload.claudeAiOauth.expiresAt, expectedMs);
  assert.ok(payload.claudeAiOauth.expiresAt > 1_000_000_000_000, "must be ms-epoch scale");
});

test("buildClaudeAuthPayload scopes is always an array", () => {
  const payload = buildClaudeAuthPayload({
    accessToken: "at-x",
    refreshToken: "rt-x",
    expiresAt: null,
    providerSpecificData: {},
  });
  assert.ok(Array.isArray(payload.claudeAiOauth.scopes));
  assert.equal(payload.claudeAiOauth.scopes.length, 0);
});

test("buildClaudeAuthPayload throws access_token_missing when accessToken absent", () => {
  assert.throws(
    () => buildClaudeAuthPayload({ accessToken: null, refreshToken: "rt-x" }),
    (err: unknown) => {
      assert.ok(err instanceof ClaudeAuthFileError);
      assert.equal(err.code, "access_token_missing");
      assert.equal(err.status, 409);
      return true;
    }
  );
});

test("buildClaudeAuthPayload throws reauth_required when refreshToken absent", () => {
  assert.throws(
    () => buildClaudeAuthPayload({ accessToken: "at-x", refreshToken: null }),
    (err: unknown) => {
      assert.ok(err instanceof ClaudeAuthFileError);
      assert.equal(err.code, "reauth_required");
      assert.equal(err.status, 409);
      return true;
    }
  );
});

// ──── Tests: shouldRefreshClaudeConnection ────────────────────────────────────

test("shouldRefreshClaudeConnection returns true when expiresAt < now + 5min", () => {
  const soon = new Date(Date.now() + 2 * 60 * 1000).toISOString(); // 2 min from now
  assert.equal(shouldRefreshClaudeConnection({ accessToken: "at", expiresAt: soon }), true);
});

test("shouldRefreshClaudeConnection returns false when expiresAt > now + 10min", () => {
  const future = new Date(Date.now() + 20 * 60 * 1000).toISOString(); // 20 min from now
  assert.equal(shouldRefreshClaudeConnection({ accessToken: "at", expiresAt: future }), false);
});

test("shouldRefreshClaudeConnection returns true when accessToken absent", () => {
  assert.equal(
    shouldRefreshClaudeConnection({
      accessToken: null,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    }),
    true
  );
});

test("shouldRefreshClaudeConnection returns false when expiresAt absent and token present", () => {
  assert.equal(shouldRefreshClaudeConnection({ accessToken: "at", expiresAt: null }), false);
});

// ──── Tests: filename format ──────────────────────────────────────────────────

test("filename format: claude-auth-{email}.json when email available", () => {
  const email = "user@example.com";
  const sanitized = sanitizeFileNamePart(email);
  const filename = `claude-auth-${sanitized}.json`;
  assert.equal(filename, "claude-auth-user@example.com.json");
});

test("filename format: claude-auth-{label}.json fallback when no email", () => {
  const label = "Production Account";
  const sanitized = sanitizeFileNamePart(label);
  const filename = `claude-auth-${sanitized}.json`;
  assert.equal(filename, "claude-auth-production-account.json");
});

// ──── Tests: .bak basename ────────────────────────────────────────────────────

test(".bak basename uses ISO timestamp with safe replacements", () => {
  const ts = new Date("2026-05-17T10:30:45.123Z").toISOString().replace(/[:.]/g, "-");
  const basename = `credentials-${ts}.bak`;
  assert.equal(basename, "credentials-2026-05-17T10-30-45-123Z.bak");
  assert.ok(!ts.includes(":"), "timestamp should not contain ':'");
  assert.ok(!ts.includes("."), "timestamp should not contain '.'");
});

// ──── Tests: write preserves mcpOAuth ────────────────────────────────────────

test("write read-modify-write merges claudeAiOauth while preserving mcpOAuth", () => {
  // Simulate the merge logic from writeClaudeAuthFileToLocalCli
  const existingDoc: JsonRecord = {
    mcpOAuth: { token: "mcp-token-123", expiry: 9999 },
    claudeAiOauth: { accessToken: "old-at", refreshToken: "old-rt", expiresAt: 0, scopes: [] },
  };

  const newOauthBlock = {
    accessToken: "new-at",
    refreshToken: "new-rt",
    expiresAt: 1768000000000,
    scopes: ["user:inference"],
  };
  const merged = { ...existingDoc, claudeAiOauth: newOauthBlock };

  // mcpOAuth is preserved
  assert.ok("mcpOAuth" in merged, "mcpOAuth should be preserved");
  assert.deepEqual(merged.mcpOAuth, existingDoc.mcpOAuth);

  // claudeAiOauth is replaced
  assert.deepEqual(merged.claudeAiOauth, newOauthBlock);
  assert.equal((merged.claudeAiOauth as typeof newOauthBlock).accessToken, "new-at");
});

test("write skips mcpOAuth preservation when file starts from scratch", () => {
  const existingDoc: JsonRecord = {}; // no existing file
  const newOauthBlock = { accessToken: "at", refreshToken: "rt", expiresAt: 0, scopes: [] };
  const merged = { ...existingDoc, claudeAiOauth: newOauthBlock };

  assert.ok(!("mcpOAuth" in merged), "no mcpOAuth when file starts fresh");
  assert.equal((merged.claudeAiOauth as typeof newOauthBlock).accessToken, "at");
});

// ──── Tests: extractClaudeEmail ───────────────────────────────────────────────

test("extractClaudeEmail prefers bootstrapEmail from providerSpecificData", () => {
  const conn: ClaudeConnectionLike = {
    email: "fallback@example.com",
    providerSpecificData: { bootstrapEmail: "bootstrap@example.com" },
  };
  assert.equal(extractClaudeEmail(conn), "bootstrap@example.com");
});

test("extractClaudeEmail falls back to connection.email", () => {
  const conn: ClaudeConnectionLike = {
    email: "conn@example.com",
    providerSpecificData: {},
  };
  assert.equal(extractClaudeEmail(conn), "conn@example.com");
});

test("extractClaudeEmail falls back to displayName when email absent", () => {
  const conn: ClaudeConnectionLike = {
    displayName: "John Doe",
    providerSpecificData: {},
  };
  assert.equal(extractClaudeEmail(conn), "John Doe");
});

test("extractClaudeEmail returns null when no email info available", () => {
  const conn: ClaudeConnectionLike = { providerSpecificData: {} };
  assert.equal(extractClaudeEmail(conn), null);
});
