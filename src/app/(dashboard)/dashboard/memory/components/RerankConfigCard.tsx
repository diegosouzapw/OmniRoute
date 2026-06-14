"use client";

import { useTranslations } from "next-intl";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";
import type { EmbeddingProviderListing } from "@/lib/memory/embedding/types";

interface Props {
  settings: MemorySettingsExtended;
  providers: EmbeddingProviderListing[];
  onSave: (updates: Partial<MemorySettingsExtended>) => Promise<boolean>;
  saving?: boolean;
}

export default function RerankConfigCard({ settings, providers, onSave, saving }: Props) {
  const t = useTranslations("memory");

  const rerankEnabled = settings.rerankEnabled ?? false;
  const rerankProviderModel = settings.rerankProviderModel ?? "";

  // Only list providers that have keys configured
  const rerankProviders = providers.filter((p) => p.hasKey);
  const hasProvider = rerankProviders.length > 0;

  const handleProviderModelChange = (value: string) => {
    onSave({ rerankProviderModel: value || null });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30 border border-border/60">
        <div>
          <p className="text-sm font-medium text-text-main">{t("rerank.enableLabel")}</p>
          <p className="text-xs text-text-muted mt-0.5">{t("rerank.enableDesc")}</p>
        </div>
        <button
          type="button"
          data-testid="rerank-enabled-switch"
          onClick={() => {
            // Plan 21 D13 fix: block enabling rerank when no provider has a key.
            // Allow disabling (turning OFF) always, even if no provider exists.
            if (!rerankEnabled && !hasProvider) return;
            onSave({ rerankEnabled: !rerankEnabled });
          }}
          disabled={saving || (!rerankEnabled && !hasProvider)}
          aria-disabled={saving || (!rerankEnabled && !hasProvider)}
          title={
            !rerankEnabled && !hasProvider
              ? t("rerank.noProviderWithKey")
              : undefined
          }
          role="switch"
          aria-checked={rerankEnabled}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${
            rerankEnabled ? "bg-violet-500" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              rerankEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {rerankEnabled && (
        <>
          {/* Latency / cost warning */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 flex items-start gap-2">
            <span className="material-symbols-outlined text-[14px] mt-0.5 shrink-0">warning</span>
            <span>{t("rerank.warning")}</span>
          </div>

          <div className="p-3 rounded-lg bg-surface/30 border border-border/60">
            <label className="block text-sm font-medium text-text-main mb-2">
              {t("rerank.providerModelLabel")}
            </label>
            {!hasProvider ? (
              <p
                data-testid="rerank-no-provider-warning"
                className="text-xs text-amber-400 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[12px]">warning</span>
                {t("rerank.noProviderWithKey")}
              </p>
            ) : (
              <select
                value={rerankProviderModel}
                onChange={(e) => handleProviderModelChange(e.target.value)}
                disabled={saving}
                data-testid="rerank-provider-model-select"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="">{t("rerank.selectProviderModel")}</option>
                {rerankProviders.map((p) =>
                  p.models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  )),
                )}
              </select>
            )}
          </div>
        </>
      )}
    </div>
  );
}
