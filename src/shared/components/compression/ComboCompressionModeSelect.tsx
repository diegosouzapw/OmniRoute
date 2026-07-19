"use client";

import { useEffect, useState } from "react";

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

const OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "Default" },
  { value: "off", label: "Off" },
  { value: "lite", label: "Lite" },
  { value: "standard", label: "Standard" },
  { value: "aggressive", label: "Aggressive" },
  { value: "ultra", label: "Ultra" },
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
// Deliberately does NOT call `useTranslations` — this component is rendered from
// CompressionCombosPageClient.tsx, which avoids page-level `useTranslations` to
// prevent a documented production hydration regression. Callers that want localized
// labels pass a resolved `title` string; option labels stay literal English.
export function ComboCompressionModeSelect({
  combo,
  disabled,
  title,
  className,
  onSaved,
}: ComboCompressionModeSelectProps) {
  const initialCompressionMode = getInitialCompressionMode(combo);
  const [compressionOverride, setCompressionOverride] = useState(initialCompressionMode);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCompressionOverride(initialCompressionMode);
  }, [initialCompressionMode]);

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
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default ComboCompressionModeSelect;
