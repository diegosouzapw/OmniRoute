# Memory Analysis — OmniRoute

## 1. Executive Summary

OmniRoute exhibits severe memory bloat leading to OOM crashes and launchd restart loops under specific load patterns (e.g. tool-use requests routed to vision/non-tool models like `qwen2.5vl` with priority-only strategy).

## 2. Root Causes of Memory Growth

1. **Retry Storm & Accumulated State**: When a request fails (e.g. capability mismatch or 400 error), retry handlers accumulate error objects, request payloads, and stream buffers in closures.
2. **Stream Buffering**: Unconsumed or un-closed SSE/HTTP streams retaining buffers in memory.
3. **Event Listener Leaks**: Dynamic registration of event handlers on global event emitters without cleanup.
4. **Context Cache Bloat**: Caching large multi-turn prompt contexts (`context_cache_protection`) in memory without TTL or size eviction limits.
5. **SQLite Connection & Transaction Leaks**: Unclosed statements or uncommitted long-running transactions accumulating log entries and metrics.

## 3. V8 & GC Observations

- RSS grows unboundedly past 2GB+, exceeding container/launchd limits.
- V8 Heap GC fails to collect retained objects because closures hold strong references to streaming request contexts and retry queues.

## 4. Remediation Strategy

- Implement strict payload and error size limits on retries.
- Enforce stream cleanup and timeout guards.
- Disable or bound `context_cache_protection` in unstable scenarios.
- Add periodic heap diagnostics and memory watermarks.
