---
title: "open-sse Architecture"
version: 3.8.16
lastUpdated: 2026-06-08
---

# open-sse Architecture

> **TL;DR**: `open-sse/` is the core streaming engine that powers every LLM request in OmniRoute. It contains ~900 files implementing the request pipeline, executors, services, MCP server, and translation layer. This guide explains how the pieces fit together.

**Source:** `open-sse/` (workspace package, ~900 files; 811 `.ts`)

---

## Why a Separate Workspace Package?

`open-sse/` is a **standalone workspace** in the OmniRoute monorepo for several reasons:

1. **Reusability** — `open-sse` is published as `@omniroute/open-sse` on npm, so other projects can use it independently
2. **Clean boundaries** — the streaming engine is decoupled from the OmniRoute-specific UI/DB layer
3. **Performance** — the engine has no Next.js dependencies, enabling faster cold starts in CLI/serverless contexts
4. **Versioning** — `open-sse` can release on its own cadence

```json
// package.json
"workspaces": ["open-sse"]
```

---

## Top-Level Structure

```
open-sse/
├── index.ts              # Public entry point
├── types.d.ts            # Public type exports
├── package.json          # @omniroute/open-sse
├── config/               # Provider configs, constants, registries
├── executors/            # Per-provider HTTP executors (70 files)
├── handlers/             # Request handlers (chatCore, responses, etc.)
├── lib/                  # Internal utilities
├── mcp-server/           # Model Context Protocol server
├── services/             # ~294 service modules
├── transformer/          # Responses API format transformer
├── translator/           # Format translation (OpenAI ↔ Claude ↔ Gemini)
└── utils/                # Shared utilities (logging, error, stream, etc.)
```

### Module Counts

| Directory | Files | Purpose |
| `executors/` | 70 | Per-provider HTTP executors (unified via DefaultExecutor factory) |
| `handlers/` | 16 | Request entry points (chatCore, responses, embeddings) |
| `services/` | ~294 | Routing, caching, rate limiting, refresh, etc. |
| `translator/` | ~27 | Format conversion (OpenAI ↔ Claude ↔ Gemini) |
| `mcp-server/` | 32 | MCP tools and transports |
| `utils/` | ~65 | Cross-cutting utilities (logging, error, stream) |
| `config/` | ~10 | Provider configs, constants, registries |

---

## The Request Pipeline

Every LLM request flows through a **5-stage pipeline**:

```
                              ┌──────────────┐
   HTTP request                │  1. ROUTE    │   combo resolution, model selection
   (Next.js route)             └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  2. TRANSLATE│   format conversion (OpenAI ↔ Claude ↔ Gemini)
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  3. EXECUTE  │   provider executor, HTTP, retry, breaker
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  4. STREAM   │   SSE transformation, backpressure
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  5. RECORD   │   usage tracking, call log, error classification
                              └──────┬───────┘
                                     │
                                     ▼
                              HTTP response (SSE or JSON)
```

### Stage 1: Route (services/combo.ts)

**Entry point**: `handleComboChat()` in `services/combo.ts`

Resolves the request to a concrete `(provider, model, account, credentials)` tuple:

- Look up the combo by ID (or build a virtual combo for `auto/*` models)
- Apply routing strategy (priority, weighted, round-robin, etc.)
- Filter out unhealthy providers (circuit breaker)
- Pick the next viable target

For `auto/*` models, this stage also:

- Runs the **9-factor scoring** algorithm (`services/autoCombo/`)
- Selects a `provider+model` pair based on health, cost, latency, etc.

### Stage 2: Translate (translator/)

If the source format (e.g., OpenAI) differs from the target format (e.g., Claude), the request is **translated**:

- System prompt → system message
- Tool definitions → provider-specific tool format
- Reasoning/thinking parameters → provider-specific equivalents
- Message role normalization (`developer` → `system` for non-OpenAI)

The `translator/index.ts` exposes:

```ts
translateRequest(body, sourceFormat, targetFormat): TranslatedRequest
needsTranslation(source, target): boolean
```

### Stage 3: Execute (executors/)

**Entry point**: `getExecutor(providerId).execute(request, options)`

All providers use `DefaultExecutor` (`executors/default.ts`) via the `getExecutor()` factory fallback. The executor:

- Builds the upstream URL (`buildUrl()`)
- Adds provider-specific headers (`buildHeaders()`)
- Transforms the request body (`transformRequest()`)
- Sends the HTTP request with retry + exponential backoff
- Handles auth refresh if needed (OAuth providers)

All executors extend `BaseExecutor` (`executors/base.ts`, 1170 LOC) which provides:

- Common retry logic
- Proxy integration
- Circuit breaker integration
- Usage recording hooks

### Stage 4: Stream (utils/stream.ts)

For streaming responses, the executor returns a **ReadableStream**. The handler:

- Pipes through an SSE transform (`createSSETransformStreamWithLogger`)
- Applies heartbeat pings to detect dead connections
- Handles client disconnect gracefully (`pipeWithDisconnect`)
- Transforms SSE → JSON for non-streaming clients

For non-streaming responses, the executor returns a parsed JSON object that is passed through unchanged.

### Stage 5: Record (services/usage.ts)

After the response (success or failure), usage is recorded:

- `prompt_tokens`, `completion_tokens`, `cached_tokens` from the response
- `cost_usd` computed from pricing data
- `latency_ms`, `status`, `error_class` if failed
- Persisted to `usage_history` table

Call log artifacts (if enabled) are written to `${DATA_DIR}/call_logs/`.

---

## Key Files Deep-Dive

### chatCore.ts (5977 lines)

The **main request handler**. Despite its size, it has a clear structure:

```ts
// Pseudo-structure of chatCore.ts
export async function handleChat(request: NextRequest) {
  // 1. Auth + CORS
  await authenticateRequest(request);
  applyCorsHeaders(response);

  // 2. Body validation
  const body = await parseRequestBody(request);

  // 3. Format detection + translation
  const sourceFormat = detectFormat(request);
  const targetFormat = getTargetFormat(providerId);
  if (needsTranslation(sourceFormat, targetFormat)) {
    body = translateRequest(body, sourceFormat, targetFormat);
  }

  // 4. Combo routing
  const targets = await resolveComboTargets(comboId, body);
  for (const target of targets) {
    try {
      const result = await executeOnTarget(target, body);
      await recordUsage(result);
      return result;
    } catch (err) {
      // Continue to next target
    }
  }

  // 5. Emergency fallback
  return await emergencyFallback(body);
}
```

Despite being one giant function, it's organized into **commented sections** that map to the 5-stage pipeline.

### combo.ts (4456 LOC)

The **routing engine** that resolves a combo to ordered targets.

```ts
// services/combo.ts
export async function handleComboChat(body, comboId): Promise<ChatResult> {
  const targets = await resolveComboTargets(comboId, body);
  for (const target of targets) {
    try {
      return await handleSingleModel(target, body);
    } catch (err) {
      log.warn("target failed, trying next", { target, err });
    }
  }
  throw new ComboExhaustedError("All targets failed");
}
```

Supports **17 routing strategies** (see `src/shared/constants/routingStrategies.ts`):

| Strategy            | Behavior                                                                  |
| ------------------- | ------------------------------------------------------------------------- |
| `priority`          | First-target ordered list                                                 |
| `weighted`          | Probabilistic by per-target weight                                        |
| `round-robin`       | Cycle through targets in order                                            |
| `context-relay`     | Hand off context across targets                                           |
| `fill-first`        | Fill quota before moving to next                                          |
| `p2c`               | Power of two choices                                                      |
| `random`            | Uniform random                                                            |
| `least-used`        | Pick the one with fewest recent uses                                      |
| `cost-optimized`    | Cheapest healthy target first                                             |
| `reset-aware`       | Aware of provider reset windows                                           |
| `reset-window`      | Reset window-based routing                                                |
| `headroom`          | Most remaining quota headroom first                                       |
| `strict-random`     | Truly uniform (no quality weighting)                                      |
| `auto`              | Use 9-factor scoring (`autoCombo/`)                                       |
| `lkgp`              | Last known good provider first                                            |
| `context-optimized` | Best for long-context requests                                            |
| `fusion`            | Fan out to a panel in parallel, then synthesize via a judge (`fusion.ts`) |

### base.ts (1170 LOC)

The **abstract executor** that all 70 executors extend. It contains:

- `buildUrl()` — default URL construction (subclasses override for custom)
- `buildHeaders()` — default headers (auth, content-type)
- `transformRequest()` — pass-through by default
- `execute()` — the main HTTP loop with retry/backoff/breaker

```ts
// open-sse/executors/default.ts
export class DefaultExecutor extends BaseExecutor {
  // Handles all OpenAI/Anthropic-compatible providers
  // Providers register configurations (URL, auth, headers) but share executor logic
}
```

Provider-specific behavior (auth headers, base URL, version headers) is configured via the provider registry, not separate executor classes.

````

---

## Services (117 modules)

Services are **focused, single-purpose modules** that handlers compose. The big categories:

### Routing & Combo

- `combo.ts` — entry point for combo-routed requests
- `services/autoCombo/` — 9-factor scoring, 8 auto routing strategies
- `wildcardRouter.ts` — matches wildcard routes (`gpt-*`)
- `modelFamilyFallback.ts` — T5 intra-family fallback

### Rate Limiting & Quota

- `rateLimitManager.ts` — token bucket per key+provider
- `usage.ts` — usage recording
- `quotaCache.ts` — in-memory quota snapshots

### Account & Token

- `tokenRefresh.ts` — OAuth refresh on 401
- `accountFallback.ts` — switch to alternate account
- `sessionManager.ts` — multi-turn session state

### Intelligence

- `intentClassifier.ts` — classify request intent
- `taskAwareRouter.ts` — route by task type
- `thinkingBudget.ts` — allocate thinking tokens
- `contextManager.ts` — inject routing context

### Resilience

- `resilience.ts` — retry, backoff, breaker orchestration
- `emergencyFallback.ts` — last-resort fallback
- `modelDeprecation.ts` — auto-route to successor models

### State

- `signatureCache.ts` — dedup by request signature
- `volumeDetector.ts` — load shedding
- `contextHandoff.ts` — session serialization

### Compression

- `compression/` (subdirectory) — full compression pipeline
- 39 files covering engines, rule packs, adapters

### Skills

- (covered in [SKILLS.md](./SKILLS.md))

### Memory

- (covered in [MEMORY.md](./MEMORY.md))

---

## Executors (75+ files)

One file per provider. They all extend `BaseExecutor` and override what differs.

### Common Patterns

Providers are resolved via `getExecutor(providerId)`, which returns the configured executor. OpenAI/Anthropic-compatible providers use `DefaultExecutor` (`executors/default.ts`). Provider-specific behavior (base URL, auth headers, API version) is configured in `open-sse/config/providers/`, while request body transformations are handled in `open-sse/translator/`.

**Custom URL** is set via provider configuration:

```ts
// Provider config in open-sse/config/providers/
export default {
  id: "together",
  baseURL: "https://api.together.xyz/v1/chat/completions",
}
````

**Custom auth** is handled through the provider registry's auth configuration (API key, OAuth, header profiles).

**Custom request body** transformations (e.g., Anthropic separating `system` from `messages`) are registered per-provider in `open-sse/translator/`.

````

### The Executor Factory

`executors/index.ts` exports `getExecutor(providerId)`:

```ts
import { getExecutor } from "@omniroute/open-sse/executors";

const executor = getExecutor("anthropic");
const result = await executor.execute({
  model: "claude-sonnet-4-5",
  messages: [...],
});
````

The factory is generated from `config/providerRegistry.ts` which lists all 212+ providers and their executor class.

---

## Translators

Translate between **3 formats**: OpenAI, Anthropic, Gemini, plus the new Responses API.

### When Translation Happens

```ts
import { needsTranslation, translateRequest } from "@omniroute/open-sse/translator";

if (needsTranslation(sourceFormat, targetFormat)) {
  body = translateRequest(body, sourceFormat, targetFormat);
}
```

Common translations:

- `OpenAI → Anthropic`: separate `system` field, `x-api-key` header
- `OpenAI → Gemini`: `contents` instead of `messages`, `systemInstruction`
- `OpenAI → Responses API`: `input` array, `previous_response_id` state

### Edge Cases Handled

- `developer` role → `system` for non-OpenAI
- `system` role → merged into first user message for GLM/ERNIE
- `json_schema` → Gemini's `responseMimeType` + `responseSchema`
- `tools` → provider-specific tool format
- Thinking parameters (o1, Claude) → provider-specific equivalents

---

## MCP Server

`open-sse/mcp-server/` implements the **Model Context Protocol** server:

- **30+ tools** (provider management, combos, memory, cache, compression, 1proxy, skills)
- **3 transports**: stdio, SSE, Streamable HTTP
- **13 scopes** for fine-grained authorization

### Tool Registration

Tools are registered as standalone files in `open-sse/mcp-server/tools/`, each exporting a name, schema, handler, and scope:

```ts
// open-sse/mcp-server/tools/getHealth.ts
import { z } from "zod";
export default {
  name: "omniroute_get_health",
  description: "Get system health snapshot",
  scope: "read:health",
  inputSchema: z.object({}),
  handler: async (_args, ctx) => {
    return await getSystemHealth();
  },
};
```

### Transports

```ts
// stdio (CLI usage)
startMcpStdio(server);

// SSE (HTTP-based streaming)
startMcpSse(server, port);

// Streamable HTTP (modern MCP)
startMcpStreamable(server, port);
```

### Authorization

Every tool call goes through scope checks (`open-sse/mcp-server/auth/`):

```ts
if (!hasScope(apiKey, "providers:read")) {
  throw new Error("Insufficient scope");
}
```

---

## Transformers

`open-sse/transformer/` converts between **Chat Completions** and **Responses API** formats.

### Why a Separate Transformer?

The Responses API is OpenAI's new format with **stateful conversations** (`previous_response_id`). When a client sends a Responses request, OmniRoute:

1. Converts Responses → Chat Completions internally
2. Sends to provider (any provider that supports Chat Completions)
3. Converts the response back to Responses format
4. Streams the converted response to the client

The transformer (`transformer/responsesTransformer.ts`) provides:

```ts
createResponsesApiTransformStream(): TransformStream
```

This handles:

- `response.output_item.added` events
- `response.output_text.delta` events
- `response.completed` event
- Tool call mapping (`function_call` ↔ `tool_calls`)

---

## Configuration

`open-sse/config/` holds the configuration layer:

| File                          | Purpose                           |
| ----------------------------- | --------------------------------- |
| `providerRegistry.ts`         | 212+ provider definitions         |
| `providerModels.ts`           | Model aliases, format mapping     |
| `constants.ts`                | Timeouts, limits, status codes    |
| `defaultThinkingSignature.ts` | Default Claude thinking signature |
| `modelStrip.ts` (in services) | Per-provider field stripping      |

### Provider Registry Schema

```ts
interface ProviderConfig {
  id: string;
  name: string;
  baseUrl: string;
  authType: "bearer" | "api-key" | "oauth" | "cookie";
  executorClass: string;
  defaultModel: string;
  capabilities: ProviderCapabilities;
  models: ModelDefinition[];
}
```

Zod validation at module load ensures all provider configs are valid.

---

## Performance Constraints

The routing engine has strict performance budgets:

| Operation                               | Target | Measurement               |
| --------------------------------------- | ------ | ------------------------- |
| Combo resolution                        | <10ms  | For 50 targets            |
| Rate limit check                        | <1ms   | In-memory token bucket    |
| Model family fallback                   | <5ms   | Cached family definitions |
| Request routing dispatch                | <2ms   | Hot path                  |
| **No blocking I/O in routing hot path** | —      | All async                 |

---

## Anti-Patterns

❌ **Synchronous DB calls in `combo.ts`** — pre-compute and cache
❌ **Retry logic in handlers** — use `retry()` from resilience service
❌ **Direct provider config access** — use `providerRegistry` getters
❌ **Hardcoded fallback chains** — define in `modelFamilyFallback.ts`
❌ **State mutations across concurrent requests** — use request-scoped context only

---

## Adding a New Component

### Adding a New Service

1. Create `open-sse/services/[serviceName].ts` with focused responsibility
2. Export main handler function and any constants
3. Add unit tests in `tests/unit/services/[serviceName].test.mjs`
4. Integrate into request pipeline in `handlers/chatCore.ts` (if routing-related)
5. Update routing logic in `combo.ts` if service affects target selection
6. Document in this file

### Adding a New Executor

1. Create `open-sse/executors/[provider].ts` extending `BaseExecutor`
2. Register in `config/providerRegistry.ts`
3. Add to `executors/index.ts` factory
4. Add unit tests for the executor
5. Document in `docs/architecture/ARCHITECTURE.md`

### Adding a New MCP Tool

1. Create or update `open-sse/mcp-server/tools/[category]Tools.ts`
2. Define Zod schema for inputs
3. Register tool in `mcp-server/index.ts`
4. Add to scope matrix in `mcp-server/auth/`
5. Add unit tests

---

## See Also

- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — high-level architecture
- [CODEBASE_DOCUMENTATION.md](../architecture/CODEBASE_DOCUMENTATION.md) — engineering reference
- [REPOSITORY_MAP.md](../architecture/REPOSITORY_MAP.md) — directory-by-directory
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — 9-factor scoring
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP server
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A server
- Source: `open-sse/` (400+ files, ~143K LOC)
