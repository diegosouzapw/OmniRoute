# Chaos Engineering in OmniRoute (PR-013)

> **Audience:** SREs, platform engineers, and on-call responders who run
> the OmniRoute chaos suite against staging or production-like
> environments.
>
> **Status:** Implementation shipped in PR-013. This guide is the
> operator-facing manual.

Chaos engineering is the discipline of deliberately injecting failures
into a system to validate that it fails *the right way*. In OmniRoute
we focus on the failure modes we actually see in production: provider
timeouts, network partitions, SQLite WAL corruption, combo-DAG DoS
attempts, memory pressure, and clock skew. Each scenario in the
PR-013 suite targets one of those failure modes, asserts that the
recovery path works, and emits metrics that the SRE team can use to
alert on a regression.

The suite is intentionally dependency-free: no chaos libraries, no
Prometheus client library, no XML library. Everything is built on the
Node standard library so the orchestrator can run on any host with
Node ≥ 22 and `tsx` available. That choice has a cost — the helper
scripts are a bit more verbose — and the benefit that the suite is
trivially auditable: every line of fault-injection code is in this
repo, in plain JavaScript.

## When to run

The chaos suite is **gated** behind the `CHAOS_TESTS_ENABLED`
environment variable. Default is *off*.

| Environment | `CHAOS_TESTS_ENABLED` | Schedule              | Blast radius    |
| ----------- | --------------------- | --------------------- | --------------- |
| Unit CI     | unset / `0`           | every commit          | none (gated)    |
| Integration CI | `0`                | every commit          | none (gated)    |
| Nightly     | `1`                   | 02:00 UTC, daily      | staging only    |
| Pre-release | `1`                   | on `release-*` tag    | staging only    |
| Production  | `1`                   | manual, approved      | one canary host |

Running the suite against production is a manual operation. Coordinate
with the on-call SRE before kicking it off; the suite is hermetic per
scenario but a misconfigured firewall rule could affect traffic
destined for the very host under test.

## How to run

### Quickstart (dry-run mode)

```sh
# Lists scenarios, no fault injection. Safe in any environment.
node tests/chaos/runner.mjs --list

# Runs every scenario with dry-run enabled.
# Helper scripts print the firewall / clock-skew commands they WOULD run
# without touching the host.
CHAOS_TESTS_ENABLED=1 CHAOS_DRY_RUN=1 node tests/chaos/runner.mjs
```

### Real fault injection (staging)

```sh
# Each scenario runs in its own subprocess with a temp DATA_DIR.
# The orchestrator captures TAP, parses pass/fail, asserts the
# per-scenario recovery SLA, and writes a JUnit XML.
CHAOS_TESTS_ENABLED=1 \
  node tests/chaos/runner.mjs \
    --junit-out reports/chaos-$(date -u +%Y%m%dT%H%M%SZ).xml \
    --verbose
```

### Running a single scenario

```sh
CHAOS_TESTS_ENABLED=1 \
  node tests/chaos/runner.mjs --only provider-timeout --verbose
```

The `--only` flag is a substring match against the scenario id, so
`--only clock-skew` matches `clock-skew` (and nothing else).

## Scenario catalog

| Id                          | Failure injected                                  | Recovery SLA | Critical assertion                                        |
| --------------------------- | ------------------------------------------------- | ------------ | --------------------------------------------------------- |
| `provider-timeout`          | 30 s artificial latency on one provider           | 5 s          | Failover to backup completes within 5 s                  |
| `bifrost-network-partition` | Drop traffic to bifrost sidecar for 10 s          | 30 s         | Breaker opens, requests fail 503 (never 504), recovery < 30 s |
| `sqlite-wal-corruption`     | Truncate WAL file mid-run                         | 2 s          | Committed rows survive, uncommitted frames rolled back   |
| `combo-dag-deep-recursion`  | Submit 50-level nested strategy                   | 1 s          | Validator rejects with COMBO_005 before executor runs    |
| `memory-pressure`           | Allocate 4 GB of buffers                          | 0.2 s        | `/api/health` p100 < 200 ms under pressure                |
| `clock-skew`                | Shift `Date.now()` by +5 minutes                  | 1 s          | JWT with past `exp` rejected with 401 (not silently accepted) |

### Recovery SLA table

The "Recovery SLA" column is enforced by `tests/chaos/runner.mjs`. The
runner reads each scenario file's optional `RECOVERY_SLA_SECONDS`
export; if a scenario observes a worse recovery, the runner marks the
scenario failed regardless of the inner `node:test` assertions.

| Scenario                  | SLA (seconds) | Why                                                                 |
| ------------------------- | ------------- | ------------------------------------------------------------------- |
| provider-timeout          | 5             | Users see a backup respond within their tolerance; anything slower means the router is reissuing too late. |
| bifrost-network-partition | 30            | A partition heals inside the NTP backoff window; if the breaker can't self-heal in 30 s the on-call gets paged. |
| sqlite-wal-corruption     | 2             | Recovery is automatic on open plus a checkpoint; > 2 s means the WAL grew too large or the disk is slow. |
| combo-dag-deep-recursion  | 1             | Validation must short-circuit before any executor work; > 1 s means we walked the tree. |
| memory-pressure           | 0.2           | The `/api/health` SLA is published at 200 ms p100; chaos must not regress it. |
| clock-skew                | 1             | The validator is a pure function on the token's claims; anything > 1 s means I/O crept in. |

### Data-loss invariant

Across all scenarios, `omniroute_chaos_data_loss_total{scenario}` must
remain **zero**. The runner checks this indirectly: any nonzero value
appears as a non-zero `dataLossTotal` in the JUnit `<system-out>`
block for the scenario, and an alert fires from
`docs/ops/MONITORING_GUIDE.md` rule `chaos-data-loss-nonzero`.

## Helper scripts

The two helper scripts under `scripts/chaos/` wrap the platform
firewall and the process clock respectively. They are designed to be
safe to import — they export their core functions so the chaos tests
can unit-test the command builders without spawning a subprocess.

### `network-partition.mjs`

Wraps `netsh advfirewall` on Windows and `iptables` on Linux. The
script refuses to do real firewall changes unless `CHAOS_DRY_RUN`
is explicitly unset (and even then it requires the host firewall
tool to be on `PATH`).

```sh
# Print the command that WOULD run, no side effects.
node scripts/chaos/network-partition.mjs dry-run --host 127.0.0.1 --port 8080

# Apply (requires admin / netsh). Use only in staging.
node scripts/chaos/network-partition.mjs block --host 127.0.0.1 --port 8080

# Remove the rule.
node scripts/chaos/network-partition.mjs unblock --host 127.0.0.1 --port 8080
```

macOS is not supported out of the box; the script returns an error
that points the operator at the in-process monkey-patch used by the
test file directly.

### `clock-skew.mjs`

Shifts `Date.now()` and `Date.prototype.getTime()` by a configurable
offset inside the current Node process. Useful when you want to
inject skew into a running OmniRoute instance from a separate
process.

```sh
# Inspect the platform support.
node scripts/chaos/clock-skew.mjs check

# Print the offset the scenario would apply.
node scripts/chaos/clock-skew.mjs shift --offset-ms 300000
```

For Linux hosts that want to inject skew into a non-Node binary, the
script can print a small C snippet that compiles into an
`LD_PRELOAD`-able shared library:

```sh
node -e "import('./scripts/chaos/clock-skew.mjs').then(m => console.log(m.ldPreloadSnippet()))"
```

## Metrics reference

Three metric families are emitted by
`src/lib/observability/chaosMetrics.ts`:

| Metric                                            | Type      | Labels     | Notes                                            |
| ------------------------------------------------- | --------- | ---------- | ------------------------------------------------ |
| `omniroute_chaos_injection_total`                 | counter   | `scenario` | Increments every time a fault is injected.       |
| `omniroute_chaos_recovery_duration_seconds`       | histogram | `scenario` | Wall-clock seconds between injection and recovery. |
| `omniroute_chaos_data_loss_total`                 | counter   | `scenario` | Should always be 0; nonzero → page on-call.      |

Recovery-duration buckets are tuned to the SLAs above:

```
0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 30, 60 seconds, +Inf
```

The Prometheus text-exposition format is rendered by
`renderPrometheusText()` and exposed at the same `/metrics` endpoint
that already serves the rest of OmniRoute's metrics. SREs can query:

```promql
# Successful recoveries in the last hour, per scenario.
increase(omniroute_chaos_recovery_duration_seconds_count[1h])

# 99th percentile recovery time, last 24h.
histogram_quantile(0.99,
  sum by (scenario, le) (rate(omniroute_chaos_recovery_duration_seconds_bucket[24h]))
)

# Any nonzero data loss → page.
omniroute_chaos_data_loss_total > 0
```

## Interpreting a failure

When a scenario fails, the JUnit XML tells you which assertion broke
and the orchestrator prints a one-line summary on stderr. Walk
through these questions in order:

1. **Which TAP line failed?** Look for `not ok N - <description>` in
   the per-scenario JUnit `<failure>` body. The description names the
   assertion (`first-attempt-timed-out`, `breaker-fast-fails-with-503`,
   etc.).
2. **Was the recovery SLA violated?** The runner reports
   `observed N.NNs > SLA Ns`. If yes, the chaos scenario ran to
   completion but the SUT was too slow to recover.
3. **Did `dataLossTotal` increment?** Look at the metrics block in
   `<system-out>`. If `dataLossTotal > 0`, treat as P1 — the system
   lost data because of a fault we triggered.
4. **Was the chaos injection effective?** Compare `injectionTotal` to
   the inner assertion count. If `injectionTotal == 0` but assertions
   failed, the fault injector didn't actually fire — usually a sign
   that the test predicate didn't match.

If the failure reproduces across reruns, file an issue against the
team that owns the affected subsystem (combo router, sqlite layer,
auth, etc.) and link the JUnit XML as evidence.

## Extending the suite

To add a new scenario:

1. Create `tests/chaos/<your-scenario>.test.ts` using `node:test` and
   the same shape as the existing scenarios.
2. Import `recordChaosInjection`, `observeRecoveryDuration`, and
   `snapshot` from `src/lib/observability/chaosMetrics.ts`.
3. Optionally export `RECOVERY_SLA_SECONDS = N;` to override the
   default SLA.
4. Make sure the test cleans up any global state (`t.after(...)` is
   your friend) so the runner's invariants don't trip.

The orchestrator picks up new `*.test.ts` files automatically; no
configuration changes are needed.

## Related documents

- `docs/chaos/01-overview.md` — the long-form introduction to chaos
  testing in OmniRoute (predecessor framework, PR-013 stacks on top).
- `docs/ops/MONITORING_GUIDE.md` — alerting rules, including the
  `chaos-data-loss-nonzero` rule.
- `docs/ops/INCIDENT_RESPONSE.md` — what to do when chaos surfaces
  a real regression.
- `docs/sre/01-observability.md` — the metrics pipeline, where the
  chaos metrics land.
- `docs/sre/02-capacity-planning.md` — how to size the chaos runner
  host (memory pressure scenario needs ≥ 6 GB free to allocate 4 GB
  inside the subprocess plus its own overhead).