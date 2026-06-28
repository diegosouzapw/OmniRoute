import { NextResponse } from "next/server";
import { getSettings } from "@/lib/localDb";
import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import {
  LOCAL_ONLY_API_PREFIXES,
  ALWAYS_PROTECTED_API_PATHS,
  LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES,
  SPAWN_CAPABLE_PREFIXES,
} from "@/server/authz/routeGuard";

/**
 * Static MANAGEMENT-tier example prefixes. Render-only — never consulted by
 * the runtime policy. The actual MANAGEMENT classification is "any /api/*
 * that is not LOCAL_ONLY, not v1/client, not on the public allowlist", so the
 * inventory shows representative entries rather than a generated enumeration.
 */
const MANAGEMENT_TIER_PREFIXES: ReadonlyArray<string> = [
  "/api/settings",
  "/api/providers/",
  "/api/api-keys",
];

const CLIENT_API_TIER_PREFIXES: ReadonlyArray<string> = [
  "/v1/",
  "/api/v1/",
  "/v1beta/",
  "/api/v1beta/",
];

const PUBLIC_TIER_PREFIXES: ReadonlyArray<string> = ["/api/health", "/api/version", "/_next/"];

type TierName = "LOCAL_ONLY" | "ALWAYS_PROTECTED" | "MANAGEMENT" | "CLIENT_API" | "PUBLIC";

interface TierEntry {
  name: TierName;
  prefixes: string[];
  description: string;
  bypassable: boolean;
}

/**
 * OQ-5: viewing the inventory requires authentication (dashboard session OR
 * any valid API key, regardless of scope). The inventory leaks route-prefix
 * taxonomy + current bypass state (reconnaissance value), so we never expose
 * it anonymously — but a non-manage key holder may still inspect it.
 *
 * Compare with `requireManagementAuth` which would refuse anything below the
 * manage scope; this endpoint is intentionally read-only and one rung lower.
 */
async function requireInventoryReadAuth(request: Request): Promise<Response | null> {
  if (!(await isAuthRequired(request))) {
    return null;
  }

  if (await isDashboardSessionAuthenticated(request)) {
    return null;
  }

  const apiKey = extractApiKey(request);
  if (apiKey) {
    try {
      if (await isValidApiKey(apiKey)) {
        return null;
      }
    } catch {
      return createErrorResponse({
        status: 503,
        message: "Service temporarily unavailable",
        type: "server_error",
      });
    }
    return createErrorResponse({
      status: 403,
      message: "Invalid API key",
      type: "invalid_request",
    });
  }

  return createErrorResponse({
    status: 401,
    message: "Authentication required",
    type: "invalid_request",
  });
}

function isBypassableConstant(prefix: string): boolean {
  // A LOCAL_ONLY prefix is bypassable iff it appears in the compile-time
  // bypass constant AND is not a SPAWN_CAPABLE prefix. Runtime DB state is
  // surfaced separately via `bypassEnabled` / `bypassPrefixes`.
  if (SPAWN_CAPABLE_PREFIXES.some((p) => p === prefix || prefix.startsWith(p))) {
    return false;
  }
  return LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES.some((p) => p === prefix);
}

export async function GET(request: Request) {
  const authError = await requireInventoryReadAuth(request);
  if (authError) return authError;

  try {
    const settings = await getSettings();

    const tiers: TierEntry[] = [
      {
        name: "LOCAL_ONLY",
        prefixes: [...LOCAL_ONLY_API_PREFIXES],
        description:
          "Loopback-only routes. Spawn child processes; exposing them to non-local traffic is a known CVE class (GHSA-fhh6-4qxv-rpqj). Some entries are opt-in bypassable via the manage scope (kill-switch gated).",
        bypassable: LOCAL_ONLY_API_PREFIXES.some(isBypassableConstant),
      },
      {
        name: "ALWAYS_PROTECTED",
        prefixes: [...ALWAYS_PROTECTED_API_PATHS],
        description:
          "Auth required unconditionally, even when requireLogin=false. Covers destructive / irreversible operations (shutdown, database settings).",
        bypassable: false,
      },
      {
        name: "MANAGEMENT",
        prefixes: [...MANAGEMENT_TIER_PREFIXES],
        description:
          "Default tier for /api/* admin endpoints. Auth required unless requireLogin=false. PATCHes touching security-impacting keys require currentPassword re-auth.",
        bypassable: false,
      },
      {
        name: "CLIENT_API",
        prefixes: [...CLIENT_API_TIER_PREFIXES],
        description:
          "Client-facing inference APIs. Accept Bearer API keys; not gated by dashboard sessions.",
        bypassable: false,
      },
      {
        name: "PUBLIC",
        prefixes: [...PUBLIC_TIER_PREFIXES],
        description: "Unauthenticated routes: health probes, public assets, onboarding bootstrap.",
        bypassable: false,
      },
    ];

    const bypassEnabled =
      typeof settings.localOnlyManageScopeBypassEnabled === "boolean"
        ? settings.localOnlyManageScopeBypassEnabled
        : true;
    const bypassPrefixesRaw = settings.localOnlyManageScopeBypassPrefixes;
    const bypassPrefixes = Array.isArray(bypassPrefixesRaw)
      ? bypassPrefixesRaw.filter((p): p is string => typeof p === "string")
      : [...LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES];

    return NextResponse.json({
      tiers,
      bypassEnabled,
      bypassPrefixes,
      spawnCapablePrefixes: [...SPAWN_CAPABLE_PREFIXES],
    });
  } catch (error) {
    console.log("Error loading authz inventory:", error);
    return NextResponse.json({ error: "Failed to load authz inventory" }, { status: 500 });
  }
}
