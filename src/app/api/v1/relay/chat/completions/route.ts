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
import { createHash } from "node:crypto";

const JSON_CORS_HEADERS = { ...CORS_HEADERS, "Content-Type": "application/json" } as const;

// Forensic-only sanitization: client IP / user-agent come from untrusted
// headers and feed `recordRelayUsage()` rows. Strip CR/LF so a malicious
// header cannot forge log lines, and cap length.
function sanitizeForensicHeader(value: string | null, max = 256): string {
  if (!value) return "unknown";
  return value.replace(/[\r\n]+/g, " ").slice(0, max);
}

const injectionGuard = createInjectionGuard();

export async function OPTIONS() {
  return handleCorsOptions();
}

function extractToken(request: Request): string | null {
  const auth = request.headers.get("authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (match) return match[1];

  // Also check X-Relay-Token header
  return request.headers.get("x-relay-token");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const clientIp = sanitizeForensicHeader(
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null
  );
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

    // 2. Rate limit check
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

    // Prompt injection guard (same as main endpoint)
    try {
      const body = await cloned.json().catch(() => null);
      if (body) {
        const { blocked, result } = injectionGuard(body);
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
          const model = (body as { model?: string }).model || "";
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
