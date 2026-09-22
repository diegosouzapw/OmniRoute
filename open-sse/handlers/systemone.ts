/** TypeSafe System One and model-list passthrough transport. */

import { CORS_HEADERS } from "../utils/cors.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { recordCost as persistApiKeyCost } from "@/domain/costRules";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";
import { calculateCostDetailed, computeCostFromPricing } from "@/lib/usage/costCalculator";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { markAccountUnavailable as persistAccountUnavailable } from "../../src/sse/services/auth.ts";
import { runWithProxyContext } from "../utils/proxyFetch.ts";
import {
  JEV_DEFAULT_MODEL,
  JEV_DEFAULT_PRICING,
  TYPESAFE_MODELS_PATH,
  TYPESAFE_MODELS_URL,
  TYPESAFE_PROVIDER_ID,
  TYPESAFE_REQUEST_TIMEOUT_MS,
  TYPESAFE_SYSTEMONE_PATH,
  TYPESAFE_SYSTEMONE_URL,
  stripTypesafeModelPrefix,
} from "@/lib/providers/typesafe";

export interface TypeSafeCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  allExpired?: boolean;
}

interface TypeSafeProxyOptions {
  credentials: TypeSafeCredentials | null;
  provider?: string;
  requestedModel?: string | null;
  signal?: AbortSignal;
  timeoutMs?: number;
  forwardedHeaders?: Record<string, string>;
  fetchImpl?: typeof fetch;
  saveCallLogImpl?: typeof saveCallLog;
  recordCostImpl?: typeof persistApiKeyCost;
  markAccountUnavailableImpl?: typeof persistAccountUnavailable;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
}

export interface SystemOneProxyOptions extends TypeSafeProxyOptions {
  body: Record<string, unknown>;
}

export type TypeSafeModelsProxyOptions = TypeSafeProxyOptions;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function finiteNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function typeSafeErrorMessage(parsed: unknown, fallback: string): string {
  const record = asRecord(parsed);
  const detail = asRecord(record?.detail);
  const error = asRecord(record?.error);
  const candidate = detail?.message ?? record?.message ?? error?.message;
  return typeof candidate === "string" && candidate.trim() ? candidate : fallback;
}

export function typeSafeErrorResponse(
  status: number,
  errorType: string,
  message: string
): Response {
  return Response.json(
    { detail: { error_type: errorType, message } },
    { status, headers: CORS_HEADERS }
  );
}

function responseHeaders(upstream: Response): Headers {
  const headers = new Headers({ ...CORS_HEADERS });
  headers.set("Content-Type", upstream.headers.get("content-type") || "application/json");
  for (const [name, value] of upstream.headers.entries()) {
    const normalized = name.toLowerCase();
    if (
      normalized === "retry-after" ||
      normalized === "retry-after-ms" ||
      normalized === "x-typesafe-request-id" ||
      normalized.startsWith("x-ratelimit-")
    ) {
      headers.set(name, value);
    }
  }
  return headers;
}

async function systemOneCost(
  provider: string,
  model: string,
  tokens: { input_tokens: number; output_tokens: number }
): Promise<number> {
  const fallback = computeCostFromPricing(JEV_DEFAULT_PRICING, tokens, { provider, model });
  const detailed = await calculateCostDetailed(provider, model, tokens).catch(() => ({
    costUsd: 0,
    priced: false,
  }));
  return detailed.priced ? detailed.costUsd : fallback;
}

function requestSignal(
  callerSignal: AbortSignal | undefined,
  timeoutMs: number
): { signal: AbortSignal; cleanup: () => void; timedOut: () => boolean } {
  const controller = new AbortController();
  let timeoutTriggered = false;
  const onCallerAbort = () => controller.abort(callerSignal?.reason);
  callerSignal?.addEventListener("abort", onCallerAbort, { once: true });
  if (callerSignal?.aborted) onCallerAbort();
  const timer = setTimeout(() => {
    timeoutTriggered = true;
    controller.abort(new Error("TypeSafe request timed out"));
  }, timeoutMs);
  return {
    signal: controller.signal,
    timedOut: () => timeoutTriggered,
    cleanup: () => {
      clearTimeout(timer);
      callerSignal?.removeEventListener("abort", onCallerAbort);
    },
  };
}

async function proxyTypeSafe(
  method: "GET" | "POST",
  path: string,
  url: string,
  options: TypeSafeProxyOptions & { body?: Record<string, unknown> }
): Promise<Response> {
  const startedAt = Date.now();
  const provider = options.provider || TYPESAFE_PROVIDER_ID;
  const token = options.credentials?.apiKey || options.credentials?.accessToken;
  const connectionId = options.credentials?.connectionId || null;
  const requestedModel = options.requestedModel || null;
  if (!token) {
    return typeSafeErrorResponse(401, "authentication_error", `No credentials for ${provider}`);
  }

  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const timeout = requestSignal(options.signal, options.timeoutMs ?? TYPESAFE_REQUEST_TIMEOUT_MS);
  try {
    const doFetch = () =>
      fetchImpl(url, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...options.forwardedHeaders,
          ...(options.body ? { "Content-Type": "application/json" } : {}),
        },
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
        signal: timeout.signal,
      });
    const proxyInfo =
      connectionId && !options.fetchImpl ? await resolveProxyForConnection(connectionId) : null;
    const upstream = proxyInfo?.proxy
      ? await runWithProxyContext(proxyInfo.proxy, doFetch)
      : await doFetch();
    const text = await upstream.text();
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    const record = asRecord(parsed);
    const usage = asRecord(record?.usage);
    const responseModel =
      typeof record?.model === "string" && record.model.trim()
        ? stripTypesafeModelPrefix(record.model)
        : requestedModel
          ? stripTypesafeModelPrefix(requestedModel)
          : JEV_DEFAULT_MODEL;
    const tokens = {
      input_tokens: finiteNumber(usage?.input_tokens),
      output_tokens: finiteNumber(usage?.output_tokens),
    };
    const costUsd =
      upstream.ok && path === TYPESAFE_SYSTEMONE_PATH
        ? await systemOneCost(provider, responseModel, tokens)
        : 0;
    const duration = Date.now() - startedAt;
    const requestId = generateRequestId();

    if (upstream.ok && costUsd > 0 && options.apiKeyId) {
      const recordCost = options.recordCostImpl ?? persistApiKeyCost;
      try {
        recordCost(options.apiKeyId, costUsd, {
          provider,
          model: responseModel,
          tokens,
          success: true,
          timestamp: new Date().toISOString(),
          requestId,
        });
      } catch {
        // Usage accounting must not replace a successful upstream response.
      }
    }

    if ([401, 403, 429].includes(upstream.status) && connectionId) {
      const markUnavailable = options.markAccountUnavailableImpl ?? persistAccountUnavailable;
      await markUnavailable(
        connectionId,
        upstream.status,
        text.slice(0, 500),
        provider,
        responseModel,
        null,
        { headers: upstream.headers }
      ).catch(() => {});
    }

    const persistLog = options.saveCallLogImpl ?? saveCallLog;
    persistLog({
      method,
      path,
      status: upstream.status,
      model: responseModel,
      requestedModel,
      provider,
      duration,
      tokens,
      connectionId,
      apiKeyId: options.apiKeyId || undefined,
      apiKeyName: options.apiKeyName || undefined,
      requestType: path === TYPESAFE_SYSTEMONE_PATH ? "systemone" : "models",
      costUsd,
      upstreamRequestId: upstream.headers.get("x-typesafe-request-id") || undefined,
      ...(upstream.ok
        ? {}
        : { error: typeSafeErrorMessage(parsed, text.slice(0, 500) || `HTTP ${upstream.status}`) }),
    }).catch(() => {});

    const headers = responseHeaders(upstream);
    attachOmniRouteMetaHeaders(headers, {
      provider,
      model: responseModel,
      costUsd,
      latencyMs: duration,
      requestId,
    });
    return new Response(text, { status: upstream.status, headers });
  } catch (error) {
    if (options.signal?.aborted) {
      return typeSafeErrorResponse(499, "request_aborted", "Request aborted by caller");
    }
    if (timeout.timedOut()) {
      return typeSafeErrorResponse(504, "timeout_error", "TypeSafe request timed out");
    }
    const message = sanitizeErrorMessage(error) || "TypeSafe request failed";
    return typeSafeErrorResponse(502, "connection_error", message);
  } finally {
    timeout.cleanup();
  }
}

export async function handleSystemOneProxy(options: SystemOneProxyOptions): Promise<Response> {
  return proxyTypeSafe("POST", TYPESAFE_SYSTEMONE_PATH, TYPESAFE_SYSTEMONE_URL, options);
}

export async function handleTypeSafeModelsProxy(
  options: TypeSafeModelsProxyOptions
): Promise<Response> {
  return proxyTypeSafe("GET", TYPESAFE_MODELS_PATH, TYPESAFE_MODELS_URL, options);
}
