"use client";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";

export interface EngineConfigFormProps {
  schema: EngineConfigField[];
  value: Record<string, unknown>;
  // Called with one field at a time, so the caller can apply it to its latest state.
  onChange: (key: string, value: unknown) => void;
}

export function EngineConfigForm({ schema, value, onChange: set }: EngineConfigFormProps) {
  return (
    <div className="flex flex-col gap-3">
      {schema.map((f) => {
        const v = value[f.key] ?? f.defaultValue;
        return (
          <label key={f.key} className="flex flex-col gap-1 text-sm">
            <span className="font-medium">{f.label}</span>
            {f.description && <span className="text-xs text-text-muted">{f.description}</span>}
            {f.type === "boolean" && (
              <input type="checkbox" checked={!!v} onChange={(e) => set(f.key, e.target.checked)} />
            )}
            {f.type === "number" && (
              <input
                type="number"
                // NaN (an emptied field, "not set") renders as an empty input, never as 0;
                // overflow (Infinity) also renders empty and surfaces through the save error.
                value={typeof v === "number" && Number.isFinite(v) ? v : ""}
                placeholder={f.defaultValue != null ? String(f.defaultValue) : ""}
                min={f.min}
                max={f.max}
                // Fractional settings (e.g. CCR retrievalRampFactor 1.5) must not fail
                // the browser's step validation, whose default step is 1.
                step="any"
                onChange={(e) => {
                  // A browser reports badInput with an empty value for unparseable entries
                  // ("1e", "1,5" in a comma-decimal locale): keep the last valid value rather
                  // than mapping the entry to the unset sentinel.
                  if (e.target.value === "" && e.target.validity.badInput) return;
                  set(f.key, e.target.value === "" ? Number.NaN : Number(e.target.value));
                }}
                className="border border-border rounded px-2 py-1"
              />
            )}
            {f.type === "string" && (
              <input
                type="text"
                value={(v as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                className="border border-border rounded px-2 py-1"
              />
            )}
            {f.type === "select" && (
              <select
                value={v as string}
                onChange={(e) => set(f.key, e.target.value)}
                className="border border-border rounded px-2 py-1"
              >
                {(f.options ?? []).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
            {f.type === "multiselect" &&
              (f.options ?? []).map((o) => (
                <label key={o.value} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={Array.isArray(v) && (v as string[]).includes(o.value)}
                    onChange={(e) => {
                      const arr = Array.isArray(v) ? [...(v as string[])] : [];
                      set(
                        f.key,
                        e.target.checked ? [...arr, o.value] : arr.filter((x) => x !== o.value)
                      );
                    }}
                  />
                  {o.label}
                </label>
              ))}
          </label>
        );
      })}
    </div>
  );
}

export default EngineConfigForm;
