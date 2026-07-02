import { NextResponse } from "next/server";
import { getAllModelLockouts } from "@omniroute/open-sse/services/accountFallback.ts";
import { getCacheStats } from "@omniroute/open-sse/services/signatureCache.ts";
import { getProviderConnections, updateProviderConnection } from "@/lib/localDb";
import {
  enableRateLimitProtection,
  disableRateLimitProtection,
  getRateLimitStatus,
  getAllRateLimitStatus,
} from "@omniroute/open-sse/services/rateLimitManager.ts";
import { getAccountDisplayName } from "@/lib/display/names";

import { toggleRateLimitSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/**
 * GET /api/rate-limits — Consolidated rate-limit status
 *
 * Returns:
 * - Per-connection rate-limit status (protection toggle, current state)
 * - Global overview (all providers)
 * - Model lockouts
 * - Signature cache stats
 */
export async function GET() {
  try {
    const connections = await getProviderConnections();
    const statuses = connections.map((connRaw) => {
      const conn = asRecord(connRaw);
      const connectionId = typeof conn.id === "string" ? conn.id : "";
      const provider = typeof conn.provider === "string" ? conn.provider : "unknown";
      const name =
        (typeof conn.name === "string" && conn.name.trim()) ||
        (typeof conn.email === "string" && conn.email.trim()) ||
        getAccountDisplayName({ id: connectionId });

      return {
        connectionId,
        provider,
        name,
        rateLimitProtection: conn.rateLimitProtection === true,
        ...getRateLimitStatus(provider, connectionId),
      };
    });

    const lockouts = getAllModelLockouts();
    const cacheStats = getCacheStats();

    return NextResponse.json({
      connections: statuses,
      overview: getAllRateLimitStatus(),
      lockouts,
      cacheStats,
    });
  } catch (error) {
    console.error("[API ERROR] /api/rate-limits GET:", error);
    return NextResponse.json({ error: "Failed to get rate limit status" }, { status: 500 });
  }
}

/**
 * POST /api/rate-limits — Toggle rate limit protection for a connection
 * Body: { connectionId: string, enabled: boolean }
 */
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(toggleRateLimitSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { connectionId, enabled } = validation.data;

    // Update in-memory state
    if (enabled) {
      enableRateLimitProtection(connectionId);
    } else {
      disableRateLimitProtection(connectionId);
    }

    // Persist to database
    await updateProviderConnection(connectionId, {
      rateLimitProtection: !!enabled,
    });

    return NextResponse.json({ success: true, connectionId, enabled: !!enabled });
  } catch (error) {
    console.error("[API ERROR] /api/rate-limits POST:", error);
    return NextResponse.json({ error: "Failed to toggle rate limit" }, { status: 500 });
  }
}
