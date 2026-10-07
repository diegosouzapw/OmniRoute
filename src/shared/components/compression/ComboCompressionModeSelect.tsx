"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export interface ComboCompressionModeSelectCombo {
  id: string;
  config?: { compressionMode?: string } | null;
  compressionOverride?: string;
}

export interface ComboCompressionModeSelectProps {
  combo: ComboCompressionModeSelectCombo;
  disabled?: boolean;
  title?: string;
  className?: string;
  onSaved?: (nextConfig: Record<string, unknown>) => void;
}

const OPTIONS = [
  { value: "", key: "default" },
  { value: "off", key: "off" },
  { value: "lite", key: "lite" },
  { value: "standard", key: "standard" },
  { value: "aggressive", key: "aggressive" },
  { value: "ultra", key: "ultra" },
  { value: "codex-responses", key: "responsesToolOutput" },
];

function getInitialCompressionMode(combo: ComboCompressionModeSelectCombo): string {
  const hasRuntimeConfig = combo?.config && typeof combo.config === "object";
  if (typeof combo?.config?.compressionMode === "string") {
    return combo.config.compressionMode;
  }
  return hasRuntimeConfig ? "" : combo.compressionOverride || "";
}

// Extracted from src/app/(dashboard)/dashboard/combos/page.tsx so both the combo card
// and the Compression Combos page (#6760) can persist the same per-routing-combo
// compression-mode override through the same `PUT /api/combos/{id}` endpoint.
//
// This component owns its option labels so the combo and compression-combo screens
// share the same localized control without requiring page-level translation hooks.
export function ComboCompressionModeSelect({
  combo,
  disabled,
  title,
  className,
  onSaved,
}: ComboCompressionModeSelectProps) {
  const t = useTranslations("compressionEngineConfig");
  const initialCompressionMode = getInitialCompressionMode(combo);
  const [compressionOverride, setCompressionOverride] = useState(initialCompressionMode);
  const [isSaving, setIsSaving] = useState(false);

  // Re-sync the select when the combo's persisted mode changes (render-time
  // adjustment per react.dev "You Might Not Need an Effect" — replaces the old
  // mirror effect that called setState synchronously).
  const [prevInitialCompressionMode, setPrevInitialCompressionMode] =
    useState(initialCompressionMode);
  if (initialCompressionMode !== prevInitialCompressionMode) {
    setPrevInitialCompressionMode(initialCompressionMode);
    setCompressionOverride(initialCompressionMode);
  }

  const handleChange = async (value: string) => {
    setCompressionOverride(value);
    setIsSaving(true);
    const nextConfig: Record<string, unknown> = { ...(combo.config || {}) };
    if (value) {
      nextConfig.compressionMode = value;
    } else {
      delete nextConfig.compressionMode;
    }
    try {
      const response = await fetch(`/api/combos/${combo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: nextConfig }),
      });
      if (!response.ok) {
        console.error("Failed to update compression override");
        setCompressionOverride(initialCompressionMode);
        return;
      }
      onSaved?.(nextConfig);
    } catch (error) {
      console.error("Error updating compression override:", error);
      setCompressionOverride(initialCompressionMode);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <select
      value={compressionOverride}
      onChange={(e) => handleChange(e.target.value)}
      disabled={disabled || isSaving}
      className={
        className ||
        "text-xs py-1 px-2 rounded border border-black/10 dark:border-white/10 bg-surface text-text-main focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
      }
      title={title}
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value} className="bg-surface text-text-main">
          {t(`modeOptions.${option.key}`)}
        </option>
      ))}
    </select>
  );
}

export default ComboCompressionModeSelect;
