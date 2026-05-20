"use client";

import { useEffect, useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";
import { isCodexGlobalFastServiceTierEnabled } from "@/lib/providers/codexFastTier";

export default function CodexFastTierTab() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setEnabled(isCodexGlobalFastServiceTierEnabled(data));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async (next: boolean) => {
    if (saving || loading) return;
    setSaving(true);
    setStatus("");
    const previous = enabled;
    setEnabled(next);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codexServiceTier: { enabled: next } }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setEnabled(previous);
        setStatus("error");
      }
    } catch {
      setEnabled(previous);
      setStatus("error");
    } finally {
      setSaving(false);
    }
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
            onChange={(value) => save(value)}
            disabled={loading || saving}
            ariaLabel={t("codexFastTierTitle")}
          />
        </div>
      </div>

      <p className="text-xs text-text-muted/80 flex items-start gap-1.5 leading-relaxed">
        <span className="material-symbols-outlined text-[14px] mt-0.5">info</span>
        <span>{t("codexFastTierHint")}</span>
      </p>
    </Card>
  );
}
