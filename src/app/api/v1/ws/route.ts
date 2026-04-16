import { CORS_HEADERS } from "@/shared/utils/cors";
import { authorizeWebSocketHandshake } from "@/lib/ws/handshake";

const WS_HANDSHAKE_HEADERS = {
  ...CORS_HEADERS,
  "Cache-Control": "no-store",
};

const WS_PROTOCOL = {
  request: {
    type: "request",
    id: "req-1",
    payload: { model: "openai/gpt-4.1-mini", messages: [] },
  },
  cancel: { type: "cancel", id: "req-1" },
};

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
        protocol: WS_PROTOCOL,
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
      protocol: WS_PROTOCOL,
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
