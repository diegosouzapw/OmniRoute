/**
 * Regression test for #6859.
 *
 * `resolveOmniRoutePluginOptions()` auto-prefixes `providerId` with
 * `"opencode-"` (commit 75b52e286) so OpenCode 1.17.8+'s native-adapter gate
 * accepts it as an OC-registered provider id. That prefixed value must stay
 * OC-internal (AuthHook.provider / provider registration keys) — it must
 * NEVER leak into the identifiers OmniRoute's own server parses to resolve
 * credentials (`mapRawModelToModelV2`'s `id`/`providerID`,
 * `mapComboToModelV2`'s `providerID`, and the dynamic-hook catalog keys).
 *
 * OmniRoute's server-side `parseModel()` (open-sse/services/model.ts) splits
 * a dispatched model string on `/` to recover the provider name and look up
 * credentials. If the plugin embeds the OC-gate-prefixed id in that string,
 * the server looks up credentials for a provider named "opencode-omniroute"
 * (which never exists in `src/shared/constants/providers.ts`) instead of
 * "omniroute" — producing the exact "No credentials for opencode-omniroute" /
 * "No active credentials for provider: opencode-omniroute" errors reported
 * in #6859.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  buildStaticProviderEntry,
  createOmniRouteProviderHook,
  mapRawModelToModelV2,
  resolveOmniRoutePluginOptions,
  type OmniRouteRawCombo,
} from "../src/index.js";

/**
 * Minimal stand-in for OmniRoute's own `parseModel()` (open-sse/services/
 * model.ts), which splits a dispatched `<providerID>/<modelID>` string on the
 * FIRST "/" to recover the provider name used for credential lookup. Kept
 * local (rather than cross-importing the real module) so this package's
 * self-contained test suite (`cd @omniroute/opencode-plugin && npm test`)
 * doesn't depend on the root repo's `@/*` path-alias resolution.
 */
function splitProviderFromDispatchedModel(modelStr: string): string {
  const idx = modelStr.indexOf("/");
  return idx === -1 ? modelStr : modelStr.slice(0, idx);
}

const apiAuth = (key: string) => ({ type: "api" as const, key });

test("#6859: server-facing model id/providerID must resolve to the unprefixed provider name", () => {
  const resolved = resolveOmniRoutePluginOptions();

  // The OC-gate-compatible id stays prefixed — it is legitimate for
  // AuthHook.provider / provider registration.
  assert.equal(resolved.providerId, "opencode-omniroute");

  // A second, unprefixed id must be exposed for anything that reaches
  // OmniRoute's own server (model id prefix, ModelV2.providerID, combo keys).
  assert.equal(
    resolved.omnirouteProviderId,
    "omniroute",
    "resolveOmniRoutePluginOptions() must expose an unprefixed omnirouteProviderId"
  );

  // A bare raw /v1/models entry (no existing "/" in its id — the common
  // case for OmniRoute's catalog) mapped with the server-facing id.
  const model = mapRawModelToModelV2(
    { id: "claude-opus-4-7" },
    { providerId: resolved.omnirouteProviderId, baseURL: "http://localhost:20128" }
  );

  assert.equal(model.providerID, "omniroute");
  assert.equal(model.id, "omniroute/claude-opus-4-7");

  // OpenCode dispatches back to OmniRoute using `providerID/modelKey`
  // (matches the issue's own repro: `-m opencode-omniroute/oc/big-pickle`).
  const dispatchedModelString = `${model.providerID}/claude-opus-4-7`;
  const parsedProvider = splitProviderFromDispatchedModel(dispatchedModelString);

  assert.equal(
    parsedProvider,
    "omniroute",
    `server-side provider split resolved '${parsedProvider}', expected 'omniroute' — ` +
      `credentials lookup would fail for an OC-gate-prefixed provider id`
  );
});

test("#6859: createOmniRouteProviderHook end-to-end — catalog keys/providerID never carry the OC-gate prefix", async () => {
  const hook = createOmniRouteProviderHook(
    { baseURL: "https://or.example.com/v1" },
    {
      fetcher: async () => [{ id: "claude-opus-4-7" }],
      combosFetcher: async () => [],
    }
  );
  const out = await hook.models!({} as never, { auth: apiAuth("sk-test") as never });
  const model = out["omniroute/claude-opus-4-7"];
  assert.ok(model, "catalog keyed under the unprefixed provider name");
  assert.equal(model.providerID, "omniroute");
  assert.ok(
    !model.providerID.startsWith("opencode-"),
    "the OC-gate prefix must never leak into ModelV2.providerID"
  );
});

// #7976: buildStaticProviderEntry (the STATIC provider() config-hook path,
// exercised when the plugin writes `opencode.json` up front rather than
// registering the dynamic `provider.models()` hook) never received the
// #6859 fix. OC dispatches a static-catalog `models` map key verbatim as
// the `model` field of the outbound request — only the top-level
// `provider["<id>"]` segment is stripped for routing — so a bare-slug combo
// key built with the OC-gated `providerId` reaches OmniRoute's server
// doubled and fails credential lookup for the nonexistent provider
// `opencode-omniroute`. Confirmed against the issue's own curl repro
// (`model: "opencode-omniroute/hermes-smart-stack"` → "No active
// credentials for provider: opencode-omniroute").
test("#7976: buildStaticProviderEntry keys bare-slug combo ids with the unprefixed omnirouteProviderId (no double OC-gate prefix)", () => {
  const resolved = resolveOmniRoutePluginOptions({ providerId: "omniroute" });
  assert.equal(resolved.providerId, "opencode-omniroute");
  assert.equal(resolved.omnirouteProviderId, "omniroute");

  const combo = {
    id: "combo-abc123",
    name: "Hermes Smart Stack",
    isHidden: false,
    models: [],
  } as unknown as OmniRouteRawCombo;

  const block = buildStaticProviderEntry(
    [],
    [combo],
    resolved,
    "https://or.example/v1",
    "sk-test"
  );

  assert.deepEqual(Object.keys(block.models), ["omniroute/hermes-smart-stack"]);
  assert.equal(
    block.models["opencode-omniroute/hermes-smart-stack"],
    undefined,
    "combo key must not carry the OC-gate-prefixed providerId — it doubles up once " +
      "OC dispatches it verbatim as the `model` field"
  );
});
