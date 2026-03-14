"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/components";

export default function CodexServiceTierTab() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    fetch("/api/settings/codex-service-tier")
      .then((res) => res.json())
      .then((data) => {
        setEnabled(Boolean(data.enabled));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (nextEnabled: boolean) => {
    setEnabled(nextEnabled);
    setSaving(true);
    setStatus("");

    try {
      const res = await fetch("/api/settings/codex-service-tier", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: nextEnabled }),
      });

      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
        setEnabled(!nextEnabled);
      }
    } catch {
      setStatus("error");
      setEnabled(!nextEnabled);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            bolt
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Codex Fast Service Tier</h3>
          <p className="text-sm text-text-muted">
            Inject `service_tier=fast` into Codex requests when the client leaves it unset.
          </p>
        </div>
        {status === "saved" && (
          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Saved
          </span>
        )}
        {status === "error" && (
          <span className="text-xs font-medium text-rose-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            Failed to save
          </span>
        )}
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30">
        <div>
          <p className="text-sm font-medium">Force fast tier for Codex</p>
          <p className="text-xs text-text-muted mt-0.5">
            Off by default. Applies only to Codex requests and does not override an explicit tier.
          </p>
        </div>
        <button
          onClick={() => save(!enabled)}
          disabled={loading || saving}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? "bg-sky-500" : "bg-white/10"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </Card>
  );
}
