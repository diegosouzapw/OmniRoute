import assert from "node:assert/strict";
import test from "node:test";

import { buildNoAuthModelsResponse } from "../../src/app/api/providers/[id]/models/modelRouteProjection";
import { isDegradedDiscovery } from "../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth";
import { getModelsByProviderId } from "../../src/shared/constants/models";

/**
 * A no-auth provider whose registry entry exposes no remote models endpoint has
 * the local catalog as its INTENDED and only discovery source. Model-sync's
 * degraded-discovery guard rejects an untagged `local_catalog` response as a
 * failed remote fetch, so without the intentional marker such a provider can
 * never persist a model while `/models` keeps answering 200 OK.
 *
 * The provider list is DERIVED, not hardcoded: providers come and go between
 * releases (chipotle/felo-web/theoldllm existed in v3.8.50 and were dropped in
 * v3.8.51), and a stale literal list would rot into a false failure while
 * quietly failing to cover any newly added provider.
 */
function catalogOnlyNoAuthProviders(): string[] {
  const ids: string[] = [];
  for (const id of Object.keys(NOAUTH_PROVIDERS)) {
    // Only providers that actually ship a catalog can be asserted on.
    if (!(getModelsByProviderId(id) || []).length) continue;
    ids.push(id);
  }
  return ids;
}

test("catalog-only no-auth providers reach the model-sync import stage", async () => {
  const providers = catalogOnlyNoAuthProviders();
  assert.ok(providers.length > 0, "expected at least one catalog-bearing no-auth provider");

  const blocked: string[] = [];
  for (const provider of providers) {
    const res = await buildNoAuthModelsResponse(provider, `conn-${provider}`, false, true);
    const body = (await res.json()) as {
      source?: unknown;
      intentional?: unknown;
      warning?: unknown;
      models?: unknown[];
    };
    // Providers with a live remote endpoint report `upstream`; only the
    // catalog-only path is under test here.
    if (body.source !== "local_catalog") continue;
    if (isDegradedDiscovery(body)) blocked.push(provider);
  }

  assert.deepEqual(
    blocked,
    [],
    `these providers would 502 before importing a single model: ${blocked.join(", ")}`
  );
});
