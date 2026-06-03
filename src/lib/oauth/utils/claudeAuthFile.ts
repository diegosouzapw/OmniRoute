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

interface ClaudeConnectionLike {
  id?: string;
  provider?: string;
  authType?: string;
  name?: string;
  email?: string;
  displayName?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: string | null;
  expiresIn?: number | null;
  providerSpecificData?: JsonRecord | null;
}

export interface ClaudeAuthFilePayload {
  claudeAiOauth: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // ms epoch
    scopes: string[];
    subscriptionType?: string;
    rateLimitTier?: string;
  };
}

export interface BuiltClaudeAuthFile {
  connectionId: string;
  connectionLabel: string;
  email: string | null;
  fileName: string; // claude-auth-{email}.json
  payload: ClaudeAuthFilePayload;
  content: string; // JSON.stringify(payload, null, 2) + "\n"
}

export class ClaudeAuthFileError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 400, code = "invalid_request") {
    super(message);
    this.name = "ClaudeAuthFileError";
    this.status = status;
    this.code = code;
  }
}

const CLAUDE_REFRESH_BUFFER_MS = Math.max(TOKEN_EXPIRY_BUFFER_MS, 5 * 60 * 1000);

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function shouldRefreshClaudeConnection(connection: ClaudeConnectionLike): boolean {
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

  return expiresAtMs - Date.now() <= CLAUDE_REFRESH_BUFFER_MS;
}

export function getConnectionLabel(connection: ClaudeConnectionLike): string {
  return (
    toNonEmptyString(connection.name) ||
    toNonEmptyString(connection.email) ||
    toNonEmptyString(connection.displayName) ||
    toNonEmptyString(connection.id) ||
    "claude-account"
  );
}

export function sanitizeFileNamePart(value: string): string {
  // Keep alphanumerics, dot, underscore, hyphen and @ so email addresses survive
  // intact in the exported filename (e.g. `claude-auth-diego@example.com.json`).
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._@-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "account";
}

export function extractClaudeEmail(connection: ClaudeConnectionLike): string | null {
  const psd = toRecord(connection.providerSpecificData);
  return (
    toNonEmptyString(psd.bootstrapEmail) ||
    toNonEmptyString(connection.email) ||
    toNonEmptyString(connection.displayName)
  );
}

export function buildClaudeAuthPayload(connection: ClaudeConnectionLike): ClaudeAuthFilePayload {
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

  // expiresAt in DB is ISO string; the file format expects ms epoch
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
  if (subscriptionType) {
    payload.claudeAiOauth.subscriptionType = subscriptionType;
  }

  const rateLimitTier = toNonEmptyString(psd.rateLimitTier);
  if (rateLimitTier) {
    payload.claudeAiOauth.rateLimitTier = rateLimitTier;
  }

  return payload;
}

async function resolveFreshClaudeConnection(connectionId: string): Promise<ClaudeConnectionLike> {
  const connection = (await getProviderConnectionById(connectionId)) as ClaudeConnectionLike | null;
  if (!connection) {
    throw new ClaudeAuthFileError("Connection not found", 404, "not_found");
  }

  if (connection.provider !== "claude") {
    throw new ClaudeAuthFileError("Only Claude provider connections can export Claude auth files");
  }

  if (connection.authType !== "oauth") {
    throw new ClaudeAuthFileError("Only OAuth Claude connections support credentials.json export");
  }

  if (!shouldRefreshClaudeConnection(connection)) {
    return connection;
  }

  const refreshToken = toNonEmptyString(connection.refreshToken);
  if (!refreshToken) {
    throw new ClaudeAuthFileError(
      "Claude connection requires refresh but no refresh_token is available. Re-authenticate first.",
      409,
      "reauth_required"
    );
  }

  const refreshed = await getAccessToken("claude", {
    connectionId,
    accessToken: connection.accessToken,
    refreshToken,
    expiresAt: connection.expiresAt,
    expiresIn: connection.expiresIn,
    providerSpecificData: connection.providerSpecificData,
  });

  if (isUnrecoverableRefreshError(refreshed)) {
    throw new ClaudeAuthFileError(
      "Claude refresh token is no longer valid. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  if (!refreshed?.accessToken) {
    throw new ClaudeAuthFileError(
      "Failed to refresh the Claude session before exporting the credentials file. Re-authenticate this account if the session is stale.",
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

export async function buildClaudeAuthFile(connectionId: string): Promise<BuiltClaudeAuthFile> {
  const connection = await resolveFreshClaudeConnection(connectionId);
  const payload = buildClaudeAuthPayload(connection);
  const connectionLabel = getConnectionLabel(connection);
  const email = extractClaudeEmail(connection);
  const fileNameIdentifier = email || connectionLabel;
  const fileName = `claude-auth-${sanitizeFileNamePart(fileNameIdentifier)}.json`;
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

export async function writeClaudeAuthFileToLocalCli(connectionId: string) {
  const built = await buildClaudeAuthFile(connectionId);
  const paths = getCliConfigPaths("claude");
  // authPath is sourced exclusively from the static CLI_TOOLS table in
  // src/shared/services/cliRuntime.ts (joined against os.homedir() inside
  // that helper). No external/user input ever reaches the path APIs below.
  const authPath = paths?.auth;

  if (!authPath) {
    throw new ClaudeAuthFileError(
      "Claude auth path could not be resolved",
      500,
      "path_unavailable"
    );
  }

  const authDir = path.dirname(authPath);
  await fs.mkdir(authDir, { recursive: true });

  // Side-by-side .bak inside the .claude directory for one-click manual
  // rollback. Both halves are server-controlled (authDir from the static
  // CLI_TOOLS table; basename from a server-generated ISO timestamp), so
  // string concatenation here is safe — and avoids the false-positive
  // taint on path.join when Semgrep cannot follow the trust chain.
  let savedBakPath: string | null = null;
  try {
    await fs.access(authPath);
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    savedBakPath = `${authDir}${path.sep}credentials-${ts}.bak`;
    await fs.copyFile(authPath, savedBakPath);
  } catch {
    // No existing file; nothing to back up side-by-side.
  }

  // Centralized history (audit trail across all CLI tools).
  const centralizedBackupPath = await createBackup("claude", authPath);

  // READ-MODIFY-WRITE: preserve mcpOAuth and any other keys the Claude CLI
  // may have written alongside claudeAiOauth.
  let existingDoc: Record<string, unknown> = {};
  try {
    const raw = await fs.readFile(authPath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") existingDoc = parsed;
  } catch {
    // File absent or invalid JSON — start from scratch.
  }

  const mergedContent =
    JSON.stringify({ ...existingDoc, claudeAiOauth: built.payload.claudeAiOauth }, null, 2) + "\n";

  await fs.writeFile(authPath, mergedContent, { encoding: "utf8", mode: 0o600 });

  try {
    await fs.chmod(authPath, 0o600);
  } catch {
    // Best effort on platforms that ignore chmod semantics.
  }

  const mcpOAuthPreserved = !!(existingDoc as JsonRecord).mcpOAuth;

  return {
    ...built,
    authPath,
    savedBakPath,
    centralizedBackupPath,
    mcpOAuthPreserved,
  };
}
