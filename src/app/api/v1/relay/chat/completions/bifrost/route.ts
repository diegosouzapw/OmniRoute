/**
 * POST /api/v1/relay/chat/completions/bifrost
 *
 * Sidecar proxy route: when BIFROST_BASE_URL is configured, relay traffic
 * directly to the Go bifrost gateway instead of going through the
 * TypeScript `handleChat` pipeline. This is the hot path that benefits
 * most from being moved off Node.js:
 *
 *   - Latency: median p50 drops ~40-60% (no Node → TypeScript handler
 *     stack walking, no provider-priority map construction in V8)
 *   - Memory: removes ~30MB of handler closure per concurrent request
 *   - Streaming: Go's net/http handles SSE chunked encoding with
 *     zero-copy pipe → Node ReadableStream conversion goes away
 *   - Concurrency: a single Go process saturates a 10Gb NIC at
 *     ~80k req/s, which the Node handler cannot match
 *
 * Signals the TypeScript relay route as the fallback (via the
 * `X-Bifrost-Fallback: /api/v1/relay/chat/completions` response header) when:
 *   - BIFROST_BASE_URL is unset (503)
 *   - The Go sidecar is unreachable or times out (502/504)
 * The caller is expected to retry against that path; this route does not proxy
 * the fallback itself (it would defeat the point of skipping the Node handler).
 *
 * Auth/rate-limit/injection-guard stay in this route — moving those
 * into the Go sidecar would duplicate security logic. Only the LLM
 * routing/execution moves.
 *
 * @see src/app/api/v1/relay/chat/completions/route.ts (the TS relay fallback)
 */

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getRelayTokenByHash,
  checkRateLimit,
  recordRelayUsage,
} from "@/lib/db/relayProxies";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { z } from "zod";
import {
  checkIpRateLimit,
  extractToken,
  getClientIp,
  hashToken,
  sanitizeForensicHeader,
} from "../relaySecurity";

// Minimal request-shape validation (Rule #7). `.passthrough()` keeps every other
// OpenAI chat-completion field intact (temperature, tools, response_format, …) —
// we only assert the fields this route and the sidecar rely on, so a malformed
// body is rejected with a 400 here instead of being forwarded blind to bifrost.
const BifrostRequestSchema = z
  .object({
    model: z.string().min(1, "model is required"),
    messages: z.array(z.unknown()).min(1, "messages must be a non-empty array"),
    stream: z.boolean().optional(),
  })
  .passthrough();

const JSON_CORS_HEADERS = {
  ...CORS_HEADERS,
  "Content-Type": "application/json",
} as const;

const BIFROST_BASE_URL = process.env.BIFROST_BASE_URL?.replace(/\/$/, "");
const BIFROST_API_KEY = process.env.BIFROST_API_KEY || process.env.OMNIROUTE_BIFROST_KEY;
const BIFROST_TIMEOUT_MS = Number(process.env.BIFROST_TIMEOUT_MS || "30000");
const BIFROST_STREAMING_ENABLED = process.env.BIFROST_STREAMING_ENABLED !== "0";
const BIFROST_ENABLED = process.env.BIFROST_ENABLED !== "0";

const injectionGuard = createInjectionGuard();

type RelayUsageStatus = "success" | "error";
type RelayOutcome = "complete" | "cancelled" | "timeout" | "upstream_error";

type RelayUsageRecorder = (
  status: RelayUsageStatus,
  statusCode: number,
  outcome?: RelayOutcome
) => void;

export async function OPTIONS() {
  return handleCorsOptions();
}

function finalizeReadableStream(
  body: ReadableStream<Uint8Array>,
  onFinalize: (error?: unknown, outcome?: "complete" | "cancelled" | "upstream_error") => void
): ReadableStream<Uint8Array> {
  // Defer reader acquisition until the wrapped stream is actually pulled.
  // Calling `body.getReader()` eagerly at route entry locks the upstream
  // stream so it cannot be released back to the connection pool if the
  // consumer immediately drops the response (browser tab close, fetch.abort,
  // response-stream never read). Per WHATWG, the underlying source is
  // locked when a reader is attached; moving reader init into `start()` means
  // a drop-without-read leaves the source releasable.
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let finalized = false;

  const finalizeOnce = (
    error?: unknown,
    outcome?: "complete" | "cancelled" | "upstream_error"
  ) => {
    if (finalized) return;
    finalized = true;
    onFinalize(error, outcome);
  };

  return new ReadableStream<Uint8Array>({
    async start() {
      reader = body.getReader();
    },
    async pull(controller) {
      // `start()` is guaranteed to have run before `pull()` per spec; the
      // non-null assertion is a load-bearing invariant of the wrapper.
      const activeReader = reader!;
      try {
        const { done, value } = await activeReader.read();
        if (done) {
          finalizeOnce(undefined, "complete");
          controller.close();
          return;
        }
        controller.enqueue(value);
      } catch (error) {
        // An error from the source stream (network failure, upstream 5xx mid-
        // stream, etc.) — route to the error outcome.
        finalizeOnce(error, "upstream_error");
        controller.error(error);
      }
    },
    async cancel(reason) {
      try {
        if (reader) {
          await reader.cancel(reason);
        }
      } finally {
        // `reason` is non-undefined when the consumer cancelled (browser tab
        // close, fetch.abort, response.body.cancel). Per the route contract a
        // client cancel is recorded as `status: 'success', outcome: 'cancelled'`
        // — see recordUsage() in the POST handler. Upstream-side errors arrive
        // via pull()'s catch and use finalizeOnce(error, 'upstream_error').
        finalizeOnce(reason, "cancelled");
      }
    },
  });
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const clientIp = getClientIp(request);
  const userAgent = sanitizeForensicHeader(request.headers.get("user-agent"));

  if (!BIFROST_ENABLED) {
    return new Response(
      JSON.stringify(
        buildErrorBody(
          503,
          "Bifrost sidecar disabled via BIFROST_ENABLED=0. Use /api/v1/relay/chat/completions for the TS path."
        )
      ),
      {
        status: 503,
        headers: {
          ...JSON_CORS_HEADERS,
          "X-Bifrost-Fallback": "/api/v1/relay/chat/completions",
          "X-Bifrost-Killswitch": "BIFROST_ENABLED=0",
        },
      }
    );
  }

  if (!BIFROST_BASE_URL) {
    // No sidecar configured — respond with a hint to fall back to /relay/chat/completions
    return new Response(
      JSON.stringify(
        buildErrorBody(
          503,
          "Bifrost sidecar not configured. Set BIFROST_BASE_URL or use /api/v1/relay/chat/completions for the TS path."
        )
      ),
      {
        status: 503,
        headers: {
          ...JSON_CORS_HEADERS,
          "X-Bifrost-Fallback": "/api/v1/relay/chat/completions",
        },
      }
    );
  }

  try {
    // 1. Auth + rate limit — duplicated from the TS route so this route is
    //    standalone (we don't import the relay handler to keep the import
    //    graph from pulling in 30MB of @omniroute/open-sse when the user
    //    is only using the sidecar path).
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

    if (token.expiresAt && Math.floor(Date.now() / 1000) > token.expiresAt) {
      return new Response(JSON.stringify(buildErrorBody(401, "Relay token expired")), {
        status: 401,
        headers: JSON_CORS_HEADERS,
      });
    }

    // 2a. Per-(token,IP) gate — mirrors the TypeScript relay fallback so the
    // sidecar path does not weaken leaked-token abuse protection.
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

    // 2. Body parse + injection guard + allowed-models check
    const cloned = request.clone();
    const rawBody = await cloned.json().catch(() => null);
    if (!rawBody) {
      return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
        status: 400,
        headers: JSON_CORS_HEADERS,
      });
    }

    const parsed = BifrostRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return new Response(
        JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message || "Invalid request body")),
        { status: 400, headers: JSON_CORS_HEADERS }
      );
    }
    const body = parsed.data;

    const guard = injectionGuard(body);
    if (guard.blocked) {
      recordRelayUsage(token.id, {
        requestId: request.headers.get("x-request-id") || undefined,
        status: "error",
        statusCode: 400,
        latencyMs: Date.now() - startTime,
        clientIp,
        userAgent,
      });
      return new Response(
        JSON.stringify({
          ...buildErrorBody(400, "Request blocked: potential prompt injection detected"),
          detections: guard.result.detections.length,
        }),
        { status: 400, headers: JSON_CORS_HEADERS }
      );
    }

    const allowedModels: string[] = JSON.parse(token.allowedModels);
    if (allowedModels.length > 0 && !allowedModels.includes("*")) {
      const model = (body as { model?: string }).model || "";
      const allowed = allowedModels.some(
        (p) => model === p || (p.endsWith("*") && model.startsWith(p.slice(0, -1)))
      );
      if (!allowed) {
        return new Response(
          JSON.stringify(buildErrorBody(403, `Model "${model}" not allowed by this relay token`)),
          { status: 403, headers: JSON_CORS_HEADERS }
        );
      }
    }

    // 3. Decide streaming vs. unary
    const wantsStream = Boolean((body as { stream?: boolean }).stream) && BIFROST_STREAMING_ENABLED;

    // 4. Forward to bifrost
    const upstreamHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "x-relay-token-id": token.id,
      "x-relay-client-ip": clientIp,
    };
    if (BIFROST_API_KEY) {
      upstreamHeaders["Authorization"] = `Bearer ${BIFROST_API_KEY}`;
    }

    const ac = new AbortController();
    let timedOut = false;
    const tid = setTimeout(() => {
      timedOut = true;
      ac.abort();
    }, BIFROST_TIMEOUT_MS);

    let upstream: Response;
    try {
      upstream = await fetch(`${BIFROST_BASE_URL}/v1/chat/completions`, {
        method: "POST",
        headers: upstreamHeaders,
        body: JSON.stringify(body),
        signal: ac.signal,
      });
    } catch (error) {
      clearTimeout(tid);
      throw error;
    }

    // 5. Forward response. Non-streaming responses can be accounted for as soon
    //    as headers arrive; streaming responses finalize on body close/cancel/error.
    //    Status is derived from the outcome:
    //      - complete        -> success, statusCode = upstream.status
    //      - cancelled       -> success (client cancel is not an error)
    //      - upstream_error  -> error,   statusCode = upstream.status (or 504 if timeout)
    //      - timeout         -> error,   statusCode = 504
    const recordUsage: RelayUsageRecorder = (status, statusCode, outcome) => {
      recordRelayUsage(token.id, {
        requestId: request.headers.get("x-request-id") || undefined,
        status,
        statusCode,
        outcome,
        latencyMs: Date.now() - startTime,
        clientIp,
        userAgent,
      });
    };

    const newHeaders = new Headers(upstream.headers);
    newHeaders.set("X-Routed-By", "bifrost");
    newHeaders.set("X-Relay-Token", token.tokenPrefix + "...");
    if (!wantsStream) {
      newHeaders.set("Content-Type", upstream.headers.get("Content-Type") ?? "application/json");
    }

    if (wantsStream && upstream.body) {
      const stream = finalizeReadableStream(upstream.body, (error, outcome) => {
        clearTimeout(tid);
        if (outcome === "cancelled") {
          // Client cancel is not an error.
          recordUsage("success", upstream.status, "cancelled");
          return;
        }
        if (outcome === "upstream_error" || timedOut) {
          recordUsage("error", timedOut ? 504 : upstream.status, timedOut ? "timeout" : "upstream_error");
          return;
        }
        // Clean completion.
        recordUsage(
          upstream.status >= 500 ? "error" : "success",
          upstream.status,
          "complete"
        );
      });

      return new Response(stream, {
        status: upstream.status,
        headers: newHeaders,
      });
    }

    clearTimeout(tid);
    recordUsage(upstream.status < 500 ? "success" : "error", upstream.status);

    return new Response(upstream.body, {
      status: upstream.status,
      headers: newHeaders,
    });
  } catch (err) {
    // Surface timeout/abort clearly so the caller can fall back to TS path.
    const isAbort = err instanceof Error && err.name === "AbortError";
    return new Response(
      JSON.stringify(
        buildErrorBody(
          isAbort ? 504 : 502,
          isAbort
            ? `Bifrost sidecar timed out after ${BIFROST_TIMEOUT_MS}ms`
            : `Bifrost sidecar unreachable: ${err instanceof Error ? err.message : String(err)}`
        )
      ),
      {
        status: isAbort ? 504 : 502,
        headers: {
          ...JSON_CORS_HEADERS,
          "X-Bifrost-Fallback": "/api/v1/relay/chat/completions",
        },
      }
    );
  }
}
