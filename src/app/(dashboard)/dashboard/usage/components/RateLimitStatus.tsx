"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";

export default function RateLimitStatus() {
  const t = useTranslations("usage");
  const [data, setData] = useState({ lockouts: [], cacheStats: null });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/rate-limits");
      if (res.ok) setData(await res.json());
    } catch {
    } finally {
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
      {/* {t("modelLockouts")} */}
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
            <p className="text-sm">{t("noLockouts")}</p>
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
                  <span className="material-symbols-outlined text-[16px] text-orange-400">
                    lock
                  </span>
                  <div>
                    <p className="text-sm font-medium">{lock.model}</p>
                    <p className="text-xs text-text-muted">
                      Account:{" "}
                      <span className="font-mono">{lock.accountId?.slice(0, 12) || "N/A"}</span>
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
    </div>
  );
}
