"use client";

import { useState, useEffect } from "react";
import { Card, Input, Toggle } from "@/shared/components";

export default function RoutingTab() {
  const [settings, setSettings] = useState({ fallbackStrategy: "fill-first" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateFallbackStrategy = async (strategy) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fallbackStrategy: strategy }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, fallbackStrategy: strategy }));
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  const updateStickyLimit = async (limit) => {
    const numLimit = parseInt(limit);
    if (isNaN(numLimit) || numLimit < 1) return;
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stickyRoundRobinLimit: numLimit }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, stickyRoundRobinLimit: numLimit }));
      }
    } catch (err) {
      console.error("Failed to update sticky limit:", err);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            route
          </span>
        </div>
        <h3 className="text-lg font-semibold">Routing Strategy</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Round Robin</p>
            <p className="text-sm text-text-muted">Cycle through accounts to distribute load</p>
          </div>
          <Toggle
            checked={settings.fallbackStrategy === "round-robin"}
            onChange={() =>
              updateFallbackStrategy(
                settings.fallbackStrategy === "round-robin" ? "fill-first" : "round-robin"
              )
            }
            disabled={loading}
          />
        </div>

        {settings.fallbackStrategy === "round-robin" && (
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div>
              <p className="font-medium">Sticky Limit</p>
              <p className="text-sm text-text-muted">Calls per account before switching</p>
            </div>
            <Input
              type="number"
              min="1"
              max="10"
              value={settings.stickyRoundRobinLimit || 3}
              onChange={(e) => updateStickyLimit(e.target.value)}
              disabled={loading}
              className="w-20 text-center"
            />
          </div>
        )}

        <p className="text-xs text-text-muted italic pt-2 border-t border-border/50">
          {settings.fallbackStrategy === "round-robin"
            ? `Currently distributing requests across all available accounts with ${settings.stickyRoundRobinLimit || 3} calls per account.`
            : "Currently using accounts in priority order (Fill First)."}
        </p>
      </div>
    </Card>
  );
}
