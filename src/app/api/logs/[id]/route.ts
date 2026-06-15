import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogById } from "@/lib/usageDb";
import { getCompletedDetails, getPendingById } from "@/lib/usage/usageHistory";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Prefer in-flight active pending requests first to avoid races where
    // an entry moves to completed between the call-logs list and detail fetch.
    try {
      const pendingRequestDetail = getPendingById().get(id);
      if (pendingRequestDetail) {
        const pipelinePayloads: any = {
          clientRequest: pendingRequestDetail.clientRequest ?? null,
          providerRequest: pendingRequestDetail.providerRequest ?? null,
          providerResponse: pendingRequestDetail.providerResponse ?? null,
          clientResponse: pendingRequestDetail.clientResponse ?? null,
          streamChunks: pendingRequestDetail.streamChunks ?? null,
        };

        const activeEntry = {
          id: pendingRequestDetail.id,
          timestamp: new Date(pendingRequestDetail.startedAt).toISOString(),
          method: "",
          path: pendingRequestDetail.clientEndpoint || "",
          status: 0,
          model: pendingRequestDetail.model,
          provider: pendingRequestDetail.provider,
          connectionId: pendingRequestDetail.connectionId,
          duration: Date.now() - pendingRequestDetail.startedAt,
          detailState: "in-flight",
          active: true,
          pipelinePayloads,
          hasPipelineDetails: true,
        };

        return NextResponse.json(activeEntry);
      }
    } catch (e) {
      console.warn("/api/logs/[id] - failed to read active pending detail:", e);
    }

    // Next, try persistent call log by id
    let persistedRequest = await getCallLogById(id);

    // If persistent call log doesn't have payloads, try the in-memory completedDetails cache
    if (
      !persistedRequest?.pipelinePayloads ||
      Object.keys(persistedRequest.pipelinePayloads).length === 0
    ) {
      try {
        const completed = getCompletedDetails();
        const inMem = completed.get(id);
        if (inMem) {
          const pipelinePayloads: any = {
            clientRequest: inMem.clientRequest ?? null,
            providerRequest: inMem.providerRequest ?? null,
            providerResponse: inMem.providerResponse ?? null,
            clientResponse: inMem.clientResponse ?? null,
            streamChunks: inMem.streamChunks ?? null,
          };

          const minimal = {
            id: inMem.id,
            timestamp: new Date(inMem.startedAt).toISOString(),
            path: inMem.clientEndpoint || "",
            status: typeof inMem.status === "number" ? inMem.status : inMem.error ? 502 : 0,
            model: inMem.model,
            provider: inMem.provider,
            connectionId: inMem.connectionId,
            duration: Date.now() - inMem.startedAt,
            detailState: "in-memory",
            active: false,
            error: inMem.error || null,
            pipelinePayloads,
            hasPipelineDetails: true,
          };

          // Merge with persistent entry if available, preferring persisted fields
          persistedRequest = persistedRequest
            ? {
                ...persistedRequest,
                pipelinePayloads: persistedRequest.pipelinePayloads || pipelinePayloads,
                hasPipelineDetails: persistedRequest.hasPipelineDetails || true,
              }
            : minimal;
        }
      } catch (e) {
        console.warn("/api/logs/[id] - failed to read in-memory completed detail:", e);
      }
    }

    if (!persistedRequest) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(persistedRequest);
  } catch (err) {
    console.error("[API ERROR] /api/logs/[id] failed:", err);
    return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
  }
}
