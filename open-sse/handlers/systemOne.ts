/**
 * System One proxy (TypeSafe Jev and future System One models).
 *
 * System One models do not generate text: the client sends `state` plus typed
 * `questions` (noul / choice / score) and gets typed answers with
 * probabilities. OpenRouter serves them at `/api/v1/systemone` with the
 * TypeSafe request/response shape, maps bare ids (`jev-latest`) onto its
 * `typesafe/` namespace, and reports the exact USD cost in `usage.cost`.
 * See https://openrouter.ai/docs/guides/community/typesafe-sdk.
 */

import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog, saveRequestUsage } from "@/lib/usageDb";
import { recordCost } from "@/domain/costRules";
import { markAccountUnavailable } from "../../src/sse/services/auth.ts";

export const SYSTEMONE_PROVIDER_ID = "openrouter";
export const SYSTEMONE_UPSTREAM_URL = "https://openrouter.ai/api/v1/systemone";

export interface SystemOneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
}

export interface SystemOneProxyOptions {
  body: Record<string, unknown>;
  credentials: SystemOneCredentials | null;
  /** `typesafe/<id>` form used for API-key policy, cooldown and cost attribution. */
  canonicalModel?: string | null;
  apiKeyInfo?: { id?: string | null; name?: string | null } | null;
}

/**
 * Bare TypeSafe ids (`jev-latest`) and OpenRouter's alias spelling
 * (`~typesafe/jev-latest`) name the same model upstream; normalize both to
 * `typesafe/<id>` so one allow/deny rule covers every spelling.
 */
export function canonicalSystemOneModel(model: string): string {
  const trimmed = model.trim().replace(/^~/, "");
  return trimmed.includes("/") ? trimmed : `typesafe/${trimmed}`;
}

// 422 is a request-shape error from the caller, not a fault of the connection.
function shouldCoolDownConnection(status: number): boolean {
  return status === 401 || status === 403 || status === 429 || status >= 500;
}

type SystemOneUpstreamBody = {
  model?: string;
  usage?: { input_tokens?: number; output_tokens?: number; cost?: number };
  message?: string;
  error?: { message?: string } | string;
};

type SystemOneCall = {
  startTime: number;
  connectionId: string | null;
  requestedModel: string | null;
  canonicalModel: string | null;
  apiKeyInfo: SystemOneProxyOptions["apiKeyInfo"];
};

type SystemOneUsage = { model: string; inputTokens: number; outputTokens: number };

function parseUpstreamBody(text: string): SystemOneUpstreamBody | null {
  try {
    const parsed: unknown = text ? JSON.parse(text) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as SystemOneUpstreamBody)
      : null;
  } catch {
    return null;
  }
}

function readUsage(parsed: SystemOneUpstreamBody | null, call: SystemOneCall): SystemOneUsage {
  return {
    model: parsed?.model || call.requestedModel || "systemone",
    inputTokens: Number(parsed?.usage?.input_tokens) || 0,
    outputTokens: Number(parsed?.usage?.output_tokens) || 0,
  };
}

function upstreamErrorMessage(parsed: SystemOneUpstreamBody | null, status: number): string {
  const nested = typeof parsed?.error === "string" ? parsed.error : parsed?.error?.message;
  return parsed?.message || nested || `Provider returned HTTP ${status}`;
}

function logCall(call: SystemOneCall, status: number, usage: SystemOneUsage, error?: string) {
  saveCallLog({
    method: "POST",
    path: "/v1/systemone",
    status,
    model: usage.model,
    requestedModel: call.requestedModel,
    provider: SYSTEMONE_PROVIDER_ID,
    duration: Date.now() - call.startTime,
    tokens: { prompt_tokens: usage.inputTokens, completion_tokens: usage.outputTokens },
    connectionId: call.connectionId,
    requestType: "systemone",
    apiKeyId: call.apiKeyInfo?.id || undefined,
    apiKeyName: call.apiKeyInfo?.name || undefined,
    ...(error ? { error } : {}),
  }).catch(() => {});
}

async function upstreamFailure(
  call: SystemOneCall,
  res: Response,
  parsed: SystemOneUpstreamBody | null
): Promise<Response> {
  const message = upstreamErrorMessage(parsed, res.status);
  logCall(call, res.status, readUsage(parsed, call), message);
  if (call.connectionId && shouldCoolDownConnection(res.status)) {
    try {
      await markAccountUnavailable(
        call.connectionId,
        res.status,
        message,
        SYSTEMONE_PROVIDER_ID,
        call.canonicalModel,
        null,
        { headers: res.headers }
      );
    } catch {
      // The upstream response has priority over a best-effort cooldown write.
    }
  }
  const response = errorResponse(res.status, message);
  const retryAfter = res.headers.get("retry-after");
  if (retryAfter) response.headers.set("retry-after", retryAfter);
  return response;
}

function recordSuccess(call: SystemOneCall, usage: SystemOneUsage, costUsd: number) {
  logCall(call, 200, usage);
  const apiKeyId = call.apiKeyInfo?.id || undefined;
  saveRequestUsage({
    provider: SYSTEMONE_PROVIDER_ID,
    model: usage.model,
    tokens: { prompt_tokens: usage.inputTokens, completion_tokens: usage.outputTokens },
    status: "200",
    success: true,
    latencyMs: Date.now() - call.startTime,
    connectionId: call.connectionId || undefined,
    apiKeyId,
    apiKeyName: call.apiKeyInfo?.name || undefined,
    endpoint: "/v1/systemone",
  }).catch(() => {});
  if (apiKeyId && costUsd > 0) {
    recordCost(apiKeyId, costUsd, {
      provider: SYSTEMONE_PROVIDER_ID,
      model: usage.model,
      tokens: { input: usage.inputTokens, output: usage.outputTokens },
      success: true,
    });
  }
}

function successResponse(
  text: string,
  call: SystemOneCall,
  usage: SystemOneUsage,
  costUsd: number
) {
  const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider: SYSTEMONE_PROVIDER_ID,
    model: usage.model,
    costUsd,
    latencyMs: Date.now() - call.startTime,
    requestId: generateRequestId(),
    usage: { prompt_tokens: usage.inputTokens, completion_tokens: usage.outputTokens },
  });
  return new Response(text, { status: 200, headers });
}

function describeCall(options: SystemOneProxyOptions): SystemOneCall {
  const requestedModel = typeof options.body.model === "string" ? options.body.model : null;
  return {
    startTime: Date.now(),
    connectionId: options.credentials?.connectionId || null,
    requestedModel,
    canonicalModel:
      options.canonicalModel || (requestedModel ? canonicalSystemOneModel(requestedModel) : null),
    apiKeyInfo: options.apiKeyInfo,
  };
}

export async function handleSystemOneProxy(options: SystemOneProxyOptions): Promise<Response> {
  const token = options.credentials?.apiKey || options.credentials?.accessToken;
  if (!token) {
    return errorResponse(401, `No credentials for provider: ${SYSTEMONE_PROVIDER_ID}`);
  }
  const call = describeCall(options);

  try {
    const res = await fetch(SYSTEMONE_UPSTREAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(options.body),
    });
    const text = await res.text();
    const parsed = parseUpstreamBody(text);

    if (!res.ok) return upstreamFailure(call, res, parsed);
    if (!parsed) {
      return errorResponse(502, "System One upstream returned an invalid response body");
    }

    const usage = readUsage(parsed, call);
    const costUsd = Number(parsed.usage?.cost) || 0;
    recordSuccess(call, usage, costUsd);
    return successResponse(text, call, usage, costUsd);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return errorResponse(500, `System One request failed: ${message}`);
  }
}
