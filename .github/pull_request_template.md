## Summary

- Describe the user-facing or operational change.

## Related Issues

- Closes #
- Related to #

## Validation

Choose the change type and focused loop from the
[Contribution Golden Path](../docs/dev/CONTRIBUTION_GOLDEN_PATH.md). The full unit suite,
Vitest, the 60% coverage gate, and the production build all run in CI on this PR (#8329):

- [ ] Change type: provider / routing / UI / i18n / CLI / DB / build-deploy / other
- [ ] Focused tests and category gates from the golden path
- [ ] `npm run lint`
- [ ] Reconciled with the current active release base; focused checks rerun afterward
- [ ] Production-code changes include a new or updated automated test in this PR
- [ ] SonarQube PR analysis is green or any remaining issues are explicitly documented below

## Tests Added Or Updated

- List every changed or added automated test file.
- If no production code changed, state that here.

## Coverage Notes

- If this PR changes `src/`, `open-sse/`, `electron/`, or `bin/`, explain which tests cover the change.
- If coverage moved down in any touched file, explain why and what follow-up task will recover it.

## Reviewer Notes

- Call out any risky areas, migrations, feature flags, or manual validation that reviewers should know about.
