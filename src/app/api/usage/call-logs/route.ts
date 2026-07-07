import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogs } from "@/lib/usageDb";
import { getCompletedDetails, getPendingById } from "@/lib/usage/usageHistory";
import { getProviderConnections } from "@/lib/localDb";
import { matchesSearch } from "@/shared/utils/turkishText";

type CallLogListRowsInput = {
  logs: any[];
  connections: any[];
  pendingDetails: Iterable<any>;
  completedDetails: Iterable<any>;
  now?: number;
};

function rowTimestampMs(row: any): number {
  const value = Date.parse(String(row?.timestamp || ""));
  return Number.isFinite(value) ? value : 0;
}

function rowPriority(row: any): number {
  if (row?.active) return 0;
  if (row?.completed) return 1;
  return 2;
}

export function buildCallLogListRows({
  logs,
  connections,
  pendingDetails,
  completedDetails,
  now = Date.now(),
}: CallLogListRowsInput): any[] {
  const connectionNames = new Map(
    connections.map((connection: any) => [
      connection.id,
      connection.displayName || connection.name || connection.email || connection.id,
    ])
  );

  // Include active (in-flight) requests from the pending-by-id map
  // so they appear in the logs grid alongside persisted entries.
  const activeEntries: any[] = [];
  const persistedIds = new Set(logs.map((log: any) => log.id).filter(Boolean));

  for (const detail of pendingDetails) {
    activeEntries.push({
      id: detail.id,
      timestamp: new Date(detail.startedAt).toISOString(),
      method: "",
      path: detail.clientEndpoint || "",
      status: 0,
      model: detail.model,
      requestedModel: null,
      provider: detail.provider,
      account: connectionNames.get(detail.connectionId || "") || detail.connectionId || "unknown",
      connectionId: detail.connectionId,
      duration: Math.max(0, now - detail.startedAt),
      tokens: { in: 0, out: 0 },
      cacheSource: null,
      sourceFormat: null,
      targetFormat: null,
      apiKeyId: null,
      apiKeyName: null,
      comboName: null,
      error: null,
      correlationId: detail.correlationId || null,
      active: true,
    });
  }

  const pendingIds = new Set(activeEntries.map((entry) => entry.id));
  const completedEntries: any[] = [];
  for (const detail of completedDetails) {
    if (persistedIds.has(detail.id) || pendingIds.has(detail.id)) continue;
    const completedAt = typeof detail.completedAt === "number" ? detail.completedAt : null;
    const duration =
      typeof detail.durationMs === "number" && Number.isFinite(detail.durationMs)
        ? detail.durationMs
        : Math.max(0, (completedAt ?? now) - detail.startedAt);
    completedEntries.push({
      id: detail.id,
      timestamp: new Date(detail.startedAt).toISOString(),
      method: "",
      path: detail.clientEndpoint || "",
      status: typeof detail.status === "number" ? detail.status : detail.error ? 502 : 200,
      model: detail.model,
      requestedModel: null,
      provider: detail.provider,
      account: connectionNames.get(detail.connectionId || "") || detail.connectionId || "unknown",
      connectionId: detail.connectionId,
      duration,
      tokens: { in: 0, out: 0 },
      cacheSource: null,
      sourceFormat: null,
      targetFormat: null,
      apiKeyId: null,
      apiKeyName: null,
      comboName: null,
      error: detail.error || null,
      correlationId: detail.correlationId || null,
      active: false,
      completed: true,
      completedAt: completedAt ? new Date(completedAt).toISOString() : null,
      detailState: "in-memory",
    });
  }

  return [...activeEntries, ...completedEntries, ...logs].sort((a, b) => {
    // Active requests always on top
    const pa = rowPriority(a);
    const pb = rowPriority(b);
    if (pa !== pb) return pa - pb;
    // Within same priority, newest first
    return rowTimestampMs(b) - rowTimestampMs(a);
  });
}

export async function GET(request: Request) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);

    const filter: Record<string, any> = {};
    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("model")) filter.model = searchParams.get("model");
    if (searchParams.get("provider")) filter.provider = searchParams.get("provider");
    if (searchParams.get("account")) filter.account = searchParams.get("account");
    if (searchParams.get("apiKey")) filter.apiKey = searchParams.get("apiKey");
    if (searchParams.get("combo")) filter.combo = searchParams.get("combo");
    if (searchParams.get("search")) filter.search = searchParams.get("search");
    if (searchParams.get("correlationId")) filter.correlationId = searchParams.get("correlationId");
    if (searchParams.get("limit")) filter.limit = parseInt(searchParams.get("limit"));
    if (searchParams.get("offset")) filter.offset = parseInt(searchParams.get("offset"));

    const [logs, connections] = await Promise.all([getCallLogs(filter), getProviderConnections()]);

    const rows = buildCallLogListRows({
      logs,
      connections,
      pendingDetails: getPendingById().values(),
      completedDetails: getCompletedDetails().values(),
    });

    // When correlationId filter is set, also filter in-memory entries
    // (active + completed) that don't match — getCallLogs already filters
    // the DB rows but activeEntries/completedEntries bypass it.
    if (filter.correlationId) {
      const cid = filter.correlationId;
      return NextResponse.json(rows.filter((r: any) => matchesSearch(r.correlationId || "", cid)));
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("[API ERROR] /api/usage/call-logs failed:", error);
    return NextResponse.json({ error: "Failed to fetch call logs" }, { status: 500 });
  }
}
