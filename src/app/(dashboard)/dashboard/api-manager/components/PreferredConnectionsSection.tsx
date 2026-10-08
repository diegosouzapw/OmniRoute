"use client";

import { memo, useMemo } from "react";
import { useTranslations } from "next-intl";
import { compareTr } from "@/shared/utils/turkishText";
import type { ProviderConnection } from "./ProviderConnectionPermissionList";

export interface PreferredConnectionsSectionProps {
  connections: ProviderConnection[];
  allowAllConnections: boolean;
  selectedConnections: string[];
  preferredConnections: string[];
  onTogglePreferred: (connectionId: string) => void;
  onMovePreferred: (connectionId: string, direction: -1 | 1) => void;
  onClearPreferred: () => void;
}

/**
 * Ordered per-key connection preference (#13102). Only connections the key may already use
 * are listed: the preference is a ranking hint evaluated after the normal eligibility
 * pipeline, never an access grant.
 */
export const PreferredConnectionsSection = memo(function PreferredConnectionsSection({
  connections,
  allowAllConnections,
  selectedConnections,
  preferredConnections,
  onTogglePreferred,
  onMovePreferred,
  onClearPreferred,
}: PreferredConnectionsSectionProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const groups = useMemo(() => {
    const allowed = allowAllConnections ? null : new Set(selectedConnections);
    const byProvider: Record<string, ProviderConnection[]> = {};
    for (const conn of connections) {
      if (allowed && !allowed.has(conn.id)) continue;
      const provider = conn.provider || "Other";
      (byProvider[provider] ||= []).push(conn);
    }
    return Object.entries(byProvider).sort(([a], [b]) => compareTr(a, b));
  }, [connections, allowAllConnections, selectedConnections]);

  if (groups.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("preferredConnections")}</p>
          <p className="text-xs text-text-muted">{t("preferredConnectionsDesc")}</p>
        </div>
        {preferredConnections.length > 0 && (
          <button
            type="button"
            onClick={onClearPreferred}
            className="px-2 py-1 rounded text-xs font-medium text-text-muted hover:bg-black/5 dark:hover:bg-white/5 shrink-0"
          >
            {t("preferredConnectionsClear")}
          </button>
        )}
      </div>
      {preferredConnections.length === 0 && (
        <p className="text-xs text-text-muted">{t("preferredConnectionsNone")}</p>
      )}
      <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
        {groups.map(([provider, conns]) => (
          <div key={provider}>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-1 py-0.5">
              {provider}
            </p>
            {conns.map((conn) => {
              const rank = preferredConnections.indexOf(conn.id);
              const isPreferred = rank >= 0;
              return (
                <div
                  key={conn.id}
                  data-testid={`preferred-connection-${conn.id}`}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all ${
                    isPreferred
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-surface/50 hover:text-text-main"
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={isPreferred}
                    onClick={() => onTogglePreferred(conn.id)}
                    className="flex items-center gap-2 min-w-0 flex-1 text-left"
                  >
                    <span
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 text-[10px] font-semibold ${
                        isPreferred ? "bg-primary border-primary text-white" : "border-border"
                      }`}
                    >
                      {isPreferred ? rank + 1 : "+"}
                    </span>
                    <span className="truncate flex-1">{conn.name || conn.id.slice(0, 8)}</span>
                    {!conn.isActive && (
                      <span className="text-[9px] text-red-400 shrink-0">{tc("inactive")}</span>
                    )}
                  </button>
                  {isPreferred && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        aria-label={tc("moveUp")}
                        title={tc("moveUp")}
                        disabled={rank === 0}
                        onClick={() => onMovePreferred(conn.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        aria-label={tc("moveDown")}
                        title={tc("moveDown")}
                        disabled={rank === preferredConnections.length - 1}
                        onClick={() => onMovePreferred(conn.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_downward
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

export default PreferredConnectionsSection;
