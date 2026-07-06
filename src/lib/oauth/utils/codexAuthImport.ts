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

function extractExpFromJwt(jwt: string): number | null {
  const payload = decodeJwtPayload(jwt);
  if (!payload) return null;
  const exp = payload.exp;
  return typeof exp === "number" && Number.isFinite(exp) ? exp : null;
}

// Prefer access_token.exp over id_token.exp — the id_token may be expired
// while the access_token (and refresh_token) are still valid. Using a stale
// id_token expiry would mark the connection as expired immediately after import
// and trigger an unnecessary refresh (which can invalidate the token family).
function extractExpiresAt(accessToken: string, idToken: string): string | null {
  const accessExp = extractExpFromJwt(accessToken);
  if (accessExp !== null) return new Date(accessExp * 1000).toISOString();
  const idExp = extractExpFromJwt(idToken);
  if (idExp !== null) return new Date(idExp * 1000).toISOString();
  return null;
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

// Two DISTINCT users can share the SAME workspace/account id (e.g. two members of the
// same ChatGPT Team). The account id alone is NOT a unique connection key. The id_token
// auth claim carries the per-user `chatgpt_user_id`; use it (falling back to `user_id`,
// then the JWT `sub`) so imports can be deduped by workspace AND user. See #6301.
function extractCodexUserId(idToken: string): string | null {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return null;
  const authInfo = toRecord(payload["https://api.openai.com/auth"]);
  return (
    toNonEmptyString(authInfo.chatgpt_user_id) ||
    toNonEmptyString(authInfo.user_id) ||
    toNonEmptyString(payload.sub) ||
    null
  );
}

// On overwrite, keep the incoming per-user id but fall back to the one already stored
// on the existing connection (legacy imports carried none) rather than dropping it (#6301).
function mergeCodexUserId(incomingUserId: string | null, existing: JsonRecord): string | null {
  return incomingUserId ?? toNonEmptyString(toRecord(existing.providerSpecificData).chatgptUserId);
}

// ──── Public types ────────────────────────────────────────────────────────────

export interface ParsedCodexAuth {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  accountId: string;
  // Per-user identity within the workspace (chatgpt_user_id / user_id / JWT sub).
  // Distinct users can share the same accountId, so this disambiguates them (#6301).
  userId: string | null;
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
    userId: extractCodexUserId(idToken),
    email: extractJwtEmail(idToken),
    expiresAt: extractExpiresAt(accessToken, idToken),
  };
}

// ──── Create / update connection ──────────────────────────────────────────────

export async function createConnectionFromAuthFile(
  parsed: ParsedCodexAuth,
  options: CreateConnectionOptions
): Promise<{ connection: JsonRecord; created: boolean }> {
  const existing = await findExistingCodexConnection(parsed.accountId, parsed.userId);

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
        chatgptUserId: mergeCodexUserId(parsed.userId, existing),
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
      chatgptUserId: parsed.userId,
      importedAt: new Date().toISOString(),
    },
  });

  // Fix C REVERTED: do NOT refresh-on-import.
  //
  // Reason: production tests showed that auth.json files exported from the
  // Codex CLI are often already partially rotated (the CLI continues to use
  // the tokens after export). Calling the OpenAI refresh endpoint with a
  // stale refresh_token returns "invalid_grant" / "refresh_token_reused" /
  // "refresh_token_invalidated" AND has been observed to invalidate the
  // entire token family upstream — causing every freshly imported account
  // to land in a permanently-broken state, with the only working connection
  // being whichever auth.json the user re-exported most recently.
  //
  // The id_token's `exp` claim is now used as the initial `expiresAt`. In
  // practice OpenAI Codex id_tokens carry a multi-day lifetime, so this
  // does NOT trigger the import-burst proactive-refresh storm that Fix C
  // originally tried to prevent. When the access_token actually expires,
  // the reactive 401 path in chatCore.ts (with the per-connection mutex)
  // handles a single, atomic rotation — that mechanism is intact via the
  // Fix A `runWithOnPersist` plumbing.

  return { connection, created: true };
}

// Dedup key is the workspace/account id AND the per-user id. Two distinct users in the
// same workspace share an accountId but have different userIds, so they must NOT collide
// (#6301). Backward-compat: connections imported before the chatgptUserId field existed
// carry no stored userId — when NONE of the workspace matches has a stored userId we fall
// back to the legacy accountId-only match so genuinely-same accounts still dedup.
// From the connections already matched on workspace/account id, pick the one that
// belongs to the incoming user. A different user in the same workspace is NOT a
// duplicate — but only refuse to dedup when some stored connection actually records a
// (different) userId; if none do, they are legacy records and we dedup with the first.
function pickCodexConnectionForUser(
  workspaceMatches: JsonRecord[],
  userId: string
): JsonRecord | null {
  const exact = workspaceMatches.find(
    (c) => toNonEmptyString(toRecord(c.providerSpecificData).chatgptUserId) === userId
  );
  if (exact) return exact;
  const anyHasStoredUserId = workspaceMatches.some(
    (c) => toNonEmptyString(toRecord(c.providerSpecificData).chatgptUserId) !== null
  );
  return anyHasStoredUserId ? null : workspaceMatches[0];
}

async function findExistingCodexConnection(
  accountId: string,
  userId: string | null
): Promise<JsonRecord | null> {
  const connections = await getProviderConnections({ provider: "codex" });
  const workspaceMatches = (connections as JsonRecord[]).filter(
    (c) => toNonEmptyString(toRecord(c.providerSpecificData).workspaceId) === accountId
  );
  if (workspaceMatches.length === 0) return null;
  // No incoming userId → legacy accountId-only dedup with the first workspace match.
  if (!userId) return workspaceMatches[0];
  return pickCodexConnectionForUser(workspaceMatches, userId);
}
