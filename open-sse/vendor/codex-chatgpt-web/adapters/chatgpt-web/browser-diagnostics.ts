/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
import { randomUUID } from "node:crypto";
import { chmodSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

import type { Page } from "playwright-core";

import {
  CHATGPT_ASSISTANT_TURN_SELECTOR,
  CHATGPT_COMPOSER_SELECTOR,
  CHATGPT_EFFORT_CONTROL_SELECTOR,
  CHATGPT_EFFORT_ITEM_SELECTOR,
} from "../../chatgpt-session";
import { atomicWriteFile } from "../../config";

const CHATGPT_BROWSER_OBSERVATION_PROBE_TIMEOUT_MS = 5_000;

export class ChatGptBrowserObservationTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`ChatGPT browser DOM observation did not respond within ${timeoutMs}ms`);
    this.name = "ChatGptBrowserObservationTimeoutError";
  }
}

export async function withChatGptBrowserObservationTimeout<T>(
  operation: Promise<T>,
  timeoutMs = CHATGPT_BROWSER_OBSERVATION_PROBE_TIMEOUT_MS
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(
          () => reject(new ChatGptBrowserObservationTimeoutError(timeoutMs)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function redactChatGptUiDiagnostic(value: string): string {
  return value
    .replace(
      /<codex_context_json>[\s\S]*?<\/codex_context_json>/gi,
      "<codex_context_json>[redacted]</codex_context_json>"
    )
    .replace(/\b(turn|binding|call)_[A-Za-z0-9_-]{12,}\b/g, "$1_[redacted]");
}

const CHATGPT_BROWSER_DIAGNOSTIC_TRACE_LIMIT = 10;

function browserDiagnosticCheckpoint(value: string): string {
  const safe = value
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return safe || "checkpoint";
}

function browserDiagnosticIncludesScreenshot(
  checkpoint: string,
  captureAll = process.env.CODEX_CHATGPT_WEB_BROWSER_DIAGNOSTICS === "1"
): boolean {
  return captureAll || checkpoint === "response-stalled-30s" || checkpoint === "turn-failed";
}

function privateDirectory(path: string): void {
  mkdirSync(path, { recursive: true, mode: 0o700 });
  try {
    chmodSync(path, 0o700);
  } catch {
    /* Windows ACLs are managed by the installer. */
  }
}

function pruneBrowserDiagnostics(root: string): void {
  const traces = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^[A-Za-z0-9_-]{6,128}$/.test(entry.name))
    .map((entry) => {
      const path = join(root, entry.name);
      return { path, modifiedAt: statSync(path).mtimeMs };
    })
    .sort((left, right) => right.modifiedAt - left.modifiedAt);
  for (const trace of traces.slice(CHATGPT_BROWSER_DIAGNOSTIC_TRACE_LIMIT)) {
    rmSync(trace.path, { recursive: true, force: true });
  }
}

export class ChatGptBrowserDiagnostics {
  private readonly directory: string;
  private sequence = 0;
  private initialized = false;

  constructor(
    private readonly traceId: string,
    private readonly root: string
  ) {
    if (!/^[A-Za-z0-9_-]{6,128}$/.test(traceId)) {
      throw new Error("ChatGPT browser diagnostic trace id is invalid");
    }
    this.directory = join(this.root, `${traceId}-${randomUUID().slice(0, 8)}`);
  }

  async capture(page: Page, checkpoint: string, error?: unknown): Promise<void> {
    try {
      if (!this.initialized) {
        privateDirectory(this.root);
        privateDirectory(this.directory);
        pruneBrowserDiagnostics(this.root);
        this.initialized = true;
      }
      const sequence = String(++this.sequence).padStart(2, "0");
      const stem = `${sequence}-${browserDiagnosticCheckpoint(checkpoint)}`;
      const includeScreenshot = browserDiagnosticIncludesScreenshot(checkpoint);
      const [screenshotResult, stateResult] = await Promise.allSettled([
        includeScreenshot
          ? page.screenshot({ animations: "disabled", caret: "hide", timeout: 5_000, type: "png" })
          : Promise.resolve(undefined),
        withChatGptBrowserObservationTimeout(
          page.evaluate(
            ({
              composerSelector,
              effortControlSelector,
              effortItemSelector,
              assistantTurnSelector,
            }) => {
              const rendered = (element: Element): boolean => {
                const candidate = element as HTMLElement;
                const style = getComputedStyle(candidate);
                return (
                  candidate.isConnected &&
                  style.display !== "none" &&
                  style.visibility !== "hidden" &&
                  style.opacity !== "0"
                );
              };

              const boundedText = (element: Element): string =>
                (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 1_000);
              const rows = (selector: string, limit = 40) =>
                [...document.querySelectorAll(selector)]
                  .filter(rendered)
                  .slice(-limit)
                  .map((element) => {
                    const rect = element.getBoundingClientRect();
                    return {
                      tag: element.tagName.toLowerCase(),
                      role: element.getAttribute("role"),
                      testId: element.getAttribute("data-testid"),
                      ariaExpanded: element.getAttribute("aria-expanded"),
                      ariaChecked: element.getAttribute("aria-checked"),
                      dataState: element.getAttribute("data-state"),
                      dataHighlighted: element.getAttribute("data-highlighted"),
                      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                      text: boundedText(element),
                    };
                  });
              const composers = [...document.querySelectorAll(composerSelector)].filter(rendered);
              const assistantTurns = [...document.querySelectorAll(assistantTurnSelector)].filter(
                rendered
              );
              return {
                url: location.href,
                title: document.title,
                viewport: { width: innerWidth, height: innerHeight },
                surfaceId:
                  (globalThis as typeof globalThis & { __CODEX_WEB_GPT_SURFACE_ID__?: unknown })
                    .__CODEX_WEB_GPT_SURFACE_ID__ ?? null,
                // textContent avoids the synchronous layout forced by innerText on huge prompts.
                bodyTextChars: document.body?.textContent?.length ?? 0,
                composer: {
                  visibleCount: composers.length,
                  textChars: composers.map((element) => (element.textContent ?? "").length),
                  selectedConnectors: rows('[data-id^="plugin:"][data-keyword]', 20),
                },
                effortControls: rows(effortControlSelector, 10),
                effortItems: rows(effortItemSelector, 20),
                menus: rows(
                  '[role="menu"], [role="listbox"], [data-testid="composer-intelligence-picker-content"]',
                  20
                ),
                connectorRows: rows('.__menu-item[tabindex="0"]', 40),
                overlays: rows('[role="dialog"], [role="alert"], [role="status"]', 30),
                turns: {
                  user: document.querySelectorAll(
                    '[data-testid^="conversation-turn-"][data-message-author-role="user"]'
                  ).length,
                  assistant: assistantTurns.map((element) => ({
                    textChars: (element.textContent ?? "").length,
                    htmlChars: (element as HTMLElement).innerHTML.length,
                  })),
                },
              };
            },
            {
              composerSelector: CHATGPT_COMPOSER_SELECTOR,
              effortControlSelector: CHATGPT_EFFORT_CONTROL_SELECTOR,
              effortItemSelector: CHATGPT_EFFORT_ITEM_SELECTOR,
              assistantTurnSelector: CHATGPT_ASSISTANT_TURN_SELECTOR,
            }
          )
        ),
      ]);
      const capturedAt = new Date().toISOString();
      if (screenshotResult.status === "fulfilled" && screenshotResult.value) {
        atomicWriteFile(join(this.directory, `${stem}.png`), screenshotResult.value);
      }
      const captureErrors = Object.fromEntries([
        ...(screenshotResult.status === "rejected"
          ? [
              [
                "screenshot",
                redactChatGptUiDiagnostic(
                  screenshotResult.reason instanceof Error
                    ? screenshotResult.reason.message
                    : String(screenshotResult.reason)
                ),
              ],
            ]
          : []),
        ...(stateResult.status === "rejected"
          ? [
              [
                "state",
                redactChatGptUiDiagnostic(
                  stateResult.reason instanceof Error
                    ? stateResult.reason.message
                    : String(stateResult.reason)
                ),
              ],
            ]
          : []),
      ]);
      atomicWriteFile(
        join(this.directory, `${stem}.json`),
        `${JSON.stringify(
          {
            version: 1,
            capturedAt,
            traceId: this.traceId,
            checkpoint,
            ...(error !== undefined
              ? {
                  error: redactChatGptUiDiagnostic(
                    error instanceof Error ? error.message : String(error)
                  ),
                }
              : {}),
            ...(stateResult.status === "fulfilled" ? { state: stateResult.value } : {}),
            ...(Object.keys(captureErrors).length > 0 ? { captureErrors } : {}),
          },
          null,
          2
        )}\n`
      );
      if (Object.keys(captureErrors).length > 0) {
        console.warn(
          `[chatgpt-web] browser diagnostic partial capture trace=${this.traceId}` +
            ` checkpoint=${stem} failures=${Object.keys(captureErrors).join(",")}`
        );
      }
      console.info(
        `[chatgpt-web] browser diagnostic trace=${this.traceId} checkpoint=${stem} path=${this.directory}`
      );
    } catch (captureError) {
      console.warn(
        `[chatgpt-web] browser diagnostic capture failed trace=${this.traceId}` +
          ` checkpoint=${browserDiagnosticCheckpoint(checkpoint)}:` +
          ` ${captureError instanceof Error ? captureError.message : String(captureError)}`
      );
    }
  }
}
