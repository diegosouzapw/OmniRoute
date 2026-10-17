import {
  handleGeminiImageGeneration,
  validateAntigravityReferences,
} from "@omniroute/open-sse/handlers/geminiImage.ts";
import { handleCodexImages, isCodexImagesModel } from "@omniroute/open-sse/handlers/codexImages.ts";
import { getImageModelEntry } from "@omniroute/open-sse/config/imageRegistry.ts";
import { validateCodexImageEditReferences } from "@/lib/images/imageRouteModel";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { refreshSelectedCodexImageCredentials } from "@/sse/services/selectedCodexImageCredentials";
import { runImageRequestWithAccounting } from "@/lib/usage/imageRequestAccounting";
import type { ImageComboDispatchResult } from "@omniroute/open-sse/services/imageCombo.ts";
import * as log from "@/sse/utils/logger";

export function validateCodexImagesEditOptions(ctx): string | null {
  if (
    ctx.hasMask ||
    Object.keys(ctx.nativeOptions ?? {}).some(
      (key) => !["n", "quality", "background"].includes(key)
    )
  )
    return "Unsupported Codex Images edit parameter; masks and output-format controls are not supported";
  const options = ctx.nativeOptions ?? {};
  if (options.n !== undefined && options.n !== 1) return "Codex Images supports n=1 only";
  if (options.quality !== undefined && !["low", "medium", "high", "auto"].includes(options.quality))
    return "Unsupported Codex Images quality";
  if (
    options.background !== undefined &&
    !["transparent", "opaque", "auto"].includes(options.background)
  )
    return "Unsupported Codex Images background";
  if (![null, undefined, "b64_json"].includes(ctx.responseFormat))
    return "Codex Images returns original b64_json only";
  if (
    ![null, undefined].includes(ctx.size) &&
    !/^(?:auto|[1-9]\d{0,4}x[1-9]\d{0,4})$/.test(ctx.size)
  )
    return "Invalid Codex Images size; use auto or WIDTHxHEIGHT";
  return validateCodexImageEditReferences(ctx.images, 5);
}

export async function dispatchCodexImagesEdit(
  target,
  credentials,
  ctx
): Promise<ImageComboDispatchResult> {
  const { parsed, providerConfig, modelStr } = target;
  const entry = getImageModelEntry(modelStr);
  const fail = (status, error) => ({ success: false as const, status, error, retryable: false });
  if (
    !entry ||
    entry.provider !== "codex" ||
    entry.model !== parsed.model ||
    !isCodexImagesModel(parsed.model)
  )
    return fail(400, "Unsupported dedicated Codex image edit model");
  const validation = validateCodexImagesEditOptions(ctx);
  if (validation) return fail(400, validation);
  const refreshed = await refreshSelectedCodexImageCredentials(credentials, ctx.request.signal);
  if (refreshed.success === false) return refreshed;
  const selected = refreshed.credentials;
  try {
    const proxyInfo = selected.connectionId
      ? await resolveProxyForConnection(selected.connectionId)
      : null;
    return await runWithProxyContext(proxyInfo?.proxy || null, () =>
      runImageRequestWithAccounting(
        {
          ...ctx.accounting,
          endpoint: "/v1/images/edits",
          provider: parsed.provider,
          model: parsed.model,
          credentials: selected,
          recordCallLog: true,
        },
        () =>
          handleCodexImages({
            provider: parsed.provider,
            model: parsed.model,
            providerConfig,
            body: {
              ...ctx.nativeOptions,
              prompt: ctx.prompt,
              size: ctx.size ?? undefined,
              response_format: ctx.responseFormat ?? undefined,
            },
            referenceImages: ctx.images,
            operation: "edits",
            credentials: selected,
            log,
            signal: ctx.request.signal,
          })
      )
    );
  } catch {
    return fail(
      503,
      "Codex Images edit proxy or transport failed; do not resubmit an unknown outcome"
    );
  }
}

export async function dispatchAntigravityEdit(target, credentials, ctx) {
  const { parsed, providerConfig, modelStr } = target;
  const entry = getImageModelEntry(modelStr);
  if (!entry || entry.provider !== "antigravity" || entry.model !== parsed.model)
    return { success: false, status: 400, error: "Unsupported Antigravity image edit model" };
  const validation = validateAntigravityReferences(ctx.images, ctx.hasMask);
  if (validation) return { success: false, status: 400, error: validation };
  let proxyInfo = null;
  if (credentials.connectionId)
    proxyInfo = await resolveProxyForConnection(credentials.connectionId);
  return runWithProxyContext(proxyInfo?.proxy || null, () =>
    handleGeminiImageGeneration({
      model: parsed.model,
      providerConfig,
      credentials,
      log,
      signal: ctx.request.signal,
      referenceImages: ctx.images,
      logPath: "/v1/images/edits",
      body: {
        model: modelStr,
        prompt: ctx.prompt,
        size: ctx.size,
        response_format: ctx.responseFormat ?? undefined,
        aspect_ratio: ctx.aspectRatio,
        image_size: ctx.imageSize,
        n: 1,
      },
    })
  );
}
