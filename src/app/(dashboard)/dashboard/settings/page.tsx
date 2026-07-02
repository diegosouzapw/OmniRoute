import { redirect } from "next/navigation";

const LEGACY_TAB_ROUTES: Record<string, string> = {
  advanced: "/dashboard/settings/advanced",
  ai: "/dashboard/settings/ai",
  appearance: "/dashboard/settings/appearance",
  featureFlags: "/dashboard/settings/feature-flags",
  "feature-flags": "/dashboard/settings/feature-flags",
  general: "/dashboard/settings/general",
  resilience: "/dashboard/settings/resilience",
  routing: "/dashboard/settings/routing",
  security: "/dashboard/settings/security",
  sidebar: "/dashboard/settings/sidebar",
};

type SettingsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function resolveSettingsRoute(value: string | undefined): string {
  return value
    ? LEGACY_TAB_ROUTES[value] || "/dashboard/settings/general"
    : "/dashboard/settings/general";
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = searchParams ? await searchParams : {};
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  redirect(resolveSettingsRoute(tab));
}
