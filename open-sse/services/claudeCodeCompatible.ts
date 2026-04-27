import { createHash, randomUUID } from "node:crypto";

import { getStainlessTimeoutSeconds } from "@/shared/utils/runtimeTimeouts";
import { ANTHROPIC_VERSION_HEADER } from "../config/anthropicHeaders.ts";
import { supportsXHighEffort } from "../config/providerModels.ts";
import { prepareClaudeRequest } from "../translator/helpers/claudeHelper.ts";
import { signRequestBody } from "./claudeCodeCCH.ts";
import { remapToolNamesInRequest } from "./claudeCodeToolRemapper.ts";
import {
  enforceThinkingTemperature,
  disableThinkingIfToolChoiceForced,
  enforceCacheControlLimit,
} from "./claudeCodeConstraints.ts";
import { obfuscateInBody } from "./claudeCodeObfuscation.ts";

/**
 * `anthropic-compatible-cc-*` targets Anthropic relay gateways that only accept
 * traffic which looks like the official Claude Code client, often because those
 * gateways resell the same models at materially lower prices than the direct API.
 *
 * This bridge is intentionally compatibility-first while still preserving as
 * much Claude-native structure as possible. Third-party relays are sensitive to
 * wire-image details, so we only synthesize the minimum required defaults when
 * the caller did not already provide Claude-shaped fields.
 */
export const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";
export const CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH = "/v1/messages?beta=true";
export const CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH = "/models";
export const CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS = 64000;
export const CLAUDE_CODE_COMPATIBLE_ANTHROPIC_VERSION = ANTHROPIC_VERSION_HEADER;
export const CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA = [
  "claude-code-20250219",
  "interleaved-thinking-2025-05-14",
  "effort-2025-11-24",
].join(",");
export const CLAUDE_CODE_COMPATIBLE_VERSION = "2.1.113";
export const CLAUDE_CODE_COMPATIBLE_USER_AGENT = "claude-cli/2.1.113 (external, sdk-cli)";
export const CLAUDE_CODE_COMPATIBLE_STAINLESS_PACKAGE_VERSION = "0.81.0";
export const CLAUDE_CODE_COMPATIBLE_STAINLESS_RUNTIME_VERSION = "v24.3.0";
export const CONTEXT_1M_BETA_HEADER = "context-1m-2025-08-07";
const CLAUDE_CODE_COMPATIBLE_DEFAULT_SYSTEM_BLOCKS = [
  {
    type: "text",
    text: "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
  },
];
const CONTEXT_1M_SUPPORTED_MODELS = [
  "claude-opus-4-7",
  "claude-opus-4-6",
  "claude-sonnet-4-6",
  "claude-sonnet-4-5",
  "claude-sonnet-4",
];
export const CLAUDE_CODE_COMPATIBLE_STAINLESS_TIMEOUT_SECONDS = getStainlessTimeoutSeconds(
  process.env
);

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
  claudeBody?: Record<string, unknown> | null;
  model: string;
  stream?: boolean;
  cwd?: string;
  now?: Date;
  sessionId?: string | null;
  preserveCacheControl?: boolean;
};

function supportsClaudeXHighEffort(model: string | null | undefined): boolean {
  return typeof model === "string" && supportsXHighEffort("claude", model);
}

export function isClaudeCodeCompatibleProvider(provider: string | null | undefined): boolean {
  return typeof provider === "string" && provider.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
}

export function stripAnthropicMessagesSuffix(baseUrl: string | null | undefined): string {
  const normalized = String(baseUrl || "")
    .trim()
    .replace(/\/$/, "");
  if (!normalized) return "";
  return normalized.split("?")[0].replace(/\/messages$/i, "");
}

export function stripClaudeCodeCompatibleEndpointSuffix(
  baseUrl: string | null | undefined
): string {
  const normalized = String(baseUrl || "")
    .trim()
    .replace(/\/$/, "");
  if (!normalized) return "";
  return normalized.split("?")[0].replace(/\/(?:v\d+\/)?messages$/i, "");
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

export function appendAnthropicBetaHeader(
  headers: Record<string, string>,
  betaHeader: string
): void {
  const existingKey = Object.keys(headers).find((key) => key.toLowerCase() === "anthropic-beta");
  if (!existingKey) {
    headers["anthropic-beta"] = betaHeader;
    return;
  }

  const existingValues = String(headers[existingKey] || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!existingValues.includes(betaHeader)) {
    headers[existingKey] = [...existingValues, betaHeader].join(",");
  }
}

export function modelSupportsContext1mBeta(model: string | null | undefined): boolean {
  const normalizedModel = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/-\d{8}$/, "");

  return CONTEXT_1M_SUPPORTED_MODELS.some(
    (supported) => normalizedModel === supported || normalizedModel.startsWith(`${supported}-`)
  );
}

export function buildClaudeCodeCompatibleHeaders(
  apiKey: string,
  stream = false,
  sessionId?: string | null
): Record<string, string> {
  void stream;
  // These headers intentionally mirror Claude Code's wire image closely.
  // For CC-compatible relays, passing the upstream's client-gating checks is
  // more important than forwarding arbitrary caller-specific header shapes.
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
    "anthropic-version": CLAUDE_CODE_COMPATIBLE_ANTHROPIC_VERSION,
    "anthropic-beta": CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA,
    "anthropic-dangerous-direct-browser-access": "true",
    "x-app": "cli",
    "User-Agent": CLAUDE_CODE_COMPATIBLE_USER_AGENT,
    "X-Stainless-Retry-Count": "0",
    "X-Stainless-Timeout": String(CLAUDE_CODE_COMPATIBLE_STAINLESS_TIMEOUT_SECONDS),
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": CLAUDE_CODE_COMPATIBLE_STAINLESS_PACKAGE_VERSION,
    "X-Stainless-OS": "MacOS",
    "X-Stainless-Arch": "arm64",
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": CLAUDE_CODE_COMPATIBLE_STAINLESS_RUNTIME_VERSION,
    "accept-encoding": "gzip, deflate, br, zstd",
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
    stream: true,
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
  claudeBody,
  model,
  stream = false,
  cwd = process.cwd(),
  sessionId,
  preserveCacheControl = false,
}: BuildRequestOptions) {
  const normalized = normalizedBody || {};
  const preparedClaudeBody = claudeBody
    ? prepareClaudeCodeCompatibleBody(claudeBody, preserveCacheControl)
    : null;
  const normalizedMessages = Array.isArray(normalized.messages)
    ? (normalized.messages as MessageLike[])
    : [];
  const extractedClaudeBody =
    !preparedClaudeBody && sourceBody
      ? extractClaudeBodyFromSource(sourceBody, preserveCacheControl)
      : null;
  const effectiveClaudeBody = preparedClaudeBody || extractedClaudeBody;
  const messages = effectiveClaudeBody
    ? buildClaudeCodeCompatibleMessagesFromClaude(
        effectiveClaudeBody.messages as MessageLike[],
        preserveCacheControl
      )
    : buildClaudeCodeCompatibleMessages(normalizedMessages);
  const system = buildClaudeCodeCompatibleSystemBlocks({
    messages: normalizedMessages,
    systemBlocks: effectiveClaudeBody?.system as Record<string, unknown>[] | undefined,
    preserveCacheControl,
    injectDefaultSkeleton: !effectiveClaudeBody,
  });
  const resolvedSessionId = sessionId || randomUUID();
  const effort = resolveClaudeCodeCompatibleEffort(sourceBody, normalizedBody, model);
  const maxTokens = resolveClaudeCodeCompatibleMaxTokens(sourceBody, normalizedBody);
  const tools = preparedClaudeBody?.tools
    ? buildClaudeCodeCompatibleToolsFromClaude(
        preparedClaudeBody.tools as Record<string, unknown>[],
        preserveCacheControl
      )
    : buildClaudeCodeCompatibleTools(normalizedBody, sourceBody);
  const toolChoice =
    tools.length > 0
      ? buildClaudeCodeCompatibleToolChoice(
          normalizedBody?.["tool_choice"] ?? sourceBody?.["tool_choice"]
        )
      : undefined;
  const metadata = resolveClaudeCodeCompatibleMetadata({
    claudeBody,
    sourceBody,
    normalizedBody,
    cwd,
    sessionId: resolvedSessionId,
  });
  const thinking = resolveClaudeCodeCompatibleThinking({
    claudeBody: preparedClaudeBody ?? claudeBody,
    sourceBody,
    normalizedBody,
  });
  const outputConfig = resolveClaudeCodeCompatibleOutputConfig({
    claudeBody,
    sourceBody,
    normalizedBody,
    model,
    effort,
  });

  return {
    model,
    messages,
    system,
    tools,
    metadata,
    max_tokens: maxTokens,
    thinking,
    output_config: outputConfig,
    ...(toolChoice ? { tool_choice: toolChoice } : {}),
    ...(stream ? { stream: true } : {}),
  };
}

/**
 * Full Claude Code request processing pipeline.
 *
 * Applies all mechanisms that real Claude Code uses:
 * 1. Build base request (system prompt, billing header, messages, tools)
 * 2. Remap tool names to TitleCase
 * 3. Enforce thinking temperature constraint (temp=1)
 * 4. Disable thinking when tool_choice forces a specific tool
 * 5. Enforce 4-block cache_control limit when markers are already present
 * 6. Obfuscate sensitive words in user messages
 * 7. Serialize with CCH placeholder
 * 8. Sign body with xxHash64 CCH attestation
 *
 * Returns { bodyString, headers } ready to send upstream.
 */
export async function buildAndSignClaudeCodeRequest(
  options: BuildRequestOptions & { apiKey: string; enableObfuscation?: boolean }
): Promise<{ bodyString: string; headers: Record<string, string> }> {
  const { apiKey, enableObfuscation = false, ...buildOptions } = options;

  // Step 1: Build base request
  const body = buildClaudeCodeCompatibleRequest(buildOptions);

  // Step 2: Remap tool names
  remapToolNamesInRequest(body);

  // Step 3-4: Thinking constraints
  enforceThinkingTemperature(body);
  disableThinkingIfToolChoiceForced(body);

  // Step 5: Cache control
  enforceCacheControlLimit(body);

  // Step 6: Obfuscation (optional, per-provider setting)
  if (enableObfuscation) {
    obfuscateInBody(body);
  }

  // Step 7: Serialize with CCH placeholder
  const serialized = JSON.stringify(body);

  // Step 8: Sign with xxHash64
  const bodyString = await signRequestBody(serialized);

  // Build headers
  const sessionId = options.sessionId || resolveClaudeCodeCompatibleSessionId();
  const headers = buildClaudeCodeCompatibleHeaders(apiKey, options.stream ?? false, sessionId);

  return { bodyString, headers };
}

/**
 * Re-export for consumers that need to post-process SSE response chunks.
 */
export { remapToolNamesInResponse } from "./claudeCodeToolRemapper.ts";
export { signRequestBody } from "./claudeCodeCCH.ts";
export { computeFingerprint } from "./claudeCodeFingerprint.ts";
export { obfuscateSensitiveWords, setSensitiveWords } from "./claudeCodeObfuscation.ts";
export {
  enforceThinkingTemperature,
  disableThinkingIfToolChoiceForced,
  enforceCacheControlLimit,
} from "./claudeCodeConstraints.ts";

export function resolveClaudeCodeCompatibleEffort(
  sourceBody?: Record<string, unknown> | null,
  normalizedBody?: Record<string, unknown> | null,
  model?: string | null
): "low" | "medium" | "high" | "xhigh" {
  const raw =
    readNestedString(sourceBody, ["output_config", "effort"]) ||
    readNestedString(sourceBody, ["reasoning", "effort"]) ||
    toNonEmptyString(sourceBody?.["reasoning_effort"]) ||
    readNestedString(normalizedBody, ["output_config", "effort"]) ||
    readNestedString(normalizedBody, ["reasoning", "effort"]) ||
    toNonEmptyString(normalizedBody?.["reasoning_effort"]) ||
    "";

  const normalizedEffort = raw.toLowerCase();

  if (!normalizedEffort) {
    return supportsClaudeXHighEffort(model) ? "xhigh" : "high";
  }
  if (normalizedEffort === "low") return "low";
  if (normalizedEffort === "medium") return "medium";
  if (normalizedEffort === "high") return "high";
  if (normalizedEffort === "none" || normalizedEffort === "disabled") return "low";
  if (normalizedEffort === "xhigh") {
    return supportsClaudeXHighEffort(model) ? "xhigh" : "high";
  }
  if (normalizedEffort === "max") {
    return supportsClaudeXHighEffort(model) ? "xhigh" : "high";
  }
  return supportsClaudeXHighEffort(model) ? "xhigh" : "high";
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
      ): message is {
        role: "user" | "assistant";
        content: Array<{ type: string; text: string }>;
      } => !!message && message.content.length > 0
    );

  const merged: Array<{
    role: "user" | "assistant";
    content: Array<{ type: string; text: string }>;
  }> = [];

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
          content: [{ type: "text", text: fallbackText }],
        },
      ];
    }
  }

  return merged;
}

function buildClaudeCodeCompatibleMessagesFromClaude(
  messages: MessageLike[] | undefined,
  preserveCacheControl: boolean
) {
  const converted = Array.isArray(messages)
    ? messages
        .map((message) => convertClaudeCodeCompatibleClaudeMessage(message, preserveCacheControl))
        .filter(
          (
            message
          ): message is { role: "user" | "assistant"; content: Array<Record<string, unknown>> } =>
            !!message && message.content.length > 0
        )
    : [];

  const merged: Array<{ role: "user" | "assistant"; content: Array<Record<string, unknown>> }> = [];
  let previousAssistantHadToolUse = false;

  for (const message of converted) {
    const hasToolUse = message.content.some((block) => block.type === "tool_use");
    const hasToolResult = message.content.some((block) => block.type === "tool_result");
    const last = merged[merged.length - 1];
    const shouldKeepSeparate =
      hasToolUse ||
      hasToolResult ||
      previousAssistantHadToolUse ||
      last?.content?.some((block) => block.type === "tool_use") ||
      last?.content?.some((block) => block.type === "tool_result");

    if (last && last.role === message.role && !shouldKeepSeparate) {
      last.content.push(...message.content);
    } else {
      merged.push({ role: message.role, content: [...message.content] });
    }

    previousAssistantHadToolUse = message.role === "assistant" && hasToolUse;
  }

  while (merged.length > 0) {
    const last = merged[merged.length - 1];
    const hasToolUse = last.content.some((block) => block.type === "tool_use");
    if (last.role !== "assistant" || hasToolUse) {
      break;
    }
    merged.pop();
  }

  if (!preserveCacheControl) {
    for (const message of merged) {
      stripCacheControlFromContentBlocks(message.content);
    }
  }

  if (merged.length === 0) {
    const fallbackText = converted
      .flatMap((message) => message.content)
      .map((block) => contentToText(block))
      .filter(Boolean)
      .join("\n")
      .trim();
    if (fallbackText) {
      return [
        {
          role: "user" as const,
          content: [{ type: "text", text: fallbackText }],
        },
      ];
    }
  }

  return merged;
}

function buildClaudeCodeCompatibleSystemBlocks({
  messages,
  systemBlocks,
  preserveCacheControl,
  injectDefaultSkeleton,
}: {
  messages: MessageLike[] | undefined;
  systemBlocks?: Array<Record<string, unknown>> | undefined;
  preserveCacheControl: boolean;
  injectDefaultSkeleton: boolean;
}) {
  const customSystemBlocks =
    Array.isArray(systemBlocks) && systemBlocks.length > 0
      ? systemBlocks.map((block) => ({ ...block }))
      : extractCustomSystemBlocks(messages);

  const preparedCustomSystemBlocks = customSystemBlocks.map((systemBlock) => {
    const preparedBlock = { ...systemBlock } as Record<string, unknown>;
    if (!preserveCacheControl) {
      delete preparedBlock["cache_control"];
    }
    return preparedBlock;
  });

  if (!injectDefaultSkeleton) {
    return preparedCustomSystemBlocks;
  }

  return [
    ...CLAUDE_CODE_COMPATIBLE_DEFAULT_SYSTEM_BLOCKS.map((block) => ({ ...block })),
    ...preparedCustomSystemBlocks,
  ];
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
    .filter((tool): tool is Record<string, unknown> => !!tool)
    .map((tool) => ({ ...tool }));
}

function buildClaudeCodeCompatibleToolsFromClaude(
  tools: Record<string, unknown>[] | undefined,
  preserveCacheControl: boolean
) {
  if (!Array.isArray(tools)) return [];

  return tools.map((tool) => {
    const preparedTool = { ...tool };
    if (!preserveCacheControl) {
      delete preparedTool.cache_control;
    }
    return preparedTool;
  });
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

function prepareClaudeCodeCompatibleBody(
  claudeBody: Record<string, unknown>,
  preserveCacheControl: boolean
) {
  void preserveCacheControl;
  const prepared = prepareClaudeRequest(
    {
      system: normalizeClaudeSystemInput(claudeBody.system),
      messages: normalizeClaudeMessageInput(claudeBody.messages) as Array<{
        role?: string;
        content?: string | Array<Record<string, unknown>>;
      }>,
      tools: normalizeClaudeToolInput(claudeBody.tools),
      thinking: (readRecord(claudeBody.thinking) || null) as Record<string, unknown> | null,
    },
    CLAUDE_CODE_COMPATIBLE_PREFIX,
    true
  );

  return readRecord(prepared);
}

function extractClaudeBodyFromSource(
  sourceBody: Record<string, unknown>,
  preserveCacheControl: boolean
): Record<string, unknown> | null {
  const rawMessages = Array.isArray(sourceBody.messages)
    ? (sourceBody.messages as MessageLike[])
    : [];
  const hasSystemRoleMessages = rawMessages.some((message) => {
    const role = String(message?.role || "").toLowerCase();
    return role === "system" || role === "developer";
  });
  const hasClaudeSystem =
    typeof sourceBody.system === "string" ||
    (Array.isArray(sourceBody.system) && sourceBody.system.length > 0);

  if (!hasClaudeSystem && !hasSystemRoleMessages) {
    return null;
  }

  const normalizedMessages = rawMessages.filter((message) => {
    const role = String(message?.role || "").toLowerCase();
    return role !== "system" && role !== "developer";
  });

  return prepareClaudeCodeCompatibleBody(
    {
      ...sourceBody,
      ...(hasClaudeSystem ? {} : { system: extractCustomSystemBlocks(rawMessages) }),
      messages: normalizedMessages,
    },
    preserveCacheControl
  );
}

function normalizeClaudeSystemInput(system: unknown) {
  if (typeof system === "string") {
    const text = system.trim();
    return text ? [{ type: "text", text }] : [];
  }

  if (!Array.isArray(system)) return [];
  return system
    .map((block) => normalizeClaudeContentBlock(block))
    .filter((block): block is Record<string, unknown> => !!block);
}

function normalizeClaudeMessageInput(messages: unknown) {
  if (!Array.isArray(messages)) return [];
  return messages
    .map((message) => {
      const record = readRecord(message);
      if (!record) return null;

      return {
        ...record,
        content: normalizeClaudeContentInput(record.content),
      };
    })
    .filter((message): message is Record<string, unknown> & { content: unknown } => !!message);
}

function normalizeClaudeToolInput(tools: unknown) {
  if (!Array.isArray(tools)) return [];
  return tools
    .map((tool) => readRecord(cloneValue(tool)))
    .filter((tool): tool is Record<string, unknown> => !!tool);
}

function normalizeClaudeContentInput(content: unknown) {
  const blocks = normalizeClaudeContentBlocks(content);
  return blocks.length > 0 ? blocks : content;
}

function normalizeClaudeContentBlocks(content: unknown) {
  if (typeof content === "string") {
    const text = content.trim();
    return text ? [{ type: "text", text }] : [];
  }

  if (!Array.isArray(content)) {
    const block = normalizeClaudeContentBlock(content);
    return block ? [block] : [];
  }

  return content
    .map((block) => normalizeClaudeContentBlock(block))
    .filter((block): block is Record<string, unknown> => !!block);
}

function normalizeClaudeContentBlock(block: unknown) {
  const record = readRecord(cloneValue(block));
  if (!record) return null;

  if (
    record.type === "text" ||
    (typeof record.type !== "string" && typeof record.text === "string")
  ) {
    const text = toNonEmptyString(record.text);
    if (!text) return null;
    return {
      ...record,
      type: "text",
      text,
    };
  }

  return record;
}

function convertClaudeCodeCompatibleClaudeMessage(
  message: MessageLike | null | undefined,
  preserveCacheControl: boolean
) {
  const rawRole = String(message?.role || "").toLowerCase();
  const role = rawRole === "user" ? "user" : rawRole === "assistant" ? "assistant" : null;

  if (!role) return null;

  const content = normalizeClaudeContentBlocks(message?.content).map((block) => {
    if (preserveCacheControl) return block;
    const { cache_control, ...rest } = block;
    return rest;
  });
  if (content.length === 0) return null;

  return {
    role,
    content,
  };
}

function extractCustomSystemBlocks(messages: MessageLike[] | undefined) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => {
      const role = String(message?.role || "").toLowerCase();
      return role === "system" || role === "developer";
    })
    .map((message) => contentToText(message?.content))
    .filter(Boolean)
    .map((text) => ({
      type: "text",
      text,
    }));
}

function stripCacheControlFromContentBlocks(content: Array<Record<string, unknown>>) {
  for (const block of content) {
    delete block.cache_control;
  }
}

function resolveClaudeCodeCompatibleMetadata({
  claudeBody,
  sourceBody,
  normalizedBody,
  cwd,
  sessionId,
}: {
  claudeBody?: Record<string, unknown> | null;
  sourceBody?: Record<string, unknown> | null;
  normalizedBody?: Record<string, unknown> | null;
  cwd: string;
  sessionId: string;
}) {
  const metadata =
    readRecord(cloneValue(claudeBody?.metadata)) ||
    readRecord(cloneValue(sourceBody?.metadata)) ||
    readRecord(cloneValue(normalizedBody?.metadata)) ||
    {};

  if (!toNonEmptyString(metadata.user_id)) {
    metadata.user_id = JSON.stringify({
      device_id: createHash("sha256")
        .update(String(cwd || ""))
        .digest("hex"),
      account_uuid: "",
      session_id: sessionId,
    });
  }

  return metadata;
}

function resolveClaudeCodeCompatibleThinking({
  claudeBody,
  sourceBody,
  normalizedBody,
}: {
  claudeBody?: Record<string, unknown> | null;
  sourceBody?: Record<string, unknown> | null;
  normalizedBody?: Record<string, unknown> | null;
}) {
  const thinking =
    readRecord(cloneValue(claudeBody?.thinking)) ||
    readRecord(cloneValue(sourceBody?.thinking)) ||
    readRecord(cloneValue(normalizedBody?.thinking));

  if (thinking) {
    return thinking;
  }

  return {
    type: "adaptive",
  };
}

function resolveClaudeCodeCompatibleOutputConfig({
  claudeBody,
  sourceBody,
  normalizedBody,
  model,
  effort,
}: {
  claudeBody?: Record<string, unknown> | null;
  sourceBody?: Record<string, unknown> | null;
  normalizedBody?: Record<string, unknown> | null;
  model?: string | null;
  effort: "low" | "medium" | "high" | "xhigh";
}) {
  const outputConfig =
    readRecord(cloneValue(claudeBody?.output_config)) ||
    readRecord(cloneValue(sourceBody?.output_config)) ||
    readRecord(cloneValue(normalizedBody?.output_config)) ||
    {};

  return {
    ...outputConfig,
    effort: resolveClaudeCodeCompatibleEffort(sourceBody, normalizedBody, model) || effort,
  };
}

function cloneValue<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
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
