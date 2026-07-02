# ADR-106: Capacity headroom buffer policy

**Status:** ACCEPTED 2026-06-25 (v28-T3)
**Date:** 2026-06-25
**Owner:** infra-ops
**Refs:** ADR-098 (additional adapters), ADR-102 (forge-dispatch lock), INFRA-017, INFRA-022, INFRA-031, INFRA-038

## Summary

Define a per-workload-class capacity headroom buffer that prevents resource exhaustion under traffic spikes, node failure, and deployment surges. The policy establishes a **tiered buffer pool** of 20 % (batch), 30 % (interactive), and 50 % (critical) reserved capacity across all compute pools, enforced at the scheduler and auto-scaler level.

## Context

Between 2026-04 and 2026-06, the platform suffered **four capacity incidents** directly attributable to zero-buffer provisioning:

| Incident | Date | Root cause | Impact |
|---|---|---|---|
| INFRA-017 | 2026-04-28 | Concurrent batch job storm saturated all 64 CPU cores in `ml-inference-pool` | 14 min latency spike: p99 jump from 8 s to 43 s. No headroom to absorb the parallel job spawn. |
| INFRA-022 | 2026-05-12 | Single-node failure in `ml-inference-pool` caused cascading OOM kills on remaining nodes | 6 min service degradation, 2 partial retries lost. Remaining nodes were at 94 % utilisation — the failover had nowhere to land. |
| INFRA-031 | 2026-06-01 | Model-deployment rollout consumed remaining headroom before health checks passed | 3 min window with zero available replicas. The rolling update and the traffic that arrived during it shared the same exhausted pool. |
| INFRA-038 | 2026-06-18 | Flash-crowd traffic from a partner API integration tripled ingress rate on `/chat/completions` | 27 s of sustained 503 errors. Auto-scaler was reacting but scale-up couldn't complete fast enough with zero slack capacity. |

**The common pattern:** pool utilisation was allowed to reach 95–100 % before any action was taken, leaving no absorbent slack for these inevitable-but-unpredictable events. Post-mortems consistently recommended a **reserved capacity buffer** as the primary structural fix. Prior attempts at reactive solutions (faster auto-scaling, pre-emptible spot fallback) mitigated symptoms but did not address the root cause: the scheduler will fill whatever space exists unless a buffer is explicitly reserved.

### Requirements

- The buffer must be **configurable per workload class**, since SLOs differ by orders of magnitude.
- Enforcement must be **automatic** — no operator toggling during incidents.
- The policy must **not require a new control plane** component; it must slot into existing Kubernetes scheduling and auto-scaling primitives.

## Options Considered

### Option 1 (rejected): Flat 25 % buffer

Reserve a uniform 25 % of total capacity across all workload classes.

- **Pros**: Simple to configure and monitor. Single knob for all pools. Easy to explain in runbooks.
- **Cons**: Wastes resources on batch workloads where 5 % would suffice; insufficient for critical workloads where 40+ % is needed under worst-case failover. Treats all classes identically despite fundamentally different SLOs (no hard SLO vs p99 < 500 ms).
- **Decision**: **Rejected** — the flat approach fails the cost-efficiency test for batch and the safety test for critical workloads simultaneously.

### Option 2 (selected): Tiered buffer pool — 20 / 30 / 50 %

Reserve headroom proportional to workload criticality:

| Class | Examples | Buffer | SLO target | Rationale |
|---|---|---|---|---|
| **Batch** | Offline inference, eval suites, log reprocessing | 20 % | No hard SLO | Can queue; buffer is for graceful drain during node failure only |
| **Interactive** | Chat completions, embeddings, search, rerank | 30 % | p99 < 2 s | Absorbs traffic spikes without scaling-lag penalty |
| **Critical** | Auth, routing health, billing, alerting, MCP audit | 50 % | p99 < 500 ms | Survives single-node + AZ failure simultaneously |

Enforcement: Kubernetes `spec.resources.overhead` for static reservations plus `cluster-autoscaler` `scaleDownUnneededTime` policies that prevent scaling below the buffer threshold. The auto-scaler may borrow from the buffer during bursts but must restore it within 60 s (grace period).

### Option 3 (rejected): Dynamic buffer — ML-predicted headroom

Use a time-series model to predict near-term demand and adjust the buffer continuously (10–60 % range).

- **Pros**: Theoretically optimal resource utilisation; adapts to diurnal and event-driven patterns.
- **Cons**: Requires a training pipeline, feature store, online inference endpoint, and a feedback loop to correct prediction drift. Adds ~3 person-months to implement and introduces a new failure domain (model serving failures during capacity events). Opaque to operators during incidents.
- **Decision**: **Rejected** — appropriate for the Bifrost Tier-1 router (v8.1 track, B8–B9) but premature for the capacity headroom problem. The tiered buffer provides ~90 % of the benefit at ~10 % of the complexity.

## Decision

Adopt **Option 2: tiered buffer pool (20 / 30 / 50 %)**. The policy takes effect 2026-07-01, with a 30-day evaluation window before hardening into CI/CD admission gates. Override procedure: a workload may request a custom buffer level via an `infra-ops` ticket with justification and a documented expiry date.

## Consequences

### Positive

1. **Eliminates zero-buffer incident class.** The four incident patterns (INFRA-017/022/031/038) are structurally prevented — the scheduler will not allocate the last 20–50 % of capacity to new work. Future incidents in this class are classified as policy violations, not force-majeure.
2. **Proportional cost.** Batch workloads pay 20 % overhead instead of a flat 25 %; critical workloads get the 50 % safety margin they need without over-provisioning every pool to the highest common denominator.
3. **Operator clarity.** The three-tier model is intuitive and maps cleanly to existing workload classification labels (`workload-class: batch | interactive | critical`). Runbooks and dashboards align on the same vocabulary.

### Negative

1. **Up to 50 % static overhead for critical pools.** Critical pools are the smallest footprint (~10 % of total compute spend), so the absolute impact is bounded at < 5 % of total budget. Mitigation: reviewed quarterly. If a critical pool sustains < 40 % actual utilisation over a rolling 30-day window, the buffer drops to 40 %.
2. **Reduced bin-packing density** — the scheduler leaves capacity deliberately unused. Mitigation: the auto-scaler treats buffer capacity as a **soft reservation**. During bursts, pods may temporarily occupy buffer space. A reaper loop restores the buffer within 60 s of the burst subsiding. This prevents the buffer from becoming stranded idle capacity during off-peak hours.

### Risks

- **Policy drift.** Teams may request custom buffer overrides that collectively erode the safety margin. Mitigation: overrides require expiry dates and are aggregated into a quarterly report reviewed by infra-ops.
- **Grace-period abuse.** A sustained burst that continuously borrows from the buffer without restoring it defeats the policy. Mitigation: the 60 s grace timer is enforced by a validating webhook; workloads that exceed it for three consecutive periods are flagged in the capacity report.

## Implementation Plan

1. **Label audit and gap-fill.** Add `workload-class` label to every deployment, StatefulSet, and DaemonSet that lacks one. Default unlabelled workloads to `interactive`. Validate with a CI lint rule (`deny-unlabelled-workload-class` in `.github/linters/.spectral.yaml`). Owner: @infra-ops. Duration: 2 days.
2. **Scheduler enforcement.** Set `spec.resources.overhead` and `spec.topologySpreadConstraints` on all pools to enforce the per-class buffer floor. Wire into the cluster-autoscaler `scaleDownUnneededTime` (set to 10 min for batch, 5 min for interactive, 15 min for critical) to prevent premature scale-in that would consume the buffer. Owner: @sre. Duration: 3 days.
3. **Monitoring and alerting.** Three new Prometheus alerts fire when pool headroom dips below the buffer threshold: `HeadroomBufferBreach{critical}`, `HeadroomBufferBreach{interactive}`, `HeadroomBufferBreach{batch}`. Each alert includes the current utilisation %, buffer target, and the top-3 consuming workloads. PagerDuty routing: critical → P1, interactive → P2, batch → P3. Owner: @observability. Duration: 2 days.
4. **Policy codification.** Publish `docs/ops/CAPACITY_HEADROOM_POLICY.md` with the class table, override procedure, grace-period mechanics, and quarterly review cadence. Add policy-as-code checks in the CI pipeline (`opa eval` on resource manifests against a Rego rule set). Include the policy in the on-call onboarding runbook. Owner: @infra-ops. Duration: 1 day.
