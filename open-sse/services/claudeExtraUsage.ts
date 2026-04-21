import { updateProviderConnection } from "@/lib/db/providers";

type JsonRecord = Record<string, unknown>;

const CLAUDE_OAUTH_USAGE_URL = "https://api.anthropic.com/api/oauth/usage";
const CLAUDE_API_VERSION = "2023-06-01";
const CLAUDE_OAUTH_BETA = "oauth-2025-04-20";
const CLAUDE_EXTRA_USAGE_FALLBACK_BLOCK_MS = 5 * 60 * 60 * 1000;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  return null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function toIsoStringOrNull(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toISOString();
}

function getNestedRecord(value: unknown, path: string[]): JsonRecord | null {
  let current: unknown = value;
  for (const key of path) {
    current = asRecord(current)[key];
  }
  const record = asRecord(current);
  return Object.keys(record).length > 0 ? record : null;
}

function getExtraUsageCandidate(payload: unknown): JsonRecord | null {
  const candidates = [
    getNestedRecord(payload, ["extra_usage"]),
    getNestedRecord(payload, ["extraUsage"]),
    getNestedRecord(payload, ["usage", "extra_usage"]),
    getNestedRecord(payload, ["usage", "extraUsage"]),
    getNestedRecord(payload, ["response", "extra_usage"]),
    getNestedRecord(payload, ["response", "usage", "extra_usage"]),
  ];

  return candidates.find(Boolean) || null;
}

export function extractClaudeExtraUsage(payload: unknown): JsonRecord | null {
  return getExtraUsageCandidate(payload);
}

async function fetchClaudeExtraUsageResetAt(accessToken: string): Promise<string | null> {
  const response = await fetch(CLAUDE_OAUTH_USAGE_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "anthropic-beta": CLAUDE_OAUTH_BETA,
      "anthropic-version": CLAUDE_API_VERSION,
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Claude OAuth usage returned ${response.status}`);
  }

  const payload = asRecord(await response.json().catch(() => null));
  return toIsoStringOrNull(asRecord(payload.five_hour).resets_at);
}

export async function syncClaudeExtraUsageBlockState({
  provider,
  connectionId,
  accessToken,
  providerSpecificData,
  blockExtraUsage,
  extraUsage,
  log,
}: {
  provider: string;
  connectionId?: string | null;
  accessToken?: string | null;
  providerSpecificData?: unknown;
  blockExtraUsage?: boolean;
  extraUsage?: unknown;
  log?: {
    warn?: (scope: string, message: string) => void;
    debug?: (scope: string, message: string) => void;
  } | null;
}): Promise<boolean> {
  if (provider !== "claude" || !connectionId || blockExtraUsage !== true) {
    return false;
  }

  const extraUsageRecord = extractClaudeExtraUsage(extraUsage);
  if (!extraUsageRecord || toBoolean(extraUsageRecord.queued) !== true) {
    return false;
  }

  const now = new Date();
  const billingAmount =
    toNumberOrNull(extraUsageRecord.billing_amount) ?? toNumberOrNull(extraUsageRecord.amount);

  let blockedUntil: string | null = null;
  let blockedUntilSource: "oauth_usage" | "fallback" = "fallback";

  if (typeof accessToken === "string" && accessToken.trim().length > 0) {
    try {
      blockedUntil = await fetchClaudeExtraUsageResetAt(accessToken);
      if (blockedUntil) {
        blockedUntilSource = "oauth_usage";
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log?.warn?.(
        "CLAUDE_EXTRA_USAGE",
        `Failed to fetch Claude OAuth usage reset for ${connectionId.slice(0, 8)}: ${message}`
      );
    }
  }

  if (!blockedUntil) {
    blockedUntil = new Date(now.getTime() + CLAUDE_EXTRA_USAGE_FALLBACK_BLOCK_MS).toISOString();
  }

  const nextProviderSpecificData = {
    ...asRecord(providerSpecificData),
    claudeExtraUsageState: {
      queued: true,
      billingAmount,
      blockedAt: now.toISOString(),
      blockedUntil,
      blockedUntilSource,
      raw: extraUsageRecord,
    },
  };

  await updateProviderConnection(connectionId, {
    providerSpecificData: nextProviderSpecificData,
    rateLimitedUntil: blockedUntil,
    testStatus: "quota_exhausted",
    lastError: "Claude extra usage blocked by OmniRoute",
    lastErrorAt: now.toISOString(),
    lastErrorType: "quota_exhausted",
    lastErrorSource: "claude_extra_usage",
    errorCode: "extra_usage",
  });

  log?.warn?.(
    "CLAUDE_EXTRA_USAGE",
    `Blocked Claude account ${connectionId.slice(0, 8)} until ${blockedUntil} to avoid extra usage charges`
  );

  return true;
}
