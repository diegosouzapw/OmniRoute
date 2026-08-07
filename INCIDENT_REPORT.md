# Incident Report: OmniRoute OOM and Crash Loops

## Summary

OmniRoute experiences continuous crash loops and Out-Of-Memory (OOM) errors where RSS memory exceeds several gigabytes under console startup and request processing.

## Symptoms

- Cyclic restarts when launched via console or `launchd`.
- Node.js memory consumption spikes rapidly, hitting multi-GB RSS limits.
- Process termination by OOM killer.
- `launchd` repeatedly attempts restart, leading to an infinite crash loop.

## Root Cause Analysis

1. **Retry Storms & Error Accumulation**: Failed requests due to unsupported model selection or downstream errors trigger recursive or unbounded retry loops without backpressure or cleanup, accumulating state in memory.
2. **Routing Mismatch**: Priority-based routing selects capability-incompatible models (e.g., trying to use vision/tools on models that don't support them), throwing HTTP 400 errors and triggering fallback/retry loops.
3. **Context Cache Leak**: Aggressive caching mechanisms (`context_cache_protection`) retain incorrect model pins or stale context handles indefinitely.
