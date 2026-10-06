import { Select, Toggle } from "@/shared/components";
import { type CodexServiceTier } from "@/lib/providers/requestDefaults";
import {
  CODEX_ACCOUNT_SERVICE_TIER_VALUES,
  CODEX_FINGERPRINT_MODE_VALUES,
  CODEX_REASONING_STRENGTH_OPTIONS,
  getCodexFingerprintModeLabel,
  getCodexServiceTierLabel,
  providerText,
  type CodexFingerprintModeValue,
} from "../../providerPageHelpers";

type Translator = Parameters<typeof getCodexFingerprintModeLabel>[0];

export function CodexConnectionFields({
  t,
  reasoningEffort,
  serviceTier,
  fingerprintMode,
  openaiStoreEnabled,
  showFingerprintMode,
  onChange,
}: {
  t: Translator;
  reasoningEffort: string;
  serviceTier: CodexServiceTier;
  fingerprintMode: CodexFingerprintModeValue;
  openaiStoreEnabled: boolean;
  showFingerprintMode: boolean;
  onChange: (patch: {
    codexReasoningEffort?: string;
    codexServiceTier?: CodexServiceTier;
    codexFingerprintMode?: CodexFingerprintModeValue;
    codexOpenaiStoreEnabled?: boolean;
  }) => void;
}) {
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
      <Toggle
        checked={openaiStoreEnabled}
        onChange={(checked) => onChange({ codexOpenaiStoreEnabled: checked })}
        label={t("openaiResponsesStoreLabel")}
        description={t("openaiResponsesStoreDescription")}
      />
    </div>
  );
}
