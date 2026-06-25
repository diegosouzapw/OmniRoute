# Runbook — `OmniRouteSuspectedOOM`

> Severity: **critical** · SLO class: reliability · Alert:
> `OmniRouteSuspectedOOM`

## What this alert means

The resident set size has exceeded 1.5 GiB for 5 minutes. Container
memory limits are typically 2-4 GiB — the next spike is likely to
trigger an OOM-kill and a hard restart of the node.

## What to check (in order)

1. **Container limit.** What is the cgroup memory limit?
   ```bash
   cat /sys/fs/cgroup/memory.max   # cgroup v2
   ```
   If the limit is set above 1.5 GiB, raise the alert threshold before
   bumping the limit (otherwise the next OOM is just delayed).
2. **Heap snapshot.** If `omniroute_process_heap_bytes` is also high,
   the leak is in the V8 heap. Take a snapshot (see the
   `OmniRouteHighMemoryUsage` runbook).
3. **Native allocations.** If heap is small but RSS is large, a native
   addon or a Buffer pool is leaking. Use `process.memoryUsage()` to
   confirm:
   ```bash
   node -e "console.log(process.memoryUsage())"
   ```
4. **Restart history.** Has the node restarted recently? An OOM-kill
   that has already happened shows up in `journalctl` or in the
   container orchestrator events.

## Mitigation steps (in order of urgency)

1. **Right now:** prevent the OOM-kill by either
   - restarting the node manually (sacrifices in-flight requests), or
   - draining traffic via the load balancer and waiting for in-flight
     requests to complete.
2. **Within 10 minutes:** if traffic can absorb a node loss, let the
   process be OOM-killed — that will free the host memory fastest.
3. **Within the hour:** raise the container limit IF the leak is
   bounded (e.g., scaling with traffic). Do NOT raise the limit if the
   leak is unbounded — that just delays the kill.

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| V8 heap leak | Heap snapshot shows one big retainer | Fix the leak; restart |
| Native addon leak | RSS >> heap | Restart; audit the addon |
| Unbounded Buffer queue | Heap snapshot shows many small Buffers | Add backpressure |
| Provider response held in memory | Request rate * avg response size > heap | Stream responses |

## Post-incident

- An OOM-kill is a hard reliability violation. File an incident even if
  the failover worked.
- Add a regression test that simulates the leak trigger if you can
  reproduce locally.