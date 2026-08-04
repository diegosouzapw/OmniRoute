import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const SIDEBAR = "src/shared/components/Sidebar.tsx";
const HOME_PAGE = "src/app/(dashboard)/dashboard/HomePageClient.tsx";

test("#8281: dashboard navigation opts out of automatic route prefetch", async () => {
  const source = await readFile(SIDEBAR, "utf8");

  const internalLink = source.match(/<Link\s+[\s\S]*?href=\{item\.href\}[\s\S]*?>/);
  assert.ok(internalLink, "expected the sidebar's internal navigation Link");
  assert.match(internalLink[0], /prefetch=\{false\}/);

  const logoLink = source.match(/<Link\s+href="\/home"[\s\S]*?>/);
  assert.ok(logoLink, "expected the sidebar logo home Link");
  assert.match(logoLink[0], /prefetch=\{false\}/);
});

// The sidebar was only half the storm. /home is the landing route, and its
// quick-start cards link to five more dashboard routes — so opting the sidebar
// out still left 12 speculative RSC requests on first paint. The e2e guard
// (navigation.spec.ts) could not catch it: it hung on an unrelated helper bug
// and never reached this assertion until the release-v3.8.49 CI.
test("#8281: the /home quick-start links opt out of prefetch too", async () => {
  const source = await readFile(HOME_PAGE, "utf8");

  const links = source.match(/<Link[\s\S]*?>/g) ?? [];
  const internal = links.filter((link) => /href="\/(docs|dashboard\/)/.test(link));
  assert.ok(internal.length >= 5, `expected the quick-start links, found ${internal.length}`);

  for (const link of internal) {
    assert.match(link, /prefetch=\{false\}/, `internal Link still prefetches: ${link}`);
  }
});
