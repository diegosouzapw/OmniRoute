// AI/ML API partner attribution.
//
// A malformed partner id is NOT rejected upstream — the request succeeds and the
// usage is simply recorded as untagged. There is no runtime signal for a typo, so
// the id's shape has to be asserted here or nothing catches it.
import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import { aimlapiProvider } from "@omniroute/open-sse/config/providers/registry/aimlapi/index.ts";
import { generateLegacyProviders } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getDefaultExecutor } from "@omniroute/open-sse/executors/defaultResolver.ts";
import { APIKEY_PROVIDERS } from "@/shared/constants/providers/apikey/index";

/** Gateway contract: /^part_[A-Za-z0-9]{1,64}$/ — no dashes, no underscores. */
const PARTNER_ID_PATTERN = /^part_[A-Za-z0-9]{1,64}$/;
/** `<channel>/<client>`, channel a closed enum, client lowercase alnum + dashes. */
const SOURCE_PATTERN = /^(web|agent|mcp)\/[a-z0-9-]{1,32}$/;

test("aimlapi declares all four attribution headers", () => {
  const headers = aimlapiProvider.headers ?? {};
  assert.equal(headers["X-AIMLAPI-Partner-ID"], "part_T2iNtMuQ3JBmEPwyOKCLOxaP");
  assert.equal(headers["X-AIMLAPI-Source"], "agent/omniroute");
  assert.equal(headers["HTTP-Referer"], "https://github.com/diegosouzapw/OmniRoute");
  assert.equal(headers["X-Title"], "OmniRoute");
});

test("the partner id matches the gateway's pattern", () => {
  // A malformed id is accepted by the API and silently earns nothing, so this
  // assertion is the only place a typo surfaces.
  const partnerId = aimlapiProvider.headers?.["X-AIMLAPI-Partner-ID"] ?? "";
  assert.match(partnerId, PARTNER_ID_PATTERN);
  assert.match(aimlapiProvider.headers?.["X-AIMLAPI-Source"] ?? "", SOURCE_PATTERN);
});

test("HTTP-Referer and X-Title identify OmniRoute, not the upstream gateway", () => {
  // These are the OpenRouter-convention analytics headers: they name the calling
  // application. Pointing them at aimlapi.com would attribute OmniRoute's traffic
  // to the provider it is calling.
  const headers = aimlapiProvider.headers ?? {};
  assert.ok(!headers["HTTP-Referer"].includes("aimlapi.com"));
  assert.ok(!headers["X-Title"].toLowerCase().includes("aimlapi"));
});

test("attribution is scoped to aimlapi and cannot ride a request to another provider", () => {
  const carriers = Object.entries(REGISTRY)
    .filter(([, entry]) =>
      Object.keys({ ...(entry.headers ?? {}), ...(entry.extraHeaders ?? {}) }).some((key) =>
        key.toLowerCase().startsWith("x-aimlapi-")
      )
    )
    .map(([id]) => id);
  assert.deepEqual(carriers, ["aimlapi"]);
});

test("the executor emits the headers without mutating the shared registry constant", () => {
  const before = JSON.stringify(aimlapiProvider.headers);
  const executor = getDefaultExecutor("aimlapi");

  const first = executor.buildHeaders({ apiKey: "test-key" } as never, false);
  const second = executor.buildHeaders({ apiKey: "test-key" } as never, false);

  assert.equal(first["X-AIMLAPI-Partner-ID"], "part_T2iNtMuQ3JBmEPwyOKCLOxaP");
  assert.equal(second["X-AIMLAPI-Partner-ID"], "part_T2iNtMuQ3JBmEPwyOKCLOxaP");
  // A fresh object per request — mutating one built header map must not leak into
  // the next request or back into the registry entry.
  assert.notEqual(first, second);
  first["X-AIMLAPI-Partner-ID"] = "part_tampered";
  assert.equal(
    executor.buildHeaders({ apiKey: "test-key" } as never, false)["X-AIMLAPI-Partner-ID"],
    "part_T2iNtMuQ3JBmEPwyOKCLOxaP"
  );
  assert.equal(JSON.stringify(aimlapiProvider.headers), before);
});

test("the generated legacy provider map carries the headers through to dispatch", () => {
  const legacy = generateLegacyProviders().aimlapi;
  assert.equal(legacy.headers?.["X-AIMLAPI-Partner-ID"], "part_T2iNtMuQ3JBmEPwyOKCLOxaP");
  assert.equal(legacy.headers?.["X-AIMLAPI-Source"], "agent/omniroute");
});

test("the user-facing provider label is exactly aimlapi.com", () => {
  // The machine id (`aimlapi`) and alias (`aiml`) are what users' configs and the
  // DB reference, so they must not change; only the display string does.
  assert.equal(APIKEY_PROVIDERS.aimlapi.name, "aimlapi.com");
  assert.equal(APIKEY_PROVIDERS.aimlapi.id, "aimlapi");
  assert.equal(APIKEY_PROVIDERS.aimlapi.alias, "aiml");
});
