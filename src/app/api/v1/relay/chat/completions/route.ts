/**
 * POST /api/v1/relay/chat/completions
 *
 * Serverless Relay Proxy endpoint.
 * Authenticates via relay token, applies rate limits, then proxies
 * to the internal OmniRoute chat completions pipeline.
 */

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { handleChat } from "@/sse/handlers/chat";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { getRelayTokenByHash, checkRateLimit, recordRelayUsage } from "@/lib/db/relayProxies";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import {
  checkIpRateLimit,
  extractToken,
  getClientIp,
  hashToken,
  sanitizeForensicHeader,
} from "./relaySecurity";
import {
  getBifrostRoutingConfig,
  resolveRelayRoutingBackend,
  shouldTryBifrost,
  type BifrostRoutingConfig,
} from "./routingBackend";
import { finalizeReadableStream } from "./streamFinalizer";
import type { RelayToken } from "@/lib/db/relayProxies";

const JSON_CORS_HEADERS = { ...CORS_HEADERS, "Content-Type": "application/json" } as const;

const injectionGuard = createInjectionGuard();

type RelayUsageStatus = "success" | "error";

function recordUsage(
  tokenId: string,
  request: Request,
  startTime: number,
  clientIp: string,
  userAgent: string | null,
  status: RelayUsageStatus,
  statusCode: number
) {
  recordRelayUsage(tokenId, {
    requestId: request.headers.get("x-request-id") || undefined,
    status,
    statusCode,
    latencyMs: Date.now() - startTime,
    clientIp,
    userAgent,
  });
}

async function forwardToBifrost(
  request: Request,
  body: unknown,
  token: RelayToken,
  config: BifrostRoutingConfig,
  startTime: number,
  clientIp: string,
  userAgent: string | null
): Promise<Response> {
  const wantsStream =
    Boolean((body as { stream?: boolean } | null)?.stream) && config.streamingEnabled;
  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "x-relay-token-id": token.id,
    "x-relay-client-ip": clientIp,
  };
  if (config.apiKey) {
    upstreamHeaders.Authorization = `Bearer ${config.apiKey}`;
  }

  const ac = new AbortController();
  let timedOut = false;
  const tid = setTimeout(() => {
    timedOut = true;
    ac.abort();
  }, config.timeoutMs);

  try {
    const upstream = await fetch(`${config.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    clearTimeout(tid);

    const headers = new Headers(upstream.headers);
    headers.set("X-Routed-By", "bifrost");
    headers.set("X-Routing-Backend", "bifrost");
    headers.set("X-Relay-Token", token.tokenPrefix + "...");
    if (!wantsStream) {
      headers.set("Content-Type", upstream.headers.get("Content-Type") ?? "application/json");
    }

    if (wantsStream && upstream.body) {
      const stream = finalizeReadableStream(upstream.body, (error) => {
        recordUsage(
          token.id,
          request,
          startTime,
          clientIp,
          userAgent,
          error || upstream.status >= 500 ? "error" : "success",
          upstream.status
        );
      });

      return new Response(stream, {
        status: upstream.status,
        headers,
      });
    }

    recordUsage(
      token.id,
      request,
      startTime,
      clientIp,
      userAgent,
      upstream.status < 500 ? "success" : "error",
      upstream.status
    );

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (error) {
    clearTimeout(tid);
    const isAbort = error instanceof Error && error.name === "AbortError";
    throw new Error(
      isAbort
        ? `Bifrost sidecar timed out after ${config.timeoutMs}ms`
        : `Bifrost sidecar unreachable: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const clientIp = getClientIp(request);
  const userAgent = sanitizeForensicHeader(request.headers.get("user-agent"));

  try {
    // 1. Authenticate
    const rawToken = extractToken(request);
    if (!rawToken) {
      return new Response(JSON.stringify(buildErrorBody(401, "Missing relay token")), {
        status: 401,
        headers: JSON_CORS_HEADERS,
      });
    }

    const tokenHash = hashToken(rawToken);
    const token = getRelayTokenByHash(tokenHash);
    if (!token) {
      recordRelayUsage("unknown", {
        requestId: request.headers.get("x-request-id") || undefined,
        status: "auth_failed",
        statusCode: 401,
        latencyMs: Date.now() - startTime,
        clientIp,
        userAgent,
      });
      return new Response(JSON.stringify(buildErrorBody(401, "Invalid relay token")), {
        status: 401,
        headers: JSON_CORS_HEADERS,
      });
    }

    // Check expiration
    if (token.expiresAt && Math.floor(Date.now() / 1000) > token.expiresAt) {
      return new Response(JSON.stringify(buildErrorBody(401, "Relay token expired")), {
        status: 401,
        headers: JSON_CORS_HEADERS,
      });
    }

    // 2a. Per-(token,IP) gate — bounds the blast radius of a leaked token.
    const ipCheck = checkIpRateLimit(token.id, clientIp);
    if (!ipCheck.allowed) {
      recordRelayUsage(token.id, {
        requestId: request.headers.get("x-request-id") || undefined,
        status: "rate_limited",
        statusCode: 429,
        latencyMs: Date.now() - startTime,
        clientIp,
        userAgent,
      });
      return new Response(JSON.stringify(buildErrorBody(429, "Per-IP rate limit exceeded")), {
        status: 429,
        headers: {
          ...JSON_CORS_HEADERS,
          "Retry-After": String(ipCheck.resetIn),
          "X-RateLimit-Scope": "ip",
        },
      });
    }

    // 2b. Per-token rate limit check
    const rateCheck = checkRateLimit(token.id);
    if (!rateCheck.allowed) {
      recordRelayUsage(token.id, {
        requestId: request.headers.get("x-request-id") || undefined,
        status: "rate_limited",
        statusCode: 429,
        latencyMs: Date.now() - startTime,
        clientIp,
        userAgent,
      });
      return new Response(JSON.stringify(buildErrorBody(429, "Rate limit exceeded")), {
        status: 429,
        headers: {
          ...JSON_CORS_HEADERS,
          "Retry-After": String(rateCheck.resetIn),
          "X-RateLimit-Remaining": "0",
        },
      });
    }

    // 3. Clone request and forward to internal handler
    const cloned = request.clone();

    let parsedBody: unknown = null;

    // Prompt injection guard (same as main endpoint)
    try {
      parsedBody = await cloned.json().catch(() => null);
      if (parsedBody) {
        const { blocked, result } = injectionGuard(parsedBody);
        if (blocked) {
          recordRelayUsage(token.id, {
            requestId: request.headers.get("x-request-id") || undefined,
            status: "error",
            statusCode: 400,
            latencyMs: Date.now() - startTime,
            clientIp,
            userAgent,
          });
          const injectionBody = buildErrorBody(
            400,
            "Request blocked: potential prompt injection detected"
          );
          return new Response(
            JSON.stringify({
              ...injectionBody,
              detections: result.detections.length,
            }),
            { status: 400, headers: JSON_CORS_HEADERS }
          );
        }

        // Check allowed models
        const allowedModels: string[] = JSON.parse(token.allowedModels);
        if (allowedModels.length > 0 && !allowedModels.includes("*")) {
          const model = (parsedBody as { model?: string }).model || "";
          const allowed = allowedModels.some(
            (p) => model === p || (p.endsWith("*") && model.startsWith(p.slice(0, -1)))
          );
          if (!allowed) {
            // Echo the requested model string back through buildErrorBody so any
            // accidental path/stack leakage in `model` is sanitized.
            return new Response(
              JSON.stringify(
                buildErrorBody(403, `Model "${model}" not allowed by this relay token`)
              ),
              { status: 403, headers: JSON_CORS_HEADERS }
            );
          }
        }
      }
    } catch {
      // Continue even if guard fails
    }

    const backend = resolveRelayRoutingBackend();
    const bifrostConfig = getBifrostRoutingConfig();
    if (shouldTryBifrost(backend, bifrostConfig)) {
      try {
        return await forwardToBifrost(
          request,
          parsedBody,
          token,
          bifrostConfig,
          startTime,
          clientIp,
          userAgent
        );
      } catch (error) {
        if (backend === "bifrost") {
          recordUsage(token.id, request, startTime, clientIp, userAgent, "error", 502);
          return new Response(
            JSON.stringify(
              buildErrorBody(502, error instanceof Error ? error.message : String(error))
            ),
            {
              status: 502,
              headers: {
                ...JSON_CORS_HEADERS,
                "X-Bifrost-Fallback": "/api/v1/relay/chat/completions",
              },
            }
          );
        }
      }
    }

    // 4. Proxy to internal handler
    const originalRequest = new Request(
      request.url.replace("/relay/chat/completions", "/chat/completions"),
      request
    );
    const response = await handleChat(originalRequest);

    // 5. Record usage (async, don't block response)
    const latencyMs = Date.now() - startTime;
    recordRelayUsage(token.id, {
      requestId: request.headers.get("x-request-id") || undefined,
      status: response.status < 500 ? "success" : "error",
      statusCode: response.status,
      latencyMs,
      clientIp,
      userAgent,
    });

    // Add relay headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Relay-Token", token.tokenPrefix + "...");
    newHeaders.set("X-Routing-Backend", "ts");
    if (backend === "auto" && bifrostConfig?.enabled) {
      newHeaders.set("X-Routing-Fallback", "bifrost");
    }

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error) {
    // buildErrorBody() routes through sanitizeErrorMessage(), which strips
    // stack traces and absolute file paths. Hard rule #12.
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify(buildErrorBody(500, message)), {
      status: 500,
      headers: JSON_CORS_HEADERS,
    });
  }
}
