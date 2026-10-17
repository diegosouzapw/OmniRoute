import {
  handleCodexImageEdit,
  handleOpenAIImageEdit,
  handleOpenRouterImageEdit,
} from "@omniroute/open-sse/handlers/imageGeneration.ts";
import {
  handleFalAIImageEdit,
  FAL_IMAGE_EDIT_MAX_REFERENCES,
  isFalImageEditModel,
} from "@omniroute/open-sse/handlers/imageGeneration/providers/fal.ts";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { handleAdobeFireflyEditRequest } from "@/lib/images/adobeFireflyEdit";
import {
  runImageRequestWithAccounting,
  type ImageRequestAccounting,
} from "@/lib/usage/imageRequestAccounting";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import {
  parseImageModel,
  getImageProvider,
  getImageModelEntry,
} from "@omniroute/open-sse/config/imageRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { isUsableImageCredentials } from "@/sse/services/imageCredentials";
import { getComboByName } from "@/lib/db/combos";

import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  resolveImageRouteModel,
  validateCodexImageEditReferences,
} from "@/lib/images/imageRouteModel";
import { isMicrosoftDesignerWebProviderRetiredError } from "@/shared/constants/designerWebRetirement";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { isCodexFreePlan } from "@omniroute/open-sse/executors/codex/tools.ts";
import { RequestBodyTooLargeError } from "@/shared/middleware/bodySizeGuard";

import {
  CHATGPT_WEB_RETIRED_ERROR_CODE,
  isCommonChatGptWebRetirementError,
} from "@/shared/constants/chatgptWebRetirement";

import { readEditInput, type EditInput } from "./editInput.ts";
import {
  executeImageEditCombo,
  handleSyntxEditRequest,
  handleMuseEditRequest,
  dispatchAntigravityEdit,
  dispatchCodexImagesEdit,
  validateCodexImagesEditOptions,
} from "./editDispatch.ts";
import { isCodexImagesModel } from "@omniroute/open-sse/handlers/codexImages.ts";
import { validateAntigravityReferences } from "@omniroute/open-sse/handlers/geminiImage.ts";
const MAX_NON_CODEX_IMAGE_EDIT_REFERENCES = 1;
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
type EditAccountingBase = Pick<ImageRequestAccounting, "apiKeyInfo" | "startTime">;

function editAccounting(
  base: EditAccountingBase,
  provider: string,
  model: string | null | undefined,
  credentials: unknown
): ImageRequestAccounting {
  return { ...base, endpoint: "/v1/images/edits", provider, model, credentials };
}

async function postHandler(request: Request, _context?: unknown) {
  const startTime = Date.now();
  let input: EditInput | null;
  try {
    input = await readEditInput(request);
  } catch (err) {
    if (err instanceof RequestBodyTooLargeError) {
      return errorResponse(
        413,
        `Image edit request body exceeds the ${Math.floor(err.limit / (1024 * 1024))} MiB limit`
      );
    }
    throw err;
  }
  if (!input) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      "Invalid request body. Send multipart/form-data or JSON with a data-URL image."
    );
  }

  const {
    prompt,
    model,
    size,
    responseFormat,
    imageBytes,
    imageMime,
    images,
    imageInputCount,
    aspectRatio,
    imageSize,
    hasMask,
    nativeOptions,
  } = input;
  if (!prompt.trim()) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: prompt");
  }
  const injectionDecision = createInjectionGuard()({ prompt });
  if (injectionDecision.blocked) {
    return jsonResponse(
      {
        error: {
          message: "Request blocked: potential prompt injection detected",
          type: "injection_detected",
          code: "SECURITY_001",
          detections: injectionDecision.result.detections.length,
        },
      },
      HTTP_STATUS.BAD_REQUEST
    );
  }
  if (imageInputCount !== images.length) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid reference image");
  }
  if (!imageBytes || imageBytes.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: image");
  }
  if (!model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: model");
  }

  const fullModel = model;

  // #12547: a bare combo/alias name iterates the combo's edit-capable targets
  // (mirrors generations' #9239 diversion, which runs before resolveImageRouteModel).
  // Without this, resolveImageRouteModel flattens the combo to its first target, so a
  // combo whose first target isn't edit-capable hard-errors even when a later target is.
  if (!fullModel.includes("/")) {
    let combo: unknown = null;
    try {
      combo = await getComboByName(fullModel);
    } catch {
      combo = null;
    }
    if (combo) {
      const comboPolicy = await enforceApiKeyPolicy(request, fullModel);
      if (comboPolicy.rejection) return comboPolicy.rejection;
      const comboAllowedConnections =
        comboPolicy.apiKeyInfo?.allowedConnections &&
        comboPolicy.apiKeyInfo.allowedConnections.length > 0
          ? comboPolicy.apiKeyInfo.allowedConnections
          : null;
      return executeImageEditCombo(fullModel, {
        prompt,
        size,
        responseFormat,
        images,
        imageBytes,
        imageMime,
        imageInputCount,
        aspectRatio,
        imageSize,
        hasMask,
        nativeOptions,
        allowedConnections: comboAllowedConnections,
        request,
        accounting: { apiKeyInfo: comboPolicy.apiKeyInfo, startTime },
      });
    }
  }

  // Resolve combo/alias, custom-provider prefix, and built-in ids consistently with
  // /v1/images/generations (#3215). Retirement is resolved before API-key policy
  // so the same explicit provider request always receives the deterministic 410.
  let resolvedModel: string;
  try {
    resolvedModel = await resolveImageRouteModel(fullModel);
  } catch (error) {
    if (isCommonChatGptWebRetirementError(error)) {
      return errorResponse(error.status, error.message, {
        type: "provider_error",
        code: CHATGPT_WEB_RETIRED_ERROR_CODE,
      });
    }
    if (isMicrosoftDesignerWebProviderRetiredError(error)) {
      return errorResponse(HTTP_STATUS.GONE, error.message);
    }
    throw error;
  }

  const policy = await enforceApiKeyPolicy(request, fullModel);
  if (policy.rejection) return policy.rejection;

  const allowedConnections =
    policy.apiKeyInfo?.allowedConnections && policy.apiKeyInfo.allowedConnections.length > 0
      ? policy.apiKeyInfo.allowedConnections
      : null;
  const accounting: EditAccountingBase = { apiKeyInfo: policy.apiKeyInfo, startTime };

  const parsed = parseImageModel(resolvedModel);
  const providerConfig = parsed.provider ? getImageProvider(parsed.provider) : null;
  // Firefly nano/gpt-image accept multiple reference blobs; other non-Codex stay at 1.
  const maxRefsForProvider =
    providerConfig?.format === "adobe-firefly-image"
      ? 4
      : providerConfig?.format === "codex-responses"
        ? Number.POSITIVE_INFINITY
        : providerConfig?.format === "fal-ai" && isFalImageEditModel(parsed.model)
          ? FAL_IMAGE_EDIT_MAX_REFERENCES
          : MAX_NON_CODEX_IMAGE_EDIT_REFERENCES;
  if (providerConfig?.format !== "codex-responses" && imageInputCount > maxRefsForProvider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      providerConfig?.format === "adobe-firefly-image"
        ? "Adobe Firefly image edit supports at most 4 reference images"
        : "This image edit provider currently supports only one reference image"
    );
  }
  if (providerConfig?.format === "gemini-image") {
    const validation = validateAntigravityReferences(images, hasMask);
    if (validation) return errorResponse(HTTP_STATUS.BAD_REQUEST, validation);
    const entry = getImageModelEntry(resolvedModel);
    if (!entry || entry.provider !== "antigravity" || entry.model !== parsed.model)
      return errorResponse(400, "Unsupported Antigravity image edit model");
    const credentials = await getProviderCredentialsWithQuotaPreflight(
      parsed.provider,
      null,
      allowedConnections,
      resolvedModel
    );
    if (!credentials || "allExpired" in credentials)
      return errorResponse(401, "No usable credentials for Antigravity");
    if ("blockedByKeyPolicy" in credentials)
      return errorResponse(403, "Image provider connection is not allowed by API key policy");
    if (isAllRateLimitedCredentials(credentials))
      return unavailableResponse(
        429,
        "All Antigravity accounts rate limited",
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    if ("allRateLimited" in credentials)
      return errorResponse(503, "Image provider credentials unavailable");
    if ("leaseUnavailable" in credentials)
      return errorResponse(429, "Selected image account is already leased; try again later");
    if (!isUsableImageCredentials(credentials))
      return errorResponse(401, "Image credential selection did not return usable credentials");
    const result = await runImageRequestWithAccounting(
      editAccounting(accounting, parsed.provider, parsed.model, credentials),
      () =>
        dispatchAntigravityEdit({ parsed, providerConfig, modelStr: resolvedModel }, credentials, {
          prompt,
          size,
          responseFormat,
          images,
          aspectRatio,
          imageSize,
          hasMask,
          request,
        })
    );
    if (result.success) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return jsonResponse(
      toJsonErrorPayload(result.error, "Image edit provider error"),
      result.status
    );
  }
  // Explicit image engines use JSON Images; hosted orchestration models retain their route.
  if (providerConfig?.format === "codex-responses" && isCodexImagesModel(parsed.model)) {
    const ctx = {
      prompt,
      size,
      responseFormat,
      images,
      hasMask,
      nativeOptions,
      request,
      accounting,
    };
    const validation = validateCodexImagesEditOptions(ctx);
    if (validation) return errorResponse(400, validation);
    const credentials = await getProviderCredentialsWithQuotaPreflight(
      parsed.provider,
      null,
      allowedConnections,
      resolvedModel
    );
    if (!credentials || "allExpired" in credentials)
      return errorResponse(401, "No usable credentials for Codex Images");
    if ("blockedByKeyPolicy" in credentials)
      return errorResponse(403, "Image provider connection is not allowed by API key policy");
    if (isAllRateLimitedCredentials(credentials))
      return unavailableResponse(
        429,
        "All Codex accounts rate limited",
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    if ("allRateLimited" in credentials)
      return errorResponse(503, "Image provider credentials unavailable");
    if ("leaseUnavailable" in credentials)
      return errorResponse(429, "Selected image account is already leased; try again later");
    if (!isUsableImageCredentials(credentials))
      return errorResponse(401, "Image credential selection did not return usable credentials");
    const result = await dispatchCodexImagesEdit(
      { parsed, providerConfig, modelStr: resolvedModel },
      credentials,
      ctx
    );
    if (result.success) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return jsonResponse(
      toJsonErrorPayload(result.error, "Codex Images edit provider error"),
      result.status
    );
  }
  // Built-in Codex uses its native Responses hosted tool for stateless reference-image edits.
  if (providerConfig?.format === "codex-responses") {
    const modelEntry = getImageModelEntry(resolvedModel);
    if (!modelEntry || modelEntry.provider !== "codex" || modelEntry.model !== parsed.model) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Unsupported Codex image edit model: ${resolvedModel}`
      );
    }
    const imageValidationError = validateCodexImageEditReferences(images);
    if (imageValidationError) {
      return errorResponse(HTTP_STATUS.BAD_REQUEST, imageValidationError);
    }

    const credentials = await getProviderCredentialsWithQuotaPreflight(
      parsed.provider,
      null,
      allowedConnections,
      resolvedModel
    );
    if (!credentials || "allExpired" in credentials) {
      return errorResponse(
        HTTP_STATUS.UNAUTHORIZED,
        `No credentials for provider: ${parsed.provider}`
      );
    }
    if ("blockedByKeyPolicy" in credentials)
      return errorResponse(403, "Image provider connection is not allowed by API key policy");
    if (isAllRateLimitedCredentials(credentials)) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${parsed.provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }
    if ("allRateLimited" in credentials)
      return errorResponse(503, "Image provider credentials unavailable");
    if ("leaseUnavailable" in credentials)
      return errorResponse(429, "Selected image account is already leased; try again later");
    if (!isUsableImageCredentials(credentials))
      return errorResponse(401, "Image credential selection did not return usable credentials");
    const credentialDetails = credentials;
    if (
      isCodexFreePlan(
        "providerSpecificData" in credentialDetails
          ? credentialDetails.providerSpecificData
          : undefined
      )
    ) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        "Codex image editing requires a paid ChatGPT/Codex plan"
      );
    }

    const connectionId =
      "connectionId" in credentialDetails && typeof credentialDetails.connectionId === "string"
        ? credentialDetails.connectionId
        : null;
    let proxyInfo = null;
    if (connectionId) {
      try {
        proxyInfo = await resolveProxyForConnection(connectionId);
      } catch {
        log.debug("PROXY", `Failed to resolve proxy for image provider: ${parsed.provider}`);
      }
    }

    const editImage = () =>
      runImageRequestWithAccounting(
        editAccounting(accounting, parsed.provider, parsed.model, credentials),
        () =>
          handleCodexImageEdit({
            provider: parsed.provider,
            model: parsed.model,
            providerConfig,
            body: {
              prompt,
              size: size ?? undefined,
              response_format: responseFormat ?? undefined,
            },
            referenceImages: images,
            credentials,
            log,
            signal: request.signal,
          })
      );

    const result = await (connectionId
      ? runWithProxyContext(proxyInfo?.proxy || null, editImage).catch(() => ({
          success: false as const,
          status: HTTP_STATUS.SERVICE_UNAVAILABLE,
          error: "Image edit proxy error",
        }))
      : editImage());

    if (result.success === true) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return jsonResponse(
      toJsonErrorPayload(result.error, "Image edit provider error"),
      result.status
    );
  }

  if (providerConfig?.format === "fal-ai" && isFalImageEditModel(parsed.model)) {
    const credentials = await getProviderCredentialsWithQuotaPreflight(
      parsed.provider,
      null,
      allowedConnections,
      resolvedModel
    );
    if (!credentials || "allExpired" in credentials) {
      return errorResponse(
        HTTP_STATUS.UNAUTHORIZED,
        `No credentials for provider: ${parsed.provider}`
      );
    }
    if ("blockedByKeyPolicy" in credentials)
      return errorResponse(403, "Image provider connection is not allowed by API key policy");
    if (isAllRateLimitedCredentials(credentials)) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${parsed.provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }

    if ("allRateLimited" in credentials)
      return errorResponse(503, "Image provider credentials unavailable");
    if ("leaseUnavailable" in credentials)
      return errorResponse(429, "Selected image account is already leased; try again later");
    if (!isUsableImageCredentials(credentials))
      return errorResponse(401, "Image credential selection did not return usable credentials");
    const result = await runImageRequestWithAccounting(
      editAccounting(accounting, parsed.provider, parsed.model, credentials),
      () =>
        handleFalAIImageEdit({
          provider: parsed.provider,
          model: parsed.model,
          providerConfig,
          body: {
            prompt,
            size: size ?? undefined,
            response_format: responseFormat ?? undefined,
            n: 1,
          },
          images,
          credentials,
          log,
        })
    );

    if (result.success === false && "error" in result) {
      return jsonResponse(
        toJsonErrorPayload(result.error, "Image edit provider error"),
        result.status
      );
    }
    if (result.success === true && "data" in result) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return errorResponse(502, "Invalid image edit provider result");
  }

  // Adobe Firefly: edit = storage upload + generate-async referenceBlobs (same as i2i generate).
  if (providerConfig?.format === "adobe-firefly-image") {
    return handleAdobeFireflyEditRequest({
      parsed,
      providerConfig,
      allowedConnections,
      resolvedModel,
      prompt,
      size,
      responseFormat,
      images,
      imageBytes,
      imageMime,
      accounting,
    });
  }

  if (providerConfig?.format === "syntx-image") {
    return handleSyntxEditRequest({
      parsed,
      providerConfig,
      allowedConnections,
      resolvedModel,
      prompt,
      size,
      responseFormat,
      images,
      imageBytes,
      imageMime,
      accounting,
    });
  }

  // Built-in OpenRouter uses its unified Image API for reference-image
  // edits: POST /api/v1/images with input_references. Forward through the
  // provider-specific adapter (#10197), rather than the multipart
  // /images/edits path used by custom OpenAI-compatible nodes.
  if (providerConfig?.id === "openrouter") {
    const credentials = await getProviderCredentialsWithQuotaPreflight(
      parsed.provider,
      null,
      allowedConnections,
      resolvedModel
    );
    if (!credentials || "allExpired" in credentials) {
      return errorResponse(
        HTTP_STATUS.UNAUTHORIZED,
        `No credentials for provider: ${parsed.provider}`
      );
    }
    if ("blockedByKeyPolicy" in credentials)
      return errorResponse(403, "Image provider connection is not allowed by API key policy");
    if (isAllRateLimitedCredentials(credentials)) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${parsed.provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }

    if ("allRateLimited" in credentials)
      return errorResponse(503, "Image provider credentials unavailable");
    if ("leaseUnavailable" in credentials)
      return errorResponse(429, "Selected image account is already leased; try again later");
    if (!isUsableImageCredentials(credentials))
      return errorResponse(401, "Image credential selection did not return usable credentials");
    const result = await runImageRequestWithAccounting(
      editAccounting(accounting, parsed.provider, parsed.model, credentials),
      () =>
        handleOpenRouterImageEdit({
          provider: parsed.provider,
          model: parsed.model,
          baseUrl: providerConfig.baseUrl,
          credentials,
          prompt,
          imageBytes,
          imageMime,
          size: size ?? undefined,
          n: 1,
          log,
        })
    );

    if (result.success) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return jsonResponse(
      toJsonErrorPayload(result.error, "Image edit provider error"),
      result.status
    );
  }

  if (providerConfig?.format === "muse-image") {
    return handleMuseEditRequest({
      parsed,
      providerConfig,
      allowedConnections,
      resolvedModel,
      prompt,
      size,
      responseFormat,
      images,
      imageBytes,
      imageMime,
      accounting,
      request,
      hasMask,
    });
  }

  // Other built-in providers do not expose an OpenAI-compatible edit endpoint.
  if (providerConfig) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Image edit is not supported for built-in provider "${parsed.provider}". ` +
        `Use adobe-firefly, syntx, codex, or a custom OpenAI-compatible image provider.`
    );
  }

  // Custom OpenAI-compatible node (no built-in config): forward to {base_url}/images/edits.
  const slash = resolvedModel.indexOf("/");
  const customProviderId = slash > 0 ? resolvedModel.slice(0, slash) : null;
  const customModel = slash > 0 ? resolvedModel.slice(slash + 1) : null;
  if (!customProviderId || !customModel) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Unknown image provider for model "${fullModel}". Use provider/model, a custom ` +
        `provider prefix, or a combo/alias name.`
    );
  }

  const credentials = await getProviderCredentialsWithQuotaPreflight(
    customProviderId,
    null,
    allowedConnections,
    resolvedModel
  );
  if (!credentials || "allExpired" in credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for custom image provider: ${customProviderId}`
    );
  }
  if ("blockedByKeyPolicy" in credentials)
    return errorResponse(403, "Image provider connection is not allowed by API key policy");
  if (isAllRateLimitedCredentials(credentials)) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${customProviderId}] All accounts rate limited`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }

  if ("allRateLimited" in credentials)
    return errorResponse(503, "Image provider credentials unavailable");
  if ("leaseUnavailable" in credentials)
    return errorResponse(429, "Selected image account is already leased; try again later");
  if (!isUsableImageCredentials(credentials))
    return errorResponse(401, "Image credential selection did not return usable credentials");
  const result = await runImageRequestWithAccounting(
    editAccounting(accounting, customProviderId, customModel, credentials),
    () =>
      handleOpenAIImageEdit({
        provider: customProviderId,
        model: customModel,
        credentials,
        prompt,
        imageBytes,
        imageMime,
        size,
        responseFormat,
        n: 1,
        log,
      })
  );

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    return jsonResponse((result as any).data);
  }
  return jsonResponse(
    toJsonErrorPayload((result as any).error, "Image edit provider error"),
    (result as any).status
  );
}

export const POST = postHandler;
