import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth.ts";
import { recordApiKeyAuthTouch } from "@/lib/compliance/index";
import { classifyIpScope, getClientIpFromRequest } from "@/lib/ipUtils";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { extractApiKey } from "@/sse/services/auth.ts";
import { extractGoogApiKeyHeader } from "@/sse/services/googApiKeyAuth.ts";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";
import { isViaProxyRequest, requestPeerAddress } from "../peerContext";

const HANDSHAKE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function isWsHandshake(ctx: PolicyContext): boolean {
  if (ctx.classification.normalizedPath !== "/api/v1/ws") return false;
  if (!HANDSHAKE_METHODS.has(ctx.request.method.toUpperCase())) return false;

  try {
    return new URL(ctx.request.url, "http://localhost").searchParams.get("handshake") === "1";
  } catch {
    return false;
  }
}

function extractBearer(request: Request): string | null {
  const raw = request.headers.get("authorization") ?? request.headers.get("Authorization");
  const xApiKey = request.headers.get("x-api-key") ?? request.headers.get("X-Api-Key");
  const xGoogApiKey = extractGoogApiKeyHeader(request.headers);
  if (raw) {
    const trimmed = raw.trim();
    if (trimmed.toLowerCase().startsWith("bearer ")) {
      const token = trimmed.slice(7).trim();
      if (token) return token;
    }
    // A non-"Bearer <token>" Authorization header (an empty "Bearer ", or a
    // client's own non-OmniRoute token — VS Code Copilot sends one even when the
    // OmniRoute key lives in the URL path of a /vscode tokenized endpoint) must
    // NOT short-circuit auth. Fall through to x-api-key and the path-scoped URL
    // token below instead of rejecting the request with "Authentication required".
  }

  if (xApiKey) {
    return xApiKey.trim() || null;
  }

  // Issue #7034: gemini-cli (and any @google/genai-based client) sends its
  // key via x-goog-api-key exclusively — accept it unconditionally, same
  // shape as the x-api-key fallback above.
  if (xGoogApiKey) {
    return xGoogApiKey;
  }

  return extractApiKey(request);
}

function maskKeyId(apiKey: string): string {
  const tail = apiKey.slice(-4);
  return `key_${tail}`;
}

function redactCredentialFromUserAgent(
  userAgent: string | null,
  credentials: Array<string | null | undefined>
): string | null {
  if (!userAgent) return null;
  let sanitized = userAgent;
  for (const credential of credentials) {
    if (credential) sanitized = sanitized.split(credential).join("[redacted]");
  }
  return sanitized;
}

function getAuthTouchClientIp(ctx: PolicyContext): string {
  const peerAddress = requestPeerAddress(ctx);
  const peerScope = classifyIpScope(peerAddress);
  const trustedProxyHop =
    isViaProxyRequest(ctx) && (peerScope === "loopback" || peerScope === "private");

  return getClientIpFromRequest({
    headers: ctx.request.headers,
    // A token-validated proxy stamp plus a local/private socket peer is the
    // app's trusted-proxy boundary. Withhold that hop so ipUtils resolves the
    // forwarded client. Public/direct peers remain authoritative even if they
    // spoof forwarding headers.
    ip: trustedProxyHop ? undefined : (peerAddress ?? undefined),
  });
}

export const clientApiPolicy: RoutePolicy = {
  routeClass: "CLIENT_API",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    const bearer = extractBearer(ctx.request as Request);
    if (!bearer) {
      // The WS descriptor handshake is a metadata read; the route handler
      // performs the actual wsAuth/dashboard/API-key decision and returns the
      // protocol details the browser needs before opening the socket.
      if (isWsHandshake(ctx)) {
        return allow({ kind: "anonymous", id: "ws-handshake" });
      }

      if (await isDashboardSessionAuthenticated(ctx.request)) {
        return allow({ kind: "dashboard_session", id: "dashboard" });
      }

      if (!isRequireApiKeyEnabled()) {
        return allow({ kind: "anonymous", id: "local" });
      }

      return reject(401, "AUTH_002", "Authentication required");
    }

    const { getApiKeyMetadata, validateApiKey } = await import("../../../lib/db/apiKeys");
    const ok = await validateApiKey(bearer);
    if (!ok) {
      // Issue #2257: when REQUIRE_API_KEY is off, a stale CLI config (Codex
      // Desktop auto-config, Hermes, etc.) carrying an invalid Bearer
      // shouldn't 401 the whole request — REQUIRE_API_KEY=false means
      // "anonymous traffic is allowed", so an invalid key should degrade to
      // anonymous instead of rejecting. We log a warning so the bad key is
      // still observable in the request log.
      if (!isRequireApiKeyEnabled()) {
        console.warn(
          `[clientApiPolicy] invalid bearer presented to ${ctx.classification.normalizedPath} ` +
            `but REQUIRE_API_KEY=false — falling through to anonymous (key_id=${maskKeyId(bearer)})`
        );
        return allow({ kind: "anonymous", id: "local" });
      }
      return reject(401, "AUTH_002", "Invalid API key");
    }

    const method = ctx.request.method.toUpperCase();
    if (method === "GET" || method === "HEAD") {
      const metadata = await getApiKeyMetadata(bearer);
      if (metadata && metadata.id !== "env-key" && metadata.noLog !== true) {
        recordApiKeyAuthTouch({
          apiKeyId: metadata.id,
          method,
          normalizedPath: ctx.classification.normalizedPath,
          ipAddress: getAuthTouchClientIp(ctx),
          userAgent: redactCredentialFromUserAgent(ctx.request.headers.get("user-agent"), [
            bearer,
            metadata.keyHash,
          ]),
          requestId: ctx.requestId,
        });
      }
    }

    return allow({ kind: "client_api_key", id: maskKeyId(bearer) });
  },
};
