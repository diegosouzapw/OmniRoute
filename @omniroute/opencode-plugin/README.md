# @omniroute/opencode-plugin

First-class OpenCode plugin for the [OmniRoute AI Gateway](https://github.com/diegosouzapw/OmniRoute). Pulls a live model catalog from `/v1/models` (including `-low`/`-medium`/`-high`/`-thinking` variants as first-class IDs), aggregates combos via `/api/combos` using a least-common-denominator capability/limit join, sanitizes Gemini tool schemas in flight, and supports multiple side-by-side OmniRoute instances out of the box.

## Install

```sh
npm install @omniroute/opencode-plugin
```

Peer dep: `@opencode-ai/plugin` (managed by your OpenCode install).

## Quick start (single instance)

```jsonc
// opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    [
      "@omniroute/opencode-plugin",
      {
        "providerId": "omniroute",
        "baseURL": "https://or.example.com",
      },
    ],
  ],
}
```

```sh
opencode connect omniroute
# prompts for the OmniRoute API key, writes to ~/.local/share/opencode/auth.json
```

Restart OpenCode. `/models` lists the full live catalog. Variants (`-low`, `-medium`, `-high`, `-thinking`) and combos appear as first-class IDs — OmniRoute is the source of truth, no client-side synthesis.

## Multi-instance (prod + preprod side-by-side)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    [
      "@omniroute/opencode-plugin",
      {
        "providerId": "omniroute",
        "baseURL": "https://or.example.com",
      },
    ],
    [
      "@omniroute/opencode-plugin",
      {
        "providerId": "omniroute-preprod",
        "baseURL": "https://or-preprod.example.com",
      },
    ],
  ],
}
```

```sh
opencode connect omniroute
opencode connect omniroute-preprod
```

Each entry gets its own provider id, its own model picker entry, and its own slot in `auth.json`. Closures are isolated per plugin instance — no cross-talk.

## Features

| Feature                               | What it does                                                                                      | Hook                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------ |
| Dynamic `/v1/models`                  | Pulls live catalog (455+ entries on prod) on each refresh, TTL-cached                             | `provider.models`        |
| Variants pass-through                 | `-low`/`-medium`/`-high`/`-thinking` ship as first-class IDs from OmniRoute (no client synthesis) | `provider.models`        |
| Combo LCD aggregation                 | Combos appear with intersected capabilities + min context/output across members                   | `provider.models`        |
| Nice names                            | `combo.name` / `model.id` surfaces as `ModelV2.name`                                              | `provider.models`        |
| Bearer injection + suffix-spoof guard | Adds `Authorization` on baseURL-matched requests only                                             | `auth.loader.fetch`      |
| Gemini schema sanitization            | Strips `$schema`/`$ref`/`additionalProperties` for `gemini-*`/`google-vertex-gemini/*`            | `auth.loader.fetch` wrap |
| Multi-instance                        | Each plugin entry binds to its own `providerId`; closures isolated                                | factory                  |
| Config-hook shim                      | OC ≤1.14.48 fallback: writes static catalog into `config.provider[id]`                            | `config`                 |

## Plugin options

| Option          | Type     | Default                                    | Description                                                |
| --------------- | -------- | ------------------------------------------ | ---------------------------------------------------------- |
| `providerId`    | `string` | `"omniroute"`                              | OpenCode provider id; must be unique across plugin entries |
| `displayName`   | `string` | `"OmniRoute"` or `OmniRoute (<id>)`        | Label in the OC UI                                         |
| `modelCacheTtl` | `number` | `300000` (5 min)                           | `/v1/models` TTL in ms                                     |
| `baseURL`       | `string` | resolved from `auth.json` after `/connect` | Override OmniRoute base URL                                |
| `features`      | `object` | see below                                  | Feature toggles (all opt-in/out, defaults preserve v0.1.0) |

### `features` block

Every field is optional. Defaults mirror v0.1.0 behaviour so existing `opencode.json` files do not need to change.

| Feature               | Type      | Default | What it does                                                                                                                                                            |
| --------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combos`              | `boolean` | `true`  | Discover `/api/combos` and surface them as pseudo-models with LCD capabilities                                                                                          |
| `enrichment`          | `boolean` | `true`  | Pull display names + per-million-token pricing from `/api/pricing/models` and overlay them onto the live catalog (so the UI shows `Claude 4.7 Opus` instead of raw IDs) |
| `compressionMetadata` | `boolean` | `false` | Pull `/api/context/combos` so combo names get tagged with their compression pipeline, e.g. `claude-primary [rtk:standard → caveman:full]`                               |
| `geminiSanitization`  | `boolean` | `true`  | Strip `$schema`/`$ref`/`additionalProperties` from tool params when the model id matches `gemini`                                                                       |
| `mcpAutoEmit`         | `boolean` | `false` | Auto-write an `mcp.<providerId>` remote entry into the OC config pointing at `<baseURL>/api/mcp/stream` with the resolved Bearer token                                  |
| `mcpToken`            | `string`  | _unset_ | Optional separate Bearer for the auto-emitted MCP entry. Falls back to the provider's `apiKey` (from `auth.json`) when unset                                            |
| `fetchInterceptor`    | `boolean` | `true`  | Inject `Authorization: Bearer` + default `Content-Type` on every outbound request targeting `baseURL` (suffix-spoof guarded)                                            |

#### Example — enrichment + compression tags + MCP auto-emit

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

## Comparison vs `@omniroute/opencode-provider`

[`@omniroute/opencode-provider`](../opencode-provider) is the existing config-generator package — it writes a frozen `provider.<id>` block into `opencode.json` at build time. This plugin is the runtime integration.

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
- OpenCode peer: `@opencode-ai/plugin` `>=1.14.49` for the full feature set (provider hook surfaces models in `/models`). On `<=1.14.48`, the plugin falls back to its `config` hook, writing a static catalog snapshot into `config.provider[id]` so models still appear.

## License

MIT. See [LICENSE](./LICENSE).
