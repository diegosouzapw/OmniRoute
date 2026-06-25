"use client";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";

export interface EngineConfigFormProps {
  schema: EngineConfigField[];
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}

export function EngineConfigForm({ schema, value, onChange }: EngineConfigFormProps) {
  const set = (k: string, v: unknown) => onChange({ ...value, [k]: v });
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
                value={v as number}
                min={f.min}
                max={f.max}
                onChange={(e) => set(f.key, Number(e.target.value))}
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
