import { NextResponse } from "next/server";
import { getCacheMetrics, resetCacheMetrics } from "@/lib/db/settings";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const metrics = await getCacheMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error getting cache metrics:", error);
    return NextResponse.json({ error: "Failed to load cache metrics" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const metrics = await resetCacheMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error resetting cache metrics:", error);
    return NextResponse.json({ error: "Failed to reset cache metrics" }, { status: 500 });
  }
}
