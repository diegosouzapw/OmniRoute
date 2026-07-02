type SidebarLikeItem = {
  href: string;
  exact?: boolean;
  external?: boolean;
};

export function matchesSidebarHref(
  pathname: string | null | undefined,
  href: string,
  exact = false
): boolean {
  if (!pathname) return false;
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveSidebarHref(
  pathname: string | null | undefined,
  items: SidebarLikeItem[]
): string | null {
  let bestMatch: SidebarLikeItem | null = null;

  for (const item of items) {
    if (item.external) continue;
    if (!matchesSidebarHref(pathname, item.href, item.exact === true)) continue;

    if (!bestMatch) {
      bestMatch = item;
      continue;
    }

    if (item.href.length > bestMatch.href.length) {
      bestMatch = item;
      continue;
    }

    if (item.href.length === bestMatch.href.length && item.exact && !bestMatch.exact) {
      bestMatch = item;
    }
  }

  return bestMatch?.href || null;
}
