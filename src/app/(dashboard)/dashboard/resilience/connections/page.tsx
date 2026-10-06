import { getTranslations } from "next-intl/server";
import ResilienceConnectionsClient from "./components/ResilienceConnectionsClient";

export const dynamic = "force-dynamic";

export default async function ResilienceConnectionsPage() {
  const t = await getTranslations("resilienceConnections");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1>{t("title")}</h1>
        <p
          style={{
            margin: "8px 0 0",
            maxWidth: "640px",
            color: "var(--color-text-muted)",
          }}
        >
          <strong>{t("reassuranceTitle")}</strong> {t("reassuranceDetail")}
        </p>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            listStyle: "none",
            margin: "12px 0 0",
            padding: 0,
            fontSize: "13px",
          }}
        >
          <li>
            <strong>{t("table.healthy")}</strong> — {t("plainStates.healthy")}
          </li>
          <li>
            <strong>{t("table.coolingDown")}</strong> — {t("plainStates.coolingDown")}
          </li>
          <li>
            <strong>{t("table.circuitOpen")}</strong> — {t("plainStates.lockedOut")}
          </li>
        </ul>
      </div>
      <ResilienceConnectionsClient />
    </div>
  );
}
