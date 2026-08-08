import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function BadRequestPage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="400"
      icon="rule"
      title={t("statusPages.400.title")}
      description={t("statusPages.400.description")}
      suggestions={[
        t("statusPages.400.suggestion1"),
        t("statusPages.400.suggestion2"),
        t("statusPages.400.suggestion3"),
      ]}
      primaryAction={{ href: "/docs", label: t("statusPages.400.primaryAction") }}
      secondaryAction={{
        href: "/dashboard/translator",
        label: t("statusPages.400.secondaryAction"),
      }}
    />
  );
}
