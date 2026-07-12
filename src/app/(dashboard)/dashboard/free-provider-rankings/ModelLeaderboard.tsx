"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import { matchesSearch } from "@/shared/utils/turkishText";

interface LeaderboardEntry {
  rank: number;
  model: string;
  overall: number;
  reasoning: number;
  coding: number;
  agenticCoding: number;
  mathematics: number;
  dataAnalysis: number;
  language: number;
  instructionFollowing: number;
  costPerSuccessfulTask: string;
}

interface LeaderboardData {
  entries: LeaderboardEntry[];
  release: string;
  scrapedAt: string;
  source: string;
}

type SortKey =
  | "overall"
  | "reasoning"
  | "coding"
  | "agenticCoding"
  | "mathematics"
  | "dataAnalysis"
  | "language"
  | "instructionFollowing";

const CATEGORY_COLUMNS: Array<{
  key: SortKey;
  label: string;
  shortLabel: string;
}> = [
  { key: "overall", label: "Overall", shortLabel: "OVR" },
  { key: "reasoning", label: "Reasoning", shortLabel: "RSN" },
  { key: "coding", label: "Coding", shortLabel: "COD" },
  { key: "agenticCoding", label: "Agentic Coding", shortLabel: "AGC" },
  { key: "mathematics", label: "Mathematics", shortLabel: "MTH" },
  { key: "dataAnalysis", label: "Data Analysis", shortLabel: "DAT" },
  { key: "language", label: "Language", shortLabel: "LAN" },
  {
    key: "instructionFollowing",
    label: "Instruction Following",
    shortLabel: "INS",
  },
];

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 70) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 50) return "text-orange-400";
  return "text-red-400";
}

function scoreBarBg(score: number): string {
  if (score >= 80) return "bg-green-400";
  if (score >= 70) return "bg-emerald-400";
  if (score >= 60) return "bg-yellow-400";
  if (score >= 50) return "bg-orange-400";
  return "bg-red-400";
}

function rankBadge(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ModelLeaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [sortAsc, setSortAsc] = useState(false);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const fetchData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError("");
    try {
      const params = forceRefresh ? "?refresh=true" : "";
      const res = await fetch(`/api/leaderboard${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const sorted = [...(data?.entries || [])].sort((a, b) => {
    const diff = (a[sortKey] || 0) - (b[sortKey] || 0);
    return sortAsc ? diff : -diff;
  });

  const filtered = sorted.filter((e) => (search ? matchesSearch(e.model, search) : true));

  const visible = showAll ? filtered : filtered.slice(0, 20);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  if (loading && !data) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">Loading LiveBench leaderboard…</div>
        </div>
      </Card>
    );
  }

  if (error && !data) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-amber-400">warning</span>
          <div>
            <p className="text-sm font-semibold text-text-main">Leaderboard unavailable</p>
            <p className="text-xs text-text-muted mt-1">{error}</p>
          </div>
          <button
            onClick={() => void fetchData(true)}
            className="ml-auto px-3 py-1.5 text-xs rounded-lg border border-border/30 text-text-muted hover:text-text-main hover:border-violet-500/50 transition-colors"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-xl">leaderboard</span>
            <h3 className="text-lg font-bold text-text-main">Model Leaderboard</h3>
          </div>
          <p className="text-sm text-text-muted mt-1">
            LiveBench scores — contamination-free LLM benchmark
            {data?.release && data.release !== "unknown" && (
              <span className="ml-2 text-xs text-violet-400">(release {data.release})</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative block min-w-48">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models…"
              className="w-full rounded-lg border border-border/40 bg-surface/40 py-2 pl-9 pr-3 text-sm text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </label>
          <div className="flex items-center gap-2">
            {data?.scrapedAt && (
              <span className="text-[10px] text-text-muted whitespace-nowrap">
                Updated {timeAgo(data.scrapedAt)}
              </span>
            )}
            <button
              onClick={() => void fetchData(true)}
              disabled={loading}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-border/30 text-text-muted hover:text-text-main hover:border-violet-500/50 transition-colors disabled:opacity-50"
              title="Refresh leaderboard data"
            >
              <span
                className={`material-symbols-outlined text-sm ${loading ? "animate-spin" : ""}`}
              >
                refresh
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {filtered.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {filtered.slice(0, 3).map((entry, idx) => (
            <div
              key={entry.model}
              className="relative overflow-hidden rounded-xl border border-border/30 bg-surface/30 p-4"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  idx === 0
                    ? "bg-gradient-to-r from-amber-400 to-yellow-600"
                    : idx === 1
                      ? "bg-gradient-to-r from-gray-300 to-gray-500"
                      : "bg-gradient-to-r from-amber-600 to-orange-800"
                }`}
              />
              <div className="flex items-center gap-3">
                <div className="text-3xl">{rankBadge(entry.rank)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{entry.model}</p>
                  <p className={`text-2xl font-bold mt-1 ${scoreColor(entry.overall)}`}>
                    {entry.overall.toFixed(1)}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {entry.costPerSuccessfulTask !== "—"
                      ? `${entry.costPerSuccessfulTask}/task`
                      : "Cost N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-[11px] uppercase text-text-muted border-b border-border/30">
              <th className="pb-2 font-semibold text-left w-12">#</th>
              <th className="pb-2 font-semibold text-left">Model</th>
              {CATEGORY_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="pb-2 font-semibold text-right cursor-pointer hover:text-text-main transition-colors"
                  onClick={() => handleSort(col.key)}
                >
                  <span className="hidden lg:inline">{col.label}</span>
                  <span className="lg:hidden">{col.shortLabel}</span>
                  {sortKey === col.key && (
                    <span className="material-symbols-outlined text-[10px] align-middle ml-0.5">
                      {sortAsc ? "arrow_upward" : "arrow_downward"}
                    </span>
                  )}
                </th>
              ))}
              <th className="pb-2 font-semibold text-right">Cost/Task</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {visible.map((entry) => (
              <tr key={entry.model} className="hover:bg-surface/20 transition-colors">
                <td className="py-2.5 text-text-muted font-mono text-xs">
                  {rankBadge(entry.rank)}
                </td>
                <td className="py-2.5 font-medium text-text-main truncate max-w-[220px]">
                  {entry.model}
                </td>
                {CATEGORY_COLUMNS.map((col) => {
                  const val = entry[col.key];
                  return (
                    <td key={col.key} className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-surface/60 hidden sm:block">
                          <div
                            className={`h-full rounded-full ${scoreBarBg(val)}`}
                            style={{ width: `${Math.min(val, 100)}%` }}
                          />
                        </div>
                        <span className={`font-mono text-xs ${scoreColor(val)}`}>
                          {val.toFixed(1)}
                        </span>
                      </div>
                    </td>
                  );
                })}
                <td className="py-2.5 text-right font-mono text-xs text-text-muted">
                  {entry.costPerSuccessfulTask !== "—" ? entry.costPerSuccessfulTask : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-text-muted">
            Showing {visible.length} of {filtered.length} models
          </p>
          {filtered.length > 20 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Show all {filtered.length} →
            </button>
          )}
          {showAll && filtered.length > 20 && (
            <button
              onClick={() => setShowAll(false)}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Show top 20 ↑
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 && !error && (
        <div className="text-center py-8 text-text-muted text-sm">
          {search ? "No models match your search" : "No leaderboard data available"}
        </div>
      )}

      {/* Source link */}
      <div className="mt-3 pt-3 border-t border-border/20">
        <a
          href="https://livebench.ai/#/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-text-muted hover:text-violet-400 transition-colors"
        >
          Source: LiveBench — Contamination-free LLM benchmark ↗
        </a>
      </div>
    </Card>
  );
}
