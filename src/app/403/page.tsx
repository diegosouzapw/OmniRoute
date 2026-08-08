import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function ForbiddenStatusPage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="403"
      icon="gpp_bad"
      title={t("statusPages.403.title")}
      description={t("statusPages.403.description")}
      suggestions={[
        t("statusPages.403.suggestion1"),
        t("statusPages.403.suggestion2"),
        t("statusPages.403.suggestion3"),
      ]}
      primaryAction={{ href: "/forbidden", label: t("statusPages.403.primaryAction") }}
      secondaryAction={{
        href: "/dashboard/settings?tab=security",
        label: t("statusPages.403.secondaryAction"),
      }}
    />
  );
}
