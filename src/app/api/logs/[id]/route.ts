import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogById } from "@/lib/usageDb";
import { getCompletedDetails, getPendingById } from "@/lib/usage/usageHistory";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
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

        // If streamChunks are not yet populated, give a short grace period to avoid
        // race where the stream logger hasn't injected chunks into the in-memory
        // pending detail yet. Poll for up to 1000ms.
        if (!pipelinePayloads.streamChunks || Object.keys(pipelinePayloads.streamChunks).length === 0) {
          const start = Date.now();
          while (Date.now() - start < 1000) {
            try {
              const refreshed = getPendingById().get(id);
              if (refreshed?.streamChunks && Object.keys(refreshed.streamChunks).length > 0) {
                activeEntry.pipelinePayloads.streamChunks = refreshed.streamChunks;
                break;
              }
            } catch (e) {
              // ignore
            }
            // small sleep
            await new Promise((r) => setTimeout(r, 100));
          }
        }

          return NextResponse.json(activeEntry);
        }
    } catch (e) {
        console.warn("/api/logs/[id] - failed to read active pending detail:", e);
    }

    // Next, try persistent call log by id
    let persistedRequest = await getCallLogById(id);

    // If persistent call log doesn't have payloads, try the in-memory completedDetails cache
    if (!persistedRequest?.pipelinePayloads || Object.keys(persistedRequest.pipelinePayloads).length === 0) {
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
            status: 0,
            model: inMem.model,
            provider: inMem.provider,
            connectionId: inMem.connectionId,
            duration: Date.now() - inMem.startedAt,
            detailState: "in-memory",
            active: false,
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
