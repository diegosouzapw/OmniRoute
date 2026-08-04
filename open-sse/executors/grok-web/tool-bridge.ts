// OpenAI <-> Grok tool-call translation (pure). Extracted verbatim from grok-web.ts.
import type { GrokStreamResponse } from "./types.ts";

// ─── OpenAI message → Grok query translation ───────────────────────────────

export interface OpenAIToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface GrokToolRegistry {
  enabled: boolean;
  toolsByName: Map<string, GrokFunctionToolSummary>;
  lastUserText: string;
  executedToolKeys: Set<string>;
  completedToolCalls: string[];
}

export interface GrokFunctionToolSummary {
  name: string;
  description?: string;
  parameters: unknown;
}

export type NativeToolIntent = "bash" | "readFile" | "webSearch" | "browsePage";

export interface ToolBridgeContext {
  lastUserText: string;
}

export function stripInjectedRuntimeReminders(text: string): string {
  return text
    .replace(/\n?---\s*\n\s*<internal_reminder>[\s\S]*?<\/internal_reminder>/gi, "")
    .replace(/<internal_reminder>[\s\S]*?<\/internal_reminder>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function extractTextContent(msg: Record<string, unknown>): string {
  if (typeof msg.content === "string") return stripInjectedRuntimeReminders(msg.content);
  if (Array.isArray(msg.content)) {
    return stripInjectedRuntimeReminders(
      (msg.content as Array<Record<string, unknown>>)
        .filter((c) => c.type === "text")
        .map((c) => String(c.text || ""))
        .join(" ")
    );
  }
  return "";
}

export function getLastUserText(messages: Array<Record<string, unknown>>): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].role || "") === "user") return extractTextContent(messages[i]);
  }
  return "";
}

export function normalizeToolArgumentObject(value: unknown): Record<string, unknown> {
  if (!value) return {};
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object"
        ? (parsed as Record<string, unknown>)
        : { input: value };
    } catch {
      return { input: value };
    }
  }
  return {};
}

export function stableJson(value: unknown): string {
  if (!value || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
    .join(",")}}`;
}

export function toolCallKey(name: string, args: unknown): string {
  return `${name}:${stableJson(normalizeToolArgumentObject(args))}`;
}

export function normalizeShellCommand(command: string): string {
  return command.trim().replace(/\s+/g, " ");
}

export function normalizePathValue(path: string): string {
  return path.trim().replace(/^['"]|['"]$/g, "");
}

export function normalizeQueryValue(query: string): string {
  return query.trim().replace(/\s+/g, " ").toLowerCase();
}

export function semanticToolKey(name: string, args: unknown): string {
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

export function summarizeCompletedToolCall(name: string, args: unknown): string {
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

export function getExecutedToolState(messages: Array<Record<string, unknown>>): {
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

export function extractFirstUrl(text: string): string | undefined {
  const match = text.match(/https?:\/\/[^\s)\]}>"']+/i);
  if (match?.[0]) return match[0].replace(/[.,;:!?]+$/, "");
  const domain = text.match(/(?:^|\s)((?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)\]}>"']*)?)/i)?.[1];
  return domain ? `https://${domain.replace(/[.,;:!?]+$/, "")}` : undefined;
}

export function wantsUrlFetch(text: string): boolean {
  return (
    /\b(webfetch|web_fetch|fetch|browse|open|read|lee|abre|extrae|investiga|analiza|resume|summarize|de qu[eé] va)\b/i.test(
      text
    ) && !!extractFirstUrl(text)
  );
}

export function forcedToolChoiceName(toolChoice: unknown): string | null {
  if (!toolChoice || typeof toolChoice !== "object") return null;
  const record = toolChoice as Record<string, unknown>;
  if (record.type !== "function" || !record.function || typeof record.function !== "object")
    return null;
  const name = (record.function as Record<string, unknown>).name;
  return typeof name === "string" && name.trim() ? name.trim() : null;
}

export function parseOpenAIMessages(
  messages: Array<Record<string, unknown>>,
  beforeLatestUser = ""
): string {
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

export function buildGrokToolRegistry(body: Record<string, unknown>): GrokToolRegistry {
  const tools = Array.isArray(body.tools) ? (body.tools as Array<Record<string, unknown>>) : [];
  const messages = Array.isArray(body.messages)
    ? (body.messages as Array<Record<string, unknown>>)
    : [];
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
  const visibleTools = forcedName
    ? functionTools.filter((tool) => tool.name === forcedName)
    : functionTools;

  return {
    enabled: visibleTools.length > 0,
    toolsByName: new Map(visibleTools.map((tool) => [tool.name, tool])),
    lastUserText,
    executedToolKeys: executedToolState.keys,
    completedToolCalls: executedToolState.summaries,
  };
}

export function getSchemaProperties(parameters: unknown): Record<string, unknown> {
  if (!parameters || typeof parameters !== "object") return {};
  const properties = (parameters as Record<string, unknown>).properties;
  return properties && typeof properties === "object"
    ? (properties as Record<string, unknown>)
    : {};
}

export function getSchemaRequired(parameters: unknown): string[] {
  if (!parameters || typeof parameters !== "object") return [];
  const required = (parameters as Record<string, unknown>).required;
  return Array.isArray(required)
    ? required.filter((key): key is string => typeof key === "string")
    : [];
}

export function formatToolArgsSummary(parameters: unknown): string {
  const properties = getSchemaProperties(parameters);
  const propNames = Object.keys(properties);
  const required = getSchemaRequired(parameters);
  const segments: string[] = [];
  if (propNames.length > 0) segments.push(`args=${propNames.join(",")}`);
  if (required.length > 0) segments.push(`required=${required.join(",")}`);
  return segments.length > 0 ? ` (${segments.join("; ")})` : "";
}

export function toolText(tool: GrokFunctionToolSummary): string {
  return `${tool.name} ${tool.description || ""}`.toLowerCase();
}

export function hasAnyProperty(tool: GrokFunctionToolSummary, names: string[]): boolean {
  const properties = getSchemaProperties(tool.parameters);
  const lowerProps = new Set(Object.keys(properties).map((key) => key.toLowerCase()));
  return names.some((name) => lowerProps.has(name.toLowerCase()));
}

export function isTerminalTool(tool: GrokFunctionToolSummary): boolean {
  if (isMetaOrInfrastructureTool(tool)) return false;
  const text = toolText(tool);
  const name = tool.name.toLowerCase();
  const explicitName = /\b(bash|shell|terminal|run_command|execute_command|exec|command)\b/.test(
    name
  );
  const explicitText =
    /\b(?:run|execute).{0,24}\b(?:shell|bash|terminal|command)\b|\b(?:shell|bash|terminal)\b/.test(
      text
    );
  return explicitName || (hasAnyProperty(tool, ["command", "cmd", "shell"]) && explicitText);
}

export function isFileReadTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return (
    hasAnyProperty(tool, ["filePath", "file_path", "path"]) &&
    /\b(read|file|filesystem|open)\b/.test(text) &&
    !/\b(write|edit|patch|delete|remove|grep|search|bash|shell|command)\b/.test(text)
  );
}

export function isUrlFetchTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  const name = tool.name.toLowerCase();
  const explicitName =
    /\b(webfetch|web.fetch|fetch_url|url_fetch|read_url|browse_page|browsepage)\b/.test(name);
  const explicitUrlText =
    /\b(?:fetch|browse|read).{0,32}\b(?:url|uri|web page|page content)\b|\b(?:url|uri|web page|page content).{0,32}\b(?:fetch|browse|read)\b/.test(
      text
    );
  return (
    explicitName ||
    (!isMetaOrInfrastructureTool(tool) && hasAnyProperty(tool, ["url", "uri"]) && explicitUrlText)
  );
}

export function isWebSearchTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return (
    hasAnyProperty(tool, ["query", "search"]) &&
    /\b(web|internet|exa|browser|browse|serp)\b/.test(text) &&
    !isMetaOrInfrastructureTool(tool) &&
    !isContextMemoryTool(tool)
  );
}

export function isContextMemoryTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return /\b(ctx_|memory|memories|conversation history|session notes|git commits|project memories|context.db|magic context)\b/.test(
    text
  );
}

export function isMetaOrInfrastructureTool(tool: GrokFunctionToolSummary): boolean {
  const text = toolText(tool);
  return /\b(mcp|mcpproxy|upstream|registry|registries|quarantine|oauth|cache key|token usage|session notes|conversation transcript|handoff|context management|memory|memories|lsp|language server|plan file|server management|tool discovery|tools? using bm25)\b/.test(
    text
  );
}

export function baseToolOrderScore(tool: GrokFunctionToolSummary): number {
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

export function latestUserIntentScore(tool: GrokFunctionToolSummary, lastUserText: string): number {
  const user = lastUserText.toLowerCase();
  const hasPath = /(?:^|\s|["'`])(?:~|\.?\.?\/|\/)[^\s"'`]+/.test(lastUserText);
  const hasUrl = !!extractFirstUrl(lastUserText);
  const asksLineCount = /\b(l[ií]neas?|line count|cu[aá]ntas? l[ií]neas?|wc\s+-l)\b/.test(user);
  const asksFileContent =
    /\b(lee|leer|read|archivo|file|json|config|modelo|default|por defecto|de qu[eé] va|consiste|contenido)\b/.test(
      user
    ) && hasPath;
  const asksContext =
    /\b(contexto|memoria|historial|conversation history|project memories|ctx_|memory|memories|recordabas?)\b/.test(
      user
    );
  const asksWeb =
    !asksContext &&
    /\b(web|internet|fuente|oficial|release|versi[oó]n|ubuntu|latest|actual|contrasta|busca|search)\b/.test(
      user
    );
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

export function orderedToolsForManifest(
  toolRegistry: GrokToolRegistry
): Array<{ tool: GrokFunctionToolSummary; score: number }> {
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

export function formatToolManifestEntry(tool: GrokFunctionToolSummary, rank: number): string {
  const desc = tool.description ? `\n  description: ${tool.description}` : "";
  const args = formatToolArgsSummary(tool.parameters).trim();
  return `${rank}. name: ${tool.name}${args ? `\n   ${args.slice(1, -1)}` : ""}${desc ? desc.replace(/\n  /g, "\n   ") : ""}`;
}

export function buildClientToolManifest(
  toolRegistry: GrokToolRegistry,
  toolChoice: unknown
): string {
  if (!toolRegistry.enabled) return "";
  const orderedTools = orderedToolsForManifest(toolRegistry);
  const lines = [
    'CLIENT_TOOLS: use this caller-runtime tool list as the tool interface for this request. To call one, respond only with <tool_call>{"name":"exact_tool_name","arguments":{...}}</tool_call>. After tool results, answer normally.',
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

export function buildGrokMessage(
  messages: Array<Record<string, unknown>>,
  toolRegistry: GrokToolRegistry,
  toolChoice: unknown
): string {
  const manifest = buildClientToolManifest(toolRegistry, toolChoice);
  return parseOpenAIMessages(messages, manifest);
}

export function propertyType(properties: Record<string, unknown>, key: string): string | undefined {
  const prop = properties[key];
  if (!prop || typeof prop !== "object") return undefined;
  const type = (prop as Record<string, unknown>).type;
  return typeof type === "string" ? type : undefined;
}

export function hasValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

export function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
}

export function defaultRequiredValue(
  key: string,
  type: string | undefined,
  args: Record<string, unknown>,
  intent: string
): unknown {
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

export function extractNumericUserParam(text: string, names: string[]): number | undefined {
  const escaped = names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const re = new RegExp(`\\b(?:${escaped})\\s*(?:=|:|a|de)?\\s*(\\d+)`, "i");
  const match = text.match(re);
  if (!match) return undefined;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : undefined;
}

export function adaptArgumentsToDeclaredTool(
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
  if ("filePath" in properties && !hasValue(out.filePath))
    out.filePath = firstString(args.filePath, args.file_path, args.path);
  if ("file_path" in properties && !hasValue(out.file_path))
    out.file_path = firstString(args.file_path, args.filePath, args.path);
  if ("path" in properties && !hasValue(out.path))
    out.path = firstString(args.path, args.filePath, args.file_path);
  if ("query" in properties && !hasValue(out.query))
    out.query = firstString(args.query, args.search, args.input);
  if ("url" in properties && !hasValue(out.url)) out.url = firstString(args.url, args.uri);
  if ("uri" in properties && !hasValue(out.uri)) out.uri = firstString(args.uri, args.url);
  if ("input" in properties && !hasValue(out.input))
    out.input = firstString(args.input, args.query, args.command);

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

export function normalizeArbitraryToolArguments(value: unknown): Record<string, unknown> {
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

export function parseClientToolCallMarkup(
  text: string,
  toolRegistry: GrokToolRegistry
): OpenAIToolCall[] | null {
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
    const args = adaptArgumentsToDeclaredTool(name, rawArgs, toolRegistry, "clientTool", {
      preserveUnknownArgs: true,
    });
    if (toolRegistry.executedToolKeys.has(semanticToolKey(name, args))) continue;
    calls.push({
      id:
        typeof record.id === "string" && record.id.trim()
          ? record.id.trim()
          : `call_${crypto.randomUUID()}`,
      type: "function",
      function: { name, arguments: JSON.stringify(args) },
    });
  }
  return calls.length > 0 ? calls : null;
}

export function hasOpenToolCallMarkup(text: string): boolean {
  return (
    /<tool(?:_call)?$|<tool_call[^>]*$/.test(text) ||
    (text.includes("<tool_call>") && !text.includes("</tool_call>"))
  );
}
