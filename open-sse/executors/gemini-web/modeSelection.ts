/**
 * Per-model Gemini Web UI mode selection + verification (#13381, Option B).
 *
 * Before this module, `GeminiWebExecutor.execute()` read the `model` field
 * only AFTER Gemini had already answered — purely to stamp the OpenAI-shaped
 * response, never to influence what was actually typed/clicked in the
 * browser (../gemini-web.ts). Every advertised `gweb/<model>` alias ran the
 * identical automation, so the response `model` field was a caller-supplied
 * label, not an observed fact.
 *
 * This module gives the executor a real selection step: for each advertised
 * model (and for the Extended Thinking control, #13381 follow-up comment
 * 2026-09-11), it tries the corresponding UI control, then READS BACK the
 * active-mode indicator to confirm the switch actually took effect before
 * the caller is allowed to proceed. `gemini-3.1-pro` is treated as the mode
 * `gemini.google.com/app` already opens to (no interaction needed); every
 * other advertised model requires a confirmed switch.
 *
 * ⚠️ SELECTOR SET IS UNVALIDATED. Every CSS selector below is a best-effort
 * guess at Gemini's current DOM, not a value confirmed against a live
 * account — this checkout has no live Gemini session and no way to inspect
 * Google's current markup (which also changes without notice). That is fine
 * BY DESIGN: `selectGeminiUiMode()` never trusts an unconfirmed guess. If a
 * selector is wrong — the likely outcome until the mandatory live smoke in
 * the PR is run and these values are corrected against the real DOM — the
 * toggle/indicator lookup simply fails, the read-back does not confirm the
 * requested mode, and the caller gets a clear 400
 * (`unsupported_control_for_provider`) instead of a response silently
 * labeled with a model/mode that never actually ran — the exact dishonesty
 * #13381 reported. Update the selectors only after inspecting the real DOM
 * on a live account, never from guesswork.
 */

/** Reasons `selectGeminiUiMode`/`selectGeminiModel` can fail closed. */
export type GeminiModeSelectionFailureReason =
  "control_not_found" | "indicator_not_found" | "indicator_mismatch" | "unknown_model";

export interface GeminiWebModeDescriptor {
  /** The advertised `gweb/<model>` id, or a synthetic label for non-model controls. */
  readonly id: string;
  /**
   * true: this is the mode `gemini.google.com/app` already shows on load — no
   * UI interaction is attempted, nothing to confirm.
   */
  readonly isDefault: boolean;
  /** UNVALIDATED — opens/activates the control for this mode. Ignored when `isDefault`. */
  readonly toggleSelector?: string;
  /** UNVALIDATED — element whose text proves which mode is now active. */
  readonly activeIndicatorSelector?: string;
  /** Text the active-mode indicator must contain once the switch is confirmed. */
  readonly expectedIndicatorPattern?: RegExp;
}

/**
 * Model -> Gemini UI mode map for the three `gweb/<model>` ids advertised by
 * `open-sse/config/providers/registry/gemini/web/index.ts`. Keep the two
 * catalogs in sync: an advertised model with no entry here fails closed as
 * `unknown_model` (see `resolveGeminiModelMode`), which is the intended,
 * honest behavior for a model this module cannot yet select.
 */
export const GEMINI_WEB_MODEL_MODES: Readonly<Record<string, GeminiWebModeDescriptor>> = {
  "gemini-3.1-pro": { id: "gemini-3.1-pro", isDefault: true },
  "gemini-3.7-flash": {
    id: "gemini-3.7-flash",
    isDefault: false,
    toggleSelector:
      '[data-test-id="bard-mode-menu-button"], button[aria-haspopup="menu"][aria-label*="model" i]',
    activeIndicatorSelector:
      '[data-test-id="bard-mode-menu-button"] .mode-title, [data-test-id="bard-mode-menu-button"]',
    expectedIndicatorPattern: /\bflash\b(?!.*\blite\b)/i,
  },
  "gemini-3.1-flash-lite": {
    id: "gemini-3.1-flash-lite",
    isDefault: false,
    toggleSelector:
      '[data-test-id="bard-mode-menu-button"], button[aria-haspopup="menu"][aria-label*="model" i]',
    activeIndicatorSelector:
      '[data-test-id="bard-mode-menu-button"] .mode-title, [data-test-id="bard-mode-menu-button"]',
    expectedIndicatorPattern: /flash.*\blite\b/i,
  },
};

/** The Extended Thinking control (#13381 follow-up, 2026-09-11) — account-dependent, not a model. */
export const GEMINI_WEB_EXTENDED_THINKING_MODE: GeminiWebModeDescriptor = {
  id: "extended-thinking",
  isDefault: false,
  toggleSelector:
    '[data-test-id="deep-think-toggle"], button[aria-label*="extended thinking" i], ' +
    'button[aria-label*="deep think" i]',
  activeIndicatorSelector:
    '[data-test-id="deep-think-toggle"][aria-pressed="true"], [data-test-id="deep-think-toggle"].is-active',
  expectedIndicatorPattern: /thinking|deep think/i,
};

/** Minimal Playwright-shaped element the read-back needs — real `ElementHandle`s satisfy this. */
export interface GeminiAutomationElement {
  click(): Promise<void>;
  textContent?(): Promise<string | null>;
  innerText?(): Promise<string>;
}

/** Minimal Playwright-shaped page the selection step needs — the real `Page` satisfies this. */
export interface GeminiAutomationPage {
  waitForSelector(
    selector: string,
    opts?: { timeout?: number }
  ): Promise<GeminiAutomationElement | null>;
}

export interface GeminiModeSelectionResult {
  confirmed: boolean;
  reason?: GeminiModeSelectionFailureReason;
  descriptor?: GeminiWebModeDescriptor;
}

async function readIndicatorText(el: GeminiAutomationElement): Promise<string | null> {
  try {
    if (typeof el.textContent === "function") {
      const text = await el.textContent();
      if (typeof text === "string") return text;
    }
    if (typeof el.innerText === "function") {
      return await el.innerText();
    }
  } catch {
    // Unreadable is treated the same as "did not confirm" below — never a pass.
  }
  return null;
}

/**
 * Try to switch the live Gemini Web page to `descriptor`'s mode, then READ
 * BACK the active-mode indicator before reporting success. A click landing
 * is never itself treated as success — only a confirmed, pattern-matching
 * indicator text is (#13381).
 */
export async function selectGeminiUiMode(
  page: GeminiAutomationPage,
  descriptor: GeminiWebModeDescriptor,
  timeoutMs = 5000
): Promise<GeminiModeSelectionResult> {
  if (descriptor.isDefault) return { confirmed: true, descriptor };

  const { toggleSelector, activeIndicatorSelector, expectedIndicatorPattern } = descriptor;
  if (!toggleSelector || !activeIndicatorSelector || !expectedIndicatorPattern) {
    return { confirmed: false, reason: "control_not_found", descriptor };
  }

  const toggle = await page
    .waitForSelector(toggleSelector, { timeout: timeoutMs })
    .catch(() => null);
  if (!toggle) return { confirmed: false, reason: "control_not_found", descriptor };

  await toggle.click();

  const indicator = await page
    .waitForSelector(activeIndicatorSelector, { timeout: timeoutMs })
    .catch(() => null);
  if (!indicator) return { confirmed: false, reason: "indicator_not_found", descriptor };

  const text = await readIndicatorText(indicator);
  if (!text || !expectedIndicatorPattern.test(text)) {
    return { confirmed: false, reason: "indicator_mismatch", descriptor };
  }

  return { confirmed: true, descriptor };
}

export function resolveGeminiModelMode(modelId: string): GeminiWebModeDescriptor | null {
  return GEMINI_WEB_MODEL_MODES[modelId] ?? null;
}

/** Select + verify the requested advertised model's Gemini UI mode. */
export async function selectGeminiModel(
  page: GeminiAutomationPage,
  modelId: string,
  timeoutMs?: number
): Promise<GeminiModeSelectionResult> {
  const descriptor = resolveGeminiModelMode(modelId);
  if (!descriptor) return { confirmed: false, reason: "unknown_model" };
  return selectGeminiUiMode(page, descriptor, timeoutMs);
}

/** Select + verify the Extended Thinking control (#13381 follow-up). */
export async function selectGeminiExtendedThinking(
  page: GeminiAutomationPage,
  timeoutMs?: number
): Promise<GeminiModeSelectionResult> {
  return selectGeminiUiMode(page, GEMINI_WEB_EXTENDED_THINKING_MODE, timeoutMs);
}

const REASON_DETAIL: Record<GeminiModeSelectionFailureReason, string> = {
  unknown_model: "it is not one of the advertised, selectable gweb models",
  control_not_found: "the Gemini UI control used to switch modes was not found",
  indicator_not_found: "the active-mode indicator used to confirm the switch was not found",
  indicator_mismatch: "the active-mode indicator did not confirm the switch after attempting it",
};

/**
 * Client-facing explanation for a failed-closed selection, safe to put
 * directly in a response body (no selector text, no stack trace).
 */
export function describeModeSelectionFailure(
  controlLabel: string,
  reason: GeminiModeSelectionFailureReason | undefined
): string {
  const detail = (reason && REASON_DETAIL[reason]) || "the switch could not be verified";
  return (
    `Model provider "gemini-web" could not verify that "${controlLabel}" is actually active in ` +
    `the Gemini web UI (${detail}). Rather than silently answering under a model/mode label that ` +
    'may not be accurate, the request was rejected with "unsupported_control_for_provider" — ' +
    "see #13381."
  );
}
