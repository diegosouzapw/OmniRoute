import { getTranslations } from "next-intl/server";
import CooldownManagerClient from "./components/CooldownManagerClient";

export const dynamic = "force-dynamic";

export default async function ResilienceCooldownsPage() {
  const t = await getTranslations("resilienceCooldowns");
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1>{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-text-muted">{t("description")}</p>
      </div>
      <CooldownManagerClient />
    </div>
  );
}
