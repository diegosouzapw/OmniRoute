import { handleImageUpscale } from "@omniroute/open-sse/handlers/imageUpscale.ts";
import {
  getUpscaleProvider,
  getAllUpscaleModels,
  parseUpscaleModel,
} from "@omniroute/open-sse/config/upscaleRegistry.ts";
import { extractUpscaleSourceImage } from "@omniroute/open-sse/handlers/imageUpscale/shared.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1ImageUpscaleSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { generateRequestId } from "@/shared/utils/requestId";

export const dynamic = "force-dynamic";

/**
 * `/v1/images/upscale` — image→image super-resolution.
 *
 * A dedicated endpoint rather than a `/v1/images/generations` model: upscaling has no
 * text-to-image path, always needs a source image, and its meaningful controls (scale
 * factor, creativity level) do not exist on the generation contract.
 *
 * Providers are declared in `open-sse/config/upscaleRegistry.ts`:
 *   - `adobe-firefly/topaz-standard` · `adobe-firefly/topaz-bloom` (Topaz via Firefly 3P)
 *   - `stability-ai/fast` · `stability-ai/conservative` · `stability-ai/creative`
 *   - `topaz/topaz-enhance` (Topaz Labs native API)
 *
 * Accepts JSON (data-URL / http(s) image) or multipart/form-data (`image` file part),
 * since OpenAI-style clients send the latter for image inputs.
 */

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/** GET /v1/images/upscale — list the upscale models this instance can serve. */
export async function GET() {
  const data = getAllUpscaleModels().map((model) => {
    const providerConfig = getUpscaleProvider(model.provider);
    const entry = providerConfig?.models.find((candidate) => model.id.endsWith(`/${candidate.id}`));
    return {
      id: model.id,
      object: "model",
      owned_by: model.provider,
      name: model.name,
      type: "image",
      subtype: "upscale",
      input_modalities: ["image"],
      output_modalities: ["image"],
      factors: entry?.factors ?? [],
      supports_creativity: Boolean(entry?.supportsCreativity),
      supports_prompt: Boolean(entry?.supportsPrompt),
      prompt_required: Boolean(entry?.promptRequired),
      ...(entry?.description ? { description: entry.description } : {}),
    };
  });

  return new Response(JSON.stringify({ object: "list", data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Read the request body as a plain object from either JSON or multipart/form-data.
 * Multipart file parts become data URLs so every downstream handler sees one shape.
 */
async function readUpscaleBody(request: Request): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      const body: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          body[key] = value;
          continue;
        }
        const file = value as File;
        const bytes = Buffer.from(await file.arrayBuffer());
        if (!bytes.length) continue;
        const mime = file.type && file.type.startsWith("image/") ? file.type : "image/png";
        body[key] = `data:${mime};base64,${bytes.toString("base64")}`;
      }
      return body;
    } catch (err) {
      log.warn("IMAGE", `Invalid multipart upscale body: ${err instanceof Error ? err.message : err}`);
      return null;
    }
  }

  try {
    const parsed = await request.json();
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

async function postHandler(request: Request) {
  const rawBody = await readUpscaleBody(request);
  if (!rawBody) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      "Invalid request body. Send JSON or multipart/form-data with an image."
    );
  }

  const validation = validateBody(v1ImageUpscaleSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data as Record<string, unknown>;
  const startTime = Date.now();

  const policy = await enforceApiKeyPolicy(request, String(body.model ?? ""));
  if (policy.rejection) return policy.rejection;

  const allowedConnections =
    policy.apiKeyInfo?.allowedConnections && policy.apiKeyInfo.allowedConnections.length > 0
      ? policy.apiKeyInfo.allowedConnections
      : null;

  const { provider, model } = parseUpscaleModel(String(body.model ?? ""));
  if (!provider || !model) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid upscale model: ${body.model}. Use format: provider/model ` +
        `(e.g. adobe-firefly/topaz-bloom).`
    );
  }

  const providerConfig = getUpscaleProvider(provider);
  if (!providerConfig) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown upscale provider: ${provider}`);
  }

  const entry = providerConfig.models.find((candidate) => candidate.id === model);
  if (!entry) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Unsupported upscale model for ${provider}: ${model}. ` +
        `Available: ${providerConfig.models.map((m) => m.id).join(", ")}.`
    );
  }

  if (!extractUpscaleSourceImage(body)) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `A source image is required for upscaling. Send "image" or "image_url" ` +
        `(data URL, http(s) URL, or a multipart file part).`
    );
  }

  if (entry.promptRequired && !(typeof body.prompt === "string" && body.prompt.trim())) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Upscale model ${provider}/${model} requires a prompt describing the image.`
    );
  }

  const credentialsResult = await getProviderCredentialsWithQuotaPreflight(
    provider,
    null,
    allowedConnections,
    `${provider}/${model}`
  );
  if (!credentialsResult) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for upscale provider: ${provider}`
    );
  }

  // getProviderCredentialsWithQuotaPreflight returns either a credential record or an
  // all-rate-limited marker; read both through one loose view (the union has no common
  // discriminant) and narrow explicitly afterwards.
  const creds = credentialsResult as {
    allRateLimited?: boolean;
    retryAfter?: string;
    retryAfterHuman?: string;
    apiKey?: string | null;
    accessToken?: string | null;
    connectionId?: string | null;
    providerSpecificData?: Record<string, unknown> | null;
  };

  if (creds.allRateLimited) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${provider}] All accounts rate limited`,
      creds.retryAfter,
      creds.retryAfterHuman
    );
  }

  const upscaleCredentials = {
    ...(typeof creds.apiKey === "string" && creds.apiKey ? { apiKey: creds.apiKey } : {}),
    ...(typeof creds.accessToken === "string" && creds.accessToken
      ? { accessToken: creds.accessToken }
      : {}),
    // Adobe Firefly keeps a pasted firefly.adobe.com Cookie here.
    ...(creds.providerSpecificData ? { providerSpecificData: creds.providerSpecificData } : {}),
  };

  let proxyInfo: { proxy?: unknown } | null = null;
  if (creds.connectionId) {
    try {
      proxyInfo = (await resolveProxyForConnection(creds.connectionId)) as { proxy?: unknown } | null;
    } catch {
      log.debug("PROXY", `Failed to resolve proxy for upscale provider: ${provider}`);
    }
  }

  const runUpscale = () => handleImageUpscale({ body, credentials: upscaleCredentials, log });

  const result = await (creds.connectionId
    ? runWithProxyContext((proxyInfo?.proxy as never) || null, runUpscale).catch(
        (err: { statusCode?: number; message?: string }) => ({
          success: false,
          status: err.statusCode || 500,
          error: err.message,
        })
      )
    : runUpscale());

  if (result.success) {
    await clearRecoveredProviderState(credentialsResult);
    const costUsd = await calculateModalCost("image", provider, `${provider}/${model}`, { n: 1 });
    const headers = new Headers({ "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider,
      model: `${provider}/${model}`,
      costUsd,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify((result as { data: unknown }).data), {
      status: 200,
      headers,
    });
  }

  const errorPayload = toJsonErrorPayload(
    (result as { error?: unknown }).error,
    "Image upscale provider error"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: (result as { status?: number }).status ?? HTTP_STATUS.BAD_GATEWAY,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST = withInjectionGuard(postHandler);
