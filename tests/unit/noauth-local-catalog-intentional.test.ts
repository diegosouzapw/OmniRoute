import assert from "node:assert/strict";
import test from "node:test";

import { buildNoAuthModelsResponse } from "../../src/app/api/providers/[id]/models/modelRouteProjection";
import { isDegradedDiscovery } from "../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog";

/**
 * A no-auth provider whose registry entry exposes NO `modelsUrl` has the local
 * catalog as its INTENDED and only discovery source — exactly like `reka` and
 * `lmarena`, which the models route already tags `intentional: true`.
 *
 * `buildNoAuthModelsResponse` returned the catalog untagged, so model-sync's
 * `isDegradedDiscovery` guard read a perfectly healthy response as a failed
 * remote fetch and returned 502 BEFORE importing anything. That produced a
 * permanent, silent auto-sync dead zone: the provider could never persist a
 * model while its /models endpoint kept answering HTTP 200.
 *
 * Observed live on OmniRoute v3.8.50: every catalog-only no-auth provider
 * (cloudflare-playground, duckduckgo-web and peers) was blocked this way.
 */

// `duckduckgo-web` has models in the registry catalog and no modelsUrl.
const CATALOG_ONLY_PROVIDER = "duckduckgo-web";

test("catalog-only no-auth provider is tagged as an intentional catalog", async () => {
  const res = await buildNoAuthModelsResponse(CATALOG_ONLY_PROVIDER, "conn-1", false, true);
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(body.source, "local_catalog", "catalog path is the expected source");
  assert.ok(
    Array.isArray(body.models) && (body.models as unknown[]).length > 0,
    "the registry catalog must actually yield models for this assertion to mean anything"
  );
  assert.equal(
    body.intentional,
    true,
    "the catalog is this provider's only discovery source, so it must be tagged intentional"
  );
});

test("model-sync imports the catalog instead of returning 502", async () => {
  const res = await buildNoAuthModelsResponse(CATALOG_ONLY_PROVIDER, "conn-1", false, true);
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(
    isDegradedDiscovery(body as { source?: unknown; intentional?: unknown; warning?: unknown }),
    false,
    "the guard must let this through — otherwise auto-sync can never persist a model"
  );
});

test("a genuinely degraded remote fetch is still rejected", () => {
  // The guard must keep 502'ing real failures so a stale catalog is never
  // silently pinned over a broken credential/endpoint.
  assert.equal(
    isDegradedDiscovery({
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
    }),
    true
  );
  assert.equal(
    isDegradedDiscovery({ source: "cache", warning: "API unavailable — using cached catalog" }),
    true
  );
});

test("the live-discovery path is untouched", () => {
  // aihorde / uncloseai DO expose modelsUrl and returned source:"upstream" live;
  // the tag must not leak onto that path.
  assert.equal(isDegradedDiscovery({ source: "upstream" }), false);
});
