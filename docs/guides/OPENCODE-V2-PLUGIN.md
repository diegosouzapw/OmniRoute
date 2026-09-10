---
title: "OpenCode v2 plugin — install and configure"
version: 3.8.51
lastUpdated: 2026-09-06
---

# OpenCode v2 plugin — install and configure

`@omniroute/opencode-plugin-v2` puts your whole OmniRoute catalog — models, combos and
auto-combos — into OpenCode v2's model picker, with display names, pricing and free-tier
budgets.

It is a separate package from `@omniroute/opencode-plugin` because OpenCode v1 and v2 load
plugins through different contracts. Pick the one matching your OpenCode major; nothing is
shared between them, so upgrading one never forces the other.

## Requirements

- OpenCode v2.
- A reachable OmniRoute gateway (`http://localhost:20128` by default).
- Node.js 22 or 24.

## Install

Add the plugin to `opencode.json`:

```json
{
  "plugins": [
    {
      "package": "@omniroute/opencode-plugin-v2",
      "options": {
        "providerId": "omniroute",
        "baseURL": "http://localhost:20128"
      }
    }
  ]
}
```

Models then appear as `omniroute/<provider>/<model>`; `providerId` decides that prefix and
the id of the integration OpenCode stores the credential under.

## Credentials

The plugin looks for a gateway key in three places, in this order:

1. **The credential you connected in OpenCode.** The plugin registers an integration, so
   OpenCode's own auth flow can store the key. Nothing lands in `opencode.json` — prefer this.
2. `apiKey` in the plugin options, for a per-project override. It puts the key in a file you
   may be committing.
3. `OMNIROUTE_API_KEY` in the environment.

With none of the three, the catalog is empty and the plugin says so once at startup instead of
leaving you with a silent empty picker.

### The management token is a different key

Combos, provider health and enrichment (display names, pricing, free-tier budgets) come from
the gateway's `/api/*` endpoints, which most deployments gate behind a **management** token
rather than the inference key:

```json
"options": {
  "baseURL": "http://localhost:20128",
  "managementReadToken": "<management read token>"
}
```

Left unset, `managementReadToken` falls back to `apiKey`. When a gateway rejects that fallback
the catalog still publishes, but with raw model ids instead of display names, no canonical
alias dedupe, no pricing and no combos. The plugin warns once per endpoint when that happens,
naming the endpoint and what was lost — so a degraded picker is never a mystery.

## Options

| Key                              | Default                                        | Notes                                                                                                  |
| -------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `providerId`                     | `"omniroute"`                                  | Provider id, integration id, and the prefix models appear under                                        |
| `baseURL`                        | required                                       | Gateway root; the `/v1` suffix is added where needed                                                   |
| `apiKey`                         | connected credential, then `OMNIROUTE_API_KEY` | Chat key for `/v1/*`                                                                                   |
| `managementReadToken`            | falls back to `apiKey`                         | Key for `/api/*` — usually **not** the same one                                                        |
| `displayName`                    | `"OmniRoute"`                                  | Provider name in the picker                                                                            |
| `timeoutMs`                      | `10000`                                        | Per-endpoint fetch timeout (auto-combos use 5s)                                                        |
| `modelCacheTtlMs`                | `300000`                                       | Catalog cache TTL; a disk snapshot warms cold starts                                                   |
| `timeouts`                       | falls back to `timeoutMs`                      | Per-endpoint budgets in ms: `models`, `combos`, `autoCombos`, `enrichment`                             |
| `enrichment`                     | `true`                                         | Fetch names, pricing and free-tier budgets                                                             |
| `providerTag`                    | `true`                                         | Prefix a display name with the upstream provider it routes to                                          |
| `usableOnly`                     | `false`                                        | Keep only providers the gateway reports as provisioned                                                 |
| `visibleModels` / `hiddenModels` | `[]`                                           | Exact-or-suffix allowlists; deny wins                                                                  |
| `geminiSanitization`             | `true`                                         | Strip the JSON-Schema keywords Gemini rejects from tool schemas (`$ref` tools are forwarded untouched) |
| `apiFormat.allowAnthropic`       | `false`                                        | Route allowlisted ids through the Anthropic API block                                                  |
| `apiFormat.anthropicModels`      | `[]`                                           | Full model ids routed to Anthropic                                                                     |
| `logLevel` / `startupDebug`      | `warn` / `false`                               | Logger verbosity                                                                                       |

## How the catalog stays fresh

The catalog is fetched lazily and cached for `modelCacheTtlMs`, and a disk snapshot keeps the
last known catalog available when the gateway is unreachable — an outage costs you nothing but
freshness. Models and combos are published as soon as they arrive; auto-combos, the provider
list and the enrichment overlay fold in when they land, so one slow endpoint cannot hold the
whole picker hostage.

Names carry what the gateway knows: the upstream provider a model routes to, a `[Free]` marker
and the budget that comes with it — so two connections selling the same model stay
distinguishable. Turn the prefix off with `"providerTag": false`.

There is no manual refresh command: OpenCode v2 commands are prompt templates, not callbacks,
so a plugin cannot expose one. Refreshes follow the TTL; the host is asked to reload only when
the catalog or the overlay actually changed, never once per refresh.

## Tool calling on Gemini

Gemini rejects an entire request whose tool declarations carry `$schema` or
`additionalProperties`, answering `400 INVALID_ARGUMENT`. The plugin strips those keywords from
tool schemas bound for a Gemini model of this provider and leaves every other request untouched.
A tool carrying a `$ref` is forwarded untouched rather than stripped, since removing the
reference would widen the schema to "accept anything".
Set `"geminiSanitization": false` to turn it off.

## Troubleshooting

| Symptom                               | Cause                                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Picker shows no OmniRoute model       | No key resolved (check the startup warning), or the gateway is unreachable                               |
| Raw model ids, no combos, no pricing  | The management endpoints refused the token — set `managementReadToken`                                   |
| A session pinned to `opencode-<id>/…` | The v1 plugin published `opencode-<id>`; v2 publishes `<id>` bare, so re-select the model under `<id>/…` |

## See also

- [CLI-INTEGRATIONS.md](CLI-INTEGRATIONS.md) — every `setup-*` CLI integration, including the
  lightweight openai-compatible OpenCode setup.
- [REMOTE-MODE.md](REMOTE-MODE.md) — pointing a CLI at a remote gateway.
