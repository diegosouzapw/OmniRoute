# Memory Analysis: OmniRoute RSS Spike and OOM

## Overview

Investigation into Node.js heap growth, stream retention, and recursive error handling causing memory bloat and OOM termination.

## Potential Bottlenecks

1. **Unbounded Retry Queues**: Failed requests due to model capability mismatches trigger infinite retry loops, retaining request payloads and SSE stream buffers in closure scopes.
2. **Event Listener Leaks**: Persistent event listeners attached to global event emitters or stream handlers without proper removal.
3. **SQLite Connection/Statement Caching**: Unprepared or un-finalized statement handles or large query result caching accumulating in memory.
4. **Context Cache Protection**: Caching large conversation contexts indefinitely without LRU eviction policy.

## Mitigation Strategy

- Implement strict max retry limits with exponential backoff.
- Ensure all SSE streams and network request bodies are explicitly destroyed/consumed on error.
- Add V8 heap metrics and RSS threshold monitoring.
