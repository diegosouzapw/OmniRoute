/**
 * ClaudeWebExecutor — Claude Web Session Provider
 *
 * Routes requests through Claude's web interface using session credentials,
 * translating between OpenAI chat completions format and Claude's real API format.
 *
 * Real API Structure:
 *   Endpoint: https://claude.ai/api/organizations/{orgId}/chat_conversations/{convId}/completion
 *   Method: POST
 *   Content-Type: application/json
 *   Accept: text/event-stream
 *
 * Auth pipeline (per request):
 *   1. Extract session cookie and device ID from credentials
 *   2. Build conversation URL with orgId and convId
 *   3. Construct full request payload with model, tools, UUID references
 *   4. Make authenticated POST request to Claude Web API
 *   5. Handle SSE response stream with proper message parsing
 *
 * Response is streamed as server-sent events (SSE format).
 */
import { BaseExecutor, mergeAbortSignals, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { tlsFetchClaude } from "../services/claudeTlsClient.ts";
import { createAutoRefreshMiddleware, refreshCookie } from "../services/claudeWebAutoRefresh.ts";
import { getCfClearanceToken, getCacheStatus } from "../services/claudeTurnstileSolver.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { randomUUID } from "crypto";

// ─── Constants ──────────────────────────────────────────────────────────────
const CLAUDE_WEB_API_BASE = "https://claude.ai/api";
const CLAUDE_WEB_ORGS_URL = `${CLAUDE_WEB_API_BASE}/organizations`;

const CLAUDE_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Session cookie constants
const CLAUDE_SESSION_COOKIE_NAME = "sessionKey";

// Default model when not specified
const DEFAULT_CLAUDE_MODEL = "claude-sonnet-4-6";

// ─── Types ──────────────────────────────────────────────────────────────────
/**
 * Extended credentials to include organization and conversation context
 */
interface ClaudeWebCredentials {
  cookie: string;
  deviceId?: string;
  orgId?: string;
  conversationId?: string;
}

/**
 * Full request payload matching real Claude Web API format
 */
interface ClaudeWebRequestPayload {
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

/**
 * Stream chunk from Claude Web API
 */
interface ClaudeWebStreamChunk {
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

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Build browser-like headers for Claude Web API
 */
function getBrowserHeaders(deviceId?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "text/event-stream",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Origin: "https://claude.ai",
    Pragma: "no-cache",
    Referer: "https://claude.ai/new",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": CLAUDE_USER_AGENT,
    // Anthropic-specific headers
    "anthropic-client-platform": "web_claude_ai",
  };

  if (deviceId) {
    headers["anthropic-device-id"] = deviceId;
  }

  return headers;
}

/**
 * Normalize cookie header for Claude Web API
 */
function normalizeClaudeSessionCookie(rawValue: string): string {
  return normalizeSessionCookieHeader(rawValue, CLAUDE_SESSION_COOKIE_NAME);
}
/**
 * Normalize cookie and auto-inject cf_clearance if missing
 */
async function normalizeClaudeSessionCookieWithAutoRefresh(
  rawValue: string,
  options?: { allowAutoSolve?: boolean; log?: any }
): Promise<string> {
  let normalized = normalizeClaudeSessionCookie(rawValue);

  // Check if cf_clearance is already in the cookie
  if (normalized.includes("cf_clearance=")) {
    return normalized;
  }

  // If auto-solve is enabled, try to solve Turnstile and get fresh cf_clearance
  if (options?.allowAutoSolve !== false) {
    try {
      options?.log?.info?.("CLAUDE-WEB", "cf_clearance missing, attempting to solve Turnstile...");
      const cfClearance = await getCfClearanceToken();

      // Append cf_clearance to existing cookies
      const cfCookie = `cf_clearance=${cfClearance}`;
      normalized = normalized ? `${normalized}; ${cfCookie}` : cfCookie;

      options?.log?.info?.("CLAUDE-WEB", "cf_clearance injected successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Continue anyway - request might fail, but that's OK
    }
  }

  return normalized;
}

/**
 * Generate UUIDs for turn message tracking
 */
function generateMessageUUIDs() {
  return {
    human_message_uuid: randomUUID(),
    assistant_message_uuid: randomUUID(),
  };
}

/**
 * Get default tool definitions for Claude Web API
 */
function getDefaultTools(): ClaudeWebRequestPayload["tools"] {
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
  ];
}

/**
 * Get default personalized style
 */
function getDefaultPersonalizedStyle(): ClaudeWebRequestPayload["personalized_styles"] {
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
function transformToClaude(body: Record<string, unknown>, model: string): ClaudeWebRequestPayload {
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
    files: [],
    sync_sources: [],
    rendering_mode: "messages",
    create_conversation_params: {
      name: "",
      model: model || DEFAULT_CLAUDE_MODEL,
      include_conversation_preferences: true,
      paprika_mode: null,
      compass_mode: null,
      is_temporary: false,
      enabled_imagine: true,
    },
  };
}

/**
 * Transform Claude Web response to OpenAI format
 */
function transformFromClaude(
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

/**
 * Verify session is still valid by checking if the organizations endpoint
 * returns a successful response. Claude's API does not have a /api/auth/session
 * endpoint (unlike ChatGPT), so we use /api/organizations which requires a
 * valid session cookie and returns 200 only with valid credentials.
 */
async function verifyCookieValidity(
  cookieHeader: string,
  deviceId: string | undefined,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;
    const response = await tlsFetchClaude(CLAUDE_WEB_ORGS_URL, {
      method: "GET",
      headers: {
        ...getBrowserHeaders(deviceId),
        Cookie: cookieHeader,
      },
      timeoutMs: FETCH_TIMEOUT_MS,
      signal: combinedSignal,
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

/**
 * Get user's organization ID from session
 */
async function getOrganizationId(
  cookieHeader: string,
  deviceId: string | undefined,
  signal?: AbortSignal
): Promise<string | null> {
  try {
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    const response = await tlsFetchClaude(CLAUDE_WEB_ORGS_URL, {
      method: "GET",
      headers: {
        ...getBrowserHeaders(deviceId),
        Cookie: cookieHeader,
      },
      timeoutMs: FETCH_TIMEOUT_MS,
      signal: combinedSignal,
    });
    if (response.status !== 200) {
      return null;
    }
    const data = JSON.parse(response.text ?? "[]") as Array<{
      id: string;
      uuid?: string;
      [key: string]: unknown;
    }>;
    return data?.[0]?.uuid || data?.[0]?.id || null;
  } catch (error) {
    return null;
  }
}

// ─── Main Executor Class ────────────────────────────────────────────────────

export class ClaudeWebExecutor extends BaseExecutor {
  constructor() {
    super("claude-web", {
      baseUrl: CLAUDE_WEB_API_BASE,
    });
  }

  /**
   * Test connection to Claude Web API
   */
  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const rawCookie = String((credentials as any)?.cookie || "");
      if (!rawCookie.trim()) {
        return false;
      }

      const cookieHeader = normalizeClaudeSessionCookie(rawCookie);
      const deviceId = (credentials as any)?.deviceId as string | undefined;

      return await verifyCookieValidity(cookieHeader, deviceId, signal);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user's organization ID from session
   */
  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body || {}) as Record<string, unknown>;

    try {
      // Validate input
      if (!credentials || typeof credentials !== "object") {
        const errorResp = new Response(
          JSON.stringify({
            error: {
              message: "Invalid credentials",
              type: "invalid_request_error",
            },
          }),
          {
            status: 400,
            statusText: "Bad Request",
            headers: { "Content-Type": "application/json" },
          }
        );
        return {
          response: errorResp,
          url: "",
          headers: {},
          transformedBody: bodyObj,
        };
      }

      const rawCookie = String((credentials as any)?.cookie || "");
      if (!rawCookie.trim()) {
        const errorResp = new Response(
          JSON.stringify({
            error: {
              message: "Missing session cookie",
              type: "authentication_error",
            },
          }),
          {
            status: 401,
            statusText: "Unauthorized",
            headers: { "Content-Type": "application/json" },
          }
        );
        return {
          response: errorResp,
          url: "",
          headers: {},
          transformedBody: bodyObj,
        };
      }

      const cookieHeader = normalizeClaudeSessionCookie(rawCookie);
      const deviceId = (credentials as any)?.deviceId as string | undefined;

      // Transform request to Claude format
      let claudePayload: ClaudeWebRequestPayload;
      try {
        claudePayload = transformToClaude(bodyObj, model);
      } catch (transformError) {
        const errorResp = new Response(
          JSON.stringify({
            error: {
              message:
                transformError instanceof Error ? transformError.message : "Invalid request format",
              type: "invalid_request_error",
            },
          }),
          {
            status: 400,
            statusText: "Bad Request",
            headers: { "Content-Type": "application/json" },
          }
        );
        return {
          response: errorResp,
          url: "",
          headers: {},
          transformedBody: bodyObj,
        };
      }

      // Get organization and conversation IDs
      let orgId = (credentials as any)?.orgId as string | undefined;
      let conversationId = (credentials as any)?.conversationId as string | undefined;

      if (!orgId) {
        orgId = await getOrganizationId(cookieHeader, deviceId, signal);
        if (!orgId) {
          log?.warn?.("CLAUDE-WEB", "Could not retrieve organization ID, using fallback");
          // Fallback: use empty org ID, API might create conversation
          orgId = "";
        }
      }

      if (!conversationId) {
        // Generate a new conversation ID if not provided
        conversationId = randomUUID();
      }

      // Build completion URL
      const completionUrl =
        orgId && conversationId
          ? `${CLAUDE_WEB_API_BASE}/organizations/${orgId}/chat_conversations/${conversationId}/completion`
          : `${CLAUDE_WEB_API_BASE}/chat_conversations/new/completion`;

      // Prepare headers
      const headers = getBrowserHeaders(deviceId);

      // Prepare request
      const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
      const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

      log?.debug?.("CLAUDE-WEB", `Making request to ${completionUrl}`);

      // Inject cf_clearance before calling tlsFetchClaude

      const fetchResponse = await tlsFetchClaude(completionUrl, {
        method: "POST",
        headers: {
          ...headers,
          Cookie: cookieHeader,
        },
        body: JSON.stringify(claudePayload),
        timeoutMs: FETCH_TIMEOUT_MS,
        stream: true,
        signal: combinedSignal,
      });

      // Handle errors
      if (fetchResponse.status < 200 || fetchResponse.status >= 300) {
        log?.error?.("CLAUDE-WEB", `HTTP ${fetchResponse.status}`);

        if (fetchResponse.status === 401) {
          const errorResp = new Response(
            JSON.stringify({
              error: {
                message: "Session expired or invalid",
                type: "authentication_error",
              },
            }),
            {
              status: 401,
              statusText: "Unauthorized",
              headers: { "Content-Type": "application/json" },
            }
          );
          return {
            response: errorResp,
            url: completionUrl,
            headers,
            transformedBody: claudePayload,
          };
        }

        if (fetchResponse.status === 429) {
          const errorResp = new Response(
            JSON.stringify({
              error: {
                message: "Rate limited by Claude Web API",
                type: "rate_limit_error",
              },
            }),
            {
              status: 429,
              statusText: "Too Many Requests",
              headers: { "Content-Type": "application/json" },
            }
          );
          return {
            response: errorResp,
            url: completionUrl,
            headers,
            transformedBody: claudePayload,
          };
        }

        const errorText = fetchResponse.text || "";
        const errorResp = new Response(
          JSON.stringify({
            error: {
              message: `Claude Web API error: ${errorText}`,
              type: "api_error",
            },
          }),
          {
            status: fetchResponse.status,
            statusText: "HTTP Error",
            headers: { "Content-Type": "application/json" },
          }
        );
        return {
          response: errorResp,
          url: completionUrl,
          headers,
          transformedBody: claudePayload,
        };
      }

      // Stream the response
      const responseStream = new ReadableStream({
        async start(controller) {
          try {
            const reader = fetchResponse.body?.getReader();
            if (!reader) {
              controller.error(new Error("No response body"));
              return;
            }

            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });

              // Process complete lines
              const lines = buffer.split("\n");
              buffer = lines.pop() || ""; // Keep incomplete line in buffer

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || trimmed === "[DONE]") continue;

                if (trimmed.startsWith("data: ")) {
                  const jsonStr = trimmed.slice(6); // Remove "data: " prefix
                  try {
                    const chunk = JSON.parse(jsonStr) as ClaudeWebStreamChunk;

                    // Extract completion text from various possible formats
                    let completionText = "";
                    if (chunk.completion) {
                      completionText = chunk.completion;
                    } else if (chunk.delta?.text) {
                      completionText = chunk.delta.text;
                    }

                    if (completionText) {
                      const openaiChunk = transformFromClaude(
                        completionText,
                        model,
                        chunk.stop_reason
                      );
                      const sseContent = `data: ${JSON.stringify(openaiChunk)}\n\n`;
                      controller.enqueue(new TextEncoder().encode(sseContent));
                    }
                  } catch (parseError) {
                    log?.warn?.(
                      "CLAUDE-WEB",
                      `Failed to parse stream chunk: ${JSON.stringify({ line: trimmed })}`
                    );
                  }
                }
              }
            }

            // Finish the stream
            const finalChunk = {
              id: `chatcmpl-${Date.now()}`,
              object: "chat.completion.chunk",
              created: Math.floor(Date.now() / 1000),
              model,
              choices: [
                {
                  index: 0,
                  delta: {},
                  finish_reason: "stop",
                  logprobs: null,
                },
              ],
            };
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(finalChunk)}\n\n`));
            controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
            controller.close();
          } catch (error) {
            log?.error?.(
              "CLAUDE-WEB",
              `Stream error: ${error instanceof Error ? error.message : String(error)}`
            );
            controller.error(error);
          }
        },
      });

      const finalResponse = new Response(responseStream, {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });

      return {
        response: finalResponse,
        url: completionUrl,
        headers,
        transformedBody: claudePayload,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log?.error?.("CLAUDE-WEB", `Fetch failed: ${errorMessage}`);

      const errorResp = new Response(
        JSON.stringify({
          error: {
            message: `Claude Web connection failed: ${errorMessage}`,
            type: "api_connection_error",
          },
        }),
        {
          status: 500,
          statusText: "Internal Server Error",
          headers: { "Content-Type": "application/json" },
        }
      );

      return {
        response: errorResp,
        url: "",
        headers: {},
        transformedBody: bodyObj,
      };
    }
  }
}
