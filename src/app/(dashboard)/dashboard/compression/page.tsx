import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("compressionTitle"),
    description: t("compressionDescription"),
  };
}

export default function CompressionPage() {
  redirect("/dashboard/context/caveman");
}
