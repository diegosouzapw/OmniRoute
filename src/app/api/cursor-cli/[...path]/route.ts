import { handleCursorCliProxy } from "@omniroute/open-sse/handlers/cursorCliProxy.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxy(request: Request, context: RouteContext): Promise<Response> {
  const { path } = await context.params;
  return handleCursorCliProxy(request, path ?? []);
}

export const GET = proxy;
export const POST = proxy;
