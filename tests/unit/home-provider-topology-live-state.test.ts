import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const homePageClientSrc = readFileSync(
  fileURLToPath(new URL("../../src/app/(dashboard)/dashboard/HomePageClient.tsx", import.meta.url)),
  "utf8"
);

const providerTopologySrc = readFileSync(
  fileURLToPath(new URL("../../src/app/(dashboard)/home/ProviderTopology.tsx", import.meta.url)),
  "utf8"
);

test("home topology uses provider-metrics topology.errorProvider instead of re-deriving from stale lastErrorAt", () => {
  assert.match(
    homePageClientSrc,
    /errorProvider:\s*normalizeProviderId\(data\.topology\?\.errorProvider\)/,
    "HomePageClient should trust /api/provider-metrics topology.errorProvider"
  );

  const localTopologyDerivation = homePageClientSrc.match(
    /const \{ lastProvider, errorProvider \} = useMemo[\s\S]*?\}, \[providerMetrics\]\);/
  );
  assert.equal(
    localTopologyDerivation,
    null,
    "HomePageClient must not re-derive topology error state from providerMetrics.lastErrorAt"
  );
});

test("ProviderTopology treats live activeRequests as the current snapshot without frontend timeout filtering", () => {
  assert.doesNotMatch(
    providerTopologySrc,
    /FE_ACTIVE_TIMEOUT_MS|FE_ACTIVE_TICK_MS|firstSeenRef|setInterval\(/,
    "ProviderTopology must not expire long-running live requests on its own"
  );

  assert.match(
    providerTopologySrc,
    /const activeSet = useMemo\(\s*\(\) => new Set<string>\(activeKey \? activeKey\.split\(","\) : \[\]\),\s*\[activeKey\]\s*\);/,
    "activeSet should be derived directly from activeRequests/current live snapshot"
  );
});
