import fs from "fs/promises";
import path from "path";
import { getProviderConnectionById } from "@/lib/localDb";
import { createBackup } from "@/shared/services/backupService";
import { getCliConfigPaths } from "@/shared/services/cliRuntime";
import {
  TOKEN_EXPIRY_BUFFER_MS,
  getAccessToken,
  updateProviderCredentials,
} from "@/sse/services/tokenRefresh";
import { isUnrecoverableRefreshError } from "@omniroute/open-sse/services/tokenRefresh.ts";

type JsonRecord = Record<string, unknown>;

interface GeminiConnectionLike {
  id?: string;
  provider?: string;
  authType?: string;
  name?: string;
  email?: string;
  displayName?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  expiresAt?: string | null;
  expiresIn?: number | null;
  providerSpecificData?: JsonRecord | null;
}

export interface GeminiAuthFilePayload {
  access_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expiry_date: number;
  refresh_token: string;
}

export interface BuiltGeminiAuthFile {
  connectionId: string;
  connectionLabel: string;
  email: string | null;
  fileName: string;
  payload: GeminiAuthFilePayload;
  content: string;
}

export class GeminiAuthFileError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 400, code = "invalid_request") {
    super(message);
    this.name = "GeminiAuthFileError";
    this.status = status;
    this.code = code;
  }
}

export interface GoogleAccountsSidecar {
  active: string;
  old: string[];
}

export interface ApplyResult extends BuiltGeminiAuthFile {
  authPath: string;
  accountsPath: string;
  savedBakPath: string | null;
  savedAccountsBakPath: string | null;
  centralizedBackupPath: string | null;
  googleAccountsUpdated: boolean;
}

const GEMINI_REFRESH_BUFFER_MS = Math.max(TOKEN_EXPIRY_BUFFER_MS, 5 * 60 * 1000);

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

export function sanitizeFileNamePart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._@-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "account";
}

export function extractGeminiEmail(connection: GeminiConnectionLike): string | null {
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

export function shouldRefreshGeminiConnection(connection: GeminiConnectionLike): boolean {
  if (!toNonEmptyString(connection.accessToken)) {
    return true;
  }

  const expiresAt = toNonEmptyString(connection.expiresAt);
  if (!expiresAt) {
    return false;
  }

  const expiresAtMs = new Date(expiresAt).getTime();
  if (Number.isNaN(expiresAtMs)) {
    return false;
  }

  return expiresAtMs - Date.now() <= GEMINI_REFRESH_BUFFER_MS;
}

function getConnectionLabel(connection: GeminiConnectionLike): string {
  return (
    toNonEmptyString(connection.name) ||
    toNonEmptyString(connection.email) ||
    toNonEmptyString(connection.displayName) ||
    toNonEmptyString(connection.id) ||
    "gemini-account"
  );
}

function buildGeminiAuthPayload(connection: GeminiConnectionLike): GeminiAuthFilePayload {
  const accessToken = toNonEmptyString(connection.accessToken);
  const refreshToken = toNonEmptyString(connection.refreshToken);
  const idToken = toNonEmptyString(connection.idToken);

  if (!accessToken) {
    throw new GeminiAuthFileError(
      "Gemini connection is missing access_token. Refresh or re-authenticate this account first.",
      409,
      "access_token_missing"
    );
  }

  if (!refreshToken) {
    throw new GeminiAuthFileError(
      "Gemini connection is missing refresh_token. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  if (!idToken) {
    throw new GeminiAuthFileError(
      "Gemini connection is missing id_token. Re-authenticate this account before exporting.",
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

async function resolveFreshGeminiConnection(connectionId: string): Promise<GeminiConnectionLike> {
  const connection = (await getProviderConnectionById(connectionId)) as GeminiConnectionLike | null;
  if (!connection) {
    throw new GeminiAuthFileError("Connection not found", 404, "not_found");
  }

  if (connection.provider !== "gemini-cli") {
    throw new GeminiAuthFileError(
      "Only Gemini CLI provider connections can export Gemini auth files"
    );
  }

  if (connection.authType !== "oauth") {
    throw new GeminiAuthFileError(
      "Only OAuth Gemini CLI connections support oauth_creds.json export"
    );
  }

  if (!shouldRefreshGeminiConnection(connection)) {
    return connection;
  }

  const refreshToken = toNonEmptyString(connection.refreshToken);
  if (!refreshToken) {
    throw new GeminiAuthFileError(
      "Gemini connection requires refresh but no refresh_token is available. Re-authenticate first.",
      409,
      "reauth_required"
    );
  }

  const refreshed = await getAccessToken("gemini-cli", {
    connectionId,
    accessToken: connection.accessToken,
    refreshToken,
    expiresAt: connection.expiresAt,
    expiresIn: connection.expiresIn,
    idToken: connection.idToken,
    providerSpecificData: connection.providerSpecificData,
  });

  if (isUnrecoverableRefreshError(refreshed)) {
    throw new GeminiAuthFileError(
      "Gemini refresh token is no longer valid. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  if (!refreshed?.accessToken) {
    throw new GeminiAuthFileError(
      "Failed to refresh the Gemini session before exporting the auth file. Re-authenticate this account if the session is stale.",
      502,
      "refresh_failed"
    );
  }

  await updateProviderCredentials(connectionId, refreshed);

  return {
    ...connection,
    accessToken: refreshed.accessToken,
    refreshToken: toNonEmptyString(refreshed.refreshToken) || refreshToken,
    expiresIn:
      typeof refreshed.expiresIn === "number" ? refreshed.expiresIn : connection.expiresIn || null,
    expiresAt:
      typeof refreshed.expiresIn === "number"
        ? new Date(Date.now() + refreshed.expiresIn * 1000).toISOString()
        : connection.expiresAt || null,
    providerSpecificData: refreshed.providerSpecificData
      ? {
          ...toRecord(connection.providerSpecificData),
          ...toRecord(refreshed.providerSpecificData),
        }
      : connection.providerSpecificData,
  };
}

export async function buildGeminiAuthFile(connectionId: string): Promise<BuiltGeminiAuthFile> {
  const connection = await resolveFreshGeminiConnection(connectionId);
  const payload = buildGeminiAuthPayload(connection);
  const connectionLabel = getConnectionLabel(connection);
  const email = extractGeminiEmail(connection);
  const fileNameIdentifier = email || connectionLabel;
  const fileName = `gemini-auth-${sanitizeFileNamePart(fileNameIdentifier)}.json`;
  const content = JSON.stringify(payload, null, 2) + "\n";

  return {
    connectionId,
    connectionLabel,
    email,
    fileName,
    payload,
    content,
  };
}

export async function mergeGoogleAccountsFile(
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
    // file absent or invalid — start fresh
  }

  if (existing.active === newEmail) {
    return { updated: false, savedBakPath: null };
  }

  // Side-by-side backup
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
  try {
    await fs.chmod(accountsPath, 0o600);
  } catch {
    // Best effort on platforms that ignore chmod semantics.
  }

  return { updated: true, savedBakPath };
}

export async function writeGeminiAuthFileToLocalCli(connectionId: string): Promise<ApplyResult> {
  const built = await buildGeminiAuthFile(connectionId);
  const paths = getCliConfigPaths("gemini-cli");
  // authPath and accountsPath are sourced exclusively from the static CLI_TOOLS table
  // in src/shared/services/cliRuntime.ts joined against os.homedir() — no user input
  // ever reaches the path APIs below.
  const authPath = paths?.auth;
  const accountsPath = paths?.accounts;

  if (!authPath || !accountsPath) {
    throw new GeminiAuthFileError(
      "Gemini CLI paths could not be resolved",
      500,
      "path_unavailable"
    );
  }

  const authDir = path.dirname(authPath);
  await fs.mkdir(authDir, { recursive: true });

  // Side-by-side .bak inside the .gemini directory for one-click manual rollback.
  let savedBakPath: string | null = null;
  try {
    await fs.access(authPath);
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    savedBakPath = `${authDir}${path.sep}oauth_creds-${ts}.bak`;
    await fs.copyFile(authPath, savedBakPath);
  } catch {
    // No existing file; nothing to back up side-by-side.
  }

  // Centralized history (audit trail across all CLI tools).
  const centralizedBackupPath = await createBackup("gemini-cli", authPath);

  await fs.writeFile(authPath, built.content, { encoding: "utf8", mode: 0o600 });

  try {
    await fs.chmod(authPath, 0o600);
  } catch {
    // Best effort on platforms that ignore chmod semantics.
  }

  const newEmail = built.email;
  let googleAccountsUpdated = false;
  let savedAccountsBakPath: string | null = null;
  if (newEmail) {
    const merged = await mergeGoogleAccountsFile(accountsPath, newEmail);
    googleAccountsUpdated = merged.updated;
    savedAccountsBakPath = merged.savedBakPath;
  }

  return {
    ...built,
    authPath,
    accountsPath,
    savedBakPath,
    savedAccountsBakPath,
    centralizedBackupPath,
    googleAccountsUpdated,
  };
}
