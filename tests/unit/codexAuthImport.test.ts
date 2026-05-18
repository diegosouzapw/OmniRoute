import test from "node:test";
import assert from "node:assert/strict";

// Pure-function copy of helpers from codexAuthImport.ts so we don't drag DB deps.

type JsonRecord = Record<string, unknown>;

function buildJwt(payload: JsonRecord): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.fake-signature`;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function decodeJwtPayload(jwt: string): JsonRecord | null {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], "base64url").toString("utf8");
    return toRecord(JSON.parse(payload));
  } catch {
    return null;
  }
}

function extractJwtEmail(idToken: string): string | null {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return null;
  return toNonEmptyString(payload.email);
}

function extractExpiresAt(idToken: string): string | null {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return null;
  const exp = payload.exp;
  if (typeof exp !== "number" || !Number.isFinite(exp)) return null;
  return new Date(exp * 1000).toISOString();
}

function extractCodexAccountId(
  idToken: string,
  tokensAccountId: string | undefined
): string | null {
  if (tokensAccountId && tokensAccountId.trim()) return tokensAccountId.trim();
  const payload = decodeJwtPayload(idToken);
  const authInfo = payload ? toRecord(payload["https://api.openai.com/auth"]) : {};
  return (
    toNonEmptyString(authInfo.chatgpt_account_id) || toNonEmptyString(authInfo.account_id) || null
  );
}

// Mirror of parseAndValidateCodexAuth (without the throw — just the logic)

interface ParsedCodexAuth {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  accountId: string;
  email: string | null;
  expiresAt: string | null;
}

function parseCodexAuth(raw: unknown): ParsedCodexAuth | { error: string; code: string } {
  const doc = toRecord(raw);

  if (doc.auth_mode !== "chatgpt") {
    return { error: "Not a Codex auth.json", code: "invalid_auth_file" };
  }

  const tokens = toRecord(doc.tokens);
  const idToken = toNonEmptyString(tokens.id_token);
  const accessToken = toNonEmptyString(tokens.access_token);
  const refreshToken = toNonEmptyString(tokens.refresh_token);

  if (!idToken) return { error: "missing id_token", code: "missing_id_token" };
  if (!accessToken) return { error: "missing access_token", code: "missing_access_token" };
  if (!refreshToken) return { error: "missing refresh_token", code: "missing_refresh_token" };

  const tokensAccountId = toNonEmptyString(tokens.account_id) ?? undefined;
  const accountId = extractCodexAccountId(idToken, tokensAccountId);
  if (!accountId) return { error: "missing account_id", code: "missing_account_id" };

  return {
    idToken,
    accessToken,
    refreshToken,
    accountId,
    email: extractJwtEmail(idToken),
    expiresAt: extractExpiresAt(idToken),
  };
}

// ──── Tests ───────────────────────────────────────────────────────────────────

test("parseCodexAuth: valid file returns all fields", () => {
  const idToken = buildJwt({
    email: "alice@example.com",
    exp: 9999999999,
    "https://api.openai.com/auth": { chatgpt_account_id: "acct-abc123" },
  });
  const raw = {
    auth_mode: "chatgpt",
    OPENAI_API_KEY: null,
    tokens: {
      id_token: idToken,
      access_token: "at-xxx",
      refresh_token: "rt-yyy",
      account_id: "acct-abc123",
    },
    last_refresh: new Date().toISOString(),
  };
  const result = parseCodexAuth(raw);
  assert.ok(!("error" in result));
  const parsed = result as ParsedCodexAuth;
  assert.equal(parsed.idToken, idToken);
  assert.equal(parsed.accessToken, "at-xxx");
  assert.equal(parsed.refreshToken, "rt-yyy");
  assert.equal(parsed.accountId, "acct-abc123");
  assert.equal(parsed.email, "alice@example.com");
  assert.ok(parsed.expiresAt !== null);
});

test("parseCodexAuth: wrong auth_mode returns error", () => {
  const result = parseCodexAuth({ auth_mode: "api_key", tokens: {} });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "invalid_auth_file");
});

test("parseCodexAuth: missing id_token returns error", () => {
  const result = parseCodexAuth({
    auth_mode: "chatgpt",
    tokens: { access_token: "at", refresh_token: "rt" },
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_id_token");
});

test("parseCodexAuth: missing access_token returns error", () => {
  const idToken = buildJwt({ email: "a@b.com" });
  const result = parseCodexAuth({
    auth_mode: "chatgpt",
    tokens: { id_token: idToken, refresh_token: "rt" },
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
});

test("parseCodexAuth: missing refresh_token returns error", () => {
  const idToken = buildJwt({ email: "a@b.com" });
  const result = parseCodexAuth({
    auth_mode: "chatgpt",
    tokens: { id_token: idToken, access_token: "at" },
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_refresh_token");
});

test("JWT email extraction: email claim extracted", () => {
  const jwt = buildJwt({ email: "test@example.com", sub: "123" });
  assert.equal(extractJwtEmail(jwt), "test@example.com");
});

test("JWT email extraction: no email claim returns null", () => {
  const jwt = buildJwt({ sub: "123" });
  assert.equal(extractJwtEmail(jwt), null);
});

test("JWT email extraction: malformed JWT returns null", () => {
  assert.equal(extractJwtEmail("not.a.valid.jwt.at.all"), null);
});

test("extractCodexAccountId: tokens.account_id wins over JWT claim", () => {
  const jwt = buildJwt({
    "https://api.openai.com/auth": { chatgpt_account_id: "claim-id" },
  });
  assert.equal(extractCodexAccountId(jwt, "direct-id"), "direct-id");
});

test("extractCodexAccountId: falls back to JWT chatgpt_account_id claim", () => {
  const jwt = buildJwt({
    "https://api.openai.com/auth": { chatgpt_account_id: "claim-id" },
  });
  assert.equal(extractCodexAccountId(jwt, undefined), "claim-id");
});

test("extractCodexAccountId: falls back to account_id claim", () => {
  const jwt = buildJwt({
    "https://api.openai.com/auth": { account_id: "acct-fallback" },
  });
  assert.equal(extractCodexAccountId(jwt, undefined), "acct-fallback");
});

test("extractCodexAccountId: returns null when no id available", () => {
  const jwt = buildJwt({ sub: "123" });
  assert.equal(extractCodexAccountId(jwt, undefined), null);
});

test("extractExpiresAt: derives ISO date from exp claim", () => {
  const expUnix = 1900000000;
  const jwt = buildJwt({ exp: expUnix });
  const result = extractExpiresAt(jwt);
  assert.ok(result !== null);
  assert.equal(new Date(result).getTime(), expUnix * 1000);
});

test("extractExpiresAt: returns null when no exp claim", () => {
  const jwt = buildJwt({ sub: "123" });
  assert.equal(extractExpiresAt(jwt), null);
});

test("parseCodexAuth: accountId from tokens.account_id takes precedence over JWT", () => {
  const idToken = buildJwt({
    "https://api.openai.com/auth": { chatgpt_account_id: "jwt-id" },
  });
  const result = parseCodexAuth({
    auth_mode: "chatgpt",
    tokens: {
      id_token: idToken,
      access_token: "at",
      refresh_token: "rt",
      account_id: "direct-id",
    },
  });
  assert.ok(!("error" in result));
  assert.equal((result as ParsedCodexAuth).accountId, "direct-id");
});

test("parseCodexAuth: non-object input returns error", () => {
  const result = parseCodexAuth("not an object");
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "invalid_auth_file");
});

test("parseCodexAuth: null input returns error", () => {
  const result = parseCodexAuth(null);
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "invalid_auth_file");
});
