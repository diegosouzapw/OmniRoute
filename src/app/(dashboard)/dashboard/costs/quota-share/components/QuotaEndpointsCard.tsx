"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import Card from "@/shared/components/Card";
import { quotaModelName, quotaGroupSlug } from "@/lib/quota/quotaModelNaming";

// ─────────────────────────────────────────────────────────────────────────────
// Local types (mirrors QuotaSharePageClient)
// ─────────────────────────────────────────────────────────────────────────────

interface QuotaGroup {
  id: string;
  name: string;
  createdAt: string;
}

interface QuotaPool {
  id: string;
  connectionId: string;
  connectionIds?: string[];
  groupId?: string;
  [key: string]: unknown;
}

interface Connection {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
}

interface ApiKey {
  id: string;
  name?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Representative model list per provider (same constant as PoolWizard)
// ─────────────────────────────────────────────────────────────────────────────

const PREVIEW_MODELS_BY_PROVIDER: Record<string, string[]> = {
  openai: ["gpt-4o", "gpt-4o-mini", "o3", "gpt-4-turbo"],
  anthropic: ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-3-5"],
  gemini: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
  cx: ["gpt-5.4-mini", "gpt-5.4", "o3"],
  codex: ["codex-mini-latest", "codex-latest"],
  glm: ["glm-4", "glm-4v", "glm-z1-airx"],
  minimax: ["minimax-m1", "minimax-text-01"],
  kimi: ["moonshot-v1-8k", "moonshot-v1-32k"],
  default: ["model-a", "model-b", "model-c"],
};

const MAX_MODELS_SHOWN = 3;

function getPreviewModels(provider: string): string[] {
  return PREVIEW_MODELS_BY_PROVIDER[provider] ?? PREVIEW_MODELS_BY_PROVIDER["default"];
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface QuotaEndpointsCardProps {
  groups: QuotaGroup[];
  pools: QuotaPool[];
  connections: Connection[];
  apiKeys: ApiKey[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function QuotaEndpointsCard({
  groups,
  pools,
  connections,
  apiKeys,
}: QuotaEndpointsCardProps) {
  const t = useTranslations("quotaShare");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  const [selectedKeyId, setSelectedKeyId] = useState<string>("");
  const [previewModels, setPreviewModels] = useState<string[] | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // ── Derive default model list from groups + pools + connections ──────────────
  // For each group, collect all pools that belong to it, then for each pool's
  // providers (from connectionIds), generate qtSd/<groupSlug>/<provider>/<model>
  // using the same PREVIEW_MODELS_BY_PROVIDER map that PoolWizard uses.
  //
  // This is a REPRESENTATIVE list — the full list is served by /v1/models.

  const defaultByGroup = useMemo<
    Array<{
      group: QuotaGroup;
      entries: Array<{ provider: string; models: string[] }>;
    }>
  >(() => {
    return groups.map((group) => {
      const groupPools = pools.filter(
        (p) => ((p as { groupId?: string }).groupId ?? "group-demo") === group.id
      );

      // Collect unique providers for this group
      const providerSet = new Set<string>();
      for (const pool of groupPools) {
        const cids = pool.connectionIds ?? [pool.connectionId];
        for (const cid of cids) {
          const conn = connections.find((c) => c.id === cid);
          if (conn) providerSet.add(conn.provider);
        }
      }

      const entries = Array.from(providerSet).map((provider) => {
        const previewModelIds = getPreviewModels(provider);
        const models = previewModelIds
          .slice(0, MAX_MODELS_SHOWN)
          .map((m) => quotaModelName(group.name, provider, m));
        return { provider, models };
      });

      return { group, entries };
    });
  }, [groups, pools, connections]);

  // ── Key name with optional email masking ─────────────────────────────────────

  const keyLabel = (key: ApiKey) => {
    const raw = key.name || key.id.slice(0, 12) + "…";
    return emailsVisible ? raw : maskEmailLikeValue(raw);
  };

  // ── Key selector handler ─────────────────────────────────────────────────────

  const handleKeyChange = async (keyId: string) => {
    setSelectedKeyId(keyId);
    if (!keyId) {
      setPreviewModels(null);
      return;
    }
    setLoadingPreview(true);
    try {
      const res = await fetch(`/api/quota/keys/${keyId}/models`);
      if (res.ok) {
        const body = (await res.json()) as { models: string[] };
        setPreviewModels(Array.isArray(body.models) ? body.models : []);
      } else {
        setPreviewModels([]);
      }
    } catch {
      setPreviewModels([]);
    } finally {
      setLoadingPreview(false);
    }
  };

  // ── Compute the combined default model count across all groups ────────────────

  const hasAnyDefaultModels = defaultByGroup.some((g) =>
    g.entries.some((e) => e.models.length > 0)
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  const hasData = groups.length > 0 && pools.length > 0;

  return (
    <Card padding="sm">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
            api
          </span>
          <div>
            <span className="text-sm font-semibold text-text-main">{t("endpointsTitle")}</span>
            <p className="text-xs text-text-muted mt-0.5 max-w-lg">{t("endpointsHint")}</p>
          </div>
        </div>

        {/* Key preview selector */}
        {apiKeys.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs text-text-muted whitespace-nowrap">
              {t("previewForKey")}
            </label>
            <select
              value={selectedKeyId}
              onChange={(e) => void handleKeyChange(e.target.value)}
              className="px-2 py-1 rounded border border-border bg-bg-base text-xs text-text-main min-w-[140px]"
            >
              <option value="">{t("previewKeyNone")}</option>
              {apiKeys.map((k) => (
                <option key={k.id} value={k.id}>
                  {keyLabel(k)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Base URL line */}
      <div className="mt-3 flex items-center gap-2 rounded-md bg-bg-subtle/50 border border-border/40 px-3 py-2">
        <span className="text-[10px] uppercase tracking-wide text-text-muted font-semibold shrink-0">
          {t("endpointsBaseUrl")}
        </span>
        <code className="text-xs text-primary font-mono">POST /v1/chat/completions</code>
        <span className="text-xs text-text-muted mx-1">·</span>
        <code className="text-xs text-text-muted font-mono">
          model: &quot;qtSd/&lt;group&gt;/&lt;provider&gt;/&lt;model&gt;&quot;
        </code>
      </div>

      {/* Model listing */}
      <div className="mt-3">
        {loadingPreview ? (
          <div className="text-xs text-text-muted animate-pulse py-2">{t("loading")}</div>
        ) : previewModels !== null ? (
          // Per-key preview from the API
          <div>
            {previewModels.length === 0 ? (
              <p className="text-xs text-text-muted italic">{t("noAllocations")}</p>
            ) : (
              <ul className="space-y-0.5">
                {previewModels.map((m) => (
                  <li key={m}>
                    <code className="text-[11px] font-mono text-text-main bg-bg-subtle/40 rounded px-1.5 py-0.5 inline-block">
                      {m}
                    </code>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : hasData && hasAnyDefaultModels ? (
          // Default view: grouped by group → provider → model ids
          <div className="space-y-3">
            {defaultByGroup.map(({ group, entries }) => {
              if (entries.length === 0) return null;
              return (
                <div key={group.id}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[13px] text-text-muted">
                      folder
                    </span>
                    <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wide">
                      {quotaGroupSlug(group.name)}
                    </span>
                  </div>
                  <div className="space-y-1 pl-4">
                    {entries.map(({ provider, models }) => (
                      <div key={provider} className="space-y-0.5">
                        <span className="text-[10px] text-text-muted font-medium">{provider}</span>
                        <ul className="space-y-0.5">
                          {models.map((m) => (
                            <li key={m}>
                              <code className="text-[11px] font-mono text-text-main bg-bg-subtle/40 rounded px-1.5 py-0.5 inline-block">
                                {m}
                              </code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // No pools yet — show the format placeholder
          <div className="text-xs text-text-muted italic">
            <code className="font-mono text-[11px]">
              qtSd/&lt;groupSlug&gt;/&lt;provider&gt;/&lt;model&gt;
            </code>
            {" — "}
            {t("emptyDescription")}
          </div>
        )}
      </div>
    </Card>
  );
}
