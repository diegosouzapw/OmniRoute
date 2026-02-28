"use client";

/**
 * PoliciesPanel — Batch E
 *
 * Shows circuit breaker states and locked identifiers.
 * Allows force-unlocking locked identifiers.
 * API: /api/policies
 */

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

const CB_STATUS = {
  closed: { icon: "check_circle", color: "#22c55e", label: "Closed" },
  "half-open": { icon: "pending", color: "#f59e0b", label: "Half-Open" },
  open: { icon: "error", color: "#ef4444", label: "Open" },
};

export default function PoliciesPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(null);
  const notify = useNotificationStore();
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
        notify.success(`Unlocked: ${identifier}`);
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

  if (loading) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-2 text-text-muted animate-pulse">
          <span className="material-symbols-outlined text-[20px]">security</span>
          {t("loadingPolicies")}
        </div>
      </Card>
    );
  }

  const circuitBreakers = data?.circuitBreakers || [];
  const lockedIds = data?.lockedIdentifiers || [];
  const hasIssues = circuitBreakers.some((cb) => cb.state !== "closed") || lockedIds.length > 0;

  if (!hasIssues) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main">{t("policiesCircuitBreakers")}</h3>
            <p className="text-sm text-text-muted">{t("allOperational")}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
            <span className="material-symbols-outlined text-[20px]">gpp_maybe</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main">{t("policiesCircuitBreakers")}</h3>
            <p className="text-sm text-text-muted">{t("activeIssuesDetected")}</p>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={fetchPolicies}>
          <span className="material-symbols-outlined text-[16px]">refresh</span>
        </Button>
      </div>

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
                        {cb.name || cb.provider || "Unknown"}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${status.color}15`,
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </span>
                      {cb.failures > 0 && (
                        <span className="text-xs text-text-muted">{cb.failures} failures</span>
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
                    <span className="material-symbols-outlined text-[16px] text-red-400">lock</span>
                    <span className="font-mono text-sm text-text-main">{identifier}</span>
                    {typeof id === "object" && id.lockedAt && (
                      <span className="text-xs text-text-muted">
                        since {new Date(id.lockedAt).toLocaleString()}
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
    </Card>
  );
}
