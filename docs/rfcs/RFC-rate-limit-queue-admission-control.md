# RFC: Rate-limit queue admission control + compression bypass

**Status:** Draft (RFC / discussion)
**Author:** external contributor
**Date:** 2026-07-07

## Problem

Under a burst of concurrent chat completions against a single (provider, connection, model) triple, the Bottleneck-backed request queue grows unbounded. Every excess request then blocks in the queue until the default `maxWaitMs = 120_000` elapses, holding an HTTP socket for up to 2 minutes before returning a rate-limit response.

Two follow-on effects observed:

1. **Client timeouts pile up** long before the queue drains — dashboards show hundreds of "waiting" requests against a triple whose upstream RPM is already saturated.
2. **Compression on the response path** (br/gzip) still runs even when the response is a synthesized 429/rate-limit body, adding CPU pressure at the exact moment the process is queue-bound.

## Proposal

Three small, opt-in, additive changes:

1. **`RequestQueueSettings.maxQueueDepth`** — per-triple admission cap. When the pending queue for a (provider, connection, model) triple is >= `maxQueueDepth`, new requests fast-fail with `429 queue_full` instead of enqueuing. Default `0` (disabled) preserves current behavior.
2. **Lower default `maxWaitMs`** from `120_000` → `15_000`. 2 min queue-hold masks upstream RPM saturation as latency; a 15 s ceiling surfaces it as a fast, actionable 429 while still absorbing brief bursts. Env override (`RATE_LIMIT_MAX_WAIT_MS`) remains.
3. **`bypassCompressionOnRateLimit`** flag — when a response is a synthesized rate-limit body, skip the response-compression pipeline. Saves CPU on the hot path.

## Backward compatibility

All three land behind additive settings fields with existing-behavior defaults for #1 and #3. Only #2 changes an observable default; it is bounded by the existing `min: 0, max: 30000` schema for user overrides.

Thanks for the great work on OmniRoute!
