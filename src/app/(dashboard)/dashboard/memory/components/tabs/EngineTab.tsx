"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";
import MemoryEngineStatus from "../MemoryEngineStatus";
import EmbeddingSourceSelector from "../EmbeddingSourceSelector";
import QdrantConfigCard from "../QdrantConfigCard";
import RerankConfigCard from "../RerankConfigCard";
import { useEngineStatus } from "../../hooks/useEngineStatus";
import { useMemorySettings } from "../../hooks/useMemorySettings";
import type { EmbeddingProviderListing } from "@/lib/memory/embedding/types";

export default function EngineTab() {
  const t = useTranslations("memory");
  const { status, isLoading: statusLoading } = useEngineStatus();
  const { settings, save: saveSettings, isLoading: settingsLoading } = useMemorySettings();
  const [providers, setProviders] = useState<EmbeddingProviderListing[]>([]);
  const [saving, setSaving] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [reindexMsg, setReindexMsg] = useState("");

  // Plan 21 fix: providers fetch moved from render body to useEffect to
  // avoid setState-during-render anti-pattern (caused double fetch in
  // React 18 Strict Mode).
  useEffect(() => {
    if (settingsLoading) return;
    let cancelled = false;
    fetch("/api/memory/embedding-providers")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.providers) setProviders(data.providers);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [settingsLoading]);

  // CTA handler for MemoryEngineStatus rows — scrolls to the config card
  // in the same tab so the user can fix the off/missing component.
  const handleConfigure = useCallback(
    (target: "embedding" | "qdrant" | "rerank") => {
      const id = `engine-config-${target}`;
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const handleSaveSettings = async (updates: Parameters<typeof saveSettings>[0]) => {
    setSaving(true);
    const ok = await saveSettings(updates);
    setSaving(false);
    return ok;
  };

  const handleReindex = async () => {
    setReindexing(true);
    setReindexMsg("");
    try {
      const res = await fetch("/api/memory/reindex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: false }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setReindexMsg(t("engine.reindexStarted", { pending: data?.pending ?? 0 }));
      } else {
        setReindexMsg(t("engine.reindexFailed"));
      }
    } catch {
      setReindexMsg(t("engine.reindexFailed"));
    } finally {
      setReindexing(false);
    }
  };

  const isLoading = statusLoading || settingsLoading;

  return (
    <div className="space-y-6">
      {/* Engine status panel */}
      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-main">{t("engine.statusTitle")}</h3>
            <Button
              data-testid="reindex-now-button"
              size="sm"
              variant="outline"
              onClick={handleReindex}
              loading={reindexing}
            >
              {t("engine.reindexNow")}
            </Button>
          </div>
          {isLoading || !status ? (
            <div className="text-sm text-text-muted">{t("loading")}</div>
          ) : (
            <MemoryEngineStatus status={status} onConfigure={handleConfigure} />
          )}
          {reindexMsg && (
            <p className="mt-3 text-xs text-text-muted">{reindexMsg}</p>
          )}
        </div>
      </Card>

      {/* Embedding source selector */}
      {settings && (
        <Card>
          <div id="engine-config-embedding" className="p-4 scroll-mt-4">
            <h3 className="text-sm font-semibold text-text-main mb-4">
              {t("engine.embeddingTitle")}
            </h3>
            <EmbeddingSourceSelector
              settings={settings}
              providers={providers}
              onSave={handleSaveSettings}
              saving={saving}
            />
          </div>
        </Card>
      )}

      {/* Qdrant config */}
      <div id="engine-config-qdrant" className="scroll-mt-4">
        <QdrantConfigCard />
      </div>

      {/* Rerank config */}
      {settings && (
        <Card>
          <div id="engine-config-rerank" className="p-4 scroll-mt-4">
            <h3 className="text-sm font-semibold text-text-main mb-4">
              {t("engine.rerankTitle")}
            </h3>
            <RerankConfigCard
              settings={settings}
              providers={providers}
              onSave={handleSaveSettings}
              saving={saving}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
