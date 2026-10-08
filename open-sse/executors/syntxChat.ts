/**
 * SYNTX.ai chat helpers — prompt flatten, tool-call parse, SSE decode, generate body.
 * Keep SyntxExecutor (open-sse/executors/syntx.ts) under the new-file cap.
 */
import { createHash, randomBytes } from "node:crypto";
import { SYNTX_API_BASE, SYNTX_SSE_ORIGIN } from "../services/syntxAuth.ts";
import type { SyntxCatalogModel } from "../services/syntxModels.ts";
import { extractSyntxMessageText, type SyntxChatMessage } from "../services/syntxSessions.ts";

export type JsonRecord = Record<string, unknown>;

/** Unset = on. `OMNIROUTE_PROMPT_EMULATE_TOOLS=0` skips the local-tool catalog inject. */
function isSyntxPromptToolEmulationEnabled(): boolean {
  const raw = (process.env.OMNIROUTE_PROMPT_EMULATE_TOOLS ?? "").trim().toLowerCase();
  if (!raw) return true;
  return raw === "1" || raw === "true" || raw === "on" || raw === "yes";
}

const TOOL_MARK = "<tool_call>";
const TOOL_INSTRUCTIONS = `
# Tool Calling
SYNTX native tools (search, code, shell) are on.
Local proxy tools are also on.
Call a local proxy tool with EXACTLY this block (no markdown fences):
<tool_call>
{"name": "tool_name", "arguments": {"param": "value"}}
</tool_call>
Multiple blocks allowed. If no local tool is needed, answer in plain text.
`;

/** Browser generate body uses a string-id tool list. Live chat keeps these on. */
export const SYNTX_NATIVE_TOOLS = ["search", "code", "shell"] as const;
/** SYNTX generate/SSE can sit silent for minutes (native tools, slow models). */
export const SYNTX_REQUEST_TIMEOUT_MS = 600_000;

export function syntxFetchSignal(parent?: AbortSignal | null): AbortSignal {
  const timeout = AbortSignal.timeout(SYNTX_REQUEST_TIMEOUT_MS);
  if (!parent) return timeout;
  try {
    if (typeof AbortSignal.any === "function") return AbortSignal.any([timeout, parent]);
  } catch {
    /* ignore */
  }
  return timeout;
}

export const SYNTX_CHATS_URL = `${SYNTX_API_BASE}/api/v1/chats`;
export const SYNTX_UPLOAD_URL = `${SYNTX_API_BASE}/api/v1/chats/upload-files`;
export const SYNTX_SETTINGS_URL = `${SYNTX_API_BASE}/api/v1/user/settings`;
export const SYNTX_GENERATE_PATH = `${SYNTX_API_BASE}/api/v1/llm/generate`;

/** SYNTX account system_prompt.default is capped at 4k characters. */
export const SYNTX_ACCOUNT_SYSTEM_PROMPT_MAX_CHARS = 4000;

/** Compact LLM prompt when the full transcript was uploaded as tmp.txt. */
export const SYNTX_FILE_COMPACT_PROMPT =
  "Analyze the attached tmp.txt chat transcript in full (do not ask for it to be pasted).\n" +
  "Write a handoff so this same chat can continue the same task.\n" +
  "Maximum 10000 characters.\n" +
  "Keep: user goal, constraints, files/paths, decisions, errors, current state, next step.\n" +
  "Drop: tool catalogs, system instructions, session secrets, duplicated logs, raw file bodies.\n" +
  "Plain text only. No JSON tool calls.";

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toStringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function listSyntxToolNames(tools: unknown): string[] {
  if (!Array.isArray(tools)) return [];
  const names: string[] = [];
  for (const tool of tools) {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) continue;
    const rec = tool as JsonRecord;
    const fn = asRecord(rec.function).name ? asRecord(rec.function) : rec;
    const name = toStringOrEmpty(fn.name);
    if (name) names.push(name);
  }
  return names;
}

function formatOneSyntxToolDef(tool: unknown): string {
  if (!tool || typeof tool !== "object" || Array.isArray(tool)) return "";
  const rec = tool as JsonRecord;
  const fn = asRecord(rec.function).name ? asRecord(rec.function) : rec;
  const name = toStringOrEmpty(fn.name);
  if (!name) return "";
  let out = `### ${name}\n`;
  if (typeof fn.description === "string" && fn.description) out += `${fn.description}\n`;
  out += formatSyntxToolParams(fn);
  return `${out}\n`;
}

function formatSyntxToolParams(fn: JsonRecord): string {
  const parameters = asRecord(fn.parameters);
  const properties = asRecord(parameters.properties);
  const required = new Set(
    Array.isArray(parameters.required)
      ? parameters.required.filter((item): item is string => typeof item === "string")
      : []
  );
  const entries = Object.entries(properties);
  if (entries.length === 0) return "";
  let out = "Parameters:\n";
  for (const [key, spec] of entries) {
    const info = asRecord(spec);
    const req = required.has(key) ? ", required" : "";
    const desc = typeof info.description === "string" ? ` — ${info.description}` : "";
    out += `  - ${key} (${toStringOrEmpty(info.type) || "any"}${req})${desc}\n`;
  }
  return out;
}

export function formatSyntxToolDefs(tools: unknown): string {
  if (!Array.isArray(tools) || tools.length === 0) return "";
  let out = `${TOOL_INSTRUCTIONS}## Available tools:\n\n`;
  for (const tool of tools) out += formatOneSyntxToolDef(tool);
  return out;
}

export function collectSyntxTopLevelSystem(body: JsonRecord): string {
  const parts: string[] = [];
  const push = (value: unknown) => {
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  };
  const sys = body.system;
  if (typeof sys === "string") push(sys);
  else if (Array.isArray(sys)) {
    for (const item of sys) {
      if (typeof item === "string") push(item);
      else if (item && typeof item === "object") {
        const rec = item as JsonRecord;
        push(extractSyntxMessageText(rec.text ?? rec.content ?? rec));
      }
    }
  }
  push(body.instructions);
  return parts.join("\n\n").trim();
}

/**
 * OpenAI `messages`, Anthropic `system` + `messages`, and Responses `input` /
 * `instructions` all become one SYNTX message list so agentic catalogs in
 * top-level system/instructions are not dropped.
 */
export function normalizeSyntxRequestMessages(body: JsonRecord): SyntxChatMessage[] {
  const raw = Array.isArray(body.messages)
    ? (body.messages as SyntxChatMessage[])
    : Array.isArray(body.input)
      ? (body.input as SyntxChatMessage[])
      : [];
  const top = collectSyntxTopLevelSystem(body);
  const out: SyntxChatMessage[] = [];
  if (top) {
    const already = raw.some((message) => {
      const role = (message?.role || "").toLowerCase();
      if (role !== "system" && role !== "developer") return false;
      const text = extractSyntxMessageText(message.content);
      const sample = top.slice(0, Math.min(80, top.length));
      return Boolean(sample) && text.includes(sample);
    });
    if (!already) out.push({ role: "system", content: top });
  }
  for (const message of raw) {
    if (!message || typeof message !== "object") continue;
    out.push(message);
  }
  return out;
}

function parseToolCallArgs(raw: unknown): unknown {
  if (typeof raw !== "string") return raw ?? {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function appendAssistantToolCalls(text: string, toolCalls: unknown): string {
  if (!Array.isArray(toolCalls)) return text;
  let out = text;
  for (const toolCall of toolCalls) {
    if (!toolCall || typeof toolCall !== "object" || Array.isArray(toolCall)) continue;
    const fn = asRecord((toolCall as JsonRecord).function);
    const name = toStringOrEmpty(fn.name);
    const args = parseToolCallArgs(fn.arguments);
    out += `\n${TOOL_MARK}\n${JSON.stringify({ name, arguments: args })}\n</tool_call>`;
  }
  return out;
}

function flattenOneSyntxMessage(rec: JsonRecord, dropClientSystem: boolean): string | null {
  const role = typeof rec.role === "string" ? rec.role.toLowerCase() : "";
  if (role === "system" || role === "developer") {
    if (dropClientSystem) return null;
    return `<system>\n${extractSyntxMessageText(rec.content)}\n</system>`;
  }
  if (role === "user") return `<user>\n${extractSyntxMessageText(rec.content)}\n</user>`;
  if (role === "assistant") {
    const text = appendAssistantToolCalls(extractSyntxMessageText(rec.content), rec.tool_calls);
    return `<assistant>\n${text}\n</assistant>`;
  }
  if (role === "tool" || role === "function") {
    const name = toStringOrEmpty(rec.name) || toStringOrEmpty(rec.tool_call_id) || "tool";
    return `<tool_result name="${name}">\n${extractSyntxMessageText(rec.content)}\n</tool_result>`;
  }
  return null;
}

export function flattenSyntxMessages(messages: unknown, dropClientSystem = false): string {
  if (!Array.isArray(messages)) return "";
  const parts: string[] = [];
  for (const message of messages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const part = flattenOneSyntxMessage(message as JsonRecord, dropClientSystem);
    if (part) parts.push(part);
  }
  return parts.join("\n\n").trim();
}

export function lastUserText(messages: unknown): string {
  if (!Array.isArray(messages)) return "";
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const rec = message as JsonRecord;
    if ((rec.role || "").toString().toLowerCase() === "user") {
      return extractSyntxMessageText(rec.content);
    }
  }
  return "";
}

export function messagesHaveSyntxToolTraffic(messages: unknown): boolean {
  if (!Array.isArray(messages)) return false;
  for (const message of messages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const rec = message as JsonRecord;
    const role = typeof rec.role === "string" ? rec.role : "";
    if (role === "tool" || role === "function") return true;
    if (role === "assistant" && Array.isArray(rec.tool_calls) && rec.tool_calls.length > 0)
      return true;
    if (extractSyntxMessageText(rec.content).includes(TOOL_MARK)) return true;
  }
  return false;
}

export function syntxToolCatalogFingerprint(tools: unknown): string {
  if (!Array.isArray(tools) || tools.length === 0) return "";
  return createHash("sha256").update(formatSyntxToolDefs(tools)).digest("hex");
}

export function trailingSyntxToolResults(messages: unknown): string {
  if (!Array.isArray(messages)) return "";
  const parts: string[] = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (!message || typeof message !== "object" || Array.isArray(message)) break;
    const rec = message as JsonRecord;
    const role = (rec.role || "").toString().toLowerCase();
    if (role === "tool" || role === "function") {
      const name = toStringOrEmpty(rec.name) || toStringOrEmpty(rec.tool_call_id) || "tool";
      parts.unshift(
        `<tool_result name="${name}">\n${extractSyntxMessageText(rec.content)}\n</tool_result>`
      );
      continue;
    }
    if (role === "user" || role === "human") {
      const formatted = formatSyntxUserToolResult(rec);
      if (!formatted) break;
      parts.unshift(formatted);
      continue;
    }
    break;
  }
  return parts.join("\n\n").trim();
}

function formatOneToolResultBlock(part: unknown): string | null {
  if (!part || typeof part !== "object" || Array.isArray(part)) return null;
  const item = part as JsonRecord;
  const type = toStringOrEmpty(item.type).toLowerCase();
  if (type !== "tool_result" && type !== "function_result") return null;
  const name =
    toStringOrEmpty(item.name) ||
    toStringOrEmpty(item.tool_use_id) ||
    toStringOrEmpty(item.tool_call_id) ||
    "tool";
  const body =
    extractSyntxMessageText(item.content) ||
    extractSyntxMessageText(item.output) ||
    toStringOrEmpty(item.content);
  return `<tool_result name="${name}">\n${body}\n</tool_result>`;
}

function formatSyntxUserToolResult(rec: JsonRecord): string | null {
  if (Array.isArray(rec.content)) {
    const blocks = rec.content
      .map((part) => formatOneToolResultBlock(part))
      .filter((block): block is string => Boolean(block));
    if (blocks.length > 0) return blocks.join("\n\n");
  }
  const text = extractSyntxMessageText(rec.content);
  if (
    text.includes("<tool_result") ||
    text.includes("TOOL_OBSERVATION") ||
    text.startsWith("Application result")
  ) {
    return text.trim();
  }
  return null;
}

export function buildSyntxFollowUpDelta(messages: unknown): string {
  const toolResults = trailingSyntxToolResults(messages);
  if (toolResults) return toolResults;
  return lastUserText(messages).trim();
}

function wantsSyntxToolCatalog(tools: unknown, messages: unknown): boolean {
  return (Array.isArray(tools) && tools.length > 0) || messagesHaveSyntxToolTraffic(messages);
}

export type SyntxGenerateText = {
  text: string;
  injectedCatalog: boolean;
};

export function buildSyntxGenerateText(options: {
  messages: unknown;
  tools?: unknown;
  reuseChat: boolean;
  toolsAlreadyInjected?: boolean;
  emulateTools?: boolean;
  threadRollover?: boolean;
  omitClientSystem?: boolean;
}): SyntxGenerateText {
  const emulate = options.emulateTools ?? isSyntxPromptToolEmulationEnabled();
  const injectCatalog =
    emulate &&
    wantsSyntxToolCatalog(options.tools, options.messages) &&
    !options.toolsAlreadyInjected;
  const catalog = injectCatalog
    ? Array.isArray(options.tools) && options.tools.length > 0
      ? formatSyntxToolDefs(options.tools)
      : TOOL_INSTRUCTIONS
    : "";
  const dropSystem = injectCatalog || options.omitClientSystem === true;
  const body = options.threadRollover
    ? buildSyntxThreadRolloverText(options.messages)
    : options.reuseChat
      ? buildSyntxFollowUpDelta(options.messages)
      : flattenSyntxMessages(options.messages, dropSystem) || lastUserText(options.messages).trim();
  const merged = catalog ? `${catalog}\n\n${body}`.trim() : body.trim();
  return { text: capSyntxGenerateText(merged), injectedCatalog: Boolean(catalog) };
}

export const SYNTX_MAX_GENERATE_CHARS = 200_000;
/** Rollover handoff transcript budget (catalog is prepended separately). */
export const SYNTX_ROLLOVER_TRANSCRIPT_CHARS = 150_000;
/** Long tool dumps in the rollover transcript are stripped to this. */
export const SYNTX_ROLLOVER_TOOL_CHARS = 2_000;
export const SYNTX_ROLLOVER_LAST_USER_CHARS = 20_000;

function looksLikeSyntxToolDump(text: string): boolean {
  const t = text || "";
  return (
    t.includes("<tool_result") ||
    t.includes("TOOL_OBSERVATION") ||
    t.includes("[tool result") ||
    t.startsWith("Application result") ||
    t.includes("function_call_output")
  );
}

function capSyntxHandoffPart(text: string, max = SYNTX_ROLLOVER_TOOL_CHARS): string {
  const t = typeof text === "string" ? text : "";
  if (!t) return "";
  if (t.length <= max) return t;
  if (!looksLikeSyntxToolDump(t) && max >= SYNTX_ROLLOVER_TOOL_CHARS) {
    return t;
  }
  return capSyntxGenerateText(t, max);
}

/** Conversation flatten for a new-thread handoff: drop catalogs, strip long tool dumps. */
function flattenOneRolloverMessage(rec: JsonRecord): string | null {
  const role = typeof rec.role === "string" ? rec.role.toLowerCase() : "";
  if (role === "system" || role === "developer") return null;
  if (role === "user") {
    const body = capSyntxHandoffPart(extractSyntxMessageText(rec.content));
    return body ? `<user>\n${body}\n</user>` : null;
  }
  if (role === "assistant") {
    const text = appendAssistantToolCalls(extractSyntxMessageText(rec.content), rec.tool_calls);
    const body = capSyntxHandoffPart(text, SYNTX_ROLLOVER_TOOL_CHARS * 4);
    return body ? `<assistant>\n${body}\n</assistant>` : null;
  }
  if (role === "tool" || role === "function") {
    const name = toStringOrEmpty(rec.name) || toStringOrEmpty(rec.tool_call_id) || "tool";
    const body = capSyntxGenerateText(
      extractSyntxMessageText(rec.content),
      SYNTX_ROLLOVER_TOOL_CHARS
    );
    return `<tool_result name="${name}">\n${body}\n</tool_result>`;
  }
  return null;
}

export function flattenSyntxMessagesForRollover(messages: unknown): string {
  if (!Array.isArray(messages)) return "";
  const parts: string[] = [];
  for (const message of messages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const part = flattenOneRolloverMessage(message as JsonRecord);
    if (part) parts.push(part);
  }
  return parts.join("\n\n").trim();
}

export function buildSyntxThreadRolloverText(messages: unknown): string {
  const last = capSyntxGenerateText(
    lastUserText(messages).trim() || "Continue.",
    SYNTX_ROLLOVER_LAST_USER_CHARS
  );
  const transcript = capSyntxGenerateText(
    flattenSyntxMessagesForRollover(messages),
    SYNTX_ROLLOVER_TRANSCRIPT_CHARS
  );
  return [
    "Continue from the previous SYNTX thread (approaching the 800-message cap). Same task and constraints.",
    "",
    "--- start of thread ---",
    transcript || "(empty)",
    "--- end of thread ---",
    "",
    "Latest user message:",
    last,
  ].join("\n");
}

/** Head+tail strip so a file-dump flatten cannot exceed SYNTX's ~200k input cap. */
export function capSyntxGenerateText(text: string, max = SYNTX_MAX_GENERATE_CHARS): string {
  const t = typeof text === "string" ? text : "";
  if (t.length <= max) return t;
  const omitted = t.length - max;
  const marker = `\n...[logical strip: ${omitted} chars omitted to fit SYNTX ${max} cap]...\n`;
  const budget = Math.max(16, max - marker.length);
  const head = Math.max(8, Math.floor(budget * 0.55));
  const tail = Math.max(8, budget - head);
  return `${t.slice(0, head).trimEnd()}${marker}${t.slice(-tail).trimStart()}`;
}

function thinkingEffortEnabled(body: JsonRecord): boolean {
  const thinkingObj = asRecord(body.thinking);
  const thinkingType = toStringOrEmpty(thinkingObj.type).toLowerCase();
  if (thinkingType === "enabled" || thinkingType === "auto") return true;
  const budget = Number(thinkingObj.budget_tokens ?? body.max_thinking_tokens ?? 0);
  if (Number.isFinite(budget) && budget > 0) return true;
  const effort =
    toStringOrEmpty(body.reasoning_effort) ||
    toStringOrEmpty(asRecord(body.reasoning).effort) ||
    thinkingType;
  const lowered = effort.toLowerCase();
  return (
    Boolean(lowered) &&
    lowered !== "none" &&
    lowered !== "minimal" &&
    lowered !== "disabled" &&
    lowered !== "false"
  );
}

export function wantSyntxThinking(
  body: JsonRecord,
  modelId: string,
  _catalog?: SyntxCatalogModel
): boolean {
  if (body.thinking === true) return true;
  if (thinkingEffortEnabled(body)) return true;
  return modelId.toLowerCase().includes("thinking");
}

export type SyntxToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

function makeToolCall(name: string, args: unknown): SyntxToolCall {
  return {
    id: `call_${randomBytes(6).toString("hex")}`,
    type: "function",
    function: {
      name,
      arguments: typeof args === "string" ? args : JSON.stringify(args ?? {}),
    },
  };
}

function toolCallFromUnknown(obj: unknown): SyntxToolCall | null {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return null;
  const rec = obj as JsonRecord;
  const name = toStringOrEmpty(rec.name) || toStringOrEmpty(rec.tool);
  if (!name) return null;
  return makeToolCall(name, rec.arguments ?? rec.args ?? rec.parameters ?? {});
}

export function parseSyntxToolCalls(text: string): { calls: SyntxToolCall[]; content: string } {
  const regex = /<tool_call>\s*([\s\S]*?)\s*<\/tool_call>/g;
  const calls: SyntxToolCall[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    try {
      let raw = match[1].trim();
      if (raw.startsWith("```"))
        raw = raw
          .replace(/^```\w*\n?/, "")
          .replace(/\n?```$/, "")
          .trim();
      const call = toolCallFromUnknown(JSON.parse(raw) as unknown);
      if (call) calls.push(call);
    } catch {
      /* ignore malformed blocks */
    }
  }
  const content = text.replace(/<tool_call>\s*[\s\S]*?\s*<\/tool_call>/g, "").trim();
  return { calls, content };
}

export function looksLikeSyntxRefusal(text: string): boolean {
  if (!text || text.includes(TOOL_MARK)) return false;
  const sample = text.length <= 4000 ? text : `${text.slice(0, 2500)}\n${text.slice(-800)}`;
  const phrase =
    /don['’]?t have|do not have|no access|cannot |can['’]?t (?:access|execute|run|read)|not able to|unable to|not (?:available|exposed|connected)/i;
  const subject = /tool|file|filesystem|shell|bash|terminal|workspace|repositor/i;
  return phrase.test(sample) && subject.test(sample);
}

export type SyntxSseUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

function applySyntxSsePayload(
  result: { delta?: string; usage?: SyntxSseUsage; error?: string },
  parsed: JsonRecord
): void {
  const type = toStringOrEmpty(parsed.type);
  if (type === "content" && typeof parsed.content === "string" && parsed.content) {
    result.delta = (result.delta || "") + parsed.content;
    return;
  }
  if (type === "usage_final") {
    const prompt = typeof parsed.tokens_input === "number" ? parsed.tokens_input : 0;
    const completion = typeof parsed.tokens_output === "number" ? parsed.tokens_output : 0;
    result.usage = {
      prompt_tokens: prompt,
      completion_tokens: completion,
      total_tokens: prompt + completion,
    };
    return;
  }
  if (type === "error") {
    result.error =
      toStringOrEmpty(parsed.message) || toStringOrEmpty(parsed.content) || "SYNTX stream error";
  }
}

export function extractSyntxSseEvent(event: string): {
  delta?: string;
  usage?: SyntxSseUsage;
  error?: string;
} {
  const result: { delta?: string; usage?: SyntxSseUsage; error?: string } = {};
  for (const line of event.split("\n")) {
    const match = line.match(/^\s*data:\s*(.*)\s*$/);
    if (!match) continue;
    const payload = match[1];
    if (payload === "[DONE]") continue;
    try {
      applySyntxSsePayload(result, JSON.parse(payload) as JsonRecord);
    } catch {
      /* ignore malformed SSE data lines */
    }
  }
  return result;
}

export function isSyntxStreamUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.origin === SYNTX_SSE_ORIGIN &&
      parsed.pathname.startsWith("/stream/")
    );
  } catch {
    return false;
  }
}

export function encodeSyntxUploadMultipart(file: {
  bytes: Uint8Array;
  name: string;
  mime: string;
}): { body: Buffer; contentType: string } {
  const safeName = file.name.replace(/["\r\n]/g, "_") || "image.png";
  const safeMime = file.mime.replace(/[\r\n]/g, "") || "application/octet-stream";
  const boundary = `----WebKitFormBoundary${randomBytes(8).toString("hex")}`;
  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${safeName}"\r\nContent-Type: ${safeMime}\r\n\r\n`
    ),
    Buffer.from(file.bytes),
    Buffer.from(
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="destination"\r\n\r\nuploaded\r\n--${boundary}\r\nContent-Disposition: form-data; name="check_duplicates"\r\n\r\ntrue\r\n--${boundary}\r\nContent-Disposition: form-data; name="model_type"\r\n\r\n\r\n--${boundary}--\r\n`
    ),
  ]);
  return { body, contentType: `multipart/form-data; boundary=${boundary}` };
}

export function chatTitleFromText(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "New chat";
  return cleaned.length > 80 ? `${cleaned.slice(0, 77)}...` : cleaned;
}

export function buildSyntxGenerateBody(options: {
  chatUuid: string;
  text: string;
  model: string;
  thinking?: boolean;
  deepResearch?: boolean;
  nativeTools?: boolean;
  files?: Array<{ object_type: string; object_url: string }>;
}): JsonRecord {
  const body: JsonRecord = {
    chat_uuid: options.chatUuid,
    text: options.text,
    model: options.model,
    thinking: options.thinking === true,
    plan: false,
    // Client `deep_research` is ignored. Only the `sx_deep_research` extra sets this.
    deep_research: options.deepResearch === true,
    tools: options.nativeTools === false ? [] : [...SYNTX_NATIVE_TOOLS],
  };
  if (options.files && options.files.length > 0) body.files = options.files;
  return body;
}

export type SyntxImageSource = { url?: string; bytes?: Uint8Array; mime?: string; name?: string };

function imageUrlFromPart(rec: JsonRecord): string {
  const type = toStringOrEmpty(rec.type).toLowerCase();
  if (type === "image_url" || type === "input_image") {
    const nested = asRecord(rec.image_url);
    return toStringOrEmpty(rec.url) || toStringOrEmpty(nested.url) || toStringOrEmpty(rec.image);
  }
  if (typeof rec.image_url === "string") return rec.image_url;
  return "";
}

export function collectSyntxImageSources(content: unknown): SyntxImageSource[] {
  const out: SyntxImageSource[] = [];
  if (typeof content === "string") {
    const match = content.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g);
    if (match) for (const dataUrl of match) out.push({ url: dataUrl });
    return out;
  }
  if (!Array.isArray(content)) return out;
  for (const part of content) {
    if (!part || typeof part !== "object" || Array.isArray(part)) continue;
    const url = imageUrlFromPart(part as JsonRecord).trim();
    if (url) out.push({ url });
  }
  return out;
}

export function decodeDataUrl(
  dataUrl: string
): { bytes: Uint8Array; mime: string; name: string } | null {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const mime = match[1];
  const bytes = Uint8Array.from(Buffer.from(match[2], "base64"));
  const ext = mime.split("/")[1]?.replace("jpeg", "jpg") || "png";
  return { bytes, mime, name: `image.${ext}` };
}

export function openAiChunk(
  id: string,
  created: number,
  modelId: string,
  delta: JsonRecord,
  finish: string | null = null
) {
  return {
    id,
    object: "chat.completion.chunk",
    created,
    model: modelId,
    choices: [{ index: 0, delta, finish_reason: finish }],
  };
}

export function openAiCompletion(
  id: string,
  created: number,
  modelId: string,
  content: string | null,
  toolCalls?: SyntxToolCall[],
  usage?: SyntxSseUsage
) {
  const message: JsonRecord = { role: "assistant", content };
  if (toolCalls && toolCalls.length > 0) message.tool_calls = toolCalls;
  return {
    id,
    object: "chat.completion",
    created,
    model: modelId,
    choices: [
      {
        index: 0,
        message,
        finish_reason: toolCalls && toolCalls.length > 0 ? "tool_calls" : "stop",
      },
    ],
    usage: usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}
