# Action Plan: Stabilization & Reliability

## Phase 1 & 2: Emergency Stabilization

- Create database backups (`storage.sqlite` if present).
- Force fallback strategy from blind `priority` to `auto` where appropriate.
- Temporarily disable or guard `context_cache_protection`.

## Phase 3: Routing Architecture Redesign

- Implement strict `validatePinnedModelForRequest()` checks.
- Record invalid pins and trigger immediate fallback without retry loops.

## Phase 4: Memory Investigation & Fixes

- Prune unbounded retry structures.
- Ensure proper stream cleanup and listener removal.

## Phase 5: Ollama Reliability Lifecycle

- Establish robust startup health checks and model availability verification before OmniRoute readiness.

## Phase 6: Observability

- Add key metrics (`requests_total`, `routing_success_total`, `fallback_total`, `model_failures_total`, `memory_rss`, `heap_used`, `gc_duration`).
- Implement structured logs with `request_id`, `selected_model`, `combo`, `decision_reason`, `latency`, `error`.
