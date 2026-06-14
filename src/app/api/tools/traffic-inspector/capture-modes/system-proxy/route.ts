/**
 * POST /api/tools/traffic-inspector/capture-modes/system-proxy
 *
 * Apply or revert the OS-level system proxy.
 *
 * `apply`  — sets the system proxy to 127.0.0.1:<port> and saves the
 *             prior state so it can be restored. Starts a guard timer that
 *             auto-reverts after `guardMinutes` (default 30).
 *
 * `revert` — restores the previously saved proxy state.
 *
 * Hard Rule #13: all shell invocations happen in `systemProxyConfig.ts` using
 * `execFile` with array args — no interpolation here.
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorSystemProxyActionSchema } from "@/shared/schemas/inspector";
import { apply, revert } from "@/mitm/inspector/systemProxyConfig";
import {
  getSystemProxyState,
  setSystemProxyApplied,
  clearSystemProxy,
} from "@/lib/inspector/captureState";

const DEFAULT_PORT = Number(process.env.INSPECTOR_HTTP_PROXY_PORT ?? "8080") || 8080;
const DEFAULT_GUARD_MINUTES = Number(
  process.env.INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES ?? "30"
) || 30;

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

  const parsed = InspectorSystemProxyActionSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const { action, port, guardMinutes } = parsed.data;
  const resolvedPort = port ?? DEFAULT_PORT;
  const resolvedGuard = guardMinutes ?? DEFAULT_GUARD_MINUTES;

  if (action === "revert") {
    const state = getSystemProxyState();
    const previousState = state.previousState;

    try {
      if (previousState) {
        await revert(previousState);
      }
      clearSystemProxy();
      return Response.json({ ok: true, applied: false });
    } catch (err) {
      const msg = sanitizeErrorMessage(err);
      return new Response(
        JSON.stringify(buildErrorBody(500, msg || "Failed to revert system proxy")),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
  }

  // action === "apply"
  try {
    const result = await apply(resolvedPort);
    setSystemProxyApplied(resolvedPort, result.previousState, resolvedGuard);
    return Response.json({
      ok: true,
      applied: true,
      port: resolvedPort,
      platform: result.platform,
      guardUntil: getSystemProxyState().guardUntil,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(
      JSON.stringify(buildErrorBody(500, msg || "Failed to apply system proxy")),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
