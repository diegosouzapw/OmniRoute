"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useLocale, useTranslations } from "next-intl";

// ─── State colors and labels ──────────────────────────────────────────────
const STATE_STYLES = {
  CLOSED: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    icon: "check_circle",
  },
  OPEN: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    icon: "error",
  },
  HALF_OPEN: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    icon: "warning",
  },
};

const CB_STATUS = {
  closed: { icon: "check_circle", color: "#22c55e" },
  "half-open": { icon: "pending", color: "#f59e0b" },
  open: { icon: "error", color: "#ef4444" },
};

function getBreakerStateLabel(state, t) {
  const normalized = String(state || "closed")
    .toLowerCase()
    .replaceAll("_", "-");
  if (normalized === "open") return t("breakerStateOpen");
  if (normalized === "half-open") return t("breakerStateHalfOpen");
  return t("breakerStateClosed");
}

function formatMs(ms) {
  if (!ms || ms <= 0) return "—";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function getErrorMessage(err, fallback) {
  return err instanceof Error && err.message ? err.message : fallback;
}

// ─── Provider Profiles Card ──────────────────────────────────────────────
function ProviderProfilesCard({ profiles, onSave, saving }) {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(profiles);
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  useEffect(() => {
    setDraft(profiles);
  }, [profiles]);

  const formatMsRaw = (value) => (value == null ? "—" : `${value}${t("ms")}`);
  const fields = [
    { key: "transientCooldown", label: t("transientCooldown"), format: formatMsRaw },
    { key: "rateLimitCooldown", label: t("rateLimitCooldown"), format: formatMsRaw },
    { key: "maxBackoffLevel", label: t("maxBackoffLevel") },
    {
      key: "circuitBreakerThreshold",
      label: t("cbThreshold"),
      format: (value) => (value == null ? "—" : t("failures", { count: value })),
    },
    { key: "circuitBreakerReset", label: t("cbResetTime"), format: formatMsRaw },
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
            <h2 className="text-lg font-bold">{t("providerProfiles")}</h2>
          </div>
          {editMode ? (
            <div className="flex flex-wrap justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={() => setEditMode(false)}>
                {tc("cancel")}
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="save"
                onClick={handleSave}
                disabled={saving}
              >
                {tc("save")}
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" icon="edit" onClick={() => setEditMode(true)}>
              {tc("edit")}
            </Button>
          )}
        </div>

        <p className="text-sm text-text-muted mb-4">{t("providerProfilesDesc")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["oauth", "apikey"].map((type) => (
            <div key={type} className="rounded-lg bg-black/5 dark:bg-white/5 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  {type === "oauth" ? "lock" : "key"}
                </span>
                {type === "oauth" ? t("oauthProviders") : t("apiKeyProviders")}
              </h3>
              <div className="space-y-2">
                {fields.map(({ key, label, format }) => (
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
                        {format
                          ? format(profiles?.[type]?.[key])
                          : (profiles?.[type]?.[key] ?? "—")}
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

// ─── Editable Rate Limit Card ─────────────────────────────────────────────
function RateLimitCard({ rateLimitStatus, defaults, onSaveDefaults, saving }) {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(defaults || {});
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  // Sync draft when defaults change from parent (standard prop-to-state sync)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (defaults) setDraft(defaults);
  }, [defaults]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = () => {
    onSaveDefaults(draft);
    setEditMode(false);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              speed
            </span>
            <h2 className="text-lg font-bold">{t("rateLimiting")}</h2>
          </div>
          {editMode ? (
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setEditMode(false)}>
                {tc("cancel")}
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="save"
                onClick={handleSave}
                disabled={saving}
              >
                {tc("save")}
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" icon="edit" onClick={() => setEditMode(true)}>
              {tc("edit")}
            </Button>
          )}
        </div>

        <p className="text-sm text-text-muted mb-4">{t("rateLimitingDesc")}</p>

        <div className="rounded-lg bg-black/5 dark:bg-white/5 p-4 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-text-muted">
            {t("defaultSafetyNet")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "requestsPerMinute", label: t("rpm") },
              { key: "minTimeBetweenRequests", label: t("minGap"), format: formatMs },
              { key: "concurrentRequests", label: t("maxConcurrent") },
            ].map(({ key, label, format }) => (
              <div key={key}>
                {editMode ? (
                  <input
                    type="number"
                    min="1"
                    value={draft[key] ?? 0}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))
                    }
                    className="w-full px-2 py-1 text-lg font-bold rounded bg-white/10 border border-white/20"
                  />
                ) : (
                  <div className="text-lg font-bold">
                    {format ? format(defaults?.[key]) : (defaults?.[key] ?? "—")}
                  </div>
                )}
                <div className="text-xs text-text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {rateLimitStatus && rateLimitStatus.length > 0 ? (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {t("activeLimiters")}
            </h3>
            {rateLimitStatus.map((rl, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/5 dark:bg-white/5"
              >
                <span className="text-sm font-medium">{rl.provider || rl.key}</span>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  {rl.reservoir != null && (
                    <span>
                      {t("reservoir")}: {rl.reservoir}
                    </span>
                  )}
                  {rl.running != null && (
                    <span>
                      {t("running")}: {rl.running}
                    </span>
                  )}
                  {rl.queued != null && (
                    <span>
                      {t("queued")}: {rl.queued}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted">{t("noActiveLimiters")}</p>
        )}
      </div>
    </Card>
  );
}

// ─── Circuit Breaker Card ────────────────────────────────────────────────
function CircuitBreakerCard({ breakers, onReset, loading }) {
  const activeBreakers = breakers.filter((b) => b.state !== "CLOSED");
  const totalBreakers = breakers.length;
  const t = useTranslations("settings");

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              electrical_services
            </span>
            <h2 className="text-lg font-bold">{t("circuitBreakers")}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              {activeBreakers.length > 0
                ? t("tripped", { count: activeBreakers.length })
                : t("healthy", { count: totalBreakers })}
            </span>
            {activeBreakers.length > 0 && (
              <Button
                size="sm"
                variant="danger"
                icon="restart_alt"
                onClick={onReset}
                disabled={loading}
              >
                {t("resetAll")}
              </Button>
            )}
          </div>
        </div>

        {breakers.length === 0 ? (
          <p className="text-sm text-text-muted">{t("noCircuitBreakers")}</p>
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
                        {t("failures", { count: b.failureCount })}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${style.bg} ${style.text} border ${style.border}`}
                    >
                      {getBreakerStateLabel(b.state, t)}
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

// ─── Policies Panel (from Security tab) ──────────────────────────────────
function PoliciesCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(null);
  const notify = useNotificationStore();
  const locale = useLocale();
  const t = useTranslations("settings");

  const fetchPolicies = useCallback(async () => {
    try {
      const res = await fetch("/api/policies");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
    const interval = setInterval(fetchPolicies, 15000);
    return () => clearInterval(interval);
  }, [fetchPolicies]);

  const handleUnlock = async (identifier) => {
    setUnlocking(identifier);
    try {
      const res = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlock", identifier }),
      });
      if (res.ok) {
        notify.success(t("unlockedIdentifier", { identifier }));
        await fetchPolicies();
      } else {
        notify.error(t("failedUnlock"));
      }
    } catch {
      notify.error(t("failedUnlock"));
    } finally {
      setUnlocking(null);
    }
  };

  const circuitBreakers = data?.circuitBreakers || [];
  const lockedIds = data?.lockedIdentifiers || [];
  const hasIssues = circuitBreakers.some((cb) => cb.state !== "closed") || lockedIds.length > 0;

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-text-muted animate-pulse">
          <span className="material-symbols-outlined text-[20px]">policy</span>
          {t("loadingPolicies")}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
              policy
            </span>
            <h2 className="text-lg font-bold">{t("policiesLocked")}</h2>
          </div>
          {hasIssues && (
            <Button size="sm" variant="ghost" onClick={fetchPolicies}>
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </Button>
          )}
        </div>

        {!hasIssues ? (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <p className="text-sm text-text-muted">{t("allOperational")}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Circuit Breakers */}
            {circuitBreakers.filter((cb) => cb.state !== "closed").length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-text-muted mb-2">{t("circuitBreakers")}</p>
                <div className="flex flex-col gap-1.5">
                  {circuitBreakers
                    .filter((cb) => cb.state !== "closed")
                    .map((cb, i) => {
                      const status = CB_STATUS[cb.state] || CB_STATUS.open;
                      return (
                        <div
                          key={cb.name || i}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface/30 border border-border/20"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ color: status.color }}
                            >
                              {status.icon}
                            </span>
                            <span className="text-sm text-text-main font-medium">
                              {cb.name || cb.provider || t("unknown")}
                            </span>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${status.color}15`,
                                color: status.color,
                              }}
                            >
                              {getBreakerStateLabel(cb.state, t)}
                            </span>
                            {cb.failures > 0 && (
                              <span className="text-xs text-text-muted">
                                {t("failures", { count: cb.failures })}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Locked Identifiers */}
            {lockedIds.length > 0 && (
              <div>
                <p className="text-sm font-medium text-text-muted mb-2">{t("lockedIdentifiers")}</p>
                <div className="flex flex-col gap-1.5">
                  {lockedIds.map((id, i) => {
                    const identifier = typeof id === "string" ? id : id.identifier || id.id;
                    return (
                      <div
                        key={identifier || i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface/30 border border-border/20"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-red-400">
                            lock
                          </span>
                          <span className="font-mono text-sm text-text-main">{identifier}</span>
                          {typeof id === "object" && id.lockedAt && (
                            <span className="text-xs text-text-muted">
                              {t("sinceDate", {
                                date: new Date(id.lockedAt).toLocaleString(locale),
                              })}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUnlock(identifier)}
                          disabled={unlocking === identifier}
                          className="text-xs"
                        >
                          {unlocking === identifier ? t("unlocking") : t("forceUnlock")}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
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
  const t = useTranslations("settings");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/resilience");
      if (!res.ok) throw new Error(t("failedLoadWithStatus", { status: res.status }));
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, t("failedLoadResilience")));
    } finally {
      setLoading(false);
    }
  }, [t]);

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
      if (!res.ok) throw new Error(t("resetFailed"));
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, t("resetFailed")));
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
      if (!res.ok) throw new Error(t("saveFailed"));
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, t("saveFailed")));
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDefaults = async (defaults) => {
    try {
      setSaving(true);
      const res = await fetch("/api/resilience", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ defaults }),
      });
      if (!res.ok) throw new Error(t("saveFailed"));
      await loadData();
    } catch (err) {
      setError(getErrorMessage(err, t("saveFailed")));
    } finally {
      setSaving(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        <span className="material-symbols-outlined animate-spin mr-2">hourglass_empty</span>
        {t("loadingResilience")}
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
          {t("retry")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Provider Profiles (resilience settings by auth type) */}
      <ProviderProfilesCard
        profiles={data?.profiles || {}}
        onSave={handleSaveProfiles}
        saving={saving}
      />
      {/* 2. Rate Limiting (editable defaults + active limiters) */}
      <RateLimitCard
        rateLimitStatus={data?.rateLimitStatus || []}
        defaults={data?.defaults || {}}
        onSaveDefaults={handleSaveDefaults}
        saving={saving}
      />
      {/* 3. Circuit Breakers (combo pipeline) */}
      <CircuitBreakerCard
        breakers={data?.circuitBreakers || []}
        onReset={handleResetBreakers}
        loading={loading}
      />
      {/* 4. Policies & Locked Identifiers (from previous Security tab) */}
      <PoliciesCard />
    </div>
  );
}
