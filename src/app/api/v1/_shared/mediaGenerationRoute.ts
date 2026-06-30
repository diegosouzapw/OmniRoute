import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { generateRequestId } from "@/shared/utils/requestId";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type MediaModelListEntry = {
  id: string;
  provider: string;
};

type MediaGenerationResult =
  | { success: true; data: unknown }
  | { success: false; error: unknown; status: number };

type MediaGenerationBody = {
  model: string;
  prompt?: unknown;
  duration?: unknown;
} & Record<string, unknown>;

type ValidatedMediaGenerationBody =
  | { ok: true; body: MediaGenerationBody }
  | { ok: false; response: Response };

export function mediaGenerationOptionsResponse() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export function mediaGenerationModelListResponse(
  models: MediaModelListEntry[],
  type: "music" | "video"
) {
  return new Response(
    JSON.stringify({
      object: "list",
      data: models.map((m) => ({
        id: m.id,
        object: "model",
        created: Math.floor(Date.now() / 1000),
        owned_by: m.provider,
        type,
      })),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function readMediaGenerationBody(
  request: Request,
  log: { warn: (scope: string, message: string) => void },
  logScope: string
): Promise<ValidatedMediaGenerationBody> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    log.warn(logScope, "Invalid JSON body");
    return { ok: false, response: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body") };
  }

  const validation = validateBody(v1ImageGenerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return {
      ok: false,
      response: errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message),
    };
  }

  return { ok: true, body: validation.data as MediaGenerationBody };
}

export function promptRequiredResponse(body: { prompt?: unknown }) {
  if (typeof body.prompt === "string" && body.prompt.trim().length > 0) {
    return null;
  }

  return errorResponse(HTTP_STATUS.BAD_REQUEST, "Prompt is required");
}

export async function successfulMediaGenerationResponse({
  result,
  billingMode,
  provider,
  model,
  startTime,
  duration,
}: {
  result: { data: unknown };
  billingMode: "audio" | "video";
  provider: string;
  model: string;
  startTime: number;
  duration: unknown;
}) {
  const seconds = Number(duration) || 0;
  const costUsd = await calculateModalCost(billingMode, provider, model, { seconds });
  const headers = new Headers({ "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider,
    model,
    costUsd,
    latencyMs: Date.now() - startTime,
    requestId: generateRequestId(),
  });

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers,
  });
}

export function failedMediaGenerationResponse(
  result: MediaGenerationResult,
  fallbackMessage: string
) {
  const errorPayload = toJsonErrorPayload(result.error, fallbackMessage);
  return new Response(JSON.stringify(errorPayload), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
