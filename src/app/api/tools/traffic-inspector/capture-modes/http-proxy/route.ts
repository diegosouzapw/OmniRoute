/**
 * POST /api/tools/traffic-inspector/capture-modes/http-proxy
 *
 * Start or stop the HTTP_PROXY listener (default port 8080).
 * `EADDRINUSE` is surfaced as 409 with a structured error body.
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorCaptureModeActionSchema } from "@/shared/schemas/inspector";
import { startHttpProxyServer } from "@/mitm/inspector/httpProxyServer";
import { getHttpProxyHandle, setHttpProxyHandle } from "@/lib/inspector/captureState";

const DEFAULT_PORT = Number(process.env.INSPECTOR_HTTP_PROXY_PORT ?? "8080") || 8080;

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = InspectorCaptureModeActionSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const { action } = parsed.data;

  if (action === "stop") {
    const handle = getHttpProxyHandle();
    if (!handle) {
      return Response.json({ ok: true, running: false, port: null });
    }
    try {
      await handle.stop();
      setHttpProxyHandle(null);
      return Response.json({ ok: true, running: false, port: null });
    } catch (err) {
      const msg = sanitizeErrorMessage(err);
      return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to stop HTTP proxy")), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  // action === "start"
  const existing = getHttpProxyHandle();
  if (existing) {
    return Response.json({ ok: true, running: true, port: existing.port });
  }

  try {
    const handle = await startHttpProxyServer(DEFAULT_PORT);
    setHttpProxyHandle(handle);
    return Response.json({ ok: true, running: true, port: handle.port }, { status: 201 });
  } catch (err) {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr?.code === "EADDRINUSE") {
      return new Response(
        JSON.stringify({
          error: {
            message: `Port ${DEFAULT_PORT} is already in use`,
            type: "conflict",
            code: "EADDRINUSE",
            port: DEFAULT_PORT,
          },
        }),
        { status: 409, headers: { "content-type": "application/json" } }
      );
    }
    const msg = sanitizeErrorMessage(err);
    return new Response(
      JSON.stringify(buildErrorBody(500, msg || "Failed to start HTTP proxy")),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
