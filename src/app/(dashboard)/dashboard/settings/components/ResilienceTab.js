"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button } from "@/shared/components";

// ─── State colors and labels ──────────────────────────────────────────────
const STATE_STYLES = {
  CLOSED: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    label: "CLOSED",
    icon: "check_circle",
  },
  OPEN: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    label: "OPEN",
    icon: "error",
  },
  HALF_OPEN: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    label: "HALF-OPEN",
    icon: "warning",
  },
};

function formatMs(ms) {
  if (!ms || ms <= 0) return "—";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

// ─── Circuit Breaker Card ────────────────────────────────────────────────
function CircuitBreakerCard({ breakers, onReset, loading }) {
  const activeBreakers = breakers.filter((b) => b.state !== "CLOSED");
  const totalBreakers = breakers.length;

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              electrical_services
            </span>
            <h2 className="text-lg font-bold">Circuit Breakers</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              {activeBreakers.length > 0
                ? `${activeBreakers.length} tripped`
                : `${totalBreakers} healthy`}
            </span>
            {activeBreakers.length > 0 && (
              <Button
                size="sm"
                variant="danger"
                icon="restart_alt"
                onClick={onReset}
                disabled={loading}
              >
                Reset All
              </Button>
            )}
          </div>
        </div>

        {breakers.length === 0 ? (
          <p className="text-sm text-text-muted">
            No circuit breakers active yet. They are created automatically when requests flow
            through the combo pipeline.
          </p>
        ) : (
          <div className="space-y-2">
            {breakers.map((b) => {
              const style = STATE_STYLES[b.state] || STATE_STYLES.CLOSED;
              return (
                <div
                  key={b.name}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/5 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-base ${style.text}`}
                      aria-hidden="true"
                    >
                      {style.icon}
                    </span>
                    <span className="text-sm font-medium">{b.name.replace("combo:", "")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {b.failureCount > 0 && (
                      <span className="text-xs text-text-muted">
                        {b.failureCount} failure{b.failureCount !== 1 ? "s" : ""}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${style.bg} ${style.text} border ${style.border}`}
                    >
                      {style.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── Provider Profiles Card ──────────────────────────────────────────────
function ProviderProfilesCard({ profiles, onSave, saving }) {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(profiles);

  useEffect(() => {
    setDraft(profiles);
  }, [profiles]);

  const fields = [
    { key: "transientCooldown", label: "Transient Cooldown", suffix: "ms" },
    { key: "rateLimitCooldown", label: "Rate Limit Cooldown", suffix: "ms" },
    { key: "maxBackoffLevel", label: "Max Backoff Level", suffix: "" },
    { key: "circuitBreakerThreshold", label: "CB Threshold", suffix: " fails" },
    { key: "circuitBreakerReset", label: "CB Reset Time", suffix: "ms" },
  ];

  const handleSave = () => {
    onSave(draft);
    setEditMode(false);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              tune
            </span>
            <h2 className="text-lg font-bold">Provider Profiles</h2>
          </div>
          {editMode ? (
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="save"
                onClick={handleSave}
                disabled={saving}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" icon="edit" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </div>

        <p className="text-sm text-text-muted mb-4">
          Separate resilience settings for OAuth (session-based) and API Key (metered) providers.
          OAuth providers have stricter thresholds due to lower rate limits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["oauth", "apikey"].map((type) => (
            <div key={type} className="rounded-lg bg-black/5 dark:bg-white/5 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  {type === "oauth" ? "lock" : "key"}
                </span>
                {type === "oauth" ? "OAuth Providers" : "API Key Providers"}
              </h3>
              <div className="space-y-2">
                {fields.map(({ key, label, suffix }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{label}</span>
                    {editMode ? (
                      <input
                        type="number"
                        min="0"
                        value={draft?.[type]?.[key] ?? 0}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            [type]: { ...draft[type], [key]: Number(e.target.value) },
                          })
                        }
                        className="w-24 px-2 py-1 text-xs rounded bg-white/10 border border-white/20 text-right"
                      />
                    ) : (
                      <span className="text-sm font-mono">
                        {profiles?.[type]?.[key] ?? "—"}
                        {suffix && profiles?.[type]?.[key] != null ? suffix : ""}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Rate Limit Overview Card ────────────────────────────────────────────
function RateLimitOverviewCard({ rateLimitStatus, defaults }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
            speed
          </span>
          <h2 className="text-lg font-bold">Rate Limiting</h2>
        </div>

        <p className="text-sm text-text-muted mb-4">
          API Key providers are automatically rate-limited with safe defaults. Limits are learned
          from response headers and adapt over time.
        </p>

        <div className="rounded-lg bg-black/5 dark:bg-white/5 p-4 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-text-muted">
            Default Safety Net
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-lg font-bold">{defaults?.requestsPerMinute ?? "—"}</div>
              <div className="text-xs text-text-muted">RPM</div>
            </div>
            <div>
              <div className="text-lg font-bold">{formatMs(defaults?.minTimeBetweenRequests)}</div>
              <div className="text-xs text-text-muted">Min Gap</div>
            </div>
            <div>
              <div className="text-lg font-bold">{defaults?.concurrentRequests ?? "—"}</div>
              <div className="text-xs text-text-muted">Max Concurrent</div>
            </div>
          </div>
        </div>

        {rateLimitStatus && rateLimitStatus.length > 0 ? (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Active Limiters
            </h3>
            {rateLimitStatus.map((rl, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/5 dark:bg-white/5"
              >
                <span className="text-sm font-medium">{rl.provider || rl.key}</span>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  {rl.reservoir != null && <span>Reservoir: {rl.reservoir}</span>}
                  {rl.running != null && <span>Running: {rl.running}</span>}
                  {rl.queued != null && <span>Queued: {rl.queued}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted">No active rate limiters yet.</p>
        )}
      </div>
    </Card>
  );
}

// ─── Main Resilience Tab ─────────────────────────────────────────────────
export default function ResilienceTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/resilience");
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Auto-refresh every 10s
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleResetBreakers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/resilience/reset", { method: "POST" });
      if (!res.ok) throw new Error("Reset failed");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfiles = async (profiles) => {
    try {
      setSaving(true);
      const res = await fetch("/api/resilience", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles }),
      });
      if (!res.ok) throw new Error("Save failed");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        <span className="material-symbols-outlined animate-spin mr-2">hourglass_empty</span>
        Loading resilience status...
      </div>
    );
  }

  if (error && !data) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-red-400">
          <span className="material-symbols-outlined">error</span>
          <span className="text-sm">{error}</span>
        </div>
        <Button size="sm" variant="secondary" icon="refresh" onClick={loadData} className="mt-3">
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <CircuitBreakerCard
        breakers={data?.circuitBreakers || []}
        onReset={handleResetBreakers}
        loading={loading}
      />
      <ProviderProfilesCard
        profiles={data?.profiles || {}}
        onSave={handleSaveProfiles}
        saving={saving}
      />
      <RateLimitOverviewCard
        rateLimitStatus={data?.rateLimitStatus || []}
        defaults={data?.defaults || {}}
      />
    </div>
  );
}
