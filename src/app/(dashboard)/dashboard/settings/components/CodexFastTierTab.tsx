"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Toggle, Select } from "@/shared/components";
import { useTranslations } from "next-intl";
import {
  CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS,
  resolveCodexGlobalFastServiceTier,
} from "@/lib/providers/codexFastTier";

type TierValue = "default" | "priority" | "flex";

// Fast-eligible Codex models per OpenAI ~/.codex/models_cache.json (service_tiers: priority).
// Other future Fast-eligible slugs can be added here without code changes once the user
// opts them in via the checkbox UI.
const CODEX_FAST_TIER_CATALOG: readonly string[] = [
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-5.5",
];

export default function CodexFastTierTab() {
  const [enabled, setEnabled] = useState(false);
  const [tier, setTier] = useState<TierValue>("priority");
  const [supportedModels, setSupportedModels] = useState<string[]>([
    ...CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS,
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const [modelsOpen, setModelsOpen] = useState(false);
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const resolved = resolveCodexGlobalFastServiceTier(data);
        setEnabled(resolved.enabled);
        setTier(resolved.tier);
        setSupportedModels([...resolved.supportedModels]);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allCatalogModels = useMemo(() => {
    // Union of the catalog and any custom models the user has stored, so we don't
    // silently drop a slug the user added on a future Codex release.
    const set = new Set<string>([...CODEX_FAST_TIER_CATALOG, ...supportedModels]);
    return Array.from(set);
  }, [supportedModels]);

  const save = async (next: {
    enabled?: boolean;
    tier?: TierValue;
    supportedModels?: string[];
  }) => {
    if (saving || loading) return;
    setSaving(true);
    setStatus("");
    const previous = { enabled, tier, supportedModels };
    const merged = {
      enabled: next.enabled ?? enabled,
      tier: next.tier ?? tier,
      supportedModels: next.supportedModels ?? supportedModels,
    };
    setEnabled(merged.enabled);
    setTier(merged.tier);
    setSupportedModels(merged.supportedModels);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codexServiceTier: {
            enabled: merged.enabled,
            tier: merged.tier,
            supportedModels: merged.supportedModels,
          },
        }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setEnabled(previous.enabled);
        setTier(previous.tier);
        setSupportedModels(previous.supportedModels);
        setStatus("error");
      }
    } catch {
      setEnabled(previous.enabled);
      setTier(previous.tier);
      setSupportedModels(previous.supportedModels);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const toggleModel = (slug: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...supportedModels, slug]))
      : supportedModels.filter((m) => m !== slug);
    save({ supportedModels: next });
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            bolt
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("codexFastTierTitle")}</h3>
          <p className="text-sm text-text-muted">{t("codexFastTierDesc")}</p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          {status === "error" && (
            <span className="text-xs font-medium text-rose-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>{" "}
              {t("codexFastTierSaveError")}
            </span>
          )}
          <Toggle
            checked={enabled}
            onChange={(value) => save({ enabled: value })}
            disabled={loading || saving}
            ariaLabel={t("codexFastTierTitle")}
          />
        </div>
      </div>

      {enabled && (
        <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
          <Select
            label={t("codexFastTierTierLabel")}
            value={tier}
            disabled={loading || saving}
            onChange={(e) => save({ tier: e.target.value as TierValue })}
            options={[
              { value: "priority", label: t("codexFastTierTierPriority") },
              { value: "flex", label: t("codexFastTierTierFlex") },
              { value: "default", label: t("codexFastTierTierDefault") },
            ]}
          />

          <div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-text-main hover:text-text-muted"
              onClick={() => setModelsOpen((open) => !open)}
              aria-expanded={modelsOpen}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {modelsOpen ? "expand_less" : "expand_more"}
              </span>
              {t("codexFastTierModelsLabel")}
              <span className="ml-1 text-xs text-text-muted">({supportedModels.length})</span>
            </button>
            {modelsOpen && (
              <div className="mt-3 pl-6 flex flex-col gap-2">
                <p className="text-xs text-text-muted/80">{t("codexFastTierModelsHint")}</p>
                {allCatalogModels.map((slug) => {
                  const checked = supportedModels.includes(slug);
                  return (
                    <label key={slug} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={checked}
                        disabled={loading || saving}
                        onChange={(e) => toggleModel(slug, e.target.checked)}
                        aria-label={t("codexFastTierModelCheckbox", { model: slug })}
                      />
                      <span className="font-mono text-xs">{slug}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-text-muted/80 flex items-start gap-1.5 leading-relaxed">
        <span className="material-symbols-outlined text-[14px] mt-0.5">info</span>
        <span>{t("codexFastTierHint")}</span>
      </p>
    </Card>
  );
}
