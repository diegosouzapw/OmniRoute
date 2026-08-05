// Post-deploy audit of the v3.8.50 home topology found two gaps the earlier rounds missed:
//
//  1. The active counters were not on the drawn-provider domain. `errorProviders` was already
//     intersected with the providers that actually have a node, but `activeRequests` was not —
//     a request for a disabled/deleted connection still lit the router core and inflated the
//     "active" caption with no node to explain it.
//  2. The provider node had a width FLOOR (`minWidth: 138px`) but no ceiling, and the label
//     lacked `min-w-0`, so a long operator name grew the box past the `nodeW = 164` that
//     buildLayout uses to centre it — the node drifted off its ring slot and its connectors
//     no longer met the node edge.
//
// The structural properties are asserted against the source text (a unit render cannot see
// CSS truncation or React Flow's top-left positioning), and the intersection rule is asserted
// behaviourally through the pure helper.
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { selectDrawnProviders } from "../../src/app/(dashboard)/home/topologyUtils.ts";

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const topologySrc = read("../../src/app/(dashboard)/home/ProviderTopology.tsx");
const sectionSrc = read("../../src/app/(dashboard)/dashboard/HomeProviderTopologySection.tsx");

describe("active counters only count providers that have a drawn node", () => {
  test("the caption counter intersects active requests with the drawn providers", () => {
    // Was a raw `new Set(activeRequests.map(...)).size` — it counted any provider the WS feed
    // reported, including one whose node had already disappeared.
    assert.match(
      sectionSrc,
      /const drawnActiveProviders = selectDrawnProviders\(/,
      "the active set must be filtered through the drawn-provider intersection"
    );
    assert.match(
      sectionSrc,
      /const activeProviderCount = drawnActiveProviders\.size;/,
      "the caption must count the intersected set, not the raw request list"
    );
    assert.doesNotMatch(
      sectionSrc,
      /const activeProviderCount = new Set\(/,
      "the raw request-list count must be gone"
    );
  });

  test("the request list handed to the graph is already on the drawn domain", () => {
    // Filtering the list itself (not just the count) keeps the node pulse and the router
    // counter on the same set as the caption — they can never disagree about what is active.
    assert.match(
      sectionSrc,
      /const activeRequests = reportedActiveRequests\.filter\(\(\{ provider \}\) =>\s*\n\s*drawnActiveProviders\.has\(provider\.trim\(\)\.toLowerCase\(\)\)\s*\n\s*\);/,
      "only requests for drawn providers may reach ProviderTopology"
    );
  });

  test("the router activeCount derives from the drawn-intersected active set", () => {
    // activeKey feeds activeSet, which feeds buildLayout's `activeCount: activeSet.size`.
    // Intersecting activeKey with the drawn providers is what keeps the core from lighting up
    // for a provider with no node.
    assert.match(
      topologySrc,
      /\[\.\.\.selectDrawnProviders\(\s*\n\s*activeRequests\.map\(\(request\) => request\.provider \|\| ""\),\s*\n\s*providers\.map\(\(provider\) => provider\.provider\)\s*\n\s*\)\]/,
      "activeKey must be the drawn-provider intersection of activeRequests"
    );
    assert.match(
      topologySrc,
      /data: \{ activeCount: activeSet\.size \}/,
      "the router counter must read the intersected set"
    );
  });

  test("a request for an undrawn provider contributes nothing to the active set", () => {
    const drawn = ["openai", "anthropic"];
    const active = selectDrawnProviders(["openai", "ghost", "deleted-provider"], drawn);
    assert.deepEqual([...active], ["openai"]);
    assert.equal(active.has("ghost"), false);
    assert.equal(active.has("deleted-provider"), false);
    assert.equal(active.size, 1, "only the drawn provider counts as active");
  });
});

describe("the provider node is a fixed 164px box that truncates long labels", () => {
  test("the node box is a fixed width matching buildLayout's nodeW", () => {
    // A floor (`minWidth`) let the box grow with its content; a fixed `w-[164px]` border box
    // cannot. nodeW only recentres the node (`x: cx - nodeW / 2`), so the rendered width must
    // equal it exactly or every connector drifts off the node edge.
    assert.match(
      topologySrc,
      /className="flex w-\[164px\] items-center gap-2 rounded-lg border-2 bg-bg px-3 py-2 transition-all duration-300"/,
      "the node must render a fixed 164px border box"
    );
    assert.match(topologySrc, /const nodeW = 164;/, "buildLayout must centre on the same width");
    assert.doesNotMatch(
      topologySrc,
      /minWidth: "138px"/,
      "the growable width floor must be gone, not kept alongside the fixed width"
    );
  });

  test("the label can actually shrink, so truncate applies instead of growing the box", () => {
    // A flex item defaults to `min-width: auto`, which refuses to shrink below its content —
    // `truncate` alone does nothing without `min-w-0`. This is the exact mechanism that let a
    // long name push the node wider than nodeW.
    assert.match(
      topologySrc,
      /className="min-w-0 flex-1 truncate text-sm font-medium"/,
      "the label must be a shrinkable, truncating flex child"
    );
    assert.doesNotMatch(
      topologySrc,
      /className="text-sm font-medium truncate flex-1"/,
      "the non-shrinkable label class must be gone"
    );
  });

  test("the icon tile and status dot cannot be squeezed by a long label", () => {
    // Both are `shrink-0`, so a truncating label absorbs all the shrinkage and the node's
    // internal layout stays stable at the fixed width.
    assert.match(
      topologySrc,
      /className="size-7 rounded-md flex items-center justify-center shrink-0"/,
      "the icon tile must not shrink"
    );
  });
});
