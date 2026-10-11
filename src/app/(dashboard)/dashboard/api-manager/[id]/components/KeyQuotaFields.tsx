"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/shared/components";
import { StatusBadge } from "./DetailsPrimitives";

interface QuotaField {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step: string;
  usage: string;
  exceeded: boolean;
}

/** The tpm / rpm / monthly-USD input grid inside {@link KeyQuotaEditor}. */
export function KeyQuotaFields({ fields }: { fields: QuotaField[] }) {
  const t = useTranslations("apiKeyDetails");

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-1">
          <Input
            label={field.label}
            type="number"
            min={0}
            step={field.step}
            inputMode="decimal"
            value={field.value}
            placeholder={t("unlimited")}
            onChange={(event) => field.onChange(event.target.value)}
          />
          <span className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-muted">
            {field.usage}
            {field.exceeded && <StatusBadge tone="bad">{t("limitExceeded")}</StatusBadge>}
          </span>
        </div>
      ))}
    </div>
  );
}
