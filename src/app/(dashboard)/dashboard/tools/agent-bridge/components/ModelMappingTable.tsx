"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ModelSelectorModal } from "./ModelSelectorModal";

export interface MappingRow {
  source: string;
  target: string;
}

interface ModelMappingTableProps {
  agentId: string;
  mappings: MappingRow[];
  onSave: (agentId: string, mappings: MappingRow[]) => Promise<void>;
}

/**
 * Editable table: source model → target OmniRoute model.
 */
export function ModelMappingTable({ agentId, mappings, onSave }: ModelMappingTableProps) {
  const t = useTranslations("agentBridge");
  const [rows, setRows] = useState<MappingRow[]>(mappings);
  const [selectorOpen, setSelectorOpen] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const updateTarget = (index: number, target: string) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, target } : r)));
    setSelectorOpen(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(agentId, rows);
    } finally {
      setSaving(false);
    }
  };

  if (rows.length === 0) {
    return (
      <p className="text-xs text-text-muted italic">
        {t("noMappings") || "No model mappings configured. Run setup wizard to auto-detect models."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-border/40 overflow-hidden bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-surface/60">
              <th className="px-3 py-2 text-left text-xs font-medium text-text-muted">
                {t("sourceModel") || "Source model (agent native)"}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-text-muted">
                {t("targetModel") || "Target model (OmniRoute)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/20 last:border-0">
                <td className="px-3 py-2">
                  <span className="font-mono text-xs text-text-muted">{row.source}</span>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setSelectorOpen(i)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card px-2.5 py-1 text-xs hover:bg-surface transition-colors font-mono"
                  >
                    {row.target || (
                      <span className="text-text-muted italic">
                        {t("selectModel") || "Select…"}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-[12px] text-text-muted">
                      expand_more
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {saving ? t("saving") || "Saving…" : t("saveMappings") || "Save mappings"}
        </button>
      </div>

      {selectorOpen !== null && (
        <ModelSelectorModal
          open
          currentModel={rows[selectorOpen]?.target ?? ""}
          onSelect={(model) => updateTarget(selectorOpen, model)}
          onClose={() => setSelectorOpen(null)}
        />
      )}
    </div>
  );
}
