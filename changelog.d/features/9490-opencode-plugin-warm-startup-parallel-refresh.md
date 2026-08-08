---
feature: 9490
---

**Warm catalog startup from disk snapshot + parallel refresh** (opencode-plugin): The config-shim hook now reads the last disk snapshot *before* fetching, so the provider registers immediately with the last-known-good catalog (~1-2s vs ~30s on a warm gateway). All six fetchers run concurrently via `Promise.allSettled` instead of sequentially. A failed refresh keeps the snapshot (no overwrite). An in-flight guard prevents concurrent refreshes for the same cache key. The `features.diskCache: false` opt-out disables the warm read entirely.
