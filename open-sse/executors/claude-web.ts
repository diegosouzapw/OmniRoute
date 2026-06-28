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
import { getCfClearanceToken } from "../services/claudeTurnstileSolver.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { randomUUID } from "crypto";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { tryBackedChat } from "../services/browserBackedChat.ts";

// ─── Constants ──────────────────────────────────────────────────────────────
const CLAUDE_WEB_API_BASE = "https://claude.ai/api";
const CLAUDE_WEB_ORGS_URL = `${CLAUDE_WEB_API_BASE}/organizations`;

const CLAUDE_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

// Session cookie constants
const CLAUDE_SESSION_COOKIE_NAME = "sessionKey";

/**
 * Read the Claude Web session cookie from the credentials object.
 *
 * Lookup order (most-specific first):
 *   1. `credentials.cookie` — direct field (programmatic / older callers)
 *   2. `credentials.apiKey` — what the dashboard form posts (the
 *      connection row's `api_key` column stores the cookie string after
 *      encryption; `getProviderCredentials()` decrypts and surfaces it
 *      back as `apiKey`)
 *   3. `credentials.providerSpecificData.cookie` — escape hatch for
 *      callers that route the cookie through the per-provider metadata
 *
 * Without the apiKey fallback, the executor could never see a real
 * cookie through the standard /api/v1/chat/completions path — the
 * dashboard posts the cookie in the connection's `apiKey` field, but
 * this executor was historically reading `cookie` only.
 */
function readClaudeWebCookie(credentials: unknown): string {
  if (!credentials || typeof credentials !== "object") return "";
  const c = credentials as Record<string, unknown>;
  const direct = typeof c.cookie === "string" ? c.cookie : "";
  if (direct.trim()) return direct;
  const apiKey = typeof c.apiKey === "string" ? c.apiKey : "";
  if (apiKey.trim()) return apiKey;
  const psd = c.providerSpecificData;
  if (psd && typeof psd === "object") {
    const nested = (psd as Record<string, unknown>).cookie;
    if (typeof nested === "string" && nested.trim()) return nested;
  }
  return "";
}

/**
 * Read the optional Claude Web device ID from the credentials object.
 * Mirrors `readClaudeWebCookie` so callers can use the same priority
 * chain (direct → apiKey → providerSpecificData).
 */
function readClaudeWebDeviceId(credentials: unknown): string | undefined {
  if (!credentials || typeof credentials !== "object") return undefined;
  const c = credentials as Record<string, unknown>;
  if (typeof c.deviceId === "string" && c.deviceId.trim()) return c.deviceId;
  const psd = c.providerSpecificData;
  if (psd && typeof psd === "object") {
    const nested = (psd as Record<string, unknown>).deviceId;
    if (typeof nested === "string" && nested.trim()) return nested;
  }
  return undefined;
}

// Default model when not specified
const DEFAULT_CLAUDE_MODEL = "claude-sonnet-4-6";

// ─── Types ──────────────────────────────────────────────────────────────────
/**
 * Extended credentials to include organization and conversation context
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
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Origin: "https://claude.ai",
    Pragma: "no-cache",
    Priority: "u=1, i",
    Referer: "https://claude.ai/new",
    "Sec-Ch-Ua": '"Chromium";v="149", "Not-A.Brand";v="24", "Google Chrome";v="149"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Linux"',
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
      options?.log?.warn?.("CLAUDE-WEB", `cf_clearance injection failed: ${message}`);
      // Continue anyway - the retry wrapper will handle 403
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

function shouldUseBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

function extractLastUserText(body: Record<string, unknown>): string {
  const messages = Array.isArray(body.messages)
    ? (body.messages as Array<Record<string, unknown>>)
    : [];
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") {
      const content = messages[i].content;
      if (typeof content === "string") return content;
      if (Array.isArray(content)) {
        return content
          .map((c) => (typeof c === "object" && c && "text" in c ? String(c.text) : ""))
          .filter(Boolean)
          .join("\n");
      }
    }
  }
  return "Reply with OK";
}

/**
 * Read Claude Web SSE chunks from an upstream response body and pipe them
 * through transformFromClaude to produce OpenAI chat.completion.chunk SSE.
 *
 * The upstream body may arrive as a ReadableStream directly (tlsBody) or
 * via upstreamResp.body (browser-backed path, where the Response type is
 * accurate). tlsBody takes priority when non-null.
 *
 * Returns a Response whose body is the transformed SSE stream. The client
 * receives standard OpenAI-format streaming chunks.
 */
async function buildClaudeStreamingResponse(
  upstreamResp: Response,
  model: string,
  log:
    | { warn?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void }
    | null
    | undefined,
  tlsBody: ReadableStream<Uint8Array> | null | undefined
): Promise<Response> {
  const src = tlsBody ?? upstreamResp.body;
  if (!src) {
    return new Response(
      JSON.stringify({
        error: {
          message: "No upstream response body available",
          type: "upstream_error",
        },
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  let finished = false;

  const transformed = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = src!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE lines are separated by \n or \r\n; Claude sends
          // data: {...}\n\n (double newline separating events).
          const lines = buffer.split("\n");
          // Keep the last potentially-incomplete line in the buffer.
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const jsonStr = trimmed.slice(6); // strip "data: "
            try {
              const parsed = JSON.parse(jsonStr) as Record<string, unknown>;

              // Content block delta — contains the actual text.
              if (parsed.type === "content_block_delta") {
                const delta = parsed.delta as Record<string, unknown> | undefined;
                const text = delta?.text as string | undefined;
                if (text) {
                  const chunk = transformFromClaude(text, model);
                  const out = `data: ${JSON.stringify(chunk)}\n\n`;
                  controller.enqueue(new TextEncoder().encode(out));
                }
              }
              // message_stop — final event from Claude.
              else if (parsed.type === "message_stop") {
                const chunk = transformFromClaude("", model, "end_turn");
                const out = `data: ${JSON.stringify(chunk)}\n\n`;
                controller.enqueue(new TextEncoder().encode(out));
                finished = true;
              }
              // message_delta — may carry a stop_reason.
              else if (parsed.type === "message_delta") {
                const delta = parsed.delta as Record<string, unknown> | undefined;
                const stopReason = delta?.stop_reason as string | undefined;
                if (stopReason) {
                  const chunk = transformFromClaude("", model, stopReason);
                  const out = `data: ${JSON.stringify(chunk)}\n\n`;
                  controller.enqueue(new TextEncoder().encode(out));
                }
              }
            } catch {
              // Skip lines that aren't valid JSON (metadata, ping, etc.)
            }
          }
        }

        // Flush remaining buffer.
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data: ")) {
            const jsonStr = trimmed.slice(6);
            try {
              const parsed = JSON.parse(jsonStr) as Record<string, unknown>;
              if (parsed.type === "content_block_delta") {
                const delta = parsed.delta as Record<string, unknown> | undefined;
                const text = delta?.text as string | undefined;
                if (text) {
                  const chunk = transformFromClaude(text, model);
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`)
                  );
                }
              }
            } catch {
              /* skip */
            }
          }
        }

        // Send terminal DONE marker if we haven't sent a message_stop.
        if (!finished) {
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        }
      } catch (err) {
        log?.error?.("CLAUDE-WEB-STREAM", `Stream error: ${String(err)}`);
        controller.error(err);
      } finally {
        try {
          reader.releaseLock();
        } catch {
          /* ok */
        }
        try {
          controller.close();
        } catch {}
      }
    },
  });

  return new Response(transformed, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
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
      const rawCookie = readClaudeWebCookie(credentials);
      if (!rawCookie.trim()) {
        return false;
      }

      const cookieHeader = await normalizeClaudeSessionCookieWithAutoRefresh(rawCookie, {
        allowAutoSolve: false,
      });
      const deviceId = readClaudeWebDeviceId(credentials);

      return await verifyCookieValidity(cookieHeader, deviceId, signal);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user's organization ID from session
   */
  async execute({ model, body, stream: _stream, credentials, signal, log }: ExecuteInput) {
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

      const rawCookie = readClaudeWebCookie(credentials);
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

      const cookieHeader = await normalizeClaudeSessionCookieWithAutoRefresh(rawCookie, {
        allowAutoSolve: true,
        log,
      });
      const deviceId = readClaudeWebDeviceId(credentials);

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

      // Prepare browser-emulated headers (used by both paths)
      const headers = getBrowserHeaders(deviceId);

      // Browser-backed path: opt-in via OMNIROUTE_BROWSER_POOL=on or
      // WEB_COOKIE_USE_BROWSER=1. Routes the chat through a shared
      // Playwright/Cloakbrowser page with the user's session cookies
      // injected, so Claude's Cloudflare Turnstile / session fingerprint
      // checks are satisfied by a real browser context. This is the
      // only way to get HTTP 200 from a sandbox/VPS IP where the
      // pasted cf_clearance is bound to a different fingerprint and
      // Cloudflare refuses the request. The browser's fetch hits the
      // /completion endpoint directly (the conversation id is created
      // by the page itself), so the placeholder in the matcher is
      // harmless.
      if (shouldUseBrowserBacked()) {
        const userText = extractLastUserText(bodyObj);
        const completionUrl = orgId
          ? `${CLAUDE_WEB_API_BASE}/organizations/${orgId}/chat_conversations/PLACEHOLDER/completion`
          : `${CLAUDE_WEB_API_BASE}/chat_conversations/PLACEHOLDER/completion`;
        const result = await tryBackedChat({
          poolKey: "claude-web",
          chatPageUrl: "https://claude.ai/new",
          chatUrl: completionUrl,
          chatUrlMatchDomain: "claude.ai",
          cookieString: rawCookie,
          cookieDomain: ".claude.ai",
          userMessage: userText,
          inputSelector: "div[contenteditable='true']",
          postSubmitWaitMs: 15000,
          signal: signal ?? null,
        });
        if (result.status > 0) {
          // Wrap captured SSE body as a Response so the existing
          // stream parser (transformFromClaude) can be reused.
          const upstreamResp = new Response(result.body, {
            status: result.status,
            headers: {
              "Content-Type": result.contentType || "text/event-stream",
            },
          });
          // Reuse the streaming transformer from below.
          return {
            response: await buildClaudeStreamingResponse(upstreamResp, model, log, null),
            url: completionUrl,
            headers,
            transformedBody: claudePayload,
          };
        }
        const errorResp = new Response(
          JSON.stringify({
            error: {
              message: `Claude Web browser-backed chat captured no upstream response (timing: ${JSON.stringify(
                result.timing
              )})`,
              type: "upstream_error",
            },
          }),
          {
            status: 502,
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

      // Build completion URL
      const completionUrl =
        orgId && conversationId
          ? `${CLAUDE_WEB_API_BASE}/organizations/${orgId}/chat_conversations/${conversationId}/completion`
          : `${CLAUDE_WEB_API_BASE}/chat_conversations/new/completion`;

      // Prepare request
      const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
      const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

      log?.debug?.("CLAUDE-WEB", `Making request to ${completionUrl}`);

      // cf_clearance is already injected via normalizeClaudeSessionCookieWithAutoRefresh above

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

        // Read the upstream body. `tlsFetchClaude` writes non-SSE error
        // bodies (Cloudflare challenge pages, HTML rate-limit responses,
        // Anthropic JSON errors) into `body`, not `text` — `text` is only
        // populated for non-streaming requests. Reading the wrong field
        // here produced the cryptic "[403]: Claude Web API error: " with
        // no diagnostic info. The earlier code did exactly that and made
        // 403 from Cloudflare look indistinguishable from a real Claude
        // rejection.
        //
        // `body` may be a ReadableStream (SSE path) even when status is
        // non-2xx — drain a small prefix so we can classify the failure
        // (Cloudflare challenge vs upstream JSON) without buffering the
        // whole response. If the read fails or times out, fall back to an
        // empty string and let the generic error message stand.
        let errorText = "";
        let cfMitigated: string | null = null;
        try {
          if (fetchResponse.body) {
            const reader = fetchResponse.body.getReader();
            const decoder = new TextDecoder();
            const chunks: Uint8Array[] = [];
            let total = 0;
            const maxBytes = 2048; // enough to identify a Cloudflare challenge
            while (total < maxBytes) {
              const { value, done } = await reader.read();
              if (done || !value) break;
              chunks.push(value);
              total += value.byteLength;
            }
            // Release the reader so the underlying tls-client connection
            // can be reused for the next request. Without cancel() the
            // connection can hang on a still-open stream.
            try {
              reader.releaseLock();
            } catch {
              /* already released */
            }
            if (chunks.length === 1) {
              errorText = decoder.decode(chunks[0]);
            } else {
              const combined = new Uint8Array(total);
              let offset = 0;
              for (const chunk of chunks) {
                combined.set(chunk, offset);
                offset += chunk.byteLength;
              }
              errorText = decoder.decode(combined);
            }
          } else if (fetchResponse.text) {
            errorText = fetchResponse.text;
          }
        } catch {
          errorText = "";
        }

        // Surface Cloudflare challenge pages as a distinct, actionable
        // error so dashboards / logs don't show an empty "Claude Web API
        // error:" body. The most common cause is a sandbox / data-center
        // IP that Cloudflare has flagged; the cf_clearance cookie bound
        // to a different IP won't pass the challenge.
        cfMitigated = fetchResponse.headers.get("cf-mitigated");
        const isCloudflareChallenge =
          fetchResponse.status === 403 &&
          (cfMitigated === "challenge" ||
            /<title>\s*Just a moment/i.test(errorText) ||
            /<title>\s*Attention Required/i.test(errorText));

        let errorMessage: string;
        if (isCloudflareChallenge) {
          errorMessage =
            "Claude Web returned a Cloudflare bot-management challenge " +
            `(cf-mitigated=${cfMitigated ?? "challenge"}). ` +
            "The sandbox / VPS IP appears to be flagged; the cf_clearance " +
            "cookie pasted from a residential IP won't pass. Probe from a " +
            "residential network, or use the official Anthropic API " +
            "(provider: 'claude') instead.";
        } else {
          // Trim the body to keep the error message compact but still
          // useful — most real Claude errors are short JSON; Cloudflare
          // HTML bodies are caught above.
          const trimmed = errorText.trim().slice(0, 500);
          errorMessage = trimmed
            ? `Claude Web API error (${fetchResponse.status}): ${trimmed}`
            : `Claude Web API error (${fetchResponse.status}) with no response body`;
        }

        const errorResp = new Response(
          JSON.stringify({
            error: {
              message: errorMessage,
              type: isCloudflareChallenge ? "cloudflare_challenge" : "api_error",
              code: isCloudflareChallenge
                ? "cf_mitigated_challenge"
                : `HTTP_${fetchResponse.status}`,
              ...(cfMitigated ? { cfMitigated } : {}),
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

      // Stream the response (shared with the browser-backed path).
      return {
        response: await buildClaudeStreamingResponse(fetchResponse, model, log, fetchResponse.body),
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
            message: `Claude Web connection failed: ${sanitizeErrorMessage(errorMessage)}`,
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
