/**
 * CopilotWebExecutor — Microsoft Copilot Web Session Provider
 *
 * Routes requests through copilot.microsoft.com's WebSocket API using
 * session credentials, translating between OpenAI chat completions format
 * and Copilot's proprietary WebSocket event protocol.
 *
 * Auth: access_token from copilot.microsoft.com (extracted from browser
 * DevTools or HAR file). Anonymous access supported with limited models.
 *
 * Protocol:
 *   1. POST /c/api/start → conversationId
 *   2. WS connect wss://copilot.microsoft.com/c/api/chat?api-version=2
 *   3. Send: { event: "send", conversationId, content, mode }
 *   4. Receive: stream of JSON events (appendText, done, error, etc.)
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { createHash, randomBytes } from "node:crypto";
import { sanitizeErrorMessage } from "../utils/error.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const COPILOT_BASE = "https://copilot.microsoft.com";
const COPILOT_START_URL = `${COPILOT_BASE}/c/api/start`;
const COPILOT_WS_URL = "wss://copilot.microsoft.com/c/api/chat?api-version=2";

const COPILOT_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

// Model mapping: OmniRoute model ID → Copilot mode
const MODEL_MODE_MAP: Record<string, string> = {
  copilot: "chat",
  "copilot-chat": "chat",
  "gpt-4o": "chat",
  "gpt-4": "chat",
  "copilot-think": "reasoning",
  "copilot-think-deeper": "reasoning",
  o1: "reasoning",
  o3: "reasoning",
  "copilot-smart": "smart",
  "copilot-gpt5": "smart",
  "gpt-5": "smart",
  "copilot-study": "chat",
};

const DEFAULT_MODE = "chat";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CopilotStartResponse {
  currentConversationId?: string;
  conversationId?: string;
  remainingTurns?: number;
  isBlocked?: boolean;
  banExpiresAt?: string;
}

interface CopilotWsEvent {
  event: string;
  text?: string;
  conversationId?: string;
  url?: string;
  thumbnailUrl?: string;
  suggestions?: string[];
  error?: string;
  [key: string]: unknown;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getCopilotMode(model?: string): string {
  if (!model) return DEFAULT_MODE;
  const lower = model.toLowerCase();
  return MODEL_MODE_MAP[lower] || DEFAULT_MODE;
}

// Hashcash difficulty cap. Upstream supplies `difficulty`, so we clamp it to
// prevent a malicious/buggy server from forcing huge prefix allocations or
// effectively infinite work. 8 hex zeros = 2^32 expected iterations, already
// far beyond the ~10M iteration budget below.
const MAX_HASHCASH_DIFFICULTY = 8;

export function solveHashcash(parameter: string, difficulty: number): number | null {
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > MAX_HASHCASH_DIFFICULTY) {
    return null;
  }
  const prefix = "0".repeat(difficulty);
  for (let i = 0; i < 10_000_000; i++) {
    const hash = createHash("sha256").update(`${parameter}:${i}`).digest("hex");
    if (hash.startsWith(prefix)) return i;
  }
  return null;
}

export function extractAccessToken(credential: string): string | null {
  if (!credential) return null;
  // Direct token
  if (credential.startsWith("ey") || credential.length > 100) return credential;
  // Try parsing as cookie string — look for _EDGE_S or similar
  const match = credential.match(/access_token=([^;]+)/);
  if (match) return match[1];
  // Try HAR-extracted bearer
  const bearerMatch = credential.match(/[Bb]earer\s+(.+)/);
  if (bearerMatch) return bearerMatch[1];
  return credential;
}

/**
 * Map a token (or absence of one) to an in-memory session-pool key.
 *
 * Earlier iterations hashed the token with SHA-256, then with HMAC-SHA-256.
 * Both forms left CodeQL's data-flow analysis tracing an OAuth bearer into
 * a "fast" hash and re-raising `js/insufficient-password-hash`, even though
 * the value is high-entropy and the output never leaves the process.
 * bcrypt/scrypt/argon2 are the wrong tool here (they slow down brute-force
 * of low-entropy human passwords we do not have).
 *
 * We instead key the in-memory `sessionPool` by the token itself. The token
 * already lives in this process — embedded in `CopilotSession.cookies` for
 * every entry — so this exposes nothing the runtime did not already hold.
 * The map is capped at MAX_POOL_SIZE with LRU eviction, so memory remains
 * bounded regardless of how many distinct tokens appear.
 *
 * See docs/security/PUBLIC_CREDS.md for the broader credential-handling
 * pattern.
 */
export function sessionPoolKey(token?: string): string {
  return token && token.length > 0 ? token : "anonymous";
}

// ─── Session Management ─────────────────────────────────────────────────────

interface CopilotSession {
  conversationId: string;
  cookies: string;
  remainingTurns: number;
  isBlocked: boolean;
  createdAt: number;
}

// Shared session pool across all executor instances (singleton)
const sessionPool = new Map<string, CopilotSession>();
let sessionRotationCount = 0;
const MIN_REMAINING_TURNS = 5;
const MAX_ROTATIONS = 1000;
const MAX_POOL_SIZE = 100;

// ─── Executor ───────────────────────────────────────────────────────────────

export class CopilotWebExecutor extends BaseExecutor {
  constructor() {
    super("copilot-web", { id: "copilot-web", baseUrl: COPILOT_START_URL });
  }

  /**
   * Get or create a session. Rotates when remainingTurns is low or blocked.
   */
  private async getSession(accessToken?: string, signal?: AbortSignal): Promise<CopilotSession> {
    const poolKey = sessionPoolKey(accessToken);

    const existing = sessionPool.get(poolKey);
    if (
      existing &&
      !existing.isBlocked &&
      existing.remainingTurns > MIN_REMAINING_TURNS &&
      Date.now() - existing.createdAt < 3_600_000 // 1 hour max session age
    ) {
      return existing;
    }

    // Create new session (rotate)
    if (sessionRotationCount >= MAX_ROTATIONS) {
      // Reset counter after max rotations (prevent memory leak)
      sessionRotationCount = 0;
    }

    const session = await this.createSession(accessToken, signal);
    // Evict oldest entry if pool is at capacity (Map preserves insertion order)
    if (sessionPool.size >= MAX_POOL_SIZE) {
      sessionPool.delete(sessionPool.keys().next().value!);
    }
    sessionPool.set(poolKey, session);
    sessionRotationCount++;
    return session;
  }

  /**
   * Create a fresh session with new cookies and conversationId.
   */
  private async createSession(accessToken?: string, signal?: AbortSignal): Promise<CopilotSession> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": COPILOT_USER_AGENT,
      Origin: COPILOT_BASE,
      Referer: `${COPILOT_BASE}/`,
    };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(COPILOT_START_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        timeZone: "America/New_York",
        startNewConversation: true,
        teenSupportEnabled: false,
      }),
      signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Copilot /c/api/start failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const data = (await res.json()) as CopilotStartResponse;
    const convId = data.currentConversationId || data.conversationId;
    if (!convId) {
      throw new Error("Copilot /c/api/start returned no conversationId");
    }

    // Extract cookies from response
    const setCookies = res.headers.getSetCookie();
    const cookies = setCookies.map((c) => c.split(";")[0]).join("; ");

    return {
      conversationId: convId,
      cookies,
      remainingTurns: data.remainingTurns ?? 1000,
      isBlocked: data.isBlocked ?? false,
      createdAt: Date.now(),
    };
  }

  /**
   * Send a message via WebSocket and collect the streamed response.
   */
  private async wsChat(
    conversationId: string,
    prompt: string,
    mode: string,
    accessToken?: string,
    signal?: AbortSignal
  ): Promise<ReadableStream<Uint8Array>> {
    // Build WebSocket URL without credentials in query string
    const wsUrl = `${COPILOT_WS_URL}&clientSessionId=${crypto.randomUUID()}`;

    return new ReadableStream(
      {
        start: async (controller) => {
          const encoder = new TextEncoder();
          let ws: WebSocket | null = null;
          let settled = false;

          const cleanup = () => {
            if (ws) {
              try {
                ws.close();
              } catch {
                /* ignore */
              }
              ws = null;
            }
          };

          const finish = () => {
            if (settled) return;
            settled = true;
            cleanup();
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          };

          const abort = (reason?: string) => {
            if (settled) return;
            settled = true;
            cleanup();
            if (reason) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ error: { message: reason } })}\n\n`)
              );
            }
            controller.close();
          };

          // Handle upstream abort signal
          signal?.addEventListener("abort", () => abort("Request aborted"), { once: true });

          try {
            // Use Node.js built-in WebSocket if available, else dynamic import.
            // Pass the access token via Authorization header (not URL) to avoid
            // credential exposure in server logs.
            let WS = globalThis.WebSocket;
            if (!WS) {
              // @ts-ignore — ws module has no type declarations in this project
              WS = (await import("ws")).default as unknown as typeof WebSocket;
              if (accessToken) {
                // @ts-ignore — ws module supports headers option in second arg
                ws = new WS(wsUrl, {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }) as WebSocket;
              }
            }
            if (!ws) {
              ws = new WS(wsUrl) as WebSocket;
            }

            const timeout = setTimeout(() => abort("Copilot WebSocket timeout"), FETCH_TIMEOUT_MS);

            let chatSent = false;
            const sendChat = () => {
              if (chatSent) return;
              chatSent = true;
              ws!.send(
                JSON.stringify({
                  event: "send",
                  conversationId,
                  content: [{ type: "text", text: prompt }],
                  mode,
                })
              );
            };

            ws.onopen = () => {
              sendChat();
            };

            ws.onmessage = (ev: MessageEvent) => {
              try {
                const event: CopilotWsEvent =
                  typeof ev.data === "string" ? JSON.parse(ev.data) : JSON.parse(String(ev.data));

                switch (event.event) {
                  case "challenge": {
                    if (event.method === "hashcash" && event.parameter) {
                      const parts = String(event.parameter).split(":");
                      const param = parts[0];
                      const difficulty = parseInt(parts[1] || "1", 10);
                      const solution = solveHashcash(param, difficulty);
                      ws!.send(
                        JSON.stringify({
                          event: "challengeResponse",
                          token: solution !== null ? String(solution) : "",
                          method: "hashcash",
                        })
                      );
                      // Re-send chat after solving challenge
                      chatSent = false;
                      sendChat();
                    } else if (event.method === "cloudflare") {
                      abort(
                        "Copilot requires Cloudflare Turnstile verification. Use an authenticated session (access_token) instead."
                      );
                    } else {
                      abort(
                        `Copilot challenge "${event.method}" not supported. Use an authenticated session.`
                      );
                    }
                    break;
                  }
                  case "appendText": {
                    if (event.text) {
                      const chunk = {
                        id: `chatcmpl-copilot-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: "copilot",
                        choices: [
                          {
                            index: 0,
                            delta: { content: event.text },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                    break;
                  }
                  case "chainOfThought": {
                    if (event.text) {
                      const chunk = {
                        id: `chatcmpl-copilot-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: "copilot",
                        choices: [
                          {
                            index: 0,
                            delta: { reasoning_content: event.text },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                    break;
                  }
                  case "replaceText": {
                    if (event.text) {
                      const chunk = {
                        id: `chatcmpl-copilot-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: "copilot",
                        choices: [
                          {
                            index: 0,
                            delta: { content: event.text },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                    break;
                  }
                  case "imageGenerated": {
                    if (event.url) {
                      const chunk = {
                        id: `chatcmpl-copilot-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: "copilot",
                        choices: [
                          {
                            index: 0,
                            delta: {
                              content: [
                                {
                                  type: "image_url",
                                  image_url: { url: event.url, detail: "auto" },
                                },
                              ],
                            },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                    break;
                  }
                  case "citation": {
                    if (event.url) {
                      const annotation = {
                        type: "url_citation",
                        url_citation: {
                          url: event.url,
                          title: event.title || event.url,
                        },
                      };
                      const chunk = {
                        id: `chatcmpl-copilot-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: "copilot",
                        choices: [
                          {
                            index: 0,
                            delta: { annotations: [annotation] },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                    break;
                  }
                  case "suggestedFollowups": {
                    if (event.suggestions && Array.isArray(event.suggestions)) {
                      const chunk = {
                        id: `chatcmpl-copilot-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: "copilot",
                        choices: [
                          {
                            index: 0,
                            delta: {
                              content: `\n\n**Suggested follow-ups:**\n${event.suggestions.map((s: string) => `- ${s}`).join("\n")}`,
                            },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                    break;
                  }
                  case "done": {
                    clearTimeout(timeout);
                    const finalChunk = {
                      id: `chatcmpl-copilot-${Date.now()}`,
                      object: "chat.completion.chunk",
                      created: Math.floor(Date.now() / 1000),
                      model: "copilot",
                      choices: [
                        {
                          index: 0,
                          delta: {},
                          finish_reason: "stop",
                        },
                      ],
                    };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalChunk)}\n\n`));
                    finish();
                    break;
                  }
                  case "error": {
                    clearTimeout(timeout);
                    abort(event.error || "Copilot stream error");
                    break;
                  }
                  // Ignore other events: connected, received, citation, etc.
                  default:
                    break;
                }
              } catch {
                // Skip unparseable messages
              }
            };

            ws.onerror = (err: Event) => {
              clearTimeout(timeout);
              const msg = (err as ErrorEvent).message || "Copilot WebSocket error";
              abort(msg);
            };

            ws.onclose = () => {
              clearTimeout(timeout);
              finish();
            };
          } catch (err) {
            abort(err instanceof Error ? err.message : "Failed to connect to Copilot");
          }
        },
      },
      { highWaterMark: 16384 }
    );
  }

  /**
   * Main execute method — translates OpenAI format to Copilot WebSocket protocol.
   */
  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { credentials, signal, model: inputModel, stream: inputStream } = input;
    const body = input.body as Record<string, unknown> | undefined;
    const model = inputModel || (body?.model as string) || "copilot";
    const mode = getCopilotMode(model);
    const stream = inputStream !== false; // Default to streaming

    // Extract access token from credentials
    const rawCred =
      credentials?.apiKey || (credentials?.providerSpecificData?.cookie as string) || "";
    const accessToken = extractAccessToken(rawCred);

    // Extract prompt from messages
    const messages = (body?.messages as Array<Record<string, unknown>>) || [];
    const userMsg = messages.filter((m) => m.role === "user").pop();
    const systemMsgs = messages.filter((m) => m.role === "system");
    const prompt = (userMsg?.content as string) || "";

    if (!prompt || (typeof prompt === "string" && !prompt.trim())) {
      return {
        response: new Response(JSON.stringify({ error: { message: "No user message provided" } }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
        url: COPILOT_START_URL,
        headers: {},
        transformedBody: null,
      };
    }

    // Build full prompt with system instructions
    let fullPrompt = "";
    if (systemMsgs.length > 0) {
      const sysText = systemMsgs
        .map((m) => (typeof m.content === "string" ? m.content : ""))
        .filter(Boolean)
        .join("\n");
      if (sysText) fullPrompt += `[System Instructions]\n${sysText}\n\n`;
    }
    fullPrompt += typeof prompt === "string" ? prompt : JSON.stringify(prompt);

    // Get or create session (auto-rotates when turns exhausted)
    let conversationId: string;
    let sessionCookies = "";
    try {
      const session = await this.getSession(accessToken || undefined, signal);
      conversationId = session.conversationId;
      sessionCookies = session.cookies;
    } catch (err) {
      const msg = sanitizeErrorMessage(
        err instanceof Error ? err.message : "Failed to start Copilot conversation"
      );
      return {
        response: new Response(JSON.stringify({ error: { message: msg } }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }),
        url: COPILOT_START_URL,
        headers: accessToken ? { Authorization: `Bearer ${accessToken.slice(0, 20)}...` } : {},
        transformedBody: { conversationId: null, mode, prompt: fullPrompt.slice(0, 100) },
      };
    }

    // Non-streaming: collect all chunks and return as single response
    if (!stream) {
      try {
        const wsStream = await this.wsChat(
          conversationId,
          fullPrompt,
          mode,
          accessToken || undefined,
          signal
        );
        const reader = wsStream.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        let reasoningText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value, { stream: true }).split("\n");
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta;
              if (delta?.content) fullText += delta.content;
              if (delta?.reasoning_content) reasoningText += delta.reasoning_content;
            } catch {
              /* skip */
            }
          }
        }

        const result = {
          id: `chatcmpl-copilot-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: fullText || "(empty response)" },
              finish_reason: "stop",
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        };

        return {
          response: new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
          }),
          url: COPILOT_WS_URL,
          headers: {},
          transformedBody: { conversationId, mode, prompt: fullPrompt.slice(0, 100) },
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Copilot non-streaming error";
        return {
          response: new Response(JSON.stringify({ error: { message: msg } }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          }),
          url: COPILOT_WS_URL,
          headers: {},
          transformedBody: { conversationId, mode },
        };
      }
    }

    // Streaming: pipe WebSocket events as SSE
    try {
      const wsStream = await this.wsChat(
        conversationId,
        fullPrompt,
        mode,
        accessToken || undefined,
        signal
      );

      return {
        response: new Response(wsStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: COPILOT_WS_URL,
        headers: {},
        transformedBody: { conversationId, mode, prompt: fullPrompt.slice(0, 100) },
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Copilot streaming error";
      return {
        response: new Response(JSON.stringify({ error: { message: msg } }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }),
        url: COPILOT_WS_URL,
        headers: {},
        transformedBody: { conversationId, mode },
      };
    }
  }
}
