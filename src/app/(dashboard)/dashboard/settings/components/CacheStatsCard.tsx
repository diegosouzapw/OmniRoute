"use client";

import { useState, useEffect } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function CacheStatsCard() {
  const [cache, setCache] = useState(null);
  const [flushing, setFlushing] = useState(false);
  const t = useTranslations("settings");

  const fetchStats = () => {
    fetch("/api/cache/stats")
      .then((r) => r.json())
      .then(setCache)
      .catch(() => {});
  };

  useEffect(fetchStats, []);

  const handleFlush = async () => {
    setFlushing(true);
    try {
      await fetch("/api/cache/stats", { method: "DELETE" });
      fetchStats();
    } finally {
      setFlushing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">cached</span>
          {t("promptCache")}
        </h3>
        <button
          onClick={handleFlush}
          disabled={flushing}
          className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          {flushing ? t("flushing") : t("flushCache")}
        </button>
      </div>

      {cache ? (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-muted">{t("size")}</p>
            <p className="font-mono text-lg text-text-main">
              {cache.size}/{cache.maxSize}
            </p>
          </div>
          <div>
            <p className="text-text-muted">{t("hitRate")}</p>
            <p className="font-mono text-lg text-text-main">{cache.hitRate?.toFixed(1) ?? 0}%</p>
          </div>
          <div>
            <p className="text-text-muted">{t("hits")}</p>
            <p className="font-mono text-text-main">{cache.hits ?? 0}</p>
          </div>
          <div>
            <p className="text-text-muted">{t("evictions")}</p>
            <p className="font-mono text-text-main">{cache.evictions ?? 0}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-muted">{t("loadingCacheStats")}</p>
      )}
    </Card>
  );
}
