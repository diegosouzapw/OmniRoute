## Summary

- What does this feature add, and who uses it?
- Link the issue or discussion where it was agreed on.

## Related Issues

- Closes #
- Related to #

## Target Branch

See the [Release Strategy](../../docs/ops/RELEASE_STRATEGY.md) and the [ROADMAP](../../ROADMAP.md):

- [ ] Base is the active `release/v3.8.x` branch (the highest open `release/v*`), not `main`
- [ ] I understand that from 3.8.55 on, feature PRs are held with the `v4-feature` label and
      re-targeted to the v4 channel (`develop`) when it opens — they are not closed

## Design

- Where does the code live (route / handler / executor / service / DB module / UI)?
- New settings, env vars, feature flags, DB migrations, or MCP tools? List them.
- Is it opt-in? Data-mutating behavior must be off by default.

## Validation

Choose the focused loop for your change type from the
[Contribution Golden Path](../../docs/ops/CONTRIBUTION_GOLDEN_PATH.md). The full unit suite,
Vitest, the 60% coverage gate, and the production build all run in CI on this PR:

- [ ] Change type: provider / routing / UI / i18n / CLI / DB / build-deploy / other
- [ ] Focused tests and category gates from the golden path
- [ ] `npm run lint`
- [ ] New production code ships with new automated tests in this PR
- [ ] Docs updated for every new endpoint, env var, CLI command, or setting
- [ ] New UI strings added to the i18n catalogs

## Tests Added Or Updated

- List every changed or added automated test file.

## Reviewer Notes

- Risky areas, migrations, feature flags, or manual validation reviewers should know about.
