# Rust Port Research — OmniRoute Compute Engine Extraction

> **Date**: 2026-07-31
> **Status**: Feasibility study (research only, no code written yet)
> **Author**: Egor (fork `Egorich-print/OmniRoute`, branch `feat/personal-build`)
> **Reviewer feedback**: ChatGPT architecture review incorporated below

## TL;DR

OmniRoute's latency-critical path is the **CPU-bound deterministic compression + tokenization layer** — not the backend plumbing. Port these pure algorithms to a **standalone Rust library** (`compression-core`) with a thin N-API binding as the primary integration path. Ship in this order: **tiktoken → ionizer → headroom → caveman → RTK** (RTK last — thousands of rules, highest risk). Golden-test JS↔Rust byte-in-byte before replacing anything.

Target: an independent OSS crate (`ai-compression-engine` / `context-engine`) usable by OmniRoute, OpenCode, Cline, Roo, and any AI proxy — not `omniroute-rust`.

---

## 1. Measured Baseline

Benchmark on the dev Mac (2026-07-31):

| Operation | Input | Cost | Notes |
|---|---|---|---|
| `countTextTokens()` — js-tiktoken `cl100k_base` | 230K chars (~57K tokens) | **37.9 ms/count** | Runs per chat request |
| Rust `tiktoken-rs` (est.) | same | ~1-3 ms | 10-30x faster |

The token counter runs on **every** chat request. Compression runs per-request when the conversation exceeds budget.

## 2. Hot Path Map (chat streaming request)

All operations below are synchronous and block the Node event loop.

| # | Operation | File:Line | CPU | Freq | Rust portability |
|---|---|---|---|---|---|
| 1 | SSE chunk JSON parse/stringify | `open-sse/utils/stream.ts:2391` | Expensive | per-chunk | High (serde) |
| 2 | Tiktoken token counting | `src/shared/utils/tiktokenCounter.ts:54` | Moderate | per-req | **High** |
| 3 | RTK compression (regex/line filtering) | `open-sse/services/compression/engines/rtk/index.ts:525` | Expensive | per-req | **High** |
| 4 | Headroom tabular compaction | `open-sse/services/compression/engines/headroom/index.ts:114` | Moderate | per-req | High |
| 5 | Request format translation | `open-sse/translator/registry.ts:23` | Moderate | per-req | Moderate |
| 6 | SQLite usage persistence | `src/lib/usage/usageHistory.ts:675` | Moderate | per-req | Low (DB coupling) |
| 7 | PII sanitization (SSE transform) | `open-sse/handlers/chatCore/streamingPipeline.ts:91` | Moderate | per-chunk | High (regex) |
| 8 | Memory/skills injection (context merge) | `open-sse/handlers/chatCore.ts:1065` | Cheap | per-req | Moderate |
| 9 | Idempotency/request hashing | `open-sse/handlers/chatCore.ts:608` | Cheap | per-req | High (crypto) |
| 10 | Usage estimation (fallback counting) | `open-sse/utils/usageTracking.ts:560` | Cheap | per-chunk | High |

**Where time goes (estimate):** network wait ≫ CPU (compression + tiktoken) > DB > per-chunk overhead.

## 3. Compression Engine Profiles

### Tiktoken counter — `src/shared/utils/tiktokenCounter.ts` (62 LOC + lib)
- Library: **js-tiktoken** v1.0.21 — pure JS port of tiktoken, no WASM.
- Mechanism: pre-computed BPE rank tables shipped as base64 binary blobs (~6 MB across 6 rank files); byte-pair merge on `TextEncoder` UTF-8 byte arrays.
- Encodings used: `cl100k_base` (default), `o200k_base` (Codex).
- Node deps: `TextEncoder`/`TextDecoder` (built-ins), `base64-js`.
- **Verdict**: pure deterministic BPE → ideal Rust port (`tiktoken-rs` supports cl100k + o200k natively).

### RTK — `open-sse/services/compression/engines/rtk/` (20 files, ~4000 LOC)
- `index.ts` 706, `commandDetector.ts` 482, `filterLoader.ts` 332, `tomlCompatibility.ts` 334, `learn.ts` 290, `lineFilter.ts` + more.
- Deterministic rule engine: regex-based line classification, keep-patterns for code blocks/JSON, folding/merging rules, tool-call-aware filtering (bash vs non-shell tools).
- Called per-request on the whole messages array; **sync** (no awaits in the core).
- **Verdict**: port last. High effort, high risk — but regex crate gives linear-time matching (no backtracking blowups) and output equivalence is testable via golden tests.

### Headroom — `engines/headroom/` (~550 LOC)
- "Tabular compaction": replaces array-of-objects message content with compact columnar blocks (```gcf-generic ... ```). Lossless, conservative (only when strictly smaller), never touches system messages.
- **Verdict**: pure deterministic, port after ionizer.

### Ionizer — `engines/ionizer/` (124 + 205 LOC)
- Lossy statistical sampling of oversized homogeneous JSON arrays: keeps schema + error rows + first/last rows + seeded uniform middle sample.
- Deterministic: FNV-1a hash + mulberry32 PRNG (no Math.random).
- **Verdict**: trivial port, nearly zero risk — do second.

### Caveman — `engines/cavemanAdapter.ts` + `caveman.ts` (~250 LOC)
- Regex rule-based compaction for `standard` mode.
- **Verdict**: port after headroom.

### Other engines (not first-wave)
- `relevance/` — keyword scoring (no embeddings/network).
- `session-dedup/` — dedupe via hash, per-request.
- `llm/`, `llmlingua/` — **LLM-dependent (network)**, opt-in, NOT portable to pure CPU core.
- `ccr/` (Content-Addressable Recovery) — stores full original for reconstruction.

## 4. Orchestrator

- Entry points: `applyCompression` (sync) / `applyCompressionAsync` (async) — `open-sse/services/compression/strategySelector.ts:255` / `:459`.
- Exported via `open-sse/services/compression/index.ts:86-91`.
- Mode dispatch: `off | rtk | codex-responses | omniglyph | lite | stacked | standard | aggressive | ultra`.
- `stacked` mode runs engines sequentially by `stackPriority` (rtk=10, ionizer=13, headroom=15, ...).
- Called from `chatCore.ts` via dynamic `import()`; sync CPU-bound → blocks event loop.
- **Verdict**: single pure function `(messages, budget, config) → (messages, metrics)` — clean extraction surface for a Rust core.

## 5. Architecture Decision (revised per ChatGPT review)

### Recommendation: Rust library + thin N-API binding (NOT sidecar-first)

```
crates/
  compression-core/     ← pure algorithms, no I/O, no OmniRoute knowledge
    src/
      tiktoken/         (cl100k_base, o200k_base)
      ionizer/
      headroom/
      caveman/
      rtk/              (last)
  napi/                 ← N-API binding (primary integration path, in-process)
  sidecar/              ← optional HTTP/Unix-socket server over the same core
  cli/                  ← CLI harness (bench, golden tests)
```

**Why N-API first (vs Unix-socket sidecar):**
- Every sidecar call pays serialize→socket→deserialize→compute→serialize→deserialize.
- For a 2 ms token count, IPC overhead becomes a large fraction of the call.
- N-API is in-process: zero serialization on the hot path, no process management.
- Keep sidecar only if process isolation / multi-language integration is actually needed.

**Wire format if sidecar is later added:** `bincode` / `postcard` / MessagePack — NOT JSON. Messages are large; JSON round-trip is wasted work.

### Independence from OmniRoute

Make it a **standalone OSS project**: `ai-compression-engine` or `context-engine`.

```rust
// core API surface
pub fn compress(messages: &[Message], config: &CompressionConfig) -> CompressionResult;
pub fn count_tokens(encoding: Encoding, text: &str) -> u64;
```

No OmniRoute imports anywhere in `compression-core`. Consumers: OmniRoute, OpenCode, Cline, Roo, any AI proxy.

## 6. Phased Roadmap (revised)

| Phase | Work | Effort | Risk |
|---|---|---|---|
| 0 | Baseline benchmark (latency, event-loop blocking, compression %) | 1 day | — |
| 1 | Extract `compression-core` crate + port **tiktoken**, golden tests | 2-3 days | Minimal |
| 2 | Port **ionizer** | 1-2 days | Nearly zero |
| 3 | Port **headroom** | 2-3 days | Low |
| 4 | Port **caveman** | 2 days | Low |
| 5 | Port **RTK** (biggest, do when harness proven) | 5-7 days | High |
| 6 | N-API binding as primary path; feature-flag integration with fallback to JS | 2-3 days | Low |
| 7 | Optional sidecar (isolation/multi-lang) | 2 days | Low |
| 8 | **Second wave**: SSE parser + OpenAI/Claude/Gemini translators (per-chunk hot path) | TBD | High |

**Total to full compression replacement: ~2-3 weeks.** First measurable win (tiktoken): 2-3 days.

## 6a. Definition of Done (added per review)

| Phase | DoD |
|---|---|
| Tokenizer (tiktoken) | Full match with JS on golden tests (0% divergence, byte-in-byte); benchmark < 5 ms per 57K tokens |
| Ionizer | Output matches JS; no perf regression (or ≥ 10x speedup) |
| Headroom | Identical compression result (same % savings, same columnar blocks) |
| RTK | Byte-in-byte equivalence on full dialogue set (500 fixtures); unit tests on rule patterns |
| Integration (N-API) | JS↔Rust switch via one setting/env; JS fallback when unavailable; zero risk to current deployment |
| Translation primitives (wave 2) | Byte-in-byte SSE chunk equivalence before/after; no TTFB increase |

Progress is measurable per phase and each phase is independently verifiable.

## 7. Golden Testing (mandatory)

```
fixtures/
  conversation1.json
  ...
  conversation500.json

JS  run → output_a.json
Rust run → output_b.json
assert_eq(output_a, output_b)   // byte-in-byte, 100% required
```

- Until 100% match, **do not** switch the runtime to Rust.
- This makes even the RTK rewrite safe.
- Also validates tiktoken rank tables (JS vs `tiktoken-rs`) on 100+ varied texts.

## 8. Fallback Strategy (for OmniRoute integration)

- New env: `OMNIROUTE_COMPRESSION_SIDECAR` (optional, off by default) or N-API availability check.
- Node code stays untouched; a client wrapper (`src/lib/compression-rust/`) tries Rust → falls back to existing JS path (`applyRtkCompression`, `applyCompression`).
- Zero risk to the current deployment.

## 9. Deferred / Stay-in-JS

- Dashboard (Next.js App Router, ~200 pages) — never ported.
- Skills, memory, MCP, guardrail management, quotas, combo config — not latency-critical.
- `llm`/`llmlingua` compression engines — network/LLM-dependent, stay in JS.
- SQLite usage persistence — DB-coupled, stays.

## 10. Risks

| Risk | Mitigation |
|---|---|
| JS↔Rust behavioral divergence | Golden tests (500 fixtures, byte-in-byte) |
| RTK `tomlCompatibility.ts` / `learn.ts` / `filterLoader.ts` | Port whole submodules (deterministic); rules format 1:1 |
| Rust toolchain on LXC 106 (aarch64?) | Check `rustup`/`cargo`; multi-stage Docker build or cross-compile on Mac |
| N-API ABI mismatch (Node 26) | Use `napi-rs` (prebuilt binaries, Node-version tolerant) |
| Sidecar JSON overhead | bincode/postcard if sidecar is adopted |

## 11. Open Questions

1. Cargo/rustup present on LXC 106, or cross-compile from Mac?
2. Confirm N-API as primary integration path (vs sidecar)?
3. Want the baseline benchmark included in the roadmap before porting?
4. Repo home for `compression-core`: new repo (`ai-compression-engine`) or `crates/` inside OmniRoute fork first?
