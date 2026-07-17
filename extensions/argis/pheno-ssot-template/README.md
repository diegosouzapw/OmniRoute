# Pheno SSOT Template (Single Source of Truth)

**`pheno-ssot-template`** is the canonical starter repository for any
new service, CLI, or library in the **`pheno-*` fleet** (the
Phenotype monorepo + its satellite crates).

It is generated from a template, not authored by hand, so every
project that lands in the fleet ships with the same scaffolding
decisions already made. The reason for that is the **S**ingle
**S**ource **o**f **T**ruth principle: there is **one** canonical
home for every cross-cutting concern, and that home is shared
across every project.

This README explains what SSOT means, what the four non-negotiable
invariants are, and what the SSOT layer looks like in practice.

---

## What "SSOT" means in this fleet

In a polyglot monorepo with ~30+ repos, it is easy for cross-cutting
concerns to fragment:

- Error handling: every repo invents its own 3-, 5-, or 7-variant
  `Error` enum; a `?` propagated from one repo into another silently
  loses context.
- Logging: some repos use `println!`, some use `log`, some use
  `tracing`, and the field names don't line up. SREs can't filter
  `error.kind = "not_found"` across the fleet.
- Config: every repo hand-rolls its own YAML loader, environment
  parsing, and precedence rules. Onboarding a new contributor means
  learning a new config schema per repo.
- Schemas: TypeScript, Python, and Rust code that represents the
  same domain entity (e.g. `User`, `WorkPackage`, `TraceLink`)
  diverges because the schema was copy-pasted, not imported.

**SSOT says: every cross-cutting concern has exactly one canonical
home, and every other consumer depends on that home.**

Concretely, every project in the `pheno-*` fleet has exactly **one**
crate, library, or schema package per concern, and the project
imports the canonical artifact instead of duplicating it.

| Concern | Canonical home (SSOT) | Every repo imports it as |
|---|---|---|
| Errors | [`pheno-errors`](https://github.com/KooshaPari/phenotype/tree/main/pheno-errors) (L3 #46) | `pheno_errors::AppError` |
| Logging / tracing | [`pheno-tracing`](https://github.com/KooshaPari/phenotype/tree/main/pheno-tracing) (L3 #47) | `pheno_tracing::init()` / `init_json()` |
| Config | [`pheno-config`](https://github.com/KooshaPari/phenotype/tree/main/pheno-config) (L3 #48) | `pheno_config::load::<MyConfig>()` |
| Telemetry (OTel) | [`pheno-otel`](https://github.com/KooshaPari/phenotype/tree/main/pheno-otel) (L3 #49) | `pheno_otel::init(endpoint)` |
| Schemas (TS) | [`pheno-zod-schemas`](https://github.com/KooshaPari/phenotype/tree/main/pheno-zod-schemas) (L3 #53) | `import { UserSchema } from "@pheno/zod-schemas"` |
| Schemas (Py) | [`pheno-pydantic-models`](https://github.com/KooshaPari/phenotype/tree/main/pheno-pydantic-models) (L3 #53) | `from pheno_pydantic_models import User` |
| CLI base | [`pheno-cli-base`](https://github.com/KooshaPari/phenotype/tree/main/pheno-cli-base) (L3 #50) | `pheno_cli_base::main!()` |
| Tokio runtime | `pheno-tokio-base` (L3 #54) | `pheno_tokio_base::runtime()` |

When a project is scaffolded from `pheno-ssot-template`, the
`Cargo.toml` and `package.json` already declare path-deps to these
canonical homes, so the first `cargo test` succeeds against the
canonical stack and the new project inherits the fleet's
observability, error model, and config schema for free.

---

## The 4 non-negotiable invariants

A project is **SSOT-conformant** if and only if it satisfies all four
of the following invariants. The `scripts/render.sh` dry-instantiation
script (and the `ci.yml` lint job that follows) verifies each one.

### Invariant 1 — Every error is a `pheno_errors::AppError`

```rust
// ✅ CONFORMANT
fn load_user(id: &str) -> Result<User, pheno_errors::AppError> { ... }

// ❌ NOT CONFORMANT
fn load_user(id: &str) -> Result<User, Box<dyn std::error::Error>> { ... }
fn load_user(id: &str) -> Result<User, MyRepoError> { ... }
```

The 5 canonical variants are `Domain`, `NotFound { entity, id }`,
`Conflict`, `Validation`, and `Storage`. Anything that doesn't fit
into one of those buckets is a signal to update the L3 spec, not to
add a 6th variant locally.

### Invariant 2 — Every log line is structured

```rust
// ✅ CONFORMANT (structured fields, queryable in log aggregation)
tracing::info!(user.id = %id, user.role = ?role, "loaded user");

// ❌ NOT CONFORMANT (string formatting, not queryable)
tracing::info!("loaded user {} with role {:?}", id, role);
println!("loaded user {} with role {:?}", id, role);
```

Field names follow `kebab-case.lowercase` for the namespace and
`snake_case` for the field. Wire codes (e.g. `INTERNAL_ERROR`,
`NOT_FOUND`) come from `phenotype-error-core::ErrorCode`, not from
`AppError::kind()`.

### Invariant 3 — Every config is loaded via `pheno-config`

```rust
// ✅ CONFORMANT
#[derive(serde::Deserialize)]
struct MyConfig { /* ... */ }
let cfg: MyConfig = pheno_config::load()?;

// ❌ NOT CONFORMANT
let raw = std::fs::read_to_string("config.yaml")?;
let cfg: MyConfig = serde_yaml::from_str(&raw)?;
```

`pheno-config` wraps `figment` + `dotenvy` + `pydantic-settings`
behind a uniform facade, so the precedence (CLI > env > file >
default) is identical across the fleet.

### Invariant 4 — Every schema is in `pheno-zod-schemas` or `pheno-pydantic-models`

```ts
// ✅ CONFORMANT (TS)
import { UserSchema, type User } from "@pheno/zod-schemas";
const u: User = UserSchema.parse(input);
```

```python
# ✅ CONFORMANT (Py)
from pheno_pydantic_models import User
u = User.model_validate(input)
```

```rust
// ✅ CONFORMANT (Rust, when applicable)
use pheno_schemas::User;
let u: User = serde_json::from_str(input)?;
```

Hand-rolled `struct User { id: String, ... }` definitions that are
re-implemented in each language are forbidden. The canonical schema
is generated from a single source (currently a `schema.json` per
entity) and emitted to all three language targets.

---

## The SSOT layer (1-page ASCII diagram)

```
                       ┌──────────────────────────────────────┐
                       │           pheno-ssot-template        │
                       │     (this repo, scaffold via         │
                       │      `scripts/render.sh` → /tmp/...) │
                       └────────────────┬─────────────────────┘
                                        │ `cargo new` + replace
                                        │ `src/lib.rs.template` etc.
                                        ▼
   ┌─────────────────────────────────────────────────────────────────────┐
   │                       YOUR NEW pheno-* PROJECT                       │
   │                                                                       │
   │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐│
   │   │  src/        │  │  src/cli.rs  │  │  src/        │  │  tests/  ││
   │   │  lib.rs      │  │              │  │  config.rs   │  │          ││
   │   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └────┬─────┘│
   │          │                 │                 │               │       │
   │          │  uses           │  uses           │  uses         │       │
   │          ▼                 ▼                 ▼               ▼       │
   │   ┌────────────────────────────────────────────────────────────┐    │
   │   │  SSOT layer (path-deps in Cargo.toml, declared in template) │    │
   │   └─────┬───────────┬───────────┬───────────┬─────────────┬────┘    │
   │         │           │           │           │             │         │
   └─────────┼───────────┼───────────┼───────────┼─────────────┼─────────┘
             │           │           │           │             │
             ▼           ▼           ▼           ▼             ▼
     ┌────────────┐ ┌───────────┐ ┌──────────┐ ┌─────────┐ ┌────────────┐
     │  pheno-    │ │  pheno-   │ │  pheno-  │ │  pheno- │ │  pheno-    │
     │  errors    │ │  tracing  │ │  config  │ │  otel   │ │  schemas   │
     │            │ │           │ │          │ │         │ │ (TS+Py+Rs) │
     │ AppError   │ │ init()    │ │ load()   │ │ init()  │ │ UserSchema │
     │ (5 vars)   │ │ init_json │ │ EnvFilter│ │ OTLP    │ │ UserModel  │
     │ thiserror  │ │ EnvFilter │ │ figment  │ │ spans   │ │ generated  │
     │ anyhow::Co │ │ file app. │ │ dotenvy  │ │ exporter│ │ from JSON  │
     └────────────┘ └───────────┘ └──────────┘ └─────────┘ └────────────┘
             │           │           │           │             │
             └───────────┴─────┬─────┴───────────┴─────────────┘
                               ▼
                 ┌──────────────────────────────┐
                 │  Phenotype monorepo `main`   │
                 │  (the single root of truth   │
                 │   for every cross-cutting    │
                 │   concern in the fleet)      │
                 └──────────────────────────────┘
```

The key insight: every project you scaffold from this template
imports from the **same five crates** (or their language-equivalents)
because the template's `Cargo.toml` declares those path-deps. The
template is the only place where the choice of "which crate owns
errors" is made; every downstream repo gets the answer for free.

---

## How to use this template

### 1. Render the template into a fresh project

```bash
# from inside pheno-ssot-template/
./scripts/render.sh my-new-service /tmp/my-new-service
# copies src/, .github/, deny.toml, CODEOWNERS, etc. into /tmp/my-new-service
# and substitutes {{project_name}}, {{project_slug}}, etc.
```

### 2. Verify it builds

```bash
cd /tmp/my-new-service
cargo check         # all 5 SSOT crates resolve via path-deps
cargo test          # placeholder test passes
cargo clippy        # no warnings
cargo fmt --check   # formatting clean
```

### 3. Replace the placeholder logic

Open `src/lib.rs` and replace the body of `run()` with your project's
actual entry point. The imports, error type, tracing init, and config
loader should not need to change — that's the whole point of the SSOT.

### 4. Open a PR against the Phenotype monorepo

The CI pipeline will run `cargo deny check` against the template's
`deny.toml`, the test suite against the placeholder, and the SSOT
invariants will be checked against your new project.

---

## Files in this template

| File | Purpose |
|---|---|
| `template.yaml` | Machine-readable template manifest (name, description, variables, post-create hooks) |
| `src/lib.rs.template` | Rust skeleton that satisfies all 4 SSOT invariants out of the box |
| `scripts/render.sh` | Dry-instantiation script — copies + substitutes → `cargo check` |
| `scripts/check-ssot-invariant-1-errors.sh` | SSOT invariant #1 linter (every error is AppError) |
| `scripts/check-ssot-invariant-2-logging.sh` | SSOT invariant #2 linter (structured logging) |
| `.github/workflows/ci.yml` | CI pipeline: cargo test, clippy, fmt --check |
| `.github/workflows/audit.yml` | Security audit: cargo-deny + TruffleHog secrets scan |
| `.github/workflows/scorecard.yml` | OpenSSF Scorecard weekly analysis |
| `.github/workflows/lint.yml` | Linting: ShellCheck + YAML lint |
| `justfile` | Task runner for template maintenance |
| `docs/governance/README.md` | Governance policies and fleet references |
| `deny.toml` | cargo-deny config matching the fleet baseline (see `DENY_TOML_DIVERGENCE_2026_06_10.md`) |
| `CODEOWNERS` | Default owner `@KooshaPari` for every path |
| `LICENSE` | MIT license (Copyright 2026 Koosha Pari) |
| `SECURITY.md` | Reporting channel, supported versions, disclosure policy |
| `CONTRIBUTING.md` | Conventional commits, PR process, governance references |

---

## Related fleet documentation

- [`FLEET_100TASK_DAG_V3.md`](../FLEET_100TASK_DAG_V3.md) — V3 task DAG
  (L3 #55 is this task)
- [`WORKLOG_SCHEMA_2026_06_10.md`](../WORKLOG_SCHEMA_2026_06_10.md) —
  canonical 8-field worklog schema
- [`DENY_TOML_DIVERGENCE_2026_06_10.md`](../DENY_TOML_DIVERGENCE_2026_06_10.md) —
  canonical `deny.toml` baseline
- `V3_EXECUTION_LOG_2026_06_10.md` → "L3 #55" — the rollout notes for
  this template

---

## License

MIT — see [`LICENSE`](./LICENSE).
