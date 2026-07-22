"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { matchesSearch } from "@/shared/utils/turkishText";

interface ProviderModel {
  id: string;
  name: string;
}

interface ModelSelectorModalProps {
  open: boolean;
  currentModel: string;
  onSelect: (model: string) => void;
  onClose: () => void;
}

/**
 * Modal for picking an OmniRoute target model for model-mapping.
 */
export function ModelSelectorModal({
  open,
  currentModel,
  onSelect,
  onClose,
}: ModelSelectorModalProps) {
  const t = useTranslations("agentBridge");
  const tc = useTranslations("common");
  const [models, setModels] = useState<ProviderModel[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadModels = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/v1/models");
      const d = (await r.json()) as { data?: ProviderModel[] };
      setModels(Array.isArray(d.data) ? d.data : []);
    } catch {
      setModels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    loadModels();
  }, [open, loadModels]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = models.filter(
    (model) => matchesSearch(model.id, search) || matchesSearch(model.name, search)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-xl border border-border/60 bg-card shadow-xl flex flex-col max-h-[70vh]">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border/30">
          <h3 className="text-sm font-semibold text-text-main">{t("modelSelectorTitle")}</h3>
          <button type="button" onClick={onClose} aria-label={tc("close")}>
            <span className="material-symbols-outlined text-[18px] text-text-muted hover:text-text-main">
              close
            </span>
          </button>
        </div>

        <div className="px-4 py-2">
          <input
            type="text"
            autoFocus
            className="w-full rounded-lg border border-border/50 bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder={t("modelSelectorSearch")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-1">
          {loading && <p className="text-xs text-text-muted py-4 text-center">{t("loading")}</p>}
          {!loading && filtered.length === 0 && (
            <p className="text-xs text-text-muted py-4 text-center">{t("noModelsFound")}</p>
          )}
          {filtered.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                m.id === currentModel
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-surface text-text-main"
              }`}
            >
              <span className="font-mono text-xs">{m.id}</span>
              {m.name !== m.id && <span className="ml-2 text-text-muted text-xs">{m.name}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
