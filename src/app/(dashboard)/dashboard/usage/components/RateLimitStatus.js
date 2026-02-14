"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";

export default function RateLimitStatus() {
  const [data, setData] = useState({ lockouts: [], cacheStats: null });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/rate-limits");
      if (res.ok) setData(await res.json());
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [load]);

  const formatMs = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.ceil(ms / 1000)}s`;
    return `${Math.ceil(ms / 60000)}m`;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Model Lockouts */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              lock_clock
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Model Lockouts</h3>
            <p className="text-sm text-text-muted">Per-model rate limit locks • Auto-refresh 10s</p>
          </div>
          {data.lockouts.length > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {data.lockouts.length} locked
            </span>
          )}
        </div>

        {data.lockouts.length === 0 ? (
          <div className="text-center py-6 text-text-muted">
            <span className="material-symbols-outlined text-[32px] mb-2 block opacity-40">
              lock_open
            </span>
            <p className="text-sm">No models currently locked</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {data.lockouts.map((lock, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg
                           bg-orange-500/5 border border-orange-500/15"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[16px] text-orange-400">lock</span>
                  <div>
                    <p className="text-sm font-medium">{lock.model}</p>
                    <p className="text-xs text-text-muted">
                      Account: <span className="font-mono">{lock.accountId?.slice(0, 12) || "N/A"}</span>
                      {lock.reason && <> — {lock.reason}</>}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono tabular-nums text-orange-400">
                  {formatMs(lock.remainingMs)} left
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Signature Cache Stats */}
      {data.cacheStats && (
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                database
              </span>
            </div>
            <h3 className="text-lg font-semibold">Signature Cache</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Defaults", value: data.cacheStats.defaultCount, color: "text-text-muted" },
              { label: "Tool", value: `${data.cacheStats.tool.entries}/${data.cacheStats.tool.patterns}`, color: "text-blue-400" },
              { label: "Family", value: `${data.cacheStats.family.entries}/${data.cacheStats.family.patterns}`, color: "text-purple-400" },
              { label: "Session", value: `${data.cacheStats.session.entries}/${data.cacheStats.session.patterns}`, color: "text-cyan-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center p-3 rounded-lg bg-surface/30 border border-border/30">
                <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
                <p className="text-xs text-text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
