import test from "node:test";
import assert from "node:assert/strict";
import os from "os";
import path from "path";
import fs from "fs/promises";

// Pure-function mirrors of helpers from geminiAuthFile.ts — no DB/cliRuntime deps.

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

function sanitizeFileNamePart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._@-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "account";
}

interface GeminiConnectionLike {
  id?: string;
  name?: string;
  email?: string;
  displayName?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  expiresAt?: string | null;
  providerSpecificData?: JsonRecord | null;
}

class GeminiAuthFileError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 400, code = "invalid_request") {
    super(message);
    this.name = "GeminiAuthFileError";
    this.status = status;
    this.code = code;
  }
}

interface GeminiAuthFilePayload {
  access_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expiry_date: number;
  refresh_token: string;
}

const REFRESH_BUFFER_MS = 5 * 60 * 1000;

function shouldRefreshGeminiConnection(connection: GeminiConnectionLike): boolean {
  if (!toNonEmptyString(connection.accessToken)) return true;
  const expiresAt = toNonEmptyString(connection.expiresAt);
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  if (Number.isNaN(expiresAtMs)) return false;
  return expiresAtMs - Date.now() <= REFRESH_BUFFER_MS;
}

function extractGeminiEmail(connection: GeminiConnectionLike): string | null {
  const idToken = toNonEmptyString(connection.idToken);
  if (idToken) {
    const payload = decodeJwtPayload(idToken);
    if (payload) {
      const fromClaim = toNonEmptyString(payload.email);
      if (fromClaim) return fromClaim;
    }
  }
  return toNonEmptyString(connection.email) || toNonEmptyString(connection.displayName);
}

function buildGeminiAuthPayload(connection: GeminiConnectionLike): GeminiAuthFilePayload {
  const accessToken = toNonEmptyString(connection.accessToken);
  const refreshToken = toNonEmptyString(connection.refreshToken);
  const idToken = toNonEmptyString(connection.idToken);

  if (!accessToken) {
    throw new GeminiAuthFileError(
      "Gemini connection is missing access_token.",
      409,
      "access_token_missing"
    );
  }
  if (!refreshToken) {
    throw new GeminiAuthFileError(
      "Gemini connection is missing refresh_token.",
      409,
      "reauth_required"
    );
  }
  if (!idToken) {
    throw new GeminiAuthFileError(
      "Gemini connection is missing id_token.",
      409,
      "id_token_missing"
    );
  }

  const psd = toRecord(connection.providerSpecificData);
  const scope = toNonEmptyString(psd.scope) ?? "";
  const tokenType = toNonEmptyString(psd.tokenType) ?? "Bearer";

  let expiryDate: number;
  const expiresAt = toNonEmptyString(connection.expiresAt);
  if (expiresAt) {
    const ms = new Date(expiresAt).getTime();
    expiryDate = Number.isNaN(ms) ? Date.now() + 3600 * 1000 : ms;
  } else {
    expiryDate = Date.now() + 3600 * 1000;
  }

  return {
    access_token: accessToken,
    scope,
    token_type: tokenType,
    id_token: idToken,
    expiry_date: expiryDate,
    refresh_token: refreshToken,
  };
}

interface GoogleAccountsSidecar {
  active: string;
  old: string[];
}

async function mergeGoogleAccountsFile(
  accountsPath: string,
  newEmail: string
): Promise<{ updated: boolean; savedBakPath: string | null }> {
  let existing: GoogleAccountsSidecar = { active: "", old: [] };
  let fileExists = false;
  try {
    const raw = await fs.readFile(accountsPath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      existing = {
        active: typeof parsed.active === "string" ? parsed.active : "",
        old: Array.isArray(parsed.old)
          ? parsed.old.filter((s: unknown) => typeof s === "string")
          : [],
      };
    }
    fileExists = true;
  } catch {
    // absent or invalid
  }

  if (existing.active === newEmail) {
    return { updated: false, savedBakPath: null };
  }

  let savedBakPath: string | null = null;
  if (fileExists) {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    savedBakPath = `${path.dirname(accountsPath)}${path.sep}google_accounts-${ts}.bak`;
    await fs.copyFile(accountsPath, savedBakPath).catch(() => {});
  }

  const newOld = [
    existing.active,
    ...existing.old.filter((e) => e !== existing.active && e !== newEmail),
  ].filter(Boolean);

  const newDoc: GoogleAccountsSidecar = {
    active: newEmail,
    old: Array.from(new Set(newOld)),
  };

  await fs.writeFile(accountsPath, JSON.stringify(newDoc, null, 2) + "\n", {
    encoding: "utf8",
    mode: 0o600,
  });

  return { updated: true, savedBakPath };
}

// ──── Tests: buildGeminiAuthPayload ───────────────────────────────────────────

test("buildGeminiAuthPayload: produces correct Google OAuth2 shape", () => {
  const idToken = buildJwt({ email: "user@google.com", sub: "12345" });
  const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-aaa",
    refreshToken: "1//refresh",
    idToken,
    expiresAt,
    providerSpecificData: {
      scope: "https://www.googleapis.com/auth/cloud-platform openid email",
      tokenType: "Bearer",
    },
  };
  const payload = buildGeminiAuthPayload(conn);
  assert.equal(payload.access_token, "fake-access-token-aaa");
  assert.equal(payload.refresh_token, "1//refresh");
  assert.equal(payload.id_token, idToken);
  assert.equal(payload.token_type, "Bearer");
  assert.equal(payload.scope, "https://www.googleapis.com/auth/cloud-platform openid email");
  assert.ok(typeof payload.expiry_date === "number", "expiry_date must be a number");
});

test("buildGeminiAuthPayload: expiry_date is unix ms, not ISO", () => {
  const idToken = buildJwt({ email: "u@g.com" });
  const expiresAt = "2026-01-01T00:00:00.000Z";
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    refreshToken: "rt",
    idToken,
    expiresAt,
    providerSpecificData: {},
  };
  const payload = buildGeminiAuthPayload(conn);
  assert.equal(payload.expiry_date, new Date(expiresAt).getTime());
  assert.ok(payload.expiry_date > 1_000_000_000_000, "should be ms-epoch, not seconds");
});

test("buildGeminiAuthPayload: scope is string with spaces, not array", () => {
  const idToken = buildJwt({ email: "u@g.com" });
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    refreshToken: "rt",
    idToken,
    providerSpecificData: {
      scope: "https://www.googleapis.com/auth/cloud-platform openid email",
    },
  };
  const payload = buildGeminiAuthPayload(conn);
  assert.ok(typeof payload.scope === "string", "scope must be a string");
  assert.ok(payload.scope.includes(" "), "scope must use spaces as separator");
  assert.ok(!Array.isArray(payload.scope), "scope must not be an array");
});

test("buildGeminiAuthPayload: token_type defaults to Bearer when providerSpecificData.tokenType absent", () => {
  const idToken = buildJwt({ email: "u@g.com" });
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    refreshToken: "rt",
    idToken,
    providerSpecificData: {},
  };
  const payload = buildGeminiAuthPayload(conn);
  assert.equal(payload.token_type, "Bearer");
});

test("buildGeminiAuthPayload: throws access_token_missing when accessToken absent", () => {
  const idToken = buildJwt({ email: "u@g.com" });
  const conn: GeminiConnectionLike = {
    accessToken: null,
    refreshToken: "rt",
    idToken,
    providerSpecificData: {},
  };
  assert.throws(
    () => buildGeminiAuthPayload(conn),
    (err: GeminiAuthFileError) => {
      assert.equal(err.code, "access_token_missing");
      assert.equal(err.status, 409);
      return true;
    }
  );
});

test("buildGeminiAuthPayload: throws reauth_required when refreshToken absent", () => {
  const idToken = buildJwt({ email: "u@g.com" });
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    refreshToken: null,
    idToken,
    providerSpecificData: {},
  };
  assert.throws(
    () => buildGeminiAuthPayload(conn),
    (err: GeminiAuthFileError) => {
      assert.equal(err.code, "reauth_required");
      assert.equal(err.status, 409);
      return true;
    }
  );
});

test("buildGeminiAuthPayload: throws id_token_missing when idToken absent", () => {
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    refreshToken: "rt",
    idToken: null,
    providerSpecificData: {},
  };
  assert.throws(
    () => buildGeminiAuthPayload(conn),
    (err: GeminiAuthFileError) => {
      assert.equal(err.code, "id_token_missing");
      assert.equal(err.status, 409);
      return true;
    }
  );
});

// ──── Tests: shouldRefreshGeminiConnection ────────────────────────────────────

test("shouldRefreshGeminiConnection: true when expiresAt < now+5min", () => {
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    expiresAt: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
  };
  assert.ok(shouldRefreshGeminiConnection(conn) === true);
});

test("shouldRefreshGeminiConnection: false when expiresAt > now+10min", () => {
  const conn: GeminiConnectionLike = {
    accessToken: "fake-access-token-x",
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  };
  assert.ok(shouldRefreshGeminiConnection(conn) === false);
});

test("shouldRefreshGeminiConnection: true when accessToken absent", () => {
  const conn: GeminiConnectionLike = {
    accessToken: null,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  };
  assert.ok(shouldRefreshGeminiConnection(conn) === true);
});

// ──── Tests: extractGeminiEmail ───────────────────────────────────────────────

test("extractGeminiEmail: extracts email from id_token claim first", () => {
  const idToken = buildJwt({ email: "jwt@google.com" });
  const conn: GeminiConnectionLike = { idToken, email: "other@google.com" };
  assert.equal(extractGeminiEmail(conn), "jwt@google.com");
});

test("extractGeminiEmail: falls back to connection.email", () => {
  const conn: GeminiConnectionLike = { email: "conn@google.com" };
  assert.equal(extractGeminiEmail(conn), "conn@google.com");
});

test("extractGeminiEmail: falls back to displayName if no email", () => {
  const conn: GeminiConnectionLike = { displayName: "My Account" };
  assert.equal(extractGeminiEmail(conn), "My Account");
});

// ──── Tests: filename ─────────────────────────────────────────────────────────

test("filename: gemini-auth-{email}.json when email available", () => {
  const sanitized = sanitizeFileNamePart("user@google.com");
  const filename = `gemini-auth-${sanitized}.json`;
  assert.equal(filename, "gemini-auth-user@google.com.json");
});

test("filename: gemini-auth-{label}.json fallback when no email", () => {
  const sanitized = sanitizeFileNamePart("Production Account");
  const filename = `gemini-auth-${sanitized}.json`;
  assert.equal(filename, "gemini-auth-production-account.json");
});

// ──── Tests: mergeGoogleAccountsFile ─────────────────────────────────────────

test("mergeGoogleAccountsFile: absent file creates fresh doc with active=newEmail", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "gemini-test-"));
  const accountsPath = path.join(tmpDir, "google_accounts.json");
  try {
    const result = await mergeGoogleAccountsFile(accountsPath, "new@google.com");
    assert.equal(result.updated, true);
    assert.equal(result.savedBakPath, null);
    const written = JSON.parse(await fs.readFile(accountsPath, "utf8")) as GoogleAccountsSidecar;
    assert.equal(written.active, "new@google.com");
    assert.deepEqual(written.old, []);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test("mergeGoogleAccountsFile: noop when active already equals newEmail", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "gemini-test-"));
  const accountsPath = path.join(tmpDir, "google_accounts.json");
  try {
    await fs.writeFile(accountsPath, JSON.stringify({ active: "same@google.com", old: [] }) + "\n");
    const result = await mergeGoogleAccountsFile(accountsPath, "same@google.com");
    assert.equal(result.updated, false);
    assert.equal(result.savedBakPath, null);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test("mergeGoogleAccountsFile: moves old active to old[] when active differs", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "gemini-test-"));
  const accountsPath = path.join(tmpDir, "google_accounts.json");
  try {
    await fs.writeFile(
      accountsPath,
      JSON.stringify({ active: "old@google.com", old: ["ancient@google.com"] }) + "\n"
    );
    const result = await mergeGoogleAccountsFile(accountsPath, "new@google.com");
    assert.equal(result.updated, true);
    assert.ok(result.savedBakPath !== null, "should have created a .bak file");
    const written = JSON.parse(await fs.readFile(accountsPath, "utf8")) as GoogleAccountsSidecar;
    assert.equal(written.active, "new@google.com");
    assert.ok(written.old.includes("old@google.com"));
    assert.ok(written.old.includes("ancient@google.com"));
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test("mergeGoogleAccountsFile: overwrites invalid JSON file, updated=true", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "gemini-test-"));
  const accountsPath = path.join(tmpDir, "google_accounts.json");
  try {
    await fs.writeFile(accountsPath, "not valid json");
    const result = await mergeGoogleAccountsFile(accountsPath, "new@google.com");
    assert.equal(result.updated, true);
    const written = JSON.parse(await fs.readFile(accountsPath, "utf8")) as GoogleAccountsSidecar;
    assert.equal(written.active, "new@google.com");
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

// ──── Tests: sanitizeFileNamePart ─────────────────────────────────────────────

test("sanitizeFileNamePart keeps @ and . for emails", () => {
  assert.equal(sanitizeFileNamePart("user@google.com"), "user@google.com");
  assert.equal(sanitizeFileNamePart("User.Name@Example.Org"), "user.name@example.org");
});

test("sanitizeFileNamePart strips filesystem-invalid chars", () => {
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

// ──── Tests: .bak timestamp format ───────────────────────────────────────────

test(".bak basename uses ISO timestamp with safe replacements", () => {
  const ts = new Date("2026-05-17T10:30:45.123Z").toISOString().replace(/[:.]/g, "-");
  const basename = `oauth_creds-${ts}.bak`;
  assert.equal(basename, "oauth_creds-2026-05-17T10-30-45-123Z.bak");
  assert.ok(!ts.includes(":"), "timestamp should not contain ':'");
  assert.ok(!ts.includes("."), "timestamp should not contain '.'");
});
