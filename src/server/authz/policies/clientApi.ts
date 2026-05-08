import { isDashboardSessionAuthenticated } from "../../../shared/utils/apiAuth";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";

function extractBearer(headers: Headers): string | null {
  const raw = headers.get("authorization") ?? headers.get("Authorization");
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed.toLowerCase().startsWith("bearer ")) return null;
  return trimmed.slice(7).trim() || null;
}

function maskKeyId(apiKey: string): string {
  const tail = apiKey.slice(-4);
  return `key_${tail}`;
}

function isDashboardModelCatalogRead(ctx: PolicyContext): boolean {
  const method = ctx.request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return false;
  return (
    ctx.classification.normalizedPath === "/api/v1/models" ||
    ctx.classification.normalizedPath === "/api/v1"
  );
}

export const clientApiPolicy: RoutePolicy = {
  routeClass: "CLIENT_API",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    const bearer = extractBearer(ctx.request.headers);
    if (!bearer) {
      if (
        isDashboardModelCatalogRead(ctx) &&
        (await isDashboardSessionAuthenticated(ctx.request))
      ) {
        return allow({ kind: "dashboard_session", id: "dashboard" });
      }

      if (process.env.REQUIRE_API_KEY !== "true") {
        return allow({ kind: "anonymous", id: "local" });
      }

      return reject(401, "AUTH_002", "Authentication required");
    }

    const { validateApiKey } = await import("../../../lib/db/apiKeys");
    const ok = await validateApiKey(bearer);
    if (!ok) {
      return reject(401, "AUTH_002", "Invalid API key");
    }

    return allow({ kind: "client_api_key", id: maskKeyId(bearer) });
  },
};
