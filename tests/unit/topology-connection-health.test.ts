import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Topology rest-state contract.
 *
 * HISTORY — this file originally guarded #7672, which painted a connection-health base
 * layer onto the nodes: a healthy-but-idle provider was drawn with a green border and a
 * static dot so the map never "went blank" between requests.
 *
 * That base layer is DELIBERATELY REPLACED here by a calm-at-rest map: only a live
 * in-flight request (or a real error) lights a node or a beam, and a healthy-but-quiet
 * connection stays muted. The reasoning is signal economy at scale — with many providers,
 * painting every healthy connection green makes the steady state a wall of green, and the
 * two things an operator actually needs to spot (what is routing right now, what is
 * failing) have to compete with it.
 *
 * The legibility concern that motivated #7672 (and #8409) is preserved by *structure*
 * instead of by colour:
 *   - a node exists ONLY for a provider with at least one enabled connection, so presence
 *     in the map already means "configured and enabled" — and absence is meaningful;
 *   - ring slots are stable and alphabetical, so a node never moves because of traffic.
 *
 * These tests therefore assert the CURRENT contract. They are not a relaxation of #7672:
 * each assertion below pins a specific behaviour that must not silently regress.
 */

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const homePageClientSrc = read("../../src/app/(dashboard)/dashboard/HomePageClient.tsx");
// The topology-node derivation was extracted out of HomePageClient (size-frozen) into this
// hook, which now owns the enabled-connection and health-status rules below.
const providerStatsSrc = read("../../src/app/(dashboard)/dashboard/useHomeProviderStats.ts");
const providerTopologySrc = read("../../src/app/(dashboard)/home/ProviderTopology.tsx");
const sectionSrc = read("../../src/app/(dashboard)/dashboard/HomeProviderTopologySection.tsx");

test("useHomeProviderStats draws a node only for providers with an enabled connection", () => {
  // `connected` + `errors` counts only enabled connections (isActive !== false), so a
  // provider whose connections are all disabled must be skipped entirely. This is what
  // keeps untested / disabled / removed providers from lingering as ghost nodes.
  assert.match(
    providerStatsSrc,
    /const enabled = stat\.connected \+ stat\.errors;/,
    "enabled-connection count must drive node inclusion"
  );
  assert.match(
    providerStatsSrc,
    /if \(enabled <= 0\) continue;/,
    "no enabled connection → no node"
  );
  // Nodes must NOT be seeded from all-time call_logs aggregates, which have no time
  // window and no connection check (the ghost-node source before this change). Guarded on
  // both files: the derivation moved, but the metrics state still lives in the client, so
  // either side could reintroduce the seeding.
  for (const src of [providerStatsSrc, homePageClientSrc]) {
    assert.doesNotMatch(
      src,
      /Object\.keys\(providerMetrics\)\.forEach\(\(provider\) => addProvider\(provider\)\)/,
      "providerMetrics must not resurrect providers that no longer have a connection"
    );
  }
});

test("useHomeProviderStats still resolves a per-provider health status for each node", () => {
  // Health is no longer painted as a green rest colour, but the status is still computed
  // and carried so the section/graph (and any future health affordance) can use it.
  assert.match(
    providerStatsSrc,
    /status:\s*stat\.connected > 0 \? "active" : "error"/,
    "each topology entry must still carry a resolved health status"
  );
});

test("HomeProviderTopologySection forwards the status field on each provider", () => {
  assert.match(
    sectionSrc,
    /status\?:\s*"active"\s*\|\s*"error"\s*\|\s*"idle"/,
    "the section's provider type must include the health status"
  );
});

test("ProviderTopology keeps the map calm at rest — only traffic or a real error lights a node", () => {
  // Node state is derived purely from transient traffic: active (in-flight) beats a live
  // error beats the most-recent call. Connection health must NOT be a fourth colour here.
  assert.match(
    providerTopologySrc,
    /const active = activeSet\.has\(pid\);/,
    "active state comes from the live in-flight set"
  );
  assert.doesNotMatch(
    providerTopologySrc,
    /p\.status === "active"/,
    "connection health must not paint the node at rest (replaces the #7672 base layer)"
  );
  // The rest border falls through to the neutral token — not green — when idle.
  assert.match(
    providerTopologySrc,
    /borderColor: error \? RED : active \? color : "var\(--color-border\)"/,
    "an idle node keeps the neutral border, even when its connection is healthy"
  );
  // A dot is rendered only for a live request or a real error.
  assert.match(
    providerTopologySrc,
    /\{\(active \|\| error\) && \(/,
    "no status dot for a healthy-but-idle provider"
  );
});

test("ProviderTopology node position never depends on activity", () => {
  // A provider must keep its ring slot whether or not it is mid-request, so the map cannot
  // reshuffle ("jump") every time a call lands — activity is carried by styling alone.
  // The order itself is creation order (see compareTopologyProviders): sorting on the
  // provider ID put every newly added compatible node first, because its generated id
  // begins with "anthropic-compatible-"/"openai-compatible-".
  assert.match(
    providerTopologySrc,
    /\[\.\.\.providers\]\.sort\(compareTopologyProviders\)/,
    "providers must be laid out in creation order via the shared comparator"
  );
  assert.doesNotMatch(
    providerTopologySrc,
    /a\.provider\.toLowerCase\(\)\.localeCompare\(b\.provider\.toLowerCase\(\)\)/,
    "layout must not sort on the provider id — that pins new compatible nodes first"
  );
  // A single growing ellipse replaced the fixed-capacity ring ladder (RING_MIN_RX /
  // ringRadii); node spacing now scales with the provider count instead of stepping
  // between discrete rings.
  assert.match(
    providerTopologySrc,
    /function ringRadii\(/,
    "layout must size its ring from the provider count"
  );
});
