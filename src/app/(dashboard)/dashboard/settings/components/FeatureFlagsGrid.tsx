"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import FeatureFlagCard from "./FeatureFlagCard";

// Type for flag data from API
interface FlagData {
  key: string;
  label: string;
  description: string;
  category: "security" | "network" | "policies" | "runtime" | "cli" | "health";
  type: "boolean" | "enum";
  enumValues: string[] | null;
  defaultValue: string;
  effectiveValue: string;
  source: "db" | "env" | "default";
  requiresRestart: boolean;
  warningLevel?: "info" | "caution" | "danger";
}

interface Summary {
  total: number;
  active: number;
  inactive: number;
  overriddenByDb: number;
  overriddenByEnv: number;
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "security", label: "Security (6)" },
  { value: "network", label: "Network (5)" },
  { value: "policies", label: "Policies (3)" },
  { value: "runtime", label: "Runtime (7)" },
  { value: "cli", label: "CLI (3)" },
  { value: "health", label: "Health (3)" },
  // Synthetic "category" that filters by requiresRestart=true regardless of
  // real category — surfaces flags that need a process restart to take effect.
  { value: "__restart", label: "Requires Restart" },
];

export default function FeatureFlagsGrid() {
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [resettingAll, setResettingAll] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Set of flag keys whose DB override was changed in this session without
  // a subsequent restart. Used to surface the restart banner.
  const [pendingRestartKeys, setPendingRestartKeys] = useState<Set<string>>(new Set());
  const [restarting, setRestarting] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const loadFlags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/feature-flags");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setFlags(data.flags);
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feature flags");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFlags();
  }, [loadFlags]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredFlags = useMemo(() => {
    return flags
      .filter((f) => {
        if (category === "all") return true;
        if (category === "__restart") return f.requiresRestart;
        return f.category === category;
      })
      .filter(
        (f) =>
          debouncedSearch === "" ||
          f.key.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          f.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
  }, [flags, debouncedSearch, category]);

  const handleToggle = useCallback(async (key: string, newValue: string) => {
    setSavingKeys((prev) => new Set(prev).add(key));
    try {
      const res = await fetch("/api/settings/feature-flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: newValue }),
      });
      if (!res.ok) {
        setError(`Failed to update flag: HTTP ${res.status}`);
        return;
      }
      const result = await res.json();
      setFlags((prev) => {
        const oldFlag = prev.find((f) => f.key === key);
        const wasDb = oldFlag?.source === "db";
        const isNowDb = result.source === "db";
        setSummary((s) =>
          s ? { ...s, overriddenByDb: s.overriddenByDb + (isNowDb ? 1 : 0) - (wasDb ? 1 : 0) } : s
        );
        return prev.map((f) =>
          f.key === key ? { ...f, effectiveValue: result.effectiveValue, source: result.source } : f
        );
      });
      if (result.requiresRestart) {
        setPendingRestartKeys((prev) => new Set(prev).add(key));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update flag");
    } finally {
      setSavingKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }, []);

  const handleReset = useCallback(async (key: string) => {
    setSavingKeys((prev) => new Set(prev).add(key));
    try {
      const res = await fetch("/api/settings/feature-flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }), // no value = remove override
      });
      if (!res.ok) {
        setError(`Failed to update flag: HTTP ${res.status}`);
        return;
      }
      const result = await res.json();
      setFlags((prev) => {
        const oldFlag = prev.find((f) => f.key === key);
        const wasDb = oldFlag?.source === "db";
        const isNowDb = result.source === "db";
        setSummary((s) =>
          s ? { ...s, overriddenByDb: s.overriddenByDb + (isNowDb ? 1 : 0) - (wasDb ? 1 : 0) } : s
        );
        return prev.map((f) =>
          f.key === key ? { ...f, effectiveValue: result.effectiveValue, source: result.source } : f
        );
      });
      if (result.requiresRestart) {
        setPendingRestartKeys((prev) => new Set(prev).add(key));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update flag");
    } finally {
      setSavingKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }, []);

  const handleRestart = useCallback(async () => {
    setRestarting(true);
    try {
      const res = await fetch("/api/restart", { method: "POST" });
      if (!res.ok) {
        setError(`Restart failed: HTTP ${res.status}`);
        setShowRestartConfirm(false);
        setRestarting(false);
        return;
      }
      // Server is going down — wait for it to come back, then reload.
      const stillUp = async () => {
        try {
          const r = await fetch("/api/health", { cache: "no-store" });
          return r.ok;
        } catch {
          return false;
        }
      };
      const waitDown = setInterval(async () => {
        if (!(await stillUp())) {
          clearInterval(waitDown);
          const waitUp = setInterval(async () => {
            if (await stillUp()) {
              clearInterval(waitUp);
              setPendingRestartKeys(new Set());
              window.location.reload();
            }
          }, 1000);
        }
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Restart failed");
      setShowRestartConfirm(false);
      setRestarting(false);
    }
  }, []);

  const handleResetAll = useCallback(async () => {
    setResettingAll(true);
    try {
      const res = await fetch("/api/settings/feature-flags", { method: "DELETE" });
      if (!res.ok) {
        setError(`Failed to reset overrides: HTTP ${res.status}`);
        setShowResetConfirm(false);
        return;
      }
      await loadFlags();
      setShowResetConfirm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset overrides");
      setShowResetConfirm(false);
    } finally {
      setResettingAll(false);
    }
  }, [loadFlags]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Feature Flags</h1>
          {summary && (
            <div className="mt-1 flex gap-3 text-sm">
              <span className="text-green-400">{summary.active} active</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{summary.inactive} inactive</span>
              <span className="text-slate-500">·</span>
              <span className="text-blue-400">{summary.overriddenByDb} DB overrides</span>
            </div>
          )}
        </div>

        {/* Search + Filter */}
        <div className="flex gap-2">
          {/* Search input with search icon */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-sm text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search flags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-white/20"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-slate-900">
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pending-restart banner — shown when at least one requiresRestart flag
          was toggled in this session. */}
      {pendingRestartKeys.size > 0 && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-400">restart_alt</span>
              <div>
                <p className="text-sm font-medium text-amber-300">
                  {pendingRestartKeys.size} change{pendingRestartKeys.size === 1 ? "" : "s"} require
                  a server restart to take effect.
                </p>
                <p className="mt-0.5 text-xs text-amber-200/80">
                  These flags only apply after the process reloads. Restart now or continue editing
                  — pending flags stay queued until you confirm.
                </p>
              </div>
            </div>
            {!showRestartConfirm ? (
              <button
                onClick={() => setShowRestartConfirm(true)}
                className="shrink-0 rounded-lg border border-amber-400/40 px-4 py-2 text-sm text-amber-300 hover:bg-amber-500/20 transition-colors"
              >
                Restart Server
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="text-sm text-amber-300/80 hover:text-amber-200"
                  disabled={restarting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestart}
                  disabled={restarting}
                  className="rounded-lg bg-amber-500/30 px-4 py-2 text-sm text-amber-200 hover:bg-amber-500/40 disabled:opacity-50 transition-colors"
                >
                  {restarting ? "Restarting…" : "Confirm Restart"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Explanation banner for the synthetic "Requires Restart" view */}
      {category === "__restart" && (
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-200">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-blue-300">info</span>
            <p>
              These flags only take effect after the server restarts. Toggle them like any other
              flag — the change is persisted immediately, but the new value is only read at process
              startup. Use the <strong>Restart Server</strong> banner above to apply.
            </p>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-36 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{error}</p>
          <button onClick={loadFlags} className="text-sm text-red-400 underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {filteredFlags.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl">search_off</span>
              <p className="mt-2 text-sm">No flags match your search</p>
            </div>
          ) : (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
            >
              {filteredFlags.map((flag) => (
                <FeatureFlagCard
                  key={flag.key}
                  flag={flag}
                  onToggle={handleToggle}
                  onReset={handleReset}
                  saving={savingKeys.has(flag.key)}
                />
              ))}
            </div>
          )}

          {/* Reset All button */}
          {summary && summary.overriddenByDb > 0 && (
            <div className="flex justify-end pt-4 border-t border-white/10">
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Reset All Overrides
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-slate-400">
                    Reset all {summary.overriddenByDb} DB override(s)?
                  </p>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetAll}
                    disabled={resettingAll}
                    className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/30 disabled:opacity-50 transition-colors"
                  >
                    {resettingAll ? "Resetting..." : "Confirm Reset"}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
