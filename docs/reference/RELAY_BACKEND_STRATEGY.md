---
title: "Relay Backend Strategy"
version: 3.8.42
lastUpdated: 2026-06-30
---

# Relay Backend Strategy

## Summary

OmniRoute now supports three relay modes for `/api/v1/relay/chat/completions`:

- `ts`: Use the TypeScript relay in-process.
- `bifrost`: Force the Bifrost gateway.
- `auto`: Prefer Bifrost when available, fall back to TypeScript on failure.

When you are running at high request rate (large number of tokens/day, near-constant throughput), the best strategy is to keep the fallback path explicit and fast so the hot path never blocks on a dead sidecar.

## Mode behavior

- `ts`
  - Lowest operational complexity.
  - All routing and validation runs in Node.
  - No sidecar dependency for availability.
- `bifrost`
  - Force all requests through the sidecar gateway.
  - No automatic fallback.
  - Useful only when sidecar health and latency are guaranteed.
- `auto`
  - Sidecar is used when it can be reached and is enabled.
  - Failed attempts trigger fallback headers and return traffic to TS so request success remains bounded.
  - This mode is the safest choice for production when uptime matters more than strict sidecar-only routing.

## 9router vs CLIPROXYAPI today

9router and CLIPROXYAPI are both integrations that historically exposed compatibility paths for upstream providers.

- 9router is an embedded path for upstream orchestration and compatibility behavior.
- CLIPROXYAPI is a proxy API bridge for CLI / SDK style traffic.
- Bifrost is being stabilized as the externalized path when you need a dedicated sidecar-like hop and low-latency local dispatch.

If you are currently comparing 9router/CLIPROXYAPI:

- Keep request signing, allowlist checks, and DB policy gates in the API route before handoff.
- If a workflow needs strict sidecar behavior and lower per-request variance, use `OMNIROUTE_RELAY_BACKEND=bifrost`.
- If you need sidecar resilience with graceful degradation under incident conditions, use `OMNIROUTE_RELAY_BACKEND=auto`.

## Backend boundary contract

The stable product boundary is the OmniRoute relay API, not the dashboard implementation. The Next.js dashboard may install, configure, and supervise local services, but request routing should enter through the relay API and hand off behind that boundary.

Long-term backend choices:

- Keep the TypeScript relay as the in-process policy and fallback path. Auth, allowlists, request normalization, accounting, and safety checks stay here before any backend handoff.
- Use Bifrost as the preferred high-throughput Tier-1 sidecar when the deployment needs lower routing variance, centralized provider rotation, or scale-out across multiple OmniRoute replicas.
- Keep 9router and CLIPROXYAPI as embedded compatibility services. They run as supervised local processes and are useful when their provider/CLI behavior is the desired adapter, but they should not become the default Tier-1 routing engine.
- Do not make the dashboard pass arbitrary service URLs into the hot path. UI-provided URLs are configuration inputs; routing code should resolve registered, health-checked backends from server-side settings and supervisor state.
- Prefer loopback HTTP for supervised services today because the managed processes already expose HTTP-compatible APIs, the route guard can audit the boundary, and failure/fallback behavior is visible in request logs. A future SDK or socket transport is only worth adding if it measurably reduces p99 routing latency without weakening isolation or fallback semantics.

For a very high-throughput deployment, the default answer is therefore `auto` with Bifrost enabled: use the Go sidecar on the hot path while preserving the TypeScript fallback for success rate. Use `bifrost` only when strict sidecar-only behavior is more important than graceful degradation.

## High-throughput guidance

For sustained high RPM/RPS and strict success SLO:

1. Use `auto` with a practical cooldown and failure telemetry.
2. Keep upstream validation and API-key checks on the TypeScript route boundary.
3. Enable explicit headers/counters so your alerting sees fallback frequency and reasons.
4. Tune sidecar timeouts to fail fast, not to wait forever.
5. Keep service auto-restart and health telemetry loop healthy so fallback is truly exceptional.

## Suggested baseline

- `OMNIROUTE_RELAY_BACKEND=auto`
- `BIFROST_ENABLED=1`
- Keep API keys, allowlist, sanitizer, and rate-limit checks enabled in route handlers (they always run before downstream forwarding).
- Export fallback metrics from your reverse proxy and request logs so sidecar outages are visible within one minute.
