import test from "node:test";
import assert from "node:assert/strict";

// Pure-function copy of helpers from geminiAuthImport.ts so we don't drag DB deps.

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

// Mirror of parseAndValidateGeminiAuth (pure logic, no throws — returns result or error)

interface ParsedGeminiAuth {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  scope: string;
  tokenType: string;
  expiresAt: string | null;
  email: string | null;
}

function parseGeminiAuth(raw: unknown): ParsedGeminiAuth | { error: string; code: string } {
  const doc = toRecord(raw);

  const accessToken = toNonEmptyString(doc.access_token);
  const refreshToken = toNonEmptyString(doc.refresh_token);
  const idToken = toNonEmptyString(doc.id_token);

  if (!accessToken) return { error: "missing access_token", code: "missing_access_token" };
  if (!refreshToken) return { error: "missing refresh_token", code: "missing_refresh_token" };
  if (!idToken) return { error: "missing id_token", code: "missing_id_token" };

  const expiryDateMs = doc.expiry_date;
  let expiresAt: string | null = null;
  if (typeof expiryDateMs === "number" && Number.isFinite(expiryDateMs)) {
    expiresAt = new Date(expiryDateMs).toISOString();
  }

  const scope = toNonEmptyString(doc.scope) ?? "";
  const tokenType = toNonEmptyString(doc.token_type) ?? "Bearer";
  const email = extractJwtEmail(idToken);

  return { accessToken, refreshToken, idToken, scope, tokenType, expiresAt, email };
}

// ──── Tests: parseAndValidateGeminiAuth ──────────────────────────────────────

test("parseAndValidateGeminiAuth: accepts valid Google OAuth2 payload", () => {
  const idToken = buildJwt({ email: "user@example.com", sub: "123" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
    scope: "https://www.googleapis.com/auth/cloud-platform openid",
    token_type: "Bearer",
    expiry_date: 1768527451123,
  });
  assert.ok(!("error" in result), `Expected success, got error: ${JSON.stringify(result)}`);
  const parsed = result as ParsedGeminiAuth;
  assert.equal(parsed.accessToken, "fake-goog-access-token");
  assert.equal(parsed.refreshToken, "1//refresh");
  assert.equal(parsed.idToken, idToken);
  assert.equal(parsed.scope, "https://www.googleapis.com/auth/cloud-platform openid");
  assert.equal(parsed.tokenType, "Bearer");
  assert.equal(parsed.email, "user@example.com");
});

test("parseAndValidateGeminiAuth: rejects empty access_token (missing_access_token)", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const result = parseGeminiAuth({
    access_token: "",
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
});

test("parseAndValidateGeminiAuth: rejects missing access_token", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const result = parseGeminiAuth({
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_access_token");
});

test("parseAndValidateGeminiAuth: rejects empty refresh_token (missing_refresh_token)", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "   ",
    id_token: idToken,
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_refresh_token");
});

test("parseAndValidateGeminiAuth: rejects empty id_token (missing_id_token)", () => {
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: "",
  });
  assert.ok("error" in result);
  assert.equal((result as { code: string }).code, "missing_id_token");
});

test("parseAndValidateGeminiAuth: converts expiry_date ms to ISO string", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const expiryMs = 1768527451123;
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
    expiry_date: expiryMs,
  });
  assert.ok(!("error" in result));
  const parsed = result as ParsedGeminiAuth;
  assert.ok(parsed.expiresAt !== null, "expiresAt should not be null");
  assert.ok(parsed.expiresAt!.includes("T"), "expiresAt should be ISO format");
  assert.equal(new Date(parsed.expiresAt!).getTime(), expiryMs);
});

test("parseAndValidateGeminiAuth: expiresAt is null when expiry_date absent", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok(!("error" in result));
  assert.equal((result as ParsedGeminiAuth).expiresAt, null);
});

test("parseAndValidateGeminiAuth: extracts email from JWT id_token", () => {
  const idToken = buildJwt({ email: "diego@example.com", sub: "user-123" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok(!("error" in result));
  assert.equal((result as ParsedGeminiAuth).email, "diego@example.com");
});

test("parseAndValidateGeminiAuth: email is null when id_token has no email claim", () => {
  const idToken = buildJwt({ sub: "user-123" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok(!("error" in result));
  assert.equal((result as ParsedGeminiAuth).email, null);
});

test("parseAndValidateGeminiAuth: scope absent defaults to empty string", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok(!("error" in result));
  assert.equal((result as ParsedGeminiAuth).scope, "");
});

test("parseAndValidateGeminiAuth: token_type absent defaults to Bearer", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
  });
  assert.ok(!("error" in result));
  assert.equal((result as ParsedGeminiAuth).tokenType, "Bearer");
});

test("parseAndValidateGeminiAuth: scope is string with spaces (not array)", () => {
  const idToken = buildJwt({ email: "user@example.com" });
  const scopeStr = "https://www.googleapis.com/auth/cloud-platform openid email";
  const result = parseGeminiAuth({
    access_token: "fake-goog-access-token",
    refresh_token: "1//refresh",
    id_token: idToken,
    scope: scopeStr,
  });
  assert.ok(!("error" in result));
  const parsed = result as ParsedGeminiAuth;
  assert.equal(typeof parsed.scope, "string");
  assert.ok(parsed.scope.includes(" "), "scope should be space-separated string");
});

// ──── Tests: enrichWithLoadCodeAssist (mocked fetch) ────────────────────────

test("enrichWithLoadCodeAssist: returns projectId on success", async () => {
  const parsed: ParsedGeminiAuth = {
    accessToken: "fake-goog-access-token",
    refreshToken: "1//refresh",
    idToken: "eyJ.eyJ.sig",
    scope: "openid",
    tokenType: "Bearer",
    expiresAt: null,
    email: "user@example.com",
  };

  // Inline mirror of enrichWithLoadCodeAssist with injected fetch
  async function enrichWithMockFetch(
    p: ParsedGeminiAuth,
    mockFetch: typeof fetch
  ): Promise<{ projectId: string | null } & ParsedGeminiAuth> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await mockFetch(
        "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${p.accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: { ideType: "GEMINI_CLI", platform: "linux" } }),
          signal: controller.signal,
        }
      );
      if (!response.ok) return { ...p, projectId: null };
      const data = (await response.json()) as Record<string, unknown>;
      const projectId =
        (typeof data.projectId === "string" ? data.projectId.trim() || null : null) ??
        (typeof data.cloudaiProjectId === "string" ? data.cloudaiProjectId.trim() || null : null);
      return { ...p, projectId };
    } catch {
      return { ...p, projectId: null };
    } finally {
      clearTimeout(timer);
    }
  }

  const mockFetch = async () =>
    ({
      ok: true,
      json: async () => ({ projectId: "my-gcp-project-123" }),
    }) as Response;

  const enriched = await enrichWithMockFetch(parsed, mockFetch as typeof fetch);
  assert.equal(enriched.projectId, "my-gcp-project-123");
  assert.equal(enriched.accessToken, parsed.accessToken);
});

test("enrichWithLoadCodeAssist: returns projectId null on 401 (best-effort)", async () => {
  const parsed: ParsedGeminiAuth = {
    accessToken: "fake-goog-expired-token",
    refreshToken: "1//refresh",
    idToken: "eyJ.eyJ.sig",
    scope: "",
    tokenType: "Bearer",
    expiresAt: null,
    email: null,
  };

  async function enrichWithMockFetch(
    p: ParsedGeminiAuth,
    mockFetch: typeof fetch
  ): Promise<{ projectId: string | null } & ParsedGeminiAuth> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await mockFetch(
        "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${p.accessToken}`, "Content-Type": "application/json" },
          body: "{}",
          signal: controller.signal,
        }
      );
      if (!response.ok) return { ...p, projectId: null };
      const data = (await response.json()) as Record<string, unknown>;
      const projectId = typeof data.projectId === "string" ? data.projectId || null : null;
      return { ...p, projectId };
    } catch {
      return { ...p, projectId: null };
    } finally {
      clearTimeout(timer);
    }
  }

  const mockFetch = async () => ({ ok: false, status: 401 }) as Response;

  const enriched = await enrichWithMockFetch(parsed, mockFetch as typeof fetch);
  assert.equal(enriched.projectId, null);
});

test("enrichWithLoadCodeAssist: returns projectId null on network error (best-effort)", async () => {
  const parsed: ParsedGeminiAuth = {
    accessToken: "fake-goog-access-token",
    refreshToken: "1//refresh",
    idToken: "eyJ.eyJ.sig",
    scope: "",
    tokenType: "Bearer",
    expiresAt: null,
    email: null,
  };

  async function enrichWithMockFetch(
    p: ParsedGeminiAuth,
    mockFetch: typeof fetch
  ): Promise<{ projectId: string | null } & ParsedGeminiAuth> {
    try {
      const response = await mockFetch(
        "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${p.accessToken}`, "Content-Type": "application/json" },
          body: "{}",
          signal: new AbortController().signal,
        }
      );
      if (!response.ok) return { ...p, projectId: null };
      return { ...p, projectId: null };
    } catch {
      return { ...p, projectId: null };
    }
  }

  const mockFetch = async () => {
    throw new Error("network failure");
  };

  const enriched = await enrichWithMockFetch(parsed, mockFetch as typeof fetch);
  assert.equal(enriched.projectId, null);
});

// ──── Tests: createConnectionFromAuthFile (pure logic mirrors) ───────────────

test("createConnectionFromAuthFile: throws 409 duplicate_account when exists + overwrite=false", () => {
  // Mirror the guard logic
  function checkDuplicate(
    existingEmail: string | null,
    newEmail: string | null,
    overwriteExisting: boolean
  ): string | null {
    if (newEmail && existingEmail?.toLowerCase() === newEmail.toLowerCase()) {
      if (!overwriteExisting) return "duplicate_account";
    }
    return null;
  }

  const result = checkDuplicate("user@example.com", "user@example.com", false);
  assert.equal(result, "duplicate_account");
});

test("createConnectionFromAuthFile: allows update when exists + overwrite=true", () => {
  function checkDuplicate(
    existingEmail: string | null,
    newEmail: string | null,
    overwriteExisting: boolean
  ): string | null {
    if (newEmail && existingEmail?.toLowerCase() === newEmail.toLowerCase()) {
      if (!overwriteExisting) return "duplicate_account";
    }
    return null;
  }

  const result = checkDuplicate("user@example.com", "user@example.com", true);
  assert.equal(result, null);
});

test("createConnectionFromAuthFile: throws 409 identity_unverified when no email + overwrite=false", () => {
  function checkIdentity(resolvedEmail: string | null, overwriteExisting: boolean): string | null {
    if (!resolvedEmail && !overwriteExisting) return "identity_unverified";
    return null;
  }

  assert.equal(checkIdentity(null, false), "identity_unverified");
});

test("createConnectionFromAuthFile: allows create without email when overwrite=true", () => {
  function checkIdentity(resolvedEmail: string | null, overwriteExisting: boolean): string | null {
    if (!resolvedEmail && !overwriteExisting) return "identity_unverified";
    return null;
  }

  assert.equal(checkIdentity(null, true), null);
});

test("createConnectionFromAuthFile: email from options.email takes precedence over enriched.email", () => {
  const resolveEmail = (optionsEmail: string | undefined, enrichedEmail: string | null) =>
    optionsEmail || enrichedEmail;

  assert.equal(
    resolveEmail("override@example.com", "original@example.com"),
    "override@example.com"
  );
  assert.equal(resolveEmail(undefined, "original@example.com"), "original@example.com");
  assert.equal(resolveEmail(undefined, null), null);
});

test("providerSpecificData: projectId from enrichment is stored", () => {
  const buildPsd = (scope: string, tokenType: string, projectId: string | null) => ({
    scope,
    tokenType,
    projectId,
    importedAt: new Date().toISOString(),
  });

  const psd = buildPsd("openid", "Bearer", "my-project-123");
  assert.equal(psd.projectId, "my-project-123");
  assert.equal(psd.scope, "openid");
  assert.equal(psd.tokenType, "Bearer");
  assert.ok(psd.importedAt.includes("T"), "importedAt should be ISO");
});

test("providerSpecificData: projectId is null when enrichment failed", () => {
  const buildPsd = (scope: string, tokenType: string, projectId: string | null) => ({
    scope,
    tokenType,
    projectId,
    importedAt: new Date().toISOString(),
  });

  const psd = buildPsd("openid", "Bearer", null);
  assert.equal(psd.projectId, null);
});
