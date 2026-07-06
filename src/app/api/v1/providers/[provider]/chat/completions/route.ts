import { buildClientRawRequest, handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { z } from "zod";

const providerChatRouteSchema = z
  .object({
    model: z.string().optional(),
  })
  .passthrough();

let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/providers/{provider}/chat/completions
 * Routes to the specified provider, validating model/provider match.
 * Full body format validation is delegated to handleChat.
 */
export async function POST(request, { params }) {
  const { provider: rawProvider } = await params;

  const providerEntry = getRegistryEntry(rawProvider);

  if (!providerEntry) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown provider: ${rawProvider}`);
  }

  // Resolve provider alias/id for model prefix checks
  const providerAlias = providerEntry.alias || providerEntry.id;

  await ensureInitialized();

  // Parse body once so this provider-scoped route can normalize the model prefix
  // before delegating full chat-format validation to handleChat.
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const bodyValidation = providerChatBodySchema.safeParse(rawBody);
  if (!bodyValidation.success) {
    const hasModelTypeError = bodyValidation.error.issues.some(
      (issue) => issue.path.join(".") === "model" && issue.code === "invalid_type"
    );
    if (hasModelTypeError) {
      return errorResponse(HTTP_STATUS.BAD_REQUEST, "model must be a string");
    }
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Request body must be a JSON object");
  }

  const validation = providerChatRouteSchema.safeParse(rawBody);
  if (!validation.success) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "model must be a string");
  }

  const body = rawBody as { model?: string; [key: string]: unknown };

  // Keep the route-level checks minimal: only guard fields needed for provider prefix handling.
  if (body.model !== undefined && typeof body.model !== "string") {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "model must be a string");
  }

  // Validate model belongs to this provider
  if (body.model) {
    const modelParts = body.model.split("/");
    const hasProviderPrefix = modelParts.length >= 2;
    const modelProvider = hasProviderPrefix ? modelParts[0] : null;

    if (
      hasProviderPrefix &&
      modelProvider !== providerAlias &&
      modelProvider !== rawProvider &&
      modelProvider !== providerEntry.id
    ) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Model "${body.model}" does not belong to provider "${rawProvider}". Expected prefix: ${providerAlias}/`
      );
    }

    // Add provider prefix if missing
    if (!hasProviderPrefix) {
      body.model = `${providerAlias}/${body.model}`;
    }
  }

  // Create a new request with the modified body
  const newRequest = new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body: JSON.stringify(body),
  });

  return await handleChat(newRequest, buildClientRawRequest(request, rawBody));
}
