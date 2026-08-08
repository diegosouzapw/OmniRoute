"use client";

import { useEffect, useState } from "react";
import Select from "./Select";
import Input from "./Input";

export interface ApiModel {
  provider: string;
  model: string;
  fullModel?: string;
  type?: string;
  subtype?: string;
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
  /** Let operators select the empty-value placeholder (for Auto/default semantics). */
  allowEmpty?: boolean;
  /** Optional catalog predicate, e.g. restrict the picker to STT models. */
  modelFilter?: (model: ApiModel) => boolean;
  /** Model API to read. The unified catalog includes specialty audio/video surfaces. */
  modelSource?: "available" | "catalog";
  className?: string;
}

interface FetchState {
  status: "loading" | "ready" | "error";
  options: { value: string; label: string }[];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function readCatalogModels(value: unknown): ApiModel[] {
  const catalog = asRecord(asRecord(value)?.catalog);
  if (!catalog) return [];

  const models: ApiModel[] = [];
  for (const [provider, rawBucket] of Object.entries(catalog)) {
    const bucket = asRecord(rawBucket);
    if (!Array.isArray(bucket?.models)) continue;
    for (const rawModel of bucket.models) {
      const model = asRecord(rawModel);
      const id = typeof model?.id === "string" ? model.id : "";
      if (!id) continue;
      const providerPrefix = `${provider}/`;
      models.push({
        provider,
        model: id.startsWith(providerPrefix) ? id.slice(providerPrefix.length) : id,
        fullModel: id.startsWith(providerPrefix) ? id : `${providerPrefix}${id}`,
        type: typeof model?.type === "string" ? model.type : undefined,
        subtype: typeof model?.subtype === "string" ? model.subtype : undefined,
      });
    }
  }
  return models;
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
  allowEmpty = false,
  modelFilter,
  modelSource = "available",
  className,
}: ModelSelectFieldProps) {
  const [state, setState] = useState<FetchState>({ status: "loading", options: [] });

  useEffect(() => {
    let cancelled = false;
    const endpoint = modelSource === "catalog" ? "/api/models/catalog" : "/api/models";
    fetch(endpoint)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("fetch failed"))))
      .then((data) => {
        if (cancelled) return;
        const models: ApiModel[] =
          modelSource === "catalog"
            ? readCatalogModels(data)
            : Array.isArray(data?.models)
              ? data.models
              : [];
        const filteredModels = modelFilter ? models.filter(modelFilter) : models;
        const options = filteredModels.map((m) => {
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
  }, [modelFilter, modelSource]);

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
      placeholderDisabled={!allowEmpty}
      disabled={disabled || state.status === "loading"}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
