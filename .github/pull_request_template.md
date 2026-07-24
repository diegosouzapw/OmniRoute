## Summary

- Describe the user-facing or operational change.

## Related Issues

- Closes #
- Related to #

## Validation

Run only the focused loop for what you changed — the full unit suite, Vitest, the
60% coverage gate, and the production build all run in CI on this PR (#8329):

- [ ] Focused tests for the change: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- [ ] `npm run lint`
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