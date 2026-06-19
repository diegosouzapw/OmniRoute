"use client";

import { Button, Card, Input } from "@/shared/components";
import type { ProviderDisplayMode } from "../providerPageStorage";
import { CategoryDot } from "./CategoryDot";
import ProviderDisplayModeControl from "./ProviderDisplayModeControl";

type ProviderMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

type SummaryStat = {
  configured: number;
  total: number;
};

export interface ProviderSummaryStats {
  all: SummaryStat;
  free: SummaryStat;
  noauth: SummaryStat;
  oauth: SummaryStat;
  apikey: SummaryStat;
  compatible: SummaryStat;
  webcookie: SummaryStat;
  search: SummaryStat;
  audio: SummaryStat;
  local: SummaryStat;
  upstreamproxy: SummaryStat;
  cloudagent: SummaryStat;
  ide: SummaryStat;
  webfetch: SummaryStat;
}

interface ProviderSummaryCardProps {
  activeCategory: string | null;
  disabledConfigured: boolean;
  displayMode: ProviderDisplayMode;
  modelSearchQuery: string;
  onBatchTest(mode: string): void;
  onCategoryChange(category: string | null, freeOnly: boolean): void;
  onDisplayModeChange(mode: ProviderDisplayMode): void;
  onNewProvider(): void;
  searchQuery: string;
  setModelSearchQuery(value: string): void;
  setSearchQuery(value: string): void;
  showFreeOnly: boolean;
  summaryStats: ProviderSummaryStats;
  t: ProviderMessageTranslator;
  tc: ProviderMessageTranslator;
  testingMode: string | null;
}

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

export default function ProviderSummaryCard({
  activeCategory,
  disabledConfigured,
  displayMode,
  modelSearchQuery,
  onBatchTest,
  onCategoryChange,
  onDisplayModeChange,
  onNewProvider,
  searchQuery,
  setModelSearchQuery,
  setSearchQuery,
  showFreeOnly,
  summaryStats,
  t,
  tc,
  testingMode,
}: ProviderSummaryCardProps) {
  const categories = [
    { key: null, color: null, label: t("providerSummaryAll"), stat: summaryStats.all },
    { key: "oauth", color: "bg-blue-500", label: t("oauthLabel"), stat: summaryStats.oauth },
    { key: "ide", color: "bg-cyan-500", label: "IDE", stat: summaryStats.ide },
    {
      key: "free",
      color: "bg-green-500",
      label: t("freeTier"),
      stat: summaryStats.free,
      title: t("freeAggregated"),
    },
    { key: "no-auth", color: "bg-stone-500", label: t("noAuthLabel"), stat: summaryStats.noauth },
    {
      key: "upstream-proxy",
      color: "bg-indigo-500",
      label: t("upstreamProxyLabel"),
      stat: summaryStats.upstreamproxy,
    },
    { key: "apikey", color: "bg-amber-500", label: t("apiKeyLabel"), stat: summaryStats.apikey },
    {
      key: "compatible",
      color: "bg-orange-500",
      label: t("compatibleLabel"),
      stat: summaryStats.compatible,
    },
    { key: "webcookie", color: "bg-purple-500", label: "Web Cookie", stat: summaryStats.webcookie },
    { key: "search", color: "bg-teal-500", label: "Search", stat: summaryStats.search },
    {
      key: "webfetch",
      color: "bg-orange-500",
      label: t("webFetch"),
      stat: summaryStats.webfetch,
      title: t("webFetchTooltip"),
    },
    { key: "audio", color: "bg-rose-500", label: "Audio", stat: summaryStats.audio },
    { key: "local", color: "bg-emerald-500", label: "Local", stat: summaryStats.local },
    {
      key: "cloudagent",
      color: "bg-violet-500",
      label: "Cloud Agent",
      stat: summaryStats.cloudagent,
    },
  ].filter((category) => category.key !== "no-auth" || category.stat.total > 0);

  return (
    <Card padding="sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchProviders")}
              aria-label={t("searchProviders")}
              icon="search"
              inputClassName={searchQuery ? "pr-9" : ""}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-muted hover:text-text-primary transition-colors"
                aria-label={tc("clear")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <div className="relative flex-1 min-w-[160px]">
            <Input
              value={modelSearchQuery}
              onChange={(e) => setModelSearchQuery(e.target.value)}
              placeholder={t("searchByModel") || "Search by model…"}
              aria-label={t("searchByModel") || "Search by model"}
              icon="psychology"
              inputClassName={modelSearchQuery ? "pr-9" : ""}
            />
            {modelSearchQuery && (
              <button
                onClick={() => setModelSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-muted hover:text-text-primary transition-colors"
                aria-label={tc("clear")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <ProviderDisplayModeControl
            disabledConfigured={disabledConfigured}
            mode={displayMode}
            onChange={onDisplayModeChange}
            t={t}
          />
          <Button size="sm" icon="add" onClick={onNewProvider}>
            {providerText(t, "onboardingWizardShort", "Onboarding Wizard")}
          </Button>
          <button
            onClick={() => onBatchTest("all")}
            disabled={!!testingMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              testingMode === "all"
                ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
            }`}
            title={t("testAll")}
          >
            <span className="material-symbols-outlined text-[14px]">
              {testingMode === "all" ? "sync" : "play_arrow"}
            </span>
            {testingMode === "all" ? t("testing") : t("testAll")}
          </button>
        </div>

        <div className="border-t border-border pt-3 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive =
              (cat.key === null && !activeCategory && !showFreeOnly) ||
              (cat.key === "free" && showFreeOnly) ||
              (cat.key !== "free" &&
                cat.key !== null &&
                !showFreeOnly &&
                activeCategory === cat.key);
            return (
              <button
                key={cat.key ?? "all"}
                onClick={() => onCategoryChange(cat.key, cat.key === "free")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/30"
                }`}
                title={cat.title || cat.label}
              >
                {cat.color && <CategoryDot color={cat.color} label={cat.label} />}
                <span>{cat.label}</span>
                <span className={`text-[11px] ${isActive ? "text-white/80" : "text-text-muted"}`}>
                  {cat.stat.configured}
                  <span className="opacity-70">/{cat.stat.total}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
