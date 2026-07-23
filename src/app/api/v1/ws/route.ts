import { CORS_HEADERS } from "@/shared/utils/cors";
import { getLiveWsPath } from "@/shared/utils/wsPath";
import { authorizeWebSocketHandshake } from "@/lib/ws/handshake";

const WS_HANDSHAKE_HEADERS = {
  ...CORS_HEADERS,
  "Cache-Control": "no-store",
};

/**
 * Public URL for the live dashboard WebSocket (reverse proxy / Cloudflare
 * Tunnel setups). Read lazily at request time (not module load) so runtime
 * env changes are honored, and only echoed when it is a ws:// or wss:// URL.
 */
function getLivePublicUrl(): string | null {
  const publicUrl = process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;
  if (!publicUrl) return null;
  return publicUrl.startsWith("ws://") || publicUrl.startsWith("wss://") ? publicUrl : null;
}

function getWsProtocol() {
  return {
    request: {
      type: "request",
      id: "req-1",
      payload: { model: "openai/gpt-4.1-mini", messages: [] },
    },
    cancel: { type: "cancel", id: "req-1" },
    live: {
      port: parseInt(process.env.LIVE_WS_PORT || "20132", 10),
      publicUrl: getLivePublicUrl(),
      path: getLiveWsPath(),
      protocol: "json",
      channels: ["requests", "combo", "credentials"],
      auth: "api-key",
      heartbeatMs: 15000,
    },
  };
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      ...WS_HANDSHAKE_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const handshake = url.searchParams.get("handshake") === "1";
  const auth = await authorizeWebSocketHandshake(request);

  if (handshake) {
    if (!auth.authorized) {
      return Response.json(
        {
          error: {
            message: auth.hasCredential
              ? "Invalid WebSocket credential"
              : "WebSocket auth required",
            type: "invalid_request",
            code: auth.hasCredential ? "ws_auth_invalid" : "ws_auth_required",
          },
          wsAuth: auth.wsAuth,
          path: auth.wsPath,
        },
        {
          status: auth.hasCredential ? 403 : 401,
          headers: WS_HANDSHAKE_HEADERS,
        }
      );
    }

    return Response.json(
      {
        ok: true,
        path: auth.wsPath,
        wsAuth: auth.wsAuth,
        authenticated: auth.authenticated,
        authType: auth.authType,
        protocol: getWsProtocol(),
        live: {
          port: parseInt(process.env.LIVE_WS_PORT || "20132", 10),
          publicUrl: getLivePublicUrl(),
          path: getLiveWsPath(),
          protocol: "json",
          channels: ["requests", "combo", "credentials"],
          auth: "api-key",
          description: "Real-time dashboard events via WebSocket",
        },
      },
      {
        headers: WS_HANDSHAKE_HEADERS,
      }
    );
  }

  return Response.json(
    {
      error: {
        message: "Upgrade Required",
        type: "invalid_request",
        code: "upgrade_required",
      },
      path: auth.wsPath,
      wsAuth: auth.wsAuth,
      protocol: getWsProtocol(),
    },
    {
      status: 426,
      headers: {
        ...WS_HANDSHAKE_HEADERS,
        Upgrade: "websocket",
      },
    }
  );
}
