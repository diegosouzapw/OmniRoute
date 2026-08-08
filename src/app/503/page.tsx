import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function ServiceUnavailablePage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="503"
      icon="build_circle"
      title={t("statusPages.503.title")}
      description={t("statusPages.503.description")}
      suggestions={[
        t("statusPages.503.suggestion1"),
        t("statusPages.503.suggestion2"),
        t("statusPages.503.suggestion3"),
      ]}
      primaryAction={{ href: "/maintenance", label: t("statusPages.503.primaryAction") }}
      secondaryAction={{ href: "/status", label: t("statusPages.503.secondaryAction") }}
    />
  );
}
