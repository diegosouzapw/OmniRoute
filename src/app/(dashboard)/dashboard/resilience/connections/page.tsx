import { getTranslations } from "next-intl/server";
import ResilienceConnectionsClient from "./components/ResilienceConnectionsClient";

export const dynamic = "force-dynamic";

export default async function ResilienceConnectionsPage() {
  const t = await getTranslations("resilienceConnections");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1>{t("title")}</h1>
      <ResilienceConnectionsClient />
    </div>
  );
}
