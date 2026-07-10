"use client";

/**
 * Parallel / Collaborative mode selector for the Chaos Mode config page.
 * Extracted out of ChaosConfigPageClient.tsx to keep the page component under
 * the complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosModeSelector({
  mode,
  onChange,
  label,
  parallelLabel,
  parallelDesc,
  collaborativeLabel,
  collaborativeDesc,
}: {
  mode: "parallel" | "collaborative";
  onChange: (mode: "parallel" | "collaborative") => void;
  label: string;
  parallelLabel: string;
  parallelDesc: string;
  collaborativeLabel: string;
  collaborativeDesc: string;
}) {
  return (
    <div className="p-3 rounded-lg border border-border bg-surface/40">
      <p className="text-sm font-medium text-text-main mb-2">{label}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange("parallel")}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            mode === "parallel"
              ? "bg-primary text-white"
              : "bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10"
          }`}
        >
          <span className="material-symbols-outlined text-[16px] align-middle mr-1">
            call_split
          </span>
          {parallelLabel}
          <p className="text-[10px] opacity-70 mt-0.5">{parallelDesc}</p>
        </button>
        <button
          type="button"
          onClick={() => onChange("collaborative")}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            mode === "collaborative"
              ? "bg-primary text-white"
              : "bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10"
          }`}
        >
          <span className="material-symbols-outlined text-[16px] align-middle mr-1">merge</span>
          {collaborativeLabel}
          <p className="text-[10px] opacity-70 mt-0.5">{collaborativeDesc}</p>
        </button>
      </div>
    </div>
  );
}
