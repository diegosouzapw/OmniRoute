# Testing Strategy

## Focused Checks

- Verify Markdown diff hygiene with `git diff --check`.
- Verify README badge presence with `rg`.
- Run Prettier check on changed Markdown.

## Repo-Native Checks

Run npm scripts that do not require unavailable external services:

- `npm run lint`
- `npm run typecheck:core`
- `npm run build`

Record any environmental blockers in the projects-landing governance ledgers.
