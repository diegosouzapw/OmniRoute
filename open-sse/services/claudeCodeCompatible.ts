import { createHash, randomUUID } from "node:crypto";

export const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";
export const CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH = "/v1/messages?beta=true";
export const CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH = "/models";
export const CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS = 8092;
export const CLAUDE_CODE_COMPATIBLE_ANTHROPIC_VERSION = "2023-06-01";
export const CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA =
  "claude-code-20250219,interleaved-thinking-2025-05-14,context-management-2025-06-27,prompt-caching-scope-2026-01-05,effort-2025-11-24";
export const CLAUDE_CODE_COMPATIBLE_USER_AGENT = "claude-cli/2.1.89 (external, sdk-cli)";
export const CLAUDE_CODE_COMPATIBLE_BILLING_HEADER =
  "x-anthropic-billing-header: cc_version=2.1.89.728; cc_entrypoint=sdk-cli; cch=00000;";

type HeaderLike =
  | Headers
  | Record<string, string | undefined>
  | { get?: (name: string) => string | null }
  | null
  | undefined;

type MessageLike = {
  role?: string;
  content?: unknown;
};

type BuildRequestOptions = {
  sourceBody?: Record<string, unknown> | null;
  normalizedBody?: Record<string, unknown> | null;
  model: string;
  stream?: boolean;
  cwd?: string;
  now?: Date;
  sessionId?: string | null;
};

export function isClaudeCodeCompatibleProvider(provider: string | null | undefined): boolean {
  return typeof provider === "string" && provider.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
}

export function stripAnthropicMessagesSuffix(baseUrl: string | null | undefined): string {
  const normalized = String(baseUrl || "")
    .trim()
    .replace(/\/$/, "");
  if (!normalized) return "";
  return normalized.replace(/\/messages(?:\?[^#]*)?$/i, "");
}

export function stripClaudeCodeCompatibleEndpointSuffix(
  baseUrl: string | null | undefined
): string {
  const normalized = String(baseUrl || "")
    .trim()
    .replace(/\/$/, "");
  if (!normalized) return "";
  return normalized.replace(/\/(?:v\d+\/)?messages(?:\?[^#]*)?$/i, "");
}

function joinNormalizedBaseUrlAndPath(baseUrl: string, path: string): string {
  const normalizedBase = String(baseUrl || "").replace(/\/$/, "");
  const normalizedPath = String(path || "").startsWith("/")
    ? String(path)
    : `/${String(path || "")}`;
  const versionMatch = normalizedBase.match(/(\/v\d+)$/i);
  if (
    versionMatch &&
    normalizedPath.toLowerCase().startsWith(`${versionMatch[1].toLowerCase()}/`)
  ) {
    return `${normalizedBase}${normalizedPath.slice(versionMatch[1].length)}`;
  }
  return `${normalizedBase}${normalizedPath}`;
}

export function joinBaseUrlAndPath(baseUrl: string, path: string): string {
  return joinNormalizedBaseUrlAndPath(stripAnthropicMessagesSuffix(baseUrl), path);
}

export function joinClaudeCodeCompatibleUrl(baseUrl: string, path: string): string {
  return joinNormalizedBaseUrlAndPath(stripClaudeCodeCompatibleEndpointSuffix(baseUrl), path);
}

export function buildClaudeCodeCompatibleHeaders(
  apiKey: string,
  stream = false,
  sessionId?: string | null
): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
    "x-api-key": apiKey,
    "anthropic-version": CLAUDE_CODE_COMPATIBLE_ANTHROPIC_VERSION,
    "anthropic-beta": CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA,
    "anthropic-dangerous-direct-browser-access": "true",
    "x-app": "cli",
    "User-Agent": CLAUDE_CODE_COMPATIBLE_USER_AGENT,
    "X-Stainless-Retry-Count": "0",
    "X-Stainless-Timeout": "300",
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": "0.74.0",
    "X-Stainless-OS": "MacOS",
    "X-Stainless-Arch": "arm64",
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": "v25.8.1",
    "accept-language": "*",
    "sec-fetch-mode": "cors",
    "accept-encoding": "identity",
    ...(sessionId ? { "X-Claude-Code-Session-Id": sessionId } : {}),
  };
}

export function buildClaudeCodeCompatibleValidationPayload(model = "claude-sonnet-4-6") {
  const sessionId = randomUUID();
  return buildClaudeCodeCompatibleRequest({
    sourceBody: { max_tokens: 1 },
    normalizedBody: {
      messages: [{ role: "user", content: "ok" }],
      max_tokens: 1,
    },
    model,
    stream: false,
    sessionId,
    cwd: process.cwd(),
    now: new Date(),
  });
}

export function resolveClaudeCodeCompatibleSessionId(headers?: HeaderLike): string {
  const raw =
    getHeader(headers, "x-claude-code-session-id") ||
    getHeader(headers, "x-session-id") ||
    getHeader(headers, "x_session_id") ||
    getHeader(headers, "x-omniroute-session") ||
    null;

  return (raw && raw.trim()) || randomUUID();
}

export function buildClaudeCodeCompatibleRequest({
  sourceBody,
  normalizedBody,
  model,
  stream = false,
  cwd = process.cwd(),
  now = new Date(),
  sessionId,
}: BuildRequestOptions) {
  const normalized = normalizedBody || {};
  const messages = Array.isArray(normalized.messages)
    ? buildClaudeCodeCompatibleMessages(normalized.messages as MessageLike[])
    : [];
  const system = buildClaudeCodeCompatibleSystemBlocks(
    normalized.messages as MessageLike[],
    cwd,
    now
  );
  const resolvedSessionId = sessionId || randomUUID();
  const effort = resolveClaudeCodeCompatibleEffort(sourceBody, normalizedBody, model);
  const maxTokens = resolveClaudeCodeCompatibleMaxTokens(sourceBody, normalizedBody);
  const tools = buildClaudeCodeCompatibleTools(normalizedBody, sourceBody);
  const toolChoice =
    tools.length > 0
      ? buildClaudeCodeCompatibleToolChoice(
          normalizedBody?.["tool_choice"] ?? sourceBody?.["tool_choice"]
        )
      : undefined;

  return {
    model,
    messages,
    system,
    tools,
    metadata: {
      user_id: JSON.stringify({
        device_id: createHash("sha256")
          .update(String(cwd || ""))
          .digest("hex")
          .slice(0, 24),
        account_uuid: "",
        session_id: resolvedSessionId,
      }),
    },
    max_tokens: maxTokens,
    thinking: {
      type: "adaptive",
    },
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: "all",
        },
      ],
    },
    output_config: {
      effort,
    },
    ...(toolChoice ? { tool_choice: toolChoice } : {}),
    ...(stream ? { stream: true } : {}),
  };
}

export function resolveClaudeCodeCompatibleEffort(
  sourceBody?: Record<string, unknown> | null,
  normalizedBody?: Record<string, unknown> | null,
  model?: string | null
): "low" | "medium" | "high" {
  const raw =
    readNestedString(sourceBody, ["output_config", "effort"]) ||
    readNestedString(sourceBody, ["reasoning", "effort"]) ||
    toNonEmptyString(sourceBody?.["reasoning_effort"]) ||
    readNestedString(normalizedBody, ["output_config", "effort"]) ||
    readNestedString(normalizedBody, ["reasoning", "effort"]) ||
    toNonEmptyString(normalizedBody?.["reasoning_effort"]) ||
    "";

  const normalizedEffort = raw.toLowerCase();
  void model;

  if (!normalizedEffort) return "high";
  if (normalizedEffort === "low") return "low";
  if (normalizedEffort === "medium") return "medium";
  if (normalizedEffort === "high") return "high";
  if (normalizedEffort === "none" || normalizedEffort === "disabled") return "low";
  if (normalizedEffort === "max" || normalizedEffort === "xhigh") {
    return "high";
  }
  return "high";
}

export function resolveClaudeCodeCompatibleMaxTokens(
  sourceBody?: Record<string, unknown> | null,
  normalizedBody?: Record<string, unknown> | null
): number {
  const candidates = [
    sourceBody?.["max_tokens"],
    sourceBody?.["max_completion_tokens"],
    sourceBody?.["max_output_tokens"],
    normalizedBody?.["max_tokens"],
    normalizedBody?.["max_completion_tokens"],
    normalizedBody?.["max_output_tokens"],
  ];

  for (const candidate of candidates) {
    const value = Number(candidate);
    if (Number.isFinite(value) && value > 0) {
      return Math.floor(value);
    }
  }

  return CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS;
}

function buildClaudeCodeCompatibleMessages(messages: MessageLike[]) {
  const converted = messages
    .map((message) => convertClaudeCodeCompatibleMessage(message))
    .filter(
      (
        message
      ): message is { role: "user" | "assistant"; content: Array<Record<string, unknown>> } =>
        !!message && message.content.length > 0
    );

  const merged: Array<{ role: "user" | "assistant"; content: Array<Record<string, unknown>> }> = [];

  for (const message of converted) {
    const last = merged[merged.length - 1];
    if (last && last.role === message.role) {
      last.content.push(...message.content);
      continue;
    }
    merged.push({ role: message.role, content: [...message.content] });
  }

  // CC-compatible sites we tested reject assistant-prefill shaped requests even
  // when Anthropic would normally allow them. Keep assistant/model history, but
  // drop trailing assistant turns so the upstream request ends on a user turn.
  while (merged.length > 0 && merged[merged.length - 1].role === "assistant") {
    merged.pop();
  }

  if (merged.length === 0) {
    const fallbackText = converted
      .flatMap((message) => message.content)
      .map((block) => toNonEmptyString(block.text))
      .filter(Boolean)
      .join("\n")
      .trim();

    if (fallbackText) {
      return [
        {
          role: "user" as const,
          content: [{ type: "text", text: fallbackText, cache_control: { type: "ephemeral" } }],
        },
      ];
    }
  }

  for (let i = merged.length - 1; i >= 0; i--) {
    if (merged[i].role !== "user") continue;
    const lastBlock = merged[i].content[merged[i].content.length - 1];
    if (lastBlock) {
      lastBlock.cache_control = { type: "ephemeral" };
    }
    break;
  }

  return merged;
}

function buildClaudeCodeCompatibleSystemBlocks(
  messages: MessageLike[] | undefined,
  cwd: string,
  now: Date
) {
  const customSystemBlocks = Array.isArray(messages)
    ? messages
        .filter((message) => {
          const role = String(message?.role || "").toLowerCase();
          return role === "system" || role === "developer";
        })
        .map((message) => contentToText(message?.content))
        .filter(Boolean)
    : [];

  const dateText = formatDate(now);
  const blocks: Array<Record<string, unknown>> = [
    {
      type: "text",
      text: CLAUDE_CODE_COMPATIBLE_BILLING_HEADER,
    },
    {
      type: "text",
      text: "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
      cache_control: { type: "ephemeral" },
    },
    {
      type: "text",
      text: `You are Claude Code, Anthropic's official CLI for Claude.\n\nCWD: ${cwd}\nDate: ${dateText}`,
      cache_control: { type: "ephemeral" },
    },
  ];

  for (const systemText of customSystemBlocks) {
    blocks.push({
      type: "text",
      text: systemText,
      cache_control: { type: "ephemeral" },
    });
  }

  return blocks;
}

function convertClaudeCodeCompatibleMessage(message: MessageLike | null | undefined) {
  const rawRole = String(message?.role || "").toLowerCase();
  const role =
    rawRole === "user"
      ? "user"
      : rawRole === "assistant" || rawRole === "model"
        ? "assistant"
        : null;

  if (!role) return null;

  const text = contentToText(message?.content);
  if (!text) return null;

  return {
    role,
    content: [{ type: "text", text }],
  };
}

function buildClaudeCodeCompatibleTools(
  normalizedBody?: Record<string, unknown> | null,
  sourceBody?: Record<string, unknown> | null
) {
  const rawTools = Array.isArray(normalizedBody?.["tools"])
    ? normalizedBody?.["tools"]
    : Array.isArray(sourceBody?.["tools"])
      ? sourceBody?.["tools"]
      : [];

  return rawTools
    .map((tool) => convertClaudeCodeCompatibleTool(tool))
    .filter((tool): tool is Record<string, unknown> => !!tool);
}

function convertClaudeCodeCompatibleTool(tool: unknown) {
  const rawTool = readRecord(tool);
  if (!rawTool) return null;

  const toolData = rawTool.type === "function" ? readRecord(rawTool.function) || rawTool : rawTool;

  const name = toNonEmptyString(toolData.name);
  if (!name) return null;

  const rawSchema = readRecord(toolData.parameters) ||
    readRecord(toolData.input_schema) || { type: "object", properties: {}, required: [] };
  const inputSchema =
    rawSchema.type === "object" && !readRecord(rawSchema.properties)
      ? { ...rawSchema, properties: {} }
      : rawSchema;

  const converted: Record<string, unknown> = {
    name,
    description: toNonEmptyString(toolData.description) || "",
    input_schema: inputSchema,
  };

  if (typeof toolData.defer_loading === "boolean") {
    converted.defer_loading = toolData.defer_loading;
  }

  return converted;
}

function buildClaudeCodeCompatibleToolChoice(choice: unknown) {
  if (!choice) return null;

  if (typeof choice === "string") {
    if (choice === "required") return { type: "any" };
    return null;
  }

  const rawChoice = readRecord(choice);
  if (!rawChoice) return null;

  if (rawChoice.type === "tool") {
    const name = toNonEmptyString(rawChoice.name);
    return name ? { type: "tool", name } : null;
  }

  if (rawChoice.type === "function") {
    const functionName =
      toNonEmptyString(readRecord(rawChoice.function)?.name) || toNonEmptyString(rawChoice.name);
    return functionName ? { type: "tool", name: functionName } : null;
  }

  if (rawChoice.type === "required" || rawChoice.type === "any") {
    return { type: "any" };
  }

  return null;
}

function contentToText(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (!part || typeof part !== "object") return "";
        const record = part as Record<string, unknown>;
        if (record.type === "text" && typeof record.text === "string") {
          return record.text.trim();
        }
        if (typeof record.text === "string") {
          return record.text.trim();
        }
        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();
  }

  if (content && typeof content === "object") {
    const record = content as Record<string, unknown>;
    if (typeof record.text === "string") return record.text.trim();
  }

  return "";
}

function getHeader(headers: HeaderLike, name: string): string | null {
  if (!headers) return null;

  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name);
  }

  const record = headers as Record<string, string | undefined>;
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(record)) {
    if (key.toLowerCase() === target) {
      return value ?? null;
    }
  }
  return null;
}

function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value || "1970";
  const month = parts.find((part) => part.type === "month")?.value || "01";
  const day = parts.find((part) => part.type === "day")?.value || "01";
  return `${year}-${month}-${day}`;
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readNestedString(
  source: Record<string, unknown> | null | undefined,
  path: string[]
): string | null {
  let current: unknown = source;
  for (const key of path) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return null;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return toNonEmptyString(current);
}
