/**
 * GET /api/radar/settings — read the current Radar opt-in + supporter-key
 * snapshot. Powers the dashboard page's "am I already opted in?" check so
 * a reload doesn't re-show the activation screen (see FIX 3).
 *
 * Also relays the two F4/T7 "get a supporter key" outbound links
 * (`contributorClaimUrl`, `supporterPlansUrl` — see `@/lib/radar/links`) so
 * the client component never reads `process.env` itself. Smallest surface
 * per spec: no dedicated route, reuses this one. Both are plain public
 * URLs (no secret, no pricing) — safe to expose alongside the settings
 * snapshot, gated by the same flag/auth checks below.
 *
 * POST /api/radar/settings — set Radar opt-in and/or supporter key.
 *
 * Zod-validated body: { optIn?: boolean, supporterKey?: string|null }
 * Key shape: "omr_" + 40 hex chars.
 *
 * NEVER echoes the raw key back on either verb — GET returns a masked form
 * ("omr_****" + last 4 hex chars) and a `hasSupporterKey` boolean; POST
 * returns the same masked form.
 *
 * Flag off => 404, checked BEFORE auth (byte-identical flag-off inertia).
 * Unauthenticated access once the flag is on => 401.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { setRadarOptIn, setRadarKey, getRadarSettings } from "@/lib/db/radar";
import { getContributorClaimUrl, getSupporterPlansUrl } from "@/lib/radar/links";
import { SUPPORTER_KEY_REGEX } from "@/lib/radar/supporterKey";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SettingsBodySchema = z.object({
  optIn: z.boolean().optional(),
  supporterKey: z
    .string()
    .regex(SUPPORTER_KEY_REGEX, 'Key must match "omr_" + 40 hex chars')
    .nullable()
    .optional(),
});

/**
 * Mask a supporter key for response: "omr_****abcd"
 * Shows only the last 4 hex chars.
 */
function maskKey(key: string | null): string | null {
  if (!key) return null;
  const last4 = key.slice(-4);
  return `omr_****${last4}`;
}

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  // Flag gate — MUST run before auth (byte-identical flag-off inertia).
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: { ...CORS_HEADERS, "Cache-Control": "no-store" },
    });
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  try {
    const settings = getRadarSettings();
    return NextResponse.json(
      {
        optIn: settings.optIn,
        hasSupporterKey: settings.supporterKey !== null,
        supporterKeyMasked: maskKey(settings.supporterKey),
        contributorClaimUrl: getContributorClaimUrl(),
        supporterPlansUrl: getSupporterPlansUrl(),
      },
      { headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to load Radar settings"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function POST(request: Request) {
  // Flag gate — MUST run before auth (byte-identical flag-off inertia).
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const parsed = SettingsBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, "Invalid request body", parsed.error.flatten().fieldErrors),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { optIn, supporterKey } = parsed.data;

  // At least one field must be provided
  if (optIn === undefined && supporterKey === undefined) {
    return NextResponse.json(
      buildErrorBody(400, "At least one of optIn or supporterKey is required"),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  try {
    if (optIn !== undefined) {
      setRadarOptIn(optIn);
      if (optIn) {
        // Opting in is the moment the daily background sync becomes wanted —
        // arm the scheduler lazily so a flag-off/opt-out install never even
        // creates the timer (Radar inertia contract). Never fatal.
        try {
          const { ensureRadarSyncScheduler } = await import("@/lib/radar/scheduler");
          ensureRadarSyncScheduler();
        } catch {
          // Scheduler is best-effort; manual sync keeps working without it.
        }
      }
    }
    if (supporterKey !== undefined) {
      setRadarKey(supporterKey);
    }

    return NextResponse.json(
      {
        ok: true,
        optIn: optIn ?? undefined,
        supporterKey: supporterKey !== undefined ? maskKey(supporterKey) : undefined,
      },
      { headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to update Radar settings"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
