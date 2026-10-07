---
title: "Provider Plugin Manifest"
version: 3.8.42
lastUpdated: 2026-07-01
---

# Provider Plugin Manifest

`open-sse/config/providerPluginManifest.ts` defines the JSON-safe provider
plugin contract. `open-sse/config/providerPluginManifestRegistry.ts` binds that
contract to the current provider registry for sidecars such as Bifrost,
CLIProxyAPI, or a future Go/Rust router. The TypeScript registry remains the
source of truth, but sidecars can consume the manifest without importing
executor code, OAuth defaults, headers, or process environment state.

The same manifest is available over HTTP at
`GET /api/v1/provider-plugin-manifest` for sidecars that run out-of-process.

OmniRoute advertises that URL to Bifrost and CLIProxyAPI via the
`X-OmniRoute-Provider-Manifest-Url` request header. Set
`OMNIROUTE_PROVIDER_MANIFEST_URL` when the sidecar needs a public or container
network URL instead of the local request origin.

## Refreshing the Manifest

The HTTP endpoint returns `Cache-Control: public, max-age=60` and a strong
`ETag`. A sidecar should retain the last validated manifest and send its ETag
in `If-None-Match` when refreshing. A `304 Not Modified` response has no body;
the sidecar keeps its cached manifest. If no validated cached manifest exists,
the sidecar must issue an unconditional request instead of accepting a `304`.

## Goal

Move provider metadata toward a plugin contract so the hot request path can
eventually be owned by a lower-latency sidecar while OmniRoute keeps the
TypeScript route as the policy gate and fallback. The manifest is additive: it
does not change request routing by itself.

## Contract

The manifest contains:

- provider id and alias
- upstream format and executor name
- auth type, auth header, and optional auth prefix
- static endpoint metadata
- sidecar eligibility and explicit reasons when a provider should stay on TS
- JSON-safe model metadata such as context length, vision/reasoning flags, and
  unsupported params
- capability tags including `apikey`, `oauth`, `custom-executor`,
  `passthrough-models`, `responses`, `sidecar-candidate`, `usage-fetch`, and `usage-supported`

The manifest intentionally excludes:

- OAuth client secrets and default secret values
- runtime environment resolution
- request headers and public credential helpers
- dynamic URL builders
- executor functions
- session pool internals

## Capability Tags

`capabilities` is a sorted array of tags derived from the registry entry. Integrators
should treat it as the machine-readable answer to "what can this provider do", instead of
re-reading the TypeScript sources.

| Tag                  | Meaning                                                           |
| -------------------- | ----------------------------------------------------------------- |
| `apikey`             | Accepts an API key (`authType` is `apikey` or `optional`).        |
| `oauth`              | Uses an OAuth or session flow.                                    |
| `responses`          | Exposes an OpenAI Responses-API base URL.                         |
| `passthrough-models` | Serves models straight from upstream instead of a static catalog. |
| `custom-executor`    | Runs a non-default executor, so it stays on the TypeScript path.  |
| `sidecar-candidate`  | Mirrors `sidecar.eligible` — safe to consider for sidecar import. |
| `usage-fetch`        | Has a wired usage or quota fetcher (`getUsageForProvider`).       |
| `usage-supported`    | The usage API accepts this provider (`isSupportedUsageConnection`). |

`usage-fetch` is discovery only. It reports that OmniRoute knows how to read usage for the
provider; it does not activate fetching, change quota semantics, or imply that the
Dashboard quota widget is enabled for the provider — that widget is gated separately by
`USAGE_SUPPORTED_PROVIDERS`. The source of truth is `USAGE_FETCHER_PROVIDERS` in
`open-sse/services/usage/fetcherProviders.ts`.

That list is keyed by the strings the usage dispatcher accepts, so it mixes canonical ids
with aliases and is slightly longer than the number of tagged providers: entries that are
not chat providers in the manifest registry (for example the `firecrawl` search provider
and the `amazon-q` ACP provider) have no manifest entry to tag.

`usage-supported` answers whether the server and Dashboard usage routes accept a connection
for the provider. It mirrors `isSupportedUsageConnection()` (`src/lib/usage/providerLimits.ts`)
and `supportsProviderQuota()` (`src/shared/utils/providerQuotaVisibility.ts`), both gated by
`USAGE_SUPPORTED_PROVIDERS` (`open-sse/services/usage/supportedProviders.ts`). Unlike
`usage-fetch`, it is emitted on the provider id alone — the runtime guard does
`USAGE_SUPPORTED_PROVIDERS.includes(providerId)` with no alias resolution, so the manifest
keeps the same rule. The two tags have different perimeters: 3 providers carry only
`usage-fetch` (`opencode`, `opencode-zen`, `xai`) and 1 carries only
`usage-supported` (`xiaomi-mimo-token-plan`), so one does not imply the other.

## Sidecar Use

Sidecars should treat `sidecar.eligible` as a conservative candidate signal, not
as an unconditional routing decision. The first import target should be
API-key, static-endpoint providers using the default executor. Providers with
custom web executors, OAuth/session flows, dynamic URL builders, or pool config
stay on the TypeScript fallback path until a sidecar implements equivalent
behavior and telemetry proves parity.

Suggested migration phases:

1. Generate and validate the provider plugin manifest from the TS registry.
2. Teach Bifrost or CLIProxyAPI to import the manifest for API-key/static
   providers.
3. Route eligible providers through the sidecar behind `OMNIROUTE_RELAY_BACKEND`
   while keeping TS fallback enabled.
4. Promote providers only when success rate, p99 latency, streaming behavior,
   and unsupported-param handling match the TS path.
5. Add sidecar-native plugins for custom executors one provider family at a
   time.

## Why Not Embed Providers Directly In Next

The Next frontend should not own provider execution. It should call the API
boundary. The backend can then decide whether to use the TypeScript executor,
Bifrost, CLIProxyAPI, or a future native sidecar. This keeps request signing,
allowlist checks, DB policy, and fallback behavior centralized before any
sidecar handoff.
