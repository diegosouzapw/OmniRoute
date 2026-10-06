/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Locator,
  type Page,
} from "playwright-core";
import {
  atomicWriteFile,
  CHATGPT_CONNECTOR_NAME,
  defaultChromeExecutable,
  DEV_CHATGPT_CONNECTOR_NAME,
  expandUserPath,
  getConfigDir,
  isLegacyChatGptConnectorName,
  legacyChatGptConnectorMigrationMessage,
  LEGACY_CHATGPT_CONNECTOR_NAMES,
} from "../../config";
import { estimateTokens } from "../../lib/token-estimate";
import type { CodexProviderConfig } from "../../types";
import { parseDataUrl } from "../image";
import {
  ChatGptMarkdownBuffer,
  ChatGptMarkdownConsistencyError,
  type ChatGptMarkdownSegment,
} from "./markdown";
import {
  CHATGPT_WEB_LUNA_MODEL_ID,
  CHATGPT_WEB_MODEL_ID,
  resolveChatGptWebModelMode,
  type ChatGptWebCapabilities,
  type ChatGptWebModelMode,
} from "./model";
import {
  CHATGPT_LUNA_BROWSER_INPUT_TOKEN_BUDGET,
  compiledChatGptWebMaxMessageChars,
  estimateCompiledChatGptWebMessageTokens,
} from "./input-tokens";
import {
  CHATGPT_MAX_INPUT_IMAGES,
  formatChatGptWebMultipartCommit,
  formatChatGptWebMultipartStage,
  type CompiledChatGptWebPrompt,
  type ChatGptWebPromptFile,
  type ChatGptWebPromptImage,
  type ChatGptWebMultipartStage,
} from "./prompt";
import { estimateCompiledChatGptWebInputTokens } from "./input-tokens";
import {
  assertAuthenticatedChatGptPage,
  assertTemporaryChatPage,
  CHATGPT_ASSISTANT_TURN_SELECTOR,
  CHATGPT_COMPLETION_ACTION_SELECTOR,
  CHATGPT_COMPOSER_SELECTOR,
  CHATGPT_EFFORT_CONTROL_SELECTOR,
  CHATGPT_EFFORT_ITEM_SELECTOR,
  CHATGPT_EFFORT_MENU_SELECTOR,
  CHATGPT_EFFORT_SLIDER_SELECTOR,
  CHATGPT_STOP_BUTTON_SELECTOR,
  CHATGPT_TEMPORARY_CHAT_URL,
  CHATGPT_USER_TURN_SELECTOR,
  detectChatGptAccountCapabilities,
  parseChatGptEffortSliderState,
} from "../../chatgpt-session";
import { loginVerificationMarkerPath } from "../../browser-login";
import {
  connectLauncherBrowserHost,
  LauncherBrowserTurnCancelledError,
  LauncherRetainedConversationUnavailableError,
  LAUNCHER_TURN_HEARTBEAT_INTERVAL_MS,
  LAUNCHER_TURN_HEARTBEAT_TIMEOUT_MS,
  notifyLauncherTurn,
} from "../../launcher-browser-host";
import {
  resolveChatGptWebContextLimits,
  resolveChatGptWebTransportLimits,
} from "../../chatgpt-web-models";
import { LauncherBrowserHelperClient } from "./launcher-helper-client";
import { MAX_CHATGPT_BROWSER_TABS } from "./concurrency";
import {
  ChatGptWebAdapterError,
  chatGptBrowserTabClosedError,
  chatGptRetainedConversationUnavailableError,
  chatGptStoppedThinkingError,
} from "./adapter-error";
import {
  ChatGptLunaCheckpointStream,
  type CapturedChatGptLunaCheckpoint,
} from "./rolling-checkpoint";
import {
  ChatGptBrowserDiagnostics,
  ChatGptBrowserObservationTimeoutError,
  redactChatGptUiDiagnostic,
  withChatGptBrowserObservationTimeout,
} from "./browser-diagnostics";
import { insertPlainTextIntoComposer } from "./composer-edit";
import { chatGptExternalProgressIsLive } from "./turn-progress";
import type {
  ChatGptExternalTurnProgressSnapshot,
  ChatGptTurnProgressReader,
} from "./turn-progress";

export { MAX_CHATGPT_BROWSER_TABS } from "./concurrency";

const workers = new Map<string, ChatGptBrowserWorker>();

type ChatGptBrowserStorageState = Awaited<ReturnType<BrowserContext["storageState"]>>;

function isVerifiedChatGptAuthCookie(name: string): boolean {
  return (
    /^__Secure-next-auth\.session-token(?:\.\d+)?$/.test(name) ||
    name === "oai-client-session-epoch"
  );
}

function storageCookieKey(cookie: ChatGptBrowserStorageState["cookies"][number]): string {
  const partitionKey = "partitionKey" in cookie ? String(cookie.partitionKey ?? "") : "";
  return `${cookie.name}\u0000${cookie.domain}\u0000${cookie.path}\u0000${partitionKey}`;
}

function readChatGptBrowserStorageState(path: string): ChatGptBrowserStorageState {
  const parsed = JSON.parse(readFileSync(path, "utf8")) as Partial<ChatGptBrowserStorageState>;
  if (!Array.isArray(parsed.cookies) || !Array.isArray(parsed.origins)) {
    throw new Error("ChatGPT browser storage state is invalid");
  }
  return parsed as ChatGptBrowserStorageState;
}

/**
 * ChatGPT rotates its browser auth cookie after the first cloned-cookie turn and drops the
 * session-epoch cookie. That rotated pair cannot bootstrap a new browser tab and falls through to
 * the account/passkey chooser. Keep runtime cookies and local storage, but restore the two cookies
 * from the browser-verified credential so every isolated turn remains reproducible.
 */
export function mergeChatGptRuntimeStorageState(
  verified: ChatGptBrowserStorageState,
  runtime: ChatGptBrowserStorageState
): ChatGptBrowserStorageState {
  const verifiedAuth = verified.cookies.filter((cookie) =>
    isVerifiedChatGptAuthCookie(cookie.name)
  );
  const verifiedAuthKeys = new Set(verifiedAuth.map(storageCookieKey));
  const cookies = runtime.cookies.filter(
    (cookie) =>
      !isVerifiedChatGptAuthCookie(cookie.name) || !verifiedAuthKeys.has(storageCookieKey(cookie))
  );
  return { ...runtime, cookies: [...cookies, ...verifiedAuth] };
}

export async function closeChatGptBrowserWorkers(): Promise<void> {
  const active = [...workers.values()];
  workers.clear();
  const results = await Promise.allSettled(active.map((worker) => worker.close()));
  const failures = results
    .filter((result): result is PromiseRejectedResult => result.status === "rejected")
    .map((result) => result.reason);
  if (failures.length > 0) {
    throw new AggregateError(
      failures,
      `${failures.length} ChatGPT browser worker(s) failed to close`
    );
  }
}

export const CHATGPT_RESPONSE_DOM_GRACE_MS = 60_000;
/**
 * How long a staged Bigger Context part may take to produce its assistant turn. A staged part is two
 * orders of magnitude larger than an ordinary prompt and ChatGPT reads all of it before answering,
 * so the ordinary grace is not a budget it can be held to: acknowledgements have been observed at
 * 19s and 30s on the same payload that once took over 72s and lost the turn. There is no MCP
 * activity to vouch for liveness yet at this point, so this window is the only thing standing
 * between a slow ingest and a cancelled turn. It matches the staged send budget.
 */
export const CHATGPT_MULTIPART_RESPONSE_DOM_GRACE_MS = 180_000;
export const CHATGPT_EMPTY_RESPONSE_GRACE_MS = 10_000;
export const CHATGPT_COMPLETION_ACTION_GRACE_MS = 60_000;
export const CHATGPT_COMPLETION_SETTLE_MS = 2_000;
export const CHATGPT_TOOL_CONFIRMATION_TIMEOUT_MS = 60_000;
export const MAX_CHATGPT_CONNECTOR_TRIGGER_ATTEMPTS = 3;
const CHATGPT_CONNECTOR_MENTION_QUERY = "@codex";
const CHATGPT_SMOKE_TEXT = "Reply with exactly: CODEX WEB GPT READY";
const CHATGPT_SMOKE_EXPECTED = "CODEX WEB GPT READY";
/**
 * ChatGPT applies composer state asynchronously, and a fast host can reach the next step before the
 * editor has taken the previous one. This is headroom for that, not a readiness check.
 */
export const CHATGPT_UI_SETTLE_MS = 250;
export const CHATGPT_SEND_ENABLE_GRACE_MS = 5_000;

const CHATGPT_DOM_REVISION_ATTRIBUTES = [
  "aria-hidden",
  "aria-label",
  "aria-busy",
  "aria-disabled",
  "aria-expanded",
  "class",
  "data-item-anchor",
  "data-is-last-node",
  "data-message-author-role",
  "data-state",
  "data-streaming-response-status",
  "data-testid",
  "data-turn",
  "disabled",
  "hidden",
  "inert",
  "open",
  "role",
  "start",
  "style",
] as const;

const settleChatGptUi = (): Promise<void> =>
  new Promise((resolveSettle) => setTimeout(resolveSettle, CHATGPT_UI_SETTLE_MS));

class ChatGptConnectorCatalogStaleError extends Error {
  constructor(
    readonly appName: string,
    readonly triggerAttempts: number
  ) {
    super(`ChatGPT connector catalog is missing ${JSON.stringify(appName)}`);
    this.name = "ChatGptConnectorCatalogStaleError";
  }
}

interface ChatGptConnectorAttemptBudget {
  triggerAttempts: number;
}

function chatGptConnectorUnavailableError(message: string): ChatGptWebAdapterError {
  return new ChatGptWebAdapterError(message, {
    status: 424,
    errorType: "connector_error",
    code: "connector_not_found",
    retryable: false,
  });
}

export type ChatGptPersonalizationPreflight = "already-personalized" | "enabled";

const CHATGPT_PERSONALIZATION_CONTROL_SELECTOR = [
  '[data-testid="thread-header-right-actions"] button[aria-haspopup="menu"]',
  '#conversation-header-actions button[aria-haspopup="menu"]',
].join(", ");
const CHATGPT_PERSONALIZATION_CHOICE_SELECTOR = '[role="menuitemradio"], [role="radio"]';

async function toggleChatGptPersonalizationChoice(page: Page): Promise<void> {
  const controls = page.locator(CHATGPT_PERSONALIZATION_CONTROL_SELECTOR).filter({ visible: true });
  if ((await controls.count()) !== 1) {
    throw chatGptConnectorUnavailableError(
      "ChatGPT Temporary Chat did not expose one structural personalization control"
    );
  }
  const control = controls.first();
  await control.click();
  const menuId = await control.getAttribute("aria-controls");
  if (!menuId) {
    await page.keyboard.press("Escape").catch(() => {});
    throw chatGptConnectorUnavailableError(
      "ChatGPT opened the Temporary Chat personalization control without an owned menu"
    );
  }
  const menu = page.locator(`[id=${JSON.stringify(menuId)}]`);
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  const choices = menu.locator(CHATGPT_PERSONALIZATION_CHOICE_SELECTOR).filter({ visible: true });
  if ((await choices.count()) !== 2) {
    await page.keyboard.press("Escape").catch(() => {});
    throw chatGptConnectorUnavailableError(
      "ChatGPT personalization menu did not expose exactly two checkable states"
    );
  }
  const checked: boolean[] = [];
  for (let index = 0; index < 2; index += 1) {
    const choice = choices.nth(index);
    const ariaChecked = await choice.getAttribute("aria-checked");
    const dataState = await choice.getAttribute("data-state");
    checked.push(ariaChecked === "true" || dataState === "checked");
  }
  if (checked.filter(Boolean).length !== 1) {
    await page.keyboard.press("Escape").catch(() => {});
    throw chatGptConnectorUnavailableError(
      "ChatGPT personalization menu did not expose one checked state"
    );
  }
  await choices.nth(checked[0] ? 1 : 0).click();
  await settleChatGptUi();
}

/** New Temporary Chats may suppress connectors until this exact browser conversation is Personalized. */
export async function ensureChatGptPersonalizedConnectorAccess(
  page: Page,
  captureDiagnostic?: (checkpoint: string) => Promise<void>,
  proveConfiguredConnectorAccess?: () => Promise<boolean>
): Promise<ChatGptPersonalizationPreflight> {
  const personalized = page
    .getByRole("button", { name: "Personalized", exact: true })
    .filter({ visible: true });
  const unpersonalized = page
    .getByRole("button", { name: "Unpersonalized", exact: true })
    .filter({ visible: true });
  let personalizedCount = await personalized.count();
  let unpersonalizedCount = await unpersonalized.count();
  if (personalizedCount === 0 && unpersonalizedCount === 0) {
    await settleChatGptUi();
    personalizedCount = await personalized.count();
    unpersonalizedCount = await unpersonalized.count();
    if (personalizedCount === 0 && unpersonalizedCount === 0) {
      if (!proveConfiguredConnectorAccess) {
        await captureDiagnostic?.("personalization-control-missing");
        throw chatGptConnectorUnavailableError(
          "ChatGPT Temporary Chat did not expose a verifiable personalization control"
        );
      }
      if (await proveConfiguredConnectorAccess()) {
        await captureDiagnostic?.("personalization-already-enabled");
        return "already-personalized";
      }
      await captureDiagnostic?.("personalization-unpersonalized");
      await toggleChatGptPersonalizationChoice(page);
      if (await proveConfiguredConnectorAccess()) {
        await captureDiagnostic?.("personalization-enabled");
        return "enabled";
      }
      try {
        await toggleChatGptPersonalizationChoice(page);
      } catch (restoreError) {
        throw new AggregateError(
          [restoreError],
          "ChatGPT personalization changed but connector access was not proven and the original state could not be restored"
        );
      }
      throw chatGptConnectorUnavailableError(
        "The configured ChatGPT connector remained unavailable after the structural personalization state changed"
      );
    }
  }
  if (personalizedCount === 1 && unpersonalizedCount === 0) {
    await captureDiagnostic?.("personalization-already-enabled");
    return "already-personalized";
  }
  if (personalizedCount !== 0 || unpersonalizedCount !== 1) {
    throw chatGptConnectorUnavailableError(
      `ChatGPT exposed an invalid Temporary Chat personalization state` +
        ` (personalized=${personalizedCount}, unpersonalized=${unpersonalizedCount})`
    );
  }

  await captureDiagnostic?.("personalization-unpersonalized");
  await unpersonalized.click();
  await settleChatGptUi();
  const menuId = await unpersonalized.getAttribute("aria-controls");
  if (!menuId) {
    throw chatGptConnectorUnavailableError(
      "ChatGPT opened the Temporary Chat personalization control without an owned menu"
    );
  }
  const menu = page.locator(`[id=${JSON.stringify(menuId)}]`);
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  const choice = menu
    .locator(CHATGPT_PERSONALIZATION_CHOICE_SELECTOR)
    .filter({ hasText: /^Personalized/ });
  if ((await choice.count()) !== 1) {
    throw chatGptConnectorUnavailableError(
      "ChatGPT personalization menu did not expose one exact Personalized choice"
    );
  }
  await choice.click();
  try {
    await personalized.waitFor({ state: "visible", timeout: 10_000 });
    await unpersonalized.waitFor({ state: "hidden", timeout: 10_000 });
  } catch (error) {
    if (!(error instanceof Error) || error.name !== "TimeoutError") throw error;
    throw chatGptConnectorUnavailableError(
      "ChatGPT did not confirm Personalized connector access for this Temporary Chat"
    );
  }
  await captureDiagnostic?.("personalization-enabled");
  return "enabled";
}

export class ChatGptPromptAttachmentIntegrityError extends ChatGptWebAdapterError {
  constructor(message: string) {
    super(message, {
      status: 502,
      errorType: "server_error",
      code: "prompt_attachment_integrity",
      retryable: false,
    });
    this.name = "ChatGptPromptAttachmentIntegrityError";
  }
}

export function insertPlainTextAtComposerSelection(element: HTMLElement, value: string): boolean {
  const ownerDocument = element.ownerDocument;
  element.focus();
  if (ownerDocument.activeElement !== element) return false;

  const selection = ownerDocument.getSelection();
  if (!selection) return false;
  if (!selection.isCollapsed || !selection.anchorNode || !element.contains(selection.anchorNode)) {
    const range = ownerDocument.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  return ownerDocument.execCommand("insertText", false, value);
}

const chatGptRateLimitDialog = (page: Page): Locator =>
  page
    .locator('[role="dialog"]')
    .filter({ hasText: /Too many requests|太多要求|太多请求|リクエストが多すぎます/i })
    .filter({
      hasText: /making requests too quickly|過於頻繁|过于频繁|リクエストの頻度が高すぎます/i,
    })
    .last();

export async function throwIfChatGptRateLimitDialog(page: Page): Promise<void> {
  const dialog = chatGptRateLimitDialog(page);
  if (!(await dialog.isVisible().catch(() => false))) return;

  const acknowledge = dialog.getByRole("button", { name: /^(Got it|知道了|了解)$/ }).last();
  if (await acknowledge.isVisible().catch(() => false)) {
    try {
      await acknowledge.press("Enter");
    } catch (error) {
      throw new ChatGptWebAdapterError(
        `ChatGPT rate limit: too many requests, and the dialog could not be dismissed (${error instanceof Error ? error.message : String(error)}). Try again in a few minutes.`,
        { status: 429, errorType: "rate_limit_error", code: "rate_limit_exceeded", retryable: true }
      );
    }
  }
  throw new ChatGptWebAdapterError(
    "ChatGPT rate limit: too many requests. Try again in a few minutes.",
    { status: 429, errorType: "rate_limit_error", code: "rate_limit_exceeded", retryable: true }
  );
}

const chatGptTemporaryChatOnboardingDialog = (page: Page): Locator =>
  page
    .locator('[role="dialog"]')
    .filter({ hasText: "Not in history" })
    .filter({ hasText: "No model training" })
    .filter({ hasText: "Memory off" })
    .last();

export async function dismissChatGptTemporaryChatOnboarding(page: Page): Promise<boolean> {
  const dialog = chatGptTemporaryChatOnboardingDialog(page);
  if (!(await dialog.isVisible().catch(() => false))) return false;
  const continueButton = dialog.getByRole("button", { name: "Continue", exact: true }).last();
  if (!(await continueButton.isVisible().catch(() => false))) {
    throw new Error("ChatGPT Temporary Chat onboarding is visible without its Continue action");
  }
  await continueButton.click({ force: true });
  await dialog.waitFor({ state: "hidden", timeout: 10_000 });
  return true;
}

type ChatGptTextScope = Pick<Locator, "getByText">;

const chatGptSubscriptionFailureAlert = (page: Page): Locator =>
  page
    .locator('[role="alert"]')
    .filter({ hasText: /Failed to load subscription/i })
    .last();

const chatGptExpiredSessionAlert = (page: Page): Locator =>
  page
    .locator('[role="alert"], [role="dialog"]')
    .filter({
      hasText:
        /Your session has expired|你的工作階段已過期|您的工作階段已過期|你的会话已过期|您的会话已过期/i,
    })
    .last();

export async function throwIfChatGptSessionFailureAlert(page: Page): Promise<void> {
  if (
    await chatGptExpiredSessionAlert(page)
      .isVisible()
      .catch(() => false)
  ) {
    throw new ChatGptWebAdapterError(
      "The ChatGPT session has expired. Sign in again in Codex Web GPT.",
      {
        status: 401,
        errorType: "authentication_error",
        code: "chatgpt_session_expired",
        retryable: false,
      }
    );
  }
  if (
    !(await chatGptSubscriptionFailureAlert(page)
      .isVisible()
      .catch(() => false))
  )
    return;
  throw new ChatGptWebAdapterError(
    "ChatGPT could not load the account subscription. Reload ChatGPT inside the launcher and retry; sign out only if the error persists.",
    {
      status: 503,
      errorType: "server_error",
      code: "chatgpt_subscription_unavailable",
      retryable: true,
    }
  );
}

const chatGptTerminalErrorAlert = (scope: ChatGptTextScope): Locator =>
  scope.getByText(/Something went wrong[\s\S]*help\.openai\.com/i).last();

export async function throwIfChatGptTerminalErrorAlert(scope: ChatGptTextScope): Promise<void> {
  if (
    !(await chatGptTerminalErrorAlert(scope)
      .isVisible()
      .catch(() => false))
  )
    return;
  throw new ChatGptWebAdapterError(
    "ChatGPT ended the turn with 'Something went wrong'. Retry the turn.",
    { status: 502, errorType: "server_error", code: "upstream_server_error", retryable: true }
  );
}

export async function resolveChatGptToolConfirmation(
  page: Page,
  appName: string,
  autoApprove: boolean,
  signal?: AbortSignal,
  timeoutMs = CHATGPT_TOOL_CONFIRMATION_TIMEOUT_MS,
  onVisible?: () => Promise<void>
): Promise<boolean> {
  const dialog = page
    .locator('[role="dialog"], [data-testid="tool-approval-card"]')
    .filter({ hasText: `Allow ChatGPT to use ${appName}?` })
    .last();
  if (!(await dialog.isVisible().catch(() => false))) return false;
  await onVisible?.();

  if (autoApprove) {
    // ChatGPT exposes either "Allow once" or the shorter "Allow" for the
    // current one-shot approval. Keep the matcher anchored so persistent
    // actions such as "Always allow" cannot match.
    const allowCurrentAction = dialog.getByRole("button", { name: /^Allow(?: once)?$/ }).last();
    await allowCurrentAction.waitFor({ state: "visible", timeout: 10_000 });
    await allowCurrentAction.press("Enter");
    return true;
  }

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (signal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
    if (!(await dialog.isVisible().catch(() => false))) return true;
    await new Promise((resolveSleep) =>
      setTimeout(resolveSleep, Math.min(100, Math.max(1, deadline - Date.now())))
    );
  }

  if (!(await dialog.isVisible().catch(() => false))) return true;
  const deny = dialog.getByRole("button", { name: "Deny", exact: true }).last();
  await deny.waitFor({ state: "visible", timeout: 5_000 });
  await deny.press("Enter");
  await dialog.waitFor({ state: "hidden", timeout: 10_000 });
  return true;
}

export function assertChatGptWebInputWithinLimits(
  estimatedInputTokens: number,
  estimatedMessageTokens: number,
  modelId: string,
  effort: ChatGptWebModelMode["effort"],
  capabilities: ChatGptWebCapabilities,
  promptChars?: number
): void {
  if (modelId !== CHATGPT_WEB_MODEL_ID && modelId !== CHATGPT_WEB_LUNA_MODEL_ID) {
    throw new Error(`ChatGPT web context limit is not defined for model: ${modelId}`);
  }
  if (
    modelId === CHATGPT_WEB_LUNA_MODEL_ID &&
    estimatedInputTokens > CHATGPT_LUNA_BROWSER_INPUT_TOKEN_BUDGET
  ) {
    throw new ChatGptWebAdapterError(
      `This Luna turn requires ${estimatedInputTokens.toLocaleString("en-US")} estimated input tokens, which exceeds the measured ${CHATGPT_LUNA_BROWSER_INPUT_TOKEN_BUDGET.toLocaleString("en-US")}-token ChatGPT Free browser transport budget. Completed Luna history is already replaced by its rolling checkpoint; the remaining payload is the current Codex turn and cannot be reduced by /compact.`,
      {
        status: 400,
        errorType: "invalid_request_error",
        code: "context_length_exceeded",
        retryable: false,
      }
    );
  }
  const { contextWindow } = resolveChatGptWebContextLimits(modelId, effort, capabilities);
  const { browserMessageTokenLimit, browserComposerCharLimit } = resolveChatGptWebTransportLimits(
    modelId,
    effort,
    capabilities
  );
  if (
    browserComposerCharLimit !== undefined &&
    promptChars !== undefined &&
    promptChars > browserComposerCharLimit
  ) {
    throw new ChatGptWebAdapterError(
      `This prompt contains ${promptChars.toLocaleString("en-US")} inline characters, which exceeds the measured ${browserComposerCharLimit.toLocaleString("en-US")}-character ChatGPT composer boundary for this account and effort. Run /compact, then retry this Web model.`,
      {
        status: 400,
        errorType: "invalid_request_error",
        code: "context_length_exceeded",
        retryable: false,
      }
    );
  }
  if (browserMessageTokenLimit !== undefined && estimatedMessageTokens > browserMessageTokenLimit) {
    throw new ChatGptWebAdapterError(
      `This prompt requires ${estimatedMessageTokens.toLocaleString("en-US")} visible message tokens, which exceeds the measured ${browserMessageTokenLimit.toLocaleString("en-US")}-token ChatGPT browser message boundary for this account and effort. The model context window is ${contextWindow.toLocaleString("en-US")} tokens; run /compact to reduce the next browser message without changing that model window.`,
      {
        status: 400,
        errorType: "invalid_request_error",
        code: "context_length_exceeded",
        retryable: false,
      }
    );
  }
  if (estimatedInputTokens < contextWindow) return;
  throw new ChatGptWebAdapterError(
    `This task is estimated at ${estimatedInputTokens.toLocaleString("en-US")} input tokens, which exceeds the ${contextWindow.toLocaleString("en-US")}-token context window for this ChatGPT Web model. Switch to a model with a larger context window, run /compact, then retry this Web model.`,
    {
      status: 400,
      errorType: "invalid_request_error",
      code: "context_length_exceeded",
      retryable: false,
    }
  );
}

export function assertChatGptWebMultipartInputWithinLimits(
  estimatedInputTokens: number,
  estimatedMessageTokens: number,
  modelId: string,
  effort: ChatGptWebModelMode["effort"],
  capabilities: ChatGptWebCapabilities,
  maxMessageChars: number,
  partCount: 2 | 3,
  transport?: {
    stagingEffort: ChatGptWebModelMode["effort"];
    maxStageMessageTokens: number;
    maxStageChars: number;
    finalMessageTokens: number;
    finalMessageChars: number;
  }
): void {
  if (modelId === CHATGPT_WEB_LUNA_MODEL_ID) {
    throw new ChatGptWebAdapterError(
      "Bigger Context is unavailable for Luna because every later browser request includes the accumulated transcript inside the same 28,000-token transport budget.",
      {
        status: 400,
        errorType: "invalid_request_error",
        code: "context_length_exceeded",
        retryable: false,
      }
    );
  }
  if (modelId !== CHATGPT_WEB_MODEL_ID) {
    throw new Error(`ChatGPT Bigger Context limit is not defined for model: ${modelId}`);
  }
  const { contextWindow } = resolveChatGptWebContextLimits(modelId, effort, capabilities);
  const assertMessageBoundary = (
    label: "stage" | "final part",
    messageTokens: number,
    messageChars: number,
    messageEffort: ChatGptWebModelMode["effort"]
  ): void => {
    const { browserMessageTokenLimit, browserComposerCharLimit } = resolveChatGptWebTransportLimits(
      modelId,
      messageEffort,
      capabilities
    );
    if (browserComposerCharLimit !== undefined && messageChars > browserComposerCharLimit) {
      throw new ChatGptWebAdapterError(
        `A Bigger Context ${label} contains ${messageChars.toLocaleString("en-US")} characters, which exceeds the measured ${browserComposerCharLimit.toLocaleString("en-US")}-character ChatGPT composer boundary. The bridge will not split an individual Codex message or JSON record; compact the task before retrying.`,
        {
          status: 400,
          errorType: "invalid_request_error",
          code: "context_length_exceeded",
          retryable: false,
        }
      );
    }
    if (browserMessageTokenLimit !== undefined && messageTokens > browserMessageTokenLimit) {
      throw new ChatGptWebAdapterError(
        `A Bigger Context ${label} requires ${messageTokens.toLocaleString("en-US")} visible message tokens, which exceeds the measured ${browserMessageTokenLimit.toLocaleString("en-US")}-token ChatGPT message boundary. The bridge will not split an individual Codex message or JSON record; compact the task before retrying.`,
        {
          status: 400,
          errorType: "invalid_request_error",
          code: "context_length_exceeded",
          retryable: false,
        }
      );
    }
  };
  if (transport) {
    assertMessageBoundary(
      "stage",
      transport.maxStageMessageTokens,
      transport.maxStageChars,
      transport.stagingEffort
    );
    assertMessageBoundary(
      "final part",
      transport.finalMessageTokens,
      transport.finalMessageChars,
      effort
    );
  } else {
    assertMessageBoundary("stage", estimatedMessageTokens, maxMessageChars, effort);
  }
  const experimentalContextWindow = contextWindow * partCount;
  if (estimatedInputTokens < experimentalContextWindow) return;
  const partLabel = partCount === 2 ? "two-part" : "three-part";
  throw new ChatGptWebAdapterError(
    `This Bigger Context transaction is estimated at ${estimatedInputTokens.toLocaleString("en-US")} input tokens, which exceeds its experimental ${experimentalContextWindow.toLocaleString("en-US")}-token ${partLabel} ceiling. Run /compact, then retry.`,
    {
      status: 400,
      errorType: "invalid_request_error",
      code: "context_length_exceeded",
      retryable: false,
    }
  );
}

/** Select the cheapest account-visible mode that can carry every inert multipart stage. */
export function resolveChatGptWebMultipartStagingMode(
  modelId: string,
  capabilities: ChatGptWebCapabilities,
  requestedEffort: ChatGptWebModelMode["effort"],
  maxStageMessageTokens: number,
  maxStageChars: number
): ChatGptWebModelMode {
  if (modelId === CHATGPT_WEB_LUNA_MODEL_ID || !capabilities.solAvailable) {
    throw new ChatGptWebAdapterError(
      "Bigger Context staging is unavailable for a Luna-only account.",
      {
        status: 400,
        errorType: "invalid_request_error",
        code: "context_length_exceeded",
        retryable: false,
      }
    );
  }
  if (modelId !== CHATGPT_WEB_MODEL_ID) {
    throw new Error(`ChatGPT Bigger Context staging mode is not defined for model: ${modelId}`);
  }
  const efforts: readonly ChatGptWebModelMode["effort"][] = capabilities.proAvailable
    ? ["low", "medium", "max"]
    : ["low", "medium"];
  const requestedContextWindow = resolveChatGptWebContextLimits(
    modelId,
    requestedEffort,
    capabilities
  ).contextWindow;
  for (const effort of efforts) {
    const mode = resolveChatGptWebModelMode(modelId, effort, capabilities);
    const contextWindow = resolveChatGptWebContextLimits(
      modelId,
      effort,
      capabilities
    ).contextWindow;
    if (contextWindow < requestedContextWindow) continue;
    const limits = resolveChatGptWebTransportLimits(modelId, effort, capabilities);
    const tokenFits =
      limits.browserMessageTokenLimit === undefined ||
      maxStageMessageTokens <= limits.browserMessageTokenLimit;
    const charsFit =
      limits.browserComposerCharLimit === undefined ||
      maxStageChars <= limits.browserComposerCharLimit;
    if (tokenFits && charsFit) return mode;
  }
  throw new ChatGptWebAdapterError(
    `No ChatGPT effort available to this account can carry a Bigger Context stage with ${maxStageMessageTokens.toLocaleString("en-US")} estimated tokens and ${maxStageChars.toLocaleString("en-US")} characters.`,
    {
      status: 400,
      errorType: "invalid_request_error",
      code: "context_length_exceeded",
      retryable: false,
    }
  );
}

export const browserStageTimeouts = {
  browserPage: 60_000,
  temporaryChatPreparation: 150_000,
  effortSelection: 120_000,
  promptAttachment: 60_000,
  fileAttachment: 120_000,
  send: 20_000,
  // A Bigger Context stage posts a payload orders of magnitude larger than an ordinary prompt onto
  // a conversation that already holds the earlier parts, and this budget covers ChatGPT accepting
  // the submission, not just the click. The ordinary 20s send budget expired mid-acceptance and
  // destroyed the whole turn while the browser was still working.
  multipartStageSend: 180_000,
} as const;

/**
 * Detects that this process was suspended (system sleep) by watching for gaps in a steady tick.
 * On Apple Silicon the monotonic clock keeps advancing through sleep, so elapsed time alone cannot
 * distinguish "the stage really took 15 minutes" from "the machine slept for 14 of them" — and a
 * stage budget charged for slept time cancels turns that never got their budget awake.
 */
export class ChatGptSuspensionClock {
  private suspendedTotalMs = 0;
  private lastTickAt: number;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor(
    private readonly tickIntervalMs = 1_000,
    private readonly gapThresholdMs = 5_000
  ) {
    this.lastTickAt = Date.now();
  }

  start(): void {
    if (this.timer) return;
    this.lastTickAt = Date.now();
    this.timer = setInterval(() => this.tick(Date.now()), this.tickIntervalMs);
    this.timer.unref?.();
  }

  /** Exposed for tests; production ticks come from the interval above. */
  tick(now: number): void {
    const gap = now - this.lastTickAt;
    this.lastTickAt = now;
    if (gap >= this.gapThresholdMs) this.suspendedTotalMs += gap - this.tickIntervalMs;
  }

  suspendedMs(): number {
    return this.suspendedTotalMs;
  }
}

export const chatGptSuspensionClock = new ChatGptSuspensionClock();

/**
 * How much of a stage budget remains once slept time is refunded. Zero means the stage really
 * consumed its budget while awake and the timeout stands.
 */
export function remainingStageBudgetMs(
  timeoutMs: number,
  elapsedMs: number,
  suspendedMs: number
): number {
  const awakeMs = elapsedMs - suspendedMs;
  if (awakeMs >= timeoutMs) return 0;
  return Math.max(250, timeoutMs - awakeMs);
}

export const MAX_CHATGPT_BROWSER_PAGE_REBINDS = 2;

export async function connectAfterClosingBrowserConnection<T>(
  previousConnection: Pick<Browser, "close"> | undefined,
  connect: () => Promise<T>
): Promise<T> {
  if (previousConnection) await previousConnection.close();
  return connect();
}

export const CHATGPT_MIN_OPERATIONAL_VIEWPORT = Object.freeze({ width: 320, height: 240 });

async function waitForOperationalChatGptViewport(page: Page, signal?: AbortSignal): Promise<void> {
  try {
    await withBrowserTurnAbort(
      page.waitForFunction(
        ({ width, height }) => innerWidth >= width && innerHeight >= height,
        CHATGPT_MIN_OPERATIONAL_VIEWPORT,
        { polling: 50, timeout: 10_000 }
      ),
      signal
    );
  } catch (error) {
    if (signal?.aborted)
      throw new DOMException("ChatGPT browser page acquisition aborted", "AbortError");
    throw new Error(
      `ChatGPT browser surface did not expose an operational viewport: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export const CHATGPT_COMPOSER_DOCUMENT_END_KEY =
  process.platform === "darwin" ? "Meta+ArrowDown" : "Control+End";

function throwIfPromptAttachmentAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new DOMException("ChatGPT prompt attachment aborted", "AbortError");
}

function withBrowserTurnAbort<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted)
    return Promise.reject(new DOMException("ChatGPT web turn aborted", "AbortError"));
  return new Promise<T>((resolvePromise, rejectPromise) => {
    const onAbort = () => rejectPromise(new DOMException("ChatGPT web turn aborted", "AbortError"));
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(resolvePromise, rejectPromise).finally(() => {
      signal.removeEventListener("abort", onAbort);
    });
  });
}

export interface BrowserTurn {
  traceId: string;
  modelId: string;
  reasoning?: string;
  capabilities: ChatGptWebCapabilities;
  prepare: () => Promise<CompiledChatGptWebPrompt & { release: () => void }>;
  prepareResume?: () => Promise<CompiledChatGptWebPrompt & { release: () => void }>;
  /** Select the Codex Native connector without advertising the ordinary turn tool environment. */
  nativeConnector?: boolean;
  retainConversation?: boolean;
  requireRetainedConversation?: boolean;
  conversationKey?: string;
  onPreparedSelected?: (reused: boolean) => void | Promise<void>;
  abortSignal?: AbortSignal;
  onHeartbeat?: () => void;
  /** Send activation is the ambiguity boundary after which a fresh surface must not replay this prompt. */
  onSendActivated?: () => void | Promise<void>;
  /** Semantic submission evidence proved that ChatGPT accepted the prompt. */
  onSubmitted?: () => void;
  /** Visible ChatGPT reasoning-summary step titles only; never hidden chain-of-thought. */
  onReasoningSummary?: (text: string, continuation?: boolean) => void;
  /** Stable visible ChatGPT prose between status/tool rows. */
  onCommentary?: (text: string, continuation?: boolean) => void;
  /** Append-only, structurally stable Markdown chunks. */
  onTextDelta: (delta: string) => void;
  /** Proven current-turn MCP activity; liveness only, never response content or completion. */
  externalProgress?: ChatGptTurnProgressReader;
  /** Allow one clean pre-submit composer retry for isolated history compaction only. */
  compaction?: boolean;
  /** Require and remove the private Luna checkpoint tail from the visible Markdown stream. */
  captureLunaCheckpoint?: boolean;
  onLunaCheckpoint?: (captured: CapturedChatGptLunaCheckpoint) => void;
}

interface ChatGptSubmissionBaseline {
  userTurns: Locator;
  responseTurns: Locator;
  initialUserTurnCount: number;
  initialResponseTurnCount: number;
  initialUserTurnIdentities: readonly string[];
  initialResponseTurnIdentities: readonly string[];
  domCache: ChatGptSubmissionDomCache;
}

interface ChatGptAssistantTurnBinding {
  identity: string;
  locator: Locator;
  acceptedUserTurnIdentities: readonly string[];
}

interface ChatGptSubmissionDomState {
  userTurnCount: number;
  assistantTurnCount: number;
  visibleStopButtonCount: number;
  userIdentities: string[];
  responseIdentities: string[];
}

interface ChatGptSubmissionDomCache {
  key?: string;
  snapshot?: ChatGptSubmissionDomState;
  fullScans?: number;
  cacheHits?: number;
}

export interface ResolvedBrowserConfig {
  appName: string;
  browserHost: "managed-chrome" | "launcher";
  browserHostDescriptorPath?: string;
  browserHelperScriptPath?: string;
  browserDiagnosticsPath?: string;
  storageStatePath: string;
  chromeExecutablePath?: string;
  cdpEndpoint?: string;
  turnTimeoutMs?: number;
  headed: boolean;
  autoApproveToolCalls: boolean;
}

export function chatGptTurnIsComplete(state: {
  responsePresent: boolean;
  running: boolean;
  currentText: string;
  currentHtml?: string;
  completionActionVisible: boolean;
}): boolean {
  return (
    state.responsePresent &&
    !state.running &&
    state.currentText.length > 0 &&
    state.completionActionVisible
  );
}

export type ChatGptSubmissionEvidence =
  "user_turn" | "assistant_turn" | "generation_running" | "mcp_tool_call";

export function chatGptSubmissionEvidence(state: {
  initialUserTurnCount: number;
  userTurnCount: number;
  initialAssistantTurnCount: number;
  assistantTurnCount: number;
  generationRunning: boolean;
}): ChatGptSubmissionEvidence | undefined {
  if (state.userTurnCount > state.initialUserTurnCount) return "user_turn";
  if (state.assistantTurnCount > state.initialAssistantTurnCount) return "assistant_turn";
  if (state.generationRunning) return "generation_running";
  return undefined;
}

export type ChatGptConnectorAttachmentMode = "none" | "mention" | "retained";

/** A launcher lease may reuse a connector only after proving that exact retained surface is bound. */
export function chatGptConnectorAttachmentMode(
  localTools: boolean,
  reuseConversation: boolean
): ChatGptConnectorAttachmentMode {
  if (!localTools) return "none";
  return reuseConversation ? "retained" : "mention";
}

export function chatGptEffortSelectionRequired(
  reuseConversation: boolean,
  requestedEffort: string,
  stagingEffort: string
): boolean {
  return !reuseConversation || requestedEffort !== stagingEffort;
}

export async function setChatGptThinkMode(
  composerForm: Locator,
  enabled: boolean,
  captureDiagnostic?: (checkpoint: string) => Promise<void>
): Promise<void> {
  const controls = composerForm
    .getByRole("button", { name: "Think", exact: true })
    .filter({ visible: true });
  const count = await controls.count();
  if (count === 0) {
    if (enabled)
      throw new Error("ChatGPT Think control is not available on this Luna-only account");
    await captureDiagnostic?.("luna-default-confirmed");
    return;
  }
  if (count !== 1) throw new Error(`ChatGPT exposed ${count} visible Think controls`);
  const control = controls.first();
  let pressed = await control.getAttribute("aria-pressed");
  if (pressed !== "true" && pressed !== "false") {
    throw new Error("ChatGPT Think control has no semantic pressed state");
  }
  const target = enabled ? "true" : "false";
  if (pressed !== target) {
    await control.click();
    const deadline = Date.now() + 5_000;
    while (Date.now() < deadline) {
      pressed = await control.getAttribute("aria-pressed");
      if (pressed === target) break;
      if (pressed !== "true" && pressed !== "false") {
        throw new Error("ChatGPT Think control lost its semantic pressed state");
      }
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 100));
    }
    if (pressed !== target) {
      throw new Error(`ChatGPT did not ${enabled ? "enable" : "disable"} Think mode`);
    }
  }
  await captureDiagnostic?.(enabled ? "think-enabled" : "think-disabled");
}

export function chatGptNewTurnIdentity(
  initial: readonly string[],
  current: readonly string[]
): string | undefined {
  const previous = new Set(initial);
  const added = current.filter((identity) => !previous.has(identity));
  if (added.length > 1) {
    throw new Error(
      `ChatGPT exposed ${added.length} new conversation turns for one submitted message`
    );
  }
  return added[0];
}

export function chatGptReboundTurnIdentity(
  initial: readonly string[],
  boundIdentity: string,
  current: readonly string[]
): string | undefined {
  if (current.includes(boundIdentity)) return boundIdentity;
  return chatGptNewTurnIdentity(initial, current);
}

export class ChatGptCompletionTracker {
  private candidate?: { signature: string; since: number };

  constructor(private readonly stableMs = CHATGPT_COMPLETION_SETTLE_MS) {}

  update(
    state: Parameters<typeof chatGptTurnIsComplete>[0] & { externalProgressLive?: boolean },
    now = Date.now()
  ): boolean {
    // An outstanding tool call proves the model has more to say, whatever the rendered message
    // currently looks like. Completing here would return a truncated answer and retire the turn
    // while its own tool calls were still in flight.
    if (state.externalProgressLive) {
      this.candidate = undefined;
      return false;
    }
    if (!chatGptTurnIsComplete(state)) {
      this.candidate = undefined;
      return false;
    }
    const signature = `${state.currentText}\0${state.currentHtml ?? state.currentText}`;
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
  private missingCompletionAction?: { text: string; since: number };

  constructor(
    private readonly missingResponseMs = CHATGPT_RESPONSE_DOM_GRACE_MS,
    private readonly emptyCompletionMs = CHATGPT_EMPTY_RESPONSE_GRACE_MS,
    private readonly missingCompletionActionMs = CHATGPT_COMPLETION_ACTION_GRACE_MS
  ) {}

  /**
   * Clears only the missing-response window, leaving `sawResponse` history intact.
   *
   * Callers use this when proven external progress suspends DOM health checks: the suspended
   * stretch must not be charged against the grace period, or the first observation after it
   * resumes would fail instantly against a timestamp recorded long before.
   */
  clearMissingResponse(): void {
    this.missingResponseSince = undefined;
  }

  update(
    state: {
      responsePresent: boolean;
      running: boolean;
      currentText: string;
      completionActionVisible: boolean;
      externalProgressLive?: boolean;
    },
    now = Date.now()
  ): string | undefined {
    if (state.responsePresent) this.sawResponse = true;
    if (state.externalProgressLive) {
      // Every conclusion below asserts that ChatGPT stopped producing this turn. A tool call that
      // is still completing disproves all of them, whatever the renderer is currently exposing, so
      // no window may accrue while the model is provably working.
      this.missingResponseSince = undefined;
      this.emptyCompletionSince = undefined;
      this.missingCompletionAction = undefined;
      return undefined;
    }
    if (state.responsePresent) {
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

    const missingCompletionAction =
      state.responsePresent &&
      !state.running &&
      state.currentText.length > 0 &&
      !state.completionActionVisible;
    if (!missingCompletionAction) {
      this.missingCompletionAction = undefined;
    } else if (this.missingCompletionAction?.text !== state.currentText) {
      this.missingCompletionAction = { text: state.currentText, since: now };
    } else if (now - this.missingCompletionAction.since >= this.missingCompletionActionMs) {
      return "ChatGPT stopped generating but did not expose its completed-turn action; the ChatGPT DOM may have changed";
    }
    return undefined;
  }
}

export const CHATGPT_STOPPED_THINKING_GRACE_MS = 5_000;

/**
 * Consecutive internal observation faults tolerated before a turn is abandoned.
 *
 * A `TypeError` raised while reading the page is a defect in this worker, not evidence about
 * ChatGPT. Tearing the turn down on one loses an accepted ChatGPT turn that cannot be resent, so
 * the loop re-observes instead. The budget is consecutive: any successful observation resets it,
 * and exhausting it still fails closed with the original fault as the cause.
 */
export const MAX_CHATGPT_INTERNAL_OBSERVATION_FAULTS = 8;

/**
 * How stale recorded MCP progress may be and still suppress DOM health checks.
 *
 * An outstanding tool call reports liveness regardless of age, so a call that never returns would
 * otherwise hold a turn open forever — turns carry no deadline unless a caller supplies one. This
 * bounds the silence since the last recorded activity rather than the turn's total duration, so a
 * long turn that keeps calling tools is never penalised for taking a long time.
 */
export const CHATGPT_EXTERNAL_PROGRESS_STALL_CEILING_MS = 10 * 60_000;

/** Tolerated clock difference between the recording daemon and the observing helper process. */
export const CHATGPT_EXTERNAL_PROGRESS_CLOCK_SKEW_MS = 5_000;

/** Proven MCP activity, additionally required to be recent enough to still be evidence. */
export function chatGptExternalProgressSuppressesDomHealth(
  snapshot: ChatGptExternalTurnProgressSnapshot | undefined,
  now: number
): boolean {
  if (!chatGptExternalProgressIsLive(snapshot, now, CHATGPT_RESPONSE_DOM_GRACE_MS)) return false;
  const lastProgressAt = snapshot?.lastProgressAt;
  if (lastProgressAt === undefined) return false;
  const age = now - lastProgressAt;
  // A timestamp from the future would keep `age` below the ceiling forever. Recorded activity can
  // only precede the observation, so anything meaningfully ahead of now is not evidence at all.
  return (
    age >= -CHATGPT_EXTERNAL_PROGRESS_CLOCK_SKEW_MS &&
    age < CHATGPT_EXTERNAL_PROGRESS_STALL_CEILING_MS
  );
}

export class ChatGptStoppedThinkingTracker {
  private visibleSince?: number;

  /**
   * Forgets an in-progress "Stopped thinking" window.
   *
   * Suppressing only the throw let the window keep accruing while a tool call was outstanding, so
   * the first observation after progress ended cancelled the turn instantly. Proven activity must
   * reset the evidence, not merely postpone acting on it.
   */
  clear(): void {
    this.visibleSince = undefined;
  }

  constructor(private readonly graceMs = CHATGPT_STOPPED_THINKING_GRACE_MS) {
    if (!Number.isFinite(graceMs) || graceMs < 0) {
      throw new Error("ChatGPT Stopped thinking grace must be a non-negative finite number");
    }
  }

  update(visible: boolean, now = Date.now()): boolean {
    if (!visible) {
      this.visibleSince = undefined;
      return false;
    }
    this.visibleSince ??= now;
    return now - this.visibleSince >= this.graceMs;
  }
}

export interface ChatGptVisibleTraceBlock {
  kind: "answer" | "commentary" | "status";
  text: string;
  key?: string;
  complete?: boolean;
  uiControl?: boolean;
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
  markdownSegments: ChatGptMarkdownSegment[];
  completionActionVisible: boolean;
  stoppedThinkingVisible: boolean;
  traceBlocks: ChatGptVisibleTraceBlock[];
}

interface ChatGptResponseDomCache {
  key?: string;
  snapshot?: ChatGptResponseDomSnapshot;
  fullScans?: number;
  cacheHits?: number;
}

const absentResponseDomSnapshot = (): ChatGptResponseDomSnapshot => ({
  responsePresent: false,
  visibleText: "",
  fullHtml: "",
  markdownSegments: [],
  completionActionVisible: false,
  stoppedThinkingVisible: false,
  traceBlocks: [],
});

/** Convert the public ChatGPT turn DOM into append-only Codex reasoning summaries. */
export class ChatGptVisibleTraceTracker {
  private readonly emittedTrace = new Map<string, string>();
  private readonly traceCandidates = new Map<string, { text: string; changedAt: number }>();

  constructor(private readonly traceStabilityMs = 250) {}

  observe(
    blocks: ChatGptVisibleTraceBlock[],
    completionActionVisible: boolean,
    now = Date.now()
  ): ChatGptVisibleTraceEvent[] {
    const output: ChatGptVisibleTraceEvent[] = [];
    let statusSlot = 0;
    let commentarySlot = 0;
    for (const block of blocks) {
      // Final-answer roots are carried by ChatGptMarkdownBuffer. Commentary roots are identified
      // structurally by responseDomSnapshot before they reach this tracker.
      if (block.kind === "answer") continue;
      const index = block.kind === "status" ? statusSlot++ : commentarySlot++;
      const slot = block.key ? `${block.kind}:${block.key}` : `${block.kind}:${index}`;
      const stripped = block.text
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((line) => line.replace(/[\t ]+/g, " ").trim())
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      const text = block.kind === "status" ? stripped.replace(/\s+/g, " ") : stripped;
      if (!text) continue;
      let candidate = this.traceCandidates.get(slot);
      if (!candidate || candidate.text !== text) {
        candidate = { text, changedAt: now };
        this.traceCandidates.set(slot, candidate);
        if (!completionActionVisible && this.traceStabilityMs > 0) continue;
      }
      // A commentary Markdown root remains mutable until ChatGPT appends the next reasoning item.
      // Emitting it earlier lets a tool-status boundary split one semantic paragraph into multiple
      // Codex messages. The next anchored item (or final completion evidence) is the stable boundary.
      if (block.kind === "commentary" && block.complete === false && !completionActionVisible)
        continue;
      if (!completionActionVisible && now - candidate.changedAt < this.traceStabilityMs) continue;

      const previous = this.emittedTrace.get(slot);
      if (previous === text) continue;
      this.emittedTrace.set(slot, text);
      const kind = block.kind === "commentary" ? "commentary" : "reasoning";

      if (previous && text.startsWith(previous)) {
        output.push({ kind, text: text.slice(previous.length), continuation: true });
      } else {
        output.push({ kind, text });
      }
    }
    return output;
  }
}

export function isChatGptTraceControl(block: ChatGptVisibleTraceBlock): boolean {
  if (block.kind !== "status") return false;
  const text = block.text.replace(/\s+/g, " ").trim();
  return block.uiControl === true || text === "Answer now" || text === "Thinking";
}

export function stripChatGptTraceControlSuffix(
  block: ChatGptVisibleTraceBlock
): ChatGptVisibleTraceBlock {
  if (block.kind !== "status") return block;
  const text = block.text.replace(/(?:^|\s)Answer now\s*$/, "").trimEnd();
  return text === block.text ? block : { ...block, text };
}

export function resolveBrowserConfig(provider: CodexProviderConfig): ResolvedBrowserConfig {
  const configured = provider.chatgptWeb ?? {};
  const appName = configured.appName?.trim() || CHATGPT_CONNECTOR_NAME;
  const browserHost = configured.browserHost ?? "managed-chrome";
  const browserHostDescriptorPath = configured.browserHostDescriptorPath?.trim();
  const browserHelperScriptPath = configured.browserHelperScriptPath?.trim();
  const browserDiagnosticsPath = resolve(
    expandUserPath(
      configured.browserDiagnosticsPath?.trim() ||
        join(getConfigDir(), "diagnostics", "browser-turns")
    )
  );
  const turnTimeoutMs = configured.turnTimeoutMs;
  const cdpEndpoint = configured.cdpEndpoint?.trim();
  const explicitChromeExecutablePath = configured.chromeExecutablePath?.trim();
  if (browserHost === "launcher" && !browserHostDescriptorPath) {
    throw new Error("Launcher browser host requires chatgptWeb.browserHostDescriptorPath");
  }
  if (browserHelperScriptPath && browserHost !== "launcher") {
    throw new Error("Explicit browser helper script requires a launcher host");
  }
  const resolvedBrowserHelperScriptPath = browserHelperScriptPath
    ? resolve(expandUserPath(browserHelperScriptPath))
    : undefined;
  if (resolvedBrowserHelperScriptPath && !existsSync(resolvedBrowserHelperScriptPath)) {
    throw new Error(
      `Explicit browser helper script does not exist: ${resolvedBrowserHelperScriptPath}`
    );
  }
  if (turnTimeoutMs !== undefined && (!Number.isFinite(turnTimeoutMs) || turnTimeoutMs <= 0)) {
    throw new Error("ChatGPT Web turnTimeoutMs must be a positive finite number");
  }
  if (isLegacyChatGptConnectorName(appName)) {
    throw new Error(legacyChatGptConnectorMigrationMessage(appName));
  }
  return {
    appName,
    browserHost,
    ...(browserHostDescriptorPath
      ? { browserHostDescriptorPath: resolve(expandUserPath(browserHostDescriptorPath)) }
      : {}),
    ...(resolvedBrowserHelperScriptPath
      ? { browserHelperScriptPath: resolvedBrowserHelperScriptPath }
      : {}),
    browserDiagnosticsPath,
    storageStatePath: resolve(
      expandUserPath(
        configured.storageStatePath?.trim() || join(getConfigDir(), "browser", "storage-state.json")
      )
    ),
    ...(cdpEndpoint
      ? { cdpEndpoint }
      : {
          chromeExecutablePath: resolve(
            expandUserPath(explicitChromeExecutablePath || defaultChromeExecutable())
          ),
        }),
    ...(turnTimeoutMs !== undefined ? { turnTimeoutMs } : {}),
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

const fileMediaTypes = new Map([
  [".csv", "text/csv"],
  [".doc", "application/msword"],
  [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  [".html", "text/html"],
  [".json", "application/json"],
  [".jsonl", "application/x-ndjson"],
  [".md", "text/markdown"],
  [".pdf", "application/pdf"],
  [".ppt", "application/vnd.ms-powerpoint"],
  [".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  [".rtf", "application/rtf"],
  [".tsv", "text/tab-separated-values"],
  [".txt", "text/plain"],
  [".xls", "application/vnd.ms-excel"],
  [".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  [".xml", "application/xml"],
  [".yaml", "application/yaml"],
  [".yml", "application/yaml"],
]);

const CHATGPT_MAX_INPUT_FILES = 10;
const CHATGPT_MAX_INPUT_FILE_BYTES = 25_000_000;
const CHATGPT_MAX_INPUT_ATTACHMENT_BYTES = 50_000_000;

function decodeInlineFileData(file: ChatGptWebPromptFile): { buffer: Buffer; mimeType: string } {
  const parsed = parseDataUrl(file.fileData);
  const base64 = parsed?.base64 ?? file.fileData;
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64) || base64.length % 4 !== 0) {
    throw new Error(`ChatGPT web input file ${file.ref} contains invalid base64 data`);
  }
  const buffer = Buffer.from(base64, "base64");
  if (buffer.length === 0) throw new Error(`ChatGPT web input file ${file.ref} is empty`);
  if (buffer.length > CHATGPT_MAX_INPUT_FILE_BYTES) {
    throw new Error(`ChatGPT web input file ${file.ref} exceeds 25 MB`);
  }
  const mimeType =
    parsed?.mediaType.toLowerCase() ??
    fileMediaTypes.get(extname(file.filename).toLowerCase()) ??
    "application/octet-stream";
  return { buffer, mimeType };
}

function safeAttachmentFilename(file: ChatGptWebPromptFile): string {
  const leaf = basename(file.filename.replaceAll("\\", "/"))
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
  return leaf.slice(0, 180) || `${file.ref}.bin`;
}

export function chatGptInputFilePayloads(
  files: ChatGptWebPromptFile[]
): Array<{ name: string; mimeType: string; buffer: Buffer }> {
  if (files.length > CHATGPT_MAX_INPUT_FILES) {
    throw new Error(`ChatGPT web accepts at most ${CHATGPT_MAX_INPUT_FILES} input files per turn`);
  }
  return files.map((file) => ({
    name: safeAttachmentFilename(file),
    ...decodeInlineFileData(file),
  }));
}

export function chatGptImageFilePayloads(
  images: ChatGptWebPromptImage[]
): Array<{ name: string; mimeType: string; buffer: Buffer }> {
  if (images.length > CHATGPT_MAX_INPUT_IMAGES) {
    throw new Error(
      `ChatGPT web accepts at most ${CHATGPT_MAX_INPUT_IMAGES} input images per Codex turn`
    );
  }
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
  const payloads = [
    ...chatGptImageFilePayloads(prompt.images),
    ...chatGptInputFilePayloads(prompt.files),
  ];
  const totalBytes = payloads.reduce((total, payload) => total + payload.buffer.length, 0);
  if (totalBytes > CHATGPT_MAX_INPUT_ATTACHMENT_BYTES) {
    throw new Error("ChatGPT web input attachments exceed the 50 MB per-turn limit");
  }
  return payloads;
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
  private managedBrowserReady?: Promise<{ browser: Browser; context: BrowserContext }>;
  private launcherHelper?: LauncherBrowserHelperClient;
  private maintenanceTail: Promise<void> = Promise.resolve();
  private readonly activeRuns = new Map<string, Promise<string>>();

  private constructor(private readonly config: ResolvedBrowserConfig) {}

  /**
   * Lexical/contenteditable may preserve runs of ASCII spaces by exposing some of them as NBSP
   * through DOM textContent. Treat that DOM-only representation as equivalent only when the
   * expected U+0020 belongs to a multi-space run. Single spaces, tabs, newlines, intentional
   * expected NBSP characters, and every other mutation remain exact and fail closed.
   */
  private promptCodeUnitEquivalent(expected: string, observed: string, index: number): boolean {
    const expectedUnit = expected[index];
    const observedUnit = observed[index];

    if (expectedUnit === observedUnit) return true;
    if (expectedUnit !== " " || observedUnit !== "\u00A0") return false;

    return expected[index - 1] === " " || expected[index + 1] === " ";
  }

  private promptTextEquivalent(expected: string, observed: string): boolean {
    if (expected.length !== observed.length) return false;

    for (let index = 0; index < expected.length; index += 1) {
      if (!this.promptCodeUnitEquivalent(expected, observed, index)) {
        return false;
      }
    }

    return true;
  }

  private promptEquivalentPrefixLength(expected: string, observed: string): number {
    const length = Math.min(expected.length, observed.length);

    let index = 0;
    while (index < length && this.promptCodeUnitEquivalent(expected, observed, index)) {
      index += 1;
    }

    return index;
  }

  run(turn: BrowserTurn): Promise<string> {
    if (this.activeRuns.has(turn.traceId)) {
      return Promise.reject(new Error(`Duplicate ChatGPT web browser turn: ${turn.traceId}`));
    }
    if (this.activeRuns.size >= MAX_CHATGPT_BROWSER_TABS) {
      return Promise.reject(
        new Error(
          `ChatGPT Web supports at most ${MAX_CHATGPT_BROWSER_TABS} simultaneous browser turns; close or finish a browser tab before starting another`
        )
      );
    }
    const useHelper =
      this.config.browserHost === "launcher" &&
      process.env.CODEX_CHATGPT_WEB_BROWSER_HELPER_PROCESS !== "1";
    if (useHelper) {
      this.launcherHelper ??= new LauncherBrowserHelperClient(this.config);
    }
    const run = Promise.resolve().then(() =>
      useHelper ? this.launcherHelper!.run(turn) : this.runExclusive(turn)
    );
    this.activeRuns.set(turn.traceId, run);
    void run
      .finally(() => {
        if (this.activeRuns.get(turn.traceId) === run) this.activeRuns.delete(turn.traceId);
      })
      .catch(() => {});
    return run;
  }

  verifyConnector(): Promise<string> {
    return this.enqueueMaintenance("connector verification", () => this.verifyConnectorExclusive());
  }

  inspectSession(detectCapabilities: boolean): Promise<{
    authenticated: true;
    temporary: true;
    url: string;
    solAvailable?: boolean;
    proAvailable?: boolean;
  }> {
    return this.enqueueMaintenance("session inspection", () =>
      this.inspectSessionExclusive(detectCapabilities)
    );
  }

  smokeTest(abortSignal?: AbortSignal): Promise<{ effort: string; response: string }> {
    return this.enqueueMaintenance("smoke test", () => this.smokeTestExclusive(abortSignal));
  }

  private enqueueMaintenance<T>(name: string, action: () => Promise<T>): Promise<T> {
    const operation = this.maintenanceTail.then(() => {
      if (this.activeRuns.size > 0) {
        throw new Error(`ChatGPT ${name} requires all browser turns to finish`);
      }
      return action();
    });
    this.maintenanceTail = operation.then(
      () => undefined,
      () => undefined
    );
    return operation;
  }

  async close(): Promise<void> {
    if (this.launcherHelper) {
      const helper = this.launcherHelper;
      this.launcherHelper = undefined;
      await helper.close();
    }
    await Promise.allSettled([...this.activeRuns.values()]);
    await this.maintenanceTail;
    const browser = this.browser;
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.managedBrowserReady = undefined;
    // For connectOverCDP, Playwright implements Browser.close as a transport disconnect; it does
    // not close the launcher-owned Electron process. Always release that connection and its
    // artifact directory instead of leaking one per timeout/helper lifecycle.
    if (browser) await browser.close();
  }

  private async runStage<T>(
    traceId: string,
    stage: string,
    timeoutMs: number,
    action: (abortSignal: AbortSignal) => Promise<T>,
    suspensionClock: Pick<ChatGptSuspensionClock, "suspendedMs"> = chatGptSuspensionClock
  ): Promise<T> {
    chatGptSuspensionClock.start();
    const startedAt = performance.now();
    const suspendedAtStart = suspensionClock.suspendedMs();
    console.info(`[chatgpt-web] browser turn ${traceId} stage=${stage} started`);
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const timeout = new Promise<never>((_, rejectTimeout) => {
        const fireOrRearm = () => {
          // A stage that spans a system sleep has not consumed its budget: the browser was as
          // frozen as this process, so slept time is refunded and the timer re-armed for what the
          // stage is still owed. Observed live as effort_selection "timing out" at 901s of a 120s
          // budget, to the second of a DarkWake.
          const suspendedMs = suspensionClock.suspendedMs() - suspendedAtStart;
          const remaining = remainingStageBudgetMs(
            timeoutMs,
            performance.now() - startedAt,
            suspendedMs
          );
          if (remaining > 0) {
            timer = setTimeout(fireOrRearm, remaining);
            return;
          }
          rejectTimeout(new Error(`ChatGPT browser stage timed out: ${stage}`));
          controller.abort();
        };
        timer = setTimeout(fireOrRearm, timeoutMs);
      });
      const value = await Promise.race([action(controller.signal), timeout]);
      console.info(
        `[chatgpt-web] browser turn ${traceId} stage=${stage} completed durationMs=${Math.round(performance.now() - startedAt)}`
      );
      return value;
    } catch (error) {
      console.error(
        `[chatgpt-web] browser turn ${traceId} stage=${stage} failed durationMs=${Math.round(performance.now() - startedAt)}: ${error instanceof Error ? error.message : String(error)}`
      );
      throw error;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  private async ensurePage(): Promise<Page> {
    if (this.page && !this.page.isClosed()) return this.page;
    if (this.config.browserHost === "launcher") {
      const connection = await connectLauncherBrowserHost(this.config.browserHostDescriptorPath!);
      this.browser = connection.browser;
      this.context = connection.context;
      this.page = connection.page;
      return this.page;
    }
    if (
      !existsSync(this.config.storageStatePath) ||
      !existsSync(loginVerificationMarkerPath(this.config.storageStatePath))
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
    this.browser = this.config.cdpEndpoint
      ? await chromium.connectOverCDP(this.config.cdpEndpoint)
      : await chromium.launch({
          executablePath: this.config.chromeExecutablePath,
          headless: !this.config.headed,
        });
    this.context = await this.browser.newContext({ storageState: this.config.storageStatePath });
    this.page = await this.context.newPage();
    return this.page;
  }

  private async ensureManagedBrowser(): Promise<{ browser: Browser; context: BrowserContext }> {
    if (this.managedBrowserReady) return this.managedBrowserReady;
    const opening = (async () => {
      if (
        !existsSync(this.config.storageStatePath) ||
        !existsSync(loginVerificationMarkerPath(this.config.storageStatePath))
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
      const browser = this.config.cdpEndpoint
        ? await chromium.connectOverCDP(this.config.cdpEndpoint)
        : await chromium.launch({
            executablePath: this.config.chromeExecutablePath,
            headless: !this.config.headed,
          });
      const context = await browser.newContext({ storageState: this.config.storageStatePath });
      this.browser = browser;
      this.context = context;
      return { browser, context };
    })();
    this.managedBrowserReady = opening;
    try {
      return await opening;
    } catch (error) {
      if (this.managedBrowserReady === opening) this.managedBrowserReady = undefined;
      throw error;
    }
  }

  /**
   * A Codex turn owns one isolated Temporary Chat document. Reusing the same
   * ChatGPT SPA page can retain the previous transcript and autocomplete DOM,
   * so an @app lookup may select stale UI from the preceding turn.
   */
  private async pageForNewTurn(): Promise<Page> {
    if (this.config.browserHost === "launcher") {
      throw new Error("Launcher turns require an explicitly leased browser surface");
    }
    const { context } = await this.ensureManagedBrowser();
    return await context.newPage();
  }

  private async selectModelAndEffort(
    page: Page,
    modelId: string,
    reasoning: string | undefined,
    capabilities: ChatGptWebCapabilities,
    captureDiagnostic?: (checkpoint: string) => Promise<void>
  ): Promise<ChatGptWebModelMode> {
    const mode = resolveChatGptWebModelMode(modelId, reasoning, capabilities);
    const composer = await this.activeComposer(page);
    const composerForm = composer.locator("xpath=ancestor::form[1]");
    const uiEffortIndex = mode.uiEffortIndex;
    if (uiEffortIndex === null) {
      await settleChatGptUi();
      await throwIfChatGptRateLimitDialog(page);
      const visibleControls = composerForm
        .locator(CHATGPT_EFFORT_CONTROL_SELECTOR)
        .filter({ visible: true });
      if ((await visibleControls.count()) > 0) {
        throw new Error(
          "ChatGPT Luna was selected from a Luna-only capability probe, but the account now exposes a model selector; rerun setup"
        );
      }
      await setChatGptThinkMode(composerForm, mode.thinkEnabled, captureDiagnostic);
      return mode;
    }
    const currentEffort = composerForm.locator(CHATGPT_EFFORT_CONTROL_SELECTOR).last();
    const effortWaitAbort = new AbortController();
    try {
      const ready = await Promise.race([
        currentEffort
          .waitFor({ state: "visible", timeout: 70_000, signal: effortWaitAbort.signal })
          .then(() => "effort" as const),
        chatGptExpiredSessionAlert(page)
          .waitFor({ state: "visible", timeout: 70_000, signal: effortWaitAbort.signal })
          .then(() => "session-expired" as const),
      ]);
      if (ready === "session-expired") await throwIfChatGptSessionFailureAlert(page);
    } catch (error) {
      if (error instanceof ChatGptWebAdapterError) throw error;
      await throwIfChatGptSessionFailureAlert(page);
      throw new Error(
        "ChatGPT rendered the composer but its model/effort control did not become ready"
      );
    } finally {
      effortWaitAbort.abort();
    }
    await settleChatGptUi();
    await throwIfChatGptRateLimitDialog(page);
    await captureDiagnostic?.("effort-control-ready");
    const effortMenu = page.locator(CHATGPT_EFFORT_MENU_SELECTOR).last();
    const menuVisible = await effortMenu.isVisible().catch(() => false);
    const menuExpanded = await currentEffort.getAttribute("aria-expanded").catch(() => null);
    if (!menuVisible && menuExpanded !== "true") {
      await throwIfChatGptRateLimitDialog(page);
      // ChatGPT's current Radix trigger no longer responds to synthetic Enter/Space on background
      // Electron surfaces. Force only the exact, visible effort control; the menu/slider state
      // below remains the authoritative postcondition, so this cannot become an unproved click.
      await currentEffort.click({ force: true });
    }
    await captureDiagnostic?.("effort-menu-open-requested");
    const effortChoices = effortMenu.locator(CHATGPT_EFFORT_ITEM_SELECTOR);
    const effortChoice = effortChoices.nth(uiEffortIndex);
    const effortSlider = page
      .locator(CHATGPT_EFFORT_SLIDER_SELECTOR)
      .filter({ visible: true })
      .last();
    const waitAbort = new AbortController();
    let ready: "effort" | "slider" | "rate-limit" | "session-expired";
    try {
      ready = await Promise.race([
        effortChoice
          .waitFor({ state: "visible", timeout: 70_000, signal: waitAbort.signal })
          .then(() => "effort" as const),
        effortSlider
          .waitFor({ state: "visible", timeout: 70_000, signal: waitAbort.signal })
          .then(() => "slider" as const),
        chatGptRateLimitDialog(page)
          .waitFor({ state: "visible", timeout: 70_000, signal: waitAbort.signal })
          .then(() => "rate-limit" as const),
        chatGptExpiredSessionAlert(page)
          .waitFor({ state: "visible", timeout: 70_000, signal: waitAbort.signal })
          .then(() => "session-expired" as const),
      ]);
      if (ready === "rate-limit") await throwIfChatGptRateLimitDialog(page);
      if (ready === "session-expired") await throwIfChatGptSessionFailureAlert(page);
      // The current picker exposes model rows as menuitemradio alongside the effort slider.
      // Those rows can win the locator race even though they are not effort choices.
      if (ready !== "slider" && (await effortSlider.isVisible().catch(() => false)))
        ready = "slider";
      await captureDiagnostic?.(
        ready === "slider" ? "effort-slider-visible" : "effort-choice-visible"
      );
    } catch (error) {
      if (error instanceof ChatGptWebAdapterError) throw error;
      await throwIfChatGptRateLimitDialog(page);
      await throwIfChatGptSessionFailureAlert(page);
      throw new ChatGptWebAdapterError(
        `ChatGPT effort menu did not expose item index ${uiEffortIndex}` +
          `; item count: ${await effortChoices.count().catch(() => 0)}`,
        { status: 502, errorType: "server_error", code: "upstream_server_error", retryable: false }
      );
    } finally {
      waitAbort.abort();
    }
    if (ready === "slider") {
      let sliderState = parseChatGptEffortSliderState(
        await effortSlider.getAttribute("aria-valuemin"),
        await effortSlider.getAttribute("aria-valuemax"),
        await effortSlider.getAttribute("aria-valuenow")
      );
      if (!sliderState) {
        throw new ChatGptWebAdapterError("ChatGPT effort slider exposed an invalid ARIA range", {
          status: 502,
          errorType: "server_error",
          code: "upstream_server_error",
          retryable: false,
        });
      }
      const targetValue = sliderState.min + uiEffortIndex;
      if (targetValue > sliderState.max) {
        throw new ChatGptWebAdapterError(
          `ChatGPT effort slider does not expose item index ${uiEffortIndex}` +
            ` (min=${sliderState.min}; max=${sliderState.max})`,
          {
            status: 502,
            errorType: "server_error",
            code: "upstream_server_error",
            retryable: false,
          }
        );
      }
      const sliderControl = effortSlider.locator("xpath=ancestor::*[@role='menuitem'][1]");
      while (sliderState.value !== targetValue) {
        await throwIfChatGptRateLimitDialog(page);
        const direction = targetValue > sliderState.value ? 1 : -1;
        const key = direction > 0 ? "ArrowRight" : "ArrowLeft";
        const previousValue = sliderState.value;
        await sliderControl.press(key);
        const changeDeadline = Date.now() + 5_000;
        do {
          sliderState = parseChatGptEffortSliderState(
            await effortSlider.getAttribute("aria-valuemin"),
            await effortSlider.getAttribute("aria-valuemax"),
            await effortSlider.getAttribute("aria-valuenow")
          );
          if (!sliderState) throw new Error("ChatGPT effort slider lost its semantic ARIA state");
          if (sliderState.value !== previousValue) break;
          await new Promise((resolveSleep) => setTimeout(resolveSleep, 50));
        } while (Date.now() < changeDeadline);
        if (sliderState.value !== previousValue + direction) {
          throw new Error(
            `ChatGPT effort slider did not move exactly one step with ${key}` +
              ` (before=${previousValue}; after=${sliderState.value})`
          );
        }
      }
      await captureDiagnostic?.("effort-selected");
      await page.keyboard.press("Escape");
      return mode;
    }
    const selected = await effortChoice.getAttribute("aria-checked");
    if (selected !== "true" && selected !== "false") {
      throw new Error(`ChatGPT effort item index ${uiEffortIndex} has no semantic checked state`);
    }
    if (selected === "true") {
      await captureDiagnostic?.("effort-selected");
      await page.keyboard.press("Escape");
      return mode;
    }
    await throwIfChatGptRateLimitDialog(page);
    await effortChoice.press("Enter");
    await captureDiagnostic?.("effort-choice-activated");

    const deadline = Date.now() + 40_000;
    let confirmed: string | null = null;
    while (Date.now() < deadline) {
      if (!(await effortMenu.isVisible().catch(() => false))) {
        const expanded = await currentEffort.getAttribute("aria-expanded").catch(() => null);
        if (expanded !== "true") {
          await throwIfChatGptRateLimitDialog(page);
          await currentEffort.click({ force: true });
        }
        await effortChoice.waitFor({
          state: "visible",
          timeout: Math.max(1, Math.min(5_000, deadline - Date.now())),
        });
      }
      confirmed = await effortChoice.getAttribute("aria-checked");
      if (confirmed === "true") {
        await captureDiagnostic?.("effort-selected");
        await page.keyboard.press("Escape");
        return mode;
      }
      if (confirmed !== "false") {
        throw new Error(
          `ChatGPT effort item index ${uiEffortIndex} lost its semantic checked state`
        );
      }
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 100));
    }
    throw new Error(
      `ChatGPT did not confirm effort item index ${uiEffortIndex}` +
        ` (aria-checked=${JSON.stringify(confirmed)})`
    );
  }

  private async activeComposer(page: Page, timeoutMs = 30_000): Promise<Locator> {
    const composers = page.locator(CHATGPT_COMPOSER_SELECTOR).filter({ visible: true });
    const deadline = Date.now() + timeoutMs;
    let count = 0;
    while (Date.now() < deadline) {
      count = await composers.count();
      if (count === 1) return composers.first();
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 50));
    }
    throw new Error(
      `ChatGPT did not expose exactly one visible composer (visibleComposers=${count})`
    );
  }

  /** Put every browser operation on one fully hydrated Temporary Chat document. */
  private async prepareTemporaryChatSurface(
    page: Page,
    captureDiagnostic?: (checkpoint: string) => Promise<void>
  ): Promise<Locator> {
    // Launcher verification refreshes its owned page before attaching Playwright so a newly added
    // connector is present in the catalog. Navigating again here destroys that freshly hydrated
    // document and made the first verification race a second SPA bootstrap. A leased turn starts on
    // about:blank and therefore still performs exactly one navigation through this same method.
    if (page.url() !== CHATGPT_TEMPORARY_CHAT_URL) {
      await page.goto(CHATGPT_TEMPORARY_CHAT_URL, {
        waitUntil: "domcontentloaded",
        timeout: 60_000,
      });
      await captureDiagnostic?.("temporary-chat-navigation-complete");
    }
    let composer: Locator;
    try {
      composer = await this.activeComposer(page);
    } catch {
      throw new Error("ChatGPT web login is expired or the Temporary Chat surface is unavailable");
    }
    if (await dismissChatGptTemporaryChatOnboarding(page)) {
      await captureDiagnostic?.("temporary-chat-onboarding-dismissed");
    }
    await captureDiagnostic?.("composer-ready");
    await throwIfChatGptSessionFailureAlert(page);
    await assertAuthenticatedChatGptPage(page);
    await assertTemporaryChatPage(page);
    await captureDiagnostic?.("session-verified");
    return composer;
  }

  private async waitForTurnDomMutation(page: Page, timeoutMs = 50): Promise<void> {
    await page.evaluate(
      ({ timeout, attributeFilter }) =>
        new Promise<void>((resolveMutation) => {
          let settled = false;
          let settleTimer: ReturnType<typeof setTimeout> | undefined;
          const finish = () => {
            if (settled) return;
            settled = true;
            observer.disconnect();
            clearTimeout(timeoutTimer);
            if (settleTimer) clearTimeout(settleTimer);
            resolveMutation();
          };
          const observer = new MutationObserver(() => {
            if (settleTimer) return;
            // Let one React mutation batch finish before the next compact state read.
            settleTimer = setTimeout(finish, 16);
          });
          observer.observe(document.documentElement, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter,
          });
          const timeoutTimer = setTimeout(finish, timeout);
        }),
      { timeout: timeoutMs, attributeFilter: [...CHATGPT_DOM_REVISION_ATTRIBUTES] }
    );
  }

  private async waitForTurnDomOrExternalProgress(
    page: Page,
    afterProgressRevision: number,
    externalProgress?: ChatGptTurnProgressReader,
    signal?: AbortSignal
  ): Promise<void> {
    const domMutation = this.waitForTurnDomMutation(page);
    if (!externalProgress) {
      await withBrowserTurnAbort(domMutation, signal);
      return;
    }
    const progressWaitAbort = new AbortController();
    const progressSignal = signal
      ? AbortSignal.any([progressWaitAbort.signal, signal])
      : progressWaitAbort.signal;
    try {
      await withBrowserTurnAbort(
        Promise.race([
          domMutation,
          externalProgress
            .waitForChange(afterProgressRevision, progressSignal)
            .then(() => undefined),
        ]),
        signal
      );
    } finally {
      progressWaitAbort.abort();
    }
  }

  private async waitForSubmissionAccepted(
    page: Page,
    baseline: ChatGptSubmissionBaseline,
    signal?: AbortSignal,
    externalProgress?: ChatGptTurnProgressReader,
    initialToolBatchRevision = externalProgress?.snapshot().lastToolBatchRevision ?? 0
  ): Promise<ChatGptSubmissionEvidence> {
    if (signal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
    for (;;) {
      if (signal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
      const progress = externalProgress?.snapshot();
      if (progress && progress.lastToolBatchRevision > initialToolBatchRevision)
        return "mcp_tool_call";
      await throwIfChatGptSessionFailureAlert(page);
      await throwIfChatGptTerminalErrorAlert(baseline.responseTurns.last());
      let evidence: ChatGptSubmissionEvidence | undefined;
      if (externalProgress) {
        const progressWaitAbort = new AbortController();
        const progressSignal = signal
          ? AbortSignal.any([progressWaitAbort.signal, signal])
          : progressWaitAbort.signal;
        try {
          const observed = await withBrowserTurnAbort(
            Promise.race([
              this.currentSubmissionEvidence(page, baseline).then((value) => ({
                kind: "dom" as const,
                value,
              })),
              externalProgress
                .waitForChange(progress?.revision ?? 0, progressSignal)
                .then(() => ({ kind: "external" as const })),
            ]),
            signal
          );
          if (observed.kind === "external") continue;
          evidence = observed.value;
        } finally {
          progressWaitAbort.abort();
        }
      } else {
        evidence = await this.currentSubmissionEvidence(page, baseline);
      }
      if (evidence) return evidence;
      await this.waitForTurnDomOrExternalProgress(
        page,
        progress?.revision ?? 0,
        externalProgress,
        signal
      );
    }
  }

  private async submissionDomState(
    page: Page,
    cache?: ChatGptSubmissionDomCache
  ): Promise<ChatGptSubmissionDomState> {
    const observed = await page.evaluate(
      (options) => {
        type ObserverState = { id: string; revision: number; observer: MutationObserver };
        const scope = globalThis as typeof globalThis & {
          __CODEX_WEB_GPT_TURN_OBSERVER__?: ObserverState;
        };
        const observerState = (scope.__CODEX_WEB_GPT_TURN_OBSERVER__ ??= (() => {
          const state: ObserverState = {
            id: `${performance.timeOrigin}:${Math.random().toString(36).slice(2)}`,
            revision: 0,
            observer: undefined as unknown as MutationObserver,
          };
          state.observer = new MutationObserver(() => {
            state.revision += 1;
          });
          state.observer.observe(document.documentElement, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: options.attributeFilter,
          });
          return state;
        })());
        const observerKey = `${observerState.id}:${observerState.revision}`;
        if (options.knownKey === observerKey) return { key: observerKey };
        const identities = (selector: string): string[] => {
          const values = [...document.querySelectorAll(selector)].map((element) =>
            element.getAttribute("data-testid")
          );
          if (
            values.some(
              (value) => typeof value !== "string" || !value.startsWith("conversation-turn-")
            )
          ) {
            throw new Error("ChatGPT conversation turn has no stable data-testid identity");
          }
          const typed = values as string[];
          if (new Set(typed).size !== typed.length) {
            throw new Error("ChatGPT exposed duplicate conversation turn identities");
          }
          return typed;
        };
        const visible = (element: Element): boolean => {
          const candidate = element as HTMLElement;
          const style = getComputedStyle(candidate);
          const bounds = candidate.getBoundingClientRect();
          return (
            candidate.isConnected &&
            style.visibility !== "hidden" &&
            (bounds.width > 0 || bounds.height > 0)
          );
        };
        const userIdentities = identities(options.userTurnSelector);
        const responseIdentities = identities(options.assistantTurnSelector);
        return {
          key: observerKey,
          snapshot: {
            userTurnCount: userIdentities.length,
            assistantTurnCount: responseIdentities.length,
            visibleStopButtonCount: [
              ...document.querySelectorAll(options.stopButtonSelector),
            ].filter(visible).length,
            userIdentities,
            responseIdentities,
          },
        };
      },
      {
        userTurnSelector: CHATGPT_USER_TURN_SELECTOR,
        assistantTurnSelector: CHATGPT_ASSISTANT_TURN_SELECTOR,
        stopButtonSelector: CHATGPT_STOP_BUTTON_SELECTOR,
        knownKey: cache?.key,
        attributeFilter: [...CHATGPT_DOM_REVISION_ATTRIBUTES],
      }
    );
    const snapshot = observed.snapshot ?? cache?.snapshot;
    if (!snapshot) throw new Error("ChatGPT turn DOM revision cache has no baseline snapshot");
    if (observed.snapshot && cache) {
      cache.key = observed.key;
      cache.snapshot = observed.snapshot;
      cache.fullScans = (cache.fullScans ?? 0) + 1;
    } else if (!observed.snapshot && cache?.snapshot) {
      cache.cacheHits = (cache.cacheHits ?? 0) + 1;
    }
    return snapshot;
  }

  private async currentSubmissionEvidence(
    page: Page,
    baseline: ChatGptSubmissionBaseline
  ): Promise<ChatGptSubmissionEvidence | undefined> {
    const state = await this.submissionDomState(page, baseline.domCache);
    if (chatGptNewTurnIdentity(baseline.initialUserTurnIdentities, state.userIdentities))
      return "user_turn";
    if (chatGptNewTurnIdentity(baseline.initialResponseTurnIdentities, state.responseIdentities))
      return "assistant_turn";
    return chatGptSubmissionEvidence({
      initialUserTurnCount: baseline.initialUserTurnCount,
      userTurnCount: state.userTurnCount,
      initialAssistantTurnCount: baseline.initialResponseTurnCount,
      assistantTurnCount: state.assistantTurnCount,
      generationRunning: state.visibleStopButtonCount > 0,
    });
  }

  private async captureSubmissionBaseline(page: Page): Promise<ChatGptSubmissionBaseline> {
    const userTurns = page.locator(CHATGPT_USER_TURN_SELECTOR);
    const responseTurns = page.locator(CHATGPT_ASSISTANT_TURN_SELECTOR);
    const domCache: ChatGptSubmissionDomCache = {};
    const state = await this.submissionDomState(page, domCache);
    return {
      userTurns,
      responseTurns,
      initialUserTurnCount: state.userTurnCount,
      initialResponseTurnCount: state.assistantTurnCount,
      initialUserTurnIdentities: state.userIdentities,
      initialResponseTurnIdentities: state.responseIdentities,
      domCache,
    };
  }

  private async waitForNewAssistantTurn(
    page: Page,
    baseline: ChatGptSubmissionBaseline,
    deadline: number | undefined,
    signal?: AbortSignal,
    externalProgress?: ChatGptTurnProgressReader,
    graceMs: number = CHATGPT_RESPONSE_DOM_GRACE_MS
  ): Promise<ChatGptAssistantTurnBinding> {
    let responseDeadline = Math.min(deadline ?? Number.POSITIVE_INFINITY, Date.now() + graceMs);
    for (;;) {
      if (signal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
      if (page.isClosed()) throw chatGptBrowserTabClosedError();
      const progress = externalProgress?.snapshot();
      if (progress?.lastProgressAt !== undefined) {
        responseDeadline = Math.min(
          deadline ?? Number.POSITIVE_INFINITY,
          Math.max(responseDeadline, progress.lastProgressAt + graceMs)
        );
      }
      if (deadline !== undefined && Date.now() >= deadline) {
        throw new Error("ChatGPT web turn timed out");
      }
      if (
        Date.now() >= responseDeadline &&
        !chatGptExternalProgressSuppressesDomHealth(progress, Date.now())
      ) {
        throw new Error(
          "ChatGPT accepted the message but did not expose its assistant turn in the DOM"
        );
      }
      await throwIfChatGptSessionFailureAlert(page);
      await throwIfChatGptRateLimitDialog(page);
      let state: ChatGptSubmissionDomState;
      try {
        state = await this.submissionDomState(page, baseline.domCache);
      } catch (error) {
        if (!chatGptExternalProgressIsLive(progress, Date.now(), graceMs)) throw error;
        await this.waitForTurnDomOrExternalProgress(
          page,
          progress?.revision ?? 0,
          externalProgress,
          signal
        );
        continue;
      }
      const identity = chatGptNewTurnIdentity(
        baseline.initialResponseTurnIdentities,
        state.responseIdentities
      );
      if (identity)
        return {
          identity,
          locator: page.locator(`[data-testid=${JSON.stringify(identity)}]`),
          acceptedUserTurnIdentities: state.userIdentities,
        };
      await this.waitForTurnDomOrExternalProgress(
        page,
        progress?.revision ?? 0,
        externalProgress,
        signal
      );
    }
  }

  private async reconcileAssistantTurnBinding(
    page: Page,
    baseline: ChatGptSubmissionBaseline,
    binding: ChatGptAssistantTurnBinding
  ): Promise<ChatGptAssistantTurnBinding> {
    const boundCount = await binding.locator.count();
    if (boundCount === 1) return binding;
    if (boundCount > 1) {
      throw new Error(`ChatGPT exposed ${boundCount} DOM nodes for the bound assistant turn`);
    }
    const state = await this.submissionDomState(page, baseline.domCache);
    const acceptedUsers = new Set(binding.acceptedUserTurnIdentities);
    if (state.userIdentities.some((identity) => !acceptedUsers.has(identity))) {
      throw new Error(
        "ChatGPT opened another user turn while the bound assistant response was detached"
      );
    }
    const identity = chatGptReboundTurnIdentity(
      baseline.initialResponseTurnIdentities,
      binding.identity,
      state.responseIdentities
    );
    if (!identity || identity === binding.identity) return binding;
    return {
      identity,
      locator: page.locator(`[data-testid=${JSON.stringify(identity)}]`),
      acceptedUserTurnIdentities: state.userIdentities,
    };
  }

  private async attachedPromptText(page: Page): Promise<string> {
    const composer = await this.activeComposer(page);
    return composer.evaluate(
      (element) => {
        const clone = element.cloneNode(true) as HTMLElement;
        clone
          .querySelectorAll(
            '[data-id^="plugin:"][data-keyword], [data-inline-selection-pill-cursor-target]'
          )
          .forEach((part) => part.remove());
        return [...clone.childNodes]
          .map((child) => child.textContent ?? "")
          .join("\n")
          .trimStart();
      },
      undefined,
      { timeout: 20_000 }
    );
  }

  private async assertPromptAttached(
    page: Page,
    prompt: string,
    abortSignal?: AbortSignal
  ): Promise<void> {
    const deadline = Date.now() + 10_000;
    let observed = "";
    while (Date.now() < deadline) {
      throwIfPromptAttachmentAborted(abortSignal);
      observed = await this.attachedPromptText(page);
      throwIfPromptAttachmentAborted(abortSignal);
      if (this.promptTextEquivalent(prompt, observed)) return;
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 50));
    }
    throwIfPromptAttachmentAborted(abortSignal);
    const commonPrefix = this.promptEquivalentPrefixLength(prompt, observed);
    throw new ChatGptPromptAttachmentIntegrityError(
      `ChatGPT composer did not preserve the complete prompt (expectedChars=${prompt.length}, actualChars=${observed.length}, commonPrefixChars=${commonPrefix})`
    );
  }

  private selectedConnectorControl(composer: Locator): Locator {
    return composer
      .locator('[data-id^="plugin:"][data-keyword]')
      .filter({ hasText: this.config.appName, visible: true });
  }

  private async connectorIsSelected(composer: Locator): Promise<boolean> {
    const selected = this.selectedConnectorControl(composer);
    const keywords = await selected.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-keyword"))
    );
    const exactMatches = keywords.filter((keyword) => keyword === this.config.appName).length;
    if (exactMatches > 1) {
      throw new Error(
        `ChatGPT composer exposed duplicate ${JSON.stringify(this.config.appName)} connector selections`
      );
    }
    return exactMatches === 1;
  }

  private async connectorMentionRowTitles(menuRows: Locator): Promise<string[]> {
    const texts = await menuRows
      .filter({ visible: true })
      .allInnerTexts()
      .catch(() => [] as string[]);
    return texts
      .map((text) => (text.split("\n")[0] ?? "").replace(/\s+/g, " ").trim())
      .filter((title) => title.length > 0);
  }

  private async connectorMentionFailure(
    menuRows: Locator,
    triggerAttempts: number
  ): Promise<string> {
    const titles = await this.connectorMentionRowTitles(menuRows);
    if (titles.length === 0) {
      return `ChatGPT connector menu did not open after ${triggerAttempts} complete mention trigger attempt(s)`;
    }
    if (
      this.config.appName === CHATGPT_CONNECTOR_NAME &&
      titles.includes(DEV_CHATGPT_CONNECTOR_NAME)
    ) {
      return (
        `ChatGPT exposes the isolated DEV connector ${JSON.stringify(DEV_CHATGPT_CONNECTOR_NAME)},` +
        ` but production requires a separate connector named ${JSON.stringify(CHATGPT_CONNECTOR_NAME)};` +
        ` create ${JSON.stringify(CHATGPT_CONNECTOR_NAME)} against the production tunnel and leave the DEV connector unchanged`
      );
    }
    if (
      this.config.appName === CHATGPT_CONNECTOR_NAME &&
      !titles.includes(CHATGPT_CONNECTOR_NAME)
    ) {
      const legacyName = LEGACY_CHATGPT_CONNECTOR_NAMES.find((name) => titles.includes(name));
      if (legacyName) return legacyChatGptConnectorMigrationMessage(legacyName);
    }
    return (
      `ChatGPT connector menu opened but exposed no row named ${JSON.stringify(this.config.appName)}` +
      ` after ${triggerAttempts} complete mention trigger attempt(s)` +
      `; create a connector with that exact name before retrying`
    );
  }

  private async selectConnector(
    page: Page,
    captureDiagnostic?: (checkpoint: string) => Promise<void>,
    catalogRefreshAvailable = false,
    attemptBudget: ChatGptConnectorAttemptBudget = { triggerAttempts: 0 }
  ): Promise<Locator> {
    let composer: Locator;
    const menuRows = page.locator('.__menu-item[tabindex="0"]');
    const appResult = menuRows.filter({
      has: page.getByText(this.config.appName, { exact: true }),
    });
    await ensureChatGptPersonalizedConnectorAccess(page, captureDiagnostic, async () => {
      composer = await this.activeComposer(page);
      await composer.fill("");
      await composer.focus();
      await settleChatGptUi();
      await composer.pressSequentially(CHATGPT_CONNECTOR_MENTION_QUERY, { delay: 25 });
      try {
        await appResult.waitFor({ state: "visible", timeout: 2_500 });
        return true;
      } catch (error) {
        if (!(error instanceof Error) || error.name !== "TimeoutError") throw error;
        return false;
      } finally {
        await composer.fill("").catch(() => {});
      }
    });
    composer = await this.activeComposer(page);
    await composer.fill("");
    if (await this.connectorIsSelected(composer)) {
      await captureDiagnostic?.("connector-already-selected");
      return composer;
    }

    let firstMenuCaptured = false;
    while (attemptBudget.triggerAttempts < MAX_CHATGPT_CONNECTOR_TRIGGER_ATTEMPTS) {
      attemptBudget.triggerAttempts += 1;
      composer = await this.activeComposer(page);
      await composer.fill("");
      await composer.focus();
      await settleChatGptUi();
      await composer.pressSequentially(CHATGPT_CONNECTOR_MENTION_QUERY, { delay: 25 });
      if (!firstMenuCaptured) {
        firstMenuCaptured = true;
        await captureDiagnostic?.("connector-mention-triggered");
      }
      try {
        await appResult.waitFor({
          state: "visible",
          timeout: 2_500,
        });
        await captureDiagnostic?.("connector-menu-visible");
        break;
      } catch (error) {
        if (!(error instanceof Error) || error.name !== "TimeoutError") throw error;
        const visibleRows = await this.connectorMentionRowTitles(menuRows);
        const knownIdentityMismatch =
          this.config.appName === CHATGPT_CONNECTOR_NAME &&
          (visibleRows.includes(DEV_CHATGPT_CONNECTOR_NAME) ||
            LEGACY_CHATGPT_CONNECTOR_NAMES.some((name) => visibleRows.includes(name)));
        if (knownIdentityMismatch) {
          await captureDiagnostic?.("connector-menu-missing");
          throw chatGptConnectorUnavailableError(
            await this.connectorMentionFailure(menuRows, attemptBudget.triggerAttempts)
          );
        }
        if (
          catalogRefreshAvailable &&
          visibleRows.length > 0 &&
          !visibleRows.includes(this.config.appName) &&
          attemptBudget.triggerAttempts < MAX_CHATGPT_CONNECTOR_TRIGGER_ATTEMPTS
        ) {
          throw new ChatGptConnectorCatalogStaleError(
            this.config.appName,
            attemptBudget.triggerAttempts
          );
        }
        if (attemptBudget.triggerAttempts >= MAX_CHATGPT_CONNECTOR_TRIGGER_ATTEMPTS) {
          await captureDiagnostic?.("connector-menu-missing");
          throw chatGptConnectorUnavailableError(
            await this.connectorMentionFailure(menuRows, attemptBudget.triggerAttempts)
          );
        }
      }
    }
    if ((await appResult.count()) !== 1) {
      throw chatGptConnectorUnavailableError(
        `ChatGPT connector menu did not expose one exact ${JSON.stringify(this.config.appName)} row` +
          ` after ${attemptBudget.triggerAttempts} complete mention trigger attempt(s)`
      );
    }
    // Hidden launcher maintenance keeps a 1x1 Chromium viewport, so pointer activation cannot
    // reach this menu. Unlike the old unguarded composer Enter path, require the exact row to own
    // ChatGPT's keyboard highlight first; otherwise move the menu highlight until it does. Keep
    // focus on the composer, activate through the menu's real keyboard owner, then prove the exact
    // selected connector pill below.
    const rowHighlighted = async () => (await appResult.getAttribute("data-highlighted")) !== null;
    if (!(await rowHighlighted())) {
      const visibleRowCount = await menuRows.filter({ visible: true }).count();
      for (let step = 0; step < visibleRowCount && !(await rowHighlighted()); step += 1) {
        await page.keyboard.press("ArrowDown");
      }
    }
    if (!(await rowHighlighted())) {
      throw new Error(
        `ChatGPT connector menu could not highlight ${JSON.stringify(this.config.appName)}`
      );
    }
    await page.keyboard.press("Enter");
    await captureDiagnostic?.("connector-choice-activated");
    // Selecting a connector replaces the Lexical composer subtree. Resolve the active composer
    // again instead of returning the pre-selection locator, otherwise the real turn can focus a
    // detached/hidden editor even though verification just succeeded.
    const selectedComposer = await this.activeComposer(page);
    const selectedConnector = this.selectedConnectorControl(selectedComposer);
    await selectedConnector.waitFor({ state: "visible", timeout: 10_000 });
    if (!(await this.connectorIsSelected(selectedComposer))) {
      throw new Error(
        `ChatGPT composer did not select ${JSON.stringify(this.config.appName)} connector`
      );
    }
    await captureDiagnostic?.("connector-selected");
    return selectedComposer;
  }

  private async attachPrompt(
    page: Page,
    prompt: string,
    localTools: boolean,
    captureDiagnostic?: (checkpoint: string) => Promise<void>,
    abortSignal?: AbortSignal,
    catalogRefreshAvailable = false,
    connectorAttemptBudget?: ChatGptConnectorAttemptBudget,
    reuseConnector = false
  ): Promise<void> {
    throwIfPromptAttachmentAborted(abortSignal);
    const connectorMode = chatGptConnectorAttachmentMode(localTools, reuseConnector);
    if (connectorMode !== "mention") {
      const composer = await this.activeComposer(page);
      // Playwright's multiline fill maps through an input action that ChatGPT's Lexical editor can
      // collapse to the first paragraph on the launcher-owned Electron surface. Clear separately,
      // then transport the complete text through the browser's plain-text editing command.
      await composer.fill("");
      await composer.focus();
      await this.insertPromptText(page, prompt, abortSignal);
      await this.assertPromptAttached(page, prompt, abortSignal);
      return;
    }
    const selectedComposer = await this.selectConnector(
      page,
      captureDiagnostic,
      catalogRefreshAvailable,
      connectorAttemptBudget
    );
    await selectedComposer.focus();
    await page.keyboard.press(CHATGPT_COMPOSER_DOCUMENT_END_KEY);
    await this.insertPromptText(page, ` ${prompt}`, abortSignal);
    await this.assertPromptAttached(page, prompt, abortSignal);
  }

  private async sendAttachedPrompt(
    page: Page,
    baseline: ChatGptSubmissionBaseline,
    captureDiagnostic?: (checkpoint: string) => Promise<void>,
    abortSignal?: AbortSignal,
    externalProgress?: ChatGptTurnProgressReader,
    submissionLifecycle?: Pick<BrowserTurn, "onSendActivated" | "onSubmitted">
  ): Promise<ChatGptSubmissionEvidence> {
    const composer = await this.activeComposer(page);
    const sendButton = composer.locator("xpath=ancestor::form[1]").getByTestId("send-button");
    await sendButton.waitFor({ state: "visible", timeout: browserStageTimeouts.send });
    await settleChatGptUi();
    const sendEnableDeadline = Date.now() + CHATGPT_SEND_ENABLE_GRACE_MS;
    for (;;) {
      if (abortSignal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
      if (page.isClosed()) throw chatGptBrowserTabClosedError();
      await throwIfChatGptSessionFailureAlert(page);
      await throwIfChatGptRateLimitDialog(page);
      if (await sendButton.isEnabled()) break;
      if (Date.now() >= sendEnableDeadline) {
        await captureDiagnostic?.("send-disabled");
        throw new Error(
          "ChatGPT send button remained disabled after the complete prompt was attached"
        );
      }
      await settleChatGptUi();
    }
    await captureDiagnostic?.("send-ready");
    const initialToolBatchRevision = externalProgress?.snapshot().lastToolBatchRevision ?? 0;
    await submissionLifecycle?.onSendActivated?.();
    await sendButton.press("Enter");
    const evidence = await this.waitForSubmissionAccepted(
      page,
      baseline,
      abortSignal,
      externalProgress,
      initialToolBatchRevision
    );
    submissionLifecycle?.onSubmitted?.();
    return evidence;
  }

  private async waitForMultipartAcknowledgement(
    page: Page,
    initialResponseTurn: ChatGptAssistantTurnBinding,
    submissionBaseline: ChatGptSubmissionBaseline,
    stage: ChatGptWebMultipartStage,
    deadline: number | undefined,
    abortSignal?: AbortSignal,
    externalProgress?: ChatGptTurnProgressReader
  ): Promise<void> {
    const completionTracker = new ChatGptCompletionTracker();
    const domHealthTracker = new ChatGptTurnDomHealthTracker();
    const stoppedThinkingTracker = new ChatGptStoppedThinkingTracker();
    const responseDomCache: ChatGptResponseDomCache = {};
    let responseTurn = initialResponseTurn;
    for (;;) {
      if (page.isClosed()) throw chatGptBrowserTabClosedError();
      if (abortSignal?.aborted) {
        const stop = page.locator(CHATGPT_STOP_BUTTON_SELECTOR).last();
        if (await stop.isVisible().catch(() => false)) await stop.press("Enter").catch(() => {});
        throw new DOMException("ChatGPT multipart stage aborted", "AbortError");
      }
      if (deadline !== undefined && Date.now() >= deadline) {
        throw new Error(
          "ChatGPT Bigger Context transaction timed out while awaiting a stage acknowledgement"
        );
      }
      await throwIfChatGptSessionFailureAlert(page);
      await throwIfChatGptTerminalErrorAlert(responseTurn.locator);
      let snapshot = await this.responseDomSnapshot(responseTurn.locator, responseDomCache);
      if (!snapshot.responsePresent && (await responseTurn.locator.count()) !== 1) {
        const rebound = await this.reconcileAssistantTurnBinding(
          page,
          submissionBaseline,
          responseTurn
        );
        if (rebound.identity !== responseTurn.identity) {
          responseTurn = rebound;
          responseDomCache.key = undefined;
          responseDomCache.snapshot = undefined;
          snapshot = await this.responseDomSnapshot(responseTurn.locator, responseDomCache);
        }
      }
      const externalProgressLive = chatGptExternalProgressSuppressesDomHealth(
        externalProgress?.snapshot(),
        Date.now()
      );
      if (externalProgressLive) stoppedThinkingTracker.clear();
      else if (stoppedThinkingTracker.update(snapshot.stoppedThinkingVisible)) {
        throw chatGptStoppedThinkingError();
      }
      if (!snapshot.responsePresent && externalProgressLive) {
        // Proven MCP activity outranks a momentarily unavailable staging DOM, exactly as it does
        // in the main turn loop.
        domHealthTracker.clearMissingResponse();
        await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
        continue;
      }
      const running = await page
        .locator(CHATGPT_STOP_BUTTON_SELECTOR)
        .last()
        .isVisible()
        .catch(() => false);
      const domError = domHealthTracker.update({
        responsePresent: snapshot.responsePresent,
        running,
        currentText: snapshot.visibleText,
        completionActionVisible: snapshot.completionActionVisible,
        externalProgressLive,
      });
      if (domError) throw new Error(domError);
      if (
        completionTracker.update({
          responsePresent: snapshot.responsePresent,
          running,
          currentText: snapshot.visibleText,
          currentHtml: snapshot.fullHtml,
          completionActionVisible: snapshot.completionActionVisible,
          externalProgressLive,
        })
      ) {
        const actual = snapshot.visibleText.trim();
        if (actual !== stage.acknowledgement) {
          throw new ChatGptWebAdapterError(
            `ChatGPT Bigger Context stage returned ${actual.length.toLocaleString("en-US")} characters instead of its exact acknowledgement. The staged task was not committed and will not be retried automatically.`,
            {
              status: 502,
              errorType: "server_error",
              code: "multipart_protocol_violation",
              retryable: false,
            }
          );
        }
        return;
      }
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 100));
    }
  }

  private async resetCompactionComposerForRetry(
    page: Page,
    baseline: ChatGptSubmissionBaseline,
    abortSignal?: AbortSignal
  ): Promise<void> {
    throwIfPromptAttachmentAborted(abortSignal);
    const before = await this.currentSubmissionEvidence(page, baseline);
    if (before) {
      throw new ChatGptPromptAttachmentIntegrityError(
        `ChatGPT exposed ${before} after compaction prompt attachment failed; refusing a duplicate submission`
      );
    }

    const composer = await this.activeComposer(page);
    await composer.fill("");
    await composer.focus();
    await settleChatGptUi();
    throwIfPromptAttachmentAborted(abortSignal);

    const after = await this.currentSubmissionEvidence(page, baseline);
    if (after) {
      throw new ChatGptPromptAttachmentIntegrityError(
        `ChatGPT exposed ${after} while resetting a failed compaction prompt; refusing a duplicate submission`
      );
    }
    const observed = await this.attachedPromptText(page);
    if (observed.length > 0) {
      throw new ChatGptPromptAttachmentIntegrityError(
        `ChatGPT composer could not reset cleanly for compaction retry (actualChars=${observed.length})`
      );
    }
  }

  private async attachPromptWithCompactionRetry(
    page: Page,
    prompt: string,
    localTools: boolean,
    compaction: boolean,
    baseline: ChatGptSubmissionBaseline,
    captureDiagnostic?: (checkpoint: string) => Promise<void>,
    abortSignal?: AbortSignal,
    catalogRefreshAvailable = false,
    connectorAttemptBudget?: ChatGptConnectorAttemptBudget,
    reuseConnector = false
  ): Promise<void> {
    let retryAvailable = compaction;
    for (;;) {
      try {
        await this.attachPrompt(
          page,
          prompt,
          localTools,
          captureDiagnostic,
          abortSignal,
          catalogRefreshAvailable,
          connectorAttemptBudget,
          reuseConnector
        );
        return;
      } catch (error) {
        if (!retryAvailable || !(error instanceof ChatGptPromptAttachmentIntegrityError))
          throw error;
        retryAvailable = false;
        const evidence = await this.currentSubmissionEvidence(page, baseline);
        if (evidence) {
          throw new ChatGptPromptAttachmentIntegrityError(
            `${error.message}; ChatGPT exposed ${evidence}, so the bridge refused to insert or send the compaction prompt again`
          );
        }
        await captureDiagnostic?.("prompt-attachment-integrity-retry");
        await this.resetCompactionComposerForRetry(page, baseline, abortSignal);
      }
    }
  }

  private async insertPromptText(
    page: Page,
    text: string,
    abortSignal?: AbortSignal
  ): Promise<void> {
    throwIfPromptAttachmentAborted(abortSignal);
    const composer = await this.activeComposer(page);
    await composer.focus();
    // CDP Input.insertText is interpreted as live typing by ChatGPT's Lexical plugins. On a large
    // JSON transport it can turn literal Markdown backticks into rich code nodes, remove the
    // delimiters from textContent, and leave the next insertion outside the intended block. The
    // browser's plain-text editing command updates the same focused contenteditable atomically
    // without running those Markdown shortcuts. Exact readback below remains the authority.
    const inserted = await composer.evaluate(insertPlainTextIntoComposer, text, {
      timeout: 20_000,
    });
    throwIfPromptAttachmentAborted(abortSignal);
    if (!inserted) {
      throw new ChatGptPromptAttachmentIntegrityError(
        "ChatGPT composer rejected the plain-text editing command"
      );
    }
  }

  private async verifyConnectorExclusive(): Promise<string> {
    const page = await this.ensurePage();
    await this.prepareTemporaryChatSurface(page);
    // The launcher refreshes its owned ChatGPT document before starting this helper. A second
    // reload here can discard the first catalog's exact mismatch evidence and report a generic
    // menu failure instead of identifying the connector the account actually exposes.
    await this.selectConnector(page);
    return this.config.appName;
  }

  private async inspectSessionExclusive(detectCapabilities: boolean): Promise<{
    authenticated: true;
    temporary: true;
    url: string;
    solAvailable?: boolean;
    proAvailable?: boolean;
  }> {
    const page = await this.ensurePage();
    await this.prepareTemporaryChatSurface(page);
    const url = page.url();
    if (!detectCapabilities) return { authenticated: true, temporary: true, url };
    const capabilities = await detectChatGptAccountCapabilities(page);
    return { authenticated: true, temporary: true, url, ...capabilities };
  }

  private async smokeTestExclusive(
    abortSignal?: AbortSignal
  ): Promise<{ effort: string; response: string }> {
    const page = await this.ensurePage();
    await this.prepareTemporaryChatSurface(page);
    const account = await detectChatGptAccountCapabilities(page);
    // Core smoke runs before the optional MCP connector is configured, so it must remain a
    // browser-only transport check. Connector setup has its own explicit verification operation.
    const capabilities: ChatGptWebCapabilities = { ...account, localToolsEnabled: false };
    const modelId = account.solAvailable ? CHATGPT_WEB_MODEL_ID : CHATGPT_WEB_LUNA_MODEL_ID;
    const reasoning = account.solAvailable ? "high" : "low";
    const mode = resolveChatGptWebModelMode(modelId, reasoning, capabilities);
    const traceId = `smoke_${randomUUID().replaceAll("-", "")}`;
    const response = await this.runBrowserTurn(
      {
        traceId,
        modelId,
        reasoning,
        capabilities,
        prepare: async () => ({
          text: CHATGPT_SMOKE_TEXT,
          images: [],
          files: [],
          release: () => {},
        }),
        abortSignal,
        onTextDelta: () => {},
      },
      undefined,
      page
    );
    if (response.trim() !== CHATGPT_SMOKE_EXPECTED) {
      throw new Error(
        `ChatGPT smoke test returned an unexpected answer (${JSON.stringify(response.trim().slice(0, 200))})`
      );
    }
    return { effort: mode.displayLabel, response: CHATGPT_SMOKE_EXPECTED };
  }

  private async attachFiles(page: Page, prompt: CompiledChatGptWebPrompt): Promise<void> {
    const files = chatGptPromptFilePayloads(prompt);
    if (files.length === 0) return;
    const composer = await this.activeComposer(page);
    const composerForm = composer.locator("xpath=ancestor::form[1]");
    const imageFiles = files.slice(0, prompt.images.length);
    const documentFiles = files.slice(prompt.images.length);
    if (imageFiles.length > 0) {
      const imageInput = page.locator('input[data-testid="upload-photos-input"]');
      await imageInput.waitFor({ state: "attached", timeout: 20_000 });
      await imageInput.setInputFiles(imageFiles);
    }
    if (documentFiles.length > 0) {
      const fileInput = page.locator('input[type="file"]#upload-files');
      await fileInput.waitFor({ state: "attached", timeout: 20_000 });
      await fileInput.setInputFiles(documentFiles);
    }
    try {
      await Promise.all(
        files.map((file) =>
          composerForm
            .getByRole("group", { name: file.name, exact: true })
            .waitFor({ state: "visible", timeout: 60_000 })
        )
      );
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
    const send = composerForm.getByTestId("send-button");
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      if (await send.isEnabled().catch(() => false)) return;
      await new Promise((resolveSleep) => setTimeout(resolveSleep, 100));
    }
    throw new Error(
      "ChatGPT accepted the prompt attachments but did not make the message ready to send"
    );
  }

  private async responseDomSnapshot(
    responseTurn: Locator,
    cache?: ChatGptResponseDomCache
  ): Promise<ChatGptResponseDomSnapshot> {
    const observed = await responseTurn
      .evaluate(
        (element, options) => {
          const root = element as HTMLElement;
          type ObserverState = { id: number; revision: number; observer: MutationObserver };
          type ObserverRegistry = {
            documentId: string;
            nextId: number;
            states: WeakMap<Element, ObserverState>;
          };
          const scope = globalThis as typeof globalThis & {
            __CODEX_WEB_GPT_RESPONSE_OBSERVERS__?: ObserverRegistry;
          };
          const registry = (scope.__CODEX_WEB_GPT_RESPONSE_OBSERVERS__ ??= {
            documentId: `${performance.timeOrigin}:${Math.random().toString(36).slice(2)}`,
            nextId: 0,
            states: new WeakMap<Element, ObserverState>(),
          });
          let observerState = registry.states.get(root);
          if (!observerState) {
            observerState = {
              id: ++registry.nextId,
              revision: 0,
              observer: undefined as unknown as MutationObserver,
            };
            const state = observerState;
            state.observer = new MutationObserver(() => {
              state.revision += 1;
            });
            state.observer.observe(root, {
              subtree: true,
              childList: true,
              characterData: true,
              attributes: true,
              attributeFilter: options.attributeFilter,
            });
            registry.states.set(root, state);
          }
          const observerKey = `${registry.documentId}:${observerState.id}:${observerState.revision}`;
          if (options.knownKey === observerKey) return { key: observerKey };
          // Browser turn WebContents are intentionally allowed to run while their Electron view is
          // hidden or has no measured width. Layout geometry is therefore not response visibility:
          // completed Markdown can have width=0 while remaining connected, rendered and readable.
          const renderedInDom = (candidate: HTMLElement): boolean => {
            const style = getComputedStyle(candidate);
            return (
              candidate.isConnected &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.opacity !== "0"
            );
          };

          // ChatGPT uses the same Markdown renderer for intermediate commentary and for the final
          // answer. Older responses nested commentary in the streaming-status container. Pro can also
          // render a completed commentary Markdown root immediately before that live status container.
          // Final-answer Markdown follows the live status instead, so DOM order remains the semantic
          // boundary without relying on localized labels such as "Pro thinking".
          const allMarkdownRoots = [...root.querySelectorAll<HTMLElement>(".markdown")]
            .filter((candidate) => !candidate.parentElement?.closest(".markdown"))
            .filter(renderedInDom);
          const streamingStatusContainers = [
            ...root.querySelectorAll<HTMLElement>("[data-streaming-response-status]"),
          ].filter(renderedInDom);
          // CHATGPT_COMMENTARY_CLASSIFIER_BEGIN
          // Self-contained so the test suite can execute this exact source against a synthetic DOM;
          // it must not close over anything from the surrounding evaluate scope.
          const selectChatGptAnswerRoots = (
            markdownRoots: HTMLElement[],
            statusContainers: HTMLElement[]
          ): { commentaryRoots: HTMLElement[]; answerRoots: HTMLElement[] } => {
            const firstStatusContainer = statusContainers[0];
            const commentary = markdownRoots.filter(
              (candidate) =>
                candidate.closest("[data-streaming-response-status]") !== null ||
                // Chain-of-thought components carry reasoning, never the final answer, so containment is
                // a position-independent commentary signal. Position alone cannot separate "commentary
                // between two status containers" from "answer between two tool calls".
                candidate.closest('[data-testid^="cot-v5"]') !== null ||
                // Only Markdown that precedes the FIRST status container is prior commentary. Keying
                // this on "some status follows me" silently reclassified answer text as commentary as
                // soon as a second tool call opened another status container below it, which both zeroed
                // the visible text and dropped every answer chunk emitted between tool calls.
                (firstStatusContainer !== undefined &&
                  Boolean(
                    // 4 is Node.DOCUMENT_POSITION_FOLLOWING, inlined to keep this function standalone.
                    candidate.compareDocumentPosition(firstStatusContainer) & 4
                  ))
            );
            return {
              commentaryRoots: commentary,
              answerRoots: markdownRoots.filter((candidate) => !commentary.includes(candidate)),
            };
          };
          // CHATGPT_COMMENTARY_CLASSIFIER_END
          const classified = selectChatGptAnswerRoots(allMarkdownRoots, streamingStatusContainers);
          const commentaryRoots = classified.commentaryRoots;
          const renderedRoots = classified.answerRoots;
          // ChatGPT may merge adjacent `.markdown` roots or virtualize an old prefix while a streamed
          // answer is finalized. Root boundaries and visible indices therefore are not identity:
          // flatten semantic blocks and preserve ChatGPT's source ranges across that reparenting.
          const flattenedMarkdownSegments: Array<{
            tag: string;
            html: string;
            text: string;
            group?: string;
            sourceStart?: number;
            sourceEnd?: number;
          }> = [];
          const blockMarkdownTags = new Set([
            "address",
            "article",
            "aside",
            "blockquote",
            "div",
            "dl",
            "fieldset",
            "figcaption",
            "figure",
            "footer",
            "form",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "header",
            "hr",
            "li",
            "main",
            "nav",
            "ol",
            "p",
            "pre",
            "section",
            "table",
            "ul",
          ]);
          let listGroupIndex = 0;
          const sourceRange = (
            candidate: Element
          ): { sourceStart: number; sourceEnd: number } | undefined => {
            const startAttribute = candidate.getAttribute("data-start");
            const endAttribute = candidate.getAttribute("data-end");
            if (startAttribute === null || endAttribute === null) return undefined;
            if (!startAttribute.trim() || !endAttribute.trim()) return undefined;
            const sourceStart = Number(startAttribute);
            const sourceEnd = Number(endAttribute);
            return Number.isFinite(sourceStart) &&
              Number.isFinite(sourceEnd) &&
              sourceEnd >= sourceStart
              ? { sourceStart, sourceEnd }
              : undefined;
          };
          const appendBlockSegment = (child: HTMLElement) => {
            const tag = child.tagName.toLowerCase();
            const childRange = sourceRange(child);
            const listItems =
              tag === "ol" || tag === "ul"
                ? ([...child.children].filter(
                    (candidate) => candidate.tagName === "LI"
                  ) as HTMLElement[])
                : [];
            if (listItems.length === 0) {
              flattenedMarkdownSegments.push({
                tag,
                html: child.outerHTML,
                text: child.innerText.trim(),
                ...childRange,
              });
              return;
            }

            const group = childRange
              ? `list:${childRange.sourceStart}:${tag}`
              : `list:${listGroupIndex++}:${tag}`;
            const orderedStart =
              tag === "ol" ? Number(child.getAttribute("start") ?? "1") : undefined;
            listItems.forEach((item, itemIndex) => {
              const shell = child.cloneNode(false) as HTMLElement;
              shell.removeAttribute("data-is-last-node");
              if (orderedStart !== undefined && Number.isFinite(orderedStart)) {
                shell.setAttribute("start", String(orderedStart + itemIndex));
              }
              shell.append(item.cloneNode(true));
              flattenedMarkdownSegments.push({
                tag: `${tag}:item`,
                html: shell.outerHTML,
                text: item.innerText.trim(),
                group,
                ...sourceRange(item),
              });
            });
          };
          renderedRoots.forEach((markdownRoot) => {
            const children = [...markdownRoot.children] as HTMLElement[];
            const hasBlockChildren = children.some((child) =>
              blockMarkdownTags.has(child.tagName.toLowerCase())
            );
            if (!hasBlockChildren) {
              if (markdownRoot.innerHTML.trim())
                flattenedMarkdownSegments.push({
                  tag: "root",
                  html: markdownRoot.innerHTML,
                  text: markdownRoot.innerText.trim(),
                  ...sourceRange(markdownRoot),
                });
              return;
            }

            let inlineRun: Node[] = [];
            const flushInlineRun = () => {
              if (inlineRun.length === 0) return;
              const nodes = inlineRun;
              inlineRun = [];
              const shell = document.createElement("span");
              nodes.forEach((node) => shell.append(node.cloneNode(true)));
              const text = shell.textContent?.trim() ?? "";
              if (text) {
                const rangedElements = nodes.flatMap((node) =>
                  node instanceof Element
                    ? [node, ...node.querySelectorAll<HTMLElement>("[data-start][data-end]")]
                    : []
                );
                const ranges = rangedElements
                  .map(sourceRange)
                  .filter(
                    (range): range is { sourceStart: number; sourceEnd: number } =>
                      range !== undefined
                  );
                flattenedMarkdownSegments.push({
                  tag: "inline",
                  html: shell.outerHTML,
                  text,
                  ...(ranges.length > 0
                    ? {
                        sourceStart: Math.min(...ranges.map((range) => range.sourceStart)),
                        sourceEnd: Math.max(...ranges.map((range) => range.sourceEnd)),
                      }
                    : {}),
                });
              }
            };

            markdownRoot.childNodes.forEach((node) => {
              if (
                node instanceof HTMLElement &&
                blockMarkdownTags.has(node.tagName.toLowerCase())
              ) {
                flushInlineRun();
                appendBlockSegment(node);
                return;
              }
              inlineRun.push(node);
            });
            flushInlineRun();
          });
          const markdownSegments = flattenedMarkdownSegments.map((segment, index, segments) => ({
            key:
              segment.sourceStart !== undefined
                ? `${segment.sourceStart}:${segment.tag}`
                : `${index}:${segment.tag}`,
            tag: segment.tag,
            html: segment.html,
            text: segment.text,
            ...(segment.group ? { group: segment.group } : {}),
            ...(segment.sourceStart !== undefined ? { sourceStart: segment.sourceStart } : {}),
            ...(segment.sourceEnd !== undefined ? { sourceEnd: segment.sourceEnd } : {}),
            streamable: index < segments.length - 1,
          }));
          const rendered = renderedRoots.at(-1);
          const completionAction = rendered
            ? [...root.querySelectorAll<HTMLElement>(options.completionActionSelector)]
                .filter(renderedInDom)
                .find(
                  (candidate) =>
                    !rendered.contains(candidate) &&
                    Boolean(
                      rendered.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_FOLLOWING
                    )
                )
            : undefined;
          const completionActionSet = new Set(completionAction ? [completionAction] : []);
          const candidates = new Map<HTMLElement, ChatGptVisibleTraceBlock["kind"]>();
          renderedRoots.forEach((candidate) => candidates.set(candidate, "answer"));
          commentaryRoots.forEach((candidate) => candidates.set(candidate, "commentary"));
          const overlapsRenderedAnswer = (candidate: HTMLElement): boolean =>
            renderedRoots.some(
              (rendered) => candidate.contains(rendered) || rendered.contains(candidate)
            );
          const overlapsCommentary = (candidate: HTMLElement): boolean =>
            commentaryRoots.some(
              (commentary) => candidate.contains(commentary) || commentary.contains(candidate)
            );
          const statusSemantic = (candidate: HTMLElement): HTMLElement => {
            // Current cot-v5 action rows expose the semantic text on their item anchor while the
            // discoverable data-testid lives on a textless icon below it. Promote that descendant to
            // the owned row; otherwise every non-button action is silently filtered as empty text.
            return (
              candidate.closest<HTMLElement>("button") ??
              candidate.closest<HTMLElement>("[data-item-anchor]") ??
              candidate
            );
          };
          const traceText = (candidate: HTMLElement): string => {
            const ariaLabel = candidate.getAttribute("aria-label")?.trim();
            if (ariaLabel) return ariaLabel;
            // Animated ChatGPT action counters visually split a phrase around the changing number, so
            // `innerText` can become `Searching websites\n3`. The button's screen-reader label already
            // carries the stable semantic phrase (`Searching 3 websites`) without enclosing unrelated
            // commentary from the surrounding streaming-status container.
            const screenReaderText = [...candidate.querySelectorAll<HTMLElement>(".sr-only")]
              .map((element) => element.textContent?.replace(/\s+/g, " ").trim() ?? "")
              .find(Boolean);
            return screenReaderText || candidate.innerText.trim();
          };
          const traceKey = (
            candidate: HTMLElement,
            kind: ChatGptVisibleTraceBlock["kind"]
          ): string | undefined => {
            const statusContainer = candidate.closest<HTMLElement>(
              "[data-streaming-response-status]"
            );
            const itemAnchor = candidate.closest<HTMLElement>("[data-item-anchor]");
            if (!statusContainer || !itemAnchor) return undefined;
            const anchorIndex = [
              ...statusContainer.querySelectorAll<HTMLElement>("[data-item-anchor]"),
            ].indexOf(itemAnchor);
            return anchorIndex >= 0 ? `${kind}:anchor:${anchorIndex}` : undefined;
          };
          const hasFollowingRenderedSibling = (candidate: HTMLElement): boolean => {
            const itemAnchor = candidate.closest<HTMLElement>("[data-item-anchor]");
            for (
              let sibling = itemAnchor?.nextElementSibling;
              sibling;
              sibling = sibling.nextElementSibling
            ) {
              if (
                sibling instanceof HTMLElement &&
                renderedInDom(sibling) &&
                sibling.innerText.trim()
              ) {
                return true;
              }
            }
            return false;
          };
          root
            .querySelectorAll<HTMLElement>(
              'button, [role="status"], [aria-busy="true"], [data-testid*="cot"], [data-testid*="reason"], [data-testid*="thought"]'
            )
            .forEach((candidate) => {
              if (completionActionSet.has(candidate)) return;
              if (overlapsRenderedAnswer(candidate) || overlapsCommentary(candidate)) return;
              const semantic = statusSemantic(candidate);
              // A renderer may wrap the final Markdown in a reason/status container. That wrapper and
              // its descendants still belong exclusively to the final-answer stream; assigning either
              // side to the trace stream duplicates or truncates the answer under Codex's `Working` UI.
              if (
                !overlapsRenderedAnswer(semantic) &&
                !overlapsCommentary(semantic) &&
                !candidates.has(semantic)
              ) {
                candidates.set(semantic, "status");
              }
            });
          root
            .querySelectorAll<HTMLElement>("[data-streaming-response-status]")
            .forEach((container) => {
              if (
                !overlapsRenderedAnswer(container) &&
                !overlapsCommentary(container) &&
                ![...candidates.keys()].some((candidate) => container.contains(candidate))
              ) {
                candidates.set(container, "status");
              }
            });
          const traceByKey = new Map<string, ChatGptVisibleTraceBlock>();
          [...candidates]
            .filter(([candidate]) => renderedInDom(candidate))
            .sort(([left], [right]) =>
              left === right
                ? 0
                : left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING
                  ? -1
                  : 1
            )
            .map(([candidate, kind]) => ({
              kind,
              text: traceText(candidate),
              key: traceKey(candidate, kind),
              ...(kind === "commentary"
                ? { complete: hasFollowingRenderedSibling(candidate) }
                : {}),
              // Footer controls such as the model picker and overflow menu are siblings of the final
              // Markdown inside the assistant turn. They are UI, not model trace. Real action buttons
              // are scoped by ChatGPT's streaming-status container.
              uiControl:
                candidate.matches("button") &&
                candidate.closest("[data-streaming-response-status]") === null,
            }))
            .filter((block) => block.text.length > 0)
            .forEach((block, index) => {
              const key = block.key ?? `${block.kind}:fallback:${index}`;
              const previous = traceByKey.get(key);
              if (!previous || block.text.length > previous.text.length) traceByKey.set(key, block);
            });
          const traceBlocks = [...traceByKey.values()].map((block, index, blocks) => ({
            ...block,
            ...(block.kind === "commentary"
              ? {
                  complete: block.complete === true || index < blocks.length - 1,
                }
              : {}),
          }));
          const stoppedThinkingVisible = (() => {
            const ariaMatch = [
              ...root.querySelectorAll<HTMLElement>('[aria-label="Stopped thinking"]'),
            ].some(renderedInDom);
            if (ariaMatch) return true;
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
              if (node.textContent?.replace(/\s+/g, " ").trim() !== "Stopped thinking") continue;
              const parent = node.parentElement;
              if (parent && renderedInDom(parent)) return true;
            }
            return false;
          })();
          return {
            key: observerKey,
            snapshot: {
              responsePresent: true,
              visibleText: renderedRoots
                .map((candidate) => candidate.innerText.trim())
                .filter(Boolean)
                .join("\n\n"),
              fullHtml: renderedRoots.map((candidate) => candidate.innerHTML).join(""),
              markdownSegments,
              completionActionVisible: completionAction !== undefined,
              stoppedThinkingVisible,
              traceBlocks,
            },
          };
        },
        {
          completionActionSelector: CHATGPT_COMPLETION_ACTION_SELECTOR,
          knownKey: cache?.key,
          attributeFilter: [...CHATGPT_DOM_REVISION_ATTRIBUTES],
        },
        { timeout: 2_000 }
      )
      .catch(() => undefined);
    if (!observed) {
      if (responseTurn.page().isClosed()) {
        throw chatGptBrowserTabClosedError();
      }
      return absentResponseDomSnapshot();
    }
    const snapshot = observed.snapshot ?? cache?.snapshot ?? absentResponseDomSnapshot();
    if (observed.snapshot && cache) {
      cache.key = observed.key;
      cache.snapshot = observed.snapshot;
      cache.fullScans = (cache.fullScans ?? 0) + 1;
    } else if (!observed.snapshot && cache?.snapshot) {
      cache.cacheHits = (cache.cacheHits ?? 0) + 1;
    }
    snapshot.traceBlocks = snapshot.traceBlocks
      .map(stripChatGptTraceControlSuffix)
      .filter((block) => block.text.length > 0 && !isChatGptTraceControl(block));
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
              ariaLabelChars: candidate.getAttribute("aria-label")?.length ?? 0,
              titleChars: candidate.getAttribute("title")?.length ?? 0,
              textChars: candidate.innerText.trim().length,
            }));
          return {
            textChars: root.innerText.trim().length,
            htmlChars: root.innerHTML.length,
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
              ariaLabelChars: candidate.getAttribute("aria-label")?.length ?? 0,
              textChars: candidate.innerText.trim().length,
            };
          })
      )
      .catch(() => [] as Array<Record<string, string | null>>);
    return redactChatGptUiDiagnostic(JSON.stringify({ response: responseState, overlays }));
  }

  private async runExclusive(turn: BrowserTurn): Promise<string> {
    if (turn.abortSignal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
    if (this.config.browserHost !== "launcher") return this.runBrowserTurn(turn);

    const lease = await notifyLauncherTurn(this.config.browserHostDescriptorPath!, {
      phase: "start",
      traceId: turn.traceId,
      helperPid: process.pid,
      ...(turn.conversationKey ? { conversationKey: turn.conversationKey } : {}),
      ...(turn.conversationKey &&
      (turn.nativeConnector ||
        turn.capabilities.localToolsEnabled ||
        turn.requireRetainedConversation)
        ? { connectorIdentity: this.config.appName }
        : {}),
      ...(turn.requireRetainedConversation ? { requireRetainedConversation: true } : {}),
    }).catch((error) => {
      if (error instanceof LauncherBrowserTurnCancelledError) throw chatGptBrowserTabClosedError();
      if (error instanceof LauncherRetainedConversationUnavailableError) {
        throw chatGptRetainedConversationUnavailableError();
      }
      throw error;
    });
    const surfaceId = lease.surfaceId;
    const reused = lease.reused === true;
    let terminal: "completed" | "failed" | "aborted" = "completed";
    let terminalMessage: string | undefined;
    let originalError: unknown;
    let heartbeatTimer: ReturnType<typeof setInterval> | undefined;
    let heartbeatInFlight = false;
    let lastHeartbeatFailureAt = 0;
    const sendHeartbeat = () => {
      if (heartbeatInFlight) return;
      heartbeatInFlight = true;
      void notifyLauncherTurn(
        this.config.browserHostDescriptorPath!,
        {
          phase: "heartbeat",
          traceId: turn.traceId,
          helperPid: process.pid,
        },
        LAUNCHER_TURN_HEARTBEAT_TIMEOUT_MS
      )
        .catch((error) => {
          const now = Date.now();
          if (now - lastHeartbeatFailureAt < 30_000) return;
          lastHeartbeatFailureAt = now;
          console.warn(
            `[chatgpt-web] launcher turn heartbeat failed for ${turn.traceId}: ${error instanceof Error ? error.message : String(error)}`
          );
        })
        .finally(() => {
          heartbeatInFlight = false;
        });
    };
    try {
      if (!surfaceId) throw new Error("Launcher did not lease a browser tab for the ChatGPT turn");
      if (turn.requireRetainedConversation && !reused) {
        throw chatGptRetainedConversationUnavailableError();
      }
      if (reused && !turn.prepareResume) {
        throw new Error("Launcher reused a ChatGPT conversation without a continuation prompt");
      }
      await turn.onPreparedSelected?.(reused);
      heartbeatTimer = setInterval(sendHeartbeat, LAUNCHER_TURN_HEARTBEAT_INTERVAL_MS);
      heartbeatTimer.unref?.();
      return await this.runBrowserTurn(turn, surfaceId, undefined, reused);
    } catch (error) {
      originalError = error;
      terminal =
        (error instanceof DOMException && error.name === "AbortError") ||
        (error instanceof ChatGptWebAdapterError && error.code === "client_cancelled")
          ? "aborted"
          : "failed";
      terminalMessage =
        error instanceof Error ? error.message.slice(0, 500) : String(error).slice(0, 500);
      throw error;
    } finally {
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      try {
        const release = await notifyLauncherTurn(this.config.browserHostDescriptorPath!, {
          phase: "end",
          traceId: turn.traceId,
          helperPid: process.pid,
          status: terminal,
          ...(terminalMessage ? { message: terminalMessage } : {}),
          ...(terminal === "completed" && turn.retainConversation ? { retain: true } : {}),
          ...(terminal === "completed" &&
          (turn.nativeConnector || turn.capabilities.localToolsEnabled)
            ? { connectorBound: true }
            : {}),
        });
        if (release.cancelledByUser) throw chatGptBrowserTabClosedError();
      } catch (controlError) {
        if (
          controlError instanceof ChatGptWebAdapterError &&
          controlError.code === "client_cancelled"
        ) {
          throw controlError;
        }
        if (!originalError) throw controlError;
        console.error(
          `[chatgpt-web] launcher turn-end notification failed after browser error: ${controlError instanceof Error ? controlError.message : String(controlError)}`
        );
      }
    }
  }

  private async runBrowserTurn(
    turn: BrowserTurn,
    launcherSurfaceId?: string,
    maintenancePage?: Page,
    reuseConversation = false
  ): Promise<string> {
    if (turn.abortSignal?.aborted) throw new DOMException("ChatGPT web turn aborted", "AbortError");
    if ((turn.captureLunaCheckpoint === true) !== (turn.onLunaCheckpoint !== undefined)) {
      throw new Error("ChatGPT Luna checkpoint capture requires exactly one checkpoint callback");
    }
    if (turn.captureLunaCheckpoint && turn.modelId !== CHATGPT_WEB_LUNA_MODEL_ID) {
      throw new Error("Private rolling checkpoint capture is valid only for ChatGPT Luna");
    }
    const browserCapabilities = turn.nativeConnector
      ? { ...turn.capabilities, localToolsEnabled: true }
      : turn.capabilities;
    const requestedMode = resolveChatGptWebModelMode(
      turn.modelId,
      turn.reasoning,
      browserCapabilities
    );
    const prepare = reuseConversation ? turn.prepareResume : turn.prepare;
    if (!prepare) throw new Error("The retained ChatGPT conversation has no continuation prompt");
    const prepared = await prepare();
    const diagnostics = new ChatGptBrowserDiagnostics(
      turn.traceId,
      this.config.browserDiagnosticsPath ?? join(getConfigDir(), "diagnostics", "browser-turns")
    );
    const verifiedStorageState =
      this.config.browserHost === "managed-chrome"
        ? readChatGptBrowserStorageState(this.config.storageStatePath)
        : undefined;
    let turnConnection: Browser | undefined;
    let managedPage: Page | undefined;
    let diagnosticPage: Page | undefined;
    try {
      if (turn.abortSignal?.aborted)
        throw new DOMException("ChatGPT web turn aborted", "AbortError");
      const multipartTransactionId = prepared.multipart
        ? `ctx_${randomUUID().replaceAll("-", "")}`
        : undefined;
      const multipartStages =
        prepared.multipart && multipartTransactionId
          ? prepared.multipart.parts
              .slice(0, -1)
              .map((payload, index) =>
                formatChatGptWebMultipartStage(
                  payload,
                  multipartTransactionId,
                  index + 1,
                  prepared.multipart!.parts.length
                )
              )
          : undefined;
      const multipartFinalPrompt =
        prepared.multipart && multipartTransactionId
          ? formatChatGptWebMultipartCommit(prepared.multipart, multipartTransactionId)
          : undefined;
      const estimatedInputTokens = estimateCompiledChatGptWebInputTokens(prepared, turn.modelId);
      const estimatedMessageTokens = estimateCompiledChatGptWebMessageTokens(
        prepared,
        turn.modelId
      );
      const maxMessageChars = compiledChatGptWebMaxMessageChars(prepared);
      const maxStageMessageTokens = multipartStages
        ? Math.max(...multipartStages.map((stage) => estimateTokens(stage.text, turn.modelId)))
        : undefined;
      const maxStageChars = multipartStages
        ? Math.max(...multipartStages.map((stage) => stage.text.length))
        : undefined;
      const stagingMode = multipartStages
        ? resolveChatGptWebMultipartStagingMode(
            turn.modelId,
            browserCapabilities,
            requestedMode.effort,
            maxStageMessageTokens!,
            maxStageChars!
          )
        : requestedMode;
      if (prepared.multipart) {
        assertChatGptWebMultipartInputWithinLimits(
          estimatedInputTokens,
          estimatedMessageTokens,
          turn.modelId,
          requestedMode.effort,
          browserCapabilities,
          maxMessageChars,
          prepared.multipart.parts.length,
          multipartStages &&
            multipartFinalPrompt &&
            maxStageMessageTokens !== undefined &&
            maxStageChars !== undefined
            ? {
                stagingEffort: stagingMode.effort,
                maxStageMessageTokens,
                maxStageChars,
                finalMessageTokens: estimateTokens(multipartFinalPrompt, turn.modelId),
                finalMessageChars: multipartFinalPrompt.length,
              }
            : undefined
        );
      } else {
        assertChatGptWebInputWithinLimits(
          estimatedInputTokens,
          estimatedMessageTokens,
          turn.modelId,
          requestedMode.effort,
          browserCapabilities,
          maxMessageChars
        );
      }
      const deadline =
        this.config.turnTimeoutMs === undefined
          ? undefined
          : Date.now() + this.config.turnTimeoutMs;
      let page = await this.runStage(
        turn.traceId,
        "browser_page",
        browserStageTimeouts.browserPage,
        async (abortSignal) => {
          if (maintenancePage) return maintenancePage;
          if (!launcherSurfaceId) {
            const managed = await this.pageForNewTurn();
            if (abortSignal.aborted) {
              await managed.close().catch(() => {});
              throw new DOMException("ChatGPT browser page acquisition aborted", "AbortError");
            }
            return managed;
          }
          const connection = await connectLauncherBrowserHost(
            this.config.browserHostDescriptorPath!,
            browserStageTimeouts.browserPage,
            launcherSurfaceId,
            abortSignal
          );
          if (abortSignal.aborted) {
            await connection.browser.close().catch(() => {});
            throw new DOMException("ChatGPT browser page acquisition aborted", "AbortError");
          }
          turnConnection = connection.browser;
          await waitForOperationalChatGptViewport(connection.page, abortSignal);
          return connection.page;
        }
      );
      if (!maintenancePage && !launcherSurfaceId) managedPage = page;
      diagnosticPage = page;
      const rebindLauncherPage = async (attempt: number, cause: Error): Promise<void> => {
        if (!launcherSurfaceId || !this.config.browserHostDescriptorPath) throw cause;
        console.warn(
          `[chatgpt-web] browser turn ${turn.traceId} is rebinding its existing launcher page after a stalled DOM probe:` +
            ` ${redactChatGptUiDiagnostic(cause.message)}`
        );
        const previousConnection = turnConnection;
        // The observation timeout races the Playwright operation but cannot cancel the underlying
        // page.evaluate by itself. A failed disconnect is terminal: opening a replacement while
        // the stale probe still owns its transport would recreate the contention this rebind is
        // meant to remove.
        const connection = await connectAfterClosingBrowserConnection(previousConnection, () => {
          turnConnection = undefined;
          return this.runStage(
            turn.traceId,
            `response_page_rebind_${attempt}`,
            browserStageTimeouts.browserPage,
            async (stageSignal) => {
              const signal = turn.abortSignal
                ? AbortSignal.any([stageSignal, turn.abortSignal])
                : stageSignal;
              const rebound = await connectLauncherBrowserHost(
                this.config.browserHostDescriptorPath!,
                browserStageTimeouts.browserPage,
                launcherSurfaceId,
                signal
              );
              await waitForOperationalChatGptViewport(rebound.page, signal);
              return rebound;
            }
          );
        });
        turnConnection = connection.browser;
        page = connection.page;
        diagnosticPage = page;
        console.warn(
          `[chatgpt-web] browser turn ${turn.traceId} rebound its existing launcher page after a stalled DOM probe`
        );
      };
      await diagnostics.capture(page, "browser-page-acquired");
      console.info(
        `[chatgpt-web] browser turn ${turn.traceId} opened (transport=${prepared.multipart ? `multipart-${prepared.multipart.parts.length}` : "inline"}, maxMessageChars=${maxMessageChars}, estimatedInputTokens=${estimatedInputTokens}, images=${prepared.images.length}, compactionTrimmedMessages=${prepared.trimmedCompactionMessages ?? 0})`
      );
      if (!reuseConversation) {
        await this.runStage(
          turn.traceId,
          "temporary_chat_preparation",
          browserStageTimeouts.temporaryChatPreparation,
          () =>
            this.prepareTemporaryChatSurface(page, (checkpoint) =>
              diagnostics.capture(page, checkpoint)
            )
        );
      }
      let mode = requestedMode;
      if (
        chatGptEffortSelectionRequired(reuseConversation, requestedMode.effort, stagingMode.effort)
      ) {
        mode = await this.runStage(
          turn.traceId,
          "effort_selection",
          browserStageTimeouts.effortSelection,
          () =>
            this.selectModelAndEffort(
              page,
              turn.modelId,
              stagingMode.effort,
              browserCapabilities,
              (checkpoint) => diagnostics.capture(page, checkpoint)
            )
        );
      }
      await diagnostics.capture(page, "effort-selection-complete");

      let finalPrompt = prepared.text;
      if (prepared.multipart && multipartStages && multipartTransactionId && multipartFinalPrompt) {
        for (let index = 0; index < multipartStages.length; index += 1) {
          const stage = multipartStages[index]!;
          const stageBaseline = await this.captureSubmissionBaseline(page);
          await this.runStage(
            turn.traceId,
            `multipart_stage_${index + 1}_attachment`,
            browserStageTimeouts.promptAttachment,
            (stageSignal) =>
              this.attachPrompt(
                page,
                stage.text,
                false,
                (checkpoint) => diagnostics.capture(page, `multipart-${index + 1}-${checkpoint}`),
                turn.abortSignal ? AbortSignal.any([stageSignal, turn.abortSignal]) : stageSignal
              )
          );
          await diagnostics.capture(page, `multipart-stage-${index + 1}-attachment-complete`);
          const evidence = await this.runStage(
            turn.traceId,
            `multipart_stage_${index + 1}_send`,
            browserStageTimeouts.multipartStageSend,
            (stageSignal) =>
              this.sendAttachedPrompt(
                page,
                stageBaseline,
                (checkpoint) => diagnostics.capture(page, `multipart-${index + 1}-${checkpoint}`),
                turn.abortSignal ? AbortSignal.any([stageSignal, turn.abortSignal]) : stageSignal
              )
          );
          const responseTurn = await this.waitForNewAssistantTurn(
            page,
            stageBaseline,
            deadline,
            turn.abortSignal,
            // A part still being ingested has produced no MCP activity, so there is no progress to
            // consult here; only the wider window applies.
            undefined,
            CHATGPT_MULTIPART_RESPONSE_DOM_GRACE_MS
          );
          console.info(
            `[chatgpt-web] browser turn ${turn.traceId} multipart part ${index + 1}/${prepared.multipart.parts.length} submission accepted evidence=${evidence}`
          );
          await this.waitForMultipartAcknowledgement(
            page,
            responseTurn,
            stageBaseline,
            stage,
            deadline,
            turn.abortSignal,
            turn.externalProgress
          );
          await diagnostics.capture(page, `multipart-stage-${index + 1}-acknowledged`);
        }
        if (mode.effort !== requestedMode.effort) {
          mode = await this.runStage(
            turn.traceId,
            "final_part_effort_selection",
            browserStageTimeouts.effortSelection,
            () =>
              this.selectModelAndEffort(
                page,
                turn.modelId,
                requestedMode.effort,
                browserCapabilities,
                (checkpoint) => diagnostics.capture(page, `final-part-${checkpoint}`)
              )
          );
          await diagnostics.capture(page, "final-part-effort-selected");
        }
        finalPrompt = multipartFinalPrompt;
      }

      let submissionBaseline = await this.captureSubmissionBaseline(page);
      let catalogRefreshAvailable = mode.localTools && !reuseConversation && !prepared.multipart;
      const connectorAttemptBudget: ChatGptConnectorAttemptBudget = { triggerAttempts: 0 };
      for (;;) {
        try {
          await this.runStage(
            turn.traceId,
            "prompt_attachment",
            browserStageTimeouts.promptAttachment,
            (stageSignal) => {
              const promptAbortSignal = turn.abortSignal
                ? AbortSignal.any([stageSignal, turn.abortSignal])
                : stageSignal;
              return this.attachPromptWithCompactionRetry(
                page,
                finalPrompt,
                mode.localTools,
                turn.compaction === true,
                submissionBaseline,
                (checkpoint) => diagnostics.capture(page, checkpoint),
                promptAbortSignal,
                catalogRefreshAvailable,
                connectorAttemptBudget,
                reuseConversation
              );
            }
          );
          break;
        } catch (error) {
          if (!(error instanceof ChatGptConnectorCatalogStaleError) || !catalogRefreshAvailable)
            throw error;
          catalogRefreshAvailable = false;
          await diagnostics.capture(page, "connector-catalog-stale");
          await this.runStage(
            turn.traceId,
            "connector_catalog_refresh",
            browserStageTimeouts.temporaryChatPreparation,
            async () => {
              await page.reload({ waitUntil: "domcontentloaded", timeout: 60_000 });
              await this.prepareTemporaryChatSurface(page, (checkpoint) =>
                diagnostics.capture(page, checkpoint)
              );
              mode = await this.selectModelAndEffort(
                page,
                turn.modelId,
                turn.reasoning,
                turn.capabilities,
                (checkpoint) => diagnostics.capture(page, checkpoint)
              );
              submissionBaseline = await this.captureSubmissionBaseline(page);
            }
          );
          await diagnostics.capture(page, "connector-catalog-refreshed");
        }
      }
      await diagnostics.capture(page, "prompt-attachment-complete");
      await this.runStage(
        turn.traceId,
        "file_attachment",
        browserStageTimeouts.fileAttachment,
        () => this.attachFiles(page, prepared)
      );
      await diagnostics.capture(page, "file-attachment-complete");
      const finalSubmissionEvidence = await this.runStage(
        turn.traceId,
        "send",
        // A multipart commit lands on a conversation already carrying every staged part, so it
        // needs the same acceptance headroom the stages themselves get.
        prepared.multipart ? browserStageTimeouts.multipartStageSend : browserStageTimeouts.send,
        (stageSignal) =>
          this.sendAttachedPrompt(
            page,
            submissionBaseline,
            (checkpoint) => diagnostics.capture(page, checkpoint),
            turn.abortSignal ? AbortSignal.any([stageSignal, turn.abortSignal]) : stageSignal,
            turn.externalProgress,
            turn
          )
      );
      let responseTurn = await this.waitForNewAssistantTurn(
        page,
        submissionBaseline,
        deadline,
        turn.abortSignal,
        turn.externalProgress
      );
      console.info(
        `[chatgpt-web] browser turn ${turn.traceId} submission accepted evidence=${finalSubmissionEvidence}`
      );
      await diagnostics.capture(page, "send-accepted");

      let lastHeartbeat = 0;
      let finalText = "";
      let sawRunning = false;
      let loggedCompletionWait = false;
      let capturedResponse = false;
      const sentAt = Date.now();
      const visibleTrace = new ChatGptVisibleTraceTracker();
      const markdownBuffer = new ChatGptMarkdownBuffer();
      const checkpointStream = turn.captureLunaCheckpoint
        ? new ChatGptLunaCheckpointStream()
        : undefined;
      const emitMarkdownDelta = (delta: string): void => {
        const visible = checkpointStream ? checkpointStream.push(delta) : delta;
        if (visible) turn.onTextDelta(visible);
      };
      const throwMarkdownConsistencyError = (error: unknown): never => {
        if (!(error instanceof ChatGptMarkdownConsistencyError)) throw error;
        throw new ChatGptWebAdapterError(error.message, {
          status: 502,
          errorType: "server_error",
          code: "browser_stream_inconsistent",
          retryable: false,
        });
      };
      const completionTracker = new ChatGptCompletionTracker();
      const domHealthTracker = new ChatGptTurnDomHealthTracker();
      const stoppedThinkingTracker = new ChatGptStoppedThinkingTracker();
      const responseDomCache: ChatGptResponseDomCache = {};
      let consecutiveObservationRebinds = 0;
      let internalObservationFaults = 0;
      let observedThisIteration = false;
      for (;;) {
        // The heartbeat is a consumer callback, so it stays outside the observation-fault region:
        // a defect in the caller must not be retried as though the page could not be read.
        if (Date.now() - lastHeartbeat >= 10_000) {
          turn.onHeartbeat?.();
          lastHeartbeat = Date.now();
        }
        try {
          observedThisIteration = false;
          if (page.isClosed()) {
            throw chatGptBrowserTabClosedError();
          }
          if (turn.abortSignal?.aborted) {
            const stop = page.locator(CHATGPT_STOP_BUTTON_SELECTOR).last();
            if (await stop.isVisible().catch(() => false))
              await stop.press("Enter").catch(() => {});
            throw new DOMException("ChatGPT web turn aborted", "AbortError");
          }
          if (deadline !== undefined && Date.now() >= deadline) {
            throw new Error("ChatGPT web turn timed out");
          }
          await throwIfChatGptSessionFailureAlert(page);
          await throwIfChatGptTerminalErrorAlert(responseTurn.locator);

          if (
            mode.localTools &&
            (await resolveChatGptToolConfirmation(
              page,
              this.config.appName,
              this.config.autoApproveToolCalls,
              turn.abortSignal,
              CHATGPT_TOOL_CONFIRMATION_TIMEOUT_MS,
              () => diagnostics.capture(page, "tool-confirmation-visible")
            ))
          ) {
            internalObservationFaults = 0;
            await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
            continue;
          }

          let snapshot = await this.responseDomSnapshot(responseTurn.locator, responseDomCache);
          if (!snapshot.responsePresent) {
            try {
              const rebound = await withChatGptBrowserObservationTimeout(
                this.reconcileAssistantTurnBinding(page, submissionBaseline, responseTurn)
              );
              if (rebound.identity !== responseTurn.identity) {
                responseTurn = rebound;
                responseDomCache.key = undefined;
                responseDomCache.snapshot = undefined;
                snapshot = await this.responseDomSnapshot(responseTurn.locator, responseDomCache);
              }
            } catch (error) {
              if (!(error instanceof ChatGptBrowserObservationTimeoutError) || !launcherSurfaceId)
                throw error;
              consecutiveObservationRebinds += 1;
              if (consecutiveObservationRebinds > MAX_CHATGPT_BROWSER_PAGE_REBINDS) {
                throw new Error(
                  `ChatGPT browser DOM remained unresponsive after ${MAX_CHATGPT_BROWSER_PAGE_REBINDS} same-page rebinds`,
                  { cause: error }
                );
              }
              await rebindLauncherPage(consecutiveObservationRebinds, error);
              submissionBaseline = {
                ...submissionBaseline,
                userTurns: page.locator(CHATGPT_USER_TURN_SELECTOR),
                responseTurns: page.locator(CHATGPT_ASSISTANT_TURN_SELECTOR),
                domCache: {},
              };
              responseTurn = {
                ...responseTurn,
                locator: page.locator(`[data-testid=${JSON.stringify(responseTurn.identity)}]`),
              };
              responseDomCache.key = undefined;
              responseDomCache.snapshot = undefined;
              await diagnostics.capture(page, "response-page-rebound");
              continue;
            }
          }
          if (snapshot.responsePresent) consecutiveObservationRebinds = 0;
          // The page was read successfully, so the fault budget is genuinely consecutive even when
          // this iteration goes on to `continue` for a rebind, confirmation, or liveness pause.
          internalObservationFaults = 0;
          observedThisIteration = true;
          // Liveness may postpone a verdict, never waive it: once activity goes stale the DOM alone
          // decides, so a tool call that never returns cannot hold an undeadlined turn open forever.
          const externalProgressLive = chatGptExternalProgressSuppressesDomHealth(
            turn.externalProgress?.snapshot(),
            Date.now()
          );
          // A stale "Stopped thinking" label is not terminal while the model is still driving tool
          // calls, and the window must be forgotten rather than merely ignored.
          if (externalProgressLive) stoppedThinkingTracker.clear();
          else if (stoppedThinkingTracker.update(snapshot.stoppedThinkingVisible)) {
            throw chatGptStoppedThinkingError();
          }
          if (!snapshot.responsePresent && externalProgressLive) {
            // Current-turn MCP activity proves that ChatGPT is still executing even if its renderer
            // temporarily cannot expose the response subtree. DOM remains authoritative for text and
            // completion; this only prevents a live turn from being misclassified as vanished.
            domHealthTracker.clearMissingResponse();
            await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
            continue;
          }
          const stop = page.locator(CHATGPT_STOP_BUTTON_SELECTOR).last();
          const running = await stop.isVisible().catch(() => false);
          if (running) sawRunning = true;
          if (snapshot.responsePresent) {
            if (!capturedResponse) {
              capturedResponse = true;
              await diagnostics.capture(page, "response-visible");
            }
            const textDelta = (() => {
              try {
                return markdownBuffer.observe(snapshot.markdownSegments);
              } catch (error) {
                return throwMarkdownConsistencyError(error);
              }
            })();
            for (const trace of visibleTrace.observe(
              snapshot.traceBlocks,
              snapshot.completionActionVisible
            )) {
              if (trace.kind === "commentary")
                turn.onCommentary?.(trace.text, trace.continuation === true);
              else turn.onReasoningSummary?.(trace.text, trace.continuation === true);
            }
            if (textDelta) emitMarkdownDelta(textDelta);
            const domError = domHealthTracker.update({
              responsePresent: snapshot.responsePresent,
              running,
              currentText: snapshot.visibleText,
              completionActionVisible: snapshot.completionActionVisible,
              externalProgressLive,
            });
            if (domError) throw new Error(domError);
            if (
              completionTracker.update({
                responsePresent: snapshot.responsePresent,
                running,
                currentText: snapshot.visibleText,
                currentHtml: snapshot.fullHtml,
                completionActionVisible: snapshot.completionActionVisible,
                externalProgressLive,
              })
            ) {
              if (snapshot.visibleText === "api_tool unavailable") {
                throw new Error(
                  "ChatGPT selected mode rejected the Codex Native MCP tool (api_tool unavailable)"
                );
              }
              const final = (() => {
                try {
                  return markdownBuffer.finish();
                } catch (error) {
                  return throwMarkdownConsistencyError(error);
                }
              })();
              if (!final.markdown && snapshot.visibleText) {
                throw new Error(
                  "ChatGPT completed with visible text that could not be serialized as Markdown"
                );
              }
              if (final.delta) emitMarkdownDelta(final.delta);
              if (checkpointStream) {
                const completed = checkpointStream.finishOptional(snapshot.visibleText);
                if (completed.visibleRemainder) turn.onTextDelta(completed.visibleRemainder);
                if (completed.captured) turn.onLunaCheckpoint!(completed.captured);
                else
                  console.warn(
                    `[chatgpt-web] browser turn ${turn.traceId} completed without a Luna rolling checkpoint; preserving full native history`
                  );
                finalText = completed.answer;
              } else {
                finalText = final.markdown;
              }
              break;
            }
            if (!loggedCompletionWait && Date.now() - sentAt >= 30_000) {
              loggedCompletionWait = true;
              await diagnostics.capture(page, "response-stalled-30s");
              const diagnostic = await this.stalledTurnDiagnostic(page, responseTurn.locator).catch(
                (error) =>
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
              externalProgressLive,
            });
            if (domError) throw new Error(domError);
          }
          await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
        } catch (error) {
          // Only a defect in this worker is retried here. Every deliberate signal — adapter errors,
          // aborts, closed tabs, DOM-health verdicts — still fails the turn immediately.
          // Retry only faults raised while reading the page. Once observation succeeded, a
          // TypeError belongs to a consumer - Markdown buffering, text/trace callbacks, checkpoint
          // capture - and retrying it would rerun an iteration whose side effects already happened.
          if (!(error instanceof TypeError) || observedThisIteration) throw error;
          internalObservationFaults += 1;
          if (internalObservationFaults > MAX_CHATGPT_INTERNAL_OBSERVATION_FAULTS) {
            throw new Error(
              `ChatGPT browser observation failed ${internalObservationFaults} times in a row: ${error.message}`,
              { cause: error }
            );
          }
          console.warn(
            `[chatgpt-web] browser turn ${turn.traceId} tolerated internal observation fault` +
              ` ${internalObservationFaults}/${MAX_CHATGPT_INTERNAL_OBSERVATION_FAULTS}: ${error.message}`
          );
          await diagnostics.capture(page, "internal-observation-fault");
          responseDomCache.key = undefined;
          responseDomCache.snapshot = undefined;
          await new Promise((resolveSleep) => setTimeout(resolveSleep, 250));
        }
      }

      await diagnostics.capture(page, "turn-completed");
      console.info(
        `[chatgpt-web] browser turn ${turn.traceId} completed` +
          ` (markdownChars=${finalText.length}, domFullScans=${responseDomCache.fullScans ?? 0}, domCacheHits=${responseDomCache.cacheHits ?? 0})`
      );
      return finalText;
    } catch (error) {
      console.error(
        `[chatgpt-web] browser turn ${turn.traceId} failed:` +
          ` ${redactChatGptUiDiagnostic(error instanceof Error ? error.message : String(error))}`
      );
      if (diagnosticPage && !diagnosticPage.isClosed()) {
        await diagnostics.capture(diagnosticPage, "turn-failed", error);
      }
      throw error;
    } finally {
      prepared.release();
      if (managedPage && verifiedStorageState) {
        try {
          const context = managedPage.context();
          const mergedState = mergeChatGptRuntimeStorageState(
            verifiedStorageState,
            await context.storageState()
          );
          const verifiedAuthCookies = mergedState.cookies.filter((cookie) =>
            isVerifiedChatGptAuthCookie(cookie.name)
          );
          if (verifiedAuthCookies.length > 0) await context.addCookies(verifiedAuthCookies);
          atomicWriteFile(this.config.storageStatePath, `${JSON.stringify(mergedState)}\n`);
        } catch (storageError) {
          console.error(
            `[chatgpt-web] failed to preserve verified browser auth for ${turn.traceId}: ${storageError instanceof Error ? storageError.message : String(storageError)}`
          );
        }
      }
      if (turnConnection) {
        await turnConnection.close().catch((error) => {
          console.error(
            `[chatgpt-web] failed to release launcher browser connection for ${turn.traceId}: ${error instanceof Error ? error.message : String(error)}`
          );
        });
      } else if (managedPage && !managedPage.isClosed()) {
        await managedPage.close().catch((error) => {
          console.error(
            `[chatgpt-web] failed to close managed browser tab for ${turn.traceId}: ${error instanceof Error ? error.message : String(error)}`
          );
        });
      }
    }
  }
}
