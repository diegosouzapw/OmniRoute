"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { Card } from "@/shared/components";
import { useLiveRequests } from "@/hooks/useLiveDashboard";
import { selectActiveRequests } from "../home/topologyUtils";

const ProviderTopology = dynamic(() => import("../home/ProviderTopology"), { ssr: false });

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

  return (
    <Card>
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
      <ProviderTopology
        providers={providers}
        activeRequests={activeRequests}
        lastProvider={lastProvider}
        errorProvider={errorProvider}
      />
    </Card>
  );
}
