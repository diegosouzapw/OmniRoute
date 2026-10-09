import { Select, Toggle } from "@/shared/components";
import { type CodexServiceTier } from "@/lib/providers/requestDefaults";
import {
  CODEX_ACCOUNT_SERVICE_TIER_VALUES,
  CODEX_FINGERPRINT_MODE_VALUES,
  CODEX_PROMPT_CACHE_KEY_SCOPE_VALUES,
  CODEX_REASONING_STRENGTH_OPTIONS,
  getCodexFingerprintModeLabel,
  getCodexPromptCacheKeyScopeLabel,
  getCodexServiceTierLabel,
  providerText,
  type CodexFingerprintModeValue,
  type CodexPromptCacheKeyScopeValue,
} from "../../providerPageHelpers";

type Translator = Parameters<typeof getCodexFingerprintModeLabel>[0];

type CodexConnectionFieldsProps = {
  t: Translator;
  reasoningEffort: string;
  serviceTier: CodexServiceTier;
  fingerprintMode: CodexFingerprintModeValue;
  promptCacheKeyScope: CodexPromptCacheKeyScopeValue;
  openaiStoreEnabled: boolean;
  allowPaidCredits: boolean;
  showFingerprintMode: boolean;
  onChange: (patch: {
    codexReasoningEffort?: string;
    codexServiceTier?: CodexServiceTier;
    codexFingerprintMode?: CodexFingerprintModeValue;
    codexPromptCacheKeyScope?: CodexPromptCacheKeyScopeValue;
    codexOpenaiStoreEnabled?: boolean;
    allowPaidCredits?: boolean;
  }) => void;
};

export function CodexConnectionFields({
  t,
  reasoningEffort,
  serviceTier,
  fingerprintMode,
  promptCacheKeyScope,
  openaiStoreEnabled,
  allowPaidCredits,
  showFingerprintMode,
  onChange,
}: CodexConnectionFieldsProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
      <Select
        label={t("defaultThinkingStrengthLabel")}
        value={reasoningEffort}
        options={CODEX_REASONING_STRENGTH_OPTIONS}
        onChange={(e) => onChange({ codexReasoningEffort: e.target.value })}
        hint={t("defaultThinkingStrengthHint")}
      />
      <Select
        label={providerText(t, "codexServiceTierLabel", "Codex service tier")}
        value={serviceTier}
        options={CODEX_ACCOUNT_SERVICE_TIER_VALUES.map((value) => ({
          value,
          label: getCodexServiceTierLabel(t, value),
        }))}
        onChange={(event) => onChange({ codexServiceTier: event.target.value as CodexServiceTier })}
        hint={providerText(
          t,
          "codexServiceTierDescription",
          "Default uses the normal Codex tier. Priority shows as Fast; Flex uses the flex service tier when available."
        )}
      />
      {showFingerprintMode && (
        <Select
          label={providerText(t, "codexFingerprintModeLabel", "Codex fingerprint mode")}
          value={fingerprintMode}
          options={CODEX_FINGERPRINT_MODE_VALUES.map((mode) => ({
            value: mode,
            label: getCodexFingerprintModeLabel(t, mode),
          }))}
          onChange={(event) =>
            onChange({ codexFingerprintMode: event.target.value as CodexFingerprintModeValue })
          }
          hint={providerText(
            t,
            "codexFingerprintModeDescription",
            "Default Session converges one device and session per account. Off passes client IDs through."
          )}
        />
      )}
      {showFingerprintMode && (
        <Select
          label={providerText(t, "codexPromptCacheKeyScopeLabel", "Codex prompt cache key")}
          value={promptCacheKeyScope}
          options={CODEX_PROMPT_CACHE_KEY_SCOPE_VALUES.map((scope) => ({
            value: scope,
            label: getCodexPromptCacheKeyScopeLabel(t, scope),
          }))}
          onChange={(event) =>
            onChange({
              codexPromptCacheKeyScope: event.target.value as CodexPromptCacheKeyScopeValue,
            })
          }
          hint={providerText(
            t,
            "codexPromptCacheKeyScopeDescription",
            "Only applies to Session fingerprint mode. Thread keeps the cache key equal to the converged thread ID and scoped to this account; a conversation that moves between accounts no longer reuses another account's cache key."
          )}
        />
      )}
      <Toggle
        checked={openaiStoreEnabled}
        onChange={(checked) => onChange({ codexOpenaiStoreEnabled: checked })}
        label={t("openaiResponsesStoreLabel")}
        description={t("openaiResponsesStoreDescription")}
      />
      <Toggle
        checked={allowPaidCredits}
        onChange={(checked) => onChange({ allowPaidCredits: checked })}
        label={t("allowCodexPaidCreditsLabel")}
        description={t("allowCodexPaidCreditsDescription")}
      />
    </div>
  );
}
