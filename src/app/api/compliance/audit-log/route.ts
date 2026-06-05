import { NextResponse } from "next/server";
import { countAuditLog, getAuditLog } from "@/lib/compliance/index";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { AuditLogQuerySchema } from "@/shared/schemas/quota";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";

function parsePagination(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value || "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);

    // Parse the level param via AuditLogQuerySchema (Zod, B7)
    const rawLevel = searchParams.get("level") ?? undefined;
    const parsed = AuditLogQuerySchema.safeParse({ level: rawLevel });
    const level = parsed.success ? parsed.data.level : "all";

    const levelFilter: "high" | undefined = level === "high" ? "high" : undefined;

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
      levelFilter,
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
    const message = error instanceof Error ? error.message : "Failed to fetch audit log";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
