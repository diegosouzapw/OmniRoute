import { NextResponse } from "next/server";
import { getAllRateLimitStatus } from "@omniroute/open-sse/services/rateLimitManager.ts";
import {
  getStats as getSemaphoreStats,
  resetAll as resetAllSemaphores,
} from "@omniroute/open-sse/services/accountSemaphore.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    rateLimits: getAllRateLimitStatus(),
    semaphores: getSemaphoreStats(),
  });
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  if (action === "reset-semaphores") {
    resetAllSemaphores();
    return NextResponse.json({ ok: true, action });
  }
  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
