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
