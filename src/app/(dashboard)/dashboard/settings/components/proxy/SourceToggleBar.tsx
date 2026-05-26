"use client";

export type SourceId = "1proxy" | "proxifly" | "iplocate";

export const ALL_SOURCE_IDS: SourceId[] = ["1proxy", "proxifly", "iplocate"];

export const FREE_POOL_DISABLED_SOURCES_KEY = "freePool.disabledSources";

export function loadDisabledSources(): Set<SourceId> {
  try {
    const raw = globalThis.localStorage?.getItem(FREE_POOL_DISABLED_SOURCES_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown[];
    return new Set(arr.filter((id): id is SourceId => ALL_SOURCE_IDS.includes(id as SourceId)));
  } catch {
    return new Set();
  }
}

export function saveDisabledSources(disabled: Set<SourceId>): void {
  try {
    globalThis.localStorage?.setItem(
      FREE_POOL_DISABLED_SOURCES_KEY,
      JSON.stringify([...disabled])
    );
  } catch {}
}

interface SourceToggleBarProps {
  disabledSources: Set<SourceId>;
  onToggle: (source: SourceId) => void;
}

const SOURCES: Array<{ id: SourceId; label: string }> = [
  { id: "1proxy", label: "1proxy" },
  { id: "proxifly", label: "Proxifly" },
  { id: "iplocate", label: "IPLocate" },
];

export default function SourceToggleBar({ disabledSources, onToggle }: SourceToggleBarProps) {
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Toggle proxy sources">
      {SOURCES.map((s) => {
        const enabled = !disabledSources.has(s.id);
        return (
          <button
            key={s.id}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium border transition-colors ${
              enabled
                ? "bg-primary/20 border-primary text-primary"
                : "border-border text-text-muted hover:border-primary/50"
            }`}
            onClick={() => onToggle(s.id)}
            aria-pressed={enabled}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${enabled ? "bg-primary" : "bg-text-muted"}`}
            />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
