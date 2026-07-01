"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

interface QdrantSettings {
  enabled: boolean;
  host: string;
  port: number;
  collection: string;
  embeddingModel: string;
  hasApiKey: boolean;
  apiKeyMasked: string | null;
}

interface EmbeddingModelOption {
  value: string;
  label: string;
}

export default function QdrantConfigCard() {
  const t = useTranslations("memory");
  const [qdrant, setQdrant] = useState<QdrantSettings>({
    enabled: false,
    host: "",
    port: 6333,
    collection: "omniroute_memory",
    embeddingModel: "openai/text-embedding-3-small",
    hasApiKey: false,
    apiKeyMasked: null,
  });
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saved" | "error">("");
  const [health, setHealth] = useState<{ ok: boolean; latencyMs: number; error?: string } | null>(
    null,
  );
  const [checking, setChecking] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; score: number; payload?: Record<string, unknown> }>
  >([]);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupMsg, setCleanupMsg] = useState("");
  const [embeddingOptions, setEmbeddingOptions] = useState<EmbeddingModelOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/settings/qdrant").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/settings/qdrant/embedding-models").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([qdrantData, embeddingData]) => {
        if (qdrantData) {
          setQdrant(qdrantData);
          setApiKeyInput("");
        }
        if (embeddingData?.models) {
          setEmbeddingOptions(embeddingData.models);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(
    async (updates: Partial<QdrantSettings> & { apiKey?: string }) => {
      const prev = qdrant;
      const next = { ...qdrant, ...updates };
      setQdrant(next);
      setSaving(true);
      setSaveStatus("");
      try {
        const body: Record<string, unknown> = {
          enabled: next.enabled,
          host: next.host,
          port: next.port,
          collection: next.collection,
          embeddingModel: next.embeddingModel,
        };
        if (updates.apiKey !== undefined) body.apiKey = updates.apiKey;
        const res = await fetch("/api/settings/qdrant", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const data = await res.json().catch(() => next);
          setQdrant(data);
          setApiKeyInput("");
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus(""), 2000);
        } else {
          setQdrant(prev);
          setSaveStatus("error");
        }
      } catch {
        setQdrant(prev);
        setSaveStatus("error");
      } finally {
        setSaving(false);
      }
    },
    [qdrant],
  );

  const checkHealth = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/settings/qdrant/health");
      if (res.ok) setHealth(await res.json());
      else setHealth({ ok: false, latencyMs: 0, error: "HTTP error" });
    } catch (e) {
      setHealth({
        ok: false,
        latencyMs: 0,
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setChecking(false);
    }
  }, []);

  const runSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    setSearchResults([]);
    try {
      const res = await fetch("/api/settings/qdrant/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, topK: 5 }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setSearchResults(Array.isArray(data.results) ? data.results : []);
      }
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  const runCleanup = useCallback(async () => {
    setCleanupLoading(true);
    setCleanupMsg("");
    try {
      const res = await fetch("/api/settings/qdrant/cleanup", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setCleanupMsg(t("qdrant.cleanupSuccess", { count: data.deletedCount ?? 0 }));
      } else {
        setCleanupMsg(t("qdrant.cleanupFailed"));
      }
    } catch {
      setCleanupMsg(t("qdrant.cleanupFailed"));
    } finally {
      setCleanupLoading(false);
    }
  }, [t]);

  if (loading) {
    return (
      <Card>
        <div className="text-sm text-text-muted">{t("loading")}</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            database
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-main">{t("qdrant.title")}</h3>
          <p className="text-xs text-text-muted">{t("qdrant.description")}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
            qdrant.enabled
              ? health?.ok
                ? "text-emerald-500"
                : "text-red-500"
              : "text-text-muted"
          }`}
        >
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              qdrant.enabled ? (health?.ok ? "bg-emerald-500" : "bg-red-500") : "bg-border"
            }`}
          />
          {qdrant.enabled
            ? health?.ok
              ? t("qdrant.statusActive")
              : t("qdrant.statusError")
            : t("qdrant.statusDisabled")}
        </span>
      </div>

      {/* Tier 1 vs Tier 2 guidance */}
      <div className="mb-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-text-muted leading-relaxed">
        {t("qdrant.banner")}
      </div>

      {/* Enable toggle + test connection */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
        <div>
          <p className="text-sm font-medium">{t("qdrant.enableLabel")}</p>
          <p className="text-xs text-text-muted mt-0.5">{t("qdrant.enableDesc")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            data-testid="qdrant-test-connection"
            onClick={checkHealth}
            disabled={checking || saving}
            className="px-3 h-8 text-xs font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            {checking ? t("qdrant.testing") : t("qdrant.testConnection")}
          </button>
          <button
            data-testid="qdrant-enabled-switch"
            onClick={() => save({ enabled: !qdrant.enabled })}
            disabled={saving}
            role="switch"
            aria-checked={qdrant.enabled}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              qdrant.enabled ? "bg-emerald-500" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                qdrant.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {health && (
        <div
          className={`mb-4 text-xs font-medium flex items-center gap-1 ${health.ok ? "text-emerald-500" : "text-red-500"}`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {health.ok ? "check_circle" : "error"}
          </span>
          {health.ok
            ? t("qdrant.healthOk", { latencyMs: health.latencyMs })
            : (health.error ?? t("qdrant.healthError"))}
        </div>
      )}

      {saveStatus === "saved" && (
        <div className="mb-4 text-xs font-medium text-emerald-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          {t("qdrant.saved")}
        </div>
      )}
      {saveStatus === "error" && (
        <div className="mb-4 text-xs font-medium text-red-500">{t("qdrant.saveError")}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-surface/30 border border-border/30">
          <label className="text-xs font-medium block mb-1.5">Host</label>
          <input
            value={qdrant.host}
            onChange={(e) => setQdrant((s) => ({ ...s, host: e.target.value }))}
            placeholder="http://127.0.0.1"
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <p className="text-[11px] text-text-muted mt-1.5">{t("qdrant.hostHelp")}</p>
        </div>
        <div className="p-3 rounded-lg bg-surface/30 border border-border/30">
          <label className="text-xs font-medium block mb-1.5">{t("qdrant.portLabel")}</label>
          <input
            value={qdrant.port}
            type="number"
            onChange={(e) =>
              setQdrant((s) => ({ ...s, port: Math.max(1, Math.min(65535, Number(e.target.value) || 1)) }))
            }
            placeholder="6333"
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="p-3 rounded-lg bg-surface/30 border border-border/30">
          <label className="text-xs font-medium block mb-1.5">Collection</label>
          <input
            value={qdrant.collection}
            onChange={(e) => setQdrant((s) => ({ ...s, collection: e.target.value }))}
            placeholder="omniroute_memory"
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <p className="text-[11px] text-text-muted mt-1.5">{t("qdrant.collectionHelp")}</p>
        </div>
        <div className="p-3 rounded-lg bg-surface/30 border border-border/30">
          <label className="text-xs font-medium block mb-1.5">
            {t("qdrant.embeddingModelLabel")}
          </label>
          {embeddingOptions.length > 0 && (
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) setQdrant((s) => ({ ...s, embeddingModel: e.target.value }));
              }}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">{t("qdrant.quickSelectModel")}</option>
              {embeddingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>
          )}
          <input
            value={qdrant.embeddingModel}
            onChange={(e) => setQdrant((s) => ({ ...s, embeddingModel: e.target.value }))}
            placeholder="openai/text-embedding-3-small"
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <p className="text-[11px] text-text-muted mt-1.5">{t("qdrant.embeddingModelHelp")}</p>
        </div>
        <div className="p-3 rounded-lg bg-surface/30 border border-border/30 md:col-span-2">
          <label className="text-xs font-medium block mb-1.5">
            API Key ({t("qdrant.optional")}){" "}
            {qdrant.hasApiKey && qdrant.apiKeyMasked ? (
              <span className="text-text-muted font-mono">{qdrant.apiKeyMasked}</span>
            ) : null}
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder={
                qdrant.hasApiKey ? t("qdrant.apiKeyKeepPlaceholder") : t("qdrant.apiKeyOptional")
              }
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {qdrant.hasApiKey && (
              <button
                onClick={() => save({ apiKey: "" })}
                disabled={saving}
                className="px-3 py-2 text-sm font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50"
              >
                {t("qdrant.removeApiKey")}
              </button>
            )}
            <button
              onClick={() =>
                save(apiKeyInput.trim() ? { apiKey: apiKeyInput } : {})
              }
              disabled={saving}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              {saving ? t("saving") : t("save")}
            </button>
          </div>
        </div>
      </div>

      {/* Search test */}
      <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-3">
        <p className="text-sm font-medium mb-2">{t("qdrant.searchTestTitle")}</p>
        <div className="flex gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("qdrant.searchPlaceholder")}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            data-testid="qdrant-search-test"
            onClick={runSearch}
            disabled={searching || !searchQuery.trim()}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50"
          >
            {searching ? t("qdrant.searching") : t("qdrant.search")}
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-3 space-y-2">
            {searchResults.map((r) => (
              <div
                key={r.id}
                className="p-2 rounded bg-background/40 border border-border/40 flex items-center justify-between"
              >
                <span className="text-xs font-mono text-text-muted truncate">{r.id}</span>
                <span className="text-xs font-mono text-emerald-400 shrink-0">
                  {r.score.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cleanup */}
      <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t("qdrant.cleanupTitle")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("qdrant.cleanupDesc")}</p>
          </div>
          <button
            data-testid="qdrant-cleanup"
            onClick={runCleanup}
            disabled={cleanupLoading}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50"
          >
            {cleanupLoading ? t("qdrant.cleaning") : t("qdrant.cleanNow")}
          </button>
        </div>
        {cleanupMsg && <p className="mt-2 text-xs text-text-muted">{cleanupMsg}</p>}
      </div>
    </Card>
  );
}
