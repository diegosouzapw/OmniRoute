# 0004 — Decomposition into packages

> Status: **Proposed**
> Date: 2026-06-08
> Deciders: OmniRoute maintainers

## Context

`OmniRoute` is a single Next.js repo with 501K LOC of code, plus 682K LOC of
**auto-generated i18n documentation** (see ADR-0005). The 501K of real code
spans four logically distinct concerns:

| Concern | Where it lives | LOC |
|---|---|---|
| The Next.js app (UI + API routes) | `src/` | 219K |
| Integration / e2e tests | `tests/` | 155K (50K real + 105K fixtures) |
| A vendored SSE client (`open-sse/`) | `open-sse/` | 106K |
| A standalone SDK (`@omniroute/`) | `@omniroute/` | 10K |

All four share one Cargo-style "monorepo" footprint, but they have different
release cadences, dependency shapes, and consumers:

- `src/` is a deployable Next.js app
- `tests/` is CI-only
- `open-sse/` is a vendored fork of an upstream open-source library; we
  diverge locally for our SSE parsing needs
- `@omniroute/` is an internal SDK that other Phenotype services consume

Mixing them in one repo means a change to the SDK drags the full Next.js CI
along, and the vendored library makes the repo 106K LOC larger than it needs
to be.

## Decision

Decompose `OmniRoute` into **4 packages** organized as a pnpm workspace:

```
omni-route-monorepo/         # this repo (slimmer)
├── apps/
│   └── web/                 # Next.js app (was src/ + tests/)
├── packages/
│   ├── sdk/                 # @omniroute/sdk (was @omniroute/)
│   └── open-sse/            # vendored fork (was open-sse/, slimmed)
├── docs/                    # English docs only (i18n gitignored)
├── scripts/
└── SPEC.md / PLAN.md / docs/adr/
```

## Consequences

**Positive**
- **Faster CI**: `packages/sdk/` CI runs in ~30s; `apps/web/` CI runs in ~5min;
  they don't share a queue.
- **Smaller blast radius**: a breaking change to `open-sse/` doesn't bump
  the SDK version.
- **Cleaner vendoring**: `open-sse/` becomes a clear fork with an
  `UPSTREAM.md` and a sync script.
- **Per-package governance**: each package can have its own SPEC/ADRs/coverage
  workflow, focused on its scope.

**Negative**
- pnpm workspace setup cost (one-time, ~1 day)
- Cross-package import paths must be workspace-aware
- Releases are per-package; consumers need to pin specific versions

## Mitigations

- Use `pnpm-workspace.yaml` with strict version pins
- Document the import order (apps depend on packages; packages never import apps)
- Add a `pnpm run verify` script that builds all packages in topological order

## Migration Plan (4 weeks)

| Week | Work |
|---|---|
| 1 | Create `apps/web/` and `packages/sdk/` dirs; move files; verify CI green |
| 2 | Move `open-sse/` to `packages/open-sse/`; write `UPSTREAM.md`; verify CI |
| 3 | Move `docs/` to its own repo (`omni-route-docs`); add docs-site deploy |
| 4 | Update external references (other Phenotype services consuming `@omniroute/sdk`); deprecate the old paths |

## Alternatives Considered

1. **Single repo, no workspaces** — rejected; the 4 concerns have different
   cadences, and the 105K fixture file in `tests/` is the elephant in the room.
2. **Three monorepos (one per package)** — rejected; we still want a single
   `pnpm install` and a single CI dashboard, so the value of one repo with
   workspaces > three independent repos.
3. **NPM-published monorepo (Changesets + Turborepo)** — accepted as future
   work; the pnpm workspace is the v1, Turborepo comes in when the package
   count crosses ~10.

## Cross-References

- `SPEC.md` § Decomposition Plan
- `PLAN.md` § Decomposition Roadmap
- ADR-0005 — i18n gitignore strategy
