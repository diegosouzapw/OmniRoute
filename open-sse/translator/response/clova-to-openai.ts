/**
 * Naver CLOVA Studio "Chat Completions v3" → OpenAI response translator.
 *
 * CLOVA v3 streams as SSE with **named events**:
 *
 * ```
 * id: <uuid>
 * event: token
 * data: {"message":{"role":"assistant","content":"안"},"finishReason":null,...}
 *
 * id: <uuid>
 * event: result
 * data: {"message":{"role":"assistant","content":"안녕"},"finishReason":"stop",
 *        "usage":{"promptTokens":20,"completionTokens":5,"totalTokens":25}}
 * ```
 *
 * Three traps this translator exists to defuse:
 *
 * 1. **`event: token` carries an incremental delta, but `event: result` repeats
 *    the COMPLETE text.** Concatenating both duplicates the whole answer at the
 *    end of the stream, so the result event is treated as a terminal snapshot:
 *    it contributes `finish_reason` + `usage` only.
 * 2. **Function-calling streams deliver arguments as `partialJson` fragments.**
 *    The first token carries the tool `id` + `name`; every later token carries
 *    only a JSON fragment (`{`, `"location`, `":`, ` "`, `Se`, `oul`, `"}`),
 *    which have to be reassembled into OpenAI's `tool_calls[].function.arguments`
 *    string. The terminal frame repeats the finished call, so — same rule as the
 *    text snapshot — it is not re-emitted.
 * 3. **Failures can arrive as an in-stream payload** whose `status.code` is not
 *    `20000`, not just as an HTTP error. Those are surfaced through
 *    `state.upstreamError` so stream.ts fails the request out and combo fallback
 *    can run, mirroring the Gemini translator.
 *
 * Docs: https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";

/** CLOVA's success status code (a string, not an HTTP number). */
const CLOVA_STATUS_OK = "20000";

type JsonRecord = Record<string, unknown>;

interface ClovaStreamState extends JsonRecord {
  responseId?: string;
  created?: number;
  model?: string;
  chunkIndex?: number;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  upstreamError?: { status: number; type: string; code: string; message: string };
  toolCallStarted?: boolean;
  finishReason?: string;
}

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/** Map a CLOVA `finishReason` onto the OpenAI vocabulary. */
function mapFinishReason(reason: unknown): string {
  switch (String(reason || "")) {
    case "length":
      return "length";
    case "tool_calls":
      return "tool_calls";
    case "content_filter":
      return "content_filter";
    default:
      return "stop";
  }
}

/**
 * Map a CLOVA string status code onto an HTTP status for error surfacing.
 * Codes are 5-digit strings: `2xxxx` success, `4xxxx` client, `5xxxx` server.
 */
function httpStatusFromClovaCode(code: unknown): number {
  const first = String(code || "").charAt(0);
  if (first === "4") return 400;
  return 502;
}

/**
 * Parse one raw SSE frame into `{ event, data }`.
 * CLOVA emits `id:` / `event:` / `data:` lines per frame.
 */
export function parseClovaSseFrame(raw: string): { event: string; data: unknown } | null {
  if (typeof raw !== "string" || !raw.trim()) return null;

  let event = "";
  let dataLine = "";

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("event:")) {
      event = trimmed.slice(6).trim();
    } else if (trimmed.startsWith("data:")) {
      dataLine = trimmed.slice(5).trim();
    }
  }

  if (!dataLine) return null;

  try {
    return { event, data: JSON.parse(dataLine) };
  } catch {
    return null;
  }
}

function baseChunk(state: ClovaStreamState): Record<string, unknown> {
  return {
    id: state.responseId,
    object: "chat.completion.chunk",
    created: state.created,
    model: state.model || "clova",
  };
}

/**
 * Build one OpenAI delta chunk.
 *
 * `field` selects the delta key: `"content"` for the visible answer and
 * `"reasoning_content"` for CLOVA's `thinkingContent` (HCX-007).
 */
function deltaChunk(
  state: ClovaStreamState,
  content: string,
  field = "content"
): Record<string, unknown> {
  const chunk = baseChunk(state);
  chunk.choices = [
    {
      index: 0,
      delta: {
        ...((state.chunkIndex ?? 0) === 0 ? { role: "assistant" } : {}),
        [field]: content,
      },
      finish_reason: null,
    },
  ];
  state.chunkIndex = (state.chunkIndex ?? 0) + 1;
  return chunk;
}

/** First tool-call chunk: carries id + name and opens an empty argument string. */
function toolCallStartChunk(
  state: ClovaStreamState,
  id: string,
  name: string
): Record<string, unknown> {
  const chunk = baseChunk(state);
  chunk.choices = [
    {
      index: 0,
      delta: {
        ...((state.chunkIndex ?? 0) === 0 ? { role: "assistant" } : {}),
        tool_calls: [
          {
            index: 0,
            id: id || `call_${state.responseId}`,
            type: "function",
            function: { name, arguments: "" },
          },
        ],
      },
      finish_reason: null,
    },
  ];
  state.chunkIndex = (state.chunkIndex ?? 0) + 1;
  return chunk;
}

/** Subsequent tool-call chunk: appends one `partialJson` fragment. */
function toolCallArgumentsChunk(
  state: ClovaStreamState,
  fragment: string
): Record<string, unknown> {
  const chunk = baseChunk(state);
  chunk.choices = [
    {
      index: 0,
      delta: { tool_calls: [{ index: 0, function: { arguments: fragment } }] },
      finish_reason: null,
    },
  ];
  state.chunkIndex = (state.chunkIndex ?? 0) + 1;
  return chunk;
}

function terminalChunk(state: ClovaStreamState, finishReason: string): Record<string, unknown> {
  const chunk = baseChunk(state);
  chunk.choices = [{ index: 0, delta: {}, finish_reason: finishReason }];
  if (state.usage) chunk.usage = state.usage;
  return chunk;
}

function recordUsage(state: ClovaStreamState, usage: unknown): void {
  const record = toRecord(usage);
  if (!record) return;
  const prompt = Number(record.promptTokens) || 0;
  const completion = Number(record.completionTokens) || 0;
  const total = Number(record.totalTokens) || prompt + completion;
  state.usage = {
    prompt_tokens: prompt,
    completion_tokens: completion,
    total_tokens: total,
  };
}

function recordUpstreamError(state: ClovaStreamState, code: unknown, message: unknown): void {
  const status = httpStatusFromClovaCode(code);
  state.upstreamError = {
    status,
    type: status === 429 ? "rate_limit_error" : "server_error",
    code: String(code || "clova_error"),
    message: typeof message === "string" && message ? message : "CLOVA Studio upstream failure",
  };
}

interface DecodedClovaChunk {
  event: string;
  data: JsonRecord;
}

function initializeState(state: ClovaStreamState): void {
  if (state.responseId) return;
  state.responseId = `chatcmpl-${Date.now()}`;
  state.created = Math.floor(Date.now() / 1000);
  state.chunkIndex = 0;
}

function decodeClovaChunk(chunk: unknown): DecodedClovaChunk | null {
  if (typeof chunk === "string") {
    const frame = parseClovaSseFrame(chunk);
    const data = toRecord(frame?.data);
    return frame && data ? { event: frame.event, data } : null;
  }
  const data = toRecord(chunk);
  if (!data) return null;
  return { event: String(data.event || data._eventType || ""), data };
}

function handleErrorEnvelope(state: ClovaStreamState, event: string, data: JsonRecord): boolean {
  const status = toRecord(data.status);
  const statusCode = status?.code ?? data.statusCode;
  if (statusCode != null && String(statusCode) !== CLOVA_STATUS_OK) {
    recordUpstreamError(state, statusCode, status?.message ?? data.message);
    return true;
  }

  const error = toRecord(data.error);
  if (event !== "error" && !error) return false;
  const source = error ?? data;
  const errorStatus = toRecord(source.status);
  recordUpstreamError(
    state,
    errorStatus?.code ?? source.code,
    errorStatus?.message ?? source.message
  );
  return true;
}

function toolCallDelta(state: ClovaStreamState, call: unknown): Record<string, unknown> | null {
  const record = toRecord(call);
  const fn = toRecord(record?.function);
  if (!record || !fn) return null;
  const id = typeof record.id === "string" ? record.id : "";
  const name = typeof fn.name === "string" ? fn.name : "";
  if (id || name) {
    if (state.toolCallStarted) return null;
    state.toolCallStarted = true;
    return toolCallStartChunk(state, id, name);
  }
  return typeof fn.partialJson === "string" && fn.partialJson
    ? toolCallArgumentsChunk(state, fn.partialJson)
    : null;
}

function toolCallDeltas(
  state: ClovaStreamState,
  message: JsonRecord
): Record<string, unknown> | Array<Record<string, unknown>> | null {
  if (!Array.isArray(message.toolCalls) || message.toolCalls.length === 0) return null;
  const out = message.toolCalls
    .map((call) => toolCallDelta(state, call))
    .filter((chunk): chunk is Record<string, unknown> => chunk !== null);
  if (out.length === 0) return null;
  return out.length === 1 ? out[0] : out;
}

function convertTokenEvent(
  state: ClovaStreamState,
  data: JsonRecord
): Record<string, unknown> | Array<Record<string, unknown>> | null {
  const message = toRecord(data.message) ?? data;
  const toolDeltas = toolCallDeltas(state, message);
  if (toolDeltas) return toolDeltas;
  const thinking = message.thinkingContent ?? data.thinkingContent;
  if (thinking) return deltaChunk(state, String(thinking), "reasoning_content");
  const content = message.content ?? data.content;
  return content ? deltaChunk(state, String(content)) : null;
}

function shouldEmitResultSnapshot(
  state: ClovaStreamState,
  isResultEvent: boolean,
  snapshot: unknown
): snapshot is string {
  return (
    !isResultEvent && (state.chunkIndex ?? 0) === 0 && typeof snapshot === "string" && !!snapshot
  );
}

function convertResultEvent(
  state: ClovaStreamState,
  event: string,
  data: JsonRecord
): Record<string, unknown> | Array<Record<string, unknown>> | null {
  const isResultEvent = event === "result" || event === "stop";
  const resultEnvelope = toRecord(data.result);
  if (!isResultEvent && (event || !resultEnvelope)) return null;

  const result = resultEnvelope ?? data;
  const message = toRecord(result.message);
  recordUsage(state, result.usage);
  const hasToolCalls = Array.isArray(message?.toolCalls) && message.toolCalls.length > 0;
  const finishReason = hasToolCalls ? "tool_calls" : mapFinishReason(result.finishReason);
  state.finishReason = finishReason;

  const snapshot = message?.content ?? result.content;
  if (shouldEmitResultSnapshot(state, isResultEvent, snapshot)) {
    return [deltaChunk(state, snapshot), terminalChunk(state, finishReason)];
  }
  return terminalChunk(state, finishReason);
}

/** Convert one CLOVA stream frame or JSON envelope into OpenAI chunk(s). */
export function convertClovaToOpenAI(
  chunk: unknown,
  state: Record<string, unknown>
): Record<string, unknown> | Array<Record<string, unknown>> | null {
  if (chunk == null) return null;
  const streamState = state as ClovaStreamState;
  initializeState(streamState);
  const decoded = decodeClovaChunk(chunk);
  if (!decoded) return null;
  if (handleErrorEnvelope(streamState, decoded.event, decoded.data)) return null;
  return decoded.event === "token"
    ? convertTokenEvent(streamState, decoded.data)
    : convertResultEvent(streamState, decoded.event, decoded.data);
}

register(FORMATS.CLOVA, FORMATS.OPENAI, null, convertClovaToOpenAI);
