/**
 * TypeSafe System One passthrough.
 *
 * Forwards the JSON body as-is to https://api.typesafe.ai/v1/systemone and
 * returns the upstream status/body unchanged. Success logs usage from the
 * response `model` (versioned id) and prices input tokens only.
 */

import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";
import { calculateCostDetailed, computeCostFromPricing } from "@/lib/usage/costCalculator";
import { markAccountUnavailable as persistAccountUnavailable } from "../../src/sse/services/auth.ts";
import {
  JEV_DEFAULT_PRICING,
  TYPESAFE_PROVIDER_ID,
  TYPESAFE_SYSTEMONE_PATH,
  TYPESAFE_SYSTEMONE_URL,
  stripTypesafeModelPrefix,
} from "@/lib/providers/typesafe";

export interface SystemoneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
}

export interface SystemoneCallLogEntry {
  method: string;
  path: string;
  status: number;
  model: string;
  requestedModel: string | null;
  provider: string;
  duration: number;
  tokens: { input_tokens: number; output_tokens: number };
  connectionId: string | null;
  requestType: string;
  costUsd: number;
  error?: string;
}

export interface SystemoneProxyOptions {
  body: Record<string, unknown>;
  credentials: SystemoneCredentials | null;
  provider?: string;
  requestedModel?: string | null;
  fetchImpl?: typeof fetch;
  saveCallLog?: (entry: SystemoneCallLogEntry) => Promise<unknown> | unknown;
  markAccountUnavailable?: (
    connectionId: string,
    status: number,
    errorText: string,
    provider: string | null,
    model: string | null,
    providerProfile: null,
    options: { headers?: Headers | Record<string, string> | null }
  ) => Promise<unknown>;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function toFiniteNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

async function resolveSystemoneCost(
  provider: string,
  model: string,
  tokens: { input_tokens: number; output_tokens: number }
): Promise<number> {
  const fallback = computeCostFromPricing(JEV_DEFAULT_PRICING, tokens, { provider, model });
  try {
    const detailed = await calculateCostDetailed(provider, model, tokens);
    if (detailed.priced && detailed.costUsd > 0) return detailed.costUsd;
  } catch {
    // Tests and first-run DBs still price from the shipped Jev table.
  }
  return fallback;
}

export async function handleSystemOneProxy(options: SystemoneProxyOptions): Promise<Response> {
  const startTime = Date.now();
  const provider = options.provider || TYPESAFE_PROVIDER_ID;
  const token = options.credentials?.apiKey || options.credentials?.accessToken;
  const connectionId = options.credentials?.connectionId || null;
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const requestedModel =
    typeof options.requestedModel === "string" && options.requestedModel.trim()
      ? options.requestedModel.trim()
      : typeof options.body.model === "string"
        ? options.body.model
        : null;

  if (!token) {
    return errorResponse(401, `No credentials for provider: ${provider}`);
  }

  try {
    const res = await fetchImpl(TYPESAFE_SYSTEMONE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(options.body),
    });

    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    const parsedRecord = asRecord(parsed);
    const usageRecord = asRecord(parsedRecord?.usage);
    const responseModelRaw =
      typeof parsedRecord?.model === "string" && parsedRecord.model.trim()
        ? parsedRecord.model.trim()
        : requestedModel;
    const billedModel = responseModelRaw
      ? stripTypesafeModelPrefix(responseModelRaw)
      : "jev-latest";
    const inputTokens = toFiniteNumber(usageRecord?.input_tokens);
    const outputTokens = toFiniteNumber(usageRecord?.output_tokens);
    const tokens = { input_tokens: inputTokens, output_tokens: outputTokens };
    const costUsd = res.ok ? await resolveSystemoneCost(provider, billedModel, tokens) : 0;
    const duration = Date.now() - startTime;

    if (res.status === 429 && connectionId) {
      const markUnavailable = options.markAccountUnavailable ?? persistAccountUnavailable;
      try {
        await markUnavailable(
          connectionId,
          res.status,
          text.slice(0, 500),
          provider,
          billedModel,
          null,
          { headers: res.headers }
        );
      } catch {
        // Upstream response has priority over a best-effort cooldown write.
      }
    }

    const logEntry: SystemoneCallLogEntry = {
      method: "POST",
      path: TYPESAFE_SYSTEMONE_PATH,
      status: res.status,
      model: billedModel,
      requestedModel: requestedModel,
      provider,
      duration,
      tokens,
      connectionId,
      requestType: "systemone",
      costUsd,
      ...(res.ok
        ? {}
        : {
            error:
              (parsedRecord?.message as string | undefined) ||
              (asRecord(parsedRecord?.error)?.message as string | undefined) ||
              text.slice(0, 500),
          }),
    };
    const persistCallLog = options.saveCallLog ?? saveCallLog;
    Promise.resolve(persistCallLog(logEntry)).catch(() => {});

    const headers = new Headers({
      ...CORS_HEADERS,
      "Content-Type": res.headers.get("Content-Type") || "application/json",
    });
    const retryAfter = res.headers.get("retry-after") || res.headers.get("Retry-After");
    if (retryAfter) headers.set("retry-after", retryAfter);

    attachOmniRouteMetaHeaders(headers, {
      provider,
      model: billedModel,
      costUsd,
      latencyMs: duration,
      requestId: generateRequestId(),
    });

    if (parsed !== null) {
      return new Response(JSON.stringify(parsed), { status: res.status, headers });
    }
    return new Response(text, { status: res.status, headers });
  } catch (err) {
    const message = sanitizeErrorMessage(err) || "TypeSafe request failed";
    return errorResponse(500, message);
  }
}
