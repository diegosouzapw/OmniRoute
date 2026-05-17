import { normalizeSessionCookieHeader, extractCookieValue } from "../webCookieAuth";

/**
 * Claude Web Provider Types
 * Based on real Claude Web API structure captured from browser Network tab
 *
 * Real API Endpoint:
 *   POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{convId}/completion
 *
 * Authentication:
 *   - Cookie header with sessionKey and other session cookies
 *   - anthropic-device-id header (UUID)
 *   - anthropic-client-platform: web_claude_ai
 *   - Cloudflare cookies (cf_clearance, __cf_bm, _cfuvid)
 */

export interface ClaudeWebConfig {
  cookie: string;
  deviceId?: string;
  orgId?: string;
  conversationId?: string;
  model?: string;
}

/**
 * Full request payload matching real Claude Web API format
 */
export interface ClaudeWebRequest {
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
  files: unknown[];
  sync_sources: unknown[];
  rendering_mode: string;
  create_conversation_params: {
    name: string;
    model: string;
    include_conversation_preferences: boolean;
    paprika_mode: unknown;
    compass_mode: unknown;
    is_temporary: boolean;
    enabled_imagine: boolean;
  };
}

export interface ClaudeWebResponse {
  completion?: string;
  stop_reason?: string;
  model?: string;
  delta?: {
    type?: string;
    text?: string;
  };
  [key: string]: unknown;
}

export interface ClaudeWebStreamingChunk {
  type?: string;
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
 * Utility to resolve the cookie for Claude Web
 * Claude web primarily uses 'sessionKey' cookie for authentication
 */
export function resolveClaudeWebCookie(rawValue: string): string {
  const cookieName = "sessionKey";
  // If the value is just the cookie value, normalize it
  // If it's a blob, extract the specific cookie
  return normalizeSessionCookieHeader(rawValue, cookieName);
}

export function getClaudeWebToken(rawValue: string): string {
  return extractCookieValue(rawValue, "sessionKey");
}

/**
 * API info for Claude Web completion endpoint
 *
 * Notes:
 *   - Requires cf_clearance cookie from Cloudflare Turnstile
 *   - Organization ID obtained from /api/organizations endpoint
 *   - Conversation ID can be new UUID or existing conversation
 *   - Device ID should be persisted across sessions
 */
export const CLAUDE_WEB_API_INFO = {
  baseUrl: "https://claude.ai/api",
  // Dynamic endpoint: /organizations/{orgId}/chat_conversations/{convId}/completion
  chatPathTemplate: "/organizations/:orgId/chat_conversations/:convId/completion",
  organizationsPath: "/organizations",
  sessionPath: "/auth/session",
  apiKeyHeader: "Cookie",
  requiredHeaders: {
    "anthropic-client-platform": "web_claude_ai",
    "anthropic-device-id": "{deviceId}",
    Referer: "https://claude.ai/new",
    Accept: "text/event-stream",
  },
  requiredCookies: [
    "sessionKey", // Main authentication
    "routingHint", // Anthropic routing
    "__cf_bm", // Cloudflare bot management
    "_cfuvid", // Cloudflare visitor ID
    "cf_clearance", // Cloudflare Turnstile clearance (REQUIRED)
  ],
} as const;
