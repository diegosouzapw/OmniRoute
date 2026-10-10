## Summary

- What was broken, for whom, and what does this change fix?
- Root cause in one or two sentences.

## Related Issues

- Closes # <!-- use "Refs #" if this only partially fixes the issue -->

## Target Branch

See the [Release Strategy](../../docs/ops/RELEASE_STRATEGY.md) and the [ROADMAP](../../ROADMAP.md):

- [ ] Base is the active `release/v3.8.x` branch (the highest open `release/v*`), not `main`
      (after 3.9.0, fixes target `stable/v3` and are forward-ported to v4 with credit)

## Proof Of Fix (required)

Every bug fix must be validated by ONE of the following (`AGENTS.md`, Hard Rule #18).
A fix without either is not merged.

- [ ] **TDD (preferred)** — a test that fails before the fix and passes after it.
  - Test file(s):
  - Failing output before the fix (paste the relevant lines):
- [ ] **Real-environment test** (only when TDD is not possible — OAuth upstream flows,
      upstream WebSocket/Cloudflare behavior, UI-only regressions, hardware-dependent
      behavior) — record the exact command and its result:
  - Environment:
  - Command:
  - Result:

## Scope

- [ ] Only the files the failing test proves need changing are touched
- [ ] No test was weakened or deleted to make the suite pass

## Validation

Choose the focused loop for your change type from the
[Contribution Golden Path](../../docs/ops/CONTRIBUTION_GOLDEN_PATH.md). The full unit suite,
Vitest, the 60% coverage gate, and the production build all run in CI on this PR:

- [ ] Change type: provider / routing / UI / i18n / CLI / DB / build-deploy / other
- [ ] Focused tests and category gates from the golden path
- [ ] `npm run lint`

## Reviewer Notes

- Risky areas, side effects on other providers/routes, or follow-ups reviewers should know about.
