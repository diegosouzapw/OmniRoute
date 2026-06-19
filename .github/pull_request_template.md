## Summary

- Describe the user-facing or operational change.

## Related Issues

- Closes #
- Related to #

## Validation

- [ ] `npm run lint`
- [ ] `npm run test:unit`
- [ ] `npm run test:coverage`
- [ ] Coverage is still `>= 60%` for statements, lines, functions, and branches
- [ ] SonarQube PR analysis is green or any remaining issues are explicitly documented below

## Tests Added Or Updated

- List every changed or added automated test file.
- If no production code changed, state that here.

## Coverage Notes

- If this PR changes `src/`, `open-sse/`, `electron/`, or `bin/`, explain which tests cover the change.
- If coverage moved down in any touched file, explain why and what follow-up task will recover it.

## Reviewer Notes

- Call out any risky areas, migrations, feature flags, or manual validation that reviewers should know about.

## 71-pillar self-check

This repo is scored weekly under the 71-pillar framework (see
`findings/71-pillar-2026-06-18.md` and ADR-024). For non-trivial PRs,
identify which pillars your change touches so reviewers can spot
regressions early.

- [ ] **No pillar regressions**: scan the per-pillar scorecard before/after; this PR does not move any pillar from 3→2 or 2→1.
- [ ] **Domain touched** (pick one or more; see audit § 2): `AX` (L1–L12) · `Perf` (L13–L19) · `Quality` (L20–L27) · `DX` (L28–L37) · `UX` (L38–L45) · `Security` (L46–L55) · `Observability` (L56–L63) · `Docs` (L64–L68) · `Governance` (L69–L71)
- [ ] **Pillars improved** (optional): list pillar IDs that this PR moves up (e.g. `L67: 1 → 3 — added openapi.yaml`). Refer to `findings/71-pillar-2026-06-18.md` for pillar definitions.
- [ ] **Re-audit cadence**: this PR does not require a mid-week re-run of the full 71-pillar scorecard (small docs/tests/1-line fixes do not).
- [ ] **Audit doc unchanged**: this PR does not modify `findings/71-pillar-*.md` directly; remediation score updates go in `findings/71-pillar-<date>-remediation.md` per the audit-ratchet workflow.

If unsure, leave the domain + pillars blank and the reviewer will fill them in. The 71-pillar scorecard is owned by the worklog-schema circle and is re-run weekly (Mon 09:00 PDT).