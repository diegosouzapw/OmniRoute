import {
  getProviderConnections,
  createProviderConnection,
  updateProviderConnection,
} from "@/lib/localDb";
import { ClaudeAuthFileError } from "@/lib/oauth/utils/claudeAuthFile";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

// ──── Public types ────────────────────────────────────────────────────────────

export interface ParsedClaudeAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: string | null; // ISO (converted from ms)
  scopes: string[];
  subscriptionType: string | null;
  rateLimitTier: string | null;
  email: string | null; // from bootstrap enrichment
}

export interface EnrichedClaudeAuth extends ParsedClaudeAuth {
  accountUUID: string | null;
  organizationUUID: string | null;
  organizationName: string | null;
  organizationType: string | null;
  rateLimitTier: string | null;
}

export interface CreateConnectionOptions {
  name?: string;
  email?: string;
  overwriteExisting?: boolean;
}

// ──── Parse & validate ────────────────────────────────────────────────────────

export function parseAndValidateClaudeAuth(raw: unknown): ParsedClaudeAuth {
  const doc = toRecord(raw);
  const oauthBlock = toRecord(doc.claudeAiOauth);

  const accessToken = toNonEmptyString(oauthBlock.accessToken);
  const refreshToken = toNonEmptyString(oauthBlock.refreshToken);

  if (!accessToken) {
    throw new ClaudeAuthFileError(
      "accessToken is missing or empty in claudeAiOauth",
      400,
      "missing_access_token"
    );
  }

  if (!refreshToken) {
    throw new ClaudeAuthFileError(
      "refreshToken is missing or empty in claudeAiOauth",
      400,
      "missing_refresh_token"
    );
  }

  // expiresAt in the file is ms epoch; store as ISO in DB
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

// ──── Bootstrap enrichment ────────────────────────────────────────────────────

export async function enrichWithBootstrap(
  parsed: ParsedClaudeAuth,
  // proxyConfig reserved for future authenticated-proxy support
  proxyConfig?: null
): Promise<EnrichedClaudeAuth> {
  const base: EnrichedClaudeAuth = {
    ...parsed,
    accountUUID: null,
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
    rateLimitTier: parsed.rateLimitTier,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch("https://api.anthropic.com/api/claude_cli/bootstrap", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsed.accessToken}`,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      return base;
    }

    const body = toRecord(await res.json());

    const accountUUID = toNonEmptyString(body.account_uuid);
    const organizationUUID = toNonEmptyString(body.organization_uuid);
    const organizationName = toNonEmptyString(body.organization_name);
    const organizationType = toNonEmptyString(body.organization_type);
    const rateLimitTier = toNonEmptyString(body.rate_limit_tier) || parsed.rateLimitTier;
    const bootstrapEmail = toNonEmptyString(body.account_email);

    return {
      ...base,
      accountUUID,
      organizationUUID,
      organizationName,
      organizationType,
      rateLimitTier,
      email: parsed.email || bootstrapEmail,
    };
  } catch {
    // Network error, timeout, or parse failure — best-effort; callers handle null fields
    return base;
  } finally {
    clearTimeout(timer);
  }
}

// ──── Lookup ──────────────────────────────────────────────────────────────────

export async function findExistingClaudeConnection(
  accountUUID: string
): Promise<JsonRecord | null> {
  const connections = await getProviderConnections({ provider: "claude" });
  const lower = accountUUID.toLowerCase();
  return (
    (connections.find((c) => {
      const psd = toRecord((c as JsonRecord).providerSpecificData);
      const stored = toNonEmptyString(psd.accountUUID);
      return stored !== null && stored.toLowerCase() === lower;
    }) as JsonRecord | undefined) ?? null
  );
}

// ──── Create / update connection ──────────────────────────────────────────────

export async function createConnectionFromAuthFile(
  enriched: EnrichedClaudeAuth,
  options: CreateConnectionOptions
): Promise<{ connection: JsonRecord; created: boolean }> {
  // Duplicate detection by accountUUID (skipped when bootstrap failed)
  if (enriched.accountUUID) {
    const existing = await findExistingClaudeConnection(enriched.accountUUID);

    if (existing) {
      if (!options.overwriteExisting) {
        throw new ClaudeAuthFileError(
          "A Claude connection for this account already exists. Pass overwriteExisting: true to replace it.",
          409,
          "duplicate_account"
        );
      }

      const updated = await updateProviderConnection(existing.id as string, {
        accessToken: enriched.accessToken,
        refreshToken: enriched.refreshToken,
        expiresAt: enriched.expiresAt,
        email:
          options.email || enriched.email || (existing.email as string | undefined) || undefined,
        name:
          options.name ||
          (existing.name as string | undefined) ||
          options.email ||
          enriched.email ||
          "Claude (imported)",
        testStatus: "active",
        providerSpecificData: {
          ...toRecord(existing.providerSpecificData),
          accountUUID: enriched.accountUUID,
          organizationUUID: enriched.organizationUUID,
          organizationName: enriched.organizationName,
          organizationType: enriched.organizationType,
          rateLimitTier: enriched.rateLimitTier,
          scopes: enriched.scopes,
          subscriptionType: enriched.subscriptionType,
          bootstrapEmail: enriched.email,
          importedAt: new Date().toISOString(),
        },
      });

      return { connection: updated || existing, created: false };
    }
  }

  // Identity check: when bootstrap failed and we have no email, refuse unless
  // the caller has explicitly opted into overwrite mode (they know what they're doing).
  if (!enriched.email && !enriched.accountUUID && !options.overwriteExisting) {
    throw new ClaudeAuthFileError(
      "Could not verify the account identity (bootstrap failed and no email/accountUUID available). Pass overwriteExisting: true to import anyway.",
      409,
      "identity_unverified"
    );
  }

  const email = options.email || enriched.email || undefined;
  const name = options.name || options.email || enriched.email || "Claude (imported)";

  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name,
    email,
    accessToken: enriched.accessToken,
    refreshToken: enriched.refreshToken,
    expiresAt: enriched.expiresAt,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      accountUUID: enriched.accountUUID,
      organizationUUID: enriched.organizationUUID,
      organizationName: enriched.organizationName,
      organizationType: enriched.organizationType,
      rateLimitTier: enriched.rateLimitTier,
      scopes: enriched.scopes,
      subscriptionType: enriched.subscriptionType,
      bootstrapEmail: enriched.email,
      importedAt: new Date().toISOString(),
    },
  });

  return { connection, created: true };
}
