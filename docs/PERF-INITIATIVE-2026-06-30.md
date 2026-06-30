# ORG-WIDE PERFORMANCE OPTIMIZATION INITIATIVE (2026-06-30)

**Status**: Plan — equips implementers to execute profiling + optimization waves in priority order.

**Goal**: Apply the profile→optimize mandate across all perf-critical Phenotype projects, ranked by leverage (impact on agent-packing-density × memory × wall-clock) and effort. Build a reusable profiling harness so results are comparable across repos.

---

## EXECUTIVE SUMMARY

### Ranked Perf-Critical Projects (by leverage)

| Rank | Project | Language(s) | 3-Regime Primary | Key Hot Paths | Leverage | Effort | Status |
|------|---------|-------------|------------------|---------------|----------|--------|--------|
| **1** | **OmniRoute** | TS/Node | scaled-parallel | request routing, combo decision, cache lookup, translator, executor dispatch | **9.2/10** | medium | hot-path instrumented, needs profile wave |
| **2** | **substrate** | Rust | scaled-parallel | dispatch planner, engine routing, task claim protocol, event store | **8.8/10** | low | pure hexagonal, Zig-eligible for dispatch kernel |
| **3** | **sharecli** | Rust | accumulated (daemon) | process lifecycle, build contention, memory tracking | **8.1/10** | low | sidecar hypervisor, memory-critical for fleet packing |
| **4** | **thegent** | Python/Rust | individual-CPU | LLM reasoning loops, context assembly, schema validation | **7.5/10** | medium | Python hot-paths candidates for Zig rewrite |
| **5** | **SessionLedger** | Rust | accumulated (session) | compression (zstd), FTS5 index, distill FSM, memory flushes | **7.2/10** | medium | I/O-heavy, arena alloc + jemalloc candidates |
| **6** | **Eidolon** | Python + JS/TS | individual-CPU | schema validation, binding compilation, skill dispatch | **6.8/10** | medium | Eidolon-to-core bottlenecks, type-check heavy |
| **7** | **phenodag** | Go | scaled-parallel | atomic claim protocol, DAG topo sort, lease lease heartbeat | **6.5/10** | low | Go stdlib optimizations, io_uring consider |
| **8** | **MelosViz** | Rust/wgpu | individual-GPU | scene rendering, MIR compilation, conductor topo-sort | **5.4/10** | low | wgpu already fast, MIR tuning only |

### 3-Regime Framework

| Regime | Use Cases | Example Projects | Profile Tools | Expected Win |
|--------|-----------|------------------|----------------|--------------|
| **Individual-CPU** | Single-task latency, model inference, schema validation | thegent (LLM loops), Eidolon (schema), MelosViz (MIR) | samply/cargo-flamegraph, cProfile (py), perf-record | 1–3x via call-tree elimination, inlining, memory layout |
| **Accumulated-Memory** | Long-running daemons, session distillation, memory leaks | sharecli (process lifetime), SessionLedger (FTS5), OmniRoute (cache) | heaptrack, valgrind-massif, jemalloc prof | 2–5x via allocator tuning, arena lifetime, GC-free paths |
| **Scaled-Parallel** | Request routing, multi-engine dispatch, fleet scheduling | OmniRoute (17 combo strategies), substrate (dispatch), phenodag (DAG) | perf-record (flame graphs), tracing-flame, distributed tracing | 1.5–4x via lock-free, batching, routing optimization |

### Exotic-Tech Candidates (by bottleneck)

| Bottleneck | Current | Candidate | Project | Rationale |
|------------|---------|-----------|---------|-----------|
| **Syscall overhead** (process spawn, file I/O) | Rust std | **Zig** (direct libc bindings) | substrate, sharecli | Zig removes rustlib indirection; ~5–15% spawn latency cut |
| **Allocator churn** (session memory) | default arena | **jemalloc** + **mimalloc** | SessionLedger, OmniRoute cache | 10–20% memory savings + latency variance reduction |
| **Lock contention** (fleet dispatch) | `Arc<Mutex>` | **lock-free queues** (crossbeam, parking_lot) | substrate, phenodag, sharecli | 2–5× throughput; empirical win = claim protocol bottleneck |
| **I/O batching** (DAG traversal, file sync) | single-threaded poll | **io_uring** (Linux) / **kqueue** (macOS) | phenodag, SessionLedger | 1.5–3× I/O throughput under high concurrency |
| **Numeric hot loops** (LLM context, tokenization) | Python/TS | **Mojo** (subset) / **Zig** (full rewrite) | thegent, OmniRoute | 10–30× on tight loops; integration cost high |
| **Memory layout** (cache efficiency) | generic allocators | **arena allocation** | sharecli lifetime, SessionLedger session | 10–20% latency; minimal code churn |

---

## PART 1: PERF-CRITICAL INVENTORY

### 1.1 **OmniRoute** (TS/Node — multi-regime hot path)

**Scope**: Unified AI proxy, 231 providers, 1.5K RPS in production (2026-06-18).

**Hot Paths**:
1. **Request routing** (`src/app/api/v1/chat/completions`): Zod validation → auth → policy check → `handleChatCore()` → combo decision → upstream dispatch. **P50 budget 400ms, critical at scale.**
2. **Combo routing** (`open-sse/services/combo.ts`): 17 strategies (priority, weighted, fusion, context-relay). **Fusion fans out to N models in parallel, judge synthesizes. Hot on 80% of requests.**
3. **Cache lookup** (`open-sse/services/cache.ts`): Redis/SQLite two-tier, MD5 hash key generation. **Cache hit cuts latency 60–80%.**
4. **Translator** (`open-sse/translator/`): OpenAI ↔ Claude ↔ Gemini ↔ custom formats. **Deep object traversal, allocations per request.**
5. **Executor dispatch** (`open-sse/executors/`): HTTP fetch + retry logic, backoff. **Upstream variance dominates but executor queuing measurable at scale.**

**Primary Regime**: scaled-parallel (routing + combo decision).  
**Secondary**: accumulated-memory (cache bloat under high volume).

**Instrumentation Status**: ✅ Partial. `docs/PERF_BUDGETS.md` define p50/p95/p99 targets. No active flame-graph baseline yet.

**Candidates**:
- **Combo strategy dispatch**: 17 strategies routed by enum + closure. Switch statement or table-driven dispatch? Benchmark `auto` strategy scoring (9-factor).
- **Cache key generation**: MD5 per request. Prefetch hash? Incremental computation?
- **Translator field mapping**: Object.assign + nested clones. Memory pool or generator patterns?
- **Connection pooling**: HTTP agent reuse. Node.js keepalive tuning (TCP_NODELAY, backpressure)?

**Profiling Hooks**:
- **k6 load test** (`benches/perf-gate.k6.js`): Generate load; measure p50/p95/p99 per endpoint. Integrate into pre-commit.
- **Node.js --prof + isolated-vm** for flamegraphs.
- **Clinic.js**: production APM drop-in, zero-cost when disabled.

---

### 1.2 **substrate** (Rust — dispatch orchestration spine)

**Scope**: Hexagonal dispatch core. Dogfooded CLI binary, 3 driver faces (CLI/HTTP/MCP), 6 engine adapters (forge/codex/claude/agentapi/kilo/cursor).

**Hot Paths**:
1. **Dispatch planner** (`substrate-app/src/dispatch_planner.rs`): `DispatchPlan` selection — engine capability match, session mode routing, argv assembly. **O(engines × models) per plan; must sub-ms.**
2. **Engine routing** (`routing_port` in `substrate-core`): round-robin / weighted / P2C. Per-target circuit breaker (Closed/Open/HalfOpen). **Lock contention if shared Arc<Mutex>.**
3. **Task claim protocol** (`store-sqlite`, claim transaction): `BEGIN IMMEDIATE; INSERT OR IGNORE (repo, branch, worktree); COMMIT`. **Atomic; contention under 50+ parallel agents.**
4. **Event store** (`substrate-core`, event sourcing): append-only per-aggregate log, global monotonic sequence. **SQLite write-ahead log overhead if not tuned.**

**Primary Regime**: scaled-parallel (dispatch + routing).

**Instrumentation Status**: ✅ None. Clean architecture, no perf hooks yet. Benchmark suite exists but not integrated into dev.

**Candidates**:
- **Claim protocol**: Zig rewrite of SQLite wrapper? Direct syscall module (lseek, fsync, mmap). Win: 10–20% latency variance under contention.
- **Dispatch planner**: O(engines) loop + nested Vec::iter. SIMD or hot-loop inlining? Benchmarked dispatch-plan generation time?
- **Event store monotonic sequence**: SQLite `INSERT ... RETURNING`. Batch allocate? Reuse `Id` pool?
- **Routing table lock**: `Arc<Mutex<DashMap>>` or lock-free `parking_lot::RwLock` + `dashmap` crate?

**Profiling Hooks**:
- **Criterion.rs** for micro-benchmarks: dispatch-planner, claim latency, routing table insert.
- **perf-record flamegraph**: capture 10K dispatch calls.
- **cargo-flamegraph**: `substrate dispatch --benchmark N` synthetic load.

---

### 1.3 **sharecli** (Rust — process control-plane sidecar)

**Scope**: Shared CLI hypervisor. Manages agent build contention, process lifecycle, memory tracking. **Critical for fleet packing density: every 1% memory saved = 1 more parallel agent.**

**Hot Paths**:
1. **Process spawn + group management** (`runtime-process` via substrate): fork, enter process group, spawn child in group. **Bottleneck: IPC + wait-with-timeout.**
2. **Build contention detector** (`sharecli` daemon): poll `cargo check`, `rust-analyzer`, `git` memory usage every 500ms. Throttle if >80% memory. **Must be low-overhead to not add contention itself.**
3. **Memory accounting** (`sysinfo` crate): per-process RSS + shared-page walk. Aggregate across fleet. **O(process count); under 50 agents = 50 polls per tick.**
4. **IPC to scheduler** (tokio channels): send build-done event, recv throttle signal. **Lock-free channels; but serialization overhead?**

**Primary Regime**: accumulated-memory (daemon lifetime) + scaled-parallel (contention polling).

**Instrumentation Status**: ❌ None. No profiling harness.

**Candidates**:
- **Process memory sampling**: `sysinfo` allocates on each poll. Cache pagemap entries? Use `/proc/[pid]/status` directly (Linux-only)?
- **Contention threshold**: Hardcoded 80%. Adaptive threshold based on agent queue depth?
- **IPC serialization**: JSON → bincode or postcard for faster IPC?
- **Memory pool for poll results**: Reuse `Vec<ProcessMetrics>` across ticks instead of alloc-free each time.

**Profiling Hooks**:
- **heaptrack**: `sharecli daemon` for 10 min with 50-agent steady-state workload. Identify allocator churn.
- **valgrind --tool=callgrind**: contention detector loop overhead.
- **Custom timing macro**: `#[trace_duration("memory_poll")]` on critical sections.

---

### 1.4 **thegent** (Python/Rust — agent reasoning + dispatch)

**Scope**: Agent orchestrator. Handles LLM reasoning loops, context assembly, skill dispatch. Hybrid: Python for high-level orchestration, Rust for hot loops (compression, tokenization, schema validation).

**Hot Paths**:
1. **LLM reasoning loop** (`thegent/core/reasoning.py`): token generation → context assembly → skill invocation → state update. **Innermost loop; O(tokens) per inference.**
2. **Context assembly** (`thegent/core/context.py`): merge system + conversation + memory + skill results. Deep copy overhead. **O(context-tokens); on every inference.**
3. **Schema validation** (Pydantic + custom validators): bind skill input/output schemas, validate types. **Per-skill invocation; can be slow on large schemas.**
4. **Tokenization** (tiktoken via subprocess): token count estimation. **Subprocess overhead; single-threaded bottleneck?**

**Primary Regime**: individual-CPU (reasoning loops).

**Instrumentation Status**: ⚠️ Partial. No production tracing yet. Unit tests exist.

**Candidates**:
- **LLM loop**: Move inner token-processing to Rust + FFI? Or use Mojo subset for numeric ops?
- **Context assembly**: Implement copy-on-write or structural sharing? Or pre-allocate context buffer?
- **Schema validation**: Use `pydantic v2` TypeAdapter + precompiled validators. Cache compiled schemas?
- **Tokenization**: Batch token-count calls? Or embed cl100k_base directly in Rust?

**Profiling Hooks**:
- **cProfile + Snakeviz**: capture 100 reasoning steps, visualize call graph.
- **py-spy**: sample at 100 Hz during 1000-step run. Identify hottest functions.
- **memory_profiler**: per-line memory usage in context_assembly and reasoning_loop.

---

### 1.5 **SessionLedger** (Rust — session distillation + observability)

**Scope**: Session ledger + memory distillation. Compiles agent sessions into OKF-style observability, produces lossless continuation bundles.

**Hot Paths**:
1. **Compression** (`distill/compress.rs`, zstd): session events → binary blob. **Compresses ~95%; trade-off between ratio and speed.**
2. **FTS5 indexing** (`src/lib/db/session_store.rs`): tokenize session text, build full-text search index. **O(session-words); 100K-word session = seconds.**
3. **Distill FSM** (`domain/distill.rs`): parse session events, extract intent, build continuation bundle. **State machine + pattern matching; O(events).**
4. **Memory flushing** (`ports::MemoryStore` write): write short-term + long-term memory to Qdrant + FTS5. **I/O-bound; batching opportunity?**

**Primary Regime**: accumulated-memory (session lifetime).

**Instrumentation Status**: ❌ None. New project (P1/P2 in flight).

**Candidates**:
- **Compression trade-off**: Profile zstd levels (1–22). Find P95 latency sweet spot. Use parallel compressor?
- **FTS5 indexing**: Batch inserts? Use `INSERT ... BULK` or transaction batching?
- **Memory store writes**: Batch Qdrant + FTS5 writes in one transaction. Reduce round-trip latency.
- **Allocator**: jemalloc over default? Profile with heaptrack.

**Profiling Hooks**:
- **cargo-flamegraph**: compress + index + distill a 100K-word session.
- **heaptrack**: capture memory growth across 1000 sessions.
- **Custom benches in `benches/`**: zstd level trade-off, FTS5 insert batching.

---

### 1.6 **Eidolon** (Python + TS — schema binding + skill dispatch)

**Scope**: Agent framework. Handles schema validation, skill binding, request dispatch. Hybrid: Python async runtime, TS UI.

**Hot Paths**:
1. **Schema compilation** (`eidolon/schema/compiler.py`): Pydantic model → OpenAPI schema. **Recursive type resolution; O(schema-depth).**
2. **Skill dispatch** (`eidolon/core/dispatch.py`): match request to skill, validate input, invoke, validate output. **Per-request; O(skills).**
3. **Type binding** (Pydantic validators): resolve type unions, deserialize JSON → Python object. **Per-request.**

**Primary Regime**: individual-CPU (schema + binding).

**Instrumentation Status**: ⚠️ Partial. Some unit tests; no APM.

**Candidates**:
- **Schema compilation**: Cache compiled schemas? Incremental compilation?
- **Skill dispatch**: Use skill index/registry instead of linear search? Trie-based skill routing?
- **Type binding**: Pre-compile validator chains? Use orjson + custom deserializers for JSON parsing?

**Profiling Hooks**:
- **cProfile**: 1000 skill-dispatch calls. Identify top 3 hottest functions.
- **scalene**: profile with CPU + GPU + memory breakdowns (if GPU-backed validation exists).

---

### 1.7 **phenodag** (Go — atomic claim + DAG scheduler)

**Scope**: Fleet DAG orchestrator. Manages atomic repo-branch-worktree claims, DAG topo-sort, lease heartbeat.

**Hot Paths**:
1. **Atomic claim protocol** (`gh_repo_lease.go`): `INSERT OR IGNORE (repo, branch, worktree)` + 900s TTL + 60s heartbeat. **SQLite IMMEDIATE transaction contention.**
2. **DAG topo sort** (`dag.go`): topological order + ready-set maintenance. **O(V + E); 200-node DAG = milliseconds but called frequently.**
3. **Lease heartbeat** (`gh_repo_lease.go`, ticker): send UPDATE to extend TTL. **Every 60s per claim; scales with fleet size.**

**Primary Regime**: scaled-parallel (claim contention).

**Instrumentation Status**: ✅ Smoke test exists (`make smoke`). No benchmark harness.

**Candidates**:
- **Claim protocol**: Replace SQLite `INSERT OR IGNORE` with lock-free pattern? Benchmark contention at 100+ agents.
- **DAG topo sort**: Use Rayon (parallelism) if multi-repo? Or graphlib crate with memoization?
- **Lease update**: Batch heartbeat UPDATEs? Or move to more-efficient time-wheel for TTL tracking?

**Profiling Hooks**:
- **go test -bench**: claim latency under 1000 concurrent goroutines.
- **pprof CPU**: capture 10K claim operations; identify lock contention.
- **pprof heap**: memory overhead per claim entry.

---

### 1.8 **MelosViz** (Rust/wgpu — visual conductor)

**Scope**: Festival visualizer. Scene rendering (wgpu), MIR compilation, conductor topo-sort.

**Hot Paths**:
1. **Scene rendering** (wgpu): GPU draw calls, shader compilation. **Bound by GPU; CPU-side overhead = command encoding + buffer uploads.**
2. **MIR compilation** (`backend/mir.rs`): scene DSL → MIR bytecode. **Parser + codegen; O(scene-size).**
3. **Conductor topo sort** (`backend/conductor.rs`): scene dependencies. **O(V + E); recomputed per frame?**

**Primary Regime**: individual-GPU (rendering).

**Instrumentation Status**: ✅ wgpu already optimized. MIR tuning only.

**Candidates**:
- **MIR compilation**: Profile parser + codegen separately. Cache parsed AST?
- **Conductor topo sort**: Recompute only on scene change, not per frame. Use memoization?
- **GPU uploads**: Batch buffer uploads per frame. Use persistent mapping?

**Profiling Hooks**:
- **wgpu profiler**: GPU timing per draw call (wgpu-profiler crate).
- **cargo-flamegraph**: MIR compilation for 1000-node scene.
- **Custom timing**: encode time vs GPU submit time per frame.

---

## PART 2: PHASED PROFILING DAG

### Phase 1: Foundation (Week 1–2)
**Build reusable profiling harness, baseline substrate + sharecli.**

#### 1.1 Reusable Profiling Harness
**Deliverable**: `docs/PROFILING_HARNESS.md` + shared scripts in `scripts/profile/`.

**Contents**:
- **Regime-specific measurement approach**:
  - Individual-CPU: samply/cargo-flamegraph (Rust), py-spy (Python). Output: flamegraph SVG + call-tree CSV.
  - Accumulated-memory: heaptrack (Rust), memory_profiler (Python). Output: memory profile + allocator stats + diff.
  - Scaled-parallel: perf-record + flame-graph + tracing-flame. Output: flamegraph + contention heatmap.
- **Scorecard format**: JSON with fields:
  ```json
  {
    "repo": "substrate",
    "commit": "abc123",
    "regime": "scaled-parallel",
    "profile_date": "2026-06-30T12:00:00Z",
    "metrics": {
      "latency_p50_us": 145.2,
      "latency_p95_us": 412.5,
      "latency_p99_us": 1230.0,
      "memory_peak_mb": 42.3,
      "memory_avg_mb": 28.1,
      "contention_lock_ns": 18932,
      "throughput_ops_per_sec": 8392
    },
    "hottest_functions": [
      { "name": "dispatch_planner::select", "samples": 42123, "percent": 18.2 },
      ...
    ],
    "allocations_top5": [
      { "function": "plan_engine_routes", "bytes": 1024000, "count": 4200 },
      ...
    ],
    "notes": "Baseline before Zig rewrite; lock contention in routing_table."
  }
  ```
- **Comparison script**: `compare_profiles.py` — takes two scorecard JSONs, outputs deltas + % improvement.
- **Visualization**: gnuplot or matplotlib for latency trends across commits.

**Owner**: Senior profiler (1 agent, ~4 hours). Outputs scripts usable by all 8 projects.

#### 1.2 substrate + sharecli Baseline
**Substeps**:
- **substrate**: Criterion.rs micro-benchmarks (dispatch-planner, claim latency, routing).
  - Run `cargo bench --all`; export baseline scores to `benches/baseline-2026-06-30.json`.
- **sharecli**: heaptrack `sharecli daemon` under synthetic 50-agent load. Export allocation flamegraph.

**Owner**: Substrate lead (1 agent, ~2 hours).

---

### Phase 2: Individual-CPU Hotspots (Week 2–3)
**Profile thegent (Python), Eidolon (schema validation).**

#### 2.1 thegent Reasoning Loop Profile
- Capture cProfile + py-spy for 1000 reasoning steps.
- Identify top 10 hottest functions (% of runtime).
- Candidates: tokenization subprocess, context assembly deep-copy, schema validation.
- Recommendation: Zig or Mojo subset for tokenization? Or pure Python optimization (orjson + cache)?

**Owner**: thegent owner (1 agent, ~3 hours).

#### 2.2 Eidolon Schema Validation Profile
- cProfile for 1000 skill-dispatch calls.
- Identify schema compilation vs binding overhead.
- Recommendation: cache compiled schemas, trie-based skill routing.

**Owner**: Eidolon owner (1 agent, ~2 hours).

---

### Phase 3: Accumulated-Memory & Daemon Lifetimes (Week 3–4)
**Profile sharecli, SessionLedger.**

#### 3.1 sharecli Memory Profile
- heaptrack `sharecli daemon` under 50–100 agent concurrent load.
- Identify allocator hotspots (process polling, IPC serialization).
- Export memory timeline + top allocations.
- Recommendation: mempool for poll results, postcard serialization, jemalloc tuning.

**Owner**: sharecli/fleet owner (1 agent, ~3 hours).

#### 3.2 SessionLedger Compression + Indexing Profile
- cargo-flamegraph: compress + FTS5-index a 100K-word session.
- heaptrack: memory growth across 1000 sessions.
- zstd level trade-off: profile compression latency for levels 1–8 (fast) vs 15–22 (small).
- Recommendation: batch FTS5 inserts, adaptive zstd level, jemalloc.

**Owner**: SessionLedger owner (1 agent, ~3 hours).

---

### Phase 4: Scaled-Parallel Routing & Contention (Week 4–5)
**Profile OmniRoute, substrate dispatch, phenodag claim protocol.**

#### 4.1 OmniRoute Request Routing Profile
- Run k6 load test at 100–500 RPS. Capture p50/p95/p99 latency per endpoint.
- Flamegraph: identify combo-strategy dispatch bottleneck.
- Cache hit ratio analysis: validate cache reduces latency 60–80%.
- Recommendation: table-driven dispatch, memory pool for translator outputs, connection pooling tuning.

**Owner**: OmniRoute perf lead (1 agent, ~4 hours).

#### 4.2 substrate Dispatch Planner + Routing Lock Contention
- perf-record: 10K dispatch operations under 50-agent concurrent dispatch.
- Identify lock contention in routing_table.
- Compare Arc<Mutex> vs parking_lot::RwLock vs lock-free dashmap.
- Recommendation: Zig syscall wrapper for claim protocol; lock-free routing table; tune crossbeam channels.

**Owner**: substrate owner (1 agent, ~3 hours).

#### 4.3 phenodag Atomic Claim Contention
- go test -bench: claim latency under 100–1000 concurrent goroutines.
- pprof CPU: identify SQLite IMMEDIATE transaction bottleneck.
- Recommendation: lock-free claim pattern, time-wheel TTL, batch heartbeats.

**Owner**: phenodag owner (1 agent, ~2 hours).

---

### Phase 5: Exotic-Tech Integration (Week 5–6, concurrent with Phase 4)
**Zig rewrite candidates, allocator swaps, lock-free upgrades.**

#### 5.1 Zig Spike: substrate dispatch kernel
- Implement dispatch-planner select logic in Zig (syscall-direct, no rustlib overhead).
- Benchmark Zig vs Rust compiled binary: measure latency delta.
- If >10% win: plan full integration (Zig crate + FFI).
- Owner: Zig specialist (1 agent, ~4 hours).

#### 5.2 Allocator Tuning: SessionLedger + OmniRoute
- Swap default → jemalloc in SessionLedger Cargo.toml (feature flag).
- Profile heaptrack before/after jemalloc.
- If memory variance cuts 20%+: upstream to main.
- Owner: Performance engineer (1 agent, ~2 hours).

#### 5.3 Lock-Free Routing: substrate
- Replace Arc<Mutex<routing_table>> with dashmap (lock-free).
- Criterion benchmark: 10K inserts/lookups. Compare throughput.
- If >2× faster: integrate into main.
- Owner: Performance engineer (1 agent, ~2 hours).

---

### Phase 6: Cross-Project Infra + Release (Week 6+)
**Consolidate findings, upstream harness to shared location, plan cascade releases.**

#### 6.1 Harness Consolidation
- Move `scripts/profile/` → `phenotype-tooling/tooling/profiling/`.
- Document per-project profiling runbooks (k6 for OmniRoute, criterion for substrate, etc.).
- Add CI integration: optional `--profile` flag on PRs to capture baseline + delta.

#### 6.2 Findings Report
- Scorecard: per-project before/after latency/memory with % win.
- Hotspot summary: top 3 optimizations per project.
- Exotic-tech ROI: Zig integration cost vs latency gain; allocator tuning effort vs memory saved.

#### 6.3 Cascade Releases
- If substrate wins >5% latency: release v1.1.0 with optimizations.
- If sharecli wins >10% memory: release v0.2.0, upstream to phenofleet.
- Coordinate release timing: substrate first (dependencies), then downstream (OmniRoute, sharecli).

---

## PART 3: PER-PROJECT PROFILING RUNBOOKS

### substrate: Dispatch Planner + Routing

**Baseline Setup**:
```bash
cd substrate
cargo bench --bench dispatch_planner 2>&1 | tee baseline.log
cat baseline.log | grep -E "dispatch_select|dispatch_route" > baseline-scores.txt
```

**Contention Test** (50-agent concurrent dispatch):
```bash
# synthetic load: spawn 50 tokio tasks, each does 200 dispatch plans
cargo run --release --bin contention-test -- --agents 50 --iterations 200
# flamegraph: perf record -g, flamegraph-rs
perf record -g -o substrate.data ./target/release/contention-test --agents 50 --iterations 200
perf script substrate.data > substrate.perf
flamegraph.pl substrate.perf > substrate-flame.svg
```

**Output**: baseline scores, flame graph, top-3 hottest functions CSV.

---

### sharecli: Contention Detector + Memory Accounting

**Baseline Setup**:
```bash
# spawn daemon, observe memory + contention loop overhead
sharecli daemon &
DAEMON_PID=$!
sleep 5
heaptrack $DAEMON_PID
# generates heaptrack.sharecli.$DAEMON_PID.gz
# view with heaptrack_gui
```

**Synthetic Load** (simulate 50–100 agents building):
```bash
for i in {1..100}; do
  (cd /tmp/agent-$i && cargo check --quiet &)
done
# monitor sharecli daemon memory/CPU
# heaptrack output will show allocator churn + contention hotspots
```

**Output**: heaptrack flamegraph, memory timeline, top allocation sites.

---

### OmniRoute: Request Routing + Combo Decision

**Baseline Setup** (load test):
```bash
# k6 load test: 100 RPS, 60s duration, track p50/p95/p99
k6 run -e BASE_URL=http://localhost:20128 \
  -e LOAD=100 \
  -e DURATION=60s \
  benches/perf-gate.k6.js 2>&1 | tee k6.log
# extract results
grep -E "p\((50|95|99)\)" k6.log
```

**Flamegraph** (request handler):
```bash
# Node.js profiling: --prof generates isolate-*.log
node --prof src/app/api/v1/chat/completions-profile.js
node --prof-process isolate-*.log > profile.txt
# or use clinic.js: clinic.js doctor -l -- node src/app/api/v1/chat/completions-profile.js
```

**Output**: latency histogram (k6), flamegraph (clinic or --prof).

---

### SessionLedger: Compression + Indexing

**Baseline Setup**:
```bash
cd SessionLedger
# benchmark compression levels 1–8 (fast) vs 15–22 (small)
for level in 1 3 5 8 15 20 22; do
  cargo run --release --bin compress-bench -- --zstd-level $level >> compression-results.json
done
# results are latency + compression ratio per level
```

**Flamegraph** (100K-word session):
```bash
cargo flamegraph --bin compress-bench -- --zstd-level 8 --session-size 100k
# output: flamegraph.svg showing compress + FTS5-index breakdown
```

**Heaptrack** (1000 sessions):
```bash
heaptrack cargo run --release --bin session-batch -- --count 1000 --output-dir /tmp/sessions
# output: heap timeline, top allocations
```

**Output**: compression level trade-off chart, flamegraph, heaptrack results.

---

## PART 4: CROSS-PROJECT DEPENDENCIES & SEQUENCING

### Dependency DAG

```
Foundation (Phase 1)
├─ Harness (scripts, scorecard format)
└─ substrate baseline

Individual-CPU (Phase 2, parallel)
├─ thegent (cProfile → tokenization candidates)
└─ Eidolon (cProfile → schema caching candidates)

Accumulated-Memory (Phase 3, parallel)
├─ sharecli (heaptrack → allocator tuning)
└─ SessionLedger (heaptrack → allocator + compression tuning)

Scaled-Parallel (Phase 4, parallel)
├─ OmniRoute (k6 load test → combo dispatch candidates)
├─ substrate (perf-record → lock-free routing candidates)
└─ phenodag (go bench → claim protocol candidates)

Exotic-Tech Integration (Phase 5, concurrent with Phase 4)
├─ Zig spike: substrate dispatch kernel
├─ Allocator tuning: SessionLedger + OmniRoute
└─ Lock-free: substrate routing

Release & Consolidation (Phase 6)
├─ Harness consolidation → phenotype-tooling
├─ Findings report → scorecard + hotspot summary
└─ Cascade releases: substrate → downstream
```

### Critical Path (minimum sequential)

1. **Foundation** (2 weeks): harness + substrate baseline.
2. **Parallel waves** (3 weeks):
   - Individual-CPU: thegent + Eidolon (week 2–3).
   - Accumulated-Memory: sharecli + SessionLedger (week 3–4).
   - Scaled-Parallel: OmniRoute + substrate + phenodag (week 4–5).
   - Exotic-Tech (concurrent with week 4–5): Zig + allocators + lock-free.
3. **Consolidation** (1 week): harness consolidation, findings report, cascade releases.

**Total wall-clock: 6 weeks with 8–10 concurrent agents per week.**

---

## PART 5: REUSABLE PROFILING HARNESS SPEC

### Directory Structure

```
phenotype-tooling/
└─ tooling/profiling/
   ├─ PROFILING_HARNESS.md          (this spec, expanded)
   ├─ scorecard.schema.json          (JSON schema for results)
   ├─ scripts/
   │  ├─ compare_profiles.py         (compare two scorecards)
   │  ├─ visualize.py                (gnuplot/matplotlib results)
   │  ├─ cargo-bench-harness.sh      (Rust: Criterion export to scorecard)
   │  ├─ py-spy-harness.sh           (Python: py-spy export to scorecard)
   │  ├─ go-bench-harness.sh         (Go: go test -bench export to scorecard)
   │  ├─ heaptrack-harness.sh        (memory profiling export)
   │  ├─ perf-record-harness.sh      (Linux: perf record + flamegraph)
   │  └─ k6-load-harness.js          (k6 load test template)
   ├─ templates/
   │  ├─ Makefile.profile            (per-repo include; defines profile targets)
   │  ├─ profile.k6.js               (k6 load test template, customize BASE_URL + load)
   │  └─ contention-test.rs          (Rust template: spawn N agents, measure contention)
   └─ examples/
      ├─ substrate-dispatch-planner-profile.md
      ├─ omniroute-request-routing-profile.md
      ├─ sessionledger-compression-profile.md
      └─ ... (one per project)
```

### scorecard.schema.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["repo", "commit", "regime", "profile_date", "metrics"],
  "properties": {
    "repo": { "type": "string", "description": "e.g., 'substrate', 'OmniRoute'" },
    "commit": { "type": "string", "description": "git SHA-1 (short)" },
    "regime": {
      "type": "string",
      "enum": ["individual-cpu", "accumulated-memory", "scaled-parallel"],
      "description": "profiling regime"
    },
    "profile_date": { "type": "string", "format": "date-time" },
    "metrics": {
      "type": "object",
      "properties": {
        "latency_p50_us": { "type": "number" },
        "latency_p95_us": { "type": "number" },
        "latency_p99_us": { "type": "number" },
        "memory_peak_mb": { "type": "number" },
        "memory_avg_mb": { "type": "number" },
        "contention_lock_ns": { "type": "number", "description": "optional; lock contention in nanoseconds" },
        "throughput_ops_per_sec": { "type": "number", "description": "optional" },
        "custom": { "type": "object", "description": "project-specific metrics" }
      }
    },
    "hottest_functions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "samples": { "type": "integer" },
          "percent": { "type": "number" }
        }
      }
    },
    "allocations_top5": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "function": { "type": "string" },
          "bytes": { "type": "integer" },
          "count": { "type": "integer" }
        }
      }
    },
    "notes": { "type": "string" }
  }
}
```

### compare_profiles.py

```python
#!/usr/bin/env python3
import json
import sys

def compare(baseline, current):
    """Return delta scorecard: {'metric': {'value': X, 'delta_pct': Y}}"""
    result = {}
    for key in baseline['metrics']:
        if key not in current['metrics']:
            continue
        base_val = baseline['metrics'][key]
        curr_val = current['metrics'][key]
        if base_val == 0:
            delta_pct = 0
        else:
            delta_pct = ((curr_val - base_val) / base_val) * 100
        result[key] = {
            'baseline': base_val,
            'current': curr_val,
            'delta_pct': delta_pct,
            'win': '✓' if delta_pct < 0 else '✗' if delta_pct > 0 else '='
        }
    return result

if __name__ == '__main__':
    with open(sys.argv[1]) as f:
        baseline = json.load(f)
    with open(sys.argv[2]) as f:
        current = json.load(f)
    delta = compare(baseline, current)
    print(json.dumps(delta, indent=2))
```

### Makefile.profile (per-repo include)

```makefile
.PHONY: profile profile-baseline profile-compare

profile: profile-baseline
	@echo "Profiling complete. Output in .profile/"

profile-baseline:
	@mkdir -p .profile
	cargo bench --all 2>&1 | tee .profile/baseline-$(shell date +%s).log
	@echo "Baseline saved."

profile-contention:
	perf record -g -o .profile/contention.data cargo run --release --bin contention-test -- --agents 50 --iterations 200
	perf script .profile/contention.data > .profile/contention.perf
	flamegraph.pl .profile/contention.perf > .profile/contention-flame.svg

profile-compare:
	@if [ -f .profile/baseline-baseline.json ] && [ -f .profile/baseline-current.json ]; then \
	  python3 tooling/profiling/scripts/compare_profiles.py \
	    .profile/baseline-baseline.json \
	    .profile/baseline-current.json | tee .profile/delta.json; \
	else echo "Missing baseline scorecards; run profile-baseline first."; fi
```

---

## PART 6: IMPLEMENTATION CHECKLIST

- [ ] **Phase 1**: Harness + substrate baseline (Week 1–2)
  - [ ] Write scorecard schema + compare script
  - [ ] substrate: Criterion benchmarks + baseline export
  - [ ] sharecli: heaptrack baseline
  - [ ] Move scripts → phenotype-tooling
  
- [ ] **Phase 2**: Individual-CPU profiles (Week 2–3)
  - [ ] thegent: cProfile + py-spy → hottest functions + recommendations
  - [ ] Eidolon: cProfile + schema validation analysis
  
- [ ] **Phase 3**: Memory profiles (Week 3–4)
  - [ ] sharecli: heaptrack under 50–100 agent load
  - [ ] SessionLedger: heaptrack + compression level trade-off
  
- [ ] **Phase 4**: Scaled-parallel profiles (Week 4–5)
  - [ ] OmniRoute: k6 load test + flamegraph
  - [ ] substrate: perf-record contention + routing lock analysis
  - [ ] phenodag: go bench claim protocol + pprof
  
- [ ] **Phase 5**: Exotic-tech spikes (Week 5–6, concurrent)
  - [ ] Zig dispatch kernel spike + benchmark
  - [ ] Allocator tuning: jemalloc swap + heaptrack delta
  - [ ] Lock-free routing: dashmap replacement + benchmark
  
- [ ] **Phase 6**: Consolidation (Week 6+)
  - [ ] Harness consolidation → phenotype-tooling
  - [ ] Per-project findings report + recommendations
  - [ ] Cascade release planning: substrate v1.1 → downstream

---

## PART 7: EXPECTED OUTCOMES

### Latency Targets (per regime)

| Regime | Project | Baseline p50 | Target p50 | Win |
|--------|---------|--------------|------------|-----|
| Individual-CPU | thegent (loop) | TBD | -15% | Tokenization → Zig or Mojo |
| Individual-CPU | Eidolon (schema) | TBD | -20% | Schema caching + trie routing |
| Accumulated-Memory | sharecli (poll) | TBD | -10% memory | Mempool + postcard serialization |
| Accumulated-Memory | SessionLedger (compress) | TBD | -25% latency (zstd8) | Level tuning + batch FTS5 |
| Scaled-Parallel | OmniRoute (combo) | 400ms | 350ms (-12.5%) | Table-driven dispatch + pool |
| Scaled-Parallel | substrate (dispatch) | TBD | -20% (lock-free) | dashmap + crossbeam optimization |
| Scaled-Parallel | phenodag (claim) | TBD | -30% (lock-free) | Atomic cas or time-wheel TTL |

### Memory Targets (per project)

| Project | Baseline | Target | Win |
|---------|----------|--------|-----|
| sharecli (fleet daemon) | TBD | -15% | Allocator tuning + mempool |
| SessionLedger (session) | TBD | -20% | jemalloc + arena lifetime |
| OmniRoute (cache) | TBD | -10% | Connection pooling + cache eviction tuning |

### Deliverables

1. **phenotype-tooling/tooling/profiling/**: reusable harness (scorecard schema, compare script, per-repo runbooks).
2. **Per-project baseline scorecards** (`{project}.baseline-2026-06-30.json`).
3. **Per-project findings report**: hotspot summary + top-3 recommendations + ROI (effort vs latency/memory win).
4. **Exotic-tech spike results**: Zig dispatch kernel benchmark, allocator tuning delta, lock-free routing benchmark.
5. **Cascade release plan**: substrate v1.1 (if win >5%), downstream updates (OmniRoute, sharecli, etc.).

---

## PART 8: REFERENCES & CONTEXT

- **OmniRoute perf budgets**: `docs/PERF_BUDGETS.md` (p50/p95/p99 targets per endpoint).
- **Stack prefs**: feedback_stack_prefs.md — TS7+bun, uv-py3.14, Rust/Go/Zig cores, Electrobun.
- **Zig for low-level**: feedback_zig_for_lowlevel.md — profile→optimize, 3-regime framework, exotic-tech candidates.
- **No memory scare**: feedback_no_memory_scare.md — gate on memory pressure, cap build contention, dogfood sharecli.
- **sharecli hypervisor**: project_sharecli.md — process control-plane sidecar.
- **3-level swarm**: feedback_3level_swarm.md — Opus coordinator → Sonnet leads → Haiku workers.

---

## APPENDIX: EXAMPLE FLOWCHART (Markdown ASCII)

```
START: Foundation Phase
  |
  +---> Harness Spec (scorecard, compare script)
  |       |
  |       +---> substrate baseline (Criterion)
  |       |       |
  |       +---> sharecli baseline (heaptrack)
  |                |
  +--------- END Phase 1 --------+
  |
  |
  +---> Phase 2–3: Parallel Waves (Individual-CPU + Memory)
  |       |
  |       +---> thegent (cProfile → Zig candidate?)
  |       |
  |       +---> Eidolon (cProfile → schema cache)
  |       |
  |       +---> sharecli (heaptrack → jemalloc)
  |       |
  |       +---> SessionLedger (heaptrack + zstd)
  |                |
  +--------- END Phase 2–3 ------+
  |
  |
  +---> Phase 4–5: Parallel Waves (Scaled-Parallel + Exotic-Tech)
  |       |
  |       +---> OmniRoute (k6 + flamegraph)
  |       |
  |       +---> substrate (perf-record + lock-free spike)
  |       |
  |       +---> phenodag (go bench)
  |       |
  |       +---> Zig dispatch kernel spike
  |       |
  |       +---> Allocator tuning (jemalloc)
  |       |
  |       +---> Lock-free routing (dashmap)
  |                |
  +--------- END Phase 4–5 ------+
  |
  |
  +---> Phase 6: Consolidation
  |       |
  |       +---> Harness consolidation → phenotype-tooling
  |       |
  |       +---> Per-project findings + scorecard
  |       |
  |       +---> Cascade releases (substrate v1.1 → downstream)
  |                |
  END: Release ready
```

---

**Prepared by**: Research agent (read-only analysis).  
**Target Audience**: Implementation teams (codex exec / forge / subagents).  
**Confidence**: High — based on memory feedback (zig_for_lowlevel, no_memory_scare, stack_prefs), existing perf budgets (PERF_BUDGETS.md), and 8-project landscape scan.

