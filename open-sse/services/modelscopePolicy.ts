type ModelScopeRateLimitSnapshot = {
  modelRemaining: number | null;
  modelLimit: number | null;
  totalRemaining: number | null;
  totalLimit: number | null;
};

type ModelScope429Decision =
  | { kind: "quota_exhausted"; retryable: false; snapshot: ModelScopeRateLimitSnapshot }
  | { kind: "rate_limited"; retryable: true; snapshot: ModelScopeRateLimitSnapshot };

const MODELSCOPE_HOST_MARKERS = ["modelscope.cn", "modelscope.aliyuncs.com"];
const MODELSCOPE_QUOTA_EXHAUSTED_SIGNALS = ["free allocated quota exceeded"];
const MODELSCOPE_THROTTLE_SIGNALS = [
  "throttling",
  "throttled",
  "rate limit",
  "too many requests",
  "batch requests",
  "allocated quota exceeded",
  "exceeded your current quota",
];

function parseHeaderInteger(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function getProviderBaseUrl(providerSpecificData?: unknown): string {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return "";
  const data = providerSpecificData as Record<string, unknown>;
  const value = data.baseUrl ?? data.baseURL ?? data.url ?? data.endpoint;
  return typeof value === "string" ? value.toLowerCase() : "";
}

export function isModelScopeProvider(
  provider: string | null | undefined,
  providerSpecificData?: unknown
): boolean {
  if (
    String(provider || "")
      .trim()
      .toLowerCase() === "modelscope"
  )
    return true;
  const baseUrl = getProviderBaseUrl(providerSpecificData);
  return MODELSCOPE_HOST_MARKERS.some((marker) => baseUrl.includes(marker));
}

export function parseModelScopeRateLimitHeaders(
  headers: Record<string, string>
): ModelScopeRateLimitSnapshot {
  return {
    modelRemaining: parseHeaderInteger(
      headers["modelscope-ratelimit-model-requests-remaining"] ?? null
    ),
    modelLimit: parseHeaderInteger(
      headers["modelscope-ratelimit-model-requests-limit"] ?? null
    ),
    totalRemaining: parseHeaderInteger(
      headers["modelscope-ratelimit-requests-remaining"] ?? null
    ),
    totalLimit: parseHeaderInteger(headers["modelscope-ratelimit-requests-limit"] ?? null),
  };
}

export function classifyModelScope429(
  errorText: string,
  headers: Record<string, string>
): ModelScope429Decision {
  const snapshot = parseModelScopeRateLimitHeaders(headers);
  const lower = String(errorText || "").toLowerCase();

  if (MODELSCOPE_QUOTA_EXHAUSTED_SIGNALS.some((signal) => lower.includes(signal))) {
    return { kind: "quota_exhausted", retryable: false, snapshot };
  }

  if (snapshot.modelRemaining !== null || snapshot.totalRemaining !== null) {
    return { kind: "rate_limited", retryable: true, snapshot };
  }

  if (MODELSCOPE_THROTTLE_SIGNALS.some((signal) => lower.includes(signal))) {
    return { kind: "rate_limited", retryable: true, snapshot };
  }

  return { kind: "rate_limited", retryable: true, snapshot };
}

export function getModelScopeRetryDelayMs(headers: Record<string, string>, attempt: number): number {
  const retryAfter = headers["retry-after"] ?? null;
  if (retryAfter) {
    const parsed = Number.parseFloat(retryAfter);
    if (Number.isFinite(parsed) && parsed > 0) return parsed * 1000;
  }
  return 3000 * (attempt + 1);
}
