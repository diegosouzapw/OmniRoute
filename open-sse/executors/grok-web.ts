/**
 * GrokWebExecutor — Grok Web Session Provider
 *
 * Routes requests through Grok's internal NDJSON API using an X/Grok
 * subscription SSO cookie, translating between OpenAI chat completions
 * format and Grok's internal protocol.
 *
 * Derived from:
 *   - grok2api-merged (model mappings, payload structure, statsig, processor)
 *   - GrokProxy / GrokBridge (cookie auth, streaming token extraction)
 *   - grok-web-api (response types, chat options)
 *   - Grok API Research Report (headers, Cloudflare bypass techniques)
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { extractCookieValue } from "@/lib/providers/webCookieAuth";

// ─── Constants ──────────────────────────────────────────────────────────────

const GROK_CHAT_API = "https://grok.com/rest/app-chat/conversations/new";
const GROK_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

// ─── Model mappings ─────────────────────────────────────────────────────────
// Grok Web exposes UI modes, not stable public model IDs. Keep OmniRoute model
// IDs mapped directly to Grok's modeId field.

interface GrokModelInfo {
  modeId: string;
  isThinking: boolean;
}

const MODEL_MAP: Record<string, GrokModelInfo> = {
  fast: { modeId: "fast", isThinking: false },
  expert: { modeId: "expert", isThinking: true },
  heavy: { modeId: "heavy", isThinking: true },
  "grok-420-computer-use-sa": { modeId: "grok-420-computer-use-sa", isThinking: true },

  // Legacy aliases retained for manually-entered model IDs.
  "grok-4": { modeId: "fast", isThinking: false },
  "grok-4.1-fast": { modeId: "fast", isThinking: false },
  "grok-4.1-expert": { modeId: "expert", isThinking: true },
  "grok-4-heavy": { modeId: "heavy", isThinking: true },
  "grok-4.20": { modeId: "expert", isThinking: true },
  "grok-4.20-heavy": { modeId: "heavy", isThinking: true },
  "grok-4.3": { modeId: "grok-420-computer-use-sa", isThinking: true },
  "grok-4-3-thinking-1129": { modeId: "grok-420-computer-use-sa", isThinking: true },
};

// ─── Statsig ID generation ──────────────────────────────────────────────────

function randomString(length: number, alphanumeric = false): string {
  const chars = alphanumeric
    ? "abcdefghijklmnopqrstuvwxyz0123456789"
    : "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateStatsigId(): string {
  const msg =
    Math.random() < 0.5
      ? `e:TypeError: Cannot read properties of null (reading 'children["${randomString(5, true)}"]')`
      : `e:TypeError: Cannot read properties of undefined (reading '${randomString(10)}')`;
  return btoa(msg);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── OpenAI message → Grok query translation ───────────────────────────────

interface OpenAIToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

interface GrokToolRegistry {
  enabled: boolean;
  toolsByName: Map<string, GrokFunctionToolSummary>;
  lastUserText: string;
  executedToolKeys: Set<string>;
  completedToolCalls: string[];
}

interface GrokFunctionToolSummary {
  name: string;
  description?: string;
  parameters: unknown;
}

type NativeToolIntent = "bash" | "readFile" | "webSearch" | "browsePage";

interface ToolBridgeContext {
  lastUserText: string;
}

function stripInjectedRuntimeReminders(text: string): string {
  return text
    .replace(/\n?---\s*\n\s*<internal_reminder>[\s\S]*?<\/internal_reminder>/gi, "")
    .replace(/<internal_reminder>[\s\S]*?<\/internal_reminder>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTextContent(msg: Record<string, unknown>): string {
  if (typeof msg.content === "string") return stripInjectedRuntimeReminders(msg.content);
  if (Array.isArray(msg.content)) {
    return stripInjectedRuntimeReminders((msg.content as Array<Record<string, unknown>>)
      .filter((c) => c.type === "text")
      .map((c) => String(c.text || ""))
      .join(" "));
  }
  return "";
}

function getLastUserText(messages: Array<Record<string, unknown>>): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].role || "") === "user") return extractTextContent(messages[i]);
  }
  return "";
}

function normalizeToolArgumentObject(value: unknown): Record<string, unknown> {
  if (!value) return {};
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : { input: value };
    } catch {
      return { input: value };
    }
  }
  return {};
}

function stableJson(value: unknown): string {
  if (!value || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
    .join(",")}}`;
}

function toolCallKey(name: string, args: unknown): string {
  return `${name}:${stableJson(normalizeToolArgumentObject(args))}`;
}

function normalizeShellCommand(command: string): string {
  return command.trim().replace(/\s+/g, " ");
}

function normalizePathValue(path: string): string {
  return path.trim().replace(/^['"]|['"]$/g, "");
}

function normalizeQueryValue(query: string): string {
  return query.trim().replace(/\s+/g, " ").toLowerCase();
}

function semanticToolKey(name: string, args: unknown): string {
  const normalizedName = name.trim();
  const record = normalizeToolArgumentObject(args);
  const command = firstString(record.command, record.cmd, record.shell);
  if (command) return `${normalizedName}:command:${normalizeShellCommand(command)}`;

  const url = firstString(record.url, record.uri);
  if (url) return `${normalizedName}:url:${normalizePathValue(url)}`;

  const path = firstString(record.filePath, record.file_path, record.path, record.filename);
  if (path) return `${normalizedName}:path:${normalizePathValue(path)}`;

  const query = firstString(record.query, record.search);
  if (query) return `${normalizedName}:query:${normalizeQueryValue(query)}`;

  return toolCallKey(normalizedName, record);
}

function summarizeCompletedToolCall(name: string, args: unknown): string {
  const record = normalizeToolArgumentObject(args);
  const command = firstString(record.command, record.cmd, record.shell);
  if (command) return `${name}(command=${JSON.stringify(normalizeShellCommand(command))})`;
  const url = firstString(record.url, record.uri);
  if (url) return `${name}(url=${JSON.stringify(normalizePathValue(url))})`;
  const path = firstString(record.filePath, record.file_path, record.path, record.filename);
  if (path) return `${name}(path=${JSON.stringify(normalizePathValue(path))})`;
  const query = firstString(record.query, record.search);
  if (query) return `${name}(query=${JSON.stringify(normalizeQueryValue(query))})`;
  return `${name}(${stableJson(record)})`;
}

function getExecutedToolState(messages: Array<Record<string, unknown>>): {
  keys: Set<string>;
  summaries: string[];
} {
  let lastUserIdx = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].role || "") === "user") {
      lastUserIdx = i;
      break;
    }
  }
  const callsById = new Map<string, { name: string; args: Record<string, unknown> }>();
  const executed = new Set<string>();
  const summaries: string[] = [];
  for (let i = Math.max(0, lastUserIdx + 1); i < messages.length; i++) {
    const msg = messages[i];
    if (String(msg.role || "") === "assistant" && Array.isArray(msg.tool_calls)) {
      for (const call of msg.tool_calls as Array<Record<string, unknown>>) {
        const id = typeof call.id === "string" ? call.id : "";
        const fn = call.function;
        if (!id || !fn || typeof fn !== "object") continue;
        const fnRecord = fn as Record<string, unknown>;
        const name = typeof fnRecord.name === "string" ? fnRecord.name : "";
        if (!name) continue;
        callsById.set(id, { name, args: normalizeToolArgumentObject(fnRecord.arguments) });
      }
    }
    if (String(msg.role || "") === "tool") {
      const id = typeof msg.tool_call_id === "string" ? msg.tool_call_id : "";
      const call = id ? callsById.get(id) : null;
      if (call) {
        const key = semanticToolKey(call.name, call.args);
        executed.add(key);
        const summary = summarizeCompletedToolCall(call.name, call.args);
        if (!summaries.includes(summary)) summaries.push(summary);
      }
    }
  }
  return { keys: executed, summaries };
}

function extractFirstUrl(text: string): string | undefined {
  const match = text.match(/https?:\/\/[^\s)\]}>"']+/i);
  if (match?.[0]) return match[0].replace(/[.,;:!?]+$/, "");
  const domain = text.match(/(?:^|\s)((?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)\]}>"']*)?)/i)?.[1];
  return domain ? `https://${domain.replace(/[.,;:!?]+$/, "")}` : undefined;
}

function wantsUrlFetch(text: string): boolean {
  return /\b(webfetch|web_fetch|fetch|browse|open|read|lee|abre|extrae|investiga|analiza|resume|summarize|de qu[eé] va)\b/i.test(text) && !!extractFirstUrl(text);
}

function forcedToolChoiceName(toolChoice: unknown): string | null {
  if (!toolChoice || typeof toolChoice !== "object") return null;
  const record = toolChoice as Record<string, unknown>;
  if (record.type !== "function" || !record.function || typeof record.function !== "object") return null;
  const name = (record.function as Record<string, unknown>).name;
  return typeof name === "string" && name.trim() ? name.trim() : null;
}

function parseOpenAIMessages(messages: Array<Record<string, unknown>>, beforeLatestUser = ""): string {
  const parts: string[] = [];
  let lastUserIdx = -1;
  let lastUserSourceIdx = -1;

  for (let i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].role || "") === "user") {
      lastUserSourceIdx = i;
      break;
    }
  }

  // Extract text from each message
  const extracted: Array<{ role: string; text: string }> = [];

  for (let msgIdx = 0; msgIdx < messages.length; msgIdx++) {
    const msg = messages[msgIdx];
    let role = String(msg.role || "user");
    if (role === "developer") role = "system";

    let content = extractTextContent(msg);
    if (role === "tool") {
      if (msgIdx < lastUserSourceIdx) continue;
      const toolName = typeof msg.name === "string" ? msg.name : "unknown_tool";
      const toolCallId = typeof msg.tool_call_id === "string" ? msg.tool_call_id : "unknown_call";
      content = `CLIENT TOOL RESULT from caller runtime for ${toolName} (${toolCallId}). Use this result to answer; do not call the same tool again:\n${content}`;
    } else if (role === "assistant" && Array.isArray(msg.tool_calls)) {
      if (msgIdx < lastUserSourceIdx) continue;
      const calls = (msg.tool_calls as Array<Record<string, unknown>>).map((call) => ({
        id: call.id,
        function: call.function,
      }));
      content = [content, `Previous assistant tool calls: ${JSON.stringify(calls)}`]
        .filter(Boolean)
        .join("\n");
    }
    if (!content.trim()) continue;
    extracted.push({ role, text: content });
  }

  // Find last user message index
  for (let i = extracted.length - 1; i >= 0; i--) {
    if (extracted[i].role === "user") {
      lastUserIdx = i;
      break;
    }
  }

  // Build combined message — last user message is raw, others are prefixed
  for (let i = 0; i < extracted.length; i++) {
    const { role, text } = extracted[i];
    if (i === lastUserIdx) {
      parts.push(text);
    } else {
      parts.push(`${role}: ${text}`);
    }
  }

  if (beforeLatestUser.trim()) {
    parts.push(beforeLatestUser.trim());
  }

  return parts.join("\n\n");
}

function buildGrokToolRegistry(body: Record<string, unknown>): GrokToolRegistry {
  const tools = Array.isArray(body.tools) ? (body.tools as Array<Record<string, unknown>>) : [];
  const messages = Array.isArray(body.messages) ? (body.messages as Array<Record<string, unknown>>) : [];
  const lastUserText = getLastUserText(messages);
  const executedToolState = getExecutedToolState(messages);
  const toolChoice = body.tool_choice ?? "auto";

  if (toolChoice === "none") {
    return {
      enabled: false,
      toolsByName: new Map(),
      lastUserText,
      executedToolKeys: executedToolState.keys,
      completedToolCalls: executedToolState.summaries,
    };
  }

  const functionTools: GrokFunctionToolSummary[] = tools
    .map((tool) => {
      const fn = tool?.function;
      if (tool?.type !== "function" || !fn || typeof fn !== "object") return null;
      const record = fn as Record<string, unknown>;
      const name = typeof record.name === "string" ? record.name.trim() : "";
      if (!name) return null;
      return {
        name,
        ...(typeof record.description === "string" ? { description: record.description } : {}),
        parameters: record.parameters || { type: "object", properties: {} },
      };
    })
    .filter((tool): tool is GrokFunctionToolSummary => Boolean(tool));
  const forcedName = forcedToolChoiceName(toolChoice);
  const visibleTools = forcedName ? functionTools.filter((tool) => tool.name === forcedName) : functionTools;

  return {
    enabled: visibleTools.length > 0,
    toolsByName: new Map(visibleTools.map((tool) => [tool.name, tool])),
    lastUserText,
    executedToolKeys: executedToolState.keys,
    completedToolCalls: executedToolState.summaries,
  };
}

function getSchemaProperties(parameters: unknown): Record<string, unknown> {
  if (!parameters || typeof parameters !== "object") return {};
  const properties = (parameters as Record<string, unknown>).properties;
  return properties && typeof properties === "object" ? (properties as Record<string, unknown>) : {};
}

function getSchemaRequired(parameters: unknown): string[] {
  if (!parameters || typeof parameters !== "object") return [];
  const required = (parameters as Record<string, unknown>).required;
  return Array.isArray(required) ? required.filter((key): key is string => typeof key === "string") : [];
}

function formatToolArgsSummary(parameters: unknown): string {
  const properties = getSchemaProperties(parameters);
  const propNames = Object.keys(properties);
  const required = getSchemaRequired(parameters);
  const segments: string[] = [];
  if (propNames.length > 0) segments.push(`args=${propNames.join(",")}`);
  if (required.length > 0) segments.push(`required=${required.join(",")}`);
  return segments.length > 0 ? ` (${segments.join("; ")})` : "";
}

function toolText(tool: GrokFunctionToolSummary): string {
  return `${tool.name} ${tool.description || ""}`.toLowerCase();
}

function hasAnyProperty(tool: GrokFunctionToolSummary, names: string[]): boolean {
  const properties = getSchemaProperties(tool.parameters);
  const lowerProps = new Set(Object.keys(properties).map((key) => key.toLowerCase()));
  return names.some((name) => lowerProps.has(name.toLowerCase()));
}

function isTerminalTool(tool: GrokFunctionToolSummary): boolean {
  if (isMetaOrInfrastructureTool(tool)) return false;
  const text = toolText(tool);
  const name = tool.name.toLowerCase();
  const explicitName = /\b(bash|shell|terminal|run_command|execute_command|exec|command)\b/.test(name);
  const explicitText = /\b(?:run|execute).{0,24}\b(?:shell|bash|terminal|command)\b|\b(?:shell|bash|terminal)\b/.test(text);
  return explicitName || (hasAnyProperty(tool, ["command", "cmd", "shell"]) && explicitText);
}

function isFileReadTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return (
    hasAnyProperty(tool, ["filePath", "file_path", "path"]) &&
    /\b(read|file|filesystem|open)\b/.test(text) &&
    !/\b(write|edit|patch|delete|remove|grep|search|bash|shell|command)\b/.test(text)
  );
}

function isUrlFetchTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  const name = tool.name.toLowerCase();
  const explicitName = /\b(webfetch|web.fetch|fetch_url|url_fetch|read_url|browse_page|browsepage)\b/.test(name);
  const explicitUrlText = /\b(?:fetch|browse|read).{0,32}\b(?:url|uri|web page|page content)\b|\b(?:url|uri|web page|page content).{0,32}\b(?:fetch|browse|read)\b/.test(text);
  return explicitName || (!isMetaOrInfrastructureTool(tool) && hasAnyProperty(tool, ["url", "uri"]) && explicitUrlText);
}

function isWebSearchTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return (
    hasAnyProperty(tool, ["query", "search"]) &&
    /\b(web|internet|exa|browser|browse|serp)\b/.test(text) &&
    !isMetaOrInfrastructureTool(tool) &&
    !isContextMemoryTool(tool)
  );
}

function isContextMemoryTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return /\b(ctx_|memory|memories|conversation history|session notes|git commits|project memories|context.db|magic context)\b/.test(text);
}

function isMetaOrInfrastructureTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return /\b(mcp|mcpproxy|upstream|registry|registries|quarantine|oauth|cache key|token usage|session notes|conversation transcript|handoff|context management|memory|memories|lsp|language server|plan file|server management|tool discovery|tools? using bm25)\b/.test(text);
}

function baseToolOrderScore(tool: GrokFunctionToolSummary): number {
  if (isUrlFetchTool(tool)) return 90;
  if (isWebSearchTool(tool)) return 85;
  if (isFileReadTool(tool)) return 75;
  if (isTerminalTool(tool)) return 70;
  if (/\b(glob|grep|search files?|file search|content search)\b/.test(toolText(tool))) return 60;
  if (/\b(edit|write|patch|modify|apply)\b/.test(toolText(tool))) return 50;
  if (/\b(task|agent|delegate|subagent)\b/.test(toolText(tool))) return 40;
  if (isMetaOrInfrastructureTool(tool)) return 10;
  if (isContextMemoryTool(tool)) return 20;
  return 30;
}

function latestUserIntentScore(tool: GrokFunctionToolSummary, lastUserText: string): number {
  const user = lastUserText.toLowerCase();
  const hasPath = /(?:^|\s|["'`])(?:~|\.?\.?\/|\/)[^\s"'`]+/.test(lastUserText);
  const hasUrl = !!extractFirstUrl(lastUserText);
  const asksLineCount = /\b(l[ií]neas?|line count|cu[aá]ntas? l[ií]neas?|wc\s+-l)\b/.test(user);
  const asksFileContent = /\b(lee|leer|read|archivo|file|json|config|modelo|default|por defecto|de qu[eé] va|consiste|contenido)\b/.test(user) && hasPath;
  const asksContext = /\b(contexto|memoria|historial|conversation history|project memories|ctx_|memory|memories|recordabas?)\b/.test(user);
  const asksWeb = !asksContext && /\b(web|internet|fuente|oficial|release|versi[oó]n|ubuntu|latest|actual|contrasta|busca|search)\b/.test(user);
  let score = 0;

  if (asksFileContent && isFileReadTool(tool)) score += 160;
  if (asksFileContent && isTerminalTool(tool)) score += asksLineCount ? 70 : 20;
  if (asksLineCount && isTerminalTool(tool)) score += 120;
  if (asksLineCount && isFileReadTool(tool)) score += asksFileContent ? 90 : 30;
  if (asksWeb && !hasUrl && isWebSearchTool(tool)) score += 170;
  if (asksWeb && !hasUrl && isUrlFetchTool(tool)) score += 35;
  if (asksWeb && isContextMemoryTool(tool)) score -= 120;
  if (asksContext && isContextMemoryTool(tool)) score += 170;
  if (asksContext && isWebSearchTool(tool)) score -= 80;

  if (isContextMemoryTool(tool) && (asksFileContent || asksWeb)) score -= 80;
  return score;
}

function orderedToolsForManifest(toolRegistry: GrokToolRegistry): Array<{ tool: GrokFunctionToolSummary; score: number }> {
  return [...toolRegistry.toolsByName.values()]
    .map((tool, index) => ({
      tool,
      score: latestUserIntentScore(tool, toolRegistry.lastUserText) + baseToolOrderScore(tool),
      meta: isMetaOrInfrastructureTool(tool),
      index,
    }))
    .sort((a, b) => b.score - a.score || Number(a.meta) - Number(b.meta) || a.index - b.index)
    .map(({ tool, score }) => ({ tool, score }));
}

function formatToolManifestEntry(tool: GrokFunctionToolSummary, rank: number): string {
  const desc = tool.description ? `\n  description: ${tool.description}` : "";
  const args = formatToolArgsSummary(tool.parameters).trim();
  return `${rank}. name: ${tool.name}${args ? `\n   ${args.slice(1, -1)}` : ""}${desc ? desc.replace(/\n  /g, "\n   ") : ""}`;
}

function buildClientToolManifest(toolRegistry: GrokToolRegistry, toolChoice: unknown): string {
  if (!toolRegistry.enabled) return "";
  const orderedTools = orderedToolsForManifest(toolRegistry);
  const lines = [
    "CLIENT_TOOLS: use this caller-runtime tool list as the tool interface for this request. To call one, respond only with <tool_call>{\"name\":\"exact_tool_name\",\"arguments\":{...}}</tool_call>. After tool results, answer normally.",
    `tool_choice=${JSON.stringify(toolChoice ?? "auto")}`,
    ...(toolRegistry.completedToolCalls.length > 0
      ? [
          "completed_tool_calls:",
          ...toolRegistry.completedToolCalls.map((summary) => `- ${summary}`),
          "Do not repeat completed tool calls unless a different result is required; use their tool results to answer.",
        ]
      : []),
    "tools (priority order for this request):",
    ...orderedTools.map(({ tool }, index) => formatToolManifestEntry(tool, index + 1)),
  ];
  return lines.join("\n");
}

function buildGrokMessage(messages: Array<Record<string, unknown>>, toolRegistry: GrokToolRegistry, toolChoice: unknown): string {
  const manifest = buildClientToolManifest(toolRegistry, toolChoice);
  return parseOpenAIMessages(messages, manifest);
}

function propertyType(properties: Record<string, unknown>, key: string): string | undefined {
  const prop = properties[key];
  if (!prop || typeof prop !== "object") return undefined;
  const type = (prop as Record<string, unknown>).type;
  return typeof type === "string" ? type : undefined;
}

function hasValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
}

function defaultRequiredValue(key: string, type: string | undefined, args: Record<string, unknown>, intent: string): unknown {
  const lower = key.toLowerCase();
  const command = firstString(args.command, args.cmd, args.shell, args.input);
  const path = firstString(args.filePath, args.file_path, args.path, args.filename);
  const query = firstString(args.query, args.search, args.input);
  const url = firstString(args.url, args.uri);

  if (lower === "command" || lower === "cmd") return command;
  if (lower === "filepath" || lower === "file_path" || lower === "path") return path;
  if (lower === "query" || lower === "search") return query;
  if (lower === "url" || lower === "uri") return url;
  if (lower === "input") return query || url || command || path;
  if (lower === "description" || lower === "reason" || lower === "intent_reason") {
    if (command) return `Execute shell command: ${command}`;
    if (path) return `Read file: ${path}`;
    if (url) return `Fetch URL: ${url}`;
    if (query) return `Search: ${query}`;
    return `Grok Web ${intent} tool call`;
  }
  if (lower === "intent_data_sensitivity") return "private";
  return undefined;
}

function extractNumericUserParam(text: string, names: string[]): number | undefined {
  const escaped = names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const re = new RegExp(`\\b(?:${escaped})\\s*(?:=|:|a|de)?\\s*(\\d+)`, "i");
  const match = text.match(re);
  if (!match) return undefined;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : undefined;
}

function adaptArgumentsToDeclaredTool(
  toolName: string,
  args: Record<string, unknown>,
  toolRegistry: GrokToolRegistry,
  intent: string,
  options: { preserveUnknownArgs?: boolean } = { preserveUnknownArgs: true }
): Record<string, unknown> {
  const tool = toolRegistry.toolsByName.get(toolName);
  if (!tool) return args;
  const properties = getSchemaProperties(tool.parameters);
  const required = getSchemaRequired(tool.parameters);
  const out: Record<string, unknown> = { ...args };

  // Normalize common aliases only when the declared schema expects them.
  if ("filePath" in properties && !hasValue(out.filePath)) out.filePath = firstString(args.filePath, args.file_path, args.path);
  if ("file_path" in properties && !hasValue(out.file_path)) out.file_path = firstString(args.file_path, args.filePath, args.path);
  if ("path" in properties && !hasValue(out.path)) out.path = firstString(args.path, args.filePath, args.file_path);
  if ("query" in properties && !hasValue(out.query)) out.query = firstString(args.query, args.search, args.input);
  if ("url" in properties && !hasValue(out.url)) out.url = firstString(args.url, args.uri);
  if ("uri" in properties && !hasValue(out.uri)) out.uri = firstString(args.uri, args.url);
  if ("input" in properties && !hasValue(out.input)) out.input = firstString(args.input, args.query, args.command);

  for (const key of required) {
    if (hasValue(out[key])) continue;
    const value = defaultRequiredValue(key, propertyType(properties, key), out, intent);
    if (value !== undefined) out[key] = value;
  }

  if (options.preserveUnknownArgs !== false || Object.keys(properties).length === 0) return out;

  const filtered: Record<string, unknown> = {};
  for (const key of Object.keys(properties)) {
    if (hasValue(out[key])) filtered[key] = out[key];
  }
  for (const key of required) {
    if (hasValue(out[key])) filtered[key] = out[key];
  }
  return filtered;
}

function normalizeArbitraryToolArguments(value: unknown): Record<string, unknown> {
  if (!value) return {};
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    } catch {
      return { input: value };
    }
  }
  return {};
}

function parseClientToolCallMarkup(text: string, toolRegistry: GrokToolRegistry): OpenAIToolCall[] | null {
  if (!toolRegistry.enabled || !text.includes("<tool_call>")) return null;
  const calls: OpenAIToolCall[] = [];
  const re = /<tool_call>\s*([\s\S]*?)\s*<\/tool_call>/g;
  for (const match of text.matchAll(re)) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(match[1]);
    } catch {
      continue;
    }
    if (!parsed || typeof parsed !== "object") continue;
    const record = parsed as Record<string, unknown>;
    const name = typeof record.name === "string" ? record.name.trim() : "";
    if (!name || !toolRegistry.toolsByName.has(name)) continue;
    const rawArgs = normalizeArbitraryToolArguments(record.arguments);
    const args = adaptArgumentsToDeclaredTool(name, rawArgs, toolRegistry, "clientTool", { preserveUnknownArgs: true });
    if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) continue;
    calls.push({
      id: typeof record.id === "string" && record.id.trim() ? record.id.trim() : `call_${crypto.randomUUID()}`,
      type: "function",
      function: { name, arguments: JSON.stringify(args) },
    });
  }
  return calls.length > 0 ? calls : null;
}

function hasOpenToolCallMarkup(text: string): boolean {
  return /<tool(?:_call)?$|<tool_call[^>]*$/.test(text) || (text.includes("<tool_call>") && !text.includes("</tool_call>"));
}

function toolScore(tool: GrokFunctionToolSummary, intent: NativeToolIntent, context: ToolBridgeContext): number {
  const name = tool.name.toLowerCase();
  const description = (tool.description || "").toLowerCase();
  const properties = getSchemaProperties(tool.parameters);
  const propNames = new Set(Object.keys(properties).map((key) => key.toLowerCase()));
  const text = `${name} ${description}`;
  const userText = context.lastUserText.toLowerCase();
  let score = 0;

  if (intent === "bash") {
    if (!isTerminalTool(tool)) score -= 80;
    if (name === "bash") score += 100;
    if (["shell", "terminal", "run_command", "execute_command", "exec", "command"].includes(name)) score += 80;
    if (propNames.has("command") || propNames.has("cmd")) score += 60;
    if (/bash|shell|terminal|command|execute|run/.test(text)) score += 25;
    if (/read|search|grep|web|http|browser|context|note|memory/.test(name)) score -= 50;
  } else if (intent === "readFile") {
    if (!isFileReadTool(tool)) score -= 60;
    if (["read", "read_file", "readfile", "file_read"].includes(name)) score += 100;
    if (propNames.has("filepath") || propNames.has("file_path") || propNames.has("path")) score += 50;
    if (/read.*file|file.*read|filesystem/.test(text)) score += 25;
    if (/write|edit|delete|remove|bash|shell|command/.test(text)) score -= 50;
  } else if (intent === "webSearch" || intent === "browsePage") {
    const preferUrlFetch = wantsUrlFetch(userText);
    if (isContextMemoryTool(tool) || isMetaOrInfrastructureTool(tool)) score -= 180;
    if (intent === "browsePage" || preferUrlFetch) {
      if (!isUrlFetchTool(tool)) score -= 60;
      if (/webfetch|web_fetch|fetch|browse|browse_page|read_url|url_fetch|page/.test(name)) score += 140;
      if (propNames.has("url") || propNames.has("uri")) score += 90;
      if (/fetch|browse|url|web page|page content|extract.*url|read.*url/.test(text)) score += 55;
      if (/websearch|web_search|search/.test(name) && !(propNames.has("url") || propNames.has("uri"))) score -= 80;
    }
    if (intent === "webSearch" && !isWebSearchTool(tool)) score -= 60;
    if (intent === "browsePage" && /\b(websearch|web_search|search)\b/.test(name) && !(propNames.has("url") || propNames.has("uri"))) score -= 120;
    if (["web_search", "websearch", "search"].includes(name)) score += 100;
    if (propNames.has("query") || propNames.has("search")) score += 50;
    if (/web.*search|search.*web|internet|browse/.test(text)) score += 25;
    if (/file|bash|shell|command|write|edit/.test(text)) score -= 50;
  }

  return score;
}

function pickDeclaredToolForIntent(intent: NativeToolIntent, toolRegistry: GrokToolRegistry): string | null {
  let best: { name: string; score: number } | null = null;
  for (const tool of toolRegistry.toolsByName.values()) {
    const score = toolScore(tool, intent, { lastUserText: toolRegistry.lastUserText });
    if (score <= 0) continue;
    if (!best || score > best.score) best = { name: tool.name, score };
  }
  return best?.name || null;
}

function mapGrokNativeToolToOpenAI(
  resp: GrokStreamResponse,
  toolRegistry: GrokToolRegistry
): OpenAIToolCall | null {
  if (!toolRegistry.enabled || !resp.toolUsageCard) return null;
  const card = resp.toolUsageCard as Record<string, unknown>;
  const id = resp.toolUsageCardId || String(card.toolUsageCardId || `call_${crypto.randomUUID()}`);

  const bash = card.bash as { args?: Record<string, unknown> } | undefined;
  if (bash?.args) {
    const name = pickDeclaredToolForIntent("bash", toolRegistry);
    if (name) {
      const args = adaptArgumentsToDeclaredTool(name, bash.args, toolRegistry, "bash", { preserveUnknownArgs: false });
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  const readFile = (card.readFile || card.read_file) as { args?: Record<string, unknown> } | undefined;
  if (readFile?.args) {
    const rawPath = readFile.args.filePath || readFile.args.file_path || readFile.args.path;
    const name = pickDeclaredToolForIntent("readFile", toolRegistry);
    if (name && typeof rawPath === "string") {
      const userOffset = extractNumericUserParam(toolRegistry.lastUserText, ["offset"]);
      const userLimit = extractNumericUserParam(toolRegistry.lastUserText, ["limit", "limite", "límite"]);
      const rawArgs = {
        ...readFile.args,
        ...(userOffset !== undefined ? { offset: userOffset } : {}),
        ...(userLimit !== undefined ? { limit: userLimit } : {}),
        filePath: rawPath,
        file_path: rawPath,
        path: rawPath,
      };
      const args = adaptArgumentsToDeclaredTool(
        name,
        rawArgs,
        toolRegistry,
        "readFile",
        { preserveUnknownArgs: false }
      );
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  const webSearch = card.webSearch as { args?: Record<string, unknown> } | undefined;
  if (webSearch?.args) {
    const name = pickDeclaredToolForIntent("webSearch", toolRegistry);
    if (name) {
      const requestedUrl = wantsUrlFetch(toolRegistry.lastUserText) ? extractFirstUrl(toolRegistry.lastUserText) : undefined;
      const args = adaptArgumentsToDeclaredTool(
        name,
        requestedUrl ? { ...webSearch.args, url: requestedUrl, uri: requestedUrl } : webSearch.args,
        toolRegistry,
        requestedUrl ? "webFetch" : "webSearch",
        { preserveUnknownArgs: false }
      );
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  const browsePage = (card.browsePage || card.browse_page) as { args?: Record<string, unknown> } | undefined;
  if (browsePage?.args) {
    const url = firstString(browsePage.args.url, browsePage.args.uri);
    const name = pickDeclaredToolForIntent("browsePage", toolRegistry);
    if (name && url) {
      const args = adaptArgumentsToDeclaredTool(
        name,
        { ...browsePage.args, url, uri: url, input: url },
        toolRegistry,
        "browsePage",
        { preserveUnknownArgs: false }
      );
      if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) return null;
      return { id, type: "function", function: { name, arguments: JSON.stringify(args) } };
    }
  }

  return null;
}

// ─── NDJSON stream types ────────────────────────────────────────────────────

interface GrokStreamResponse {
  token?: string;
  isThinking?: boolean;
  reasoning?: string;
  reasoningContent?: string;
  reasoning_content?: string;
  thinking?: string;
  thought?: string;
  responseId?: string;
  messageTag?: string;
  messageStepId?: number;
  toolUsageCardId?: string;
  toolUsageCard?: {
    toolUsageCardId?: string;
    bash?: { args?: Record<string, unknown> };
    readFile?: { args?: Record<string, unknown> };
    read_file?: { args?: Record<string, unknown> };
    webSearch?: { args?: Record<string, unknown> };
    browsePage?: { args?: Record<string, unknown> };
    browse_page?: { args?: Record<string, unknown> };
  };
  webSearchResults?: {
    results?: Array<Record<string, unknown>>;
  };
  llmInfo?: { modelHash?: string };
  modelResponse?: {
    message?: string;
    reasoning?: string;
    reasoningContent?: string;
    reasoning_content?: string;
    thinking?: string;
    thought?: string;
    responseId?: string;
    generatedImageUrls?: string[];
    metadata?: { llm_info?: { modelHash?: string } };
    pipelineToken?: string;
  };
}

interface GrokStreamEvent {
  result?: { response?: GrokStreamResponse };
  error?: { message?: string; code?: string };
}

// ─── NDJSON parsing ─────────────────────────────────────────────────────────

async function* readGrokNdjsonEvents(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<GrokStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const idx = buffer.indexOf("\n");
        if (idx < 0) break;
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);

        if (!line) continue;
        try {
          yield JSON.parse(line) as GrokStreamEvent;
        } catch {
          // Skip non-JSON lines
        }
      }
    }

    // Flush remaining buffer
    buffer += decoder.decode();
    const remaining = buffer.trim();
    if (remaining) {
      try {
        yield JSON.parse(remaining) as GrokStreamEvent;
      } catch {
        // ignore
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// ─── Grok markup cleanup ────────────────────────────────────────────────────

const BLOCKED_GROK_MARKUP = [
  { start: "<xai:tool_usage_card", end: "</xai:tool_usage_card>" },
] as const;

const PARTIAL_GROK_MARKER_KEEP = 32;

function stripLooseGrokMarkup(text: string): string {
  return text
    .replace(/<\/?xai:[^>]*>/g, "")
    .replace(/<\/?grok:[^>]*>/g, "")
    .replace(/<\/?argument\b[^>]*>/g, "")
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "");
}

class GrokMarkupFilter {
  private buffer = "";
  private suppressedUntil: string | null = null;

  feed(text: string): string {
    if (!text) return "";
    this.buffer += text;
    return this.drain(false);
  }

  flush(): string {
    const out = this.drain(true);
    this.buffer = "";
    this.suppressedUntil = null;
    return out;
  }

  private drain(flush: boolean): string {
    let out = "";

    while (this.buffer) {
      if (this.suppressedUntil) {
        const endIdx = this.buffer.indexOf(this.suppressedUntil);
        if (endIdx < 0) {
          this.buffer = this.buffer.slice(this.longestEndPrefixStart(this.suppressedUntil));
          return out;
        }
        this.buffer = this.buffer.slice(endIdx + this.suppressedUntil.length);
        this.suppressedUntil = null;
        continue;
      }

      let nextStart = -1;
      let nextEnd = "";
      for (const marker of BLOCKED_GROK_MARKUP) {
        const idx = this.buffer.indexOf(marker.start);
        if (idx >= 0 && (nextStart < 0 || idx < nextStart)) {
          nextStart = idx;
          nextEnd = marker.end;
        }
      }

      if (nextStart < 0) {
        if (!flush) {
          const lastLt = this.buffer.lastIndexOf("<");
          if (lastLt >= 0 && this.buffer.length - lastLt <= PARTIAL_GROK_MARKER_KEEP) {
            out += stripLooseGrokMarkup(this.buffer.slice(0, lastLt));
            this.buffer = this.buffer.slice(lastLt);
            return out;
          }
        }
        out += stripLooseGrokMarkup(this.buffer);
        this.buffer = "";
        return out;
      }

      out += stripLooseGrokMarkup(this.buffer.slice(0, nextStart));
      this.buffer = this.buffer.slice(nextStart);
      const endIdx = this.buffer.indexOf(nextEnd);
      const openTagEndIdx = this.buffer.indexOf(">");
      if (openTagEndIdx >= 0 && /\/\s*>$/.test(this.buffer.slice(0, openTagEndIdx + 1))) {
        this.buffer = this.buffer.slice(openTagEndIdx + 1);
        continue;
      }
      if (endIdx < 0) {
        this.suppressedUntil = nextEnd;
        this.buffer = this.buffer.slice(this.longestEndPrefixStart(nextEnd));
        return out;
      }
      this.buffer = this.buffer.slice(endIdx + nextEnd.length);
    }

    return out;
  }

  private longestEndPrefixStart(end: string): number {
    const max = Math.min(this.buffer.length, end.length - 1);
    for (let len = max; len > 0; len--) {
      if (this.buffer.slice(-len) === end.slice(0, len)) return this.buffer.length - len;
    }
    return this.buffer.length;
  }
}

function cleanGrokText(text: string): string {
  const filter = new GrokMarkupFilter();
  return filter.feed(text) + filter.flush();
}

function cleanGrokContentText(text: string): string {
  return cleanGrokText(text);
}

function cleanGrokThinkingText(resp: GrokStreamResponse): string {
  const text = resp.token || "";
  const cleaned = cleanGrokText(text);
  const trimmed = cleaned.trim();
  if (!trimmed) return "";
  const isGenericOpeningHeader =
    resp.messageTag === "header" &&
    resp.messageStepId === 0 &&
    /^(?:\.{3}|thinking(?: about your request)?)$/i.test(trimmed);
  if (isGenericOpeningHeader) return "";
  if (resp.messageTag === "header") return `${trimmed}\n`;
  if (resp.messageTag === "summary") return `${trimmed}\n`;
  return cleaned;
}

function extractStructuredReasoning(value: object | undefined): string {
  if (!value) return "";
  const record = value as Record<string, unknown>;
  for (const key of ["reasoning", "reasoningContent", "reasoning_content", "thinking", "thought"]) {
    const candidate = record[key];
    if (typeof candidate === "string" && candidate.trim()) return cleanGrokText(candidate);
  }
  return "";
}

// ─── Content extraction ─────────────────────────────────────────────────────

interface ContentChunk {
  delta?: string;
  thinking?: string;
  toolCalls?: OpenAIToolCall[];
  fingerprint?: string;
  responseId?: string;
  fullMessage?: string;
  error?: string;
  done?: boolean;
}

async function* extractContent(
  eventStream: ReadableStream<Uint8Array>,
  isThinkingModel: boolean,
  toolRegistry: GrokToolRegistry,
  signal?: AbortSignal | null,
  suppressThinkingAfterVisibleContent = false
): AsyncGenerator<ContentChunk> {
  let fingerprint = "";
  let responseId = "";
  const contentFilter = new GrokMarkupFilter();
  const thinkingFilter = new GrokMarkupFilter();
  let emittedThinking = "";
  let emittedVisibleContent = false;

  for await (const event of readGrokNdjsonEvents(eventStream, signal)) {
    // Error handling
    if (event.error) {
      yield { error: event.error.message || `Grok error: ${event.error.code}`, done: true };
      return;
    }

    const resp = event.result?.response;
    if (!resp) continue;

    // Extract metadata
    if (resp.llmInfo?.modelHash && !fingerprint) {
      fingerprint = resp.llmInfo.modelHash;
    }
    if (resp.responseId) {
      responseId = resp.responseId;
    }

    const nativeToolCall = mapGrokNativeToolToOpenAI(resp, toolRegistry);
    if (nativeToolCall) {
      yield { toolCalls: [nativeToolCall], fingerprint, responseId };
      return;
    }

    if (resp.messageTag === "raw_function_result" || resp.messageTag === "tool_usage_card") {
      continue;
    }

    // modelResponse = final/complete response
    if (resp.modelResponse) {
      const mr = resp.modelResponse;

      const finalThinking = isThinkingModel ? extractStructuredReasoning(mr) : "";
      if ((!suppressThinkingAfterVisibleContent || !emittedVisibleContent) && finalThinking) {
        const cleanedThinking = thinkingFilter.feed(finalThinking);
        const thinkingDelta = cleanedThinking.startsWith(emittedThinking)
          ? cleanedThinking.slice(emittedThinking.length)
          : cleanedThinking;
        if (thinkingDelta) {
          emittedThinking += thinkingDelta;
          yield { thinking: thinkingDelta };
        }
      }

      // Extract final message
      if (mr.message) {
        const fullMessage = cleanGrokContentText(mr.message);
        if (fullMessage) emittedVisibleContent = true;
        yield { fullMessage, fingerprint, responseId };
      }

      // Extract fingerprint from metadata
      if (mr.metadata?.llm_info?.modelHash) {
        fingerprint = mr.metadata.llm_info.modelHash;
      }
      continue;
    }

    // Streaming token
    const thinking = isThinkingModel ? extractStructuredReasoning(resp) : "";
    if ((!suppressThinkingAfterVisibleContent || !emittedVisibleContent) && thinking) {
      const cleanedThinking = thinkingFilter.feed(thinking);
      const thinkingDelta = cleanedThinking.startsWith(emittedThinking)
        ? cleanedThinking.slice(emittedThinking.length)
        : cleanedThinking;
      if (thinkingDelta) {
        emittedThinking += thinkingDelta;
        yield { thinking: thinkingDelta, fingerprint, responseId };
      }
    }
    if (resp.token != null) {
      if (resp.isThinking) {
        const thinkingDelta =
          suppressThinkingAfterVisibleContent && emittedVisibleContent ? "" : cleanGrokThinkingText(resp);
        if (thinkingDelta) yield { thinking: thinkingDelta, fingerprint, responseId };
        continue;
      }
      const cleanedDelta = contentFilter.feed(resp.token);
      if (cleanedDelta) {
        emittedVisibleContent = true;
        yield { delta: cleanedDelta, fingerprint, responseId };
      }
    }
  }

  const trailingThinking =
    suppressThinkingAfterVisibleContent && emittedVisibleContent ? "" : thinkingFilter.flush();
  if (trailingThinking) {
    const thinkingDelta = trailingThinking.startsWith(emittedThinking)
      ? trailingThinking.slice(emittedThinking.length)
      : trailingThinking;
    if (thinkingDelta) yield { thinking: thinkingDelta, fingerprint, responseId };
  }
  const trailingContent = contentFilter.flush();
  const trailingContentWithTrace = trailingContent;
  if (trailingContentWithTrace) yield { delta: trailingContentWithTrace, fingerprint, responseId };

  yield { done: true, fingerprint, responseId };
}

// ─── OpenAI SSE format builders ─────────────────────────────────────────────

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function enqueueStreamingToolCalls(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  params: {
    id: string;
    created: number;
    model: string;
    fingerprint: string;
    toolCalls: OpenAIToolCall[];
  }
): void {
  for (let i = 0; i < params.toolCalls.length; i++) {
    controller.enqueue(
      encoder.encode(
        sseChunk({
          id: params.id,
          object: "chat.completion.chunk",
          created: params.created,
          model: params.model,
          system_fingerprint: params.fingerprint || null,
          choices: [
            {
              index: 0,
              delta: { tool_calls: [{ index: i, ...params.toolCalls[i] }] },
              finish_reason: null,
              logprobs: null,
            },
          ],
        })
      )
    );
  }
  controller.enqueue(
    encoder.encode(
      sseChunk({
        id: params.id,
        object: "chat.completion.chunk",
        created: params.created,
        model: params.model,
        system_fingerprint: params.fingerprint || null,
        choices: [{ index: 0, delta: {}, finish_reason: "tool_calls", logprobs: null }],
      })
    )
  );
  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
}

function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  isThinkingModel: boolean,
  toolRegistry: GrokToolRegistry,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        // Initial role chunk
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                { index: 0, delta: { role: "assistant" }, finish_reason: null, logprobs: null },
              ],
            })
          )
        );

        let fp = "";
        let buffered = "";

        for await (const chunk of extractContent(
          eventStream,
          isThinkingModel,
          toolRegistry,
          signal,
          true
        )) {
          if (chunk.fingerprint) fp = chunk.fingerprint;

          if (chunk.error) {
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: fp || null,
                  choices: [
                    {
                      index: 0,
                      delta: { content: `[Error: ${chunk.error}]` },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
            break;
          }

          if (chunk.thinking) {
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: fp || null,
                  choices: [
                    {
                      index: 0,
                      delta: { reasoning_content: chunk.thinking },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
            continue;
          }

          if (chunk.toolCalls) {
            enqueueStreamingToolCalls(controller, encoder, { id: cid, created, model, fingerprint: fp, toolCalls: chunk.toolCalls });
            return;
          }

          if (chunk.done) break;

          if (chunk.fullMessage) {
            const toolCalls = parseClientToolCallMarkup(chunk.fullMessage, toolRegistry);
            if (toolCalls) {
              enqueueStreamingToolCalls(controller, encoder, { id: cid, created, model, fingerprint: fp, toolCalls });
              return;
            }
          }

          if (chunk.delta) {
            buffered += chunk.delta;
            const toolCalls = parseClientToolCallMarkup(buffered, toolRegistry);
            if (toolCalls) {
              enqueueStreamingToolCalls(controller, encoder, { id: cid, created, model, fingerprint: fp, toolCalls });
              return;
            }
            if (hasOpenToolCallMarkup(buffered)) continue;
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: fp || null,
                  choices: [
                    {
                      index: 0,
                      delta: { content: chunk.delta },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
          }
        }

        // Stop chunk
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: fp || null,
              choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
            })
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                {
                  index: 0,
                  delta: {
                    content: `[Stream error: ${err instanceof Error ? err.message : String(err)}]`,
                  },
                  finish_reason: "stop",
                  logprobs: null,
                },
              ],
            })
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } finally {
        controller.close();
      }
    },
  });
}

async function buildNonStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  isThinkingModel: boolean,
  toolRegistry: GrokToolRegistry,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullContent = "";
  let fingerprint = "";
  const thinkingParts: string[] = [];

  for await (const chunk of extractContent(eventStream, isThinkingModel, toolRegistry, signal)) {
    if (chunk.fingerprint) fingerprint = chunk.fingerprint;

    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "GROK_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.thinking) {
      thinkingParts.push(chunk.thinking);
      continue;
    }
    if (chunk.toolCalls) {
      return new Response(
        JSON.stringify({
          id: cid,
          object: "chat.completion",
          created,
          model,
          system_fingerprint: fingerprint || null,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: null, tool_calls: chunk.toolCalls },
              finish_reason: "tool_calls",
              logprobs: null,
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.done) break;
    if (chunk.fullMessage) {
      fullContent = chunk.fullMessage;
    } else if (chunk.delta) {
      fullContent += chunk.delta;
    }
  }

  const manifestToolCalls = parseClientToolCallMarkup(fullContent, toolRegistry);
  if (manifestToolCalls) {
    return new Response(
      JSON.stringify({
        id: cid,
        object: "chat.completion",
        created,
        model,
        system_fingerprint: fingerprint || null,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: null, tool_calls: manifestToolCalls },
            finish_reason: "tool_calls",
            logprobs: null,
          },
        ],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const msg: Record<string, unknown> = { role: "assistant", content: fullContent };
  if (thinkingParts.length > 0) {
    msg.reasoning_content = thinkingParts.join("\n");
  }

  const promptTokens = Math.ceil(fullContent.length / 4);
  const completionTokens = Math.ceil(fullContent.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: fingerprint || null,
      choices: [
        {
          index: 0,
          message: msg,
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class GrokWebExecutor extends BaseExecutor {
  constructor() {
    super("grok-web", { id: "grok-web", baseUrl: GROK_CHAT_API });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput) {
    const messages = (body as Record<string, unknown>).messages as
      | Array<Record<string, unknown>>
      | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Missing or empty messages array", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers: {}, transformedBody: body };
    }

    // Resolve model → Grok Web mode
    const modelInfo = MODEL_MAP[model];
    if (!modelInfo) {
      log?.info?.("GROK-WEB", `Unmapped model ${model}, defaulting to fast mode`);
    }
    const toolRegistry = buildGrokToolRegistry(body as Record<string, unknown>);
    const { modeId, isThinking } = modelInfo || MODEL_MAP.fast;

    // Parse OpenAI messages → single Grok message string
    const message = buildGrokMessage(messages, toolRegistry, (body as Record<string, unknown>).tool_choice);
    if (!message.trim()) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Empty query after processing", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers: {}, transformedBody: body };
    }

    // Build Grok request payload
    const grokPayload: Record<string, unknown> = {
      temporary: true,
      modeId,
      message: message,
      fileAttachments: [],
      imageAttachments: [],
      disableSearch: false,
      enableImageGeneration: false,
      returnImageBytes: false,
      returnRawGrokInXaiRequest: false,
      enableImageStreaming: false,
      imageGenerationCount: 0,
      forceConcise: false,
      toolOverrides: {},
      enableSideBySide: true,
      sendFinalMetadata: true,
      isReasoning: false,
      disableTextFollowUps: false,
      disableMemory: true,
      forceSideBySide: false,
      isAsyncChat: false,
      disableSelfHarmShortCircuit: false,
      deviceEnvInfo: {
        darkModeEnabled: false,
        devicePixelRatio: 2,
        screenWidth: 2056,
        screenHeight: 1329,
        viewportWidth: 2056,
        viewportHeight: 1083,
      },
    };

    // Build headers
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    const headers: Record<string, string> = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      Baggage:
        "sentry-environment=production,sentry-release=d6add6fb0460641fd482d767a335ef72b9b6abb8,sentry-public_key=b311e0f2690c81f25e2c4cf6d4f7ce1c",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Origin: "https://grok.com",
      Pragma: "no-cache",
      Referer: "https://grok.com/",
      "Sec-Ch-Ua": '"Google Chrome";v="147", "Chromium";v="147", "Not(A:Brand";v="24"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"macOS"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": GROK_USER_AGENT,
      "x-statsig-id": generateStatsigId(),
      "x-xai-request-id": crypto.randomUUID(),
      traceparent: `00-${traceId}-${spanId}-00`,
    };

    // Cookie auth — accepts a bare value, "sso=<value>", or a full
    // DevTools cookie blob; we extract the sso pair and ignore the rest.
    if (credentials.apiKey) {
      const token = extractCookieValue(credentials.apiKey, "sso");
      if (token) headers["Cookie"] = `sso=${token}`;
    }

    // Apply upstream extra headers
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    log?.info?.("GROK-WEB", `Query to ${model} (modeId=${modeId}), len=${message.length}`);

    // Apply fetch timeout
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    // Fetch from Grok
    const fetchOptions: RequestInit = {
      method: "POST",
      headers,
      body: JSON.stringify(grokPayload),
      signal: combinedSignal,
    };

    let response: Response;
    try {
      response = await fetch(GROK_CHAT_API, fetchOptions);
    } catch (err) {
      log?.error?.("GROK-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const errResp = new Response(
        JSON.stringify({
          error: {
            message: `Grok connection failed: ${err instanceof Error ? err.message : String(err)}`,
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    if (!response.ok) {
      const status = response.status;
      let errMsg = `Grok returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        errMsg =
          "Grok auth failed — SSO cookie may be expired. Re-paste your sso cookie value from grok.com.";
      } else if (status === 429) {
        errMsg = "Grok rate limited. Wait a moment and retry, or rotate cookies.";
      }
      log?.warn?.("GROK-WEB", errMsg);
      const errResp = new Response(
        JSON.stringify({
          error: { message: errMsg, type: "upstream_error", code: `HTTP_${status}` },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    if (!response.body) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Grok returned empty response body", type: "upstream_error" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    // Build OpenAI-compatible response
    const cid = `chatcmpl-grok-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    let finalResponse: Response;
    if (stream) {
      const sseStream = buildStreamingResponse(
        response.body,
        model,
        cid,
        created,
        isThinking,
        toolRegistry,
        signal
      );
      finalResponse = new Response(sseStream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    } else {
      finalResponse = await buildNonStreamingResponse(
        response.body,
        model,
        cid,
        created,
        isThinking,
        toolRegistry,
        signal
      );
    }

    return { response: finalResponse, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
  }
}
