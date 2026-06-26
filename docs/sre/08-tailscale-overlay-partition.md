# Runbook 08 — Tailscale Overlay Partition

**Severity**: SEV-2 if cross-region replication breaks; SEV-3 if the tailnet is non-essential for the customer's deployment.
**Owner**: platform on-call.
**Last verified**: 2026-06-25.
**Related**: `src/lib/tailscaleTunnel.ts`; `src/app/api/tunnels/tailscale/`; `docs/ops/TUNNELS_GUIDE.md`.

OmniRoute's tailscale tunnel feature exposes the local API server over a
tailnet so that customers running multi-region deployments can route
through a single point of ingress. The tunnel state machine lives in
`src/lib/tailscaleTunnel.ts` and surfaces the current
`TailscaleTunnelPhase` value to the operator via the
`/api/tunnels/tailscale/check` endpoint and the dashboard.

A **partition** happens when one OmniRoute replica can still reach the
control plane (so `tailscaled` is alive) but cannot reach the other
replicas (so cross-replica calls fail). The most common cause is the
tailnet falling behind on a magic-DNS update or one replica's
`tailscaled` socket getting stale.

This runbook covers:

1. Diagnosing the partition.
2. Falling back to loopback (127.0.0.1) for the affected replica.
3. Re-establishing the overlay.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  TailnetPartition
Labels: { hostname="omniroute-replica-2", peer="omniroute-replica-1" }
Value:  ping_latency_ms=NaN (peer unreachable)
```

### 1.2 Confirm via the check endpoint

```bash
curl -s http://localhost:20128/api/tunnels/tailscale/check | jq
```

Sample failing response:

```json
{
  "phase": "stopped",
  "binaryPath": "/usr/bin/tailscale",
  "daemonPid": null,
  "tunnelUrl": null,
  "lastError": "tailscaled socket not reachable",
  "peers": [
    { "name": "omniroute-replica-1", "reachable": false, "latencyMs": null },
    { "name": "omniroute-replica-3", "reachable": true, "latencyMs": 12 }
  ]
}
```

The `phase: "stopped"` and `lastError` field indicate the tunnel daemon
is down or unreachable. The `peers` array shows per-peer reachability.

### 1.3 Confirm via `tailscale status`

```bash
sudo tailscale status
# Sample (problem):
# 100.64.0.1   omniroute-replica-1   linux   -    offline
# 100.64.0.3   omniroute-replica-3   linux   -    active; direct 1.2.3.4:41641, tx 1584 rx 1024
```

If any peer is `offline`, that peer is unreachable. Cross-replica calls
to that peer will hang or fail.

### 1.4 Confirm via ping

```bash
# MagicDNS name (preferred)
sudo tailscale ping omniroute-replica-1
# Sample (problem):
# ping from "omniroute-replica-2" to 100.64.0.1 in 0ms
# no reply within 1s

# Direct IP fallback
ping -c 3 100.64.0.1
# Expect: 100% packet loss
```

---

## 2. Classify

| Symptom | Cause | Go to |
|---|---|---|
| `phase: "stopped"` on one replica, others `running` | That replica's `tailscaled` died | § 3 (restart tailscaled) |
| `phase: "running"` everywhere, peers `reachable: false` | MagicDNS / DERP relay issue | § 4 (fallback to loopback + reset) |
| `phase: "needs_login"` | Auth expired or key rotated | § 5 (re-authenticate) |
| `phase: "error"` with `lastError` non-empty | Daemon crashed with an error | § 6 (read the error) |

---

## 3. Mitigate (restart tailscaled)

If `tailscaled` died on a single replica:

```bash
# Check if the daemon is actually running
docker exec omniroute-replica-2 pgrep -af tailscaled

# Restart via the platform's service manager
docker exec omniroute-replica-2 systemctl restart tailscaled
# Or, for the binary-managed install:
docker exec omniroute-replica-2 \
  sh -c '/usr/local/bin/tailscaled --state=/var/lib/tailscale/tailscaled.state &'

# Re-bring up the tunnel
docker exec omniroute-replica-2 \
  curl -X POST http://localhost:20128/api/tunnels/tailscale/start-daemon \
  -H "Content-Type: application/json"
```

Verify the phase moved to `running`:

```bash
curl -s http://localhost:20128/api/tunnels/tailscale/check | jq '.phase'
# Expect: "running"
```

---

## 4. Mitigate (fallback to loopback)

If the tailnet cannot recover quickly (DERP relay down, control-plane
incident, customer-firewalled region), fall back to loopback for the
affected replica. This means the replica no longer advertises itself on
the tailnet — only direct `127.0.0.1` traffic works.

> **Important**: loopback is a single-host fallback. If the customer has
> a multi-region deployment, this is a **degraded** state, not a
> complete fix.

```bash
# Disable the tailscale tunnel on the affected replica
docker exec omniroute-replica-2 \
  curl -X POST http://localhost:20128/api/tunnels/tailscale/disable \
  -H "Content-Type: application/json" \
  -d '{"reason":"tailnet-partition","fallbackToLoopback":true}'

# Verify
curl -s http://localhost:20128/api/tunnels/tailscale/check | jq '.phase,.tunnelUrl'
# Expect: "running" (loopback), tunnelUrl=null
```

This calls the `disable` handler at
`src/app/api/tunnels/tailscale/disable/route.ts`. The handler:

1. Stops the tailscaled process.
2. Sets `tailscaleEnabled = false` in the settings DB.
3. Resets the cluster-routing config to use `127.0.0.1` instead of the
   tailnet hostname.

While the tunnel is disabled, **in-cluster communication continues** via
the loopback interface, so single-replica deployments are unaffected.

---

## 5. Mitigate (re-authenticate)

If the tunnel phase is `needs_login`, the auth key was rotated or
expired. Re-authenticate:

```bash
# Interactive (browser-based)
docker exec -it omniroute-replica-2 \
  curl -X POST http://localhost:20128/api/tunnels/tailscale/login \
  -H "Content-Type: application/json"

# Headless (auth key from env)
docker exec omniroute-replica-2 \
  sh -c 'TAILSCALE_AUTHKEY=tskey-auth-... /usr/bin/tailscale up --authkey=$TAILSCALE_AUTHKEY'

# Verify
curl -s http://localhost:20128/api/tunnels/tailscale/check | jq '.phase'
# Expect: "running"
```

If `TAILSCALE_AUTHKEY` is not set, get one from the customer's tailscale
admin console (`https://login.tailscale.com/admin/settings/keys`). The
`tailscale-authkey` test (`tests/unit/tailscale-authkey.test.ts`) covers
the auth-key validation flow.

---

## 6. Mitigate (read the error)

If `phase: "error"`, the daemon failed to start. Read `lastError`:

```bash
curl -s http://localhost:20128/api/tunnels/tailscale/check | jq '.lastError'
```

Common errors and fixes:

| Error | Cause | Fix |
|---|---|---|
| `"tailscaled socket not reachable"` | Daemon not running | § 3 |
| `"binary not found"` | `tailscale` is not installed | Reinstall via `src/app/api/tunnels/tailscale/install/route.ts` |
| `"needs_login"` | Auth expired | § 5 |
| `"permission denied on /var/run/tailscale/"` | SELinux / AppArmor blocking | Allow-list the path: `setsebool -P tproxy_unprivileged 1` |
| `"network is unreachable"` (during `tailscale up`) | Egress to control plane blocked | Open UDP 41641 outbound (or use a DERP relay) |

---

## 7. Investigate (parallel with mitigation)

### 7.1 Check the control plane status

```bash
# Is the tailscale control plane reachable?
curl -s -o /dev/null -w "%{http_code}\n" https://controlplane.tailscale.com
# Expect: 200

# Are the DERP relay servers reachable?
for d in nyc sfo fra sin; do
  echo -n "$d: "
  curl -s -m 5 -o /dev/null -w "%{http_code}\n" https://$d.derp.tailscale.com
done
```

A control-plane outage (rare) means no replica can re-authenticate until
tailscale's status page recovers.

### 7.2 Check magic-DNS

```bash
# Resolve a peer by hostname
dig +short omniroute-replica-1
# Expect: 100.64.x.x (a tailnet IP)

# If this fails, magic-DNS is broken
```

A magic-DNS issue typically resolves itself within 5 minutes (the DERP
servers re-sync). If it persists, restart `tailscaled` on each replica
(§ 3).

### 7.3 Check the cached socket

The active socket path is cached in
`src/lib/tailscaleTunnel.ts` (`_cachedActiveSocket`) with a 10-second
TTL. If the cached path is stale (e.g. after a daemon restart moved the
socket), the next health check uses the stale path. Force a refresh:

```bash
# Wait 10s for the TTL to expire, or:
docker exec omniroute-replica-2 \
  curl -X POST http://localhost:20128/api/tunnels/tailscale/check?forceRefresh=true
```

---

## 8. Restore

1. `phase: "running"` on all replicas.
2. `peers[].reachable: true` for every peer.
3. `tailscale ping` returns a latency within 50 ms.
4. If you fell back to loopback in § 4, re-enable the tailnet:
   ```bash
   docker exec omniroute-replica-2 \
     curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
     -H "Content-Type: application/json"
   ```
5. Verify the dashboard `/dashboard/tunnels` shows green status for all replicas.

---

## 9. Smoke test (run quarterly)

```bash
# Confirm the tailscale check endpoint still works
node --import tsx -e "
  import('./src/lib/tailscaleTunnel.ts').then(m => {
    console.log('exports:', Object.keys(m).filter(k => !k.startsWith('_')));
  });
"

# Confirm the auth-key validator still passes
node --test tests/unit/tailscale-authkey.test.ts

# Confirm the tunnel route handlers still load
node --import tsx -e "
  import('./src/app/api/tunnels/tailscale/check/route.ts').then(m => {
    console.log('exports:', Object.keys(m));
  });
"
```

---

## 10. References

- `src/lib/tailscaleTunnel.ts` — tunnel state machine + `TailscaleTunnelPhase` enum
- `src/app/api/tunnels/tailscale/check/route.ts` — health check endpoint
- `src/app/api/tunnels/tailscale/start-daemon/route.ts` — daemon start
- `src/app/api/tunnels/tailscale/disable/route.ts` — fallback to loopback
- `src/app/api/tunnels/tailscale/enable/route.ts` — re-enable tailnet
- `src/app/api/tunnels/tailscale/login/route.ts` — auth
- `src/app/api/tunnels/tailscale/install/route.ts` — install tailscale binary
- `src/app/api/tunnels/tailscale/routeUtils.ts` — shared helpers
- `docs/ops/TUNNELS_GUIDE.md` — tunnel deployment guide
- `docs/security/STEALTH_GUIDE.md` — tailscale in stealth mode
- `tests/unit/tailscaleTunnel.test.ts` — state machine tests
- `tests/unit/tailscale-authkey.test.ts` — auth key validation
- Tailscale status: https://status.tailscale.com