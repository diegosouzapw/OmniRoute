/**
 * Per-API-Key Device List — Read Route
 *
 * Lists the distinct devices (IP + User-Agent fingerprints) tracked for an
 * API key by `open-sse/services/deviceTracker.ts` (in-memory, TTL-evicted).
 * IPs are already masked by the tracker before storage — this route never
 * has access to the raw client IP or the full SHA-256 fingerprint.
 *
 * Ported from upstream 9router#931 (thanks @mugnimaestra) — the original
 * exposed a flat `GET /api/keys/devices` listing every key; this route
 * follows the OmniRoute `[id]` sub-resource convention (see
 * `src/app/api/keys/[id]/usage-limits/route.ts`) and requires management
 * auth like every other `/api/keys/[id]/*` route.
 *
 * @route /api/keys/[id]/devices
 */

import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { getDeviceCount, getDeviceDetails } from "@omniroute/open-sse/services/deviceTracker.ts";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import * as log from "@/sse/utils/logger";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const key = await getApiKeyById(id);
    if (!key || typeof key.id !== "string") {
      return NextResponse.json(buildErrorBody(404, "Key not found"), { status: 404 });
    }

    return NextResponse.json({
      keyId: key.id,
      name: typeof key.name === "string" ? key.name : "",
      count: getDeviceCount(key.id),
      devices: getDeviceDetails(key.id),
    });
  } catch (error) {
    log.error("keys", "Error fetching API key devices", error);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}
