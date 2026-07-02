"use client";

import type { Dispatch, SetStateAction } from "react";
import type { BooleanCapabilityChoice } from "../customModelFormHelpers";

const CHOICES = ["unknown", "yes", "no"] as const;

export default function CapabilityChoiceControl({
  label,
  value,
  setter,
  unknownLabel,
  yesLabel,
  noLabel,
}: {
  label: string;
  value: BooleanCapabilityChoice;
  setter: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
  unknownLabel: string;
  yesLabel: string;
  noLabel: string;
}) {
  const labels: Record<BooleanCapabilityChoice, string> = {
    unknown: unknownLabel,
    yes: yesLabel,
    no: noLabel,
  };
  const selectedIndex = Math.max(0, CHOICES.indexOf(value));
  const chooseByIndex = (index: number, container: HTMLElement | null) => {
    const nextIndex = (index + CHOICES.length) % CHOICES.length;
    setter(CHOICES[nextIndex]);
    window.requestAnimationFrame(() => {
      const buttons = container?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons?.[nextIndex]?.focus();
    });
  };

  return (
    <div className="flex min-w-0 flex-[1_1_18rem] items-center justify-between gap-2">
      <span className="min-w-0 flex-1 truncate text-xs text-text-main" title={label}>
        {label}
      </span>
      <div
        className="inline-grid min-w-0 flex-[0_1_12rem] grid-cols-3 overflow-hidden rounded-lg border border-border bg-background"
        role="radiogroup"
        aria-label={label}
      >
        {CHOICES.map((choice, index) => (
          <button
            key={choice}
            type="button"
            role="radio"
            aria-checked={value === choice}
            aria-label={`${label}: ${labels[choice]}`}
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => setter(choice)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                chooseByIndex(index + 1, event.currentTarget.parentElement);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                chooseByIndex(index - 1, event.currentTarget.parentElement);
              } else if (event.key === "Home") {
                event.preventDefault();
                chooseByIndex(0, event.currentTarget.parentElement);
              } else if (event.key === "End") {
                event.preventDefault();
                chooseByIndex(CHOICES.length - 1, event.currentTarget.parentElement);
              }
            }}
            className={`min-w-0 truncate px-2 py-1 text-[10px] font-medium transition-colors ${
              value === choice
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-muted hover:text-text-main"
            }`}
          >
            {labels[choice]}
          </button>
        ))}
      </div>
    </div>
  );
}
