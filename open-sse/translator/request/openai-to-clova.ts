/**
 * OpenAI → Naver CLOVA Studio "Chat Completions v3" request translator.
 *
 * Wire format: `POST https://clovastudio.stream.ntruss.com/v3/chat-completions/{modelName}`
 *
 * Everything below that is marked "live-verified" was confirmed against the real
 * API on 2026-09-01 — several of these rules contradict a plausible reading of
 * the vendor docs, so they are recorded with the evidence.
 *
 * Vendor docs:
 *   - text/image: https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3
 *   - thinking:   https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3-thinking
 *   - FC:         https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3-fc
 *   - SO:         https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3-so
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";

/** Output cap for the non-reasoning v3 models (HCX-005, HCX-DASH-002). */
export const CLOVA_V3_MAX_OUTPUT_TOKENS = 4096;

/** Output cap for the reasoning model (HCX-007) — includes thinking tokens. */
export const CLOVA_V3_REASONING_MAX_OUTPUT_TOKENS = 32768;

/**
 * Function calling rejects any cap below 1024 (live-verified: `40001 Invalid
 * parameter: tools, maxTokens`).
 */
export const CLOVA_V3_MIN_TOOL_TOKENS = 1024;

export const CLOVA_V3_REASONING_MODELS: ReadonlySet<string> = new Set(["HCX-007"]);

export const CLOVA_V3_VISION_MODELS: ReadonlySet<string> = new Set(["HCX-005"]);

/**
 * All three v3 models accept function calling (live-verified). HCX-007 needs
 * `thinking.effort: "none"` alongside it or the call fails with
 * `40001 Invalid parameter: tools, thinking`.
 */
export const CLOVA_V3_FUNCTION_CALLING_MODELS: ReadonlySet<string> = new Set([
  "HCX-005",
  "HCX-007",
  "HCX-DASH-002",
]);

/** Structured Outputs is HCX-007 only (live-verified: HCX-005 rejects `thinking`). */
export const CLOVA_V3_STRUCTURED_OUTPUT_MODELS: ReadonlySet<string> = new Set(["HCX-007"]);

const CLOVA_THINKING_EFFORTS: ReadonlySet<string> = new Set(["none", "low", "medium", "high"]);

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function nonEmptyString(value: unknown): string {
  return typeof value === "string" && value.length > 0 ? value : "";
}

export function isClovaReasoningModel(model: string): boolean {
  return typeof model === "string" && CLOVA_V3_REASONING_MODELS.has(model.toUpperCase());
}

export function isClovaVisionModel(model: string): boolean {
  return typeof model === "string" && CLOVA_V3_VISION_MODELS.has(model.toUpperCase());
}

export function isClovaFunctionCallingModel(model: string): boolean {
  return typeof model === "string" && CLOVA_V3_FUNCTION_CALLING_MODELS.has(model.toUpperCase());
}

export function isClovaStructuredOutputModel(model: string): boolean {
  return typeof model === "string" && CLOVA_V3_STRUCTURED_OUTPUT_MODELS.has(model.toUpperCase());
}

function clampNumeric(value: unknown, min: number, max: number): number | null {
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) return null;
  return Math.min(Math.max(n, min), max);
}

/**
 * Map OpenAI `reasoning_effort` onto CLOVA's `thinking.effort`.
 * `minimal` collapses to `low`; unrecognised values are dropped so CLOVA applies
 * its own default (`low`).
 */
export function toClovaThinkingEffort(reasoningEffort: unknown): string {
  if (typeof reasoningEffort !== "string") return "";
  const effort = reasoningEffort.toLowerCase();
  if (effort === "minimal") return "low";
  return CLOVA_THINKING_EFFORTS.has(effort) ? effort : "";
}

/** Flatten OpenAI message content into a single string (text only). */
function contentToString(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return content == null ? "" : String(content);
  return content
    .map((part) =>
      part && typeof part === "object" && typeof part.text === "string" ? part.text : ""
    )
    .filter(Boolean)
    .join("\n");
}

/**
 * Convert an OpenAI `content` value into CLOVA v3 typed content parts.
 *
 * Both image transports work (live-verified): a public URL becomes
 * `imageUrl.url`, and a `data:` URL becomes `dataUri.data` — which must keep the
 * FULL `data:<mime>;base64,` prefix or CLOVA rejects the request with
 * `40001 Invalid parameter`.
 */
export function toClovaContent(
  content: unknown,
  supportsImages: boolean
): Array<Record<string, unknown>> {
  if (typeof content === "string") {
    return [{ type: "text", text: content }];
  }

  if (!Array.isArray(content)) {
    return [{ type: "text", text: content == null ? "" : String(content) }];
  }

  const parts = content
    .map((part) => toClovaContentPart(part, supportsImages))
    .filter((part): part is JsonRecord => part !== null);

  // CLOVA rejects a message with an empty content array, so always emit a part.
  return parts.length > 0 ? parts : [{ type: "text", text: "" }];
}

function toClovaContentPart(part: unknown, supportsImages: boolean): JsonRecord | null {
  const record = toRecord(part);
  if (!record) return null;

  const text = nonEmptyString(record.text);
  if (record.type === "text" || text) return text ? { type: "text", text } : null;
  if (record.type !== "image_url" || !supportsImages) return null;

  const imageUrl = toRecord(record.image_url);
  const url = nonEmptyString(imageUrl?.url) || nonEmptyString(record.url);
  if (!url) return null;
  return url.startsWith("data:")
    ? { type: "image_url", dataUri: { data: url } }
    : { type: "image_url", imageUrl: { url } };
}

/** Parse OpenAI's JSON-string tool arguments into the object CLOVA expects. */
function toolArgumentsToObject(raw: unknown): Record<string, unknown> {
  if (raw == null) return {};
  if (typeof raw === "object") return raw as Record<string, unknown>;
  if (typeof raw !== "string" || !raw.trim()) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/**
 * Convert OpenAI tool declarations into CLOVA's `tools` array.
 * The shapes are nearly identical; empty declarations are skipped because CLOVA
 * rejects a tool without a name.
 */
export function toClovaTools(tools: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(tools)) return [];
  return tools.map(toClovaTool).filter((tool): tool is JsonRecord => tool !== null);
}

function toClovaTool(tool: unknown): JsonRecord | null {
  const record = toRecord(tool);
  if (!record) return null;
  const fn = toRecord(record.function);
  const name = nonEmptyString(fn?.name) || nonEmptyString(record.name);
  if (!name) return null;

  const description =
    nonEmptyString(fn?.description) || nonEmptyString(record.description) || `Tool: ${name}`;
  const parameters = fn?.parameters ?? record.parameters;
  return {
    type: "function",
    function: {
      name,
      description,
      ...(parameters ? { parameters } : {}),
    },
  };
}

/**
 * Which mutually-exclusive v3 mode does this request use?
 *
 * CLOVA forbids combining function calling with thinking or images, and forbids
 * combining structured outputs with either. Exactly one mode is chosen.
 */
export function resolveClovaMode(
  model: string,
  body: Record<string, unknown>
): "tools" | "structured" | "plain" {
  const tools = toClovaTools(body?.tools);
  if (tools.length > 0 && isClovaFunctionCallingModel(model)) return "tools";

  const format = toRecord(body?.response_format);
  const wantsSchema = format && (format.type === "json_schema" || format.type === "json_object");
  if (wantsSchema && isClovaStructuredOutputModel(model)) return "structured";

  return "plain";
}

type ClovaMode = "tools" | "structured" | "plain";

function normalizeMessageRole(role: unknown): "assistant" | "system" | "user" {
  return role === "assistant" || role === "system" ? role : "user";
}

function toClovaToolCall(call: unknown): JsonRecord {
  const record = toRecord(call) ?? {};
  const fn = toRecord(record.function);
  return {
    id: record.id ?? "",
    type: "function",
    function: {
      name: fn?.name ?? record.name ?? "",
      arguments: toolArgumentsToObject(fn?.arguments ?? record.arguments),
    },
  };
}

function toClovaToolModeMessage(message: unknown): JsonRecord {
  const record = toRecord(message) ?? {};
  if (record.role === "tool") {
    return {
      role: "tool",
      content: contentToString(record.content),
      ...(record.tool_call_id ? { toolCallId: String(record.tool_call_id) } : {}),
    };
  }

  const toolCalls = Array.isArray(record.tool_calls) ? record.tool_calls : [];
  if (record.role === "assistant" && toolCalls.length > 0) {
    return {
      role: "assistant",
      content: "",
      toolCalls: toolCalls.map(toClovaToolCall),
    };
  }
  return {
    role: normalizeMessageRole(record.role),
    content: contentToString(record.content),
  };
}

function toClovaPlainMessage(message: unknown, supportsImages: boolean): JsonRecord {
  const record = toRecord(message) ?? {};
  return {
    role: normalizeMessageRole(record.role),
    content: toClovaContent(record.content, supportsImages),
  };
}

function toClovaMessages(body: JsonRecord, mode: ClovaMode, supportsImages: boolean): JsonRecord[] {
  const messages = Array.isArray(body.messages) ? body.messages : [];
  return messages.map((message) =>
    mode === "tools"
      ? toClovaToolModeMessage(message)
      : toClovaPlainMessage(message, supportsImages)
  );
}

function applyThinking(payload: JsonRecord, body: JsonRecord, reasoning: boolean, mode: ClovaMode) {
  if (!reasoning) return;
  const effort = toClovaThinkingEffort(body.reasoning_effort);
  if (mode === "tools" || mode === "structured") {
    payload.thinking = { effort: "none" };
  } else if (effort) {
    payload.thinking = { effort };
  }
}

function applySampling(payload: JsonRecord, body: JsonRecord): void {
  const temperature = clampNumeric(body.temperature, 0, 1);
  if (temperature !== null) payload.temperature = temperature;
  const topP = clampNumeric(body.top_p, 0, 1);
  if (topP !== null && topP > 0) payload.topP = topP;
  const topK = clampNumeric(body.top_k, 0, 128);
  if (topK !== null && topK > 0) payload.topK = topK;
  const penalty = clampNumeric(body.repetition_penalty, 0, 2);
  if (penalty !== null && penalty > 0) payload.repetitionPenalty = penalty;
}

function applyOutputCap(
  payload: JsonRecord,
  body: JsonRecord,
  reasoning: boolean,
  mode: ClovaMode
): void {
  const cap = reasoning ? CLOVA_V3_REASONING_MAX_OUTPUT_TOKENS : CLOVA_V3_MAX_OUTPUT_TOKENS;
  const key = reasoning ? "maxCompletionTokens" : "maxTokens";
  let tokens = clampNumeric(body.max_completion_tokens ?? body.max_tokens, 1, cap);
  if (mode === "tools") {
    const floor = Math.min(CLOVA_V3_MIN_TOOL_TOKENS, cap);
    tokens = tokens === null ? floor : Math.max(tokens, floor);
  }
  if (tokens !== null) payload[key] = tokens;
}

function responseSchema(body: JsonRecord): unknown {
  const format = toRecord(body.response_format);
  const jsonSchema = toRecord(format?.json_schema);
  return jsonSchema?.schema ?? format?.schema;
}

function applyModeFields(payload: JsonRecord, body: JsonRecord, mode: ClovaMode): void {
  if (mode === "tools") {
    payload.tools = toClovaTools(body.tools);
    if (body.tool_choice === "none") payload.toolChoice = "none";
    if (body.tool_choice === "auto" || body.tool_choice === "required") {
      payload.toolChoice = "auto";
    }
    return;
  }
  if (mode !== "structured") return;
  const schema = responseSchema(body);
  if (schema && typeof schema === "object") {
    payload.responseFormat = { type: "json", schema };
  } else {
    delete payload.thinking;
  }
}

function applyPlainOptions(
  payload: JsonRecord,
  body: JsonRecord,
  reasoning: boolean,
  mode: ClovaMode
): void {
  if (mode === "plain" && !reasoning) {
    if (Array.isArray(body.stop) && body.stop.length > 0) {
      payload.stop = body.stop.filter((value) => typeof value === "string");
    } else if (typeof body.stop === "string" && body.stop) {
      payload.stop = [body.stop];
    }
  }
  const seed = clampNumeric(body.seed, 0, 4294967295);
  if (seed !== null && seed > 0) payload.seed = Math.floor(seed);
  if (body.include_ai_filters === true) payload.includeAiFilters = true;
}

/** Build the CLOVA Studio v3 request body from an OpenAI Chat Completions body. */
export function buildClovaPayload(
  model: string,
  body: Record<string, unknown>,
  stream: boolean,
  credentials?: Record<string, unknown> | null
): Record<string, unknown> {
  void stream;
  void credentials;
  const reasoning = isClovaReasoningModel(model);
  const mode = resolveClovaMode(model, body);
  const supportsImages = mode === "plain" && isClovaVisionModel(model);
  const payload: JsonRecord = { messages: toClovaMessages(body, mode, supportsImages) };

  applyThinking(payload, body, reasoning, mode);
  applySampling(payload, body);
  applyOutputCap(payload, body, reasoning, mode);
  applyModeFields(payload, body, mode);
  applyPlainOptions(payload, body, reasoning, mode);
  return payload;
}

register(FORMATS.OPENAI, FORMATS.CLOVA, buildClovaPayload, null);
