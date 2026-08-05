/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { type Browser, type BrowserContext, type Locator, type Page } from "playwright-core";
import { atomicWriteFile, expandUserPath, getConfigDir } from "../../config";
import type { CodexProviderConfig } from "../../types";
import { parseDataUrl } from "../image";
import { ChatGptMarkdownStream } from "./markdown";
import {
  resolveChatGptWebModelMode,
  type ChatGptWebCapabilities,
  type ChatGptWebModelMode,
} from "./model";
import {
  CHATGPT_INTERNAL_COMPACTION_MARKER,
  containsChatGptCompactionMarker,
  stripChatGptTransportMarkers,
  type CompiledChatGptWebPrompt,
  type ChatGptWebPromptImage,
} from "./prompt";
import { estimateCompiledChatGptWebInputTokens } from "./usage";
import {
  assertAuthenticatedChatGptPage,
  assertTemporaryChatPage,
  CHATGPT_TEMPORARY_CHAT_URL,
} from "../../chatgpt-session";
import {
  browserLoginStateExists,
  loginVerificationMarkerPath,
  writeVerificationMarker,
} from "../../browser-login";

const workers = new Map<string, ChatGptBrowserWorker>();

export const DEFAULT_CHATGPT_TURN_TIMEOUT_MS = 40 * 60_000;
export const CHATGPT_RESPONSE_DOM_GRACE_MS = 30_000;
export const CHATGPT_EMPTY_RESPONSE_GRACE_MS = 10_000;

const browserStageTimeouts = {
  browserPage: 60_000,
  navigation: 70_000,
  composerReady: 40_000,
  sessionVerification: 40_000,
  effortSelection: 120_000,
  promptAttachment: 60_000,
  fileAttachment: 120_000,
  send: 20_000,
} as const;

export interface BrowserTurn {
  traceId: string;
  modelId: string;
  reasoning?: string;
  capabilities: ChatGptWebCapabilities;
  prepare: () => Promise<CompiledChatGptWebPrompt & { release: () => void }>;
  abortSignal?: AbortSignal;
  onHeartbeat?: () => void;
  /** Visible ChatGPT reasoning-summary step titles only; never hidden chain-of-thought. */
  onReasoningSummary?: (text: string) => void;
  /** Stable visible ChatGPT prose between status/tool rows. */
  onCommentary?: (text: string, continuation?: boolean) => void;
  /** Append-only, structurally stable Markdown chunks. */
  onTextDelta: (delta: string) => void;
}

interface ResolvedBrowserConfig {
  appName: string;
  storageStatePath: string;
  chromeExecutablePath?: string;
  cdpEndpoint?: string;
  turnTimeoutMs: number;
  headed: boolean;
  autoApproveToolCalls: boolean;
}

export function chatGptTurnIsComplete(state: {
  responsePresent: boolean;
  running: boolean;
  currentText: string;
  completionActionVisible: boolean;
}): boolean {
  return (
    state.responsePresent &&
    !state.running &&
    state.currentText.length > 0 &&
    state.completionActionVisible
  );
}

export class ChatGptCompletionTracker {
  private candidate?: { signature: string; since: number };

  constructor(private readonly stableMs = 750) {}

  update(state: Parameters<typeof chatGptTurnIsComplete>[0], now = Date.now()): boolean {
    if (!chatGptTurnIsComplete(state)) {
      this.candidate = undefined;
      return false;
    }
    const signature = state.currentText;
    if (this.candidate?.signature !== signature) {
      this.candidate = { signature, since: now };
      return false;
    }
    return now - this.candidate.since >= this.stableMs;
  }
}

export class ChatGptTurnDomHealthTracker {
  private sawResponse = false;
  private missingResponseSince?: number;
  private emptyCompletionSince?: number;

  constructor(
    private readonly missingResponseMs = CHATGPT_RESPONSE_DOM_GRACE_MS,
    private readonly emptyCompletionMs = CHATGPT_EMPTY_RESPONSE_GRACE_MS
  ) {}

  update(
    state: {
      responsePresent: boolean;
      running: boolean;
      currentText: string;
      completionActionVisible: boolean;
    },
    now = Date.now()
  ): string | undefined {
    if (state.responsePresent) {
      this.sawResponse = true;
      this.missingResponseSince = undefined;
    } else {
      this.missingResponseSince ??= now;
      if (now - this.missingResponseSince >= this.missingResponseMs) {
        return this.sawResponse
          ? "ChatGPT response DOM disappeared while the browser turn was active"
          : "ChatGPT did not create a response DOM after the message was sent";
      }
    }

    const emptyCompletion =
      state.responsePresent &&
      !state.running &&
      state.currentText.length === 0 &&
      state.completionActionVisible;
    if (!emptyCompletion) {
      this.emptyCompletionSince = undefined;
    } else {
      this.emptyCompletionSince ??= now;
      if (now - this.emptyCompletionSince >= this.emptyCompletionMs) {
        return "ChatGPT browser turn completed without a final answer";
      }
    }
    return undefined;
  }
}

export interface ChatGptVisibleTraceBlock {
  kind: "markdown" | "status";
  text: string;
}

export interface ChatGptVisibleTraceEvent {
  kind: "reasoning" | "commentary";
  text: string;
  continuation?: boolean;
}

interface ChatGptResponseDomSnapshot {
  responsePresent: boolean;
  visibleText: string;
  fullHtml: string;
  stableHtml: string;
  completionActionVisible: boolean;
  traceBlocks: ChatGptVisibleTraceBlock[];
}

const absentResponseDomSnapshot = (): ChatGptResponseDomSnapshot => ({
  responsePresent: false,
  visibleText: "",
  fullHtml: "",
  stableHtml: "",
  completionActionVisible: false,
  traceBlocks: [],
});

/** Convert the public ChatGPT turn DOM into append-only Codex reasoning summaries. */
export class ChatGptVisibleTraceTracker {
  private readonly seen = new Set<string>();
  private readonly emittedCommentary = new Map<number, string>();
  private readonly commentaryChangedAt = new Map<number, number>();

  constructor(private readonly commentaryStabilityMs = 1_000) {}

  observe(
    blocks: ChatGptVisibleTraceBlock[],
    completionActionVisible: boolean,
    now = Date.now()
  ): ChatGptVisibleTraceEvent[] {
    let lastMarkdown = -1;
    for (let index = 0; index < blocks.length; index++) {
      if (blocks[index]!.kind === "markdown") lastMarkdown = index;
    }
    const output: ChatGptVisibleTraceEvent[] = [];
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index]!;
      if (
        containsChatGptCompactionMarker(block.text) &&
        !this.seen.has(CHATGPT_INTERNAL_COMPACTION_MARKER)
      ) {
        this.seen.add(CHATGPT_INTERNAL_COMPACTION_MARKER);
        output.push({ kind: "reasoning", text: "Context automatically compacted" });
      }
      const text = stripChatGptTransportMarkers(block.text)
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((line) => line.replace(/[\t ]+/g, " ").trim())
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      if (!text) continue;
      // The trailing Markdown root is ambiguous while running and becomes the final answer once
      // complete. It stays owned by ChatGptMarkdownStream; earlier roots are stable commentary.
      if (
        block.kind === "markdown" &&
        (completionActionVisible ? index === lastMarkdown : index === blocks.length - 1)
      ) {
        continue;
      }
      if (block.kind === "markdown") {
        const previous = this.emittedCommentary.get(index);
        if (previous === text) {
          const changedAt = this.commentaryChangedAt.get(index) ?? now;
          if (now - changedAt < this.commentaryStabilityMs) break;
          continue;
        }
        this.commentaryChangedAt.set(index, now);
        if (previous && text.startsWith(previous)) {
          this.emittedCommentary.set(index, text);
          output.push({
            kind: "commentary",
            text: text.slice(previous.length),
            continuation: true,
          });
          break;
        }
        this.emittedCommentary.set(index, text);
      }
      const key = `${block.kind}\0${text}`;
      if (this.seen.has(key)) continue;
      this.seen.add(key);
      output.push({ kind: block.kind === "markdown" ? "commentary" : "reasoning", text });
      if (block.kind === "markdown") break;
    }
    return output;
  }
}

export function chatGptEffortLabelsMatch(current: string, desired: string): boolean {
  const normalize = (value: string) => {
    const label = value.replace(/\s+/g, " ").trim();
    return /^(?:Instant|Instant 5\.5)$/.test(label) ? "Instant 5.5" : label;
  };
  return normalize(current) === normalize(desired);
}

export function isChatGptTraceControl(block: ChatGptVisibleTraceBlock): boolean {
  return block.kind === "status" && block.text.replace(/\s+/g, " ").trim() === "Answer now";
}

export function redactChatGptUiDiagnostic(value: string): string {
  return value
    .replace(
      /<codex_context_json>[\s\S]*?<\/codex_context_json>/gi,
      "<codex_context_json>[redacted]</codex_context_json>"
    )
    .replace(/\b(turn|binding|call)_[A-Za-z0-9_-]{12,}\b/g, "$1_[redacted]");
}

function resolveBrowserConfig(provider: CodexProviderConfig): ResolvedBrowserConfig {
  const configured = provider.chatgptWeb ?? {};
  return {
    appName: configured.appName?.trim() || "Codex Native",
    storageStatePath: resolve(
      expandUserPath(
        configured.storageStatePath?.trim() || join(getConfigDir(), "browser", "storage-state.json")
      )
    ),
    ...(configured.chromeExecutablePath?.trim()
      ? { chromeExecutablePath: resolve(expandUserPath(configured.chromeExecutablePath.trim())) }
      : {}),
    ...(configured.cdpEndpoint?.trim() ? { cdpEndpoint: configured.cdpEndpoint.trim() } : {}),
    turnTimeoutMs: configured.turnTimeoutMs ?? DEFAULT_CHATGPT_TURN_TIMEOUT_MS,
    headed: configured.headed !== false,
    autoApproveToolCalls: configured.autoApproveToolCalls === true,
  };
}

const imageExtensions = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/gif", "gif"],
  ["image/webp", "webp"],
]);

export function chatGptImageFilePayloads(
  images: ChatGptWebPromptImage[]
): Array<{ name: string; mimeType: string; buffer: Buffer }> {
  if (images.length > 10)
    throw new Error("ChatGPT web accepts at most 10 input images per Codex turn");
  let totalBytes = 0;
  return images.map((image) => {
    const parsed = parseDataUrl(image.imageUrl);
    if (!parsed)
      throw new Error(`ChatGPT web input image ${image.ref} must be an inline base64 data URL`);
    const extension = imageExtensions.get(parsed.mediaType.toLowerCase());
    if (!extension)
      throw new Error(
        `ChatGPT web input image ${image.ref} has unsupported media type: ${parsed.mediaType}`
      );
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(parsed.base64) || parsed.base64.length % 4 !== 0) {
      throw new Error(`ChatGPT web input image ${image.ref} contains invalid base64 data`);
    }
    const buffer = Buffer.from(parsed.base64, "base64");
    if (buffer.length === 0) throw new Error(`ChatGPT web input image ${image.ref} is empty`);
    if (buffer.length > 20_000_000)
      throw new Error(`ChatGPT web input image ${image.ref} exceeds 20 MB`);
    totalBytes += buffer.length;
    if (totalBytes > 50_000_000)
      throw new Error("ChatGPT web input images exceed the 50 MB per-turn limit");
    return { name: `${image.ref}.${extension}`, mimeType: parsed.mediaType.toLowerCase(), buffer };
  });
}

export function chatGptPromptFilePayloads(
  prompt: CompiledChatGptWebPrompt
): Array<{ name: string; mimeType: string; buffer: Buffer }> {
  const images = chatGptImageFilePayloads(prompt.images);
  const contexts = prompt.contextAttachments ?? [];
  const contextBytes = contexts.reduce((total, attachment) => total + attachment.buffer.length, 0);
  if (contexts.length > 1) throw new Error("ChatGPT web accepts one Codex context attachment");
  if (contextBytes > 50_000_000) {
    throw new Error("ChatGPT web Codex context attachment exceeds 50 MB");
  }
  return [...images, ...contexts];
}

export class ChatGptBrowserWorker {
  static forProvider(provider: CodexProviderConfig): ChatGptBrowserWorker {
    const config = resolveBrowserConfig(provider);
    const key = JSON.stringify(config);
    let worker = workers.get(key);
    if (!worker) {
      worker = new ChatGptBrowserWorker(config);
      workers.set(key, worker);
    }
    return worker;
  }

  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;
  private tail: Promise<void> = Promise.resolve();

  private constructor(private readonly config: ResolvedBrowserConfig) {}

  run(turn: BrowserTurn): Promise<string> {
    const run = this.tail.then(() => this.runExclusive(turn));
    this.tail = run.then(
      () => undefined,
      () => undefined
    );
    return run;
  }

  async close(): Promise<void> {
    await this.tail;
    const browser = this.browser;
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    if (browser) await browser.close();
  }

  private discardBrowser(): void {
    const browser = this.browser;
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    if (browser) void browser.close().catch(() => {});
  }

  private async runStage<T>(
    traceId: string,
    stage: string,
    timeoutMs: number,
    action: () => Promise<T>
  ): Promise<T> {
    const startedAt = performance.now();
    console.info(`[chatgpt-web] browser turn ${traceId} stage=${stage} started`);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let timedOut = false;
    try {
      const timeout = new Promise<never>((_, rejectTimeout) => {
        timer = setTimeout(() => {
          timedOut = true;
          rejectTimeout(new Error(`ChatGPT browser stage timed out: ${stage}`));
        }, timeoutMs);
      });
      const value = await Promise.race([action(), timeout]);
      console.info(
        `[chatgpt-web] browser turn ${traceId} stage=${stage} completed durationMs=${Math.round(performance.now() - startedAt)}`
      );
      return value;
    } catch (error) {
      console.error(
        `[chatgpt-web] browser turn ${traceId} stage=${stage} failed durationMs=${Math.round(performance.now() - startedAt)}: ${error instanceof Error ? error.message : String(error)}`
      );
      if (timedOut) this.discardBrowser();
      throw error;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  private async ensurePage(): Promise<Page> {
    if (this.page && !this.page.isClosed()) return this.page;
    if (
      !browserLoginStateExists({
        storageStatePath: this.config.storageStatePath,
        chromeExecutablePath: this.config.chromeExecutablePath,
      })
    ) {
      throw new Error(`ChatGPT web login state is missing: ${this.config.storageStatePath}`);
    }
    if (!this.config.cdpEndpoint && !this.config.chromeExecutablePath) {
      throw new Error("ChatGPT web browser runtime is not configured");
    }
    if (
      !this.config.cdpEndpoint &&
      this.config.chromeExecutablePath &&
      !existsSync(this.config.chromeExecutablePath)
    ) {
      throw new Error(
        `Configured Chrome executable does not exist: ${this.config.chromeExecutablePath}`
      );
    }
    const { chromium } = await import("playwright-core");
    if (this.config.cdpEndpoint) {
      this.browser = await chromium.connectOverCDP(this.config.cdpEndpoint);
      this.context = await this.browser.newContext({ storageState: this.config.storageStatePath });
    } else {
      this.browser = await chromium.launch({
        executablePath: this.config.chromeExecutablePath,
        headless: !this.config.headed,
      });
      this.context = await this.browser.newContext({ storageState: this.config.storageStatePath });
    }
    this.page = await this.context.newPage();
    return this.page;
  }

  /**
   * A Codex turn owns one isolated Temporary Chat document. Reusing the same
   * ChatGPT SPA page can retain the previous transcript and autocomplete DOM,
   * so an @app lookup may select stale UI from the preceding turn.
   */
  private async pageForNewTurn(): Promise<Page> {
    const previous = await this.ensurePage();
    if (previous.url() === "about:blank") return previous;
    const context = this.context;
    if (!context) throw new Error("ChatGPT web browser context is unavailable");
    const page = await context.newPage();
    this.page = page;
    await previous.close().catch(() => {});
    return page;
  }

  private async selectModelAndEffort(
    page: Page,
    modelId: string,
    reasoning: string | undefined,
    capabilities: ChatGptWebCapabilities
  ): Promise<ChatGptWebModelMode> {
    const mode = resolveChatGptWebModelMode(modelId, reasoning, capabilities);
    const currentEffort = page
      .getByRole("button", {
        name: /^(?:Instant(?:\s+5\.5)?|Medium|High|Extra High|Pro)$/,
      })
      .last();
    try {
      await currentEffort.waitFor({ state: "visible", timeout: 70_000 });
    } catch {
      throw new Error(
        "ChatGPT rendered the composer but its model/effort control did not become ready"
      );
    }
    if (chatGptEffortLabelsMatch(await currentEffort.innerText(), mode.uiEffortLabel)) return mode;
    await currentEffort.click();
    const effortChoice = page
      .getByRole("menuitem", { name: mode.uiEffortLabel, exact: true })
      .or(page.getByRole("menuitemradio", { name: mode.uiEffortLabel, exact: true }))
      .last();
    try {
      await effortChoice.waitFor({ state: "visible", timeout: 20_000 });
    } catch {
      const choices = (
        await page
          .locator('[role="menuitem"], [role="menuitemradio"]')
          .allInnerTexts()
          .catch(() => [])
      )
        .map((value) => value.replace(/\s+/g, " ").trim())
        .filter((value) => /^(?:Instant(?: 5\.5)?|Medium|High|Extra High|Pro)$/.test(value));
      throw new Error(
        `ChatGPT effort ${JSON.stringify(mode.uiEffortLabel)} is unavailable in the authenticated account UI` +
          (choices.length > 0 ? `; available: ${choices.join(", ")}` : "")
      );
    }
    await effortChoice.click();
    try {
      const deadline = Date.now() + 40_000;
      while (Date.now() < deadline) {
        const visibleLabel = await currentEffort.innerText().catch(() => "");
        if (chatGptEffortLabelsMatch(visibleLabel, mode.uiEffortLabel)) return mode;
        await new Promise((resolveSleep) => setTimeout(resolveSleep, 100));
      }
      throw new Error("effort control did not render the selected label");
    } catch {
      const visible = await page
        .getByRole("button", {
          name: /^(?:Instant(?:\s+5\.5)?|Medium|High|Extra High|Pro)$/,
        })
        .allInnerTexts()
        .catch(() => []);
      throw new Error(
        `ChatGPT did not confirm effort ${JSON.stringify(mode.uiEffortLabel)}` +
          (visible.length > 0
            ? `; visible effort control: ${visible.at(-1)!.replace(/\s+/g, " ").trim()}`
            : "")
      );
    }
  }

  private async attachedPromptText(page: Page): Promise<string> {
    const composer = page.getByRole("textbox", { name: "Chat with ChatGPT" });
    return composer.evaluate(
      (element) => {
        const clone = element.cloneNode(true) as HTMLElement;
        clone
          .querySelectorAll(
            "[data-inline-selection-pill], [data-inline-selection-pill-cursor-target]"
          )
          .forEach((part) => part.remove());
        return [...clone.children]
          .map((child) => child.textContent ?? "")
          .join("\n")
          .trimStart();
      },
      undefined,
      { timeout: 20_000 }
    );
  }

  private async assertPromptAttached(page: Page, prompt: string): Promise<void> {
    const deadline = Date.now() + 10_000;
    let observed = "";
    while (Date.now() < deadline) {
      observed = await this.attachedPromptText(page);
      if (observed === prompt) return;
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 50));
    }
    let commonPrefix = 0;
    while (commonPrefix < prompt.length && prompt[commonPrefix] === observed[commonPrefix])
      commonPrefix += 1;
    throw new Error(
      `ChatGPT composer did not preserve the complete prompt (expectedChars=${prompt.length}, actualChars=${observed.length}, commonPrefixChars=${commonPrefix})`
    );
  }

  private async attachPrompt(page: Page, prompt: string, localTools: boolean): Promise<void> {
    const composer = page.getByRole("textbox", { name: "Chat with ChatGPT" });
    if (!localTools) {
      await composer.fill(prompt);
      await this.assertPromptAttached(page, prompt);
      return;
    }
    await composer.fill(`@${this.config.appName}`);
    const appResult = page.getByRole("group").filter({ hasText: this.config.appName }).last();
    await appResult.waitFor({ state: "visible", timeout: 20_000 });
    await appResult.click();
    const selectedPlugin = composer.getByRole("link", { name: this.config.appName, exact: true });
    await selectedPlugin.waitFor({ state: "visible", timeout: 10_000 });
    await composer.focus();
    await page.keyboard.press("End");
    await page.keyboard.insertText(` ${prompt}`);
    await this.assertPromptAttached(page, prompt);
  }

  private async attachFiles(page: Page, prompt: CompiledChatGptWebPrompt): Promise<void> {
    const files = chatGptPromptFilePayloads(prompt);
    if (files.length === 0) return;
    const removeButtons = page.locator('button[aria-label^="Remove file "]');
    const existing = await removeButtons.count();
    const input = page
      .locator('input[type="file"][data-testid="upload-photos-input"]')
      .or(page.locator('input[type="file"]').last());
    await input.waitFor({ state: "attached", timeout: 20_000 });
    await input.setInputFiles(files);
    try {
      await removeButtons
        .nth(existing + files.length - 1)
        .waitFor({ state: "visible", timeout: 60_000 });
    } catch {
      const alerts = (
        await page
          .locator('[role="alert"]')
          .allInnerTexts()
          .catch(() => [])
      )
        .map((text) => text.replace(/\s+/g, " ").trim())
        .filter(Boolean);
      throw new Error(
        `ChatGPT did not accept all prompt attachments` +
          (alerts.length > 0 ? `: ${alerts.join(" | ")}` : "")
      );
    }
    const send = page.getByTestId("send-button");
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      if (await send.isEnabled().catch(() => false)) return;
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 100));
    }
    throw new Error(
      "ChatGPT accepted the prompt attachments but did not make the message ready to send"
    );
  }

  private async handleToolConfirmation(page: Page): Promise<boolean> {
    const heading = page
      .getByText(`Allow ChatGPT to use ${this.config.appName}?`, { exact: true })
      .last();
    if (!(await heading.isVisible().catch(() => false))) return false;
    if (!this.config.autoApproveToolCalls) {
      throw new Error(
        `ChatGPT is waiting for confirmation to use ${this.config.appName}; set chatgptWeb.autoApproveToolCalls=true to authorize per-call "Allow once" clicks`
      );
    }
    const allowOnce = page.getByRole("button", { name: "Allow once", exact: true }).last();
    await allowOnce.waitFor({ state: "visible", timeout: 10_000 });
    await allowOnce.click();
    return true;
  }

  private async responseDomSnapshot(responseTurn: Locator): Promise<ChatGptResponseDomSnapshot> {
    const snapshot = await responseTurn
      .evaluate(
        (element) => {
          const root = element as HTMLElement;
          const visible = (candidate: HTMLElement): boolean => {
            const style = getComputedStyle(candidate);
            const rect = candidate.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.opacity !== "0" &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const rendered = [...root.querySelectorAll<HTMLElement>(".markdown")].at(-1);
          const renderedChildren = rendered ? [...rendered.children] : [];
          const completionAction = [
            ...root.querySelectorAll<HTMLElement>('button[aria-label="Copy response"]'),
          ].find(visible);
          const candidates = new Map<HTMLElement, "markdown" | "status">();
          root
            .querySelectorAll<HTMLElement>(".markdown")
            .forEach((candidate) => candidates.set(candidate, "markdown"));
          root
            .querySelectorAll<HTMLElement>(
              'button, [role="status"], [aria-busy="true"], [data-testid*="cot"], [data-testid*="reason"], [data-testid*="thought"]'
            )
            .forEach((candidate) => {
              if (candidate.closest('[aria-label="Response actions"]')) return;
              const semantic = candidate.closest<HTMLElement>("button") ?? candidate;
              if (!candidates.has(semantic)) candidates.set(semantic, "status");
            });
          root
            .querySelectorAll<HTMLElement>("[data-streaming-response-status]")
            .forEach((container) => {
              if (![...candidates.keys()].some((candidate) => container.contains(candidate))) {
                candidates.set(container, "status");
              }
            });
          const traceBlocks = [...candidates]
            .filter(([candidate]) => visible(candidate))
            .sort(([left], [right]) =>
              left === right
                ? 0
                : left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING
                  ? -1
                  : 1
            )
            .map(([candidate, kind]) => ({ kind, text: candidate.innerText.trim() }))
            .filter((block) => block.text.length > 0)
            .filter(
              (block, index, blocks) =>
                blocks.findIndex(
                  (other) => other.kind === block.kind && other.text === block.text
                ) === index
            );
          return {
            responsePresent: true,
            visibleText: rendered?.innerText.trim() ?? "",
            fullHtml: rendered?.innerHTML ?? "",
            stableHtml: renderedChildren
              .slice(0, -1)
              .map((child) => child.outerHTML)
              .join(""),
            completionActionVisible: completionAction !== undefined,
            traceBlocks,
          };
        },
        undefined,
        { timeout: 2_000 }
      )
      .catch(() => absentResponseDomSnapshot());
    snapshot.traceBlocks = snapshot.traceBlocks.filter((block) => !isChatGptTraceControl(block));
    return snapshot;
  }

  private async stalledTurnDiagnostic(page: Page, responseTurn: Locator): Promise<string> {
    const responseState = (await responseTurn.count())
      ? await responseTurn.evaluate((element) => {
          const root = element as HTMLElement;
          const descriptors = [
            ...root.querySelectorAll<HTMLElement>("[role], [data-testid], button, [aria-label]"),
          ]
            .filter((candidate) => {
              const style = getComputedStyle(candidate);
              return style.visibility !== "hidden" && style.display !== "none";
            })
            .slice(-80)
            .map((candidate) => ({
              tag: candidate.tagName.toLowerCase(),
              role: candidate.getAttribute("role"),
              testId: candidate.getAttribute("data-testid"),
              ariaLabel: candidate.getAttribute("aria-label"),
              title: candidate.getAttribute("title"),
              text: candidate.innerText.trim().slice(0, 500),
            }));
          return {
            text: root.innerText.trim().slice(0, 2_000),
            descriptors,
          };
        })
      : { text: "", descriptors: [] };
    const overlays = await page
      .locator('[role="dialog"], [role="alert"], [role="status"]')
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const candidate = element as HTMLElement;
            const style = getComputedStyle(candidate);
            return style.visibility !== "hidden" && style.display !== "none";
          })
          .slice(-30)
          .map((element) => {
            const candidate = element as HTMLElement;
            return {
              role: candidate.getAttribute("role"),
              testId: candidate.getAttribute("data-testid"),
              ariaLabel: candidate.getAttribute("aria-label"),
              text: candidate.innerText.trim().slice(0, 1_000),
            };
          })
      )
      .catch(() => [] as Array<Record<string, string | null>>);
    return redactChatGptUiDiagnostic(JSON.stringify({ response: responseState, overlays }));
  }

  private async runExclusive(turn: BrowserTurn): Promise<string> {
    if (turn.abortSignal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
    const prepared = await turn.prepare();
    try {
      if (turn.abortSignal?.aborted)
        throw new DOMException("ChatGPT web turn aborted", "AbortError");
      const estimatedInputTokens = estimateCompiledChatGptWebInputTokens(prepared, turn.modelId);
      const deadline = Date.now() + this.config.turnTimeoutMs;
      const page = await this.runStage(
        turn.traceId,
        "browser_page",
        browserStageTimeouts.browserPage,
        () => this.pageForNewTurn()
      );
      console.info(
        `[chatgpt-web] browser turn ${turn.traceId} opened (transport=${prepared.contextAttachments.length > 0 ? "jsonl" : "inline"}, promptChars=${prepared.text.length}, estimatedInputTokens=${estimatedInputTokens}, images=${prepared.images.length}, contextAttachments=${prepared.contextAttachments.length})`
      );
      await this.runStage(
        turn.traceId,
        "temporary_chat_navigation",
        browserStageTimeouts.navigation,
        () =>
          page
            .goto(CHATGPT_TEMPORARY_CHAT_URL, { waitUntil: "domcontentloaded", timeout: 60_000 })
            .then(() => undefined)
      );
      const composer = page.getByRole("textbox", { name: "Chat with ChatGPT" });
      try {
        await this.runStage(
          turn.traceId,
          "composer_ready",
          browserStageTimeouts.composerReady,
          () => composer.waitFor({ state: "visible", timeout: 30_000 })
        );
      } catch {
        throw new Error(
          "ChatGPT web login is expired or the Temporary Chat surface is unavailable"
        );
      }
      await this.runStage(
        turn.traceId,
        "session_verification",
        browserStageTimeouts.sessionVerification,
        async () => {
          await assertAuthenticatedChatGptPage(page);
          await assertTemporaryChatPage(page);
        }
      );
      const mode = await this.runStage(
        turn.traceId,
        "effort_selection",
        browserStageTimeouts.effortSelection,
        () => this.selectModelAndEffort(page, turn.modelId, turn.reasoning, turn.capabilities)
      );
      await this.runStage(
        turn.traceId,
        "prompt_attachment",
        browserStageTimeouts.promptAttachment,
        () => this.attachPrompt(page, prepared.text, mode.localTools)
      );
      await this.runStage(
        turn.traceId,
        "file_attachment",
        browserStageTimeouts.fileAttachment,
        () => this.attachFiles(page, prepared)
      );
      const responseTurns = page.locator(
        'section[data-testid^="conversation-turn-"][data-turn="assistant"]'
      );
      const initialResponseTurnCount = await responseTurns.count();
      const responseTurn = responseTurns.nth(initialResponseTurnCount);
      await this.runStage(turn.traceId, "send", browserStageTimeouts.send, () =>
        page.getByTestId("send-button").click()
      );

      let lastHeartbeat = 0;
      let finalText = "";
      let sawRunning = false;
      let loggedCompletionWait = false;
      const sentAt = Date.now();
      const visibleTrace = new ChatGptVisibleTraceTracker();
      const markdownStream = new ChatGptMarkdownStream(stripChatGptTransportMarkers);
      const completionTracker = new ChatGptCompletionTracker();
      const domHealthTracker = new ChatGptTurnDomHealthTracker();
      for (;;) {
        if (turn.abortSignal?.aborted) {
          const stop = page.getByRole("button", { name: "Stop answering" });
          if (await stop.isVisible().catch(() => false)) await stop.click().catch(() => {});
          throw new DOMException("ChatGPT web turn aborted", "AbortError");
        }
        if (Date.now() >= deadline) throw new Error("ChatGPT web turn timed out");
        if (Date.now() - lastHeartbeat >= 10_000) {
          turn.onHeartbeat?.();
          lastHeartbeat = Date.now();
        }

        if (mode.localTools && (await this.handleToolConfirmation(page))) {
          await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
          continue;
        }

        const snapshot = await this.responseDomSnapshot(responseTurn);
        const stop = page.getByRole("button", { name: "Stop answering" });
        const running = await stop.isVisible().catch(() => false);
        if (running) sawRunning = true;
        if (snapshot.responsePresent) {
          for (const trace of visibleTrace.observe(
            snapshot.traceBlocks,
            snapshot.completionActionVisible
          )) {
            if (trace.kind === "commentary")
              turn.onCommentary?.(trace.text, trace.continuation === true);
            else turn.onReasoningSummary?.(trace.text);
          }
          const domError = domHealthTracker.update({
            responsePresent: snapshot.responsePresent,
            running,
            currentText: snapshot.visibleText,
            completionActionVisible: snapshot.completionActionVisible,
          });
          if (domError) throw new Error(domError);
          // ChatGPT can render visible commentary Markdown between tool-status rows. Only a
          // Markdown root accompanied by the response action belongs to the final answer stream.
          if (snapshot.completionActionVisible) {
            const stableDelta = markdownStream.observeStableHtml(snapshot.stableHtml);
            if (stableDelta) turn.onTextDelta(stableDelta);
          }
          if (
            completionTracker.update({
              responsePresent: snapshot.responsePresent,
              running,
              currentText: snapshot.visibleText,
              completionActionVisible: snapshot.completionActionVisible,
            })
          ) {
            if (snapshot.visibleText === "api_tool unavailable") {
              throw new Error(
                "ChatGPT selected mode rejected the Codex Native MCP tool (api_tool unavailable)"
              );
            }
            const final = markdownStream.finish(snapshot.fullHtml);
            if (!final.markdown && snapshot.visibleText) {
              throw new Error(
                "ChatGPT completed with visible text that could not be serialized as Markdown"
              );
            }
            if (final.delta) turn.onTextDelta(final.delta);
            finalText = final.markdown;
            break;
          }
          if (!loggedCompletionWait && Date.now() - sentAt >= 30_000) {
            loggedCompletionWait = true;
            const diagnostic = await this.stalledTurnDiagnostic(page, responseTurn).catch((error) =>
              JSON.stringify({
                diagnosticError: error instanceof Error ? error.message : String(error),
              })
            );
            console.warn(
              `[chatgpt-web] waiting for completed-turn evidence (running=${running}, sawRunning=${sawRunning}, textChars=${snapshot.visibleText.length}, completionActionVisible=${snapshot.completionActionVisible}, ui=${diagnostic})`
            );
          }
        } else {
          const domError = domHealthTracker.update({
            responsePresent: false,
            running,
            currentText: "",
            completionActionVisible: false,
          });
          if (domError) throw new Error(domError);
        }
        await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
      }

      if (this.context) {
        const state = await this.context.storageState();
        atomicWriteFile(this.config.storageStatePath, `${JSON.stringify(state)}\n`);
        writeVerificationMarker(this.config.storageStatePath, capabilities.proAvailable);
      }
      console.info(
        `[chatgpt-web] browser turn ${turn.traceId} completed (markdownChars=${finalText.length})`
      );
      return finalText;
    } finally {
      prepared.release();
    }
  }
}
