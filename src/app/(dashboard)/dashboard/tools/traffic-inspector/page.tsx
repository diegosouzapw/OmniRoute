import { getTranslations } from "next-intl/server";
import { TrafficInspectorPageClient } from "./TrafficInspectorPageClient";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("trafficInspectorTitle"),
    description: t("trafficInspectorDescription"),
  };
}

export default async function TrafficInspectorPage() {
  const t = await getTranslations("sidebar");
  return <TrafficInspectorPageClient title={t("trafficInspector")} subtitle={t("trafficInspectorSubtitle")} purpose={t("trafficInspectorPurpose")} />;
}
