"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type {
  AgentSessionReport,
  ReportDimension,
  ReportTotals,
} from "@/lib/usage/agentSessionReports";
import { Button, Card, SegmentedControl } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import BreakdownTable from "./components/BreakdownTable";
import ReportFilters from "./components/ReportFilters";
import SessionsPanel from "./components/SessionsPanel";
import {
  emptyFilters,
  presetWindow,
  toReportQuery,
  type ReportFilterState,
  type TimePreset,
} from "./reportFilters";

type ReportTab = ReportDimension | "sessions";

interface BreakdownTabConfig {
  nameKey: string;
  fallbackKey: string;
  extraCount: "members" | "projects";
  filterField?: Exclude<keyof ReportFilterState, "from" | "to">;
  showDetail?: boolean;
  defaultSort?: "name";
}

const BREAKDOWN_TABS: Record<ReportDimension, BreakdownTabConfig> = {
  members: {
    nameKey: "member",
    fallbackKey: "unknownMember",
    extraCount: "projects",
    filterField: "apiKeyId",
  },
  projects: {
    nameKey: "project",
    fallbackKey: "noProject",
    extraCount: "members",
    filterField: "projectName",
    showDetail: true,
  },
  clients: {
    nameKey: "client",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "client",
  },
  providers: {
    nameKey: "provider",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "provider",
  },
  models: { nameKey: "colModel", fallbackKey: "unknown", extraCount: "members" },
  accounts: {
    nameKey: "account",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "connectionId",
    showDetail: true,
  },
  daily: { nameKey: "colDate", fallbackKey: "unknown", extraCount: "members", defaultSort: "name" },
};

const TAB_ORDER: ReportTab[] = [
  "members",
  "projects",
  "sessions",
  "daily",
  "clients",
  "providers",
  "models",
  "accounts",
];

async function loadReport(query: string, signal: AbortSignal): Promise<AgentSessionReport> {
  const res = await fetch(`/api/reports/summary?${query}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function KpiCards({ totals }: { totals: ReportTotals }) {
  const t = useTranslations("reports");
  const errorRate = totals.requests ? ((totals.errors / totals.requests) * 100).toFixed(1) : "0";
  const cards = [
    {
      label: t("kpiCost"),
      value: formatCost(totals.costUsd),
      hint: t("kpiUnpriced", { count: totals.unpricedRequests }),
    },
    {
      label: t("kpiTokens"),
      value: fmtCompact(totals.tokens.total),
      hint: t("kpiTokensDetail", {
        input: fmtCompact(totals.tokens.input),
        output: fmtCompact(totals.tokens.output),
        cache: fmtCompact(totals.tokens.cacheRead),
      }),
    },
    {
      label: t("kpiSessions"),
      value: String(totals.sessions),
      hint: t("kpiRequests", { count: totals.requests }),
    },
    {
      label: t("kpiErrors"),
      value: `${errorRate}%`,
      hint: t("kpiErrorCount", { count: totals.errors }),
    },
    { label: t("kpiMembers"), value: String(totals.members), hint: null },
    { label: t("kpiProjects"), value: String(totals.projects), hint: null },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <Card key={card.label} padding="sm">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            {card.label}
          </p>
          <p className="mt-1 text-xl font-bold tabular-nums text-text-main">{card.value}</p>
          {card.hint && <p className="mt-0.5 text-xs text-text-muted">{card.hint}</p>}
        </Card>
      ))}
    </div>
  );
}

export default function ReportsPageClient() {
  const t = useTranslations("reports");
  const [preset, setPreset] = useState<TimePreset | "custom">("7d");
  const [filters, setFilters] = useState<ReportFilterState>(() => emptyFilters("7d"));
  const [tab, setTab] = useState<ReportTab>("members");
  const [refreshToken, setRefreshToken] = useState(0);
  const [result, setResult] = useState<{ key: string; report?: AgentSessionReport } | null>(null);
  const [windowOptions, setWindowOptions] = useState<AgentSessionReport["breakdowns"] | null>(null);

  const query = useMemo(() => toReportQuery(filters).toString(), [filters]);
  const windowQuery = useMemo(() => toReportQuery(filters, true).toString(), [filters]);
  const requestKey = `${query}#${refreshToken}`;
  // Filter dropdowns list every value in the time window, not only the filtered subset; without
  // dimension filters the report itself is that list.
  const windowOnly = windowQuery === query;

  useEffect(() => {
    const controller = new AbortController();
    loadReport(query, controller.signal)
      .then((report) => {
        setResult({ key: requestKey, report });
        if (windowOnly) setWindowOptions(report.breakdowns);
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ key: requestKey });
      });
    return () => controller.abort();
  }, [query, requestKey, windowOnly]);

  useEffect(() => {
    if (windowOnly) return;
    const controller = new AbortController();
    loadReport(windowQuery, controller.signal)
      .then((report) => setWindowOptions(report.breakdowns))
      .catch(() => {
        // Keep the previous options; the report itself surfaces load failures.
      });
    return () => controller.abort();
  }, [windowQuery, windowOnly, refreshToken]);

  const loading = result?.key !== requestKey;
  const report = result?.report;
  const failed = !loading && !report;

  const applyPreset = (next: TimePreset) => {
    setPreset(next);
    setFilters((current) => ({ ...current, ...presetWindow(next) }));
  };
  const patchFilters = (patch: Partial<ReportFilterState>) => {
    if ("from" in patch || "to" in patch) setPreset("custom");
    setFilters((current) => ({ ...current, ...patch }));
  };
  const clearDimensionFilters = () =>
    setFilters((current) => ({ ...emptyFilters("all"), from: current.from, to: current.to }));

  const exportCsv = () => {
    const params = new URLSearchParams(query);
    params.set("type", tab);
    window.location.href = `/api/reports/export?${params}`;
  };

  const breakdownTab = tab === "sessions" ? null : BREAKDOWN_TABS[tab];
  const filterField = breakdownTab?.filterField;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="sm" icon="download" onClick={exportCsv}>
          {t("exportCsv")}
        </Button>
        <Button size="sm" icon="refresh" onClick={() => setRefreshToken((current) => current + 1)}>
          {t("refresh")}
        </Button>
      </div>

      <ReportFilters
        filters={filters}
        preset={preset}
        options={windowOptions}
        onPreset={applyPreset}
        onChange={patchFilters}
        onClear={clearDimensionFilters}
      />

      {failed && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
          {t("loadFailed")}
        </p>
      )}
      {report && <KpiCards totals={report.totals} />}

      <div className="overflow-x-auto">
        <SegmentedControl
          size="sm"
          aria-label={t("breakdown")}
          value={tab}
          onChange={(value) => setTab(value as ReportTab)}
          options={TAB_ORDER.map((value) => ({ value, label: t(`tab_${value}`) }))}
        />
      </div>

      <Card padding="md" className={loading ? "opacity-60 transition-opacity" : undefined}>
        {breakdownTab ? (
          <BreakdownTable
            key={tab}
            rows={report?.breakdowns[tab as ReportDimension] ?? []}
            nameHeader={t(breakdownTab.nameKey)}
            fallbackName={t(breakdownTab.fallbackKey)}
            extraCount={breakdownTab.extraCount}
            showDetail={breakdownTab.showDetail}
            defaultSort={breakdownTab.defaultSort}
            onFilter={filterField ? (key) => patchFilters({ [filterField]: key }) : undefined}
          />
        ) : (
          <SessionsPanel query={query} refreshToken={refreshToken} />
        )}
      </Card>
    </div>
  );
}
