import {
  getProviderConnections,
  createProviderConnection,
  updateProviderConnection,
} from "@/lib/localDb";
import { GeminiAuthFileError } from "@/lib/oauth/utils/geminiAuthFile";

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

function extractJwtEmail(idToken: string): string | null {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return null;
  return toNonEmptyString(payload.email);
}

// ──── Public types ────────────────────────────────────────────────────────────

export interface ParsedGeminiAuth {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  scope: string;
  tokenType: string;
  expiresAt: string | null;
  email: string | null;
}

export interface EnrichedGeminiAuth extends ParsedGeminiAuth {
  projectId: string | null;
}

export interface CreateConnectionOptions {
  name?: string;
  email?: string;
  overwriteExisting?: boolean;
}

// ──── Parse & validate ────────────────────────────────────────────────────────

export function parseAndValidateGeminiAuth(raw: unknown): ParsedGeminiAuth {
  const doc = toRecord(raw);

  const accessToken = toNonEmptyString(doc.access_token);
  const refreshToken = toNonEmptyString(doc.refresh_token);
  const idToken = toNonEmptyString(doc.id_token);

  if (!accessToken) {
    throw new GeminiAuthFileError(
      "access_token is missing or empty in the oauth_creds.json",
      400,
      "missing_access_token"
    );
  }

  if (!refreshToken) {
    throw new GeminiAuthFileError(
      "refresh_token is missing or empty in the oauth_creds.json",
      400,
      "missing_refresh_token"
    );
  }

  if (!idToken) {
    throw new GeminiAuthFileError(
      "id_token is missing or empty in the oauth_creds.json",
      400,
      "missing_id_token"
    );
  }

  const expiryDateMs = doc.expiry_date;
  let expiresAt: string | null = null;
  if (typeof expiryDateMs === "number" && Number.isFinite(expiryDateMs)) {
    expiresAt = new Date(expiryDateMs).toISOString();
  }

  const scope = toNonEmptyString(doc.scope) ?? "";
  const tokenType = toNonEmptyString(doc.token_type) ?? "Bearer";
  const email = extractJwtEmail(idToken);

  return {
    accessToken,
    refreshToken,
    idToken,
    scope,
    tokenType,
    expiresAt,
    email,
  };
}

// ──── Enrich with Cloud Code Assist project info ──────────────────────────────

export async function enrichWithLoadCodeAssist(
  parsed: ParsedGeminiAuth
): Promise<EnrichedGeminiAuth> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsed.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ metadata: { ideType: "GEMINI_CLI", platform: "linux" } }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ...parsed, projectId: null };
    }

    const data = toRecord(await response.json());
    const projectId = toNonEmptyString(data.projectId) ?? toNonEmptyString(data.cloudaiProjectId);
    return { ...parsed, projectId };
  } catch {
    return { ...parsed, projectId: null };
  } finally {
    clearTimeout(timer);
  }
}

// ──── Find existing connection ────────────────────────────────────────────────

export async function findExistingGeminiConnection(email: string): Promise<JsonRecord | null> {
  const connections = await getProviderConnections({ provider: "gemini-cli" });
  const lowerEmail = email.toLowerCase();
  return (
    (connections.find((c) => {
      const conn = c as JsonRecord;
      if (toNonEmptyString(conn.email)?.toLowerCase() === lowerEmail) return true;
      const psd = toRecord(conn.providerSpecificData);
      return toNonEmptyString(psd.bootstrapEmail)?.toLowerCase() === lowerEmail;
    }) as JsonRecord | undefined) ?? null
  );
}

// ──── Create / update connection ──────────────────────────────────────────────

export async function createConnectionFromAuthFile(
  enriched: EnrichedGeminiAuth,
  options: CreateConnectionOptions
): Promise<{ connection: JsonRecord; created: boolean }> {
  const resolvedEmail = options.email || enriched.email;

  if (resolvedEmail) {
    const existing = await findExistingGeminiConnection(resolvedEmail);

    if (existing) {
      if (!options.overwriteExisting) {
        throw new GeminiAuthFileError(
          "A Gemini CLI connection for this account already exists. Pass overwriteExisting: true to replace it.",
          409,
          "duplicate_account"
        );
      }

      const updated = await updateProviderConnection(existing.id as string, {
        accessToken: enriched.accessToken,
        refreshToken: enriched.refreshToken,
        idToken: enriched.idToken,
        expiresAt: enriched.expiresAt,
        email: resolvedEmail || (existing.email as string | undefined),
        name:
          options.name ||
          (existing.name as string | undefined) ||
          resolvedEmail ||
          "Gemini (imported)",
        testStatus: "active",
        providerSpecificData: {
          ...toRecord(existing.providerSpecificData),
          scope: enriched.scope,
          tokenType: enriched.tokenType,
          projectId: enriched.projectId ?? toRecord(existing.providerSpecificData).projectId,
          importedAt: new Date().toISOString(),
        },
      });

      return { connection: updated || existing, created: false };
    }
  } else if (!options.overwriteExisting) {
    throw new GeminiAuthFileError(
      "Cannot verify identity from the oauth_creds.json — id_token does not contain an email claim. Pass overwriteExisting: true to import without email verification.",
      409,
      "identity_unverified"
    );
  }

  const name = options.name || resolvedEmail || "Gemini (imported)";

  const connection = await createProviderConnection({
    provider: "gemini-cli",
    authType: "oauth",
    name,
    email: resolvedEmail || undefined,
    accessToken: enriched.accessToken,
    refreshToken: enriched.refreshToken,
    idToken: enriched.idToken,
    expiresAt: enriched.expiresAt,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      scope: enriched.scope,
      tokenType: enriched.tokenType,
      projectId: enriched.projectId,
      importedAt: new Date().toISOString(),
    },
  });

  return { connection, created: true };
}
