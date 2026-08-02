import { NextResponse } from "next/server";
import { getCachedProviderConnectionById } from "@/lib/db/readCache";
import { updateProviderConnection } from "@/lib/db/providers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { tryIdeAuth } from "@/lib/cursor/tokenExtractor";
import {
  renewCursorConnection,
  buildCursorRenewedUpdate,
  runCursorRenewalExclusive,
  BACKGROUND_IDE_AUTH_TIMEOUT_MS,
} from "@/lib/cursor/renewal";

/**
 * A manual "Refresh" click must always see a fresh IDE-credential read, never
 * a stale answer memoized by renewCursorConnection()'s default sweep-facing
 * dedup cache (renewal.ts's dedupedTryIdeAuth, keyed host-wide with a 5s TTL
 * — correct for coalescing multiple Cursor connections due in the SAME sweep
 * tick, but wrong for a click that could otherwise reuse a read taken before
 * THIS request's own nudge attempt completed). Matches the same
 * always-uncached convention this plan already established for
 * checkCursorAgentAvailability() vs. getCachedCursorAgentAvailability().
 * Keeps the shared short busy-timeout (not the interactive auto-import
 * route's longer 2000ms default) since this request shares the same event
 * loop as every other in-flight request on this instance.
 */
function uncachedTryIdeAuth(): ReturnType<typeof tryIdeAuth> {
  return tryIdeAuth({ timeoutMs: BACKGROUND_IDE_AUTH_TIMEOUT_MS });
}

interface CursorConnectionLike {
  id: string;
  provider?: string;
  accessToken?: string;
  expiresAt?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

const MANUAL_REFRESH_COOLDOWN_MS = 30_000;

/**
 * Per-connection cooldown for rapid sequential (non-concurrent) manual
 * "Refresh" clicks. Bounds repeated real authenticated `--list-models` calls
 * to Cursor's API from a user mashing the button — independent of, and much
 * shorter than, the sweep's `isInRefreshBackoff()` circuit (left untouched).
 * The in-flight-spawn lock (Task 2 Step 3) already caps CONCURRENT spawns;
 * this caps repeated SEQUENTIAL ones, which that lock does not throttle.
 */
const lastManualRefreshAttemptAt = new Map<string, number>();

/** Opportunistic eviction — no separate timer needed since this route is
 * already called on every manual-refresh click; keeps the map from growing
 * unbounded across the lifetime of the process as connections are added/removed. */
function evictExpiredManualRefreshAttempts(now: number): void {
  for (const [connectionId, attemptedAt] of lastManualRefreshAttemptAt) {
    if (now - attemptedAt >= MANUAL_REFRESH_COOLDOWN_MS) {
      lastManualRefreshAttemptAt.delete(connectionId);
    }
  }
}

/**
 * POST /api/providers/[id]/refresh-cursor
 * Manually trigger a Cursor session renewal attempt (nudge `cursor-agent`,
 * re-scrape IDE/agent credential sources). Dedicated route because Cursor has
 * no refresh_token by design — the generic `/api/providers/[id]/refresh`
 * route always silently 502s for Cursor connections today.
 *
 * 🔒 LOCAL_ONLY — classified in `LOCAL_ONLY_API_PATTERNS`
 * (`src/server/authz/routeGuard.ts`) because `renewCursorConnection()` spawns
 * `cursor-agent` as a child process (Hard Rules #15 + #17). Unlike this
 * route, the rest of `/api/providers/` (including the generic `/refresh`)
 * intentionally remains remote-reachable.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const connection = (await getCachedProviderConnectionById(id)) as CursorConnectionLike | null;
    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    if (connection.provider !== "cursor") {
      return NextResponse.json(
        { error: "This route only supports Cursor connections" },
        { status: 400 }
      );
    }

    const now = Date.now();
    evictExpiredManualRefreshAttempts(now);

    const lastAttempt = lastManualRefreshAttemptAt.get(connection.id) ?? 0;
    const elapsedMs = now - lastAttempt;
    if (elapsedMs < MANUAL_REFRESH_COOLDOWN_MS) {
      const retryAfterMs = MANUAL_REFRESH_COOLDOWN_MS - elapsedMs;
      return NextResponse.json(
        {
          error: "Refresh already attempted recently — please wait before retrying.",
          retryAfterMs,
        },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
        }
      );
    }
    // Set immediately before invoking renewCursorConnection() — regardless of
    // outcome — so rapid repeated clicks are throttled either way.
    lastManualRefreshAttemptAt.set(connection.id, now);

    return await runCursorRenewalExclusive(connection.id, async () => {
      const result = await renewCursorConnection(
        {
          accessToken: connection.accessToken ?? "",
          machineId: connection.providerSpecificData?.machineId as string | null | undefined,
        },
        { tryIdeAuth: uncachedTryIdeAuth }
      );

      switch (result.status) {
        case "renewed": {
          const nowIso = new Date().toISOString();
          const update = buildCursorRenewedUpdate(connection, result, nowIso);
          await updateProviderConnection(connection.id, update);
          return NextResponse.json({
            success: true,
            connectionId: connection.id,
            provider: "cursor",
            expiresAt: update.expiresAt as string,
            refreshedAt: nowIso,
          });
        }
        case "unchanged": {
          return NextResponse.json({
            success: true,
            unchanged: true,
            connectionId: connection.id,
            provider: "cursor",
            expiresAt: connection.expiresAt ?? null,
            refreshedAt: new Date().toISOString(),
            message: "Cursor session is already current — no newer token found on this host.",
          });
        }
        case "error": {
          return NextResponse.json(
            {
              error: "Token refresh failed — provider returned no new token",
              details: result.error,
            },
            { status: 502 }
          );
        }
        default: {
          const _exhaustive: never = result;
          throw new Error(`Unhandled CursorRenewalResult status: ${JSON.stringify(_exhaustive)}`);
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Token refresh failed",
        details: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
