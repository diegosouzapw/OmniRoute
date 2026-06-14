/**
 * POST /api/tools/traffic-inspector/capture-modes/tls-intercept
 *
 * Toggle TLS body decryption in the MITM proxy. When enabled, the MITM
 * server decrypts HTTPS bodies and the Traffic Inspector can show full
 * request/response content. When disabled, CONNECT tunnels are passed through
 * and only metadata is captured.
 *
 * State is held in the `captureState` module (process-lifetime).
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { InspectorTlsInterceptToggleSchema } from "@/shared/schemas/inspector";
import { isTlsInterceptEnabled, setTlsIntercept } from "@/lib/inspector/captureState";

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

  const parsed = InspectorTlsInterceptToggleSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  setTlsIntercept(parsed.data.enabled);
  return Response.json({ ok: true, tlsIntercept: { enabled: isTlsInterceptEnabled() } });
}
