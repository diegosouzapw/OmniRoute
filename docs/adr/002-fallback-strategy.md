# ADR-002: Multi-Provider Fallback Strategy

**Date:** 2025-11-20  
**Status:** Accepted  
**Deciders:** @diegosouzapw

## Context

OmniRoute routes requests to multiple LLM providers (OpenAI, Anthropic, Google, etc.). Providers may become unavailable due to rate limiting, outages, or credential expiry. The system needs a strategy to handle these failures gracefully.

## Decision

Implement a **declarative fallback chain** with three layers:

1. **Credential Retry Loop** — Rotate through available credentials for the same provider before failing
2. **Model Fallback Policy** — Configurable fallback chain per model (e.g., `gpt-4o → azure-gpt-4o → anthropic-claude`)
3. **Circuit Breaker** — Trip open after consecutive failures to prevent cascading requests to broken providers

The fallback policy is defined in `src/domain/fallbackPolicy.js` and integrates with the circuit breaker in `src/shared/utils/circuitBreaker.js`.

## Consequences

### Positive

- Automatic failover with zero user intervention
- Per-model granularity — different models can have different fallback strategies
- Circuit breaker prevents wasting quota on broken providers

### Negative

- Fallback chain requires manual configuration per model
- Response latency increases when primary fails (retry + fallback time)

### Neutral

- Lockout policy (n consecutive failures → temporary block) complements but is separate from fallback
