"use client";

type ModelEntry = {
  weight?: number;
  [key: string]: unknown;
};

type WeightTotalBarProps = {
  models: ModelEntry[];
};

const WEIGHT_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
];

/**
 * #6147 — effective routing share of a weighted target.
 *
 * The per-target `weight` values do not have to sum to 100; at routing time each
 * target is picked with probability `weight / Σweights`. So a raw weight of 30
 * with a total of 60 is an *effective* 50% share. This pure helper computes that
 * share (0-100) and guards the `total === 0` case so the UI never renders NaN.
 */
export function effectiveSharePercent(weight: number, total: number): number {
  if (!weight || weight <= 0) return 0;
  if (!total || total <= 0) return 0;
  return (weight / total) * 100;
}

export default function WeightTotalBar({ models }: WeightTotalBarProps) {
  const total = models.reduce((sum, m) => sum + (m.weight || 0), 0);
  const isValid = total === 100;

  return (
    <div className="mt-1.5">
      {/* Visual bar */}
      <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden flex">
        {models.map((m, i) => {
          if (!m.weight) return null;
          return (
            <div
              key={i}
              className={`${WEIGHT_COLORS[i % WEIGHT_COLORS.length]} transition-all duration-300`}
              style={{ width: `${Math.min(m.weight, 100)}%` }}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-0.5">
        <div className="flex gap-1">
          {models.map(
            (m, i) =>
              m.weight > 0 && (
                <span key={i} className="flex items-center gap-0.5 text-[9px] text-text-muted">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${WEIGHT_COLORS[i % WEIGHT_COLORS.length]}`}
                  />
                  {m.weight}%
                  {/* #6147 — show the *effective* routing share when weights don't sum to 100 */}
                  {total > 0 && total !== 100 && (
                    <span
                      className="text-text-muted/70"
                      title="Effective routing share (weight ÷ total)"
                    >
                      {" → "}
                      {Math.round(effectiveSharePercent(m.weight, total))}%
                    </span>
                  )}
                </span>
              )
          )}
        </div>
        <span
          className={`text-[10px] font-medium ${
            isValid ? "text-emerald-500" : total > 100 ? "text-red-500" : "text-amber-500"
          }`}
        >
          {total}%{!isValid && total > 0 && " ≠ 100%"}
        </span>
      </div>
    </div>
  );
}