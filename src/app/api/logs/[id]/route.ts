import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogById } from "@/lib/usageDb";
import { getCompletedDetails, getPendingById } from "@/lib/usage/usageHistory";

// Each logged chunk-array element is one raw network read, timestamp-prefixed
// for the debug display — NOT one complete SSE `data:` line. A single JSON
// value (e.g. a `reasoning_content` delta) routinely splits across two or
// more elements, so parsing each element in isolation intermittently fails
// JSON.parse and silently drops that piece, leaving gaps that read as
// garbled/scrambled text once the survivors are concatenated. Strip each
// element's `[HH:MM:SS.mmm] ` prefix and concatenate the WHOLE array into one
// continuous string first, so a value split across elements rejoins correctly
// before it's parsed.
const CHUNK_LOG_TIMESTAMP_PREFIX = /^\[\d{2}:\d{2}:\d{2}\.\d{3}\]\s*/;

// Best-effort parse of the accumulated SSE `data:` lines captured live for an
// in-flight request (open-sse/utils/requestLogger.ts's appendConvertedChunk
// mutates these arrays in place as chunks arrive, so this reflects "the reply
// so far", not just the final text) into the concatenated assistant text.
export function extractPartialAssistantText(
  streamChunks: { provider?: string[]; openai?: string[]; client?: string[] } | null | undefined
): string {
  if (!streamChunks) return "";
  for (const chunkArr of [streamChunks.client, streamChunks.provider, streamChunks.openai]) {
    if (!Array.isArray(chunkArr) || chunkArr.length === 0) continue;
    let text = "";
    let reasoning = "";
    const joined = chunkArr
      .map((raw) => String(raw).replace(CHUNK_LOG_TIMESTAMP_PREFIX, ""))
      .join("");
    for (const line of joined.split("\n")) {
      const idx = line.indexOf("data:");
      if (idx === -1) continue;
      const jsonStr = line.slice(idx + 5).trim();
      if (!jsonStr || jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const delta = parsed?.choices?.[0]?.delta ?? parsed?.choices?.[0]?.message;
        if (typeof delta?.content === "string") text += delta.content;
        if (typeof delta?.reasoning_content === "string") reasoning += delta.reasoning_content;
      } catch {
        // partial/malformed chunk line (e.g. cut mid-write) — skip it
      }
    }
    if (text) return text;
    // Reasoning-model providers (e.g. DeepSeek-R1-style) stream
    // `reasoning_content` before any visible `content` — with only the
    // content check above, the live panel had nothing new to show for the
    // whole reasoning phase and looked frozen even while the SSE event
    // stream kept visibly ticking. Surface the reasoning text meanwhile so
    // the panel keeps progressing.
    if (reasoning) return `_Thinking…_\n\n${reasoning}`;
  }
  return "";
}

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
          // The still-generating reply so far — the request's own context
          // panel renders this alongside its (already-complete) requestBody
          // instead of waiting for the stream to finish.
          partialAssistantText: extractPartialAssistantText(pendingRequestDetail.streamChunks),
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
