import { Metadata } from "next";
import { ApiExplorerClient } from "../components/ApiExplorerClient";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("docs");
  return {
    title: t("apiExplorerMetadataTitle"),
    description: t("apiExplorerMetadataDescription"),
  };
}

export default function ApiExplorerPage() {
  const t = useTranslations("docs");
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-main mb-2">{t("apiExplorerTitle")}</h1>
      <p className="text-text-muted mb-8">{t("apiExplorerDescription")}</p>
      <ApiExplorerClient />
    </div>
  );
}
