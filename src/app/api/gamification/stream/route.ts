/**
 * SSE Leaderboard Stream — /api/gamification/stream
 *
 * Pushes live leaderboard updates to connected clients via Server-Sent Events.
 * Supports all leaderboard scopes (global, weekly, monthly, tokens_shared, contributions).
 */

import { NextRequest } from "next/server";
import { type LeaderboardScope, getTopN } from "@/lib/gamification/leaderboard";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const VALID_SCOPES: ReadonlySet<string> = new Set([
  "global",
  "weekly",
  "monthly",
  "tokens_shared",
  "contributions",
]);

/**
 * GET /api/gamification/stream — SSE leaderboard updates
 *
 * Query params:
 *   scope — one of: global, weekly, monthly, tokens_shared, contributions (default: global)
 */
export async function GET(request: NextRequest) {
  const authErr = await requireManagementAuth(request);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const rawScope = url.searchParams.get("scope") || "global";
  const scope: LeaderboardScope = VALID_SCOPES.has(rawScope)
    ? (rawScope as LeaderboardScope)
    : "global";

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendUpdate = async () => {
        try {
          const entries = await getTopN(scope, 50);
          const data = JSON.stringify({ type: "leaderboard", scope, entries });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          controller.enqueue(
            encoder.encode(`event: error\ndata: ${JSON.stringify({ error: msg })}\n\n`)
          );
        }
      };

      // Send initial state
      sendUpdate();

      // Heartbeat every 15s
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`: heartbeat ${Date.now()}\n\n`));
      }, 15_000);

      // Update every 5s
      const updater = setInterval(sendUpdate, 5_000);

      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        clearInterval(updater);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
