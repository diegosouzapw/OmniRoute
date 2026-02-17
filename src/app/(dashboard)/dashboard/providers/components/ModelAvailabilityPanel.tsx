"use client";

/**
 * ModelAvailabilityPanel — Batch B
 *
 * Shows real-time model availability and cooldown status.
 * Fetched from /api/models/availability.
 */

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

const STATUS_CONFIG = {
  available: { icon: "check_circle", color: "#22c55e", label: "Available" },
  cooldown: { icon: "schedule", color: "#f59e0b", label: "Cooldown" },
  unavailable: { icon: "error", color: "#ef4444", label: "Unavailable" },
  unknown: { icon: "help", color: "#6b7280", label: "Unknown" },
};

export default function ModelAvailabilityPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(null);
  const notify = useNotificationStore();

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/models/availability");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silent fail — will retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleClearCooldown = async (provider, model) => {
    setClearing(`${provider}:${model}`);
    try {
      const res = await fetch("/api/models/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clearCooldown", provider, model }),
      });
      if (res.ok) {
        notify.success(`Cooldown cleared for ${model}`);
        await fetchStatus();
      } else {
        notify.error("Failed to clear cooldown");
      }
    } catch {
      notify.error("Failed to clear cooldown");
    } finally {
      setClearing(null);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-2 text-text-muted animate-pulse">
          <span className="material-symbols-outlined text-[20px]">monitoring</span>
          Loading model availability...
        </div>
      </Card>
    );
  }

  const models = data?.models || [];
  const unavailableCount =
    data?.unavailableCount || models.filter((m) => m.status !== "available").length;

  if (models.length === 0 || unavailableCount === 0) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <span className="material-symbols-outlined text-[20px]">verified</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main">Model Availability</h3>
            <p className="text-sm text-text-muted">All models operational</p>
          </div>
        </div>
      </Card>
    );
  }

  // Group by provider
  const byProvider = {};
  models.forEach((m) => {
    if (m.status === "available") return;
    const key = m.provider || "unknown";
    if (!byProvider[key]) byProvider[key] = [];
    byProvider[key].push(m);
  });

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main">Model Availability</h3>
            <p className="text-sm text-text-muted">
              {unavailableCount} model{unavailableCount !== 1 ? "s" : ""} with issues
            </p>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={fetchStatus} className="text-text-muted">
          <span className="material-symbols-outlined text-[16px]">refresh</span>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {Object.entries(byProvider).map(([provider, provModels]) => (
          <div key={provider} className="border border-border/30 rounded-lg p-3">
            <p className="text-sm font-medium text-text-main mb-2 capitalize">{provider}</p>
            <div className="flex flex-col gap-1.5">
              {(provModels as any).map((m) => {
                const status = STATUS_CONFIG[m.status] || STATUS_CONFIG.unknown;
                const isClearing = clearing === `${m.provider}:${m.model}`;
                return (
                  <div
                    key={`${m.provider}-${m.model}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface/30"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ color: status.color }}
                      >
                        {status.icon}
                      </span>
                      <span className="font-mono text-sm text-text-main">{m.model}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${status.color}15`,
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </span>
                      {m.cooldownUntil && (
                        <span className="text-xs text-text-muted">
                          until {new Date(m.cooldownUntil).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    {m.status === "cooldown" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleClearCooldown(m.provider, m.model)}
                        disabled={isClearing}
                        className="text-xs"
                      >
                        {isClearing ? "Clearing..." : "Clear"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
