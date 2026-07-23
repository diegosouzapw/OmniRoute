"use client";

import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("chaosConfig");
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
        setMessage({ type: "success", text: "Config reset to defaults" });
      } else {
        const err = await res.json().catch(() => ({ error: "Reset failed" }));
        setMessage({ type: "error", text: err.error || "Reset failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to reset config" });
    } finally {
      setSaving(false);
    }
  }, [setConfig]);

  return { t, saving, message, setMessage, saveConfig, resetConfig };
}
