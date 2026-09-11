/**
 * #12150 P2 surface 1 (the dominant transcript-retention leak): structured redaction of
 * video transcript fields on the CLIENT-REQUEST SNAPSHOT that lands in the detailed-log
 * artifact.
 *
 * `clientRawRequest.body` (src/sse/handlers/chat/clientRawRequest.ts::buildClientRawRequest)
 * is a bounded clone of the client's ORIGINAL request, captured BEFORE the guardrail chain
 * runs, and persisted verbatim by `reqLogger.logClientRawRequest`
 * (open-sse/handlers/chatCore.ts). Because it predates the video-bridge guardrail's own
 * description redaction (#12150 P1 — see `describeVideoPart`'s `descriptionRedacted` in
 * videoBridgeHelpers.ts), it still carries the client's raw `transcript` / `audioTranscript`
 * cue text on any video part. This module redacts THAT COPY ONLY: the body sent to the
 * provider and the response returned to the client are never touched here.
 *
 * Deliberately a standalone, dependency-light module — NOT part of videoBridgeHelpers.ts,
 * which pulls in the frame-extraction broker client, audio/video fusion, contact-sheet
 * composition and `sharp` for real video processing. The chat request hot path statically
 * imports whatever module owns the `logClientRawRequest` call site on every request
 * (video or not), so keeping this redaction free of that dependency chain matters for cold
 * start and blast radius.
 *
 * The field walk mirrors `extractVideoParts` (videoBridgeHelpers.ts): for each content part,
 * the candidate objects are the part itself, its `video_url` sub-object, and its `source`
 * sub-object (the same three checked there) — but this walk is deliberately WIDER: any of
 * those objects carrying a `transcript`/`audioTranscript` key gets redacted regardless of
 * the part's `type`/shape. Those two field names are video-cue-only in this codebase's
 * request contract, so matching on field presence rather than a shape allowlist is strictly
 * safer (fails closed on an unusual or future video shape instead of silently skipping it).
 * Redaction is a structured field substitution, not a scan over rendered text, so it cannot
 * be bypassed by adversarial cue content (see the discarded regex approach recorded in the
 * #12150 design doc, `_tasks/superpowers/specs/2026-09-01-video-transcript-retention-design.md`).
 */

// Kept as a local literal (not imported from videoBridgeHelpers.ts) for the reason in the
// file header above. Equality with the canonical `VIDEO_TRANSCRIPT_REDACTION_PLACEHOLDER`
// export is enforced by a drift test in
// tests/unit/guardrails/videoBridgeSnapshotRedaction.test.ts.
const REDACTION_PLACEHOLDER = "[redacted-video-transcript]";

const TRANSCRIPT_FIELD_NAMES = ["transcript", "audioTranscript"] as const;
const NESTED_SUBOBJECT_KEYS = ["video_url", "source"] as const;
const CONTAINER_KEYS = ["messages", "input"] as const;

type UnknownRecord = Record<string, unknown>;

function isPlainRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Overwrites transcript field VALUES in place on `part` and its `video_url`/`source`
 * sub-objects. Only ever called on a part that already lives inside the function's own
 * `structuredClone`, never on caller-owned data. Keys are overwritten, never deleted, so
 * downstream shape/observability (e.g. "this part had a transcript") is preserved.
 */
function redactTranscriptFieldsOnPart(part: unknown): void {
  if (!isPlainRecord(part)) return;
  const candidates: UnknownRecord[] = [part];
  for (const key of NESTED_SUBOBJECT_KEYS) {
    const nested = part[key];
    if (isPlainRecord(nested)) candidates.push(nested);
  }
  for (const candidate of candidates) {
    for (const field of TRANSCRIPT_FIELD_NAMES) {
      if (candidate[field] !== undefined) {
        candidate[field] = REDACTION_PLACEHOLDER;
      }
    }
  }
}

function redactContentArray(content: unknown): void {
  if (!Array.isArray(content)) return;
  for (const part of content) {
    redactTranscriptFieldsOnPart(part);
  }
}

/** `messages` (Chat Completions) or `input` (Responses API) — either container shape. */
function redactContainer(container: unknown): void {
  if (!Array.isArray(container)) return;
  for (const message of container) {
    if (!isPlainRecord(message)) continue;
    redactContentArray(message.content);
  }
}

/**
 * Returns a NEW structure with every video transcript cue field value replaced by the
 * redaction placeholder. Never mutates `body` — the caller (chatCore.ts) must keep passing
 * the untouched original to translation/dispatch/response. A non-object `body`, or one with
 * neither `messages` nor `input`, or with video parts that carry no transcript field, is
 * returned as an equivalent (cloned) structure with nothing to change.
 */
export function redactVideoTranscriptFieldsForLog(body: unknown): unknown {
  if (!isPlainRecord(body)) return body;
  const cloned = structuredClone(body) as UnknownRecord;
  for (const key of CONTAINER_KEYS) {
    redactContainer(cloned[key]);
  }
  return cloned;
}

interface ClientRawRequestLike {
  endpoint: unknown;
  body: unknown;
  headers?: unknown;
  effectiveInput?: unknown;
}

interface RequestLoggerLike {
  logClientRawRequest: (
    endpoint: unknown,
    body: unknown,
    headers?: unknown,
    effectiveInput?: unknown
  ) => void;
}

/**
 * Call-site wrapper for `reqLogger.logClientRawRequest` (chatCore.ts's "0. Log client raw
 * request" step): keeps the null-check and the observed/redacted guard out of chatCore.ts,
 * which is a size-frozen file (`config/quality/file-size-baseline.json`) — this owns the
 * redaction, so it owns the one guarded call site that applies it. Behavior is identical to
 * the inline block it replaces: a non-observed request logs `clientRawRequest.body` by the
 * exact same reference (no clone); an observed one logs the redacted clone.
 */
export function logClientRawRequestRedacted(
  reqLogger: RequestLoggerLike,
  clientRawRequest: ClientRawRequestLike | null | undefined,
  videoBridgeObserved: boolean
): void {
  if (!clientRawRequest) return;
  reqLogger.logClientRawRequest(
    clientRawRequest.endpoint,
    videoBridgeObserved
      ? redactVideoTranscriptFieldsForLog(clientRawRequest.body)
      : clientRawRequest.body,
    clientRawRequest.headers,
    clientRawRequest.effectiveInput
  );
}

/**
 * Call-site wrapper for the `clientRequest` field stored by `trackPendingRequest`
 * (open-sse/handlers/chatCore.ts): the sibling in-memory leak to
 * `logClientRawRequestRedacted` above — same raw body, but live-exposed via
 * /api/usage/call-logs (pendingDetails), /api/logs/[id] and /api/conversations
 * while the request is in-flight, not just in the persisted detailed-log
 * snapshot. Identical observed/non-observed branching: a non-observed request
 * keeps the exact same reference (no clone); an observed one gets the redacted
 * clone.
 */
export function redactPendingBody(clientRequest: unknown, videoBridgeObserved: boolean): unknown {
  return videoBridgeObserved ? redactVideoTranscriptFieldsForLog(clientRequest) : clientRequest;
}
