/**
 * responsesContinuationStore.ts — OmniRoute-native `previous_response_id`
 * virtualization for the OpenAI Responses API.
 *
 * Exposes `previous_response_id` continuation to clients unconditionally,
 * regardless of whether the actual upstream provider for a connection
 * supports Responses-API state at all: OmniRoute resolves the response id
 * back to the full input/output it produced and reconstructs the full
 * request server-side before forwarding upstream (full history, exactly as
 * today) -- the client only ever has to resend the new delta.
 *
 * Storage: reuses the existing call-log pipeline artifact (full, untruncated
 * request/response payloads, already gated by `call_log_pipeline_enabled`
 * and already retained/cleaned up by the existing call-log lifecycle)
 * instead of duplicating conversation content into a second store. Only a
 * lightweight `call_logs.response_id` index (154_call_logs_response_id.sql)
 * is new. Every lookup is scoped by `api_key_id` -- one client can never
 * resolve another client's stored conversation.
 */

import { getDbInstance } from "./core";
import { readCallArtifact } from "../usage/callLogArtifacts";

export type ResponsesContinuationState = {
  input: unknown[];
  output: unknown[];
};

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Both array-bounding implementations that clip a stored artifact's payload
// for log-storage size (cloneBoundedChatLogPayload in
// open-sse/handlers/chatCore/logTruncation.ts, and cloneBoundedForLog in
// open-sse/utils/requestLogger.ts) prepend this sentinel in place of the
// items they dropped once an array exceeds their tail-item cap -- so a real,
// ordinary-length conversation resolves fine, but any conversation whose
// input/output grew past that cap gets this object silently standing in for
// real history. Reading it back as a genuine Responses-API item sent a
// malformed reconstructed request upstream (translator 400:
// "input item type 'missing' cannot be represented..."), which is worse than
// the plain cache-miss this function is otherwise designed to fail into.
const TRUNCATED_ARRAY_MARKER = "_omniroute_truncated_array";

function containsTruncatedArrayMarker(items: readonly unknown[]): boolean {
  return items.some((item) => isPlainRecord(item) && item[TRUNCATED_ARRAY_MARKER] === true);
}

/**
 * Resolve the full input + output a prior Responses API call produced, so
 * the caller can reconstruct `full_input = stored.input + stored.output +
 * new_delta`. Returns null on any lookup/read/shape failure (unknown id,
 * wrong tenant, artifact missing, or an artifact whose pipeline payload was
 * size-limit-omitted -- see MAX_CALL_LOG_ARTIFACT_BYTES in
 * callLogArtifacts.ts) so the caller can fail closed and ask the client to
 * resend full history, exactly like a real `previous_response_not_found`
 * from OpenAI itself.
 */
export function resolvePreviousResponseState(
  responseId: string,
  apiKeyId: string | null | undefined
): ResponsesContinuationState | null {
  if (!responseId) return null;

  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT artifact_relpath, api_key_id, video_content_removed FROM call_logs
       WHERE response_id = ? AND detail_state = 'ready'
       ORDER BY timestamp DESC LIMIT 1`
    )
    .get(responseId) as
    | { artifact_relpath: string | null; api_key_id: string | null; video_content_removed: number }
    | undefined;

  if (!row || !row.artifact_relpath) return null;
  // Tenant isolation: a response id is only ever handed back to the API key
  // that created it. A stored row with no api_key_id at all (no-log/legacy)
  // can never be resolved by any key -- fail closed rather than guess.
  if (!apiKeyId || row.api_key_id !== apiKeyId) return null;
  // #12150 P2 surface 2: the persisted clientRawRequest snapshot on this row had
  // its video transcript cues structurally redacted to [redacted-video-transcript]
  // before storage (videoBridgeSnapshotRedaction, marker written by the call-log
  // path). The stored input therefore no longer carries the client's real cue
  // text -- reconstructing a continuation off it would forward the placeholder
  // upstream as if it were genuine history. Fail closed so the client resends
  // full history, exactly like a real previous_response_not_found.
  if (row.video_content_removed === 1) return null;

  const { artifact, state } = readCallArtifact(row.artifact_relpath);
  if (state !== "ready" || !artifact?.pipeline) return null;

  const clientRawRequest = artifact.pipeline.clientRawRequest as
    { body?: unknown; effectiveInput?: unknown } | undefined;
  const clientResponse = artifact.pipeline.clientResponse as
    { output?: unknown; summary?: { output?: unknown } } | undefined;

  // clientRawRequest, not providerRequest: this store only ever fires for
  // sourceFormat === OPENAI_RESPONSES (see chat.ts), so the client's own
  // request is always Responses-API shaped and always carries `input`.
  // providerRequest is upstream-shaped and only has `input` for a native
  // passthrough Responses API upstream -- any translated upstream (e.g. Chat
  // Completions `messages`) rewrites the wire body entirely, which made this
  // unconditionally unresolvable for every translate-mode/auto-routed
  // connection (previous_response_not_found on every attempt, regardless of
  // whether the id was real and the artifact was otherwise 'ready').
  //
  // effectiveInput first, body.input as a compat fallback for artifacts
  // logged before this field existed: `body` is captureDeferredClientRawBody's
  // deliberately pre-reconstruction snapshot of the raw client bytes. For a
  // turn that was ITSELF a continuation, that's just the client's own trimmed
  // delta, not the full input that actually dispatched -- chaining off it
  // compounds into a progressively truncated reconstruction a few hops deep
  // (live incident 2026-09-03: a malformed request with no leading
  // system/user message, rejected by the upstream provider). effectiveInput
  // is captured AFTER reconstruction runs (chat.ts) and is what this function
  // must chain off so a multi-hop continuation stays accurate.
  const input = Array.isArray(clientRawRequest?.effectiveInput)
    ? clientRawRequest.effectiveInput
    : isPlainRecord(clientRawRequest?.body)
      ? clientRawRequest.body.input
      : undefined;
  // A streaming clientResponse is clientPayloadCollector.build()'s output, which
  // always nests the caller's summary under `.summary` (see
  // createStructuredSSECollector in streamPayloadCollector.ts) -- a non-streaming
  // one carries `output` directly. Same dual-shape concern as extractResponsesId
  // in open-sse/handlers/chatCore/attemptLogging.ts, checked here independently
  // since this reads back a stored artifact rather than the live object.
  const output = Array.isArray(clientResponse?.output)
    ? clientResponse.output
    : clientResponse?.summary?.output;
  if (!Array.isArray(input) || !Array.isArray(output)) return null;
  if (containsTruncatedArrayMarker(input) || containsTruncatedArrayMarker(output)) return null;

  // Live incident (2026-09-02): a huge/reasoning-heavy response can blow past
  // createStructuredSSECollector's own event-count cap mid-stream -- the
  // stored clientResponse then carries `_truncated: true` and
  // `summary.status: "in_progress"` (never reached "completed") with a
  // genuinely EMPTY `summary.output`, not a bounded array with a
  // containsTruncatedArrayMarker sentinel (that marker only covers an
  // array capped mid-array, not a collector that stopped before ever
  // populating output at all). An empty output array passed the checks
  // above and got merged into the next turn's request as this response's
  // entire contribution -- reconstructing to zero real messages, which the
  // upstream provider then rejected outright ("Input required: specify
  // prompt or messages"), breaking the conversation with no client-visible
  // continuation path. A response the client received as real (successful,
  // non-empty) always has at least one output item; failing closed here
  // makes the caller ask the client to resend full history instead of
  // silently reconstructing an empty one, exactly like a real
  // previous_response_not_found from OpenAI itself.
  if ((clientResponse as { _truncated?: unknown } | undefined)?._truncated === true) return null;
  if (output.length === 0) return null;

  return { input, output };
}

/**
 * Resolve the call-log id that produced `responseId`, for the dashboard's
 * "continues from" link. Reuses the same `call_logs.response_id` index and
 * `api_key_id` tenant scoping as `resolvePreviousResponseState` above -- a
 * parent link must never point across API keys, even just to surface its id.
 * Returns null on any lookup miss so the caller renders no link rather than
 * a broken one.
 */
export function resolveCallLogIdByResponseId(
  responseId: string,
  apiKeyId: string | null | undefined
): string | null {
  if (!responseId || !apiKeyId) return null;

  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT id FROM call_logs
       WHERE response_id = ? AND api_key_id = ?
       ORDER BY timestamp DESC LIMIT 1`
    )
    .get(responseId, apiKeyId) as { id: string } | undefined;

  return row?.id ?? null;
}

/**
 * Extract `previous_response_id` from a call-log's own pipeline payload.
 * Persisted artifacts key the client's own request `clientRawRequest`; the
 * pending/in-flight in-memory shape keys the same thing `clientRequest`
 * instead (RequestLoggerDetail.tsx's payloadSections list carries both keys
 * for the same reason) -- check both so callers get the same answer
 * regardless of which shape the payload came back as.
 */
export function extractPreviousResponseId(
  pipelinePayloads: Record<string, unknown> | null | undefined
): string | null {
  if (!pipelinePayloads) return null;
  for (const key of ["clientRawRequest", "clientRequest"]) {
    const envelope = pipelinePayloads[key];
    const body = isPlainRecord(envelope) && "body" in envelope ? envelope.body : envelope;
    if (isPlainRecord(body) && typeof body.previous_response_id === "string") {
      return body.previous_response_id;
    }
  }
  return null;
}

// isGenuineContinuationTurn is a pure function of one call-log's own
// artifact, which is immutable once written (see callLogs.ts -- detailState
// only flips to "ready" after the artifact is fully persisted) -- the same
// artifactRelPath always answers the same way, forever. Without this cache,
// the dashboard's own default auto-refresh polls the whole conversation list
// on an interval the operator controls (down to 1s), so every tick re-reads
// and re-parses one artifact per visible row for an answer that can never
// change once computed. Keyed on artifactRelPath alone (1:1 with the owning
// call-log row, so apiKeyId never varies for a given key) with simple FIFO
// eviction -- correctness never depends on which entries survive, only on
// staying bounded.
const GENUINE_CONTINUATION_CACHE_MAX = 5000;
const genuineContinuationCache = new Map<string, boolean>();

function cacheGenuineContinuation(key: string, value: boolean): boolean {
  genuineContinuationCache.set(key, value);
  if (genuineContinuationCache.size > GENUINE_CONTINUATION_CACHE_MAX) {
    const oldest = genuineContinuationCache.keys().next().value;
    if (oldest !== undefined) genuineContinuationCache.delete(oldest);
  }
  return value;
}

/**
 * Whether a call-log's own request genuinely continued a prior response
 * server-side: it carried `previous_response_id` AND that id resolved to a
 * real, same-tenant prior call-log row. Backs the /dashboard/conversations
 * "genuine continuation" badge -- a conversation the client-side turn
 * tracker counts as multi-turn (conversationTracker.ts's content-hash chain,
 * independent of transport) is not necessarily one actually running on the
 * `previous_response_id` wire optimization; this checks the transport fact,
 * not the content-hash one.
 */
export function isGenuineContinuationTurn(
  artifactRelPath: string | null | undefined,
  apiKeyId: string | null | undefined
): boolean {
  if (!artifactRelPath) return false;
  const cached = genuineContinuationCache.get(artifactRelPath);
  if (cached !== undefined) return cached;

  const { artifact, state } = readCallArtifact(artifactRelPath);
  if (state !== "ready" || !artifact?.pipeline) {
    return cacheGenuineContinuation(artifactRelPath, false);
  }
  const previousResponseId = extractPreviousResponseId(
    artifact.pipeline as Record<string, unknown>
  );
  if (!previousResponseId) return cacheGenuineContinuation(artifactRelPath, false);

  return cacheGenuineContinuation(
    artifactRelPath,
    resolveCallLogIdByResponseId(previousResponseId, apiKeyId) !== null
  );
}
