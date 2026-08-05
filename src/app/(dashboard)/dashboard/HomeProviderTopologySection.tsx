"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { useLiveRequests } from "@/hooks/useLiveDashboard";
import {
  selectActiveRequests,
  selectDrawnErrorProviders,
  selectDrawnProviders,
} from "../home/topologyUtils";

const ProviderTopology = dynamic(() => import("../home/ProviderTopology"), { ssr: false });
const HomeRecentRequests = dynamic(() => import("../home/HomeRecentRequests"), { ssr: false });

type TopologyProvider = {
  id: string;
  provider: string;
  name?: string;
  iconUrl?: string;
  textIcon?: string;
  apiType?: string | null;
  /** provider_nodes.created_at — ring order tie-break, so a newly added provider appends. */
  createdAt?: string | null;
  /**
   * Best (lowest) global priority across this provider's enabled connections, or undefined
   * when none carries one. Outranks `createdAt` in the ring order — see
   * compareTopologyProviders.
   */
  priority?: number;
  /** Connection-health base state, so the topology can colour a node at rest. */
  status?: "active" | "error" | "idle";
};

export function HomeProviderTopologySection({
  providers,
  lastProvider,
  errorProviders,
  enabled = true,
}: {
  providers: TopologyProvider[];
  lastProvider: string;
  /** Every currently-failing provider, not just the most recent one. */
  errorProviders: readonly string[];
  enabled?: boolean;
}) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tSettings = useTranslations("settings");
  const tAnalytics = useTranslations("analytics");
  // #4596: gate the live-WS connection so it only opens while the topology
  // section is actually shown on the home page.
  const { activeRequests: liveActiveRequests } = useLiveRequests({ enabled });
  const reportedActiveRequests = selectActiveRequests(liveActiveRequests);
  const drawnProviderIds = providers.map((provider) => provider.provider);
  const drawnActiveProviders = selectDrawnProviders(
    reportedActiveRequests.map(({ provider }) => provider),
    drawnProviderIds
  );
  const activeRequests = reportedActiveRequests.filter(({ provider }) =>
    drawnActiveProviders.has(provider.trim().toLowerCase())
  );

  // Every active surface must describe THE GRAPH BELOW, or the caption/router contradicts
  // the picture. The WS feed is broader than the ring and reports whatever casing the request
  // carried, so filter the request list itself through the normalized drawn-provider set before
  // it reaches ProviderTopology. The caption and router count then derive from that same set.
  const activeProviderCount = drawnActiveProviders.size;

  // The error count was `errorProvider ? 1 : 0` — a boolean coerced to a number, so it
  // could never report more than one failing provider no matter how many were broken.
  // Intersecting with the drawn providers also removes the opposite mismatch: the metrics
  // source aggregates all-time request logs with no connection check, so a provider whose
  // connection was disabled or deleted used to contribute an error with no red node to
  // explain it.
  const errorProviderCount = selectDrawnErrorProviders(errorProviders, drawnProviderIds).size;

  // The whole section is ONE bordered block (border + rounded + padding) so header,
  // diagram and Recent Requests read as a single component — but the block's background
  // stays TRANSPARENT, not an opaque surface. Both requirements can only hold together
  // this way: an opaque fill behind the diagram would block the page's graph-paper
  // wallpaper (the original "can't see through the diagram" bug), so a filled block and a
  // see-through diagram are mutually exclusive unless the grid is repainted, which is out
  // of scope. A transparent bordered block keeps the grouping frame AND lets the wallpaper
  // pass straight through the diagram. Recent Requests keeps its own solid Card (inside
  // HomeRecentRequests) since a live data table needs a readable surface.
  return (
    <div className="rounded-card border-2 border-black/12 dark:border-white/12 shadow-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold">{t("providerTopology")}</h2>
          <p className="text-xs text-text-muted">
            {t("activeError", { active: activeProviderCount, errors: errorProviderCount })}
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-green-500" />
            {tCommon("active")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-500" />
            {tSettings("recent")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500" />
            {tAnalytics("modelStatusError")}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ProviderTopology
          providers={providers}
          activeRequests={activeRequests}
          lastProvider={lastProvider}
          errorProviders={errorProviders}
        />
        <HomeRecentRequests enabled={enabled} />
      </div>
    </div>
  );
}
