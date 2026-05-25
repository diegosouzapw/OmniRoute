/**
 * Reverse-proxy handler for embedded service UIs.
 *
 * Route: /dashboard/providers/services/[name]/embed/[...path]
 *
 * Forwards HTTP traffic to a locally-running embedded service (e.g. 9router
 * listening on 127.0.0.1:20130) so its web UI can be iframed inside the
 * OmniRoute dashboard without CORS issues.
 *
 * Security:
 *   - Target URL is constructed from the service's registered port — never
 *     from user input — eliminating SSRF risk.
 *   - The route is classified LOCAL_ONLY in routeGuard.ts; the management
 *     policy blocks all non-loopback access before this handler runs.
 */

import { getSupervisor } from "@/lib/services/registry";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

/** Headers that must not be forwarded between proxy hops. */
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
]);

const PROXY_TIMEOUT_MS = 30_000;

type RouteParams = { name: string; path: string[] };

async function proxyToService(request: Request, params: RouteParams): Promise<Response> {
  const { name, path } = params;

  const supervisor = getSupervisor(name);
  if (!supervisor) {
    return createErrorResponse({ status: 404, message: `Service '${name}' not found.` });
  }

  const { state, port } = supervisor.getStatus();
  if (state !== "running") {
    return createErrorResponse({
      status: 503,
      message: `Service '${name}' is not running (state: ${state}).`,
    });
  }

  const incomingUrl = new URL(request.url);
  const upstreamPath = path.length > 0 ? "/" + path.join("/") : "/";
  const upstreamUrl = `http://127.0.0.1:${port}${upstreamPath}${incomingUrl.search}`;

  const forwardHeaders = new Headers();
  for (const [k, v] of request.headers.entries()) {
    if (!HOP_BY_HOP.has(k.toLowerCase())) {
      forwardHeaders.set(k, v);
    }
  }
  forwardHeaders.set("host", `127.0.0.1:${port}`);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: hasBody ? request.body : undefined,
      // @ts-expect-error -- duplex is required by the Fetch spec for streaming
      // request bodies but is not yet in the TS DOM lib (Node.js 18+ supports it).
      duplex: hasBody ? "half" : undefined,
      signal: AbortSignal.timeout(PROXY_TIMEOUT_MS),
    });

    const responseHeaders = new Headers();
    for (const [k, v] of upstream.headers.entries()) {
      if (!HOP_BY_HOP.has(k.toLowerCase())) {
        responseHeaders.set(k, v);
      }
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 502, message: `Proxy error: ${msg}` });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return proxyToService(request, await params);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return proxyToService(request, await params);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return proxyToService(request, await params);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return proxyToService(request, await params);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return proxyToService(request, await params);
}
