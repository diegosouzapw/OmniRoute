"use client";

// Shared primitive form fields for the Resilience settings tab. Extracted out
// of ResilienceTab.tsx (DRY, keeps ResilienceTab.tsx under the frozen
// file-size cap) — no behavior change from the extraction itself.

export function NumberField({
  label,
  value,
  suffix,
  min = 0,
  max,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(event) => {
            if (event.target.value === "") return;
            const nextValue = Number(event.target.value);
            if (Number.isFinite(nextValue)) {
              // Clamp before propagating so out-of-range typed values can never
              // reach the Save handler — the HTML min/max/step attributes above
              // are advisory only and do not block onChange (#8107).
              const clamped = Math.max(min, Math.min(max ?? nextValue, nextValue));
              onChange(clamped);
            }
          }}
          className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm"
        />
        {suffix ? <span className="text-xs text-text-muted">{suffix}</span> : null}
      </div>
    </label>
  );
}

export function BooleanField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-3 rounded-lg border border-border bg-bg-subtle px-3 py-3">
      <div>
        <div className="text-sm font-medium text-text-main">{label}</div>
        <div className="text-xs text-text-muted">{description}</div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 rounded border-border"
      />
    </label>
  );
}
