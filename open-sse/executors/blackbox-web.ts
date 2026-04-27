import {
  BaseExecutor,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";

const BLACKBOX_CHAT_API = "https://app.blackbox.ai/api/chat";
const BLACKBOX_DEFAULT_COOKIE = "__Secure-authjs.session-token";
const BLACKBOX_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

type BlackboxMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function extractMessageText(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const item = part as Record<string, unknown>;
      if (item.type === "text" && typeof item.text === "string") {
        return item.text;
      }
      if (item.type === "input_text" && typeof item.text === "string") {
        return item.text;
      }
      return "";
    })
    .filter((part) => part.trim().length > 0)
    .join("\n")
    .trim();
}

function parseOpenAIMessages(
  messages: Array<Record<string, unknown>>,
  chatId: string
): BlackboxMessage[] {
  const systemParts: string[] = [];
  const parsed: BlackboxMessage[] = [];

  for (const message of messages) {
    const role = String(message.role || "user");
    const content = extractMessageText(message.content);
    if (!content) continue;

    if (role === "system" || role === "developer") {
      systemParts.push(content);
      continue;
    }

    if (role === "assistant" || role === "user") {
      parsed.push({
        id: role === "user" ? chatId : crypto.randomUUID(),
        role,
        content,
      });
    }
  }

  if (systemParts.length > 0) {
    const prefix = `System instructions:\n${systemParts.join("\n\n")}`;
    const firstUserIndex = parsed.findIndex((message) => message.role === "user");
    if (firstUserIndex >= 0) {
      parsed[firstUserIndex] = {
        ...parsed[firstUserIndex],
        content: `${prefix}\n\n${parsed[firstUserIndex].content}`,
      };
    } else {
      parsed.unshift({
        id: chatId,
        role: "user",
        content: prefix,
      });
    }
  }

  return parsed;
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil((text || "").length / 4));
}

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

async function readTextResponse(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let text = "";

  try {
    while (true) {
      if (signal?.aborted) {
        throw signal.reason ?? new DOMException("Aborted", "AbortError");
      }

      const { value, done } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
    return text;
  } finally {
    reader.releaseLock();
  }
}

function buildStreamingResponse(
  responseText: string,
  model: string,
  id: string,
  created: number
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            system_fingerprint: null,
            choices: [
              {
                index: 0,
                delta: { role: "assistant" },
                finish_reason: null,
                logprobs: null,
              },
            ],
          })
        )
      );

      if (responseText) {
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                {
                  index: 0,
                  delta: { content: responseText },
                  finish_reason: null,
                  logprobs: null,
                },
              ],
            })
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            system_fingerprint: null,
            choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
          })
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

function buildNonStreamingResponse(
  responseText: string,
  model: string,
  id: string,
  created: number
) {
  const completionTokens = estimateTokens(responseText);

  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: null,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: responseText },
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: {
        prompt_tokens: completionTokens,
        completion_tokens: completionTokens,
        total_tokens: completionTokens * 2,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function normalizeBlackboxCookieHeader(apiKey: string): string {
  return normalizeSessionCookieHeader(apiKey, BLACKBOX_DEFAULT_COOKIE);
}

export class BlackboxWebExecutor extends BaseExecutor {
  constructor() {
    super("blackbox-web", { id: "blackbox-web", baseUrl: BLACKBOX_CHAT_API });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput) {
    const messages = (body as Record<string, unknown>).messages as
      | Array<Record<string, unknown>>
      | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const errorResponse = new Response(
        JSON.stringify({
          error: {
            message: "Missing or empty messages array",
            type: "invalid_request",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return {
        response: errorResponse,
        url: BLACKBOX_CHAT_API,
        headers: {},
        transformedBody: body,
      };
    }

    const chatId = crypto.randomUUID().slice(0, 7);
    const parsedMessages = parseOpenAIMessages(messages, chatId);
    if (parsedMessages.length === 0) {
      const errorResponse = new Response(
        JSON.stringify({
          error: {
            message: "Empty query after processing messages",
            type: "invalid_request",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return {
        response: errorResponse,
        url: BLACKBOX_CHAT_API,
        headers: {},
        transformedBody: body,
      };
    }

    const cookieHeader = normalizeBlackboxCookieHeader(credentials.apiKey || "");
    const headers: Record<string, string> = {
      Accept: "text/plain, */*",
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      Origin: "https://app.blackbox.ai",
      Referer: `https://app.blackbox.ai/chat/${chatId}`,
      "User-Agent": BLACKBOX_USER_AGENT,
    };
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const transformedBody = {
      messages: parsedMessages,
      id: chatId,
      previewToken: null,
      userId: credentials.providerSpecificData?.userId ?? null,
      codeModelMode: true,
      trendingAgentMode: {},
      isMicMode: false,
      userSystemPrompt: null,
      maxTokens: Number((body as Record<string, unknown>).max_tokens) || 1024,
      playgroundTopP: null,
      playgroundTemperature: null,
      isChromeExt: false,
      githubToken: "",
      clickedAnswer2: false,
      clickedAnswer3: false,
      clickedForceWebSearch: false,
      visitFromDelta: false,
      isMemoryEnabled: false,
      mobileClient: false,
      userSelectedModel: model || null,
      userSelectedAgent: "VscodeAgent",
      validated: crypto.randomUUID(),
      imageGenerationMode: false,
      imageGenMode: "autoMode",
      webSearchModePrompt: false,
      deepSearchMode: false,
      promptSelection: "",
      domains: null,
      vscodeClient: false,
      codeInterpreterMode: false,
      customProfile: {
        name: "",
        occupation: "",
        traits: [],
        additionalInfo: "",
        enableNewChats: false,
      },
      webSearchModeOption: {
        autoMode: true,
        webMode: false,
        offlineMode: false,
      },
      session: null,
      isPremium: false,
      teamAccount: "",
      subscriptionCache: null,
      beastMode: false,
      reasoningMode: false,
      designerMode: false,
      workspaceId: "",
      asyncMode: false,
      integrations: {},
      isTaskPersistent: false,
      selectedElement: null,
    };

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(BLACKBOX_CHAT_API, {
        method: "POST",
        headers,
        body: JSON.stringify(transformedBody),
        signal: combinedSignal,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log?.error?.("BLACKBOX-WEB", `Fetch failed: ${message}`);
      const errorResponse = new Response(
        JSON.stringify({
          error: {
            message: `Blackbox Web connection failed: ${message}`,
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return {
        response: errorResponse,
        url: BLACKBOX_CHAT_API,
        headers,
        transformedBody,
      };
    }

    if (!upstreamResponse.ok) {
      const status = upstreamResponse.status;
      let message = `Blackbox Web returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        message =
          "Blackbox Web auth failed — your app.blackbox.ai session cookie may be missing or expired.";
      } else if (status === 429) {
        message = "Blackbox Web rate limited the session. Wait a moment and retry.";
      }
      const errorResponse = new Response(
        JSON.stringify({
          error: {
            message,
            type: "upstream_error",
            code: `HTTP_${status}`,
          },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );
      return {
        response: errorResponse,
        url: BLACKBOX_CHAT_API,
        headers,
        transformedBody,
      };
    }

    if (!upstreamResponse.body) {
      const errorResponse = new Response(
        JSON.stringify({
          error: {
            message: "Blackbox Web returned an empty response body",
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return {
        response: errorResponse,
        url: BLACKBOX_CHAT_API,
        headers,
        transformedBody,
      };
    }

    const responseText = (await readTextResponse(upstreamResponse.body, signal)).trim();
    const id = `chatcmpl-blackbox-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    const finalResponse = stream
      ? new Response(buildStreamingResponse(responseText, model, id, created), {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
          },
        })
      : buildNonStreamingResponse(responseText, model, id, created);

    return {
      response: finalResponse,
      url: BLACKBOX_CHAT_API,
      headers,
      transformedBody,
    };
  }
}
