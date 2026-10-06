/**
 * Jina Foundation API proxy.
 *
 * Forwards classify / segment (and similar JSON POSTs) to Jina using the same
 * dashboard-or-env credentials as embeddings and rerank.
 */

import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { saveCallLog } from "@/lib/usageDb";

export interface JinaFoundationCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
}

export interface JinaFoundationProxyOptions {
  path: string;
  upstreamUrl: string;
  body: Record<string, unknown>;
  credentials: JinaFoundationCredentials | null;
  provider?: string;
  model?: string | null;
}

export async function handleJinaFoundationProxy(
  options: JinaFoundationProxyOptions
): Promise<Response> {
  const startTime = Date.now();
  const provider = options.provider || "jina-ai";
  const token = options.credentials?.apiKey || options.credentials?.accessToken;
  const connectionId = options.credentials?.connectionId || null;

  if (!token) {
    return errorResponse(401, `No credentials for Jina provider: ${provider}`);
  }

  try {
    const res = await fetch(options.upstreamUrl, {
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
      parsed = { error: text.slice(0, 500) };
    }

    saveCallLog({
      method: "POST",
      path: options.path,
      status: res.status,
      model: options.model || `${provider}${options.path}`,
      provider,
      duration: Date.now() - startTime,
      tokens: { prompt_tokens: 0, completion_tokens: 0 },
      connectionId,
      ...(res.ok
        ? {}
        : {
            error:
              (parsed as { message?: string; error?: { message?: string } } | null)?.message ||
              (parsed as { error?: { message?: string } } | null)?.error?.message ||
              text.slice(0, 500),
          }),
    }).catch(() => {});

    if (!res.ok) {
      const err = parsed as { message?: string; error?: { message?: string } | string } | null;
      const message =
        err?.message ||
        (typeof err?.error === "string" ? err.error : err?.error?.message) ||
        `Provider returned HTTP ${res.status}`;
      return errorResponse(res.status, message);
    }

    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider,
      model: options.model || provider,
      costUsd: 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify(parsed), { status: 200, headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return errorResponse(500, `Jina request failed: ${message}`);
  }
}
