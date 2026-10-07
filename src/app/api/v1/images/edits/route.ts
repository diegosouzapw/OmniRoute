import {
  handleAdobeFireflyImageGeneration,
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
import { getComboByName, getCombos } from "@/lib/db/combos";
import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import {
  runImageComboTargets,
  type ImageComboDispatchResult,
} from "@omniroute/open-sse/services/imageCombo.ts";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  resolveImageRouteModel,
  resolveImageModelPrefix,
  extractImageEditInputFromJson,
  validateCodexImageEditReferences,
} from "@/lib/images/imageRouteModel";
import { isMicrosoftDesignerWebProviderRetiredError } from "@/shared/constants/designerWebRetirement";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { isCodexFreePlan } from "@omniroute/open-sse/executors/codex/tools.ts";
import {
  getBodySizeLimit,
  readRequestBodyWithLimit,
  RequestBodyTooLargeError,
} from "@/shared/middleware/bodySizeGuard";
import { getCachedSettings } from "@/lib/db/readCache";
import {
  CHATGPT_WEB_RETIRED_ERROR_CODE,
  isCommonChatGptWebRetirementError,
} from "@/shared/constants/chatgptWebRetirement";
import { z } from "zod";

// JSON edit body (Open WebUI / OpenAI-style). All fields optional — the prompt
// and resolvable image are enforced after extraction in POST — but the top-level
// shape must be an object with correctly-typed fields, so a malformed body
// (array, string, wrong types) is rejected with 400 instead of silently parsed.
const ImageEditJsonSchema = z
  .object({
    prompt: z.string().optional(),
    model: z.string().optional(),
    size: z.string().optional(),
    response_format: z.string().optional(),
    image: z.unknown().optional(),
    images: z.array(z.unknown()).optional(),
  })
  .passthrough();

/**
 * /v1/images/edits — OpenAI-compatible image-edit endpoint.
 *
 * Supported upstream shapes include:
 *  - **custom OpenAI-compatible providers** (#3214/#3215): forward a multipart edit to
 *    the node's `{base_url}/images/edits`, mirroring how generations forwards.
 *
 * Input is accepted as multipart/form-data (Open WebUI's "Image Edit" toggle) or as JSON
 * with data-URL images (`images: [{ image_url: "data:..." }]`), since some OpenAI-compatible
 * clients send the latter. The model may be a built-in id, a `provider/model`, a custom
 * provider prefix, or a combo/alias name — all resolved the same as generations.
 *
 * Without this route, multipart bodies trip Next.js's Server Action handler (which
 * intercepts ALL multipart POSTs) and the client gets a confusing 500.
 */

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

interface EditInput {
  prompt: string;
  model: string | null;
  size: string | null;
  responseFormat: string | null;
  imageBytes: Buffer | null;
  imageMime: string | null;
  images: Array<{ bytes: Buffer; mime: string }>;
  imageInputCount: number;
}

const MAX_NON_CODEX_IMAGE_EDIT_REFERENCES = 1;

async function readMultipartImage(formData: FormData): Promise<EditInput> {
  const promptRaw = formData.get("prompt");
  const prompt = typeof promptRaw === "string" ? promptRaw.trim() : "";
  const modelRaw = formData.get("model");
  const model = typeof modelRaw === "string" ? modelRaw.trim() : null;
  const sizeRaw = formData.get("size");
  const size = typeof sizeRaw === "string" ? sizeRaw.trim() : null;
  const respRaw = formData.get("response_format");
  const responseFormat = typeof respRaw === "string" ? respRaw.trim() : null;

  // OpenAI-style clients may repeat either `image` or `image[]`. Count every submitted
  // candidate so provider-specific cardinality checks cannot silently drop extras.
  const imageEntries = Array.from(formData.entries())
    .filter(([key]) => key === "image" || key === "image[]")
    .map(([, value]) => value);
  const images: Array<{ bytes: Buffer; mime: string }> = [];
  for (const imageEntry of imageEntries) {
    if (typeof imageEntry === "string") continue;
    const file = imageEntry as File;
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length === 0) continue;
    images.push({ bytes, mime: file.type || "image/png" });
  }
  const firstImage = images[0] ?? null;
  return {
    prompt,
    model,
    size,
    responseFormat,
    imageBytes: firstImage?.bytes ?? null,
    imageMime: firstImage?.mime ?? null,
    images,
    imageInputCount: imageEntries.length,
  };
}

/** Read the edit input from either multipart/form-data or a JSON/data-URL body. */
async function readEditInput(request: Request): Promise<EditInput | null> {
  const contentType = request.headers.get("content-type") || "";
  let bodySizeSettings: Record<string, unknown> | undefined;
  try {
    bodySizeSettings = await getCachedSettings();
  } catch {
    bodySizeSettings = undefined;
  }
  const bodySizeLimit = getBodySizeLimit("/api/v1/images/edits", bodySizeSettings);
  const rawBody = await readRequestBodyWithLimit(request, bodySizeLimit);
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await new Response(rawBody, {
        headers: { "content-type": contentType },
      }).formData();
      return await readMultipartImage(formData);
    } catch (err) {
      log.warn("IMAGE", `Invalid multipart body: ${err instanceof Error ? err.message : err}`);
      return null;
    }
  }
  if (contentType.includes("application/json")) {
    try {
      const parsed = ImageEditJsonSchema.safeParse(
        JSON.parse(new TextDecoder().decode(rawBody)) as unknown
      );
      if (!parsed.success) {
        log.warn("IMAGE", `Invalid JSON edit body shape: ${parsed.error.message}`);
        return null;
      }
      return extractImageEditInputFromJson(parsed.data);
    } catch (err) {
      log.warn("IMAGE", `Invalid JSON edit body: ${err instanceof Error ? err.message : err}`);
      return null;
    }
  }
  return null;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Reduce reference images (multi + single fallback) to data-URL strings for Firefly. */
function buildAdobeFireflyEditDataUrls(
  images: Array<{ bytes: Buffer; mime: string }>,
  imageBytes: Buffer | null,
  imageMime: string | null
): string[] {
  const dataUrls: string[] = [];
  const refList = Array.isArray(images) ? images : [];
  for (const ref of refList) {
    if (!ref || typeof ref !== "object") continue;
    const bytes = (ref as { bytes?: Buffer }).bytes;
    const mime =
      typeof (ref as { mime?: string }).mime === "string" &&
      String((ref as { mime?: string }).mime).startsWith("image/")
        ? String((ref as { mime?: string }).mime)
        : "image/png";
    if (Buffer.isBuffer(bytes) && bytes.length > 0) {
      dataUrls.push(`data:${mime};base64,${bytes.toString("base64")}`);
    }
  }
  if (dataUrls.length === 0 && imageBytes && imageBytes.length > 0) {
    const mime =
      typeof imageMime === "string" && imageMime.startsWith("image/") ? imageMime : "image/png";
    dataUrls.push(`data:${mime};base64,${imageBytes.toString("base64")}`);
  }
  return dataUrls;
}

/**
 * Adobe Firefly edit = storage upload + generate-async referenceBlobs (same as i2i generate).
 * Extracted from postHandler to keep cyclomatic/cognitive complexity in check
 * (config/quality/complexity-baseline.json ratchet).
 */
async function handleAdobeFireflyEditRequest(params: {
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
}): Promise<Response> {
  const {
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
  } = params;

  const credentials = await getProviderCredentialsWithQuotaPreflight(
    parsed.provider,
    null,
    allowedConnections,
    resolvedModel
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

  // Prefer multi-image list when present; fall back to the primary imageBytes.
  const dataUrls = buildAdobeFireflyEditDataUrls(images, imageBytes, imageMime);
  if (dataUrls.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: image");
  }

  const result = await handleAdobeFireflyImageGeneration({
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
    credentials,
    log,
  });

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
      providerConfig.format === "codex-responses" ||
      providerConfig.format === "adobe-firefly-image" ||
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
  const { parsed, providerConfig, modelStr } = target;
  const { prompt, size, responseFormat, images, imageBytes, imageMime, request } = ctx;

  // Built-in Codex — native Responses hosted tool for reference-image edits.
  if (providerConfig?.format === "codex-responses") {
    const modelEntry = getImageModelEntry(modelStr);
    if (!modelEntry || modelEntry.provider !== "codex" || modelEntry.model !== parsed.model) {
      return { success: false, status: HTTP_STATUS.BAD_REQUEST, error: `Unsupported Codex image edit model: ${modelStr}` };
    }
    const imageValidationError = validateCodexImageEditReferences(images);
    if (imageValidationError) {
      return { success: false, status: HTTP_STATUS.BAD_REQUEST, error: imageValidationError };
    }
    const credentialDetails = credentials as {
      connectionId?: unknown;
      providerSpecificData?: unknown;
    };
    if (isCodexFreePlan(credentialDetails.providerSpecificData)) {
      return {
        success: false,
        status: HTTP_STATUS.BAD_REQUEST,
        error: "Codex image editing requires a paid ChatGPT/Codex plan",
      };
    }
    const connectionId =
      typeof credentialDetails.connectionId === "string" ? credentialDetails.connectionId : null;
    let proxyInfo = null;
    if (connectionId) {
      try {
        proxyInfo = await resolveProxyForConnection(connectionId);
      } catch {
        log.debug("PROXY", `Failed to resolve proxy for image provider: ${parsed.provider}`);
      }
    }
    const editImage = () =>
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

  if (providerConfig?.format === "fal-ai" && isFalImageEditModel(parsed.model)) {
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

  if (providerConfig?.format === "adobe-firefly-image") {
    const dataUrls = buildAdobeFireflyEditDataUrls(images, imageBytes, imageMime);
    if (dataUrls.length === 0) {
      return { success: false, status: HTTP_STATUS.BAD_REQUEST, error: "Missing required field: image" };
    }
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

  if (providerConfig?.id === "openrouter") {
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

  // Custom OpenAI-compatible node: forward to {base_url}/images/edits.
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
async function executeImageEditCombo(comboName: string, ctx: ImageEditContext): Promise<Response> {
  const combo = await getComboByName(comboName);
  if (!combo) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo not found: ${comboName}`);
  }
  const allCombos = await getCombos();
  const targets = resolveComboTargets(combo as never, allCombos as never);
  if (!targets || targets.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo "${comboName}" has no usable targets`);
  }

  // Build the edit-capable target list (prefix-resolved). Non-edit-capable and
  // retired targets are skipped here so the loop only iterates dispatchable ones.
  const editTargets: EditComboTarget[] = [];
  for (const t of targets) {
    const raw =
      typeof (t as { modelStr?: unknown }).modelStr === "string"
        ? ((t as { modelStr: string }).modelStr as string)
        : "";
    if (!raw.trim()) continue;
    let resolved: string;
    try {
      resolved = await resolveImageModelPrefix(raw);
    } catch {
      // retired provider / prefix — skip this target
      continue;
    }
    const parsed = parseImageModel(resolved);
    const providerConfig = parsed.provider ? getImageProvider(parsed.provider) : null;
    const capability = classifyImageEditTarget(resolved, parsed, providerConfig);
    if (!capability) continue;
    editTargets.push({ modelStr: resolved, parsed, providerConfig, credKey: capability.credKey });
  }

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
    dispatch: ({ target, credentials }) => dispatchImageEditTarget(target, credentials, ctx),
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

async function postHandler(request: Request, _context?: unknown) {
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

  const { prompt, model, size, responseFormat, imageBytes, imageMime, images, imageInputCount } =
    input;
  if (!prompt) {
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
        allowedConnections: comboAllowedConnections,
        request,
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
    const credentialDetails = credentials as {
      connectionId?: unknown;
      providerSpecificData?: unknown;
    };
    if (isCodexFreePlan(credentialDetails.providerSpecificData)) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        "Codex image editing requires a paid ChatGPT/Codex plan"
      );
    }

    const connectionId =
      typeof credentialDetails.connectionId === "string" ? credentialDetails.connectionId : null;
    let proxyInfo = null;
    if (connectionId) {
      try {
        proxyInfo = await resolveProxyForConnection(connectionId);
      } catch {
        log.debug("PROXY", `Failed to resolve proxy for image provider: ${parsed.provider}`);
      }
    }

    const editImage = () =>
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
      });

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

    const result = await handleFalAIImageEdit({
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
    });

    if (result.success) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return jsonResponse(
      toJsonErrorPayload(result.error, "Image edit provider error"),
      result.status
    );
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

    const result = await handleOpenRouterImageEdit({
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
    });

    if (result.success) {
      await clearRecoveredProviderState(credentials);
      return jsonResponse(result.data);
    }
    return jsonResponse(
      toJsonErrorPayload(result.error, "Image edit provider error"),
      result.status
    );
  }

  // Other built-in providers do not expose an OpenAI-compatible edit endpoint.
  if (providerConfig) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Image edit is not supported for built-in provider "${parsed.provider}". ` +
        `Use adobe-firefly, codex, or a custom OpenAI-compatible image provider.`
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
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for custom image provider: ${customProviderId}`
    );
  }
  if (credentials.allRateLimited) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${customProviderId}] All accounts rate limited`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }

  const result = await handleOpenAIImageEdit({
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
  });

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
