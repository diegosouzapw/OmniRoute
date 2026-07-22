/**
 * POST /v1/web/fetch
 *
 * Extract content from a URL using a local or configured web-fetch provider.
 * Supports Local Rust Web Fetch, Firecrawl, Jina Reader, Tavily Extract, and TinyFish Fetch.
 *
 * Request: { url, provider?, format?, depth?, wait_for_selector?, include_metadata? }
 * Response: { provider, url, content, links, metadata, screenshot_url }
 */

import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { handleWebFetch } from "@omniroute/open-sse/handlers/webFetch.ts";
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

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const WEB_FETCH_PROVIDERS = [
  "rs-trafilatura",
  "firecrawl",
  "jina-reader",
  "tavily-search",
  "tinyfish",
] as const;
type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];

function canUseRsTrafilatura(body: {
  format?: string;
  depth?: number;
  wait_for_selector?: string;
}) {
  if (body.wait_for_selector) return false;
  if (body.depth !== undefined && body.depth > 0) return false;
  return ["markdown", "html", "links"].includes(body.format ?? "markdown");
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * Resolve credentials for a web-fetch provider. Tries each known provider in
 * priority order when no explicit provider is requested.
 */
async function resolveCredentials(
  providerId: WebFetchProviderId
): Promise<{ apiKey?: string } | null> {
  if (providerId === "rs-trafilatura") return {};
  try {
    const creds = await getProviderCredentialsWithQuotaPreflight(providerId);
    return creds ?? null;
  } catch {
    return null;
  }
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

  // Optional auth check
  const apiKeyRaw = extractApiKey(request);
  if (isRequireApiKeyEnabled() && !apiKeyRaw) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  // Enforce API key policies
  const policy = await enforceApiKeyPolicy(request, "web-fetch");
  if (policy.rejection) return policy.rejection;

  // Resolve provider + credentials
  let resolvedProvider: WebFetchProviderId | undefined;
  let credentials: { apiKey?: string } = {};

  if (body.provider) {
    resolvedProvider = body.provider as WebFetchProviderId;
    if (resolvedProvider === "rs-trafilatura" && !canUseRsTrafilatura(body)) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        "Local Rust Web Fetch supports markdown, html, and links without crawl depth or selectors"
      );
    }
    const creds = await resolveCredentials(resolvedProvider);
    if (!creds) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials configured for web-fetch provider: ${resolvedProvider}. ` +
          `Add an API key for "${resolvedProvider}" in the dashboard.`
      );
    }
    credentials = creds;
  } else {
    // Auto-select: use local extraction when possible, otherwise try configured providers.
    const candidates = canUseRsTrafilatura(body)
      ? WEB_FETCH_PROVIDERS
      : WEB_FETCH_PROVIDERS.filter((pid) => pid !== "rs-trafilatura");
    for (const pid of candidates) {
      const creds = await resolveCredentials(pid);
      if (creds) {
        resolvedProvider = pid;
        credentials = creds;
        break;
      }
    }
    if (!resolvedProvider) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials configured for any web-fetch provider. ` +
          `Add an API key for one of: ${WEB_FETCH_PROVIDERS.join(", ")}.`
      );
    }
  }

  log.info("WEB_FETCH", `${resolvedProvider} | ${body.url} | format=${body.format}`);

  const result = await handleWebFetch(
    {
      url: body.url,
      format: body.format,
      depth: body.depth as 0 | 1 | 2,
      wait_for_selector: body.wait_for_selector,
      include_metadata: body.include_metadata,
    },
    credentials,
    resolvedProvider
  );

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

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
