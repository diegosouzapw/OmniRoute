"use client";

import { useEffect, useState } from "react";
import Select from "./Select";
import Input from "./Input";

interface ApiModel {
  provider: string;
  model: string;
  fullModel?: string;
}

export interface ModelSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  ariaLabel?: string;
  /** Render a plain text fallback (custom option / off-catalog) — default true. */
  allowCustom?: boolean;
  className?: string;
}

interface FetchState {
  status: "loading" | "ready" | "error";
  options: { value: string; label: string }[];
}

/**
 * hidePaid-aware model picker (#6540). Loads options from `GET /api/models`
 * (already filters by `hidePaidModels`) instead of a static catalog. Falls
 * back to a plain text `Input` when the fetch fails so the field never
 * becomes unusable, and injects a "(custom)" option for an existing saved
 * value that isn't present in the fetched catalog (typo, deprecated model,
 * alias/combo name) so it is never silently dropped on save.
 */
export default function ModelSelectField({
  value,
  onChange,
  disabled = false,
  label,
  placeholder,
  ariaLabel,
  allowCustom = true,
  className,
}: ModelSelectFieldProps) {
  const [state, setState] = useState<FetchState>({ status: "loading", options: [] });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/models")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("fetch failed"))))
      .then((data) => {
        if (cancelled) return;
        const models: ApiModel[] = Array.isArray(data?.models) ? data.models : [];
        const options = models.map((m) => {
          const full = m.fullModel || `${m.provider}/${m.model}`;
          return { value: full, label: full };
        });
        setState({ status: "ready", options });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", options: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "error" && allowCustom) {
    return (
      <Input
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className={className}
      />
    );
  }

  const hasKnownValue = value === "" || state.options.some((o) => o.value === value);
  const options =
    !hasKnownValue && allowCustom
      ? [{ value, label: `${value} (custom)` }, ...state.options]
      : state.options;

  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      placeholder={state.status === "loading" ? "Loading models…" : placeholder || "Select a model"}
      disabled={disabled || state.status === "loading"}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
