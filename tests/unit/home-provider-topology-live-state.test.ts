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

test("home topology uses provider-metrics topology error state instead of re-deriving from stale lastErrorAt", () => {
  // The API now reports EVERY failing provider (`errorProviders`), not just the most recent
  // one. The singular field could not represent two simultaneous failures, so a second
  // failing provider silently cleared the first — and that second provider succeeding
  // handed the flag back, which is what made a red edge look like it hid and returned on
  // its own. The singular field is still read as a fallback for an older API response.
  assert.match(
    homePageClientSrc,
    /Array\.isArray\(data\.topology\?\.errorProviders\)/,
    "HomePageClient should read the plural topology.errorProviders"
  );
  assert.match(
    homePageClientSrc,
    /errorProviders:\s*reportedErrors/,
    "the normalized list should feed providerTopology.errorProviders"
  );

  const localTopologyDerivation = homePageClientSrc.match(
    /const \{ lastProvider, errorProviders \} = useMemo[\s\S]*?\}, \[providerMetrics\]\);/
  );
  assert.equal(
    localTopologyDerivation,
    null,
    "HomePageClient must not re-derive topology error state from providerMetrics.lastErrorAt"
  );
});

test("topology error state is a list, so simultaneous failures cannot overwrite each other", () => {
  // Guards the shape at every hop: a single scalar anywhere in the chain re-introduces the
  // overwrite, and no runtime test can catch it because one failing provider still works.
  assert.match(
    providerTopologySrc,
    /errorProviders\?: readonly string\[\]/,
    "ProviderTopology must accept a list of failing providers"
  );
  assert.doesNotMatch(
    providerTopologySrc,
    /errorProvider\?: string;/,
    "the single-provider prop must be gone, not kept alongside the list"
  );
  // errorSet must be able to hold more than one entry.
  assert.match(
    providerTopologySrc,
    /new Set<string>\(errorKey \? errorKey\.split\(","\) : \[\]\)/,
    "errorSet must be built from the joined list, not a lone provider id"
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
