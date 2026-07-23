/**
 * POST /api/tools/traffic-inspector/requests/[id]/replay
 *
 * Re-issues the captured request through the local OmniRoute instance and
 * returns the response body. The replay will itself appear in the traffic
 * buffer (captured by agentBridgeHook or httpProxyServer depending on path).
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";

interface Params {
  params: Promise<{ id: string }>;
}

const OMNIROUTE_BASE = process.env.OMNIROUTE_BASE_URL ?? "http://127.0.0.1:20128";

export async function POST(_request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;
  const entry = globalTrafficBuffer.get(id);
  if (!entry) {
    return new Response(JSON.stringify(buildErrorBody(404, "Request not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  const url = `${OMNIROUTE_BASE}${entry.path}`;

  const replayHeaders: Record<string, string> = {
    "content-type": "application/json",
    "x-omniroute-source": "inspector-replay",
  };
  // Forward original Authorization if present (masked in buffer — skip if masked)
  const origAuth = entry.requestHeaders["authorization"] ?? entry.requestHeaders["Authorization"];
  if (origAuth && !origAuth.includes("***")) {
    replayHeaders["authorization"] = origAuth;
  }

  try {
    const upstream = await fetch(url, {
      method: entry.method,
      headers: replayHeaders,
      body: entry.requestBody ?? undefined,
    });

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { "content-type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(502, msg || "Replay failed")), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
