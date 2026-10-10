/**
 * Per-route i18n provider coverage — the gate #14835 was missing.
 *
 * #14835 split the client catalog per route: each route serializes only the
 * namespaces its own client components use, via a nested
 * NextIntlClientProvider. Nested providers REPLACE rather than merge, so a
 * route whose provider omits a namespace renders those keys as literal
 * dotted paths (`home.quickStart`) even though en.json has them.
 *
 * The regression: the generator emitted a provider layout for every section
 * under `src/app/(dashboard)/dashboard/`, but `src/app/(dashboard)/home/` is
 * a SIBLING route with its own page.tsx. It never got a provider, so /home
 * inherited only the chrome set and rendered home.*, providers.*,
 * kimiSponsorBanner.*, cheaperInferenceSponsorBanner.* and
 * vscodeCopilotBanner.* raw. The existing guard in
 * i18n-route-namespaces.test.ts could not catch this: it only iterates
 * `sections`, and `home` is not a section.
 *
 * This gate enumerates the routes the analyzer actually emits a set for and
 * asserts each one has a provider layout mounting that set, and that the set
 * covers every namespace its client components use.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import {
  analyzeRouteNamespaces,
  closureNamespaces,
  walkFiles,
  REPO_ROOT,
} from "../../scripts/i18n/lib/routeNamespacesAnalyzer.mjs";

const DASHBOARD_ROOT = join(REPO_ROOT, "src", "app", "(dashboard)");
const SECTIONS_ROOT = join(DASHBOARD_ROOT, "dashboard");
const MAP = JSON.parse(
  readFileSync(join(REPO_ROOT, "src", "i18n", "routeNamespaces.generated.json"), "utf8")
);

/**
 * Route name → directory holding it. `home` is a sibling of `dashboard/`;
 * every other route is a section directory beneath it.
 */
const ROUTE_DIRS: Record<string, string> = {
  home: join(DASHBOARD_ROOT, "home"),
  ...Object.fromEntries(Object.keys(MAP.sections).map((name) => [name, join(SECTIONS_ROOT, name)])),
};

/** Routes the analyzer emits a dedicated namespace set for. */
const ROUTES: Record<string, string[]> = {
  home: MAP.home,
  ...MAP.sections,
};

/** Which generated set a provider layout mounts, or null if it mounts none. */
function mountedSet(source: string): readonly string[] | null {
  const section = source.match(/sections\[\s*["']([^"']+)["']\s*\]/);
  if (section) return MAP.sections[section[1]] ?? null;
  const top = source.match(/\.\b(home|chrome|root)\b/);
  if (top) return MAP[top[1]] ?? null;
  return null;
}

test("every dashboard route has a provider layout mounting its own set", () => {
  const unmounted: string[] = [];
  for (const [name, expected] of Object.entries(ROUTES)) {
    const layoutPath = join(ROUTE_DIRS[name], "layout.tsx");
    if (!existsSync(layoutPath)) {
      unmounted.push(`${name}/layout.tsx (missing)`);
      continue;
    }
    const source = readFileSync(layoutPath, "utf8");
    if (!source.includes("SectionI18nProvider")) {
      unmounted.push(`${name}/layout.tsx (no SectionI18nProvider)`);
      continue;
    }
    const mounted = mountedSet(source);
    if (mounted === null) {
      unmounted.push(`${name}/layout.tsx (mounts no generated set)`);
    } else if (expected.length !== mounted.length || expected.some((ns, i) => ns !== mounted[i])) {
      unmounted.push(`${name}/layout.tsx mounts a different set than routes.${name}`);
    }
  }
  assert.deepEqual(
    unmounted,
    [],
    "routes without a provider layout fall back to chrome-only messages and render raw keys"
  );
});

test("each route's set covers every namespace its client components use", () => {
  const uncovered: string[] = [];
  for (const [name, expected] of Object.entries(ROUTES)) {
    const needed = closureNamespaces(walkFiles(ROUTE_DIRS[name]));
    for (const ns of needed) {
      if (!expected.includes(ns)) uncovered.push(`${name}: ${ns}`);
    }
  }
  assert.deepEqual(
    uncovered,
    [],
    "namespaces used by client components but absent from the route's provider set"
  );
});

test("the home route set is derived from the /home route subtree", () => {
  // `home` must be computed from src/app/(dashboard)/home/ — the route that
  // actually renders HomePageClient — not from its sibling dashboard/.
  const fresh = analyzeRouteNamespaces();
  const fromHomeRoute = closureNamespaces(walkFiles(join(DASHBOARD_ROOT, "home")));
  for (const ns of fromHomeRoute) {
    assert.ok(
      fresh.home.includes(ns),
      `home set must include "${ns}" — it is used by a client component under (dashboard)/home/`
    );
  }
});
