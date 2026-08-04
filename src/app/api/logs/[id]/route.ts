import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogById } from "@/lib/usageDb";
import { getCompletedDetails, getPendingById } from "@/lib/usage/usageHistory";
import { getAllCallLogsForConversation } from "@/lib/db/agenticConversations";
import { buildMultiRowConversation, type LoadedCallLogRow } from "@/mitm/inspector/multiRowConversation";

// Reconstructing N rows means N sequential getCallLogById disk reads — bound
// how many earlier turns get loaded so a very long-running agent session
// doesn't add unbounded latency to opening any one of its turns.
const MAX_LOADED_ROWS = 50;

interface ConversationAttachment {
  conversationTurns: unknown[];
  conversationNextId: string | null;
  conversationIsLatest: boolean;
  conversationLastSeenAt: string | null;
  conversationEarlierTurnsOmitted: boolean;
}

/**
 * "Full Conversation" panel data: every call_logs row sharing this entry's
 * conversation id (session_tag), reconstructed into one chronological,
 * per-turn-tagged transcript truncated to the turns visible as of the
 * CURRENTLY viewed row (turn-relative view) — not always "the latest turn".
 */
async function buildConversationAttachment(
  sessionTag: string | null | undefined,
  currentEntry: any
): Promise<ConversationAttachment | null> {
  if (!sessionTag) return null;
  try {
    const allRefs = getAllCallLogsForConversation(sessionTag);
    if (allRefs.length === 0) return null;

    const currentIndex = allRefs.findIndex((r) => r.id === String(currentEntry.id));
    const found = currentIndex !== -1;

    // Defensive: the current row should always appear in its own conversation's
    // row list. If it somehow doesn't, show everything with no "next" link
    // and no "in progress" auto-refresh rather than crash or guess wrong.
    let refsToLoad = found ? allRefs.slice(0, currentIndex + 1) : allRefs;
    const earlierTurnsOmitted = refsToLoad.length > MAX_LOADED_ROWS;
    if (earlierTurnsOmitted) refsToLoad = refsToLoad.slice(-MAX_LOADED_ROWS);

    const loadedRows: LoadedCallLogRow[] = [];
    for (const ref of refsToLoad) {
      const entry =
        ref.id === String(currentEntry.id) ? currentEntry : await getCallLogById(ref.id);
      if (!entry) continue;
      loadedRows.push({
        id: String(entry.id),
        timestamp: String(entry.timestamp ?? ref.timestamp),
        requestBody: entry.requestBody ?? null,
        responseBody: entry.responseBody ?? null,
      });
    }

    const conversationTurns = buildMultiRowConversation(loadedRows);
    const nextRef = found ? (allRefs[currentIndex + 1] ?? null) : null;
    const lastRef = allRefs[allRefs.length - 1] ?? null;

    return {
      conversationTurns,
      conversationNextId: nextRef?.id ?? null,
      conversationIsLatest: found && currentIndex === allRefs.length - 1,
      conversationLastSeenAt: lastRef?.timestamp ?? null,
      conversationEarlierTurnsOmitted: earlierTurnsOmitted,
    };
  } catch (e) {
    console.warn("/api/logs/[id] - failed to build conversation transcript:", e);
    return null;
  }
}

// Best-effort parse of the accumulated SSE `data:` lines captured live for an
// in-flight request (open-sse/utils/requestLogger.ts's appendConvertedChunk
// mutates these arrays in place as chunks arrive, so this reflects "the reply
// so far", not just the final text) into the concatenated assistant text.
function extractPartialAssistantText(
  streamChunks: { provider?: string[]; openai?: string[]; client?: string[] } | null | undefined
): string {
  if (!streamChunks) return "";
  for (const chunkArr of [streamChunks.client, streamChunks.provider, streamChunks.openai]) {
    if (!Array.isArray(chunkArr) || chunkArr.length === 0) continue;
    let text = "";
    for (const raw of chunkArr) {
      for (const line of String(raw).split("\n")) {
        const idx = line.indexOf("data:");
        if (idx === -1) continue;
        const jsonStr = line.slice(idx + 5).trim();
        if (!jsonStr || jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const delta = parsed?.choices?.[0]?.delta ?? parsed?.choices?.[0]?.message;
          if (typeof delta?.content === "string") text += delta.content;
        } catch {
          // partial/malformed chunk line (e.g. cut mid-write) — skip it
        }
      }
    }
    if (text) return text;
  }
  return "";
}

/**
 * Same idea as buildConversationAttachment, but for a request that hasn't
 * finished (and isn't in call_logs yet): prior turns come from already-
 * persisted rows, and the currently-streaming reply is reconstructed from the
 * live streamChunks capture — so the "Full Conversation" panel can grow in
 * real time while a request is still generating, matching the raw SSE panel.
 */
async function buildInFlightConversationAttachment(pendingRequestDetail: {
  id: string;
  sessionTag?: string | null;
  clientRequest?: unknown;
  streamChunks?: { provider?: string[]; openai?: string[]; client?: string[] } | null;
}): Promise<ConversationAttachment | null> {
  const sessionTag = pendingRequestDetail.sessionTag;
  if (!sessionTag) return null;
  try {
    const allRefs = getAllCallLogsForConversation(sessionTag);
    const earlierTurnsOmitted = allRefs.length > MAX_LOADED_ROWS;
    const refsToLoad = earlierTurnsOmitted ? allRefs.slice(-MAX_LOADED_ROWS) : allRefs;

    const loadedRows: LoadedCallLogRow[] = [];
    for (const ref of refsToLoad) {
      const entry = await getCallLogById(ref.id);
      if (!entry) continue;
      loadedRows.push({
        id: String(entry.id),
        timestamp: String(entry.timestamp ?? ref.timestamp),
        requestBody: entry.requestBody ?? null,
        responseBody: entry.responseBody ?? null,
      });
    }

    const partialText = extractPartialAssistantText(pendingRequestDetail.streamChunks);
    const nowIso = new Date().toISOString();
    loadedRows.push({
      id: pendingRequestDetail.id,
      timestamp: nowIso,
      requestBody: pendingRequestDetail.clientRequest ?? null,
      responseBody: partialText
        ? { choices: [{ message: { role: "assistant", content: partialText } }] }
        : null,
    });

    return {
      conversationTurns: buildMultiRowConversation(loadedRows),
      conversationNextId: null,
      conversationIsLatest: true,
      conversationLastSeenAt: nowIso,
      conversationEarlierTurnsOmitted: earlierTurnsOmitted,
    };
  } catch (e) {
    console.warn("/api/logs/[id] - failed to build in-flight conversation transcript:", e);
    return null;
  }
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
        };

        const inFlightConversationAttachment = await buildInFlightConversationAttachment({
          id: pendingRequestDetail.id,
          sessionTag: (pendingRequestDetail as any).sessionTag ?? null,
          clientRequest: pendingRequestDetail.clientRequest,
          streamChunks: pendingRequestDetail.streamChunks,
        });
        if (inFlightConversationAttachment) {
          Object.assign(activeEntry, inFlightConversationAttachment);
        }

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

    const conversationAttachment = await buildConversationAttachment(
      (persistedRequest as any).sessionTag,
      persistedRequest
    );
    if (conversationAttachment) {
      Object.assign(persistedRequest, conversationAttachment);
    }

    return NextResponse.json(persistedRequest);
  } catch (err) {
    console.error("[API ERROR] /api/logs/[id] failed:", err);
    return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
  }
}
