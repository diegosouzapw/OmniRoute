import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import OrchestrationPageClient from "./OrchestrationPageClient";

export async function generateMetadata() {
  const t = await getTranslations("orchestration");
  return { title: t("title"), description: t("description") };
}

export default function OrchestrationPage() {
  return (
    <Suspense fallback={null}>
      <OrchestrationPageClient />
    </Suspense>
  );
}
