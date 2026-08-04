import { redirect } from "next/navigation";

// `/dashboard/context` is a hub with only sub-routes (settings, combos, ultra,
// …) and no page of its own, so Next.js RSC prefetches of the bare parent
// route 404'd (#5298). Redirect the parent to its canonical sub-route, honoring
// a legacy `?tab=` query for deep links.
const CONTEXT_TAB_ROUTES: Record<string, string> = {
  settings: "/dashboard/context/settings",
  combos: "/dashboard/context/combos",
  caveman: "/dashboard/context/caveman",
  rtk: "/dashboard/context/rtk",
  headroom: "/dashboard/context/headroom",
  "session-dedup": "/dashboard/context/session-dedup",
  sessionDedup: "/dashboard/context/session-dedup",
  ccr: "/dashboard/context/ccr",
  llmlingua: "/dashboard/context/llmlingua",
  lite: "/dashboard/context/lite",
  aggressive: "/dashboard/context/aggressive",
  ultra: "/dashboard/context/ultra",
};

const DEFAULT_CONTEXT_ROUTE = "/dashboard/context/settings";

export function resolveContextRoute(value: string | undefined): string {
  return value ? CONTEXT_TAB_ROUTES[value] || DEFAULT_CONTEXT_ROUTE : DEFAULT_CONTEXT_ROUTE;
}

type ContextPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContextPage({ searchParams }: ContextPageProps) {
  const params = searchParams ? await searchParams : {};
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  redirect(resolveContextRoute(tab));
}
