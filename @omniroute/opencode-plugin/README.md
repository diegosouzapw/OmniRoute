# @omniroute/opencode-plugin

OpenCode plugin for the [OmniRoute AI Gateway](https://github.com/diegosouzapw/OmniRoute). Implements the official [`@opencode-ai/plugin`](https://opencode.ai/docs/plugins) Plugin contract (auth + provider + config hooks) to drive a running OmniRoute instance from OpenCode without hand-curated `provider.<id>.models` blocks in `opencode.json[c]`.

> **Status:** `0.1.0-alpha` — scaffold landed (T-01). Auth, provider.models, fetch interceptor, Gemini sanitization, multi-instance smoke land in T-02..T-08.

## Why

`@omniroute/opencode-provider` is a build-time **config generator** — it writes a static `provider.omniroute` block to `opencode.json` and stops. Once on disk, OpenCode talks to OmniRoute through `@ai-sdk/openai-compatible` with no plugin-side code running.

`@omniroute/opencode-plugin` is the **runtime integration**:

| Capability                                               | provider (config gen) | plugin (this) |
| -------------------------------------------------------- | --------------------- | ------------- |
| Static `provider.<id>` block                             | ✅                    | ✅            |
| Dynamic `/v1/models` fetch (TTL cached)                  | ❌                    | ✅            |
| `/connect <providerId>` API-key flow                     | ❌                    | ✅            |
| Per-instance auth in `~/.local/share/opencode/auth.json` | ❌                    | ✅            |
| Multi-instance (prod + preprod side-by-side)             | ⚠ manual              | ✅ native     |
| Fetch interceptor (Authorization: Bearer)                | ❌                    | ✅            |
| Gemini tool-schema sanitization                          | ❌                    | ✅            |
| Combo capability LCD via `/api/combos`                   | ❌                    | ✅            |

## Install

```sh
npm i -D @omniroute/opencode-plugin
```

Peer dep: `@opencode-ai/plugin` (any version — managed by your OpenCode install).

## Configure (single instance)

```jsonc
// opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@omniroute/opencode-plugin"],
}
```

Then:

```sh
opencode connect omniroute
# prompts for API key → writes ~/.local/share/opencode/auth.json
```

Restart OpenCode. `/models` lists every model OmniRoute exposes; variants (`-low`/`-medium`/`-high`/`-thinking`) and combos appear as first-class IDs from `/v1/models` — **OmniRoute is the source of truth, no client-side variant synthesis**.

## Configure (multi-instance)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    ["@omniroute/opencode-plugin", { "providerId": "omniroute" }],
    ["@omniroute/opencode-plugin", { "providerId": "omniroute-preprod" }],
    [
      "@omniroute/opencode-plugin",
      { "providerId": "omniroute-local", "baseURL": "http://localhost:20128" },
    ],
  ],
}
```

```sh
opencode connect omniroute           # production
opencode connect omniroute-preprod   # staging
opencode connect omniroute-local     # dev box
```

Each instance gets its own provider id in OpenCode's model picker and its own slot in `auth.json`.

## Plugin options

| Option          | Type     | Default                                  | Description                                          |
| --------------- | -------- | ---------------------------------------- | ---------------------------------------------------- |
| `providerId`    | `string` | `"omniroute"`                            | OC provider id; must be unique across plugin entries |
| `displayName`   | `string` | `"OmniRoute"` or `OmniRoute (<id>)`      | Label in OC UI                                       |
| `modelCacheTtl` | `number` | `300_000` (5 min)                        | `/v1/models` TTL in ms                               |
| `baseURL`       | `string` | resolved from auth.json after `/connect` | Override OmniRoute base URL                          |

## Companion: `@omniroute/opencode-provider`

If you can't run plugins (CI, scripted scaffolding), the [`@omniroute/opencode-provider`](../opencode-provider) package generates the equivalent static `provider.<id>` block at build time. Both packages coexist; pick the one that fits your environment.

## License

MIT. See [LICENSE](./LICENSE).
