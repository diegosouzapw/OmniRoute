# Runbook 03 — Heap OOM

**Severity**: SEV-1 if requests are being shed; SEV-3 if heap is trending up but below threshold.
**Owner**: platform on-call.
**Last verified**: 2026-06-25.
**Related**: `docs/PERF_BUDGETS.md` § 4 (resource budgets); `open-sse/utils/heapPressure.ts`.

This runbook covers two distinct heap-pressure situations:

1. **Steady climb** — `heap_used_mb` grows without releasing. Almost
   always a leak. The heap-pressure guard in
   `open-sse/utils/heapPressure.ts::checkHeapPressureGuard` will trip at
   `HEAP_PRESSURE_THRESHOLD_MB` (computed at boot from `v8.getHeapStatistics().heap_size_limit`
   × 0.85, with a 400 MB floor). Once tripped, the chat pipeline returns
   503 with `Retry-After: 5` and body code `heap_pressure`.
2. **Sudden spike** — typically a single large payload (huge prompt,
   giant SSE response, runaway recursive chunk) pushes the heap past the
   guard in one request. Resolves when the request finishes.

The threshold is **auto-calibrated** from the process's V8 heap ceiling
(see `computeHeapPressureThresholdMb` in `open-sse/utils/heapPressure.ts:23`).
A fixed default was the bug behind the v3.8.8 outage: 200 MB sat below
the runtime's ~260 MB baseline, so the guard rejected every warmed-up
request.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  HeapPressureTrip
Labels: { route="/v1/responses", heapUsedMb=720, thresholdMb=680 }
Value:  heapUsed/threshold = 1.06 (tripped)
```

### 1.2 Confirm via health endpoint

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.heap_pressure'
```

Sample healthy response:

```json
{
  "status": "pass",
  "usage_mb": 142,
  "threshold_mb": 512
}
```

Sample failing response (guard is currently shedding):

```json
{
  "status": "fail",
  "usage_mb": 720,
  "threshold_mb": 680,
  "shedding": true
}
```

### 1.3 Confirm via log line

```bash
grep -h "heap pressure guard tripped" /var/log/omniroute/*.log | tail -5
```

The log line is emitted at `open-sse/utils/heapPressure.ts:67` and
includes both the current usage and the threshold.

---

## 2. Classify

| Symptom | Cause | Go to |
|---|---|---|
| `heapUsed` jumped suddenly, dropped back within seconds | Single big request (large prompt / streaming body) | § 3 step 1 (snapshot + monitor) |
| `heapUsed` climbs steadily over hours/days | Leak — likely an unbounded Map, retained closure, or event-listener that never unsubscribes | § 3 step 2 (snapshot + restart) |
| `heapUsed` is high but RSS is low | Old-generation bloat, GC hasn't run | § 4 (force GC) |

---

## 3. Mitigate

### 3.1 Capture a heap snapshot

Capture **before** restarting so postmortem analysis can identify the
leaking object.

```bash
# Local capture (no S3)
node --import tsx scripts/sre/capture-heap-snapshot.mjs \
  --output-dir /tmp/heap-snapshots

# Remote capture (S3-compatible object store)
S3_ENDPOINT=https://s3.us-west-2.amazonaws.com \
S3_BUCKET=omniroute-heap-snapshots \
S3_ACCESS_KEY=AKIA... \
S3_SECRET_KEY=... \
node --import tsx scripts/sre/capture-heap-snapshot.mjs \
  --label "$(date -u +%Y%m%dT%H%M%SZ)-heap-snapshot" \
  --ttl-days 30
```

The script uses `v8.writeHeapSnapshot()` from the Node stdlib (no extra
deps) and uploads to S3 via a single signed `PUT` request. See
`scripts/sre/capture-heap-snapshot.mjs` for the exact code path.

> **Note**: a heap snapshot is typically 50-300 MB. Make sure you have
> free disk space and a network path to the object store before running.

### 3.2 Restart if the leak is sustained

If the heap has been climbing for more than 10 minutes and `heapUsed >
1.5 × threshold`, restart the replica. Caddy LB will drain the in-flight
requests automatically.

```bash
# Drain gracefully
docker exec omniroute-replica-1 \
  curl -X POST http://localhost:20128/__admin/drain -d '{"drainSeconds":30}'
sleep 35

# Roll the container
docker compose -f docker-compose.prod.yml up -d --no-deps --force-recreate omniroute
```

Verify the new replica is healthy:

```bash
curl -s http://localhost:20128/api/health/ping
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.heap_pressure'
```

The new replica should report `usage_mb < 100` and `status: "pass"`.

### 3.3 Reduce concurrency (if restart isn't possible)

If you can't restart immediately (e.g. SEV-1 in the middle of business
hours), reduce the concurrency cap:

```bash
# Dashboard Settings → Concurrency → max concurrent requests
# (no env var; configured via the Settings UI per docs/ops/MONITORING_GUIDE.md)
```

Setting this to ~50% of the current value should buy 5-10 minutes of
breathing room while you schedule a maintenance window.

---

## 4. Investigate (parallel with mitigation)

### 4.1 Force a manual GC

If `--expose-gc` is enabled (it is in `Dockerfile`), trigger a manual GC:

```bash
docker exec omniroute-replica-1 \
  node -e 'global.gc(); console.log(JSON.stringify(process.memoryUsage()))'
```

Output (healthy):

```json
{"rss":412000000,"heapTotal":134000000,"heapUsed":98000000,"external":12000000}
```

If `heapUsed` drops to ~30% of `heapTotal` after `gc()`, the heap was
just uncollected garbage (not a leak) and the issue is GC frequency, not
retention.

### 4.2 Analyze the heap snapshot

Download the snapshot from S3 and open it in Chrome DevTools:

1. `chrome://inspect` → "Open dedicated DevTools for Node" → "Memory" tab.
2. Click "Load snapshot" → select the file.
3. Filter by `(closure)` or `(array)` to find retained large objects.
4. Compare retainers across two snapshots taken ~5 min apart — the
   delta reveals the leak source.

### 4.3 Common leak sources

| Source | How to spot | Fix |
|---|---|---|
| Unbounded `Map` keyed by request ID | Snapshot shows a `Map` with > 10k entries growing | Add eviction in `src/lib/usage/sessionManager.ts` or wherever the map lives |
| Event listener on a long-lived emitter that never gets `.off()` | Snapshot shows thousands of `(object)` closures with the same constructor | Track `.listeners(emitter.eventName).length` and warn at 1000 |
| SSE stream not closing on client disconnect | Snapshot shows many `(ReadableStream)` instances in "pending" state | Verify the abort handler in `open-sse/handlers/chatCore.ts` calls `.destroy()` |
| Cached provider response that includes the full request body | Snapshot shows a `Buffer` of MBs held by a Cache entry | Truncate the cached body to the first 64 KB or hash-only |

### 4.4 Check for known regressions

```bash
# Compare against the last green release
git -C /opt/omniroute log --oneline v3.8.36..HEAD -- open-sse/ src/
```

If you see changes under `open-sse/handlers/chatCore.ts` or any
streaming handler, **suspect the change** and roll back (see
`bin/rollback.sh v3.8.36`).

---

## 5. Restore

1. `heapUsed` should stay < 50% of `threshold` for at least 30 minutes.
2. The `heap_pressure` guard should not trip again.
3. Verify p95 latency is back within budget (per `docs/PERF_BUDGETS.md` § 2.1).

If the issue recurs after restart, the leak is in startup code (a module
that opens a listener it never closes). Move to SEV-1 and roll back to the
previous release.

---

## 6. Smoke test (run quarterly)

```bash
# Confirm heap pressure threshold computation still works
node --import tsx -e "
  import('./open-sse/utils/heapPressure.ts').then(m => {
    const stats = require('node:v8').getHeapStatistics();
    const mb = stats.heap_size_limit / (1024*1024);
    console.log('computed:', m.computeHeapPressureThresholdMb(mb));
  });
"

# Confirm the snapshot script still writes a valid heap file
node --import tsx scripts/sre/capture-heap-snapshot.mjs \
  --output-dir /tmp/heap-smoke \
  --label smoke-test
node --test tests/sre/capture-heap-snapshot.test.ts
```

---

## 7. References

- `open-sse/utils/heapPressure.ts` — `computeHeapPressureThresholdMb`, `checkHeapPressureGuard`
- `src/lib/monitoring/observability.ts` — `memory_used_mb` gauge
- `src/app/api/monitoring/health/route.ts` — `checks.heap_pressure` shape
- `open-sse/handlers/chatCore.ts` — caller of the guard (memory-pressure shed)
- `docs/PERF_BUDGETS.md` § 4 — `Heap retained` budget (800 MB)
- `docs/ops/MONITORING_GUIDE.md` — `memory_used_mb` and `heap_pressure` alert
- `Dockerfile` — `--expose-gc` flag
- `scripts/sre/capture-heap-snapshot.mjs` — heap snapshot script (this PR)