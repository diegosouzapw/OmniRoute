"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "./Select";
import Input from "./Input";
import { cn } from "@/shared/utils/cn";
import { isVisionModelId } from "@/shared/constants/visionModels";

export interface ApiModel {
  provider: string;
  model: string;
  fullModel?: string;
  type?: string;
  subtype?: string;
  supportsVision?: boolean;
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
  /**
   * Render an editable text input (with a <datalist> of catalog suggestions)
   * instead of a plain <select>. Lets operators type a custom/self-hosted
   * model id that is not (or not yet) in the catalog — e.g. an Ollama/vLLM
   * vision model for the Modality Bridge Vision picker (#10703).
   */
  allowCustomInput?: boolean;
  /** Optional test id forwarded to the underlying control. */
  testId?: string;
  className?: string;
}

interface FetchState {
  status: "loading" | "ready" | "error";
  options: { value: string; label: string }[];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

/** @internal exported for unit tests (node --test imports the module directly). */
export function readCatalogModels(value: unknown): ApiModel[] {
  const catalog = asRecord(asRecord(value)?.catalog);
  if (!catalog) return [];

  const models: ApiModel[] = [];

  /**
   * Derive the vision verdict from the unified catalog entry (#10809). The
   * unified catalog serializes capability/modality metadata (not a top-level
   * `supportsVision`), so a Vision-picker filter of `supportsVision === true`
   * would otherwise drop every catalog model. Resolution order: explicit
   * `capabilities.vision` wins, then input modalities. The conservative id
   * heuristic is ONLY applied to user-added custom models (operator chose that
   * model — no authoritative metadata exists) — registry-backed entries must
   * carry explicit capability/modality data, which the shared resolver already
   * neutralizes for text-only overrides like `cmd/gpt-5.3-codex` (#10703).
   * Only confirmed-vision models are flagged; `undefined` (unknown/text-only)
   * keeps them out of a strict `=== true` filter (#10703).
   */
  const resolvesVisible: (
    model: Record<string, unknown>,
    fullId: string,
    isCustom: boolean
  ) => boolean | undefined = (model, fullId, isCustom) => {
    const capabilities = asRecord(model.capabilities);
    if (capabilities && typeof capabilities.vision === "boolean") {
      return capabilities.vision || undefined;
    }
    const inputs = Array.isArray(model.input_modalities) ? model.input_modalities : [];
    if (inputs.length > 0) {
      return (
        inputs.some((entry) => {
          const value = String(entry).toLowerCase();
          return value.includes("image") || value.includes("video");
        }) || undefined
      );
    }
    if (isCustom) return isVisionModelId(fullId) ? true : undefined;
    return undefined;
  };

  for (const [provider, rawBucket] of Object.entries(catalog)) {
    const bucket = asRecord(rawBucket);
    if (!Array.isArray(bucket?.models)) continue;
    for (const rawModel of bucket.models) {
      const model = asRecord(rawModel);
      const id = typeof model?.id === "string" ? model.id : "";
      if (!id) continue;
      const providerPrefix = `${provider}/`;
      const fullId = id.startsWith(providerPrefix) ? id : `${providerPrefix}${id}`;
      models.push({
        provider,
        model: id.startsWith(providerPrefix) ? id.slice(providerPrefix.length) : id,
        fullModel: fullId,
        type: typeof model?.type === "string" ? model.type : undefined,
        subtype: typeof model?.subtype === "string" ? model.subtype : undefined,
        supportsVision: resolvesVisible(model, fullId, model.custom === true),
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
  allowCustomInput = false,
  testId,
  className,
}: ModelSelectFieldProps) {
  const t = useTranslations("common");
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
      ? [{ value, label: `${value} (${t("custom")})` }, ...state.options]
      : state.options;

  // Editable custom-input mode (#10703): an operator may need a vision model
  // that is not (yet) in the catalog (self-hosted Ollama/vLLM, unlisted
  // provider). Keep the filtered <select> for the known catalog AND add a
  // free-text input below so a custom/unlisted id can be typed directly. The
  // select keeps `label`/`allowEmpty` semantics (existing UI tests query the
  // model label's parent for the <select>), while the custom field's
  // `onChange` lets operators save any string.
  if (allowCustomInput && state.status === "ready") {
    const customInputId = `${testId ?? "model-select-field"}-custom-input`;
    // Known means either the empty placeholder, a catalog option, or the
    // injected "(custom)" entry — so an off-catalog saved value stays visible
    // as the selected option instead of falling back to the placeholder.
    const knownValue = value === "" || options.some((o) => o.value === value);
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <Select
          label={label}
          value={knownValue ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          options={options}
          placeholder={placeholder || t("selectAModel")}
          placeholderDisabled={!allowEmpty}
          disabled={disabled}
          aria-label={ariaLabel}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor={customInputId} className="text-xs font-medium text-text-muted">
            {t("custom")}
          </label>
          <input
            id={customInputId}
            data-testid={testId ? `${testId}-custom-input` : undefined}
            value={value}
            disabled={disabled}
            placeholder={placeholder || t("selectAModel")}
            aria-label={ariaLabel}
            onChange={(e) => onChange(e.target.value)}
            className="w-full py-2 px-3 text-sm text-text-main bg-surface border border-black/10 dark:border-white/10 rounded-control focus:ring-1 focus:ring-accent/30 focus:border-accent/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[16px] sm:text-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      placeholder={
        state.status === "loading" ? t("loadingModels") : placeholder || t("selectAModel")
      }
      placeholderDisabled={!allowEmpty}
      disabled={disabled || state.status === "loading"}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
