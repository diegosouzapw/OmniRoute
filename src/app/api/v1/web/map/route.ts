import { z } from "zod";
import { handleFirecrawlMap } from "@omniroute/open-sse/handlers/firecrawlMap.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import {
  extractApiKey,
  getProviderCredentialsWithQuotaPreflight,
  isValidApiKey,
} from "@/sse/services/auth";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import {
  validateBody,
  isValidationFailure,
  formatValidationMessage,
} from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { parseAndValidatePublicUrl } from "@/shared/network/outboundUrlGuard";

const mapSchema = z.object({
  url: z
    .string()
    .url()
    .refine((value) => {
      try {
        parseAndValidatePublicUrl(value);
        return true;
      } catch {
        return false;
      }
    }, "url must be a public http(s) URL"),
  limit: z.number().int().min(1).max(100_000).default(5000),
  search: z.string().max(500).optional(),
  sitemap: z.enum(["skip", "include", "only"]).optional(),
  includeSubdomains: z.boolean().optional(),
  ignoreQueryParameters: z.boolean().optional(),
  ignoreCache: z.boolean().optional(),
});

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(400, "Invalid JSON body");
  }

  const validation = validateBody(mapSchema, rawBody);
  if (isValidationFailure(validation))
    return errorResponse(400, formatValidationMessage(validation.error));

  const apiKey = extractApiKey(request);
  if (isRequireApiKeyEnabled() && !apiKey) return errorResponse(401, "Authentication required");
  if (isRequireApiKeyEnabled() && apiKey && !(await isValidApiKey(apiKey))) {
    return errorResponse(401, "Invalid API key");
  }

  const policy = await enforceApiKeyPolicy(request, "web-fetch");
  if (policy.rejection) return policy.rejection;

  const excludedConnectionIds: string[] = [];
  for (let attempt = 0; attempt < 20; attempt++) {
    const credentials = await getProviderCredentialsWithQuotaPreflight(
      "firecrawl",
      null,
      null,
      null,
      { excludeConnectionIds: excludedConnectionIds }
    );
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse("firecrawl", credentials);
    }
    if (!credentials) {
      return errorResponse(
        excludedConnectionIds.length ? 429 : 400,
        excludedConnectionIds.length
          ? "All configured Firecrawl connections have exhausted credits or are rate limited"
          : "No Firecrawl provider connection configured"
      );
    }

    const selected = credentials as Record<string, unknown>;
    const result = await handleFirecrawlMap(validation.data, {
      apiKey: typeof selected.apiKey === "string" ? selected.apiKey : undefined,
      baseUrl: typeof selected.baseUrl === "string" ? selected.baseUrl : undefined,
      providerSpecificData:
        selected.providerSpecificData && typeof selected.providerSpecificData === "object"
          ? (selected.providerSpecificData as Record<string, unknown>)
          : undefined,
    });
    if ((result.status === 402 || result.status === 429) && typeof selected.id === "string") {
      excludedConnectionIds.push(selected.id);
      continue;
    }
    if (result.status < 200 || result.status >= 300) {
      const upstream = result.data as { error?: unknown };
      const message = typeof upstream?.error === "string" ? upstream.error : "Firecrawl Map failed";
      return errorResponse(result.status, message);
    }
    const payload = result.data as { success?: unknown; links?: unknown } | null;
    if (payload?.success !== true || !Array.isArray(payload.links)) {
      return errorResponse(502, "Firecrawl Map returned an invalid response");
    }
    return Response.json(payload, { headers: CORS_HEADERS });
  }
  return errorResponse(
    429,
    "All configured Firecrawl connections have exhausted credits or are rate limited"
  );
}
