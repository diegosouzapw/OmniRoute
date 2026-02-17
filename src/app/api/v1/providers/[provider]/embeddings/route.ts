import { errorResponse } from "@omniroute/open-sse/utils/error.js";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.js";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.js";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { handleEmbedding } from "@omniroute/open-sse/handlers/embeddings.js";
import * as log from "@/sse/utils/logger";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/providers/{provider}/embeddings
 */
export async function POST(request, { params }) {
  const { provider: rawProvider } = await params;

  const providerEntry = getRegistryEntry(rawProvider);

  if (!providerEntry) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown provider: ${rawProvider}`);
  }

  const providerAlias = providerEntry.alias || providerEntry.id;

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // Optional API key validation
  if (process.env.REQUIRE_API_KEY === "true") {
    const apiKey = extractApiKey(request);
    if (!apiKey || !(await isValidApiKey(apiKey))) {
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  }

  // Add provider prefix if missing
  if (body.model && !body.model.includes("/")) {
    body.model = `${providerAlias}/${body.model}`;
  }

  // Validate provider match
  if (body.model) {
    const prefix = body.model.split("/")[0];
    if (prefix !== providerAlias && prefix !== rawProvider && prefix !== providerEntry.id) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Model "${body.model}" does not belong to provider "${rawProvider}"`
      );
    }
  }

  const credentials = await getProviderCredentials(providerEntry.id);
  if (!credentials) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${rawProvider}`);
  }

  const result = await handleEmbedding({ body, credentials, log });

  if (result.success) {
    return new Response(JSON.stringify(result.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: result.error }), {
    status: result.status || 500,
    headers: { "Content-Type": "application/json" },
  });
}
