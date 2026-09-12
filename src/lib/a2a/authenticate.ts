/**
 * Shared A2A authentication + caller-owner resolution (GHSA-jcm5-6wpp-wjj8).
 *
 * The JSON-RPC router (/a2a) grew its own authenticate() for GHSA-v54m, but
 * the REST task routes under /api/a2a/tasks/ had no auth call at all. Both
 * surfaces now share this single implementation so they cannot drift again:
 * same REQUIRE_API_KEY posture as /v1, same keyless local-first default, and
 * a stable owner id (hashed API key) used to scope task visibility.
 */

import { createHash, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";

function tokensMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Whether the request may use the A2A surface at all. Mirrors the JSON-RPC
 * posture: when a client key is required, demand a valid OmniRoute key;
 * otherwise honor the legacy explicit A2A key; otherwise stay keyless (the
 * same local-first default as /v1).
 */
export async function authenticateA2ARequest(req: NextRequest | Request): Promise<boolean> {
  const apiKey = extractApiKey(req as NextRequest);
  if (isRequireApiKeyEnabled()) {
    if (apiKey) return isValidApiKey(apiKey);
    // #12888: mirror clientApiPolicy's dashboard-session fallback so the
    // dashboard's own A2A playground (no Authorization header, session
    // cookie only) is accepted the same way /api/v1/* already accepts it.
    return isDashboardSessionAuthenticated(req);
  }

  const configuredKey = process.env.OMNIROUTE_API_KEY;
  if (configuredKey) {
    if (apiKey) return tokensMatch(apiKey, configuredKey);
    return isDashboardSessionAuthenticated(req);
  }

  // No API key required and none configured — allow (keyless local-first).
  return true;
}

/**
 * Owner id for task scoping (GHSA-jcm5-6wpp-wjj8): a stable hash of the
 * caller's API key, `"dashboard"` for a session-authenticated caller with no
 * API key (#12888 — keeps dashboard-originated tasks scoped consistently
 * instead of falling into the ownerless keyless bucket), or `undefined` when
 * the call carries neither (keyless posture — ownerless tasks stay visible to
 * everyone, by design).
 */
export async function resolveA2AOwner(req: NextRequest | Request): Promise<string | undefined> {
  const apiKey = extractApiKey(req as NextRequest);
  if (apiKey) return createHash("sha256").update(apiKey).digest("hex").slice(0, 32);
  if (await isDashboardSessionAuthenticated(req)) return "dashboard";
  return undefined;
}
