"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ReasoningRoutingRules from "@/shared/components/ReasoningRoutingRules";

export default function RoutingPageClient() {
  const t = useTranslations("reasoningRouting.editor");
  const searchParams = useSearchParams();
  return (
    <div className="min-w-0 w-full space-y-6 pb-10">
      <header className="space-y-3">
        <Link href="/dashboard/api-manager" className="text-sm text-primary hover:underline">
          ← {t("backToKeys")}
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-text-main">{t("pageTitle")}</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-text-muted">{t("pageDescription")}</p>
      </header>
      <ReasoningRoutingRules
        key={searchParams.get("apiKeyId") || "all"}
        initialApiKeyId={searchParams.get("apiKeyId") || ""}
      />
    </div>
  );
}
