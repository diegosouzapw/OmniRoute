/**
 * POST /api/radar/settings — set Radar opt-in and/or supporter key.
 *
 * Zod-validated body: { optIn?: boolean, supporterKey?: string|null }
 * Key shape: "omr_" + 40 hex chars.
 *
 * NEVER echoes the key back — returns a masked form instead.
 * Flag off => 404.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { setRadarOptIn, setRadarKey } from "@/lib/db/radar";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SUPPORTER_KEY_REGEX = /^omr_[0-9a-f]{40}$/;

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

export async function POST(request: Request) {
  // Flag gate
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(
      buildErrorBody(404, "Not found"),
      { status: 404, headers: CORS_HEADERS },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      buildErrorBody(400, "Invalid JSON body"),
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const parsed = SettingsBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, "Invalid request body", parsed.error.flatten().fieldErrors),
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const { optIn, supporterKey } = parsed.data;

  // At least one field must be provided
  if (optIn === undefined && supporterKey === undefined) {
    return NextResponse.json(
      buildErrorBody(400, "At least one of optIn or supporterKey is required"),
      { status: 400, headers: CORS_HEADERS },
    );
  }

  try {
    if (optIn !== undefined) {
      setRadarOptIn(optIn);
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
      { headers: CORS_HEADERS },
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to update Radar settings"),
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
