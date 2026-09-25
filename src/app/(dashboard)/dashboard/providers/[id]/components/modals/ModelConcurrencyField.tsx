"use client";

import { useTranslations } from "next-intl";
import { Textarea } from "@/shared/components";

export interface ModelConcurrencyFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/** Per-model concurrency caps editor (`model=cap`, one per line). */
export default function ModelConcurrencyField({ value, onChange }: ModelConcurrencyFieldProps) {
  const t = useTranslations("providers");
  return (
    <div className="col-span-2">
      <label className="block text-xs font-medium text-text-main mb-1">
        {t("rateLimitOverridesModelConcurrencyLabel")}
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("rateLimitOverridesModelConcurrencyPlaceholder")}
        rows={3}
        data-testid="model-concurrency-input"
      />
      <p className="text-xs text-text-muted mt-1">{t("rateLimitOverridesModelConcurrencyHint")}</p>
    </div>
  );
}
