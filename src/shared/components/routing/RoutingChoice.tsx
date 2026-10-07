"use client";

import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "../Input";
import Select from "../Select";

export type RoutingOption = { value: string; label: string };

/** Search affects suggestions only; existing and off-catalog IDs are never rewritten. */
export default function RoutingChoice({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RoutingOption[];
  required?: boolean;
}) {
  const t = useTranslations("reasoningRouting.editor");
  const id = useId();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = options.filter((option) =>
      (option.label + " " + option.value).toLowerCase().includes(term)
    );
    if (value && !matches.some((option) => option.value === value)) {
      matches.unshift({ value, label: options.find((o) => o.value === value)?.label || value });
    }
    return matches;
  }, [options, query, value]);
  return (
    <div className="min-w-0 space-y-2">
      <Input
        id={id + "-search"}
        label={t("searchChoice", { label })}
        placeholder={t("searchPlaceholder")}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        icon="search"
      />
      <Select
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        options={filtered}
        required={required}
      />
      {value && <p className="break-all font-mono text-xs text-text-muted">{value}</p>}
      {!filtered.length && <p className="text-sm text-text-muted">{t("noChoices")}</p>}
    </div>
  );
}
