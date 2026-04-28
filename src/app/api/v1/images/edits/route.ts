import { handleImageEdit } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { getProviderCredentials, clearRecoveredProviderState } from "@/sse/services/auth";
import { parseImageModel, getImageProvider } from "@omniroute/open-sse/config/imageRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";

/**
 * /v1/images/edits — multipart edit endpoint matching OpenAI's images-edit API.
 *
 * Open WebUI's "Image Edit" toggle (images.edit.engine = "openai") posts here
 * with `prompt` + `image` (file). For chatgpt-web, an "edit" only makes sense
 * if the uploaded image was originally generated through OmniRoute — we then
 * have its `{conversationId, parentMessageId}` cached and can continue the
 * saved chatgpt.com conversation node, which is the only way to actually edit
 * the image instead of generating an unrelated one from scratch.
 *
 * Without this route, multipart bodies trip Next.js's Server Action handler
 * (which intercepts ALL POSTs with multipart/form-data content-type) and the
 * client gets a confusing "Failed to find Server Action" 500.
 */

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

const PUBLIC_BASE_URL_HEADER_KEYS = ["host", "x-forwarded-host", "x-forwarded-proto"] as const;

function publicBaseUrlHeaders(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of PUBLIC_BASE_URL_HEADER_KEYS) {
    const value = headers.get(key);
    if (value !== null) out[key] = value;
  }
  return out;
}

async function readMultipartImage(formData: FormData): Promise<{
  prompt: string;
  model: string | null;
  size: string | null;
  responseFormat: string | null;
  imageBytes: Buffer | null;
  imageMime: string | null;
}> {
  const promptRaw = formData.get("prompt");
  const prompt = typeof promptRaw === "string" ? promptRaw.trim() : "";
  const modelRaw = formData.get("model");
  const model = typeof modelRaw === "string" ? modelRaw.trim() : null;
  const sizeRaw = formData.get("size");
  const size = typeof sizeRaw === "string" ? sizeRaw.trim() : null;
  const respRaw = formData.get("response_format");
  const responseFormat = typeof respRaw === "string" ? respRaw.trim() : null;

  // OpenAI's API and Open WebUI both accept either a single `image` field or
  // an `image[]` array. We use the first image when multiple are sent — the
  // chatgpt-web edit tool can only edit one image per conversation node.
  const imageEntry = formData.get("image") ?? formData.get("image[]");
  if (!imageEntry || typeof imageEntry === "string") {
    return { prompt, model, size, responseFormat, imageBytes: null, imageMime: null };
  }
  const file = imageEntry as File;
  const imageBytes = Buffer.from(await file.arrayBuffer());
  const imageMime = file.type || "image/png";
  return { prompt, model, size, responseFormat, imageBytes, imageMime };
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    log.warn(
      "IMAGE",
      `Invalid multipart body: ${err instanceof Error ? err.message : String(err)}`
    );
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid multipart body");
  }

  const { prompt, model, size, responseFormat, imageBytes, imageMime } =
    await readMultipartImage(formData);

  if (!prompt) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: prompt");
  }
  if (!imageBytes || imageBytes.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: image");
  }

  const fullModel = model || "cgpt-web/gpt-5.3-instant";

  const policy = await enforceApiKeyPolicy(request, fullModel);
  if (policy.rejection) return policy.rejection;

  const parsed = parseImageModel(fullModel);
  const providerConfig = getImageProvider(parsed.provider);
  if (!providerConfig) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown image provider: ${parsed.provider}`);
  }
  if (providerConfig.format !== "chatgpt-web") {
    // We only implement edit for chatgpt-web today; everything else routes
    // through generations which doesn't accept image inputs. Surface a
    // useful error rather than silently dropping the image.
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Image edit is only supported for chatgpt-web models (got ${parsed.provider})`
    );
  }

  const allowedConnections =
    policy.apiKeyInfo?.allowedConnections && policy.apiKeyInfo.allowedConnections.length > 0
      ? policy.apiKeyInfo.allowedConnections
      : null;
  const credentials = await getProviderCredentials(
    parsed.provider,
    null,
    allowedConnections,
    fullModel
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.UNAUTHORIZED,
      `No credentials for provider: ${parsed.provider}`
    );
  }
  if (credentials.allRateLimited) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${parsed.provider}] All accounts rate limited`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }

  const result = await handleImageEdit({
    provider: parsed.provider,
    model: parsed.model,
    body: {
      prompt,
      size: size ?? undefined,
      response_format: responseFormat ?? undefined,
      n: 1,
    },
    imageBytes,
    imageMime,
    credentials,
    log,
    signal: request.signal,
    clientHeaders: publicBaseUrlHeaders(request.headers),
  });

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    return new Response(JSON.stringify((result as any).data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload((result as any).error, "Image edit provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: (result as any).status,
    headers: { "Content-Type": "application/json" },
  });
}
