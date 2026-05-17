"use client";

import { cn } from "@/shared/utils/cn";

interface PresetSliderProps {
  value: number;
  onChange: (value: number) => void;
  presets: { label: string; value: number }[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function PresetSlider({
  value,
  onChange,
  presets,
  min = 0,
  max = 100,
  step = 1,
  className,
}: PresetSliderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => onChange(preset.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
              "border",
              value === preset.value
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-text-muted border-black/10 dark:border-white/10 hover:border-primary/30 hover:text-text-main"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "w-full h-1.5 rounded-full appearance-none cursor-pointer",
          "bg-black/10 dark:bg-white/10",
          "accent-primary"
        )}
      />
      <div className="flex justify-between text-[10px] text-text-muted">
        <span>{min}</span>
        <span className="font-medium text-text-main">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
