import { cloneLogPayload } from "@/lib/logPayloads";
import { toNumber } from "@/shared/utils/numeric";
import { FORMATS } from "../translator/formats.ts";
import { jsonLength } from "./jsonSize.ts";

type StructuredSSEEvent = {
  index: number;
  timestamp?: string;
  event?: string;
  data: unknown;
};

type CollectorOptions = {
  maxEvents?: number;
  maxBytes?: number;
  stage?: string;
  // When set, every pushed payload — even ones dropped from the retained
  // `events` array once maxEvents/maxBytes is hit — is also fed to a live
  // per-format summary reducer, so build()'s summary reflects the FULL
  // stream, not just the surviving (possibly truncated) event slice.
  // See #9315: reconstructing the summary from getEvents() after the fact
  // means a long stream that exceeds the cap gets a stale/incomplete
  // "provider response" (missing tool_calls, wrong finish_reason, cut-off
  // content) even though the actual served response was correct.
  format?: string | null;
  fallbackModel?: string | null;
};

type BuildOptions = {
  includeEvents?: boolean;
};

type JsonRecord = Record<string, unknown>;

interface SummaryReducer {
  ingest(payload: JsonRecord): void;
  finalize(): unknown;
}

function getEventName(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return undefined;

  if (typeof (payload as { event?: unknown }).event === "string") {
    return (payload as { event: string }).event;
  }
  if (typeof (payload as { type?: unknown }).type === "string") {
    return (payload as { type: string }).type;
  }
  if ((payload as { done?: unknown }).done === true) {
    return "[DONE]";
  }
  return undefined;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeFormat(format?: string | null): string {
  if (!format) return "";
  if (format === FORMATS.OPENAI_RESPONSE) return FORMATS.OPENAI_RESPONSES;
  return format;
}

function inferFormatFromEvents(
  events: StructuredSSEEvent[],
  fallbackFormat?: string | null
): string {
  const normalizedFallback = normalizeFormat(fallbackFormat);
  if (normalizedFallback) return normalizedFallback;

  for (const evt of events) {
    const payload = unwrapEventEnvelope(evt.data);
    const eventType = toString(payload.type || evt.event);

    if (eventType.startsWith("response.") || payload.object === "response") {
      return FORMATS.OPENAI_RESPONSES;
    }
    if (
      eventType === "message_start" ||
      eventType === "content_block_start" ||
      eventType === "content_block_delta" ||
      eventType === "message_delta" ||
      eventType === "message_stop" ||
      eventType === "ping"
    ) {
      return FORMATS.CLAUDE;
    }
    if (Array.isArray(payload.candidates) || payload.usageMetadata) {
      return FORMATS.GEMINI;
    }
  }

  return FORMATS.OPENAI;
}

function mergeUsage(target: JsonRecord, incoming: unknown) {
  const usage = asRecord(incoming);
  for (const [key, value] of Object.entries(usage)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      if ((target[key] as number | undefined) === undefined || value > 0) {
        target[key] = value;
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = { ...asRecord(target[key]), ...asRecord(value) };
    } else if (typeof value === "string" && value.trim().length > 0) {
      target[key] = value;
    }
  }
}

function tryParseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

/**
 * Splits a tool_call `arguments` string that is actually multiple back-to-back JSON
 * objects glued together with no separator, into its individual object substrings.
 *
 * Root cause (observed on opencode/muse-spark-1.2-contributor-free via the zen
 * provider): some upstreams never vary `index`/`id` across a 2nd/3rd/… tool_call of
 * the SAME name emitted in one turn, so every delta in `buildOpenAISummary` above
 * resolves to the same accumulator key and `arguments` ends up as N JSON objects
 * concatenated with no delimiter — invalid as a single JSON value, but each object is
 * individually well-formed. Structural, not provider-specific: applies to whichever
 * upstream exhibits the same index-collision streaming bug.
 *
 * Returns `null` when `raw` is empty, already valid single JSON, or does not scan as
 * ≥2 back-to-back valid JSON values — callers must leave `arguments` untouched in
 * that case (never regress a value that used to reach the client as-is).
 */
export function splitConcatenatedToolCallArguments(raw: string): string[] | null {
  if (!raw) return null;
  try {
    JSON.parse(raw);
    return null; // Already a single valid JSON value — nothing to split.
  } catch {
    // Fall through to the multi-value scan below.
  }

  const parts: string[] = [];
  let depth = 0;
  let inString = false;
  let escaped = false;
  let start = -1;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (start === -1) {
      if (ch === " " || ch === "\n" || ch === "\r" || ch === "\t") continue;
      if (ch !== "{" && ch !== "[") return null; // Not a value boundary — bail, leave untouched.
      start = i;
    }
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{" || ch === "[") depth++;
    else if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0) {
        parts.push(raw.slice(start, i + 1));
        start = -1;
      }
    }
  }
  if (start !== -1 || depth !== 0 || parts.length < 2) return null;

  for (const part of parts) {
    try {
      JSON.parse(part);
    } catch {
      return null; // One of the scanned segments isn't valid JSON — bail entirely.
    }
  }
  return parts;
}

// ─── Per-format live reducers ────────────────────────────────────────────────
// Each reducer mirrors the corresponding build*Summary()'s original for-loop
// body exactly (ingest = one loop iteration, finalize = the post-loop return),
// just restructured so it can be fed one payload at a time as chunks arrive —
// including chunks that will later be dropped from the retained event array
// once the collector's storage cap is hit.

function createOpenAIReducer(fallbackModel?: string | null): SummaryReducer {
  let sawAny = false;
  // Snapshot of primitive fields from the first chunk — finalized in finalize().
  // Storing primitives (not the chunk reference) avoids retaining a reference to
  // the original payload, so caller mutation after push() cannot change the summary.
  let firstId: string | null = null;
  let firstCreated: number | null = null;
  let firstModel: string | null = null;
  const contentParts: string[] = [];
  const reasoningParts: string[] = [];
  type ToolCall = {
    id: string | null;
    index: number;
    type: string;
    function: { name: string; arguments: string };
  };
  const toolCalls = new Map<string, ToolCall>();
  // Aliases every `idx:N` key we've seen to the `id:X` it was first observed with (and
  // vice versa), so a later delta chunk that only carries one of the two dimensions
  // (e.g. a continuation chunk with `id` but no `index` — a known quirk of some
  // OpenAI-compatible proxies) still resolves to the SAME accumulator entry instead of
  // splitting one logical tool call into two (#6276).
  const keyAliases = new Map<string, string>();
  let unknownToolCallSeq = 0;
  let finishReason = "stop";
  let usage: JsonRecord | null = null;

  const getToolCallKey = (toolCall: JsonRecord) => {
    const idKey = typeof toolCall.id === "string" && toolCall.id ? `id:${toolCall.id}` : null;
    const idxKey = Number.isInteger(toolCall.index) ? `idx:${toolCall.index}` : null;

    const resolvedKey = (idKey && keyAliases.get(idKey)) || (idxKey && keyAliases.get(idxKey));
    const key = resolvedKey || idKey || idxKey;

    if (key) {
      if (idKey) keyAliases.set(idKey, key);
      if (idxKey) keyAliases.set(idxKey, key);
      return key;
    }

    unknownToolCallSeq += 1;
    return `seq:${unknownToolCallSeq}`;
  };

  return {
    ingest(chunk: JsonRecord) {
      if (Object.keys(chunk).length === 0) return;
      sawAny = true;
      if (firstId === null) {
        firstId = toString(chunk.id) || null;
        firstCreated = toNumber(chunk.created) || null;
        firstModel = toString(chunk.model) || null;
      }

      const choice = asRecord(Array.isArray(chunk.choices) ? chunk.choices[0] : null);
      const delta = asRecord(choice.delta);

      if (typeof delta.content === "string" && delta.content.length > 0) {
        contentParts.push(delta.content);
      }
      if (Array.isArray(delta.content)) {
        for (const part of delta.content) {
          const partObj = asRecord(part);
          if (typeof partObj.text === "string" && partObj.text.length > 0) {
            contentParts.push(partObj.text);
          }
        }
      }
      if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
        reasoningParts.push(delta.reasoning_content);
      }
      // Normalize `reasoning` alias (NVIDIA kimi-k2.5 etc.)
      if (
        typeof delta.reasoning === "string" &&
        delta.reasoning.length > 0 &&
        !delta.reasoning_content
      ) {
        reasoningParts.push(delta.reasoning);
      }

      if (Array.isArray(delta.tool_calls)) {
        for (const item of delta.tool_calls) {
          const toolCall = asRecord(item);
          const key = getToolCallKey(toolCall);
          const existing = toolCalls.get(key);
          const deltaArgs =
            typeof asRecord(toolCall.function).arguments === "string"
              ? String(asRecord(toolCall.function).arguments)
              : "";

          if (!existing) {
            toolCalls.set(key, {
              id: typeof toolCall.id === "string" ? toolCall.id : null,
              index: Number.isInteger(toolCall.index) ? Number(toolCall.index) : toolCalls.size,
              type: toString(toolCall.type, "function"),
              function: {
                name: toString(asRecord(toolCall.function).name, "unknown"),
                arguments: deltaArgs,
              },
            });
            continue;
          }

          existing.id = existing.id || (typeof toolCall.id === "string" ? toolCall.id : null);
          if (
            (!Number.isInteger(existing.index) || existing.index < 0) &&
            Number.isInteger(toolCall.index)
          ) {
            existing.index = Number(toolCall.index);
          }
          if (typeof asRecord(toolCall.function).name === "string" && !existing.function.name) {
            existing.function.name = String(asRecord(toolCall.function).name);
          }
          existing.function.arguments += deltaArgs;
        }
      }

      if (typeof choice.finish_reason === "string" && choice.finish_reason.length > 0) {
        finishReason = choice.finish_reason;
      }
      if (chunk.usage && typeof chunk.usage === "object") {
        usage = { ...asRecord(chunk.usage) };
      }
    },

    finalize(): unknown {
      if (!sawAny) return null;

      const joinedContent = contentParts.length > 0 ? contentParts.join("").trim() : null;
      const joinedReasoning = reasoningParts.length > 0 ? reasoningParts.join("").trim() : null;
      const message: JsonRecord = {
        role: "assistant",
        content: joinedContent || null,
      };
      if (joinedReasoning) {
        message.reasoning_content = joinedReasoning;
      }

      const mergedToolCalls = [...toolCalls.values()].sort((a, b) => a.index - b.index);
      // Expand any entry whose accumulated `arguments` turned out to be multiple
      // concatenated JSON objects (upstream never varied index/id across repeated
      // same-name tool_calls) into its own separate tool_calls entries.
      const finalToolCalls: ToolCall[] = [];
      let nextIndex = 0;
      // Normalize tool_call indexes to contiguous 0-based (OpenAI contract).
      for (const tc of mergedToolCalls) {
        const splitArgs = splitConcatenatedToolCallArguments(tc.function.arguments);
        if (!splitArgs) {
          finalToolCalls.push({ ...tc, index: nextIndex++ });
          continue;
        }
        for (const [i, args] of splitArgs.entries()) {
          finalToolCalls.push({
            id: tc.id ? `${tc.id}_split${i}` : null,
            index: nextIndex++,
            type: tc.type,
            function: { name: tc.function.name, arguments: args },
          });
        }
      }
      if (finalToolCalls.length > 0) {
        finishReason = "tool_calls";
        message.tool_calls = finalToolCalls;
      }

      const result: JsonRecord = {
        id: firstId || `chatcmpl-${Date.now()}`,
        object: "chat.completion",
        created: firstCreated || Math.floor(Date.now() / 1000),
        model: firstModel || fallbackModel || "unknown",
        choices: [
          {
            index: 0,
            message,
            finish_reason: finishReason,
          },
        ],
      };

      if (usage && Object.keys(usage).length > 0) {
        result.usage = usage;
      }

      return result;
    },
  };
}

type ResponseSnapshot = {
  id: string;
  model: string;
  status: string;
  created_at: number;
  output: unknown;
  usage: JsonRecord | null;
  metadata: JsonRecord;
};

function createResponsesReducer(fallbackModel?: string | null): SummaryReducer {
  let sawAny = false;
  // Snapshot of response fields — primitives only, nested objects deep-cloned.
  // Avoids retaining a reference to the original payload so caller mutation
  // after push() cannot change the summary.
  let completedSnapshot: ResponseSnapshot | null = null;
  let latestSnapshot: ResponseSnapshot | null = null;
  let usage: JsonRecord | null = null;
  const textParts: string[] = [];
  const buildOutputFromText = () =>
    textParts.length > 0
      ? [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: textParts.join("") }],
          },
        ]
      : [];

  const snapshotResponse = (resp: JsonRecord): ResponseSnapshot => ({
    id: toString(resp.id),
    model: toString(resp.model),
    status: toString(resp.status),
    created_at: toNumber(resp.created_at),
    output: cloneLogPayload(Array.isArray(resp.output) ? resp.output : []),
    usage: resp.usage && typeof resp.usage === "object" ? { ...asRecord(resp.usage) } : null,
    metadata: cloneLogPayload(asRecord(resp.metadata)),
  });

  return {
    ingest(payload: JsonRecord) {
      if (Object.keys(payload).length === 0) return;
      sawAny = true;

      const eventType = toString(payload.type);
      if (
        eventType === "response.completed" &&
        payload.response &&
        typeof payload.response === "object"
      ) {
        completedSnapshot = snapshotResponse(asRecord(payload.response));
      }
      if (payload.response && typeof payload.response === "object") {
        latestSnapshot = snapshotResponse(asRecord(payload.response));
      } else if (payload.object === "response") {
        latestSnapshot = snapshotResponse(payload);
      }
      if (
        eventType === "response.output_text.delta" &&
        typeof payload.delta === "string" &&
        payload.delta.length > 0
      ) {
        textParts.push(payload.delta);
      }
      if (payload.usage && typeof payload.usage === "object") {
        usage = { ...asRecord(payload.usage) };
      } else if (payload.response && typeof asRecord(payload.response).usage === "object") {
        usage = { ...asRecord(asRecord(payload.response).usage) };
      }
    },

    finalize(): unknown {
      if (!sawAny) return null;

      const picked = completedSnapshot || latestSnapshot;
      if (picked) {
        const pickedOutput = Array.isArray(picked.output) ? picked.output : [];
        return {
          id: picked.id || `resp_${Date.now()}`,
          object: "response",
          model: picked.model || fallbackModel || "unknown",
          output: pickedOutput.length > 0 ? pickedOutput : buildOutputFromText(),
          usage: picked.usage ?? usage ?? null,
          status: picked.status || (completedSnapshot ? "completed" : "in_progress"),
          created_at: picked.created_at || Math.floor(Date.now() / 1000),
          metadata: picked.metadata,
        };
      }

      return {
        id: `resp_${Date.now()}`,
        object: "response",
        model: fallbackModel || "unknown",
        output: buildOutputFromText(),
        usage: usage ?? null,
        status: "completed",
        created_at: Math.floor(Date.now() / 1000),
        metadata: {},
      };
    },
  };
}

function createClaudeReducer(fallbackModel?: string | null): SummaryReducer {
  let sawAny = false;
  type ClaudeBlock =
    | { type: "text"; index: number; text: string }
    | { type: "thinking"; index: number; thinking: string; signature?: string }
    | {
        type: "tool_use";
        index: number;
        id: string;
        name: string;
        input: unknown;
        inputJson: string;
      };
  type ClaudeContentBlock =
    | { type: "text"; text: string }
    | { type: "thinking"; thinking: string; signature?: string }
    | { type: "tool_use"; id: string; name: string; input: unknown };

  const blocks = new Map<number, ClaudeBlock>();
  const usage: JsonRecord = {};
  let messageId = "";
  let model = fallbackModel || "claude";
  let role = "assistant";
  let stopReason = "end_turn";
  let stopSequence: string | null = null;
  // Context Editing (`anthropic-beta: context-management-2025-06-27`) surfaces
  // `context_management.applied_edits[]` on the final `message_delta` snapshot. Preserve it
  // so streaming context-clear savings reach `extractContextEditingTelemetry`, mirroring the
  // non-streaming JSON path. Last-writer-wins: the final snapshot is authoritative.
  let contextManagement: JsonRecord | null = null;

  return {
    ingest(payload: JsonRecord) {
      if (Object.keys(payload).length === 0) return;
      sawAny = true;

      const eventType = toString(payload.type);
      if (
        payload.context_management &&
        typeof payload.context_management === "object" &&
        !Array.isArray(payload.context_management)
      ) {
        contextManagement = asRecord(payload.context_management);
      }
      if (eventType === "message_start") {
        const message = asRecord(payload.message);
        messageId = toString(message.id, messageId || `msg_${Date.now()}`);
        model = toString(message.model, model);
        role = toString(message.role, role);
        mergeUsage(usage, message.usage);
        return;
      }

      if (eventType === "content_block_start") {
        const index = toNumber(payload.index, blocks.size);
        const contentBlock = asRecord(payload.content_block);
        const blockType = toString(contentBlock.type);

        if (blockType === "thinking") {
          blocks.set(index, {
            type: "thinking",
            index,
            thinking: toString(contentBlock.thinking),
            signature:
              typeof contentBlock.signature === "string" ? contentBlock.signature : undefined,
          });
        } else if (blockType === "tool_use") {
          blocks.set(index, {
            type: "tool_use",
            index,
            id: toString(contentBlock.id, `toolu_${Date.now()}_${index}`),
            name: toString(contentBlock.name),
            input: cloneLogPayload(contentBlock.input ?? {}),
            inputJson: "",
          });
        } else {
          blocks.set(index, {
            type: "text",
            index,
            text: toString(contentBlock.text),
          });
        }
        return;
      }

      if (eventType === "content_block_delta") {
        const index = toNumber(payload.index, 0);
        const delta = asRecord(payload.delta);
        const deltaType = toString(delta.type);
        const existing = blocks.get(index);

        if (deltaType === "input_json_delta") {
          const toolUse =
            existing && existing.type === "tool_use"
              ? existing
              : {
                  type: "tool_use" as const,
                  index,
                  id: `toolu_${Date.now()}_${index}`,
                  name: "",
                  input: {},
                  inputJson: "",
                };
          toolUse.inputJson += toString(delta.partial_json);
          blocks.set(index, toolUse);
          return;
        }

        if (deltaType === "thinking_delta" || typeof delta.thinking === "string") {
          const thinking =
            existing && existing.type === "thinking"
              ? existing
              : { type: "thinking" as const, index, thinking: "", signature: undefined };
          thinking.thinking += toString(delta.thinking);
          blocks.set(index, thinking);
          return;
        }

        const textBlock =
          existing && existing.type === "text"
            ? existing
            : {
                type: "text" as const,
                index,
                text: "",
              };
        textBlock.text += toString(delta.text);
        blocks.set(index, textBlock);
        return;
      }

      if (eventType === "message_delta") {
        const delta = asRecord(payload.delta);
        stopReason = toString(delta.stop_reason, stopReason);
        stopSequence =
          typeof delta.stop_sequence === "string" ? String(delta.stop_sequence) : stopSequence;
        mergeUsage(usage, payload.usage);
        return;
      }

      mergeUsage(usage, payload.usage);
    },

    finalize(): unknown {
      if (!sawAny) return null;

      const content = [...blocks.values()]
        .sort((a, b) => a.index - b.index)
        .flatMap<ClaudeContentBlock>((block) => {
          if (block.type === "text") {
            return block.text
              ? [
                  {
                    type: "text",
                    text: block.text,
                  },
                ]
              : [];
          }
          if (block.type === "thinking") {
            return block.thinking
              ? [
                  {
                    type: "thinking",
                    thinking: block.thinking,
                    ...(block.signature ? { signature: block.signature } : {}),
                  },
                ]
              : [];
          }

          const parsedInput =
            block.inputJson.trim().length > 0
              ? tryParseJson(block.inputJson)
              : cloneLogPayload(block.input);
          return [
            {
              type: "tool_use",
              id: block.id,
              name: block.name,
              input: parsedInput,
            },
          ];
        });

      return {
        id: messageId || `msg_${Date.now()}`,
        type: "message",
        role,
        model,
        content,
        stop_reason: stopReason,
        ...(stopSequence ? { stop_sequence: stopSequence } : {}),
        ...(Object.keys(usage).length > 0 ? { usage } : {}),
        ...(contextManagement ? { context_management: contextManagement } : {}),
      };
    },
  };
}

function createGeminiReducer(fallbackModel?: string | null): SummaryReducer {
  let sawAny = false;
  const parts: JsonRecord[] = [];
  const usageMetadata: JsonRecord = {};
  let modelVersion = fallbackModel || "gemini";
  let finishReason = "STOP";
  let role = "model";

  const appendPart = (part: JsonRecord) => {
    const last = parts[parts.length - 1];
    if (
      last &&
      typeof last.text === "string" &&
      typeof part.text === "string" &&
      Boolean(last.thought) === Boolean(part.thought)
    ) {
      last.text += part.text;
      return;
    }
    parts.push(part);
  };

  return {
    ingest(payload: JsonRecord) {
      if (Object.keys(payload).length === 0) return;
      sawAny = true;

      if (typeof payload.modelVersion === "string" && payload.modelVersion.length > 0) {
        modelVersion = payload.modelVersion;
      }
      mergeUsage(usageMetadata, payload.usageMetadata);

      const candidate = asRecord(Array.isArray(payload.candidates) ? payload.candidates[0] : null);
      if (typeof candidate.finishReason === "string" && candidate.finishReason.length > 0) {
        finishReason = candidate.finishReason;
      }

      const content = asRecord(candidate.content);
      if (typeof content.role === "string" && content.role.length > 0) {
        role = content.role;
      }

      if (!Array.isArray(content.parts)) return;
      for (const item of content.parts) {
        const part = asRecord(item);
        if (part.functionCall && typeof part.functionCall === "object") {
          parts.push({
            functionCall: cloneLogPayload(part.functionCall),
          });
        } else if (typeof part.text === "string" && part.text.length > 0) {
          appendPart({
            text: part.text,
            ...(part.thought === true ? { thought: true } : {}),
          });
        }
      }
    },

    finalize(): unknown {
      if (!sawAny) return null;

      return {
        candidates: [
          {
            index: 0,
            content: {
              role,
              parts,
            },
            finishReason,
          },
        ],
        ...(Object.keys(usageMetadata).length > 0 ? { usageMetadata } : {}),
        modelVersion,
      };
    },
  };
}

function createSummaryReducer(
  format: string | null | undefined,
  fallbackModel?: string | null
): SummaryReducer | undefined {
  const normalized = normalizeFormat(format);
  if (!normalized) return undefined;

  switch (normalized) {
    case FORMATS.OPENAI_RESPONSES:
      return createResponsesReducer(fallbackModel);
    case FORMATS.CLAUDE:
      return createClaudeReducer(fallbackModel);
    case FORMATS.GEMINI:
    case FORMATS.ANTIGRAVITY:
      return createGeminiReducer(fallbackModel);
    default:
      return createOpenAIReducer(fallbackModel);
  }
}

// A pushed payload is either the bare provider/passthrough event (what
// providerPayloadCollector always receives), or a `{event, data}` SSE
// envelope (what emitTranslatedClientItem pushes for every translate-mode
// client item, since formatSSE needs the `event:` line name separate from
// the `data:` payload) -- unwrap the latter so every reducer's ingest() sees
// the real payload's own `.type`/`.choices`/etc. either way. Without this,
// a client-facing summary built from translate-mode events (clientPayload
// when sourceFormat is Responses/Claude/Gemini) never found a real `type`
// field, since it was always one level too shallow.
function unwrapEventEnvelope(payload: unknown): JsonRecord {
  const record = asRecord(payload);
  const inner = record.data;
  if (typeof record.event === "string" && inner && typeof inner === "object") {
    return asRecord(inner);
  }
  return record;
}

function buildOpenAISummary(events: StructuredSSEEvent[], fallbackModel?: string | null): unknown {
  const reducer = createOpenAIReducer(fallbackModel);
  for (const evt of events) reducer.ingest(unwrapEventEnvelope(evt.data));
  return reducer.finalize();
}

function buildResponsesSummary(
  events: StructuredSSEEvent[],
  fallbackModel?: string | null
): unknown {
  const reducer = createResponsesReducer(fallbackModel);
  for (const evt of events) reducer.ingest(unwrapEventEnvelope(evt.data));
  return reducer.finalize();
}

function buildClaudeSummary(events: StructuredSSEEvent[], fallbackModel?: string | null): unknown {
  const reducer = createClaudeReducer(fallbackModel);
  for (const evt of events) reducer.ingest(unwrapEventEnvelope(evt.data));
  return reducer.finalize();
}

function buildGeminiSummary(events: StructuredSSEEvent[], fallbackModel?: string | null): unknown {
  const reducer = createGeminiReducer(fallbackModel);
  for (const evt of events) reducer.ingest(unwrapEventEnvelope(evt.data));
  return reducer.finalize();
}

export function buildStreamSummaryFromEvents(
  events: StructuredSSEEvent[],
  fallbackFormat?: string | null,
  fallbackModel?: string | null
): unknown {
  const format = inferFormatFromEvents(events, fallbackFormat);

  switch (format) {
    case FORMATS.OPENAI_RESPONSES:
      return buildResponsesSummary(events, fallbackModel);
    case FORMATS.CLAUDE:
      return buildClaudeSummary(events, fallbackModel);
    case FORMATS.GEMINI:
    case FORMATS.ANTIGRAVITY:
      return buildGeminiSummary(events, fallbackModel);
    default:
      return buildOpenAISummary(events, fallbackModel);
  }
}

export function compactStructuredStreamPayload(payload: unknown): unknown {
  const record = asRecord(payload);
  if (record._streamed !== true || !("summary" in record)) {
    return payload;
  }

  const streamMeta: JsonRecord = {
    format: toString(record._format, "sse-json"),
    stage: toString(record._stage, "response"),
    eventCount: toNumber(record._eventCount, 0),
  };
  if (record._truncated === true) {
    streamMeta.truncated = true;
  }
  if (typeof record._droppedEvents === "number" && record._droppedEvents > 0) {
    streamMeta.droppedEvents = record._droppedEvents;
  }

  const summary = cloneLogPayload(record.summary);
  if (summary && typeof summary === "object" && !Array.isArray(summary)) {
    return {
      ...(summary as JsonRecord),
      _omniroute_stream: streamMeta,
    };
  }

  return {
    summary,
    _omniroute_stream: streamMeta,
  };
}

// Live incident (2026-09-02): a reasoning-heavy response streams reasoning
// token-by-token as hundreds to thousands of tiny SSE deltas BEFORE the real
// output/tool_calls ever arrive. At the old defaults (200 events / 48KB) the
// cap was routinely exhausted during the reasoning phase alone, dropping the
// completion event entirely -- measured live: ~22% of a sample of recent
// successful responses hit this. For a caller with no `format` (no live
// reducer -- see the CollectorOptions.format doc comment), the logged
// summary is reconstructed from getEvents() (open-sse/utils/stream.ts), so a
// dropped completion event produced a served-successfully response logged
// with status "in_progress" and empty output -- which
// src/lib/db/responsesContinuationStore.ts then had nothing real to
// reconstruct a later continuation turn from (see its own fail-closed fix,
// 2026-09-02). Raising the cap doesn't eliminate the class of bug for an
// arbitrarily long stream, but it removes it as a routine, everyday failure;
// the format-driven live reducer (used by providerPayloadCollector, an
// analogous prior fix) is the cap-independent fix and remains the deeper
// follow-up for a caller that still wants build()'s summary correct beyond
// any fixed cap.
export function createStructuredSSECollector(options: CollectorOptions = {}) {
  const { maxEvents = 2000, maxBytes = 524288, stage, format, fallbackModel } = options;
  const events: StructuredSSEEvent[] = [];
  let usedBytes = 0;
  let droppedEvents = 0;
  // Live-updated on every push() regardless of the storage cap above — see
  // the CollectorOptions.format doc comment for why (#9315).
  const reducer = createSummaryReducer(format, fallbackModel);

  return {
    push(payload: unknown, explicitEvent?: string) {
      if (payload === null || payload === undefined) return;

      // Reducer only reads — safe to pass the original payload without a clone.
      // The deep clone is deferred until after the cap check so dropped events
      // don't pay the structuredClone cost (~9,800 saved per stream — see
      // _tasks/research/2026-08-31_performance-resource-audit.md, Quick Win #2).
      reducer?.ingest(unwrapEventEnvelope(payload));

      const event: StructuredSSEEvent = {
        index: events.length + droppedEvents,
        timestamp: new Date().toISOString(),
        data: payload,
      };

      const eventName = explicitEvent || getEventName(payload);
      if (eventName) {
        event.event = eventName;
      }

      const serializedSize = jsonLength(event);
      if (events.length >= maxEvents || usedBytes + serializedSize > maxBytes) {
        droppedEvents += 1;
        return;
      }

      event.data = cloneLogPayload(payload);
      usedBytes += serializedSize;
      events.push(event);
    },

    getEvents() {
      return events.map((event) => cloneLogPayload(event));
    },

    // The reducer-computed summary, built incrementally from EVERY pushed
    // payload (see CollectorOptions.format) — unlike
    // buildStreamSummaryFromEvents(getEvents(), ...), this is correct even
    // once the collector has truncated its retained event array. Returns
    // undefined if no format was configured (e.g. the client-response
    // collector, which builds its summary from independently-accumulated
    // response state instead).
    getSummary(): unknown {
      return reducer?.finalize();
    },

    build(summary?: unknown, buildOptions: BuildOptions = {}) {
      const { includeEvents = true } = buildOptions;
      return {
        _streamed: true,
        _format: "sse-json",
        ...(stage ? { _stage: stage } : {}),
        _eventCount: events.length + droppedEvents,
        ...(droppedEvents > 0 ? { _truncated: true, _droppedEvents: droppedEvents } : {}),
        ...(includeEvents ? { events } : {}),
        ...(summary === undefined ? {} : { summary: cloneLogPayload(summary) }),
      };
    },
  };
}
