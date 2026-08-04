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

// ---------------------------------------------------------------------------
// Fetch helpers — isolate the HTTP + response-shape concerns so the
// component's handlers stay focused on state transitions + user feedback.
// ---------------------------------------------------------------------------

async function fetchParamFilterConfig(providerId: string): Promise<ParamFilterConfig> {
  const res = await fetch(`/api/providers/${providerId}/param-filters`);
  const data = await res.json();
  return {
    block: Array.isArray(data.block) ? data.block : [],
    allow: Array.isArray(data.allow) ? data.allow : [],
    autoLearn: typeof data.autoLearn === "boolean" ? data.autoLearn : false,
  };
}

async function throwOnErrorResponse(res: Response): Promise<void> {
  if (res.ok) return;
  const errData = await res.json().catch(() => ({}));
  throw new Error(errData.error || `HTTP ${res.status}`);
}

async function putParamFilterConfig(providerId: string, body: ParamFilterConfig): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/param-filters`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  await throwOnErrorResponse(res);
}

async function deleteParamFilterConfig(providerId: string): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/param-filters`, { method: "DELETE" });
  await throwOnErrorResponse(res);
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// ---------------------------------------------------------------------------
// State hook — owns config load/save/reset so the component body stays JSX-only.
// ---------------------------------------------------------------------------

type Translate = (key: string, values?: Record<string, string>) => string;

// Wraps a raw state setter so updating the draft value also marks the form
// dirty — used for the three form-local draft fields below.
function useDirtySetter<T>(setValue: (value: T) => void, setDirty: (value: boolean) => void) {
  return useCallback(
    (value: T) => {
      setValue(value);
      setDirty(true);
    },
    [setValue, setDirty]
  );
}

function useProviderParamFilterConfig(providerId: string, t: Translate) {
  const notify = useNotificationStore();
  const [, setConfig] = useState<ParamFilterConfig>({ block: [], allow: [], autoLearn: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [blockText, setBlockTextState] = useState("");
  const [allowText, setAllowTextState] = useState("");
  const [autoLearn, setAutoLearnState] = useState(false);

  const setBlockText = useDirtySetter(setBlockTextState, setDirty);
  const setAllowText = useDirtySetter(setAllowTextState, setDirty);
  const setAutoLearn = useDirtySetter(setAutoLearnState, setDirty);

  const loadConfig = useCallback(async () => {
    setLoading(true);
    try {
      const cfg = await fetchParamFilterConfig(providerId);
      setConfig(cfg);
      setBlockTextState(formatCommaList(cfg.block));
      setAllowTextState(formatCommaList(cfg.allow));
      setAutoLearnState(cfg.autoLearn);
    } catch (err) {
      notify.notify(t("paramFiltersLoadError", { error: errorMessage(err) }), "error");
    } finally {
      setLoading(false);
    }
  }, [providerId, notify, t]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const body: ParamFilterConfig = {
        block: parseCommaList(blockText),
        allow: parseCommaList(allowText),
        autoLearn,
      };
      await putParamFilterConfig(providerId, body);
      setConfig(body);
      setDirty(false);
      notify.notify(t("paramFiltersSaveSuccess"), "success");
    } catch (err) {
      notify.notify(t("paramFiltersSaveError", { error: errorMessage(err) }), "error");
    } finally {
      setSaving(false);
    }
  }, [providerId, blockText, allowText, autoLearn, notify, t]);

  const handleReset = useCallback(async () => {
    setSaving(true);
    try {
      await deleteParamFilterConfig(providerId);
      setConfig({ block: [], allow: [], autoLearn: false });
      setBlockTextState("");
      setAllowTextState("");
      setAutoLearnState(false);
      setDirty(false);
      notify.notify(t("paramFiltersResetSuccess"), "success");
    } catch (err) {
      notify.notify(t("paramFiltersResetError", { error: errorMessage(err) }), "error");
    } finally {
      setSaving(false);
    }
  }, [providerId, notify, t]);

  return {
    loading,
    saving,
    dirty,
    blockText,
    allowText,
    autoLearn,
    setBlockText,
    setAllowText,
    setAutoLearn,
    handleSave,
    handleReset,
  };
}

// ---------------------------------------------------------------------------
// Presentational sub-components
// ---------------------------------------------------------------------------

function ParamFilterSectionSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <div className="h-5 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-20 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}

function ParamFilterSectionHeader({ t }: { t: (key: string) => string }) {
  return (
    <>
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
    </>
  );
}

interface ParamListFieldProps {
  label: string;
  hint: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function ParamListField({ label, hint, value, placeholder, onChange }: ParamListFieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-text-muted mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary dark:bg-zinc-900"
      />
      <p className="text-[11px] text-text-muted mt-1">{hint}</p>
    </div>
  );
}

interface AutoLearnToggleProps {
  t: (key: string) => string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function AutoLearnToggle({ t, checked, onChange }: AutoLearnToggleProps) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span className="text-xs font-medium text-text-main">
          {t("paramFiltersAutoLearnLabel")}
        </span>
      </label>
      <p className="text-[11px] text-text-muted mt-1 ml-5">{t("paramFiltersAutoLearnHint")}</p>
    </div>
  );
}

interface ParamFilterActionsProps {
  t: (key: string) => string;
  saving: boolean;
  dirty: boolean;
  onSave: () => void;
  onReset: () => void;
}

function ParamFilterActions({ t, saving, dirty, onSave, onReset }: ParamFilterActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onSave}
        disabled={saving || !dirty}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {saving ? (
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        ) : (
          <span className="material-symbols-outlined text-sm">save</span>
        )}
        {saving ? t("paramFiltersSaving") : t("paramFiltersSaveChanges")}
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={saving}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text-main hover:border-primary/40 disabled:opacity-50 transition-colors"
      >
        <span className="material-symbols-outlined text-sm">delete</span>
        {t("paramFiltersResetToDefault")}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProviderParamFilterSection({
  providerId,
}: ProviderParamFilterSectionProps) {
  const t = useTranslations("providers");
  const {
    loading,
    saving,
    dirty,
    blockText,
    allowText,
    autoLearn,
    setBlockText,
    setAllowText,
    setAutoLearn,
    handleSave,
    handleReset,
  } = useProviderParamFilterConfig(providerId, t);

  if (loading) {
    return <ParamFilterSectionSkeleton />;
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <ParamFilterSectionHeader t={t} />
      <ParamListField
        label={t("paramFiltersBlockedLabel")}
        hint={t("paramFiltersBlockedHint")}
        value={blockText}
        placeholder={t("paramFiltersBlockedPlaceholder")}
        onChange={setBlockText}
      />
      <ParamListField
        label={t("paramFiltersAllowedLabel")}
        hint={t("paramFiltersAllowedHint")}
        value={allowText}
        placeholder={t("paramFiltersAllowedPlaceholder")}
        onChange={setAllowText}
      />
      <AutoLearnToggle t={t} checked={autoLearn} onChange={setAutoLearn} />
      <ParamFilterActions
        t={t}
        saving={saving}
        dirty={dirty}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}
