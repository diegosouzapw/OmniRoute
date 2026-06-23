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
  // #4596: gate the live-WS connection so it only opens while the topology
  // section is actually shown on the home page.
  const { activeRequests: liveActiveRequests } = useLiveRequests({ enabled });

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold">{t("providerTopology")}</h2>
          <p className="text-xs text-text-muted">
            Connected providers routing through OmniRoute in real time
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-green-500" /> Active
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-500" /> Recent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500" /> Error
          </span>
        </div>
      </div>
      <ProviderTopology
        providers={providers}
        activeRequests={selectActiveRequests(liveActiveRequests)}
        lastProvider={lastProvider}
        errorProvider={errorProvider}
      />
    </Card>
  );
}
