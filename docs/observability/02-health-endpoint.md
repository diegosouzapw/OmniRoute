# Health endpoint — PR-009

`GET /api/health` is the canonical operator-facing surface for load
balancers, Kubernetes probes, and operator dashboards. It returns a
structured, stable snapshot of the OmniRoute process so SRE tooling can
compute burn rates and orchestrate rollouts without parsing bespoke
endpoints.

## Endpoint summary

| Path                         | Auth | Default mode  | Deep mode (`?deep=1`) | Status codes |
|------------------------------|------|---------------|-----------------------|--------------|
| `GET /api/health`            | none | liveness + readiness | + database + migrations + cache + bifrost | 200 (healthy/degraded), 503 (unhealthy) |

The endpoint is **never** gated behind auth — k8s probes hit it from
the kubelet's anonymous network namespace.

## Example — shallow mode (default)

```bash
$ curl -s http://localhost:3000/api/health | jq
```

```json
{
  "status": "healthy",
  "version": "3.8.34",
  "uptime_seconds": 4217,
  "started_at": "2026-06-25T08:14:01.722Z",
  "timestamp": "2026-06-25T09:24:18.722Z",
  "checks": {
    "liveness": {
      "status": "healthy",
      "latency_ms": 1,
      "details": { "pid": 1234, "node_version": "v20.18.0" }
    },
    "readiness": {
      "status": "healthy",
      "latency_ms": 1,
      "details": { "uptime_seconds": 4217, "started_at": "...", "platform": "linux", "arch": "x64" }
    }
  }
}
```

Response headers:

```
Cache-Control: no-store, no-cache, must-revalidate
X-Health-Status: healthy
X-Health-Deep: 0
```

## Example — deep mode

```bash
$ curl -s 'http://localhost:3000/api/health?deep=1' | jq
```

```json
{
  "status": "degraded",
  "version": "3.8.34",
  "uptime_seconds": 4217,
  "started_at": "2026-06-25T08:14:01.722Z",
  "timestamp": "2026-06-25T09:24:18.722Z",
  "checks": {
    "liveness":  { "status": "healthy",  "latency_ms": 1 },
    "readiness": { "status": "healthy",  "latency_ms": 1 },
    "database":  { "status": "healthy",  "latency_ms": 4, "details": { "query": "SELECT 1" } },
    "migrations":{ "status": "healthy",  "latency_ms": 7, "details": { "applied": 96, "pending": 0 } },
    "cache":     { "status": "healthy",  "latency_ms": 0, "details": { "hits": 412, "misses": 18, "total": 430, "hit_ratio": 0.9581, "size": 22 } },
    "bifrost":   { "status": "degraded", "latency_ms": 0, "details": { "skipped": true, "reason": "BIFROST_BASE_URL not configured" } }
  }
}
```

## Status semantics

| Status     | Meaning                                                                 | HTTP code |
|------------|-------------------------------------------------------------------------|-----------|
| `healthy`  | Every check passed cleanly within budget.                               | 200       |
| `degraded` | At least one check is `degraded` but none are `unhealthy`. Service is up but operators should investigate. | 200 |
| `unhealthy`| At least one check is `unhealthy` (failed or timed out).                | 503       |

Per-check `status` mirrors the same vocabulary. A `degraded` check
typically signals:

- A probe target is intentionally disabled (e.g. BIFROST_BASE_URL unset)
- A soft threshold was tripped (memory pressure, etc.)
- A non-critical subsystem is missing in the current runtime

A probe that exceeds its 2-second budget is **always** reported as
`unhealthy` with `error: "timeout"` — no probe can hang the response.

## Kubernetes example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: omniroute
spec:
  template:
    spec:
      containers:
        - name: omniroute
          image: omniroute:3.8.34
          ports:
            - containerPort: 3000
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /api/health?deep=1
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 30
            timeoutSeconds: 5
            failureThreshold: 2
```

## Stability contract

The `(check_name, status)` tuple is the stable identifier operators
parse for SLO burn-rate calculations and dashboard panels:

| Check name   | Always returned (deep) | Notes                                          |
|--------------|------------------------|------------------------------------------------|
| `liveness`   | yes (shallow too)      | Process is alive. Always healthy.              |
| `readiness`  | yes (shallow too)      | Process has been up long enough to serve.      |
| `database`   | only in deep mode      | `pingDb()` returns true.                       |
| `migrations` | only in deep mode      | `getMigrationStatus()` shows 0 pending.        |
| `cache`      | only in deep mode      | `getPromptCache().stats()` returns a payload.  |
| `bifrost`    | only in deep mode      | Skipped (degraded) when `BIFROST_BASE_URL` unset. |

Renaming a check name or changing its status vocabulary requires a
coordinated alert migration.

## Error codes (PR-009)

| Code        | HTTP | Category | Meaning                                  |
|-------------|------|----------|------------------------------------------|
| `HEALTH_001`| 503  | HEALTH   | Database health check failed             |
| `HEALTH_002`| 503  | HEALTH   | Migration health check failed            |
| `HEALTH_003`| 503  | HEALTH   | Cache health check failed                |
| `HEALTH_004`| 503  | HEALTH   | Bifrost sidecar health check failed      |
| `HEALTH_005`| 503  | HEALTH   | Health check timed out                   |

These codes are surfaced through the standard error response shape and
are exported from `@/shared/constants/errorCodes`.

## Observability

Each check's wall-clock latency is recorded as
`omniroute_health_check_duration_seconds{name}` histogram (Prometheus /
OpenTelemetry compatible). The histogram is tagged with the probe name
and result status, so operators can compute per-check SLOs and tail
latency without re-walking the JSON response.

The metric is a no-op when `OMNIROUTE_OTEL_ENABLED !== "true"`, so the
endpoint works in any deployment topology.
