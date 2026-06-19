import { getProviderAlias } from "@/shared/constants/providers";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { APP_CONFIG } from "@/shared/constants/appConfig";

type UsageLike = Record<string, unknown> | null | undefined;

function toFiniteNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toNonNegativeInteger(value: unknown): number {
  return Math.max(0, Math.round(toFiniteNumber(value)));
}

export function getOmniRouteTokenCounts(usage: UsageLike): { input: number; output: number } {
  if (!usage || typeof usage !== "object") {
    return { input: 0, output: 0 };
  }

  return {
    input: toNonNegativeInteger(
      usage.input ??
        usage.prompt_tokens ??
        usage.input_tokens ??
        usage.promptTokens ??
        usage.inputTokens
    ),
    output: toNonNegativeInteger(
      usage.output ??
        usage.completion_tokens ??
        usage.output_tokens ??
        usage.completionTokens ??
        usage.outputTokens
    ),
  };
}

export function formatOmniRouteCost(costUsd: unknown): string {
  const normalized = toFiniteNumber(costUsd);
  return normalized > 0 ? normalized.toFixed(10) : "0.0000000000";
}

export function buildOmniRouteResponseMetaHeaders({
  cacheHit = false,
  costUsd = 0,
  fallbackAttempts = 0,
  latencyMs = 0,
  model = null,
  provider = null,
  requestId = null,
  usage = null,
}: {
  cacheHit?: boolean;
  costUsd?: unknown;
  fallbackAttempts?: number;
  latencyMs?: unknown;
  model?: string | null;
  provider?: string | null;
  requestId?: string | null;
  usage?: UsageLike;
}): Record<string, string> {
  const tokens = getOmniRouteTokenCounts(usage);
  const headers: Record<string, string> = {
    [OMNIROUTE_RESPONSE_HEADERS.cacheHit]: String(cacheHit),
    [OMNIROUTE_RESPONSE_HEADERS.latencyMs]: String(toNonNegativeInteger(latencyMs)),
    [OMNIROUTE_RESPONSE_HEADERS.responseCost]: formatOmniRouteCost(costUsd),
    [OMNIROUTE_RESPONSE_HEADERS.tokensIn]: String(tokens.input),
    [OMNIROUTE_RESPONSE_HEADERS.tokensOut]: String(tokens.output),
    [OMNIROUTE_RESPONSE_HEADERS.version]: APP_CONFIG.version,
  };

  if (typeof model === "string" && model.trim().length > 0) {
    headers[OMNIROUTE_RESPONSE_HEADERS.model] = model;
  }

  if (typeof requestId === "string" && requestId.trim().length > 0) {
    headers[OMNIROUTE_RESPONSE_HEADERS.requestId] = requestId;
  }

  if (typeof provider === "string" && provider.trim().length > 0) {
    headers[OMNIROUTE_RESPONSE_HEADERS.provider] = getProviderAlias(provider);
  }

  const attempts = toNonNegativeInteger(fallbackAttempts);
  if (attempts > 0) {
    headers[OMNIROUTE_RESPONSE_HEADERS.fallbackAttempts] = String(attempts);
  }

  return headers;
}

export function buildOmniRouteSseMetadataComment(
  options: Parameters<typeof buildOmniRouteResponseMetaHeaders>[0]
): string {
  const headers = buildOmniRouteResponseMetaHeaders(options);
  const lines = Object.entries(headers)
    .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
    .map(([name, value]) => `: ${name.toLowerCase()}=${value}`);

  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}

/**
 * Single choke-point for attaching the X-OmniRoute-* response meta headers.
 * Mutates `headers` in place (accepts a Headers instance OR a plain Record).
 * Use at EVERY non-streaming success return so no route forgets the telemetry.
 */
export function attachOmniRouteMetaHeaders(
  headers: Headers | Record<string, string>,
  meta: Parameters<typeof buildOmniRouteResponseMetaHeaders>[0]
): void {
  const built = buildOmniRouteResponseMetaHeaders(meta);
  if (headers instanceof Headers) {
    for (const [name, value] of Object.entries(built)) headers.set(name, value);
  } else {
    Object.assign(headers, built);
  }
}
