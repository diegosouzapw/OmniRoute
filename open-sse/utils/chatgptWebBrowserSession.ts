import { Buffer } from "node:buffer";

import type { ChatGptWebResolvedAttachment } from "./chatgptWebAttachments.ts";
import {
  executeChatGptWebFirstPartyTurn,
  type ChatGptWebFirstPartyRequest,
  type ChatGptWebUiSelection,
} from "./chatgptWebFirstParty.ts";
import { ChatGptWebDeltaV1Decoder, parseChatGptWebEncodedItem } from "./chatgptWebDeltaV1.ts";
import {
  ChatGptWebTopicStream,
  parseChatGptWebConversationHandoff,
} from "./chatgptWebTransport.ts";

type JsonRecord = Record<string, unknown>;
type Page = import("playwright").Page;

const CHATGPT_WEB_ORIGIN = "https://chatgpt.com";
const DEFAULT_TURN_TIMEOUT_MS = 180_000;
const MAX_BUFFERED_FRAMES = 2_048;
const MAX_BUFFERED_FRAME_BYTES = 16 * 1024 * 1024;

export interface ChatGptWebBrowserSessionHandlers {
  onBootstrap(sseText: string): void;
  onWebSocketFrame(frameText: string): void;
  onError(error: Error): void;
}

/**
 * Boundary owned by a logged-in first-party browser page.
 *
 * The implementation must let ChatGPT's own page execute Sentinel, Turnstile, proof-of-work,
 * cookies, and conduit preparation. Callers receive only the sanitized stream result.
 */
/** Composer-driven submission timings (see submitPromptViaComposer). */
const COMPOSER_WAIT_TIMEOUT_MS = 20_000;
const COMPOSER_SETTLE_MS = 400;
const COMPOSER_SUBMIT_MS = 1_200;
const COMPOSER_TYPED_TIMEOUT_MS = 15_000;
const RENDERED_POLL_MS = 1_500;
const RENDERED_STABLE_TICKS = 2;
/**
 * How long an assistant bubble may stay mounted-empty with generation already finished before the
 * turn is declared dead. Short on purpose: the adapter retries and that retry is what actually
 * produces the answer (observed ~15s), so waiting longer only delays the inevitable.
 */
const COMPOSER_EMPTY_ASSISTANT_GRACE_MS = 6_000;
/**
 * How long a submitted turn may produce NO assistant text at all before it is declared dead.
 *
 * Two live flavours of a dead turn exist, and only this deadline catches both: ChatGPT may mount
 * an assistant bubble and leave it empty (`count=1 textLen=0` for 153s), or accept the user message
 * and never create a reply node at all (`count=0, roles:["user"]` for 153s). A healthy turn shows
 * text by ~11s, so abandoning at 25s costs at most one fast retry (~20s) instead of burning the
 * whole 153s read budget.
 */
const COMPOSER_NO_ANSWER_DEADLINE_MS = 25_000;

export interface ChatGptWebBrowserSession {
  url(): string;
  start(handlers: ChatGptWebBrowserSessionHandlers): Promise<() => Promise<void>>;
  submitPrompt(request: ChatGptWebBrowserSubmission): Promise<string | void>;
  readRenderedAssistantText?(timeoutMs?: number): Promise<string | null>;
  /** Signing-free submission through ChatGPT's own composer (preferred when available). */
  submitPromptViaComposer?(request: ChatGptWebBrowserSubmission): Promise<void>;
  /** Resolve the rendered text of the assistant reply for the composer path. */
  awaitRenderedAssistantText?(timeoutMs: number): Promise<string | null>;
}

export interface ChatGptWebBrowserSubmission {
  prompt: string;
  attachments: ChatGptWebResolvedAttachment[];
  tools?: unknown[];
  signal?: AbortSignal | null;
}

export interface ChatGptWebBrowserTurnRequest {
  prompt: string;
  attachments?: ChatGptWebResolvedAttachment[];
  timeoutMs?: number;
  signal?: AbortSignal | null;
  tools?: unknown[];
}

/**
 * Did the composer accept the prompt? Compares whitespace-FREE text: ProseMirror's `textContent`
 * concatenates blocks with no separator ("a\nb" -> "ab"), so a space-normalised tail spanning a
 * paragraph boundary never matched. That false negative rejected prompts whose last 40 characters
 * cross a line break — every OpenCode title request ends with "…conversation:" then "HI" — as
 * "composer did not accept the prompt" even though the whole prompt was present in the element
 * (observed live: `promptLen: 2110` with the insert reported as rejected).
 */
export function composerAcceptedPrompt(prompt: string, composerText: string): boolean {
  const expectedTail = prompt.replace(/\s+/g, "").slice(-40);
  return composerText.replace(/\s+/g, "").includes(expectedTail);
}

/**
 * Is the last assistant message a NEW answer, or history that was already on the page when the turn
 * started?
 *
 * Counting alone is not enough: the SPA can mount the assistant bubble before the baseline is
 * captured, so `count > initial` rejected the genuine answer forever. Observed live with a complete
 * `<tool>` envelope sitting in the DOM (`count=1 initial=1 textLen=73`) while the turn burned its
 * entire budget and only the retry — whose timing differed — returned in ~15s.
 */
export function isNewAssistantAnswer(
  state: { count: number; text: string },
  baseline: { count: number; text: string }
): boolean {
  if (!state.text.trim()) return false;
  return state.count > baseline.count || state.text !== baseline.text;
}

export interface ChatGptWebBrowserTurnResult {
  conversationId: string;
  turnExchangeId: string;
  text: string;
  status: string;
  endTurn: true;
  toolCalls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
}

export type { ChatGptWebUiSelection } from "./chatgptWebFirstParty.ts";

export interface PlaywrightChatGptWebBrowserSessionOptions {
  pageUrl?: string;
  selection?: ChatGptWebUiSelection;
  closePageOnCleanup?: boolean;
  executePageRequest?: (
    page: Page,
    input: ChatGptWebFirstPartyRequest,
    options?: { signal?: AbortSignal | null }
  ) => Promise<string>;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requirePrompt(value: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("ChatGPT Web browser turn requires a non-empty prompt");
  }
  return value;
}

function requireFirstPartyUrl(value: string): void {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("ChatGPT Web browser session requires a valid URL");
  }
  if (url.origin !== CHATGPT_WEB_ORIGIN) {
    throw new Error("ChatGPT Web browser session requires the first-party chatgpt.com origin");
  }
}

function maybeTerminalResult(
  snapshot: unknown,
  conversationId: string,
  turnExchangeId: string
): ChatGptWebBrowserTurnResult | null {
  if (!isRecord(snapshot) || !isRecord(snapshot.message)) return null;
  const message = snapshot.message;
  const author = isRecord(message.author) ? message.author : null;
  const content = isRecord(message.content) ? message.content : null;
  const parts = Array.isArray(content?.parts) ? content.parts : [];
  const toolCalls = extractToolCalls(message) ?? [];
  if (
    author?.role !== "assistant" ||
    content?.content_type !== "text" ||
    !parts.every((part) => typeof part === "string") ||
    message.status !== "finished_successfully" ||
    message.end_turn !== true
  ) {
    return null;
  }
  return {
    conversationId,
    turnExchangeId,
    text: parts.join(""),
    status: message.status,
    endTurn: true,
    ...(toolCalls.length > 0 ? { toolCalls } : {}),
  };
}

/**
 * A serialized client-tool envelope is an OpenAI boundary even when the
 * first-party stream has not emitted its final status yet. ChatGPT Web may
 * keep that stream open for internal work, so returning here lets the client
 * execute the requested tool in a fresh, bounded continuation turn.
 */
function maybeToolCallResult(
  snapshot: unknown,
  conversationId: string,
  turnExchangeId: string
): ChatGptWebBrowserTurnResult | null {
  if (!isRecord(snapshot) || !isRecord(snapshot.message)) return null;
  const message = snapshot.message;
  const author = isRecord(message.author) ? message.author : null;
  const content = isRecord(message.content) ? message.content : null;
  const parts = Array.isArray(content?.parts) ? content.parts : [];
  if (
    author?.role !== "assistant" ||
    content?.content_type !== "text" ||
    !parts.every((part) => typeof part === "string")
  ) {
    return null;
  }
  const text = parts.join("");
  if (!/<\/tool>/i.test(text)) return null;
  return {
    conversationId,
    turnExchangeId,
    text,
    status: "tool_calls",
    endTurn: true,
  };
}

function extractToolCalls(message: JsonRecord): ChatGptWebBrowserTurnResult["toolCalls"] {
  const candidates: unknown[] = [message.tool_calls, message.function_calls];
  const content = isRecord(message.content) ? message.content : null;
  if (Array.isArray(content?.parts)) candidates.push(...content.parts);
  const calls: NonNullable<ChatGptWebBrowserTurnResult["toolCalls"]> = [];
  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;
    for (const item of candidate) {
      if (!isRecord(item)) continue;
      const fn = isRecord(item.function) ? item.function : item;
      const name =
        typeof fn.name === "string" ? fn.name : typeof item.name === "string" ? item.name : "";
      if (!name) continue;
      const args = fn.arguments ?? item.arguments ?? fn.input ?? item.input ?? {};
      calls.push({
        id: typeof item.id === "string" ? item.id : `call_chatgpt_${calls.length + 1}`,
        type: "function",
        function: { name, arguments: typeof args === "string" ? args : JSON.stringify(args) },
      });
    }
  }
  return calls;
}

function snapshotMessageRole(snapshot: unknown): string | null {
  if (!isRecord(snapshot) || !isRecord(snapshot.message)) return null;
  const author = isRecord(snapshot.message.author) ? snapshot.message.author : null;
  return typeof author?.role === "string" ? author.role : null;
}

function terminalResult(
  snapshot: unknown,
  conversationId: string,
  turnExchangeId: string
): ChatGptWebBrowserTurnResult {
  const result = maybeTerminalResult(snapshot, conversationId, turnExchangeId);
  if (result) return result;
  if (!isRecord(snapshot) || !isRecord(snapshot.message)) {
    const rootKeys = isRecord(snapshot) ? Object.keys(snapshot).sort().join(",") : "non-object";
    throw new Error(`ChatGPT Web assistant document is incomplete (root=${rootKeys})`);
  }
  const message = snapshot.message;
  const author = isRecord(message.author) ? message.author : null;
  const content = isRecord(message.content) ? message.content : null;
  const parts = Array.isArray(content?.parts) ? content.parts : [];
  const summary = JSON.stringify({
    messageKeys: Object.keys(message).sort(),
    role: author?.role ?? null,
    contentType: content?.content_type ?? null,
    partCount: parts.length,
    partTypes: parts.map((part) => typeof part),
    status: message.status ?? null,
    endTurn: message.end_turn ?? null,
  });
  throw new Error(`ChatGPT Web assistant document is incomplete (${summary})`);
}

function encodeParsedEvent(event: ReturnType<typeof parseChatGptWebEncodedItem>[number]): string {
  const eventLine = event.event === "message" ? "" : `event: ${event.event}\n`;
  return `${eventLine}data: ${event.data}\n\n`;
}

/** Decode the direct first-party `/f/conversation` SSE body. */
export function parseChatGptWebDirectConversation(sseText: string): ChatGptWebBrowserTurnResult {
  if (typeof sseText !== "string" || !sseText.trim()) {
    throw new Error("ChatGPT Web direct conversation returned an empty stream");
  }
  let decoder = new ChatGptWebDeltaV1Decoder();
  let conversationId = "";
  let turnExchangeId = "";
  let latestTerminal: ChatGptWebBrowserTurnResult | null = null;
  for (const event of parseChatGptWebEncodedItem(sseText)) {
    if (isRecord(event.json)) {
      if (typeof event.json.conversation_id === "string") {
        conversationId = event.json.conversation_id;
      }
      if (typeof event.json.turn_exchange_id === "string") {
        turnExchangeId = event.json.turn_exchange_id;
      }
    }
    if (event.event === "delta_encoding") {
      latestTerminal =
        maybeTerminalResult(decoder.snapshot(), conversationId, turnExchangeId) ?? latestTerminal;
      decoder = new ChatGptWebDeltaV1Decoder();
    }
    decoder.ingest(encodeParsedEvent(event));
    latestTerminal =
      maybeTerminalResult(decoder.snapshot(), conversationId, turnExchangeId) ?? latestTerminal;
    const toolCall = maybeToolCallResult(decoder.snapshot(), conversationId, turnExchangeId);
    if (toolCall) return toolCall;
  }
  const result =
    maybeTerminalResult(decoder.snapshot(), conversationId, turnExchangeId) ?? latestTerminal;
  if (!result) return terminalResult(decoder.snapshot(), conversationId, turnExchangeId);
  return { ...result, conversationId, turnExchangeId };
}

function turnError(error: unknown, fallback: string): Error {
  return error instanceof Error ? error : new Error(fallback);
}

class ChatGptWebBrowserTurnRunner {
  private decoder = new ChatGptWebDeltaV1Decoder();
  private readonly bufferedFrames: string[] = [];
  private bufferedFrameBytes = 0;
  private topicStream: ChatGptWebTopicStream | null = null;
  private conversationId = "";
  private turnExchangeId = "";
  private latestTerminalAssistant: ChatGptWebBrowserTurnResult | null = null;
  private renderedReadPending = false;
  private settled = false;
  /**
   * True only once resolveResult/rejectResult has actually been called. `settled`
   * alone is not enough: a path that sets `settled` and then throws (for example a
   * parse error) leaves the turn promise pending forever, and every later
   * settlement attempt — including the turn timeout — was silently discarded.
   */
  private outcomeDelivered = false;
  /** Composer path budget, set from the turn timeout in run(). */
  private composerTimeoutMs = 150_000;
  private readonly turnController = new AbortController();
  private readonly resultPromise: Promise<ChatGptWebBrowserTurnResult>;
  private resolveResult: (result: ChatGptWebBrowserTurnResult) => void = () => {};
  private rejectResult: (error: Error) => void = () => {};

  constructor(
    private readonly session: ChatGptWebBrowserSession,
    private readonly prompt: string,
    private readonly attachments: ChatGptWebResolvedAttachment[],
    private readonly tools: unknown[]
  ) {
    this.resultPromise = new Promise((resolve, reject) => {
      this.resolveResult = resolve;
      this.rejectResult = reject;
    });
    // Browser events can finish while Playwright is still resolving submission.
    void this.resultPromise.catch(() => {});
  }

  private fail(error: Error): void {
    if (this.outcomeDelivered) return;
    this.settled = true;
    this.outcomeDelivered = true;
    this.turnController.abort();
    this.rejectResult(error);
  }

  private complete(): void {
    if (this.settled) return;
    try {
      const result =
        this.latestTerminalAssistant ??
        terminalResult(this.decoder.snapshot(), this.conversationId, this.turnExchangeId);
      this.settled = true;
      this.outcomeDelivered = true;
      this.resolveResult(result);
    } catch (error) {
      this.fail(turnError(error, "ChatGPT Web browser turn failed"));
    }
  }

  private completeFromRenderedAssistant(): void {
    if (this.renderedReadPending || !this.session.readRenderedAssistantText) return;
    this.renderedReadPending = true;
    void this.session
      .readRenderedAssistantText(10_000)
      .then((text) => this.acceptRenderedAssistant(text))
      .catch(() => {
        this.renderedReadPending = false;
      });
  }

  private acceptRenderedAssistant(text: string | null): void {
    this.renderedReadPending = false;
    if (this.settled || typeof text !== "string" || !text.trim()) return;
    this.settled = true;
    this.outcomeDelivered = true;
    this.resolveResult({
      conversationId: this.conversationId,
      turnExchangeId: this.turnExchangeId,
      text: text.trim(),
      status: "finished_successfully",
      endTurn: true,
    });
  }

  private finishFrame(): void {
    if (this.latestTerminalAssistant) {
      this.complete();
      return;
    }
    if (snapshotMessageRole(this.decoder.snapshot()) !== "tool") {
      this.complete();
      return;
    }
    this.topicStream = null;
    this.decoder = new ChatGptWebDeltaV1Decoder();
    this.completeFromRenderedAssistant();
  }

  private ingestFrame(frameText: string): void {
    if (!this.topicStream || this.settled) return;
    try {
      const frame = this.topicStream.ingestFrame(frameText);
      for (const encodedItem of frame.encodedItems) {
        if (!this.decoder.ingest(encodedItem).changed) continue;
        this.latestTerminalAssistant =
          maybeTerminalResult(this.decoder.snapshot(), this.conversationId, this.turnExchangeId) ??
          this.latestTerminalAssistant;
        const toolCall = maybeToolCallResult(
          this.decoder.snapshot(),
          this.conversationId,
          this.turnExchangeId
        );
        if (toolCall) {
          this.settled = true;
          this.outcomeDelivered = true;
          this.turnController.abort();
          this.resolveResult(toolCall);
          return;
        }
      }
      if (frame.done) this.finishFrame();
    } catch (error) {
      this.fail(turnError(error, "ChatGPT Web stream decoding failed"));
    }
  }

  private handleBootstrap(sseText: string): void {
    this.bootstrapCount += 1;
    if (this.settled) return;
    if (this.topicStream) {
      this.fail(new Error("ChatGPT Web browser turn received more than one handoff"));
      return;
    }
    try {
      const handoff = parseChatGptWebConversationHandoff(sseText);
      if (this.conversationId && handoff.conversationId !== this.conversationId) {
        this.fail(new Error("ChatGPT Web browser turn changed conversation during handoff"));
        return;
      }
      this.conversationId = handoff.conversationId;
      this.turnExchangeId = handoff.turnExchangeId;
      this.decoder = new ChatGptWebDeltaV1Decoder();
      this.latestTerminalAssistant = null;
      this.topicStream = new ChatGptWebTopicStream(handoff.topicId);
      for (const frame of this.bufferedFrames.splice(0)) this.ingestFrame(frame);
      this.bufferedFrameBytes = 0;
    } catch (error) {
      this.fail(turnError(error, "ChatGPT Web handoff parsing failed"));
    }
  }

  private frameCount = 0;
  private bootstrapCount = 0;

  private handleWebSocketFrame(frameText: string): void {
    this.frameCount += 1;
    if (this.settled) return;
    if (this.topicStream) {
      this.ingestFrame(frameText);
      return;
    }
    this.bufferedFrameBytes += Buffer.byteLength(frameText);
    if (
      this.bufferedFrames.length >= MAX_BUFFERED_FRAMES ||
      this.bufferedFrameBytes > MAX_BUFFERED_FRAME_BYTES
    ) {
      this.fail(new Error("ChatGPT Web browser turn exceeded the pre-handoff frame buffer"));
      return;
    }
    this.bufferedFrames.push(frameText);
  }

  private handlers(): ChatGptWebBrowserSessionHandlers {
    return {
      onBootstrap: (sseText) => this.handleBootstrap(sseText),
      onWebSocketFrame: (frameText) => this.handleWebSocketFrame(frameText),
      onError: () => this.fail(new Error("ChatGPT Web first-party browser session failed")),
    };
  }

  private submitPrompt(): void {
    // Preferred path: let the page sign and send its own request from the composer. The
    // direct `/f/conversation` call cannot be signed on builds whose proof-of-work and
    // Turnstile singletons are module-internal (see submitPromptViaComposer).
    if (
      typeof this.session.submitPromptViaComposer === "function" &&
      typeof this.session.awaitRenderedAssistantText === "function"
    ) {
      void this.session
        .submitPromptViaComposer({
          prompt: this.prompt,
          attachments: this.attachments,
          tools: this.tools,
          signal: this.turnController.signal,
        })
        .then(() =>
          this.session.awaitRenderedAssistantText!(this.composerTimeoutMs).then((text) => {
            this.acceptRenderedAssistant(text);
          })
        )
        .catch((error: unknown) => {
          this.fail(turnError(error, "ChatGPT Web composer submission failed"));
        });
      return;
    }
    void this.session
      .submitPrompt({
        prompt: this.prompt,
        attachments: this.attachments,
        tools: this.tools,
        signal: this.turnController.signal,
      })
      .then((directResponse) => {
        if (typeof directResponse !== "string" || this.settled) return;
        // A challenged/signed-out session makes the first-party endpoint answer with the
        // ChatGPT app shell (a ~600KB HTML document) instead of an SSE conversation
        // stream. Reporting that specifically beats a generic turn timeout.
        if (!/^\s*(?:event:|data:|:)/.test(directResponse)) {
          this.fail(
            new Error(
              "ChatGPT Web first-party conversation returned a non-SSE response " +
                "(the app shell) — the browser session is signed out, challenged, or redirected"
            )
          );
          return;
        }
        // Parse BEFORE marking the turn settled. Marking first meant a parse error
        // left the promise pending forever (fail() saw `settled` and returned),
        // so the request hung until the caller's 600s execution deadline.
        let parsed: ChatGptWebBrowserTurnResult;
        try {
          parsed = parseChatGptWebDirectConversation(directResponse);
        } catch {
          // The direct response is frequently a partial document (for example only
          // the echoed user turn) while the assistant content — including a client
          // tool envelope — arrives through the streaming frames. Do not fail here:
          // the frame path, the rendered-assistant read and the turn timeout all
          // remain valid settlers.
          return;
        }
        if (this.settled) return;
        this.settled = true;
        this.outcomeDelivered = true;
        this.resolveResult(parsed);
      })
      .catch((error: unknown) => {
        this.fail(turnError(error, "ChatGPT Web prompt submission failed"));
      });
  }

  async run(timeoutMs: number, signal?: AbortSignal | null): Promise<ChatGptWebBrowserTurnResult> {
    let cleanup: (() => Promise<void>) | null = null;
    // Leave headroom so the composer read finishes before the turn timeout aborts the page.
    this.composerTimeoutMs = Math.max(5_000, Math.floor(timeoutMs * 0.85));
    const timeout = setTimeout(
      () => this.fail(new Error("ChatGPT Web browser turn timed out")),
      timeoutMs
    );
    timeout.unref?.();
    const abort = (): void => this.fail(new Error("ChatGPT Web browser turn aborted"));
    signal?.addEventListener("abort", abort, { once: true });
    try {
      cleanup = await this.session.start(this.handlers());
      if (!this.settled) this.submitPrompt();
      return await this.resultPromise;
    } finally {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abort);
      await cleanup?.();
    }
  }
}

/** Run one turn while the first-party browser remains the sole challenge and auth owner. */
export async function runChatGptWebBrowserTurn(
  session: ChatGptWebBrowserSession,
  request: ChatGptWebBrowserTurnRequest
): Promise<ChatGptWebBrowserTurnResult> {
  if (request.signal?.aborted) throw new Error("ChatGPT Web browser turn aborted");
  const prompt = requirePrompt(request.prompt);
  requireFirstPartyUrl(session.url());
  const timeoutMs = request.timeoutMs ?? DEFAULT_TURN_TIMEOUT_MS;
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new Error("ChatGPT Web browser turn requires a positive timeout");
  }
  const runner = new ChatGptWebBrowserTurnRunner(
    session,
    prompt,
    request.attachments ?? [],
    request.tools ?? []
  );
  return runner.run(timeoutMs, request.signal);
}

/**
 * Playwright binding for a logged-in ChatGPT page.
 *
 * ChatGPT's own loaded module performs auth and Sentinel inside the page. The hot path never
 * touches the composer, model picker, attachment input, cookies, or bearer tokens.
 */
export class PlaywrightChatGptWebBrowserSession implements ChatGptWebBrowserSession {
  private readonly pageUrl: string;
  private readonly selection: ChatGptWebUiSelection | undefined;
  private readonly closePageOnCleanup: boolean;
  private readonly executePageRequest: NonNullable<
    PlaywrightChatGptWebBrowserSessionOptions["executePageRequest"]
  >;

  constructor(
    private readonly page: Page,
    options: string | PlaywrightChatGptWebBrowserSessionOptions = {}
  ) {
    if (typeof options === "string") {
      this.pageUrl = options;
      this.selection = undefined;
      this.closePageOnCleanup = false;
      this.executePageRequest = executeChatGptWebFirstPartyTurn;
    } else {
      this.pageUrl = options.pageUrl ?? "https://chatgpt.com/?temporary-chat=true";
      this.selection = options.selection;
      this.closePageOnCleanup = options.closePageOnCleanup === true;
      this.executePageRequest = options.executePageRequest ?? executeChatGptWebFirstPartyTurn;
    }
  }

  url(): string {
    return this.pageUrl;
  }

  async start(handlers: ChatGptWebBrowserSessionHandlers): Promise<() => Promise<void>> {
    void handlers;
    requireFirstPartyUrl(this.pageUrl);
    const cleanup = async (): Promise<void> => {
      if (this.closePageOnCleanup) await this.page.close().catch(() => {});
    };
    try {
      // A pooled page usually remains on the previous conversation URL, which has the same
      // first-party origin. Always return it to the temporary-chat entry point between turns;
      // otherwise a continuation is typed into stale rendered history and can wait forever for
      // a new assistant node.
      if (this.page.url() !== this.pageUrl) {
        await this.page.goto(this.pageUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
      }
      requireFirstPartyUrl(this.page.url());
      return cleanup;
    } catch (error) {
      await cleanup();
      throw error;
    }
  }

  async submitPrompt(request: ChatGptWebBrowserSubmission): Promise<string> {
    if (!this.selection) throw new Error("ChatGPT Web direct request requires a model selection");
    requireFirstPartyUrl(this.page.url());
    return this.executePageRequest(
      this.page,
      {
        prompt: requirePrompt(request.prompt),
        attachments: request.attachments,
        selection: this.selection,
      },
      { signal: request.signal }
    );
  }

  /**
   * Submit through ChatGPT's own composer.
   *
   * `/f/conversation` requires an `OpenAI-Sentinel-Proof-Token` (proof-of-work) and, for many
   * accounts, a Turnstile token. Both are produced by module-internal singletons that the
   * current SPA build does not export and does not expose on `window`, so a direct request from
   * outside the app cannot be signed — ChatGPT answers 403 ("Unusual activity …") and redirects
   * to the app shell. Typing into the composer lets the page sign its own request instead.
   */
  /** Diagnostics for a composer that will not accept text (logged, never returned to clients). */
  private async describeComposerState(): Promise<Record<string, unknown>> {
    return this.page
      .evaluate(() => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[contenteditable]"));
        return {
          url: location.href.replace("https://chatgpt.com", ""),
          activeId: (document.activeElement as HTMLElement | null)?.id ?? null,
          promptLen: (document.querySelector("#prompt-textarea")?.textContent ?? "").length,
          editables: nodes.map((node) => ({
            id: node.id,
            cls: String(node.className).slice(0, 28),
            len: (node.textContent ?? "").length,
            visible: node.offsetParent !== null,
          })),
        };
      })
      .catch((error) => ({ evaluateFailed: String(error).slice(0, 120) }));
  }

  async submitPromptViaComposer(request: ChatGptWebBrowserSubmission): Promise<void> {
    const __stallStart = Date.now();
    requireFirstPartyUrl(this.page.url());
    const prompt = requirePrompt(request.prompt);

    // A pooled page can be left in a state where the composer accepts no text (observed as
    // "0 chars present" after a previous turn or a challenge redirect). Reload the first-party
    // page and retry once before failing the turn.
    const insertOnce = async (): Promise<boolean> => {
      const composer = await this.resolveComposer();
      await composer.click();
      await composer.focus().catch(() => {});
      // Insert atomically into the focused contenteditable: keyboard.insertText silently drops
      // characters on long prompts, and execCommand fires the input events ProseMirror needs.
      await this.page.evaluate((text: string) => {
        const target =
          (document.activeElement as HTMLElement | null) ??
          document.querySelector<HTMLElement>("#prompt-textarea");
        target?.focus();
        document.execCommand("insertText", false, text);
      }, prompt);
      const expectedTail = prompt;
      const deadline = Date.now() + COMPOSER_TYPED_TIMEOUT_MS;
      while (Date.now() < deadline) {
        await this.page.waitForTimeout(COMPOSER_SETTLE_MS);
        if (composerAcceptedPrompt(expectedTail, await this.readComposerText())) return true;
      }
      return false;
    };

    if (!(await insertOnce())) {
      console.warn(
        `[chatgpt-web] composer rejected the first insert: ${JSON.stringify(await this.describeComposerState())}`
      );
      await this.page
        .goto(this.pageUrl, { waitUntil: "domcontentloaded", timeout: 30_000 })
        .catch(() => {});
      await this.page.waitForTimeout(COMPOSER_SETTLE_MS);
      if (!(await insertOnce())) {
        console.warn(
          `[chatgpt-web] composer rejected the reload retry: ${JSON.stringify(await this.describeComposerState())}`
        );
        throw new Error("ChatGPT Web composer did not accept the prompt");
      }
    }
    console.warn(
      `[chatgpt-web] composer accepted the prompt (${Date.now() - __stallStart}ms since submit start)`
    );
    // Enter is the reliable submit; the send button can render before it is enabled.
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(COMPOSER_SUBMIT_MS);
    const submitted = await this.page.evaluate(
      () => (document.querySelector("#prompt-textarea")?.textContent ?? "").trim().length === 0
    );
    if (!submitted) {
      const send = this.page.locator('[data-testid="send-button"]').first();
      if (await send.isEnabled().catch(() => false)) await send.click();
    }
  }

  /**
   * The composer is a ProseMirror contenteditable; older builds exposed #prompt-textarea.
   * A reused pooled page can hold hidden nodes matching the same selectors, so pick the first
   * *visible* candidate and reload once before giving up.
   */
  private async resolveComposer(): Promise<import("playwright").Locator> {
    const candidates = [
      "#prompt-textarea",
      'div.ProseMirror[contenteditable="true"]',
      '[contenteditable="true"]',
    ];
    const visibleNow = async (): Promise<import("playwright").Locator | null> => {
      for (const selector of candidates) {
        const locator = this.page.locator(selector).first();
        if (await locator.isVisible().catch(() => false)) return locator;
      }
      return null;
    };
    const immediate = await visibleNow();
    if (immediate) return immediate;
    const combinedSelector = candidates.map((selector) => `${selector}:visible`).join(", ");
    const combined = this.page.locator(combinedSelector).first();
    if (await combined.isVisible().catch(() => false)) return combined;
    // Reload once: a stale pooled page can sit on a challenge or a partial render.
    await this.page
      .goto(this.pageUrl, { waitUntil: "domcontentloaded", timeout: 30_000 })
      .catch(() => {});
    await this.page.waitForTimeout(COMPOSER_SETTLE_MS);
    const afterReload = await visibleNow();
    if (afterReload) return afterReload;
    const retry = this.page.locator(combinedSelector).first();
    await retry.waitFor({ state: "visible", timeout: COMPOSER_WAIT_TIMEOUT_MS });
    return retry;
  }

  /** Whitespace-normalised composer text, so ProseMirror's block boundaries do not matter. */
  private async readComposerText(): Promise<string> {
    return this.page.evaluate(() =>
      (document.querySelector("#prompt-textarea")?.textContent ?? "").replace(/\s+/g, " ")
    );
  }

  private async countAssistantMessages(): Promise<number> {
    return this.page.evaluate(
      () => document.querySelectorAll('[data-message-author-role="assistant"]').length
    );
  }

  /** Wait for a new assistant message and return its rendered text once it stops growing. */
  /** Count of assistant messages plus the current text of the last one, read atomically. */
  private async readAssistantState(): Promise<{
    count: number;
    text: string;
    streaming: boolean;
    emptyNode: boolean;
  }> {
    return this.page.evaluate(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-message-author-role="assistant"]')
      );
      const lastNode = nodes[nodes.length - 1];
      // textContent, not innerText: the message node can mount with its content not yet laid
      // out, and innerText returns "" for a visible-but-unrendered subtree.
      const text = lastNode ? (lastNode.textContent ?? "").trim() : "";
      return {
        count: nodes.length,
        text,
        streaming: Boolean(document.querySelector('[data-testid="stop-button"]')),
        emptyNode: Boolean(lastNode) && !text,
      };
    });
  }

  async awaitRenderedAssistantText(timeoutMs: number): Promise<string | null> {
    const deadline = Date.now() + timeoutMs;
    // Baseline must be captured atomically with the text it corresponds to. Counting alone raced
    // the SPA: when the assistant bubble mounted before the count was taken, `initial` already
    // included the NEW message, so the `count > initial` guard rejected the real answer forever and
    // the turn burned its whole budget with a complete `<tool>` envelope sitting in the DOM.
    const baseline = await this.readAssistantState();
    const initial = baseline.count;
    const initialText = baseline.text;
    let last = "";
    let stableTicks = 0;
    // Diagnostics: remember what the page looked like when we gave up, so a stalled turn can be
    // attributed instead of guessed. Never returned to clients.
    let lastState: Record<string, unknown> = {};
    let emptySince = 0;
    const startedAt = Date.now();
    let nextDiagAt = startedAt + 10_000;
    while (Date.now() < deadline) {
      await this.page.waitForTimeout(RENDERED_POLL_MS);
      const state = await this.readAssistantState();
      // A newly mounted node may still be empty; keep polling rather than treating the
      // blank as the final answer.
      lastState = {
        count: state.count,
        initial,
        textLen: state.text.length,
        streaming: state.streaming,
        tail: state.text.slice(-80),
      };
      void startedAt;
      void nextDiagAt;
      if (!isNewAssistantAnswer(state, { count: initial, text: initialText })) {
        stableTicks = 0;
        // An assistant bubble that mounted, finished generating (no stop button) and stayed empty
        // is a dead turn: ChatGPT produced no answer for this attempt. Observed live as
        // `<div class="flex w-full flex-col gap-1 empty:hidden"></div>` with no stream text —
        // waiting the full budget only burns 153s before the retry that succeeds in ~15s.
        // Fail fast so the adapter retries immediately instead.
        if (state.count > initial && !state.streaming && state.emptyNode) {
          if (!emptySince) emptySince = Date.now();
          else if (Date.now() - emptySince >= COMPOSER_EMPTY_ASSISTANT_GRACE_MS) {
            throw new Error("ChatGPT Web assistant response stayed empty");
          }
        } else {
          emptySince = 0;
        }
        // No assistant text at all for the whole grace window: the reply never started. Fail fast
        // (retryable) rather than wait out the budget for an answer that is not coming.
        if (Date.now() - startedAt >= COMPOSER_NO_ANSWER_DEADLINE_MS) {
          throw new Error("ChatGPT Web assistant response never started");
        }
        continue;
      }
      emptySince = 0;
      if (state.text === last && !state.streaming) {
        stableTicks += 1;
        if (stableTicks >= RENDERED_STABLE_TICKS) return state.text;
      } else {
        stableTicks = 0;
      }
      last = state.text;
    }
    const deep = await this.page
      .evaluate(() => {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-message-author-role]")
        );
        const last = nodes[nodes.length - 1] as HTMLElement | undefined;
        return {
          url: location.href.replace("https://chatgpt.com", ""),
          roles: nodes.map((n) => n.getAttribute("data-message-author-role")),
          lastHtml: (last?.innerHTML ?? "").slice(0, 240),
          lastChildClasses: Array.from(last?.querySelectorAll("*") ?? [])
            .slice(0, 6)
            .map((el) => String(el.className).slice(0, 40)),
          stopButton: Boolean(document.querySelector('[data-testid="stop-button"]')),
          sendButton: Boolean(document.querySelector('[data-testid="send-button"]')),
          bodyTextHead: (document.body?.innerText ?? "").replace(/\s+/g, " ").slice(0, 200),
        };
      })
      .catch((error) => ({ evaluateFailed: String(error).slice(0, 120) }));
    console.warn(
      `[chatgpt-web] rendered read gave up after ${timeoutMs}ms: ` +
        `last=${JSON.stringify(lastState)} returnedLen=${last.trim().length} ` +
        `deep=${JSON.stringify(deep)}`
    );
    return last.trim() ? last.trim() : null;
  }
}
