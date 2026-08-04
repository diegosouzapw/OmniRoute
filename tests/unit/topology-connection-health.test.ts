import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The topology used to colour nodes only from live/recent traffic, so between requests
// (and right after a restart) the map went blank even though connections were healthy.
// These guard the connection-health base layer that keeps "what is connected" visible.

const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const homePageClientSrc = read("../../src/app/(dashboard)/dashboard/HomePageClient.tsx");
const providerTopologySrc = read("../../src/app/(dashboard)/home/ProviderTopology.tsx");
const sectionSrc = read("../../src/app/(dashboard)/dashboard/HomeProviderTopologySection.tsx");

test("HomePageClient derives per-provider health from connection testStatus counts", () => {
  assert.match(homePageClientSrc, /healthByProvider/, "must build a per-provider health map");
  assert.match(
    homePageClientSrc,
    /stat\.connected > 0 \? "active" : stat\.errors > 0 \? "error" : "idle"/,
    "healthy = has a working connection; error = only failing ones; else idle"
  );
  assert.match(
    homePageClientSrc,
    /status:\s*healthByProvider\.get\(canonicalProviderId\)\s*\?\?\s*"idle"/,
    "each topology entry must carry the resolved health status"
  );
});

test("HomeProviderTopologySection forwards the status field on each provider", () => {
  assert.match(
    sectionSrc,
    /status\?:\s*"active"\s*\|\s*"error"\s*\|\s*"idle"/,
    "the section's provider type must include the health status"
  );
});

test("ProviderTopology renders a connection-health base layer under the traffic signals", () => {
  // Live traffic and traffic errors still take precedence over the static health colour,
  // but `last` (most recently routed) must NOT: it used to null out `healthy`, and since
  // the node had no `last` visual the just-used provider rendered as idle grey with an
  // amber edge — less connected-looking than an untouched peer. Health owns the border,
  // recency owns the dot.
  assert.match(
    providerTopologySrc,
    /const healthy =\s*!active && !trafficError && !healthError && p\.status === "active"/,
    "healthy must survive the last-used annotation"
  );
  assert.doesNotMatch(
    providerTopologySrc,
    /const healthy =[^;]*!last/,
    "last-used must not suppress the health colour"
  );
  assert.match(
    providerTopologySrc,
    /const healthError =\s*!active && !trafficError && p\.status === "error"/,
    "healthError must survive the last-used annotation"
  );
  assert.match(
    providerTopologySrc,
    /edgeStyle\(active, last, error, healthy\)/,
    "the healthy state must reach the edge palette"
  );

  // The node must render the health state (green border / static dot) — a non-pulsing dot
  // distinguishes "connected" from "active".
  assert.match(providerTopologySrc, /pulse=\{active \|\| error\}/);
  assert.match(providerTopologySrc, /active \|\| error \|\| healthy \|\| last/);
});

test("ProviderTopology marks the last-routed provider with an amber dot, not a grey node", () => {
  assert.match(
    providerTopologySrc,
    /const AMBER = FLOW_EDGE_COLORS\.last/,
    "recency reuses the shared amber from the edge palette"
  );
  assert.match(
    providerTopologySrc,
    /const dotColor = active \? color : last \? AMBER : GREEN/,
    "the dot encodes recency while the border keeps encoding health"
  );
  assert.match(
    providerTopologySrc,
    /borderColor: error \? RED : active \? color : healthy \? GREEN : "var\(--color-border\)"/,
    "border stays health-driven — grey is reserved for genuinely idle/unconfigured"
  );
});
