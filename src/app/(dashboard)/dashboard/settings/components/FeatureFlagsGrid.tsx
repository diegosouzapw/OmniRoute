"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { matchesSearch } from "@/shared/utils/turkishText";
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

interface FlagUpdateResult {
  effectiveValue: string;
  source: FlagData["source"];
  previousValue: string;
  previousSource: FlagData["source"];
  requiresRestart: boolean;
}

const ACTIVE_VALUES = new Set(["true", "1", "yes"]);

function isActiveFlagValue(value: string): boolean {
  return ACTIVE_VALUES.has(value);
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "security", label: "Security" },
  { value: "network", label: "Network" },
  { value: "policies", label: "Policies" },
  { value: "runtime", label: "Runtime" },
  { value: "cli", label: "CLI" },
  { value: "health", label: "Health" },
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

  const applyFlagResult = useCallback((key: string, result: FlagUpdateResult) => {
    const wasActive = isActiveFlagValue(result.previousValue);
    const isNowActive = isActiveFlagValue(result.effectiveValue);
    const wasDb = result.previousSource === "db";
    const isNowDb = result.source === "db";
    const wasEnv = result.previousSource === "env";
    const isNowEnv = result.source === "env";

    setFlags((prev) =>
      prev.map((f) =>
        f.key === key ? { ...f, effectiveValue: result.effectiveValue, source: result.source } : f
      )
    );
    setSummary((s) =>
      s
        ? {
            ...s,
            active: s.active + (isNowActive ? 1 : 0) - (wasActive ? 1 : 0),
            inactive: s.inactive + (isNowActive ? 0 : 1) - (wasActive ? 0 : 1),
            overriddenByDb: s.overriddenByDb + (isNowDb ? 1 : 0) - (wasDb ? 1 : 0),
            overriddenByEnv: s.overriddenByEnv + (isNowEnv ? 1 : 0) - (wasEnv ? 1 : 0),
          }
        : s
    );
  }, []);

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
          matchesSearch(f.key, debouncedSearch) ||
          matchesSearch(f.description, debouncedSearch)
      );
  }, [flags, debouncedSearch, category]);

  const handleToggle = useCallback(
    async (key: string, newValue: string) => {
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
        const result = (await res.json()) as FlagUpdateResult;
        applyFlagResult(key, result);
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
    },
    [applyFlagResult]
  );

  const handleReset = useCallback(
    async (key: string) => {
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
        const result = (await res.json()) as FlagUpdateResult;
        applyFlagResult(key, result);
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
    },
    [applyFlagResult]
  );

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
          const r = await fetch("/api/health/ping", { cache: "no-store" });
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
          <h1 className="text-2xl font-semibold text-text-primary">Feature Flags</h1>
          {summary && (
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                {summary.active} active
              </span>
              <span className="text-text-muted/60">·</span>
              <span className="text-text-muted">{summary.inactive} inactive</span>
              <span className="text-text-muted/60">·</span>
              <span className="font-medium text-sky-700 dark:text-sky-300">
                {summary.overriddenByDb} DB overrides
              </span>
            </div>
          )}
        </div>

        {/* Search + Filter */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {/* Search input with search icon */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-sm text-text-muted">
              search
            </span>
            <input
              type="text"
              placeholder="Search flags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-subtle py-1.5 pl-8 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 sm:w-64"
            />
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-1.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 sm:w-auto"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-card text-text-primary">
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pending-restart banner — shown when at least one requiresRestart flag
          was toggled in this session. */}
      {pendingRestartKeys.size > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-300">
                restart_alt
              </span>
              <div>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                  {pendingRestartKeys.size} change{pendingRestartKeys.size === 1 ? "" : "s"} require
                  a server restart to take effect.
                </p>
                <p className="mt-0.5 text-xs text-amber-800/80 dark:text-amber-200/80">
                  These flags only apply after the process reloads. Restart now or continue editing
                  — pending flags stay queued until you confirm.
                </p>
              </div>
            </div>
            {!showRestartConfirm ? (
              <button
                onClick={() => setShowRestartConfirm(true)}
                className="shrink-0 rounded-lg border border-amber-300 bg-white/70 px-4 py-2 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-400/40 dark:bg-transparent dark:text-amber-300 dark:hover:bg-amber-500/20"
              >
                Restart Server
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="text-sm text-amber-800/80 hover:text-amber-950 dark:text-amber-300/80 dark:hover:text-amber-200"
                  disabled={restarting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestart}
                  disabled={restarting}
                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50 dark:bg-amber-500/30 dark:text-amber-200 dark:hover:bg-amber-500/40"
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
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sky-600 dark:text-blue-300">info</span>
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
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-xl bg-black/[0.04] dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={loadFlags}
            className="text-sm font-medium text-red-700 underline hover:no-underline dark:text-red-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {filteredFlags.length === 0 ? (
            <div className="py-16 text-center text-text-muted">
              <span className="material-symbols-outlined text-4xl">search_off</span>
              <p className="mt-2 text-sm">No flags match your search</p>
            </div>
          ) : (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}
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
            <div className="flex justify-end border-t border-border pt-4">
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="rounded-lg border border-red-200 bg-red-50/60 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/40 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-500/10"
                >
                  Reset All Overrides
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-text-muted">
                    Reset all {summary.overriddenByDb} DB override(s)?
                  </p>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="text-sm text-text-muted hover:text-text-primary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetAll}
                    disabled={resettingAll}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30"
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
