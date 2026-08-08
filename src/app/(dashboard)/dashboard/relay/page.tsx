import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RelayProxyClient from "./RelayProxyClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: t("relayTitle"),
    description: t("relayDescription"),
  };
}

export default function RelayProxyPage() {
  return <RelayProxyClient />;
}
