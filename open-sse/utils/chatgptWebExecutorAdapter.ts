import { createHash, randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { acquireBrowserContext, openPage, releaseBrowserContext } from "../services/browserPool.ts";
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
import { parseToolCallsFromText, serializeToolsToPrompt } from "../translator/webTools.ts";

type JsonRecord = Record<string, unknown>;

const CHATGPT_WEB_PAGE_URL = "https://chatgpt.com/?temporary-chat=true";
const MAX_PROMPT_BYTES = 4 * 1024 * 1024;
/**
 * ChatGPT Web rejects a single composer submission that is too large ("The message you
 * submitted was too long"). Observed ceiling on a Free account: a 86k-char submission is
 * refused while ~1k works, so keep well inside it. Agentic clients routinely send a 66k-char
 * system prompt plus 19k of tool schemas, so the flattening step MUST budget, not just flatten.
 */
const MAX_PROMPT_CHARS = 24_000;
const SYSTEM_PROMPT_BUDGET_CHARS = 4_000;
const TOOL_SYSTEM_PROMPT_BUDGET_CHARS = 1_600;
const FIRST_PARTY_COOKIE_HOSTS = ["chatgpt.com", "openai.com"] as const;
const DEFAULT_CHATGPT_WEB_TURN_TIMEOUT_MS = 180_000;
// Measured live: an ordinary text turn on a Free Luna account takes 49-86s, so a
// shorter tool budget cut off legitimate tool turns before the envelope arrived.
// Tool turns keep the same ceiling as text and stay independently tunable.
const DEFAULT_CHATGPT_WEB_TOOL_TURN_TIMEOUT_MS = 180_000;
const MIN_TURN_TIMEOUT_MS = 1_000;

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
  tools: unknown[];
  timeoutMs: number;
}

function positiveTimeout(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= MIN_TURN_TIMEOUT_MS ? Math.floor(parsed) : fallback;
}

/**
 * Tool-emulated turns must return control to the client promptly so it can run
 * the requested tool and submit a fresh continuation. A separate environment
 * budget keeps ordinary chat backwards-compatible while letting operators tune
 * agentic requests without accepting a client-controlled timeout.
 */
export function resolveChatGptWebTurnTimeoutMs(
  tools: unknown,
  env: NodeJS.ProcessEnv = process.env
): number {
  const hasTools = Array.isArray(tools) && tools.length > 0;
  return positiveTimeout(
    hasTools ? env.CHATGPT_WEB_TOOL_TURN_TIMEOUT_MS : env.CHATGPT_WEB_TURN_TIMEOUT_MS,
    hasTools ? DEFAULT_CHATGPT_WEB_TOOL_TURN_TIMEOUT_MS : DEFAULT_CHATGPT_WEB_TURN_TIMEOUT_MS
  );
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
  const state = structuredClone(value) as unknown as ChatGptWebStorageState;
  // `__Host-` cookies must be host-only: no Domain attribute, Path=/, Secure.
  // Browsers reject them when injected with a leading-dot domain (#15500).
  for (const cookie of state.cookies) {
    if (!cookie.name.startsWith("__Host-")) continue;
    cookie.domain = cookie.domain.replace(/^\./, "");
    cookie.path = "/";
    cookie.secure = true;
  }
  return state;
}

export function chatGptWebStorageStateFromCookieHeader(raw: string): ChatGptWebStorageState {
  const header = raw.trim().replace(/^Cookie:\s*/i, "");
  if (!header) throw new Error("ChatGPT Web Cookie header is empty");

  const parts = header.split(/;\s*/);
  const cookies = parts.map((part) => {
    const separator = part.indexOf("=");
    if (separator <= 0) throw new Error("ChatGPT Web Cookie header contains an invalid cookie");
    return [part.slice(0, separator).trim(), part.slice(separator + 1)] as const;
  });

  if (!cookies.some(([name]) => /^__Secure-next-auth\.session-token(?:\.\d+)?$/.test(name))) {
    if (header.includes(";") || header.includes("=")) {
      throw new Error("ChatGPT Web Cookie header is missing __Secure-next-auth.session-token");
    }
    cookies.splice(0, cookies.length, ["__Secure-next-auth.session-token", header]);
  }

  return normalizeChatGptWebStorageState({
    cookies: cookies.map(([name, value]) => ({
      name,
      value,
      domain: ".chatgpt.com",
      path: "/",
      expires: -1,
      httpOnly: name.startsWith("__Secure-") || name.startsWith("__Host-"),
      secure: true,
      sameSite: "Lax",
    })),
    origins: [],
  });
}

function contentText(value: unknown): string {
  // OpenAI assistant messages that carry only tool_calls conventionally use
  // content: null. The call metadata is reconstructed separately below.
  if (value === null || value === undefined) return "";
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

function requestedToolsForTurn(body: JsonRecord): unknown[] {
  if (body.tool_choice === "none") return [];
  return Array.isArray(body.tools) ? body.tools : [];
}

function toolChoiceInstruction(value: unknown): string {
  if (value === "required" || value === "any") {
    return "A client tool is required for this turn. Emit exactly one valid <tool> block before any final answer.";
  }
  if (isRecord(value) && value.type === "function") {
    const fn = isRecord(value.function) ? value.function : value;
    if (typeof fn.name === "string" && fn.name) {
      return `This turn must invoke the client tool named ${JSON.stringify(fn.name)}.`;
    }
  }
  return "";
}

function hasExplicitClientToolIntent(messages: Array<{ role: string; text: string }>): boolean {
  return messages.some(
    ({ role, text }) =>
      role === "user" &&
      /\b(actual(?:ly)?|call|create|edit|execute|file|invoke|run|tool|verify|website|write|workspace)\b/i.test(
        text
      )
  );
}

/** Trim a block of text to a character budget, keeping the head and the tail. */
function clampText(text: string, budget: number): string {
  if (text.length <= budget) return text;
  if (budget <= 200) return text.slice(0, budget);
  const head = Math.floor(budget * 0.6);
  const tail = budget - head - 40;
  return `${text.slice(0, head)}\n…[trimmed ${text.length - head - tail} chars]…\n${text.slice(-tail)}`;
}

/**
 * Keep the most recent turns intact and summarise older ones. Conversation history is not
 * replayed verbatim because ChatGPT Web has no per-request token budget we can raise — the
 * client resent history has to be compacted between turns.
 */
function compactTranscript(
  messages: Array<{ role: string; text: string }>,
  budget: number
): string {
  const render = ({ role, text }: { role: string; text: string }): string =>
    `${role[0].toUpperCase()}${role.slice(1)}:\n${text}`;

  const plain = messages.map(render).join("\n\n");
  // Fast path: nothing to compact, so leave the transcript byte-identical to the original
  // flattening (callers and tests rely on that exact shape).
  if (plain.length <= budget) return plain;

  // Compaction: always pin the ORIGINAL user request. Dropping it made the model answer
  // "the task from the omitted earlier messages isn't visible here" instead of acting.
  const pinnedIndex = messages.findIndex(({ role }) => role === "user");
  const included = new Set<number>();
  const blocks: Array<{ index: number; text: string }> = [];
  let used = 0;
  if (pinnedIndex !== -1) {
    const pinned = render(messages[pinnedIndex]);
    blocks.push({ index: pinnedIndex, text: `[Original request]\n${pinned}` });
    included.add(pinnedIndex);
    used += pinned.length;
  }
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (included.has(index)) continue;
    const block = render(messages[index]);
    if (used + block.length > budget) break;
    blocks.push({ index, text: block });
    included.add(index);
    used += block.length;
  }
  blocks.sort((a, b) => a.index - b.index);
  const dropped = messages.length - included.size;
  if (dropped > 0) {
    const roles = messages
      .filter((_, index) => !included.has(index))
      .map(({ role }) => role)
      .join(", ");
    blocks.splice(pinnedIndex === -1 ? 0 : 1, 0, {
      index: -1,
      text: `[Earlier conversation compacted: ${dropped} message(s) omitted (${roles}). The original request above is preserved.]`,
    });
  }
  return blocks.map(({ text }) => text).join("\n\n");
}

function buildPrompt(body: JsonRecord, tools: unknown[]): string {
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    throw new Error("ChatGPT Web clean-room adapter requires messages");
  }
  const messages = body.messages.map((value) => {
    if (!isRecord(value) || typeof value.role !== "string") {
      throw new Error("ChatGPT Web clean-room adapter received an invalid message");
    }
    if (!["system", "developer", "user", "assistant", "tool"].includes(value.role)) {
      throw new Error("ChatGPT Web clean-room adapter does not support tool messages yet");
    }
    const text = contentText(value.content);
    const toolCalls = Array.isArray(value.tool_calls)
      ? value.tool_calls
          .filter(isRecord)
          .map((call) => {
            const fn = isRecord(call.function) ? call.function : call;
            const name = typeof fn.name === "string" ? fn.name : "";
            const args =
              typeof fn.arguments === "string" ? fn.arguments : JSON.stringify(fn.arguments ?? {});
            const id = typeof call.id === "string" ? call.id : "unknown";
            return name ? `Assistant tool request (${id}) ${name}: ${args}` : "";
          })
          .filter(Boolean)
          .join("\n")
      : "";
    const toolResult =
      value.role === "tool"
        ? `Tool result${typeof value.tool_call_id === "string" ? ` (${value.tool_call_id})` : ""}: ${text || "(no output)"}`
        : "";
    return { role: value.role, text: [toolResult || text, toolCalls].filter(Boolean).join("\n") };
  });

  // Budget each section: the tool contract and the checkpoint are protocol-critical and stay
  // intact; the system prompt and the transcript absorb the trimming.
  // OpenCode resends verbose descriptions for every client tool on each continuation. The
  // ChatGPT Web composer has no native tool registry, so keep the names and exact parameter
  // schemas but trim prose-only descriptions to avoid making follow-up turns stall on a large
  // flattened prompt.
  const toolPrompt = serializeToolsToPrompt(tools, { descriptionMaxChars: 360 });
  // The keyword heuristic only forces the FIRST tool call for the latest user request.
  // Once that request already has a tool result, forcing another <tool> block contradicts
  // the continuation checkpoint ("…or give the final answer") and pushes the model into a
  // spurious extra call. An explicit tool_choice still applies on every turn.
  const lastUserIndex = messages.map(({ role }) => role).lastIndexOf("user");
  const latestRequestHasToolResult = messages
    .slice(lastUserIndex + 1)
    .some(({ role }) => role === "tool");
  const continuationCheckpoint = latestRequestHasToolResult
    ? "Continue from the tool results above. Do not repeat a successful tool call; perform the next required step or give the final answer."
    : "";
  const forcedToolInstruction =
    toolChoiceInstruction(body.tool_choice) ||
    (body.tool_choice !== "none" &&
    !latestRequestHasToolResult &&
    hasExplicitClientToolIntent(messages)
      ? "The user's request explicitly requires workspace action. This turn MUST emit exactly one valid <tool> block for the next required client tool call before any prose. Do not claim that an action was completed; emit the tool call now."
      : "");
  const userMessages = messages.filter(({ role }) => role === "user" || role === "tool");
  const singleUserOnly = userMessages.length === 1 && messages.length === 1;
  let transcript: string;
  if (singleUserOnly) {
    transcript = userMessages[0].text;
  } else {
    const fixed = [toolPrompt, continuationCheckpoint, forcedToolInstruction]
      .filter(Boolean)
      .join("\n\n");
    // System/developer instructions are advisory context; compress them hard when the request
    // is large instead of dropping the protocol contract or failing the turn.
    const transcriptBudget = Math.max(
      4_000,
      MAX_PROMPT_CHARS - fixed.length - SYSTEM_PROMPT_BUDGET_CHARS
    );
    const systemPromptBudget =
      tools.length > 0 ? TOOL_SYSTEM_PROMPT_BUDGET_CHARS : SYSTEM_PROMPT_BUDGET_CHARS;
    const normalized = messages.map(({ role, text }) =>
      role === "system" || role === "developer"
        ? { role, text: clampText(text, systemPromptBudget) }
        : { role, text }
    );
    transcript = compactTranscript(normalized, transcriptBudget);
  }
  const promptWithTools = [transcript, toolPrompt, continuationCheckpoint, forcedToolInstruction]
    .filter(Boolean)
    .join("\n\n");
  if (!promptWithTools.trim())
    throw new Error("ChatGPT Web clean-room adapter requires non-empty text");
  if (promptWithTools.length > MAX_PROMPT_CHARS) {
    // ChatGPT Web refuses oversized composer submissions; fail with the budget in the message
    // rather than letting the browser surface an opaque "message too long" turn.
    return `${clampText(promptWithTools, MAX_PROMPT_CHARS)}`;
  }
  if (new TextEncoder().encode(promptWithTools).byteLength > MAX_PROMPT_BYTES) {
    throw new Error("ChatGPT Web clean-room adapter prompt is too large");
  }
  return promptWithTools;
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
  const tools = requestedToolsForTurn(body);
  const prompt = buildPrompt(body, tools);
  const attachments = extractChatGptWebAttachmentSources(
    body.messages as Array<{ role?: string; content?: unknown }>
  );
  return {
    prompt,
    selection: resolveSelection(model, body),
    attachments,
    tools,
    timeoutMs: resolveChatGptWebTurnTimeoutMs(tools),
  };
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

/**
 * ChatGPT Web runs on servers without a display, where a headed Chromium either
 * cannot start or leaves a visible window on the operator's desktop. Headless is
 * therefore the default; set `CHATGPT_WEB_HEADLESS=0` to force a windowed browser
 * for accounts whose first-party challenge rejects headless mode.
 */
export function resolveChatGptWebHeadless(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env.CHATGPT_WEB_HEADLESS;
  if (raw === undefined || raw.trim() === "") return true;
  return !/^(?:0|false|no|off|headed)$/i.test(raw.trim());
}

/**
 * Bound browser acquisition. A launch/warmup that never settles must not consume
 * the request-queue execution deadline (600s by default) — the client would get an
 * opaque 504 with no completion. This keeps the failure local, fast and classifiable.
 */
export function resolveChatGptWebBrowserAcquireTimeoutMs(
  env: NodeJS.ProcessEnv = process.env
): number {
  return positiveTimeout(env.CHATGPT_WEB_BROWSER_ACQUIRE_TIMEOUT_MS, 45_000);
}

async function acquireSessionPage(
  input: ChatGptWebSessionFactoryInput,
  digest: string,
  headless: boolean
): Promise<ChatGptWebBrowserSession> {
  const timeoutMs = resolveChatGptWebBrowserAcquireTimeoutMs();
  let timer: NodeJS.Timeout | undefined;
  try {
    const acquire = (async () => {
      const pooled = await acquireBrowserContext(`chatgpt-web-cleanroom:${digest}`, {
        cookieDomain: "chatgpt.com",
        storageState: input.storageState,
        userAgent: input.userAgent,
        locale: input.locale,
        timezone: input.timezone,
        proxyProviderKey: "chatgpt-web",
        warmupUrl: CHATGPT_WEB_PAGE_URL,
        headless,
        executablePath: input.chromeExecutablePath,
      });
      // A dedicated page per turn. Reusing one page across turns raced with the SPA's own
      // navigation between turns, which destroyed in-flight `page.evaluate` calls
      // ("Execution context was destroyed, most likely because of a navigation") and left the
      // composer unable to accept text. The pooled *context* still keeps cookies and warm state.
      const page = await openPage(pooled);
      return page;
    })();
    const timeout = new Promise<never>((_, reject) => {
      // Deliberately NOT unref'd: this bound must fire even when the pending browser
      // work holds no active libuv handle — an unresolved CDP call settles nothing,
      // so an unref'd timer lets the process exit silently instead of surfacing it.
      timer = setTimeout(
        () =>
          reject(
            new Error(
              `ChatGPT Web browser launch timed out after ${timeoutMs}ms ` +
                `(headless=${headless}). The browser could not be started or reach chatgpt.com.`
            )
          ),
        timeoutMs
      );
    });
    const page = await Promise.race([acquire, timeout]);
    return new PlaywrightChatGptWebBrowserSession(page, {
      pageUrl: CHATGPT_WEB_PAGE_URL,
      selection: input.selection,
      // Per-turn page: close it on cleanup so reused contexts do not accumulate pages.
      closePageOnCleanup: true,
    });
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function createDefaultSession(
  input: ChatGptWebSessionFactoryInput
): Promise<ChatGptWebBrowserSession> {
  return acquireSessionPage(input, chatGptWebPoolDigest(input), resolveChatGptWebHeadless());
}

export function chatGptWebPoolDigest(input: ChatGptWebSessionFactoryInput): string {
  return createHash("sha256")
    .update(input.connectionId)
    .update("\0")
    .update(JSON.stringify(input.storageState))
    .digest("hex");
}

/**
 * ChatGPT intermittently answers `/f/conversation` with a redirect to the app root,
 * so the "response" is the ~600KB SPA shell instead of an SSE stream (observed
 * alternating with healthy turns on the same account, seconds apart). A pooled page
 * can stay in that state, so the recovery is a fresh context plus one retry rather
 * than failing the request outright.
 */
export function isRetryableChatGptWebHandshake(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /non-SSE response|assistant document is incomplete|conversation returned an invalid response|conversation request scope is unavailable|request module was not loaded|bridge did not initialize|sentinel headers are unavailable|assistant response stayed empty|assistant response never started/i.test(
    message
  );
}

/**
 * The web model sometimes *narrates* the tool flow instead of emitting the envelope —
 * observed live: `finish_reason: "stop"` with "Done. I inspected the workspace, created
 * /tmp/opencode/index.html, and verified …" while no tool ran. The agentic client trusts that
 * text and stops, so the task silently does nothing. Detect that shape and re-issue the turn
 * once with a corrective instruction.
 */
export function shouldRetryWithToolReminder(
  result: Pick<ChatGptWebBrowserTurnResult, "text" | "toolCalls">,
  tools: unknown,
  messages?: unknown
): boolean {
  if (!Array.isArray(tools) || tools.length === 0) return false;
  if (result.toolCalls?.length) return false;
  const text = typeof result.text === "string" ? result.text : "";
  if (!text.trim()) return false;
  // A real envelope is handled by the parser downstream; never nudge on top of one. A closed
  // block is required: prose that merely names the protocol ("I can't emit the required
  // workspace <tool> protocol") is exactly the refusal this predicate must catch.
  if (/<tool>[\s\S]*<\/tool>|<tool_call>[\s\S]*<\/tool_call>/i.test(text)) return false;

  const history = Array.isArray(messages) ? messages : [];
  const hasToolExchange = history.some(
    (message) =>
      isRecord(message) &&
      (message.role === "tool" ||
        (message.role === "assistant" &&
          Array.isArray(message.tool_calls) &&
          message.tool_calls.length > 0))
  );
  const toolResults = history
    .filter((message) => isRecord(message) && message.role === "tool")
    .map((message) => contentText((message as { content?: unknown }).content));
  // Did a write ACTUALLY land? Without this the model's "Created index.html …" after a merely
  // read-only inspection (glob → "No files found") went uncorrected and the task silently
  // failed; but nudging every claim after a successful write produced a ~25-minute verify-loop.
  const writeHappened = toolResults.some((value) =>
    /updated the following files|applied patch|success.*(created|added|updated|wrote)|(created|added|updated|wrote).*success/i.test(
      value
    )
  );
  if (hasToolExchange && writeHappened) {
    // The work is done: any prose here is a completion summary, and nudging it only costs
    // another tool round trip.
    return false;
  }

  // Any reply that talks ABOUT the client tools (or the tool protocol) instead of emitting an
  // envelope is a miss. Enumerating refusal phrasings was whack-a-mole — two captures alone were
  // "the client-side workspace tool isn't available in my current tool registry" and "I can't
  // emit the required workspace <tool> protocol from this interface". A bare mention is the
  // signal; the post-success guard above still suppresses nudges once a write has landed.
  if (/\btools?\b|tool_call/i.test(text)) return true;

  // A claim of file work that no tool result supports is the miss we must correct.
  if (
    /\b(created|built|wrote|written|saved|updated|added|verified)\b[^.]*\b(file|page|index\.html|html|script)\b/i.test(
      text
    )
  ) {
    return writeHappened ? false : true;
  }

  // Before any tool has run, the remaining misses are a refused invocation and ChatGPT's own
  // built-in features taking over ("Data analysis isn't available right now").
  if (!hasToolExchange) {
    if (
      /\b(invoke|invoked|invocation|tool call|apply_patch|couldn['’]t complete|cannot complete|unable to complete|unable to execute|unable to perform|not accepted)\b/i.test(
        text
      )
    ) {
      return true;
    }
    if (/\b(data analysis|canvas|browsing|code interpreter)\b/i.test(text)) return true;
  } else if (
    /\b(not accepted|invocation failed|couldn['’]t complete|could not complete|unable to execute|unable to perform)\b/i.test(
      text
    )
  ) {
    return true;
  }

  return mentionsRequestedTool(text, tools);
}

/** True when the reply names one of the client tools it was offered. */
function mentionsRequestedTool(text: string, tools: unknown): boolean {
  const names = (Array.isArray(tools) ? tools : [])
    .map((tool) =>
      typeof (tool as { function?: { name?: unknown } })?.function?.name === "string"
        ? String((tool as { function: { name: string } }).function.name)
        : ""
    )
    .filter(Boolean);
  return names.some((name) => new RegExp(`\\b${name}\\b`, "i").test(text));
}

export const TOOL_REMINDER_PROMPT =
  "\n\nIMPORTANT: your last reply did not contain a <tool>{...}</tool> block. Do not describe " +
  "actions, do not ask whether to proceed, and do not offer or discuss ChatGPT built-in features " +
  "(data analysis, canvas, browsing). Respond now with exactly one <tool>{...}</tool> block for the " +
  "next required action, using only the client tools listed above. Only if no tool is genuinely " +
  "required, answer normally without claiming that any tool ran.";

export function buildChatGptWebOpenAiResponse(
  model: string,
  result: ChatGptWebBrowserTurnResult,
  stream: boolean,
  metadata: { id?: string; created?: number; tools?: unknown[] } = {}
): Response {
  const id = metadata.id ?? `chatcmpl-${randomUUID()}`;
  const created = metadata.created ?? Math.floor(Date.now() / 1000);
  const parsed = parseToolCallsFromText(result.text, id, metadata.tools);
  const toolCalls = result.toolCalls?.length ? result.toolCalls : (parsed.toolCalls ?? []);
  const content = result.toolCalls?.length ? result.text : parsed.content;
  if (!stream) {
    return Response.json({
      id,
      object: "chat.completion",
      created,
      model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: toolCalls.length ? null : content,
            ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
          },
          finish_reason: toolCalls.length ? "tool_calls" : "stop",
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
      choices: [
        {
          index: 0,
          delta: toolCalls.length
            ? { tool_calls: toolCalls.map((call, index) => ({ ...call, index })) }
            : { content },
          finish_reason: null,
        },
      ],
    },
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: toolCalls.length ? "tool_calls" : "stop" }],
    },
  ];
  return new Response(
    chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("") + "data: [DONE]\n\n",
    { headers: { "Content-Type": "text/event-stream; charset=utf-8" } }
  );
}

/**
 * One ChatGPT Web UI session per pooled browser context. An OpenAI-compatible client (OpenCode)
 * fires its title request alongside the main turn, so two requests opened their own page in the
 * SAME shared context; ChatGPT's SPA navigation then clobbered the sibling's composer. Observed
 * live: whichever request lost the race failed with `ChatGPT Web composer did not accept the
 * prompt` after both insert retries, because the reload-retry raced the sibling too. Turns are
 * therefore serialized per context — and the context may only be dropped by the request holding
 * it, so a retry cannot yank the browser out from under a concurrent turn.
 */
const contextTurnQueues = new Map<string, Promise<void>>();

async function withContextTurnLock<T>(key: string, task: () => Promise<T>): Promise<T> {
  const previous = contextTurnQueues.get(key) ?? Promise.resolve();
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const queued = previous.then(() => gate);
  contextTurnQueues.set(key, queued);
  // A failed predecessor must not poison the queue for everyone behind it.
  await previous.catch(() => {});
  try {
    return await task();
  } finally {
    release();
    if (contextTurnQueues.get(key) === queued) contextTurnQueues.delete(key);
  }
}

export async function executeChatGptWebCleanRoom(
  input: Pick<ExecuteInput, "model" | "body" | "stream" | "credentials" | "signal">,
  deps: ChatGptWebExecutorAdapterDeps = {}
): Promise<Response> {
  const prepared = prepareChatGptWebBrowserRequest(input.model, input.body);
  const originalMessages = isRecord(input.body) ? input.body.messages : undefined;
  const attachments = await resolveChatGptWebAttachments(prepared.attachments);
  const storageState = readStorageState(input.credentials);
  const connectionId = optionalString(input.credentials.connectionId);
  if (!connectionId) throw new Error("ChatGPT Web clean-room adapter requires a connection ID");
  const providerData = input.credentials.providerSpecificData;
  const sessionInput: ChatGptWebSessionFactoryInput = {
    connectionId,
    storageState,
    selection: prepared.selection,
    userAgent: optionalString(providerData?.customUserAgent),
    locale: optionalString(providerData?.locale),
    timezone: optionalString(providerData?.timezone),
    chromeExecutablePath: resolveChatGptWebChromeExecutable(
      optionalString(providerData?.chromeExecutablePath)
    ),
  };
  const createSession = deps.createSession ?? createDefaultSession;
  const runTurn = deps.runTurn ?? runChatGptWebBrowserTurn;

  // One retry on a fresh context: the app-shell redirect is transient and a reused
  // page can otherwise stay wedged in it for the whole request.
  // Two chances: one for a transient handshake failure, and (for tool turns) one corrective
  // retry when the model answered in prose instead of invoking a tool.
  const poolKey = `chatgpt-web-cleanroom:${chatGptWebPoolDigest(sessionInput)}`;

  // One turn at a time per pooled context (see withContextTurnLock).
  return withContextTurnLock(poolKey, async () => {
    const maxAttempts = 3;
    let lastError: unknown;
    let correctedPrompt: string | null = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const session = await createSession(sessionInput);
      try {
        const result = await runTurn(session, {
          prompt: correctedPrompt ?? prepared.prompt,
          attachments,
          tools: prepared.tools,
          timeoutMs: prepared.timeoutMs,
          signal: input.signal,
        });
        if (
          correctedPrompt === null &&
          attempt < maxAttempts &&
          !input.signal?.aborted &&
          shouldRetryWithToolReminder(result, prepared.tools, originalMessages)
        ) {
          // Re-issue once, telling the model that describing work is not doing it.
          correctedPrompt = clampText(prepared.prompt + TOOL_REMINDER_PROMPT, MAX_PROMPT_CHARS);
          continue;
        }
        return buildChatGptWebOpenAiResponse(input.model, result, input.stream, {
          id: deps.id?.(),
          created: deps.now ? Math.floor(deps.now() / 1000) : undefined,
          tools: prepared.tools,
        });
      } catch (error) {
        lastError = error;
        const retryable = isRetryableChatGptWebHandshake(error);
        if (attempt >= maxAttempts || !retryable || input.signal?.aborted) throw error;
        // Drop the pooled context so the retry gets a brand-new page and handshake. Safe while
        // this request holds the turn lock: no sibling turn is using the context.
        await releaseBrowserContext(poolKey).catch(() => {});
      }
    }
    throw lastError;
  });
}
