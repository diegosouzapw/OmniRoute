# Bifrost Backend (Tier-1 Router Bridge)

> **Status:** Phase 1 of v8.1 (ADR-031, 2026-06-18).
> **Decision:** OmniRoute's underlying Tier-1 router is migrating to
> [`maximhq/bifrost`](https://github.com/maximhq/bifrost) (Go, MIT).
> OmniRoute remains the Tier-2 engine: A2A, MCP-router, ACP, skills,
> policy, guardrails, dashboard. See [`docs/adr/0031-bifrost-tier1-router.md`](adr/0031-bifrost-tier1-router.md)
> for the full decision rationale and comparison matrix.

---

## What is Bifrost?

**Bifrost** is an open-source AI gateway written in Go (~6k LOC, MIT
license). It is purpose-built for routing requests to LLM providers, with
native support for:

- **23+ first-class providers**: OpenAI, Anthropic, Gemini, Bedrock,
  Cohere, Mistral, Groq, Together, Fireworks, OpenRouter, Azure, Vertex,
  Perplexity, DeepSeek, xAI, Replicate, Anyscale, Lepton, OctoAI, Voyage,
  AI21, HuggingFace, Ollama.
- **Format translation**: OpenAI ↔ Anthropic ↔ Gemini ↔ Cohere, etc.
- **Fallback & load balancing**: round-robin, least-loaded, priority.
- **Virtual keys**: per-tenant API keys with usage limits.
- **Budget management**: hard spend caps with circuit breakers.
- **Semantic cache**: vector-based deduplication of identical prompts.
- **MCP client**: connects to upstream MCP servers and exposes their
  tools as Bifrost-native tools.
- **Observability**: Prometheus metrics + structured logs out of the box.

## Why use it under OmniRoute?

OmniRoute currently implements all of the above in TypeScript (in
`open-sse/executors/` and `open-sse/services/`). The TypeScript
implementation works well but has cost ceilings:

| Concern | Current (OmniRoute TS) | With Bifrost (Go) |
|---|---|---|
| Hot-path latency | ~5-10 ms (Node event loop) | ~1-2 ms (Go goroutines) |
| Memory per connection | ~4-8 MB (Node) | ~50-200 KB (Go) |
| Provider mesh code | ~50k LOC TS | ~6k LOC Go (vendored) |
| Maintenance | Ours alone | Upstream + community |
| MCP client | Built ourselves | Native, maintained |

The migration is **opt-in per provider** in Phase 1. By default, all
providers continue to use OmniRoute's TypeScript executors. Operators
flip individual providers to Bifrost-backed mode via env var or per-
provider config.

---

## Architecture: Tier-1 / Tier-2 split

```
   client / phenoservice ──▶  OmniRoute Tier-2 engine
   / agent (MCP/A2A/ACP)      │  A2A · MCP-router · ACP · skills
                              │  policy engine · guardrails · dashboard
                              │
                              │  OpenAI-compat /v1/chat/completions
                              ▼
                       Bifrost Tier-1 router (Go)
                              │  23+ providers · fallback · virtual keys
                              │  budget mgmt · semantic cache · observability
                              ▼
                       Provider APIs (OpenAI, Anthropic, …)
```

**Tier-2 = OmniRoute**: anything above the OpenAI-compat wire format —
A2A, MCP-router, ACP, skills, policy, guardrails, dashboard, and the
232-provider catalog.

**Tier-1 = Bifrost**: anything inside the OpenAI-compat wire format —
provider dispatch, format translation, fallback, virtual keys, budgets,
cache, MCP client.

---

## Activation (Phase 1)

### 1. Run Bifrost

Bifrost runs as a **sidecar process** alongside OmniRoute. OmniRoute is
the *client*; it never invokes the Bifrost binary directly. Operators
are responsible for the lifecycle of the Bifrost process.

```bash
# Option A — from source (vendored canonical copy)
just bifrost-build      # output: dist/bifrost/bifrost
./dist/bifrost/bifrost --config config.yaml
# Listens on 127.0.0.1:8080 by default; /health returns 200 OK.

# Option B — from the upstream repo
git clone https://github.com/KooshaPari/bifrost
cd bifrost
go build -o bifrost ./cmd/bifrost
./bifrost --config config.yaml

# Option C — Docker / k8s sidecar (B7 playbook)
# See docs/operations/bifrost-migration.md (post-B7) for the full setup.
```

`scripts/build-bifrost.sh` is the canonical build entrypoint. It clones
`KooshaPari/bifrost` shallowly into `vendor/bifrost/`, builds the
`./cmd/bifrost` binary, and writes the artifact to
`dist/bifrost/bifrost`. The `vendor/bifrost/` source tree is
gitignored; only `vendor/bifrost/VENDOR.md` is tracked. See
[`vendor/bifrost/VENDOR.md`](../vendor/bifrost/VENDOR.md) for the
update procedure.

**Path resolution:** `BIFROST_BASE_URL` (default `http://127.0.0.1:8080`)
is the only env var the executor needs. `BIFROST_BINARY` is *not* read
by the executor — the binary path is the operator's concern. If you
need a process manager, run Bifrost under systemd, supervisord, k8s
sidecar, or a launchd plist; the executor will connect to whichever
socket the operator exposes.

### 2. Enable Bifrost in OmniRoute

```bash
# In OmniRoute's environment:
export BIFROST_ENABLED=1
export BIFROST_BASE_URL=http://127.0.0.1:8080  # default if unset
```

When `BIFROST_ENABLED` is unset or `0`, all `BifrostBackendExecutor`
calls throw `Bifrost is not enabled`, and the legacy `chatCore.ts` path
takes over. This is the **backwards-compatible default** for Phase 1.

### 3. Per-provider routing

Two ways to route an individual provider through Bifrost:

**Option A: per-provider config (`providerSpecificData`)**

```json
{
  "openai": {
    "bifrostMode": true,
    "apiKey": "sk-..."
  }
}
```

**Option B: per-provider `upstream_proxy_config`**

```yaml
providers:
  openai:
    upstream_proxy_config:
      type: bifrost
      base_url: http://bifrost:8080  # override default
  anthropic:
    upstream_proxy_config:
      type: bifrost
```

When a provider is configured for Bifrost, the corresponding
`BifrostBackendExecutor` is instantiated and `execute()` forwards the
request to Bifrost's `/v1/chat/completions`.

---

## Provider support matrix

The `BifrostProviderMap` (`open-sse/executors/bifrostProviderMap.ts`)
declares which OmniRoute providers Bifrost can serve:

| Category | Providers | Bifrost status |
|---|---|---|
| **First-class APIs** | openai, anthropic, gemini, bedrock, cohere, mistral, groq, together, fireworks, openrouter, azure, vertex, perplexity, deepseek, xai, ollama, voyage | `native` (1:1 ID match) |
| **Legacy aliases** | claude → anthropic, gpt → openai, palm/bard/palm2 → gemini | `alias` |
| **OpenAI-compat passthrough** | anyscale, replicate, lepton, octoai, ai21, huggingface | `passthrough` |
| **Azure deployment names** | azure-gpt4 (deployment-name → model-id override) | `alias` + `modelOverride` |
| **Web-cookie providers** | claude-web, chatgpt-web, gemini-web, grok-web, kimi-web, qwen-web, deepseek-web, perplexity-web, copilot-web, duckduckgo-web | `unsupported` — stay on chatCore |
| **Custom CLI executors** | cliproxyapi, ninerouter, codex, cursor, trae, qoder, kiro, antigravity, devin, windsurf, commandcode | `unsupported` — stay on chatCore |

To check at runtime whether Bifrost supports a provider:

```ts
import { isBifrostSupported, listBifrostSupportedProviders } from "./bifrostProviderMap.ts";

isBifrostSupported("openai");              // → true
isBifrostSupported("claude-web");          // → false
listBifrostSupportedProviders();           // → [{omnirouteId, bifrostId, status, note}, …]
```

---

## Health check

`BifrostBackendExecutor.healthCheck()` probes `GET ${BIFROST_BASE_URL}/health`
and returns:

```ts
{
  ok: boolean;
  latencyMs: number;
  error?: string;     // "Bifrost not enabled" | "ECONNREFUSED" | "HTTP 503"
  version?: string;   // from Bifrost's /health response payload
}
```

Wire it into your existing health endpoint / orchestrator probe loop
(k8s liveness, load balancer health, etc.).

---

## Migration playbook (preview — full version is B7 in PLAN.md § 2.5)

**Phase 1 (this turn)**: ship the executor + provider map. Backwards-
compat default = OFF. Operators opt-in per deployment via env var.

**Phase 2 (Q3 2026, B4–B5)**: add `bifrostModels` SQL table to cache
Bifrost's model catalog locally (avoids the `/v1/models` round trip on
every dashboard load). Add virtual-key minting UI.

**Phase 3 (Q3 2026, B6)**: traffic shadow. Bifrost handles 5% of traffic
for each "supported" provider, results compared against chatCore in
real-time. Ramp to 25% over 7 days, then 100% over another 7 days. Roll
back automatically if p99 latency or error rate exceeds SLOs.

**Phase 4 (Q4 2026, B7–B9)**: full migration playbook + Bifrost MCP
client integration + kill switch (`open-sse/` engine stays available as
fallback for 90 days post-Phase-3).

---

## Decision review

Per ADR-031 § "Decision Review":

- **30 days post-Phase-3**: compare p99 latency, error rate, cost between
  Bifrost and current `open-sse/handlers/chatCore.ts`. If Bifrost
  underperforms by >20% on any axis, revert B6 and re-evaluate.
- **90 days post-Phase-3**: commit to Bifrost long-term (would require a
  1-year SLT agreement with `maximhq`) or fork-and-modify.

---

## Cross-references

- [`docs/adr/0031-bifrost-tier1-router.md`](adr/0031-bifrost-tier1-router.md) — ADR (MADR format)
- [`ADR.md`](../ADR.md) — top-level ADR index (ADR-031 entry)
- [`SPEC.md`](../SPEC.md) § 3 — Architecture overview (v8.1 update)
- [`PLAN.md`](../PLAN.md) § 2.5 — v8.1 Bifrost track (B1–B9)
- [`docs/ROUTING-CONVERGENCE-STATUS.md`](ROUTING-CONVERGENCE-STATUS.md) — Tier-1/Tier-2 split
- `open-sse/executors/bifrost.ts` — BifrostBackendExecutor implementation
- `open-sse/executors/bifrostProviderMap.ts` — provider ID translation
- `tests/unit/bifrost-backend.test.ts` — vitest suite (12 cases)
- `scripts/build-bifrost.sh` — builds the Go sidecar binary
- `vendor/bifrost/VENDOR.md` — vendored canonical source provenance

---

**Owner**: core team · **Refresh cadence**: as the v8.1 track progresses.
