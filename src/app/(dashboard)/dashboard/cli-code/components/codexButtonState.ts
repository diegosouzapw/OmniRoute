/**
 * Pure helpers for the Codex CLI tool card Apply/Reset button disabled state.
 *
 * Extracted so the disabled-state logic is unit-testable without rendering the
 * React component. Kept in the same directory as `CodexToolCard.tsx` because
 * they share its only consumer.
 *
 * Background: before this helper, the Apply button was disabled whenever
 * `selectedApiKey` was empty — but the default `sk_omniroute` key is a valid
 * local-mode default and should not block Apply. The Reset button was disabled
 * whenever `codexStatus.hasOmniRoute` was false — but a user should always be
 * able to reset, even when Codex was never configured against OmniRoute.
 */

export interface ApplyButtonInput {
  /** Whether a model has been picked from the model selector. */
  selectedModel: string | null | undefined;
  /** Currently selected API key id (empty string when nothing is selected). */
  selectedApiKey: string | null | undefined;
  /** Whether the dashboard's cloud mode is enabled. */
  cloudEnabled: boolean;
  /** Configured API keys (only `.length` is read). */
  apiKeys: ReadonlyArray<unknown> | null | undefined;
}

/**
 * Compute the disabled state for the Apply button.
 *
 * Disabled when:
 * - no model is selected, OR
 * - cloud mode is enabled AND keys exist AND none is selected.
 *
 * In local mode (cloud disabled) OR when no keys are configured at all, the
 * `sk_omniroute` default kicks in, so an empty `selectedApiKey` must NOT
 * disable Apply.
 */
export function isApplyDisabled({
  selectedModel,
  selectedApiKey,
  cloudEnabled,
  apiKeys,
}: ApplyButtonInput): boolean {
  if (!selectedModel) return true;
  const keyCount = apiKeys?.length ?? 0;
  const missingKey = !selectedApiKey;
  return missingKey && cloudEnabled && keyCount > 0;
}

export interface ResetButtonInput {
  /** True while the reset request is in flight. */
  restoring: boolean;
}

/**
 * Compute the disabled state for the Reset button.
 *
 * Reset must always be available when the CLI is installed (the card only
 * renders this control in the installed branch), so the only blocker is an
 * in-flight reset request.
 */
export function isResetDisabled({ restoring }: ResetButtonInput): boolean {
  return restoring;
}
