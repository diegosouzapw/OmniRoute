// Characterization of the providers.ts catalog split (god-file decomposition): the host became a
// barrel that re-exports 10 data catalogs now living under constants/providers/*, and APIKEY is
// merged from 6 semantic family files (apikey/<family>.ts). Locks: the public surface (every catalog
// + helpers still exported), the spread-merge integrity (180 APIKEY entries, no loss/dup), and that
// load-time Zod validation still runs. Pure-data move → behavior must be identical.
// Count was 171 before obsolete provider removals (PR #6675: glhf/kluster/cablyai/inclusionai etc.,
// 171->167) plus #6126 (ClinePass dual-auth): the API-key-only APIKEY_PROVIDERS_GATEWAYS entry was
// removed as a duplicate now that clinepass is OAuth-primary (OAUTH_PROVIDERS.clinepass) with its
// BYOK path admitted through the DUAL_AUTH_APIKEY_PROVIDER_IDS gate instead (167->166), then the
// OpenVecta inference-gateway addition brought it back to 167, then #7246 (Chenzk API gateway)
// brought it to 168, then more additions brought it to 172, then #6650 (g4f.space no-key gateway:
// 5 new sub-path entries — g4f-groq/g4f-gemini/g4f-pollinations/g4f-ollama/g4f-nvidia) brought it
// to 177, then 2 more provider additions in the v3.8.49 cycle brought it to 179, and the free-catalog
// expansion (#7840, navy) to 180.
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

test("APIKEY_PROVIDERS merges the 6 family files into 180 entries (no loss / no dup)", async () => {
  const keys = Object.keys((P as Record<string, object>).APIKEY_PROVIDERS);
  assert.equal(keys.length, 180);
  assert.equal(new Set(keys).size, 180, "duplicate keys after spread-merge");
  // the merged object's entry-count equals the sum of the 6 semantic family files; families are a
  // strict partition (every provider in exactly one), so the sum must be exactly 180.
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
  assert.equal(famTotal, 180, "families must partition all 180 providers");
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
