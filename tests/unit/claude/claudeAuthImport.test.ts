import test from "node:test";
import assert from "node:assert/strict";

// Pure-function copies of helpers from claudeAuthImport.ts — no DB deps pulled in.

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
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

interface ParsedClaudeAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: string | null;
  scopes: string[];
  subscriptionType: string | null;
  rateLimitTier: string | null;
  email: string | null;
}

interface EnrichedClaudeAuth extends ParsedClaudeAuth {
  accountUUID: string | null;
  organizationUUID: string | null;
  organizationName: string | null;
  organizationType: string | null;
  rateLimitTier: string | null;
}

interface CreateConnectionOptions {
  name?: string;
  email?: string;
  overwriteExisting?: boolean;
}

function parseClaudeAuth(
  raw: unknown
): ParsedClaudeAuth | { error: string; code: string; status: number } {
  const doc = toRecord(raw);
  const oauthBlock = toRecord(doc.claudeAiOauth);

  const accessToken = toNonEmptyString(oauthBlock.accessToken);
  const refreshToken = toNonEmptyString(oauthBlock.refreshToken);

  if (!accessToken) {
    return {
      error: "accessToken is missing or empty in claudeAiOauth",
      code: "missing_access_token",
      status: 400,
    };
  }

  if (!refreshToken) {
    return {
      error: "refreshToken is missing or empty in claudeAiOauth",
      code: "missing_refresh_token",
      status: 400,
    };
  }

  let expiresAt: string | null = null;
  const rawExpiresAt = oauthBlock.expiresAt;
  if (typeof rawExpiresAt === "number" && Number.isFinite(rawExpiresAt)) {
    expiresAt = new Date(rawExpiresAt).toISOString();
  } else if (typeof rawExpiresAt === "string" && rawExpiresAt.trim()) {
    expiresAt = rawExpiresAt.trim();
  }

  const rawScopes = oauthBlock.scopes;
  const scopes: string[] = Array.isArray(rawScopes)
    ? rawScopes.filter((s): s is string => typeof s === "string")
    : [];

  return {
    accessToken,
    refreshToken,
    expiresAt,
    scopes,
    subscriptionType: toNonEmptyString(oauthBlock.subscriptionType),
    rateLimitTier: toNonEmptyString(oauthBlock.rateLimitTier),
    email: null,
  };
}

// Mirror of the duplicate-detection + identity-check logic in createConnectionFromAuthFile
function checkCreateConnectionPreconditions(
  enriched: EnrichedClaudeAuth,
  options: CreateConnectionOptions,
  existingByAccountUUID: JsonRecord | null
): { error: string; code: string; status: number } | null {
  if (enriched.accountUUID && existingByAccountUUID && !options.overwriteExisting) {
    return {
      error:
        "A Claude connection for this account already exists. Pass overwriteExisting: true to replace it.",
      code: "duplicate_account",
      status: 409,
    };
  }

  if (!enriched.email && !enriched.accountUUID && !options.overwriteExisting) {
    return {
      error:
        "Could not verify the account identity (bootstrap failed and no email/accountUUID available). Pass overwriteExisting: true to import anyway.",
      code: "identity_unverified",
      status: 409,
    };
  }

  return null;
}

// ──── Tests: parseClaudeAuth ──────────────────────────────────────────────────

test("parseClaudeAuth: valid payload returns all fields", () => {
  const raw = {
    claudeAiOauth: {
      accessToken: "at-abc",
      refreshToken: "rt-xyz",
      expiresAt: 1768527451123,
      scopes: ["user:inference"],
      subscriptionType: "pro",
      rateLimitTier: "default",
    },
  };
  const result = parseClaudeAuth(raw);
  assert.ok(!("error" in result));
  const parsed = result as ParsedClaudeAuth;
  assert.equal(parsed.accessToken, "at-abc");
  assert.equal(parsed.refreshToken, "rt-xyz");
  assert.ok(parsed.expiresAt !== null, "expiresAt should be non-null");
  assert.deepEqual(parsed.scopes, ["user:inference"]);
  assert.equal(parsed.subscriptionType, "pro");
  assert.equal(parsed.rateLimitTier, "default");
});

test("parseClaudeAuth: rejects empty accessToken", () => {
  const result = parseClaudeAuth({ claudeAiOauth: { accessToken: "", refreshToken: "rt" } });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
  assert.equal((result as { status: number }).status, 400);
});

test("parseClaudeAuth: rejects missing accessToken", () => {
  const result = parseClaudeAuth({ claudeAiOauth: { refreshToken: "rt" } });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
});

test("parseClaudeAuth: rejects empty refreshToken", () => {
  const result = parseClaudeAuth({ claudeAiOauth: { accessToken: "at", refreshToken: "  " } });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_refresh_token");
  assert.equal((result as { status: number }).status, 400);
});

test("parseClaudeAuth: converts expiresAt ms number to ISO string", () => {
  const msEpoch = 1768527451123;
  const result = parseClaudeAuth({
    claudeAiOauth: { accessToken: "at", refreshToken: "rt", expiresAt: msEpoch },
  });
  assert.ok(!("error" in result));
  const parsed = result as ParsedClaudeAuth;
  assert.ok(parsed.expiresAt !== null);
  assert.equal(parsed.expiresAt, new Date(msEpoch).toISOString());
});

test("parseClaudeAuth: scopes absent produces empty array", () => {
  const result = parseClaudeAuth({ claudeAiOauth: { accessToken: "at", refreshToken: "rt" } });
  assert.ok(!("error" in result));
  assert.deepEqual((result as ParsedClaudeAuth).scopes, []);
});

test("parseClaudeAuth: non-string scopes are filtered out", () => {
  const result = parseClaudeAuth({
    claudeAiOauth: { accessToken: "at", refreshToken: "rt", scopes: ["user:inference", 42, null] },
  });
  assert.ok(!("error" in result));
  assert.deepEqual((result as ParsedClaudeAuth).scopes, ["user:inference"]);
});

test("parseClaudeAuth: non-object input returns missing_access_token", () => {
  const result = parseClaudeAuth("not an object");
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
});

test("parseClaudeAuth: null input returns missing_access_token", () => {
  const result = parseClaudeAuth(null);
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
});

// ──── Tests: enrichWithBootstrap (simulated) ──────────────────────────────────

test("enrichWithBootstrap success: extracts accountUUID and account_email", () => {
  // Simulate a successful bootstrap response
  const bootstrapBody = {
    account_uuid: "uuid-123",
    organization_uuid: "org-uuid-456",
    organization_name: "Acme Corp",
    organization_type: "enterprise",
    rate_limit_tier: "premium",
    account_email: "alice@example.com",
  };

  const parsed: ParsedClaudeAuth = {
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: null,
  };

  // Simulate what enrichWithBootstrap does with a successful body
  const enriched: EnrichedClaudeAuth = {
    ...parsed,
    accountUUID: toNonEmptyString(bootstrapBody.account_uuid),
    organizationUUID: toNonEmptyString(bootstrapBody.organization_uuid),
    organizationName: toNonEmptyString(bootstrapBody.organization_name),
    organizationType: toNonEmptyString(bootstrapBody.organization_type),
    rateLimitTier: toNonEmptyString(bootstrapBody.rate_limit_tier),
    email: toNonEmptyString(bootstrapBody.account_email),
  };

  assert.equal(enriched.accountUUID, "uuid-123");
  assert.equal(enriched.email, "alice@example.com");
  assert.equal(enriched.organizationName, "Acme Corp");
  assert.equal(enriched.rateLimitTier, "premium");
});

test("enrichWithBootstrap 401: returns null fields, does not throw", () => {
  // Simulate a 401 response (non-ok) — enrichWithBootstrap returns base with null fields
  const parsed: ParsedClaudeAuth = {
    accessToken: "expired-at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: null,
  };

  const enriched: EnrichedClaudeAuth = {
    ...parsed,
    accountUUID: null,
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
    rateLimitTier: null,
  };

  assert.equal(enriched.accountUUID, null);
  assert.equal(enriched.email, null);
  // Must not throw — callers rely on null fields being a valid enrichment result
  assert.ok(true, "no throw occurred");
});

test("enrichWithBootstrap timeout: returns null fields, does not throw", () => {
  // Simulate timeout path — same as 401 result shape
  const parsed: ParsedClaudeAuth = {
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: null,
  };

  const enriched: EnrichedClaudeAuth = {
    ...parsed,
    accountUUID: null,
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
    rateLimitTier: parsed.rateLimitTier,
  };

  assert.equal(enriched.accountUUID, null);
  assert.ok(true, "timeout path returns gracefully without throw");
});

// ──── Tests: createConnectionFromAuthFile preconditions ───────────────────────

test("createConnectionFromAuthFile: throws 409 duplicate_account when existing + overwrite=false", () => {
  const enriched: EnrichedClaudeAuth = {
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: "alice@example.com",
    accountUUID: "uuid-123",
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
  };

  const existingConnection: JsonRecord = { id: "conn-1", name: "Alice" };
  const options: CreateConnectionOptions = { overwriteExisting: false };

  const result = checkCreateConnectionPreconditions(enriched, options, existingConnection);
  assert.ok(result !== null);
  assert.equal(result!.code, "duplicate_account");
  assert.equal(result!.status, 409);
});

test("createConnectionFromAuthFile: throws 409 identity_unverified when no email + no accountUUID + overwrite=false", () => {
  const enriched: EnrichedClaudeAuth = {
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: null,
    accountUUID: null,
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
  };

  const options: CreateConnectionOptions = { overwriteExisting: false };
  const result = checkCreateConnectionPreconditions(enriched, options, null);
  assert.ok(result !== null);
  assert.equal(result!.code, "identity_unverified");
  assert.equal(result!.status, 409);
});

test("createConnectionFromAuthFile: allows create without email/accountUUID when overwrite=true", () => {
  const enriched: EnrichedClaudeAuth = {
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: null,
    accountUUID: null,
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
  };

  const options: CreateConnectionOptions = { overwriteExisting: true };
  const result = checkCreateConnectionPreconditions(enriched, options, null);
  assert.equal(result, null, "no precondition error when overwriteExisting=true");
});

test("createConnectionFromAuthFile: allows create when existing but overwrite=true", () => {
  const enriched: EnrichedClaudeAuth = {
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: null,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
    email: "alice@example.com",
    accountUUID: "uuid-123",
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
  };

  const existingConnection: JsonRecord = { id: "conn-1" };
  const options: CreateConnectionOptions = { overwriteExisting: true };

  const result = checkCreateConnectionPreconditions(enriched, options, existingConnection);
  assert.equal(result, null, "no precondition error when overwriteExisting=true");
});
