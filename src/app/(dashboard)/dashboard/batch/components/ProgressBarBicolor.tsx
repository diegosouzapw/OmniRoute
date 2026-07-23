interface Props {
  total: number;
  completed: number;
  failed: number;
  className?: string;
  showLabels?: boolean;
}

export default function ProgressBarBicolor({
  total,
  completed,
  failed,
  className = "",
  showLabels = false,
}: Props) {
  const donePct = total > 0 ? (completed / total) * 100 : 0;
  const failedPct = total > 0 ? (failed / total) * 100 : 0;
  return (
    <div className={`space-y-1 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>
            <span className="text-emerald-400">{completed}</span>
            {failed > 0 && <span className="text-red-400"> / {failed} err</span>}
            <span> / {total}</span>
          </span>
          <span>{Math.round(donePct + failedPct)}%</span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-[var(--color-bg-alt)] overflow-hidden flex">
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${donePct}%` }} />
        <div className="h-full bg-red-500 transition-all" style={{ width: `${failedPct}%` }} />
      </div>
    </div>
  );
}
