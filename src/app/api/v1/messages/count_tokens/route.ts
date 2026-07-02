import { CORS_HEADERS } from "@/shared/utils/cors";
import { v1CountTokensSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { countTextTokens } from "@/shared/utils/tiktokenCounter";
import { getExecutor } from "@omniroute/open-sse/executors/index.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { getModelInfo } from "@/sse/services/model";
import { extractApiKey, getProviderCredentials, isValidApiKey } from "@/sse/services/auth";
import { safeResolveProxy } from "@/sse/handlers/chatHelpers";
import * as log from "@/sse/utils/logger";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * POST /v1/messages/count_tokens - Hybrid token count response.
 * Uses real provider-side count when supported, falling back to estimation.
 */
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  const validation = validateBody(v1CountTokensSchema, rawBody);
  if (isValidationFailure(validation)) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
  const body = validation.data;

  const estimated = buildEstimatedCountResponse(body);
  const requestedModel = typeof body.model === "string" ? body.model : "";
  if (!requestedModel) {
    return estimated;
  }

  try {
    const modelInfo = await getModelInfo(requestedModel);
    if (!modelInfo?.provider || !modelInfo?.model) {
      return estimated;
    }

    const credentials = await getProviderCredentials(
      modelInfo.provider,
      null,
      null,
      modelInfo.model
    );
    if (!credentials || credentials.allRateLimited) {
      return estimated;
    }

    const executor = getExecutor(modelInfo.provider);
    // The provider-side count is a real upstream call — it must honor the
    // connection's proxy assignment exactly like chat execution does.
    const proxyInfo = await safeResolveProxy(credentials.connectionId);
    const counted = await runWithProxyContext(proxyInfo?.proxy || null, () =>
      executor?.countTokens?.({
        model: modelInfo.model,
        body,
        credentials,
        log,
      })
    );

    if (!counted || !Number.isFinite(counted.input_tokens)) {
      return estimated;
    }

    return new Response(
      JSON.stringify({
        input_tokens: counted.input_tokens,
        model: modelInfo.model,
        provider: modelInfo.provider,
        source: counted.source || "provider",
      }),
      {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  } catch (error) {
    log.debug(
      "COUNT_TOKENS",
      `Falling back to estimate for ${requestedModel}: ${error instanceof Error ? error.message : String(error)}`
    );
    return estimated;
  }
}

function buildEstimatedCountResponse(body) {
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  let inputTokens = 0;

  for (const msg of messages) {
    if (typeof msg?.content === "string") {
      inputTokens += countTextTokens(msg.content);
      continue;
    }

    if (Array.isArray(msg?.content)) {
      for (const part of msg.content) {
        if (part?.type === "text" && typeof part.text === "string") {
          inputTokens += countTextTokens(part.text);
        }
      }
    }
  }

  if (typeof body?.system === "string") {
    inputTokens += countTextTokens(body.system);
  }

  return new Response(
    JSON.stringify({
      input_tokens: inputTokens,
      source: "local",
    }),
    {
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}
