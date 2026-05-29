# PR: Add Gitlawb OpenGateway Provider Support

## Summary

Add two OpenAI-compatible API-key providers via the Gitlawb OpenGateway at `opengateway.gitlawb.com`:

- **`gitlawb`** (alias `glb`): Xiaomi MiMo endpoint — 5 MiMo models (V2.5-Pro, V2.5, V2-Pro, V2-Omni, V2-Flash)
- **`gitlawb-gmi`** (alias `glb-gmi`): GMI Cloud endpoint — 40+ models including GPT-5.x, Claude 4.x, DeepSeek, Gemini, Qwen, GLM, Kimi

Both providers are free-tier (no credit card required), OpenAI-compatible, and require only an API key.

---

## Changes Made

### 1. `open-sse/config/providerRegistry.ts` (+253 lines)

**Model definitions** — added to `CHAT_OPENAI_COMPAT_MODELS`:

```
gitlawb: [5 MiMo models]
gitlawb-gmi: [40+ cross-provider models]
```

**Registry entries** — added to `REGISTRY`:

```javascript
gitlawb: {
  id: "gitlawb",
  alias: "glb",
  format: "openai",
  executor: "default",
  baseUrl: "https://opengateway.gitlawb.com/v1/xiaomi-mimo",
  authType: "apikey",
  authHeader: "bearer",
  headers: {
    "User-Agent": "OpenClaude/1.0 (linux; x86_64)",
    "X-Title": "OpenClaude CLI",
    "HTTP-Referer": "https://github.com/Gitlawb/openclaude",
  },
  models: CHAT_OPENAI_COMPAT_MODELS["gitlawb"],
}

gitlawb-gmi: {
  id: "gitlawb-gmi",
  alias: "glb-gmi",
  format: "openai",
  executor: "default",
  baseUrl: "https://opengateway.gitlawb.com/v1/gmi-cloud",
  authType: "apikey",
  authHeader: "bearer",
  headers: { /* CLI-mimicking headers */ },
  passthroughModels: true,  // model access varies per API key
  models: CHAT_OPENAI_COMPAT_MODELS["gitlawb-gmi"],
}
```

### 2. `src/shared/constants/providers.ts` (+24 lines)

Added display metadata for both providers in `APIKEY_PROVIDERS`:

| Field | gitlawb | gitlawb-gmi |
|-------|---------|-------------|
| id | `gitlawb` | `gitlawb-gmi` |
| alias | `glb` | `glb-gmi` |
| icon | `hub` (green) | `hub` (green) |
| textIcon | `GLB` | `GMI` |
| hasFree | `true` | `true` |

Both providers added to `providerAllowsOptionalApiKey()` — API key is optional, enabling free-tier access.

### 3. `tests/unit/gitlawb-provider.test.ts` (+101 lines)

Comprehensive test suite covering:

| Test | What it validates |
|------|-------------------|
| `gitlawb in APIKEY_PROVIDERS` | Registration, id, alias, name, hasFree flag |
| `gitlawb registry baseUrl` | `https://opengateway.gitlawb.com/v1/xiaomi-mimo`, format, executor, authType |
| `gitlawb CLI headers` | User-Agent, X-Title, HTTP-Referer |
| `gitlawb MiMo models` | 5+ models, includes `mimo-v2.5-pro` with 1M context |
| `gitlawb-gmi in APIKEY_PROVIDERS` | Registration, id, alias, hasFree |
| `gitlawb-gmi registry baseUrl` | `https://opengateway.gitlawb.com/v1/gmi-cloud`, format, authType |
| `gitlawb-gmi model variety` | GPT-5.x, Claude 4.x, DeepSeek, Gemini models |
| `gitlawb-gmi CLI headers` | User-Agent |
| Schema validation | Both providers pass AI_PROVIDERS schema |

---

## Architecture: How Provider Registration Works

```
REGISTRY (providerRegistry.ts)
  ├── id, alias, format, executor, baseUrl, authType, authHeader
  ├── headers (User-Agent, X-Title, etc.)
  ├── models (RegistryModel[])
  └── passthroughModels (optional boolean)

  ↓ auto-generates via generateLegacyProviders()

PROVIDERS (constants.ts)
  └── baseUrl, format, headers (for executor lookup)

  ↓ auto-generates via generateModels() / generateAliasMap()

PROVIDER_MODELS     PROVIDER_ID_TO_ALIAS
 (alias → models)    (id → alias)

  ↓ runtime lookup via getRegistryEntry()

DefaultExecutor (default.ts)
  buildUrl()    → uses baseUrl from PROVIDERS[provider]
  buildHeaders() → uses authHeader from REGISTRY entry via getRegistryEntry()
                  → bearer token (Authorization: Bearer {key})
                  → or x-api-key / x-goog-api-key (per authHeader field)
```

### Request Flow

```
Client: POST /chat/completions { model: "gitlawb/mimo-v2.5-pro" }
  → OmniRoute parses provider "gitlawb" from model prefix
  → getRegistryEntry("gitlawb") returns entry with correct baseUrl
  → DefaultExecutor.buildUrl() uses baseUrl from PROVIDERS["gitlawb"]
  → DefaultExecutor.buildHeaders() uses authHeader: "bearer"
  → fetch("https://opengateway.gitlawb.com/v1/xiaomi-mimo", {
       headers: { Authorization: "Bearer {apikey}", ...registry headers }
     })
```

---

## Testing

Run the provider test suite:

```bash
node --import tsx/esm --test tests/unit/gitlawb-provider.test.ts
```

The tests validate:
- Provider registration in all constants (REGISTRY, APIKEY_PROVIDERS, AI_PROVIDERS)
- Correct baseUrl, authType, format for each provider
- Model list completeness and specific model properties
- CLI-mimicking header presence
- Schema validation at module load

---

## Follow-up Fix (PR #2476)

After the initial feature (#2314), PR #2476 made the `gitlawb`/`gitlawb-gmi` model entry **optional** — preventing provider initialization failure when the model catalog entry is not available. This ensures the provider gracefully degrades when external model data isn't loaded.

---

## References

- **Feature PR**: [#2314](https://github.com/diegosouzapw/OmniRoute/pull/2314)
- **Fix PR**: [#2476](https://github.com/diegosouzapw/OmniRoute/pull/2476)
- **Gateway**: https://opengateway.gitlawb.com
- **Fork branch**: `origin/feat/gitlawb-opengateway`
