/**
 * Regression test for #5166/#5183 follow-up — blocked no-auth providers must NOT
 * silently vanish from the dashboard's All Providers page.
 *
 * Root cause: the All Providers page dropped any no-auth provider present in
 * `blockedProviders` instead of surfacing it, so a user who disabled a no-auth
 * provider (which writes `blockedProviders`) could no longer find or restore it
 * from the providers page — the entry simply disappeared, with the only restore
 * path buried under Settings → Security → Blocked Providers.
 *
 * The page now partitions no-auth entries into `visible` (rendered as usual) and
 * `blocked` (rendered with a "Disabled" badge + Enable button) via the pure
 * `partitionNoAuthEntriesByBlocked` helper. Blocked entries must be returned,
 * never discarded, and the partition must honour both provider id and alias.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { partitionNoAuthEntriesByBlocked } from "../../src/shared/utils/noAuthProviders.ts";

type Entry = { providerId: string; provider: { name: string; alias?: string } };

const entries: Entry[] = [
  { providerId: "veoaifree-web", provider: { name: "VeoAIFree" } },
  { providerId: "gemini-web", provider: { name: "Gemini Web (Free)", alias: "geminiweb" } },
  { providerId: "kilocode", provider: { name: "Kilo Code" } },
];

test("#5183 returns every entry — nothing is dropped", () => {
  const { visible, blocked } = partitionNoAuthEntriesByBlocked(entries, ["veoaifree-web"]);
  assert.equal(visible.length + blocked.length, entries.length);
});

test("#5183 a blocked-by-id no-auth provider lands in `blocked`, not discarded", () => {
  const { visible, blocked } = partitionNoAuthEntriesByBlocked(entries, ["veoaifree-web"]);
  assert.deepEqual(
    blocked.map((e) => e.providerId),
    ["veoaifree-web"]
  );
  assert.ok(!visible.some((e) => e.providerId === "veoaifree-web"));
});

test("#5183 a provider blocked by its ALIAS is also captured as blocked", () => {
  const { blocked } = partitionNoAuthEntriesByBlocked(entries, ["geminiweb"]);
  assert.deepEqual(
    blocked.map((e) => e.providerId),
    ["gemini-web"]
  );
});

test("#5183 empty/garbage blocklist => all visible, none blocked", () => {
  for (const bl of [[], null, undefined, "nope", 42]) {
    const { visible, blocked } = partitionNoAuthEntriesByBlocked(entries, bl);
    assert.equal(visible.length, entries.length);
    assert.equal(blocked.length, 0);
  }
});

test("#5183 partition order is preserved within each bucket", () => {
  const { visible, blocked } = partitionNoAuthEntriesByBlocked(entries, ["gemini-web"]);
  assert.deepEqual(
    visible.map((e) => e.providerId),
    ["veoaifree-web", "kilocode"]
  );
  assert.deepEqual(
    blocked.map((e) => e.providerId),
    ["gemini-web"]
  );
});
