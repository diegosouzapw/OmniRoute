import { NextResponse } from "next/server";
import { queryAuditEntries } from "@omniroute/open-sse/mcp-server/audit";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

function parseBooleanParam(value: string | null): boolean | undefined {
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return undefined;
}

function parseNumberParam(value: string | null, fallback: number): number {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseNumberParam(searchParams.get("limit"), 50);
    const offset = parseNumberParam(searchParams.get("offset"), 0);
    const tool = searchParams.get("tool") || undefined;
    const success = parseBooleanParam(searchParams.get("success"));
    const apiKeyId = searchParams.get("apiKeyId") || undefined;

    const result = await queryAuditEntries({
      limit,
      offset,
      tool,
      success,
      apiKeyId,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load MCP audit log";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
