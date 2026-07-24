/**
 * POST /v1/web/fetch
 *
 * Extract content from a URL using a configured web-fetch provider.
 * Supports Firecrawl, Jina Reader, Tavily Extract, and TinyFish Fetch.
 *
 * Request: { url, provider?, format?, depth?, wait_for_selector?, include_metadata? }
 * Response: { provider, url, content, links, metadata, screenshot_url }
 *
 * Quota-aware fallback (#8297): when no explicit provider is requested, the
 * pool is walked in fixed priority order (fill-first) — a rate-limited or
 * quota-exhausted provider is skipped instead of short-circuiting the whole
 * request. When an explicit provider is requested, no silent fallback is
 * performed — a rate-limited/failing explicit provider surfaces its own error.
 */

import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  handleWebFetch,
  type WebFetchCredentials,
  type WebFetchResult,
} from "@omniroute/open-sse/handlers/webFetch.ts";
import * as log from "@/sse/utils/logger";
import {
  extractApiKey,
  isValidApiKey,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { v1WebFetchSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
  type RateLimitedCredentials,
} from "@/app/api/v1/_shared/rateLimit";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const WEB_FETCH_PROVIDERS = ["firecrawl", "jina-reader", "tavily-search", "tinyfish"] as const;
type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];

// Providers whose free/low tiers surface quota exhaustion as 402/403 instead
// of (or in addition to) 429. jina-reader has no such quota-status signal —
// a 402/403 there is a real auth/bad-request failure, not exhaustion.
const QUOTA_STATUS_PROVIDERS = new Set<WebFetchProviderId>([
  "firecrawl",
  "tavily-search",
  "tinyfish",
]);

type CredentialsLookup = WebFetchCredentials | RateLimitedCredentials | null;

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * Resolve credentials for a web-fetch provider (may be a rate-limited stub,
 * real credentials, or null when unconfigured).
 */
async function resolveCredentials(providerId: WebFetchProviderId): Promise<CredentialsLookup> {
  try {
    const creds = await getProviderCredentialsWithQuotaPreflight(providerId);
    return (creds as CredentialsLookup) ?? null;
  } catch {
    return null;
  }
}

/** A request-time upstream status that means "try the next provider" instead of giving up. */
function isRetryableWebFetchStatus(providerId: WebFetchProviderId, status?: number): boolean {
  if (status === HTTP_STATUS.RATE_LIMITED) return true;
  if (status === HTTP_STATUS.PAYMENT_REQUIRED || status === HTTP_STATUS.FORBIDDEN) {
    return QUOTA_STATUS_PROVIDERS.has(providerId);
  }
  return false;
}

/** Find the next untried, non-rate-limited, credentialed provider in pool order. */
async function findNextFallbackProvider(
  tried: Set<WebFetchProviderId>
): Promise<{ providerId: WebFetchProviderId; credentials: WebFetchCredentials } | null> {
  for (const pid of WEB_FETCH_PROVIDERS) {
    if (tried.has(pid)) continue;
    const creds = await resolveCredentials(pid);
    tried.add(pid);
    if (creds && !isAllRateLimitedCredentials(creds)) {
      return { providerId: pid, credentials: creds };
    }
  }
  return null;
}

interface WebFetchExecutionInput {
  url: string;
  format: "markdown" | "html" | "links" | "screenshot";
  depth: 0 | 1 | 2;
  wait_for_selector?: string;
  include_metadata?: boolean;
}

interface WebFetchExecutionResult {
  result: WebFetchResult;
  provider: WebFetchProviderId;
  poolExhausted: boolean;
}

/**
 * Execute the web-fetch request. When `allowFallback` is true (auto-select),
 * a retryable/quota upstream failure walks the remaining pool in order
 * before giving up. Explicit-provider requests never fall back.
 */
async function executeWithFallback(
  reqBody: WebFetchExecutionInput,
  startProvider: WebFetchProviderId,
  startCredentials: WebFetchCredentials,
  allowFallback: boolean,
  triedProviders: Set<WebFetchProviderId>
): Promise<WebFetchExecutionResult> {
  let provider = startProvider;
  let credentials = startCredentials;
  let result = await handleWebFetch(reqBody, credentials, provider);

  if (!allowFallback) {
    return { result, provider, poolExhausted: false };
  }

  while (!result.success && isRetryableWebFetchStatus(provider, result.status)) {
    const next = await findNextFallbackProvider(triedProviders);
    if (!next) {
      return { result, provider, poolExhausted: true };
    }
    provider = next.providerId;
    credentials = next.credentials;
    result = await handleWebFetch(reqBody, credentials, provider);
  }

  return { result, provider, poolExhausted: false };
}

type ResolvedWebFetchTarget =
  | {
      ok: true;
      provider: WebFetchProviderId;
      credentials: WebFetchCredentials;
      tried: Set<WebFetchProviderId>;
      isExplicit: boolean;
    }
  | { ok: false; response: Response };

/** Resolve credentials for an explicitly requested provider (no fallback allowed). */
async function resolveExplicitTarget(
  providerId: WebFetchProviderId
): Promise<ResolvedWebFetchTarget> {
  const creds = await resolveCredentials(providerId);
  if (isAllRateLimitedCredentials(creds)) {
    return { ok: false, response: rateLimitedProviderResponse(providerId, creds) };
  }
  if (!creds) {
    return {
      ok: false,
      response: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials configured for web-fetch provider: ${providerId}. ` +
          `Add an API key for "${providerId}" in the dashboard.`
      ),
    };
  }
  return {
    ok: true,
    provider: providerId,
    credentials: creds,
    tried: new Set([providerId]),
    isExplicit: true,
  };
}

/**
 * Auto-select: walk the pool in fixed priority order (fill-first), skipping
 * rate-limited stubs instead of letting them short-circuit the loop (#8297).
 */
async function resolveAutoSelectTarget(): Promise<ResolvedWebFetchTarget> {
  let firstRateLimited: {
    providerId: WebFetchProviderId;
    credentials: RateLimitedCredentials;
  } | null = null;

  for (const pid of WEB_FETCH_PROVIDERS) {
    const creds = await resolveCredentials(pid);
    if (isAllRateLimitedCredentials(creds)) {
      firstRateLimited ??= { providerId: pid, credentials: creds };
      continue;
    }
    if (creds) {
      return { ok: true, provider: pid, credentials: creds, tried: new Set([pid]), isExplicit: false };
    }
  }

  if (firstRateLimited) {
    return {
      ok: false,
      response: rateLimitedProviderResponse(
        firstRateLimited.providerId,
        firstRateLimited.credentials
      ),
    };
  }
  return {
    ok: false,
    response: errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials configured for any web-fetch provider. ` +
        `Add an API key for one of: ${WEB_FETCH_PROVIDERS.join(", ")}.`
    ),
  };
}

/** Resolve the provider + credentials to use for this request (explicit or auto-select). */
async function resolveWebFetchTarget(
  requestedProvider: string | undefined
): Promise<ResolvedWebFetchTarget> {
  if (requestedProvider) {
    return resolveExplicitTarget(requestedProvider as WebFetchProviderId);
  }
  return resolveAutoSelectTarget();
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    log.warn("WEB_FETCH", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1WebFetchSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  // Optional auth check — when REQUIRE_API_KEY=false, ignore presented
  // invalid keys so anonymous access works the same as all other client
  // APIs (#7785).
  const apiKeyRaw = extractApiKey(request);
  if (isRequireApiKeyEnabled() && !apiKeyRaw) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (isRequireApiKeyEnabled() && apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  // Enforce API key policies
  const policy = await enforceApiKeyPolicy(request, "web-fetch");
  if (policy.rejection) return policy.rejection;

  // Resolve provider + credentials (explicit provider never falls back; #8297)
  const target = await resolveWebFetchTarget(body.provider);
  if (!target.ok) return target.response;

  log.info("WEB_FETCH", `${target.provider} | ${body.url} | format=${body.format}`);

  const { result, provider: finalProvider, poolExhausted } = await executeWithFallback(
    {
      url: body.url,
      format: body.format,
      depth: body.depth as 0 | 1 | 2,
      wait_for_selector: body.wait_for_selector,
      include_metadata: body.include_metadata,
    },
    target.provider,
    target.credentials,
    !target.isExplicit,
    target.tried
  );

  if (poolExhausted) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      "All configured web-fetch providers are rate limited or quota-exhausted"
    );
  }

  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: { message: result.error ?? "Web fetch failed", type: "web_fetch_error" },
      }),
      {
        status: result.status ?? 502,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  }

  if (finalProvider !== target.provider) {
    log.info("WEB_FETCH", `Fell back from ${target.provider} to ${finalProvider}`);
  }

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
