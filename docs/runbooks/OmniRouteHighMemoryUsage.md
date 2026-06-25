# Runbook — `OmniRouteHighMemoryUsage`

> Severity: **warning** · SLO class: reliability · Alert:
> `OmniRouteHighMemoryUsage`

## What this alert means

The V8 heap has been over 1.2 GiB for 10 minutes. Default
`--max-old-space-size` is 8 GiB, so this is ~15% of budget — but
sustained growth at this level is the leading indicator of a leak.
The `OmniRouteSuspectedOOM` alert will fire next if growth continues.

## What to check (in order)

1. **Traffic correlation.** Check `omniroute_http_requests_total` rate.
   Memory growth that tracks traffic is normal (cache warmup); growth
   that decouples from traffic is a leak.
2. **Heap profile.** Take a V8 heap snapshot:
   ```bash
   kill -USR2 $(pidof node)   # writes /tmp/*.heapsnapshot
   ```
   Then open the snapshot in Chrome DevTools → Memory tab.
3. **RSS vs heap.** Check `omniroute_process_resident_bytes`. If RSS
   grew but heap didn't, the leak is in native code (a Buffer or
   native addon).
4. **Recent code changes.** Anything that introduced a new cache, a
   new in-memory queue, or a new Map keyed by request id?

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| Unbounded Map keyed by request id | Heap snapshot shows one big Map | Add TTL eviction |
| Compression cache grew | `omniroute_cache_*` rate is high | Bump cache size cap (PR #4567) |
| Native addon leak | RSS >> heap | Audit native addon; restart |
| Token accumulator | Memory grew with traffic; plateaued | Normal — raise threshold |

## Mitigation steps

1. **Quick:** restart the node. The leak will recur if not fixed.
2. **Less quick:** scale out so the rolling restart is non-impacting.
3. **Long-term:** find the leak. Heap snapshot analysis is the most
   reliable method. Look for "retained size" hotspots.

## Post-incident

- File a bug with the heap snapshot attached.
- If the leak is in upstream OmniRoute code, add a regression test that
  asserts the heap stays bounded under a sustained request load.
- Consider adding a tighter early-warning alert at 800 MiB so we have
  time to act before hitting the 1.2 GiB threshold.