"use client";

import { useEffect, useState } from "react";
import Card from "../Card";

type RechartsModule = typeof import("recharts");

let rechartsModule: RechartsModule | null = null;
let rechartsPromise: Promise<RechartsModule> | null = null;

export function loadRecharts() {
  if (rechartsModule) return Promise.resolve(rechartsModule);
  if (!rechartsPromise) {
    rechartsPromise = import("recharts")
      .then((module) => {
        rechartsModule = module;
        return module;
      })
      .catch((error) => {
        rechartsPromise = null;
        throw error;
      });
  }
  return rechartsPromise;
}

export function useRecharts() {
  const [module, setModule] = useState<RechartsModule | null>(rechartsModule);

  useEffect(() => {
    if (module) return;
    let cancelled = false;
    loadRecharts()
      .then((loadedModule) => {
        if (!cancelled) setModule(loadedModule);
      })
      .catch(() => {
        if (!cancelled) setModule(null);
      });
    return () => {
      cancelled = true;
    };
  }, [module]);

  return module;
}

export function ChartLoadingCard({ className = "p-4 flex-1" }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="py-8" aria-hidden="true" />
    </Card>
  );
}

export function DarkTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: any[];
  label?: any;
  formatter?: Function;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs shadow-lg">
      {label && <div className="font-semibold text-text-main mb-1">{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5 text-text-muted">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}:</span>
          <span className="font-mono font-medium text-text-main">
            {formatter ? formatter(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
