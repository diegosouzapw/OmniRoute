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

interface CodexConnectionLike {
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

export interface CodexAuthFilePayload {
  auth_mode: "chatgpt";
  OPENAI_API_KEY: null;
  tokens: {
    id_token: string;
    access_token: string;
    refresh_token: string;
    account_id: string;
  };
  last_refresh: string;
}

export interface BuiltCodexAuthFile {
  connectionId: string;
  connectionLabel: string;
  fileName: string;
  payload: CodexAuthFilePayload;
  content: string;
}

export class CodexAuthFileError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 400, code = "invalid_request") {
    super(message);
    this.name = "CodexAuthFileError";
    this.status = status;
    this.code = code;
  }
}

const CODEX_REFRESH_BUFFER_MS = Math.max(TOKEN_EXPIRY_BUFFER_MS, 5 * 60 * 1000);

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

function extractCodexAccountId(idToken: string, providerSpecificData: unknown): string | null {
  const payload = decodeJwtPayload(idToken);
  const authInfo = payload ? toRecord(payload["https://api.openai.com/auth"]) : {};

  return (
    toNonEmptyString(authInfo.chatgpt_account_id) ||
    toNonEmptyString(authInfo.account_id) ||
    toNonEmptyString(toRecord(providerSpecificData).workspaceId)
  );
}

function shouldRefreshCodexConnection(connection: CodexConnectionLike): boolean {
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

  return expiresAtMs - Date.now() <= CODEX_REFRESH_BUFFER_MS;
}

function getConnectionLabel(connection: CodexConnectionLike): string {
  return (
    toNonEmptyString(connection.name) ||
    toNonEmptyString(connection.email) ||
    toNonEmptyString(connection.displayName) ||
    toNonEmptyString(connection.id) ||
    "codex-account"
  );
}

function sanitizeFileNamePart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "account";
}

function buildCodexAuthPayload(connection: CodexConnectionLike): CodexAuthFilePayload {
  const idToken = toNonEmptyString(connection.idToken);
  const accessToken = toNonEmptyString(connection.accessToken);
  const refreshToken = toNonEmptyString(connection.refreshToken);

  if (!idToken) {
    throw new CodexAuthFileError(
      "Codex connection is missing id_token. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  if (!accessToken) {
    throw new CodexAuthFileError(
      "Codex connection is missing access_token. Refresh or re-authenticate this account first.",
      409,
      "access_token_missing"
    );
  }

  if (!refreshToken) {
    throw new CodexAuthFileError(
      "Codex connection is missing refresh_token. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  const accountId = extractCodexAccountId(idToken, connection.providerSpecificData);
  if (!accountId) {
    throw new CodexAuthFileError(
      "Unable to derive Codex account_id from the stored session. Re-authenticate this account.",
      409,
      "account_id_missing"
    );
  }

  return {
    auth_mode: "chatgpt",
    OPENAI_API_KEY: null,
    tokens: {
      id_token: idToken,
      access_token: accessToken,
      refresh_token: refreshToken,
      account_id: accountId,
    },
    last_refresh: new Date().toISOString(),
  };
}

async function resolveFreshCodexConnection(connectionId: string): Promise<CodexConnectionLike> {
  const connection = (await getProviderConnectionById(connectionId)) as CodexConnectionLike | null;
  if (!connection) {
    throw new CodexAuthFileError("Connection not found", 404, "not_found");
  }

  if (connection.provider !== "codex") {
    throw new CodexAuthFileError("Only Codex provider connections can export Codex auth files");
  }

  if (connection.authType !== "oauth") {
    throw new CodexAuthFileError("Only OAuth Codex connections support auth.json export");
  }

  if (!shouldRefreshCodexConnection(connection)) {
    return connection;
  }

  const refreshToken = toNonEmptyString(connection.refreshToken);
  if (!refreshToken) {
    throw new CodexAuthFileError(
      "Codex connection requires refresh but no refresh_token is available. Re-authenticate first.",
      409,
      "reauth_required"
    );
  }

  const refreshed = await getAccessToken("codex", {
    connectionId,
    accessToken: connection.accessToken,
    refreshToken,
    expiresAt: connection.expiresAt,
    expiresIn: connection.expiresIn,
    idToken: connection.idToken,
    providerSpecificData: connection.providerSpecificData,
  });

  if (isUnrecoverableRefreshError(refreshed)) {
    throw new CodexAuthFileError(
      "Codex refresh token is no longer valid. Re-authenticate this account before exporting.",
      409,
      "reauth_required"
    );
  }

  if (!refreshed?.accessToken) {
    throw new CodexAuthFileError(
      "Failed to refresh the Codex session before exporting the auth file. Re-authenticate this account if the session is stale.",
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

export async function buildCodexAuthFile(connectionId: string): Promise<BuiltCodexAuthFile> {
  const connection = await resolveFreshCodexConnection(connectionId);
  const payload = buildCodexAuthPayload(connection);
  const connectionLabel = getConnectionLabel(connection);
  const fileName = `codex-auth-${sanitizeFileNamePart(connectionLabel)}.json`;
  const content = JSON.stringify(payload, null, 2) + "\n";

  return {
    connectionId,
    connectionLabel,
    fileName,
    payload,
    content,
  };
}

export async function writeCodexAuthFileToLocalCli(connectionId: string) {
  const built = await buildCodexAuthFile(connectionId);
  const paths = getCliConfigPaths("codex");
  const authPath = paths?.auth;

  if (!authPath) {
    throw new CodexAuthFileError("Codex auth path could not be resolved", 500, "path_unavailable");
  }

  await fs.mkdir(path.dirname(authPath), { recursive: true });
  await createBackup("codex", authPath);
  await fs.writeFile(authPath, built.content, { encoding: "utf8", mode: 0o600 });

  try {
    await fs.chmod(authPath, 0o600);
  } catch {
    // Best effort on platforms that ignore chmod semantics.
  }

  return {
    ...built,
    authPath,
  };
}
