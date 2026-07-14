// Pure Claude-web payload construction (types + transforms + default tools/style).
// Extracted verbatim from claude-web.ts. No host state, no fetch/auth.
import { randomUUID } from "crypto";

// Default model when not specified
export const DEFAULT_CLAUDE_MODEL = "claude-sonnet-4-6";

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
    human_message_uuid: string;
    assistant_message_uuid: string;
  };
  attachments: unknown[];
  effort: string;
  files: unknown[];
  sync_sources: unknown[];
  rendering_mode: string;
  thinking_mode: string;
  create_conversation_params: {
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
 * Get default tool definitions for Claude Web API
 */
export function getDefaultTools(): ClaudeWebRequestPayload["tools"] {
  return [
    {
      name: "show_widget",
      description: "Display interactive widgets and visualizations",
      input_schema: {
        type: "object",
        properties: {
          widget_type: {
            type: "string",
            description: "Type of widget to display",
          },
        },
      },
      integration_name: "visualize",
      is_mcp_app: true,
    },
    {
      name: "read_me",
      description: "Read and reference documents",
      input_schema: {
        type: "object",
        properties: {
          file_path: {
            type: "string",
            description: "Path to the file to read",
          },
        },
      },
      integration_name: "visualize",
      is_mcp_app: false,
    },
    {
      type: "web_search_v0",
      name: "web_search",
    },
    {
      type: "artifacts_v0",
      name: "artifacts",
    },
    {
      type: "repl_v0",
      name: "repl",
    },
    { type: "widget", name: "weather_fetch" },
    { type: "widget", name: "recipe_display_v0" },
    { type: "widget", name: "places_map_display_v0" },
    { type: "widget", name: "message_compose_v1" },
    { type: "widget", name: "ask_user_input_v0" },
    { type: "widget", name: "recommend_claude_apps" },
    { type: "widget", name: "places_search" },
    { type: "widget", name: "fetch_sports_data" },
  ];
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
  const reasoning =
    body.reasoning && typeof body.reasoning === "object" && !Array.isArray(body.reasoning)
      ? (body.reasoning as Record<string, unknown>)
      : null;
  const effort = body.reasoning_effort ?? reasoning?.effort;
  if (typeof effort === "string" && effort.trim() && effort.toLowerCase() !== "none") {
    return true;
  }
  const thinking = body.thinking;
  if (thinking && typeof thinking === "object" && !Array.isArray(thinking)) {
    if ((thinking as Record<string, unknown>).type === "enabled") return true;
  }
  return false;
}

/**
 * Transform OpenAI format to Claude Web format
 */
export function transformToClaude(
  body: Record<string, unknown>,
  model: string
): ClaudeWebRequestPayload {
  const messages = Array.isArray(body.messages) ? body.messages : [];

  // Extract the last user message as the prompt
  let prompt = "";
  for (const msg of messages) {
    if (typeof msg === "object" && msg !== null) {
      const message = msg as Record<string, unknown>;
      if (message.role === "user") {
        prompt = String(message.content || "");
      }
    }
  }

  if (!prompt.trim()) {
    throw new Error("No user message found in request");
  }

  return {
    prompt,
    model: model || DEFAULT_CLAUDE_MODEL,
    timezone: "Asia/Jakarta",
    personalized_styles: getDefaultPersonalizedStyle(),
    locale: "en-US",
    tools: getDefaultTools(),
    turn_message_uuids: generateMessageUUIDs(),
    attachments: [],
    effort: "low",
    files: [],
    sync_sources: [],
    rendering_mode: "messages",
    thinking_mode: wantsExtendedThinking(body) ? "on" : "off",
    create_conversation_params: {
      name: "",
      model: model || DEFAULT_CLAUDE_MODEL,
      include_conversation_preferences: true,
      paprika_mode: null,
      compass_mode: null,
      is_temporary: false,
      enabled_imagine: true,
      tool_search_mode: "auto",
    },
  };
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
