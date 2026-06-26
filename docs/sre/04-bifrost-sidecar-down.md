# Runbook 04 — Bifrost Sidecar Down

**Severity**: SEV-2 if all replicas affected; SEV-3 if only one replica and others absorb the load.
**Owner**: platform on-call.
**Last verified**: 2026-06-25.
**Related**: `src/app/api/v1/relay/chat/completions/bifrost/route.ts`; `open-sse/handlers/chatCore/telemetryHelpers.ts`.

Bifrost is the Go-based gateway that proxies `/v1/relay/chat/completions`
traffic. When `BIFROST_BASE_URL` is configured, requests are forwarded
to the sidecar process (default `http://127.0.0.1:20130`). When the
sidecar is unreachable, OmniRoute signals the TypeScript relay route as
the fallback via the `X-Bifrost-Fallback: /api/v1/relay/chat/completions`
response header — it does **not** proxy the fallback itself (doing so
would defeat the latency win of skipping Node).

This runbook covers the case where the sidecar is **down** (not just
slow). Symptoms: every response carries `X-Bifrost-Fallback`, error
counter `liveWsConsecutiveFailures` is climbing in
`open-sse/handlers/chatCore/telemetryHelpers.ts::forwardDashboardEventToLiveWs`,
or the sidecar `/healthz` returns a connection error.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  BifrostSidecarUnreachable
Labels: { sidecar_url="http://127.0.0.1:20130", error="ECONNREFUSED" }
Value:  consecutive_failures=3 (threshold: 3)
```

### 1.2 Confirm via response header

```bash
# Any v1 relay request should show the fallback header when the sidecar is down
curl -i -X POST http://localhost:20128/api/v1/relay/chat/completions \
  -H "Authorization: Bearer $RELAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"ping"}],"stream":false}' \
  | grep -i 'X-Bifrost-Fallback'
```

Expect `X-Bifrost-Fallback: /api/v1/relay/chat/completions` if the sidecar
is down. The header is set in
`src/app/api/v1/relay/chat/completions/bifrost/route.ts:80+` when the
fetch to the sidecar fails.

### 1.3 Direct sidecar probe

```bash
# /healthz is a tiny GET that should respond in < 5ms
curl -i http://127.0.0.1:20130/healthz

# If it returns 200 + `{"status":"ok"}`, the sidecar is healthy
# If it returns ECONNREFUSED, the sidecar process is down
```

### 1.4 Live-WS sidecar (port 20129)

There's a **second** sidecar process — the live-WS event bridge on port
20129. It's covered by
`open-sse/handlers/chatCore/telemetryHelpers.ts::forwardDashboardEventToLiveWs`
and uses lazy backoff (3 consecutive failures → 60 s cooldown). Probe:

```bash
curl -i http://127.0.0.1:20129/healthz
```

If both sidecars are down on the same host, the host itself is the
problem (CPU pegged, OOM, network partition). Jump to § 4 step 3.

---

## 2. Classify

| Symptom | Cause | Go to |
|---|---|---|
| All replicas show `X-Bifrost-Fallback` | Bifrost process died cluster-wide (deploy, infra) | § 3 (restart sidecar) |
| One replica, others fine | That replica's sidecar crashed | § 3 (drain + restart replica) |
| Header appears intermittently (every 100 requests) | Round-robin pool exhaustion, not a hard down | § 4 (increase `BIFROST_TIMEOUT_MS`) |
| Both sidecar ports (20129 and 20130) refuse connection | Host-level failure | § 4 step 3 (host triage) |

---

## 3. Mitigate

### 3.1 Restart the sidecar on one replica

```bash
# Find the running sidecar process
docker exec omniroute-replica-1 ps aux | grep -E 'bifrost|livews' | grep -v grep

# Graceful stop (let in-flight drain first)
docker exec omniroute-replica-1 \
  sh -c 'kill -TERM $(pgrep -f bifrost); sleep 5'

# Start via the sidecar supervisor (varies by deployment)
docker exec -d omniroute-replica-1 \
  /usr/local/bin/omniroute-sidecar --config=/etc/omniroute/sidecar.json
```

Or, if the sidecar runs as a separate compose service:

```bash
docker compose -f docker-compose.prod.yml \
  --profile bifrost up -d --no-deps --force-recreate bifrost
```

### 3.2 Drain in-flight traffic

The bifrost route uses an AbortController with `BIFROST_TIMEOUT_MS` (default 30 s,
env `BIFROST_TIMEOUT_MS`, see line 67 of
`src/app/api/v1/relay/chat/completions/bifrost/route.ts`). The handler
already aborts requests on timeout, so in-flight requests should self-clean.

For a clean drain:

```bash
# Drain via the admin endpoint
docker exec omniroute-replica-1 \
  curl -X POST http://localhost:20128/__admin/drain \
  -H "Content-Type: application/json" \
  -d '{"drainSeconds":30}'
sleep 35
```

The Caddy LB stops sending new traffic to the drained replica. After the
30 s window, the replica has zero active SSE streams and can be safely
restarted.

### 3.3 Disable bifrost temporarily

If the sidecar cannot be restarted (e.g. persistent infra issue), you can
disable bifrost entirely and let the TypeScript relay route handle all
traffic. This loses the latency win (40-60% p50 regression per the file
header comment at line 9) but keeps the system available.

```bash
# Set on the running container (takes effect on next request)
docker exec omniroute-replica-1 \
  sh -c 'echo "BIFROST_ENABLED=0" >> /etc/omniroute/env'

# Restart OmniRoute to pick up the env var
docker compose -f docker-compose.prod.yml \
  up -d --no-deps --force-recreate omniroute
```

Verify:

```bash
curl -s http://localhost:20128/api/system/version | jq '.features.bifrost'
# Expect: false
```

> **Important**: re-enable bifrost as soon as the sidecar is healthy
> again. Leaving it disabled in production adds ~30 MB per concurrent
> request (from the comment at line 11 of the bifrost route file).

---

## 4. Investigate

### 4.1 Check sidecar logs

```bash
# Last 100 lines of sidecar stderr
docker exec omniroute-replica-1 \
  sh -c 'tail -100 /var/log/bifrost/stderr.log'

# Look for: panic, fatal, OOM-killed, TLS handshake failures
```

Common patterns:

| Log pattern | Cause |
|---|---|
| `panic: runtime error: invalid memory address` | Bug in the sidecar — file upstream |
| `bind: address already in use` | Stale process from a previous run; `pkill -9 bifrost && sleep 2 && start` |
| `tls: failed to find any PEM data in the tls config` | Missing TLS cert; check `/etc/omniroute/tls/` |
| `context deadline exceeded` repeatedly | Upstream provider slow, not the sidecar itself |

### 4.2 Increase BIFROST_TIMEOUT_MS

If the sidecar is alive but the upstream provider is slow, the sidecar
times out at 30 s. The route then returns 504 (or 502 for some upstream
shapes) and sets `X-Bifrost-Fallback`. Bump the timeout:

```bash
# Edit /etc/omniroute/env and add:
BIFROST_TIMEOUT_MS=60000

# Restart to pick up
docker compose -f docker-compose.prod.yml up -d --no-deps omniroute
```

Confirm:

```bash
curl -s http://localhost:20128/api/system/version | jq '.env.BIFROST_TIMEOUT_MS'
```

### 4.3 Host-level triage (when both sidecars fail)

```bash
# Is the host alive?
docker exec omniroute-replica-1 uptime

# Is there CPU/memory pressure?
docker exec omniroute-replica-1 \
  sh -c 'top -bn1 | head -10'

# Is the disk full? (sidecar logs may have rotated away)
docker exec omniroute-replica-1 df -h /var/log

# Network: can the host reach the upstream?
docker exec omniroute-replica-1 \
  sh -c 'curl -s -o /dev/null -w "%{http_code}\n" https://api.openai.com/v1/models'
```

If the host is the problem, follow the platform triage runbook (out of
scope here; see `docs/ops/RELEASE_CHECKLIST.md` for host-pattern docs).

---

## 5. Restore

1. Confirm the sidecar is healthy:
   ```bash
   curl -i http://127.0.0.1:20130/healthz
   # Expect: HTTP/1.1 200 OK, {"status":"ok"}
   ```
2. Confirm the `X-Bifrost-Fallback` header is **not** present on the next
   20 relay requests:
   ```bash
   for i in $(seq 1 20); do
     curl -is -X POST http://localhost:20128/api/v1/relay/chat/completions \
       -H "Authorization: Bearer $RELAY_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"ping"}],"stream":false}' \
       | head -20 | grep -i 'X-Bifrost-Fallback' || echo "request $i: no fallback header"
   done
   ```
3. If you disabled bifrost in § 3.3, **re-enable it** now.

---

## 6. Smoke test (run quarterly)

```bash
# Confirm the bifrost route is still wired
node --import tsx -e "
  import('./src/app/api/v1/relay/chat/completions/bifrost/route.ts')
    .then(m => console.log('exports:', Object.keys(m)));
"

# Confirm the live-WS telemetry helper still works
node --test tests/unit/chatcore-telemetry-helpers.test.ts
```

---

## 7. References

- `src/app/api/v1/relay/chat/completions/bifrost/route.ts` — bifrost relay route + env vars
- `open-sse/handlers/chatCore/telemetryHelpers.ts` — `forwardDashboardEventToLiveWs` (live-WS sidecar)
- `src/lib/localHealthCheck.ts` — sidecar reachability checks
- `src/lib/monitoring/observability.ts` — `circuitBreakers` state
- `docs/architecture/RESILIENCE_GUIDE.md` — fallback semantics
- `docs/INCIDENT_RESPONSE.md` § 4 — general mitigation flow
- `bin/rollback.sh` — release rollback
- Docker compose profile: `docker-compose.prod.yml` → `bifrost` service