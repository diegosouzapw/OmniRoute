import {
  handleAdobeFireflyImageGeneration,
  handleSyntxImageGeneration,
  handleImageGeneration,
  handleCodexImageEdit,
  handleOpenAIImageEdit,
  handleOpenRouterImageEdit,
} from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { isCodexImagesModel } from "@omniroute/open-sse/handlers/codexImages.ts";
import {
  handleFalAIImageEdit,
  isFalImageEditModel,
} from "@omniroute/open-sse/handlers/imageGeneration/providers/fal.ts";

import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { executeImageWithCredentialFallback } from "@/sse/services/imageCredentialRetry";
import {
  parseImageModel,
  getImageProvider,
  getImageModelEntry,
} from "@omniroute/open-sse/config/imageRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { getComboByName, getCombos } from "@/lib/db/combos";
import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import {
  runImageComboTargets,
  type ImageComboDispatchResult,
} from "@omniroute/open-sse/services/imageCombo.ts";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { isUsableImageCredentials } from "@/sse/services/imageCredentials";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";

import {
  resolveImageModelPrefix,
  validateCodexImageEditReferences,
} from "@/lib/images/imageRouteModel";

import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { isCodexFreePlan } from "@omniroute/open-sse/config/codexPlan.ts";
import { buildAdobeFireflyEditDataUrls } from "@/lib/images/adobeFireflyEdit";
import {
  runImageRequestWithAccounting,
  type ImageRequestAccounting,
} from "@/lib/usage/imageRequestAccounting";
import { dispatchCodexImagesEdit, dispatchAntigravityEdit } from "./editNativeDispatch";
export {
  dispatchCodexImagesEdit,
  dispatchAntigravityEdit,
  validateCodexImagesEditOptions,
} from "./editNativeDispatch";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function selectImageEditCredentials(params: {
  parsed: ReturnType<typeof parseImageModel>;
  allowedConnections: string[] | null;
  resolvedModel: string;
}) {
  const { parsed, allowedConnections, resolvedModel } = params;
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    parsed.provider,
    null,
    allowedConnections,
    resolvedModel
  );
  if (!credentials || "allExpired" in credentials)
    return {
      response: errorResponse(
        HTTP_STATUS.UNAUTHORIZED,
        `No credentials for provider: ${parsed.provider}`
      ),
    };
  if ("blockedByKeyPolicy" in credentials)
    return {
      response: errorResponse(403, "Image provider connection is not allowed by API key policy"),
    };
  if (isAllRateLimitedCredentials(credentials))
    return {
      response: unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${parsed.provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      ),
    };
  if ("allRateLimited" in credentials)
    return { response: errorResponse(503, "Image provider credentials unavailable") };
  if ("leaseUnavailable" in credentials)
    return {
      response: errorResponse(429, "Selected image account is already leased; try again later"),
    };
  if (!isUsableImageCredentials(credentials))
    return {
      response: errorResponse(401, "Image credential selection did not return usable credentials"),
    };
  return { credentials };
}

interface SingleImageEditRequest {
  parsed: ReturnType<typeof parseImageModel>;
  providerConfig: NonNullable<ReturnType<typeof getImageProvider>>;
  allowedConnections: string[] | null;
  resolvedModel: string;
  prompt: string;
  size: string | null;
  responseFormat: string | null;
  images: Array<{ bytes: Buffer; mime: string }>;
  imageBytes: Buffer | null;
  imageMime: string | null;
  accounting: Pick<ImageRequestAccounting, "apiKeyInfo" | "startTime">;
}

export async function handleMuseEditRequest(
  params: SingleImageEditRequest & { request: Request; hasMask: boolean }
): Promise<Response> {
  if (params.hasMask) return errorResponse(400, "Muse Image edits do not support masks");
  const selection = await selectImageEditCredentials(params);
  if ("response" in selection) return selection.response;
  const { credentials: finalCredentials, result } = await executeImageWithCredentialFallback({
    provider: params.parsed.provider,
    requestedModel: params.resolvedModel,
    credentials: selection.credentials,
    selectNextCredentials: async (provider, model, excluded) => {
      const next = await getProviderCredentialsWithQuotaPreflight(
        provider,
        null,
        params.allowedConnections,
        model,
        { excludeConnectionIds: [...excluded] }
      );
      return isUsableImageCredentials(next) ? next : null;
    },
    execute: (credentials) =>
      runImageRequestWithAccounting(
        {
          ...params.accounting,
          endpoint: "/v1/images/edits",
          provider: params.parsed.provider,
          model: params.parsed.model,
          credentials,
        },
        () =>
          handleImageGeneration({
            body: {
              model: params.resolvedModel,
              prompt: params.prompt,
              size: params.size ?? undefined,
              response_format: params.responseFormat ?? undefined,
              n: 1,
              imageBytes: params.imageBytes,
              imageMime: params.imageMime,
            },
            credentials,
            log,
            signal: params.request.signal,
          })
      ),
  });
  if (result.success) {
    if (finalCredentials) await clearRecoveredProviderState(finalCredentials);
    return jsonResponse(result.data);
  }
  return jsonResponse(
    toJsonErrorPayload(result.error, "Image edit provider error"),
    result.status ?? HTTP_STATUS.BAD_GATEWAY
  );
}

export async function handleSyntxEditRequest(params: SingleImageEditRequest): Promise<Response> {
  const { parsed, providerConfig, prompt, size, responseFormat, images, imageBytes, imageMime } =
    params;

  const selection = await selectImageEditCredentials(params);
  if ("response" in selection) return selection.response;
  const credentials = selection.credentials;
  const dataUrls = buildAdobeFireflyEditDataUrls(images, imageBytes, imageMime);
  if (dataUrls.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: image");
  }

  const result = await runImageRequestWithAccounting(
    {
      ...params.accounting,
      endpoint: "/v1/images/edits",
      provider: parsed.provider,
      model: parsed.model,
      credentials,
    },
    () =>
      handleSyntxImageGeneration({
        provider: parsed.provider,
        model: parsed.model,
        providerConfig,
        body: {
          prompt,
          size: size ?? undefined,
          response_format: responseFormat ?? undefined,
          n: 1,
          image_url: dataUrls,
          image: dataUrls.length === 1 ? dataUrls[0] : dataUrls,
          image_urls: dataUrls,
        },
        credentials: credentials as Parameters<typeof handleSyntxImageGeneration>[0]["credentials"],
        log,
      })
  );

  if ((result as { success?: boolean }).success) {
    await clearRecoveredProviderState(credentials);
    return jsonResponse((result as { data?: unknown }).data);
  }
  return jsonResponse(
    toJsonErrorPayload((result as { error?: unknown }).error, "Image edit provider error"),
    (result as { status?: number }).status ?? HTTP_STATUS.BAD_GATEWAY
  );
}

/** Reference/prompt payload an edit dispatch needs, shared by single + combo paths. */
interface ImageEditContext {
  accounting: Pick<ImageRequestAccounting, "apiKeyInfo" | "startTime" | "comboStrategy">;
  nativeOptions?: Record<string, unknown>;
  aspectRatio?: string | null;
  imageSize?: string | null;
  hasMask?: boolean;
  prompt: string;
  size: string | null;
  responseFormat: string | null;
  images: Array<{ bytes: Buffer; mime: string }>;
  imageBytes: Buffer | null;
  imageMime: string | null;
  imageInputCount: number;
  allowedConnections: string[] | null;
  request: Request;
}

/** A combo target that resolved to an edit-capable provider/node. */
interface EditComboTarget {
  modelStr: string;
  parsed: ReturnType<typeof parseImageModel>;
  providerConfig: ReturnType<typeof getImageProvider> | null;
  /** Credential/connection lookup key (built-in provider id, or custom node id). */
  credKey: string;
}

/**
 * Decide whether a prefix-resolved combo target can service an image edit, and
 * return the credential key to resolve it with. Mirrors postHandler's provider
 * branches: codex-responses, fal-ai edit models, adobe-firefly, built-in
 * openrouter, and custom OpenAI-compatible nodes are edit-capable; every other
 * built-in provider is not (it exposes no OpenAI-compatible edit endpoint).
 */
function classifyImageEditTarget(
  resolvedModel: string,
  parsed: ReturnType<typeof parseImageModel>,
  providerConfig: ReturnType<typeof getImageProvider> | null
): { credKey: string } | null {
  if (providerConfig) {
    if (
      providerConfig.format === "gemini-image" ||
      providerConfig.format === "codex-responses" ||
      providerConfig.format === "adobe-firefly-image" ||
      providerConfig.format === "syntx-image" ||
      (providerConfig.format === "fal-ai" && isFalImageEditModel(parsed.model)) ||
      providerConfig.id === "openrouter"
    ) {
      return parsed.provider ? { credKey: parsed.provider } : null;
    }
    // Other built-in providers do not expose an OpenAI-compatible edit endpoint.
    return null;
  }
  // Custom OpenAI-compatible node: prefix already rewritten to `<nodeId>/model`.
  const slash = resolvedModel.indexOf("/");
  if (slash > 0 && slash < resolvedModel.length - 1) {
    return { credKey: resolvedModel.slice(0, slash) };
  }
  return null;
}

/**
 * Dispatch a single edit-capable target with already-resolved credentials, and
 * return a normalized {success,data,status,error}. Reuses the same provider
 * handlers postHandler uses for the single-model path.
 */
async function dispatchImageEditTarget(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig } = target;
  const format = providerConfig?.format;
  if (format === "gemini-image")
    return dispatchAntigravityEdit(target, credentials, ctx) as Promise<ImageComboDispatchResult>;
  if (format === "codex-responses") return dispatchHostedCodexEdit(target, credentials, ctx);
  if (format === "fal-ai" && isFalImageEditModel(parsed.model))
    return dispatchFalEdit(target, credentials, ctx);
  if (format === "adobe-firefly-image") return dispatchFireflyEdit(target, credentials, ctx);
  if (format === "syntx-image") return dispatchSyntxEdit(target, credentials, ctx);
  if (providerConfig?.id === "openrouter") return dispatchOpenRouterEdit(target, credentials, ctx);
  return dispatchCustomOpenAIEdit(target, credentials, ctx);
}

async function dispatchHostedCodexEdit(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig, modelStr } = target;
  const { prompt, size, responseFormat, images, request } = ctx;
  if (isCodexImagesModel(parsed.model)) return dispatchCodexImagesEdit(target, credentials, ctx);
  const modelEntry = getImageModelEntry(modelStr);
  if (!modelEntry || modelEntry.provider !== "codex" || modelEntry.model !== parsed.model)
    return {
      success: false,
      status: HTTP_STATUS.BAD_REQUEST,
      error: `Unsupported Codex image edit model: ${modelStr}`,
    };
  const imageValidationError = validateCodexImageEditReferences(images);
  if (imageValidationError)
    return { success: false, status: HTTP_STATUS.BAD_REQUEST, error: imageValidationError };
  const details = credentials as { connectionId?: unknown; providerSpecificData?: unknown };
  if (isCodexFreePlan(details.providerSpecificData))
    return {
      success: false,
      status: HTTP_STATUS.BAD_REQUEST,
      error: "Codex image editing requires a paid ChatGPT/Codex plan",
    };
  const connectionId = typeof details.connectionId === "string" ? details.connectionId : null;
  const proxyInfo = await resolveHostedEditProxy(connectionId, parsed.provider);
  const editImage = () =>
    handleCodexImageEdit({
      provider: parsed.provider,
      model: parsed.model,
      providerConfig,
      body: { prompt, size: size ?? undefined, response_format: responseFormat ?? undefined },
      referenceImages: images,
      credentials: credentials as never,
      log,
      signal: request.signal,
    });
  return (await (connectionId
    ? runWithProxyContext(proxyInfo?.proxy || null, editImage).catch(() => ({
        success: false as const,
        status: HTTP_STATUS.SERVICE_UNAVAILABLE,
        error: "Image edit proxy error",
      }))
    : editImage())) as ImageComboDispatchResult;
}

async function resolveHostedEditProxy(connectionId: string | null, provider: string) {
  if (!connectionId) return null;
  try {
    return await resolveProxyForConnection(connectionId);
  } catch {
    log.debug("PROXY", `Failed to resolve proxy for image provider: ${provider}`);
    return null;
  }
}

async function dispatchFalEdit(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig } = target;
  const { prompt, size, responseFormat, images } = ctx;
  return (await handleFalAIImageEdit({
    provider: parsed.provider,
    model: parsed.model,
    providerConfig,
    body: { prompt, size: size ?? undefined, response_format: responseFormat ?? undefined, n: 1 },
    images,
    credentials: credentials as never,
    log,
  })) as ImageComboDispatchResult;
}

async function dispatchFireflyEdit(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig } = target;
  const { prompt, size, responseFormat, images, imageBytes, imageMime } = ctx;
  const dataUrls = buildAdobeFireflyEditDataUrls(images, imageBytes, imageMime);
  if (dataUrls.length === 0)
    return {
      success: false,
      status: HTTP_STATUS.BAD_REQUEST,
      error: "Missing required field: image",
    };
  return (await handleAdobeFireflyImageGeneration({
    provider: parsed.provider,
    model: parsed.model,
    providerConfig,
    body: {
      prompt,
      size: size ?? undefined,
      response_format: responseFormat ?? undefined,
      n: 1,
      image_url: dataUrls[0],
      image: dataUrls.length === 1 ? dataUrls[0] : dataUrls,
      image_urls: dataUrls,
      images: dataUrls,
    },
    credentials: credentials as never,
    log,
  })) as ImageComboDispatchResult;
}

async function dispatchSyntxEdit(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig } = target;
  const { prompt, size, responseFormat, images, imageBytes, imageMime } = ctx;
  const dataUrls = buildAdobeFireflyEditDataUrls(images, imageBytes, imageMime);
  if (dataUrls.length === 0)
    return {
      success: false,
      status: HTTP_STATUS.BAD_REQUEST,
      error: "Missing required field: image",
    };
  return (await handleSyntxImageGeneration({
    provider: parsed.provider,
    model: parsed.model,
    providerConfig,
    body: {
      prompt,
      size: size ?? undefined,
      response_format: responseFormat ?? undefined,
      n: 1,
      image_url: dataUrls,
      image: dataUrls.length === 1 ? dataUrls[0] : dataUrls,
      image_urls: dataUrls,
    },
    credentials: credentials as never,
    log,
  })) as ImageComboDispatchResult;
}

async function dispatchOpenRouterEdit(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig } = target;
  const { prompt, size, imageBytes, imageMime } = ctx;
  return (await handleOpenRouterImageEdit({
    provider: parsed.provider,
    model: parsed.model,
    baseUrl: providerConfig.baseUrl,
    credentials: credentials as never,
    prompt,
    imageBytes,
    imageMime,
    size: size ?? undefined,
    n: 1,
    log,
  })) as ImageComboDispatchResult;
}

async function dispatchCustomOpenAIEdit(
  target: EditComboTarget,
  credentials: unknown,
  ctx: ImageEditContext
): Promise<ImageComboDispatchResult> {
  const { modelStr } = target;
  const { prompt, size, responseFormat, imageBytes, imageMime } = ctx;
  const slash = modelStr.indexOf("/");
  const customProviderId = slash > 0 ? modelStr.slice(0, slash) : null;
  const customModel = slash > 0 ? modelStr.slice(slash + 1) : null;
  if (!customProviderId || !customModel) {
    return {
      success: false,
      status: HTTP_STATUS.BAD_REQUEST,
      error: `Unknown image provider for model "${modelStr}"`,
    };
  }
  return (await handleOpenAIImageEdit({
    provider: customProviderId,
    model: customModel,
    credentials: credentials as never,
    prompt,
    imageBytes,
    imageMime,
    size,
    responseFormat,
    n: 1,
    log,
  })) as ImageComboDispatchResult;
}

/**
 * #12547: run an image-edit request whose model is a bare combo/alias name over
 * the combo's edit-capable targets, mirroring how /v1/images/generations diverts
 * bare combos to executeImageCombo (#9239). A combo whose first target isn't
 * edit-capable (or lacks credentials) now falls through to a later edit-capable
 * target instead of flattening to the first target and hard-erroring.
 */
export async function executeImageEditCombo(
  comboName: string,
  ctx: ImageEditContext
): Promise<Response> {
  const combo = await getComboByName(comboName);
  if (!combo) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo not found: ${comboName}`);
  }
  const allCombos = await getCombos();
  const targets = resolveComboTargets(combo as never, allCombos as never);
  if (!targets || targets.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo "${comboName}" has no usable targets`);
  }

  const editTargets = await resolveEditComboTargets(targets);

  if (editTargets.length === 0) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No image-edit-capable targets in combo "${comboName}"`
    );
  }

  const run = await runImageComboTargets(editTargets, {
    resolveProvider: (target) => ({ provider: target.credKey, model: target.parsed.model }),
    resolveCredentials: (_provider, target) =>
      getProviderCredentialsWithQuotaPreflight(
        target.credKey,
        null,
        ctx.allowedConnections,
        target.modelStr
      ),
    isRateLimited: isAllRateLimitedCredentials,
    dispatch: ({ target, credentials }) => {
      // Dedicated Images binds accounting after refreshing the selected account.
      if (target.parsed.provider === "codex" && isCodexImagesModel(target.parsed.model))
        return dispatchImageEditTarget(target, credentials, {
          ...ctx,
          accounting: { ...ctx.accounting, comboStrategy: "priority" },
        });
      return runImageRequestWithAccounting(
        {
          ...ctx.accounting,
          endpoint: "/v1/images/edits",
          provider: target.parsed.provider || target.credKey,
          model: target.parsed.model,
          credentials,
          comboStrategy: "priority",
        },
        () => dispatchImageEditTarget(target, credentials, ctx)
      );
    },
    onSuccess: async (credentials) => {
      await clearRecoveredProviderState(credentials as never);
    },
    failureLabel: "Image edit failed",
  });

  if (run.outcome === "terminal") {
    return errorResponse(run.status, `[${run.provider}] ${run.error}`);
  }
  if (run.outcome === "success") {
    // Match the single-model edit path: return the provider payload directly.
    return jsonResponse(run.data);
  }
  const errorPayload = toJsonErrorPayload(
    run.lastError?.error || "All combo targets failed",
    "Image edit combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: run.lastError?.status || HTTP_STATUS.BAD_GATEWAY,
    headers: { "Content-Type": "application/json" },
  });
}

async function resolveEditComboTargets(
  targets: Array<{ modelStr?: unknown }>
): Promise<EditComboTarget[]> {
  const editTargets: EditComboTarget[] = [];
  for (const target of targets) {
    const raw = typeof target.modelStr === "string" ? target.modelStr : "";
    if (!raw.trim()) continue;
    let resolved: string;
    try {
      resolved = await resolveImageModelPrefix(raw);
    } catch {
      continue;
    }
    const parsed = parseImageModel(resolved);
    const providerConfig = parsed.provider ? getImageProvider(parsed.provider) : null;
    const capability = classifyImageEditTarget(resolved, parsed, providerConfig);
    if (!capability) continue;
    editTargets.push({ modelStr: resolved, parsed, providerConfig, credKey: capability.credKey });
  }
  return editTargets;
}
