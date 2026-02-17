"use client";

/**
 * FallbackChainsEditor — Batch D
 *
 * Editor for model fallback chains. Each chain maps a model name
 * to a prioritized list of providers that can serve it.
 * API: /api/fallback/chains
 */

import { useState, useEffect, useCallback } from "react";
import { Card, Button, Input, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

const CHAIN_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#14b8a6",
];

export default function FallbackChainsEditor() {
  const [chains, setChains] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newModel, setNewModel] = useState("");
  const [newProviders, setNewProviders] = useState("");
  const [saving, setSaving] = useState(false);
  const notify = useNotificationStore();

  const fetchChains = useCallback(async () => {
    try {
      const res = await fetch("/api/fallback/chains");
      if (res.ok) {
        const data = await res.json();
        setChains(data.chains || data || {});
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChains();
  }, [fetchChains]);

  const handleCreate = async () => {
    if (!newModel.trim() || !newProviders.trim()) {
      notify.warning("Please fill model name and providers");
      return;
    }

    const providers = newProviders
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((provider, i) => ({ provider, priority: i + 1, enabled: true }));

    if (providers.length === 0) {
      notify.warning("Add at least one provider");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/fallback/chains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: newModel.trim(), chain: providers }),
      });
      if (res.ok) {
        notify.success(`Chain created for ${newModel.trim()}`);
        setNewModel("");
        setNewProviders("");
        setShowCreate(false);
        await fetchChains();
      } else {
        notify.error("Failed to create chain");
      }
    } catch {
      notify.error("Failed to create chain");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (model) => {
    if (!confirm(`Delete fallback chain for "${model}"?`)) return;
    try {
      const res = await fetch("/api/fallback/chains", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model }),
      });
      if (res.ok) {
        notify.success(`Chain deleted for ${model}`);
        await fetchChains();
      } else {
        notify.error("Failed to delete chain");
      }
    } catch {
      notify.error("Failed to delete chain");
    }
  };

  if (loading) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-2 text-text-muted animate-pulse">
          <span className="material-symbols-outlined text-[20px]">timeline</span>
          Loading fallback chains...
        </div>
      </Card>
    );
  }

  const chainEntries = Object.entries(chains);

  return (
    <Card className="mt-6">
      <div className="flex items-center gap-3 mb-4 p-6 pb-0">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
          <span className="material-symbols-outlined text-[20px]">timeline</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Fallback Chains</h3>
          <p className="text-sm text-text-muted">Define provider fallback order per model</p>
        </div>
        <Button size="sm" variant="primary" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Cancel" : "+ Add Chain"}
        </Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="mx-6 p-4 rounded-lg border border-border/30 bg-surface/20 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              label="Model Name"
              placeholder="claude-sonnet-4-20250514"
              value={newModel}
              onChange={(e) => setNewModel(e.target.value)}
            />
            <Input
              label="Providers (comma-separated, in priority order)"
              placeholder="anthropic, openai, gemini"
              value={newProviders}
              onChange={(e) => setNewProviders(e.target.value)}
            />
          </div>
          <Button variant="primary" size="sm" onClick={handleCreate} loading={saving}>
            Create Chain
          </Button>
        </div>
      )}

      {/* Chains List */}
      <div className="px-6 pb-6">
        {chainEntries.length === 0 ? (
          <EmptyState
            icon="timeline"
            title="No Fallback Chains"
            description="Create a chain to define provider fallback order for a model."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {chainEntries.map(([model, chain]) => (
              <div
                key={model}
                className="flex items-center justify-between px-4 py-3 rounded-lg border border-border/20 bg-surface/20 hover:bg-surface/40 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="font-mono text-sm text-text-main truncate max-w-[200px]">
                    {model}
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-text-muted">
                    arrow_forward
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {(Array.isArray(chain) ? chain : []).map((entry, i) => (
                      <span
                        key={`${entry.provider}-${i}`}
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${CHAIN_COLORS[i % CHAIN_COLORS.length]}20`,
                          color: CHAIN_COLORS[i % CHAIN_COLORS.length],
                          border: `1px solid ${CHAIN_COLORS[i % CHAIN_COLORS.length]}40`,
                        }}
                      >
                        {i + 1}. {entry.provider}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(model)}
                  className="text-text-muted hover:text-red-400 transition-colors ml-2"
                  title="Delete chain"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
