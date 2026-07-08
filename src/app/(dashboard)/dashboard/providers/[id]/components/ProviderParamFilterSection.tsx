"use client";

/**
 * ProviderParamFilterSection — Denylist/allowlist config for provider-level
 * request parameter filtering (#6625).
 *
 * Renders a card on the provider detail page where operators can configure
 * which request params to strip (block) or selectively re-add (allow) before
 * sending to the upstream provider.
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";

interface ProviderParamFilterSectionProps {
  providerId: string;
}

interface ParamFilterConfig {
  block: string[];
  allow: string[];
  models?: Record<string, { block?: string[]; allow?: string[] }>;
  autoLearn: boolean;
}

function parseCommaList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatCommaList(arr: string[]): string {
  return arr.join(", ");
}

export default function ProviderParamFilterSection({
  providerId,
}: ProviderParamFilterSectionProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [config, setConfig] = useState<ParamFilterConfig>({
    block: [],
    allow: [],
    autoLearn: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Form-local draft values (not committed until save)
  const [blockText, setBlockText] = useState("");
  const [allowText, setAllowText] = useState("");
  const [autoLearn, setAutoLearn] = useState(false);

  const loadConfig = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/providers/${providerId}/param-filters`);
      const data = await res.json();
      const cfg: ParamFilterConfig = {
        block: Array.isArray(data.block) ? data.block : [],
        allow: Array.isArray(data.allow) ? data.allow : [],
        autoLearn: typeof data.autoLearn === "boolean" ? data.autoLearn : false,
      };
      setConfig(cfg);
      setBlockText(formatCommaList(cfg.block));
      setAllowText(formatCommaList(cfg.allow));
      setAutoLearn(cfg.autoLearn);
    } catch (err) {
      notify.notify(
        t("paramFiltersLoadError", {
          error: err instanceof Error ? err.message : String(err),
        }),
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [providerId, notify, t]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const block = parseCommaList(blockText);
      const allow = parseCommaList(allowText);
      const body: ParamFilterConfig = { block, allow, autoLearn };

      const res = await fetch(`/api/providers/${providerId}/param-filters`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      setConfig(body);
      setDirty(false);
      notify.notify(t("paramFiltersSaveSuccess"), "success");
    } catch (err) {
      notify.notify(
        t("paramFiltersSaveError", {
          error: err instanceof Error ? err.message : String(err),
        }),
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/providers/${providerId}/param-filters`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      setConfig({ block: [], allow: [], autoLearn: false });
      setBlockText("");
      setAllowText("");
      setAutoLearn(false);
      setDirty(false);
      notify.notify(t("paramFiltersResetSuccess"), "success");
    } catch (err) {
      notify.notify(
        t("paramFiltersResetError", {
          error: err instanceof Error ? err.message : String(err),
        }),
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
        <div className="h-5 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-4 h-20 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <h2 className="text-base font-semibold text-text-main mb-1">
        {t("paramFiltersSectionTitle")}
      </h2>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {t.rich("paramFiltersSectionHint", {
          code: (chunks) => (
            <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded">{chunks}</code>
          ),
        })}
      </p>

      {/* Blocked params */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-text-muted mb-1.5">
          {t("paramFiltersBlockedLabel")}
        </label>
        <input
          type="text"
          value={blockText}
          onChange={(e) => {
            setBlockText(e.target.value);
            setDirty(true);
          }}
          placeholder="thinking, reasoning_budget, … (comma-separated)"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary dark:bg-zinc-900"
        />
        <p className="text-[11px] text-text-muted mt-1">{t("paramFiltersBlockedHint")}</p>
      </div>

      {/* Allowed params */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-text-muted mb-1.5">
          {t("paramFiltersAllowedLabel")}
        </label>
        <input
          type="text"
          value={allowText}
          onChange={(e) => {
            setAllowText(e.target.value);
            setDirty(true);
          }}
          placeholder="reasoning, … (comma-separated)"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary dark:bg-zinc-900"
        />
        <p className="text-[11px] text-text-muted mt-1">{t("paramFiltersAllowedHint")}</p>
      </div>

      {/* Auto-learn toggle */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoLearn}
            onChange={(e) => {
              setAutoLearn(e.target.checked);
              setDirty(true);
            }}
            className="rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-xs font-medium text-text-main">
            {t("paramFiltersAutoLearnLabel")}
          </span>
        </label>
        <p className="text-[11px] text-text-muted mt-1 ml-5">{t("paramFiltersAutoLearnHint")}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !dirty}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <span className="material-symbols-outlined text-sm animate-spin">
              progress_activity
            </span>
          ) : (
            <span className="material-symbols-outlined text-sm">save</span>
          )}
          {saving ? t("paramFiltersSaving") : t("paramFiltersSaveChanges")}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text-main hover:border-primary/40 disabled:opacity-50 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          {t("paramFiltersResetToDefault")}
        </button>
      </div>
    </div>
  );
}
