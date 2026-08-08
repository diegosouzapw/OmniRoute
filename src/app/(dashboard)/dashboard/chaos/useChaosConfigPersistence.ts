"use client";

import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { chaosText, type ChaosTranslator } from "./chaosI18n";
import type { ChaosPageConfig, ChaosPageMessage } from "./chaosPageTypes";

/**
 * Save / reset persistence for the Chaos Mode config page. Extracted out of
 * the page component to keep it under the complexity/size ratchet
 * (config/quality/complexity-baseline.json).
 */
export function useChaosConfigPersistence(
  config: ChaosPageConfig,
  setConfig: Dispatch<SetStateAction<ChaosPageConfig>>
) {
  const t = useTranslations("chaosConfig") as ChaosTranslator;
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<ChaosPageMessage>(null);

  const saveConfig = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/chaos/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
        setMessage({ type: "success", text: t("configSaved") });
      } else {
        setMessage({ type: "error", text: t("configError") });
      }
    } catch {
      setMessage({ type: "error", text: t("configError") });
    } finally {
      setSaving(false);
    }
  }, [config, setConfig, t]);

  const resetConfig = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/chaos/config", { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
        setMessage({
          type: "success",
          text: chaosText(t, "resetSuccess", "Config reset to defaults"),
        });
      } else {
        const err = await res.json().catch(() => ({ error: null }));
        setMessage({
          type: "error",
          text: err.error || chaosText(t, "resetFailed", "Reset failed"),
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: chaosText(t, "resetFailed", "Failed to reset config"),
      });
    } finally {
      setSaving(false);
    }
  }, [setConfig, t]);

  return { t, saving, message, setMessage, saveConfig, resetConfig };
}
