"use client";

import { useState, useEffect } from "react";
import { Card, Button, Select } from "@/shared/components";

const MODES = [
  {
    value: "passthrough",
    label: "Passthrough",
    desc: "No changes — client controls thinking budget",
    icon: "arrow_forward",
  },
  {
    value: "auto",
    label: "Auto",
    desc: "Strip all thinking config — let provider decide",
    icon: "auto_awesome",
  },
  {
    value: "custom",
    label: "Custom",
    desc: "Set a fixed token budget for all requests",
    icon: "tune",
  },
  {
    value: "adaptive",
    label: "Adaptive",
    desc: "Scale budget based on request complexity",
    icon: "trending_up",
  },
];

const EFFORTS = [
  { value: "none", label: "None (0 tokens)" },
  { value: "low", label: "Low (1K tokens)" },
  { value: "medium", label: "Medium (10K tokens)" },
  { value: "high", label: "High (128K tokens)" },
];

export default function ThinkingBudgetTab() {
  const [config, setConfig] = useState({
    mode: "passthrough",
    customBudget: 10240,
    effortLevel: "medium",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/settings/thinking-budget")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (updates) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/thinking-budget", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            psychology
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Thinking Budget</h3>
          <p className="text-sm text-text-muted">Control AI reasoning token usage across all requests</p>
        </div>
        {status === "saved" && (
          <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> Saved
          </span>
        )}
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => save({ mode: m.value })}
            disabled={loading || saving}
            className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
              config.mode === m.value
                ? "border-violet-500/50 bg-violet-500/5 ring-1 ring-violet-500/20"
                : "border-border/50 hover:border-border hover:bg-surface/30"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] mt-0.5 ${
                config.mode === m.value ? "text-violet-500" : "text-text-muted"
              }`}
            >
              {m.icon}
            </span>
            <div className="min-w-0">
              <p className={`text-sm font-medium ${config.mode === m.value ? "text-violet-400" : ""}`}>
                {m.label}
              </p>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Custom budget slider */}
      {config.mode === "custom" && (
        <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">Token Budget</p>
            <span className="text-sm font-mono tabular-nums text-violet-400">
              {config.customBudget.toLocaleString()} tokens
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="131072"
            step="1024"
            value={config.customBudget}
            onChange={(e) => save({ customBudget: parseInt(e.target.value) })}
            className="w-full accent-violet-500"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>Off</span>
            <span>1K</span>
            <span>10K</span>
            <span>64K</span>
            <span>128K</span>
          </div>
        </div>
      )}

      {/* Adaptive effort level */}
      {config.mode === "adaptive" && (
        <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
          <p className="text-sm font-medium mb-3">Base Effort Level</p>
          <p className="text-xs text-text-muted mb-3">
            Adaptive mode scales from this base level based on message count, tool usage, and prompt length.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {EFFORTS.map((e) => (
              <button
                key={e.value}
                onClick={() => save({ effortLevel: e.value })}
                disabled={loading || saving}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  config.effortLevel === e.value
                    ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                    : "border-border/50 text-text-muted hover:border-border"
                }`}
              >
                {e.value.charAt(0).toUpperCase() + e.value.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
