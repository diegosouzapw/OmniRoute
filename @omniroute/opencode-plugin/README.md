# @omniroute/opencode-plugin

> **Recommended way to use OmniRoute with OpenCode.** Pulls a live model catalog from `/v1/models` (including `-low`/`-medium`/`-high`/`-thinking` variants as first-class IDs), aggregates combos via `/api/combos` using a least-common-denominator capability/limit join, sanitizes Gemini tool schemas in flight, and supports multiple side-by-side OmniRoute instances out of the box.

## Why this and not `@omniroute/opencode-provider`?

`@omniroute/opencode-provider` is the legacy config-generator package — it writes a frozen `provider.omniroute` block into `opencode.json` with a **hardcoded list of 8 models** ([`OMNIROUTE_DEFAULT_OPENCODE_MODELS`](https://github.com/diegosouzapw/OmniRoute/blob/main/%40omniroute/opencode-provider/src/index.ts#L48-L56)). It works on the CLI but in the **OpenCode Desktop / Web** builds (Tauri / Electron) the runtime re-runs the model picker and the static block surfaces only a few of those — and they drift behind the live OmniRoute catalog.

This plugin solves that by:

- Fetching `/v1/models` and `/api/combos` **at OpenCode startup, in Node.js** — no CORS, no WebView restrictions
- Emitting the provider block **dynamically** in the plugin's `config`/`provider` hook — so `opencode.json` only needs the plugin entry, not a static `provider.omniroute`
- Re-fetching on a configurable TTL (default 5 min), so new models / combo changes in the OmniRoute UI appear without restarting OpenCode
- Computing `limit.context` for combos as `min(member.context_length)` from the live catalog (no more `null` values that cause 4K-token truncation)
- **Auto-pickup of `interleaved` capability** for thinking models (merged via PR #3138)

**If you only have the legacy `opencode-provider` block in your `opencode.json`, replace it with a single plugin entry.** No other config changes required — the same `auth.json` API key works.

## Install

The plugin ships **pre-built inside the `omniroute` npm package** since v3.8.23.
If you have OmniRoute installed, the plugin is already on disk:

```sh
# 1. One command — copy the plugin into OpenCode and update opencode.json
omniroute setup opencode --auth

# 2. Follow the interactive prompt to enter your OmniRoute API key
# 3. Restart OpenCode — /models lists the full live catalog
```

The `--auth` flag runs `opencode auth login --provider omniroute` automatically.
Use `--base-url` to point at a non-default OmniRoute address:

```sh
omniroute setup opencode --base-url https://or.example.com --auth
```

### What it does

1. Locates the bundled plugin inside the omniroute installation
2. Copies `dist/` + `package.json` to `~/.config/opencode/plugins/omniroute/`
3. Writes/updates `opencode.json` with the plugin entry (idempotent, replaces legacy entries)
4. (With `--auth`) runs `opencode auth login` so the API key is stored

Re-run any time to update the plugin or change the base URL. Older entries for
`@omniroute/opencode-provider` or the legacy `opencode-omniroute-auth` package are
automatically cleaned up.

### Manual install (without omniroute CLI)

If you cannot run `omniroute setup opencode` (local dev, CI, air-gapped), reference
the built artifact directly:

```sh
cd @omniroute/opencode-plugin && npm run build && npm pack
# then extract into ~/.config/opencode/plugins/omniroute-opencode-plugin/
```

And add the entry to `opencode.json` manually (see Quick Start below).

Peer dep: `@opencode-ai/plugin` (managed by your OpenCode install).

## Quick start (single instance, manual)

```jsonc
// opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    [
      "./plugins/omniroute-opencode-plugin/dist/index.js",
      {
        "providerId": "omniroute",
        "baseURL": "https://or.example.com",
      },
    ],
  ],
}
```

```sh
opencode auth login --provider omniroute
# prompts for the OmniRoute API key, writes to ~/.local/share/opencode/auth.json
```

> ⚠ Use the `--provider` flag explicitly. `opencode auth login omniroute` is parsed as a positional `url` argument by current OC releases (≤1.15.5) and fails with `fetch() URL is invalid`. Tracked upstream.

Restart OpenCode. `/models` lists the full live catalog. Variants (`-low`, `-medium`, `-high`, `-thinking`) and combos appear as first-class IDs — OmniRoute is the source of truth, no client-side synthesis.

## Multi-instance (prod + preprod side-by-side)

> ⚠ OC ≤1.15.5 dedupes plugin loads by absolute module path. Two `plugin:` entries pointing at the same `dist/index.js` collapse into one (last-listed options win). Workaround: install the plugin twice into separate directories so each entry resolves to a distinct module file. v0.2.x will introduce an `instances: [...]` shape that registers N providers from a single load.

### Dual-install workaround (works today on OC ≤1.15.5)

Pack the plugin once, extract it twice into named directories, then point each `plugin:` entry at its own copy:

```sh
# 1. Build + pack the plugin (run from the plugin worktree)
cd /path/to/OmniRoute/@omniroute/opencode-plugin
npm run build
npm pack
# produces omniroute-opencode-plugin-0.1.0.tgz

# 2. Extract one copy per OmniRoute endpoint
mkdir -p ~/.config/opencode/plugins/omniroute-opencode-plugin-prod
mkdir -p ~/.config/opencode/plugins/omniroute-opencode-plugin-preprod
tar -xzf omniroute-opencode-plugin-0.1.0.tgz -C ~/.config/opencode/plugins/omniroute-opencode-plugin-prod    --strip-components=1
tar -xzf omniroute-opencode-plugin-0.1.0.tgz -C ~/.config/opencode/plugins/omniroute-opencode-plugin-preprod --strip-components=1
```

Then in `~/.config/opencode/opencode.json` reference each directory by absolute path:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    [
      "./plugins/omniroute-opencode-plugin-prod/dist/index.js",
      {
        "providerId": "omniroute",
        "displayName": "OmniRoute",
        "baseURL": "https://or.example.com",
      },
    ],
    [
      "./plugins/omniroute-opencode-plugin-preprod/dist/index.js",
      {
        "providerId": "omniroute-preprod",
        "displayName": "OmniRoute Preprod",
        "baseURL": "https://or-preprod.example.com",
      },
    ],
  ],
}
```

Paths are relative to `~/.config/opencode/`. Each entry now resolves to a distinct module file, so OC loads them as two separate plugin instances. Authenticate each:

```sh
opencode auth login --provider omniroute
opencode auth login --provider omniroute-preprod
```

Each entry gets its own provider id, its own model picker entry, its own slot in `auth.json`, and its own TTL cache. Closures are isolated per plugin instance — no cross-talk.

### After publish (`@omniroute/opencode-plugin` npm)

Once the package is published, the dual-install becomes two `npm install --prefix` commands instead of `tar -xzf`:

```sh
mkdir -p ~/.config/opencode/plugins/omniroute-opencode-plugin-prod
mkdir -p ~/.config/opencode/plugins/omniroute-opencode-plugin-preprod
npm install --prefix ~/.config/opencode/plugins/omniroute-opencode-plugin-prod    @omniroute/opencode-plugin
npm install --prefix ~/.config/opencode/plugins/omniroute-opencode-plugin-preprod @omniroute/opencode-plugin
```

`opencode.json` paths become `./plugins/omniroute-opencode-plugin-prod/node_modules/@omniroute/opencode-plugin/dist/index.js` (and the preprod equivalent).

## Features

| Feature                                     | What it does                                                                                                                                                                                                                                                                                                                                                                                                | Hook                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Dynamic `/v1/models`                        | Pulls live catalog (455+ entries on prod) on each refresh, TTL-cached                                                                                                                                                                                                                                                                                                                                       | `provider.models`            |
| Variants pass-through                       | `-low`/`-medium`/`-high`/`-thinking` ship as first-class IDs from OmniRoute (no client synthesis)                                                                                                                                                                                                                                                                                                           | `provider.models`            |
| Combo LCD aggregation                       | Combos appear with intersected capabilities + min context/output across members                                                                                                                                                                                                                                                                                                                             | `provider.models` + `config` |
| `combo/<slug>` namespace + `Combo:` prefix | Combos surface under `combo/claude-primary` (not the upstream UUID) and the picker shows `Combo: claude-primary` so they stand apart from raw provider/model pairs                                                                                                                                                                                                                                          | both hooks                   |
| Nice names + cost                           | `/api/pricing/models` display names AND `/api/pricing` per-million-token cost overlaid onto the live catalog                                                                                                                                                                                                                                                                                                | both hooks                   |
| Canonical-twin dedup + alias-fallback       | `/v1/models` exposes the same upstream model under both short alias (`cc/claude-opus-4-7`) and canonical name (`claude/claude-opus-4-7`); the plugin drops the canonical twin when an alias twin exists (no duplicate rows in the picker) and reverse-maps canonical → alias to pick up enrichment for short aliases (`dg/nova-3 → Deepgram - Nova 3`) that `/api/pricing/models` only indexes by canonical | both hooks                   |
| Compression pipeline tags                   | Combo names get tagged with their compression pipeline (e.g. `Combo: claude-primary [rtk🟡 → caveman🟠]`) when `features.compressionMetadata: true`. Intensity tokens render as a traffic-light emoji: 🟢 lite/minimal · 🟡 standard · 🟠 aggressive/full · 🔴 ultra                                                                                                                                        | both hooks                   |
| Provider-tag prefix                         | Prepend short upstream-provider label to enriched names (e.g. `Claude - Claude Opus 4.7` vs `Kiro - Claude Opus 4.7`, `GHM - GPT 5`) so same-id models routed via different upstream connections group visibly in the picker (default-on, opt-out via `features.providerTag: false`)                                                                                                                        | both hooks                   |
| Usable-only filter                          | Filter to providers with at least one healthy connection in `/api/providers` (opt-in via `features.usableOnly`)                                                                                                                                                                                                                                                                                             | both hooks                   |
| Disk-cache fallback                         | Last-known-good catalog persisted to disk; hydrates on a cold start when `/v1/models` is unreachable (default-on, opt-out via `features.diskCache: false`)                                                                                                                                                                                                                                                  | `config`                     |
| Bearer injection + suffix-spoof guard       | Adds `Authorization` on baseURL-matched requests only                                                                                                                                                                                                                                                                                                                                                       | `auth.loader.fetch`          |
| Gemini schema sanitization                  | Strips `$schema`/`$ref`/`additionalProperties` for `gemini-*`/`google-vertex-gemini/*`                                                                                                                                                                                                                                                                                                                      | `auth.loader.fetch` wrap     |
| Multi-instance                              | Each plugin entry binds to its own `providerId`; closures isolated                                                                                                                                                                                                                                                                                                                                          | factory                      |
| Config-hook shim                            | OC ≤1.15.5 fallback: writes static catalog into `config.provider[id]` (config hook is the only one that fires in `serve` mode on these versions)                                                                                                                                                                                                                                                            | `config`                     |

## Plugin options

| Option                | Type     | Default                                    | Description                                                                                           |
| --------------------- | -------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `providerId`          | `string` | `"omniroute"`                              | OpenCode provider id; must be unique across plugin entries                                            |
| `displayName`         | `string` | `"OmniRoute"` or `OmniRoute (<id>)`        | Label in the OC UI                                                                                    |
| `modelCacheTtl`       | `number` | `300000` (5 min)                           | `/v1/models` TTL in ms                                                                                |
| `baseURL`             | `string` | resolved from `auth.json` after `/connect` | Override OmniRoute base URL                                                                           |
| `managementReadToken` | `string` | falls back to `apiKey`                     | Optional read-only token for management catalog GETs; `/v1` inference stays on the connected `apiKey` |
| `features`            | `object` | see below                                  | Feature toggles (all opt-in/out, defaults preserve v0.1.0)                                            |

For least-privilege deployments, set top-level `managementReadToken` to a read-only management token. It is sent only to catalog reads (`/api/combos`, `/api/combos/auto`, `/api/pricing/models`, `/api/pricing`, `/api/context/combos`, and `/api/providers`). Inference requests under `/v1`, including chat, continue to use the `apiKey` stored by OpenCode. `features.mcpToken` remains independent. If `managementReadToken` is omitted, catalog reads retain the previous `apiKey` behavior.

### `features` block

Every field is optional. Defaults mirror v0.1.0 behaviour so existing `opencode.json` files do not need to change.

| Feature               | Type      | Default | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combos`              | `boolean` | `true`  | Discover `/api/combos` and surface them as pseudo-models with LCD capabilities. Combos are keyed under the `combo/<slug>` namespace and labelled `Combo: <name>` in the model picker so they're distinguishable from raw provider/model pairs.                                                                                                                                                                                                                                                                                                                       |
| `enrichment`          | `boolean` | `true`  | Pull display names from `/api/pricing/models` AND per-million-token pricing (`input`, `output`, `cached` → `cacheRead`, `cache_creation` → `cacheWrite`) from `/api/pricing`, then overlay both onto the live catalog (so the UI shows `Claude 4.7 Opus` with `cost.input: 5`, `cost.output: 25` instead of raw IDs and zeroed cost).                                                                                                                                                                                                                                |
| `compressionMetadata` | `boolean` | `false` | Pull `/api/context/combos` so combo names get tagged with their compression pipeline, e.g. `Combo: claude-primary [rtk🟡 → caveman🟠]`. Intensity tokens render as traffic-light emoji (🟢 lite/minimal · 🟡 standard · 🟠 aggressive/full · 🔴 ultra) so the picker advertises "how compressed" each combo is at a glance.                                                                                                                                                                                                                                          |
| `providerTag`         | `boolean` | `true`  | Prepend a short upstream-provider label to the enriched display name with `" - "` separator, so `cc/claude-opus-4-7 → Claude - Claude Opus 4.7` differs visibly from `kr/claude-opus-4-7 → Kiro - Claude Opus 4.7` in the OC TUI model picker. Label resolution: use `/api/pricing/models[<alias>].name` verbatim when ≤8 chars (e.g. `Claude`, `Kiro`, `Codex`, `Qwen`), otherwise fall back to `UPPER(alias)` (e.g. `GitHub Models` → `GHM`, `Gemini` → `GEMINI`). Idempotent. Combos intentionally skipped (the `Combo:` prefix already conveys multi-upstream). |
| `usableOnly`          | `boolean` | `false` | Read `/api/providers` and filter the catalog to providers that have at least one connection with `isActive: true` AND `testStatus: 'active'`. Subtract-filter semantics: providers unknown to BOTH the pricing-models catalog AND the connection table pass through (so synthetic prefixes like `agentrouter/*` survive). On fetch failure the filter is disabled for the refresh — never hides the whole catalog.                                                                                                                                                   |
| `diskCache`           | `boolean` | `true`  | Persist the last successful `/v1/models` + `/api/combos` + enrichment + connections + compression snapshot to `${OPENCODE_DATA_DIR ?? ~/.local/share/opencode}/plugins/omniroute-<providerId>.json`. On a subsequent cold start where `/v1/models` throws (network down / IP whitelist drop / 5xx) the static block hydrates from the snapshot so OC's model picker survives offline. Soft-fail on read/write — never blocks publishing.                                                                                                                             |
| `geminiSanitization`  | `boolean` | `true`  | Strip `$schema`/`$ref`/`additionalProperties` from tool params when the model id matches `gemini`                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `mcpAutoEmit`         | `boolean` | `false` | Auto-write an `mcp.<providerId>` remote entry into the OC config pointing at `<baseURL>/api/mcp/stream` with the resolved Bearer token                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `mcpToken`            | `string`  | _unset_ | Optional separate Bearer for the auto-emitted MCP entry. Falls back to the provider's `apiKey` (from `auth.json`) when unset                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `fetchInterceptor`    | `boolean` | `true`  | Inject `Authorization: Bearer` + default `Content-Type` on every outbound request targeting `baseURL` (suffix-spoof guarded)                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Example — enrichment + compression tags + MCP auto-emit

```jsonc
{
  "plugin": [
    [
      "@omniroute/opencode-plugin",
      {
        "providerId": "omniroute",
        "baseURL": "https://or.example.com",
        "managementReadToken": "<read-only-management-token>",
        "features": {
          "combos": true,
          "enrichment": true,
          "compressionMetadata": true,
          "mcpAutoEmit": true,
        },
      },
    ],
  ],
}
```

With `mcpAutoEmit: true`, the plugin synthesises an `mcp.omniroute` entry equivalent to a manual:

```jsonc
"mcp": {
  "omniroute": {
    "type": "remote",
    "url": "https://or.example.com/api/mcp/stream",
    "enabled": true,
    "headers": { "Authorization": "Bearer <apiKey-from-auth.json>" }
  }
}
```

If you want a narrower-scoped Bearer for MCP (different from the chat/inference key), set `features.mcpToken`. Operator overrides win: if you already set `mcp.omniroute` in `opencode.json`, the plugin will not overwrite it.

#### Example — production-leaning defaults (clean picker, offline resilience)

```jsonc
{
  "plugin": [
    [
      "@omniroute/opencode-plugin",
      {
        "providerId": "omniroute",
        "baseURL": "https://or.example.com",
        "features": {
          "combos": true,
          "enrichment": true,
          "compressionMetadata": true,
          "usableOnly": true,
          "diskCache": true,
        },
      },
    ],
  ],
}
```

- `usableOnly: true` drops models whose canonical provider has no healthy connection in your OmniRoute instance — your `/models` picker stays focused on what you can actually call.
- `diskCache: true` (default) writes a snapshot to `${OPENCODE_DATA_DIR}/plugins/omniroute-<providerId>.json` on every healthy refresh. On a cold start where `/v1/models` is unreachable (laptop offline, IP whitelist drop), the snapshot hydrates the static block so OC still shows the catalog instead of a stub.
- `compressionMetadata: true` annotates combo display names with their pipeline using traffic-light emoji for intensity (e.g. `Combo: claude-primary [rtk🟡 → caveman🟠]`) so the picker advertises which compression each combo applies and how heavy it is at a glance. Palette: 🟢 lite/minimal · 🟡 standard · 🟠 aggressive/full · 🔴 ultra. Unknown intensities fall through to raw text (`[rtk:custom-thing]`) so the plugin never hides a value OmniRoute knows but the plugin doesn't.
- `providerTag: true` (default) prepends a short upstream-provider label so the picker shows `Claude - Claude Opus 4.7` for `cc/claude-opus-4-7`, `Kiro - Claude Opus 4.7` for `kr/claude-opus-4-7`, and `GHM - GPT 5` for `ghm/gpt-5` (slot.name `GitHub Models` > 8 chars → abbreviated). Critical when the same model id is sold through multiple upstream connections with different cost/auth/rate-limit profiles. Set to `false` to keep the pre-v3.8.3 unsuffixed format.

## Comparison vs `@omniroute/opencode-provider`

[`@omniroute/opencode-provider`](https://github.com/diegosouzapw/OmniRoute/tree/main/%40omniroute/opencode-provider) is the existing config-generator package — it writes a frozen `provider.<id>` block into `opencode.json` at build time. This plugin is the runtime integration.

|                   | `@omniroute/opencode-plugin` (this) | `@omniroute/opencode-provider`    |
| ----------------- | ----------------------------------- | --------------------------------- |
| Type              | OC plugin                           | Config generator (CLI/build-time) |
| Models            | Live from `/v1/models`              | Frozen at scaffold                |
| Combos            | LCD-aggregated live                 | None                              |
| Gemini sanitize   | Yes                                 | N/A                               |
| OC UI integration | `/connect`, `/models`               | None                              |
| Multi-instance    | Native                              | Manual                            |

Both can coexist; pick the one that fits your environment.

## Requirements

- Node `>=22.22.3` (per `engines.node`); tested on Node 22 and 24.
- OpenCode: verified end-to-end against `opencode@1.15.5` with `@opencode-ai/plugin@1.15.6`.
- OC plugin peer (`@opencode-ai/plugin`) `>=1.14.49` for the full feature set (provider hook surfaces models in `/models`). On `<=1.14.48`, the plugin falls back to its `config` hook, writing a static catalog snapshot into `config.provider[id]` so models still appear.
- The plugin uses the OC v1 plugin shape (`default: { id, server }`) — older OC releases that only walk named exports will reject it. Stay on OC ≥1.15.

## License

MIT. See [LICENSE](./LICENSE).
