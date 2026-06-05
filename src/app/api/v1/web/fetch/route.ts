/**
 * POST /v1/web/fetch
 *
 * Extract content from a URL using a configured web-fetch provider.
 * Supports Firecrawl, Jina Reader, and Tavily Extract.
 *
 * Request: { url, provider?, format?, depth?, wait_for_selector?, include_metadata? }
 * Response: { provider, url, content, links, metadata, screenshot_url }
 */

import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { handleWebFetch } from "@omniroute/open-sse/handlers/webFetch.ts";
import * as log from "@/sse/utils/logger";
import { extractApiKey, isValidApiKey, getProviderCredentials } from "@/sse/services/auth";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { v1WebFetchSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const WEB_FETCH_PROVIDERS = ["firecrawl", "jina-reader", "tavily-search"] as const;
type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];

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
  try {
    const creds = await getProviderCredentials(providerId);
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
    // Auto-select: try providers in priority order
    for (const pid of WEB_FETCH_PROVIDERS) {
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
