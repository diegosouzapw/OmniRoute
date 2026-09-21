/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
import type {
  AdapterEvent,
  CodexMessagePhase,
  CodexProviderContinuationState,
  CodexUsage,
} from "./types";
import { projectCodexPublicError } from "../../utils/codexPublicError";
import { adapterFailureFromMessage, classifyError, type CodexErrorPayload } from "./lib/errors";
import { encodeCompactionSummary } from "./responses/compaction";
import { encodeReasoningEnvelope, type ReasoningEnvelope } from "./responses/reasoning-envelope";
import { resolveStallTimeoutSec } from "./stall-timeout";
import { usageDisplayTotalTokens } from "./usage/totals";

function uuid(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

function sseEvent(name: string, data: Record<string, unknown>): string {
  return `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`;
}

function responsesUsage(usage: CodexUsage | undefined): Record<string, unknown> {
  if (!usage) return { input_tokens: 0, output_tokens: 0, total_tokens: 0 };
  // inputTokens is already inclusive of cache read/write (types.ts convention).
  const inputTokens = usage.inputTokens;
  const out: Record<string, unknown> = {
    input_tokens: inputTokens,
    output_tokens: usage.outputTokens,
    total_tokens: usageDisplayTotalTokens(usage) ?? inputTokens + usage.outputTokens,
  };
  const inputDetails: Record<string, number> = {};
  if (usage.cachedInputTokens !== undefined) {
    // cached_tokens carries cache READS only, matching OpenAI semantics.
    inputDetails.cached_tokens = usage.cachedInputTokens;
  }
  if (usage.cacheCreationInputTokens !== undefined) {
    inputDetails.cache_write_tokens = usage.cacheCreationInputTokens;
  }
  if (Object.keys(inputDetails).length > 0) {
    out.input_tokens_details = inputDetails;
  }
  if (usage.reasoningOutputTokens !== undefined) {
    out.output_tokens_details = { reasoning_tokens: usage.reasoningOutputTokens };
  }
  return out;
}

function responseError(status: number, type: string, message: string): CodexErrorPayload {
  const classified = classifyError(status, type, message);
  return projectCodexPublicError({ status, type: classified.type, code: classified.code });
}

function adapterFailureFromEvent(event: Extract<AdapterEvent, { type: "error" }>): {
  httpStatus: number;
  error: CodexErrorPayload;
} {
  if (event.status === undefined && event.errorType === undefined && event.code === undefined) {
    const fallback = adapterFailureFromMessage(event.message);
    return {
      httpStatus: fallback.httpStatus,
      error: projectCodexPublicError({
        status: fallback.httpStatus,
        type: fallback.error.type,
        code: fallback.error.code,
      }),
    };
  }
  const fallback = adapterFailureFromMessage(event.message);
  const httpStatus = event.status ?? fallback.httpStatus;
  const error = classifyError(httpStatus, event.errorType ?? fallback.error.type, event.message);
  if (event.errorType !== undefined) error.type = event.errorType;
  if (event.code !== undefined) error.code = event.code;
  return {
    httpStatus,
    error: projectCodexPublicError({ status: httpStatus, type: error.type, code: error.code }),
  };
}

export { adapterFailureFromMessage } from "./lib/errors";

interface OutputItem {
  type: string;
  id: string;
  [key: string]: unknown;
}

const PLAINTEXT_COLLABORATION_CALLS = new Set(["spawn_agent", "send_message", "followup_task"]);

/**
 * Codex MultiAgent V2 normally treats collaboration message arguments as backend ciphertext.
 * An empty encrypted_function_args list is the protocol's explicit plaintext-delivery marker.
 */
function plaintextCollaborationFields(
  namespace: string | undefined,
  name: string
): Record<string, unknown> {
  return namespace === "collaboration" && PLAINTEXT_COLLABORATION_CALLS.has(name)
    ? { encrypted_function_args: [] }
    : {};
}

export type ResponsesTerminalStatus = "completed" | "failed" | "incomplete";

export function bridgeToResponsesSSE(
  events: AsyncIterable<AdapterEvent>,
  modelId: string,
  toolNsMap?: Map<string, { namespace: string; name: string }>,
  freeformToolNames?: Set<string>,
  toolSearchToolNames?: Set<string>,
  onCancel?: () => void,
  heartbeatMs = 2_000,
  options?: {
    responseId?: string;
    stallTimeoutSec?: number;
    hideThinkingSummary?: boolean;
    /**
     * Remote compaction v2 turn: accumulate all assistant text and, on done, emit ONE synthetic
     * `{type:"compaction", encrypted_content:"ocx1:"+base64(text)}` output item before
     * response.completed — codex-rs collect_compaction_output requires exactly one.
     */
    compaction?: boolean;
    /** One-shot: first non-empty text/thinking/raw-reasoning delta observed (WP4 TTFT). */
    onFirstOutput?: () => void;
    onTerminal?: (status: ResponsesTerminalStatus) => void;
    onCompletedResponse?: (
      response: Record<string, unknown>,
      providerState?: CodexProviderContinuationState
    ) => void;
    /** Test seam for the platform-specific Bun stream transport. */
    streamPlatform?: NodeJS.Platform;
  }
): ReadableStream<Uint8Array> {
  // Freeform/custom tools (apply_patch) carry their body in `input`; the model is given a
  // function with `{input:string}`, so unwrap it here when relaying back as a custom_tool_call.
  const freeformInput = (args: string): string => {
    try {
      const o = JSON.parse(args);
      if (o && typeof o.input === "string") return o.input;
    } catch {
      /* raw */
    }
    return args;
  };
  // Best-effort unwrap of a PARTIAL freeform arg buffer for live input streaming
  // (`response.custom_tool_call_input.delta` — codex-rs uses it for UI preview only;
  // the completed custom_tool_call item stays authoritative). Compact `{"input":"...`
  // buffers get their string value progressively unescaped; anything else streams raw.
  const FREEFORM_WRAP_PREFIX = '{"input":"';
  const freeformPartialInput = (args: string): string => {
    if (!args.startsWith(FREEFORM_WRAP_PREFIX)) return args;
    const body = args.slice(FREEFORM_WRAP_PREFIX.length);
    let out = "";
    for (let i = 0; i < body.length; i++) {
      const c = body[i];
      if (c === '"') break; // unescaped closing quote: value complete
      if (c === "\\") {
        const n = body[i + 1];
        if (n === undefined) break; // escape split across chunks: wait for more
        i++;
        if (n === "n") out += "\n";
        else if (n === "t") out += "\t";
        else if (n === "r") out += "\r";
        else if (n === "u") {
          const hex = body.slice(i + 1, i + 5);
          if (hex.length === 4 && /^[0-9a-fA-F]{4}$/.test(hex)) {
            out += String.fromCharCode(parseInt(hex, 16));
            i += 4;
          } else break; // incomplete \uXXXX: wait for more
        } else out += n; // \" \\ \/ etc.
      } else out += c;
    }
    return out;
  };
  // tool_search_call carries arguments as a JSON object ({query, limit}); parse the model's arg string.
  const parseArgsObj = (args: string): Record<string, unknown> => {
    try {
      const o = JSON.parse(args);
      return o && typeof o === "object" ? o : {};
    } catch {
      return {};
    }
  };
  const encoder = new TextEncoder();
  const responseId = options?.responseId ?? `resp_${uuid()}`;
  let seq = 0;
  // Set once the client is gone (cancel) or an enqueue throws on a torn-down controller, so we
  // never enqueue again and never throw a second time inside start() — the RC2 double-throw that
  // otherwise surfaced as proxy-side stream noise on every client disconnect.
  let closed = false;
  let clientCancelled = false;
  let terminalReported = false;
  const reportTerminal = (status: ResponsesTerminalStatus) => {
    if (terminalReported || clientCancelled || closed) return;
    terminalReported = true;
    options?.onTerminal?.(status);
  };
  // RC3 keep-alive: Codex's idle timer is timeout(idle_timeout, stream.next()) over an
  // eventsource_stream; ANY received event re-arms it, while an unknown type is ignored
  // (responses.rs `_ => Ok(None)`). We emit a real, parser-ignored `response.heartbeat` only during
  // upstream silence so a stalled routed provider never trips "idle timeout waiting for SSE".
  let activity = false;
  let beat: ReturnType<typeof setInterval> | undefined;
  let controller: ReadableStreamDefaultController<Uint8Array>;
  let emittedFrames = 0;
  let gated = false;
  let stepping = false;
  const emit = (name: string, data: Record<string, unknown>) => {
    if (closed) return;
    activity = true;
    try {
      controller.enqueue(
        encoder.encode(sseEvent(name, { type: name, sequence_number: seq++, ...data }))
      );
      emittedFrames++;
    } catch {
      closed = true;
    }
  };
  const emitDone = () => {
    if (closed) return;
    try {
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      emittedFrames++;
    } catch {
      closed = true;
    }
  };

  const createdAt = Math.floor(Date.now() / 1000);
  let outputIndex = 0;
  const finishedItems: OutputItem[] = [];

  const responseSnapshot = (status: string, output: OutputItem[], endTurn?: boolean) => ({
    id: responseId,
    object: "response",
    created_at: createdAt,
    status,
    model: modelId,
    output,
    usage: null,
    ...(endTurn !== undefined ? { end_turn: endTurn } : {}),
  });

  const heartbeatFrame = encoder.encode(
    'event: response.heartbeat\ndata: {"type":"response.heartbeat"}\n\n'
  );
  let stallTicks = 0;
  let stallWarned = false;
  let lastAdapterEventAt = Date.now();
  let lastAdapterEventType = "<none>";
  let adapterEventCount = 0;
  const streamStartedAt = Date.now();
  const stallSec = resolveStallTimeoutSec(options?.stallTimeoutSec);
  const maxStallTicks = Math.ceil((stallSec * 1000) / heartbeatMs);

  let currentMsg: {
    itemId: string;
    outputIndex: number;
    text: string;
    phase?: CodexMessagePhase;
  } | null = null;
  let currentReasoning: { itemId: string; outputIndex: number; text: string } | null = null;
  let currentRawReasoning: { itemId: string; outputIndex: number; text: string } | null = null;
  // Opaque signed-reasoning round-trip state: the signature signs the CURRENT thinking
  // block; redacted blocks are opaque payloads replayed verbatim. Attached to the reasoning
  // item as an ocxr1 encrypted_content envelope on close. hiddenThinkingText collects the
  // suppressed text under hideThinkingSummary so the signed text still round-trips.
  let pendingSignature: string | undefined;
  let pendingRedacted: string[] = [];
  let hiddenThinkingText = "";
  const takeReasoningEnvelope = (hiddenText?: string): string | undefined => {
    if (!pendingSignature && pendingRedacted.length === 0) return undefined;
    const envelope: ReasoningEnvelope = {};
    if (pendingSignature) envelope.sig = pendingSignature;
    if (pendingRedacted.length > 0) envelope.red = pendingRedacted;
    if (hiddenText) envelope.txt = hiddenText;
    pendingSignature = undefined;
    pendingRedacted = [];
    return encodeReasoningEnvelope(envelope);
  };
  // hideThinkingSummary path: no visible reasoning item exists, but a signed thinking block
  // must still round-trip — emit an envelope-only reasoning item (empty summary, no text leak).
  const flushHiddenReasoningEnvelope = () => {
    const encrypted = takeReasoningEnvelope(hiddenThinkingText || undefined);
    hiddenThinkingText = "";
    if (!encrypted) return;
    const itemId = `rs_${uuid()}`;
    const item = {
      type: "reasoning",
      id: itemId,
      summary: [] as never[],
      encrypted_content: encrypted,
    };
    emit("response.output_item.added", { output_index: outputIndex, item });
    emit("response.output_item.done", { output_index: outputIndex, item });
    finishedItems.push(item as OutputItem);
    outputIndex++;
  };
  // hideThinkingSummary for raw reasoning: no
  // visible reasoning item is emitted — the app renders nothing, so tool cells keep grouping
  // like native models — but the text still round-trips in a txt-only ocxr1 envelope so
  // preserveReasoningContentModels replay (GLM interleaved thinking) keeps working. Direct
  // encodeReasoningEnvelope: takeReasoningEnvelope's sig/red guard would drop txt-only.
  let hiddenRawReasoningText = "";
  const flushHiddenRawReasoning = () => {
    if (!hiddenRawReasoningText) return;
    const encrypted = encodeReasoningEnvelope({ txt: hiddenRawReasoningText });
    hiddenRawReasoningText = "";
    const itemId = `rs_${uuid()}`;
    const item = {
      type: "reasoning",
      id: itemId,
      summary: [] as never[],
      encrypted_content: encrypted,
    };
    emit("response.output_item.added", { output_index: outputIndex, item });
    emit("response.output_item.done", { output_index: outputIndex, item });
    finishedItems.push(item as OutputItem);
    outputIndex++;
  };
  // Full assistant text of a compaction turn (across message boundaries) — becomes the
  // synthetic compaction item's payload on done.
  let compactionText = "";
  let currentToolCall: {
    itemId: string;
    outputIndex: number;
    callId: string;
    name: string;
    args: string;
    namespace?: string;
    freeform?: boolean;
    toolSearch?: boolean;
    inputEmitted?: string;
  } | null = null;
  const closeCurrentMessage = () => {
    if (!currentMsg) return;
    // Finalize the text part (Responses protocol). Without these .done events Codex never
    // commits the content part and renders the message as truncated / cut off.
    emit("response.output_text.done", {
      item_id: currentMsg.itemId,
      output_index: currentMsg.outputIndex,
      content_index: 0,
      text: currentMsg.text,
    });
    emit("response.content_part.done", {
      item_id: currentMsg.itemId,
      output_index: currentMsg.outputIndex,
      content_index: 0,
      part: { type: "output_text", text: currentMsg.text, annotations: [] },
    });
    const item = {
      type: "message",
      id: currentMsg.itemId,
      status: "completed",
      role: "assistant",
      content: [{ type: "output_text", text: currentMsg.text, annotations: [] }],
      ...(currentMsg.phase ? { phase: currentMsg.phase } : {}),
    };
    emit("response.output_item.done", { output_index: currentMsg.outputIndex, item });
    finishedItems.push(item as OutputItem);
    outputIndex++;
    currentMsg = null;
  };

  const closeCurrentReasoning = () => {
    if (!currentReasoning) return;
    emit("response.reasoning_summary_text.done", {
      item_id: currentReasoning.itemId,
      output_index: currentReasoning.outputIndex,
      summary_index: 0,
      text: currentReasoning.text,
    });
    emit("response.reasoning_summary_part.done", {
      item_id: currentReasoning.itemId,
      output_index: currentReasoning.outputIndex,
      summary_index: 0,
      part: { type: "summary_text", text: currentReasoning.text },
    });
    const encrypted = takeReasoningEnvelope();
    const item = {
      type: "reasoning",
      id: currentReasoning.itemId,
      summary: [{ type: "summary_text", text: currentReasoning.text }],
      ...(encrypted ? { encrypted_content: encrypted } : {}),
    };
    emit("response.output_item.done", { output_index: currentReasoning.outputIndex, item });
    finishedItems.push(item as OutputItem);
    outputIndex++;
    currentReasoning = null;
  };

  const closeCurrentRawReasoning = () => {
    if (!currentRawReasoning) return;
    const item = {
      type: "reasoning",
      id: currentRawReasoning.itemId,
      summary: [],
      content: [{ type: "reasoning_text", text: currentRawReasoning.text }],
    };
    emit("response.output_item.done", { output_index: currentRawReasoning.outputIndex, item });
    finishedItems.push(item as OutputItem);
    outputIndex++;
    currentRawReasoning = null;
  };

  const closeCurrentToolCall = () => {
    if (!currentToolCall) return;
    // Empty input (no-arg tools like computer_use get_app_state / list_apps) must serialize as
    // "{}", never "" — Codex echoes the call back as a function_call next turn, and JSON.parse("")
    // would 400 the whole session ("invalid JSON arguments"), poisoning all later turns.
    const argsStr = currentToolCall.args || "{}";
    // Finalize streamed function-call arguments so Codex commits the call (incl. MCP / computer_use).
    if (!currentToolCall.freeform && !currentToolCall.toolSearch) {
      emit("response.function_call_arguments.done", {
        item_id: currentToolCall.itemId,
        output_index: currentToolCall.outputIndex,
        arguments: argsStr,
      });
    }
    if (currentToolCall.freeform) {
      emit("response.custom_tool_call_input.done", {
        item_id: currentToolCall.itemId,
        output_index: currentToolCall.outputIndex,
        input: freeformInput(currentToolCall.args),
      });
    }
    const item = currentToolCall.toolSearch
      ? {
          type: "tool_search_call",
          id: currentToolCall.itemId,
          call_id: currentToolCall.callId,
          execution: "client",
          arguments: parseArgsObj(currentToolCall.args),
          status: "completed",
        }
      : currentToolCall.freeform
        ? {
            type: "custom_tool_call",
            id: currentToolCall.itemId,
            call_id: currentToolCall.callId,
            name: currentToolCall.name,
            input: freeformInput(currentToolCall.args),
            status: "completed",
          }
        : {
            type: "function_call",
            id: currentToolCall.itemId,
            call_id: currentToolCall.callId,
            name: currentToolCall.name,
            arguments: argsStr,
            status: "completed",
            ...(currentToolCall.namespace ? { namespace: currentToolCall.namespace } : {}),
            ...plaintextCollaborationFields(currentToolCall.namespace, currentToolCall.name),
          };
    emit("response.output_item.done", { output_index: currentToolCall.outputIndex, item });
    finishedItems.push(item as OutputItem);
    outputIndex++;
    currentToolCall = null;
  };

  // RC1: guarantee the Responses stream always ends with exactly one terminal event. Set true
  // when a done/error/catch terminal is emitted; if the adapter generator returns without one
  // we synthesize response.completed below, so Codex never hits the parser's
  // "stream closed before response.completed" (responses.rs) -> ApiError::Stream.
  let terminated = false;
  let firstOutputReported = false;
  const reportFirstOutput = (event: AdapterEvent): void => {
    if (firstOutputReported) return;
    const nonEmpty =
      event.type === "text_delta"
        ? event.text.length > 0
        : event.type === "thinking_delta"
          ? event.thinking.length > 0
          : event.type === "reasoning_raw_delta"
            ? event.text.length > 0
            : false;
    if (!nonEmpty) return;
    firstOutputReported = true;
    try {
      options?.onFirstOutput?.();
    } catch {
      /* metrics must not break the stream */
    }
  };
  const it = events[Symbol.asyncIterator]();
  let iteratorStarted = false;
  let iteratorReturned = false;
  let upstreamDone = false;
  const returnIterator = () => {
    if (iteratorReturned) return;
    iteratorReturned = true;
    const finishReturn = () => {
      try {
        void it.return?.()?.catch(() => {});
      } catch {
        /* synchronous iterator cleanup failure is also best-effort */
      }
    };
    // Async-generator return() before the first next() does not enter the generator, so its
    // finally blocks cannot cancel prepared upstream bodies. The cancel hook has already
    // aborted the turn; bootstrap one cleanup step, then close the iterator without awaiting it.
    if (!iteratorStarted) {
      iteratorStarted = true;
      try {
        void it
          .next()
          .then(finishReturn, () => {})
          .catch(() => {});
      } catch {
        /* synchronous iterator start failure is also best-effort */
      }
      return;
    }
    finishReturn();
  };
  const step = async () => {
    if (stepping || closed) return;
    stepping = true;
    gated = false;
    const emittedAtStart = emittedFrames;
    try {
      while (!terminated && !closed && emittedFrames === emittedAtStart) {
        iteratorStarted = true;
        const next = await it.next();
        if (next.done) {
          upstreamDone = true;
          break;
        }
        const event = next.value;
        let terminalEvent = false;
        activity = true;
        stallTicks = 0;
        lastAdapterEventAt = Date.now();
        lastAdapterEventType = event.type;
        adapterEventCount += 1;
        stallWarned = false;
        reportFirstOutput(event);
        // Compaction turns emit ONLY the synthetic compaction item + response.completed. The
        // summary text is accumulated silently: emitting it as a normal assistant message would
        // duplicate the summary if this response is ever replayed via previous_response_id
        // expansion (rememberResponseState stores input + output). Codex ignores extra items but
        // its compaction UI renders nothing mid-turn, so nothing is lost visually.
        if (options?.compaction) {
          if (event.type === "text_delta") {
            compactionText += event.text;
            continue;
          }
          if (event.type !== "done" && event.type !== "incomplete" && event.type !== "error")
            continue;
        }
        switch (event.type) {
          case "assistant_boundary": {
            // A guarded continuation starts a fresh assistant output item while keeping the
            // intermediate, suspicious text in the same Responses turn.
            if (currentMsg) closeCurrentMessage();
            if (currentReasoning) closeCurrentReasoning();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            flushHiddenReasoningEnvelope();
            break;
          }
          case "text_delta": {
            if (currentReasoning) closeCurrentReasoning();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            if (currentMsg && currentMsg.phase !== event.phase) closeCurrentMessage();
            if (!currentMsg) {
              const itemId = `msg_${uuid()}`;
              const item = {
                type: "message",
                id: itemId,
                status: "in_progress",
                role: "assistant",
                content: [] as { type: string; text: string; annotations: never[] }[],
                ...(event.phase ? { phase: event.phase } : {}),
              };
              emit("response.output_item.added", { output_index: outputIndex, item });
              emit("response.content_part.added", {
                item_id: itemId,
                output_index: outputIndex,
                content_index: 0,
                part: { type: "output_text", text: "", annotations: [] },
              });
              currentMsg = {
                itemId,
                outputIndex,
                text: "",
                ...(event.phase ? { phase: event.phase } : {}),
              };
            }
            currentMsg.text += event.text;
            emit("response.output_text.delta", {
              item_id: currentMsg.itemId,
              output_index: currentMsg.outputIndex,
              content_index: 0,
              delta: event.text,
            });
            break;
          }
          case "thinking_delta": {
            if (options?.hideThinkingSummary) {
              hiddenThinkingText += event.thinking;
              break;
            }
            if (currentMsg) closeCurrentMessage();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            if (!currentReasoning) {
              const itemId = `rs_${uuid()}`;
              const item = {
                type: "reasoning",
                id: itemId,
                summary: [] as { type: string; text: string }[],
              };
              emit("response.output_item.added", { output_index: outputIndex, item });
              emit("response.reasoning_summary_part.added", {
                item_id: itemId,
                output_index: outputIndex,
                summary_index: 0,
                part: { type: "summary_text", text: "" },
              });
              currentReasoning = { itemId, outputIndex, text: "" };
            }
            currentReasoning.text += event.thinking;
            emit("response.reasoning_summary_text.delta", {
              item_id: currentReasoning.itemId,
              output_index: currentReasoning.outputIndex,
              summary_index: 0,
              delta: event.thinking,
            });
            break;
          }
          case "thinking_signature": {
            pendingSignature = event.signature;
            // Signature arrives at the end of the thinking block. With a visible reasoning item
            // open, closeCurrentReasoning attaches the envelope; hidden/suppressed blocks flush
            // an envelope-only reasoning item now.
            if (!currentReasoning) flushHiddenReasoningEnvelope();
            break;
          }
          case "redacted_thinking": {
            pendingRedacted.push(event.data);
            break;
          }
          case "reasoning_raw_delta": {
            if (options?.hideThinkingSummary) {
              hiddenRawReasoningText += event.text;
              break;
            }
            if (currentMsg) closeCurrentMessage();
            if (currentReasoning) closeCurrentReasoning();
            if (currentToolCall) closeCurrentToolCall();
            if (!currentRawReasoning) {
              const itemId = `rs_${uuid()}`;
              const item = {
                type: "reasoning",
                id: itemId,
                summary: [] as never[],
                content: [] as { type: string; text: string }[],
              };
              emit("response.output_item.added", { output_index: outputIndex, item });
              currentRawReasoning = { itemId, outputIndex, text: "" };
            }
            currentRawReasoning.text += event.text;
            emit("response.reasoning_text.delta", {
              item_id: currentRawReasoning.itemId,
              output_index: currentRawReasoning.outputIndex,
              content_index: 0,
              delta: event.text,
            });
            break;
          }
          case "tool_call_start": {
            if (currentMsg) closeCurrentMessage();
            if (currentReasoning) closeCurrentReasoning();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            const mapped = toolNsMap?.get(event.name);
            const realName = mapped?.name ?? event.name;
            const ns = mapped?.namespace;
            const toolSearch = toolSearchToolNames?.has(realName) ?? false;
            const freeform = !toolSearch && (freeformToolNames?.has(realName) ?? false);
            const itemId = `${toolSearch ? "tsc" : freeform ? "ctc" : "fc"}_${uuid()}`;
            const item = toolSearch
              ? {
                  type: "tool_search_call",
                  id: itemId,
                  call_id: event.id,
                  execution: "client",
                  arguments: {},
                  status: "in_progress",
                }
              : freeform
                ? {
                    type: "custom_tool_call",
                    id: itemId,
                    call_id: event.id,
                    name: realName,
                    input: "",
                    status: "in_progress",
                  }
                : {
                    type: "function_call",
                    id: itemId,
                    call_id: event.id,
                    name: realName,
                    arguments: "",
                    status: "in_progress",
                    ...(ns ? { namespace: ns } : {}),
                    ...plaintextCollaborationFields(ns, realName),
                  };
            emit("response.output_item.added", { output_index: outputIndex, item });
            currentToolCall = {
              itemId,
              outputIndex,
              callId: event.id,
              name: realName,
              args: "",
              namespace: ns,
              freeform,
              toolSearch,
            };
            break;
          }
          case "tool_call_delta": {
            if (currentToolCall) {
              currentToolCall.args += event.arguments;
              if (!currentToolCall.freeform && !currentToolCall.toolSearch) {
                emit("response.function_call_arguments.delta", {
                  item_id: currentToolCall.itemId,
                  output_index: currentToolCall.outputIndex,
                  delta: event.arguments,
                });
              }
              if (currentToolCall.freeform) {
                // Hold while the buffer is still an ambiguous prefix of the JSON wrapper,
                // then stream only the unwrapped input suffix (never rewind on mode flips).
                if (!FREEFORM_WRAP_PREFIX.startsWith(currentToolCall.args)) {
                  const full = freeformPartialInput(currentToolCall.args);
                  const emitted = currentToolCall.inputEmitted ?? "";
                  if (full.startsWith(emitted) && full.length > emitted.length) {
                    emit("response.custom_tool_call_input.delta", {
                      item_id: currentToolCall.itemId,
                      output_index: currentToolCall.outputIndex,
                      delta: full.slice(emitted.length),
                    });
                    currentToolCall.inputEmitted = full;
                  }
                }
              }
            }
            break;
          }
          case "tool_call_end": {
            closeCurrentToolCall();
            break;
          }
          case "done": {
            if (currentMsg) closeCurrentMessage();
            if (currentReasoning) closeCurrentReasoning();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            // Redacted-only turns (or hidden thinking without a trailing signature event) still
            // need their envelope-only reasoning item so the blocks replay next turn.
            flushHiddenReasoningEnvelope();
            if (options?.compaction) {
              // Exactly one compaction item per turn; codex-rs takes the first and fatals on 0.
              const item = {
                type: "compaction",
                id: `cmp_${uuid()}`,
                encrypted_content: encodeCompactionSummary(compactionText),
              };
              emit("response.output_item.done", { output_index: outputIndex, item });
              finishedItems.push(item as OutputItem);
              outputIndex++;
            }
            if (event.stopReason === "max_tokens" || event.stopReason === "content_filter") {
              // Upstream stopped before a normal completion. Surface as incomplete so the
              // client can distinguish a truncated/filtered turn from a finished one.
              const response = {
                ...responseSnapshot("incomplete", finishedItems, event.endTurn),
                usage: responsesUsage(event.usage),
                incomplete_details: {
                  reason:
                    event.stopReason === "max_tokens" ? "max_output_tokens" : "content_filter",
                },
              };
              // Cache max-output partials so previous_response_id replay can continue them;
              // rememberResponseState rejects content-filtered incomplete responses.
              options?.onCompletedResponse?.(response, event.providerState);
              emit("response.incomplete", { response });
              reportTerminal("incomplete");
            } else {
              const response = {
                ...responseSnapshot("completed", finishedItems, event.endTurn),
                usage: responsesUsage(event.usage),
              };
              options?.onCompletedResponse?.(response, event.providerState);
              emit("response.completed", {
                response,
              });
              reportTerminal("completed");
            }
            terminalEvent = true;
            break;
          }
          case "incomplete": {
            if (currentMsg) closeCurrentMessage();
            if (currentReasoning) closeCurrentReasoning();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            flushHiddenReasoningEnvelope();
            emit("response.incomplete", {
              response: {
                ...responseSnapshot("incomplete", finishedItems, event.endTurn),
                usage: responsesUsage(event.usage),
                incomplete_details: {
                  reason: event.reason,
                  ...(event.message ? { message: event.message } : {}),
                  ...(event.retryable !== undefined ? { retryable: event.retryable } : {}),
                },
              },
            });
            reportTerminal("incomplete");
            terminalEvent = true;
            break;
          }
          case "error": {
            if (currentMsg) closeCurrentMessage();
            if (currentReasoning) closeCurrentReasoning();
            if (currentRawReasoning) closeCurrentRawReasoning();
            flushHiddenRawReasoning();
            if (currentToolCall) closeCurrentToolCall();
            const failure = adapterFailureFromEvent(event);
            emit("response.failed", {
              response: {
                ...responseSnapshot("failed", finishedItems),
                // Partial consumption from a mid-stream upstream failure: surfaced so the request
                // log can record real tokens instead of usageStatus "unreported" with 0.
                ...(event.usage ? { usage: responsesUsage(event.usage) } : {}),
                error: failure.error,
                last_error: failure.error,
                ...(event.retryable !== undefined ? { retryable: event.retryable } : {}),
              },
            });
            reportTerminal("failed");
            terminalEvent = true;
            break;
          }
        }
        if (terminalEvent) {
          onCancel?.();
          terminated = true;
          returnIterator();
          break;
        }
      }
    } catch (err) {
      if (!terminated) {
        flushHiddenRawReasoning();
        emit("response.failed", {
          response: {
            ...responseSnapshot("failed", finishedItems),
            error: responseError(
              500,
              "proxy_error",
              err instanceof Error ? err.message : String(err)
            ),
            last_error: responseError(
              500,
              "proxy_error",
              err instanceof Error ? err.message : String(err)
            ),
          },
        });
        reportTerminal("failed");
        onCancel?.();
        terminated = true;
        returnIterator();
      }
    }

    if (!terminated && !upstreamDone) {
      gated = true;
      stepping = false;
      return;
    }
    if (beat) {
      clearInterval(beat);
      beat = undefined;
    }

    if (!terminated) {
      // The adapter generator ended without an explicit done/error event. Mark as incomplete
      // rather than completed so Codex can distinguish a clean finish from a truncated stream.
      if (currentMsg) closeCurrentMessage();
      if (currentReasoning) closeCurrentReasoning();
      if (currentRawReasoning) closeCurrentRawReasoning();
      flushHiddenRawReasoning();
      if (currentToolCall) closeCurrentToolCall();
      emit("response.incomplete", {
        response: {
          ...responseSnapshot("incomplete", finishedItems),
          usage: responsesUsage(undefined),
          incomplete_details: { reason: "adapter_eof" },
        },
      });
      reportTerminal("incomplete");
      terminated = true;
    }

    emitDone();
    try {
      controller.close();
    } catch {
      /* already closed (e.g. client cancelled) */
    }
    closed = true;
    gated = true;
    stepping = false;
  };

  const startStream = () => {
    emit("response.created", { response: responseSnapshot("in_progress", []) });
    gated = true;
    beat = setInterval(() => {
      if (closed || gated) return;
      if (activity) {
        activity = false;
        stallTicks = 0;
        return;
      }
      stallTicks += 1;
      if (stallTicks === Math.ceil(maxStallTicks / 2) && !stallWarned) {
        stallWarned = true;
        console.warn(
          `[bridge] upstream silence halfway to the stall budget model=${modelId}` +
            ` response=${responseId} stallSec=${stallSec} adapterEvents=${adapterEventCount}` +
            ` lastEvent=${lastAdapterEventType} sinceLastEventMs=${Date.now() - lastAdapterEventAt}`
        );
      }
      if (stallTicks >= maxStallTicks) {
        console.error(
          `[bridge] upstream_stall_timeout model=${modelId} response=${responseId}` +
            ` stallSec=${stallSec} adapterEvents=${adapterEventCount}` +
            ` lastEvent=${lastAdapterEventType} sinceLastEventMs=${Date.now() - lastAdapterEventAt}` +
            ` sinceStreamStartMs=${Date.now() - streamStartedAt}` +
            ` iteratorStarted=${iteratorStarted} upstreamDone=${upstreamDone} emittedFrames=${emittedFrames}`
        );
        if (currentMsg) closeCurrentMessage();
        if (currentReasoning) closeCurrentReasoning();
        if (currentRawReasoning) closeCurrentRawReasoning();
        flushHiddenRawReasoning();
        if (currentToolCall) closeCurrentToolCall();
        emit("response.incomplete", {
          response: {
            ...responseSnapshot("incomplete", finishedItems),
            incomplete_details: { reason: "upstream_stall_timeout" },
          },
        });
        reportTerminal("incomplete");
        onCancel?.();
        terminated = true;
        returnIterator();
        emitDone();
        if (beat) clearInterval(beat);
        beat = undefined;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
        closed = true;
        return;
      }
      try {
        controller.enqueue(heartbeatFrame);
        emittedFrames++;
      } catch {
        closed = true;
      }
    }, heartbeatMs);
  };

  const waitForCapacity = async () => {
    while (!closed && (controller.desiredSize ?? 1) <= 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, 5));
    }
  };

  const pump = async () => {
    while (!closed) {
      await waitForCapacity();
      if (closed) return;
      await step();
    }
  };

  const cancelStream = () => {
    // Client (Codex) disconnected. Stop emitting and let the caller abort the upstream fetch so a
    // cancelled turn does not leak the upstream stream or keep draining tokens (RC2).
    clientCancelled = true;
    closed = true;
    if (beat) clearInterval(beat);
    onCancel?.();
    returnIterator();
  };

  if ((options?.streamPlatform ?? process.platform) === "win32") {
    // Returning a Promise from a ReadableStream pull() served by Bun on Windows hits Bun#32111's
    // native teardown crash. Keep only Windows push-driven and retain HWM backpressure by polling
    // desiredSize; Darwin/Linux use the native pull contract below.
    return new ReadableStream<Uint8Array>({
      start(streamController) {
        controller = streamController;
        startStream();
        void pump().catch((error) => {
          if (closed) return;
          closed = true;
          if (beat) clearInterval(beat);
          onCancel?.();
          returnIterator();
          try {
            controller.error(error);
          } catch {
            /* already closed */
          }
        });
      },
      cancel: cancelStream,
    });
  }

  return new ReadableStream<Uint8Array>({
    start(streamController) {
      controller = streamController;
      startStream();
    },
    pull() {
      return step();
    },
    cancel: cancelStream,
  });
}

export function buildResponseJSON(
  events: AdapterEvent[],
  modelId: string,
  options?: {
    hideThinkingSummary?: boolean;
    toolNsMap?: Map<string, { namespace: string; name: string }>;
    freeformToolNames?: Set<string>;
    toolSearchToolNames?: Set<string>;
    /** Remote compaction v2 turn — append one synthetic compaction output item (see bridgeToResponsesSSE). */
    compaction?: boolean;
    onProviderState?: (state: CodexProviderContinuationState) => void;
  }
): Record<string, unknown> {
  const responseId = `resp_${uuid()}`;
  const output: OutputItem[] = [];
  let usage: CodexUsage | undefined;
  let errorEvent: Extract<AdapterEvent, { type: "error" }> | undefined;
  let incompleteEvent: Extract<AdapterEvent, { type: "incomplete" }> | undefined;
  let endTurn: boolean | undefined;
  let stopReason: string | undefined;
  let compactionText = "";

  let currentText = "";
  let currentTextPhase: CodexMessagePhase | undefined;
  let currentSummaryReasoning = "";
  let currentRawReasoning = "";
  // Opaque signed-reasoning round-trip (batch): see bridgeToResponsesSSE counterpart.
  let batchSignature: string | undefined;
  let batchRedacted: string[] = [];
  let currentToolCallId = "";
  let currentToolCallName = "";
  let currentToolCallArgs = "";
  const freeformInput = (args: string): string => {
    try {
      const o = JSON.parse(args);
      if (o && typeof o.input === "string") return o.input;
    } catch {
      /* raw */
    }
    return args;
  };
  const parseArgsObj = (args: string): Record<string, unknown> => {
    try {
      const o = JSON.parse(args);
      return o && typeof o === "object" ? o : {};
    } catch {
      return {};
    }
  };

  const flushText = () => {
    if (!currentText) return;
    output.push({
      type: "message",
      id: `msg_${uuid()}`,
      role: "assistant",
      status: "completed",
      content: [{ type: "output_text", text: currentText, annotations: [] }],
      ...(currentTextPhase ? { phase: currentTextPhase } : {}),
    });
    currentText = "";
    currentTextPhase = undefined;
  };
  const flushSummaryReasoning = () => {
    if (!currentSummaryReasoning && !batchSignature && batchRedacted.length === 0) return;
    const envelope: ReasoningEnvelope = {};
    if (batchSignature) envelope.sig = batchSignature;
    if (batchRedacted.length > 0) envelope.red = batchRedacted;
    const hidden = options?.hideThinkingSummary === true;
    if (hidden && currentSummaryReasoning && (envelope.sig || envelope.red))
      envelope.txt = currentSummaryReasoning;
    const encrypted =
      envelope.sig || envelope.red || envelope.txt ? encodeReasoningEnvelope(envelope) : undefined;
    batchSignature = undefined;
    batchRedacted = [];
    if (hidden && !encrypted) {
      currentSummaryReasoning = "";
      return;
    }
    output.push({
      type: "reasoning",
      id: `rs_${uuid()}`,
      summary:
        !hidden && currentSummaryReasoning
          ? [{ type: "summary_text", text: currentSummaryReasoning }]
          : [],
      ...(encrypted ? { encrypted_content: encrypted } : {}),
    });
    currentSummaryReasoning = "";
  };
  const flushRawReasoning = () => {
    if (!currentRawReasoning) return;
    if (options?.hideThinkingSummary === true) {
      // Same contract as the streaming path: no visible reasoning, txt-only envelope round-trip.
      output.push({
        type: "reasoning",
        id: `rs_${uuid()}`,
        summary: [],
        encrypted_content: encodeReasoningEnvelope({ txt: currentRawReasoning }),
      });
      currentRawReasoning = "";
      return;
    }
    output.push({
      type: "reasoning",
      id: `rs_${uuid()}`,
      summary: [],
      content: [{ type: "reasoning_text", text: currentRawReasoning }],
    });
    currentRawReasoning = "";
  };
  const flushToolCall = () => {
    if (!currentToolCallId) return;
    const mapped = options?.toolNsMap?.get(currentToolCallName);
    const realName = mapped?.name ?? currentToolCallName;
    const ns = mapped?.namespace;
    const toolSearch = options?.toolSearchToolNames?.has(realName) ?? false;
    const freeform = !toolSearch && (options?.freeformToolNames?.has(realName) ?? false);
    if (toolSearch) {
      output.push({
        type: "tool_search_call",
        id: `tsc_${uuid()}`,
        call_id: currentToolCallId,
        execution: "client",
        arguments: parseArgsObj(currentToolCallArgs),
        status: "completed",
      });
    } else if (freeform) {
      output.push({
        type: "custom_tool_call",
        id: `ctc_${uuid()}`,
        call_id: currentToolCallId,
        name: realName,
        input: freeformInput(currentToolCallArgs),
        status: "completed",
      });
    } else {
      output.push({
        type: "function_call",
        id: `fc_${uuid()}`,
        call_id: currentToolCallId,
        name: realName,
        arguments: currentToolCallArgs || "{}",
        status: "completed",
        ...(ns ? { namespace: ns } : {}),
        ...plaintextCollaborationFields(ns, realName),
      });
    }
    currentToolCallId = "";
    currentToolCallName = "";
    currentToolCallArgs = "";
  };

  for (const e of events) {
    switch (e.type) {
      case "assistant_boundary":
        flushText();
        flushSummaryReasoning();
        flushRawReasoning();
        flushToolCall();
        break;
      case "text_delta":
        if (currentText && currentTextPhase !== e.phase) flushText();
        if (currentSummaryReasoning) flushSummaryReasoning();
        if (currentRawReasoning) flushRawReasoning();
        if (currentToolCallId) flushToolCall();
        // Compaction turns keep the summary out of normal message output (replay dedup — see
        // bridgeToResponsesSSE); it ships only inside the synthetic compaction item below.
        if (options?.compaction) compactionText += e.text;
        else {
          currentTextPhase = e.phase;
          currentText += e.text;
        }
        break;
      case "thinking_delta":
        if (currentText) flushText();
        if (currentRawReasoning) flushRawReasoning();
        if (currentToolCallId) flushToolCall();
        currentSummaryReasoning += e.thinking;
        break;
      case "thinking_signature":
        // End of the current thinking block — flush it WITH the signature envelope so the
        // block/signature pairing survives multi-block turns.
        batchSignature = e.signature;
        flushSummaryReasoning();
        break;
      case "redacted_thinking":
        batchRedacted.push(e.data);
        break;
      case "reasoning_raw_delta":
        if (currentText) flushText();
        if (currentSummaryReasoning) flushSummaryReasoning();
        if (currentToolCallId) flushToolCall();
        currentRawReasoning += e.text;
        break;
      case "tool_call_start":
        if (currentText) flushText();
        if (currentSummaryReasoning) flushSummaryReasoning();
        if (currentRawReasoning) flushRawReasoning();
        flushToolCall();
        currentToolCallId = e.id;
        currentToolCallName = e.name;
        currentToolCallArgs = "";
        break;
      case "tool_call_delta":
        currentToolCallArgs += e.arguments;
        break;
      case "tool_call_end":
        flushToolCall();
        break;
      case "error":
        errorEvent = e;
        usage = e.usage ?? usage;
        break;
      case "incomplete":
        incompleteEvent = e;
        endTurn = e.endTurn;
        if (e.providerState) options?.onProviderState?.(e.providerState);
        break;
      case "done":
        usage = e.usage;
        endTurn = e.endTurn;
        if (e.providerState) options?.onProviderState?.(e.providerState);
        if (e.stopReason === "max_tokens") stopReason = "max_tokens";
        break;
    }
  }
  flushText();
  flushSummaryReasoning();
  flushRawReasoning();
  flushToolCall();
  // A truncated turn must never be installed as replacement history: emit the
  // compaction item only when the turn actually completed (#422).
  if (options?.compaction && !errorEvent && !incompleteEvent && stopReason !== "max_tokens") {
    output.push({
      type: "compaction",
      id: `cmp_${uuid()}`,
      encrypted_content: encodeCompactionSummary(compactionText),
    });
  }

  const failure = errorEvent ? adapterFailureFromEvent(errorEvent) : undefined;
  const status = errorEvent
    ? "failed"
    : incompleteEvent || stopReason === "max_tokens"
      ? "incomplete"
      : "completed";
  return {
    id: responseId,
    object: "response",
    created_at: Math.floor(Date.now() / 1000),
    status,
    model: modelId,
    output,
    ...(endTurn !== undefined ? { end_turn: endTurn } : {}),
    ...(failure ? { error: failure.error, last_error: failure.error } : {}),
    ...(errorEvent?.retryable !== undefined ? { retryable: errorEvent.retryable } : {}),
    ...(incompleteEvent
      ? {
          incomplete_details: {
            reason: incompleteEvent.reason,
            ...(incompleteEvent.message ? { message: incompleteEvent.message } : {}),
            ...(incompleteEvent.retryable !== undefined
              ? { retryable: incompleteEvent.retryable }
              : {}),
          },
        }
      : stopReason === "max_tokens"
        ? {
            incomplete_details: { reason: "max_output_tokens" },
          }
        : {}),
    usage: responsesUsage(incompleteEvent?.usage ?? usage),
  };
}

export function formatErrorResponse(status: number, type: string, message: string): Response {
  return new Response(JSON.stringify({ error: responseError(status, type, message) }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
