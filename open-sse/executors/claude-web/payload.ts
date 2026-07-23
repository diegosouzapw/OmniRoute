// Pure Claude-web payload construction (types + transforms + default tools/style).
// Extracted verbatim from claude-web.ts. No host state, no fetch/auth.
import { randomUUID } from "crypto";

// Default model when not specified
export const DEFAULT_CLAUDE_MODEL = "claude-sonnet-4-6";

export type ClaudeWebOperation = "completion" | "retry_completion";

export interface ClaudeWebTurnFields {
  operation: ClaudeWebOperation;
  prompt: string;
  timezone: string;
  locale: string;
  parentMessageUuid?: string;
  humanMessageUuid?: string;
  assistantMessageUuid: string;
  isNewConversation: boolean;
  toolStates?: unknown[];
}

export interface ClaudeWebRequestPayload {
  prompt: string;
  model: string;
  timezone: string;
  personalized_styles: Array<{
    type: string;
    key: string;
    name: string;
    nameKey: string;
    prompt: string;
    summary: string;
    summaryKey: string;
    isDefault: boolean;
  }>;
  locale: string;
  tools: Array<{
    name?: string;
    description?: string;
    input_schema?: Record<string, unknown>;
    integration_name?: string;
    is_mcp_app?: boolean;
    type?: string;
  }>;
  turn_message_uuids: {
    human_message_uuid?: string;
    assistant_message_uuid: string;
  };
  parent_message_uuid?: string;
  attachments: unknown[];
  effort: string;
  files: unknown[];
  sync_sources: unknown[];
  rendering_mode: string;
  thinking_mode: string;
  tool_states?: unknown[];
  create_conversation_params?: {
    name: string;
    model: string;
    include_conversation_preferences: boolean;
    paprika_mode: unknown;
    compass_mode: unknown;
    is_temporary: boolean;
    enabled_imagine: boolean;
    tool_search_mode: string;
  };
}

/**
 * Stream chunk from Claude Web API
 */
export interface ClaudeWebStreamChunk {
  type?: string;
  index?: number;
  completion?: string;
  stop_reason?: string | null;
  model?: string;
  delta?: {
    type?: string;
    text?: string;
  };
  [key: string]: unknown;
}

type ClaudeWebTool = ClaudeWebRequestPayload["tools"][number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function transformOpenAiTool(candidate: unknown): ClaudeWebTool | null {
  if (!isRecord(candidate) || candidate.type !== "function" || !isRecord(candidate.function)) {
    return null;
  }

  const definition = candidate.function;
  if (typeof definition.name !== "string" || !definition.name.trim()) return null;

  const description =
    typeof definition.description === "string" && definition.description.trim()
      ? definition.description
      : undefined;
  const schemaCandidate = definition.parameters ?? definition.input_schema;
  const inputSchema = isRecord(schemaCandidate) ? schemaCandidate : undefined;

  return {
    name: definition.name.trim(),
    ...(description ? { description } : {}),
    ...(inputSchema ? { input_schema: inputSchema } : {}),
  };
}

/**
 * Generate UUIDs for turn message tracking
 */
export function generateMessageUUIDs() {
  return {
    human_message_uuid: randomUUID(),
    assistant_message_uuid: randomUUID(),
  };
}

/**
 * Convert caller-provided OpenAI function tools to Claude Web tool definitions.
 *
 * Claude's own browser tools are account- and rollout-dependent. Inventing a
 * static list makes the request diverge from the authenticated UI, so only
 * explicit, structurally valid caller tools are forwarded here.
 */
export function transformOpenAiTools(tools: unknown): ClaudeWebRequestPayload["tools"] {
  if (!Array.isArray(tools)) return [];

  const transformed: ClaudeWebRequestPayload["tools"] = [];
  for (const candidate of tools) {
    const transformedTool = transformOpenAiTool(candidate);
    if (transformedTool) transformed.push(transformedTool);
  }

  return transformed;
}

/**
 * Get default personalized style
 */
export function getDefaultPersonalizedStyle(): ClaudeWebRequestPayload["personalized_styles"] {
  return [
    {
      type: "default",
      key: "Default",
      name: "Normal",
      nameKey: "normal_style_name",
      prompt: "Normal\n",
      summary: "Default responses from Claude",
      summaryKey: "normal_style_summary",
      isDefault: true,
    },
  ];
}

/**
 * Detect whether an OpenAI-shape request body signals a desire for
 * reasoning / extended thinking — a top-level `reasoning_effort` string,
 * a Responses-API-style `reasoning.effort`, or a native Claude
 * `thinking: { type: "enabled" }` passthrough. Mirrors the same
 * effort-extraction shape used by `sanitizeReasoningEffortForProvider`
 * (open-sse/executors/base/reasoningEffort.ts) so a client already setting
 * reasoning_effort for other providers gets the same signal here.
 *
 * Before this, `transformToClaude` hardcoded `thinking_mode: "off"` —
 * Claude Web could never be asked for extended thinking, and any
 * `thinking_delta` reasoning the upstream might otherwise emit was moot
 * because it was never requested in the first place (#6662).
 */
export function wantsExtendedThinking(body: Record<string, unknown>): boolean {
  return resolveClaudeWebReasoningEffort(body) !== null;
}

const CLAUDE_WEB_REASONING_EFFORTS = ["low", "medium", "high", "xhigh", "max"] as const;

/**
 * Resolve the caller's explicit reasoning level into the effort values
 * accepted by Claude Web. An explicit `none` disables thinking, while a
 * native `thinking: { type: "enabled" }` request uses the existing low
 * default when no graduated effort was supplied.
 */
export function resolveClaudeWebReasoningEffort(
  body: Record<string, unknown>
): (typeof CLAUDE_WEB_REASONING_EFFORTS)[number] | null {
  const reasoning =
    body.reasoning && typeof body.reasoning === "object" && !Array.isArray(body.reasoning)
      ? (body.reasoning as Record<string, unknown>)
      : null;
  const effort = body.reasoning_effort ?? reasoning?.effort;
  if (typeof effort === "string" && effort.trim()) {
    const normalized = effort.trim().toLowerCase();
    if (normalized === "none") return null;
    if ((CLAUDE_WEB_REASONING_EFFORTS as readonly string[]).includes(normalized)) {
      return normalized as (typeof CLAUDE_WEB_REASONING_EFFORTS)[number];
    }
  }
  const thinking = body.thinking;
  if (thinking && typeof thinking === "object" && !Array.isArray(thinking)) {
    if ((thinking as Record<string, unknown>).type === "enabled") return "low";
  }
  return null;
}

function contentPartText(part: unknown): string {
  if (!isRecord(part)) return "";
  return typeof part.text === "string" ? part.text : "";
}

function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content.map(contentPartText).filter(Boolean).join("\n");
}

function latestUserPrompt(messages: unknown[]): string {
  let prompt = "";
  for (const candidate of messages) {
    if (!isRecord(candidate) || candidate.role !== "user") continue;
    prompt = messageText(candidate.content);
  }
  return prompt;
}

function defaultTurn(prompt: string): ClaudeWebTurnFields {
  const messageUuids = generateMessageUUIDs();
  return {
    operation: "completion",
    prompt,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    locale: "en-US",
    humanMessageUuid: messageUuids.human_message_uuid,
    assistantMessageUuid: messageUuids.assistant_message_uuid,
    isNewConversation: true,
  };
}

function createConversationParams(model: string) {
  return {
    name: "",
    model,
    include_conversation_preferences: true,
    paprika_mode: null,
    compass_mode: null,
    is_temporary: false,
    enabled_imagine: true,
    tool_search_mode: "auto",
  };
}

function buildClaudeWebPayload(
  body: Record<string, unknown>,
  model: string,
  reasoningEffort: ReturnType<typeof resolveClaudeWebReasoningEffort>,
  turn: ClaudeWebTurnFields
): ClaudeWebRequestPayload {
  return {
    prompt: turn.prompt,
    model,
    timezone: turn.timezone,
    personalized_styles: getDefaultPersonalizedStyle(),
    locale: turn.locale,
    tools: transformOpenAiTools(body.tools),
    turn_message_uuids: {
      ...(turn.humanMessageUuid ? { human_message_uuid: turn.humanMessageUuid } : {}),
      assistant_message_uuid: turn.assistantMessageUuid,
    },
    ...(turn.parentMessageUuid ? { parent_message_uuid: turn.parentMessageUuid } : {}),
    attachments: [],
    effort: reasoningEffort ?? "low",
    files: [],
    sync_sources: [],
    rendering_mode: "messages",
    thinking_mode: reasoningEffort ? "extended" : "off",
    ...(turn.toolStates ? { tool_states: turn.toolStates } : {}),
    ...(turn.isNewConversation
      ? { create_conversation_params: createConversationParams(model) }
      : {}),
  };
}

/**
 * Transform OpenAI format to Claude Web format
 */
export function transformToClaude(
  body: Record<string, unknown>,
  model: string,
  turn?: ClaudeWebTurnFields
): ClaudeWebRequestPayload {
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const reasoningEffort = resolveClaudeWebReasoningEffort(body);
  const resolvedModel = model || DEFAULT_CLAUDE_MODEL;
  const resolvedTurn = turn ?? defaultTurn(latestUserPrompt(messages));

  if (resolvedTurn.operation === "completion" && !resolvedTurn.prompt.trim()) {
    throw new Error("No user message found in request");
  }

  return buildClaudeWebPayload(body, resolvedModel, reasoningEffort, resolvedTurn);
}

/**
 * Transform Claude Web response to OpenAI format.
 *
 * `kind` selects which delta field carries `claudeContent`: `"content"`
 * (default, preserves the original call sites) or `"reasoning"` — the
 * latter maps Claude's `thinking_delta` text onto `delta.reasoning_content`,
 * the same field the real-Anthropic-API translator uses
 * (open-sse/translator/response/claude-to-openai.ts) so downstream clients
 * (Claude Code, Cursor, etc.) render it as the thinking panel instead of
 * silently dropping it (#6662).
 */
export function transformFromClaude(
  claudeContent: string,
  model: string,
  stopReason?: string,
  kind: "content" | "reasoning" = "content"
): Record<string, unknown> {
  const delta: Record<string, string> =
    kind === "reasoning" ? { reasoning_content: claudeContent } : { content: claudeContent };
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        delta,
        finish_reason: stopReason === "end_turn" ? "stop" : null,
        logprobs: null,
      },
    ],
  };
}
