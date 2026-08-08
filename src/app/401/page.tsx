import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function UnauthorizedPage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="401"
      icon="lock"
      title={t("statusPages.401.title")}
      description={t("statusPages.401.description")}
      suggestions={[
        t("statusPages.401.suggestion1"),
        t("statusPages.401.suggestion2"),
        t("statusPages.401.suggestion3"),
      ]}
      primaryAction={{ href: "/login", label: t("statusPages.401.primaryAction") }}
      secondaryAction={{
        href: "/dashboard/api-manager",
        label: t("statusPages.401.secondaryAction"),
      }}
    />
  );
}
