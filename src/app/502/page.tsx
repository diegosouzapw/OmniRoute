import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";
import { useTranslations } from "next-intl";

export default function BadGatewayPage() {
  const t = useTranslations("publicSystem");

  return (
    <ErrorPageScaffold
      code="502"
      icon="hub"
      title={t("statusPages.502.title")}
      description={t("statusPages.502.description")}
      suggestions={[
        t("statusPages.502.suggestion1"),
        t("statusPages.502.suggestion2"),
        t("statusPages.502.suggestion3"),
      ]}
      primaryAction={{ href: "/dashboard/providers", label: t("statusPages.502.primaryAction") }}
      secondaryAction={{
        href: "/dashboard/translator",
        label: t("statusPages.502.secondaryAction"),
      }}
    />
  );
}
