import { createHash, randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { acquireBrowserContext, openPage } from "../services/browserPool.ts";
import type { ExecuteInput, ProviderCredentials } from "../executors/base.ts";
import {
  extractChatGptWebAttachmentSources,
  isChatGptWebAttachmentContentPart,
  resolveChatGptWebAttachments,
  type ChatGptWebAttachmentSource,
} from "./chatgptWebAttachments.ts";
import {
  PlaywrightChatGptWebBrowserSession,
  runChatGptWebBrowserTurn,
  type ChatGptWebBrowserSession,
  type ChatGptWebBrowserTurnRequest,
  type ChatGptWebBrowserTurnResult,
  type ChatGptWebUiSelection,
} from "./chatgptWebBrowserSession.ts";

type JsonRecord = Record<string, unknown>;

const CHATGPT_WEB_PAGE_URL = "https://chatgpt.com/?temporary-chat=true";
const MAX_PROMPT_BYTES = 4 * 1024 * 1024;
const FIRST_PARTY_COOKIE_HOSTS = ["chatgpt.com", "openai.com"] as const;

export interface ChatGptWebStorageCookie extends JsonRecord {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "Strict" | "Lax" | "None";
}

export interface ChatGptWebStorageOrigin extends JsonRecord {
  origin: string;
  localStorage: Array<{ name: string; value: string }>;
}

export interface ChatGptWebStorageState {
  cookies: ChatGptWebStorageCookie[];
  origins: ChatGptWebStorageOrigin[];
}

export interface PreparedChatGptWebBrowserRequest {
  prompt: string;
  selection: ChatGptWebUiSelection;
  attachments: ChatGptWebAttachmentSource[];
}

export interface ChatGptWebSessionFactoryInput {
  connectionId: string;
  storageState: ChatGptWebStorageState;
  selection: ChatGptWebUiSelection;
  userAgent?: string;
  locale?: string;
  timezone?: string;
  chromeExecutablePath?: string;
}

export interface ChatGptWebExecutorAdapterDeps {
  createSession?: (input: ChatGptWebSessionFactoryInput) => Promise<ChatGptWebBrowserSession>;
  runTurn?: (
    session: ChatGptWebBrowserSession,
    request: ChatGptWebBrowserTurnRequest
  ) => Promise<ChatGptWebBrowserTurnResult>;
  id?: () => string;
  now?: () => number;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFirstPartyHost(value: string): boolean {
  const host = value.toLowerCase().replace(/^\./, "");
  return FIRST_PARTY_COOKIE_HOSTS.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`)
  );
}

function validateCookie(value: unknown): asserts value is ChatGptWebStorageCookie {
  if (
    !isRecord(value) ||
    typeof value.name !== "string" ||
    !value.name ||
    typeof value.value !== "string" ||
    typeof value.domain !== "string" ||
    typeof value.path !== "string" ||
    !value.path.startsWith("/") ||
    typeof value.expires !== "number" ||
    !Number.isFinite(value.expires) ||
    typeof value.httpOnly !== "boolean" ||
    typeof value.secure !== "boolean" ||
    !["Strict", "Lax", "None"].includes(String(value.sameSite))
  ) {
    throw new Error("ChatGPT Web browser storage state contains an invalid cookie");
  }
  if (!isFirstPartyHost(value.domain)) {
    throw new Error("ChatGPT Web browser storage state contains a foreign cookie domain");
  }
}

function validateOrigin(value: unknown): asserts value is ChatGptWebStorageOrigin {
  if (!isRecord(value) || typeof value.origin !== "string" || !Array.isArray(value.localStorage)) {
    throw new Error("ChatGPT Web browser storage state contains an invalid origin");
  }
  let url: URL;
  try {
    url = new URL(value.origin);
  } catch {
    throw new Error("ChatGPT Web browser storage state contains an invalid origin");
  }
  if (url.protocol !== "https:" || !isFirstPartyHost(url.hostname)) {
    throw new Error("ChatGPT Web browser storage state contains a foreign origin");
  }
  for (const entry of value.localStorage) {
    if (!isRecord(entry) || typeof entry.name !== "string" || typeof entry.value !== "string") {
      throw new Error("ChatGPT Web browser storage state contains invalid local storage");
    }
  }
}

export function normalizeChatGptWebStorageState(value: unknown): ChatGptWebStorageState {
  if (!isRecord(value) || !Array.isArray(value.cookies) || !Array.isArray(value.origins)) {
    throw new Error("ChatGPT Web browser storage state is invalid");
  }
  for (const cookie of value.cookies) validateCookie(cookie);
  for (const origin of value.origins) validateOrigin(origin);
  return structuredClone(value) as unknown as ChatGptWebStorageState;
}

function contentText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) {
    throw new Error("ChatGPT Web clean-room adapter supports text content only");
  }
  const parts: string[] = [];
  for (const part of value) {
    if (
      isRecord(part) &&
      (part.type === "text" || part.type === "input_text") &&
      typeof part.text === "string"
    ) {
      parts.push(part.text);
      continue;
    }
    if (isChatGptWebAttachmentContentPart(part)) continue;
    throw new Error("ChatGPT Web clean-room adapter received unsupported content");
  }
  return parts.join("");
}

function buildPrompt(body: JsonRecord): string {
  if (Array.isArray(body.tools) && body.tools.length > 0) {
    throw new Error("ChatGPT Web clean-room adapter does not support tools yet");
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    throw new Error("ChatGPT Web clean-room adapter requires messages");
  }
  const messages = body.messages.map((value) => {
    if (!isRecord(value) || typeof value.role !== "string") {
      throw new Error("ChatGPT Web clean-room adapter received an invalid message");
    }
    if (!["system", "developer", "user", "assistant"].includes(value.role)) {
      throw new Error("ChatGPT Web clean-room adapter does not support tool messages yet");
    }
    if (Array.isArray(value.tool_calls) && value.tool_calls.length > 0) {
      throw new Error("ChatGPT Web clean-room adapter does not support tools yet");
    }
    return { role: value.role, text: contentText(value.content) };
  });

  const prompt =
    messages.length === 1 && messages[0].role === "user"
      ? messages[0].text
      : messages
          .map(({ role, text }) => `${role[0].toUpperCase()}${role.slice(1)}:\n${text}`)
          .join("\n\n");
  if (!prompt.trim()) throw new Error("ChatGPT Web clean-room adapter requires non-empty text");
  if (new TextEncoder().encode(prompt).byteLength > MAX_PROMPT_BYTES) {
    throw new Error("ChatGPT Web clean-room adapter prompt is too large");
  }
  return prompt;
}

function reasoningEffort(body: JsonRecord): string | null {
  if (typeof body.reasoning_effort === "string") return body.reasoning_effort.toLowerCase();
  if (isRecord(body.reasoning) && typeof body.reasoning.effort === "string") {
    return body.reasoning.effort.toLowerCase();
  }
  return null;
}

function effortIndex(effort: string | null): 0 | 1 | 2 | 3 {
  if (effort === null || effort === "medium") return 1;
  if (["none", "off", "minimal", "low"].includes(effort)) return 0;
  if (effort === "high") return 2;
  if (effort === "xhigh" || effort === "max") return 3;
  throw new Error(`ChatGPT Web clean-room adapter does not support reasoning effort ${effort}`);
}

function normalizedModel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^chatgpt-web\//, "")
    .replace(/^cgpt-web\//, "")
    .replace(/\./g, "-");
}

function resolveSelection(model: string, body: JsonRecord): ChatGptWebUiSelection {
  const normalized = normalizedModel(model);
  if (normalized === "gpt-5-6-luna-free") {
    return { kind: "free", thinkEnabled: false };
  }
  if (normalized === "gpt-5-6-luna-free-thinking") {
    return { kind: "free", thinkEnabled: true };
  }
  if (normalized === "gpt-5-6-pro") {
    return { kind: "picker", modelLabel: "GPT-5.6 Sol", effortIndex: 4 };
  }
  if (normalized === "gpt-5-6-instant" || normalized === "gpt-5-6") {
    return { kind: "picker", modelLabel: "GPT-5.6 Sol", effortIndex: 0 };
  }
  if (["gpt-5-6-thinking", "gpt-5-6-sol"].includes(normalized)) {
    return {
      kind: "picker",
      modelLabel: "GPT-5.6 Sol",
      effortIndex: effortIndex(reasoningEffort(body)),
    };
  }
  if (normalized === "gpt-5-5-pro") {
    return { kind: "picker", modelLabel: "GPT-5.5", effortIndex: 4 };
  }
  if (normalized === "gpt-5-5-instant") {
    return { kind: "picker", modelLabel: "GPT-5.5", effortIndex: 0 };
  }
  if (["gpt-5-5", "gpt-5-5-thinking"].includes(normalized)) {
    return {
      kind: "picker",
      modelLabel: "GPT-5.5",
      effortIndex: effortIndex(reasoningEffort(body)),
    };
  }
  throw new Error(`ChatGPT Web clean-room adapter received an unsupported model: ${model}`);
}

export function prepareChatGptWebBrowserRequest(
  model: string,
  body: unknown
): PreparedChatGptWebBrowserRequest {
  if (!isRecord(body)) throw new Error("ChatGPT Web clean-room adapter requires an object body");
  const prompt = buildPrompt(body);
  const attachments = extractChatGptWebAttachmentSources(
    body.messages as Array<{ role?: string; content?: unknown }>
  );
  return { prompt, selection: resolveSelection(model, body), attachments };
}

function readStorageState(credentials: ProviderCredentials): ChatGptWebStorageState {
  const providerData = credentials.providerSpecificData;
  const raw = providerData?.storageState ?? credentials.apiKey;
  if (typeof raw === "string") {
    try {
      return normalizeChatGptWebStorageState(JSON.parse(raw) as unknown);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("ChatGPT Web browser storage state JSON is invalid");
      }
      throw error;
    }
  }
  return normalizeChatGptWebStorageState(raw);
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function resolveChatGptWebChromeExecutable(
  explicit?: string,
  deps: {
    env?: NodeJS.ProcessEnv;
    exists?: (path: string) => boolean;
  } = {}
): string | undefined {
  const env = deps.env ?? process.env;
  const exists = deps.exists ?? existsSync;
  const candidates = [
    explicit,
    env.CHATGPT_WEB_CHROME_PATH,
    env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    ...(env.PROGRAMFILES
      ? [join(env.PROGRAMFILES, "Google", "Chrome", "Application", "chrome.exe")]
      : []),
    ...(env["PROGRAMFILES(X86)"]
      ? [join(env["PROGRAMFILES(X86)"], "Google", "Chrome", "Application", "chrome.exe")]
      : []),
    ...(env.LOCALAPPDATA
      ? [join(env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe")]
      : []),
  ];
  return candidates.find((candidate): candidate is string =>
    Boolean(candidate?.trim() && exists(candidate.trim()))
  );
}

async function createDefaultSession(
  input: ChatGptWebSessionFactoryInput
): Promise<ChatGptWebBrowserSession> {
  const digest = createHash("sha256")
    .update(input.connectionId)
    .update("\0")
    .update(JSON.stringify(input.storageState))
    .digest("hex");
  const pooled = await acquireBrowserContext(`chatgpt-web-cleanroom:${digest}`, {
    cookieDomain: "chatgpt.com",
    storageState: input.storageState,
    userAgent: input.userAgent,
    locale: input.locale,
    timezone: input.timezone,
    proxyProviderKey: "chatgpt-web",
    warmupUrl: CHATGPT_WEB_PAGE_URL,
    headless: false,
    executablePath: input.chromeExecutablePath,
  });
  const page =
    pooled.warmupPage && !pooled.warmupPage.isClosed() ? pooled.warmupPage : await openPage(pooled);
  if (pooled.warmupPage !== page) pooled.warmupPage = page;
  return new PlaywrightChatGptWebBrowserSession(page, {
    pageUrl: CHATGPT_WEB_PAGE_URL,
    selection: input.selection,
    closePageOnCleanup: false,
  });
}

export function buildChatGptWebOpenAiResponse(
  model: string,
  result: ChatGptWebBrowserTurnResult,
  stream: boolean,
  metadata: { id?: string; created?: number } = {}
): Response {
  const id = metadata.id ?? `chatcmpl-${randomUUID()}`;
  const created = metadata.created ?? Math.floor(Date.now() / 1000);
  if (!stream) {
    return Response.json({
      id,
      object: "chat.completion",
      created,
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: result.text },
          finish_reason: "stop",
        },
      ],
    });
  }

  const chunks = [
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    },
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: { content: result.text }, finish_reason: null }],
    },
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
  ];
  return new Response(
    chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("") + "data: [DONE]\n\n",
    { headers: { "Content-Type": "text/event-stream; charset=utf-8" } }
  );
}

export async function executeChatGptWebCleanRoom(
  input: Pick<ExecuteInput, "model" | "body" | "stream" | "credentials" | "signal">,
  deps: ChatGptWebExecutorAdapterDeps = {}
): Promise<Response> {
  const prepared = prepareChatGptWebBrowserRequest(input.model, input.body);
  const attachments = await resolveChatGptWebAttachments(prepared.attachments);
  const storageState = readStorageState(input.credentials);
  const connectionId = optionalString(input.credentials.connectionId);
  if (!connectionId) throw new Error("ChatGPT Web clean-room adapter requires a connection ID");
  const providerData = input.credentials.providerSpecificData;
  const session = await (deps.createSession ?? createDefaultSession)({
    connectionId,
    storageState,
    selection: prepared.selection,
    userAgent: optionalString(providerData?.customUserAgent),
    locale: optionalString(providerData?.locale),
    timezone: optionalString(providerData?.timezone),
    chromeExecutablePath: resolveChatGptWebChromeExecutable(
      optionalString(providerData?.chromeExecutablePath)
    ),
  });
  const result = await (deps.runTurn ?? runChatGptWebBrowserTurn)(session, {
    prompt: prepared.prompt,
    attachments,
    signal: input.signal,
  });
  return buildChatGptWebOpenAiResponse(input.model, result, input.stream, {
    id: deps.id?.(),
    created: deps.now ? Math.floor(deps.now() / 1000) : undefined,
  });
}
