/**
 * POST /api/tools/traffic-inspector/internal/ingest
 *
 * Internal endpoint consumed by `server.cjs` (D4 fallback) to push
 * intercepted request data into the traffic buffer when the request does
 * NOT pass through a TypeScript handler that already calls
 * `agentBridgeHook.ts`.
 *
 * Security model (double LOCAL_ONLY):
 *   1. `isLocalOnlyPath("/api/tools/traffic-inspector/")` blocks all non-
 *      loopback callers unconditionally — this is handled by the authz pipeline.
 *   2. The shared secret `INSPECTOR_INTERNAL_INGEST_TOKEN` (set in .env or
 *      auto-generated at process boot) must match the `Authorization: Bearer`
 *      header. This prevents any other loopback process from stuffing the buffer.
 *
 * Body: partial `InterceptedRequest` — only `id`, `timestamp`, `method`,
 * `host`, `path` are required; all other fields default.
 *
 * LOCAL_ONLY enforced by routeGuard + token gate below.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { createHash, timingSafeEqual } from "node:crypto";
import { randomUUID } from "node:crypto";
import { InterceptedRequestSchema } from "@/mitm/inspector/types";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";
import { maskSecret } from "@/mitm/maskSecrets";
import { sanitizeHeaders } from "@/mitm/sanitizeHeaders";

// ── Token management ────────────────────────────────────────────────────────

let _cachedToken: string | null = null;

function getIngestToken(): string {
  if (_cachedToken) return _cachedToken;
  const env = process.env.INSPECTOR_INTERNAL_INGEST_TOKEN;
  if (env && env.length >= 16) {
    _cachedToken = env;
  } else {
    // Auto-generate on first call; persists for the lifetime of the process.
    _cachedToken = randomUUID().replace(/-/g, "");
  }
  return _cachedToken;
}

function tokenMatches(received: string): boolean {
  const expected = getIngestToken();
  if (!received || !expected) return false;
  try {
    const a = createHash("sha256").update(expected).digest();
    const b = createHash("sha256").update(received).digest();
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ── Partial schema (only required fields; rest optional) ───────────────────

const IngestBodySchema = InterceptedRequestSchema.partial().required({
  id: true,
  timestamp: true,
  method: true,
  host: true,
  path: true,
  source: true,
  requestHeaders: true,
  requestSize: true,
  responseHeaders: true,
  responseSize: true,
  status: true,
});

// ── Handler ─────────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<Response> {
  // Token gate (second layer after LOCAL_ONLY IP check).
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!tokenMatches(token)) {
    return new Response(JSON.stringify(buildErrorBody(403, "Invalid or missing ingest token")), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = IngestBodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    // Fill in any missing optional fields with sensible defaults, then mask
    // secrets and strip hop-by-hop headers before the entry enters the buffer.
    // The proxy (server.cjs) sends bodies + headers raw over the token-gated
    // loopback ingest; sanitization is centralized here so the inspector never
    // stores bearer tokens / API keys (Hard Rule #12).
    const data = parsed.data;
    const req = {
      requestBody: null,
      responseBody: null,
      ...data,
      requestHeaders: sanitizeHeaders(data.requestHeaders || {}),
      responseHeaders: sanitizeHeaders(data.responseHeaders || {}),
      requestBody: data.requestBody != null ? maskSecret(data.requestBody) : null,
      responseBody: data.responseBody != null ? maskSecret(data.responseBody) : null,
    };
    globalTrafficBuffer.push(req);
    return Response.json({ ok: true, id: req.id }, { status: 200 });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Ingest failed")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

/**
 * Expose the auto-generated token for use by `server.cjs` bootstrap.
 * Called once at process start via dynamic import.
 */
export function getIngestTokenForBootstrap(): string {
  return getIngestToken();
}
