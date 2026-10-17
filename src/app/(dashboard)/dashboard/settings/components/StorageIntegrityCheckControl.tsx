"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";

type IntegrityState = {
  integrityCheck: "ok" | "error" | null;
  lastIntegrityCheckAt: string | null;
};

function formatCheckedAt(value: string | null, locale: string): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleString(locale);
}

function applyApiState(
  setState: React.Dispatch<React.SetStateAction<IntegrityState>>,
  data: {
    stats?: {
      integrityCheck?: IntegrityState["integrityCheck"];
      lastIntegrityCheckAt?: string | null;
    } | null;
  } | null
) {
  if (!data?.stats) return;
  setState({
    integrityCheck: data.stats.integrityCheck ?? null,
    lastIntegrityCheckAt: data.stats.lastIntegrityCheckAt ?? null,
  });
}

function useStoredIntegrity(setState: React.Dispatch<React.SetStateAction<IntegrityState>>) {
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/settings/database");
        if (!res.ok || cancelled) return;
        const data = await res.json().catch(() => null);
        if (!cancelled) applyApiState(setState, data);
      } catch {
        // Keep the last known state on load failure.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setState]);
}

export default function StorageIntegrityCheckControl() {
  const locale = useLocale();
  const t = useTranslations("settings");
  const [state, setState] = useState<IntegrityState>({
    integrityCheck: null,
    lastIntegrityCheckAt: null,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useStoredIntegrity(setState);

  const checkedLabel = formatCheckedAt(state.lastIntegrityCheckAt, locale);

  const handleRunCheck = async () => {
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/settings/database/integrity-check", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setState({
          integrityCheck: data?.integrityCheck ?? null,
          lastIntegrityCheckAt: data?.lastIntegrityCheckAt ?? null,
        });
        setStatus({ type: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: extractApiErrorMessage(data, t("storageIntegrityCheckFailed")),
        });
      }
    } catch {
      setStatus({ type: "error", message: t("storageIntegrityCheckFailed") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-bg border border-border mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{t("storageIntegrityCheck")}</p>
          <p className="text-sm text-text-muted">
            {state.integrityCheck === "ok" ? (
              <span className="text-green-500">{t("storageIntegrityOk")}</span>
            ) : state.integrityCheck === "error" ? (
              <span className="text-red-500">{t("storageIntegrityError")}</span>
            ) : (
              t("storageIntegrityNotChecked")
            )}
            {checkedLabel ? ` · ${t("storageIntegrityLastCheck", { date: checkedLabel })}` : ""}
          </p>
        </div>
        <Button onClick={handleRunCheck} loading={loading}>
          {t("storageIntegrityRunCheck")}
        </Button>
      </div>
      {status.message ? (
        <div
          className="mt-3 p-3 rounded-lg text-sm bg-red-500/10 text-red-500 border border-red-500/20"
          role="alert"
        >
          {status.message}
        </div>
      ) : null}
    </div>
  );
}
