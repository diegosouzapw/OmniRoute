// Characterization of the providers.ts catalog split (god-file decomposition): the host became a
// barrel that re-exports 10 data catalogs now living under constants/providers/*, and APIKEY is
// merged from 6 semantic family files (apikey/<family>.ts). Locks: the public surface (every catalog
// + helpers still exported), the spread-merge integrity (166 APIKEY entries, no loss/dup), and that
// load-time Zod validation still runs. Pure-data move → behavior must be identical.
import { test } from "node:test";
import assert from "node:assert/strict";

const P = await import("../../src/shared/constants/providers.ts");

test("barrel still exports every catalog + key helpers", () => {
  for (const name of [
    "NOAUTH_PROVIDERS",
    "OAUTH_PROVIDERS",
    "WEB_COOKIE_PROVIDERS",
    "APIKEY_PROVIDERS",
    "LOCAL_PROVIDERS",
    "SEARCH_PROVIDERS",
    "AUDIO_ONLY_PROVIDERS",
    "UPSTREAM_PROXY_PROVIDERS",
    "CLOUD_AGENT_PROVIDERS",
    "SYSTEM_PROVIDERS",
    "AI_PROVIDERS",
    "ALIAS_TO_ID",
    "ID_TO_ALIAS",
    "getProviderById",
    "getProviderByAlias",
    "resolveProviderId",
  ]) {
    assert.ok(name in P, `missing export: ${name}`);
  }
});

test("APIKEY_PROVIDERS merges the 6 family files into 166 entries (no loss / no dup)", async () => {
  const keys = Object.keys((P as Record<string, object>).APIKEY_PROVIDERS);
  assert.equal(keys.length, 166);
  assert.equal(new Set(keys).size, 166, "duplicate keys after spread-merge");
  // the merged object's entry-count equals the sum of the 6 semantic family files; families are a
  // strict partition (every provider in exactly one), so the sum must be exactly 166.
  const families: [string, string][] = [
    ["gateways", "APIKEY_PROVIDERS_GATEWAYS"],
    ["frontier-labs", "APIKEY_PROVIDERS_FRONTIER"],
    ["inference-hosts", "APIKEY_PROVIDERS_INFERENCE"],
    ["enterprise-cloud", "APIKEY_PROVIDERS_ENTERPRISE"],
    ["regional", "APIKEY_PROVIDERS_REGIONAL"],
    ["specialty-media", "APIKEY_PROVIDERS_SPECIALTY"],
  ];
  let famTotal = 0;
  const seen = new Set<string>();
  for (const [file, exportName] of families) {
    const mod = await import(`../../src/shared/constants/providers/apikey/${file}.ts`);
    const famKeys = Object.keys(mod[exportName]);
    famTotal += famKeys.length;
    for (const k of famKeys) {
      assert.ok(!seen.has(k), `provider ${k} appears in more than one family`);
      seen.add(k);
    }
  }
  assert.equal(famTotal, 166, "families must partition all 166 providers");
});

test("AI_PROVIDERS Proxy aggregates all sections; lookups resolve", () => {
  const ai = (P as Record<string, Record<string, unknown>>).AI_PROVIDERS;
  assert.ok(Object.keys(ai).length > 200);
  assert.ok((P as Record<string, (id: string) => unknown>).getProviderById("openai"));
  assert.ok((P as Record<string, (id: string) => unknown>).getProviderById("claude"));
  // a moved catalog is reachable through the barrel re-export
  assert.ok((P as Record<string, Record<string, unknown>>).APIKEY_PROVIDERS["openai"]);
});

test("each extracted data module is importable on its own", async () => {
  const mods = [
    ["noauth", "NOAUTH_PROVIDERS"],
    ["oauth", "OAUTH_PROVIDERS"],
    ["web-cookie", "WEB_COOKIE_PROVIDERS"],
    ["local", "LOCAL_PROVIDERS"],
    ["search", "SEARCH_PROVIDERS"],
    ["audio", "AUDIO_ONLY_PROVIDERS"],
    ["upstream-proxy", "UPSTREAM_PROXY_PROVIDERS"],
    ["cloud-agent", "CLOUD_AGENT_PROVIDERS"],
    ["system", "SYSTEM_PROVIDERS"],
  ];
  for (const [file, name] of mods) {
    const m = await import(`../../src/shared/constants/providers/${file}.ts`);
    assert.ok(m[name] && typeof m[name] === "object", `${file}.ts must export ${name}`);
  }
});
