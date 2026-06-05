"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, Select } from "@/shared/components";
import {
  DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE,
  RESPONSES_PREVIOUS_RESPONSE_ID_MODES,
  type ResponsesPreviousResponseIdMode,
} from "@/shared/constants/responsesPreviousResponseId";

const MODE_SET = new Set<string>(RESPONSES_PREVIOUS_RESPONSE_ID_MODES);

function normalizeMode(value: unknown): ResponsesPreviousResponseIdMode {
  return typeof value === "string" && MODE_SET.has(value)
    ? (value as ResponsesPreviousResponseIdMode)
    : DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE;
}

export default function ResponsesStatePolicyTab() {
  const [mode, setMode] = useState<ResponsesPreviousResponseIdMode>(
    DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE
  );
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
        setMode(normalizeMode(data?.responsesPreviousResponseIdMode));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async (nextMode: ResponsesPreviousResponseIdMode) => {
    if (saving || loading || nextMode === mode) return;
    const previousMode = mode;
    setMode(nextMode);
    setSaving(true);
    setStatus("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responsesPreviousResponseIdMode: nextMode }),
      });
      if (!res.ok) {
        setMode(previousMode);
        setStatus("error");
        return;
      }
      setStatus("saved");
      setTimeout(() => setStatus(""), 2000);
    } catch {
      setMode(previousMode);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            account_tree
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("responsesStateTitle")}</h3>
          <p className="text-sm text-text-muted">{t("responsesStateDesc")}</p>
        </div>
        <div className="min-w-[7rem] flex justify-end">
          {status === "saved" && (
            <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          {status === "error" && (
            <span className="text-xs font-medium text-rose-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>{" "}
              {t("responsesStateSaveError")}
            </span>
          )}
        </div>
      </div>

      <Select
        label={t("responsesStateModeLabel")}
        value={mode}
        disabled={loading || saving}
        onChange={(e) => save(normalizeMode(e.target.value))}
        options={[
          { value: "auto", label: t("responsesStateModeAuto") },
          { value: "strip", label: t("responsesStateModeStrip") },
          { value: "preserve", label: t("responsesStateModePreserve") },
        ]}
      />

      <p className="mt-4 text-xs text-text-muted/80 flex items-start gap-1.5 leading-relaxed">
        <span className="material-symbols-outlined text-[14px] mt-0.5">info</span>
        <span>{t("responsesStateHint")}</span>
      </p>
    </Card>
  );
}
