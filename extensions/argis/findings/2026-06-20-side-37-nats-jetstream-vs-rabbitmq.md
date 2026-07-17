# SOTA — NATS JetStream vs RabbitMQ for Event Bus (side-37)

**Date:** 2026-06-20 11:18 UTC
**Task ID:** side-37
**Agent:** v11-batch-C
**Verdict:** **Defer** — RabbitMQ wins the head-to-head for `phenotype-bus` today (lower ops burden, AMQP-0-9-1 fit for our consumer count); revisit NATS JetStream if/when we need at-least-once + replay for 50+ consumers or want to fold messaging into K8s-native deployment.

## What each is (2026-06)
- **RabbitMQ 3.13+** — classic AMQP broker. Quorum queues are now the default for HA (replaced mirrored queues). Streams (RabbitMQ Streams, GA in 3.9) give append-only log semantics with replay. Operators manage via `rabbitmqctl` + the management plugin.
- **NATS JetStream** — JetStream is the persistence layer over NATS 2.x. File/streaming storage, subject-based addressing, ack/nak semantics, replay by sequence or timestamp. Operators manage via `nats` CLI; clustering is built into the server.

Both are mature. The differences that matter for `phenotype-bus` are operational footprint, consumer model, and replay semantics.

## Fleet relevance (2026-06-20)
- `phenotype-bus` — Rust topic pub-sub substrate. Currently in-process `tokio::mpsc`. ADR-035B consolidates three polyglot event substrates (`pheno-events`, `phenotype-bus`, `phenotype-hub`); the inter-service transport choice is the open question this finding answers.
- `phenotype-events` — durable event store; pairs with the bus as a sink.
- `pheno-otel` / `pheno-tracing` — observability sidecars. If we ever export OTLP over a fleet-internal bus instead of HTTP/2 to a collector, both brokers fit.
- Consumer count today: ~5 services in the fleet (gateway, registry, events store, otel collector, observability). Projected at 71-pillar maturity: 10–15. Either broker handles this fine.

## Head-to-head for our shape

| Dimension | RabbitMQ 3.13 | NATS JetStream | Winner |
|---|---|---|---|
| Ops burden | Erlang VM, ~30 tuning knobs, quorum queues need explicit config | Go binary, ~10 knobs, JetStream enabled by default | NATS |
| Consumer model | Push (basic.consume) + quorum replication | Push (pull subscribe available too) + stream replication | tie |
| Replay | Streams give replay; classic queues do not | First-class via sequence/timestamp | NATS |
| Multi-tenancy | vhosts, per-vhost ACLs | accounts + scoped signing keys | NATS |
| Polyglot clients | amqp libs in every language | nats.rs, nats.go, nats.py — all official | tie |
| Memory footprint (idle) | ~200 MB baseline | ~30 MB baseline | NATS |
| Throughput ceiling | ~50k msg/s single node (streams higher) | ~10–15M msg/s single node | NATS |
| HA story | quorum queues (Raft) + shovel/federation | native clustering (Raft-ish gossip) | tie |
| On-call expertise in fleet | none (greenfield) | none (greenfield) | tie |

The decisive column for **today**: both are greenfield for the fleet, but RabbitMQ's mental model (queue-per-consumer-group, durable exchange) maps cleanly to our current `phenotype-bus::Topic` API. NATS's mental model (subjects, streams, consumers as separate objects) is more powerful but requires more upfront design work — and the gain (replay, multi-tenancy) is not load-bearing at our consumer count.

## Recommendation
Defer NATS JetStream. Adopt RabbitMQ 3.13 (quorum queues + Streams) for `phenotype-bus`'s first inter-service transport. Concrete plan:
1. `phenotype-bus` exposes `BrokerPort` trait (per ADR-014 + ADR-038); initial `AmqpBrokerAdapter` impl uses `lapin` (Rust AMQP 0.9.1 client).
2. Streams are added only when a concrete consumer (likely `phenotype-events`) needs replay.
3. Re-evaluation trigger: consumer count crosses 50, or we need at-least-once + replay for `phenotype-events` sinks.

NATS stays in the back pocket; this finding does not close it out, just deprioritizes.

**Refs:** ADR-035B (event-bus substrate consolidation), ADR-014/038 (port-adapter L4 policy), `phenotype-bus` design notes (2026-06-15), `lapin` crate, RabbitMQ 3.13 release notes §Quorum Queues, NATS JetStream docs (2026-06).