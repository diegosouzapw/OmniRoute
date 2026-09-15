# Kubernetes deployment guide (k3s and k8s)

Manifests and a Helm chart for running OmniRoute on Kubernetes — k3s (single node
or small clusters) and generic k8s.

| Path                             | What it is                                           |
| -------------------------------- | ---------------------------------------------------- |
| `deploy/kubernetes/base/`        | Kustomize base — Deployment, Service, PVC, ConfigMap |
| `deploy/kubernetes/overlays/k3s` | Traefik Ingress + `local-path` storage               |
| `deploy/kubernetes/overlays/k8s` | ingress-nginx + cluster-default storage              |
| `deploy/helm/omniroute/`         | Helm chart (same topology, values-driven)            |
| `omniroute deploy k8s`           | Prints manifests built from this instance's settings |

Related: [Docker guide](../guides/DOCKER_GUIDE.md) ·
[Monitoring — probes](MONITORING_GUIDE.md#kubernetes-probe-recommendations) ·
[SQLite runtime](SQLITE_RUNTIME.md)

---

## Read this before you deploy

**OmniRoute on Kubernetes is a single replica. That is the design, not a
starting point you scale up from.**

Stock OmniRoute is one Node process writing one SQLite file. Two pods bound to
the same volume corrupt the database. Everything below follows from that:

| Constraint            | What it means for you                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `replicas: 1`, always | The Helm chart **refuses to render** with `replicaCount > 1`. The Kustomize base pins it too.                          |
| `strategy: Recreate`  | RollingUpdate would briefly run two writers. Recreate means **every upgrade is a short full outage**.                  |
| ReadWriteOnce PVC     | The chart refuses any other access mode. Never NFS/CIFS — SQLite corrupts under WAL journaling on network filesystems. |
| No rolling restarts   | Every pod restart drops all in-flight SSE streams and dashboard sessions.                                              |

If you need more capacity, run **N independent releases**, each with its own PVC
— see [Scale-out](#scale-out) below. Multi-writer HA is tracked upstream in
[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) and is not a
supported path today.

---

## Prerequisites

- A cluster: k3s ≥ 1.27 or any k8s ≥ 1.27
- `kubectl` (Kustomize is built in), and `helm` ≥ 3.12 for the chart route
- A StorageClass supporting `ReadWriteOnce` with real block storage
- An Ingress controller if you want to expose the dashboard beyond a port-forward

---

## 1. Create the secrets

Never commit these. `deploy/kubernetes/base/secret.example.yaml` is a template
carrying only placeholders and is deliberately **not** referenced by the base
kustomization — applying it would start OmniRoute with fake auth secrets.

```bash
kubectl create namespace omniroute

kubectl -n omniroute create secret generic omniroute-secrets \
  --from-literal=JWT_SECRET="$(openssl rand -base64 48)" \
  --from-literal=API_KEY_SECRET="$(openssl rand -hex 32)" \
  --from-literal=STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  --from-literal=INITIAL_PASSWORD="$(openssl rand -base64 24)"
```

Read `INITIAL_PASSWORD` back for your first login, then change it in the
dashboard immediately:

```bash
kubectl -n omniroute get secret omniroute-secrets \
  -o jsonpath='{.data.INITIAL_PASSWORD}' | base64 -d; echo
```

> **`STORAGE_ENCRYPTION_KEY` encrypts provider credentials at rest.** Losing it
> makes every stored provider connection unreadable. Back it up somewhere other
> than the cluster, and rotate it only through the documented re-encryption
> path — never by editing the Secret in place.

---

## 2a. Deploy with Kustomize

Edit the Ingress host in your overlay first (`omniroute.local` on k3s,
`omniroute.example.com` on k8s), then:

```bash
# k3s
kubectl apply -k deploy/kubernetes/overlays/k3s

# generic k8s
kubectl apply -k deploy/kubernetes/overlays/k8s
```

Preview without applying — worth doing before every change:

```bash
kubectl kustomize deploy/kubernetes/overlays/k3s
```

Watch it come up. Cold start runs SQLite migrations, replays the WAL and runs
the startup cleanup VACUUM — minutes on a large database. The startup probe
allows 10 minutes before liveness begins counting, and readiness keeps traffic
away for exactly as long as it takes:

```bash
kubectl -n omniroute rollout status deploy/omniroute
kubectl -n omniroute logs -f deploy/omniroute
```

## 2b. Deploy with Helm

```bash
helm upgrade --install omniroute deploy/helm/omniroute \
  --namespace omniroute --create-namespace \
  --set secrets.existingSecret=omniroute-secrets \
  --set persistence.storageClass=local-path \
  --set ingress.enabled=true \
  --set ingress.className=traefik \
  --set ingress.hosts[0].host=omniroute.example.com
```

Prefer `secrets.existingSecret` over `secrets.create=true`: values passed with
`--set` land in Helm release history and in your shell history.

The chart fails fast — with an explanatory message rather than a broken
release — on `replicaCount > 1`, a non-RWO access mode, a shutdown budget that
does not fit the termination grace period, no secret configured, and
`secrets.create` combined with `secrets.existingSecret`.

## 2c. No Ingress yet?

```bash
kubectl -n omniroute port-forward svc/omniroute 20128:20128
# http://localhost:20128
```

---

## 2d. Generate from this instance instead

The manifests above are a starting point you edit. If an instance is already
configured the way you want, `omniroute deploy k8s` prints the equivalent
manifests with those settings filled in, so you do not transcribe ports, origins
and flags by hand.

It writes to stdout and touches nothing:

```bash
# k3s on this machine
omniroute deploy k8s --target local | kubectl apply -f -

# a cluster other people can reach
omniroute deploy k8s --target vps --host llms.example.com > omniroute.yaml
kubectl --context omniroute-vps apply -f omniroute.yaml
```

The two targets differ only in defaults. `local` assumes k3s here: Traefik,
`local-path` storage, no TLS. `vps` assumes a real hostname in front of a
cluster others can reach, so it turns TLS on, sets `REQUIRE_API_KEY=true`, binds
the cluster's default StorageClass, and derives `LIVE_WS_ALLOWED_ORIGINS` from
the host you pass. Everything else is a flag — `omniroute deploy k8s --help`
lists them.

The command refuses to print a configuration that fails at runtime: a heap
ceiling at or above the memory limit (OOMKilled instead of a recoverable heap
error), a shutdown budget larger than the termination grace period (SSE cut
mid-drain rather than drained), an Ingress with no host. It exits `2` and names
the field.

What it will not do is decide anything the topology forbids: replica count,
update strategy and volume access mode are fixed in the generator, not exposed
as flags.

## 2e. Creating a cluster

If there is no cluster yet, `provision` prints the commands to stand one up:

```bash
omniroute deploy k8s provision --target local
omniroute deploy k8s provision --target vps --server 203.0.113.10
```

**OmniRoute never runs these and never connects to the server.** Provisioning is
a privileged host-level operation; doing it from a long-running proxy would mean
shipping an SSH client and holding a private key — a large standing surface for
a one-off task. You read the commands and run them, the same shape as
[contrib/vps](../../contrib/vps/README.md).

Two details in the VPS output are easy to get wrong by hand:

- **`--tls-san <address>`** puts the public address into the API server
  certificate. Without it the cluster is only reachable as `127.0.0.1`, and a
  remote `kubectl` fails TLS verification with no obvious cause.
- **The kubeconfig k3s writes points at `127.0.0.1`**, which is the VPS itself.
  The plan rewrites that address and renames the context before merging it into
  `~/.kube/config`, so it does not collide with an existing `default`.

Port 6443 is the Kubernetes API. Restrict it by source address, or reach it over
a private network or tunnel — the plan includes a `ufw` step for that. The
resulting kubeconfig is a full cluster credential: treat it like a private key.

Once the context exists, deploy into it with `--context`, exactly as you would
any other cluster.

## 3. Ingress and SSE

This is the step that most often looks like "OmniRoute is hanging" when it is
actually the ingress controller. `/v1/chat/completions` streams; a proxy that
buffers responses holds the whole stream until the provider turn ends.

### ingress-nginx

The k8s overlay already sets these. If you write your own Ingress, keep them:

```yaml
nginx.ingress.kubernetes.io/proxy-buffering: "off"
nginx.ingress.kubernetes.io/proxy-request-buffering: "off"
nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
nginx.ingress.kubernetes.io/proxy-body-size: "32m"
```

Without `proxy-buffering: off` the client sees nothing until the response
completes — indistinguishable from a hung request.

### Exposing the dashboard separately

The overlay ships **one** Ingress, which puts the dashboard on the same host and
behind the same authentication as `/v1`. On a private cluster that is fine. On a
reachable one it means the dashboard is only as protected as `INITIAL_PASSWORD`
— and the published image defaults that to `CHANGEME`.

Two audiences that differ this much do not fit in one Ingress resource, because
they need different authentication. `deploy/kubernetes/overlays/k8s/ingress-split-example.yaml`
shows the split: `/v1` and `/api/v1` on an API host protected by
`REQUIRE_API_KEY=true`, and the dashboard on its own host behind an external
identity provider (oauth2-proxy in the example). Swap it in for `ingress.yaml`
in the overlay's `resources:` and set both hosts.

The body-size annotation matters on the API Ingress specifically: it must not
sit below `OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES` (50 MB default), or nginx returns
413 for requests the application would have accepted — and the app's own 413
response, which tells the client to compact and retry, never runs.

### k3s: Traefik timeouts

Traefik streams without buffering, so SSE works out of the box. What it gets
wrong by default is the idle timeout: long provider turns are cut off. Raise it
on the **entrypoint**, not per-Ingress — on k3s that is a `HelmChartConfig`:

```yaml
# /var/lib/rancher/k3s/server/manifests/traefik-config.yaml
apiVersion: helm.cattle.io/v1
kind: HelmChartConfig
metadata:
  name: traefik
  namespace: kube-system
spec:
  valuesContent: |-
    ports:
      web:
        transport:
          respondingTimeouts:
            readTimeout: 0
            idleTimeout: 600s
```

k3s reconciles the file automatically; no restart needed.

### WebSocket

The dashboard's live view uses a WebSocket on port 20132, exposed on the Service
as `live-ws`. Two things must line up or the browser silently falls back to
polling:

1. Route `live-ws` through your Ingress (or use a separate host/path).
2. Set `LIVE_WS_ALLOWED_ORIGINS` to the real dashboard origin — the default only
   allows `localhost`, and a mismatched origin is rejected server-side.

---

## 4. Probes

The manifests follow
[MONITORING_GUIDE.md](MONITORING_GUIDE.md#kubernetes-probe-recommendations):

| Probe     | Target                   | Why                                                   |
| --------- | ------------------------ | ----------------------------------------------------- |
| Startup   | `GET /healthz`, 120 × 5s | Cold start = migrations + WAL replay + cleanup VACUUM |
| Readiness | `GET /healthz`           | Lifecycle state; 200 vs 503                           |
| Liveness  | **tcpSocket** on `http`  | Process-alive only, and cannot be starved by the loop |

**Never point liveness at `/api/monitoring/health`.** It does real DB and
monitoring work and will false-positive under load, restarting your only pod.

### Why liveness is TCP by default

`better-sqlite3` is synchronous. A large checkpoint or a `VACUUM` blocks the
event loop for as long as it runs — minutes on a multi-hundred-MB database on
network storage — and every HTTP handler stops answering while the process is
perfectly healthy. `/livez` is no exception: it shares the loop.

The failure that follows is self-amplifying, and has been observed in
production on this topology: HTTP liveness times out mid-VACUUM → the kubelet
kills the pod → the interrupted write leaves a larger WAL → the next cold start
is slower → it gets killed again.

The asymmetry decides the default. A wrong HTTP liveness restarts a pod
mid-write and grows the data file; a wrong TCP liveness merely lets a
hung-but-listening process survive until someone looks. **Readiness stays on
HTTP** and is what pulls a stalled pod out of the Service — liveness only
exists to restart a process that cannot recover.

Both budgets follow from the same fact:

| Setting                         | Value | Because                                                                   |
| ------------------------------- | ----- | ------------------------------------------------------------------------- |
| `startupProbe.failureThreshold` | `120` | 10 min for WAL replay + cleanup VACUUM; readiness holds traffic meanwhile |
| `terminationGracePeriodSeconds` | `300` | The post-drain WAL checkpoint has no timeout; a healthy pod exits in ~45s |

`terminationGracePeriodSeconds` is a **ceiling, not a delay**. `SHUTDOWN_TIMEOUT_MS`
(30s) bounds only the request drain; `closeDbInstance()` then checkpoints the
WAL with no timeout of its own, and a `SIGKILL` mid-checkpoint carries the fat
WAL into the next boot. Note the interaction with `Recreate`: a pod that really
does hang delays the replacement by up to 5 minutes.

To go back to HTTP liveness — defensible on a small database on fast local
storage, where no single SQLite operation can outlast the failure threshold, and
where HTTP catches a wedged server that TCP cannot. Verify with
`PRAGMA wal_checkpoint(TRUNCATE)` timings on your own volume first. Kustomize:

```bash
# add deploy/kubernetes/overlays/k8s/liveness-http.yaml to the overlay's patches:
```

Helm:

```bash
--set probes.livenessType=http
```

---

## 5. Upgrades

```bash
# Kustomize: pin a real tag rather than relying on :latest
kubectl -n omniroute set image deploy/omniroute omniroute=diegosouzapw/omniroute:3.8.51

# Helm
helm upgrade omniroute deploy/helm/omniroute -n omniroute --reuse-values \
  --set image.tag=3.8.51
```

**Every upgrade is a full outage.** Recreate terminates the only pod before
starting its replacement:

1. `preStop` sleeps 15s so the Service drops the endpoint before SIGTERM.
2. In-flight SSE drains for up to `SHUTDOWN_TIMEOUT_MS` (30s default). New
   requests reaching the dying process get `503` with a `Retry-After` hint.
3. The endpoint stays empty until the new pod is Ready — clients hitting the
   ingress in that window get a controller-generated `502`, not OmniRoute JSON.

Drain clients first if you can. `:latest` only moves when a stable release
promotes it, so it lags merged fixes — pin `:X.Y.Z` or a digest for anything
you care about.

---

## 6. Storage and backups

| Cluster        | StorageClass                  | Caveat                                                                 |
| -------------- | ----------------------------- | ---------------------------------------------------------------------- |
| k3s            | `local-path` (default)        | Node-local: the pod is pinned to one node and data dies with that node |
| k3s multi-node | Longhorn                      | Survives node loss; still RWO                                          |
| Managed k8s    | Cluster default (EBS/PD/etc.) | Must be RWO block storage                                              |

Never put `DATA_DIR` on NFS or CIFS. SQLite WAL journaling corrupts there.

**Size the volume for telemetry growth, not just for configuration.** The control
plane is small — provider connections, keys, combos are hundreds of rows — but
`conversation_turn_nodes` and `agentic_conversations` currently have no retention
path and grow with traffic (a reported ~190 MB/day under agentic load). Until
[#12453](https://github.com/diegosouzapw/OmniRoute/issues/12453) lands, treat the
PVC as sized by your retention window, and watch actual growth before trusting
the 10Gi/20Gi defaults here.

OmniRoute writes its database to `$DATA_DIR/storage.sqlite` and takes its own
consistent snapshots into `$DATA_DIR/db_backups/` (`src/lib/db/backup.ts`, on by
default — `DISABLE_SQLITE_AUTO_BACKUP=false`). Copy those out rather than the
live file: `storage.sqlite` runs in WAL mode, so a plain `cp` under a live
writer can capture a torn database. The published image ships no `sqlite3` CLI.

```bash
POD=$(kubectl -n omniroute get pod -l app.kubernetes.io/name=omniroute \
  -o jsonpath='{.items[0].metadata.name}')

kubectl -n omniroute exec "$POD" -- ls -1t /app/data/db_backups | head -5
kubectl -n omniroute cp "omniroute/$POD:/app/data/db_backups" ./omniroute-backups
```

The dashboard exposes the same snapshots under **Settings → Database backups**
(`/api/db-backups`), including on-demand creation and restore. That API is
loopback-only by route guard, so drive it from the dashboard or a port-forward —
it is not reachable through the Ingress.

The Helm PVC carries `helm.sh/resource-policy: keep`, so `helm uninstall` leaves
the database behind. Delete it deliberately.

---

## 7. Sizing

One Node process is one V8 heap. Two overlapping large `/v1/responses` requests
(~3 MiB / ~750k tokens) can abort a heap at ~12 GiB — see
[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

| Workload                 | requests     | limits   | `config.maxOldSpaceSizeMb` |
| ------------------------ | ------------ | -------- | -------------------------- |
| Dashboard + light chat   | 250m / 512Mi | 1 / 2Gi  | 1536                       |
| Default (chart)          | 250m / 512Mi | 2 / 4Gi  | 3072                       |
| Coding agents, large SSE | 1 / 4Gi      | 4 / 16Gi | 12288                      |

Keep `maxOldSpaceSizeMb` **below** the memory limit. If V8's ceiling exceeds the
cgroup, the kernel OOM-kills the pod instead of Node raising a recoverable heap
error — you lose the process and every in-flight stream with no useful log.

Heavyweight chat admission (`src/shared/middleware/chatBodyAdmission.ts`) derives
its budget from the process's real memory ceiling. Two knobs are worth knowing
before you tune anything, because their interaction is not obvious:

- **`OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` is a legacy count cap that only binds
  when you set it.** Left unset it resolves to effectively unlimited, and the
  auto-derived ingest byte budget is what actually gates. Setting it — to `4`,
  say — _enables_ the count cap rather than relaxing anything. If parallel agent
  sessions are hitting `chat_admission_busy`, the byte budget is the constraint,
  and more memory is the lever; adding this variable makes it stricter.
- **`OMNIROUTE_CHAT_ADMISSION_QUEUE_MS`** bounds how long a heavy request waits
  for capacity before a retryable 503. Agent loops fan out sub-requests that land
  on the gate together, so a short wait serializes the burst instead of burning
  the client's retry budget.

Leave the rest of the `OMNIROUTE_CHAT_ADMISSION_*` family alone unless you have
measured a reason: raising them on an already-sized process reintroduces the
heap abort.

### Scale-out

To serve more than ~2 concurrent large jobs, install the chart **N times**:

```bash
helm install omniroute-1 deploy/helm/omniroute -n omniroute \
  --set secrets.existingSecret=omniroute-secrets
helm install omniroute-2 deploy/helm/omniroute -n omniroute \
  --set secrets.existingSecret=omniroute-secrets
```

Each release gets its own PVC, its own SQLite file, and its own dashboard. Front
them with any load balancer; sticky-by-API-key is enough. Provider credentials
must be duplicated into each instance, and call logs stay partitioned per
instance. Optionally share quota counters with
`QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` — Redis is a shared counter
store, not shared SQLite.

---

## 8. Troubleshooting

| Symptom                                           | Cause                                                                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pod restarts under load                           | HTTP liveness timing out on a busy event loop. The base manifests already use TCP — check you did not apply `liveness-http.yaml` or `--set probes.livenessType=http`                                                |
| Streaming responses arrive all at once at the end | Ingress response buffering is on                                                                                                                                                                                    |
| Long requests cut off mid-stream                  | Ingress read/idle timeout too low                                                                                                                                                                                   |
| `502` right after an upgrade                      | Expected: the Recreate empty-endpoint window                                                                                                                                                                        |
| Pod `Pending`, PVC `Pending`                      | No default StorageClass, or the class cannot do RWO                                                                                                                                                                 |
| `OOMKilled`                                       | `maxOldSpaceSizeMb` ≥ memory limit                                                                                                                                                                                  |
| Dashboard live view stuck                         | `LIVE_WS_ALLOWED_ORIGINS` does not match the browser origin, or `live-ws` is not routed                                                                                                                             |
| Ingress created but nothing routes                | The `ingressClassName` names a controller the cluster does not run. A k3s installed with `--disable=traefik` has no `traefik` class, and the API server accepts the object anyway. Check `kubectl get ingressclass` |
| `database is locked` / corruption                 | Two writers, or the PVC is on NFS/CIFS                                                                                                                                                                              |
| Restart loop that gets slower each time           | A probe is killing the pod mid-VACUUM/checkpoint, growing the WAL. Check the startup budget and that liveness is TCP                                                                                                |

```bash
kubectl -n omniroute describe pod -l app.kubernetes.io/name=omniroute
kubectl -n omniroute logs deploy/omniroute --previous   # after a restart
# The image ships neither wget nor curl — node is the only HTTP client in it.
# healthcheck.mjs is the same probe the Docker HEALTHCHECK uses; exit 0 is healthy.
kubectl -n omniroute exec deploy/omniroute -- node healthcheck.mjs

# Or reach it from your machine, which also exercises the Service:
kubectl -n omniroute port-forward svc/omniroute 20128:20128 &
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:20128/healthz
```
