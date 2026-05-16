import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth.ts";
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

export const clientApiPolicy: RoutePolicy = {
  routeClass: "CLIENT_API",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    const bearer = extractBearer(ctx.request.headers);
    if (!bearer) {
      if (await isDashboardSessionAuthenticated(ctx.request)) {
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
      // Issue #2257: when REQUIRE_API_KEY is off, a stale CLI config (Codex
      // Desktop auto-config, Hermes, etc.) carrying an invalid Bearer
      // shouldn't 401 the whole request — REQUIRE_API_KEY=false means
      // "anonymous traffic is allowed", so an invalid key should degrade to
      // anonymous instead of rejecting. We log a warning so the bad key is
      // still observable in the request log.
      if (process.env.REQUIRE_API_KEY !== "true") {
        console.warn(
          `[clientApiPolicy] invalid bearer presented to ${ctx.classification.normalizedPath} ` +
            `but REQUIRE_API_KEY=false — falling through to anonymous (key_id=${maskKeyId(bearer)})`
        );
        return allow({ kind: "anonymous", id: "local" });
      }
      return reject(401, "AUTH_002", "Invalid API key");
    }

    return allow({ kind: "client_api_key", id: maskKeyId(bearer) });
  },
};
