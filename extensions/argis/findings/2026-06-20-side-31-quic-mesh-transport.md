# SOTA — QUIC for Inter-Service Mesh Transport (side-31)

**Date:** 2026-06-20 09:30 UTC
**Task ID:** side-31
**Agent:** orch-v11-real-research-2
**Verdict:** Not a near-term fit for phenotype-bus; defer until concrete latency / multi-stream fanout requirement emerges.

## What it is
QUIC (RFC 9000) is a UDP-based transport that gives TLS-1.3, multiplexed streams, and 0-RTT handshakes in one protocol. In Rust the dominant library is `quinn` (v0.11.x line) wrapping `quiche`. `quinn` provides connection and stream APIs, plus `h3` crate for HTTP/3 if needed.

## Fleet relevance (2026-06-20)
- `phenotype-bus` — topic pub-sub substrate. Currently uses `tokio::mpsc` for in-process fanout; no inter-service transport defined yet.
- `phenotype-events` — durable event store; planned to use `tokio-rusqlite` or `sqlx` with HTTP-mediated consumer registration.
- `pheno-otel` / `pheno-tracing` — currently use OTLP over gRPC (HTTP/2) for trace export to a collector sidecar.

The only place we already cross the process boundary is OTLP export. There is no inter-service mesh transport inside the fleet today — services run as separate processes and talk via the bus substrate over loopback TCP/gRPC. Going QUIC would mean introducing a new transport at a layer where we do not yet need one.

## When QUIC would become attractive
- 5+ services fan-out to 5+ consumers, where each connection currently opens 1 TCP+1 TLS handshake per consumer. QUIC 0-RTT and connection migration would shave meaningful cold-start latency.
- Mobile/edge consumers that switch networks (QUIC connection IDs survive NAT rebind) and a service that is otherwise forced to reconnect.
- H2 gRPC head-of-line blocking becomes a measurable tail-latency contributor (>1% p99 budget at high concurrency). QUIC stream multiplexing removes the cross-stream HOL.

For the current Phenotype fleet — desktop CLI + a few pheno* Rust services + a small number of observability sidecars — none of these thresholds are hit. gRPC over HTTP/2 covers it.

## Recommendation
Defer. Open a re-evaluation note in the registry pointing at this finding so the next person who hits HOL blocking or 0-RTT cost can pick it up. Target library when revisited: `quinn 0.11+` (mature, has connection-migration), with `h3` if we also want HTTP/3 on the same port.

**Refs:** `phenotype-bus` design notes (2026-06-15), `pheno-port-adapter` transport trait, `pheno-otel` OTLP exporter.
