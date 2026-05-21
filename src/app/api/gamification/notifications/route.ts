import { NextRequest } from "next/server";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createBadgeNotificationStream } from "@/lib/gamification/notifications";

/**
 * GET /api/gamification/notifications?apiKeyId=xxx — SSE badge unlock notifications
 */
export async function GET(request: NextRequest) {
  const authErr = await requireManagementAuth(request);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const apiKeyId = url.searchParams.get("apiKeyId");

  if (!apiKeyId) {
    return new Response(JSON.stringify({ error: "apiKeyId required" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const stream = createBadgeNotificationStream(apiKeyId, request.signal);

  return new Response(stream, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
