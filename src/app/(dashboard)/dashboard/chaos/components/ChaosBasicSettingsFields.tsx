"use client";

import { useTranslations } from "next-intl";

export interface ChaosBasicSettings {
  enabled: boolean;
  timeoutMs: number;
  maxTokens: number;
  systemPrompt?: string;
}

function ChaosSystemPromptField({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("chaosConfig");
  return (
    <div className="p-3 rounded-lg border border-border bg-surface/40">
      <p className="text-sm font-medium text-text-main">{t("systemPrompt")}</p>
      <p className="text-xs text-text-muted mb-2">{t("systemPromptDesc")}</p>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-1.5 rounded-md border border-border bg-surface text-sm text-text-main resize-y"
        placeholder={t("systemPromptPlaceholder")}
      />
    </div>
  );
}

/**
 * Enable toggle + timeout + max tokens + system prompt fields for the Chaos
 * Mode config page. Extracted out of ChaosConfigPageClient.tsx to keep the
 * page component under the complexity/size ratchet
 * (config/quality/complexity-baseline.json).
 */
export function ChaosBasicSettingsFields({
  settings,
  onChange,
}: {
  settings: ChaosBasicSettings;
  onChange: (patch: Partial<ChaosBasicSettings>) => void;
}) {
  const t = useTranslations("chaosConfig");

  return (
    <>
      {/* Enable/Disable Toggle */}
      <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("enableChaos")}</p>
          <p className="text-xs text-text-muted">{t("enableChaosDesc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          onClick={() => onChange({ enabled: !settings.enabled })}
          className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            settings.enabled
              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
              : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {settings.enabled ? "toggle_on" : "toggle_off"}
          </span>
          {settings.enabled ? t("enabled") : t("disabled")}
        </button>
      </div>

      {/* Timeout */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">{t("timeout")}</p>
        <p className="text-xs text-text-muted mb-2">{t("timeoutDesc")}</p>
        <input
          type="number"
          min={5000}
          max={600000}
          step={5000}
          value={settings.timeoutMs}
          onChange={(e) =>
            onChange({
              timeoutMs: Math.max(5000, Math.min(600000, Number(e.target.value) || 120000)),
            })
          }
          className="w-full px-3 py-1.5 rounded-md border border-border bg-surface text-sm text-text-main"
        />
      </div>

      {/* Max Tokens */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">{t("maxTokens")}</p>
        <p className="text-xs text-text-muted mb-2">{t("maxTokensDesc")}</p>
        <input
          type="number"
          min={256}
          max={128000}
          step={256}
          value={settings.maxTokens}
          onChange={(e) =>
            onChange({
              maxTokens: Math.max(256, Math.min(128000, Number(e.target.value) || 4096)),
            })
          }
          className="w-full px-3 py-1.5 rounded-md border border-border bg-surface text-sm text-text-main"
        />
      </div>

      <ChaosSystemPromptField
        value={settings.systemPrompt}
        onChange={(systemPrompt) => onChange({ systemPrompt })}
      />
    </>
  );
}
