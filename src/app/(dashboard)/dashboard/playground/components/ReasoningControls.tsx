"use client";

// src/app/(dashboard)/dashboard/playground/components/ReasoningControls.tsx
//
// #6241: effort selector + thinking toggle for the Playground. Rendered only when the selected
// model supports thinking (spec.show); the effort options come from the model's `effort_tiers`
// (fallback to the canonical vocabulary), resolved by `resolveReasoningControls`.

import type { PlaygroundParams } from "./ParamSliders";
import type { ReasoningControlSpec } from "./reasoningControlUtils";
import { useTranslations } from "next-intl";

interface ReasoningControlsProps {
  spec: ReasoningControlSpec;
  params: PlaygroundParams;
  setParams: (params: PlaygroundParams) => void;
}

/** Human-friendly label for a canonical/tier effort value (e.g. "xhigh" -> "Xhigh"). */
function effortLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ReasoningControls({ spec, params, setParams }: ReasoningControlsProps) {
  const t = useTranslations("playground");
  if (!spec.show) return null;

  function update<K extends keyof PlaygroundParams>(key: K, value: PlaygroundParams[K]) {
    setParams({ ...params, [key]: value });
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
        {t("reasoningLabel")}
      </span>

      {/* Thinking toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs text-text-muted font-medium">{t("thinking")}</label>
        <button
          type="button"
          role="switch"
          aria-checked={params.thinking}
          aria-label={t("thinking")}
          onClick={() => update("thinking", !params.thinking)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            params.thinking ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-600"
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              params.thinking ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Effort selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-muted font-medium">{t("effort")}</label>
        <select
          value={params.effort}
          onChange={(e) => update("effort", e.target.value)}
          className="w-full text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
        >
          <option value="">{t("effortDefault")}</option>
          {spec.effortOptions.map((opt) => (
            <option key={opt} value={opt}>
              {effortLabel(opt)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
