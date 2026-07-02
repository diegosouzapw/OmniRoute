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
    thinking_mode: "off",
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
 * Transform Claude Web response to OpenAI format
 */
export function transformFromClaude(
  claudeContent: string,
  model: string,
  stopReason?: string
): Record<string, unknown> {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        delta: {
          content: claudeContent,
        },
        finish_reason: stopReason === "end_turn" ? "stop" : null,
        logprobs: null,
      },
    ],
  };
}
