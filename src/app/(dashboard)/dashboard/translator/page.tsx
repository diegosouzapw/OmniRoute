import TranslatorPageClient from "./TranslatorPageClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("translator");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function TranslatorPage() {
  return <TranslatorPageClient />;
}
