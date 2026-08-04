"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Toggle } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

type ModelLockoutSettings = {
  enabled: boolean;
  errorCodes: number[];
  baseCooldownMs: number;
  maxCooldownMs: number;
  maxBackoffSteps: number;
  useExponentialBackoff: boolean;
};

const DEFAULTS: ModelLockoutSettings = {
  enabled: false,
  errorCodes: [403, 404, 429, 502, 503, 504],
  baseCooldownMs: 120_000,
  maxCooldownMs: 1_800_000,
  maxBackoffSteps: 10,
  useExponentialBackoff: true,
};

function NumberField({
  label,
  value,
  suffix,
  min = 0,
  max,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  max?: number;
  hint?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center justify-between text-xs text-text-muted">
        <span>{label}</span>
        {hint ? <span className="text-text-soft">{hint}</span> : null}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => {
            if (event.target.value === "") return;
            const nextValue = Number(event.target.value);
            if (Number.isFinite(nextValue)) {
              onChange(nextValue);
            }
          }}
          className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm"
        />
        {suffix ? <span className="text-xs text-text-muted">{suffix}</span> : null}
      </div>
    </label>
  );
}

export default function ModelLockoutCard() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const notify = useNotificationStore();

  const [data, setData] = useState<ModelLockoutSettings>(DEFAULTS);
  const [draft, setDraft] = useState<ModelLockoutSettings>(DEFAULTS);
  const [errorCodesInput, setErrorCodesInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!mounted) return;

        const raw = (json as Record<string, unknown>).modelLockout as
          Record<string, unknown> | undefined;

        const parsed: ModelLockoutSettings = {
          enabled: typeof raw?.enabled === "boolean" ? raw.enabled : DEFAULTS.enabled,
          errorCodes: Array.isArray(raw?.errorCodes)
            ? [...(raw.errorCodes as number[])].sort((a, b) => a - b)
            : [...DEFAULTS.errorCodes].sort((a, b) => a - b),
          baseCooldownMs:
            typeof raw?.baseCooldownMs === "number" ? raw.baseCooldownMs : DEFAULTS.baseCooldownMs,
          maxCooldownMs:
            typeof raw?.maxCooldownMs === "number" ? raw.maxCooldownMs : DEFAULTS.maxCooldownMs,
          maxBackoffSteps:
            typeof raw?.maxBackoffSteps === "number"
              ? raw.maxBackoffSteps
              : DEFAULTS.maxBackoffSteps,
          useExponentialBackoff:
            typeof raw?.useExponentialBackoff === "boolean"
              ? raw.useExponentialBackoff
              : DEFAULTS.useExponentialBackoff,
        };

        setData(parsed);
        setDraft(parsed);
        setErrorCodesInput("");
      } catch (error) {
        notify.error(error instanceof Error ? error.message : t("modelLockoutLoadFailed"));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();
    return () => {
      mounted = false;
    };
  }, [notify, t]);

  const hasChanges =
    draft.enabled !== data.enabled ||
    JSON.stringify([...draft.errorCodes].sort((a, b) => a - b)) !==
      JSON.stringify([...data.errorCodes].sort((a, b) => a - b)) ||
    draft.baseCooldownMs !== data.baseCooldownMs ||
    draft.maxCooldownMs !== data.maxCooldownMs ||
    draft.useExponentialBackoff !== data.useExponentialBackoff ||
    draft.maxBackoffSteps !== data.maxBackoffSteps;

  function validateDraft(d: ModelLockoutSettings): string | null {
    if (d.baseCooldownMs < 5000 || d.baseCooldownMs > 600000)
      return t("modelLockoutBaseRangeError");
    if (d.maxCooldownMs < 5000 || d.maxCooldownMs > 3600000) return t("modelLockoutMaxRangeError");
    if (d.maxCooldownMs < d.baseCooldownMs) return t("modelLockoutOrderError");
    if (d.maxBackoffSteps < 0 || d.maxBackoffSteps > 20) return t("modelLockoutStepsRangeError");
    return null;
  }

  const handleSave = async () => {
    const validationError = validateDraft(draft);
    if (validationError) {
      notify.error(validationError);
      return;
    }
    setSaving(true);
    const saveDraft = { ...draft, errorCodes: draft.errorCodes };
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelLockout: saveDraft }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const issues = err?.error?.issues ?? err?.error?.details;
        if (Array.isArray(issues) && issues.length > 0) {
          const fieldLabels: Record<string, string> = {
            "modelLockout.baseCooldownMs": t("modelLockoutBaseCooldown"),
            "modelLockout.maxCooldownMs": t("modelLockoutMaxCooldown"),
            "modelLockout.maxBackoffSteps": t("modelLockoutMaxBackoffSteps"),
            "modelLockout.errorCodes": t("modelLockoutErrorCodes"),
          };
          const msg = issues
            .map(
              (d: { path?: (string | number)[]; message?: string }) =>
                `${fieldLabels[String(d.path?.[0])] || String(d.path?.[0] || "")}: ${d.message}`
            )
            .filter(Boolean)
            .join("\n");
          if (msg) throw new Error(msg);
        }
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }
      const json = await res.json();
      const raw = (json as Record<string, unknown>).modelLockout as
        Record<string, unknown> | undefined;
      if (raw) {
        setData({
          enabled: typeof raw.enabled === "boolean" ? raw.enabled : saveDraft.enabled,
          errorCodes: Array.isArray(raw.errorCodes)
            ? [...(raw.errorCodes as number[])].sort((a, b) => a - b)
            : [...saveDraft.errorCodes].sort((a, b) => a - b),
          baseCooldownMs:
            typeof raw.baseCooldownMs === "number" ? raw.baseCooldownMs : saveDraft.baseCooldownMs,
          maxCooldownMs:
            typeof raw.maxCooldownMs === "number" ? raw.maxCooldownMs : saveDraft.maxCooldownMs,
          maxBackoffSteps:
            typeof raw.maxBackoffSteps === "number"
              ? raw.maxBackoffSteps
              : saveDraft.maxBackoffSteps,
          useExponentialBackoff:
            typeof raw.useExponentialBackoff === "boolean"
              ? raw.useExponentialBackoff
              : saveDraft.useExponentialBackoff,
        });
      } else {
        setData(saveDraft);
      }
      setErrorCodesInput("");
      notify.success(t("savedSuccessfully"));
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("modelLockoutSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setDraft(data);
    setErrorCodesInput("");
  };

  const commitErrorCodes = (inputOverride?: string) => {
    const raw = inputOverride ?? errorCodesInput;
    const code = Number(raw);
    if (!Number.isFinite(code) || code < 100 || code > 599) return;
    if (draft.errorCodes.includes(code)) {
      setErrorCodesInput("");
      return;
    }
    setDraft((prev) => ({
      ...prev,
      errorCodes: [...prev.errorCodes, code].sort((a, b) => a - b),
    }));
    setErrorCodesInput("");
  };

  const removeErrorCode = (code: number) => {
    setDraft((prev) => ({
      ...prev,
      errorCodes: prev.errorCodes.filter((c) => c !== code),
    }));
  };

  const handleResetDefaults = () => {
    setDraft({
      ...DEFAULTS,
      errorCodes: [...DEFAULTS.errorCodes].sort((a, b) => a - b),
    });
    setErrorCodesInput("");
  };

  const fmt = (ms: number) => {
    if (ms >= 60_000) return `${ms / 1000 / 60}m`;
    if (ms >= 1_000) return `${ms / 1000}s`;
    return `${ms}ms`;
  };

  const notifyRef = useRef<HTMLAudioElement | null>(null);
  const playNotify = useCallback(() => {
    try {
      if (notifyRef.current) {
        notifyRef.current.pause();
        notifyRef.current.currentTime = 0;
      } else {
        notifyRef.current = new Audio("/audio/ui-notify.mp3");
        notifyRef.current.volume = 0.3;
      }
      void notifyRef.current.play();
    } catch {
      // Audio is optional.
    }
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          {t("modelLockoutLoading")}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">gpp_maybe</span>
            <h2 className="text-lg font-bold">{t("modelLockout")}</h2>
          </div>
          <p className="text-sm text-text-muted">{t("modelLockoutPageDescription")}</p>
        </div>
        {hasChanges ? (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={handleReset}>
              {tc("cancel")}
            </Button>
            <Button size="sm" variant="primary" icon="save" onClick={handleSave} disabled={saving}>
              {saving ? tc("saving") : tc("save")}
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="secondary" onClick={handleResetDefaults}>
            {t("resetDefaults")}
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Master toggle */}
        <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
          <Toggle
            checked={draft.enabled}
            onChange={(checked) => {
              setDraft((prev) => ({ ...prev, enabled: checked }));
              playNotify();
            }}
            label={t("modelLockoutEnabled")}
            description={t("modelLockoutEnabledDescription")}
          />
        </div>

        {/* Error codes — tag input */}
        <div className="rounded-lg border border-border bg-bg-subtle p-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-main">
              {t("modelLockoutErrorCodes")}
            </span>
            <span className="text-xs text-text-muted">
              {t("modelLockoutErrorCodesDescription")}
            </span>
          </label>

          {/* Chips row */}
          {draft.errorCodes.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {draft.errorCodes.map((code) => (
                <span
                  key={code}
                  className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary border border-primary/20 px-2 py-1 text-sm font-medium"
                >
                  {code}
                  <button
                    type="button"
                    onClick={() => removeErrorCode(code)}
                    className="inline-flex size-4 items-center justify-center rounded-sm hover:bg-primary/20 transition-colors"
                    aria-label={t("removeErrorCode", { code })}
                  >
                    <span className="material-symbols-outlined text-sm leading-none">close</span>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={errorCodesInput}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw.length <= 3) setErrorCodesInput(raw);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitErrorCodes();
                }
              }}
              placeholder={t("addErrorCode")}
              className="w-32 rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
            />
            <button
              type="button"
              onClick={() => commitErrorCodes()}
              disabled={!errorCodesInput.trim()}
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-muted hover:text-text-main hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {tc("add")}
            </button>
          </div>

          {/* Suggested common codes — chips as clickable suggestions */}
          {draft.errorCodes.length === 0 && errorCodesInput === "" && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs text-text-muted">{t("suggestions")}</span>
              {[403, 404, 429, 502, 503, 504].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => commitErrorCodes(String(code))}
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface text-xs text-text-muted border border-border/40 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  +{code}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cooldowns - grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-bg-subtle p-4">
            <NumberField
              label={t("modelLockoutBaseCooldown")}
              value={draft.baseCooldownMs}
              min={5000}
              max={600000}
              suffix="ms"
              hint="5,000ms — 600,000ms"
              onChange={(baseCooldownMs) => setDraft((prev) => ({ ...prev, baseCooldownMs }))}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              {t("modelLockoutBaseCooldownDescription")}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-bg-subtle p-4">
            <NumberField
              label={t("modelLockoutMaxCooldown")}
              value={draft.maxCooldownMs}
              min={draft.baseCooldownMs}
              max={3600000}
              suffix="ms"
              hint={t("modelLockoutMaxCooldownHint")}
              onChange={(maxCooldownMs) => setDraft((prev) => ({ ...prev, maxCooldownMs }))}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              {t("modelLockoutMaxCooldownDescription")}
            </p>
          </div>
        </div>

        {/* Exponential backoff */}
        <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
          <Toggle
            checked={draft.useExponentialBackoff}
            onChange={(checked) => {
              setDraft((prev) => ({
                ...prev,
                useExponentialBackoff: checked,
              }));
              playNotify();
            }}
            label={t("modelLockoutExponentialBackoff")}
            description={t("modelLockoutExponentialBackoffDescription")}
          />
        </div>

        {/* Max backoff steps */}
        <div className="rounded-lg border border-border bg-bg-subtle p-4">
          <NumberField
            label={t("modelLockoutMaxBackoffSteps")}
            value={draft.maxBackoffSteps}
            min={0}
            onChange={(maxBackoffSteps) => setDraft((prev) => ({ ...prev, maxBackoffSteps }))}
          />
          <p className="mt-1.5 text-xs text-text-muted">
            {t("modelLockoutMaxBackoffStepsDescription")}
          </p>
        </div>
      </div>
    </Card>
  );
}
