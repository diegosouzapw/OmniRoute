"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";

interface StatsTabProps {
  requests: InterceptedRequest[];
}

// Recharts bundle is split via Next.js dynamic() — not included in the initial page chunk.
const StatsCharts = dynamic(() => import("./StatsCharts"), {
  ssr: false,
  loading: () => <LoadingCharts />,
});

function LoadingCharts() {
  const t = useTranslations("trafficInspector");
  return <div className="p-4 text-sm text-muted-foreground">{t("loadingCharts")}</div>;
}

export function StatsTab({ requests }: StatsTabProps) {
  const t = useTranslations("trafficInspector");
  if (requests.length === 0) {
    return (
      <div className="p-4 text-sm text-text-muted">{t("statsNoData")}</div>
    );
  }
  return <StatsCharts requests={requests} />;
}
