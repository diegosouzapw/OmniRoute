/**
 * Reverse-proxy handler for embedded service UIs.
 *
 * Route: /dashboard/providers/services/[name]/embed/[...path]
 *
 * Thin wrapper — all proxy logic lives in @/lib/services/reverseProxy.ts.
 *
 * Security:
 *   - Target URL is constructed from the service's registered port — never
 *     from user input — eliminating SSRF risk.
 *   - The route is classified LOCAL_ONLY in routeGuard.ts; the management
 *     policy blocks all non-loopback access before this handler runs.
 *   - See reverseProxy.ts for full security documentation.
 */

import { proxyRequest } from "@/lib/services/reverseProxy";

export const dynamic = "force-dynamic";

type RouteParams = { name: string; path: string[] };

async function handleProxy(request: Request, params: RouteParams): Promise<Response> {
  const { name, path } = params;
  return proxyRequest(request, path, {
    name,
    publicPrefix: `/dashboard/providers/services/${name}/embed`,
    htmlRewrite: true,
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}

export async function OPTIONS(
  request: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<Response> {
  return handleProxy(request, await params);
}
