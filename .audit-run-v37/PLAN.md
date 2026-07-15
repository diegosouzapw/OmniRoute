# OmniRoute Backend Rewrite — Master Plan

> **Status:** v0.1 plan. Generated 2026-07-05. Source of truth for the Rust/Go rewrite of the
> OmniRoute AI router/proxy backend. All non-frontend aspects (backend, API, SDK, CLI, MCP, MITM,
> Electron companion) are in scope. The Next.js dashboard, the `_mono_repo/omnirouteSite/` marketing
> site, and the design system are out of scope for v1.

---

## 1. Executive summary

The current OmniRoute fork (v3.8.31) is a 100k+ LoC Node.js / TypeScript production service that
unifies 231 LLM providers behind an OpenAI-compatible `/v1/*` API surface, exposes an MCP server
(JSON-RPC 2.0, 87 tools, 30 scopes), runs a TLS MITM proxy, ships a CLI (51 subcommands), and
bundles an Electron desktop app. The runtime carries a heavy cost: per-token TTFB tax from
V8/Express, GC pauses under burst, large dist footprint, and a hot `open-sse/handlers/chatCore.ts`
file already at 5,108 LoC.

**Plan**: rewrite the backend in **Rust** as a single Cargo workspace that mirrors the existing
module boundaries, preserves every external contract byte-for-byte (HTTP routes, JSON shapes, SSE
event names, MCP JSON-RPC, CLI flags, env vars, DB schema, `DATA_DIR` layout), and lands behind a
**shadow-mode rollout** so production can keep running on the existing TS service while the Rust
service validates.

**Why Rust (not Go, not Zig, not Mojo)**: best-in-class async SSE throughput with `axum` + `tokio`,
zero-copy streaming with `hyper` + `reqwest`, single static binary per platform, native FFI to
rustls/Quinn for the MITM proxy, first-class MCP SDK (`rmcp` / official `modelcontextprotocol/rust-sdk`),
Tauri 2.0 for the desktop companion, mature SQLite (sqlx) + Postgres support, and a `cargo` workspace
that gives us a clean per-domain crate split with strict dependency boundaries.

**Go** is the runner-up for the CLI glue and the MITM proxy if we hit a Rust ergonomics wall;
**Zig/Mojo** are not on the v1 critical path (see §4).

---

## 2. Backend inventory (current state)

Counts are exact, taken with `wc -l` and `ls | wc -l` against the live tree.

### 2.1 Top-level shape

| Path                           | Files  | LoC (approx) | Purpose                                                                                     |
| ------------------------------ | ------ | ------------ | ------------------------------------------------------------------------------------------- |
| `open-sse/`                    | ~270   | ~70k         | Express SSE sidecar: 115 services, 50+ executors, 17 handlers, 47 config files, translator  |
| `open-sse/mcp-server/`         | ~12    | ~3k          | MCP 2024-11-05 server (stdio + HTTP+SSE), 87 tools, 30 scopes, 10 tool groups               |
| `src/app/api/v1/`              | ~80    | ~12k         | OpenAI-compatible HTTP API (chat, embeddings, images, audio, video, music, responses, etc.) |
| `src/mitm/`                    | ~16    | ~5k          | TLS MITM proxy (cert mint/install, DNS, inspector, tproxy)                                  |
| `src/lib/`                     | ~250   | ~40k         | Core libs: auth, db, combos, embeddings, images, audio, video, observability, etc.          |
| `src/domain/`                  | ~16    | ~3k          | Domain policy (fallback, lockout, degradation, cost, combos)                                |
| `src/sse/`                     | ~10    | ~2k          | Server-side SSE delivery helpers                                                            |
| `src/server/`                  | ~5     | ~1k          | HTTP server wiring, auth, cors, ws                                                          |
| `src/types/`                   | ~9     | ~1k          | Type definitions                                                                            |
| `src/shared/`                  | ~80    | ~10k         | Shared utils, schemas, components, hooks, contracts                                         |
| `bin/`                         | ~12    | ~5k          | CLI entry, runtime support, MCP stdio entry, postinstall                                    |
| `bin/cli/`                     | ~70    | ~25k         | CLI program + 51 subcommands                                                                |
| `@omniroute/opencode-plugin`   | 1 pkg  | ~2k          | OpenCode AI plugin SDK                                                                      |
| `@omniroute/opencode-provider` | 1 pkg  | ~1k          | Deprecated provider helper                                                                  |
| `src/lib/db/migrations/`       | 97 sql | ~3k          | 97 SQLite migrations (base tables: 17, derived: many)                                       |
| `src/lib/db/*.ts`              | 50+    | ~12k         | DB access modules (settings, apiKeys, combos, etc.)                                         |
| Tests                          | ~150   | ~25k         | Node test runner + vitest + playwright                                                      |

**Total backend surface: ~250k LoC** to reproduce in Rust. The hot path is small (a few
thousand LoC for `/v1/chat/completions`); the long tail is the provider executors and CLI
subcommands.

### 2.2 External contracts that MUST be preserved

| Contract                                              | Files                                       | Notes                                          |
| ----------------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| OpenAI `/v1/chat/completions`                         | `src/app/api/v1/chat/completions/route.ts`  | SSE + non-streaming, OpenAI shape              |
| OpenAI `/v1/embeddings`                               | `src/app/api/v1/embeddings/route.ts`        |                                                |
| OpenAI `/v1/images/generations`, `/edits`             | `src/app/api/v1/images/*`                   |                                                |
| OpenAI `/v1/audio/speech`, `/transcriptions`          | `src/app/api/v1/audio/*`                    |                                                |
| OpenAI `/v1/moderations`                              | `src/app/api/v1/moderations/route.ts`       |                                                |
| OpenAI `/v1/models`                                   | `src/app/api/v1/models/route.ts`            |                                                |
| OpenAI `/v1/batches`                                  | `src/app/api/v1/batches/*`                  |                                                |
| OpenAI `/v1/files`                                    | `src/app/api/v1/files/*`                    |                                                |
| Anthropic `/v1/messages`, `/v1/messages/count_tokens` | `src/app/api/v1/messages/*`                 |                                                |
| OpenAI Responses `/v1/responses`                      | `src/app/api/v1/responses/*`                |                                                |
| A2A `/v1/a2a/*`                                       | `src/app/api/v1/a2a/*`                      |                                                |
| ACP `/v1/acp/*`                                       | `src/app/api/v1/acp/*`                      |                                                |
| Custom: combos, quotas, providers, agents, etc.       | `src/app/api/v1/agents/*`, `combos/*`, etc. | 30+ route groups                               |
| MCP (stdio)                                           | `bin/omniroute.mjs --mcp`                   | JSON-RPC 2.0, 87 tools                         |
| MCP (HTTP+SSE)                                        | `open-sse/mcp-server/httpTransport.ts`      |                                                |
| CLI                                                   | `bin/omniroute.mjs <cmd>`                   | 51 subcommands, see `bin/cli/commands/*.mjs`   |
| SDK                                                   | `@omniroute/opencode-plugin`                | OpenCode AI plugin contract                    |
| MITM inspector                                        | `src/mitm/inspector/*`                      |                                                |
| Env vars                                              | `.env.example`                              | ~120 vars, must keep names                     |
| DATA_DIR                                              | `~/.omniroute/` (or `$DATA_DIR`)            | `db.json`, `storage.sqlite`, `mitm/`, `certs/` |
| DB schema                                             | `src/lib/db/migrations/*.sql`               | 97 migrations; backwards-compat required       |

### 2.3 Hot path: `/v1/chat/completions`

Sequence (current TS):

```
HTTP request
  -> src/app/api/v1/chat/completions/route.ts  (Next.js route handler)
     -> middleware: auth, rate-limit, body limits, request-id
     -> open-sse/handlers/chatCore.ts  (handleChatCore, 5108 LoC)
        -> memorySkillsInjection, idempotencyCache, semanticCache
        -> sanitizeChatRequestBody, splitMisplacedToolResults
        -> detectFormatFromEndpoint, getTargetFormat
        -> translateRequest (open-sse/translator/*)
        -> combo resolution: getCombosCached, getUpstreamProxyConfigCached
        -> account pool resolve: apiKeyRotator, sessionPool
        -> executor pick: getExecutor (open-sse/executors/<provider>.ts)
        -> BaseExecutor.execute -> upstream HTTP call
        -> translateResponse (SSE transform stream)
        -> semanticCache write, callLog write, quotaConsumption
     -> SSE chunked response to client
```

**Rust equivalent target latency**: same call chain, no I/O on hot path, all
heavy work behind `tokio::spawn` + a single stream task per request, hyper
chunked transfer-encoding for the SSE response.

### 2.4 Risk register (must-not-miss)

| Risk                                           | Source                                                   | Mitigation                                                                                                                |
| ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Browser-pool fallback for web-cookie providers | `open-sse/services/browserPool.ts` (Playwright/Chromium) | Keep a thin Node sidecar (`omniroute-sidecar`) for v1, call from Rust via Unix socket + JSON. Re-evaluate Wasmtime in v2. |
| Claude Code identity/fingerprinting            | `open-sse/services/claudeCode*.ts` (12 files)            | Port to Rust; mirrors the request shape exactly.                                                                          |
| Tool schema coercion & cloaking                | `open-sse/services/claudeCodeToolRemapper.ts`            | Pure functions; port 1:1.                                                                                                 |
| MCP JSON-RPC shape                             | `open-sse/mcp-server/server.ts`                          | Use `modelcontextprotocol/rust-sdk` to keep transport + schema identical.                                                 |
| SQLite schema migrations                       | 97 migrations                                            | Adopt `sqlx::migrate!`; re-apply existing SQL files verbatim.                                                             |
| Env var names                                  | `.env.example` (~120 vars)                               | `omniroute-config` crate maps names 1:1; no renames.                                                                      |
| 231 provider entries                           | `open-sse/config/providerModels.ts` + 50 executors       | Phase the implementation (slice 2-4); do not block on coverage.                                                           |

---

## 3. Stack recommendation

### 3.1 Language pick: Rust

| Axis                     | Score | Why                                                                     |
| ------------------------ | ----- | ----------------------------------------------------------------------- |
| SSE streaming throughput | 5/5   | `axum` + `hyper` zero-copy streaming, proven in LitServe/Volta          |
| MCP SDK                  | 4/5   | Official `modelcontextprotocol/rust-sdk` exists; `rmcp` is community-rs |
| TLS MITM                 | 5/5   | `rustls` + `rcgen` for cert mint, full control                          |
| Tauri 2.0 desktop        | 5/5   | First-class, single binary, small footprint vs Electron                 |
| SQLite                   | 5/5   | `sqlx` (compile-time checked) + `rusqlite` available                    |
| FFI for browser sidecar  | 4/5   | `nix`/`tokio::process` for child Node process; clean boundary           |
| OTel                     | 5/5   | `tracing` + `tracing-opentelemetry` is the canonical path               |
| Single static binary     | 5/5   | `cargo` default; `cross` for cross-compile                              |
| Cross-platform build     | 5/5   | `cross`, `cargo-zigbuild` mature                                        |
| Ecosystem maturity       | 5/5   | Crates.io has every primitive we need                                   |
| Hiring                   | 4/5   | Growing but smaller than Go                                             |

**Go (3.5/5 overall)**: excellent for CLI and proxy, but GC pauses hurt SSE under burst; the
provider executor pattern (231 polymorphic implementers) is verbose in Go interfaces; no
equivalent to `axum`'s tower middleware. Use only as fallback for the MITM if we hit a Rust
ergonomics wall.

**Zig (2.5/5)**: fantastic C interop, but immature async story, small crate ecosystem, and no
production MCP SDK. Not v1.

**Mojo (1.5/5)**: pre-1.0, no async HTTP, no MCP SDK, no ecosystem. Re-evaluate in 12 months.

### 3.2 Recommended primary stack

| Concern             | Crate                                                      | Version         | Notes                                     |
| ------------------- | ---------------------------------------------------------- | --------------- | ----------------------------------------- |
| Async runtime       | `tokio`                                                    | 1.x             | full features, rt-multi-thread            |
| HTTP server         | `axum`                                                     | 0.7.x           | tower middleware, hyper under the hood    |
| HTTP client         | `reqwest`                                                  | 0.12.x          | rustls backend, stream support            |
| JSON                | `serde` + `serde_json`                                     | 1.x / 1.x       | standard                                  |
| Validation          | `validator` or `garde`                                     | 0.18 / 0.20     | derive macros                             |
| SSE                 | `axum::response::sse`                                      | built-in        | Sse + Event + keep-alive                  |
| TLS server (MITM)   | `rustls`                                                   | 0.23.x          | pinned via `aws-lc-rs`                    |
| Cert mint           | `rcgen`                                                    | 0.13.x          | in-process CA                             |
| MCP                 | `modelcontextprotocol/rust-sdk`                            | latest          | `rmcp` as fallback                        |
| SQLite              | `sqlx`                                                     | 0.8.x           | compile-time checked queries, migrations  |
| Postgres (optional) | `sqlx`                                                     | 0.8.x           | same crate                                |
| Auth / JWT          | `jsonwebtoken`                                             | 9.x             | HS256 + RS256                             |
| Encryption at rest  | `age` or `aws-lc-rs`                                       | 0.10 / latest   | for `API_KEY_SECRET`                      |
| OTel                | `tracing` + `tracing-opentelemetry` + `opentelemetry-otlp` | 0.1.x ecosystem | traces + metrics                          |
| Structured logs     | `tracing-subscriber`                                       | 0.3.x           | JSON formatter                            |
| Config              | `figment` or `config-rs`                                   | 0.10 / 0.14     | layered (CLI > env > file > defaults)     |
| CLI                 | `clap`                                                     | 4.x             | derive macros, subcommands                |
| Error handling      | `thiserror` + `anyhow`                                     | 2.x / 1.x       | typed for libs, dynamic for bin           |
| Async traits        | `async-trait`                                              | 0.1.x           |                                           |
| Tests               | `cargo test` + `wiremock` + `insta` + `axum-test`          | latest          | snapshot for SSE, contract tests for HTTP |
| Lints               | `cargo clippy` + `cargo deny` + `cargo audit`              | latest          | CI gates                                  |
| Build               | `cross`                                                    | latest          | cross-compile                             |
| Single binary       | `cargo` default                                            | —               | `--release --strip`                       |
| Tauri (desktop)     | `tauri`                                                    | 2.x             | replaces Electron for v2                  |

### 3.3 Crate workspace layout

```
OmniRoute-rs/                            # new repo, sibling of OmniRoute/
├── Cargo.toml                           # workspace
├── rust-toolchain.toml                  # pin 1.95
├── crates/
│   ├── omniroute-core/        # traits, types, errors, ids, time, money
│   ├── omniroute-config/      # env + file layered config
│   ├── omniroute-db/          # sqlx pool, migrations, models, repos
│   ├── omniroute-providers/   # ProviderExecutor trait + 1 example impl
│   ├── omniroute-translator/  # OpenAI<->Anthropic<->Responses format
│   ├── omniroute-routing/     # combos, fallback, strategy, autoCombo
│   ├── omniroute-stream/      # SSE helpers, transform stream
│   ├── omniroute-api/         # axum routes, OpenAI-compatible surface
│   ├── omniroute-mcp/         # MCP JSON-RPC server (stdio + HTTP+SSE)
│   ├── omniroute-mitm/        # TLS MITM proxy (rustls + rcgen)
│   ├── omniroute-cli/         # clap CLI (51 subcommands target)
│   └── omniroute/             # binary crate, glues everything
├── migrations/               # 001_*.sql ... 097_*.sql (verbatim copy)
├── tests/                    # integration + e2e + contract
└── docs/                     # spec, runbooks, env, ops
```

**Dependency graph (top-down):**

```
omniroute (bin) -> api, mcp, mitm, cli, routing, stream, db, config, core
                -> providers, translator (via routing)
api        -> routing, stream, providers, translator, db, config, core
mcp        -> providers, routing, db, config, core
mitm       -> api, providers, db, config, core
cli        -> api, mcp, db, config, core
routing    -> providers, translator, db, core
stream     -> core
providers  -> translator, db, config, core
translator -> core
db         -> core
config     -> core
```

The `core` crate has zero deps beyond std + serde + thiserror. Every other crate builds on
top of it. No circular deps.

### 3.4 Key trait surface (sketch)

```rust
// omniroute-core/src/provider.rs
#[async_trait]
pub trait ProviderExecutor: Send + Sync {
    fn id(&self) -> &ProviderId;
    fn capabilities(&self) -> Capabilities;
    async fn execute(&self, ctx: RequestContext, req: ProviderRequest) -> Result<ProviderStream>;
}

// omniroute-core/src/translator.rs
pub trait Translator: Send + Sync {
    fn from(&self) -> Format;
    fn to(&self) -> Format;
    fn translate_request(&self, body: Value) -> Result<Value>;
    fn translate_response_chunk(&self, chunk: Value) -> Result<Option<Value>>;
}

// omniroute-core/src/router.rs
#[async_trait]
pub trait Router: Send + Sync {
    async fn resolve(&self, req: &RoutingRequest) -> Result<RouteDecision>;
}

// omniroute-core/src/auth.rs
#[async_trait]
pub trait TokenRefresher: Send + Sync {
    fn provider(&self) -> ProviderId;
    async fn refresh(&self, account: &Account) -> Result<AccessToken>;
}
```

### 3.5 Concurrency model

- One `tokio` multi-thread runtime per process, worker threads = num CPUs.
- One task per inbound HTTP request; cancellation tied to client disconnect.
- One task per upstream stream; cancellation propagates.
- Bounded `tokio::sync::Semaphore` per provider account (account pool concurrency cap).
- Bounded `tower::limit::RateLimitLayer` for global + per-key.
- `tokio::sync::mpsc` between executor task and SSE response task; backpressure via bounded
  channel + `permit` drop policy.
- Backpressure: drop slowest stream's buffered events past N, surface `usage_truncated: true`.

### 3.6 Data flow: `/v1/chat/completions`

```
client --HTTP--> axum::Router
                   |
                   v  (tower middleware chain)
            request-id -> auth -> rate-limit -> body-size -> json-validate
                   |
                   v
            omniroute-api::routes::chat_completions
                   |
                   v
            Router::resolve(req) ---> RouteDecision { combo, executor, account, headers }
                   |
                   v  (semantic cache check)
            omniroute-stream::SseWriter::new(res)
                   |
                   v
            tokio::spawn(executor.execute(ctx, req))
                   |        |
                   |        +-> reqwest::RequestBuilder (upstream POST)
                   |        +-> stream::Body (chunked)
                   |
                   v
            translate_response_chunk(chunk) ---> SseWriter::send_event("data: ...\n\n")
                   |
                   v
            client (SSE)
```

### 3.7 Error model

```rust
#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("upstream error: {0}")]
    Upstream(UpstreamError),
    #[error("auth failed")]
    Unauthorized,
    #[error("rate limited")]
    RateLimited { retry_after_ms: u64 },
    #[error("not found")]
    NotFound,
    #[error("bad request: {0}")]
    BadRequest(String),
    #[error("internal: {0}")]
    Internal(#[source] anyhow::Error),
}
```

- All errors flow through `omniroute-api::error::IntoResponse` impl that maps to OpenAI-shaped
  JSON: `{"error": {"message": "...", "type": "...", "code": "..."}}`.
- Secret redaction middleware scrubs `api_key`, `Authorization`, `Cookie`, `Set-Cookie`,
  `x-api-key`, custom `*-token` headers from logs and traces.
- Errors that escape to logs include an error code + cause, never the original payload.

### 3.8 Observability

- `tracing` spans per request, per upstream call, per executor step.
- `tracing-subscriber` with JSON formatter, env-controlled level, `OMNIROUTE_LOG=info`.
- OTel: `opentelemetry-otlp` over gRPC, default OTLP endpoint `http://localhost:4317`.
- Metrics: `metrics` crate, Prometheus exporter on `:9090/metrics`.
- Health: `/healthz` (liveness), `/readyz` (DB + upstream pool), `/metrics` (Prometheus).
- Audit log: every API call logged to `audit_log` table (caller_id, route, status, ts).

### 3.9 FFI for browser-pool providers

**v1**: keep a thin Node sidecar `omniroute-sidecar` that hosts the `browserPool`,
`claudeCodeIdentity`, `claudeCodeFingerprint`, `claudeCodeObfuscation` modules. The Rust
executor for web-cookie providers spawns the sidecar as a child process and pipes
JSON-RPC over stdio (or a Unix socket on macOS/Linux, named pipe on Windows).

**v2**: re-evaluate Wasmtime embedding of the Playwright/Chromium dance. Not on v1.

### 3.10 CLI

- `clap` 4.x with derive macros, subcommands mapped 1:1 to the existing 51 commands.
- Layered config: `--flag` > `OMNIROUTE_*` env > `~/.omniroute/config.toml` > defaults.
- Plugin model: dynamic library load via `libloading` for `omniroute` provider packs.
- Output formats: `table | json | jsonl | csv` (matches current `--output` choice).
- i18n: keep the 42-locale catalog; new `omniroute-i18n` crate with `fluent` for v1.

### 3.11 Build & release

- `rust-toolchain.toml` pins 1.95.
- `cross` for `aarch64-unknown-linux-gnu`, `x86_64-unknown-linux-musl`, `aarch64-apple-darwin`,
  `x86_64-apple-darwin`, `x86_64-pc-windows-msvc`.
- Single static binary per platform; `.dmg` + `.app` on macOS, `.deb` + `.rpm` on Linux, MSI on Windows.
- `cargo-deny` for license + advisory gate in CI.
- `cargo-cyclonedx` for SBOM.
- Reproducible builds via `SOURCE_DATE_EPOCH` + locked `Cargo.lock`.
- Tauri 2.0 desktop app replaces Electron in v2; v1 keeps the existing Electron app.

---

## 4. Migration plan (phased rollout)

The Rust service runs in **shadow mode** behind the existing TS service for the entire
rollout. The TS service stays the source of truth for routing decisions, billing, and audit
until slice 5.

| Slice | Scope                                                                                                  | Mode                                            | Gate to advance                                     |
| ----- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| 0     | Workspace skeleton, `omniroute` binary, `/healthz`, `/v1/models` (read from JSON config)               | Standalone on `:20140`                          | Builds, tests, runs                                 |
| 1     | `/v1/chat/completions` for OpenAI-compatible providers (5: openai, anthropic, google, groq, fireworks) | Shadow: TS still serves, Rust logs differences  | 0.1% traffic shadow for 7d, no behavior diff > 0.5% |
| 2     | `/v1/embeddings`, `/v1/images/generations`, `/v1/audio/*`, `/v1/moderations` for the same 5 providers  | Shadow                                          | No diff                                             |
| 3     | MCP server (stdio + HTTP+SSE), 87 tools (subset: 5 first)                                              | Shadow                                          | MCP contract tests pass                             |
| 4     | MITM proxy (rustls + rcgen), basic inspector                                                           | Standalone                                      | TLS cert mint + intercept verified                  |
| 5     | CLI: 51 subcommands, `serve` runs the Rust API                                                         | Cutover: `/v1/chat/completions` for 10% traffic | Error rate < 0.5%, p99 latency within 10% of TS     |
| 6     | CLI: full surface, plugin model, i18n                                                                  | Cutover: 50% traffic                            | Same gate                                           |
| 7     | All 231 provider executors (parity mode + per-provider rollouts)                                       | Cutover: 100% traffic                           | Error rate parity, full audit log                   |
| 8     | Tauri desktop replaces Electron                                                                        | Parallel                                        | Both ship, Tauri becomes default in v2              |

**Feature flag mechanism**: env var `OMNIROUTE_BACKEND=ts|rust|shadow` per-process. The
TS service consults this and proxies shadow traffic to the Rust service; the Rust service
also consults it for self-cutover.

**Rollback**: drop the env var, restart. Both services read from the same `DATA_DIR` and DB.

---

## 5. Test strategy

| Layer         | Tool                                               | Coverage target              |
| ------------- | -------------------------------------------------- | ---------------------------- |
| Unit          | `cargo test` (in-crate)                            | 80% per crate                |
| Doc tests     | `cargo test --doc`                                 | All public API examples      |
| Integration   | `cargo test` in `tests/`                           | 70% per public route         |
| Contract      | `wiremock` mock upstream, `axum-test` for handlers | 100% of `/v1/*` parity       |
| Golden stream | `insta` snapshot for SSE event sequences           | 100% of formats              |
| E2E           | bash + curl + jq scripts, headless                 | Smoke for all routes         |
| Load          | `k6` or `wrk`                                      | 1k concurrent SSE, 5min soak |
| Lint          | `cargo clippy -- -D warnings`                      | 0 warnings                   |
| Audit         | `cargo audit`, `cargo deny`                        | 0 high/critical              |
| Coverage      | `cargo llvm-cov`                                   | 80% overall                  |

**Golden stream tests** are the critical contract: for each provider, capture the SSE
event sequence from the TS service, replay through the Rust service, snapshot the output
events. Diff must be empty (after timestamp + request-id normalization).

---

## 6. Hardening checklist (must-pass before cutover)

- [ ] All API keys encrypted at rest with `API_KEY_SECRET` (AES-GCM, age-encrypted).
- [ ] All DB secrets redacted from logs.
- [ ] All upstream responses scrubbed for `Set-Cookie`, `Authorization`, `x-api-key`,
      `*-token`, `proxy-authorization` headers before logging.
- [ ] Rate limiting: per-key (token bucket), per-IP (token bucket), per-account (semaphore).
- [ ] OAuth refresh: jittered exponential backoff, max 5 retries, circuit breaker.
- [ ] JWT: HS256 + RS256 support, exp validation, scope-based authorization.
- [ ] CORS: locked to the dashboard origin in prod, permissive in dev.
- [ ] TLS: rustls with mozilla intermediate profile, ALPN h2 + http/1.1.
- [ ] Dependency policy: `cargo-deny` blocks GPL, AGPL, unknown licenses; `cargo-audit` blocks CVEs.
- [ ] SBOM: `cargo-cyclonedx` produces CycloneDX 1.5 JSON per release.
- [ ] Reproducible builds: `SOURCE_DATE_EPOCH`, locked `Cargo.lock`.
- [ ] Graceful shutdown: `tokio::signal::ctrl_c` + SIGTERM, drain in-flight streams up to 30s.
- [ ] Health checks: `/healthz` (liveness, no deps), `/readyz` (DB + upstream pool).
- [ ] Audit log: every API call, every OAuth refresh, every config change.
- [ ] Secret scanning: `gitleaks` in CI.
- [ ] `cargo clippy -- -D warnings` clean.
- [ ] `cargo test` clean on Linux + macOS + Windows CI.

---

## 7. Phased delivery (this repo)

This plan lands in stages, each shippable as a Rust crate PR against `OmniRoute-rs/`.

- **Stage A (slice 0 + scaffolding)**: workspace, `omniroute` binary, `/healthz`, `/v1/models`,
  doc strings, basic CI. _First PR._
- **Stage B (slice 1)**: OpenAI-compatible provider executor trait + 5 providers, full
  `/v1/chat/completions` happy path, golden stream tests.
- **Stage C (slice 2)**: embeddings, images, audio, moderations.
- **Stage D (slice 3)**: MCP server via `modelcontextprotocol/rust-sdk`, 5 tools first.
- **Stage E (slice 4)**: MITM proxy.
- **Stage F (slice 5+)**: CLI 51 commands, cutover, 231 providers, Tauri desktop.

---

## 8. Open questions (need user input)

These are pinned assumptions, not blockers. Override before slice 0 ships.

1. **Tauri vs Electron for v1 desktop** — assuming keep Electron for v1, Tauri in v2. (Pinned.)
2. **Sidecar language for browser-pool** — assuming thin Node sidecar over Unix socket for v1. (Pinned.)
3. **Single static binary vs musl + glibc split** — assuming musl for Linux to keep one binary. (Pinned.)
4. **i18n: keep fluent vs custom** — assuming `fluent` 0.16.x for v1, port existing 42 locales. (Pinned.)
5. **MCP SDK: official `modelcontextprotocol/rust-sdk` vs `rmcp`** — assuming `rmcp` (more active, async-native). Override if you have a preference.
6. **DB: keep SQLite-only vs add Postgres** — assuming SQLite-only for v1, Postgres in v2. (Pinned.)
7. **License** — current is MIT. Assuming Rust rewrite stays MIT. (Pinned.)

---

## 9. References

- Live source: `/Users/kooshapari/CodeProjects/Phenotype/repos/OmniRoute/`
- `AGENTS.md` (live counts, runbook): `OmniRoute/AGENTS.md`
- `CLAUDE.md` (Claude guide): `OmniRoute/CLAUDE.md`
- `design.md` (design system, frontend — out of scope): `OmniRoute/design.md`
- MCP spec: https://modelcontextprotocol.io/specification/2025-06-18
- OpenAI API: https://platform.openai.com/docs/api-reference
- Anthropic API: https://docs.anthropic.com/en/api
- Rust async book: https://rust-lang.github.io/async-book/
- `axum` docs: https://docs.rs/axum/0.7
- `rmcp` docs: https://docs.rs/rmcp/latest/rmcp/
- Tauri 2.0: https://v2.tauri.app/
