# SOTA — litellm vs Raw OpenAI for Coaching Provider (side-14)

**Date:** 2026-06-20 11:40 UTC
**Task ID:** side-14
**Agent:** v11-batch-A
**Verdict:** **Adopt litellm** (Python SDK) for the `phenotype-journeys` coaching surface. The fleet's coaching flow is a multi-provider fan-out (OpenAI, Anthropic, open-weights via llama-cpp) with structured prompt templates per persona. litellm unifies the request shape, retries, cost tracking, and provider fall-back; raw OpenAI forces us to re-implement all four.

## What these are (2026-06)

**litellm** (Python, MIT, ~10K LOC at the user-facing layer):

- One `completion(model="gpt-4o", messages=..., ...)` call that routes to 100+ providers (OpenAI, Anthropic, Bedrock, Vertex, Azure, Ollama, llama-cpp, vLLM, etc.).
- Standardized response shape, retry/backoff, cost computation (cents per call), budget alerts.
- Drop-in OpenAI-compatible proxy (`litellm --model openai/gpt-4o --model anthropic/claude-sonnet-4`) so existing OpenAI SDK clients can hit it without code changes.
- Streaming, function-calling, JSON-mode, vision, audio — all unified across providers.
- Current: 1.51.x (June 2026); release cadence ~weekly.

**Raw OpenAI SDK** (`openai-python`):

- Direct call to one provider at a time. Excellent type safety, great streaming ergonomics, but every other provider is a separate library or a hand-rolled adapter.
- For our use case (coaching that may switch providers per persona, per cost-budget, per region), we'd write the routing ourselves.

## Fleet relevance (2026-06-20)

The only "coaching provider" in the fleet today is `phenotype-journeys` — a Python service that walks users through structured growth-journey flows. The provider surface today is a thin wrapper over the OpenAI Python SDK with one model in use (`gpt-4o`). Three concrete pressures are pushing us toward multi-provider:

1. **Cost** — coaching calls are higher-token than chat (multi-turn + tool use). Per-call cost is the dominant ops expense. litellm's per-model cost tracking + budget alerts would let us trip a switch to a cheaper model when monthly spend crosses a threshold.
2. **Provider fall-back** — OpenAI had two regional outages in Q1-2026 that degraded `phenotype-journeys` SLA. Anthropic + llama-cpp fall-back would close this. Raw OpenAI SDK does not give fall-back for free.
3. **Self-hosted option** — ADR-029 absorbed the llama-cpp devops setup; we now have a path to run open-weights locally. litellm supports llama-cpp as a first-class provider; raw OpenAI does not.

## Concrete recommendations

1. **Adopt litellm 1.51+ in `phenotype-journeys`** — replace the `openai.OpenAI()` constructor with `litellm.completion(model="gpt-4o", ...)`. Keep the OpenAI SDK as a transitive dep; litellm already vendors it.
2. **Define the model roster in one config file** — `phenotype-journeys/config/models.yaml`:
   ```yaml
   default: openai/gpt-4o
   fallbacks:
     - anthropic/claude-sonnet-4-20250514
     - ollama/llama3.3-70b
   budget:
     monthly_cap_usd: 500
     per_call_max_usd: 0.50
   ```
3. **Stand up the litellm proxy as a sidecar** — `phenotype-ops` adds a new agent setup `litellm-proxy/`. Each phenotype-journeys instance connects to `http://localhost:4000/v1` instead of `api.openai.com` directly. This unlocks log-and-replay, request budgeting, and provider fall-back as a fleet-wide capability. Estimated 1 PR (Dockerfile + compose + README), <300 LOC.
4. **Keep a raw-SDK escape hatch** — if a coaching prompt needs a feature litellm doesn't proxy correctly (e.g., realtime audio), use the OpenAI SDK directly. Don't force-fit.

## When NOT to adopt litellm

- **Latency-sensitive hot loops** — litellm adds ~5–10ms per call of routing overhead. For realtime (audio, sub-200ms responses), raw SDK is faster.
- **Strict type-safety** — litellm's responses are dict-shaped, not Pydantic models. If `phenotype-journeys` wants compile-time guarantees on the response shape, wrap litellm in a Pydantic adapter rather than reaching for it directly.
- **Single-provider apps** — if we commit to OpenAI-only for the next 18 months, litellm's routing is dead weight.
- **Anything where the OpenAI SDK's specific behavior is required** — litellm is a thin layer; some advanced SDK features (custom tools, assistant threads, file uploads) are still best used via raw SDK calls. Use litellm as the default for `completion()` / `embedding()`; use raw SDK for assistants/realtime.

## Cost / complexity trade-off

- **litellm dep cost:** +15 MB Python wheel, ~3s longer cold-start for the `phenotype-journeys` binary. Trivial.
- **Proxy sidecar cost:** +1 process, +50 MB RAM, ~5 lines of compose config. Trivial.
- **Operational savings:** estimated 40% reduction in per-call cost via model fall-back (preliminary; needs real data from a 30-day pilot).
- **Time-to-multi-provider:** raw SDK route is ~3 PR-weeks per provider (auth, error mapping, retry); litellm route is ~1 PR-day total.

## Recommendation

Adopt. Concrete plan:

1. **`phenotype-journeys` PR-1**: swap raw OpenAI SDK for litellm `completion()` calls; keep one provider in use; pass existing test suite.
2. **`phenotype-journeys` PR-2**: add Anthropic as a configured fall-back; assert fall-back path in an integration test.
3. **`phenotype-ops` PR-1**: add the litellm proxy sidecar; update the journeys compose file to use it.
4. **`phenotype-journeys` PR-3**: add budget-alert integration with `pheno-otel`.

Estimate: 1 PR-week total. Land in v11 tier-2 alongside the coaching surface refresh.

**Refs:** `phenotype-journeys/src/coaching/provider.py`, `phenotype-ops/agent-devops-setups/`, ADR-029 (Dmouse92 migration — brought in llama-cpp), `pheno-mcp-router/src/adapters/openai_compat.rs` (Rust-side equivalent of this Python-side decision).
