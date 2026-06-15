import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogs } from "@/lib/usageDb";
import { getCompletedDetails, getPendingById } from "@/lib/usage/usageHistory";
import { getProviderConnections } from "@/lib/localDb";

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
    if (searchParams.get("limit")) filter.limit = parseInt(searchParams.get("limit"));
    if (searchParams.get("offset")) filter.offset = parseInt(searchParams.get("offset"));

    const [logs, connections] = await Promise.all([getCallLogs(filter), getProviderConnections()]);

    const connectionNames = new Map(
      connections.map((connection: any) => [
        connection.id,
        connection.displayName || connection.name || connection.email || connection.id,
      ])
    );

    // Include active (in-flight) requests from the pending-by-id map
    // so they appear in the logs grid alongside persisted entries.
    const now = Date.now();
    const activeEntries: any[] = [];
    const persistedIds = new Set(logs.map((log: any) => log.id).filter(Boolean));

    for (const detail of getPendingById().values()) {
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
        active: true,
      });
    }

    const pendingIds = new Set(activeEntries.map((entry) => entry.id));
    const completedEntries: any[] = [];
    for (const detail of getCompletedDetails().values()) {
      if (persistedIds.has(detail.id) || pendingIds.has(detail.id)) continue;
      completedEntries.push({
        id: detail.id,
        timestamp: new Date(detail.startedAt).toISOString(),
        method: "",
        path: detail.clientEndpoint || "",
        status: 200,
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
        active: false,
        completed: true,
        detailState: "in-memory",
      });
    }

    // Prepend active/completed in-memory entries (newest first) ahead of persisted logs
    activeEntries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    completedEntries.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json([...activeEntries, ...completedEntries, ...logs]);
  } catch (error) {
    console.error("[API ERROR] /api/usage/call-logs failed:", error);
    return NextResponse.json({ error: "Failed to fetch call logs" }, { status: 500 });
  }
}
