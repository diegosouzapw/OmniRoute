import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function RequestTimeoutPage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="408"
      icon="timer_off"
      title={t("statusPages.408.title")}
      description={t("statusPages.408.description")}
      suggestions={[
        t("statusPages.408.suggestion1"),
        t("statusPages.408.suggestion2"),
        t("statusPages.408.suggestion3"),
      ]}
      primaryAction={{ href: "/dashboard/endpoint", label: t("statusPages.408.primaryAction") }}
      secondaryAction={{ href: "/status", label: t("statusPages.408.secondaryAction") }}
    />
  );
}
