/**
 * SyntxExecutor — SYNTX.ai chat (Unofficial/Experimental).
 *
 * Not OpenAI-compatible. Flow:
 *   POST /api/v1/chats {title, scope:"text"} → chat uuid
 *   optional POST /api/v1/chats/upload-files (multipart) for images
 *   POST /api/v1/llm/generate?ai_name=… {chat_uuid,text,model,thinking,plan,deep_research,tools,files?}
 *   GET stream_url SSE {type:"content"} then usage_final then [DONE]
 *
 * OpenAI client tools are prompt-emulated once per SYNTX chat_uuid. Live
 * generate keeps native SYNTX tools ["search","code","shell"]. Compact generate
 * omits them (`tools:[]`) so the summarizer does not search/code/shell.
 * Password-miss compact continues the original uuid (`syntx_continue_chat`)
 * instead of opening a new SYNTX thread. Follow-ups send only the new user
 * turn or trailing tool results — never the catalog or prior transcript.
 * Multi-turn reuses chat_uuid via user-spine + prefix-hash. First-turn
 * OpenCode/AI-SDK retries reuse a pending uuid from createChat and still
 * flatten catalog+system until generate is posted. Compact may upload tmp.txt
 * onto the same uuid. After 700 generates (~800-message SYNTX cap), open a new
 * chat with a striped continue-from handoff. New threads may PUT
 * `/api/v1/user/settings` when the request carries `syntx_system_prompt`.
 */
import { createHash, randomBytes } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import {
  makeExecutorErrorResult as makeErrorResult,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import {
  SYNTX_API_BASE,
  SYNTX_SSE_ORIGIN,
  SYNTX_SITE,
  connectionFingerprint,
  looksLikeJwt,
  resolveSyntxToken,
  syntxAuthHeaders,
} from "../services/syntxAuth.ts";
import {
  inferSyntxAiName,
  mapSyntxModel,
  type SyntxCatalogModel,
} from "../services/syntxModels.ts";
import {
  coalesceSyntxChatCreate,
  extractSyntxMessageText,
  forgetSyntxPendingExact,
  hasSyntxGeneratePosted,
  hashSyntxConversation,
  lastUserMessage,
  lookupSyntxChatUuidForMessages,
  markSyntxGeneratePosted,
  rememberSyntxFollowUp,
  rememberSyntxPendingRequest,
  getSyntxChatGenerateCount,
  getSyntxInjectedToolsFingerprint,
  rememberSyntxInjectedTools,
  canonicalizeSyntxUserText,
  firstCanonicalSyntxUserText,
  looksLikeClaudeCodeSessionReset,
  lastUserTextForReset,
  lookupSyntxContinueChatUuid,
  syntxMessagesForNewSession,
  noteSyntxGenerate,
  shouldRolloverSyntxChat,
  type SyntxChatMessage,
} from "../services/syntxSessions.ts";

export {
  mapSyntxModel,
  stripSyntxModelPrefix,
  SYNTX_DEFAULT_MODEL,
} from "../services/syntxModels.ts";
export { looksLikeJwt, resolveSyntxToken } from "../services/syntxAuth.ts";

type JsonRecord = Record<string, unknown>;

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

function syntxFetchSignal(parent?: AbortSignal | null): AbortSignal {
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

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrEmpty(value: unknown): string {
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

export function formatSyntxToolDefs(tools: unknown): string {
  if (!Array.isArray(tools) || tools.length === 0) return "";
  let out = `${TOOL_INSTRUCTIONS}## Available tools:\n\n`;
  for (const tool of tools) {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) continue;
    const rec = tool as JsonRecord;
    const fn = asRecord(rec.function).name ? asRecord(rec.function) : rec;
    const name = toStringOrEmpty(fn.name);
    if (!name) continue;
    out += `### ${name}\n`;
    if (typeof fn.description === "string" && fn.description) out += `${fn.description}\n`;
    const parameters = asRecord(fn.parameters);
    const properties = asRecord(parameters.properties);
    const required = new Set(
      Array.isArray(parameters.required)
        ? parameters.required.filter((item): item is string => typeof item === "string")
        : []
    );
    const entries = Object.entries(properties);
    if (entries.length > 0) {
      out += "Parameters:\n";
      for (const [key, spec] of entries) {
        const info = asRecord(spec);
        const req = required.has(key) ? ", required" : "";
        const desc = typeof info.description === "string" ? ` — ${info.description}` : "";
        out += `  - ${key} (${toStringOrEmpty(info.type) || "any"}${req})${desc}\n`;
      }
    }
    out += "\n";
  }
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

export function flattenSyntxMessages(messages: unknown, dropClientSystem = false): string {
  if (!Array.isArray(messages)) return "";
  const parts: string[] = [];
  for (const message of messages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const rec = message as JsonRecord;
    const role = typeof rec.role === "string" ? rec.role.toLowerCase() : "";
    if (role === "system" || role === "developer") {
      if (dropClientSystem) continue;
      parts.push(`<system>\n${extractSyntxMessageText(rec.content)}\n</system>`);
    } else if (role === "user") {
      parts.push(`<user>\n${extractSyntxMessageText(rec.content)}\n</user>`);
    } else if (role === "assistant") {
      let text = extractSyntxMessageText(rec.content);
      if (Array.isArray(rec.tool_calls)) {
        for (const toolCall of rec.tool_calls) {
          if (!toolCall || typeof toolCall !== "object" || Array.isArray(toolCall)) continue;
          const fn = asRecord((toolCall as JsonRecord).function);
          const name = toStringOrEmpty(fn.name);
          let args: unknown = fn.arguments ?? {};
          if (typeof args === "string") {
            try {
              args = JSON.parse(args);
            } catch {
              args = {};
            }
          }
          text += `\n${TOOL_MARK}\n${JSON.stringify({ name, arguments: args })}\n</tool_call>`;
        }
      }
      parts.push(`<assistant>\n${text}\n</assistant>`);
    } else if (role === "tool" || role === "function") {
      const name = toStringOrEmpty(rec.name) || toStringOrEmpty(rec.tool_call_id) || "tool";
      parts.push(
        `<tool_result name="${name}">\n${extractSyntxMessageText(rec.content)}\n</tool_result>`
      );
    }
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

function formatSyntxUserToolResult(rec: JsonRecord): string | null {
  if (Array.isArray(rec.content)) {
    const blocks: string[] = [];
    for (const part of rec.content) {
      if (!part || typeof part !== "object" || Array.isArray(part)) continue;
      const item = part as JsonRecord;
      const type = toStringOrEmpty(item.type).toLowerCase();
      if (type !== "tool_result" && type !== "function_result") continue;
      const name =
        toStringOrEmpty(item.name) ||
        toStringOrEmpty(item.tool_use_id) ||
        toStringOrEmpty(item.tool_call_id) ||
        "tool";
      const body =
        extractSyntxMessageText(item.content) ||
        extractSyntxMessageText(item.output) ||
        toStringOrEmpty(item.content);
      blocks.push(`<tool_result name="${name}">\n${body}\n</tool_result>`);
    }
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
export function flattenSyntxMessagesForRollover(messages: unknown): string {
  if (!Array.isArray(messages)) return "";
  const parts: string[] = [];
  for (const message of messages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const rec = message as JsonRecord;
    const role = typeof rec.role === "string" ? rec.role.toLowerCase() : "";
    if (role === "system" || role === "developer") continue;
    if (role === "user") {
      const body = capSyntxHandoffPart(extractSyntxMessageText(rec.content));
      if (body) parts.push(`<user>\n${body}\n</user>`);
    } else if (role === "assistant") {
      let text = extractSyntxMessageText(rec.content);
      if (Array.isArray(rec.tool_calls)) {
        for (const toolCall of rec.tool_calls) {
          if (!toolCall || typeof toolCall !== "object" || Array.isArray(toolCall)) continue;
          const fn = asRecord((toolCall as JsonRecord).function);
          const name = toStringOrEmpty(fn.name);
          let args: unknown = fn.arguments ?? {};
          if (typeof args === "string") {
            try {
              args = JSON.parse(args);
            } catch {
              args = {};
            }
          }
          text += `\n${TOOL_MARK}\n${JSON.stringify({ name, arguments: args })}\n</tool_call>`;
        }
      }
      const body = capSyntxHandoffPart(text, SYNTX_ROLLOVER_TOOL_CHARS * 4);
      if (body) parts.push(`<assistant>\n${body}\n</assistant>`);
    } else if (role === "tool" || role === "function") {
      const name = toStringOrEmpty(rec.name) || toStringOrEmpty(rec.tool_call_id) || "tool";
      const body = capSyntxGenerateText(
        extractSyntxMessageText(rec.content),
        SYNTX_ROLLOVER_TOOL_CHARS
      );
      parts.push(`<tool_result name="${name}">\n${body}\n</tool_result>`);
    }
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

export function wantSyntxThinking(
  body: JsonRecord,
  modelId: string,
  _catalog?: SyntxCatalogModel
): boolean {
  if (body.thinking === true) return true;
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
  if (
    lowered &&
    lowered !== "none" &&
    lowered !== "minimal" &&
    lowered !== "disabled" &&
    lowered !== "false"
  ) {
    return true;
  }
  if (modelId.toLowerCase().includes("thinking")) return true;
  // Do not enable thinking just because the catalog row says the model *can* think.
  return false;
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
      const parsed = JSON.parse(payload) as JsonRecord;
      const type = toStringOrEmpty(parsed.type);
      if (type === "content" && typeof parsed.content === "string" && parsed.content) {
        result.delta = (result.delta || "") + parsed.content;
      } else if (type === "usage_final") {
        const prompt = typeof parsed.tokens_input === "number" ? parsed.tokens_input : 0;
        const completion = typeof parsed.tokens_output === "number" ? parsed.tokens_output : 0;
        result.usage = {
          prompt_tokens: prompt,
          completion_tokens: completion,
          total_tokens: prompt + completion,
        };
      } else if (type === "error") {
        result.error =
          toStringOrEmpty(parsed.message) ||
          toStringOrEmpty(parsed.content) ||
          "SYNTX stream error";
      }
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

export function collectSyntxImageSources(content: unknown): SyntxImageSource[] {
  const out: SyntxImageSource[] = [];
  const pushUrl = (url: string) => {
    const trimmed = url.trim();
    if (trimmed) out.push({ url: trimmed });
  };
  if (typeof content === "string") {
    const match = content.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g);
    if (match) {
      for (const dataUrl of match) out.push({ url: dataUrl });
    }
    return out;
  }
  if (!Array.isArray(content)) return out;
  for (const part of content) {
    if (!part || typeof part !== "object" || Array.isArray(part)) continue;
    const rec = part as JsonRecord;
    const type = toStringOrEmpty(rec.type).toLowerCase();
    if (type === "image_url" || type === "input_image") {
      const nested = asRecord(rec.image_url);
      const url =
        toStringOrEmpty(rec.url) || toStringOrEmpty(nested.url) || toStringOrEmpty(rec.image);
      if (url) pushUrl(url);
    } else if (typeof rec.image_url === "string") {
      pushUrl(rec.image_url);
    }
  }
  return out;
}

function decodeDataUrl(dataUrl: string): { bytes: Uint8Array; mime: string; name: string } | null {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const mime = match[1];
  const bytes = Uint8Array.from(Buffer.from(match[2], "base64"));
  const ext = mime.split("/")[1]?.replace("jpeg", "jpg") || "png";
  return { bytes, mime, name: `image.${ext}` };
}

function openAiChunk(
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

function openAiCompletion(
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

export class SyntxExecutor extends BaseExecutor {
  constructor() {
    super("syntx", { id: "syntx", baseUrl: SYNTX_API_BASE, timeoutMs: SYNTX_REQUEST_TIMEOUT_MS });
  }

  getTimeoutMs() {
    return SYNTX_REQUEST_TIMEOUT_MS;
  }

  private async readSse(
    upstream: Response,
    onDelta: (delta: string) => void
  ): Promise<{ ok: boolean; text: string; usage?: SyntxSseUsage; errorMessage?: string }> {
    const reader = upstream.body?.getReader();
    if (!reader) return { ok: true, text: "" };
    const decoder = new TextDecoder();
    let buffer = "";
    let full = "";
    let usage: SyntxSseUsage | undefined;

    const feed = (chunk: string) => {
      buffer += chunk.replace(/\r\n/g, "\n");
      let idx: number;
      while ((idx = buffer.indexOf("\n\n")) >= 0) {
        const event = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        const parsed = extractSyntxSseEvent(event);
        if (parsed.delta) {
          full += parsed.delta;
          onDelta(parsed.delta);
        }
        if (parsed.usage) usage = parsed.usage;
        if (parsed.error) throw new Error(parsed.error);
      }
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        feed(decoder.decode(value, { stream: true }));
      }
      feed(decoder.decode());
      if (buffer.trim()) {
        const parsed = extractSyntxSseEvent(buffer);
        if (parsed.delta) {
          full += parsed.delta;
          onDelta(parsed.delta);
        }
        if (parsed.usage) usage = parsed.usage;
        if (parsed.error) throw new Error(parsed.error);
      }
      return { ok: true, text: full, usage };
    } catch (error) {
      return {
        ok: false,
        text: full,
        usage,
        errorMessage: error instanceof Error ? error.message : "SYNTX stream read failed",
      };
    }
  }

  private async createChat(token: string, title: string, fetchImpl: typeof fetch): Promise<string> {
    const response = await fetchImpl(SYNTX_CHATS_URL, {
      method: "POST",
      headers: {
        ...syntxAuthHeaders(token),
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: chatTitleFromText(title), scope: "text" }),
    });
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(
        `SYNTX create chat HTTP ${response.status}: ${sanitizeErrorMessage(errText)}`
      );
    }
    const json = asRecord(await response.json());
    const uuid = toStringOrEmpty(json.uuid);
    if (!uuid) throw new Error("SYNTX create chat returned no uuid");
    return uuid;
  }

  /** Account-wide SYNTX system prompt. Only called on createChat (new thread). */
  private async syncSyntxAccountSystemPrompt(
    token: string,
    body: JsonRecord,
    fetchImpl: typeof fetch
  ): Promise<void> {
    let prompt = toStringOrEmpty(body.syntx_account_system_prompt);
    const disable = body.syntx_disable_account_system_prompt === true;
    if (!prompt && !disable) return;
    if (prompt.length > SYNTX_ACCOUNT_SYSTEM_PROMPT_MAX_CHARS) {
      const slice = prompt.slice(0, SYNTX_ACCOUNT_SYSTEM_PROMPT_MAX_CHARS);
      const nl = slice.lastIndexOf("\n");
      prompt = (
        nl >= SYNTX_ACCOUNT_SYSTEM_PROMPT_MAX_CHARS / 2 ? slice.slice(0, nl) : slice
      ).trimEnd();
    }
    const payload = disable
      ? { user: { text: { system_prompt_enabled: { default: false } } } }
      : { user: { text: { system_prompt: { default: prompt } } } };
    try {
      const response = await fetchImpl(SYNTX_SETTINGS_URL, {
        method: "PUT",
        headers: {
          ...syntxAuthHeaders(token),
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: syntxFetchSignal(),
      });
      if (!response.ok) {
        await response.text().catch(() => "");
      }
    } catch {
      /* account settings are best-effort — do not block createChat */
    }
  }

  private async uploadBytes(
    token: string,
    file: { bytes: Uint8Array; mime: string; name: string },
    fetchImpl: typeof fetch
  ): Promise<{ url: string; objectType: string } | null> {
    if (!file.bytes || file.bytes.byteLength === 0 || file.bytes.byteLength > 50 * 1024 * 1024)
      return null;
    const encoded = encodeSyntxUploadMultipart({
      bytes: file.bytes,
      name: file.name || "tmp.txt",
      mime: file.mime || "application/octet-stream",
    });
    const headers = syntxAuthHeaders(token);
    const response = await fetchImpl(SYNTX_UPLOAD_URL, {
      method: "POST",
      headers: {
        authorization: headers.authorization,
        accept: headers.accept,
        origin: headers.origin,
        referer: headers.referer,
        "user-agent": headers["user-agent"],
        "accept-language": headers["accept-language"],
        "content-type": encoded.contentType,
      },
      body: encoded.body,
    });
    if (!response.ok) return null;
    const json = asRecord(await response.json());
    const files = Array.isArray(json.files) ? json.files : [];
    const first = asRecord(files[0]);
    const url = toStringOrEmpty(first.url);
    if (!url) return null;
    const objectType =
      toStringOrEmpty(first.object_type) ||
      toStringOrEmpty(first.type) ||
      (file.mime.startsWith("image/") ? "image" : "file");
    return { url, objectType };
  }

  private async uploadImage(
    token: string,
    source: SyntxImageSource,
    fetchImpl: typeof fetch
  ): Promise<string | null> {
    if (source.url && source.url.startsWith("https://r2.syntx.ai/")) return source.url;
    let bytes = source.bytes;
    let mime = source.mime || "image/png";
    let name = source.name || "image.png";
    if (!bytes && source.url?.startsWith("data:")) {
      const decoded = decodeDataUrl(source.url);
      if (!decoded) return null;
      bytes = decoded.bytes;
      mime = decoded.mime;
      name = decoded.name;
    } else if (!bytes && source.url?.startsWith("https://")) {
      const fetched = await fetchImpl(source.url);
      if (!fetched.ok) return null;
      const buf = new Uint8Array(await fetched.arrayBuffer());
      bytes = buf;
      mime = fetched.headers.get("content-type")?.split(";")[0]?.trim() || mime;
    }
    if (!bytes) return null;
    const uploaded = await this.uploadBytes(token, { bytes, mime, name }, fetchImpl);
    return uploaded?.url || null;
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = asRecord(body);
    const fetchImpl = globalThis.fetch.bind(globalThis);
    const requestedModel = input.model || toStringOrEmpty(bodyObj.model) || "auto";
    const modelId = mapSyntxModel(requestedModel);
    const token = resolveSyntxToken({
      apiKey: credentials?.apiKey,
      accessToken: credentials?.accessToken,
      providerSpecificData: credentials?.providerSpecificData,
    });
    const messages = normalizeSyntxRequestMessages(bodyObj);
    const hasTools =
      (Array.isArray(bodyObj.tools) && bodyObj.tools.length > 0) ||
      messagesHaveSyntxToolTraffic(messages);

    if (!looksLikeJwt(token)) {
      return makeErrorResult(
        401,
        "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai (DevTools → Network).",
        body,
        SYNTX_GENERATE_PATH
      );
    }

    const fingerprint = connectionFingerprint(token, credentials?.connectionId);
    const isolated =
      bodyObj.syntx_isolated === true ||
      bodyObj.syntx_force_new_chat === true ||
      bodyObj.syntx_deep_research === true;
    const continueFirst = canonicalizeSyntxUserText(
      toStringOrEmpty(bodyObj.syntx_continue_first_user)
    );
    const wantContinue = bodyObj.syntx_continue_chat === true && Boolean(continueFirst);
    const sessionReset = looksLikeClaudeCodeSessionReset(lastUserTextForReset(messages));
    const sessionMessages = sessionReset ? syntxMessagesForNewSession(messages) : messages;
    let chatUuid =
      isolated || sessionReset
        ? null
        : lookupSyntxChatUuidForMessages(fingerprint, modelId, messages);
    if (!chatUuid && wantContinue && !isolated && !sessionReset) {
      chatUuid = lookupSyntxContinueChatUuid(fingerprint, modelId, continueFirst);
    }
    const threadRollover =
      !isolated &&
      !sessionReset &&
      !wantContinue &&
      Boolean(chatUuid) &&
      shouldRolloverSyntxChat(chatUuid);
    if (threadRollover) chatUuid = null;
    const posted = Boolean(chatUuid) && hasSyntxGeneratePosted(chatUuid);
    const virginChat = Boolean(chatUuid) && !posted && getSyntxChatGenerateCount(chatUuid) === 0;
    // OpenCode retries the first turn before persist. Reuse the uuid but still
    // flatten catalog+system until generate has actually been posted.
    const reuseChat = Boolean(chatUuid) && !virginChat && !threadRollover;
    const toolsFingerprint = syntxToolCatalogFingerprint(bodyObj.tools);
    const priorToolsFp = chatUuid ? getSyntxInjectedToolsFingerprint(chatUuid) : null;
    const catalogChanged = Boolean(
      toolsFingerprint && priorToolsFp && priorToolsFp !== toolsFingerprint
    );
    const omitClientSystem = Boolean(toStringOrEmpty(bodyObj.syntx_account_system_prompt));
    const generated = buildSyntxGenerateText({
      messages: sessionMessages,
      tools: isolated || sessionReset ? undefined : bodyObj.tools,
      reuseChat,
      toolsAlreadyInjected: Boolean(reuseChat && priorToolsFp && !catalogChanged),
      threadRollover,
      omitClientSystem: omitClientSystem && !reuseChat,
    });
    let text = generated.text;
    const passwordBlock = toStringOrEmpty(bodyObj.syntx_session_password_block);
    if (passwordBlock && !reuseChat) {
      text = capSyntxGenerateText(`${passwordBlock}\n\n${text}`.trim());
    }

    const aiName = inferSyntxAiName(modelId);
    const thinking = wantSyntxThinking(bodyObj, modelId);
    const deepResearch = bodyObj.syntx_deep_research === true;

    try {
      if (!chatUuid) {
        const title =
          firstCanonicalSyntxUserText(sessionMessages) ||
          lastUserText(sessionMessages) ||
          (threadRollover ? "Continued SYNTX thread" : text);
        const create = () => this.createChat(token, title, fetchImpl);
        if (!isolated && !sessionReset) {
          await this.syncSyntxAccountSystemPrompt(token, bodyObj, fetchImpl);
          chatUuid = await coalesceSyntxChatCreate(
            hashSyntxConversation(fingerprint, modelId, sessionMessages),
            create
          );
        } else {
          chatUuid = await create();
        }
      }
      if (chatUuid && !isolated && !sessionReset) {
        rememberSyntxPendingRequest(fingerprint, modelId, sessionMessages, chatUuid);
      }
    } catch (error) {
      return makeErrorResult(
        502,
        `SYNTX create chat failed: ${error instanceof Error ? error.message : "unknown"}`,
        body,
        SYNTX_CHATS_URL
      );
    }

    const lastUser = lastUserMessage(sessionMessages) || lastUserMessage(messages);
    const imageSources = collectSyntxImageSources(lastUser?.content);
    const files: Array<{ object_type: string; object_url: string }> = [];
    for (const source of imageSources) {
      try {
        const url = await this.uploadImage(token, source, fetchImpl);
        if (url) files.push({ object_type: "image", object_url: url });
      } catch {
        /* skip failed uploads */
      }
    }

    const historyFile = toStringOrEmpty(bodyObj.syntx_history_file);
    if (historyFile) {
      try {
        const uploaded = await this.uploadBytes(
          token,
          {
            bytes: new TextEncoder().encode(historyFile),
            mime: "text/plain; charset=utf-8",
            name: toStringOrEmpty(bodyObj.syntx_history_filename) || "tmp.txt",
          },
          fetchImpl
        );
        if (!uploaded) {
          return makeErrorResult(422, "SYNTX history file upload failed", body, SYNTX_UPLOAD_URL);
        }
        files.push({ object_type: uploaded.objectType || "file", object_url: uploaded.url });
        if (isolated || wantContinue) {
          const prompt = toStringOrEmpty(bodyObj.syntx_history_prompt) || SYNTX_FILE_COMPACT_PROMPT;
          text = prompt;
        }
      } catch {
        return makeErrorResult(422, "SYNTX history file upload failed", body, SYNTX_UPLOAD_URL);
      }
    }

    if (!text) {
      return makeErrorResult(
        400,
        "SYNTX requires a non-empty user message",
        body,
        SYNTX_GENERATE_PATH
      );
    }

    const emptyClientTools = Array.isArray(bodyObj.tools) && bodyObj.tools.length === 0;
    const nativeTools = !emptyClientTools && !(isolated && !deepResearch);
    const generateBody = buildSyntxGenerateBody({
      chatUuid,
      text,
      model: modelId,
      thinking,
      deepResearch,
      nativeTools,
      files,
    });
    const generateUrl = `${SYNTX_GENERATE_PATH}?ai_name=${encodeURIComponent(aiName)}`;
    const fetchSignal = syntxFetchSignal(signal);

    let generateResponse: Response;
    try {
      generateResponse = await fetchImpl(generateUrl, {
        method: "POST",
        headers: {
          ...syntxAuthHeaders(token),
          "content-type": "application/json",
        },
        body: JSON.stringify(generateBody),
        signal: fetchSignal,
      });
    } catch (error) {
      return {
        ...makeErrorResult(
          502,
          `SYNTX generate failed: ${error instanceof Error ? error.message : "unknown"}`,
          body,
          generateUrl
        ),
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    if (!generateResponse.ok) {
      const errText = await generateResponse.text().catch(() => "");
      return {
        ...makeErrorResult(
          generateResponse.status,
          `SYNTX error: ${sanitizeErrorMessage(errText)}`,
          body,
          generateUrl
        ),
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    const job = asRecord(await generateResponse.json());
    const streamUrl = toStringOrEmpty(job.stream_url);
    if (!isSyntxStreamUrl(streamUrl)) {
      return {
        ...makeErrorResult(502, "SYNTX generate returned an invalid stream URL", body, generateUrl),
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    markSyntxGeneratePosted(chatUuid);

    const id = `chatcmpl-syntx-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);
    const clientModel = toStringOrEmpty(bodyObj.model) || requestedModel;
    const sseHeaders = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    };

    const persistSession = (assistantText: string) => {
      if (isolated) return;
      forgetSyntxPendingExact(fingerprint, modelId, sessionMessages);
      noteSyntxGenerate(chatUuid!);
      const rememberMsgs =
        wantContinue && continueFirst
          ? [{ role: "user", content: continueFirst }]
          : sessionMessages;
      rememberSyntxFollowUp(fingerprint, modelId, rememberMsgs, assistantText, chatUuid!);
      if (generated.injectedCatalog) {
        rememberSyntxInjectedTools(chatUuid!, toolsFingerprint || "injected");
      }
    };

    const openStream = async () =>
      fetchImpl(streamUrl, {
        method: "GET",
        headers: {
          accept: "text/event-stream",
          "cache-control": "no-cache",
          referer: SYNTX_SITE,
        },
        signal: syntxFetchSignal(signal),
      });

    if (wantStream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start: async (controller) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify(openAiChunk(id, created, clientModel, { role: "assistant" }))}\n\n`
            )
          );
          try {
            const upstream = await openStream();
            if (!upstream.ok) {
              controller.error(new Error(`SYNTX stream HTTP ${upstream.status}`));
              return;
            }
            if (!hasTools) {
              const read = await this.readSse(upstream, (delta) => {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify(openAiChunk(id, created, clientModel, { content: delta }))}\n\n`
                  )
                );
              });
              persistSession(read.text);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify(openAiChunk(id, created, clientModel, {}, "stop"))}\n\n`
                )
              );
            } else {
              const read = await this.readSse(upstream, () => undefined);
              persistSession(read.text);
              const parsed = parseSyntxToolCalls(read.text);
              if (parsed.calls.length > 0) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify(
                      openAiChunk(id, created, clientModel, {
                        tool_calls: parsed.calls.map((call, index) => ({ ...call, index })),
                      })
                    )}\n\n`
                  )
                );
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify(openAiChunk(id, created, clientModel, {}, "tool_calls"))}\n\n`
                  )
                );
              } else {
                if (read.text) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify(openAiChunk(id, created, clientModel, { content: read.text }))}\n\n`
                    )
                  );
                }
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify(openAiChunk(id, created, clientModel, {}, "stop"))}\n\n`
                  )
                );
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (error) {
            if (!signal?.aborted)
              controller.error(error instanceof Error ? error : new Error("SYNTX stream error"));
            else {
              try {
                controller.close();
              } catch {
                /* already closed */
              }
            }
          }
        },
      });
      return {
        response: new Response(stream, { headers: sseHeaders }),
        url: generateUrl,
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    let upstream: Response;
    try {
      upstream = await openStream();
    } catch (error) {
      return {
        ...makeErrorResult(
          502,
          `SYNTX stream failed: ${error instanceof Error ? error.message : "unknown"}`,
          body,
          streamUrl
        ),
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }
    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return {
        ...makeErrorResult(
          upstream.status,
          `SYNTX stream error: ${sanitizeErrorMessage(errText)}`,
          body,
          streamUrl
        ),
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    const read = await this.readSse(upstream, () => undefined);
    if (!read.ok) {
      return {
        ...makeErrorResult(
          502,
          `SYNTX protocol error: ${sanitizeErrorMessage(read.errorMessage || "unknown")}`,
          body,
          streamUrl
        ),
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    persistSession(read.text);
    const parsed = hasTools
      ? parseSyntxToolCalls(read.text)
      : { calls: [] as SyntxToolCall[], content: read.text };

    if (wantStream) {
      const chunks: string[] = [
        `data: ${JSON.stringify(openAiChunk(id, created, clientModel, { role: "assistant" }))}\n\n`,
      ];
      if (parsed.calls.length > 0) {
        chunks.push(
          `data: ${JSON.stringify(
            openAiChunk(id, created, clientModel, {
              tool_calls: parsed.calls.map((call, index) => ({ ...call, index })),
            })
          )}\n\n`
        );
        chunks.push(
          `data: ${JSON.stringify(openAiChunk(id, created, clientModel, {}, "tool_calls"))}\n\n`
        );
      } else {
        if (read.text) {
          chunks.push(
            `data: ${JSON.stringify(openAiChunk(id, created, clientModel, { content: read.text }))}\n\n`
          );
        }
        chunks.push(
          `data: ${JSON.stringify(openAiChunk(id, created, clientModel, {}, "stop"))}\n\n`
        );
      }
      chunks.push("data: [DONE]\n\n");
      return {
        response: new Response(chunks.join(""), { headers: sseHeaders }),
        url: generateUrl,
        headers: { authorization: "Bearer <redacted>" },
        transformedBody: generateBody,
      };
    }

    return {
      response: new Response(
        JSON.stringify(
          openAiCompletion(
            id,
            created,
            clientModel,
            parsed.calls.length > 0 ? parsed.content || null : read.text,
            parsed.calls.length > 0 ? parsed.calls : undefined,
            read.usage
          )
        ),
        { headers: { "Content-Type": "application/json" } }
      ),
      url: generateUrl,
      headers: { authorization: "Bearer <redacted>" },
      transformedBody: generateBody,
    };
  }
}
