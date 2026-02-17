"use client";

import { useState, useEffect } from "react";
import { Card, Toggle } from "@/shared/components";

export default function SystemPromptTab() {
  const [config, setConfig] = useState({ enabled: false, prompt: "" });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    fetch("/api/settings/system-prompt")
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
    setStatus("");
    try {
      const res = await fetch("/api/settings/system-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch {
      setStatus("error");
    }
  };

  const handlePromptChange = (text) => {
    setConfig((prev) => ({ ...prev, prompt: text }));
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        save({ prompt: text });
      }, 800)
    );
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            edit_note
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Global System Prompt</h3>
          <p className="text-sm text-text-muted">Injected into all requests at proxy level</p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Saved
            </span>
          )}
          <Toggle
            checked={config.enabled}
            onChange={() => save({ enabled: !config.enabled })}
            disabled={loading}
          />
        </div>
      </div>

      {config.enabled && (
        <div className="flex flex-col gap-3">
          <div className="relative">
            <textarea
              value={config.prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              placeholder="Enter system prompt to inject into all requests..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-border/50 bg-surface/30 text-sm
                         placeholder:text-text-muted/50 resize-y min-h-[120px]
                         focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/50
                         transition-colors"
              disabled={loading}
            />
            <div className="absolute bottom-2 right-3 text-xs text-text-muted/60 tabular-nums">
              {config.prompt.length} chars
            </div>
          </div>
          <p className="text-xs text-text-muted/70 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">info</span>
            This prompt is prepended to the system message of every request. Use for global instructions,
            safety guidelines, or response formatting rules. Send <code className="px-1 py-0.5 rounded bg-surface/50">_skipSystemPrompt: true</code> in a request to bypass.
          </p>
        </div>
      )}
    </Card>
  );
}
