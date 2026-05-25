"use client";

export type SourceId = "1proxy" | "proxifly" | "iplocate";

interface SourceToggleBarProps {
  activeSource: SourceId | null;
  onToggle: (source: SourceId | null) => void;
}

const SOURCES: Array<{ id: SourceId; label: string }> = [
  { id: "1proxy", label: "1proxy" },
  { id: "proxifly", label: "Proxifly" },
  { id: "iplocate", label: "IPLocate" },
];

export default function SourceToggleBar({ activeSource, onToggle }: SourceToggleBarProps) {
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by source">
      <button
        className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
          activeSource === null
            ? "bg-primary/20 border-primary text-primary"
            : "border-border text-text-muted hover:border-primary/50"
        }`}
        onClick={() => onToggle(null)}
        aria-pressed={activeSource === null}
      >
        All
      </button>
      {SOURCES.map((s) => (
        <button
          key={s.id}
          className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
            activeSource === s.id
              ? "bg-primary/20 border-primary text-primary"
              : "border-border text-text-muted hover:border-primary/50"
          }`}
          onClick={() => onToggle(s.id)}
          aria-pressed={activeSource === s.id}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
