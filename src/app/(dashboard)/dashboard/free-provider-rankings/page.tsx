"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

interface ProviderModelScore {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
}

interface FreeProviderRanking {
  id: string;
  name: string;
  icon: string;
  color: string;
  textIcon?: string;
  category: "noauth" | "oauth" | "apikey";
  topModel: ProviderModelScore | null;
  averageScore: number;
  modelCount: number;
}

/**
 * Convert a normalized task-fit score (0.4–0.98) to a human-readable label.
 * The score represents relative ranking quality, not a percentage.
 */
function scoreLabel(score: number): string {
  if (score >= 0.9) return "Elite";
  if (score >= 0.8) return "Excellent";
  if (score >= 0.7) return "Very Good";
  if (score >= 0.6) return "Good";
  if (score >= 0.5) return "Average";
  return "Below Average";
}

function scoreColor(score: number): string {
  if (score >= 0.85) return "text-green-400";
  if (score >= 0.7) return "text-emerald-400";
  if (score >= 0.55) return "text-yellow-400";
  return "text-orange-400";
}

const CATEGORY_OPTIONS = [
  { value: "", labelKey: "allCategories" },
  { value: "default", labelKey: "categoryDefault" },
  { value: "coding", labelKey: "categoryCoding" },
  { value: "review", labelKey: "categoryReview" },
  { value: "documentation", labelKey: "categoryDocumentation" },
  { value: "debugging", labelKey: "categoryDebugging" },
];

export default function FreeProviderRankingsPage() {
  const t = useTranslations("freeProviderRankingsPage");
  const [rankings, setRankings] = useState<FreeProviderRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("");

  const fetchRankings = useCallback(
    async (category?: string) => {
      setLoading(true);
      setError("");
      try {
        const url = category
          ? `/api/free-provider-rankings?category=${category}`
          : "/api/free-provider-rankings";
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRankings(data.rankings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("errorLoading"));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    fetchRankings(filter || undefined);
  }, [filter, fetchRankings]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("subtitle")}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              filter === opt.value
                ? "bg-violet-500 border-violet-500 text-white"
                : "border-border text-text-muted hover:text-text-main hover:border-violet-500/50"
            }`}
          >
            {t(opt.labelKey)}
          </button>
        ))}
      </div>

      {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("loading")}</div>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {rankings.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rankings.slice(0, 3).map((provider, idx) => (
                <Card key={provider.id} className="relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      idx === 0
                        ? "bg-gradient-to-r from-amber-400 to-yellow-600"
                        : idx === 1
                          ? "bg-gradient-to-r from-gray-300 to-gray-500"
                          : "bg-gradient-to-r from-amber-600 to-orange-800"
                    }`}
                  />
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: provider.color }}
                        >
                          {provider.textIcon || provider.name.charAt(0)}
                        </div>
                        <p className="font-semibold truncate">{provider.name}</p>
                      </div>
                      {provider.topModel && (
                        <p className="text-sm text-text-muted mt-1 truncate">
                          {t("bestModel")}: {provider.topModel.modelName}
                        </p>
                      )}
                      {provider.topModel && (
                        <p
                          className={`text-lg font-bold mt-1 ${scoreColor(provider.topModel.score)}`}
                        >
                          {scoreLabel(provider.topModel.score)}
                        </p>
                      )}
                    </div>
                    <div className="text-5xl font-black text-text-muted/20">{idx + 1}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Full List */}
          {rankings.length > 0 && (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-text-muted border-b border-border">
                      <th className="pb-3 font-medium w-16">{t("colRank")}</th>
                      <th className="pb-3 font-medium">{t("colProvider")}</th>
                      <th className="pb-3 font-medium">{t("colTopModel")}</th>
                      <th className="pb-3 font-medium text-right">{t("colScore")}</th>
                      <th className="pb-3 font-medium text-right">{t("colAvgScore")}</th>
                      <th className="pb-3 font-medium text-right">{t("colModels")}</th>
                      <th className="pb-3 font-medium text-right">{t("colType")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((provider, idx) => (
                      <tr key={provider.id} className="border-b border-border/50 last:border-b-0">
                        <td className="py-3 text-text-muted font-mono">{idx + 1}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                              style={{ backgroundColor: provider.color }}
                            >
                              {provider.textIcon || provider.name.charAt(0)}
                            </div>
                            <span className="font-medium">{provider.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-text-muted truncate max-w-[200px]">
                          {provider.topModel?.modelName || "—"}
                        </td>
                        <td className="py-3 text-right">
                          {provider.topModel ? (
                            <span
                              className={`font-mono font-medium ${scoreColor(provider.topModel.score)}`}
                            >
                              {scoreLabel(provider.topModel.score)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="py-3 text-right font-mono text-text-muted">
                          {scoreLabel(provider.averageScore)}
                        </td>
                        <td className="py-3 text-right text-text-muted">{provider.modelCount}</td>
                        <td className="py-3 text-right">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              provider.category === "noauth"
                                ? "bg-green-500/10 text-green-500"
                                : provider.category === "oauth"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-purple-500/10 text-purple-500"
                            }`}
                          >
                            {provider.category.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {rankings.length === 0 && !error && (
            <Card>
              <div className="text-center py-12 text-text-muted">{t("emptyState")}</div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
