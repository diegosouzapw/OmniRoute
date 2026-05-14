"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";

export interface QuotaCutoffModalWindow {
  /** Stable key — must match the quota name surfaced by the usage fetcher. */
  key: string;
  /** Human-readable label rendered next to the input. */
  displayName: string;
}

interface QuotaCutoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Label shown in the modal title. */
  connectionName: string;
  /** Used in the modal title for context (e.g. "(codex)"). */
  provider: string;
  /**
   * Windows this connection exposes — discovered from its live quota cache
   * so the modal works for any provider with usage data, not just providers
   * that registered with quotaPreflight at startup.
   */
  windows: QuotaCutoffModalWindow[];
  /** Currently persisted per-window overrides on the connection. */
  current: Record<string, number> | null;
  /** Per-(provider, window) defaults from resilience settings. */
  providerDefaults: Record<string, number>;
  /** Global fallback used when no provider/window default exists. */
  globalDefaultPercent: number;
  /**
   * Called when the user clicks Save. Receives the patch in the same shape
   * the API expects: each window key is either a number (set override) or
   * null (clear that window's override). `null` for the whole patch means
   * "clear every override" — currently invoked via the "Reset all" button.
   */
  onSave: (patch: Record<string, number | null> | null) => Promise<void>;
}

export default function QuotaCutoffModal({
  isOpen,
  onClose,
  connectionName,
  provider,
  windows,
  current,
  providerDefaults,
  globalDefaultPercent,
  onSave,
}: QuotaCutoffModalProps) {
  const t = useTranslations("usage");
  // Local draft: string per window so empty-string means "inherit".
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset drafts whenever the modal opens against a new connection.
  useEffect(() => {
    if (!isOpen) return;
    const initial: Record<string, string> = {};
    for (const w of windows) {
      const persisted = current?.[w.key];
      initial[w.key] = typeof persisted === "number" ? String(persisted) : "";
    }
    setDrafts(initial);
    setError(null);
  }, [isOpen, windows, current]);

  const resolveDefaultFor = (windowKey: string): number =>
    typeof providerDefaults[windowKey] === "number"
      ? providerDefaults[windowKey]
      : globalDefaultPercent;

  const buildPatch = (): Record<string, number | null> | "invalid" => {
    const patch: Record<string, number | null> = {};
    for (const w of windows) {
      const raw = (drafts[w.key] ?? "").trim();
      if (raw === "") {
        // Only emit an explicit null when there was previously an override
        // to clear; otherwise just omit the key.
        if (current?.[w.key] !== undefined) patch[w.key] = null;
        continue;
      }
      const n = Number(raw);
      if (!Number.isInteger(n) || n < 0 || n > 100) return "invalid";
      if (current?.[w.key] !== n) patch[w.key] = n;
    }
    return patch;
  };

  const handleSave = async () => {
    const patch = buildPatch();
    if (patch === "invalid") {
      setError(t("quotaThresholdInvalid"));
      return;
    }
    if (Object.keys(patch).length === 0) {
      onClose();
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(patch);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleResetAll = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(null);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const hasAnyOverride =
    current !== null && current !== undefined && Object.keys(current).length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("quotaCutoffsTitle", { name: connectionName, provider })}
      size="md"
      footer={
        <>
          {hasAnyOverride && (
            <Button variant="ghost" onClick={handleResetAll} disabled={saving}>
              {t("quotaCutoffsResetAll")}
            </Button>
          )}
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {t("save")}
          </Button>
        </>
      }
    >
      <p className="text-sm text-text-muted mb-4">{t("quotaCutoffsExplainer")}</p>
      <div className="space-y-3">
        {windows.length === 0 && (
          <div className="text-sm text-text-muted italic">{t("quotaCutoffsNoWindows")}</div>
        )}
        {windows.map((w) => {
          const persisted = current?.[w.key];
          const resolvedDefault = resolveDefaultFor(w.key);
          const placeholder = `${resolvedDefault}`;
          const isOverride =
            typeof persisted === "number" && (drafts[w.key] ?? "") === String(persisted);
          return (
            <div key={w.key} className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-main">{w.displayName}</div>
                <div className="text-[11px] text-text-muted">
                  {t("quotaCutoffsDefaultHint", { default: resolvedDefault })}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={drafts[w.key] ?? ""}
                  placeholder={placeholder}
                  disabled={saving}
                  onChange={(e) => setDrafts((prev) => ({ ...prev, [w.key]: e.target.value }))}
                  className={`w-20 px-2 py-1 text-sm text-center rounded-md border bg-transparent text-text-main focus:outline-none focus:border-primary/60 disabled:opacity-50 ${
                    isOverride ? "border-primary/40" : "border-border"
                  }`}
                />
                <span className="text-xs text-text-muted">%</span>
              </div>
            </div>
          );
        })}
      </div>
      {error && (
        <div className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}
    </Modal>
  );
}
