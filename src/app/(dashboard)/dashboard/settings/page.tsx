import SettingsPageClient, { type SettingsTab } from "./SettingsPageClient";

const LEGACY_TAB_ROUTES: Record<string, SettingsTab> = {
  appearance: "appearance",
  general: "general",
  resilience: "resilience",
};

type SettingsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function normalizeTab(value: string | undefined): SettingsTab {
  return value && value in LEGACY_TAB_ROUTES ? LEGACY_TAB_ROUTES[value] : "general";
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = searchParams ? await searchParams : {};
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab;

  return <SettingsPageClient initialTab={normalizeTab(tab)} />;
}
