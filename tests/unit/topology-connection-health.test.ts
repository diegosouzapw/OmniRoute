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
  // Traffic (live/recent/error) must still take precedence over the static health colour.
  assert.match(
    providerTopologySrc,
    /const healthy =\s*!active && !trafficError && !last && !healthError && p\.status === "active"/,
    "healthy is only shown when there is no stronger traffic signal"
  );
  assert.match(
    providerTopologySrc,
    /edgeStyle\(active, last, error, healthy\)/,
    "the healthy state must reach the edge palette"
  );
  // The node must render the health state (green border / static dot) — a non-pulsing dot
  // distinguishes "connected" from "active".
  assert.match(providerTopologySrc, /pulse=\{active \|\| error\}/);
  assert.match(providerTopologySrc, /active \|\| error \|\| healthy/);
});
