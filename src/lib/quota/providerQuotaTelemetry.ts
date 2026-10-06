/** Provider-neutral quota telemetry contracts and header normalization. */

export type QuotaDimensionName =
  | "requests"
  | "tokens"
  | "input_tokens"
  | "output_tokens"
  | "credits"
  | "currency"
  | "daily_requests"
  | "weekly_requests"
  | "monthly_requests"
  | "rate_limit"
  | "unknown";

export type QuotaValueSource =
  "provider_api" | "response_headers" | "configured" | "estimated" | "unknown";

export type QuotaConfidence = "authoritative" | "high" | "medium" | "low" | "unknown";

export interface QuotaValue {
  dimension: QuotaDimensionName;
  limit?: number;
  used?: number;
  remaining?: number;
  resetAt?: string;
  unit?: string;
  source: QuotaValueSource;
  confidence: QuotaConfidence;
}

export type ProviderQuotaStatus =
  "healthy" | "approaching_limit" | "exhausted" | "unavailable" | "unknown";

export interface ProviderQuotaState {
  providerId: string;
  connectionId: string;
  supported: boolean;
  fetchedAt: string;
  values: QuotaValue[];
  status: ProviderQuotaStatus;
  error?: string;
}

export interface ProviderConnectionForQuota {
  id: string;
  provider: string;
  [key: string]: unknown;
}

export type QuotaSourceKind =
  "provider_api" | "response_headers" | "configured" | "estimated" | "unknown";

export interface QuotaSourceAdapter {
  kind: QuotaSourceKind;
  supports(providerId: string): boolean;
  read(connection: ProviderConnectionForQuota): Promise<QuotaValue[]>;
}

const SOURCE_PRIORITY: QuotaSourceKind[] = [
  "provider_api",
  "response_headers",
  "configured",
  "estimated",
  "unknown",
];

function sourceRank(source: QuotaSourceKind): number {
  return SOURCE_PRIORITY.indexOf(source);
}

function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function statusForValues(values: QuotaValue[], approachingThreshold: number): ProviderQuotaStatus {
  if (values.length === 0) return "unknown";

  const exhausted = values.some(
    (value) =>
      (finite(value.remaining) && value.remaining <= 0) ||
      (finite(value.used) && finite(value.limit) && value.used >= value.limit)
  );
  if (exhausted) return "exhausted";

  const approaching = values.some((value) => {
    if (!finite(value.remaining) || !finite(value.limit) || value.limit <= 0) return false;
    return value.remaining / value.limit <= approachingThreshold;
  });
  return approaching ? "approaching_limit" : "healthy";
}

export function unknownQuotaState(
  providerId: string,
  connectionId: string,
  fetchedAt = new Date().toISOString(),
  error?: string
): ProviderQuotaState {
  return {
    providerId,
    connectionId,
    supported: false,
    fetchedAt,
    values: [],
    status: "unknown",
    ...(error ? { error } : {}),
  };
}

/**
 * Reads the best available source without treating missing provider data as exhaustion.
 * Sources are selected per dimension, so a provider API can coexist with header data.
 */
export async function collectQuotaState(
  connection: ProviderConnectionForQuota,
  adapters: QuotaSourceAdapter[],
  options: { approachingThreshold?: number; fetchedAt?: string } = {}
): Promise<ProviderQuotaState> {
  const fetchedAt = options.fetchedAt ?? new Date().toISOString();
  const byDimension = new Map<QuotaDimensionName, QuotaValue>();
  let supported = false;
  let lastError: string | undefined;

  for (const adapter of adapters) {
    if (!adapter.supports(connection.provider)) continue;
    supported = true;
    try {
      const values = await adapter.read(connection);
      for (const value of values) {
        const current = byDimension.get(value.dimension);
        if (!current || sourceRank(value.source) < sourceRank(current.source)) {
          byDimension.set(value.dimension, value);
        }
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  const values = [...byDimension.values()];
  return {
    providerId: connection.provider,
    connectionId: connection.id,
    supported,
    fetchedAt,
    values,
    status:
      values.length > 0
        ? statusForValues(values, options.approachingThreshold ?? 0.2)
        : supported
          ? "unavailable"
          : "unknown",
    ...(lastError ? { error: lastError } : {}),
  };
}

export interface RateLimitHeaderMapping {
  limit?: string;
  remaining?: string;
  reset?: string;
  retryAfter?: string;
  dimension?: QuotaDimensionName;
  unit?: string;
}

export interface RateLimitSnapshot {
  providerId: string;
  connectionId: string;
  capturedAt: string;
  requestLimit?: number;
  requestsRemaining?: number;
  resetAt?: string;
  retryAfterSeconds?: number;
  source: "response_headers";
}

function headerValue(headers: Headers | Record<string, string | undefined>, name?: string) {
  if (!name) return undefined;
  if (headers instanceof Headers)
    return headers.get(name) ?? headers.get(name.toLowerCase()) ?? undefined;
  const lower = name.toLowerCase();
  const key = Object.keys(headers).find((candidate) => candidate.toLowerCase() === lower);
  return key ? headers[key] : undefined;
}

function numberHeader(value: string | undefined): number | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function resetHeaderToIso(value: string | undefined): string | undefined {
  const parsed = numberHeader(value);
  if (parsed === undefined)
    return value && !Number.isNaN(Date.parse(value)) ? new Date(value).toISOString() : undefined;
  const milliseconds = parsed > 10_000_000_000 ? parsed : parsed * 1000;
  return new Date(milliseconds).toISOString();
}

export function parseRateLimitHeaders(
  headers: Headers | Record<string, string | undefined>,
  providerId: string,
  connectionId: string,
  mapping: RateLimitHeaderMapping,
  capturedAt = new Date().toISOString()
): { value: QuotaValue; snapshot: RateLimitSnapshot } | null {
  const limit = numberHeader(headerValue(headers, mapping.limit));
  const remaining = numberHeader(headerValue(headers, mapping.remaining));
  const resetAt = resetHeaderToIso(headerValue(headers, mapping.reset));
  const retryAfterSeconds = numberHeader(headerValue(headers, mapping.retryAfter));
  if (
    limit === undefined &&
    remaining === undefined &&
    !resetAt &&
    retryAfterSeconds === undefined
  ) {
    return null;
  }

  const dimension = mapping.dimension ?? "rate_limit";
  return {
    value: {
      dimension,
      ...(limit !== undefined ? { limit } : {}),
      ...(remaining !== undefined ? { remaining } : {}),
      ...(resetAt ? { resetAt } : {}),
      ...(mapping.unit ? { unit: mapping.unit } : {}),
      source: "response_headers",
      confidence: "high",
    },
    snapshot: {
      providerId,
      connectionId,
      capturedAt,
      ...(limit !== undefined ? { requestLimit: limit } : {}),
      ...(remaining !== undefined ? { requestsRemaining: remaining } : {}),
      ...(resetAt ? { resetAt } : {}),
      ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}),
      source: "response_headers",
    },
  };
}
