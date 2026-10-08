import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getAllRateLimitStatus } from "@omniroute/open-sse/services/rateLimitManager.ts";
import { getStats as getComboSemaphoreStats } from "@omniroute/open-sse/services/rateLimitSemaphore.ts";
import {
  getStats as getSemaphoreStats,
  resetAll as resetAllSemaphores,
} from "@omniroute/open-sse/services/accountSemaphore.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) {
    authError.headers.set("Cache-Control", "private, no-store");
    return authError;
  }

  return NextResponse.json(
    {
      timestamp: new Date().toISOString(),
      rateLimits: getAllRateLimitStatus(),
      comboQueues: getComboSemaphoreStats("combo:"),
      semaphores: getSemaphoreStats(),
    },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) {
    authError.headers.set("Cache-Control", "private, no-store");
    return authError;
  }

  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  if (action === "reset-semaphores") {
    resetAllSemaphores();
    return NextResponse.json(
      { ok: true, action },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  }
  return NextResponse.json(
    { error: "unknown action" },
    { status: 400, headers: { "Cache-Control": "private, no-store" } }
  );
}
