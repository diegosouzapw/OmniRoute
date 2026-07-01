"use client";

import type { KeyboardEvent } from "react";
import type { BooleanCapabilityKey } from "./modelCompatPopoverHelpers";

export type CapabilityMode = "unknown" | "yes" | "no";

export interface CapabilityNumberControl {
  id: "contextWindow" | "maxOutputTokens" | "defaultThinkingBudget" | "thinkingBudgetCap";
  label: string;
  min: number;
  value: string;
  setValue: (value: string) => void;
  commit: () => void;
  resolvedLabel: string;
}

interface CapabilityBooleanControl {
  key: BooleanCapabilityKey;
  label: string;
  mode: CapabilityMode;
}

interface ModelCapabilitiesPanelProps {
  title: string;
  controls: CapabilityBooleanControl[];
  numberControls: CapabilityNumberControl[];
  unknownLabel: string;
  supportedLabel: string;
  unsupportedLabel: string;
  disabled?: boolean;
  onModeChange: (key: BooleanCapabilityKey, mode: CapabilityMode) => void;
}

const MODE_OPTIONS = ["unknown", "yes", "no"] as const;

function CapabilityBooleanRow({
  control,
  labels,
  disabled,
  onModeChange,
}: {
  control: CapabilityBooleanControl;
  labels: Record<CapabilityMode, string>;
  disabled?: boolean;
  onModeChange: (key: BooleanCapabilityKey, mode: CapabilityMode) => void;
}) {
  const moveSelection = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = MODE_OPTIONS.length - 1;
    if (nextIndex == null) return;

    event.preventDefault();
    const container = event.currentTarget.parentElement;
    const wrappedIndex = (nextIndex + MODE_OPTIONS.length) % MODE_OPTIONS.length;
    onModeChange(control.key, MODE_OPTIONS[wrappedIndex]);
    window.requestAnimationFrame(() => {
      const buttons = container?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons?.[wrappedIndex]?.focus();
    });
  };

  return (
    <div className="flex min-w-0 items-center justify-between gap-2">
      <span className="min-w-0 flex-1" title={control.label}>
        <span className="block truncate text-xs font-medium text-text-main">{control.label}</span>
      </span>
      <div
        className="inline-grid min-w-0 max-w-[13.5rem] shrink grid-cols-3 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-950"
        role="radiogroup"
        aria-label={control.label}
      >
        {MODE_OPTIONS.map((value, index) => {
          const selected = control.mode === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${control.label}: ${labels[value]}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onModeChange(control.key, value)}
              onKeyDown={(event) => moveSelection(event, index)}
              disabled={disabled}
              className={`min-w-0 truncate px-2 py-1 text-[10px] font-medium transition-colors ${
                selected
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-muted hover:text-text-main"
              } disabled:opacity-50`}
            >
              {labels[value]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CapabilityNumberRow({
  control,
  disabled,
}: {
  control: CapabilityNumberControl;
  disabled?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-[11px] font-medium text-text-muted">{control.label}</span>
      <input
        type="number"
        min={control.min}
        value={control.value}
        onChange={(event) => control.setValue(event.target.value)}
        onBlur={control.commit}
        disabled={disabled}
        className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-2 text-xs text-text-main focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
      />
      <span className="mt-1 block truncate text-[10px] text-text-muted">
        {control.resolvedLabel}
      </span>
    </label>
  );
}

export default function ModelCapabilitiesPanel({
  title,
  controls,
  numberControls,
  unknownLabel,
  supportedLabel,
  unsupportedLabel,
  disabled,
  onModeChange,
}: ModelCapabilitiesPanelProps) {
  const labels: Record<CapabilityMode, string> = {
    unknown: unknownLabel,
    yes: supportedLabel,
    no: unsupportedLabel,
  };

  return (
    <div className="mb-4 rounded-lg border-2 border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-600 dark:bg-zinc-900">
      <label className="block text-[11px] font-semibold text-text-main mb-2">{title}</label>
      <div className="space-y-2">
        {controls.map((control) => (
          <CapabilityBooleanRow
            key={control.key}
            control={control}
            labels={labels}
            disabled={disabled}
            onModeChange={onModeChange}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {numberControls.map((control) => (
          <CapabilityNumberRow key={control.id} control={control} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}
