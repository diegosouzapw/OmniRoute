"use client";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLiveComboStatus } from "@/hooks/useLiveDashboard";
import { useProviderBreakerHealth } from "@/hooks/useProviderBreakerHealth";
import { useOrchestrationSnapshot } from "./hooks/useOrchestrationSnapshot";
import { AgentsTab } from "./tabs/AgentsTab";
import { RoutingTab } from "./tabs/RoutingTab";
import { OverviewTab } from "./tabs/OverviewTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { OrchestrationDrawer } from "./drawer/OrchestrationDrawer";
import { OrchestrationToolbar } from "./OrchestrationToolbar";
import { collectProviderKeys, filterSnapshot } from "./model/filterSnapshot";
import type { OrchFilter } from "./model/filterSnapshot";
import { ORCH_STATES } from "./model/orchestrationTypes";
import type { OrchSource, OrchState } from "./model/orchestrationTypes";

const TABS = ["agents", "routing", "overview", "history"] as const;
type Tab = (typeof TABS)[number];

const VALID_STATES: ReadonlySet<OrchState> = new Set(ORCH_STATES);
const VALID_SOURCES: ReadonlySet<OrchSource> = new Set(["cloud-agent", "a2a", "conductor"]);

/** CSV → Set, dropping empty/invalid entries (`valid` omitted accepts any non-empty token). */
function parseCsvSet<T extends string>(raw: string | null, valid?: ReadonlySet<T>): Set<T> {
  const out = new Set<T>();
  if (!raw) return out;
  for (const v of raw.split(",")) {
    if (!v) continue;
    if (!valid || valid.has(v as T)) out.add(v as T);
  }
  return out;
}

/** Toggle `value` in `current`, returning the next CSV (or `null` to drop the param). */
function toggleCsv<T extends string>(current: ReadonlySet<T>, value: T): string | null {
  const next = new Set(current);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next.size > 0 ? [...next].sort().join(",") : null;
}

const TAB_KEY: Record<Tab, string> = {
  agents: "tabAgents",
  routing: "tabRouting",
  overview: "tabOverview",
  history: "tabHistory",
};

/**
 * The page's entire URL state (tab / selected node / filters / collapsed groups) plus the
 * writer that patches it back into the query string. Pure derivation over
 * `useSearchParams` — no state of its own, so the URL stays the single source of truth.
 */
function useOrchUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const tab: Tab = (TABS as readonly string[]).includes(params.get("tab") ?? "")
    ? (params.get("tab") as Tab)
    : "agents";
  const qParam = params.get("q") ?? "";
  const stateParam = params.get("state");
  const sourceParam = params.get("source");
  const providerParam = params.get("provider");
  const collapsedParam = params.get("collapsed");

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) v === null ? next.delete(k) : next.set(k, v);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const filter: OrchFilter = useMemo(
    () => ({
      q: qParam,
      states: parseCsvSet(stateParam, VALID_STATES),
      sources: parseCsvSet(sourceParam, VALID_SOURCES),
      providers: parseCsvSet<string>(providerParam),
    }),
    [qParam, stateParam, sourceParam, providerParam]
  );
  const collapsed = useMemo(() => parseCsvSet(collapsedParam, VALID_SOURCES), [collapsedParam]);

  return { tab, nodeId: params.get("node"), filter, collapsed, setParams };
}

/** The tab strip. Presentation only — selecting a tab writes it back to the URL. */
function TabList({
  tab,
  t,
  onSelect,
}: {
  tab: Tab;
  t: ReturnType<typeof useTranslations>;
  onSelect: (tab: Tab) => void;
}) {
  return (
    <div role="tablist" className="flex gap-1 border-b border-border">
      {TABS.map((tb) => (
        <button
          key={tb}
          role="tab"
          aria-selected={tab === tb}
          className={`px-3 py-1.5 text-sm rounded-t ${tab === tb ? "border border-b-0 border-border bg-surface font-medium" : "text-muted"}`}
          onClick={() => onSelect(tb)}
        >
          {t(TAB_KEY[tb])}
        </button>
      ))}
    </div>
  );
}

export default function OrchestrationPageClient() {
  const t = useTranslations("orchestration");
  const { tab, nodeId, filter, collapsed, setParams } = useOrchUrlState();

  const { snapshot, showCompleted, setShowCompleted, refetch } = useOrchestrationSnapshot();
  const { comboEvents, activeCombos, isConnected } = useLiveComboStatus();
  const { providerHealth, connectionHealth } = useProviderBreakerHealth();

  const filtered = useMemo(() => filterSnapshot(snapshot, filter), [snapshot, filter]);
  const providerKeys = useMemo(() => collectProviderKeys(snapshot), [snapshot]);

  const onToggleCollapse = useCallback(
    (s: OrchSource) => setParams({ collapsed: toggleCsv(collapsed, s) }),
    [collapsed, setParams]
  );
  const closeDrawer = useCallback(() => setParams({ node: null }), [setParams]);

  const selectedNode = nodeId ? (snapshot.nodes.find((n) => n.id === nodeId) ?? null) : null;
  const onNodeClick = (id: string) =>
    id.startsWith("overflow:")
      ? setParams({ tab: "overview", node: null })
      : setParams({ node: id });
  // History renders its own local-state drawer (HistoryTab.tsx) over persisted runs that
  // generally are not present in the live snapshot `?node=` resolves against — so switching to
  // it must drop `?node=` (otherwise the page-level drawer below would still open once its tab
  // becomes active again) and the page-level drawer itself must not render while History is
  // active (it is a fixed overlay with an `inset-0` backdrop that would otherwise sit on top of
  // the History grid, including on a deep link like `?tab=history&node=<id>`).
  const onSelectTab = useCallback(
    (tb: Tab) => setParams(tb === "history" ? { tab: tb, node: null } : { tab: tb }),
    [setParams]
  );

  return (
    <div className="flex flex-col h-[calc(100dvh-6rem)] min-h-[480px] p-4 gap-3">
      <TabList tab={tab} t={t} onSelect={onSelectTab} />
      <div className="flex-1 min-h-0 flex flex-col gap-2">
        {(tab === "agents" || tab === "overview") && (
          <OrchestrationToolbar filter={filter} providerKeys={providerKeys} setParams={setParams} />
        )}
        <div className="flex-1 min-h-0">
          {tab === "agents" && (
            <AgentsTab
              snapshot={filtered}
              onNodeClick={onNodeClick}
              showCompleted={showCompleted}
              onToggleCompleted={setShowCompleted}
              collapsed={collapsed}
              onToggleCollapse={onToggleCollapse}
            />
          )}
          {tab === "routing" && (
            <RoutingTab
              comboEvents={comboEvents}
              combos={[...activeCombos]}
              isConnected={isConnected}
              providerHealth={providerHealth}
              connectionHealth={connectionHealth}
            />
          )}
          {tab === "overview" && (
            <OverviewTab
              snapshot={filtered}
              comboEvents={comboEvents}
              onCardClick={(id) => setParams({ node: id })}
              onSeeInGraph={(id) => setParams({ tab: "agents", node: id })}
            />
          )}
          {tab === "history" && <HistoryTab />}
        </div>
      </div>
      {tab !== "history" && (
        <OrchestrationDrawer node={selectedNode} onClose={closeDrawer} onActionDone={refetch} />
      )}
    </div>
  );
}
