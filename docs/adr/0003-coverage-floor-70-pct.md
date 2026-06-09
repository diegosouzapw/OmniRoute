# 0003 — Coverage floor: 70%

> Status: **Proposed**
> Date: 2026-06-08
> Deciders: OmniRoute maintainers

## Context

`OmniRoute` has 219K LOC in `src/` and 0% measured coverage (no runner configured
yet). When we add the Vitest-based coverage workflow, we need a coverage floor
that:

1. Catches regressions without being so strict that every refactor needs a
   follow-up PR to add tests
2. Distinguishes "core" code (router, providers, auth) from "UI" code
3. Is achievable incrementally, not all-at-once

## Decision

**70% lines + 60% branches** is the coverage floor for `OmniRoute/src/lib/`
(critical paths). **50% lines** is the floor for `src/components/` and
`src/app/`.

## Rationale

1. **`src/lib/` is the heart** — the router, providers, auth, and quota code
   are correctness-critical (a bug here costs money or leaks data). 70% / 60%
   is achievable in a 4-week focused effort and high enough to catch the
   "I rewrote this and broke the edge case" pattern.

2. **UI code is lower priority** — React components are visual; the test
   surface is "does the right thing render for these props", which is
   brittle and rarely worth maintaining at 70%+. 50% is enough to catch the
   "this button does nothing" class of bugs.

3. **Per-component targets** — vitest supports per-file thresholds. The
   router (`src/lib/router.ts`) gets 90%, the providers get 80%, the auth
   gets 90%, etc. (see SPEC.md § Test & Coverage Roadmap).

## Consequences

**Positive**
- A measurable, enforceable standard
- Per-component flexibility (router is critical, UI is not)
- Catches "looks like a refactor, but actually changed behavior" PRs

**Negative**
- Coverage numbers can be gamed (tests that assert trivial things)
- Adding tests to meet the floor is a real ongoing cost
- New contributors must understand the per-component thresholds

## Mitigations

- Use Codecov's "patch" threshold (PR must add tests for the code it
  changes) to prevent gaming
- Review coverage reports in PRs, not just the number
- Add BDD .feature files to encode *behavior*, not just *lines*

## Alternatives Considered

1. **80% global floor** — rejected; would require us to write 200K+ LOC of
   tests in the first 4 weeks, blocking the decomposition work.
2. **No coverage floor** — rejected; without a floor, the gap widens silently
   and a "looks like a refactor" PR can ship a regression undetected.
3. **Mutation testing (Stryker)** — accepted as future work; the floor gets
   you the *lines*, mutation testing verifies the *tests*.

## Cross-References

- `SPEC.md` § Test & Coverage Governance
- `PLAN.md` § Test & Coverage Roadmap
- ADR-0002 — vitest as the runner
