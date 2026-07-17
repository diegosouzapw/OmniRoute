# SOTA — CRDT for Multi-Device State Sync (side-21)

**Date:** 2026-06-20 10:40 UTC
**Task ID:** side-21
**Agent:** orch-v11-real-research-8
**Verdict:** Defer. No current fleet use case; revisit when phenotype-journeys adds multi-device.

## What CRDTs are
Conflict-free Replicated Data Types are data structures designed for multi-party concurrent editing without coordination. Implementations:
- **Yrs (Yjs port)** — JS-native, mature, has bindings to `y-sweet` for sync
- **Automerge** — JSON-shaped CRDT, slower than Yrs but simpler mental model
- **Diamond Types** — Rust-native, text-focused, very fast on large docs
- **Loro** — Rust + WASM, newer, supports rich types beyond text

## Fleet relevance (2026-06-20)
The only "multi-device state" question in the current fleet is `phenotype-journeys` — does a session started on a phone need to be resumable on a laptop? Today the answer is "no, single-device at a time" and the user manually re-authenticates. There is no `phenotype-journeys` device-sync layer.

If/when that need emerges, the right library is Yrs (with a Yjs frontend binding) or Loro (if we want a pure-Rust backend with WASM-friendly frontend). Both have active maintainers and 2+ years of production hardening.

## When CRDTs become attractive
- Two devices edit the same document offline, then reconnect and expect a merged result (Yrs excels here)
- A peer-to-peer mesh where no central server arbitrates order (Automerge is canonical)
- "Operational transform" feel for a multi-user real-time editing surface

None of these needs is in the current fleet. phenotype-journeys is sequential; phenotype-hub event-sourcing already gives us a single linear source of truth.

## Recommendation
Defer. Open a re-evaluation note in the registry pointing at this finding. Target library when revisited: Yrs (`y-crdt` Rust crate) for the backend with `yjs` on the frontend, or Loro if we want pure-Rust end-to-end.

**Refs:** `phenotype-journeys` (single-device session model today), `phenotype-hub` (event-sourcing is the current multi-party coordination layer).
