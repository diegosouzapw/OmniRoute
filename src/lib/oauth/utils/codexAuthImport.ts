import {
  getProviderConnections,
  createProviderConnection,
  updateProviderConnection,
} from "@/lib/localDb";
import { CodexAuthFileError } from "@/lib/oauth/utils/codexAuthFile";

type JsonRecord = Record<string, unknown>;

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

function extractExpiresAt(idToken: string): string | null {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return null;
  const exp = payload.exp;
  if (typeof exp !== "number" || !Number.isFinite(exp)) return null;
  return new Date(exp * 1000).toISOString();
}

function extractJwtEmail(idToken: string): string | null {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return null;
  return toNonEmptyString(payload.email);
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

// ──── Public types ────────────────────────────────────────────────────────────

export interface CodexAuthFileInput {
  auth_mode?: unknown;
  OPENAI_API_KEY?: unknown;
  tokens?: {
    id_token?: unknown;
    access_token?: unknown;
    refresh_token?: unknown;
    account_id?: unknown;
  };
  last_refresh?: unknown;
}

export interface ParsedCodexAuth {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  accountId: string;
  email: string | null;
  expiresAt: string | null;
}

export interface CreateConnectionOptions {
  name?: string;
  email?: string;
  overwriteExisting?: boolean;
}

// ──── Parse & validate ────────────────────────────────────────────────────────

export function parseAndValidateCodexAuth(raw: unknown): ParsedCodexAuth {
  const doc = toRecord(raw);

  // Codex CLI no longer writes auth_mode in auth.json (only OmniRoute's own export
  // includes it). Accept both formats as long as the required tokens are present.
  if (doc.auth_mode !== undefined && doc.auth_mode !== null && doc.auth_mode !== "chatgpt") {
    throw new CodexAuthFileError(
      "Not a Codex auth.json — unexpected auth_mode value",
      400,
      "invalid_auth_file"
    );
  }

  const tokens = toRecord(doc.tokens);
  const idToken = toNonEmptyString(tokens.id_token);
  const accessToken = toNonEmptyString(tokens.access_token);
  const refreshToken = toNonEmptyString(tokens.refresh_token);

  if (!idToken) {
    throw new CodexAuthFileError(
      "id_token is missing or empty in the auth.json",
      400,
      "missing_id_token"
    );
  }

  if (!accessToken) {
    throw new CodexAuthFileError(
      "access_token is missing or empty in the auth.json",
      400,
      "missing_access_token"
    );
  }

  if (!refreshToken) {
    throw new CodexAuthFileError(
      "refresh_token is missing or empty in the auth.json",
      400,
      "missing_refresh_token"
    );
  }

  const tokensAccountId = toNonEmptyString(tokens.account_id) ?? undefined;
  const accountId = extractCodexAccountId(idToken, tokensAccountId);

  if (!accountId) {
    throw new CodexAuthFileError(
      "Unable to derive account_id from the auth.json tokens",
      400,
      "missing_account_id"
    );
  }

  return {
    idToken,
    accessToken,
    refreshToken,
    accountId,
    email: extractJwtEmail(idToken),
    expiresAt: extractExpiresAt(idToken),
  };
}

// ──── Create / update connection ──────────────────────────────────────────────

export async function createConnectionFromAuthFile(
  parsed: ParsedCodexAuth,
  options: CreateConnectionOptions
): Promise<{ connection: JsonRecord; created: boolean }> {
  const existing = await findExistingCodexConnection(parsed.accountId);

  if (existing) {
    if (!options.overwriteExisting) {
      throw new CodexAuthFileError(
        "A Codex connection for this account already exists. Pass overwriteExisting: true to replace it.",
        409,
        "duplicate_account"
      );
    }

    const updated = await updateProviderConnection(existing.id as string, {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      idToken: parsed.idToken,
      expiresAt: parsed.expiresAt,
      email: options.email || parsed.email || (existing.email as string | undefined),
      name:
        options.name ||
        (existing.name as string | undefined) ||
        options.email ||
        parsed.email ||
        "Codex (imported)",
      testStatus: "active",
      providerSpecificData: {
        ...toRecord(existing.providerSpecificData),
        workspaceId: parsed.accountId,
        importedAt: new Date().toISOString(),
      },
    });

    return { connection: updated || existing, created: false };
  }

  const name = options.name || options.email || parsed.email || "Codex (imported)";

  const connection = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email: options.email || parsed.email || undefined,
    accessToken: parsed.accessToken,
    refreshToken: parsed.refreshToken,
    idToken: parsed.idToken,
    expiresAt: parsed.expiresAt,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      workspaceId: parsed.accountId,
      importedAt: new Date().toISOString(),
    },
  });

  return { connection, created: true };
}

async function findExistingCodexConnection(accountId: string): Promise<JsonRecord | null> {
  const connections = await getProviderConnections({ provider: "codex" });
  return (
    (connections.find((c) => {
      const psd = toRecord((c as JsonRecord).providerSpecificData);
      return toNonEmptyString(psd.workspaceId) === accountId;
    }) as JsonRecord | undefined) ?? null
  );
}
