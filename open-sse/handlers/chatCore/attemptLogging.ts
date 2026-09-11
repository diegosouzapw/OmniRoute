/**
 * chatCore per-attempt logging persistence (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore: persists one attempt's call log. Emits a provider.warning audit
 * event when the provider response carries warnings, fills the detailed pipeline payloads (when
 * detailed logging is on), and writes the bounded/truncated call-log row (request/response bodies
 * with the Claude prompt-cache meta attached). Best-effort: the saveCallLog write swallows its own
 * errors. The per-request context (provider/model/ids/combo/etc.) is threaded via `ctx` so the 16
 * call sites in the handler stay byte-identical; behaviour is unchanged.
 */

import { extractProviderWarnings } from "@/lib/compliance/providerAudit";
import { logAuditEvent } from "@/lib/compliance";
import { emit } from "@/lib/events/eventBus";
import { maybeLogToolCallSpecViolation } from "./toolCallSpecViolationAudit.ts";
import type { RequestCompletedPayload, RequestFailedPayload } from "@/lib/events/types";
import { saveCallLog } from "@/lib/usageDb";
import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";
import { FORMATS } from "../../translator/formats.ts";
import { takeEarlyKeepaliveBytes } from "../../utils/earlyKeepaliveByteBuffer.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { cloneBoundedChatLogPayload, truncateForLog } from "./logTruncation.ts";
import { attachLogMeta } from "./cacheUsageMeta.ts";

/**
 * Apply the video-bridge redaction shadow (P1a's `meta.videoBridgeLogRedaction`,
 * threaded here via `PersistAttemptLogsContext.videoBridgeLogRedaction`) to a
 * CLONE of `body` before it is serialized into the persisted call log (#12150
 * surface 1).
 *
 * `body` itself is NEVER mutated: by the time an attempt is logged, this same
 * `body` reference has already been sent upstream (the model path), so
 * mutating it here would be both unsafe and pointless. Only the containers on
 * the path to each redacted part are cloned (container array -> message ->
 * content array -> part); every sibling message/part keeps referencing the
 * original objects. Returns `body` unchanged (same reference, no allocation)
 * when there is nothing to redact, so the common non-video path is
 * byte-identical to before this function existed.
 *
 * #12150 fix round 1 (adversarial review, CRITICAL): matches by CONTENT
 * (`entry.fullText === part.text`), never by `entry.messageIndex`/
 * `entry.partIndex`. Those positions are computed by the guardrail's preCall,
 * but request-mutation stages that run AFTER it and BEFORE this log write —
 * `injectSystemPrompt` (prepends a message when no system/developer message
 * exists), context-relay handoff injection, reasoning-rule body rewrites —
 * can prepend or splice the message array, silently invalidating any
 * positional index. A stale index either misses the real part (the
 * transcript is logged unredacted) or, worse, lands on and overwrites an
 * unrelated legitimate message. Scanning every part in the named container
 * for an exact text match finds the video part wherever it ended up and
 * never touches a part whose text differs — see
 * `tests/unit/video-bridge-log-redaction.test.ts`'s "Scenario A" test for the
 * reproduction this fixes.
 *
 * #12430 item 4 (P2c): a message's `content` can also be a plain STRING that
 * embeds `fullText` as a SUBSTRING rather than an exact array part — derived
 * dispatches (pipeline-strategy stages, smart-auto-pipeline, context-handoff
 * summaries) all interpolate the transcript blob into a larger rendered
 * prompt string before calling `handleSingleModel`. That string branch is
 * mutually exclusive with the array branch (a message's `content` is one or
 * the other, never both) and uses `String.prototype.replaceAll` against the
 * trusted `fullText` literal to swap every occurrence — see
 * `tests/unit/video-bridge-derived-prompt-redaction.test.ts`.
 */
export function applyVideoBridgeLogRedaction(
  body: unknown,
  redaction: VideoBridgeLogRedactionEntry[] | null | undefined
): unknown {
  if (!redaction || redaction.length === 0) return body;
  if (!body || typeof body !== "object") return body;

  const source = body as Record<string, unknown>;
  let rootClone: Record<string, unknown> | null = null;
  let redacted = false;
  const clonedContainers = new Map<string, unknown[]>();
  const clonedMessages = new Map<string, Record<string, unknown>>();

  for (const entry of redaction) {
    const { container, fullText, redactedText } = entry;
    if (typeof fullText !== "string" || fullText.length === 0) continue;
    const originalContainer = source[container];
    if (!Array.isArray(originalContainer)) continue;
    // Mirrors the exact `type` replaceVideoParts() writes for this container
    // (videoBridgeHelpers.ts) — a stronger anchor than a loose "text-like"
    // check, at zero extra cost.
    const expectedPartType = container === "input" ? "input_text" : "text";

    for (let messageIndex = 0; messageIndex < originalContainer.length; messageIndex++) {
      const originalMessage = originalContainer[messageIndex];
      if (!originalMessage || typeof originalMessage !== "object") continue;
      const originalContent = (originalMessage as Record<string, unknown>).content;

      // Derived-prompt dispatches (pipeline-strategy stages, smart-auto-pipeline,
      // context-handoff summaries — #12430 item 4) embed the transcript as a
      // SUBSTRING of a plain string `content`, e.g. a rendered stage prompt or a
      // `{HISTORY}`-interpolated handoff summary, never as an exact array part.
      // Mutually exclusive with the array branch below: a message's `content`
      // is either a string or an array, never both, so this and the
      // `Array.isArray` check never both match the same message.
      if (typeof originalContent === "string") {
        if (!originalContent.includes(fullText)) continue;

        // Same lazy clone-on-write as the array branch: root -> container
        // array -> this message. Siblings keep referencing the originals.
        if (!rootClone) rootClone = { ...source };
        let containerClone = clonedContainers.get(container);
        if (!containerClone) {
          containerClone = [...originalContainer];
          clonedContainers.set(container, containerClone);
          rootClone[container] = containerClone;
        }

        const messageKey = `${container}:${messageIndex}`;
        let messageClone = clonedMessages.get(messageKey);
        if (!messageClone) {
          messageClone = { ...(originalMessage as Record<string, unknown>) };
          clonedMessages.set(messageKey, messageClone);
          containerClone[messageIndex] = messageClone;
        }

        // Re-read from the (possibly already-cloned) message so a second
        // redaction entry matching the same string content composes with the
        // first instead of clobbering it. `fullText` is a trusted literal
        // (the `[Video description:...]` blob), so replaceAll(string, string)
        // needs no regex and is safe. replaceAll (not replace): a stage/summary
        // prompt can quote the transcript back more than once.
        const currentText =
          typeof messageClone.content === "string" ? messageClone.content : originalContent;
        messageClone.content = currentText.replaceAll(fullText, redactedText);
        redacted = true;
        continue;
      }
      if (!Array.isArray(originalContent)) continue;

      for (let partIndex = 0; partIndex < originalContent.length; partIndex++) {
        const originalPart = originalContent[partIndex];
        if (!originalPart || typeof originalPart !== "object") continue;
        const partRecord = originalPart as Record<string, unknown>;
        if (partRecord.type !== expectedPartType) continue;
        if (partRecord.text !== fullText) continue;

        // Content-address match — clone the path down to this part lazily
        // (root -> container array -> this message -> its content array),
        // leaving every other sibling on the original references.
        if (!rootClone) rootClone = { ...source };
        let containerClone = clonedContainers.get(container);
        if (!containerClone) {
          containerClone = [...originalContainer];
          clonedContainers.set(container, containerClone);
          rootClone[container] = containerClone;
        }

        const messageKey = `${container}:${messageIndex}`;
        let messageClone = clonedMessages.get(messageKey);
        if (!messageClone) {
          messageClone = {
            ...(originalMessage as Record<string, unknown>),
            content: [...originalContent],
          };
          clonedMessages.set(messageKey, messageClone);
          containerClone[messageIndex] = messageClone;
        }

        const contentClone = messageClone.content as unknown[];
        contentClone[partIndex] = { ...partRecord, text: redactedText };
        redacted = true;
      }
    }
  }

  return redacted && rootClone ? rootClone : body;
}

/**
 * Extract the OpenAI Responses API response id this attempt produced, so it
 * can be indexed for OmniRoute-native `previous_response_id` continuation
 * (see src/lib/db/responsesContinuationStore.ts). Only meaningful when the
 * client actually used the Responses endpoint -- a Chat Completions
 * `chatcmpl-*` id must never be mistaken for a Responses response id.
 *
 * A non-streaming clientResponse carries `id` directly. A streaming one goes
 * through clientPayloadCollector.build(), which always nests the caller's
 * summary under `.summary` (see createStructuredSSECollector in
 * streamPayloadCollector.ts) -- check both shapes rather than assuming one.
 */
export function extractResponsesId(sourceFormat: unknown, clientResponse: unknown): string | null {
  if (sourceFormat !== FORMATS.OPENAI_RESPONSES) return null;
  if (!clientResponse || typeof clientResponse !== "object") return null;
  const record = clientResponse as { id?: unknown; summary?: unknown };
  const directId = record.id;
  if (typeof directId === "string" && directId.length > 0) return directId;
  const summary = record.summary;
  if (summary && typeof summary === "object") {
    const summaryId = (summary as { id?: unknown }).id;
    if (typeof summaryId === "string" && summaryId.length > 0) return summaryId;
  }
  return null;
}

export type PersistAttemptLogsArgs = {
  status: number;
  tokens?: unknown;
  responseBody?: unknown;
  error?: string | null;
  providerRequest?: unknown;
  providerResponse?: unknown;
  clientResponse?: unknown;
  claudeCacheMeta?: Record<string, unknown>;
  claudeCacheUsageMeta?: Record<string, unknown>;
  cacheSource?: "upstream" | "semantic";
};

export type PersistAttemptLogsContext = {
  /** Per-attempt trace id — MUST match the id emitted in `request.started` so the live
   * dashboard can pair the terminal event and clear the topology node's active pulse. */
  traceId: string;
  provider: string | null | undefined;
  connectionId: string | null | undefined;
  model: string | null | undefined;
  skillRequestId: string;
  detailedLoggingEnabled: boolean;
  reqLogger: { getPipelinePayloads?: () => Record<string, unknown> | undefined } | null | undefined;
  pendingRequestId: unknown;
  clientRawRequest: { endpoint?: string } | null | undefined;
  requestedModel: unknown;
  credentials: { connectionId?: string } | null | undefined;
  startTime: number;
  body: unknown;
  sourceFormat: unknown;
  targetFormat: unknown;
  comboName: unknown;
  comboStepId: unknown;
  comboExecutionKey: unknown;
  tokensCompressed: unknown;
  apiKeyInfo: { id?: string | null; name?: string | null } | null | undefined;
  noLogEnabled: unknown;
  correlationId?: string | null;
  modelPinned?: boolean;
  /** #8249: caller-supplied X-OmniRoute-Session-Id header, only set when the header was
   * explicitly present (never synthesized from skillRequestId) — persisted as call_logs.session_tag
   * for per-session cost attribution. */
  sessionTag?: string | null;
  /**
   * #12150 P1b: video-bridge structured-redaction shadow (P1a's
   * `meta.videoBridgeLogRedaction`), threaded from chat.ts's
   * `preCallGuardrails.results` down through handleChatCore. When present,
   * `applyVideoBridgeLogRedaction` swaps each mapped part's text for the
   * placeholder in the CLONE that gets persisted — `body` itself (the model
   * path) is never touched. Omitted/empty for every non-video request.
   */
  videoBridgeLogRedaction?: VideoBridgeLogRedactionEntry[];
  /**
   * #12150 P2 surface 2: true when the video-bridge guardrail observed and
   * rewrote video parts on this request, so the persisted client snapshot had
   * its transcript cues structurally redacted (videoBridgeObserved in
   * chatCore.ts). Written to the `call_logs.video_content_removed` marker so
   * `resolvePreviousResponseState` refuses to rehydrate this row as continuation
   * history. Omitted/false for every non-video request.
   */
  videoContentRemoved?: boolean;
};

function toConnectionId(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function buildAccountRotationMeta(
  provider: string | null | undefined,
  initialConnectionId: string | null,
  finalConnectionId: string | null
) {
  if (provider !== "codex" || !initialConnectionId || !finalConnectionId) return null;
  if (initialConnectionId === finalConnectionId) return null;

  return {
    codexAccountRotation: {
      initialConnectionId,
      finalConnectionId,
    },
  };
}

/**
 * Pure resolver for the terminal request-lifecycle dashboard event. Extracted so the
 * "stuck green" latch fix (emitting request.completed/failed to clear the live topology
 * node) is unit-testable without the DB write in persistAttemptLogs. A 2xx/3xx status
 * with no error is a completion; everything else (including a missing/odd status) is a
 * failure. `id` mirrors the `traceId` used by the paired `request.started`.
 */
export function resolveRequestLifecycleEvent(input: {
  traceId: string;
  status: number;
  error?: string | null;
  model?: string | null;
  provider?: string | null;
  comboName?: unknown;
  tokens?: unknown;
  latencyMs: number;
}):
  | { name: "request.completed"; payload: RequestCompletedPayload }
  | { name: "request.failed"; payload: RequestFailedPayload } {
  const { traceId, status, error, model, provider, comboName, tokens, latencyMs } = input;
  const succeeded = typeof status === "number" && status >= 200 && status < 400 && !error;
  const resolvedComboName = typeof comboName === "string" && comboName ? comboName : undefined;
  if (succeeded) {
    const tokenBag = (tokens && typeof tokens === "object" ? tokens : {}) as Record<
      string,
      unknown
    >;
    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
    return {
      name: "request.completed",
      payload: {
        id: traceId,
        status: "success",
        model: model || "unknown",
        provider: provider || "unknown",
        tokensInput: num(tokenBag.input ?? tokenBag.prompt_tokens ?? tokenBag.inputTokens),
        tokensOutput: num(tokenBag.output ?? tokenBag.completion_tokens ?? tokenBag.outputTokens),
        latencyMs,
        comboName: resolvedComboName,
      },
    };
  }
  return {
    name: "request.failed",
    payload: {
      id: traceId,
      // Dashboard listeners and event history cross a public WebSocket boundary. Keep the raw
      // diagnostic in the call log/pipeline above, but expose only the canonical safe projection.
      error: sanitizeErrorMessage(error || `HTTP ${status}`),
      statusCode: typeof status === "number" ? status : undefined,
      latencyMs,
      model: model || undefined,
      provider: provider || undefined,
    },
  };
}

export function persistAttemptLogs(args: PersistAttemptLogsArgs, ctx: PersistAttemptLogsContext) {
  const {
    status,
    tokens,
    responseBody,
    error,
    providerRequest,
    providerResponse,
    clientResponse,
    claudeCacheMeta,
    claudeCacheUsageMeta,
    cacheSource,
  } = args;
  const {
    traceId,
    provider,
    connectionId,
    model,
    skillRequestId,
    detailedLoggingEnabled,
    reqLogger,
    pendingRequestId,
    clientRawRequest,
    requestedModel,
    credentials,
    startTime,
    body,
    sourceFormat,
    targetFormat,
    comboName,
    comboStepId,
    comboExecutionKey,
    tokensCompressed,
    apiKeyInfo,
    noLogEnabled,
    correlationId,
    modelPinned,
    sessionTag,
    videoBridgeLogRedaction,
    videoContentRemoved,
  } = ctx;
  const initialConnectionId = toConnectionId(connectionId);
  const finalConnectionId = toConnectionId(credentials?.connectionId) || initialConnectionId;
  const accountRotationMeta = buildAccountRotationMeta(
    provider,
    initialConnectionId,
    finalConnectionId
  );

  const providerWarnings = extractProviderWarnings(providerResponse, clientResponse, responseBody);
  if (providerWarnings.length > 0) {
    logAuditEvent({
      action: "provider.warning",
      actor: "system",
      target: [provider, finalConnectionId].filter(Boolean).join(":") || provider || model,
      resourceType: "provider_warning",
      status: "warning",
      requestId: skillRequestId,
      details: {
        provider,
        model,
        connectionId: finalConnectionId,
        httpStatus: status,
        warnings: providerWarnings,
      },
    });
  }

  maybeLogToolCallSpecViolation({
    responseBody,
    provider,
    model,
    connectionId: finalConnectionId,
    httpStatus: status,
    requestId: skillRequestId,
  });

  const capturedPipeline = reqLogger?.getPipelinePayloads?.() ?? null;
  const pipelinePayloads = detailedLoggingEnabled
    ? (capturedPipeline ?? {})
    : capturedPipeline?.routeDecision
      ? { routeDecision: capturedPipeline.routeDecision }
      : null;

  if (pipelinePayloads) {
    if (providerRequest !== undefined && !pipelinePayloads.providerRequest) {
      pipelinePayloads.providerRequest = providerRequest as Record<string, unknown>;
    }
    if (providerResponse !== undefined && !pipelinePayloads.providerResponse) {
      pipelinePayloads.providerResponse = providerResponse as Record<string, unknown>;
    }
    if (clientResponse !== undefined) {
      pipelinePayloads.clientResponse = clientResponse as Record<string, unknown>;
    }
    if (error) {
      pipelinePayloads.error = {
        ...(typeof pipelinePayloads.error === "object" && pipelinePayloads.error
          ? (pipelinePayloads.error as Record<string, unknown>)
          : {}),
        message: error,
      };
    }
    // withEarlyStreamKeepalive writes keepalive/startup/error frames directly
    // to the client from OUTSIDE this handler's own reqLogger, so they never
    // reach reqLogger.appendConvertedChunk. correlationId is the only thing
    // both sides share (see earlyKeepaliveByteBuffer.ts's file doc for why);
    // merge here, once, right before persistence, prepended in send order.
    if (detailedLoggingEnabled && correlationId) {
      const earlyClientBytes = takeEarlyKeepaliveBytes(correlationId);
      if (earlyClientBytes.length > 0) {
        const existingStreamChunks =
          (pipelinePayloads.streamChunks as { client?: string[] } | undefined) ?? {};
        pipelinePayloads.streamChunks = {
          ...existingStreamChunks,
          client: [...earlyClientBytes, ...(existingStreamChunks.client ?? [])],
        };
      }
    }
  }

  saveCallLog({
    id: pendingRequestId,
    method: "POST",
    path: clientRawRequest?.endpoint || "/v1/chat/completions",
    status,
    model,
    requestedModel,
    provider,
    connectionId: finalConnectionId || undefined,
    duration: Date.now() - startTime,
    tokens: tokens || {},
    requestBody: cloneBoundedChatLogPayload(
      attachLogMeta(
        truncateForLog(
          applyVideoBridgeLogRedaction(body, videoBridgeLogRedaction) as Record<string, unknown>
        ),
        {
          ...accountRotationMeta,
          claudePromptCache: claudeCacheMeta,
        }
      )
    ),
    responseBody: cloneBoundedChatLogPayload(
      attachLogMeta(truncateForLog(responseBody as Record<string, unknown>), {
        ...accountRotationMeta,
        claudePromptCache: claudeCacheMeta
          ? {
              applied: claudeCacheMeta.applied,
              totalBreakpoints: claudeCacheMeta.totalBreakpoints,
              anthropicBeta: claudeCacheMeta.anthropicBeta,
            }
          : null,
        claudePromptCacheUsage: claudeCacheUsageMeta,
      })
    ),
    error: error || null,
    sourceFormat,
    targetFormat,
    comboName,
    comboStepId,
    comboExecutionKey,
    tokensCompressed,
    cacheSource: cacheSource === "semantic" ? "semantic" : "upstream",
    apiKeyId: apiKeyInfo?.id || null,
    apiKeyName: apiKeyInfo?.name || null,
    noLog: noLogEnabled,
    pipelinePayloads,
    correlationId,
    modelPinned: modelPinned || false,
    sessionTag: sessionTag || null,
    responseId: extractResponsesId(sourceFormat, clientResponse),
    videoContentRemoved: videoContentRemoved || false,
  }).catch(() => {});

  // Emit the terminal request-lifecycle event to the live dashboard bus. `request.started`
  // is emitted in chatCore with this same `traceId`; without a matching completed/failed the
  // client's active-request map never drains, so the topology node stays green forever (the
  // "stuck green" latch — request.completed/failed were declared + consumed but never emitted).
  // Deferred via setImmediate to keep it off the response hot path, mirroring request.started.
  setImmediate(() => {
    const lifecycle = resolveRequestLifecycleEvent({
      traceId,
      status,
      error,
      model,
      provider,
      comboName,
      tokens,
      latencyMs: Date.now() - startTime,
    });
    if (lifecycle.name === "request.completed") {
      emit("request.completed", lifecycle.payload);
    } else {
      emit("request.failed", lifecycle.payload);
    }
  });
}
