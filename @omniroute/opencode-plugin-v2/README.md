# @omniroute/opencode-plugin-v2

OpenCode v2 plugin (`define({ id, setup })`, Promise API) that publishes the live OmniRoute catalog — models from `/v1/models`, combos from `/api/combos` (least-common-denominator join), auto-combos from `/api/combos/auto`, enrichment (names + pricing), and usable-provider filtering — into the v2 `catalog.transform`, with `key` + `env` auth via `integration.transform`.

Companion to `@omniroute/opencode-plugin` (OpenCode v1, same repo). The two packages are independent: this one carries its own catalog-mapping logic and the v1 plugin is left untouched.

## Install

```sh
npm install @omniroute/opencode-plugin-v2
```

`opencode.json`:

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

## Credentials

The plugin needs a gateway key to read the catalog, and looks for one in this
order:

1. **The credential you connected in OpenCode.** The plugin registers an
   integration, so `opencode auth` (or the Connect action in the model picker)
   can store a key for it. Nothing is written to `opencode.json` — this is the
   recommended route.
2. **`apiKey` in the plugin options**, when you want a per-project override.
   Remember that this puts the key in a config file you may be committing.
3. **`OMNIROUTE_API_KEY` in the environment.**

If none of the three yields a key, the catalog is empty and the plugin says so
once at startup rather than leaving you with a silent empty model list.

### The management token is a different key

Combos, provider health and enrichment (display names, pricing, free-tier
budgets) come from the gateway's `/api/*` endpoints, which most deployments
gate behind a **management** token rather than the inference key. Set it
explicitly:

```json
"options": {
  "baseURL": "http://localhost:20128",
  "managementReadToken": "<management read token>"
}
```

Left unset, `managementReadToken` falls back to `apiKey` for backwards
compatibility. When a gateway rejects that fallback, the catalog still
publishes — but with raw model ids instead of display names, no canonical
alias dedupe, no pricing and no combos. The plugin warns once per endpoint
when this happens, naming the endpoint and the consequence, so the degraded
catalog is never a mystery.

## Options

| Key                              | Default                                        | Notes                                                                                                                 |
| -------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `providerId`                     | `"omniroute"`                                  | Provider id and integration id; models publish under `<providerId>/…`                                                 |
| `baseURL`                        | required                                       | OmniRoute gateway root (no `/v1` suffix needed)                                                                       |
| `apiKey`                         | connected credential, then `OMNIROUTE_API_KEY` | Chat key for `/v1/*` — see [Credentials](#credentials)                                                                |
| `managementReadToken`            | falls back to `apiKey`                         | Management key for `/api/*` (combos, providers, enrichment) — usually **not** the same key                            |
| `displayName`                    | `"OmniRoute"`                                  | Provider display name                                                                                                 |
| `timeoutMs`                      | `10000`                                        | Per-endpoint fetch timeout (auto-combos use 5s)                                                                       |
| `modelCacheTtlMs`                | `300000`                                       | Catalog cache TTL; disk snapshot warms cold starts                                                                    |
| `timeouts`                       | per-endpoint override                          | `{ models, combos, autoCombos, enrichment }` in ms; falls back to `timeoutMs`                                         |
| `enrichment`                     | `true`                                         | Fetch names + pricing (`/api/pricing*`, `/api/free-tier/summary`)                                                     |
| `providerTag`                    | `true`                                         | Prefix a display name with the upstream provider it routes to                                                         |
| `geminiSanitization`             | `true`                                         | Strip `$schema`/`additionalProperties` from tool schemas sent to Gemini models (`$ref` tools are forwarded untouched) |
| `usableOnly`                     | `false`                                        | Filter to healthy provisioned providers (`/api/providers`)                                                            |
| `visibleModels` / `hiddenModels` | `[]`                                           | Exact-or-suffix allowlists, deny wins                                                                                 |
| `apiFormat.allowAnthropic`       | `false`                                        | Route allowlisted ids to the Anthropic API block                                                                      |
| `apiFormat.anthropicModels`      | `[]`                                           | Full model ids routed to Anthropic                                                                                    |
| `apiFormat.anthropicPrefixes`    | v1 defaults                                    | Deprecated, warns once — prefer `anthropicModels`                                                                     |
| `logLevel` / `startupDebug`      | `warn` / `false`                               | Logger verbosity                                                                                                      |

## Tool calling on Gemini models

Gemini answers `400 INVALID_ARGUMENT` — for the whole request, not just the
offending tool — when a tool declaration carries `$schema` or
`additionalProperties`. Anything that emits standard JSON Schema therefore
breaks tool calling as soon as the chain routes to Gemini.

The plugin strips those keywords from tool schemas bound for a Gemini model of
this provider, and leaves every other request untouched. A tool carrying a
`$ref` is forwarded untouched instead of stripped: removing the reference
would widen the schema to "accept anything". Set
`"geminiSanitization": false` to turn it off.

## Migrating from the v1 plugin

The v2 plugin publishes provider id `X` bare. The v1 plugin published `opencode-X` (native-adapter gate). Sessions pinned to `opencode-X/...` must re-select the model under `X/...`.

## License

MIT
