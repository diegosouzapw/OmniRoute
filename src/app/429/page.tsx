import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function TooManyRequestsPage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="429"
      icon="hourglass_top"
      title={t("statusPages.429.title")}
      description={t("statusPages.429.description")}
      suggestions={[
        t("statusPages.429.suggestion1"),
        t("statusPages.429.suggestion2"),
        t("statusPages.429.suggestion3"),
      ]}
      primaryAction={{
        href: "/dashboard/settings?tab=resilience",
        label: t("statusPages.429.primaryAction"),
      }}
      secondaryAction={{ href: "/dashboard/combos", label: t("statusPages.429.secondaryAction") }}
    />
  );
}
