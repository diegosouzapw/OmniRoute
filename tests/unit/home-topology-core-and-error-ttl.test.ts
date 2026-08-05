// Round-two coverage for the live /home topology, after an operator looked at the deployed
// map and reported: the router core is an ugly square, the in-flight count hangs off its
// corner instead of sitting next to the logo, the whole diagram is shrunk, and a red error
// state has no visible way to ever clear.
//
// Everything here is asserted against the source text rather than a rendered tree, because
// the properties that broke are structural (which element holds the counter, which constant
// sizes the ring, whether a TTL exists at all) and each one is invisible in a unit render:
// a square core renders fine, a permanent red edge renders fine.
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { compareTopologyProviders } from "../../src/app/(dashboard)/home/topologyUtils.ts";

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const topologySrc = read("../../src/app/(dashboard)/home/ProviderTopology.tsx");
const metricsRouteSrc = read("../../src/app/api/provider-metrics/route.ts");
const homePageClientSrc = read("../../src/app/(dashboard)/dashboard/HomePageClient.tsx");
// The provider-stat and topology-node derivation was extracted out of HomePageClient (which
// is size-frozen) into this hook. It is the owner of the priority/enabled/health rules, so
// those assertions must read it — pinning them to HomePageClient would pass on an empty file.
const providerStatsSrc = read("../../src/app/(dashboard)/dashboard/useHomeProviderStats.ts");

describe("router core is a landscape rectangle with the counter inline", () => {
  test("the core box is wider than it is tall", () => {
    // Was `size-12` — a 48x48 square. The operator's words: "để cục đó hình vuông thì hơi
    // xấu... kéo dài ra 1 chút".
    assert.match(
      topologySrc,
      /className=\{`relative flex h-12 w-24 items-center justify-center gap-2 rounded-xl/,
      "RouterNode must render a 96x48 landscape box with a row gap"
    );
    assert.doesNotMatch(
      topologySrc,
      /justify-center size-12 rounded-xl/,
      "the square core class must be gone, not merely overridden"
    );
  });

  test("buildLayout's routerW matches the rendered width", () => {
    // routerW only recentres the node (`x: -routerW / 2`); it does not size it. A stale
    // value silently offsets the core from the ring centre, which is exactly the kind of
    // half-fix that looks correct in code review and wrong on screen.
    assert.match(topologySrc, /const routerW = 96;/, "routerW must track the w-24 box");
    assert.match(topologySrc, /const routerH = 48;/);
    assert.match(
      topologySrc,
      /position: \{ x: -routerW \/ 2, y: -routerH \/ 2 \}/,
      "the core must stay centred through the same two constants"
    );
  });

  test("the counter is inline, not an absolutely positioned corner badge", () => {
    assert.match(
      topologySrc,
      /<span className="topology-router-badge flex h-5 min-w-\[20px\]/,
      "the count must be a normal flex child next to the logo"
    );
    assert.doesNotMatch(
      topologySrc,
      /absolute -top-2 -right-2/,
      "the corner badge positioning must be removed"
    );
  });

  test("the counter appears only while routing — no idle zero beside the logo", () => {
    // Matches 9Router, whose RouterNode renders `{data.activeCount > 0 && <span …>}`.
    assert.match(
      topologySrc,
      /\{active && \(\s*\n\s*<span className="topology-router-badge/,
      "the counter must be conditionally mounted on active traffic"
    );
    // A permanent slot holding a literal "0" was the wrong fix: it put a dead number against
    // the logo at all times and crowded it. Guard the exact idle-styling that revision used
    // so it cannot come back.
    assert.doesNotMatch(
      topologySrc,
      /bg-primary\/10 text-text-muted/,
      "there must be no muted resting state for the counter — it simply is not rendered"
    );
    assert.doesNotMatch(
      topologySrc,
      /topology-router-count/,
      "the reserved-slot marker class must be gone"
    );
  });

  test("the BOX is what stays fixed, so mounting the counter cannot move the core", () => {
    // This is why no slot needs reserving: the container is a fixed h-12 w-24 with
    // justify-center, so its width is independent of its contents and React Flow's
    // top-left positioning keeps it centred. The contents re-centre inside it.
    assert.match(
      topologySrc,
      /flex h-12 w-24 items-center justify-center gap-2 rounded-xl/,
      "the core must be a fixed-size, content-centring box"
    );
    assert.doesNotMatch(
      topologySrc,
      /min-w-\[\d+px\] h-12|w-auto|max-w-\[/,
      "the core must not be sized by its content"
    );
    assert.match(
      topologySrc,
      /tabular-nums/,
      "digits stay tabular so 9 -> 10 does not reflow the row"
    );
  });
});

describe("error state expires on its own", () => {
  test("a named TTL constant exists and matches 9Router's 10 seconds", () => {
    // 9Router: src/lib/db/repos/usageRepo.js:237 — `Date.now() - lastErrorProvider.ts < 10000`.
    assert.match(
      metricsRouteSrc,
      /const TOPOLOGY_ERROR_TTL_MS = 10_000;/,
      "the window must be a named constant, not a magic number at the call site"
    );
  });

  test("being currently-in-error requires a RECENT failure, not just a failed last call", () => {
    // The old condition was `lastStatus outside 2xx/3xx` alone. That can never become false
    // on its own: a provider that fails and is then left alone has no newer call to clear
    // the flag, so it stayed red forever. This is the operator's question — "trạng thái đỏ
    // bao giờ sẽ mất vậy?" — and the answer used to be "never".
    assert.match(
      metricsRouteSrc,
      /const isCurrentlyInError =\s*\n\s*lastFailed &&\s*\n\s*Number\.isFinite\(lastErrorTs\) &&\s*\n\s*requestStartedAt - lastErrorTs <= TOPOLOGY_ERROR_TTL_MS;/,
      "the error flag must be gated on both a failed last call AND the TTL"
    );
  });

  test("the whole sweep is aged against a single timestamp", () => {
    // Calling Date.now() per row would age later providers against a slightly later clock.
    assert.match(metricsRouteSrc, /const requestStartedAt = Date\.now\(\);/);
  });

  test("the TTL is applied server-side, not in the browser", () => {
    // lastErrorAt comes from the server's clock; comparing it against a client clock would
    // expire failures early (or never) on a skewed machine.
    // Narrowly: no TTL constant and no age arithmetic on the client. `lastErrorAt` itself is
    // fine to MENTION — it is a field on the metrics type the client stores — so matching the
    // bare name here would fail on a type declaration that re-derives nothing.
    assert.doesNotMatch(
      homePageClientSrc,
      /TOPOLOGY_ERROR_TTL_MS|Date\.parse\(\s*[^)]*lastErrorAt/,
      "the client must consume the already-decided list, never re-derive the window"
    );
    assert.match(
      homePageClientSrc,
      /Array\.isArray\(data\.topology\?\.errorProviders\)/,
      "the client reads the server's decision"
    );
  });

  test("expiry did not reintroduce the single-slot overwrite", () => {
    // 9Router pays for its TTL with a global single slot (`global._lastErrorProvider`), so
    // one provider failing clears another's red edge. That was the round-one bug here; the
    // plural list must survive this change.
    assert.match(
      metricsRouteSrc,
      /const errorProviders: string\[\] = \[\];/,
      "every failing provider must still be reported"
    );
    assert.match(
      metricsRouteSrc,
      /if \(isCurrentlyInError\) \{\s*\n\s*errorProviders\.push\(provider\);/,
      "the list must be filled from the same TTL-gated condition"
    );
    // The legacy singular field must be derived from the same gate, so the two can never
    // disagree about whether a provider is failing.
    assert.match(
      metricsRouteSrc,
      /if \(lastErrorTs > errorProviderTs\) \{/,
      "the singular field narrows the live failures rather than tracking its own condition"
    );
  });
});

describe("ring geometry is no longer shrunk", () => {
  test("the ring floors match 9Router's", () => {
    // 9Router buildLayout: `rx = Math.max(320, minRx)`, `ry = Math.max(200, rx * 0.55)`.
    // The previous 210 / 132 / 0.63 drew the same map at roughly two thirds the size.
    assert.match(topologySrc, /const RING_MIN_RX = 320;/);
    assert.match(topologySrc, /const RING_MIN_RY = 200;/);
    assert.match(topologySrc, /const RING_ELLIPSE_RATIO = 0\.55;/);
    assert.match(topologySrc, /const RING_NODE_ARC = 204;/);
  });

  test("the ring still grows with the provider count", () => {
    // A bigger floor must not replace the growth rule, or a crowded map goes back to
    // overlapping nodes.
    assert.match(
      topologySrc,
      /const rx = Math\.max\(RING_MIN_RX, \(count \* RING_NODE_ARC\) \/ \(2 \* Math\.PI\)\);/
    );
  });

  test("the frame is tall enough for the larger ring", () => {
    assert.match(
      topologySrc,
      /"h-\[320px\] w-full min-w-0 rounded-xl border border-border bg-transparent overflow-hidden sm:h-\[480px\]"/,
      "frame height must match 9Router's topology tile"
    );
  });
});

describe("provider nodes are legible without being bulky", () => {
  // The ring floor grew to 320x200 while the nodes kept their original padding, 1px border,
  // 24px icon tile and 12px label — so they read as specks inside a much larger ring. Nothing
  // guarded node size, which is why the regression shipped unnoticed.
  test("node chrome is one step up from the shrunken version", () => {
    assert.match(
      topologySrc,
      /className="flex w-\[164px\] items-center gap-2 rounded-lg border-2 bg-bg px-3 py-2 transition-all duration-300"/,
      "provider node must use the fixed-width, padded, 2px-border box"
    );
    assert.doesNotMatch(
      topologySrc,
      /gap-2 px-2\.5 py-1\.5 rounded-lg border transition/,
      "the cramped 1px-border node must be gone"
    );
  });

  test("icon tile and logo are sized to be scannable", () => {
    assert.match(topologySrc, /className="size-7 rounded-md flex items-center justify-center shrink-0"/);
    assert.match(topologySrc, /size=\{18\}/, "the provider logo must be 18px");
    assert.doesNotMatch(topologySrc, /className="size-6 rounded flex/, "the 24px tile must be gone");
  });

  test("the label is no longer the smallest text on the dashboard", () => {
    assert.match(topologySrc, /className="min-w-0 flex-1 truncate text-sm font-medium"/);
    assert.doesNotMatch(topologySrc, /className="text-xs font-medium truncate flex-1"/);
  });

  test("it stops short of 9Router's chunkier node rather than copying it", () => {
    // "Too small" was the complaint; matching 9Router's px-4 py-2.5 / 150px / 32px tile /
    // 16px label wholesale would overcorrect into "too big" and crowd the ring.
    assert.doesNotMatch(topologySrc, /px-4 py-2\.5 rounded-lg border-2/);
    assert.match(topologySrc, /w-\[164px\]/, "the node box is a fixed 164px border box");
    assert.doesNotMatch(topologySrc, /minWidth: "138px"/, "the old growable floor must be gone");
    assert.doesNotMatch(topologySrc, /minWidth: "150px"/);
  });

  test("buildLayout's node box matches what the node actually renders", () => {
    // nodeW/nodeH only recentre a node (`x: cx - nodeW / 2`), so a stale value offsets every
    // node from its own ring slot. The old nodeH of 28 was already short of the real height.
    assert.match(topologySrc, /const nodeW = 164;/);
    assert.match(topologySrc, /const nodeH = 48;/, "py-2 (16) + border-2 (4) + 28px tile = 48");
    assert.doesNotMatch(topologySrc, /const nodeH = 28;/);
  });
});

describe("priority reaches the ring from the connection data", () => {
  test("useHomeProviderStats derives one priority per provider from enabled connections", () => {
    // A provider owns one node but many connections, so the tiers must collapse to one
    // value. Lowest wins; disabled connections cannot route, so they must not rank it.
    assert.match(
      providerStatsSrc,
      /if \(connection\.isActive === false\) continue;/,
      "disabled connections must not contribute a priority"
    );
    assert.match(
      providerStatsSrc,
      /const candidate = toNumber\(connection\.globalPriority\);/,
      "global_priority is the cross-provider comparable column"
    );
    assert.match(
      providerStatsSrc,
      /if \(priority === undefined \|\| candidate < priority\) priority = candidate;/,
      "the provider is ranked by its best-placed connection"
    );
  });

  test("priority is threaded all the way to the topology entry", () => {
    assert.match(providerStatsSrc, /priority: stat\.priority,/);
    assert.match(topologySrc, /priority\?: number;/);
  });

  test("the comparator is the single place ring order is decided", () => {
    assert.match(topologySrc, /\[\.\.\.providers\]\.sort\(compareTopologyProviders\)/);
    // And it really does rank on priority — guarding the wiring above is worthless if the
    // comparator ignores the field.
    assert.equal(
      compareTopologyProviders(
        { provider: "ranked", priority: 3 },
        { provider: "unranked" }
      ) < 0,
      true,
      "a ranked provider must precede an unranked one"
    );
  });
});
