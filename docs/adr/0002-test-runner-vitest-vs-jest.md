# 0002 — Test runner: vitest over jest

> Status: **Proposed**
> Date: 2026-06-08
> Deciders: OmniRoute maintainers

## Context

`OmniRoute` has 50K+ TS LOC in `tests/` and 219K LOC in `src/`. Currently there
is **no test runner configured** (the test files are present but not wired into
`pnpm test` or CI). When we add a runner, the two main candidates are **Jest**
(the de-facto Node.js standard) and **Vitest** (the Vite-native runner).

## Decision

**Vitest** is the chosen test runner.

## Rationale

1. **Next.js 14 + Vite/Turbopack alignment** — `OmniRoute` uses Next.js, and
   Vitest is built on the same Vite-based transform pipeline. Tests run with
   the same module resolution and ESM behavior as the dev server, eliminating
   the Jest-specific "works locally, fails in Jest" class of bugs.
2. **Native TS / ESM** — Vitest handles TypeScript + ESM out of the box, no
   `ts-jest` or `babel-jest` configuration required.
3. **Faster** — Vitest parallelizes test files by default and uses worker
   threads, which is materially faster than Jest's default fork-based runner
   on multi-core machines.
4. **Compatible API** — Vitest's API is a superset of Jest's (`describe`,
   `it`, `expect`, `vi.mock`). Existing Jest-style tests can be ported with
   near-zero code changes.

## Consequences

**Positive**
- Faster CI (rough 2-3x on 50K LOC test suite)
- Less config drift between dev server and tests
- One tool for unit + integration + e2e (vitest + Playwright driver)

**Negative**
- Vitest is younger than Jest; edge-case bug reports take longer to resolve
- Some Jest plugins (e.g. `jest-image-snapshot`) don't have Vitest equivalents
- Onboarding for contributors who only know Jest

## Alternatives Considered

1. **Jest** — rejected; the dev/test alignment benefit of Vitest outweighs
   Jest's larger plugin ecosystem for our use case (no image-snapshot, no
   complex transforms).
2. **Node test runner (`node:test`)** — rejected; too low-level for a Next.js
   app of this size. Would require us to build our own assertion library.
3. **Tape / Mocha** — rejected; no longer maintained for new projects.

## Cross-References

- `SPEC.md` § Test & Coverage Governance
- ADR-0003 — coverage floor 70%
