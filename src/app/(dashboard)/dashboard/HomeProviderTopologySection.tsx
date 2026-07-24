"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { useLiveRequests } from "@/hooks/useLiveDashboard";
import { selectActiveRequests } from "../home/topologyUtils";

const ProviderTopology = dynamic(() => import("../home/ProviderTopology"), { ssr: false });
const HomeRecentRequests = dynamic(() => import("../home/HomeRecentRequests"), { ssr: false });

type TopologyProvider = {
  id: string;
  provider: string;
  name?: string;
  /** Connection-health base state, so the topology can colour a node at rest. */
  status?: "active" | "error" | "idle";
};

export function HomeProviderTopologySection({
  providers,
  lastProvider,
  errorProvider,
  enabled = true,
}: {
  providers: TopologyProvider[];
  lastProvider: string;
  errorProvider: string;
  enabled?: boolean;
}) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tSettings = useTranslations("settings");
  const tAnalytics = useTranslations("analytics");
  // #4596: gate the live-WS connection so it only opens while the topology
  // section is actually shown on the home page.
  const { activeRequests: liveActiveRequests } = useLiveRequests({ enabled });
  const activeRequests = selectActiveRequests(liveActiveRequests);
  const activeProviderCount = new Set(activeRequests.map(({ provider }) => provider)).size;

  // The whole section is ONE bordered block (border + rounded + padding) so header,
  // diagram and Recent Requests read as a single component — but the block's background
  // stays TRANSPARENT, not an opaque surface. That is the only way to satisfy both of
  // anh Hà's asks at once: an opaque fill behind the diagram would block the page's
  // graph-paper wallpaper (the original "làm đéo thấy đâu" bug), so a filled block and a
  // see-through diagram ("xuyên qua") are physically mutually exclusive unless the grid is
  // repainted (which he rejected). A transparent bordered block keeps the grouping frame
  // AND lets the wallpaper pass straight through the diagram. Recent Requests keeps its own
  // solid Card (inside HomeRecentRequests) since a live data table needs a readable surface.
  return (
    <div className="rounded-card border-2 border-black/12 dark:border-white/12 shadow-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold">{t("providerTopology")}</h2>
          <p className="text-xs text-text-muted">
            {t("activeError", { active: activeProviderCount, errors: errorProvider ? 1 : 0 })}
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
          errorProvider={errorProvider}
        />
        <HomeRecentRequests enabled={enabled} />
      </div>
    </div>
  );
}
