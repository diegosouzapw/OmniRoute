# L5-101 — Agent-effort governance decision (ADR-023)

**Status:** Complete
**Date:** 2026-06-15
**Device:** macbook
**ADR:** `docs/adr/2026-06-15/ADR-023-agent-effort-governance.md`
**Worklog:** `worklogs/L5-101-app-governance-2026-06-15.json`

## Directive (2026-06-15)

User said (verbatim from the conversation):

> add to governance to not work on our heavier projects on the macbook
> device. and to pause app level ones w\ little dogfood use for our SWE
> process, e.g. focalpoint (Civis\Dino\WSM remain active, you are allowed
> to work on non-"frontend" e.g. heavy visual engine requiring aspects of
> the game that you can quickly iterate on. for Dino\WSM none. QuadSGM\
> Atoms* on pause.. Atoms* from my capstone project. I hate my sponsor.
> we can legally steal for future items as needed. thats it. Hwledger and
> other apps need to have underlying parts moved not to some random
> phenoshared but to a proper lib\framework\sdk system or federated services
> if better that we can robustly managed and through this heavily reduce
> context waste and improve code quality\maintainability and all 3 of dev\
> user\agent satisfaction. LOC shoudl be reduced while coverage against
> items like spec\docs\tests of many many types e.g. unit e2e integ perf
> chaos and more maximized so we have maximum automated observability to
> support HITL-less dev solely off my base intent alone.

## Translation to governance rules

See [`ADR-023`](../../docs/adr/2026-06-15/ADR-023-agent-effort-governance.md) for
the formal rules. Summary:

- **Rule 1:** Device-fit gate — MacBook gets small work only
- **Rule 2:** App-level repo triage — ACTIVE (Civis) / CONDITIONAL (Dino, WSM) / PAUSED (focalpoint, QuadSGM, AtomsBot*)
- **Rule 3:** Substrate placement — code goes into proper lib/sdk/framework, not random phenoShared
- **Rule 3.1:** Quality bar — ≥ 6 of 7 elements (spec, docs, tests, e2e, observability, coverage, CI)

## References

- ADR-023: `docs/adr/2026-06-15/ADR-023-agent-effort-governance.md`
- Worklog: `worklogs/L5-101-app-governance-2026-06-15.json`
- SSOT: `SSOT.md` (governance SSOT entry)
