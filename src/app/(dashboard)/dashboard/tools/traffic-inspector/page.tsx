import { getTranslations } from "next-intl/server";
import { TrafficInspectorPageClient } from "./TrafficInspectorPageClient";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("trafficInspectorTitle"),
    description: t("trafficInspectorDescription"),
  };
}

export default function TrafficInspectorPage() {
  return <TrafficInspectorPageClient />;
}
