import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";

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
 * POST /v1/providers/{provider}/images/generations
 */
export async function POST(request, { params }) {
  const { provider: rawProvider } = await params;

  // Verify this is a valid image provider
  const imageProvider = getImageProvider(rawProvider);
  if (!imageProvider) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown image provider: ${rawProvider}`);
  }

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

  if (!body.model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  if (typeof body.prompt !== "string" || body.prompt.trim().length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid prompt");
  }

  // Ensure model has provider prefix
  if (!body.model.includes("/")) {
    body.model = `${rawProvider}/${body.model}`;
  }

  // Validate provider match
  const modelProvider = body.model.split("/")[0];
  if (modelProvider !== rawProvider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Model "${body.model}" does not belong to image provider "${rawProvider}"`
    );
  }

  const credentials = await getProviderCredentials(rawProvider);
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for image provider: ${rawProvider}`
    );
  }

  const result = await handleImageGeneration({ body, credentials, log });

  if (result.success) {
    return new Response(JSON.stringify(result.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload(result.error, "Image generation provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
