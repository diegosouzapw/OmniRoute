import { NextResponse } from "next/server";
import { countAuditLog, getAuditLog } from "@/lib/compliance/index";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export const dynamic = "force-dynamic";

function parsePagination(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value || "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export async function GET(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      action: searchParams.get("action") || undefined,
      actor: searchParams.get("actor") || undefined,
      target: searchParams.get("target") || undefined,
      resourceType:
        searchParams.get("resourceType") || searchParams.get("resource_type") || undefined,
      status: searchParams.get("status") || undefined,
      requestId: searchParams.get("requestId") || searchParams.get("request_id") || undefined,
      from: searchParams.get("from") || searchParams.get("since") || undefined,
      to: searchParams.get("to") || searchParams.get("until") || undefined,
      limit: parsePagination(searchParams.get("limit"), 50, 1, 500),
      offset: parsePagination(searchParams.get("offset"), 0, 0, 10_000),
    };

    const logs = getAuditLog(filters);
    const total = countAuditLog(filters);
    return NextResponse.json(logs, {
      headers: {
        "x-total-count": String(total),
        "x-page-limit": String(filters.limit),
        "x-page-offset": String(filters.offset),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch audit log" },
      { status: 500 }
    );
  }
}
